const express = require('express');
const router = express.Router();
const { parseUrl } = require('../services/parserService');

// GET /api/audit
router.get('/audit', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid URL query parameter.'
    });
  }

  try {
    const report = await parseUrl(url);
    return res.json({
      success: true,
      data: report
    });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      error: err.message || 'Internal Server Error'
    });
  }
});

module.exports = router;