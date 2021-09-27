import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { GiServerRack } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const InternalErrorPage = () => {
  return (
    <Container className='invalid-register-token'>
      <GiServerRack className='invalid-register-token__icon' />
      <Header
        textAlign='center'
        as='h1'
        className='invalid-register-token__header'
      >
        Wystąpił błąd związany z działaniem serwera aplikacji.
      </Header>
      <Header
        textAlign='center'
        as='h2'
        className='invalid-register-token__header'
      >
        Wróć do <Link to='/'>strony głównej</Link>
      </Header>
    </Container>
  );
};

export default InternalErrorPage;
