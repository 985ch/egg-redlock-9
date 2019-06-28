'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { app } = this;
    await app.redlock9.once('once', async () => {
      console.log('Action One');
    });
    await app.redlock9.once('once', async () => {
      console.log('Action Two');
    });
    this.ctx.body = 'hi, ' + app.plugins.redlock9.name;
  }
}

module.exports = HomeController;
