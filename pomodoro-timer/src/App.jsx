import { useState } from 'react'
import './App.css'

export default function App() {

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(`25:00`);

  const decrement = (e) => {
    // consistent with increment, convert to number
    const value = Number(e.target.value);
    if (value === 1 ) return;
    if (e.target.id === 'break-decrement') setBreakLength(value - 1);
    if (e.target.id === 'session-decrement') {
      setSessionLength(() => {
        const newSessionLength = value - 1;
        setTimeLeft(`${newSessionLength}:00`);
        return newSessionLength;
      });
    }
      
    
  }

  const increment = (e) => {
    // conver string value to number
    const value = Number(e.target.value);
    if (value === 60) return;
    if (e.target.id === 'break-increment') setBreakLength(value + 1);
    if (e.target.id === 'session-increment') {
      setSessionLength(() => {
        const newSessionLength = value + 1;
        setTimeLeft(`${newSessionLength}:00`);
        return newSessionLength;
      });
    }
  }

  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(`25:00`);
  }


  return (
      <>
        <div id='break-session-wrapper'>
          <div className='wrapper'>
              <label id='break-label'>Break Length</label>
              <div className='btn-wrapper'>
                  <button id='break-increment' value={breakLength} onClick={increment}>+</button>
                  <div id='break-length'>{breakLength}</div>
                  <button id='break-decrement' value={breakLength} onClick={decrement}>-</button>
              </div>
          </div>
          <div className='wrapper'>
              <label id='session-label'>Session Length</label>
              <div className='btn-wrapper'>
                  <button id='session-increment' value={sessionLength} onClick={increment}>+</button>
                  <div id='session-length'>{sessionLength}</div>
                  <button id='session-decrement' value={sessionLength} onClick={decrement}>-</button>
              </div>
          </div>
        </div>
        <div className='wrapper'>
            <label id='timer-label'>Session</label>
            <div id='time-left'>{timeLeft}</div>
            <button id='start_stop'>Start/Stop</button>
            <button id='reset' onClick={reset}>Reset</button>
            <audio id='beep'></audio>
        </div>
      </>
  )
}


