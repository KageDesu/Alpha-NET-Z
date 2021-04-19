#╒═════════════════════════════════════════════════════════════════════════╛
# ■ ANBattleManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->
    
    #@[DEFINES]
    _ = ANBattleManager

    # * В MV нету _currentActor и _inputting
    #$[OVER]
    _.updateInputChange = ->
        return if $gameParty.isOneBattler()
        if @_lastBattleManagerInputActor != BattleManager._actorIndex
            @_lastBattleManagerInputActor = BattleManager._actorIndex
            @sendInputState()
        else if @_lastBattleManagerInputValue != BattleManager.isInputting()
            @_lastBattleManagerInputValue = BattleManager.isInputting()
            @sendInputState()
        return
    
    #$[OVER]
    # * Отправить изменение состояния ввода
    _.sendInputState = () ->
        inputState = BattleManager.isInputting()
        actor = BattleManager.actor()
        if actor?
            inputActorId = actor.actorId()
        else
            inputActorId = null
        ANNetwork.send(NMS.Battle("input", { inputState, inputActorId }))
        return

    #$[OVER]
    # * Пришло изменение состояние ввода
    _.onBattleInputState = (inputState, inputActorId) ->
        try
            return unless $gameParty.inBattle()
            if inputState is true
                BattleManager._phase = 'input'
            else
                # * Чтобы скрыть выбор действий
                BattleManager.startTurn()
            if inputActorId == ANGameManager.myActorId()
                BattleManager.nSetCurrentClientInput()
            else
                # * Если не мой персонаж, то никакого ввода
                BattleManager.nClearClientInput()
            $gameTemp._isBattleSceneShouldBeRefreshed = true
        catch e
            ANET.w e
            return

    # * В MV анимация отдельно реализована
    # * Отправить боевую анимацию (из WindowLog) на сервер
    _.sendWindowLogAnimation = (targets, animationId, mirror) ->
        converted = targets.map (t) -> t.packForNetwork()
        data = {
            animationId: animationId
            mirror: mirror
            targets: converted
        }
        # * Используем метод из MZ версии
        @sendBattleAnimation(data)
        return

    #@[ALIAS]
    ALIAS__onLogWindowMessage = _.onLogWindowMessage
    _.onLogWindowMessage = () ->
        ALIAS__onLogWindowMessage.call(@, ...arguments)
        $gameTemp.requestBattleRefresh()
        return

    # * С сервера пришла команда проиграть анимацию (замена метода из MZ)
    #$[OVER]
    _.onBattleAnimation = (data) ->
        try
            targets = data.targets.map (t) -> ANET.Utils.unpackBattlerFromNetwork(t)
            BattleManager._logWindow?.showNormalAnimation(targets, data.animationId, data.mirror)
        catch e
            ANET.w e
        return

    return
# ■ END ANBattleManager.coffee
#---------------------------------------------------------------------------