import React, { useState, useEffect } from "react";
import Question from "./Question";
import "../css/QuestionList.css";
import { subjects } from "../utils/subjects";

const QuestionList = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    if (selectedSubject) {
      const url = `${process.env.REACT_APP_API_URL}format=json&subName=${selectedSubject}`;
      fetchQuestions(url);
    } else if (selectedTopic) {
      const url = `${process.env.REACT_APP_API_URL}format=json&topicName=${selectedTopic}`;
      fetchQuestions(url);
    }
  }, [selectedSubject, selectedTopic]);

  const fetchQuestions = (url) => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
        setPreviousPage(data.previous);
        setNextPage(data.next);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setSelectedTopic("");
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
    setSelectedSubject("");
  };

  const handleOptionClick = (questionIndex, option) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    question.selectedOption = option;

    setQuestions(updatedQuestions);
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      fetchQuestions(previousPage);
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchQuestions(nextPage);
    }
  };

  return (
    <div className="question-list-container">
      <h1 className="title">
        {selectedSubject
          ? `Questions - ${selectedSubject}`
          : "Select a Subject"}
      </h1>
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
            placeholder="Enter Topic"
            value={selectedTopic}
            onChange={handleTopicChange}
          />
        </div>
      </div>
      {selectedSubject || selectedTopic ? (
        <>
          {loading ? (
            <div className="loading-message">Loading questions...</div>
          ) : questions.length > 0 ? (
            <>
              {questions.map((question, index) => (
                <Question
                  key={question.id}
                  question={question}
                  index={index}
                  handleOptionClick={handleOptionClick}
                />
              ))}
              <div className="pagination-buttons">
                {previousPage && (
                  <button
                    onClick={handlePreviousPage}
                    className="pagination-button"
                  >
                    Previous
                  </button>
                )}
                {nextPage && (
                  <button
                    onClick={handleNextPage}
                    className="pagination-button"
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="no-questions">
              No questions found for the selected{" "}
              {selectedSubject ? "subject" : "topic"}.
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default QuestionList;
