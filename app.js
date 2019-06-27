'use strict';

const redlock9 = require('./lib');

module.exports = app => {
  if (app.config.redlock9)app.redlock9 = redlock9(app, app.config.redlock9);
};
