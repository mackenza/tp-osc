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
    // var state = "2";
    console.log(data);
    // if (data.data[0].value === "1") {
    //     state = "1"
    // }
    // udpPort.send({
    //     address: "/play",
    //     args: [
    //         {
    //             type: "i",
    //             value: 1
    //         }
    //     ]
    // }, udpPort.remoteAddress, udpPort.remotePort);
    // TPClient.stateUpdate("activeTrack", state, data.InstanceId);

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