const http = require("http");
const Emitter = require("events");
const response = require("./lib/response");
const context = require("./lib/context");
const request = require("./lib/request");
const compose = require("./lib/compose");

module.exports = class Application extends Emitter {
  constructor() {
    super();

    this.middleware = []; // 存储所有中间件
    this.env = process.env.NODE_ENV || "development";
    this.context = Object.create(context); // 中间件的ctx参数的原型
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  listen(...args) {
  	// 用http创建http服务，启动监听
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }

  use(fn) {
    if (typeof fn !== "function")
      throw new TypeError("middleware must be a function!");
    this.middleware.push(fn);
    return this; // 实现链式编程
  }

  callback() {
    const fn = compose(this.middleware);

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }

  handleRequest(ctx, fnMiddleware) {
    const handleResponse = () => respond(ctx);
    fnMiddleware(ctx); // 开始递归调用 所有中间件函数
    return handleResponse(); // 所有中间件执行后，开始给客户端响应数据
  }

  createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    return context;
  }
};

function respond(ctx) {
  // 获取node原生响应对象
  const res = ctx.res;

  let body = ctx.body;
  const code = ctx.status;

  // status body
  if (null == body) {
    body = ctx.message || String(code);
    return res.end(body);
  }

  // responses
  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' == typeof body) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);
  // body: json
  body = JSON.stringify(body);
  res.end(body);
}
