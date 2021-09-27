import React, { useContext, useEffect } from 'react';
import Navbar from './Components/Containers/Navbar';
import LoginPage from './Pages/Auth/LoginPage';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import { RootStoreContext } from './Stores/RootStore';
import { observer } from 'mobx-react-lite';
import { createBrowserHistory } from 'history';
import AboutExperimentPage from './Pages/AboutExperiment/AboutExperimentPage';
import AboutKumPage from './Pages/AboutKUM/AboutKumPage';
import UserDashboardPage from './Pages/Auth/UserDashboardPage';
import LogoutPage from './Pages/Auth/LogoutPage';
import ExperimentInvalidPage from './Pages/Experiment/ExperimentInvalidPage';
import RegisterInvalidPage from './Pages/Auth/RegisterInvalidPage';
import ExperimentPage from './Pages/Experiment/VerifyExperimentPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import ExperimentAdjustingPhasePage from './Pages/Experiment/ExperimentAdjustingPhasePage';
import ExperimentPrimaryPhasePage from './Pages/Experiment/ExperimentPrimaryPhasePage';
import InternalErrorPage from './Pages/Errors/InternalErrorPage';

export const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';

export const history = createBrowserHistory();

const App = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    signedIn,
    loginCurrent: loginCurrentAction,
    token,
  } = rootStore.commonStore;

  useEffect(() => {
    const loginCurrent = async () => {
      await loginCurrentAction();
    };

    if (token) {
      loginCurrent();
    }
  }, [loginCurrentAction, token]);

  return (
    <Router history={history}>
      <Navbar />
      <div className='page-wrapper'>
        <Switch>
          <Route exact path='/'>
            {signedIn ? (
              <Redirect to={{ pathname: '/user' }} />
            ) : (
              <Redirect to={{ pathname: '/about/experiment' }} />
            )}
          </Route>
          <Route exact path='/user'>
            {signedIn ? (
              <UserDashboardPage />
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
          <Route exact path='/about/experiment'>
            <AboutExperimentPage />
          </Route>
          <Route exact path='/about/kum'>
            <AboutKumPage />
          </Route>
          <Route exact path='/experiment/adjusting/phase'>
            <ExperimentAdjustingPhasePage />
          </Route>
          <Route exact path='/experiment/primary/phase'>
            <ExperimentPrimaryPhasePage />
          </Route>
          <Route exact path='/experiment/invalid'>
            <ExperimentInvalidPage />
          </Route>
          <Route path='/experiment/:id'>
            <ExperimentPage />
          </Route>
          <Route exact path='/experiment'>
            <ExperimentInvalidPage />
          </Route>
          <Route exact path='/register/invalid'>
            <RegisterInvalidPage />
          </Route>
          <Route path='/register/:id'>
            <RegisterPage />
          </Route>
          <Route path='/register'>
            <RegisterInvalidPage />
          </Route>

          <Route path='/login'>
            {signedIn ? <Redirect to={{ pathname: '/' }} /> : <LoginPage />}
          </Route>
          <Route path='/logout'>
            {signedIn ? <LogoutPage /> : <Redirect to={{ pathname: '/' }} />}
          </Route>
          <Route exact path='/error'>
            <InternalErrorPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default observer(App);
