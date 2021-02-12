# * Сцена со списком комнат на сервере
class Scene_NetworkRoomsList extends Scene_MenuBase
    constructor: () ->
        super()

    create: ->
        super()
        #TODO: Потом сделать чтобы сервер сам отправлял когда меняется список комнат
        # * Сейчас опасно, так как может быть уже 4 из 4, а информация не обновилась
        @_refreshRoomsListThread =
            new KDCore.TimedUpdate(60, @_requestRoomsListFromServer.bind(@))
        @_createRoomsList()
        @_requestRoomsListFromServer()
        return

    refreshRooms: ->
        @_roomsListWindow.refreshRooms(@roomsList)

    update: ->
        super()
        @_refreshRoomsListThread.update()

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_NetworkRoomsList::

    _._requestRoomsListFromServer = ->
        # * В первый раз показываем Loader
        unless @roomsList?
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
        @refreshRooms()
        return
    
    _._createRoomsList = ->
        ww = Graphics.width - 100
        wh = Graphics.height - 140
        wx = 50
        wy = 70
        @_roomsListWindow = new Window_NetworkRoomsList(new Rectangle(wx, wy, ww, wh))
        @_roomsListWindow.setHandler 'cancel', @popScene.bind(@)
        @_roomsListWindow.setHandler 'ok', @_onJoinRoomCommand.bind(@)
        @_roomsListWindow.activate()
        @addWindow @_roomsListWindow

    _._onJoinRoomCommand = ->
        roomData = @_roomsListWindow.getSelectedRoom()
        if NetRoomDataWrapper.isRoomProperToJoin(roomData)
            ANNetwork.get(
                NMS.Lobby("joinToRoom", roomData.name),
                (result) => @_onJoinedToRoom(result),
                () =>
                    console.log("Can't join to Room, server not response in time")
                    @_roomsListWindow.activate()
            )
        else
            SoundManager.playBuzzer()
            @_roomsListWindow.activate()
        return
    
    #?EVENT
    _._onJoinedToRoom = (roomData) ->
        unless roomData?
            console.log("Can't join to Room, Room not exists anymore")
            @_roomsListWindow.activate()
        else
            ANNetwork.setRoomJoin(roomData)
            SceneManager.push(Scene_NetworkRoom)
        return

    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------

#TODO: События на обработку: список комнат обновлися, успешное подключение, плохое подключение
