const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const BlogPost = require('../models/BlogPost');
const authenticate = require('../middleware/authenticate');

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Get all blog posts
router.get('/', authenticate, async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Get a single blog post by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// Create a new blog post
router.post(
  '/', authenticate,
  [
    body('title').notEmpty().withMessage('Title is required').trim().escape(),
    body('content').notEmpty().withMessage('Content is required').trim().escape(),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
      const newPost = new BlogPost({ title, content });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create blog post' });
    }
  }
);

// Delete a blog post by its ID
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// Update a blog post by its ID
router.put(
  '/:id', authenticate,
  [
    body('title').notEmpty().withMessage('Title is required').trim().escape(),
    body('content').notEmpty().withMessage('Content is required').trim().escape(),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
      const updatedPost = await BlogPost.findByIdAndUpdate(
        req.params.id,
        { title, content },
        { new: true }
      );

      if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update blog post' });
    }
  }
);

module.exports = router;