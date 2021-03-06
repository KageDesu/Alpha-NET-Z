#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_BattleLog.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_BattleLog::

    _.isNeedSendLogToServer = ->
        ANNetwork.isConnected() && ANGameManager.isBattleMaster() && !$gameParty.isOneBattler()

    # * Написать сообщение в лог, которое пришло от сервера
    _.nDrawLineText = (rect, text) ->
        try
            @contents.clearRect(rect.x, rect.y, rect.width, rect.height)
            @drawTextEx(text, rect.x, rect.y, rect.width)
        catch e
            ANET.w e
    
    return
# ■ END Window_BattleLog.coffee
#---------------------------------------------------------------------------