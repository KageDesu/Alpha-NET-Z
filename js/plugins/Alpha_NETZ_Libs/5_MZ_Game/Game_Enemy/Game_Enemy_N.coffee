#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Enemy.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Enemy::

    #TODO: В общем есть проблема, поток данных не успевает
    # * Так как в бою Observers передаются сразу, то можно их одним методом для
    # * всех участников боя передевать
    # * Т.е. собирать данные Battler и Enemies и передавать одной командой!

    # * Дополнительные найстройки Observer для врагов
    _._addBattleFieldsToNetowrkDataObserver = ->
        Game_Battler::_addBattleFieldsToNetowrkDataObserver.call(@)
        @netDataObserver.removeFields(@, [
            "_tpbChargeTime",
            "_tpbCastTime",
            "_tpbIdleTime",
            "_tpbTurnCount",
            "_tpbTurnEnd"
            ]
        )
        @netDataObserver._instante = false
        return

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