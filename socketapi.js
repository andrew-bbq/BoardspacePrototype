const io = require("socket.io")();
const socketapi = {
    io: io
};

let nextId = 0;
let drawing = [];

// socket io logic goes here
io.on("connect", (socket) => {
    socket.on("Draw", function(data) {
        drawing.push(data.newLine);
        nextId = data.id + 1;
        socket.broadcast.emit("ReceiveDrawing", data);
    });
});

io.on("connect", (socket) => {
    socket.emit("InitialDrawing", {drawing: drawing, nextId: nextId});
});

module.exports = socketapi;