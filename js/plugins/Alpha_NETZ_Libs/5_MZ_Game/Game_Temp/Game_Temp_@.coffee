#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Temp.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Temp::

    #@[ALIAS]
    ALIAS__initialize = _.initialize
    _.initialize = ->
        ALIAS__initialize.call(@)
        # * Виртуальные общие события от сервера
        @_virtualEventQueue = []
        return
    
    #@[ALIAS]
    ALIAS__isCommonEventReserved = _.isCommonEventReserved
    _.isCommonEventReserved = ->
        @isVirtualCommonEventReserved() || ALIAS__isCommonEventReserved.call(@)
    
    # * Виртуальные события в приоритете
    #@[ALIAS]
    ALIAS__retrieveCommonEvent = _.retrieveCommonEvent
    _.retrieveCommonEvent = ->
        if @isVirtualCommonEventReserved()
            return @_virtualEventQueue.shift()
        else
            return ALIAS__retrieveCommonEvent.call(@)
        return

    return
# ■ END Game_Temp.coffee
#---------------------------------------------------------------------------