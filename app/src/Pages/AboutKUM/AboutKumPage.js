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
          content='Koło uczenia maszyn - KUM! 🐸'
          subheader='Kim jesteśmy i czym się zajmujemy?'
        />
        <p>
          KUM, czyli Koło Uczenia Maszyn to nowo powstałe koło naukowe
          zrzeszające studentów i absolwentów Wydziału Elektroniki Politechniki
          Wrocławskiej. Zajmujemy się szeroko pojętą tematyką Uczenia
          Maszynowego, począwszy od oceny działania algorytmów, procesu ich
          optymalizacji, poprzez przeprowadzanie eksperymentów i badań
          naukowych, aż po realizację rozwiązań wykorzystujących algorytmy
          Uczenia Maszynowego w życiu codziennym. Naszym celem jest nieustanne
          zdobywanie nowej wiedzy z zakresu uczenia maszyn, dzielenie się tą
          wiedzą z pozostałymi członkami zespołu, a także wykorzystywanie jej
          podczas realizacji praktycznych projektów.
        </p>
      </Container>
      <Footer />
    </>
  );
};

export default AboutKumPage;
