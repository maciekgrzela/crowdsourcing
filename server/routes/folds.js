const express = require('express');
const { uploadFolds, getFolds } = require('../services/folds');
const multer = require('multer');
const { csvFilter, verifyToken } = require('../helpers/helpers');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage, fileFilter: csvFilter });

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const folds = await getFolds();
    res.status(folds.status).json(folds.content);
  } catch (e) {
    res.status(e.statusCode).json(e.message);
  }
});

router.post('/upload', upload.single('folds'), async (req, res) => {
  try {
    const foldsUploaded = await uploadFolds(req.file);
    res.status(foldsUploaded.status).json(foldsUploaded.content);
  } catch (e) {
    res.status(e.statusCode).json(e.message);
  }
});

module.exports = router;
