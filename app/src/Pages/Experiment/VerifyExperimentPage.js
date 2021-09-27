import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RootStoreContext } from '../../Stores/RootStore';
import { Container } from 'semantic-ui-react';
import ExperimentStartModal from '../../Components/Experiment/Modals/ExperimentStartModal';
import ExperimentRenewModal from '../../Components/Experiment/Modals/ExperimentRenewModal';
import { observer } from 'mobx-react-lite';

const VerifyExperimentPage = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    verifyExperiment,
    conductedExperimentRenew,
    indexesAllCount,
    indexesLabeledCount,
    timeElapsedFromStart,
    abandonExperiment,
  } = rootStore.experimentsStore;
  const { id } = useParams();

  useEffect(() => {
    const verify = async () => {
      await verifyExperiment(id);
    };

    verify();
  }, [id, verifyExperiment]);

  return (
    <Container>
      {conductedExperimentRenew ? (
        <ExperimentRenewModal
          timeElapsedFromStart={timeElapsedFromStart}
          indexesLabeledCount={indexesLabeledCount}
          indexesAllCount={indexesAllCount}
          abandon={abandonExperiment}
        />
      ) : (
        <ExperimentStartModal abandon={abandonExperiment} />
      )}
    </Container>
  );
};

export default observer(VerifyExperimentPage);
