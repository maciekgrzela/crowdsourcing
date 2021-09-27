import React, { useState } from 'react';
import { Container, Segment, Header, Button, Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../Forms/TextInput';
import CheckboxInput from '../Forms/CheckboxInput';

const ModifyUsersData = ({ editInfoRef, editUserInfo, error, ok, user }) => {
  const [editPassword, setEditPassword] = useState(false);

  const modify = (values) => {
    editUserInfo(values, editPassword);
  };

  return (
    <Container className='my-4'>
      <div ref={editInfoRef}>
        <Header
          as='h1'
          dividing
          content='Dane użytkownika'
          subheader='Edytuj podstawowe dane identyfikujące Cię w aplikacji Crowdsourcing'
        />
        <FinalForm
          onSubmit={modify}
          render={({ handleSubmit, invalid, pristine, submitting, form }) => (
            <Form
              className='pb-4'
              onSubmit={async () => {
                await handleSubmit();
              }}
            >
              {error === true ? (
                <Segment color='red'>
                  Wystąpił błąd podczas modyfikacji danych użytkownika
                </Segment>
              ) : (
                <></>
              )}
              {ok === true ? (
                <Segment color='green'>
                  Dane użytkownika zostały zmienione. Efekt widoczny będzie od
                  następnego zalogowania
                </Segment>
              ) : (
                <></>
              )}
              <Field
                name='firstName'
                icon='user'
                label='Imię'
                iconPosition='left'
                placeholder='Wprowadź imię'
                type='text'
                defaultValue={user.firstName}
                required
                component={TextInput}
              />
              <Field
                name='lastName'
                icon='user outline'
                label='Nazwisko'
                defaultValue={user.lastName}
                iconPosition='left'
                placeholder='Wprowadź nazwisko'
                type='text'
                required
                component={TextInput}
              />
              <Field
                name='email'
                icon='envelope'
                label='Adres e-mail'
                defaultValue={user.email}
                iconPosition='left'
                placeholder='Wprowadź email'
                type='email'
                required
                component={TextInput}
              />
              <Field
                name='editPassword'
                placeholder='Zmiana hasła'
                required
                toggled={editPassword}
                onChange={() => setEditPassword(!editPassword)}
                component={CheckboxInput}
              />
              <Field
                name='oldPassword'
                icon='unlock'
                label='Stare hasło'
                iconPosition='left'
                placeholder='Wprowadź hasło'
                type='password'
                disabled={!editPassword}
                required
                component={TextInput}
              />
              <Field
                name='newPassword'
                icon='lock'
                label='Nowe hasło'
                iconPosition='left'
                disabled={!editPassword}
                placeholder='Wprowadź hasło'
                type='password'
                required
                component={TextInput}
              />
              <Button
                positive
                loading={submitting}
                disabled={invalid || pristine}
                fluid
              >
                Zmień dane
              </Button>
            </Form>
          )}
        />
      </div>
    </Container>
  );
};

export default ModifyUsersData;
