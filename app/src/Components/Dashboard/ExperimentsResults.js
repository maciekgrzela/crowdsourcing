import React from 'react';
import { Container, Header, Statistic, Button } from 'semantic-ui-react';

const ExperimentsResults = ({ all, notStarted, finished, download }) => {
  return (
    <Container className='my-4'>
      <Header
        as='h1'
        dividing
        content='Wyniki eksperymentów'
        subheader='Wygeneruj plik z wynikami ukończonych dotychczas eksperymentów'
      />
      <Statistic.Group className='experiments-stats my-2'>
        <Statistic>
          <Statistic.Value>{notStarted.length}</Statistic.Value>
          <Statistic.Label>Nierozpoczęte</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            {all.length - (notStarted.length + finished.length)}
          </Statistic.Value>
          <Statistic.Label>Rozpoczęte</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{finished.length}</Statistic.Value>
          <Statistic.Label>Zakończone</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>=</Statistic.Value>
          <Statistic.Label></Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{all.length}</Statistic.Value>
          <Statistic.Label>Wszystkie</Statistic.Label>
        </Statistic>
      </Statistic.Group>
      <Button
        fluid
        icon='download'
        disabled={finished.length <= 0}
        content='Pobierz wyniki ukończonych eksperymentów'
        onClick={download}
      />
    </Container>
  );
};

export default ExperimentsResults;
