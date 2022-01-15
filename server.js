var spawn = require("child_process").spawn;
var http = require("http");
var lt = require("localtunnel");
var fs = require("fs");
var qs = require("querystring");
var bp = require("body-parser");

var html = fs.readFileSync("app.html", "utf-8");

// var ahkKB = spawn("C:/keyboarder.exe", ['ahk/stdin.ahk']);
var ahkMouse = spawn("C:/mouse_mover.exe", ["ahk/stdin.ahk"]);

/*
var dataString = '';
ahk.stdout.on('data', function(data){
    dataString += data.toString();
    var received = '';
    for (var i = 0; i < data.length; i++) {
        received += String.fromCharCode(data[i]);
    }

    
    //console.log(toSend); //received string, should be "Your query was '" some example "'. Have a nice day."
});
ahk.stdout.on('end', function(){
    console.log('end');
});
*/
  
// ahk.stdin.write('some example'+'\r\n');

var currentModKeyisSpecial;
var heldModifier0, heldModifier1, keys = [], send = "";

function keysHandler(keycode) {
    if(keycode == "Shift" || keycode == "Alt" || keycode == "Ctrl") {
        currentModKeyisSpecial = 1;
        (async function() {
            while(currentModKeyisSpecial) {
                continue;
            }

        })();
    }
    if(!currentModKeyisSpecial) {
        keys.forEach(element, index => {
            if(keys.length == 1) {
                send += element;
                return;
            }
            send += element;
            if(keys.length - 1 == index) {
                return;
            }
            send += " + ";
        });
    }
}

var requestListener = function(req, res) {
    if(req.method == "GET") {
        res.writeHead(200);
        res.end(html);
    } else if(req.method == "POST") {
        var body = ""/*, keys = [], send = ""*/;
        req.on("data", function(data) {
            body += data;
        });
        var mouseMovement = [body.x, body.y];
        if(body.z) {
            keysHandler(qs.kc);
        } else {
            console.log(body);
            console.log(`${body.x},${body.y}`);
            ahkMouse.stdin.write(`${body.x},${body.y}` + "\r\n");
        }
    }
}

var server = http.createServer(requestListener);
server.listen(6060);

(async () => {
    var tunnel = await lt({port:6060, subdomain:'remote-controlled-remote'});
    console.log(tunnel.url);
    tunnel.on('close', () => {
        console.log("uh");
    });
})();