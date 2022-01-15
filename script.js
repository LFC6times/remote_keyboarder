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
var canvas = document.getElementbyID("canvas_elem").requestPointerLock();
canvas.onclick = function () {
    canvas.requestPointerLock();
}
//canvas.requestPointerLock();
document.addEventListener("pointerlockchange", pointerlockchanged, true);
function pointerlockchanged() {
    document.addEventListener("mousemove", updatePos, falsr);
}
function updatePos(h) {
    var xhr = new XMLHttpRequest();
    var url = window.location.href;
    var params = `x=${h.movementX}&y=${h.movementY}`;
    xhr.send(params);
}
})();