#@[GLOBAL]
NETClientManager = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ NETClientManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = NETClientManager

    _.onConnect = ->
        console.log("Connected")

    _.onDisconnect = ->
        console.log("Disconnected")
        ANNetwork.stop()

    _.onConnectionError = ->
        console.log("Can't connect to server!")
        ANNetwork.stop()
    
    return
# ■ END NETClientManager.coffee
#---------------------------------------------------------------------------