import { useState, useEffect, useRef } from 'react'
import alarm from './assets/audio/clock-alarm.mp3';
import './assets/styles/App.css'

export default function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreakRunning, setIsBreakRunning] = useState(false);
  const [isSessionRunning, setIsSessionRunning] = useState(true);
  const audioRef = useRef(null);

  const timeLeft = `${minutes < 10? '0'+ minutes: minutes}:${seconds < 10? '0'+ seconds: seconds}`;

  useEffect(() => {

    const enterBreak = () => {
      // set break session after 4s.
      setTimeout(() => {
        setMinutes(breakLength);
        setSeconds(0);
        setIsSessionRunning(!isSessionRunning);
        setIsBreakRunning(!isBreakRunning);
      }, 5000);
    }
  
    const enterSession = () => {
      setTimeout(() => {
        setMinutes(sessionLength);
        setSeconds(0);
        setIsBreakRunning(!isBreakRunning);
        setIsSessionRunning(!isSessionRunning);
      }, 5000)
    }
    
    let timeoutId;
    // use timeout to update timeleft every second
    if (isRunning) {
      timeoutId = setTimeout(() => {
        if (seconds === 0 && minutes === 0) {
          audioRef.current.play();
          isSessionRunning? enterBreak(): enterSession();
        } else if (seconds === 0 && minutes !== 0) {
          setSeconds(59);
          setMinutes(prevMinutes => prevMinutes - 1);
        } else {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
      }, 1000);
    } else {
      return;
    }
    // cleanup function clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);

  }, [minutes, seconds, breakLength, sessionLength, isRunning, isBreakRunning, isSessionRunning])

  const increment = (e) => {

    if (isRunning) return;
    
    if (e.target.id === 'break-increment') {
      setBreakLength(prevBreakLength => {
        if (breakLength === 60) return 60;
        const newBreakLength = prevBreakLength + 1;
        if (isSessionRunning) return newBreakLength; // if it's not a break session, do not update minutes
        setMinutes(newBreakLength);
        setSeconds(0);
        return newBreakLength;
      })
    }

    if (e.target.id === 'session-increment') {
      setSessionLength(prevSessionLength => {
        if (sessionLength === 60) return 60;
        const newSessionLength = prevSessionLength + 1;
        if (isBreakRunning) return newSessionLength; // if it's a break session, do not update minutes;
        setMinutes(newSessionLength);
        setSeconds(0);
        return newSessionLength;
      })
    }

    return;

  }

  const decrement = (e) => {

    if (isRunning) return;

    if (e.target.id === 'break-decrement') {
      setBreakLength(prevBreakLength => {
        if (prevBreakLength === 1) return 1;
        const newBreakLength = prevBreakLength - 1;
        if (isSessionRunning) return newBreakLength; 
        setMinutes(newBreakLength);
        setSeconds(0);
        return newBreakLength;
      })
    }

    if (e.target.id === 'session-decrement') {
      setSessionLength(prevSessionLength => {
        if (prevSessionLength === 1) return 1;
        const newSessionLength = prevSessionLength - 1;
        if (isBreakRunning) return newSessionLength;
        setMinutes(newSessionLength);
        setSeconds(0);
        return newSessionLength;
      })
    }

    return;
  }

  const toggleTimer = () => {
    setIsRunning(prevState => !prevState);
  }

  const reset = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setMinutes(25);
    setSeconds(0);
    setSessionLength(25);
    setBreakLength(5);
    setIsRunning(false);
    setIsBreakRunning(false);
    setIsSessionRunning(true);
  }
  

  return (
      <>
        <header>
          <h1>Pomodoro Timer</h1>
        </header>
        <div className='grass'></div>
        <div id='app'>
          <div id='break-session-wrapper'>
            <div className='wrapper'>
                <label id='break-label'>Break</label>
                <div className='btn-wrapper'>
                    <button id='break-increment' onClick={increment}>
                      ?
                    </button>
                    <div id='break-length'>{breakLength}</div>
                    <button id='break-decrement' onClick={decrement}>
                      ?
                    </button>
                </div>
            </div>
            <div className='wrapper'>
                <label id='session-label'>Session</label>
                <div className='btn-wrapper'>
                    <button id='session-increment' onClick={increment}>
                      ?
                    </button>
                    <div id='session-length'>{sessionLength}</div>
                    <button id='session-decrement' onClick={decrement}>
                      ?
                    </button>
                </div>
            </div>
          </div>
          <div className='wrapper'>
              <label id='timer-label'>
                {isSessionRunning? 'Session': 'Break'}
              </label>
              <div id='time-left'>
                {timeLeft}
              </div>
              <button id='start_stop' onClick={toggleTimer}>{isRunning? 'Pause': 'Start'}</button>
              <button id='reset' onClick={reset}>Reset</button>
              <audio id='beep' ref={audioRef} src={alarm} />
          </div>
        </div>
        <footer>
          <p>&copy; {new Date().getFullYear()} <a href='https://github.com/Katereverie'><span id='author'>Katereverie</span></a></p>
        </footer>
      </>
  )
}


