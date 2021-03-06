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
    #ALIAS__isBusy = _.isBusy
    #_.isBusy = ->
    #    ALIAS__isBusy.call(@)
        
    #@[ALIAS]
    #ALIAS__isActive = _.isActive
    #_.isActive = ->
    #    if ANNetwork.isConnected() && !$gameParty.isOneBattler()
     #       return ALIAS__isActive.call(@) && !ANBattleManager.isShouldWaitServer()
    #    else
     #       return ALIAS__isActive.call(@)

     #TODO: Есть проблема, ввод доступен, пока ждём сервер battleMethod

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