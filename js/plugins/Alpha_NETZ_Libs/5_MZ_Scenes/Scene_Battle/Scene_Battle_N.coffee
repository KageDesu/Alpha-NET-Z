#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Battle.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Battle::

    # * Когда пришли данные о битве от сервера (регистрация, новый участник)
    # * Этот метод выполняется на клиентах, которые УЖЕ в битве (а не на тех, кто присоединился)
    _.netOn_battle_serverBattleData = ->
        # * Для всех новых, надо выполнять некоторые методы
        for battler in $gameParty.battleMembers()
            unless $gameTemp._previousNetBattleActors.contains(battler.actorId())
                battler.onBattleStart()
                battler.makeActions()
        # * Всех старых, надо удалить из битвы
        for battlerId in $gameTemp._previousNetBattleActors
            unless ANBattleManager.battleData.actors.contains(battlerId)
                $gameParty.removeActor(battlerId)
                BattleManager.nSafeRemoveActor()
        $gameTemp._previousNetBattleActors = []
        $gamePlayer.refresh()
        $gameMap.requestRefresh()
        $gameTemp.requestBattleRefresh() if KDCore.isMZ()
        return

    _.nOnBattleStarted = ->
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

    _.nRefreshSharedBattle = ->
        # * Обновить спрайты врагов
        @_spriteset.nRefreshNetBattle()

    return
# ■ END Scene_Battle.coffee
#---------------------------------------------------------------------------