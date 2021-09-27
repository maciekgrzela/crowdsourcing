const RestError = require('../errors/RestError');
const { User } = require('../model/User');
const { RegistrationToken } = require('../model/RegistrationToken');
const Status = require('../responseStatus');
const { SMTP_CREDENTIALS } = require('../config');
const nodemailer = require('nodemailer');
const { validate } = require('deep-email-validator');

const generateToken = async (body) => {
  if (body.email === undefined || body.email === null) {
    throw new RestError(Status.BAD_REQUEST, 'Brak podanego adresu e-mail');
  }

  const emailResponse = await validate(body.email);

  if (!emailResponse.valid) {
    throw new RestError(Status.NOT_FOUND, 'Podany adres e-mail nie istnieje');
  }

  let newToken = null;

  try {
    const token = new RegistrationToken({
      emailAssigned: body.email,
      isValid: true,
    });

    newToken = await token.save();
  } catch (e) {
    throw new RestError(
      Status.INTERNAL_ERROR,
      'Wystąpił błąd podczas generowania tokenu rejestracji'
    );
  }

  return {
    status: Status.OK,
    content: {
      ...newToken,
    },
  };
};

const sendEmailWithToken = async (token) => {
  token = token._doc;
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: SMTP_CREDENTIALS,
  });

  const emailResponse = await validate(token.emailAssigned);

  if (!emailResponse.valid) {
    throw new RestError(Status.NOT_FOUND, 'Podany adres e-mail nie istnieje');
  }

  try {
    await transporter.sendMail({
      from: '"Powiadomienia KUM 🐸" <kum.powiadomienia@outlook.com>',
      to: token.emailAssigned,
      subject: 'Token rejestracji',
      text: `Korzystając z tego linku możesz utworzyć konto w aplikacji Crowdsourcing: http://localhost:3000/register/${token._id}`,
      html: `<b>Korzystając z tego linku możesz utworzyć konto w aplikacji Crowdsourcing:</b> http://localhost:3000/register/${token._id}`,
    });
  } catch (e) {
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

const getRegistrationToken = async (id) => {
  try {
    const token = await RegistrationToken.findById(id);

    if (token === null) {
      throw new RestError(
        Status.NOT_FOUND,
        'Brak tokenu rejestracji o podanym identyfikatorze'
      );
    }

    return {
      status: Status.OK,
      content: token,
    };
  } catch (e) {
    throw new RestError(
      Status.INTERNAL_ERROR,
      'Wystąpił błąd po stronie serwera związany z odczytem danych'
    );
  }
};

module.exports = {
  generateToken,
  sendEmailWithToken,
  getRegistrationToken,
};
