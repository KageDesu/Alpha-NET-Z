#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Battle.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Battle::

    # * В сетевом режиме автосхранения отключены
    #@[ALIAS]
    ALIAS__shouldAutosave = _.shouldAutosave
    _.shouldAutosave = ->
        if ANNetwork.isConnected()
            return false
        else
            return ALIAS__shouldAutosave.call(@)

    #@[ALIAS, STORED]
    _.ALIAS__NET_start = _.start
    _.start = ->
        # * Если бой в сетевом режиме и ещё не зарегестрирован, то сцена боя не отрисовывается
        if ANNetwork.isConnected() &&
            BattleManager.nIsNetworkBattle() &&
                !ANBattleManager.isBattleRegistred()
                    return
        # * Метод Start вызывается автоматически у SceneManager, поэтому когда
        # * данные прийдут, сцена старт
        _.ALIAS__NET_start.call(@)
        @nOnBattleStarted() if ANNetwork.isConnected()
        return

    #@[ALIAS]
    ALIAS__stop = _.stop
    _.stop = ->
        ALIAS__stop.call(@)
        if ANNetwork.isConnected()
            @nOnBattleEnd()
        return

     #TODO: Есть проблема, ввод доступен, пока ждём сервер battleMethod
     #TODO: Может просто деактивировать все окна? Чтобы нельзя было выбирать действие

    # * Игрок не может видеть команды "ввода" персонажей других игроков
    #@[ALIAS]
    ALIAS__changeInputWindow = _.changeInputWindow
    _.changeInputWindow = ->
        ALIAS__changeInputWindow.call(@)
        if ANNetwork.isConnected() && BattleManager.isInputting() && !$gameParty.isOneBattler()
            if BattleManager.actor()?
                @endCommandSelection() unless BattleManager.actor() == $gameParty.leader()
        return
        
    #@[ALIAS]
    ALIAS__commandFight = _.commandFight
    _.commandFight = ->
        if ANNetwork.isConnected()
            # * Игрок снова должен сделать выбор
            BattleManager._isShouldWaitMyNetworkAction = true
        ALIAS__commandFight.call(@)
        return

    # * Должен идти перед переопределением общим, поэтому в этом файле
    if KDCore.isMV()
        #@[ALIAS]
        ALIAS__updateBattleProcessMV = _.updateBattleProcess
        _.updateBattleProcess = ->
            if ANNetwork.isConnected()
                if !@isAnyInputWindowActive() ||
                        BattleManager.isAborting() ||
                            BattleManager.isBattleEnd()
                    @changeInputWindow()
                BattleManager.update() # * Надо обновлять не зависимо от условия вверху
            else
                ALIAS__updateBattleProcessMV.call(@)

    #@[ALIAS]
    ALIAS__updateBattleProcess = _.updateBattleProcess
    _.updateBattleProcess = ->
        # * На данный момент, если игрок один в битве, то он ничего не отравляет на сервер
        if ANNetwork.isConnected()
            if $gameParty.isOneBattler()
                # * Только обновлять данные HP и MP другим игрокам
                $gameParty.leader().updateDataObserver()
            else
                # * Логика сетевого боя (общая для мастера и клиентов)
                @nUpdateBattleProcess()
                if ANGameManager.isBattleMaster()
                    ANBattleManager.update()
                    # * Если ждём сервер, то не обновляем BattleManager
                    return if ANBattleManager.isShouldWaitServer()
                else
                    # * BattleManager update (ALIAS__updateBattleProcess) выполняет только мастер битвы
                    return unless BattleManager.nIsLocalForceUpdatePhase()
        ALIAS__updateBattleProcess.call(@)
        return
    
    # * На всякий случай отключу автобитву
    #@[ALIAS]
    ALIAS__updateTpbAutoBattle = _.updateTpbAutoBattle
    _.updateTpbAutoBattle = ->
        if ANNetwork.isConnected()
            return
        else
            ALIAS__updateTpbAutoBattle.call(@)
        

    return
# ■ END Scene_Battle.coffee
#---------------------------------------------------------------------------