const express = require('express');
const router = express.Router();
const {
  registerUser,
  getCurrentUser,
  loginUser,
  editUserInfo,
} = require('../services/auth');
const { verifyToken } = require('../helpers/helpers');

router.post('/login', async (req, res) => {
  try {
    const userLogged = await loginUser(req.body);
    res.status(userLogged.status).json(userLogged.content);
  } catch (e) {
    res.status(e.statusCode).json(e.message);
  }
});

router.post('/:id/edit/info', verifyToken, async (req, res) => {
  try {
    const userInfoEdited = await editUserInfo(req.params.id, req.body);
    res.status(userInfoEdited.status).json(userInfoEdited.content);
  } catch (e) {
    res.status(e.statusCode).json(e.message);
  }
});

router.post('/register', async (req, res) => {
  try {
    const userRegistered = await registerUser(req.body);
    res.status(userRegistered.status).json(userRegistered.content);
  } catch (e) {
    res.status(e.statusCode).json(e.message);
  }
});

router.get('/current', async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const usersData = await getCurrentUser(token);
    res.status(usersData.status).json(usersData.content);
  } catch (e) {
    res.status(e.statusCode).json(e.message);
  }
});

module.exports = router;
