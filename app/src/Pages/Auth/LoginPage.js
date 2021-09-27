import React, { useContext, useEffect } from 'react';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import logo from '../../Assets/Images/logo.png';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../Components/Forms/TextInput';
import { RootStoreContext } from '../../Stores/RootStore';
import { observer } from 'mobx-react-lite';

const LoginPage = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    login: loginAction,
    loginErrorOccurred,
    setActiveNavbarItem,
  } = rootStore.commonStore;

  useEffect(() => {
    setActiveNavbarItem('loginPage');
  }, [setActiveNavbarItem]);

  const login = async (values) => {
    await loginAction(values);
  };

  return (
    <Grid
      textAlign='center'
      style={{ display: 'flex', height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2'>
          <Image src={logo} />
          <Header.Content>
            Zaloguj się do
            <Header.Subheader>
              panelu zarządzania eksperymentami
            </Header.Subheader>
          </Header.Content>
        </Header>
        <FinalForm
          onSubmit={login}
          render={({ handleSubmit, invalid, pristine, submitting }) => (
            <Form size='large' className='pb-4' onSubmit={handleSubmit}>
              <Segment color='green'>
                <Field
                  name='email'
                  icon='envelope'
                  iconPosition='left'
                  placeholder='Wprowadź email'
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
                  Zaloguj
                </Button>
              </Segment>
            </Form>
          )}
        />
        {loginErrorOccurred === true ? (
          <Segment color='red'>Logowanie nie powiodło się</Segment>
        ) : (
          <></>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(LoginPage);
