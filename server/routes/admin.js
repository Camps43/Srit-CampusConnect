const express = require("express");
const router = express.Router();
const { verifyToken, permit } = require("../middleware/authMiddleware");

router.get("/dashboard", verifyToken, permit("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

module.exports = router;
