# * Данный класс отвечает за синхронизацию и обработку данных в бою

#@[GLOBAL]
ANBattleManager = ->

do ->

    #@[LOG]
    LOG = new KDCore.DevLog("NetBattle")
    LOG.setColors(KDCore.Color.RED, KDCore.Color.BLACK.getLightestColor(135))
    LOG.on()

    #@[DEFINES]
    _ = ANBattleManager

    _.isBattleRegistred = () -> ANGameManager.battleData?

    _.isShouldWaitServer = -> @_waitMode?

    _.setWait = (@_waitMode) ->
        @_waitPool = 0
        @_waitTimeout = 360
        HUIManager.showLoader(500)

    _.resetWait = ->
        @setWait(null)
        HUIManager.hideLoader()

    _.update = ->
        if @isShouldWaitServer()
            if @_waitTimeout <= 0
                LOG.p("TIME OUT")
                @resetWait()
            else
                @_waitTimeout--
                @updateWaiting()
        else
            if @_battleMethodsPool.length > 0
                @_callBattleMethodOnServer(...@_battleMethodsPool.shift())
        return

     # * Ожидание данных (игроков) от сервера
    _.updateWaiting = ->
        return unless @isShouldWaitServer()
        "WAIT".p(@_waitPool)
        switch @_waitMode
            when 'battleMethod'
                if @_waitPool == $gameParty.battleMembers().length
                    @resetWait()
        return

    _.updateInputChange = ->
        if @_lastBattleManagerInputActor != BattleManager._currentActor
            @_lastBattleManagerInputActor = BattleManager._currentActor
            @sendInputState()
        else if @_lastBattleManagerInputValue != BattleManager._inputting
            @_lastBattleManagerInputValue = BattleManager._inputting
            @sendInputState()
        return

    #TODO: Если в бою только один, то ничего передавать на сервер не надо!

    _.onBattleStarted = ->
        @_battleMethodsPool = []
        @_lastBattleManagerInputValue = false
        @_lastBattleManagerInputActor = null
        @sendBattleStarted()
        #TODO: отправить статус в битве
        #TODO: получить флаг мастер боя - просто первый в группе?
        #TODO: это наверное через get?
        
    _.callBattleMethod = (battler, method, args) ->
        # * Если в бою только один игрок, то ничего не отправляем (чтобы не грузить сеть)
        return if $gameParty.isOneBattler()
        if ANET.PP.isForceBattleSyncMode()
            @_battleMethodsPool = [] unless @_battleMethodsPool?
            @_battleMethodsPool.push([battler, method, args])
        else
            @_callBattleMethodOnServer(battler, method, args)
        return
    
    # * Отправка метод из очереди (используется в режиме Force Battle Sync)
    _._callBattleMethodOnServer = (battler, method, args) ->
        "CALL BATTLE METHOD".p()
        # * Обновим данные перед методом битвы
        # * Без этого был баг, что приходил collapse эффект, а hp = 0 уже после
        ANSyncDataManager.sendBattlerObserver(battler)
        # * На всякий случай, чтобы не сбивать основную логику обновления
        battler.netDataObserver._isDataChanged = true
        @sendBattleMethod(
            method,
            battler.packForNetwork(),
            args
        )
        if ANET.PP.isForceBattleSyncMode()
            # * Будем ждать игроков
            @setWait('battleMethod')
            @_waitPool += 1 # * Мы уже готовы (мастер боя)
        return

    # * Анимация в бою
    _.requestAnimation = (targets, animationId, mirror = false) ->
        return if $gameParty.isOneBattler()
        converted = targets.map (t) -> t.packForNetwork()
        data = {
            animationId: animationId
            mirror: mirror
            targets: converted
        }
        @sendBattleAnimation(data)
        return

    # * Персонаж данного игрока сделал выбор в бою (ввод команды)
    _.battleInputActionDone = () ->
        action = BattleManager.inputtingAction()
        @sendBattleInputAction(ANGameManager.myActorId(), action)
        return

    # * Регистрация на битву
    _.registerOnBattle = (battleId) ->
        LOG.p("Try register battle: " + battleId)
        @sendRegisterOnBattle(battleId)

    #? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
    # * ===============================================================

    # * Отправить выбранное игроком (в битве) действие
    _.sendBattleInputAction = (inputActorId, action) ->
        ANNetwork.send(NMS.Battle("inputAction", { action, inputActorId }))
        return

    # * Отправить изменение состояния ввода
    _.sendInputState = () ->
        inputState = BattleManager._inputting
        if BattleManager._currentActor?
            inputActorId = BattleManager._currentActor.actorId()
        else
            inputActorId = null
        ANNetwork.send(NMS.Battle("input", { inputState, inputActorId }))
        return

    # * Отправить команду WindowLog на сервер
    _.sendWindowLogMessage = (cmd, text) ->
        ANNetwork.send(NMS.Battle("logMessage", { cmd, text }))
        return

    _.sendBattleStarted = ->
        ANNetwork.send(NMS.Battle("started"))

    _.sendBattleMethod = (methodName, id, args) ->
        data = {
            method: methodName,
            id: id,
            data: args
        }
        ANNetwork.send(NMS.Battle("battleMethod", data), true)
        return

    _.sendBattleAnimation = (data) ->
        ANNetwork.send(NMS.Battle("animation", data))
        return

    _.sendBattleMethodReceived = ->
        ANNetwork.send(NMS.Battle("battleMethodReceived"))
        return

    _.sendRegisterOnBattle = (battleId) ->
        ANNetwork.get(NMS.Battle("register", battleId),
            (result) -> ANBattleManager.onBattleRegisterResult(result)
            () -> #TODO: Что если timeout? Сейчас ничего, пропуск команды
        )
        return

    #? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
    # * ===============================================================

    _.onBattleRegisterResult = (result) ->
        "REGISTER SUCCESS".p()
        ANGameManager.battleData = result
        console.info result

        return

    # * С сервера пришла команда проиграть анимацию
    _.onBattleAnimation = (data) ->
        try
            targets = data.targets.map (t) -> ANET.Utils.unpackBattlerFromNetwork(t)
            $gameTemp.requestAnimation(targets, data.animationId, data.mirror)
        catch e
            ANET.w e
        return

    # * С сервера пришла команда (метод) боя
    _.onBattleMethod = (battlerNetData, method, args) ->
        try
            #"BATTLE METHOD RECEIVED".p()
            # * Отправляю мастеру битвы информацию что я получил команду
            if ANET.PP.isForceBattleSyncMode()
                @sendBattleMethodReceived()
            battler = ANET.Utils.unpackBattlerFromNetwork(battlerNetData)
            if battler[method]?
                #TODO: convert arguments
                battler[method](args)
        catch e
            ANET.w e
        return

    # * Игрок принял команду боя
    _.onBattleMethodReceived = () ->
        try
            @_waitPool += 1
        catch e
            ANET.w e
        return

    # * Пришло изменение состояние ввода
    _.onBattleInputState = (inputState, inputActorId) ->
        try
            return unless $gameParty.inBattle()
            BattleManager._inputting = inputState
            if inputActorId == ANGameManager.myActorId()
                BattleManager.nSetCurrentClientInput()
            else
                # * Если не мой персонаж, то никакого ввода
                BattleManager.nClearClientInput()
        catch e
            ANET.w e
            return

    _.onBattleInputAction = (inputActorId, action) ->
        try
            return unless ANGameManager.isBattleMaster()
            #TODO: Проверка что inputActorId = BattleManager._currentActor.actorId()
            BattleManager.inputtingAction().setFromNetwork(action)
            # * Далее (продолжить бой)
            BattleManager.selectNextCommand()
        catch e
            ANET.w e
            return

    _.onLogWindowMessage = (cmd, text) ->
        try
            return unless $gameParty.inBattle()
            switch cmd
                when "add"
                    BattleManager._logWindow?.addText(text)
                else
                    BattleManager._logWindow?.clear()
        catch e
            ANET.w e
        return

    return