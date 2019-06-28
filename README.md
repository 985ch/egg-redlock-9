# egg-redlock-9

![node version][node-image]
[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-redlock-9.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-redlock-9
[download-image]: https://img.shields.io/npm/dm/egg-redlock-9.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-redlock-9

The plugin implements distributed locks by reference to [redlock](https://github.com/mike-marcacci/node-redlock) and adds two methods, run and once.

## [中文说明](./README.zh_CN.md)
## Install

```bash
$ npm i egg-redlock-9 --save
```

## Dependent plugin

- [egg-redis](https://github.com/eggjs/egg-redis)

## Usage

```js
// config/plugin.js
exports.redlock9 = {
  enable: true,
  package: 'egg-redlock-9',
};
```
```js
// {app_root}/config/config.default.js
exports.redis = {
  /* your redis configuration */
}
exports.redlock9 = {
  clients: [ 'redis1', 'redis2', 'redis3' ],
  logger: app => e => app.info(e.message), // logger when lock failed, can be false
  options: {
    driftFactor: 0.01, // time in ms
    retryCount: 5,
    retryDelay: 200, // time in ms
    retryJitter: 50, // time in ms
};


// {app_root}/app/****.js
await app.redlock9.run(resouce, ttl, async (lock) => { /* do something */ }); // run in lock
const success = await app.redlock9.once(resouce, async (lock)=>{ /* do something */ }, wait, duration) // run only once during the duration 

//You can also use the api of redlock as app.redlock.unlock(lock)
```
Api docs for [redlock](https://github.com/mike-marcacci/node-redlock#api-docs)

## Configuration

see [config/config.default.js](config/config.default.js) for more detail.

## Unit tests

Run redis-server in localhost first
```sh
npm run test
```

## License

[MIT](LICENSE)<br />
This README was translate by [google](https://translate.google.cn)
