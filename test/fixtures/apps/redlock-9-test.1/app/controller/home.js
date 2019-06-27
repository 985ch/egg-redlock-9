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
    app.redlock9.run('test', 1000, async () => {
      console.log('One:' + (Date.now() - start));
      await wait(20);
    });
    await wait(10);
    app.redlock9.run('test', 20, async () => {
      console.log('Two:' + (Date.now() - start));
      await wait(400);
    });
    await wait(10);
    app.redlock9.run('test', 20, async () => {
      console.log('Three:' + (Date.now() - start));
      await wait(40);
    });
    await wait(2000);
    this.ctx.body = 'hi, ' + app.plugins.redlock9.name;
  }
}

module.exports = HomeController;
