import { useState, useEffect, useRef } from 'react'
import alarm from './assets/audio/clock-alarm.mp3';
import SetterWrapper from './SetterWrapper';
import Timer from './Timer';
import './assets/styles/App.css'

export default function App () {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreakShowing, setisBreakShowing] = useState(false);
  const [isSessionShowing, setisSessionShowing] = useState(true);

  const audioRef = useRef(null);

  const timeLeft = `${minutes < 10? '0'+ minutes: minutes}:${seconds < 10? '0'+ seconds: seconds}`;

  useEffect(() => {

    const enterBreak = () => {
      // set break session after 5s.
      setTimeout(() => {
        setMinutes(breakLength);
        setSeconds(0);
        setisSessionShowing(!isSessionShowing);
        setisBreakShowing(!isBreakShowing);
      }, 5000);
    }
    // set break session after 5s.
    const enterSession = () => {
      setTimeout(() => {
        setMinutes(sessionLength);
        setSeconds(0);
        setisBreakShowing(!isBreakShowing);
        setisSessionShowing(!isSessionShowing);
      }, 5000)
    }
    
    let timeoutId;
    // use timeout to update timeleft every second
    if (isRunning) {
      timeoutId = setTimeout(() => {
        if (seconds === 0 && minutes === 0) {
          audioRef.current.play();
          isSessionShowing? enterBreak(): enterSession();
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

  }, [minutes, seconds, breakLength, sessionLength, isRunning, isBreakShowing, isSessionShowing])

  const updateLength = (type, increment, isShowing) => {
    const setter = type === 'break'? setBreakLength : setSessionLength;
    // const length = type === 'break'? breakLength : sessionLength;

    setter(prevLength => {
      const newLength = increment? prevLength + 1: prevLength - 1;
      // prevent edge cases where length goes below 1 or above 60
      if (newLength < 1 || newLength > 60) return prevLength;

      if (isShowing) return newLength;
      setMinutes(newLength);
      setSeconds(0);
      return newLength;
    })
  }


  const handleIncrement = (e) => {
    // if timer is running, prohibit updating break/session length
    if (isRunning) return;
    
    const buttonId = e.currentTarget.id;
    if (buttonId === 'break-increment') {
      updateLength('break', true, isSessionShowing);
    } else if (buttonId === 'session-increment') {
      updateLength('session', true, isBreakShowing);
    }
    return;
  };

  const handleDecrement = (e) => {
    // if timer is running, prohibit updating break/session length
    if (isRunning) return;

    const buttonId = e.currentTarget.id;
    
    if (buttonId === 'break-decrement') {
      updateLength('break', false, isSessionShowing);
    } else if (buttonId === 'session-decrement') {
      updateLength('session', false, isBreakShowing);
    }
    return;
  }

  const handleToggleTimer = () => {
    setIsRunning(prevState => !prevState);
  }

  const handleReset = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setMinutes(25);
    setSeconds(0);
    setSessionLength(25);
    setBreakLength(5);
    setIsRunning(false);
    setisBreakShowing(false);
    setisSessionShowing(true);
  }
  return (
      <>
        <header>
          <h1>Carrot Timer</h1>
        </header>
        <div className='grass'></div>
        <div id='app'>
          <SetterWrapper 
            labelId='break-label' 
            labelContent='Break Length' 
            displayId='break-length' 
            displayContent={breakLength}
            buttonIncrementId='break-increment'
            buttonDecrementId='break-decrement'
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
          <SetterWrapper 
            labelId='session-label'
            labelContent='Session Length'
            displayId='session-length'
            displayContent={sessionLength}
            buttonIncrementId='session-increment'
            buttonDecrementId='session-decrement'
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
          <Timer 
            labelId='timer-label'
            labelContent={isSessionShowing? 'Session': 'Break'}
            displayId='time-left'
            displayContent={timeLeft}
            buttonResetId='reset'
            buttonStartPauseId='start_stop'
            isTimerRunning={isRunning}
            handleReset={handleReset}
            handleToggleTimer={handleToggleTimer}
          >
            <audio id='beep' ref={audioRef} src={alarm} />
          </Timer> 
        </div>
        <footer>
          <p>
            &copy; 
            {new Date().getFullYear()}
            <a href='https://github.com/Katereverie'>
              <span id='author'>Katereverie</span>
            </a>
          </p>
        </footer>
      </>
  )
}


