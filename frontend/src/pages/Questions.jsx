
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [answered, setAnswered] = useState([]);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const invite = searchParams.get("invite");

  useEffect(() => {
    fetchQuestions();
    fetchAnswered();
  }, []);

  // -----------------------------
  // Fetch all questions
  // -----------------------------
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/questions"
      );

      setQuestions(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load questions");
    }
  };

  // -----------------------------
  // Fetch answered questions
  // -----------------------------
  const fetchAnswered = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/questions/answered/${invite}`
      );

      setAnswered(
        res.data.map((item) => item.question_id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // Navigate to selected question
  // -----------------------------
  const handleSelectQuestion = (questionId) => {
    navigate(
      `/question/${questionId}?invite=${invite}`
    );
  };

  return (
    <div className="container">
      <h1>Story Questions</h1>

      <h3>
        Progress: {answered.length} / {questions.length} Questions Completed
      </h3>

      <hr />

      {questions.map((question) => {
        const completed = answered.includes(question.id);

        return (
          <div
            key={question.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{question.question}</h3>

            <p>
              <strong>Category:</strong> {question.category}
            </p>

            {completed ? (
              <>
                <p style={{ color: "green", fontWeight: "bold" }}>
                  ✅ Completed
                </p>

                <button disabled>
                  Answered
                </button>
              </>
            ) : (
              <button
                onClick={() =>
                  handleSelectQuestion(question.id)
                }
              >
                Answer
              </button>
            )}
          </div>
        );
      })}

       <hr />

    <button
      onClick={() => navigate(`/playback?invite=${invite}`)}
      style={{
        padding: "10px 20px",
        marginTop: "20px",
      }}
    >
      Done
    </button>

    </div>
  );
}

export default Questions;