import React from 'react';
import { Form, Label, Container } from 'semantic-ui-react';

const TextInput = (props) => {
  return (
    <>
      <Form.Input
        label={props.label}
        icon={props.icon}
        iconPosition={props.iconPosition}
        error={props.meta.touched && !!props.meta.error}
        type={props.input.type}
        {...props.input}
        placeholder={props.placeholder}
        className={props.className}
        required={props.required}
        disabled={props.disabled}
        onMouseOver={props.onMouseOver}
        width={props.width}
      >
        {props.defaultValue}
      </Form.Input>
      {props.hideLabel ? (
        <></>
      ) : (
        <>
          {props.meta.touched && props.meta.error && (
            <Container textAlign='left'>
              <Label className='mf-mb-1' basic color='red'>
                {props.meta.error}
              </Label>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default TextInput;
