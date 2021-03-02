#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Event.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Event::

    # * Синхронизация движения
    # -----------------------------------------------------------------------
    do ->
        #@[ALIAS]
        ALIAS__moveStraight = _.moveStraight
        _.moveStraight = (d) ->
            if ANNetwork.isConnected()
                if ANGameManager.isMapMaster()
                    # * Запоминаем предыдующие координаты (перед движением)
                    @___x = @x
                    @___y = @y
                    # * Движение
                    ALIAS__moveStraight.call(@, d)
                    # * Если координаты сменились, значит персонаж
                    # совершил движение, можно отправить на сервер
                    if @___x isnt @x || @___y isnt @y
                        ANMapManager.sendEventMove(@eventId())
                else
                    # * SKIP MOVEMENT
                    # * Движение событий выполняется только на мастере карты
            else
                ALIAS__moveStraight.call(@, d)
            
        #@[ALIAS]
        ALIAS__updateSelfMovement = _.updateSelfMovement
        _.updateSelfMovement = ->
            if ANNetwork.isConnected()
                if ANGameManager.isMapMaster()
                    ALIAS__updateSelfMovement.call(@)
                else
                    # * NOTHING
                    # * Обновление движения события только на мастере карты
                    return
            else
                ALIAS__updateSelfMovement.call(@)


    # * Запуск события
    # -----------------------------------------------------------------------
    do ->

        #@[ALIAS]
        ALIAS__setupPageSettings = _.setupPageSettings
        _.setupPageSettings = ->
            ALIAS__setupPageSettings.call(@)
            if ANNetwork.isConnected()
                @nCheckEventStartOptions()
            return

        #@[ALIAS]
        ALIAS__clearPageSettings = _.clearPageSettings
        _.clearPageSettings = ->
            ALIAS__clearPageSettings.call(@)
            @nStartOptions = null
            return

        #@[ALIAS]
        ALIAS__start = _.start
        _.start = ->
            if ANNetwork.isConnected()
                # * Если опции старта не проходят проверку, значит не запускаем
                return unless @isPassStartOptions()
            ALIAS__start.call(@)

    return
# ■ END Game_Event.coffee
#---------------------------------------------------------------------------