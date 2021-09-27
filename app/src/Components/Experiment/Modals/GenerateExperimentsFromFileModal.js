import React, { useContext, useState } from 'react';
import {
  Modal,
  Form,
  Table,
  Button,
  TextArea,
  Icon,
  Segment,
} from 'semantic-ui-react';
import csvtojson from 'csvtojson';
import { RootStoreContext } from '../../../Stores/RootStore';

const GenerateExperimentsFromFileModal = () => {
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState(null);
  const [addressesGenerated, setAddressesGenerated] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [fileContentFormatError, setFileContentFormatError] = useState(null);

  const rootStore = useContext(RootStoreContext);
  const { generateExperimentFile } = rootStore.experimentsStore;

  const handleTextAreaChange = (e, data) => {
    setFileContent(data.value);
  };

  const generateAddressesList = async () => {
    setFileContentFormatError(null);
    let addressesList = null;

    try {
      addressesList = await csvtojson({ noheader: true }).fromString(
        fileContent
      );
    } catch (e) {
      setFileContentFormatError(
        'Wprowadzona treść nie jest zgodna z formatem csv'
      );
    }

    const generated = new Array(addressesList.length);

    for (let i = 0; i < generated.length; i++) {
      generated[i] = null;
    }

    setAddresses(() => {
      setAddressesGenerated(generated);
      return addressesList;
    });
  };

  const handleExperimentsGeneration = async () => {
    for (const address of addresses) {
      try {
        await generateExperimentFile({ name: null, email: address.field1 });
        setAddressesGenerated((prev) => {
          const tmp = prev.slice();
          tmp[
            addresses.findIndex((add) => add.field1 === address.field1)
          ] = true;
          return tmp;
        });
      } catch (e) {
        setAddressesGenerated((prev) => {
          const tmp = prev.slice();
          tmp[
            addresses.findIndex((add) => add.field1 === address.field1)
          ] = false;
          return tmp;
        });
      }
    }
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button
          icon='file alternate'
          fluid
          content='Wygeneruj eksperymenty dla adresów e-mail z pliku'
        />
      }
    >
      <Modal.Header>Generowanie eksperymentów (*.csv)</Modal.Header>
      <Modal.Content>
        {addresses !== null ? (
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>E-mail</Table.HeaderCell>
                <Table.HeaderCell>Wygenerowano</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {addresses.map((address, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell>{address.field1}</Table.Cell>
                  <Table.Cell>
                    {addressesGenerated[idx] !== null ? (
                      addressesGenerated[idx] === true ? (
                        <Icon color='green' name='checkmark' size='large' />
                      ) : (
                        <Icon color='red' name='close' size='large' />
                      )
                    ) : (
                      ''
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <Form>
            {fileContentFormatError !== null && (
              <Segment color='red'>{fileContentFormatError}</Segment>
            )}
            <TextArea
              className='my-1'
              rows={20}
              placeholder='Wklej zawartość pliku (*.csv) zawierającego adresy e-mail uczestników eksperymentu'
              value={fileContent}
              onChange={handleTextAreaChange}
            />
            <Button
              onClick={generateAddressesList}
              disabled={fileContent.length === 0}
            >
              Generuj listę adresów
            </Button>
          </Form>
        )}
      </Modal.Content>
      <Modal.Actions>
        {addresses === null ? (
          <Button
            onClick={() => {
              setFileContent('');
              setOpen(false);
            }}
          >
            Zamknij
          </Button>
        ) : (
          <Button
            onClick={() => {
              setAddresses(null);
              setAddressesGenerated(null);
            }}
          >
            Powrót
          </Button>
        )}

        <Button
          disabled={addresses === null}
          positive
          onClick={handleExperimentsGeneration}
        >
          Generuj
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default GenerateExperimentsFromFileModal;
