(function() {
    
    class ANServer {
        constructor(settings) { 
            this.settings = settings;
            console.log("Server created!")
        }
        
        start() {
            this._server = require('./Server')(this.settings.port)
            this.handleServerCommands()
        }

        handleServerCommands() {
            
        }
    }

    module.exports.ANServer = ANServer;
})();