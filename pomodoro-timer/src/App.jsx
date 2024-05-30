import { useEffect, useState } from 'react'
import './App.css'

export default function App() {

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(`${minutes}:${seconds < 10? `0${seconds}`:`${seconds}`}`);

  useEffect(() => {
    let intervalId;

    if (isRunning && !isTimeOver) {
      intervalId = setInterval(() => {

        setSeconds(prevSeconds => {
          if (prevSeconds === 0) return 59;
          if (prevSeconds !== 0) return prevSeconds - 1;
        });

        setMinutes(prevMinutes => {
          if (prevMinutes !== 0) return prevMinutes - 1;
          if (prevMinutes === 0) {
            setIsTimeOver(isTimeOver => !isTimeOver);
            return;
          }
        });

        setTimeLeft(`${minutes}:${seconds < 10? `0${seconds}`: `${seconds}`}`);

      }, 1000);
    } else if (isRunning && isTimeOver) {
      console.log("time for a break");
      // replace session time with break time
      setMinutes(breakLength);
      setTimeLeft(`${minutes}:${seconds < 10? `0${seconds}`:`${seconds}`}`);

    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);

  }, [isRunning, isTimeOver, minutes, seconds, timeLeft, breakLength]);

  const decrement = (e) => {

    if (isRunning) return;

    if (e.target.id === 'break-decrement') {
      setBreakLength(prevBreakLength => {
        return prevBreakLength === 1? prevBreakLength: prevBreakLength - 1;
      });
    }
    
    if (e.target.id === 'session-decrement') {
      setSessionLength(prevSessionLength => {
        if (prevSessionLength === 1) return prevSessionLength;
        if (prevSessionLength !== 1) return prevSessionLength - 1;
      });
      setMinutes(prevMinutes => {
        if (prevMinutes === 1) return prevMinutes;
        if (prevMinutes !== 1) {
          const newMinutes = prevMinutes - 1;
          setTimeLeft(`${newMinutes}:${seconds < 10? `0${seconds}`:`${seconds}`}`);
          return newMinutes;
        }
      });
    }
  }

  const increment = (e) => {
    if (isRunning) return;
    if (e.target.id === 'break-increment') setBreakLength(prevBreakLength => {
      return prevBreakLength === 60? prevBreakLength: prevBreakLength + 1;
    });
    if (e.target.id === 'session-increment') {
      setSessionLength(prevSessionLength => {
        if (prevSessionLength === 60) return prevSessionLength;
        if (prevSessionLength !== 60) return prevSessionLength + 1;
      });
      setMinutes(prevMinutes => {
        if (prevMinutes === 60) return prevMinutes;
        if (prevMinutes !== 60) {
          const newMinutes = prevMinutes + 1;
          setTimeLeft(`${newMinutes}:${seconds < 10? `0${seconds}`:`${seconds}`}`);
          return newMinutes;
        }
      });
    }
  }

  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setSeconds(0);
    setMinutes(25);
    setTimeLeft(`${25}:0${0}`);
    if (isRunning) toggleTimer();
    if (!isRunning) return;
  }

  const toggleTimer = () => {
    setIsRunning(prevState => !prevState);
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
            <button id='start_stop' onClick={toggleTimer}>{isRunning? 'Pause': 'Start'}</button>
            <button id='reset' onClick={reset}>Reset</button>
            <audio id='beep'></audio>
        </div>
      </>
  )
}


