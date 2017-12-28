const Koa = require('koa');
const serve = require('koa-static');
const app = new Koa();

app.use(serve('.'));


app.use(async ctx => {
    ctx.body = 'Hello World';
});


app.listen(8088);