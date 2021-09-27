import {
  observable,
  action,
  reaction,
  computed,
  makeObservable,
  runInAction,
} from 'mobx';
import agent from '../API/agent';
import { history } from '../App';

export default class CommonStore {
  rootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      }
    );
  }

  @computed get signedIn() {
    return !!this.user;
  }

  @action login = async (credentials) => {
    this.setLoginErrorOccurred(false);
    try {
      let user = await agent.Users.login(credentials);
      user.password = credentials.password;
      this.setUser(user);
      this.setToken(user.token);
      history.push('/');
    } catch (e) {
      this.setLoginErrorOccurred(true);
      console.log(e);
    }
  };

  @action loginCurrent = async () => {
    this.setLoginErrorOccurred(false);
    try {
      let user = await agent.Users.current();
      this.setUser(user);
      this.setToken(user.token);
      history.push('/');
    } catch (e) {
      history.push('/login');
    }
  };

  @action register = async (data, tokenId) => {
    this.setRegistrationErrorOccurred(false);
    try {
      let credentials = { ...data, registrationToken: tokenId };
      let user = await agent.Users.register(credentials);
      user.password = credentials.password;
      this.setUser(user);
      this.setToken(user.token);
      history.push('/');
    } catch (e) {
      this.registrationErrorOccurred(true);
      console.log(e);
    }
  };

  @action editUserInfo = async (data) => {
    runInAction(() => {
      this.setUserInfoEdited(false);
      this.setEditUserInfoErrorOccurred(false);
    });

    try {
      await agent.Users.editInfo(this.user._id, data);
      this.setUserInfoEdited(true);
    } catch (e) {
      console.log(e);
      this.setEditUserInfoErrorOccurred(true);
    }
  };

  @action logout = () => {
    this.setUser(null);
    this.setToken(null);
    history.push('/');
  };

  @observable token = window.localStorage.getItem('jwt');
  @observable user = null;
  @observable loginErrorOccurred = false;
  @observable registrationErrorOccurred = false;
  @observable userInfoEdited = false;
  @observable editUserInfoErrorOccurred = false;
  @observable activeNavbarItem = 'aboutExperiment';

  @action setActiveNavbarItem = (value) => {
    this.activeNavbarItem = value;
  };

  @action setToken = (token) => {
    this.token = token;
  };

  @action setUser = (user) => {
    this.user = user;
  };

  @action setLoginErrorOccurred = (value) => {
    this.loginErrorOccurred = value;
  };

  @action setRegistrationErrorOccurred = (value) => {
    this.registrationErrorOccurred = value;
  };

  @action setEditUserInfoErrorOccurred = (value) => {
    this.editUserInfoErrorOccurred = value;
  };

  @action setUserInfoEdited = (value) => {
    this.userInfoEdited = value;
  };
}
