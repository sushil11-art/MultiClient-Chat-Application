const moment = require('moment');

async function formatMessage(username, text) {
  return {
    username,
    text,
  };
}

module.exports = formatMessage;