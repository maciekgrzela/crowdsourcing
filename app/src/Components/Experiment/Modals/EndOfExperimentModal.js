import React, { useState } from 'react';
import { Modal, Container, Button, Header } from 'semantic-ui-react';
import { history } from '../../../App';

const EndOfExperimentModal = () => {
  const [open, setOpen] = useState(true);

  return (
    <Modal onOpen={() => setOpen(true)} open={open}>
      <Modal.Header>Dziękujemy 💗!</Modal.Header>
      <Modal.Content>
        <Container text>
          <Header
            as='h1'
            dividing
            content='Eksperyment zakończył się'
            subheader='Dziękujemy za wzięcie udziału w eksperymencie'
          />
          <p>
            To już koniec tego eksperymentu. Jesteśmy Ci wdzięczni za czas,
            który poświęciłeś, aby stać się jego częścią 😀
          </p>
        </Container>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content='Zakończ'
          labelPosition='right'
          icon='checkmark'
          onClick={() => {
            setOpen(false);
            history.push('/');
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default EndOfExperimentModal;
