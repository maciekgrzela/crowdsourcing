import React from 'react';
import { Image, Grid } from 'semantic-ui-react';
import AgeBarInputMethod from './AgeBarInputMethod';
import KeyboardInputMethod from './KeyboardInputMethod';

const ExperimentInsertAge = ({ image, nextStep, phase, interfaceSelector }) => {
  return (
    <Grid textAlign='center' className='main-page' verticalAlign='middle'>
      <Grid.Row stretched columns={2}>
        <Grid.Column>
          <Image
            rounded
            bordered
            centered
            src={
              phase === 'ADJUSTING'
                ? require(`../../Assets/Images/adjusting-set/${image}`).default
                : `http://156.17.43.89/kum/${image}.jpg`
            }
            size='medium'
          />
        </Grid.Column>
        <Grid.Column className='main-page__insert-age'>
          {interfaceSelector === true ? (
            <AgeBarInputMethod nextStep={nextStep} />
          ) : (
            <KeyboardInputMethod nextStep={nextStep} />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ExperimentInsertAge;
