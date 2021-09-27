import { action, observable, runInAction, makeObservable } from 'mobx';
import agent from '../API/agent';
import { history } from '../App';

export default class RegistrationLinksStore {
  rootStore;

  constructor(rootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable linkGenerated = false;
  @observable errorOccurred = false;
  @observable registrationLinkRequested = null;

  @action generateRegistrationLink = async (values) => {
    runInAction(() => {
      this.setLinkGenerated(false);
      this.setErrorOccurred(false);
    });

    let request = {
      email: values.email,
    };

    try {
      await agent.RegistrationLinks.generate(request);
      runInAction(() => {
        this.setLinkGenerated(true);
      });
    } catch (e) {
      this.errorOccurred = true;
    }
  };

  @action verifyRegistrationLink = async (id) => {
    try {
      const link = await agent.RegistrationLinks.listOne(id);
      if (link.isValid) {
        runInAction(() => {
          this.setRegistrationLinkRequested(link);
        });
      } else {
        history.push('/register/invalid');
      }
    } catch (e) {
      history.push('/register/invalid');
      console.log(e);
    }
  };

  @action setLinkGenerated = (value) => {
    this.linkGenerated = value;
  };

  @action setErrorOccurred = (value) => {
    this.errorOccurred = value;
  };

  @action setRegistrationLinkRequested = (value) => {
    this.registrationLinkRequested = value;
  };
}
