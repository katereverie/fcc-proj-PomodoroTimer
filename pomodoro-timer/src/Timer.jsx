import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSyncAlt, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import Button from "./Button";

export default function Timer ( {minutesLeft, labelId, labelContent, displayId, displayContent, buttonStartPauseId, buttonResetId, isTimerRunning, handleReset, handleToggleTimer, children}) {
  
  return (
    <div className="timer-wrapper">
      <label id={labelId}>
        {labelContent}
      </label>
      <span id={displayId} style={minutesLeft < 1 ? {color: 'red', textShadow: '0px 0px 1px black'} : {color: 'yellow'}}>
        {displayContent}
      </span>
      {children}
      <div className='btn-wrapper timer'>
        <Button buttonId={buttonStartPauseId} handleClick={handleToggleTimer}>
          {isTimerRunning? <FontAwesomeIcon icon={faPause} />:<FontAwesomeIcon icon={faPlay} />}
        </Button>
        <Button buttonId={buttonResetId} handleClick={handleReset}>
          <FontAwesomeIcon icon={faSyncAlt} />
        </Button>
      </div>

    </div>
  );

}