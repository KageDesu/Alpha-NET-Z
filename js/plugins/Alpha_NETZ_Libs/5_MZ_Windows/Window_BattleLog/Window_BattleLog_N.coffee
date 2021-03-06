#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_BattleLog.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_BattleLog::

    _.isNeedSendLogToServer = ->
        ANNetwork.isConnected() && ANGameManager.isBattleMaster() && !$gameParty.isOneBattler()

    return
# ■ END Window_BattleLog.coffee
#---------------------------------------------------------------------------