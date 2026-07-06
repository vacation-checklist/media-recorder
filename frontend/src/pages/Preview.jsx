import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Preview() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return <h2>No Recording Found</h2>;
  }

  const { url, blob, type } = state;

  const handleUpload = async () => {
    try {
      const formData = new FormData();

      formData.append(
        "media",
        blob,
        type === "video" ? "video.webm" : "audio.webm"
      );

      const response = await axios.post(
        "http://localhost:5000/media/upload",
        formData
      );

      console.log(response.data);

      alert("Recording Uploaded Successfully!");

      navigate("/success");
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };

  return (
    <div className="container">
      <h1>Preview Recording</h1>

      {type === "video" ? (
        <video src={url} controls width="500" />
      ) : (
        <audio src={url} controls />
      )}

      <br /><br />

      <button onClick={() => navigate(`/record?type=${type}`)}>
        Redo
      </button>

      <button onClick={handleUpload}>
        Accept
      </button>
    </div>
  );
}

export default Preview;