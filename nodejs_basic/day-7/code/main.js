const Koa = require("koa");

const app = new Koa();

// function fn() { return 1 }

// function haha(ctx, next) {
//   var n = '2'
//   return new Promise((resolve, reject) => {
//     try {
//       var res = parseInt(n);
//       var n = await fn()
//       resolve(res + n);
//     } catch (err) {
//       reject(err);
//     }
//   });
// }
// app.use(haha)
app.use((ctx, next) => {
  next().then(res => {
    console.log(res);
  })
})

app.use(async (ctx, next) => {
  // console.log(1);
  // await haha();
  await next(); // await 只能在async函数内部使用
  // console.log(1); // 数据库的操作
  return 1;
});

app.use(async (ctx, next) => {
  // console.log(2);
  await next(); //
  // console.log(2);
});

app.use(async (ctx, next) => {
  // console.log(3);
  await next(); //
  // console.log(3);
});

app.use(async ctx => {
  ctx.body = "Hello, World."; // 其实并不是真正的响应
});

app.listen(3000, err => {
  if (err) return console.error(err);
  console.log("Serve Running.");
});

// 最先挂载的中间件依旧 优先级最高， 最先执行
// 先打印 1，next() 此时，代码会暂停执行，去执行下一个中间件
// 打印2，next() 代码会暂停执行，去执行下一个中间件,直到最后一个中间件
// 最后中间件执行完毕后，会依次向上返回，继续执行上面暂停的代码。
// 1 2 3 3 2 1
