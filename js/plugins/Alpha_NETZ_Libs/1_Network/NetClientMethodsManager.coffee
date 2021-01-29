#@[GLOBAL]
NetClientMethodsManager = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ NetClientMethodsManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[LOG]
    LOG = new KDCore.DevLog("NET Client")
    LOG.setColors(KDCore.Color.MAGENTA.reAlpha(200), KDCore.Color.BLACK.getLightestColor(200))
    LOG.on()


    #@[DEFINES]
    _ = NetClientMethodsManager

    _.setConnectionToMasterCallback = (@onConnectCallback) ->

    _.onConnect = ->
        LOG.p("Connected")
        @onConnectCallback(1) if @onConnectCallback?

    _.onDisconnect = ->
        LOG.p("Disconnected")
        SceneManager._scene?.onLostConnection()
        ANNetwork.stop()

    _.onConnectionError = ->
        LOG.p("Can't connect to server!")
        @onConnectCallback(0) if @onConnectCallback?
        ANNetwork.stop()
    
    return
# ■ END NetClientMethodsManager.coffee
#---------------------------------------------------------------------------