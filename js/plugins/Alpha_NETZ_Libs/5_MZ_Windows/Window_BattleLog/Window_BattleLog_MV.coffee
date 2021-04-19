#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_BattleLog.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_BattleLog::

    #@[ALIAS]
    ALIAS__showNormalAnimation = _.showNormalAnimation
    _.showNormalAnimation = (targets, animationId, mirror) ->
        ALIAS__showNormalAnimation.call(@, targets, animationId, mirror)
        if @isNeedSendLogToServer() and KDCore.isMV()
            ANBattleManager.sendWindowLogAnimation(targets, animationId, mirror)
        return
    
    return
# ■ END Window_BattleLog.coffee
#---------------------------------------------------------------------------