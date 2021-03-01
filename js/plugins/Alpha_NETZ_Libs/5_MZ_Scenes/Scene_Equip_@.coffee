#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Equip.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Equip::

    #@[ALIAS]
    ALIAS__needsPageButtons = _.needsPageButtons
    _.needsPageButtons = ->
        # * В сетевом режиме нельзя переключать персонажей
        if ANNetwork.isConnected()
            return false
        else
            return ALIAS__needsPageButtons.call(@)
    
    return
# ■ END Scene_Equip.coffee
#---------------------------------------------------------------------------