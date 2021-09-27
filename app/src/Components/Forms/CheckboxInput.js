import React, { useState, useEffect } from 'react';
import { Checkbox, Form, Label, Container } from 'semantic-ui-react';

const CheckboxInput = ({
  input,
  width,
  toggled,
  label,
  onChange,
  toggle,
  checked,
  placeholder,
  required,
  disabled,
  meta: { touched, error },
}) => {
  const [initialToggled, setInitialToggled] = useState(toggled);

  useEffect(() => {
    setInitialToggled(toggled);
  }, [toggled]);

  return (
    <Form.Field error={touched && !!error} width={width}>
      {label ? (
        <Container className='mf-flex'>
          <Label className='mf-mb-1' color='red' size='large'>
            {label}
          </Label>
          <Checkbox
            {...input}
            required
            disabled={disabled}
            style={{ marginTop: '0.2rem' }}
            className='mf-ml-2'
            label={placeholder}
            checked={initialToggled}
            onChange={(e, data) => {
              onChange();
              input.onChange(data.checked);
              setInitialToggled(data.checked);
            }}
            toggle={toggle}
          />
        </Container>
      ) : (
        <Checkbox
          {...input}
          required
          disabled={disabled}
          onChange={onChange}
          label={placeholder}
          checked={initialToggled}
          toggle={toggle}
        />
      )}
    </Form.Field>
  );
};

export default CheckboxInput;
