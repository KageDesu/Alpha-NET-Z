# * Данный класс отвечает за методы передачи, обработки и
# * синхронизации игровых данных (и Observers)

#@[GLOBAL]
ANSyncDataManager = ->

do ->

    #@[LOG]
    LOG = new KDCore.DevLog("DataSync")
    LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35))
    LOG.on()

    #@[DEFINES]
    _ = ANSyncDataManager

    #? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
    # * ===============================================================

    _.sendPlayerObserver = () ->
        @_sendObserverData(
            'playerChar',
            ANNetwork.myId(),
            $gamePlayer.getObserverDataForNetwork()
        )

    _.sendEventObserver = (eventId) ->
        @_sendObserverData(
            'eventChar',
            {
                mapId: $gameMap.mapId()
                eventId: eventId
            },
            $gameMap.event(eventId).getObserverDataForNetwork()
        )
        return

    _.sendActorObserver = () ->
        @_sendObserverData(
            'playerActor',
            ANNetwork.myId(),
            $gameParty.leader().getObserverDataForNetwork()
        )


    #TODO: через GET ? или callback
    _.sendBattleUnitsObserver = (members) ->
        #"SEND UNITS OBSERVER".p()
        return if $gameParty.isOneBattler()
        observers = members.map (m) ->
            [m.packForNetwork(),
            m.getObserverDataForNetwork()]
            #m.result().getObserverDataForNetwork()]
        @_sendObserverData(
            'battleUnits',
            null,
            observers
        )
        return

    #TODO: NOT USED
    _.sendBattlerObserver = (battler) ->
        "SEND BATTLER OBSERVER".p()
        @_sendObserverData(
            'battler',
            battler.packForNetwork(),
            battler.getObserverDataForNetwork()
        )

    _.sendBattlerResultObserver = (battler) ->
        "SEND BATTLER RESULT".p()
        return if $gameParty.isOneBattler()
        @_sendObserverData(
            'battlerResult',
            battler.packForNetwork(),
            battler.result().getObserverDataForNetwork()
        )

    _._sendObserverData = (type, id, observerData) ->
        data = {
            type: type,
            id: id,
            data: observerData
        }
        ANNetwork.send(NMS.Game("observer", data), true)
        return


    #TODO: Может отправлять изменение на мастера, он уже все глобальные переменные всем отправляет
    _.sendGlobalVariableChange = (varId, newValue) ->
        data = {
            id: varId,
            data: newValue
        }
        ANNetwork.send(NMS.Game("variable", data))
        return

    _.sendGlobalSwitchChange = (switchId, newValue) ->
        data = {
            id: switchId,
            data: newValue
        }
        ANNetwork.send(NMS.Game("switch", data))
        return

    _.sendSyncGlobalVariables = () ->
        #TODO: Синхронизация всех глобальных переменных
        #см. $gameVariables.getAllGlobalVariablesData()

    #? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
    # * ===============================================================

    _.onObserverData = (id, type, content) ->
        switch type
            when 'playerChar'
                @_onPlayerCharObserverData(id, content)
            when 'eventChar'
                @_onEventCharObserverData(id, content)
            when 'playerActor'
                @_onPlayerActorObserverData(id, content)
            when 'battler'
                @_onBattlerObserverData(id, content)
            when 'battlerResult'
                @_onBattlerResultObserverData(id, content)
            when 'battleUnits'
                @_onBattleUnitsObserverData(content)
            else
                LOG.p("From server: unknown observer data type: " + type)
                return

    _._onPlayerCharObserverData = (id, content) ->
        try
            char = $gameMap.networkCharacterById(id)
            char?.applyObserverData(content)
        catch e
            ANET.w e
            
        return

    _._onEventCharObserverData = (id, content) ->
        try
            { mapId, eventId } = id
            return if $gameMap.mapId() != mapId
            event = $gameMap.event(eventId)
            event?.applyObserverData(content)
        catch e
            ANET.w e
        return

    _._onPlayerActorObserverData = (id, content) ->
        try
            # * Если событие перевело выбор персонажа в локальный режим
            # * то ставим специальный флаг что сейчас идёт обращение только
            # * к сетевому персонажу
            if $gameTemp._nLocalActorMode is true
                $gameTemp._nNetworkActorPickRequest = true
            player = ANGameManager.getPlayerDataById(id)
            actor = NetPlayerDataWrapper.getActorForPlayer(player)
            # * На всякий случай сниму флаг
            $gameTemp._nNetworkActorPickRequest = false
            return unless actor?
            @_convertActorEquipmens(content)
            actor.applyObserverData(content)
        catch e
            ANET.w e
        return

    _._onBattlerObserverData = (battlerNetData, content) ->
        try
            return unless $gameParty.inBattle()
            #"ON BATTLER OBSERVER DATA".p()
            battler = ANET.Utils.unpackBattlerFromNetwork(battlerNetData)
            return unless battler?
            @_convertActorEquipmens(content)
            battler.applyObserverData(content)
        catch e
            ANET.w e
        return

    _._convertActorEquipmens = (content) ->
        return unless content._equips?
        for i in [0...content._equips.length]
            itemData = content._equips[i]
            content._equips[i] = new Game_Item()
            content._equips[i]._dataClass = itemData._dataClass
            content._equips[i]._itemId = itemData._itemId
        return

    _._onBattlerResultObserverData = (battlerNetData, content) ->
        try
            return unless $gameParty.inBattle()
            #"ON BATTLER RESULT DATA".p()
            battler = ANET.Utils.unpackBattlerFromNetwork(battlerNetData)
            return unless battler?
            battler.result()?.applyObserverData(content)
        catch e
            ANET.w e
        return

    _._onBattleUnitsObserverData = (content) ->
        try
            return unless $gameParty.inBattle()
            #"ON BATTLERS UNITS DATA".p()
            for netData in content
                battler = ANET.Utils.unpackBattlerFromNetwork(netData[0])
                if battler?
                    @_convertActorEquipmens(netData[1])
                    battler.applyObserverData(netData[1])
        catch e
            ANET.w e
        return

    _.onVariableValue = (varId, value) ->
        try
            $gameVariables.onVariableFromServer(varId, value)
        catch e
            ANET.w e
        return

    _.onSwitchValue = (varId, value) ->
        try
            $gameSwitches.onSwitchFromServer(varId, value)
        catch e
            ANET.w e
        return

    return