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

    _._sendObserverData = (type, id, observerData) ->
        data = {
            type: type,
            id: id,
            data: observerData
        }
        ANNetwork.send(NMS.Game("observer", data))
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