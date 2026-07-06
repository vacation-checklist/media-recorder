import { useSearchParams, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const invite = searchParams.get("invite");

  console.log(invite);


  return (
    <div className="container">

      <h1>Welcome</h1>

      <p>Please choose what you want to record.</p>

      <button
        onClick={() =>
          navigate(`/record?type=audio&invite=${invite}`)
        }
      >
        Record Audio
      </button>

      <button
        onClick={() =>
          navigate(`/record?type=video&invite=${invite}`)
        }
      >
        Record Video
      </button>

    </div>
  );
}

export default Home;