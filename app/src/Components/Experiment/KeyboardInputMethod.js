import React, { useEffect, useRef, useState } from 'react';
import { Button, Statistic, Icon } from 'semantic-ui-react';

const KeyboardInputMethod = ({ nextStep }) => {
  const [ageInserted, setAgeInserted] = useState(0);
  const [pressedKey, setPressedKey] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);

  const acceptBtnRef = useRef();

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('keydown', handleKeyDown);
    const elapsed = setInterval(() => {
      setTimeElapsed((te) => te + 1);
    }, 1);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(elapsed);
      setTimeElapsed(0);
    };
  }, []);

  const btnChangeAgeInserted = (e, data) => {
    const ageInsertedStr = ageInserted.toString();
    setAgeInserted((age) =>
      Number(age + data.children.toString()) > 100
        ? age
        : Number(ageInsertedStr + data.children.toString())
    );
  };

  const handleKeyDown = (e) => {
    if (e.code.includes('Digit')) {
      setPressedKey(Number(e.key));
      setAgeInserted((age) =>
        Number(age + e.key) > 100 ? age : Number(age + e.key)
      );
    } else if (e.code === 'Backspace') {
      setAgeInserted((age) => Number(age.toString().slice(0, -1)));
    } else if (e.code === 'Enter') {
      acceptBtnRef.current.props.onClick();
    }
  };

  const handleKeyUp = (e) => {
    setPressedKey('');
  };

  const handleApplyResponse = (e, data) => {
    if (ageInserted !== 0) {
      const results = { age: ageInserted, time: timeElapsed };
      setAgeInserted(0);
      setTimeElapsed(0);
      nextStep({ value: results.age, milliseconds: results.time });
    }
  };

  return (
    <div className='insert-age'>
      <div className='insert-age__input'>
        <Statistic>
          <Statistic.Value>{ageInserted}</Statistic.Value>
          <Statistic.Label>Wiek</Statistic.Label>
        </Statistic>
      </div>
      <div className='insert-age__buttons'>
        {[...Array(10).keys()]
          .slice(1)
          .concat(0)
          .map((index) => (
            <Button
              primary={pressedKey === index}
              className={index === 0 && 'insert-age__btn-zero'}
              key={index}
              onClick={btnChangeAgeInserted}
            >
              {index}
            </Button>
          ))}
      </div>
      <Button
        ref={acceptBtnRef}
        disabled={ageInserted === 0}
        style={{ marginTop: 20 }}
        icon
        onClick={handleApplyResponse}
        labelPosition='right'
      >
        <Icon name='arrow right' />
        Dalej
      </Button>
    </div>
  );
};

export default KeyboardInputMethod;
