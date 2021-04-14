#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Interpreter.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Interpreter::

    _.nIsSharedEventMaster = -> @nPlayerPool?

    _.nIsEventIsShared = ->
        try
            return @nStartOptions?.sharedMode != "No"
        catch e
            ANET.w e
            return false

    _.nPrepareSharedEvent = ->
        # * Сбрасываем на всякий случай
        @_nSharedWaitPool = null
        "PREPARE SHARED MOD".p(@_eventId)
        unless $gameTemp._nSharedEventOuterStartFlag?
            # * START POOL (event master)
            # * Запускаем пул игроков (на карте)
            "START POOL".p()
            @nSetWaitPlayerPool()
            #TODO: Надо визуально ожидание рисовать, как было в Alpha NET
            #TODO: Событие отправить? Или напрямую или сцена сама проверяем?
        else
            # * START EVENT (send pool ready)
            "OUUTER START".p()
    
    # * Игрок отменил ожидания других игроков (события должно закрыться сразу)
    _.nIsSharedEventWaitPoolCancelled = ->
        try
            #TODO: Кнопку в параметры? (Потом)
            #TODO: if option is not strict
            if Input.isTriggered('cancel')
                # * Прерываем событие сразу (не запускаем)
                # * Очищаем ввод, чтобы меню сразу не выскочело после нажатия Esc
                Input.clear()
                @terminate()
                return true
        catch e
            ANET.w e
        return false

    return
# ■ END Game_Interpreter.coffee
#---------------------------------------------------------------------------