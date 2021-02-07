var osc = require("osc");

// Create an osc.js UDP Port listening on port 57121.
var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 8001,
    remotePort: 8000,
    remoteAddress: "10.0.0.23",
    metadata: true
});

// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg, timeTag, info) {
    console.log("An OSC message just arrived!", oscMsg);
    console.log("Remote info is: ", info);
});

// Open the socket.
udpPort.open();


// When the port is read, send an OSC message to, say, SuperCollider
udpPort.on("ready", function () {
    udpPort.send({
        address: "/track/name",
        args: [
            {
                type: "s",
                value: "bar"
            }
        ]
    }, udpPort.remoteAddress, udpPort.remotePort);
});