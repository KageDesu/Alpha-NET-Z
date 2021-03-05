#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Actor.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Actor::

    # * Данный персонаж - мой сетевой персонаж (текущего игрока)
    _.isMyNetworkActor = -> @isMyNetworkBattler()

    _.updateDataObserver = ->
        # * Если в бою, то вся синхронизация идёт от мастера битвы
        if $gameParty.inBattle()
            if ANGameManager.isBattleMaster()
                @_updateDataObserver()
                @_updateBattleDataObserver()
            else
                # * Только приём данных
        else
            # * Если НЕ в бою, то проверка observer только свого персонажа
            @_updateDataObserver() if @isMyNetworkActor()
        return

    # * Отправка Observer только своего персонажа
    _.dataObserverHaveChanges = ->
        # * Если в бою, то вся синхронизация идёт от мастера битвы
        if $gameParty.inBattle()
            if ANGameManager.isBattleMaster()
                ANSyncDataManager.sendBattlerObserver(@)
        else
            # * Если не в бою, то только свои данные
            if @isMyNetworkActor()
                ANSyncDataManager.sendActorObserver()
        return
    
    #TODO: Может просто все все свойства передавать?
    # собрать их автоматически
    _._fillNetworkObserver = ->
        Game_Battler::_fillNetworkObserver.call(@)
        @netDataObserver.addFields(@, ANET.System.ActorObserverFields)
        return

    #?{DYNAMIC}
    _.refreshNetworkDummy = -> # * EMPTY

    _.refreshNetwork = ->
        # * Тут нельзя делать проверку на текущих Actor или нет, так как вызывает Stack Overflow
        # * Метод refresh вызывается ещё до того как Actor создан (класс)
        # * Принудительная отправка
        @dataObserverHaveChanges()
        return

    return
# ■ END Game_Actor.coffee
#---------------------------------------------------------------------------