#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Status.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Status::

    #@[ALIAS]
    ALIAS__needsPageButtons = _.needsPageButtons
    _.needsPageButtons = ->
        # * В сетевом режиме зависит от параметра
        if ANNetwork.isConnected()
            return ANET.PP.isOtherPlayersMenuStatusAllowed()
        else
            return ALIAS__needsPageButtons.call(@)
    
    return
# ■ END Scene_Status.coffee
#---------------------------------------------------------------------------