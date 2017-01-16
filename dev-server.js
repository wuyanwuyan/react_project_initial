var path = require('path');
var express = require('express');
var webpack = require('webpack');
var open = require("open");
var webpackDevOptions = require('./webpack.config.js');

var app = express();
var compiler = webpack(webpackDevOptions);

var webpackDevOptions = {
    noInfo: false,
    publicPath: webpackDevOptions.output.publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    stats: {
        colors: true,
        hash: false
    }
};

app.use(require('webpack-dev-middleware')(compiler, webpackDevOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function (req, res,next) {
    const filename = path.resolve(webpackDevOptions.output.path,'index.html');
    res.sendFile(filename);

});

app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
            return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
})

app.listen(8080, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:8080');
});

// open("http://localhost:8080");

