import React, { useState } from 'react';
import { Modal, Container, Button, Header, Statistic } from 'semantic-ui-react';
import { history } from '../../../App';

const ExperimentRenewModal = ({
  indexesAllCount,
  indexesLabeledCount,
  abandon,
  timeElapsedFromStart,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <Modal onOpen={() => setOpen(true)} open={open}>
      <Modal.Header>Wznów eksperyment!</Modal.Header>
      <Modal.Content>
        <Container text>
          <Header
            as='h1'
            dividing
            content='Twój postęp'
            subheader='Stopień ukończenia eksperymentu'
          />
          <Statistic.Group className='renew-experiment-labels m-3'>
            <Statistic>
              <Statistic.Value>{indexesLabeledCount}</Statistic.Value>
              <Statistic.Label>Oznaczone</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{indexesAllCount}</Statistic.Value>
              <Statistic.Label>Wszystkie</Statistic.Label>
            </Statistic>
          </Statistic.Group>
          <Header
            as='h1'
            dividing
            content='Twój postęp'
            subheader='Czas od rozpoczęcia eksperymentu'
          />
          <Statistic.Group className='renew-experiment-labels m-3'>
            <Statistic>
              <Statistic.Value>
                {new Date(timeElapsedFromStart * 1000)
                  .toISOString()
                  .substr(11, 8)}
              </Statistic.Value>
              <Statistic.Label>Minęło</Statistic.Label>
            </Statistic>
          </Statistic.Group>
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
            history.push('/experiment/primary/phase');
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ExperimentRenewModal;
