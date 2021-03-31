#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Actor.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Actor::

    # * Данный персонаж - мой сетевой персонаж (текущего игрока)
    _.isMyNetworkActor = ->
        # * Тут сделано разделение специально, чтобы уменьшить проблемы с LocalActor
        # * Суть в том, что при LocalActor могут отправляться данные всех персонажей,
        # * так как проверка через leader() обращается в Game_Actors, а ID всегда на
        # * своего персонажа (стоит Instance Mode, в этом ещё дело)
        # * Пока отключил передачу СВОИХ данных в режиме Local
        return false if $gameTemp._nLocalActorMode is true
        if $gameParty.inBattle()
            return @isMyNetworkBattler()
        else
            return @actorId() == ANGameManager.myActorId()

    _.updateDataObserver = ->
        # * Если в бою, то вся синхронизация идёт от мастера битвы
        if $gameParty.inBattle()
            if ANGameManager.isBattleMaster()
                @_updateDataObserver()
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
                @requestNetBattleDataPush()
                # * Если только я в бою, то отправляю обычные данные
                # * Чтобы другие игроки видели HP и MP
                # TODO: Опция?
                if $gameParty.isOneBattler()
                    ANSyncDataManager.sendActorObserver()
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
        unless $gameParty.inBattle()
            @dataObserverHaveChanges()
        return

    # * Установить заместо имени (никнейма) персонажа имя сетевого игрока
    _.nSetupPlayerActorName = ->
        # * Устанавливаем только своему персонажу, так как myPlayerData есть в начале игры
        # * Данные других персонажей прийдут сами с Observer сразу
        return unless @actorId() == ANGameManager.myActorId()
        playerData = ANGameManager.myPlayerData()
        return unless playerData?
        if ANET.PP.playerActorNameType() == 1
            @_name = playerData.name
        else if ANET.PP.playerActorNameType() == 2
            @_nickname = playerData.name
        return

    return
# ■ END Game_Actor.coffee
#---------------------------------------------------------------------------