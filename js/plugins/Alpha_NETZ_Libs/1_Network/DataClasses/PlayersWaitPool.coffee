#@[GLOBAL]
#?[STORABLE]

# * Класс для пула ожидания других игроков

class PlayersWaitPool
    constructor: () ->
        # * Запоминается при создании, чтобы можно было сбросить
        # * Это нужно, чтобы если игрок новый переместился на карту, его
        # * не добавили в ожидание, если на этой карте уже запущено общее событие
        @_anotherPlayers = ANGameManager.anotherPlayersOnMap()
        @reset()
        return

    # * Зарегестрировать (отправить на сервер)
    register: ->
        @resetTimer()
        ANInterpreterManager.sendSharedEventRequireRegister()
        return

    # * Ответ от сервера
    onAnswer: (actorId) -> @_playersReady[actorId] = true

    update: ->
        if @_repeatTimer >= 0
            @_repeatTimer--
        else
            @register() unless @isReady()
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
        for pl in @_anotherPlayers
            @_playersReady[pl.actorId] = false
        
        @resetTimer()
        return