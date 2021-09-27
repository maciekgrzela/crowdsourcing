import React, { useContext, useEffect } from 'react';
import { RootStoreContext } from '../../Stores/RootStore';

const LogoutPage = () => {
  const rootStore = useContext(RootStoreContext);
  const { logout } = rootStore.commonStore;

  useEffect(() => {
    logout();
  }, [logout]);

  return <div></div>;
};

export default LogoutPage;
