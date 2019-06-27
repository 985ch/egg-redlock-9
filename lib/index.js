'use strict';

const _ = require('lodash');
const redlock = require('redlock');

function getClients(app, config) {
  let names = config.clients || config.client;
  if (_.isUndefined(names)) {
    return [ app.redis ];
  }
  if (_.isString(names))names = [ names ];

  const clients = [];
  for (const name of names) {
    const cli = app.redis.get(name);
    if (!cli) throw new Error(`[redlock9]invalid redis client [${name}]`);
    clients.push(cli);
  }
  return clients;
}

module.exports = (app, config) => {
  const clients = getClients(app, config);
  const locker = new redlock(clients, config.options);
  return {
    locker,
    async run(resouce, ttl, func) {
      const l = await locker.lock(resouce, ttl);
      try {
        await func(l);
        await locker.unlock(l);
      } catch (e) {
        await locker.unlock(l);
        throw e;
      }
    },
    async once(resouce, ttl, func) {
      const l = await locker.lock(resouce, 100);
      try {
        await locker.extend(l, ttl);
        await func(l);
      } catch (e) {
        await locker.unlock(l);
        throw e;
      }
    },
  };
};
