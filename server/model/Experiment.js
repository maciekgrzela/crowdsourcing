const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExperimentSchema = new Schema({
  feedbackForAdjustingSet: { type: Number, min: 0, max: 5 },
  participantEmail: { type: String },
  participantAge: { type: Number, min: 0, max: 100 },
  results: [
    {
      index: { type: Number },
      label: { type: Number },
      milliseconds: { type: Number },
    },
  ],
  inputInterface: { type: String, default: null },
  breaks: [{ type: Number }],
  isValid: { type: Boolean },
});

const Experiment = mongoose.model('experiment', ExperimentSchema);

module.exports = {
  ExperimentSchema,
  Experiment,
};
