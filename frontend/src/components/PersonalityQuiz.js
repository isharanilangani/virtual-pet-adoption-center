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
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    // Basic scoring logic for personality types
    const score = {
      Calm: 0,
      Playful: 0,
      Shy: 0,
      Energetic: 0,
      Friendly: 0,
    };

    Object.entries(answers).forEach(([qId, ans]) => {
      switch (parseInt(qId)) {
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
    });

    // Find the highest scoring personality
    const personality = Object.entries(score).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];
    onMatch(personality);
  };

  return (
    <div className="mb-4 find-pet-section">
      <h3>Find Your Perfect Pet</h3>
      {questions.map((q) => (
        <div key={q.id} className="mb-2 question-block">
          <p>{q.question}</p>
          {q.options.map((opt) => (
            <label key={opt} className="me-3">
              <input
                type="radio"
                name={`question-${q.id}`}
                value={opt}
                onChange={() => handleChange(q.id, opt)}
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
