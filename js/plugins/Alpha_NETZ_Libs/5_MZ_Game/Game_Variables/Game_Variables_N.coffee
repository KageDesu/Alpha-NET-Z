#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Variables.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Variables::

    _.isGlobalVariable = (varId) ->
        ANET.PP.globalVariablesIds().contains(varId)

    _.getAllGlobalVariablesData = ->
        variables = []
        for i in [1..8]
            variables.push([i, @value[i]])
        return variables

    
    _.onVariableFromServer = (varId, value) ->
        @_data[varId] = value
        @onChange()
        
    
    return
# ■ END Game_Variables.coffee
#---------------------------------------------------------------------------