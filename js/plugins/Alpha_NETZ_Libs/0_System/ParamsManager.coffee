# * Класс которые работает с параметрами плагина

do ->
    class ParamsManager extends KDCore.ParamLoader
        constructor: () ->
            super("ANETZ")
            @_prepareParameters()
    
        # * Настройки соединения
        serverIp: -> @_ip
        serverPort: -> @_port

        isOnlySameMapMode: -> @getParam("onlySameMap", true)

        # * Набор персонажей Actors для сетевой игры
        actorsForNetwork: -> @getParam("actorsForNetwork", [1, 2, 3, 4])

        # * Можно ли выбирать персонажа себе
        isActorSelectionAllowed: -> @getParam("isActorSelectionAllowed", true)

        # * Начальная карта для сетевого режима
        #0 - Нет выделенной карты
        networkGameStartMap: -> @_nStartMapId

        # * Автоматически перемещает с начальной сетевой карты на игровую
        isNetworkGameAutoStart: -> @_isNetworkGameAutoStart is true

        globalVariablesIds: -> @_globalVars

        globalSwitchesIds: -> @_globalSwitches

        # * Можно ли просматривать статус других игроков
        isOtherPlayersMenuStatusAllowed: -> true

        # * Видно ли других игроков в меню
        isOtherPlayersVisibleInMenu: -> true

        #TODO: Нужна комманда плагина, которая работает только на начальной карте
        # и перемещает на начальную игровую карту (не Transfer, а on game start)

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
        @_prepareStartingMap()
        @_prepareGlobalData()

    _._prepareConnectionSettings = ->
        p = @getParam("connection", {
            serverIp: "195.161.41.20",
            serverPort: "3034"
        })
        @_ip = p.serverIp
        @_port = p.serverPort
        return

    _._prepareStartingMap = ->
        p = @getParam("networkStartMap", {
                gameStartMap: 0,
                isNetworkGameAutoStart: true
            })
        @_nStartMapId = p.gameStartMap
        @_isNetworkGameAutoStart = p.isNetworkGameAutoStart
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