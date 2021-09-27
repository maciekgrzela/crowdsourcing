import React, { useState } from 'react';
import { Container, Header, Segment, Form, Button } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../Forms/TextInput';
import GenerateExperimentsFromFileModal from '../Experiment/Modals/GenerateExperimentsFromFileModal';

const InviteToExperiment = ({ generateExperiment, error, ok }) => {
  const [fieldCounter, setFieldCounter] = useState(1);

  const addFormField = () => {
    setFieldCounter((ctr) => ctr + 1);
  };

  return (
    <Container className='my-4'>
      <Header
        as='h1'
        dividing
        content='Zaproszenia do eksperymentu'
        subheader='Wygeneruj nowy eksperyment i wyślij jego link na adres e-mail'
      />
      {[...Array(fieldCounter).keys()].map((idx) => (
        <FinalForm
          key={idx}
          onSubmit={generateExperiment}
          render={({ handleSubmit, invalid, pristine, submitting, form }) => (
            <Form
              className='add-participant-form'
              onSubmit={async () => {
                await handleSubmit();
                form.reset();
              }}
            >
              {error === true ? (
                <Segment color='red'>
                  Wystąpił błąd podczas wysyłania wiadomości email
                </Segment>
              ) : (
                <></>
              )}
              {ok === true ? (
                <Segment color='green'>Wiadomość email została wysłana</Segment>
              ) : (
                <></>
              )}
              <Form.Group className='add-participant-form__group'>
                <Field
                  name='email'
                  icon='envelope'
                  iconPosition='left'
                  placeholder='Wprowadź email'
                  className='add-participant-form__input'
                  type='email'
                  required
                  component={TextInput}
                />
                <Form.Button
                  positive
                  loading={submitting}
                  className='add-participant-form__button'
                  disabled={invalid || pristine}
                >
                  Zapisz!
                </Form.Button>
              </Form.Group>
            </Form>
          )}
        />
      ))}
      <Button onClick={addFormField}>Jeszcze jeden e-mail</Button>
      <Header
        as='h1'
        dividing
        content='Zaproszenia do eksperymentu'
        subheader='Wprowadź adresy e-mail z pliku (*.csv)'
      />
      <GenerateExperimentsFromFileModal />
    </Container>
  );
};

export default InviteToExperiment;
