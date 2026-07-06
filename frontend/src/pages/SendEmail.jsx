import { useState } from "react";
import axios from "axios";

function SendEmail() {
  const [email, setEmail] = useState("");

  const sendEmail = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/email/send",
        {
          email,
        }
      );

      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert("Failed to send email");
    }
  };

  return (
    <div className="container">
      <h1>Send Recording Link</h1>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <button onClick={sendEmail}>
        Send Email
      </button>
    </div>
  );
}

export default SendEmail;