import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">

      <h1>Welcome</h1>

      <p>Please choose what you want to record.</p>

      <button
        onClick={() =>
          navigate("/record?type=audio")
        }
      >
        Record Audio
      </button>

      <button
        onClick={() =>
          navigate("/record?type=video")
        }
      >
        Record Video
      </button>

    </div>
  );
}

export default Home;