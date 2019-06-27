'use strict';

const { promisify } = require('util');
const Controller = require('egg').Controller;

const wait = promisify((n, callback) => {
  setTimeout(() => { callback(null, 1); }, n);
});

class HomeController extends Controller {
  async index() {
    const { app } = this;
    const start = Date.now();
    app.redlock9.once('once', 3000, async () => {
      console.log('One:' + (Date.now() - start));
      await wait(20);
    });
    app.redlock9.once('once', 3000, async () => {
      console.log('Two:' + (Date.now() - start));
      await wait(400);
    });
    this.ctx.body = 'hi, ' + app.plugins.redlock9.name;
  }
}

module.exports = HomeController;
