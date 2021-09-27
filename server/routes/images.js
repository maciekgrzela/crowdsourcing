const express = require('express');
const { getRandomImage } = require('../services/images');

const router = express.Router();

router.get('/random', async (req, res) => {
  const image = await getRandomImage();
  res.status(image.status).json(image.content);
});

module.exports = router;
