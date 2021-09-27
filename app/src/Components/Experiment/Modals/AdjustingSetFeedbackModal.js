import React, { useEffect, useState } from 'react';
import { Modal, Container, Message, Statistic, Icon } from 'semantic-ui-react';

const AdjustingSetFeedbackModal = ({ age, prediction, open, setOpen }) => {
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    let clock = setInterval(() => {
      setCounter((cnt) => {
        if (cnt === 0) {
          clearInterval(clock);
          setOpen(false);
          return 0;
        } else {
          return cnt - 1;
        }
      });
    }, 1000);
  }, [setOpen]);

  return (
    <Modal style={{ width: 500 }} onOpen={() => setOpen(true)} open={open}>
      <Modal.Header>
        <Message icon positive>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>
              Następne zdjęcie za: {`00:0${counter}s`}
            </Message.Header>
          </Message.Content>
        </Message>
      </Modal.Header>
      <Modal.Content>
        <Container fluid>
          <Statistic.Group className='adjusting-feedback-labels my-4'>
            <Statistic>
              <Statistic.Value>{prediction}</Statistic.Value>
              <Statistic.Label>Twoja predykcja</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{age}</Statistic.Value>
              <Statistic.Label>Faktyczny wiek</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Container>
      </Modal.Content>
    </Modal>
  );
};

export default AdjustingSetFeedbackModal;
