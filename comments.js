//Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = [];
var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathName = urlObj.pathname;
    if (pathName === '/') {
        var filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        });
    } else if (pathName === '/addComment') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else {
        var filePath = path.join(__dirname, pathName);
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) {
                res.statusCode = 404;
                res.end('Not Found');
            }
            res.end(data);
        });
    }
});
server.listen(8080, function() {
    console.log('server is listening on 8080');
});