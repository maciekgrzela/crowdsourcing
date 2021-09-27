const express = require('express');
const router = express.Router();
const {
  generateToken,
  sendEmailWithToken,
  getRegistrationToken,
} = require('../services/registrationTokens');

router.get('/:id', async (req, res) => {
  try {
    const registrationToken = await getRegistrationToken(req.params.id);
    res.status(registrationToken.status).json(registrationToken.content);
  } catch (e) {
    res.status(e.statusCode).json(e.message);
  }
});

router.post('/generate', async (req, res) => {
  try {
    const tokenGenerated = await generateToken(req.body);
    const emailSent = await sendEmailWithToken(tokenGenerated.content);
    res.status(emailSent.status).json(emailSent.content);
  } catch (e) {
    res.status(e.statusCode).json(e.message);
  }
});

module.exports = router;
