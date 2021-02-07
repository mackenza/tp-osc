const TouchPortalAPI = require('touchportal-api');

// Create an instance of the Touch Portal Client
const TPClient = new TouchPortalAPI.Client();

// Define a pluginId, matches your entry.tp file
const pluginId = 'OSC';

// Dynamic Actions Documentation: https://www.touch-portal.com/api/index.php?section=dynamic-actions

// Receive an Action Call from Touch Portal
TPClient.on("Action", (data) => {
    var state = "2";
    console.log(data);
    if (data.data[0].value === "1") {
        state = "1"
    }

    TPClient.stateUpdate("activeTrack", state, data.InstanceId);

});


//Connects and Pairs to Touch Portal via Sockete
TPClient.connect({ pluginId });