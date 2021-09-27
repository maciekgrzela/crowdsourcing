const express = require('express');
const { verifyToken, csvFilter } = require('../helpers/helpers');
const multer = require('multer');
const router = express.Router();
const {
  generateExperiment,
  sendEmailWithToken,
  getExperiments,
  getExperiment,
  updateAdjustingInfo,
  updateResults,
  updateValidity,
  downloadExperiments,
} = require('../services/experiments');

router.get('/', verifyToken, async (req, res) => {
  try {
    const experiments = await getExperiments(req.body);
    res.status(experiments.status).json(experiments.content);
  } catch (e) {
    res.status(e.statusCode).json(e.message);
  }
});

router.get('/download', async (req, res) => {
  try {
    const experimentsFile = await downloadExperiments();
    res.download(experimentsFile.filename, experimentsFile.filepath);
  } catch (e) {
    console.log(e);
    res.status(e.statusCode).json(e.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const experiment = await getExperiment(req.params.id);
    res.status(experiment.status).json(experiment.content);
  } catch (e) {
    res.status(e.statusCode).json(e.message);
  }
});

router.post('/generate', async (req, res) => {
  try {
    const experimentGenerated = await generateExperiment(req.body);
    const emailSent = await sendEmailWithToken(experimentGenerated);
    res.status(emailSent.status).json(emailSent.content);
  } catch (e) {
    res.status(e.statusCode).json(e.message);
  }
});

router.put('/:id/adjusting/info', async (req, res) => {
  try {
    const experimentUpdated = await updateAdjustingInfo(
      req.params.id,
      req.body
    );
    res.status(experimentUpdated.status).json(experimentUpdated.content);
  } catch (e) {
    res.status(e.statusCode).json(e.message);
  }
});

router.put('/:id/results', async (req, res) => {
  try {
    const experimentUpdated = await updateResults(req.params.id, req.body);
    res.status(experimentUpdated.status).json(experimentUpdated.content);
  } catch (e) {
    res.status(e.statusCode).json(e.message);
  }
});

router.put('/:id/finish', async (req, res) => {
  try {
    const experimentUpdated = await updateValidity(req.params.id, req.body);
    res.status(experimentUpdated.status).json(experimentUpdated.content);
  } catch (e) {
    console.log(e);
    res.status(e.statusCode).json(e.message);
  }
});

module.exports = router;
