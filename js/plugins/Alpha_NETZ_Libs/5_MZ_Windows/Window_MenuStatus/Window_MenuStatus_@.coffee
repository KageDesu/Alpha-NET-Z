#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_MenuStatus.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_MenuStatus::

    #@[ALIAS]
    ALIAS__initialize = _.initialize
    _.initialize = (rect) ->
        ALIAS__initialize.call(@, rect)
        if ANNetwork.isConnected()
            if ANET.PP.isOtherPlayersVisibleInMenu() is false
                @setOnlyMyPlayerInMenuMode()
        return

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