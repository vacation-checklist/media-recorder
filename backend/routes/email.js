const express = require("express");
const router = express.Router();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/send", async (req, res) => {
  try {
    const { email } = req.body;

  
    const recordingLink = `${process.env.FRONTEND_URL}/record-home`;

    await resend.emails.send({
      from: "onboarding@resend.dev", // Change later to your verified sender
      to: email,
      subject: "Please Record Your Response",
      html: `
        <h2>Hello!</h2>

        <p>Please click the button below to record your audio or video.</p>

        <a
          href="${recordingLink}"
          style="
            background:#2563eb;
            color:white;
            padding:12px 20px;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Start Recording
        </a>
      `,
    });

    res.json({
      success: true,
      message: "Email Sent Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Email Failed",
    });
  }
});

module.exports = router;