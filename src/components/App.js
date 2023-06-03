import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import QuestionList from '../components/QuestionList';
import '../css/App.css';

const App = () => {
  return (
    <div className="app-container">
      <QuestionList />
      <Analytics />
    </div>
  );
};

export default App;
