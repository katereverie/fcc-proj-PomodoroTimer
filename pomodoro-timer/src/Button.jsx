export default function Button ( {buttonId, handleClick, children}) {
  
  return (
    <button 
      id={buttonId} 
      onClick={handleClick}
    >
      {children}
    </button>
  );
}