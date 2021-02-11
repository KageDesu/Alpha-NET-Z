class Scene_NetworkRoomsList extends Scene_MenuBase
    constructor: () ->
        super()

    create: ->
        super()
        @_refreshRoomsListThread =
            new KDCore.TimedUpdate(120, @_requestRoomsListFromServer.bind(@))
        @_createRoomsList()
        @_requestRoomsListFromServer()
        return

    refreshRooms: ->
        @_roomsListWindow.refreshRooms(@roomsList)

    update: ->
        super()
        #@_refreshRoomsListThread.update()

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_NetworkRoomsList::

    _._requestRoomsListFromServer = ->
        "GET ROOMS LIST".p()
        # * В первый раз показываем Loader
        ###unless @roomsList?
            HUIManager.showLoader()
        ANNetwork.callback(
            NMS.Lobby("getRoomsList"),
            (result) =>
                # * Если сцена была закрыта, а комнаты пришли
                return unless SceneManager._scene instanceof Scene_NetworkRoomsList
                @roomsList = result
                return unless @roomsList?
                @refreshRooms()
                HUIManager.hideLoader()
        )
        return###
        #TODO: FOR TEST

        roomA = {
            name: "Good Room"
            masterId: "123"
            masterName: "Vasyia"
            inGame: false
            playersIds: ["1", "2"]
            gameId: $dataSystem.advanced.gameId
            gameTitle: "Alpha NET test"
            rpgVersion: 0
            maxPlayers: 4
            gameMode: 0
            canConnect: true
        }

        roomB = {
            name: "Bad Room"
            masterId: "000"
            masterName: "Petiya"
            inGame: false
            playersIds: ["1", "2"]
            gameId: $dataSystem.advanced.gameId
            gameTitle: "Alpha NET test"
            rpgVersion: 1
            maxPlayers: 4
            gameMode: 0
            canConnect: true
        }

        #TODO: Тут остановился,получение комнат с сервера, соединеие с комнатой

        @roomsList = [
            roomA, roomB
        ]
        @refreshRooms()
        return
    

    _._createRoomsList = ->
        ww = Graphics.width - 100
        wh = Graphics.height - 140
        wx = 50
        wy = 70
        @_roomsListWindow = new Window_NetworkRoomsList(new Rectangle(wx, wy, ww, wh))
        @_roomsListWindow.setHandler 'cancel', @popScene.bind(@)
        @_roomsListWindow.activate()
        @addWindow @_roomsListWindow

    
    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------

#TODO: События на обработку: список комнат обновлися, успешное подключение, плохое подключение
