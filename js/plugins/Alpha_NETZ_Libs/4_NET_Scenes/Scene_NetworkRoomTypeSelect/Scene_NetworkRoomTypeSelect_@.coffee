#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_NetworkRoomTypeSelect.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

# * Сцена выбора "Новая игра" или "Загрузить" после выбора "Создать комнату"


#TODO: Если опция по возможности сохранения отключена, надо сразу перепрыгивать эту сцену

class Scene_NetworkRoomTypeSelect extends Scene_MenuBase
    constructor: () ->
        super()

    #TODO: Заголовок какой-нибудь ???

    create: ->
        super()
        # * Если параметр выключен (сохранять и загружать нельзя), то пропуск данной сцены
        unless ANET.PP.isSaveLoadAllowed()
            # * Если мы входим в сцену, то пропуск сразу в комнату
            if $gameTemp._nIsForwardTransitionToRoomTypeMenu is true
                $gameTemp._nIsForwardTransitionToRoomTypeMenu = null
                @commandNewGame()
            else
                @popScene()
            return # * Выход, не нужны компоненты сцены
        @_initSceneComponents()
        return

# ■ END Scene_NetworkRoomTypeSelect.coffee
#---------------------------------------------------------------------------

do ->

    #@[DEFINES]
    _ = Scene_NetworkRoomTypeSelect::

    _._initSceneComponents = ->
        @_createRoomTypeSelectMenu()
        @_createGamesToLoadList()

    _._createRoomTypeSelectMenu = ->
        ww = 400
        # * Хоть команды 2, используется 4, чтобы сразу под курсором была команда
        wh = @calcWindowHeight(4, true)
        wx = (Graphics.boxWidth - ww) / 2
        wy = (Graphics.boxHeight - wh) / 2
        rect = new Rectangle(wx, wy, ww, wh)
        @_commandsWindow = new Window_NetworkRoomTypeMenu(rect)
        @_commandsWindow.setHandler 'cancel', @popScene.bind(@)
        @_commandsWindow.setHandler 'newGame', @commandNewGame.bind(@)
        @_commandsWindow.setHandler 'continue', @commandContinue.bind(@)
        @addWindow @_commandsWindow

    _.commandNewGame = ->
        @_createNewRoom(null) # * новая игра
        return

    _.commandContinue = ->
        @_commandsWindow.hide()
        @_listWindow.show()
        @_listWindow.activate()
        return

    _._createNewRoom = (uniqueSaveId) ->
        # * Используем название команаты с предыдущей сцены
        roomName = $gameTemp._nLastRoomName
        unless String.any(roomName)
            roomName = "Room_" + Math.randomInt(1000)
        $gameTemp._nLastRoomName = null # * очищаем

        # * Собираем данные об новой комнате
        
        newRoomData = {
            name: roomName
            gameInfo: ANNetwork.getNetworkGameInfoData()
            uniqueSaveID: uniqueSaveId
        }

        # * Отправляем данные об текущей игре (клиенте)
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
        else
            HUIManager.notifyError("Can't create room with name: " + @_lastRoomName)
            @_commandsWindow.activate()
        return

    _._createGamesToLoadList = ->
        ww = Graphics.boxWidth - 100
        wh = @mainAreaHeight()
        wx = (Graphics.boxWidth - ww) / 2
        wy = (Graphics.boxHeight - wh) / 2
        rect = new Rectangle(wx, wy, ww, wh)
        @_listWindow = new Window_SavefileList(rect)
        @_listWindow.setHandler("ok", @onLoadFileSelected.bind(@))
        @_listWindow.setHandler("cancel", @onLoadFileSelectCancel.bind(@))
        @_listWindow.setMode("loadNet", false)
        @_listWindow.selectSavefile(0)
        @_listWindow.refresh()
        @_listWindow.hide()
        @addWindow(@_listWindow)
        return

    _.onLoadFileSelected = ->
        info = DataManager.savefileInfo(@_listWindow.savefileId())
        if info? and info.nUniqueSaveID?
            @_createNewRoom(info.nUniqueSaveID)
        else
            SoundManager.playBuzzer()
            @_listWindow.activate()
        return

    _.onLoadFileSelectCancel = ->
        @_listWindow.hide()
        @_commandsWindow.show()
        @_commandsWindow.activate()
        return
    
    return