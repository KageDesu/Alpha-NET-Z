#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_BattlerBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_BattlerBase::

    #@[ALIAS]
    ALIAS__initMembers = _.initMembers
    _.initMembers = ->
        ALIAS__initMembers.call(@)
        @_createNetworkObserver()
    
    #@[ALIAS]
    ALIAS__onBattleStart = _.onBattleStart
    _.onBattleStart = ->
        ALIAS__onBattleStart.call(@)
        if ANNetwork.isConnected()
            @netDataObserver.setCheckMode()
        return

    #@[ALIAS]
    ALIAS__onBattleEnd = _.onBattleEnd
    _.onBattleEnd = ->
        ALIAS__onBattleEnd.call(@)
        if ANNetwork.isConnected()
            @netDataObserver.setInstanteMode()
        return

    #TEMP
    #TODO: Временное решение, так как нет проверки кто именно
    # * Так как вещи другого игрока нет в инвентаре мастера боя, то
    # * мы пропускаем проверку на наличие вещи в инвентаре $gameParty.hasItem(item)
    #@[ALIAS]
    ALIAS__meetsItemConditions = _.meetsItemConditions
    _.meetsItemConditions = (item) ->
        if ANNetwork.isConnected()
            return @meetsUsableItemConditions(item)
        else
            return ALIAS__meetsItemConditions.call(@, item)
        

    return
# ■ END Game_BattlerBase.coffee
#---------------------------------------------------------------------------