#@[GLOBAL]
#?[STORABLE]

# * Класс для пула ожидания других игроков

class PlayersWaitPool
    constructor: () ->
        # * Добавляем себя как готового
        @_playersReady = {
            myActorId: true
        }
        # * Добавляем всех игроков как изначально не готовых
        for pl in ANGameManager.anotherPlayersOnMap()
            @_playersReady[pl.actorId] = false
        
        @resetTimer()
        return

    # * Зарегестрировать (отправить на сервер)
    register: ->
        @resetTimer()
        console.log "SEND"
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