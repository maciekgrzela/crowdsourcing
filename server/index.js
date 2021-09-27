const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const foldsRoutes = require('./routes/folds');
const imagesRoutes = require('./routes/images');
const authRoutes = require('./routes/auth');
const registrationTokenRoutes = require('./routes/registrationTokens');
const experimentsRoutes = require('./routes/experiments');
const { DB_CONNECTION, PORT } = require('./config');

global.__basedir = __dirname;
global.TOKEN_SECRET = crypto.randomBytes(32).toString('hex');

const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/folds', foldsRoutes);
app.use('/api/imgs', imagesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/registration/token', registrationTokenRoutes);
app.use('/api/experiments', experimentsRoutes);

mongoose.connect(DB_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});
