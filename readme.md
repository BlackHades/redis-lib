redis-lib 
===========
This is a wrapper around `ioredis` which provides automatic reconnects.

## Features
- Uses `ioredis` for connection management
- Easy Installation and Use
- Simple Exposed Functions
- Supports all redis commands supported by ioredis
- Clear Error Response

## Installation
```json
"dependencies": {
    "redis-lib": "^0.0.2"
}
```
```npm install redis-lib```

## Initialization
```javascript
const redis = require("redis-lib")({
    appName: "test-file",
    url: "redis://localhost:6379"
})
//when initializing redis, pass in the url
//When no url is passed, REDIS_CLUSTER_URL and/or REDIS_URL from process.env is used
//When using cluster, URL should be passed as "redis://:password@host:port-1,redis://:password@host:port-2,redis://:password@host:port-3"

```


### Basic functionality
- Set A Value
```javascript
const response = await redis.set("new", "old");
```
- Get A Value
```javascript
//(async/await)
const response = await redis.get("new");
```
-- To close a connection
```javascript
    redis.disconnect();
```


### Tests
#### Cli
```bash
npm install
npm test
```

#### Contributors
- [Micheal Akinwonmi](https://github.com/blackhades)
