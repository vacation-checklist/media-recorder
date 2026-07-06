import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Recorder from "./pages/Recorder";
import Preview from "./pages/Preview";
import Success from "./pages/Success";
import SendEmail from "./pages/SendEmail";

function App() {
  return (
    <Routes>
  <Route path="/" element={<SendEmail />} />
  <Route path="/record-home" element={<Home />} />
  <Route path="/record" element={<Recorder />} />
  <Route path="/preview" element={<Preview />} />
  <Route path="/success" element={<Success />} />
</Routes>
  );
}

export default App;