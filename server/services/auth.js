const RestError = require('../errors/RestError');
const { User } = require('../model/User');
const { RegistrationToken } = require('../model/RegistrationToken');
const Status = require('../responseStatus');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const editUserInfo = async (id, data) => {
  const user = await User.findById(id);

  if (user === null) {
    throw new RestError(Status.UNAUTHORIZED, 'Użytkownik nie istnieje');
  }

  let updateProperties = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
  };

  if (data.oldPassword !== undefined && data.oldPassword !== null) {
    const passwordIsValid = await bcrypt.compare(
      data.oldPassword,
      user.password
    );

    if (!passwordIsValid) {
      throw new RestError(Status.UNAUTHORIZED, 'Niepoprawne hasło');
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 8);
    updateProperties.password = hashedPassword;
  }

  try {
    await User.updateOne({ _id: id }, updateProperties);
  } catch (e) {
    throw new RestError(
      Status.INTERNAL_ERROR,
      'Wystąpił błąd podczas aktualizacji danych użytkownika'
    );
  }

  return {
    status: Status.NO_CONTENT,
    content: '',
  };
};

const loginUser = async (credentials) => {
  const user = await User.findOne({ email: credentials.email });

  if (user === null) {
    throw new RestError(Status.UNAUTHORIZED, 'Użytkownik nie istnieje');
  }

  const passwordIsValid = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (!passwordIsValid) {
    throw new RestError(
      Status.UNAUTHORIZED,
      'Niepoprawne hasło dla użytkownika'
    );
  }

  const token = jwt.sign({ id: user._id }, global.TOKEN_SECRET, {
    expiresIn: 86400,
  });

  const { password, ...userResource } = user._doc;

  userResource.token = token;

  return {
    status: Status.OK,
    content: userResource,
  };
};

const registerUser = async (credentials) => {
  if (
    credentials.registrationToken === undefined ||
    credentials.registrationToken === null
  ) {
    throw new RestError(Status.BAD_REQUEST, 'Brak tokenu rejestracji');
  }

  if (!mongoose.isValidObjectId(credentials.registrationToken)) {
    throw new RestError(
      Status.BAD_REQUEST,
      'Niepoprawna struktura tokenu rejestracji'
    );
  }

  const regToken = await RegistrationToken.findById(
    credentials.registrationToken
  );

  if (regToken === null || (regToken !== null && regToken.isValid === false)) {
    throw new RestError(
      Status.UNAUTHORIZED,
      'Niepoprawny lub nieaktywny token rejestracji'
    );
  }

  let token = null;
  let newUser = null;

  try {
    const hashedPassword = await bcrypt.hash(credentials.password, 8);

    const user = new User({
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      password: hashedPassword,
    });

    newUser = await user.save();

    token = jwt.sign({ id: newUser._id }, global.TOKEN_SECRET, {
      expiresIn: 86400,
    });

    regTokenUpdated = await RegistrationToken.updateOne(
      { _id: regToken._id },
      { isValid: false }
    );
  } catch (e) {
    throw new RestError(
      Status.INTERNAL_ERROR,
      'Wystąpił błąd podczas rejestracji danych użytkownika'
    );
  }

  const { password, ...userResource } = newUser._doc;

  return {
    status: Status.CREATED,
    content: {
      ...userResource,
      token: token,
    },
  };
};

const getCurrentUser = async (token) => {
  if (!token) {
    throw new RestError(
      Status.UNAUTHORIZED,
      'Brak aktualnie zalogowanego użytkownika'
    );
  }

  let user = null;
  let decoded = null;

  try {
    decoded = await jwt.verify(token, global.TOKEN_SECRET);
  } catch (e) {
    throw new RestError(
      Status.UNAUTHORIZED,
      'Niepoprawna struktura tokenu autoryzującego'
    );
  }

  user = await User.findById(decoded.id);

  if (user === null) {
    throw new RestError(Status.UNAUTHORIZED, 'Użytkownik nie istnieje');
  }

  const { password, ...userResource } = user._doc;

  userResource.token = token;

  return {
    status: Status.OK,
    content: userResource,
  };
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  editUserInfo,
};
