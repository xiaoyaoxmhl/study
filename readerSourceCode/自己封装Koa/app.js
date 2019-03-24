const MKoa = require("./myKoa");

const app = new MyKoa();

app.use((ctx, next) => {
  console.log('1');
  next()
  console.log(1);
});

app.use(ctx => {
  console.log('2');
  ctx.body = 'Home Page!'
  console.log(2);
})

app.listen(1234);
