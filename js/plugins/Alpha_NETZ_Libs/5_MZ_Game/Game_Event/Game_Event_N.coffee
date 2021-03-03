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
        return ANET.Utils.isPassEventFilterOptions(@nStartOptions)

        #TODO: locked and shared event flags - в отдельном методе! после вызова isPassStartOptions

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
            @nStartOptions = options.parameters[3] if options?
        catch e
            ANET.w e
            @nStartOptions = null
        return

    return
# ■ END Game_Event.coffee
#---------------------------------------------------------------------------