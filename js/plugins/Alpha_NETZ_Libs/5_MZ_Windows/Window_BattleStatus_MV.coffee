#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_BattleStatus.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_BattleStatus::

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        if $gameTemp.isBattleRefreshRequested()
            @refresh()
            $gameTemp.clearBattleRefreshRequest()
        return
    
    return
# ■ END Window_BattleStatus.coffee
#---------------------------------------------------------------------------