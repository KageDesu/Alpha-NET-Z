#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Base.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Base::

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        if ANNetwork.isBusy()
            ANGameManager.updateWaiting()
            #console.log("wait network...")
        else
            ALIAS__update.call(@)
    
    #@[ALIAS]
    ALIAS__terminate = _.terminate
    _.terminate = ->
        # * Смена сцены
        if ANNetwork.isConnected()
            ANGameManager.sendSceneChanging()
        ALIAS__terminate.call(@)

    return
# ■ END Scene_Base.coffee
#---------------------------------------------------------------------------