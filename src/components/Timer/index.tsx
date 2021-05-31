import React, { useEffect, useState } from 'react';
import './index.scss';
enum heightSizeEnum {
  tiny = '2rem',
  small = '2rem',
  normal = '2rem',
  large = '4rem'
}

export type size = 'tiny' | 'small' | 'normal' | 'large';
export interface TimerProps {
  size?: size;
  // [key: string]: any;
}

const Timer = (props: TimerProps) => {
  const [ timeStr, setTimeStr ] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    let timer = setInterval(() => {
      setTimeStr(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      timer && clearInterval(timer);
    };
  }, []);

  const alertNow = () => {
    window.alert(timeStr);
  };
  //同步更新： 我们推荐你一开始先用 useEffect，只有当它出问题的时候再尝试使用 useLayoutEffect。

  return (
    <React.Fragment>
      <div className="bg-secondary p-relative" style={{ height: heightSizeEnum[props.size || 'normal'] }}>
        <div className={` clock c-hand p-2 text-center text-${props.size} type-${props.size} `} onClick={alertNow}>
          {timeStr}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Timer;
