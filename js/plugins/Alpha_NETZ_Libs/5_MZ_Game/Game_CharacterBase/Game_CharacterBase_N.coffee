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
            @_fillNetworkObserver()
            @netDataObserver.refreshAll(@)

        #TODO: test add _realX, _realY
        # * Движение передаётся отдельным методом для достижения плавности
        _._fillNetworkObserver = ->
            @netDataObserver.addFields(@, [
                #"_moveSpeed"
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
                @dataOserverHaveChanges()
                @netDataObserver.refreshAll(@)
            return

        # * Этот метод вызывается, когда изменились сихнронизируеммые данные
        _.dataOserverHaveChanges = -> # * EMPTY (for childrens)

        _.getObserverDataForNetwork = -> @netDataObserver.getDataForNetwork(@)

        _.applyObserverData = (data) ->
            return unless @netDataObserver?
            @netDataObserver.setDataFromNetwork(@, data)
            return

        return

    _.onMoveFromNetwork = (moveData) ->
        #LOCATE, moveStraing direction
        @moveFromNetwork(moveData)

    #TODO: Тут остановился

    # * Этот метод сам определяет направление движения
    # Код взят из Game_Follwer::chaseCharacter
    #TODO: moveDiagonallyFromServer from network!
    #TODO: direction приходит, может если x и y не равны, то двигать по d из сети?
    _.moveFromNetwork = (moveData) ->
        sx = @deltaXFrom(moveData.x)
        sy = @deltaYFrom(moveData.y)
        if sx != 0 and sy != 0
            horz = if sx > 0 then 4 else 6
            vert = if sy > 0 then 8 else 2
            @moveDiagonally(horz, vert)
        else if sx isnt 0
            @moveStraightFromServer(if sx > 0 then 4 else 6)
        else if sy isnt 0
            @moveStraightFromServer(if sy > 0 then 8 else 2)
        @_moveSpeed = moveData.speed
        return

    _.moveStraightFromServer = (d) ->
        @setMovementSuccess(true)
        @setDirection(d)
        @_x = $gameMap.roundXWithDirection(@_x, d)
        @_y = $gameMap.roundYWithDirection(@_y, d)
        @_realX = $gameMap.xWithDirection(@_x, @reverseDir(d))
        @_realY = $gameMap.yWithDirection(@_y, @reverseDir(d))
        @increaseSteps()

    # * Отправляется не direction, а именно координата. Проходимость проверяется на клиенте,
    # если точка не проходима, то X и Y не измениться
    # а если отправлять направление, то надо ещё и на каждом принимающем клиенте будет
    # проверять проходимость, что не есть хорошо
    _.getMoveDataForNetwork = (d) ->
        #data = {}
        #data.char = @_collectCharDataForNetwork()
        #data.pos = @_collectPositionDataForNetwork()
        #data.moveDirection = d
        return { speed: @realMoveSpeed(), x: @x, y: @y }

    # * Данные для сети
    do ->

        _._collectCharDataForNetwork = ->
            #TODO:

        _._collectPositionDataForNetwork = -> { x: @x, y: @y }

        return
    

    

    return
# ■ END Game_CharacterBase.coffee
#---------------------------------------------------------------------------