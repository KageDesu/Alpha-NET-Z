#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Actor.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Actor::

    # * Данный персонаж - мой сетевой персонаж (текущего игрока)
    _.isMyNetworkActor = ->
        if ANNetwork.isConnected()
            return @ == $gameParty.leader()
        else
            return true

    # * Проверка observer только свого персонажа
    _.updateDataObserver = ->
        @_updateDataObserver() if @isMyNetworkActor()

    # * Отправка Observer только своего персонажа
    _.dataObserverHaveChanges = ->
        if @isMyNetworkActor()
            ANSyncDataManager.sendActorObserver()
    
    _._fillNetworkObserver = ->
        Game_Battler::_fillNetworkObserver.call(@)
        @netDataObserver.addFields(@, [
                "_name"
                "_nickname"
                "_classId"
                "_level"
                "_characterName"
                "_characterIndex"
                "_faceName"
                "_faceIndex"
                "_battlerName"
                "_exp"
                "_equips"
            ])
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