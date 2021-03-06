#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Temp.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Temp::


    # * В MV нету метода retrieveCommonEvent
    #@[ALIAS]
    ALIAS__reservedCommonEvent = _.reservedCommonEvent
    _.reservedCommonEvent = ->
        if @isVirtualCommonEventReserved()
            return @_virtualEventQueue.shift()
        else
            return ALIAS__reservedCommonEvent.call(@)

    # * В MV нету метода requestBattleRefresh
    _.requestBattleRefresh = ->
        @_needsBattleRefresh = true if $gameParty.inBattle()

    _.isBattleRefreshRequested = -> @_needsBattleRefresh == true

    _.clearBattleRefreshRequest = -> @_needsBattleRefresh = false
    
    return
# ■ END Game_Temp.coffee
#---------------------------------------------------------------------------