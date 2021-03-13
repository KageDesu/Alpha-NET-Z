#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Battle.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Battle::

    # * Когда пришли данные о битве от сервера (регистрация, новый участник)
    _.netOn_battle_serverBattleData = ->
        # * Если бой не был отрисован, то нарисовать
        #_.ALIAS__NET_start.call(@) unless @_netBattleStarted is true
        $gamePlayer.refresh()
        $gameMap.requestRefresh()
        $gameTemp.requestBattleRefresh()
        # * Для всех новых, надо выполнять некоторые методы
        for battler in $gameParty.battleMembers()
            unless $gameTemp._previousNetBattleActors.contains(battler.actorId())
                battler.onBattleStart()
                battler.makeActions()
        $gameTemp._previousNetBattleActors = []
        return

    _.nOnBattleStarted = ->
        # * Ставим флаг что бой начался (это надо для netOn_battle_serverBattleData)
        #@_netBattleStarted = true
        # * Отправляем на сервер, что мы начали бой
        ANBattleManager.onBattleStarted()
        return
    
    _.nOnBattleEnd = ->
        # * Отправляем на сервер, что мы покинули (закончили) бой
        ANBattleManager.onBattleEnd()
        return

    _.nUpdateBattleProcess = ->
        # * За отправку данных отвечает только мастер боя
        if ANGameManager.isBattleMaster()
            for actor in $gameParty.battleMembers()
                actor.updateDataObserver()
            for enemy in $gameTroop.members()
                enemy.updateDataObserver()
        return

    return
# ■ END Scene_Battle.coffee
#---------------------------------------------------------------------------