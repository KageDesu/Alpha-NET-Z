#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Switches.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Switches::

    #@[ALIAS]
    ALIAS__setValue = _.setValue
    _.setValue = (switchId, value) ->
        if ANNetwork.isConnected()
            # * Вызываем страндартный метод
            ALIAS__setValue.call(@, switchId, value)
            # * Если были изменения
            if @__variableChangedOk is true
                if @isGlobalSwitch(switchId)
                    ANSyncDataManager.sendGlobalSwitchChange(switchId, @value(switchId))
            @__variableChangedOk = false
        else
            ALIAS__setValue.call(@, switchId, value)
        return
        

    #@[ALIAS]
    ALIAS__onChange = _.onChange
    _.onChange = ->
        ALIAS__onChange.call(@)
        if ANNetwork.isConnected()
            @__variableChangedOk = true
        return
        
    return
# ■ END Game_Switches.coffee
#---------------------------------------------------------------------------