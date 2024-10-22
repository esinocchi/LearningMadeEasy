import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Quiz from './Quiz'; // Import the Quiz component

function App() {
  const [text, setText] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'LearningMadeEasy';
  const fullSubtitle = 'Your favorite AI tutor';
  const typingSpeed = 100;

  const cognitoDomain = 'https://learningmadeeasy.auth.us-east-2.amazoncognito.com';

  const handleSignUp = () => {
    window.location.href = `${cognitoDomain}/signup`;
  };

  const handleLogIn = () => {
    window.location.href = `${cognitoDomain}/login`;
  };

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
    <Router>
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
            <button className="auth-button" onClick={handleSignUp}>Sign Up</button>
            <button className="auth-button" onClick={handleLogIn}>Log In</button>
            <Link to="/quiz" className="auth-button">Go to Quiz</Link> {/* Link to Quiz page */}
          </div>
        </header>
        <Routes> {/* Changed from Switch to Routes */}
          <Route path="/quiz" element={<Quiz />} /> {/* Updated component prop to element */}
        </Routes> {/* Changed from Switch to Routes */}
      </div>
    </Router>
  );
}

export default App;
