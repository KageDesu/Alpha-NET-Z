#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Temp.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Temp::


    # * Virtual Common Events
    # -----------------------------------------------------------------------
    do ->

        _.reserveNetworkSharedEvent = (@_reservedNetworkSharedEvent) ->

        _.isNetworkSharedEventReserved = -> @_reservedNetworkSharedEvent >= 1

        # * Забираем (и сразу очищаем)
        _.retrieveNetworkSharedEvent = ->
            eventId = @_reservedNetworkSharedEvent
            @_reservedNetworkSharedEvent = 0
            return eventId

        _.reserveVirtualCommonEvent = (list) ->
            @_virtualEventQueue.push(list)

        _.isVirtualCommonEventReserved = ->
            @_virtualEventQueue.length > 0

        return
    
    return
# ■ END Game_Temp.coffee
#---------------------------------------------------------------------------