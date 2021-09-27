import { createContext } from 'react';
import CommonStore from './CommonStore';
import ExperimentsStore from './ExperimentsStore';
import RegistrationLinksStore from './RegistrationLinksStore';

class RootStore {
  commonStore;
  experimentsStore;
  registrationLinksStore;

  constructor() {
    this.commonStore = new CommonStore(this);
    this.experimentsStore = new ExperimentsStore(this);
    this.registrationLinksStore = new RegistrationLinksStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
