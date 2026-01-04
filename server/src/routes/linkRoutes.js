const express = require('express');
const router = express.Router();
const { generateLink, verifyLink, getStats } = require('../controllers/linkController');


const { protect } = require('../middleware/authMiddleware');

// POST /api/links/generate -> Generate a new link
router.post('/generate', generateLink);

// GET /api/links/:id -> Get link details by ID
router.post('/verify', verifyLink);

router.get('/stats', getStats);

router.get('/profile', protect, (req, res) => {
    res.json({ 
        success: true,
        message: "Welcome to the protected profile route!", 
        user: req.user // logic: middleware extracted the user from token
    });
});

module.exports = router;