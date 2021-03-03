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

        _.reverseVirtualCommonEvent = (list) ->
            @_virtualEventQueue.push(list)

        _.isVirtualCommonEventReserved = ->
            @_virtualEventQueue.length > 0

        return
    
    return
# ■ END Game_Temp.coffee
#---------------------------------------------------------------------------