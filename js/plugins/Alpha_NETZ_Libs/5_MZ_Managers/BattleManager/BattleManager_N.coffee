#╒═════════════════════════════════════════════════════════════════════════╛
# ■ BattleManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = BattleManager

    _.nSetNetworkBattle = (@netBattleId) ->

    _.nIsNetworkBattle = -> @netBattleId?

    _.nSetupNetworkBattle = ->
        if @nIsNetworkBattle()
            battleData = {
                battleId: "1111",
                options: [$gameTroop._troopId, this._canEscape, this._canLose]
            }
            ANBattleManager.registerOnBattle(battleData)
        else
            ANBattleManager.registerOnLocalBattle()
        return

    _.nSelectNextActorOnClient = ->
        # * Если данный флаг == true, то игрок переключает меню ввод с группы на персонажа своего
        # * (Это если нажать Escape и появилось Party Commands, а затем снова на Fight)
        if @_isShouldWaitMyNetworkAction == true
            # * Выбираем только своего персонажа снова (а не первого)
            @_currentActor = $gameParty.leader()
            @_isShouldWaitMyNetworkAction = false
        else
            ANBattleManager.battleInputActionDone()
            @_inputting = false
    
    # * В стандартном тактическом режиме боя если нажать "отмена" (назад)
    # * То мы можем поменять выбор предыдущего персонажа, но в сети,
    # * мы не можем это сделать, поэтому просто "выходим" на меню группы
    _.nSelectPreviousActorOnClient = -> @_currentActor = null

    _.nUpdateNetwork = ->
        ANBattleManager.updateInputChange()
        $gameTroop.nUpdateBattleDataSync()
        $gameParty.nUpdateBattleDataSync()
        return


    _.nClearClientInput = ->
        @_inputting = false
        @_currentActor = null
        @_isShouldWaitMyNetworkAction = true

    _.nSetCurrentClientInput = ->
        $gameParty.makeActions() # * Чтобы был inputting action
        @_currentActor = $gameParty.leader()
        # * Готов к отправке действия сразу (по умолчанию)
        # * Команда 'Fight' делает false (см nSelectNextActorOnClient)
        @_isShouldWaitMyNetworkAction = false

    return
# ■ END BattleManager.coffee
#---------------------------------------------------------------------------