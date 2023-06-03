// Question.js
import React, { useState } from 'react';

const Question = ({ question, index, handleOptionClick }) => {
  const [showSolution, setShowSolution] = useState(false);

  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  return (
    <div className="question-container" key={question.id}>
      <u><h4 className="question-number">
        Question: {index + 1} ({question.question_title})
      </h4></u>
      <div
        className="question-text"
        dangerouslySetInnerHTML={{ __html: question.question_text }}
      ></div>

      {question.question_type === 'MCQ' && (
        <div className="options-container">
          {Object.entries(question.question_options).map(
            ([optionKey, optionValue]) => (
              <div
                key={optionKey}
                className={`option ${
                  question.selectedOption === optionKey ? 'selected' : ''
                } ${
                  question.selectedOption !== question.answer &&
                  question.selectedOption === optionKey
                    ? 'incorrect'
                    : ''
                }`}
                onClick={() => handleOptionClick(index, optionKey)}
              >
                <div dangerouslySetInnerHTML={{ __html: optionValue }}></div>
              </div>
            )
          )}
        </div>
      )}

      {question.selectedOption && (
        <div
          className={`answer-message ${
            question.selectedOption === question.answer
              ? 'correct'
              : 'incorrect'
          }`}
        >
          {question.selectedOption === question.answer
            ? 'Your answer is correct!'
            : 'Your answer is incorrect!'}
        </div>
      )}

      <button className="solution-button" onClick={toggleSolution}>
        {showSolution ? 'Hide Solution' : 'Show Solution'}
      </button>

      {showSolution && (
        <div className="solution-container">
          <h3 className="solution-heading">Solution</h3>
          <div
            className="solution"
            dangerouslySetInnerHTML={{ __html: question.solution }}
          ></div>
        </div>
      )}

      <hr className="question-separator" />
    </div>
  );
};

export default Question;
