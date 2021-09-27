import React, { useEffect, useState } from 'react';
import { Statistic } from 'semantic-ui-react';
import old from '../../Assets/Images/agebar-icons/old.svg';
import middleAge from '../../Assets/Images/agebar-icons/middle-age.svg';
import young from '../../Assets/Images/agebar-icons/young.svg';
import toddler from '../../Assets/Images/agebar-icons/toddler.svg';
import mature from '../../Assets/Images/agebar-icons/mature.svg';

const AgeBarInputMethod = ({ nextStep }) => {
  const [ageInserted, setAgeInserted] = useState(0);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const progressBarHeight = 270;

  useEffect(() => {
    const elapsed = setInterval(() => {
      setTimeElapsed((te) => te + 1);
    }, 1);

    return () => {
      clearInterval(elapsed);
      setTimeElapsed(0);
    };
  }, []);

  const progressBarHover = (e) => {
    if (e.nativeEvent.target.className.endsWith('space-wrapper')) {
      setIndicatorPosition(progressBarHeight - e.nativeEvent.offsetY);
      setAgeInserted(
        (
          ((progressBarHeight - e.nativeEvent.offsetY) / progressBarHeight) *
          100
        ).toFixed(0)
      );
    }
  };

  const progressBarSetAge = (e) => {
    if (indicatorPosition !== 0) {
      nextStep({ value: ageInserted, milliseconds: timeElapsed });
      setTimeElapsed(0);
    }
  };

  return (
    <div className='agebar'>
      <div className='agebar__result'>
        <Statistic>
          <Statistic.Value>{ageInserted}</Statistic.Value>
          <Statistic.Label>Wybrany wiek</Statistic.Label>
        </Statistic>
      </div>
      <div className='agebar__bar'>
        <div className='volume-bar'>
          <div className='volume-bar__icons'>
            <img width={35} height={35} src={old} alt='' />
            <img width={35} height={35} src={mature} alt='' />
            <img width={35} height={35} src={middleAge} alt='' />
            <img width={35} height={35} src={young} alt='' />
            <img width={35} height={35} src={toddler} alt='' />
          </div>
          <div
            className='volume-bar__progress'
            onMouseMove={progressBarHover}
            onClick={progressBarSetAge}
          >
            <div className='volume-bar__space-wrapper'>
              <div className='volume-bar__space'></div>
              <div className='volume-bar__space'></div>
              <div className='volume-bar__space'></div>
              <div className='volume-bar__space'></div>
              <div className='volume-bar__space'></div>
              <div className='volume-bar__space'></div>
              <div className='volume-bar__space'></div>
              <div className='volume-bar__space'></div>
              <div className='volume-bar__space'></div>
              <div className='volume-bar__space'></div>
              <div className='volume-bar__space'></div>
              <div
                className='volume-bar__indicator'
                style={{ bottom: indicatorPosition }}
              ></div>
            </div>
          </div>
          <ul className='volume-bar__labels'>
            <li>1</li>
            <li>10</li>
            <li>20</li>
            <li>30</li>
            <li>40</li>
            <li>50</li>
            <li>60</li>
            <li>70</li>
            <li>80</li>
            <li>90</li>
            <li>100</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgeBarInputMethod;
