#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Variables.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Variables::

    #TODO: Список глобальных переменных указывается в параметрах плагина
    _.isGlobalVariable = (varId) ->
        [1, 2, 3, 4, 5, 6, 7, 8].contains(varId)

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