import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://your-backend-url.com/bfhl', {
        data: JSON.parse(input),
      });
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  return (
    <div>
      <h1>BFHL Frontend</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Enter JSON input"
        />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response</h2>
          <select multiple value={selectedOptions} onChange={handleSelectChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>
          {selectedOptions.includes('alphabets') && (
            <div>
              <h3>Alphabets</h3>
              <ul>
                {response.alphabets.map((alphabet) => (
                  <li key={alphabet}>{alphabet}</li>
                ))}
              </ul>
            </div>
          )}
          {selectedOptions.includes('numbers') && (
            <div>
              <h3>Numbers</h3>
              <ul>
                {response.numbers.map((number) => (
                  <li key={number}>{number}</li>
                ))}
              </ul>
            </div>
          )}
          {selectedOptions.includes('highest_lowercase_alphabet') && (
            <div>
              <h3>Highest Lowercase Alphabet</h3>
              <p>{response.highest_lowercase_alphabet[0]}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;