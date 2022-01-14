var spawn = require("child_process").spawn;
var http = require("http");
var lt = require("localtunnel");
var fs = require("fs");
var qs = require("querystring");

var html = fs.readFileSync("app.html", "utf-8");

var requestListener = function(req, res) {
    if(req.method == "GET") {
        res.writeHead(200);
        res.end(html);
    } else if(req.method == "POST") {
        var body = "";
        req.on("data", function(data) {
            body += data;
        });
        var post = qs.parse(body);

    }
}

var server = http.createServer(requestListener);

(async () => {
    var tunnel = await lt({port:6060, subdomain:'remote-controlled-remote'});
    console.log(tunnel.url);
    tunnel.on('close', () => {
        console.log("uh");
    });
})();