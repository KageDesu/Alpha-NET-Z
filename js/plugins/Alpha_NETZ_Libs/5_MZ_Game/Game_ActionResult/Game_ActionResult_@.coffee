#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_ActionResult.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_ActionResult::

    #@[ALIAS]
    ALIAS__initialize = _.initialize
    _.initialize = ->
        ALIAS__initialize.call(@)
        @nCreateObserver() if ANNetwork.isConnected()
    
    return
# ■ END Game_ActionResult.coffee
#---------------------------------------------------------------------------