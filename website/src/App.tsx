import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'LearningMadeEasy';
  const fullSubtitle = 'Your favorite AI tutor.';
  const typingSpeed = 100;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
        setShowCursor(false);
        setTimeout(() => {
          let subtitleIndex = 0;
          const subtitleTimer = setInterval(() => {
            setSubtitle(fullSubtitle.slice(0, subtitleIndex));
            subtitleIndex++;
            if (subtitleIndex > fullSubtitle.length) {
              clearInterval(subtitleTimer);
              setShowCursor(false);
            } else {
              setShowCursor(true);
            }
          }, typingSpeed);
          return () => clearInterval(subtitleTimer);
        }, 500);
      } else {
        setShowCursor(true);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [fullText, fullSubtitle]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">
          {text}
          {showCursor && <span className="cursor" />}
        </h1>
        <div className="subtitle-container">
          <h2 className="subtitle">
            {subtitle}
            {showCursor && subtitle.length > 0 && <span className="cursor" />}
          </h2>
        </div>
        <div className="button-container">
          <button className="auth-button">Sign Up</button>
          <button className="auth-button">Log In</button>
        </div>
      </header>
    </div>
  );
}

export default App;
