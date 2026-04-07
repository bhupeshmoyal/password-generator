import React, { useState, useEffect } from 'react';
import './App.css';

function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeCharacters, setIncludeCharacters] = useState(true);

  useEffect(() => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const characters = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = lowercase + uppercase;
    if (includeNumbers) charset += numbers;
    if (includeCharacters) charset += characters;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    setPassword(generatedPassword);
  }, [length, includeNumbers, includeCharacters]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <div className="password-generator">
      <h1>Password Generator</h1>
      <div className="password-display">
        <input
          type="text"
          value={password}
          readOnly
          className="password-input"
        />
        <button onClick={copyToClipboard} className="copy-button">
          Copy
        </button>
      </div>
      <div className="controls">
        <div className="length-control">
          <label>Password Length: {length}</label>
          <input
            type="range"
            min="6"
            max="30"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="length-slider"
          />
        </div>
        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Include Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeCharacters}
              onChange={(e) => setIncludeCharacters(e.target.checked)}
            />
            Include Special Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
