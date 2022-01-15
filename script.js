(function() {
/*
window.addEventListener('keydown', function(event) {
    var xhr = new XMLHttpRequest();
    var url = window.location.href;
    var params = event.keys;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
});
*/
var xChange = 0, yChange = 0;
var canvas = document.getElementById("canvas_elem");
canvas.onclick = function () {
    canvas.requestPointerLock();
}
//canvas.requestPointerLock();
document.addEventListener("pointerlockchange", pointerlockchanged, true);
function pointerlockchanged() {
    document.addEventListener("mousemove", updatePos, false);
    setInterval(sendPos, 20)
}
function updatePos(h) {
    xChange += h.movementX;
    yChange += h.movementY;
}
})();

function sendPos() {
    var tempx = xChange, tempy = yChange;
    xChange = 0;
    yChange = 0;
    var xhr = new XMLHttpRequest();
    var url = window.location.href;
    var params = `x=${tempx}&y=${tempy}&z=0`;
    xhr.open("POST", url, true);
    xhr.send(params);
}