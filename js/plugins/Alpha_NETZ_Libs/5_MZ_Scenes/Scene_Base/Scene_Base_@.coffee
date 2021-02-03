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
            console.log("wait network...")
        else
            ALIAS__update.call(@)
    
    return
# ■ END Scene_Base.coffee
#---------------------------------------------------------------------------