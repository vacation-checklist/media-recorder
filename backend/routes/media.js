const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

router.post("/upload", upload.single("media"), (req, res) => {

  console.log("Invite:", req.body.invite);

  console.log("File:", req.file);

  res.status(200).json({
    success: true,
     invite: req.body.invite,
    message: "Recording uploaded successfully",
    file: req.file,
  });
});

module.exports = router;