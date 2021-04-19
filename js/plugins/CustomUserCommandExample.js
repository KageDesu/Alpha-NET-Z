// FOR PLUGIN DEVELOPERS

// 1. SEND CUSTOM COMMAND
var data = {}; // * some data if you need it (or null)
nAPI.sendCustomCommand("someName", data);

// 2. RECEIVE AND WORK WITH YOUR CUSTOM COMMAND

//@[ALIAS] // Aliasing is REQUIRED!
var _alias_nAPI_onCustomCommand = nAPI.onCustomCommand;
nAPI.onCustomCommand = function (name, data) {
    _alias_nAPI_onCustomCommand.call(this, ...arguments);
    if(name == "someName") {
        // YOUR CODE
    }
};


// MORE INFO IN GUIDE:
// https://github.com/KageDesu/Alpha-NET-Z/wiki/Script-calls-User-API

