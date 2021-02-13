class Scene_NetworkRoom extends Scene_MenuBase
    constructor: () ->
        super()
        @_startingGameTransition = false

    create: ->
        super()
        @createRoomTitle()
        @createCommands()
        @createPlayersList()
        @refreshRoom()

    isBottomHelpMode: -> false

    refreshRoom: ->
        @room = ANNetwork.room
        @_refreshRoomTitle()
        @_refreshPlayerList()

    #?EVENT
    netOn_lobby_refreshRoomData: ->
        # * Пришли данные о комнате (и игроках), надо обновить
        @refreshRoom()

    #?EVENT
    netOn_lobby_startGame: ->
        @_startingGameTransition = true
        #TODO: Тут надо вызывать метод Scene_Title.commandNewGame
        # * Сейчас нету _commandWindow, так что временно создадим его чтобы не было ошибки
        this._commandWindow = {
            close: () ->
        }
        Scene_Title::commandNewGame.call(@)
        return

    #?EVENT
    # * Когда закрывается комната, вызывается это событие
    netOn_lobby_roomClosed: ->
        # * Из этой сцены мы возвращаемся в сетевое меню
        #SceneManager.goto(Scene_NetworkGameMenu)
        @popScene()

    update: ->
        super()
        #TODO: Готов клиент или нет
        if ANNetwork.isMasterClient() and Input.isTriggered('ok')
            ANNetwork.send(NMS.Lobby("startGame"))

    stop: ->
        super()
        # * Если TRUE - значит мы переходим на сцену с игрой и не надо закрывать коммнату
        return if @_startingGameTransition is true
        if ANNetwork.isMasterClient()
            ANNetwork.closeRoom()
        else
            ANNetwork.leaveRoom()

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_NetworkRoom.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_NetworkRoom::

    _.createRoomTitle = ->
        @createHelpWindow()
        @_refreshRoomTitle()
    
    _._refreshRoomTitle = ->
        if ANNetwork.isMasterClient()
            roomHostName = "\\C[1]" + ANGameManager.myPlayerData().name + " (you)"
        else
            unless @room?
                roomHostName = "Fetching..."
            else
                roomHostName = ANGameManager.getPlayerDataById(@room.masterId)?.name
        @_helpWindow.setText("Room: %1, Host: %2".format(ANNetwork.room.name, roomHostName))

    _._refreshPlayerList = ->
        @_playersListWindow.refresh()
        return

    _.createCommands = ->
        @_windowCommands = new Window_NetworkRoomCommands(new Rectangle(0, @_helpWindow.y + @_helpWindow.height, 400, 100))
        @_windowCommands.setHandler 'cancel', @popScene.bind(@)
        @_windowCommands.setHandler 'leave', @popScene.bind(@)
        @_windowCommands.setHandler 'start', @_onStartRoomCommand.bind(@)
        @_windowCommands.setHandler 'ready', @_onReadyInRoomCommand.bind(@)
        @addWindow @_windowCommands
        @_windowCommands.activate()
        return

    _._onStartRoomCommand = ->
        if @_isAllInRoomReady() # TODO: В Wrapper, так как окно тоже проверяет
            ANNetwork.send(NMS.Lobby("startGame")) if ANNetwork.isMasterClient()
        else
            @_windowCommands.activate()
        return

    _._onReadyInRoomCommand = ->
        #TODO: Ничего пока нет

    #TODO: Флаги готовности
    # * См. readyPlayersIds у данных комнаты
    _._isAllInRoomReady = -> true

    _.createPlayersList = ->
        ww = Graphics.width - 100
        wh = Graphics.height - 260
        wx = 50
        wy = 240
        @_playersListWindow = new Window_NetworkRoomPlayersList(new Rectangle(wx, wy, ww, wh))
        @addWindow @_playersListWindow
        @_refreshPlayerList()
        return

    return
# ■ END Scene_NetworkRoom.coffee
#---------------------------------------------------------------------------