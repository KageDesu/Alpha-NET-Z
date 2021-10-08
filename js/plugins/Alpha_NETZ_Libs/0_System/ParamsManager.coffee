# * Класс которые работает с параметрами и командами плагина
do ->
    class ParamsManager extends KDCore.ParamLoader
        constructor: () ->
            super("ANETZ")
            @_prepareParameters()
    

        #? CONNECTION -----------------------------------------------------------
        # * Настройки соединения
        serverIp: -> @_ip
        serverPort: -> @_port

        #? MULTIPLAYER GROUP -----------------------------------------------------------

        #Wait Map Transfer?
        isOnlySameMapMode: -> @getParam("onlySameMap", true)

        # New Game Allowed?
        # * Доступна ли обычная локальная Новая игра
        isSinglePlayerAllowed: -> @getParam("singlePlayerAllowed", true)

        #Rooms Filter?
        isRoomFilterON: -> ANET.isPro() && @getParam("roomFilter", false)

        #Save and Load Allowed?
        # * Сохранение и загрузка сетевой игры
        isSaveLoadAllowed: -> @getParam("saveLoadGame", true)

        #TODO: Параметр
        isSaveOnlyInMenu: -> false

        #In-Game Chat?
        isGameChatAllowed: ->
            if ANET.isPro()
                return @getParam("inGameChat", false)
            else
                return false

        #? CHAT SUBGROUP -----------------------------------------------------------
        #TODO: Параметр
        #TODO: param Open chat if closed and new message is arrived
        #TODO: visual settings
        #TODO: keys (open, say)
        getChatStartMessage: -> "\\}Welcome to Alpha NET Z, \\C[1]'T'\\C[6] to chat"

        #? PLAYER SETTINGS GROUP -----------------------------------------------------------

        # * Набор персонажей Actors для сетевой игры
        #?VERSION
        #Actors
        actorsForNetwork: -> @getParam("actorsForNetwork", [1, 2, 3, 4])

        # * Можно ли выбирать персонажа себе
        #Actor selection?
        isActorSelectionAllowed: -> @getParam("isActorSelectionAllowed", true)

        # * Можно ли начать сетевую игру одному
        #One player start?
        isSingleActorNetworkGameAllowed: -> @getParam("isSinglePlayerStartAllowed", true)

        # * Отображение имени игрока заместо имени персонажа
        # * 0 - Не показывать, 1 - Name, 2 - Nickname
        #?DINAMIC
        #Player Name for Actor
        playerActorNameType: -> 0

        #On Player Disconnect CE
        getPlayerLeaveGameCommonEventId: -> @getParam("playerLeaveGameCommonEvent", 0)

        #? OTHER -----------------------------------------------------------

        globalVariablesIds: -> @_globalVars

        globalSwitchesIds: -> @_globalSwitches

        #? NOT IN HEADER YET -------------------------------------

        # * Можно ли просматривать статус других игроков
        isOtherPlayersMenuStatusAllowed: -> true

        # * Видно ли других игроков в меню
        isOtherPlayersVisibleInMenu: -> true

        # * Ожидание получения действия от каждого игрока в битве
        isForceBattleSyncMode: -> true

        # * Время обновления данных игрока (на карте)
        playerDataRefreshRate: -> 60

        # * Время обновления данных в битве (влияет на производительность)
        battleDataRefreshRate: -> 60

    ANET.link ParamsManager
    return


#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = ANET.ParamsManager::

    _._prepareParameters = ->
        @_prepareConnectionSettings()
        @_preparePlayerActorName()
        @_prepareGlobalData()

    #?VERSION
    _._prepareConnectionSettings = ->
        p = @getParam("connection", {
            serverIp: "195.161.41.20",
            serverPort: "3034"
        })
        @_ip = p.serverIp
        @_port = p.serverPort
        return

    _._preparePlayerActorName = ->
        p = @getParam("playerActorNameType", "")
        switch p
            when "Instead Name"
                @playerActorNameType = -> 1
            when "Instead Nickname"
                @playerActorNameType = -> 2
            else
                # * Ничего, так как 0 по умолчанию
        return
    
    _._prepareGlobalData = ->
        p = @getParam("globalData", {
                globalSwitchesIds: [],
                globalVariablesIds: []
            })
        @_globalVars = p.globalVariablesIds
        @_globalSwitches = p.globalSwitchesIds
        return

    return
# ■ END PRIVATE.coffee
#---------------------------------------------------------------------------