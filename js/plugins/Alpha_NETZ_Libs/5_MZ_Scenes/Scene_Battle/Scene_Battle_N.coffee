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
        @nSimulateTpbUpdate()
    
    # * Симуляция заполнения полос TPB
    # * Не успевает с сервера приходить значение float так быстро, поэтому эмулируем "заполнение" на других клиентах
    _.nSimulateTpbUpdate = ->
        # * На мастере битвы нельзя, иначе ускорится в 2 раза, он ведь и так считает Tpb
        unless ANGameManager.isBattleMaster()
            m.updateTpb() for m in $gameParty.battleMembers()
        return

    return
# ■ END Scene_Battle.coffee
#---------------------------------------------------------------------------