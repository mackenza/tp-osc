const osc = require("osc");
const TouchPortalAPI = require('touchportal-api');
const TPClient = new TouchPortalAPI.Client();
var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 8001,
    remotePort: 8000,
    remoteAddress: "10.0.0.23",
    metadata: true
});
const pluginId = 'OSC';

TPClient.on("Action", (data) => {
    var state;
    function sendOSC(destination, type, value) {
        console.log(destination,type,value);
        udpPort.send({
            address: destination,
            args: [
                {
                    type: type,
                    value: value
                }
            ]
        }, udpPort.remoteAddress, udpPort.remotePort);
    }

    switch(data.actionId) {
        case "playAction":
            state = "Playing";
            sendOSC("/play", "i", 1);
            TPClient.stateUpdate("playingState", state, data.InstanceId);
            break;
        case "stopAction":
            state = "Stopped";
            sendOSC("/stop", "i", 1);
            TPClient.stateUpdate("playingState", state, data.InstanceId);
            break;
        case "muteAction":
            sendOSC("/track/mute/toggle", "i", 1);
            break;
    }

    if (data.actionId === "playAction") {
        
    } else if (data.actionId === "stopAction") {
        
    } 
    console.log(data);

    ;

});

// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg, timeTag, info) {
    console.log("An OSC message just arrived!", oscMsg);
    console.log("Remote info is: ", info);
});

TPClient.connect({ pluginId });
udpPort.open();



udpPort.on("ready", function () {
    console.log("ready");
});