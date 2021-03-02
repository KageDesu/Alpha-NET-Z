#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Event.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Event::

    _.isHaveNetworkStartOptions = -> @nStartOptions?

    # * Может ли данный игрок запустить это событие
    _.isPassStartOptions = ->
        return true unless @isHaveNetworkStartOptions()
        try
            switch @nStartOptions.whoSelector
                when "All"
                    return true
                when "Master"
                    return ANNetwork.isMasterClient()
                when "Master Except"
                    return !ANNetwork.isMasterClient()
                when "Actor List"
                    return @_isMyActorInValidListToStart(@nStartOptions.actorList, true)
                when "Actor List Except"
                    return @_isMyActorInValidListToStart(@nStartOptions.actorList, false)
                else
                    return false
        catch e
            ANET.w e
            return false

        #TODO: locked and shared event flags - в отдельном методе! после вызова isPassStartOptions

    _._isMyActorInValidListToStart = (list, isInclude) ->
        try
            list = JsonEx.parse(list).map (i) -> parseInt(i)
            return list.contains(ANGameManager.myActorId()) == isInclude
        catch e
            ANET.w e
            return false

    _.dataObserverHaveChanges = ->
        if ANGameManager.isMapMaster()
            ANSyncDataManager.sendEventObserver(@eventId())
        # * Если мы не отправляем данные Observer,
        # * то check не будет работать, пока не сбросить флаг
        return
    
    # * Есть ли опции (условия) запуска события для сети
    _.nCheckEventStartOptions = ->
        @nStartOptions = null # * сбрасываем
        try
            options = @list()?.find (line) ->
                line.code == 357 && line.parameters?[1] == "EventStartOptions"
            if options?
                @nStartOptions = options.parameters[3]
            console.info @nStartOptions if @nStartOptions?
        catch e
            ANET.w e
            @nStartOptions = null
        return

    return
# ■ END Game_Event.coffee
#---------------------------------------------------------------------------