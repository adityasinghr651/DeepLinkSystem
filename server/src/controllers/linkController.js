let totalVerifications = 0;
let successfulVerifications = 0;
let totalLatency = 0;
const jwt = require('jsonwebtoken');

// 1. Create a Magic Deep Link
const generateLink = (req, res) => {
  try {
    console.log("REQ BODY ", req.body);
    console.log("JWT_SECRET ", process.env.JWT_SECRET);
    console.log("FRONTEND_URL ", process.env.FRONTEND_URL);

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
    console.error("GENERATE LINK ERROR:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// 2. Verify the Deep Link
const verifyLink = (req, res) => {
  const { token } = req.body;
  const startTime = Date.now();

  totalVerifications++;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const latency = Date.now() - startTime;
    totalLatency += latency;
    successfulVerifications++;

    res.json({
      success: true,
      data: decoded,
      latency
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Link Expired or Invalid"
    });
  }
}; 

const getStats = (req, res) => {
  const trustScore = totalVerifications === 0
    ? 100
    : ((successfulVerifications / totalVerifications) * 100).toFixed(1);

  const avgLatency = successfulVerifications === 0
    ? 0
    : Math.round(totalLatency / successfulVerifications);

  res.json({
    trustScore: `${trustScore}%`,
    avgLatency: `${avgLatency}ms`,
    activeSessions: successfulVerifications
  });
};


module.exports = { generateLink, verifyLink, getStats };
