// This controller handles creation and validation of secure deep links

const jwt = require('jsonwebtoken');

// 1. Create a Magic Deep Link
const generateLink = (req, res) => {
  try {
    console.log("REQ BODY 👉", req.body);
    console.log("JWT_SECRET 👉", process.env.JWT_SECRET);
    console.log("FRONTEND_URL 👉", process.env.FRONTEND_URL);

    const { userId, redirectUrl } = req.body;

    if (!userId || !redirectUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const token = jwt.sign(
      { userId, redirectUrl },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const deepLink = `${process.env.FRONTEND_URL}/verify?token=${token}`;

    res.json({ success: true, deepLink, token });
  } catch (err) {
    console.error("🔥 GENERATE LINK ERROR:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// 2. Verify the Deep Link
const verifyLink = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    // This throws an error if token is modified or expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // If successful, send data back
    res.json({ success: true, valid: true, data: decoded });

  } catch (error) {
    // Token is invalid or expired
    res.status(401).json({ success: false, valid: false, error: "Link Expired or Invalid" });
  }
};

module.exports = { generateLink, verifyLink };