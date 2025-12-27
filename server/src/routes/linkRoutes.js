const express = require('express');
const router = express.Router();
const { generateLink, verifyLink} = require('../controllers/linkController');

const { protect } = require('../middleware/authMiddleware');

// POST /api/links/generate -> Generate a new link
router.post('/generate', generateLink);

// GET /api/links/:id -> Get link details by ID
router.post('/verify', verifyLink);

// 👇 ADDED THIS NEW PROTECTED ROUTE 👇
// This route uses the 'protect' middleware. 
// It will only work if the request has a valid Authorization header.
router.get('/profile', protect, (req, res) => {
    res.json({ 
        success: true,
        message: "Welcome to the protected profile route!", 
        user: req.user // logic: middleware extracted the user from token
    });
});

module.exports = router;