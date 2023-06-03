import React, { useState, useEffect } from 'react';
import Question from './Question';
import '../css/QuestionList.css';
import { subjects } from '../utils/subjects';

const QuestionList = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [topicName, setTopicName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedSubject) {
      const url = `${process.env.REACT_APP_API_URL}format=json&subName=${selectedSubject}`;
      fetchQuestions(url);
    }
  }, [selectedSubject]);

  const fetchQuestions = (url) => {
    setLoading(true);
    setError('');

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setQuestions(data.results);
        setLoading(false);

        if (data.results.length === 0) {
          setError('No questions found for the selected topic.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
        setError('Error fetching questions. Please try again later.');
      });
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setTopicName('');
    setError('');
  };

  const handleTopicNameChange = (event) => {
    setTopicName(event.target.value);
    setError('');
  };

  const handleLoadQuestions = () => {
    if (topicName) {
      const url = `${process.env.REACT_APP_API_URL}format=json&topicName=${topicName}`;
      fetchQuestions(url);
    } else {
      setError('Please enter a topic name.');
    }
  };

  const handleOptionClick = (questionIndex, option) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    question.selectedOption = option;

    setQuestions(updatedQuestions);
  };

  return (
    <div className="question-list-container">
      <h1 className="title">{selectedSubject ? `Questions - ${selectedSubject}` : 'Select a Subject'}</h1>
      <div className="selection-container">
        <div className="subject-dropdown">
          <select value={selectedSubject} onChange={handleSubjectChange}>
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <div className="topic-input">
          <input
            type="text"
            placeholder="Enter topic name"
            value={topicName}
            onChange={handleTopicNameChange}
          />
          <button onClick={handleLoadQuestions}>Load Questions</button>
        </div>
      </div>
      {selectedSubject || topicName ? (
        <>
          {loading ? (
            <div className="loading-message">Loading questions...</div>
          ) : questions.length > 0 ? (
            questions.map((question, index) => (
              <Question
                key={question.id}
                question={question}
                index={index}
                handleOptionClick={handleOptionClick}
              />
            ))
          ) : (
            <div className="no-questions">{error ? error : 'No questions found for the selected topic.'}</div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default QuestionList;
