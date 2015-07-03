var koa = require('koa');
var app = koa();
var path = require('path');
var static = require('koa-static');
var render = require('koa-swig');

var router =require('koa-router')();

app.context.render = render({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html'
});


app.use(static(path.join(__dirname, '/src')));

router.get('/*', function *(next) {
    yield this.render(__dirname+'/index');
});

app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);

console.log('listening on port 3000');