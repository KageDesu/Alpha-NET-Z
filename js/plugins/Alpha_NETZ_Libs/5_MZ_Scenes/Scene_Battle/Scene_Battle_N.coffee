#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Battle.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Battle::

    _.nOnBattleStarted = ->
        ANBattleManager.onBattleStarted()
        return

    _.nUpdateBattleProcess = ->
        if ANGameManager.isBattleMaster()
            for actor in $gameParty.battleMembers()
                actor.updateDataObserver()
        return


    return
# ■ END Scene_Battle.coffee
#---------------------------------------------------------------------------