#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_BattleLog.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_BattleLog::

    #@[ALIAS]
    ALIAS__clear = _.clear
    _.clear = ->
        ALIAS__clear.call(@)
        if @isNeedSendLogToServer()
            ANBattleManager.sendWindowLogMessage("clear", null)

    #@[ALIAS]
    ALIAS__addText = _.addText
    _.addText = (text) ->
        ALIAS__addText.call(@, text)
        if @isNeedSendLogToServer()
            ANBattleManager.sendWindowLogMessage("add", text)
        return

    return
# ■ END Window_BattleLog.coffee
#---------------------------------------------------------------------------