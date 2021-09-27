import React from 'react';
import { Header } from 'semantic-ui-react';

const ExperimentHello = () => {
  return (
    <>
      <Header
        as='h1'
        dividing
        content='Witaj w Crowdsourcing App!'
        subheader='Przeczytaj, aby dowiedzieć się czym jest aplikacja Crowdsourcing'
      />
      <p>
        Oto premierowy projekt realizowany przez Koło Uczenia Maszyn, którego
        celem jest przeprowadzenie badań wykorzystujących pozyskiwanie wiedzy od
        tłumu. W skrócie - Crowdsourcing. Aplikacja, z której aktualnie
        korzystasz stanowi narzędzie, dzięki któremu Ty drogi użytkowniku,
        możesz stać się ważną częścią naszego eksperymentu, dzieląc się z nami
        swoją wiedzą i doświadczeniem.
      </p>
      <p>
        Badanie, w którym weźmiesz udział, powinno zająć około kilku minut.
        Oczywiście, w dowolnym momencie jego trwania możesz to badanie przerwać,
        aby następnie powrócić do jego realizacji, wtedy kiedy będziesz miał na
        to ochotę.
      </p>
      <p>
        Pamiętaj, odpowiedzi których udzielasz w ramach niniejszego eksperymentu
        nie muszą być poprawne, pozwól działać swojej intuicji.
      </p>
      <p>Będziemy niezmiernie wdzięczni za Twoją pomoc! 😃</p>
    </>
  );
};

export default ExperimentHello;
