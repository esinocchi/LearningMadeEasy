import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const fullText = 'LearningMadeEasy.';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">{text}</h1>
        <div className="button-container">
          <button className="auth-button">Sign Up</button>
          <button className="auth-button">Log In</button>
        </div>
      </header>
    </div>
  );
}

export default App;
