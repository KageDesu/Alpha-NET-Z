#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_MenuCommand.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_MenuCommand::

    # * Команда Formation запрещена в сетевой игре всегда
    #@[ALIAS]
    ALIAS__isFormationEnabled = _.isFormationEnabled
    _.isFormationEnabled = ->
        if ANNetwork.isConnected()
            return false
        else
            return ALIAS__isFormationEnabled.call(@, ...arguments)
    
    
    #TODO: Временно отключил команду сохранения в сетевой игре
    #@[ALIAS]
    ALIAS__isSaveEnabled = _.isSaveEnabled
    _.isSaveEnabled = ->
        if ANNetwork.isConnected()
            return false
        else
            return ALIAS__isSaveEnabled.call(@, ...arguments)
        
    return
# ■ END Window_MenuCommand.coffee
#---------------------------------------------------------------------------