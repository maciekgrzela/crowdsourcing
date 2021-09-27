import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Header, Form, Segment, Button } from 'semantic-ui-react';
import TextInput from '../../Components/Forms/TextInput';
import CheckboxInput from '../../Components/Forms/CheckboxInput';
import { RootStoreContext } from '../../Stores/RootStore';
import { observer } from 'mobx-react-lite';

const JoinExperimentForm = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    generateExperiment: generateExperimentAction,
    experimentGenerated,
    errorOccurred,
  } = rootStore.experimentsStore;

  const generateExperiment = async (values) => {
    await generateExperimentAction(values);
  };

  return (
    <>
      <Header
        as='h1'
        dividing
        content='Zainteresowany 🤔?'
        subheader='Wprowadź swój e-mail i stań się częścią eksperymentu'
      />
      <FinalForm
        onSubmit={generateExperiment}
        render={({ handleSubmit, invalid, pristine, submitting }) => (
          <Form className='pb-4' onSubmit={handleSubmit}>
            {errorOccurred === true ? (
              <Segment color='red'>
                Wystąpił błąd podczas wysyłania wiadomości email
              </Segment>
            ) : (
              <></>
            )}
            {experimentGenerated === true ? (
              <Segment color='green'>
                Wiadomość została wysłana. Sprawdź swoją skrzynkę pocztową
              </Segment>
            ) : (
              <></>
            )}
            <Field
              name='name'
              icon='user'
              label='Imię'
              iconPosition='left'
              placeholder='Wprowadź imię'
              type='text'
              required
              component={TextInput}
            />
            <Field
              name='email'
              icon='envelope'
              label='Adres e-mail'
              iconPosition='left'
              placeholder='Wprowadź email'
              type='email'
              required
              component={TextInput}
            />
            <Field
              name='consent'
              icon='user'
              iconPosition='left'
              placeholder='Zapoznałem się z zasadami eksperymentu'
              required
              toggled={true}
              disabled={true}
              component={CheckboxInput}
            />
            <Button
              positive
              loading={submitting}
              disabled={invalid || pristine}
              fluid
            >
              Dołącz!
            </Button>
          </Form>
        )}
      />
    </>
  );
};

export default observer(JoinExperimentForm);
