#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_NetworkGameMenu.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

do ->

    #@[DEFINES]
    _ = Scene_NetworkGameMenu::

    _._createNetworkMenu = ->
        ww = 400
        wh = @calcWindowHeight(2, true)
        wx = (Graphics.boxWidth - ww) / 2
        wy = (Graphics.boxHeight - wh) / 2
        rect = new Rectangle(wx, wy, ww, wh)
        @_commandsWindow = new Window_NetworkGameMenu(rect)
        @_commandsWindow.setHandler 'cancel', @popScene.bind(@)
        @_commandsWindow.setHandler 'createRoom', @_onCreateRoomMenu.bind(@)
        @_commandsWindow.setHandler 'joinRoom', @_onJoinRoomMenu.bind(@)
        @addWindow @_commandsWindow

    _._onCreateRoomMenu = ->
        ANNetwork.get(
            NMS.Lobby("createRoom"),
            (result) => @_onRoomCreated(result),
            () =>
                console.log("Can't create Room, server not response in time")
                @_commandsWindow.activate()
        )
        return

    _._onJoinRoomMenu = (roomData) ->
        #TODO: Тут надо показать сцену со списком комнат и там уже соединяться, но пропущу пока что
        ANNetwork.get(
            NMS.Lobby("joinToRoom", "Room_1"),
            (result) => @_onJoinedToRoom(result),
            () =>
                console.log("Can't join to Room, server not response in time")
                @_commandsWindow.activate()
        )
        return

    _._onJoinedToRoom = (roomData) ->
        unless roomData?
            console.log("Can't join to Room, Room not exists anymore")
            @_commandsWindow.activate()
        else
            ANNetwork.setRoomJoin(roomData)
            SceneManager.push(Scene_NetworkRoom)
    
    _._onRoomCreated = (roomData) ->
        ANNetwork.setRoomMaster(roomData)
        SceneManager.push(Scene_NetworkRoom)

    return
# ■ END Scene_NetworkGameMenu.coffee
#---------------------------------------------------------------------------