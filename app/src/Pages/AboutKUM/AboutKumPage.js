import React, { useContext, useEffect } from 'react';
import { Container, Header } from 'semantic-ui-react';
import Footer from '../../Components/Containers/Footer';
import { RootStoreContext } from '../../Stores/RootStore';

const AboutKumPage = () => {
  const rootStore = useContext(RootStoreContext);
  const { setActiveNavbarItem } = rootStore.commonStore;

  useEffect(() => {
    setActiveNavbarItem('aboutUs');
  }, [setActiveNavbarItem]);

  return (
    <>
      <Container
        style={{ minHeight: 'calc(100vh - 210px)' }}
        className='mt-1'
        text
      >
        <Header
          as='h1'
          dividing
          content='Ko艂o uczenia maszyn - KUM! 馃惛'
          subheader='Kim jeste艣my i czym si臋 zajmujemy?'
        />
        <p>
          KUM, czyli Ko艂o Uczenia Maszyn to nowo powsta艂e ko艂o naukowe
          zrzeszaj膮ce student贸w i absolwent贸w Wydzia艂u Elektroniki Politechniki
          Wroc艂awskiej. Zajmujemy si臋 szeroko poj臋t膮 tematyk膮 Uczenia
          Maszynowego, pocz膮wszy od oceny dzia艂ania algorytm贸w, procesu ich
          optymalizacji, poprzez przeprowadzanie eksperyment贸w i bada艅
          naukowych, a偶 po realizacj臋 rozwi膮za艅 wykorzystuj膮cych algorytmy
          Uczenia Maszynowego w 偶yciu codziennym. Naszym celem jest nieustanne
          zdobywanie nowej wiedzy z zakresu uczenia maszyn, dzielenie si臋 t膮
          wiedz膮 z pozosta艂ymi cz艂onkami zespo艂u, a tak偶e wykorzystywanie jej
          podczas realizacji praktycznych projekt贸w.
        </p>
      </Container>
      <Footer />
    </>
  );
};

export default AboutKumPage;
