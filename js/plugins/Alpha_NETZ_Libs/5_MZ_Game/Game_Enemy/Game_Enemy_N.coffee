#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Enemy.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Enemy::

    # * В общем есть проблема, поток данных не успевает, если отправлять Instante каждый кадр
    # * Так как в бою Observers передаются сразу, то можно их одним методом для
    # * всех участников боя передевать
    # * Т.е. собирать данные Battler и Enemies и передавать одной командой!
    # * Сейчас сделано что данные передаются только по проверке, есть небольшая задержка
    # * Но нею можно невелировать, так как через реальный сервер всё равно будет задеркжа
    # * Для дополнительной оптимизации можно Observer врагов сделать общий для всех (отправлять все Battlers сразу)

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