class Scene_NetworkRoom extends Scene_MenuBase
    constructor: () ->
        super()
        @_startingGameTransition = false

    create: ->
        super()
        @room = ANNetwork.room
        console.info(@room)
        @createRoomTitle()
        @createCommands()
        @createPlayersList()
        if ANET.PP.isActorSelectionAllowed() and !@isLoadGame()
            @createActorSelectWindow()
        @prepareSaveFile() if @isLoadGame()
        @refreshRoom()
        return

    start: ->
        super()
        ANNetwork.requestRoomRefresh()
        # * Так как есть искуственная задержка загрузки сцены на MV
        if KDCore.isMV()
            setTimeout (->
                    try
                        ANNetwork.requestRoomRefresh()
                    catch
                ), 300
        return

    isBottomHelpMode: -> false

    isLoadGame: -> ANET.Utils.isLoadGameRoom()

    refreshRoom: ->
        @room = ANNetwork.room
        @_refreshRoomTitle()
        @_refreshPlayerList()
        @_refreshActorsList()
        @_windowCommands.refresh()

    #?EVENT
    # * Когда игрок выходит или входит в комнату
    netOn_lobby_refreshRoomData: ->
        # * Пришли данные о комнате (и игроках), надо обновить
        @refreshRoom()

    #?EVENT
    # * Когда игрок выбирает персонажа
    netOn_game_playersData: ->
        # * Пришли данные о комнате (и игроках), надо обновить
        @refreshRoom()

    #?EVENT
    netOn_lobby_startGame: ->
        @_startingGameTransition = true
        if @isLoadGame()
            @loadAndStartGame()
        else
            @startNewGame()
        return

    #?EVENT
    # * Когда закрывается комната, вызывается это событие
    netOn_lobby_roomClosed: ->
        # * Из этой сцены мы возвращаемся в сетевое меню (если мы не мастер)
        # * Для мастера не надо, так как сцена и так закрывается сама и получается
        # * что возврат происходит на Scene_Title
        @popScene() unless @_shouldNotPopScene

    update: ->
        super()
        #TODO: Готов клиент или нет
        #if ANNetwork.isMasterClient() and Input.isTriggered('ok')
        #    ANNetwork.send(NMS.Lobby("startGame"))

    stop: ->
        super()
        # * Если TRUE - значит мы переходим на сцену с игрой и не надо закрывать коммнату
        return if @_startingGameTransition is true
        if ANNetwork.isMasterClient()
            @_shouldNotPopScene = true
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

    _.startNewGame = ->
        # * Сейчас нету _commandWindow, так что временно создадим его чтобы не было ошибки
        this._commandWindow = {
            close: () ->
        }
        Scene_Title::commandNewGame.call(@)
        return

    _.loadAndStartGame = ->
        # * Задаём флаг, что будем загружать сетевую игру
        $gameTemp._nRequestLoadNetworkGame = true
        SceneManager.push(Scene_Load)
        return

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
        @_windowCommands = new Window_NetworkRoomCommands(new Rectangle(0, @_helpWindow.y + @_helpWindow.height, 600, 100))
        @_windowCommands.setHandler 'cancel', @popScene.bind(@)
        @_windowCommands.setHandler 'leave', @popScene.bind(@)
        @_windowCommands.setHandler 'start', @_onStartRoomCommand.bind(@)
        @_windowCommands.setHandler 'ready', @_onReadyInRoomCommand.bind(@)
        @_windowCommands.setHandler 'character', @_onCharacterSelectCommand.bind(@)
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

    _._onCharacterSelectCommand = ->
        @_windowActorsList.show()
        @_windowActorsList.open()
        @_windowActorsList.activate()
        @_playersListWindow.close()


    #TODO: Флаги готовности, сбрасывать при нажатии Character
    # * См. readyPlayersIds у данных комнаты
    _._isAllInRoomReady = -> true

    _.createActorSelectWindow = ->
        ww = Graphics.width - 100
        wh = Graphics.height - 260
        wx = 50
        wy = 240
        @_windowActorsList = new Window_NetworkActorsList(new Rectangle(wx, wy, ww, wh))
        @_windowActorsList.setHandler 'cancel', @_onActorSelectCancel.bind(@)
        @_windowActorsList.setHandler 'ok', @_onActorSelectOk.bind(@)
        @_windowActorsList.hide()
        @addWindow @_windowActorsList

    _._onActorSelectCancel = -> @_cancelActorSelection()
        
    _._cancelActorSelection = ->
        @_windowActorsList.close()
        @_windowCommands.activate()
        @_playersListWindow.open()

    _._onActorSelectOk = ->
        selectedActorId = @_windowActorsList.selectedActorId()
        if selectedActorId <= 0
            SoundManager.playBuzzer()
            @_windowActorsList.activate()
        else
            ANPlayersManager.sendBindActorFromLobby(selectedActorId, @_onBindActorResult.bind(@))
        return

    _._onBindActorResult = (resultFlag) ->
        if resultFlag is true
            @_cancelActorSelection()
        else
            SoundManager.playBuzzer()
            @_windowActorsList.activate()
        @refreshRoom()
        return

    _._refreshActorsList = ->
        @_windowActorsList?.refresh()

    _.createPlayersList = ->
        ww = Graphics.width - 100
        wh = Graphics.height - 260
        wx = 50
        wy = 240
        @_playersListWindow = new Window_NetworkRoomPlayersList(new Rectangle(wx, wy, ww, wh))
        @addWindow @_playersListWindow
        @_refreshPlayerList()
        return

    _.prepareSaveFile = ->
        info = DataManager.nGetNetworkSaveInfoWithId(@room.uniqueSaveID)
        unless info?
            HUIManager.notifyError("Save file data not found!")
            console.warn("Save file with ID " + @room.uniqueSaveID + " not found!")
            @popScene.bind(@)
        else
            #TODO: На сервере нет проверки на занятость персонажа??? НЕТУ в 112
            ANPlayersManager.sendBindActorFromLobby(
                info.nMyActorId, @onBindLoadedActorResult.bind(@)
                )
        return

    _.onBindLoadedActorResult = (resultFlag) ->
        if resultFlag is false
            SoundManager.playBuzzer()
            HUIManager.notifyError("Can't load Actor data or Actor already used by another player")
            @popScene.bind(@)
        else
            @refreshRoom()
        return

    return
# ■ END Scene_NetworkRoom.coffee
#---------------------------------------------------------------------------