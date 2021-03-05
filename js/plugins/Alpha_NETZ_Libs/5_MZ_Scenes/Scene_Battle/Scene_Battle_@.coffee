#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Battle.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Battle::

    #@[ALIAS]
    ALIAS__start = _.start
    _.start = ->
        ALIAS__start.call(@)
        if ANNetwork.isConnected()
            @nOnBattleStarted()
        return

    #@[ALIAS]
    ALIAS__updateBattleProcess = _.updateBattleProcess
    _.updateBattleProcess = ->
        if ANNetwork.isConnected()
            @nUpdateBattleProcess()
            # * BattleManager update выполняет только мастер битвы
            # * Иначе, выходим сразу из метода
            return unless ANGameManager.isBattleMaster()
        ALIAS__updateBattleProcess.call(@)
        
    # * На всякий случай отключу автобитву
    #@[ALIAS]
    ALIAS__updateTpbAutoBattle = _.updateTpbAutoBattle
    _.updateTpbAutoBattle = ->
        if ANNetwork.isConnected()
            return
        else
            ALIAS__updateTpbAutoBattle.call(@)
        

    return
# ■ END Scene_Battle.coffee
#---------------------------------------------------------------------------