import React from 'react';
import { useState } from 'react';
import { render } from 'react-dom';
import { useEffect } from 'react';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(null);
  const [timer, setTimer] = useState(null);

  //time in seconds
  const formatTime = (sec) => {
    let seconds = sec % 60;
    let minutes = Math.floor(sec / 60);
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    return `${minutes}:${seconds}`;
  };

  const formattedTime = formatTime(time);

  const startTimer = () => {
    setTime(1200);
    setStatus('work');
    setInterval(() => {
      setTime((time) => time - 1);
      // Why does not work?
      // if (time === 0) {
      //   status === 'work' ? setStatus('rest') : setStatus('work');
      //   status === 'rest' ? setTime(20) : setTime(1200);
      // }
    }, 1);
  };
  // Why is this strange Syntax?
  useEffect(() => {
    if (time === 0) {
      status === 'work' ? setStatus('rest') : setStatus('work');
      status === 'rest' ? setTime(20) : setTime(1200);
    }
  }, [time]);

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && (
        <div>
          <p>
            According to optometrists in order to save your eyes, you should
            follow the 20/20/20. It means you should to rest your eyes every 20
            minutes for 20 seconds by looking more than 20 feet away.
          </p>
          <p>
            This app will help you track your time and inform you when it's time
            to rest.
          </p>
        </div>
      )}
      {status === 'work' && <img src='./images/work.png' />}
      {status === 'rest' && <img src='./images/rest.png' />}
      {status !== 'off' && <div className='timer'>{formattedTime}</div>}
      {status === 'off' && (
        <button onClick={startTimer} className='btn'>
          Start
        </button>
      )}
      {status !== 'off' && <button className='btn'>Stop</button>}
      <button className='btn btn-close'>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
