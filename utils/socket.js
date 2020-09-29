const socketio = require("socket.io")
let sio;

function io() {
    return sio;
}
function init(server) {
    sio = socketio(server);
}

module.exports = {io,init}