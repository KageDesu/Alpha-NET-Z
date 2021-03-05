# * Глабольный менеджер с основными методами системы

ANET.System = ->

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ IMPLEMENTATION.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = ANET.System

    # * Начальная загрузка компонентов
    # -----------------------------------------------------------------------
    do ->

        #TODO: * Лог свой для сообщений версий
        _.initSystem = ->
            "INIT ANET SYSTEM".p()
            @loadParameters()
            @applyParameters()
            ANET.loadPluginCommands()
            HUIManager.init()
            return

        _.loadParameters = ->
            ANET.PP = new ANET.ParamsManager()

        _.applyParameters = ->
            #TODO: Например конфигурация классов (dinamyc методов)
        
        return
    # -----------------------------------------------------------------------

    # * Все эти команды нельзя запускать через опции (виртуально), но
    # * их теоретически можно вызывать через общее событие у другого игрока
    _.ForbiddenVirtualCommandsList = [
        # * Message
        101, 102, 103, 104, 105,
        # * Flow Control
        111, 112, 113, 115, 118, 119, 108,
        # * Party
        129,
        # * Movement
        201, 202, 204, 206,
        # * Character
        216, 217,
        # * Timing
        230,
        # * Scene Control
        301, 302, 303, 351, 352,
        # * System Settings
        137,
        # * Meta
        0, 401, 402, 403, 411, 413, 657
    ]

    # * Список комманд которые запускаются через общее событие, а не виртуально
    _.NonVirtualCommandsList = [
        # * Flow Control
        117
    ]

    # * Дополнительные полня для синхронизации в битве
    _.BattlerObserverFields = [
        "_speed"
        "_actionState"
        #"_damagePopup"
        #"_effectType"
        #"_motionType"
        #"_weaponImageId"
        "_motionRefresh"
        "_selected"
        "_tpbState"
        "_tpbChargeTime"
        "_tpbCastTime"
        "_tpbIdleTime"
        "_tpbTurnCount"
        "_tpbTurnEnd"
    ]


# ■ END IMPLEMENTATION.coffee
#---------------------------------------------------------------------------