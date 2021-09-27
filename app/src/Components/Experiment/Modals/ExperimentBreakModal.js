import React, { useState } from 'react';
import { Modal, Container, Button, Header } from 'semantic-ui-react';
import { history } from '../../../App';

const ExperimentBreakModal = () => {
  const [open, setOpen] = useState(true);

  return (
    <Modal onOpen={() => setOpen(true)} open={open}>
      <Modal.Header>Czas na przerwę!</Modal.Header>
      <Modal.Content>
        <Container text>
          <Header
            as='h1'
            dividing
            content='Eksperyment został przerwany'
            subheader='Wznów etykietowanie zdjęć w dowolnym momencie'
          />
          <p>
            Eksperyment, w którym bierzesz udział właśnie został przerwany. W
            dowolnym momencie możesz jednak do niego wrócić poprzez wejście w
            link, który dostałeś w wiadomości e-mail. Twoje dotychczasowe
            postępy zostały zapisane, więc nie martw się że będziesz musiał
            rozpoczynać eksperyment od nowa 😉.
          </p>
        </Container>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content='Przerwij'
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

export default ExperimentBreakModal;
