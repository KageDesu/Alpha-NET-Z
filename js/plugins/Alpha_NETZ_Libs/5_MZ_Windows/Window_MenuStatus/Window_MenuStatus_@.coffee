#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_MenuStatus.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_MenuStatus::

    #@[ALIAS]
    ALIAS__isCurrentItemEnabled = _.isCurrentItemEnabled
    _.isCurrentItemEnabled = ->
        if ANNetwork.isConnected()
            return @isCurrentItemEnabledInNetworkGame()
        else
            return ALIAS__isCurrentItemEnabled.call(@, ...arguments)
        
    
    return
# ■ END Window_MenuStatus.coffee
#---------------------------------------------------------------------------