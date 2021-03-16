#╒═════════════════════════════════════════════════════════════════════════╛
# ■ ANET Common Utils Methods.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

# * Набор вспомогательных функций для ANET

AA.Utils.ANET = {}

#?shortcut
ANET.Utils = AA.Utils.ANET

do ->

    #@[DEFINES]
    _ = AA.Utils.ANET

    # * Проверка, что комментарий является NET командой
    _.isNetCommentCommand = (commentLine) ->
        return false unless String.any(commentLine)
        # * Все команды начинаются с буквы заглавной N, затем пробел и команда
        return /N\s.+/.exec(commentLine)

    _.getNetCommentCommand = (commentLine) ->
        return "" unless @isNetCommentCommand(commentLine)
        # * Возвращает первое слово после N
        command = /N\s(\w+)/.exec(commentLine)[1]
        return "" unless String.any(command)
        return command

    #TODO: Можно все все данные для сети через метод аналогичный передавать для безопасности
    # * Сохраняет Battler в определённый формат для отправки по сети
    _.packBattlerForNetwork = (battler) ->
        if battler instanceof Game_Actor
            return {
                type: "actor"
                id: battler.actorId()
            }
        else
            return {
                type: "enemy"
                id: battler.index()
            }

    # * Возвращяет конкретный Battler из данных сети
    _.unpackBattlerFromNetwork = (data) ->
        if data.type == "actor"
            return $gameActors.actor(data.id)
        else
            return $gameTroop.members()[data.id]

    _.isMyActorInValidListToStart = (list, isInclude) ->
        try
            list = JsonEx.parse(list).map (i) -> parseInt(i)
            return list.contains(ANGameManager.myActorId()) == isInclude
        catch e
            ANET.w e
            return false
    
    _.isPassEventFilterOptions = (options) ->
        try
            switch options.whoSelector
                when "All"
                    return true
                when "Master"
                    return ANNetwork.isMasterClient()
                when "Master Except"
                    return !ANNetwork.isMasterClient()
                when "Actor List"
                    return ANET.Utils.isMyActorInValidListToStart(options.actorList, true)
                when "Actor List Except"
                    return ANET.Utils.isMyActorInValidListToStart(options.actorList, false)
                when "Me Except"
                    # * Если команда пришла с сервера, то явно эта проверка не касается этого клиента
                    # * В опциях запуска события - не используется
                    return true
                else
                    return false
        catch e
            ANET.w e
            return false

    # * Событие запущенно каким-либо игроком?
    _.isEventStartedByAny = (eventId) ->
        try
            return ANGameManager.anotherPlayersOnMap().some (p) ->
                NetPlayerDataWrapper.isOnEvent(p, eventId)
        catch e
            ANET.w e
            # * В случае ошибки безопаснее вернуть true
            return true

    return
# ■ END ANET Common Utils Methods.coffee
#---------------------------------------------------------------------------