import React, { useState } from "react";

const PersonalityQuiz = ({ onMatch }) => {
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: "What is your activity level?",
      options: ["Low", "Medium", "High"],
    },
    {
      id: 2,
      question: "Do you prefer indoors or outdoors?",
      options: ["Indoors", "Outdoors"],
    },
    {
      id: 3,
      question: "Do you like routines or surprises?",
      options: ["Routines", "Surprises"],
    },
    {
      id: 4,
      question: "What type of companion do you prefer?",
      options: ["Quiet", "Energetic", "Independent", "Affectionate"],
    },
  ];

  const handleChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    const score = {
      Calm: 0,
      Playful: 0,
      Shy: 0,
      Energetic: 0,
      Friendly: 0,
    };

    for (const [qId, ans] of Object.entries(answers)) {
      const id = parseInt(qId);
      switch (id) {
        case 1:
          if (ans === "Low") score.Calm++;
          if (ans === "Medium") score.Friendly++;
          if (ans === "High") score.Energetic++;
          break;
        case 2:
          if (ans === "Indoors") score.Shy++;
          if (ans === "Outdoors") score.Playful++;
          break;
        case 3:
          if (ans === "Routines") score.Calm++;
          if (ans === "Surprises") score.Playful++;
          break;
        case 4:
          if (ans === "Quiet") score.Shy++;
          if (ans === "Energetic") score.Energetic++;
          if (ans === "Independent") score.Calm++;
          if (ans === "Affectionate") score.Friendly++;
          break;
        default:
          break;
      }
    }

    const personality = Object.entries(score).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];

    onMatch(personality);
  };

  return (
    <div className="mb-4 find-pet-section">
      {questions.map(({ id, question, options }) => (
        <div key={id} className="mb-2 question-block">
          <p>{question}</p>
          {options.map((opt) => (
            <label key={opt} className="me-3">
              <input
                type="radio"
                name={`question-${id}`}
                value={opt}
                checked={answers[id] === opt}
                onChange={() => handleChange(id, opt)}
              />{" "}
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button className="btn mt-3" onClick={handleSubmit}>
        Find Match
      </button>
    </div>
  );
};

export default PersonalityQuiz;
