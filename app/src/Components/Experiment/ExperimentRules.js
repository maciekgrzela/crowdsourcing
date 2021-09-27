import React from 'react';
import { Header } from 'semantic-ui-react';

const ExperimentRules = () => {
  return (
    <>
      <Header
        as='h1'
        dividing
        content='Zasady przeprowadzania eksperymentu'
        subheader='Jak to działa i co należy robić?'
      />
      <p>Eksperyment przebiega w następujący sposób:</p>
      <ol className='experiment-rules'>
        <li className='experiment-rules__item'>
          Pojedynczo będą pokazywać się zdjęcia znanych osób. Twoim zadaniem
          jest określenie, w jakim wieku jest osoba na zdjęciu. Ważne – pytanie
          dotyczy momentu zrobienia zdjęcia, jeśli widzisz, że zdjęcie zostało
          zrobione dawno, ale osoba na nim będąca jest młoda – wpisz młody wiek
          tej osoby.
        </li>
        <li className='experiment-rules__item'>
          Po każdym z pierwszych pięciu zdjęć otrzymasz informację zwrotną o
          faktycznym wieku danej postaci. W ramach tego etapu, będziesz mógł
          zweryfikować na ile Twoja intuicja Cię nie zawodzi, a także dostosować
          pewne technikalia eksperymentu, takie jak np. interfejs wprowadzania
          danych.
        </li>
        <li className='experiment-rules__item'>
          Podczas etapu wstępnego masz możliwość skorzystania z dwóch sposobów
          wprowadzania odpowiedzi. Zapoznaj się z oboma i zdecyduj, który jest
          dla Ciebie wygodniejszy. Przed przystąpieniem do właściwej części
          eksperymentu musisz zdecydować się na jeden z nich.
        </li>
        <li className='experiment-rules__item'>
          Następnie zostaniesz poproszony/a o określenie skali trudności
          zadania, które wykonałeś, a także podanie swojego wieku. W
          5-gwiazdkowej skali trudności wybór 5 gwiazdek oznacza największą
          trudność.
        </li>
        <li className='experiment-rules__item'>
          Po zakończeniu części wstępnej zostaniesz poproszony/a o ocenę wieku
          osób, przedstawionych na 50 zdjęciach. Każde kolejne zdjęcie,
          wyświetlać będzie się od razu po wprowadzeniu wieku dla zdjęcia
          poprzedniego. Nie będzie możliwości powrotu do zdjęcia poprzedniego
          ani ominięcia obrazu aktualnego. Nie uzyskasz także informacji
          zwrotnej o faktycznym wieku osoby, której twarz widnieje na zdjęciu.
        </li>
      </ol>
    </>
  );
};

export default ExperimentRules;
