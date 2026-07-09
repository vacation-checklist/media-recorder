const express = require("express");
const router = express.Router();

const pool = require("../config/db");

// Get all questions
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM questions ORDER BY id"
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch questions"
    });
  }
});

// Get single question by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM questions WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.get("/answered/:invite", async (req, res) => {
  try {
    const { invite } = req.params;

    const result = await pool.query(
      `SELECT question_id
       FROM recordings
       WHERE invite_token = $1`,
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