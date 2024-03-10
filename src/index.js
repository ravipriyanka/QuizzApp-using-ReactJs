//index.js

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const questionsData = [
  {
    q: "q1",
    question: "What does JSX stand for?",
    options: ["JavaScript XML", "Java XML", "JSON XML", "JS XML"],
    correctAnswer: "JavaScript XML",
  },
  {
    q: "q2",
    question:
      "In React, what is used to pass data to a component from outside?",
    options: ["setState", "render", "props", "state"],
    correctAnswer: "props",
  },
  {
    q: "q3",
    question:
      "What function allows you to perform side effects in a function component?",
    options: [
      "componentDidMount",
      "useEffect",
      "componentWillUnmount",
      "useState",
    ],
    correctAnswer: "useEffect",
  },
  {
    q: "q4",
    question: "Which of the following is a hook in React?",
    options: ["useState", "renderState", "componentState", "setState"],
    correctAnswer: "useState",
  },
  {
    q: "q5",
    question: "What is the purpose of ReactDOM in React?",
    options: [
      "Rendering components",
      "State management",
      "Routing",
      "Event handling",
    ],
    correctAnswer: "Rendering components",
  },
  {
    q: "q6",
    question: "What is the correct way to create a React component?",
    options: [
      "React.createComponent",
      "new Component()",
      "class MyComponent extends React.Component",
      "function MyComponent()",
    ],
    correctAnswer: "class MyComponent extends React.Component",
  },
  {
    q: "q7",
    question: "What is the role of babel in a React application?",
    options: [
      "Handling state",
      "Transpiling JSX code to JavaScript",
      "Routing",
      "Event handling",
    ],
    correctAnswer: "Transpiling JSX code to JavaScript",
  },
  {
    q: "q8",
    question: "What is React used for?",
    options: [
      "Server-side scripting",
      "Building user interfaces",
      "Machine learning",
      "Database management",
    ],
    correctAnswer: "Building user interfaces",
  },
  {
    q: "q9",
    question:
      "Which method is called after a component is rendered for the first time?",
    options: [
      "componentDidMount",
      "componentDidUpdate",
      "componentWillUnmount",
      "componentWillMount",
    ],
    correctAnswer: "componentDidMount",
  },
  {
    q: "q10",
    question: "What is the purpose of the 'key' attribute in React?",
    options: [
      "It uniquely identifies elements in a list",
      "It sets the background color of an element",
      "It defines a function",
      "It controls the layout of the page",
    ],
    correctAnswer: "It uniquely identifies elements in a list",
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(questionsData.length).fill(null)
  );

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questionsData.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    const correctAnswers = questionsData.map((q) => q.correctAnswer);
    const userScore = userAnswers.reduce(
      (acc, answer, index) =>
        answer === correctAnswers[index] ? acc + 1 : acc,
      0
    );

    const answersText = questionsData
      .map((q, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === q.correctAnswer;
        const mark = isCorrect ? "✓" : "✗";
        return `Q${
          index + 1
        }: Your Answer - ${userAnswer} ${mark} | Correct Answer - ${
          q.correctAnswer
        }`;
      })
      .join("\n");

    alert(
      `Your score: ${userScore} / ${questionsData.length}\n\n${answersText}`
    );
  };

  const handleAnswer = (selectedAnswer) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestion] = selectedAnswer;
      return newAnswers;
    });
  };

  useEffect(() => {
    //Scroll up to see the answers
    window.scrollTo(0, 0);
  }, [currentQuestion]);

  return (
    <div>
      <Header />
      <Content
        currentQuestion={currentQuestion}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
        onAnswer={handleAnswer}
        userAnswer={userAnswers[currentQuestion]}
      />
      <Footer />
    </div>
  );
}

function Header() {
  return <div className="header">ReactJS Quiz</div>;
}

function Content({
  currentQuestion,
  onNext,
  onPrevious,
  onSubmit,
  onAnswer,
  userAnswer,
}) {
  const question = questionsData[currentQuestion];
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === questionsData.length - 1;

  return (
    <form>
      <div className="content">
        <Question
          key={currentQuestion + 1}
          number={currentQuestion + 1}
          {...question}
          onAnswer={onAnswer}
          userAnswer={userAnswer}
        />
        <div className="navigation-buttons">
          <button type="button" onClick={onPrevious} disabled={isFirstQuestion}>
            Previous
          </button>
          <button type="button" onClick={onNext} disabled={isLastQuestion}>
            Next
          </button>
          <button type="button" onClick={onSubmit} disabled={!isLastQuestion}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

function Footer() {
  return (
    <div className="footer">
      <span>Good luck!</span>
    </div>
  );
}

function Question({ number, question, options, onAnswer, userAnswer }) {
  return (
    <div className="question-container">
      <h3>{`Q${number}: ${question}`}</h3>
      <div>
        {options.map((option, index) => (
          <div key={index}>
            <label>
              <input
                type="radio"
                name={`q${number}`}
                value={option}
                onChange={() => onAnswer(option)}
                checked={userAnswer === option}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

root.render(<App />);
