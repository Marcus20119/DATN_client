import { memo, useEffect, useState } from 'react';
import { OutputPLC } from '../PLC';

interface ICountDownToggleTime {
  minuteName: string;
  secondName: string;
  tOn: number;
  tOff: number;

  isTOn: boolean;
}

const CountDownToggleTime: React.FC<ICountDownToggleTime> = memo(
  ({ minuteName, secondName, isTOn, tOff, tOn }) => {
    // const [currentT, setCurrentT] = useState(isT1 ? t1 : t2);
    // const [countdown, setCountdown] = useState(currentT);

    let minuteValue = isTOn ? Math.floor(tOn / 60) : Math.floor(tOff / 60);
    let secondValue = isTOn ? tOn % 60 : tOff % 60;
    return (
      <div className="flex gap-2">
        <OutputPLC name={minuteName} value={minuteValue} unit="Phút" />
        <OutputPLC name={secondName} value={secondValue} unit="Giây" />
      </div>
    );
  }
);

export { CountDownToggleTime };
