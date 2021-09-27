const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { default: validate } = require('deep-email-validator');
const { Resolver } = require('dns').promises;
const net = require('net');

const randomInt = (min, max) => Math.floor(min + Math.random() * (max - min));

const csvFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const verifyToken = (req, res, next) => {
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send('Nie wprowadzono tokenu autoryzacyjnego');
  }

  jwt.verify(token, global.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send('Nie udało się zweryfikować tokenu');
    }
    next();
  });
};

const verifyEmail = async (email) => {
  const resolver = new Resolver();

  try {
    const validMx = await resolver.resolveMx(
      email.substr(email.indexOf('@') + 1)
    );
    if (validMx.length > 0) {
      return true;
    }
  } catch (e) {
    return false;
  }

  return true;
};

module.exports = {
  randomInt,
  csvFilter,
  verifyToken,
  verifyEmail,
};
