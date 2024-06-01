
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';

import Button from './Button';

export default function SetterWrapper ({labelId, labelContent, displayId, displayContent, buttonIncrementId, buttonDecrementId, handleIncrement, handleDecrement}) {

  

  return (
    <div className='setter-wrapper'>
      <label id={labelId}>{labelContent}</label>
      <div className='btn-wrapper'>
        <Button buttonId={buttonIncrementId} handleClick={handleIncrement}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <span id={displayId}>{displayContent}</span>
        <Button buttonId={buttonDecrementId} handleClick={handleDecrement}>
          <FontAwesomeIcon icon={faMinus} />
        </Button>
      </div>
    </div>
  );
}