'use strict';

const _ = require('lodash');
const redlock = require('redlock');

class Redlock9Error extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

function getClients(app, config) {
  let names = config.clients || config.client;
  if (_.isUndefined(names)) {
    return [ app.redis ];
  }
  if (_.isString(names))names = [ names ];

  const clients = [];
  for (const name of names) {
    const cli = app.redis.get(name);
    if (!cli) throw new Redlock9Error(`invalid redis client: ${name}`);
    clients.push(cli);
  }
  return clients;
}

async function unlock(locker, l, log) {
  try {
    await locker.unlock(l);
  } catch (e) {
    logLockErr(log, e);
  }
}

function logLockErr(log, e) {
  if (e.name !== 'LockError') {
    throw e;
  }
  if (log)log(e);
}

module.exports = (app, config) => {
  const clients = getClients(app, config);
  const locker = new redlock(clients, config.options);
  const log = config.logger ? config.logger(app) : null;
  locker.run = async function(resouce, ttl, func) {
    let l = null;
    try {
      l = await this.lock(resouce, ttl);
      await func(l);
      await unlock(this, l, log);
    } catch (e) {
      if (l) await unlock(this, l, log);
      throw e;
    }
  };
  locker.once = async function(resouce, func, wait = 500, duration = 3600000) {
    let l = null;
    try {
      l = await this.lock(resouce, wait);
    } catch (e) {
      logLockErr(log, e);
    }
    if (!l) return false;
    try {
      await this.extend(l, duration);
      await func(l);
    } catch (e) {
      await unlock(this, l, log);
      throw e;
    }
    return true;
  };
  return locker;
};
