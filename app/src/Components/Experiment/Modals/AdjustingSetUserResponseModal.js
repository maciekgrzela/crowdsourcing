import React, { useContext, useState } from 'react';
import {
  Modal,
  Container,
  Button,
  Form,
  Rating,
  Label,
  Checkbox,
} from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { RootStoreContext } from '../../../Stores/RootStore';
import { observer } from 'mobx-react-lite';
import { history } from '../../../App';
import { FaKeyboard } from 'react-icons/fa';
import { BsFillBarChartFill } from 'react-icons/bs';
import TextInput from '../../Forms/TextInput';

const AdjustingSetUserResponseModal = () => {
  const rootStore = useContext(RootStoreContext);
  const { updateAdjustingInfo: updateAdjustingInfoAction } =
    rootStore.experimentsStore;

  const [open, setOpen] = useState(true);
  const [rating, setRating] = useState(3);
  const [interfaceSelector, setInterfaceSelector] = useState(false);

  const updateAdjustingInfo = async (values) => {
    let data = {
      participantAge: values.yourAge,
      feedbackForAdjustingSet: rating,
      inputInterface: interfaceSelector === true ? 'bar' : 'keyboard',
    };
    await updateAdjustingInfoAction(data);
    history.push('/experiment/primary/phase');
  };

  const handleRate = (e, data) => {
    setRating(data.rating);
  };

  const handleInterfaceChange = () => {
    setInterfaceSelector((sel) => !sel);
  };

  return (
    <Modal style={{ width: 500 }} onOpen={() => setOpen(true)} open={open}>
      <Modal.Header>Mamy kilka pytań</Modal.Header>
      <Modal.Content>
        <Container className='mb-0' fluid>
          <FinalForm
            onSubmit={updateAdjustingInfo}
            validate={(data) =>
              data.yourAge === undefined ||
              Number(data.yourAge) < 0 ||
              Number(data.yourAge) > 100
                ? 'invalid'
                : true
            }
            render={({ handleSubmit, invalid, pristine, submitting }) => (
              <Form className='pb-4' onSubmit={handleSubmit}>
                <Container textAlign='center' className='mb-3'>
                  <Label
                    size='big'
                    style={{ display: 'block' }}
                    pointing='below'
                  >
                    Czy to zadanie było trudne?
                  </Label>
                  <Rating
                    la
                    maxRating={5}
                    defaultRating={3}
                    rating={rating}
                    icon='star'
                    size='massive'
                    onRate={handleRate}
                  />
                  <Label
                    size='big'
                    className='mt-2'
                    style={{ display: 'block' }}
                    pointing='below'
                  >
                    Ile masz lat?
                  </Label>
                  <Field
                    name='yourAge'
                    icon='age'
                    placeholder='Wprowadź wiek'
                    type='number'
                    required
                    component={TextInput}
                  />
                  <Label
                    size='big'
                    className='mt-2'
                    style={{ display: 'block' }}
                    pointing='below'
                  >
                    Który interfejs wprowadzania danych wybierasz?
                  </Label>
                  <Container
                    textAlign='center'
                    fluid
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <div className='interface-toggle'>
                      <FaKeyboard size={25} />
                      <Checkbox
                        onChange={handleInterfaceChange}
                        toggle
                        checked={interfaceSelector}
                      />
                      <BsFillBarChartFill size={25} />
                    </div>
                  </Container>
                </Container>
                <Button
                  positive
                  loading={submitting}
                  disabled={invalid || pristine}
                  fluid
                >
                  Przejdź do fazy głównej
                </Button>
              </Form>
            )}
          />
        </Container>
      </Modal.Content>
    </Modal>
  );
};

export default observer(AdjustingSetUserResponseModal);
