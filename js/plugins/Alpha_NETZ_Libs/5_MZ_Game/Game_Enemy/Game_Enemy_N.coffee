#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Enemy.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Enemy::

    #TODO: Есть проблема, dead enemies не исчезают у второго игрока

    # * Дополнительные найстройки Observer для врагов
    _._addBattleFieldsToNetowrkDataObserver = ->
        Game_Battler::_addBattleFieldsToNetowrkDataObserver.call(@)
        # * Данные поля не нужны (наверное) врагам, так как не видно их полосу
        @netDataObserver.removeFields(@, ["_tpbChargeTime"])
        return

    # * Только мастер битвы может отправлять данные (вызывается из Scene_Battle)
    _.updateDataObserver = ->
        if $gameParty.inBattle() && ANGameManager.isBattleMaster()
            @_updateDataObserver()
            @_updateBattleDataObserver()
        return

    _.dataObserverHaveChanges = ->
        if $gameParty.inBattle() && ANGameManager.isBattleMaster()
            @requestNetBattleDataPush()
        return

    # * Добавляем свои поля
    _._fillNetworkObserver = ->
        Game_Battler::_fillNetworkObserver.call(@)
        @netDataObserver.addFields(@, ANET.System.EnemyObserverFields)
        return
    
    return
# ■ END Game_Enemy.coffee
#---------------------------------------------------------------------------