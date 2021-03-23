#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_CharacterBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_CharacterBase::

    # * OBSERVER
    do ->

        _._createNetworkObserver = ->
            @netDataObserver = new DataObserver()
            @netDataObserver.setCheckInterval(ANET.PP.playerDataRefreshRate())
            @_fillNetworkObserver()
            @netDataObserver.refreshAll(@)

        #TODO: Добавить API для разработчиков плагинов вносить свои поля (и так со всем Observers)
        # * Движение передаётся отдельным методом для достижения плавности
        _._fillNetworkObserver = ->
            @netDataObserver.addFields(@, [
                "_opacity"
                "_blendMode"
                "_walkAnime"
                "_stepAnime"
                "_directionFix"
                "_transparent"
                "_direction"
            ])

        _._updateDataObserver = ->
            return unless @netDataObserver?
            @netDataObserver.check(@)
            if @netDataObserver.isDataChanged()
                @dataObserverHaveChanges()
                @netDataObserver.refreshAll(@)
            return

        # * Этот метод вызывается, когда изменились сихнронизируеммые данные
        _.dataObserverHaveChanges = -> # * EMPTY (for childrens)

        _.getObserverDataForNetwork = -> @netDataObserver.getDataForNetwork(@)

        _.applyObserverData = (data) ->
            return unless @netDataObserver?
            @netDataObserver.setDataFromNetwork(@, data)
            return

        return

    _.moveStraightFromServer = (moveData) ->
        # * Всегда успех, так как если нет, то данные и не прийдут от другого игрока
        @setMovementSuccess(true)
        @setDirection(moveData.direction)
        @_x = moveData.x
        @_y = moveData.y
        @_realX = moveData.realX
        @_realY = moveData.realY
        # * Чтобы синхронизировать правильно бег
        @_moveSpeed = moveData.moveSpeed
        @increaseSteps()
        return

    _.getMoveDataForNetwork = () ->
        return {
            direction: @_direction
            moveSpeed: @realMoveSpeed()
            x: @x
            y: @y
            realX: @_realX
            realY: @_realY
        }


    return
# ■ END Game_CharacterBase.coffee
#---------------------------------------------------------------------------