const express = require('express');
const router = express.Router();

router.get('/trigger-error', (req, res, next) => {
    const error = new Error('Intentional 500 error triggered for testing purposes');
    error.status = 500;
    throw error;
});

module.exports = router;
