#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Enemy.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Enemy::

    # * Только мастер битвы может отправлять данные (вызывается из Scene_Battle)
    _.updateDataObserver = ->
        if $gameParty.inBattle() && ANGameManager.isBattleMaster()
            @_updateDataObserver()
            @_updateBattleDataObserver()
        return

    _.dataObserverHaveChanges = ->
        if $gameParty.inBattle() && ANGameManager.isBattleMaster()
            ANSyncDataManager.sendBattlerObserver(@)
        return

    # * Добавляем свои поля
    _._fillNetworkObserver = ->
        Game_Battler::_fillNetworkObserver.call(@)
        @netDataObserver.addFields(@, ANET.System.EnemyObserverFields)
        return
    
    return
# ■ END Game_Enemy.coffee
#---------------------------------------------------------------------------