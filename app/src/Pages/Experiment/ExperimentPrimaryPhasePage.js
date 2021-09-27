import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { history } from '../../App';
import { RootStoreContext } from '../../Stores/RootStore';
import { Container, Header, Icon, Button } from 'semantic-ui-react';
import ExperimentInsertAge from '../../Components/Experiment/ExperimentInsertAge';
import EndOfExperimentModal from '../../Components/Experiment/Modals/EndOfExperimentModal';
import ExperimentBreakModal from '../../Components/Experiment/Modals/ExperimentBreakModal';

const ExperimentPrimaryPhasePage = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    conductedExperiment,
    conductedExperimentFirstImgIndex,
    updatePredictions,
    updateResults,
    finishConductedExperiment,
    timeElapsedFromStart,
  } = rootStore.experimentsStore;

  const [timer, setTimer] = useState(null);
  const [seconds, setSeconds] = useState(
    timeElapsedFromStart === null ? 0 : timeElapsedFromStart
  );
  const [showEndOfExperimentModal, setShowEndOfExperimentModal] =
    useState(false);
  const [showExperimentBreakModal, setShowExperimentBreakModal] =
    useState(false);
  const [index, setIndex] = useState({
    results: 0,
    image: 0,
  });

  useEffect(() => {
    if (conductedExperiment === null) {
      history.push('/');
    } else {
      setIndex({
        results: conductedExperimentFirstImgIndex,
        image:
          conductedExperiment.results[conductedExperimentFirstImgIndex].index,
      });

      const counter = setInterval(() => {
        setSeconds((sec) => sec + 1);
      }, 1000);

      setTimer(counter);
    }
  }, []);

  const prepareNextImage = async (age) => {
    updatePredictions(index.results, age);
    if (index.results + 1 < conductedExperiment.results.length) {
      setIndex((idx) => ({
        results: idx.results + 1,
        image: conductedExperiment.results[idx.results + 1].index,
      }));
    } else {
      await updateResults();
      setShowEndOfExperimentModal(true);
      clearInterval(timer);
      await finishConductedExperiment(false, seconds);
      setTimer(null);
    }
  };

  const experimentBreakRequested = async () => {
    await updateResults();
    setShowExperimentBreakModal(true);
    clearInterval(timer);
    await finishConductedExperiment(true, seconds);
    setTimer(null);
  };

  return (
    <Container>
      {conductedExperiment !== null ? (
        <>
          <Header
            as='h1'
            dividing
            content='Faza główna'
            subheader={`W tej fazie ocenisz ${conductedExperiment.results.length} zdjęć. Po każdej ocenie wieku osoby ze zdjęcia, zostanie Ci przedstawione kolejne zdjęcie. Na tym etapie, nie będziesz informowany o prawidłowym wieku ocenianej osoby.`}
          />
          <Header
            textAlign='center'
            className='mt-2 mb-3 experiment-timer'
            as='h2'
          >
            <Icon name='clock outline' />
            <Header.Content>
              {new Date(seconds * 1000).toISOString().substr(11, 8)}
            </Header.Content>
            <Header.Content className='ml-2'>
              {`${index.results} / ${conductedExperiment.results.length}`}
            </Header.Content>
            <Header.Content className='ml-2'>
              <Button onClick={experimentBreakRequested}>
                <Icon name='pause' />
                Wystarczy na dziś
              </Button>
            </Header.Content>
          </Header>
          <ExperimentInsertAge
            phase='PRIMARY'
            image={index.image}
            nextStep={prepareNextImage}
            interfaceSelector={
              conductedExperiment.inputInterface !== undefined
                ? !!(conductedExperiment.inputInterface === 'bar')
                : false
            }
          />
        </>
      ) : (
        <></>
      )}
      {showEndOfExperimentModal && <EndOfExperimentModal />}
      {showExperimentBreakModal && <ExperimentBreakModal />}
    </Container>
  );
};

export default observer(ExperimentPrimaryPhasePage);
