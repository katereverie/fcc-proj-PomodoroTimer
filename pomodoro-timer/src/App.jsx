import { useState } from 'react'
import './App.css'

export default function App() {

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(`25:00`);

  const decrement = (e) => {

    if (e.target.id === 'break-decrement') setBreakLength(prevBreakLength => {
      return prevBreakLength === 1? prevBreakLength: prevBreakLength - 1;
    });
    if (e.target.id === 'session-decrement') setSessionLength(prevSessionLength => {
      if (prevSessionLength === 1) return prevSessionLength;
      const newSessionLength = prevSessionLength - 1;
      setTimeLeft(`${newSessionLength}:00`);
      return newSessionLength;
      });
  }

  const increment = (e) => {
    
    if (e.target.id === 'break-increment') setBreakLength(prevBreakLength => {
      return prevBreakLength === 60? prevBreakLength: prevBreakLength + 1;
    });
    if (e.target.id === 'session-increment') setSessionLength(prevSessionLength => {
      if (prevSessionLength === 60) return prevSessionLength;
      const newSessionLength = prevSessionLength + 1;
      setTimeLeft(`${newSessionLength}:00`);
      return newSessionLength;
    });
  }

  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(`25:00`);
  }

  const handleTimer = () => {
    console.log(timeLeft);
  }


  return (
      <>
        <div id='break-session-wrapper'>
          <div className='wrapper'>
              <label id='break-label'>Break Length</label>
              <div className='btn-wrapper'>
                  <button id='break-increment' onClick={increment}>+</button>
                  <div id='break-length'>{breakLength}</div>
                  <button id='break-decrement' onClick={decrement}>-</button>
              </div>
          </div>
          <div className='wrapper'>
              <label id='session-label'>Session Length</label>
              <div className='btn-wrapper'>
                  <button id='session-increment' onClick={increment}>+</button>
                  <div id='session-length'>{sessionLength}</div>
                  <button id='session-decrement' onClick={decrement}>-</button>
              </div>
          </div>
        </div>
        <div className='wrapper'>
            <label id='timer-label'>Session</label>
            <div id='time-left'>{timeLeft}</div>
            <button id='start_stop' onClick={handleTimer}>Start/Stop</button>
            <button id='reset' onClick={reset}>Reset</button>
            <audio id='beep'></audio>
        </div>
      </>
  )
}


