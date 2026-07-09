// import { useNavigate, useParams, useSearchParams } from "react-router-dom";

// function Question() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [searchParams] = useSearchParams();
//   const invite = searchParams.get("invite");

//   const startRecording = (type) => {
//     navigate(
//       `/record?type=${type}&invite=${invite}&questionId=${id}`
//     );
//   };

//   return (
//     <div className="container">
//       <h1>Question {id}</h1>

//       <p>
//         Record your answer for this question.
//       </p>

//       <button
//         onClick={() => startRecording("audio")}
//       >
//         Record Audio
//       </button>

//       <br /><br />

//       <button
//         onClick={() => startRecording("video")}
//       >
//         Record Video
//       </button>
//     </div>
//   );
// }

// export default Question;

import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

function Question() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const invite = searchParams.get("invite");

  const [question, setQuestion] = useState(null);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/questions/${id}`
      );

      setQuestion(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  const startRecording = (type) => {
    navigate(
      `/record?type=${type}&invite=${invite}&questionId=${id}`
    );
  };

  if (!question) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <h1>Story Question</h1>

      <h2>{question.question}</h2>

      <p>
        <strong>Category:</strong> {question.category}
      </p>

      <button onClick={() => startRecording("audio")}>
        Record Audio
      </button>

      <br /><br />

      <button onClick={() => startRecording("video")}>
        Record Video
      </button>
    </div>
  );
}

export default Question;