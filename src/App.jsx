import { useCallback, useRef, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(18);
  const [numallow, setNumallow] = useState(true);
  const [charallow, setCharallow] = useState(true);
  const [password, setPassword] = useState('');
  const inputRef = useRef(null);

  const generatePassword = useCallback(() => {
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let pass = '';
    if (numallow) {
      str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }
    if (charallow) {
      str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{},;';
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str[char];
    }
    setPassword(pass);
    console.log(pass);
  }, [length, numallow, charallow]);

  const copyText = useCallback(() => {
    window.navigator.clipboard.writeText(inputRef.current.value);
    inputRef.current.select();
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, charallow, numallow]);

  return (
    <div className="outer-body rounded flex flex-col font-sans bg-[#ffffff] font-medium items-center justify-center text-center p-8 ">
      <h1 className="text-3xl mb-4 text-[#000000]">Password Generator</h1>
      <div className="password-container border-2 bg-[#00000015] rounded-lg p-4 mb-4 w-full max-w-xl mx-10 flex items-center justify-between">
        <input
          type="text"
          className="password-input p-2 flex-grow pl-4 rounded-full text-xl"
          placeholder="Password"
          value={password}
          readOnly
          ref={inputRef}
        />
        <button className="copy-button bg-yellow-400 text-black rounded-full px-4 py-2" onClick={copyText}>
          Copy
        </button>
      </div>
      <div className="options-container flex items-center justify-center mb-4">
        <div className="length-container mr-4">
          <input
            type="range"
            className="length-slider"
            min={8}
            max={30}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <div className="length-value text-[#000000]">Character Length: {length}</div>
        </div>
        <div className="option-checkbox mr-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={charallow}
            onChange={() => setCharallow((charallow) => !charallow)}
          />
          <span className="text-[#000000]">A-Z</span>
        </div>
        <div className="option-checkbox mr-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={numallow}
            onChange={() => setNumallow((numallow) => !numallow)}
          />
          <span className="text-[#000000]">0-9</span>
        </div>
        <div className="option-checkbox">
          <input
            type="checkbox"
            className="mr-2"
            checked={charallow}
            onChange={() => setCharallow((charallow) => !charallow)}
          />
          <span className="text-[#000000]">!@#</span>
        </div>
      </div>
    </div>
  );
}

export default App;