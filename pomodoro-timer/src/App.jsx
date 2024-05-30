import { useState } from 'react'
import './App.css'

export default function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const increment = (e) => {
    
    if (e.target.id === 'break-increment') {
      if (breakLength === 60) return;
      setBreakLength(breakLength => breakLength + 1);
    }

    if (e.target.id === 'session-increment') {
      if (sessionLength === 60) return;
      setSessionLength(sessionLength => sessionLength + 1);
      setMinutes(minutes => minutes + 1);
    }

    return;

  }

  const decrement = (e) => {
    if (e.target.id === 'break-decrement') {
      if (breakLength === 1) return;
      setBreakLength(breakLength => breakLength - 1);
    }

    if (e.target.id === 'session-decrement') {
      if (sessionLength === 1) return;
      setSessionLength(sessionLength => sessionLength - 1);
      setMinutes(minutes => minutes - 1);
    }

    return;
  }

  const toggleTimer = () => {
    setIsRunning(prevState => !prevState);
  }

  const reset = () => {
    setMinutes(25);
    setSeconds(0);
    setSessionLength(25);
    setBreakLength(5);
    setIsRunning(false);
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
            <div id='time-left'>
              {minutes < 10? '0'+minutes: minutes}:{seconds < 10? '0'+ seconds: seconds}
            </div>
            <button id='start_stop' onClick={toggleTimer}>{isRunning? 'Pause': 'Start'}</button>
            <button id='reset' onClick={reset}>Reset</button>
            <audio id='beep'></audio>
        </div>
      </>
  )
}


