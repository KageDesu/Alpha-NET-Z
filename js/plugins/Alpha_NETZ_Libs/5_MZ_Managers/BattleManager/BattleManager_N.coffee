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
                battleId: @netBattleId,
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
            if KDCore.isMV()
                @_actorIndex = @myNetworkActorIndex()
                $gameTemp._isBattleSceneShouldBeRefreshed = true
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
        @startTurn() if KDCore.isMV()
        return

    _.nSetCurrentClientInput = ->
        $gameParty.makeActions() # * Чтобы был inputting action
        @_currentActor = $gameParty.leader()
        if KDCore.isMV()
            @_actorIndex = @myNetworkActorIndex()
        # * Готов к отправке действия сразу (по умолчанию)
        # * Команда 'Fight' делает false (см nSelectNextActorOnClient)
        @_isShouldWaitMyNetworkAction = false

    _.nRefreshSharedBattleState = ->
        try
            if SceneManager._scene.nRefreshSharedBattle?
                SceneManager._scene.nRefreshSharedBattle()
        catch e
            ANET.w e
        return

    # * Если во время боя был удалён (вышел) сетевой игрок
    # * Без этого метода, игра переключает (или зависат) ввод другого игрока (который вышел)
    _.nSafeRemoveActor = ->
        return unless @_phase == "input"
        try
            if @_currentActor != $gameParty.leader()
                @selectNextActor()
        catch e
            ANET.w e

    # * Можно ли клиенту (не BattleMaster) самостоятельно обновлять BattleManager
    _.nIsLocalForceUpdatePhase = -> @isAborting() || @isBattleEnd()

    return
# ■ END BattleManager.coffee
#---------------------------------------------------------------------------