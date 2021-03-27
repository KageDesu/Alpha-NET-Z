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
        return

    # * Зарегестрировать (отправить на сервер)
    register: ->
        @_repeatTimer = 60
        console.log "SEND"
        #TODO: SEND

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