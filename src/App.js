import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [urls, setUrls] = useState('');
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/process', {
        urls: urls.split(',').map(url => url.trim()),
        question
      });
      setResult(response.data.most_relevant_sentence); // Assuming backend sends 'most_relevant_sentence'
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching data', error);
      setError('Error fetching data. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Question Answering System</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>URLs (comma separated):</label>
          <input
            type="text"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {result && (
        <div>
          <h2>Most Relevant Sentence:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
