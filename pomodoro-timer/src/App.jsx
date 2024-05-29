import { useState } from 'react'
import './App.css'

export default function App() {

    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);


    return (
        <>
            <div className='break-wrapper'>
                <label id='break-label'>Break Length</label>
                <div className='btn-wrapper'>
                    <button id='break-increment'>Break +</button>
                    <button id='break-decrement'>Break -</button>
                </div>
                <div id='break-length'>{breakLength}</div>
            </div>
            <div className='session-wrapper'>
                <label id='session-label'>Session Length</label>
                <div className='btn-wrapper'>
                    <button id='session-increment'>Session +</button>
                    <button id='session-decrement'>Session -</button>
                </div>
                <div id='session-length'>{sessionLength}</div>
            </div>
            <div className='timer-wrapper'>
                <label id='timer-label'>Session</label>
                <div id='time-left'>25:00</div>
            </div>
            <button id='start_stop'>Start/Stop</button>
            <button id='reset'>Reset</button>
            <audio id='beep'></audio>
        </>
    )
}


