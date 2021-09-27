import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { history } from '../../App';
import ExperimentInsertAge from '../../Components/Experiment/ExperimentInsertAge';
import { RootStoreContext } from '../../Stores/RootStore';
import { Checkbox, Container, Header } from 'semantic-ui-react';
import AdjustingSetFeedbackModal from '../../Components/Experiment/Modals/AdjustingSetFeedbackModal';
import AdjustingSetUserResponseModal from '../../Components/Experiment/Modals/AdjustingSetUserResponseModal';
import { FaKeyboard } from 'react-icons/fa';
import { BsFillBarChartFill } from 'react-icons/bs';

const ExperimentAdjustingPhasePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { conductedExperiment, adjustingSetImages } =
    rootStore.experimentsStore;

  const [imageIndex, setImageIndex] = useState(0);
  const [ageInserted, setAgeInserted] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [, setShowUserResponseModal] = useState(false);
  const [interfaceSelector, setInterfaceSelector] = useState(true);

  useEffect(() => {
    if (conductedExperiment === null) {
      history.push('/');
    }
  }, [conductedExperiment]);

  const handleInterfaceChange = () => {
    setInterfaceSelector((sel) => !sel);
  };

  const prepareNextImage = (age) => {
    if (imageIndex === adjustingSetImages.length) {
      setShowUserResponseModal(true);
    } else {
      setAgeInserted(age.value);
      setImageIndex((idx) => idx + 1);
      setShowFeedbackModal(true);
    }
  };

  return (
    <Container>
      <Header dividing className='my-4' as='h1'>
        <Header.Content>
          Faza wstępna
          <Header.Subheader>
            W tej fazie ocenisz 5 zdjęć. Po każdej ocenie, zostaniesz
            poinformowany o prawidłowym wieku osoby ze zdjęcia
          </Header.Subheader>
        </Header.Content>
        <Header as='div' floated='right'>
          <div className='interface-toggle'>
            <FaKeyboard size={25} />
            <Checkbox
              onChange={handleInterfaceChange}
              toggle
              checked={interfaceSelector}
            />
            <BsFillBarChartFill size={25} />
          </div>
        </Header>
      </Header>
      {imageIndex < adjustingSetImages.length && (
        <ExperimentInsertAge
          phase='ADJUSTING'
          image={adjustingSetImages[imageIndex].image}
          nextStep={prepareNextImage}
          interfaceSelector={interfaceSelector}
        />
      )}
      {imageIndex === adjustingSetImages.length && (
        <AdjustingSetUserResponseModal />
      )}
      {showFeedbackModal && (
        <AdjustingSetFeedbackModal
          open={showFeedbackModal}
          setOpen={setShowFeedbackModal}
          age={adjustingSetImages[Math.abs(imageIndex - 1) % 5].age}
          prediction={ageInserted}
        />
      )}
    </Container>
  );
};

export default observer(ExperimentAdjustingPhasePage);
