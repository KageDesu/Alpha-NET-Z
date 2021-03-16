# * Класс которые работает с параметрами и командами плагина

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

        globalVariablesIds: -> @_globalVars

        globalSwitchesIds: -> @_globalSwitches

        # * Отображение имени игрока заместо имени персонажа
        # * 0 - Не показывать, 1 - Name, 2 - Nickname
        #?DINAMIC
        playerActorNameType: -> 0

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