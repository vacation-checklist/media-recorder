import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function Playback() {
  const [recordings, setRecordings] = useState([]);

  const [searchParams] = useSearchParams();
  const invite = searchParams.get("invite");

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/media/recordings/${invite}`
      );

      setRecordings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>My Recordings</h1>

      {recordings.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        >
          <h3>Question {item.question_id}</h3>

          {item.media_type === "video" ? (
            <video
              width="500"
              controls
              src={`http://localhost:5000/uploads/${item.filename}`}
            />
          ) : (
            <audio
              controls
              src={`http://localhost:5000/uploads/${item.filename}`}
            />
          )}

          <p>
            <strong>Transcript:</strong>
          </p>

          <p>{item.transcript}</p>
        </div>
      ))}
    </div>
  );
}

export default Playback;