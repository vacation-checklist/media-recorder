import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Recorder from "./pages/Recorder";
import Preview from "./pages/Preview";
import Success from "./pages/Success";
import SendEmail from "./pages/SendEmail";
import Questions from "./pages/Questions";
import Question from "./pages/Question";
import Playback from "./pages/Playback";

function App() {
  return (
    <Routes>
  <Route path="/" element={<SendEmail />} />
  <Route path="/record-home" element={<Home />} />
  <Route path="/record" element={<Recorder />} />
  <Route path="/preview" element={<Preview />} />
  <Route path="/success" element={<Success />} />
  <Route path="/questions" element={<Questions />} />
  <Route path="/question/:id" element={<Question />} />
  <Route path="/playback" element={<Playback />} />
</Routes>
  );
}

export default App;