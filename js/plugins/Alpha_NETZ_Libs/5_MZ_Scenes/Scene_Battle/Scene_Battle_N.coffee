#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Battle.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Battle::

    _.nOnBattleStarted = ->
        # * Отправляем на сервер, что мы начали бой
        ANBattleManager.onBattleStarted()
        return

    _.nUpdateBattleProcess = ->
        # * За отправку данных отвечает только мастер боя
        if ANGameManager.isBattleMaster()
            for actor in $gameParty.battleMembers()
                actor.updateDataObserver()
        return


    return
# ■ END Scene_Battle.coffee
#---------------------------------------------------------------------------