'use strict';

exports.keys = '123456';

exports.redis = {
  client: {
    port: 6379,
    host: '127.0.0.1',
    db: 0,
    password: '',
  },
};

exports.redlock9 = {
  logger: app => e => app.logger.info(e.message),
  options: {
    // the expected clock drift; for more details
    // see http://redis.io/topics/distlock
    driftFactor: 0.01, // time in ms

    // the max number of times Redlock will attempt
    // to lock a resource before erroring
    retryCount: 5,

    // the time in ms between attempts
    retryDelay: 20, // time in ms

    // the max time in ms randomly added to retries
    // to improve performance under high contention
    // see https://www.awsarchitectureblog.com/2015/03/backoff.html
    retryJitter: 10, // time in ms
  },
};
