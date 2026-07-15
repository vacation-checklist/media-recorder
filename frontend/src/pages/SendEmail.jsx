// import { useState } from "react";
// import axios from "axios";

// function SendEmail() {
//   const [email, setEmail] = useState("");

//   const sendEmail = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/email/send",
//         {
//           email,
//         }
//       );

//       alert(res.data.message);
//     } catch (err) {
//       console.log(err);
//       alert("Failed to send email");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Send Recording Link</h1>

//       <input
//         type="email"
//         placeholder="Enter email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <br />
//       <br />

//       <button onClick={sendEmail}>
//         Send Email
//       </button>
//     </div>
//   );
// }

// export default SendEmail;

import { useState } from "react";
import axios from "axios";

function SendEmail() {

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");

  const sendEmail = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/email/send",
        {
          userName,
          userEmail,
          recipientName,
          recipientEmail
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
        placeholder="Your Name"
        value={userName}
        onChange={(e)=>setUserName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Your Email"
        value={userEmail}
        onChange={(e)=>setUserEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Recipient Name"
        value={recipientName}
        onChange={(e)=>setRecipientName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Recipient Email"
        value={recipientEmail}
        onChange={(e)=>setRecipientEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={sendEmail}>
        Send Email
      </button>

    </div>
  );
}

export default SendEmail;