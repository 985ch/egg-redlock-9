# egg-redlock-9

![node version][node-image]
[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[node-image]: https://img.shields.io/badge/node-%3E%3D8-blue.svg
[npm-image]: https://img.shields.io/npm/v/egg-redlock-9.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-redlock-9
[download-image]: https://img.shields.io/npm/dm/egg-redlock-9.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-redlock-9

该插件通过引用[redlock](https://github.com/mike-marcacci/node-redlock)实现了分布式锁，并且在其基础上补充了run和once两个方法

## 依赖说明

### 依赖的插件

- [egg-redis](https://github.com/eggjs/egg-redis)

## 使用方式

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
  /* 这里是你的redis设置 */
}
exports.redlock9 = {
  clients: [ 'redis1', 'redis2', 'redis3' ], // 在这里配置对应的redis客户端，也可用client来配置单个客户端，若egg-redis没有配置clients可以省略该配置
  logger: app => e => app.info(e.message), // 获取锁失败时输出日志用的函数，可以省略
  options: { // redlock自带选项
    driftFactor: 0.01,
    retryCount: 5,
    retryDelay: 200,
    retryJitter: 50,
};
```
```js
// {app_root}/app/****.js
await app.redlock9.run(resouce, ttl, async (lock) => { /* 在这里完成你的任务 */ }); // 利用分布式锁执行任务
const success = await app.redlock9.once(resouce, async (lock)=>{ /* 在这里完成你的任务 */ }, wait, duration) // 在执行在持续时间内只执行一次的任务 

//你也可以在redlock9对象上直接使用redlock的方法，如：app.redlock.unlock(lock)
```
在这里查看[redlock](https://github.com/mike-marcacci/node-redlock#api-docs)的方法

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 单元测试

请先在本地启动一个redis服务器
```sh
npm run test
```

## License

[MIT](LICENSE)
