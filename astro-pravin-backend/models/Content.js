const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['remedy', 'video', 'blog', 'event'],
  },
  image: String,
  videoUrl: String,
  date: {
    type: Date,
    default: Date.now,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  tags: [String],
});

module.exports = mongoose.model('Content', contentSchema);