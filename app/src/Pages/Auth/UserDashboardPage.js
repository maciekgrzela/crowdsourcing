import React, { useContext, useEffect, useRef } from 'react';
import { RootStoreContext } from '../../Stores/RootStore';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import Footer from '../../Components/Containers/Footer';
import ExperimentsResults from '../../Components/Dashboard/ExperimentsResults';
import UserWelcome from '../../Components/Dashboard/UserWelcome';
import InviteToExperiment from '../../Components/Dashboard/InviteToExperiment';
import GenerateRegistrationLink from '../../Components/Dashboard/GenerateRegistrationLink';
import ModifyUsersData from '../../Components/Dashboard/ModifyUsersData';

const UserDashboardPage = () => {
  const editInfoRef = useRef();

  const rootStore = useContext(RootStoreContext);
  const {
    user,
    editUserInfo: editUserInfoAction,
    editUserInfoErrorOccurred,
    userInfoEdited,
    setActiveNavbarItem,
  } = rootStore.commonStore;

  const {
    generateExperiment: generateExperimentAction,
    errorOccurred,
    experimentGenerated,
    experiments,
    finishedExperiments,
    notStartedExperiments,
    getExperiments: getExperimentsAction,
    downloadExperiments: downloadExperimentsAction,
  } = rootStore.experimentsStore;

  const {
    generateRegistrationLink,
    linkGenerated,
    errorOccurred: regLinkErrorOccurred,
  } = rootStore.registrationLinksStore;

  const generateExperiment = async (values) => {
    await generateExperimentAction(values);
  };

  const generateLink = async (values) => {
    await generateRegistrationLink(values);
  };

  const editUserInfo = async (values, editPassword) => {
    const data = !editPassword
      ? {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        }
      : values;

    await editUserInfoAction(data);
  };

  const downloadExperiments = async () => {
    await downloadExperimentsAction();
  };

  useEffect(() => {
    setActiveNavbarItem('userPanel');

    const getExperiments = async () => {
      await getExperimentsAction();
    };

    getExperiments();
  }, [getExperimentsAction, setActiveNavbarItem]);

  return (
    <>
      <Container text className='user-dashboard'>
        <UserWelcome user={user} editInfoRef={editInfoRef} />
        <ExperimentsResults
          all={experiments}
          notStarted={notStartedExperiments}
          finished={finishedExperiments}
          download={downloadExperiments}
        />
        <InviteToExperiment
          generateExperiment={generateExperiment}
          error={errorOccurred}
          ok={experimentGenerated}
        />
        <GenerateRegistrationLink
          generateLink={generateLink}
          error={regLinkErrorOccurred}
          ok={linkGenerated}
        />
        <ModifyUsersData
          editUserInfo={editUserInfo}
          editInfoRef={editInfoRef}
          error={editUserInfoErrorOccurred}
          ok={userInfoEdited}
          user={user}
        />
      </Container>
      <Footer />
    </>
  );
};

export default observer(UserDashboardPage);
