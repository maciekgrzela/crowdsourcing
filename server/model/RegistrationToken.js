const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistrationTokenSchema = new Schema({
  isValid: { type: Boolean, default: false },
  emailAssigned: String,
});

const RegistrationToken = mongoose.model(
  'registration-token',
  RegistrationTokenSchema
);

module.exports = {
  RegistrationToken,
  RegistrationTokenSchema,
};
