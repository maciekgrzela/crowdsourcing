const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoldSchema = new Schema({
  indexes: [{ type: Number }],
});

const Fold = mongoose.model('fold', FoldSchema);

module.exports = {
  Fold,
  FoldSchema,
};
