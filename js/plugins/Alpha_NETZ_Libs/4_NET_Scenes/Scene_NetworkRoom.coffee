class Scene_NetworkRoom extends Scene_MenuBase
    constructor: () ->
        super()
        @_startingGameTransition = false

    create: ->
        super()
        @_cancelButton.setClickHandler(@popScene.bind(@))
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
            roomHostName = "\\C[1]" + ANGameManager.myPlayerData().name
        else
            unless @room?
                roomHostName = "Fetching..."
            else
                roomHostName = ANGameManager.getPlayerDataById(@room.masterId)?.name
        @_helpWindow.setText("Room: %1, Host: %2".format(ANNetwork.room.name, roomHostName))

    _._refreshPlayerList = ->
        "--- PLAYERS IN ROOM: ".p()
        for pl in ANGameManager.playersData
            console.log(pl.name)
        "--- --- --- ".p()

    _.createCommands = ->

    _.createPlayersList = ->
        @_refreshPlayerList()


    return
# ■ END Scene_NetworkRoom.coffee
#---------------------------------------------------------------------------