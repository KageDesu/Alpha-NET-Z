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

    _._onJoinRoomMenu = ->
        #TODO: room list window
        #TODO: get room list
        @_commandsWindow.activate()
    
    _._onRoomCreated = (roomData) ->
        #TODO: lobby window
        console.log("Room created " + roomData)
        @_commandsWindow.activate()

    return
# ■ END Scene_NetworkGameMenu.coffee
#---------------------------------------------------------------------------