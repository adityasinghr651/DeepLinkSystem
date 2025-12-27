const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  // 1. Check metadata headers for "Authorization"
  // Client sends: "Bearer <token_string>"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Add user info to request object so controllers can use it
      req.user = decoded;

      // 🚦 GREEN LIGHT: Go to the next function (Controller)
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

module.exports = { protect };