const express = require('express');
const router = express.Router();
const {
  getContent,
  getContentById,
  getFeaturedContent,
} = require('../controllers/contentController');

router.get('/', getContent);
router.get('/featured', getFeaturedContent);
router.get('/:id', getContentById);

module.exports = router;