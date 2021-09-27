import React, { useContext, useEffect } from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';
import logo from '../../Assets/Images/logo.png';
import { RootStoreContext } from '../../Stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import RegisterForm from '../../Components/Auth/RegisterForm';

const RegisterPage = () => {
  const rootStore = useContext(RootStoreContext);
  const { verifyRegistrationLink, registrationLinkRequested } =
    rootStore.registrationLinksStore;
  const {
    registrationErrorOccurred,
    register: registerAction,
    setActiveNavbarItem,
  } = rootStore.commonStore;
  const { id } = useParams();

  useEffect(() => {
    setActiveNavbarItem('registerPage');
    const verify = async () => {
      await verifyRegistrationLink(id);
    };

    verify();
  }, [id, setActiveNavbarItem, verifyRegistrationLink]);

  const register = async (values) => {
    await registerAction(values, registrationLinkRequested._id);
  };

  return (
    <>
      {registrationLinkRequested !== null && (
        <Grid
          textAlign='center'
          style={{ display: 'flex', height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2'>
              <Image src={logo} />
              <Header.Content>
                Utwórz nowe konto
                <Header.Subheader>
                  i zarządzaj przeprowadzanymi eksperymentami
                </Header.Subheader>
              </Header.Content>
            </Header>
            <RegisterForm
              register={register}
              error={registrationErrorOccurred}
              linkRequested={registrationLinkRequested}
            />
          </Grid.Column>
        </Grid>
      )}
    </>
  );
};

export default observer(RegisterPage);
