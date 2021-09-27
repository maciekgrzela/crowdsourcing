import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { GiSoapExperiment } from 'react-icons/gi';

const ExperimentInvalidPage = () => {
  return (
    <Container className='invalid-experiment'>
      <GiSoapExperiment className='invalid-experiment__icon' />
      <Header textAlign='center' as='h1' className='invalid-experiment__header'>
        Eksperyment zakończył się lub ID eksperymentu jest niepoprawne
      </Header>
    </Container>
  );
};

export default ExperimentInvalidPage;
