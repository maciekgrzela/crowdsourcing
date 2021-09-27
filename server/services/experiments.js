const RestError = require('../errors/RestError');
const { Fold } = require('../model/Fold');
const { Experiment } = require('../model/Experiment');
const Status = require('../responseStatus');
const { randomInt, verifyEmail } = require('../helpers/helpers');
const nodemailer = require('nodemailer');
const { SMTP_CREDENTIALS } = require('../config');
const fs = require('fs').promises;

const getExperiment = async (id) => {
  try {
    const experiment = await Experiment.findById(id);

    if (experiment === null) {
      throw new RestError(
        Status.NOT_FOUND,
        'Brak eksperymentu o podanym identyfikatorze'
      );
    }

    return {
      status: Status.OK,
      content: experiment,
    };
  } catch (e) {
    throw new RestError(
      Status.INTERNAL_ERROR,
      'Wystąpił błąd po stronie serwera związany z odczytem danych'
    );
  }
};

const downloadExperiments = async () => {
  try {
    const experiments = await Experiment.find({ isValid: false });

    if (experiments === null) {
      throw new RestError(Status.NOT_FOUND, 'Brak ukończonych eksperymentów');
    }

    await fs.writeFile(
      './experiments.json',
      JSON.stringify(experiments),
      'utf8'
    );
  } catch (e) {
    throw new RestError(
      Status.INTERNAL_ERROR,
      'Wystąpił błąd po stronie serwera związany z pobieraniem pliku'
    );
  }

  return {
    filepath: __basedir,
    filename: 'experiments.json',
  };
};

const getExperiments = async () => {
  try {
    const experiments = await Experiment.find();
    return {
      status: Status.OK,
      content: experiments,
    };
  } catch (e) {
    throw new RestError(
      Status.INTERNAL_ERROR,
      'Wystąpił błąd po stronie serwera związany z odczytem danych'
    );
  }
};

const generateExperiment = async (data) => {
  let newExperiment = null;

  const emailValid = await verifyEmail(data.email);

  if (!emailValid) {
    throw new RestError(Status.NOT_FOUND, 'Podany adres e-mail nie istnieje');
  }

  try {
    const folds = await Fold.find();
    const randomFold = folds[randomInt(0, folds.length)];
    const results = [];
    randomFold.indexes.forEach((index) => {
      results.push({
        index: index,
        label: 0,
      });
    });

    const experiment = new Experiment({
      feedbackForAdjustingSet: 0,
      participantEmail: data.email,
      participantAge: 0,
      results: results,
      breaks: [],
      isValid: true,
    });
    newExperiment = await experiment.save();
  } catch (e) {
    throw new RestError(
      Status.INTERNAL_ERROR,
      'Wystąpił błąd podczas generowania nowego eksperymentu'
    );
  }

  return {
    status: Status.OK,
    content: {
      ...newExperiment._doc,
      name: data.name === undefined || data.name === null ? null : data.name,
    },
  };
};

const sendEmailWithToken = async (experiment) => {
  experiment = experiment.content;
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: SMTP_CREDENTIALS,
  });

  const emailValid = await verifyEmail(experiment.participantEmail);

  if (!emailValid) {
    throw new RestError(Status.NOT_FOUND, 'Podany adres e-mail nie istnieje');
  }

  try {
    await transporter.sendMail({
      from: '"Powiadomienia KUM 🐸" <kum.powiadomienia@outlook.com>',
      to: experiment.participantEmail,
      subject: 'Zaproszenie do udziału w eksperymencie',
      text: `Korzystając z tego linku możesz wziąć udział w eksperymencie dostępnym w aplikacji Crowdsourcing: http://localhost:3000/experiment/${experiment._id}`,
      html: `${
        experiment.name !== null
          ? '<h1>Witaj ' + experiment.name + '!</h1>'
          : ''
      }<p>Korzystając z tego linku możesz wziąć udział w eksperymencie dostępnym w aplikacji Crowdsourcing:</p> http://localhost:3000/experiment/${
        experiment._id
      }`,
    });
  } catch (e) {
    console.log(e);
    throw new RestError(
      Status.INTERNAL_ERROR,
      'Wystąpił błąd podczas wysyłania tokenu rejestracji'
    );
  }

  return {
    status: Status.OK,
    content: '',
  };
};

const updateAdjustingInfo = async (id, data) => {
  const experiment = await Experiment.findById(id);

  if (experiment === null) {
    throw new RestError(
      Status.NOT_FOUND,
      'Brak eksperymentu o podanym identyfikatorze'
    );
  }

  try {
    await Experiment.updateOne(
      { _id: id },
      {
        participantAge: data.participantAge,
        feedbackForAdjustingSet: data.feedbackForAdjustingSet,
        inputInterface: data.inputInterface,
      }
    );
  } catch (e) {
    throw new RestError(
      Status.INTERNAL_ERROR,
      'Wystąpił błąd po stronie serwera związany z odczytem danych'
    );
  }

  return {
    status: Status.NO_CONTENT,
    content: '',
  };
};

const updateResults = async (id, results) => {
  const experiment = await Experiment.findById(id);

  if (experiment === null) {
    throw new RestError(
      Status.NOT_FOUND,
      'Brak eksperymentu o podanym identyfikatorze'
    );
  }

  try {
    await Experiment.updateOne({ _id: id }, { results: results });
  } catch (e) {
    throw new RestError(
      Status.INTERNAL_ERROR,
      'Wystąpił błąd po stronie serwera związany z odczytem danych'
    );
  }

  return {
    status: Status.NO_CONTENT,
    content: '',
  };
};

const updateValidity = async (id, data) => {
  const experiment = await Experiment.findById(id);

  if (experiment === null) {
    throw new RestError(
      Status.NOT_FOUND,
      'Brak eksperymentu o podanym identyfikatorze'
    );
  }

  let updateValues = {
    breaks: [...experiment.breaks, data.seconds],
  };

  if (data.break) {
    updateValues.isValid = true;
  } else {
    updateValues.isValid = false;
  }

  try {
    await Experiment.updateOne({ _id: id }, { ...updateValues });
  } catch (e) {
    console.log(e);
    throw new RestError(
      Status.INTERNAL_ERROR,
      'Wystąpił błąd po stronie serwera związany z odczytem danych'
    );
  }

  return {
    status: Status.NO_CONTENT,
    content: '',
  };
};

module.exports = {
  generateExperiment,
  sendEmailWithToken,
  getExperiments,
  getExperiment,
  updateAdjustingInfo,
  updateResults,
  updateValidity,
  downloadExperiments,
};
