const { IMGS_BASE_URL } = require('../config');
const { randomInt } = require('../helpers/helpers');
const Status = require('../responseStatus');

const getRandomImage = () => {
  return {
    status: Status.OK,
    content: {
      imgURL: `${IMGS_BASE_URL}/${randomInt(500)}.jpg`,
    },
  };
};

module.exports = {
  getRandomImage,
};
