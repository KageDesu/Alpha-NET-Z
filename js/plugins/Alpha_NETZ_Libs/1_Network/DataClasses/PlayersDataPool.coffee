#@[GLOBAL]
#?[STORABLE]

# * Класс для пула ожидания флагов (или данных) от других игроков

class PlayersDataPool
    constructor: (@anotherPlayersGetter) ->
        @reset()
        return

    # * Режим ожидания не данных, а чтобы у всех был TRUE
    setFlagMode: -> @_isFlagMode = true

    # * Главный метод -> отправка на сервер запроса
    register: (@requestMethod) -> do @requestMethod

    update: ->
        return if @isReady() # * Чтобы цикла не было по вызову callback
        @_timeout--
        if @_repeatTimer >= 0
            @_repeatTimer--
        else
            @checkPool()
            unless @isReady()
                @resetTimer()
                if @_timeout > 0
                    @register(@requestMethod)
                else
                    @_isTimedOut = true
                    do @failCallback if @failCallback?
                    # * Сброс (например если Timeout не предусмотрен, не задан метод failCallback)
                    @resetTimeout()
            else
                do @callback if @callback?
        return

    # * Проверка пула данных
    checkPool: ->
        poolSize = 0
        # * Подразумевается что в этом массиве только ID других игроков (кроме себя)
        anotherPlayersIds = @anotherPlayersGetter().map (pl) -> pl.actorId
        for id in anotherPlayersIds
            poolSize += 1 if @isDataExistsFor(id)
        if poolSize == anotherPlayersIds.length
            # * Поэтому, когда пул полный, проверяем что данные от себя тоже есть
            @_isReady = @isMyDataExists()
        else
            @_isReady = false
        return

    onReady: (@callback) ->

    onFail: (@failCallback) ->

    isReady: -> @_isReady is true

    isTimedOut: -> @_isTimedOut is true

    setMyData: (data) -> @onAnswer(ANGameManager.myActorId(), data)

    isMyDataExists: -> @isDataExistsFor(ANGameManager.myActorId())

    isDataExistsFor: (actorId) -> @getDataFor(actorId)?

    getDataFor: (actorId) -> @_anotherPlayersData[actorId]

    getData: -> @_anotherPlayersData

    # * Этот метод вызывается внешне, когда пришли данные от сервера
    onAnswer: (actorId, data) ->
        unless @_isFlagMode
            @_anotherPlayersData[actorId] = data
        else
            # * Если в режиме флагов, то только при TRUE присваиваем данные
            if data == true
                @_anotherPlayersData[actorId] = data
            else
                # * null, а не false, потому что проверка через ? идёт
                @_anotherPlayersData[actorId] = null
                delete @_anotherPlayersData[actorId]
        return

    reset: ->
        @resetTimer()
        @resetTimeout()
        @_isReady = false
        @_isFlagMode = false
        @_isTimedOut = false
        @_anotherPlayersData = {}
        return

    resetTimer: -> @_repeatTimer = 60

    resetTimeout: -> @_timeout = 600