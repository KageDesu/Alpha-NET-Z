#@[GLOBAL]
#?[STORABLE]

# * Класс для пула ожидания других игроков

class PlayersWaitPool
    constructor: () ->
        # * Запоминается при создании, чтобы можно было сбросить
        # * Это нужно, чтобы если игрок новый переместился на карту, его
        # * не добавили в ожидание, если на этой карте уже запущено общее событие
        @_anotherPlayersIds = ANGameManager.anotherPlayersOnMap().map (pl) -> pl.actorId
        @reset()
        return

    # * Зарегестрировать (отправить на сервер)
    register: ->
        @resetTimer()
        ANInterpreterManager.sendSharedEventRequireRegister()
        return

    # * Только один игрок (мастер события) запустил событие (один на карте или в игре)
    isSinglePool: -> @_anotherPlayersIds.length == 0

    # * Проверить, что игроки, которые в пуле, онлайн (не отключились)
    checkPool: ->
        playersOnMap = ANGameManager.anotherPlayersOnMap()
        for id in @_anotherPlayersIds
            # * Если игрока больше нет на карте, мы его удаляем из пула
            player = playersOnMap.find (pl) -> pl.actorId == id
            unless player?
                @_anotherPlayersIds.delete(id)
                # * Игрок отключился, делаем ему true, чтобы можно было продолжить событие
                # * (в следующей команде он уже участвовать не будет, так как будет Reset)
                @_playersReady[id] = true
        return

    # * Ответ от сервера
    onAnswer: (actorId) -> @_playersReady[actorId] = true

    update: ->
        if @_repeatTimer >= 0
            @_repeatTimer--
        else
            unless @isReady()
                @checkPool()
                @register()
        return

    isReady: ->
        for pl, value of @_playersReady
            # * Если хоть одно значение false, значит не готов
            return false if value is false
        return true

    resetTimer: -> @_repeatTimer = 60

    # * Сбросить до нового ожидания
    reset: ->
        # * Добавляем себя как готового всегда (тут не важент именно ID)
        # * В принципе можно и не добавлять, так как важнее другие игроки
        @_playersReady = {
            myActorId: true
        }
        # * Добавляем всех игроков как изначально не готовых
        for id in @_anotherPlayersIds
            @_playersReady[id] = false
        
        @resetTimer()
        return