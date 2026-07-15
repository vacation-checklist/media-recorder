// const express = require("express");
// const router = express.Router();
// const { Resend } = require("resend");
// const { v4: uuidv4 } = require("uuid");

// const resend = new Resend(process.env.RESEND_API_KEY);

// router.post("/send", async (req, res) => {
//   try {
//     const { email } = req.body;

//      // Generate unique invite token
//     const invite = uuidv4();

//     // Create unique recording link
//     //const recordingLink = `${process.env.FRONTEND_URL}/record-home?invite=${invite}`;
//     const recordingLink = `${process.env.FRONTEND_URL}/questions?invite=${invite}`;

//     await resend.emails.send({
//       from: "onboarding@resend.dev", // Change later to your verified sender
//       to: email,
//       subject: "Please Record Your Story",
//       html: `
//         <h2>Hello!</h2>

//         <p>Please click the button below to record your audio or video.</p>

//         <a
//           href="${recordingLink}"
//           style="
//             background:#2563eb;
//             color:white;
//             padding:12px 20px;
//             text-decoration:none;
//             border-radius:6px;
//           "
//         >
//           Start Recording
//         </a>
//       `,
//     });

//     res.json({
//       success: true,
//        invite,
//       recordingLink,
//       message: "Email Sent Successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Email Failed",
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

const { Resend } = require("resend");
const { v4: uuidv4 } = require("uuid");

const pool = require("../config/db");

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/send", async (req, res) => {

  try {

    const {
      userName,
      userEmail,
      recipientName,
      recipientEmail
    } = req.body;

    const invite = uuidv4();

    //const recordingLink = `${process.env.FRONTEND_URL}/record-home?invite=${invite}`;
       const recordingLink = `${process.env.FRONTEND_URL}/questions?invite=${invite}`;


    // Save user information
    await pool.query(
      `
      INSERT INTO users
      (
        invite_token,
        user_name,
        user_email,
        recipient_name,
        recipient_email,
        recording_link
      )
      VALUES($1,$2,$3,$4,$5,$6)
      `,
      [
        invite,
        userName,
        userEmail,
        recipientName,
        recipientEmail,
        recordingLink
      ]
    );

    // Send email
    await resend.emails.send({

      from: "onboarding@resend.dev",

      to: recipientEmail,

      subject: "Please Record Your Story",

      html: `
      <h2>Hello ${recipientName},</h2>

      <p>${userName} has invited you to record your memories.</p>

      <p>Please click below.</p>

      <a
      href="${recordingLink}"
      style="
      background:#2563eb;
      color:white;
      padding:12px 20px;
      text-decoration:none;
      border-radius:6px;
      ">
      Start Recording
      </a>
      `

    });

    res.json({

      success:true,
      invite,
      recordingLink,
      message:"Email Sent Successfully"

    });

  } catch(err){

    console.log(err);

    res.status(500).json({
      success:false,
      message:"Email Failed"
    });

  }

});

module.exports = router;