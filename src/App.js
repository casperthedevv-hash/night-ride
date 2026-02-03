import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isFloating, setIsFloating] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showNoMessage, setShowNoMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFloating(false);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleNoHover = () => {
    if (isFloating) {
      const maxX = window.innerWidth - 150;
      const maxY = window.innerHeight - 80;
      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;
      setNoButtonPosition({ x: newX, y: newY });
    }
  };

  const handleYesClick = () => {
    setShowConfetti(true);
  };

  const handleNoClick = () => {
    if (!isFloating) {
      setShowNoMessage(true);
    }
  };

  return (
    <div className="App">
      <div className="overlay"></div>
      
      <div className="content">
        <div className="emoji">🏍️</div>
        <h1 className="title">Night Ride?</h1>
        <p className="subtitle">Let's hit the road under the stars!</p>

        <div className="buttons-container">
          <button 
            className="btn btn-yes"
            onClick={handleYesClick}
          >
            Hell Yeah! 🔥
          </button>
          
          <button 
            className={`btn btn-no ${isFloating ? 'floating' : ''}`}
            style={isFloating && noButtonPosition.x !== 0 ? {
              position: 'fixed',
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
              transition: 'all 0.3s ease'
            } : {}}
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            onClick={handleNoClick}
          >
            Maybe Not... 😅
          </button>
        </div>

        {showConfetti && (
          <div className="success-message">
            <div className="confetti">🎉</div>
            <h2>Awesome! Let's ride! 🏍️💨</h2>
            <p>Get ready for an epic night!</p>
          </div>
        )}

        {showNoMessage && (
          <div className="success-message">
            <div className="confetti">😢</div>
            <h2>Aww, really? 🥺</h2>
            <p>You're missing out on an epic adventure!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
