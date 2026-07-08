import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RecordRTC from "recordrtc";

function Recorder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");
  const invite = searchParams.get("invite");
  

  const recorder = useRef(null);
  const stream = useRef(null);
  const previewVideo = useRef(null);
  const timerRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // --------------------------
  // Start Recording
  // --------------------------

  const startRecording = async () => {
    try {
      let mediaStream;

      if (type === "video") {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (previewVideo.current) {
          previewVideo.current.srcObject = mediaStream;
        }
      } else {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
      }

      stream.current = mediaStream;

      recorder.current = new RecordRTC(mediaStream, {
        type: type,
      });

      recorder.current.startRecording();

      setIsRecording(true);
      setIsPaused(false);

      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error(error);
      alert("Unable to access camera/microphone.");
    }
  };

  // --------------------------
  // Pause Recording
  // --------------------------

  const pauseRecording = () => {
    if (!recorder.current) return;

    recorder.current.pauseRecording();

    clearInterval(timerRef.current);

    setIsPaused(true);
  };

  // --------------------------
  // Resume Recording
  // --------------------------

  const resumeRecording = () => {
    if (!recorder.current) return;

    recorder.current.resumeRecording();

    setIsPaused(false);

    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  // --------------------------
  // Stop Recording
  // --------------------------

  const stopRecording = () => {
    if (!recorder.current) return;

    recorder.current.stopRecording(() => {
      const blob = recorder.current.getBlob();

      const url = URL.createObjectURL(blob);

      clearInterval(timerRef.current);

      setIsRecording(false);
      setIsPaused(false);
      setSeconds(0);

      if (stream.current) {
        stream.current.getTracks().forEach((track) => track.stop());
      }

      if (previewVideo.current) {
        previewVideo.current.srcObject = null;
      }

      navigate("/preview", {
        state: {
          url,
          blob,
          type,
          invite,
        },
      });
    });
  };

  // --------------------------
  // Timer
  // --------------------------

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <div className="container">
      <h1>
        {type === "video"
          ? "Video Recorder"
          : "Audio Recorder"}
      </h1>

      {type === "video" && (
        <video
          ref={previewVideo}
          autoPlay
          muted
          playsInline
          width="500"
          style={{ border: "2px solid black", borderRadius: "8px" }}
        />
      )}

      <h2>
        Timer: {minutes}:{secs}
      </h2>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={startRecording}
          disabled={isRecording}
        >
          Start Recording
        </button>

        <button
          onClick={pauseRecording}
          disabled={!isRecording || isPaused}
        >
          Pause Recording
        </button>

        <button
          onClick={resumeRecording}
          disabled={!isPaused}
        >
          Resume Recording
        </button>

        <button
          onClick={stopRecording}
          disabled={!isRecording}
        >
          Stop Recording
        </button>
      </div>
    </div>
  );
}

export default Recorder;