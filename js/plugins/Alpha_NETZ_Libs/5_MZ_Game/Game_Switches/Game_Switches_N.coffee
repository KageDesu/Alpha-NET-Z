#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Switches.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Switches::

    _.isGlobalSwitch = (switchId) ->
        ANET.PP.globalSwitchesIds().contains(switchId)

    _.onSwitchFromServer = (switchId, value) ->
        @_data[switchId] = value
        @onChange()
    
    return
# ■ END Game_Switches.coffee
#---------------------------------------------------------------------------