#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Battle.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Battle::

    # * Чтобы окно открывалось при передаче управления игроку
    #@[ALIAS]
    ALIAS__updateBattleProcess = _.updateBattleProcess
    _.updateBattleProcess = ->
        if ANNetwork.isConnected()
            if $gameTemp._isBattleSceneShouldBeRefreshed is true
                @changeInputWindow()
                $gameTemp._isBattleSceneShouldBeRefreshed = false
            if !@isAnyInputWindowActive() ||
                    BattleManager.isAborting() ||
                        BattleManager.isBattleEnd()
                @changeInputWindow()
        ALIAS__updateBattleProcess.call(@)
    
    return
# ■ END Scene_Battle.coffee
#---------------------------------------------------------------------------