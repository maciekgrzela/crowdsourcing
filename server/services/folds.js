const RestError = require('../errors/RestError');
const { Fold } = require('../model/Fold');
const csvtojson = require('csvtojson');
const fs = require('fs');
const Status = require('../responseStatus');

const getFolds = async () => {
  try {
    const folds = await Fold.find();
    return {
      status: Status.OK,
      content: folds,
    };
  } catch (e) {
    throw new RestError(
      Status.INTERNAL_ERROR,
      'Wystąpił błąd po stronie serwera związany z odczytem danych'
    );
  }
};

const uploadFolds = async (file) => {
  if (file === undefined) {
    throw new RestError(
      Status.BAD_REQUEST,
      'Plik posiada nieprawidłowe rozszerzenie. Dozwolone rozszerzenie (*.csv)'
    );
  }

  const objectsToSave = [];
  let folds = [];

  try {
    folds = await csvtojson({ noheader: true }).fromFile(file.path);
  } catch (e) {
    throw new RestError(
      Status.INTERNAL_ERROR,
      'Wystąpił błąd po stronie serwera związany z konwersją danych z (*.csv) na json'
    );
  }

  try {
    for (const foldIndexes of folds) {
      objectsToSave.push({
        indexes: Object.values(foldIndexes),
      });
    }

    await Fold.deleteMany({});
    await Fold.insertMany(objectsToSave);
  } catch (e) {
    throw new RestError(
      Status.INTERNAL_ERROR,
      'Wystąpił błąd po stronie serwera związany z zapisem nowo wczytanych danych'
    );
  }

  fs.unlink(file.path, (err) => {});

  return {
    status: Status.CREATED,
    content: '',
  };
};

module.exports = {
  uploadFolds,
  getFolds,
};
