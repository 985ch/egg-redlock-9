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
    app.redlock9.run('test', 100, async () => {
      console.log('One:' + (Date.now() - start));
      await wait(30);
      console.log('complete one');
    });
    await wait(10);
    app.redlock9.run('test', 100, async () => {
      console.log('Two:' + (Date.now() - start));
      await wait(30);
      console.log('complete two');
    });
    await wait(10);
    app.redlock9.run('test', 100, async () => {
      console.log('Three:' + (Date.now() - start));
      await wait(30);
      console.log('complete three');
    });
    await wait(2000);
    this.ctx.body = 'hi, ' + app.plugins.redlock9.name;
  }
}

module.exports = HomeController;
