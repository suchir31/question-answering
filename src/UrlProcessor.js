import React, { useState } from 'react';
import axios from 'axios';


const UrlProcessor = () => {
  const [urls, setUrls] = useState({ url1: '', url2: '', url3: '' });
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUrls((prevUrls) => ({ ...prevUrls, [name]: value }));
  };

  const handleProcess = async () => {
    try {
      const response = await axios.post('YOUR_BACKEND_ENDPOINT', {
        urls: [urls.url1, urls.url2, urls.url3],
      });
      const { question } = response.data;
      setQuestion(question);
    } catch (error) {
      console.error('Error processing URLs:', error);
    }
  };

  const handleQuestionSubmit = async () => {
    try {
      const response = await axios.post('YOUR_BACKEND_ENDPOINT/answer', {
        question,
      });
      const { answer } = response.data;
      setAnswer(answer);
    } catch (error) {
      console.error('Error getting answer:', error);
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <h3>Enter URLs</h3>
        <input
          type="text"
          name="url1"
          value={urls.url1}
          onChange={handleChange}
          placeholder="URL 1"
        />
        <input
          type="text"
          name="url2"
          value={urls.url2}
          onChange={handleChange}
          placeholder="URL 2"
        />
        <input
          type="text"
          name="url3"
          value={urls.url3}
          onChange={handleChange}
          placeholder="URL 3"
        />
        <button onClick={handleProcess}>Process</button>
      </div>
      <div className="right-side">
        <h3>Ask a Question</h3>
        {question && (
          <>
            <p>{question}</p>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Your question"
            />
            <button onClick={handleQuestionSubmit}>Submit</button>
          </>
        )}
        {answer && <p>Answer: {answer}</p>}
      </div>
    </div>
  );
};

export default UrlProcessor;
