#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Title.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Title::

    # DEV FAST GAME START
    # --------------------------------------------------------
    do ->

        # * Метод только для отладки (быстрый старт на кнопку C)
        _.nUpdateDebugStart = ->
            if Input.isTriggered('c')
                @nFastConnectToDevRoom()
            if $gameTemp._isDevNetGameWaitPlayers is true
                if ANGameManager.playersData.length > 1
                    @nFastGameStart()

        #?EVENT
        _.netOn_lobby_startGame = ->
            return unless $gameTemp._isDevNetGameStart is true
            Scene_Title::commandNewGame.call(@)
            return

        _.nFastConnectToDevRoom = ->
            if ANET.PP.isActorSelectionAllowed()
                console.warn("Can't connect in Dev room in Actor Select mode")
                return
            ANNetwork.initSystem()
            ANNetwork.setConnection((status) ->
                    if status == 1
                        HUIManager.notifySucess("Connected to server")
                        ANGameManager.init()
                        ANNetwork.get(
                            NMS.Lobby("createRoom", {
                                name: "dev",
                                gameInfo: ANNetwork.getNetworkGameInfoData()
                            }),
                            (roomData) ->
                                if roomData?
                                    ANNetwork.setRoomMaster(roomData)
                                    $gameTemp._isDevNetGameWaitPlayers = true
                                else
                                    ANNetwork.get(
                                        NMS.Lobby("joinToRoom", "dev"),
                                        (roomData) ->
                                            $gameTemp._isDevNetGameStart = true
                                            ANNetwork.setRoomJoin(roomData)
                                        () ->
                                            console.log("Can't join to Room, server not response in time")
                                    )
                            () ->
                                console.log("Can't create Room, server not response in time")
                        )
                    else
                        HUIManager.notifyError("Server not response in time")
                )

        _.nFastGameStart = ->
            if ANNetwork.isMasterClient()
                $gameTemp._isDevNetGameStart = true
                ANNetwork.send(NMS.Lobby("startGame"))
        
        return

    #?EVENT
    # * Когда соединение прервано, вызывается это событие
    _.onLostConnection = -> # * NOTHING

    _.commandNetwork = ->
        @_commandWindow.close()
        SceneManager.push(Scene_NetworkGameMenu)
    
    return
# ■ END Scene_Title.coffee
#---------------------------------------------------------------------------