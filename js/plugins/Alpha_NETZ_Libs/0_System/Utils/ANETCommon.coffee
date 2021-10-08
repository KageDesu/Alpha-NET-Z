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
        command = /N\s(!*\w+)/.exec(commentLine)[1]
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

    # * Собрать опции для команды события по параметрам из комменатрия (аналог опций из команды плагина)
    # * Список должен быть строкой! [1, 2, 3]
    _.buildEventCommandOptions = (selector, list, scope, mode) ->
        return {
            "actorList": list,
            "executeMode": mode,
            "scope": scope,
            "whoSelector": selector
        }

    # * Конвертировать из команды комменатрия в параметр команды плагина
    _.convertEventCommandScopeAndMode = (commentLine) ->
        # * SCOPE
        if commentLine.contains "world"
            scope = "All world"
        else
            scope = "Same map"
        # * MODE
        if commentLine.contains "virtual"
            mode = "Virtual"
        else if commentLine.contains "common"
            mode = "Common Event"
        else
            mode = "Auto"
        return { scope, mode }

    # * Изъять список персонажей из комментария
    # * Формат выходной [1, 2, 3....]
    _.extractActorsListFromComment = (commentLine) ->
        regex = /forActors\s+([\d,\s*]*)/gm
        resultList = regex.exec(commentLine)
        return "[]" unless resultList?
        return "[]" unless resultList[1]?
        list = "[" + resultList[1] + "]"
        return list

    _.parseEventStartOptionsFromCommentLine = (commentLine) ->
        try
            # * Стандартный набор
            nStartOptions = {
                lockMode: "false"
                sharedMode: "No"
                whoSelector: "All"
                actorList: "[]"
            }
            if commentLine.contains("lock")
                nStartOptions.lockMode = "true"
            if commentLine.contains("shared")
                nStartOptions.sharedMode = "Strict"
                # * Только если есть флаг sharedMode
                if commentLine.contains("optional")
                    nStartOptions.sharedMode = "Optional"
            if commentLine.contains("master")
                if commentLine.contains("!")
                    nStartOptions.whoSelector = "Master Except"
                else
                    nStartOptions.whoSelector = "Master"
            else if commentLine.contains("forActors")
                    if commentLine.contains("!")
                        nStartOptions.whoSelector = "Actor List Except"
                    else
                        nStartOptions.whoSelector = "Actor List"
                    nStartOptions.actorList = ANET.Utils.extractActorsListFromComment(commentLine)
            return nStartOptions
        catch e
            ANET.w e
            return null

    _.generateSaveUniqueId = ->
        versionId = ANET.VD.getGameVersion()
        savefileId = versionId + "" + Math.randomInt(versionId)
        # * Вероятность крайне крайне мала, но нельзя чтобы были повторы
        if DataManager.nIsHaveNetworkSaveWithId(savefileId)
            return @generateSaveUniqueId()
        else
            return savefileId

    # * Текущая комната - загрузка сохранённой игры?
    _.isLoadGameRoom = ->
        return false unless ANNetwork.isConnected()
        return false unless ANNetwork.room?
        return NetRoomDataWrapper.isLoadGameRoom(ANNetwork.room)

    # * Построить Chat Message
    _.buildChatMessage = (channelId, actorId, message) -> {
            channelId: channelId,
            actorId: actorId,
            text: message
            mapId: $gameMap.mapId()
        }


    return
# ■ END ANET Common Utils Methods.coffee
#---------------------------------------------------------------------------