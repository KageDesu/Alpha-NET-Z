#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Variables.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Variables::

    #@[ALIAS]
    ALIAS__setValue = _.setValue
    _.setValue = (variableId, value) ->
        if ANNetwork.isConnected()
            # * Вызываем страндартный метод
            ALIAS__setValue.call(@, variableId, value)
            # * Если были изменения
            if @__variableChangedOk is true
                if @isGlobalVariable(variableId)
                    ANGameManager.sendGlobalVariableChange(variableId, @value(variableId))
            @__variableChangedOk = false
        else
            ALIAS__setValue.call(@, variableId, value)
        return

    #@[ALIAS]
    ALIAS__onChange = _.onChange
    _.onChange = ->
        ALIAS__onChange.call(@)
        if ANNetwork.isConnected()
            @__variableChangedOk = true
    
    return
# ■ END Game_Variables.coffee
#---------------------------------------------------------------------------