#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Unit.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Unit::

    _.nUpdateBattleDataSync = ->
        members = @members()
        if members.some (m) -> m.isNeedNetPushBattleData()
            ANSyncDataManager.sendBattleUnitsObserver(members)
            members.forEach (m) -> m.onNetBattleDataPushed()
        return
    
    return
# ■ END Game_Unit.coffee
#---------------------------------------------------------------------------