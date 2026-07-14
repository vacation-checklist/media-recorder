

const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const ai = require("../config/gemini");


const pool = require("../config/db");

const {
  createUserContent,
  createPartFromUri,
} = require("@google/genai");

router.post("/upload", upload.single("media"), async (req, res) => {
  try {
    const invite = req.body.invite;
 const questionId = req.body.questionId;
 const mediaType = req.body.type;

console.log(questionId);


    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("Uploading file to Gemini...");

    // Upload file to Gemini
    const uploadedFile = await ai.files.upload({
      file: req.file.path,
      config: {
        mimeType: req.file.mimetype,
      },
    });

    console.log("File uploaded.");
    console.log(uploadedFile);

    // Generate transcript
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: createUserContent([
        createPartFromUri(
          uploadedFile.uri,
          uploadedFile.mimeType
        ),
        "You are a speech transcription system. Transcribe the spoken words exactly as they are spoken in the audio. Return only the transcript and do not summarize, explain, rephrase. Do not add introductions, conclusions, or any extra words. Preserve filler words such as um and uh, as well as pauses if they are spoken, and keep the original language unchanged. If there is no speech in the audio, return exactly NO_SPEECH. Do not include markdown, quotation marks, or any additional formatting.",
      ]),
    });

    const transcript = result.text;

    console.log("Transcript:");
    console.log(transcript);
  

//     await pool.query(
//   `INSERT INTO recordings
//   (invite_token, filename, transcript)
//   VALUES ($1, $2, $3)`,
//   [
//     invite,
//     req.file.filename,
//     transcript,
//   ]
// );
    
// await pool.query(
//   `INSERT INTO recordings
//   (invite_token, question_id, filename, transcript)
//   VALUES ($1, $2, $3, $4)`,
//   [
//     req.body.invite,
//     questionId,
//     req.file.filename,
//     transcript,
//   ]
// );

await pool.query(
  `INSERT INTO recordings
  (invite_token, question_id, filename, media_type, transcript)
  VALUES ($1,$2,$3,$4,$5)`,
  [
    req.body.invite,
    questionId,
    req.file.filename,
    mediaType,
    transcript,
  ]
);

    res.json({
      success: true,
      invite,
      filename: req.file.filename,
      transcript,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/recordings/:invite", async (req, res) => {
  try {
    const { invite } = req.params;

    const result = await pool.query(
      `SELECT
          id,
          question_id,
          filename,
          transcript
       FROM recordings
       WHERE invite_token = $1
       ORDER BY id`,
      [invite]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;