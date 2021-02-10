#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_NetworkGameMenu.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

do ->

    #@[DEFINES]
    _ = Scene_NetworkGameMenu::

    _._createWelcomeText = ->
        #TODO: From UI Text Component with user settings
        @_welcomeLine = KDCore.Sprite.FromBitmap(400, 60)
        @_welcomeLine.bitmap.fontSize = 38
        @_welcomeLine.x = Graphics.width / 2 - @_welcomeLine.bitmap.width / 2
        @_welcomeLine.y = 80
        @addChild @_welcomeLine

    _._createNetworkMenu = ->
        ww = 400
        wh = @calcWindowHeight(4, true)
        wx = (Graphics.boxWidth - ww) / 2
        wy = (Graphics.boxHeight - wh) / 2
        rect = new Rectangle(wx, wy, ww, wh)
        @_commandsWindow = new Window_NetworkGameMenu(rect)
        @_commandsWindow.setHandler 'cancel', @popScene.bind(@)
        @_commandsWindow.setHandler 'createRoom', @commandCreateRoomMenu.bind(@)
        @_commandsWindow.setHandler 'joinRoom', @commandJoinRoomMenu.bind(@)
        @_commandsWindow.setHandler 'joinRandRoom', @commandJoinRandRoomMenu.bind(@) #2
        @addWindow @_commandsWindow

    _.commandCreateRoomMenu = ->
        @_lastRoomName = HUIManager.getInputValue()
        unless String.any(@_lastRoomName)
            @_lastRoomName = "Room_" + Math.randomInt(1000)

        # * Отправляем также gameId
        newRoomData = {
            name: @_lastRoomName
            gameId: $dataSystem.advanced.gameId
        }

        ANNetwork.get(
            NMS.Lobby("createRoom", newRoomData),
            (result) => @_onRoomCreated(result),
            () =>
                console.log("Can't create Room, server not response in time")
                @_commandsWindow.activate()
        )
        return

    #?EVENT
    _._onRoomCreated = (roomData) ->
        if roomData?
            ANNetwork.setRoomMaster(roomData)
            SceneManager.push(Scene_NetworkRoom)
            #TODO: save in confing manager room name (???)
        else
            HUIManager.notifyError("Can't create room with name: " + @_lastRoomName)
            @_commandsWindow.activate()
        return

    _.commandJoinRoomMenu = () ->
        @_commandsWindow.activate()
        #TODO: Остановился тут, сцена комнат
        #TODO: Тут надо показать сцену со списком комнат и там уже соединяться, но пропущу пока что


    return
# ■ END Scene_NetworkGameMenu.coffee
#---------------------------------------------------------------------------