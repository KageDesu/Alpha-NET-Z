#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Battle.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Battle::

    #@[ALIAS]
    ALIAS__start = _.start
    _.start = ->
        ALIAS__start.call(@)
        if ANNetwork.isConnected()
            @nOnBattleStarted()
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

    #@[ALIAS]
    ALIAS__updateBattleProcess = _.updateBattleProcess
    _.updateBattleProcess = ->
        # * На данный момент, если игрок один в битве, то он ничего не отравляет на сервер
        if ANNetwork.isConnected()
            if $gameParty.isOneBattler()
                # * Только обновлять данные HP и MP другим игрокам
                $gameParty.leader().updateDataObserver()
            else
                # * Логика сетевого боя
                @nUpdateBattleProcess()
                # * BattleManager update выполняет только мастер битвы
                # * Иначе, выходим сразу из метода
                return unless ANGameManager.isBattleMaster()
                ANBattleManager.update()
                # * Если ждём сервер, то тоже выходим из метода
                return if ANBattleManager.isShouldWaitServer()
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