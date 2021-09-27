import React, { useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import Footer from '../../Components/Containers/Footer';
import { RootStoreContext } from '../../Stores/RootStore';
import { observer } from 'mobx-react-lite';
import ExperimentRules from '../../Components/Experiment/ExperimentRules';
import JoinExperimentForm from '../../Components/Experiment/JoinExperimentForm';
import ExperimentHello from '../../Components/Experiment/ExperimentHello';

const AboutExperimentPage = () => {
  const rootStore = useContext(RootStoreContext);
  const { setActiveNavbarItem } = rootStore.commonStore;

  useEffect(() => {
    setActiveNavbarItem('aboutExperiment');
  }, [setActiveNavbarItem]);

  return (
    <>
      <Container className='mt-1' text>
        <ExperimentHello />
        <ExperimentRules />
        <JoinExperimentForm />
      </Container>
      <Footer />
    </>
  );
};

export default observer(AboutExperimentPage);
