'use strict';

const mock = require('egg-mock');

describe('test/redlock-9.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/redlock-9-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, redlock9')
      .expect(200);
  });
});

describe('test/redlock-9.test.1.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/redlock-9-test.1',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, redlock9')
      .expect(200);
  });
});
