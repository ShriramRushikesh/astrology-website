const asyncHandler = require('express-async-handler');
const Content = require('../models/Content');

// @desc    Get all content
// @route   GET /api/content
// @access  Public
const getContent = asyncHandler(async (req, res) => {
  const { category, limit } = req.query;
  
  let query = {};
  if (category) {
    query.category = category;
  }
  
  let contentQuery = Content.find(query).sort({ date: -1 });
  
  if (limit) {
    contentQuery = contentQuery.limit(parseInt(limit));
  }
  
  const content = await contentQuery.exec();
  res.json(content);
});

// @desc    Get content by ID
// @route   GET /api/content/:id
// @access  Public
const getContentById = asyncHandler(async (req, res) => {
  const content = await Content.findById(req.params.id);
  
  if (content) {
    res.json(content);
  } else {
    res.status(404);
    throw new Error('Content not found');
  }
});

// @desc    Get featured content
// @route   GET /api/content/featured
// @access  Public
const getFeaturedContent = asyncHandler(async (req, res) => {
  const content = await Content.find({ isFeatured: true }).limit(3).sort({ date: -1 });
  res.json(content);
});

module.exports = {
  getContent,
  getContentById,
  getFeaturedContent,
};