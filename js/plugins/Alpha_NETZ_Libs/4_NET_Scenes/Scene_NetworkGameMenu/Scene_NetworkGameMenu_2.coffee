#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_NetworkGameMenu.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_NetworkGameMenu::

    # * Методы обработки подключения к случайной комнате
    
    _.commandJoinRandRoomMenu = () ->
        @roomsList = null # * Обнуляем список комнат
        @requestRoomsListFromServer()
        @_waitRoomsForRandomJoin = true
        return

    _.requestRoomsListFromServer = ->
        ANNetwork.get(
            NMS.Lobby("getRoomsList"),
            (result) =>
                @roomsList = result
            () =>
                # * Timeout
                console.log("Server not returns rooms list in time")
                @_onCantJointRandomRoom()
        )
        return

    _._onCantJointRandomRoom = ->
        @_waitRoomsForRandomJoin = false
        @_commandsWindow.activate()
        HUIManager.notifyError("No available open rooms to join")
        return

    # * Ждём список комнат и пытаемся подключиться к случайной
    _._updateRandomJoin = ->
        return unless @_waitRoomsForRandomJoin
        return unless @roomsList?
        #TODO: filter добавить статус в иггре ил в лобии для комнаты и количество игроков
        console.info @roomsList
        @_waitRoomsForRandomJoin = false
        @applyFiltersToRoomList()
        if @roomsList.length == 0
            @_onCantJointRandomRoom()
        else
            randomRoomName = @roomsList.sample().name
            @joinToRoomRequest randomRoomName
        return

    _.applyFiltersToRoomList = ->
        @roomsList = [] unless @roomsList?
        return if @roomsList.length == 0
        @roomsList = @roomsList.filter (r) => @isProperRoomToJoin(r)
        return

    _.isProperRoomToJoin = (roomData) ->
        NetRoomDataWrapper.isRoomProperToJoin(roomData)
        
    _.joinToRoomRequest = (roomName) ->
        ANNetwork.get(
            NMS.Lobby("joinToRoom", roomName),
            (result) => @_onJoinedToRoom(result),
            () =>
                console.log("Can't join to Room, server not response in time")
                @_commandsWindow.activate()
        )
        return

    #?EVENT
    _._onJoinedToRoom = (roomData) ->
        unless roomData?
            console.log("Can't join to Room, Room not exists anymore")
            @_commandsWindow.activate()
        else
            ANNetwork.setRoomJoin(roomData)
            SceneManager.push(Scene_NetworkRoom)
        return
    



    return
# ■ END Scene_NetworkGameMenu.coffee
#---------------------------------------------------------------------------