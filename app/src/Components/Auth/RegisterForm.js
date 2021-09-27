import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../Forms/TextInput';

const RegisterForm = ({ register, error, linkRequested }) => {
  return (
    <>
      <FinalForm
        onSubmit={register}
        render={({ handleSubmit, invalid, pristine, submitting }) => (
          <Form size='large' className='pb-4' onSubmit={handleSubmit}>
            <Segment color='green'>
              <Field
                name='firstName'
                icon='user'
                iconPosition='left'
                placeholder='Wprowadź imię'
                type='text'
                required
                component={TextInput}
              />
              <Field
                name='lastName'
                icon='user outline'
                iconPosition='left'
                placeholder='Wprowadź nazwisko'
                type='text'
                required
                component={TextInput}
              />
              <Field
                name='email'
                icon='envelope'
                iconPosition='left'
                placeholder='Wprowadź email'
                disabled
                defaultValue={linkRequested.emailAssigned}
                type='email'
                required
                component={TextInput}
              />
              <Field
                name='password'
                icon='lock'
                iconPosition='left'
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
                Zarejestruj
              </Button>
            </Segment>
          </Form>
        )}
      />
      <>
        {error === true ? (
          <Segment color='red'>Rejestracja nie powiodła się</Segment>
        ) : (
          <></>
        )}
      </>
    </>
  );
};

export default RegisterForm;
