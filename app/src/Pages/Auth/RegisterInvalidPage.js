import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { GoIssueClosed } from 'react-icons/go';

const RegisterInvalidPage = () => {
  return (
    <Container className='invalid-register-token'>
      <GoIssueClosed className='invalid-register-token__icon' />
      <Header
        textAlign='center'
        as='h1'
        className='invalid-register-token__header'
      >
        Struktura tokenu rejestracyjnego jest niepoprawna lub token wygasł
      </Header>
    </Container>
  );
};

export default RegisterInvalidPage;
