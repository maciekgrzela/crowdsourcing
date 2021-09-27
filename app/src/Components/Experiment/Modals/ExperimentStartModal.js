import React, { useState } from 'react';
import { Modal, Container, Button } from 'semantic-ui-react';
import { history } from '../../../App';
import ExperimentRules from '../ExperimentRules';

const ExperimentStartModal = ({ abandon }) => {
  const [open, setOpen] = useState(true);

  return (
    <Modal onOpen={() => setOpen(true)} open={open}>
      <Modal.Header>Rozpoczynamy!</Modal.Header>
      <Modal.Content>
        <Container text>
          <ExperimentRules />
        </Container>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color='black'
          onClick={() => {
            setOpen(false);
            abandon();
          }}
        >
          Rezygnuję
        </Button>
        <Button
          content='Zaczynam!'
          labelPosition='right'
          icon='checkmark'
          onClick={() => {
            setOpen(false);
            history.push('/experiment/adjusting/phase');
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ExperimentStartModal;
