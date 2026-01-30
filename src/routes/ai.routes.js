const express = require('express');
const aiController = require("../controllers/ai.controller");

const router = express.Router();

// POST → for real usage
router.post("/get-review", aiController.getReview);

// GET → for browser/search testing
router.get("/get-review", aiController.getReview);

module.exports = router;
