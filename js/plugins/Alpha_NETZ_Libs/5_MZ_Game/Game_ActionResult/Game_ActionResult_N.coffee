#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_ActionResult.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_ActionResult::

    _.nCreateObserver = ->
        @netDataObserver = new DataObserver()
        #@netDataObserver.setCheckInterval(1)
        #@netDataObserver.setInstanteMode()
        @nFillObserver()
        # * Создаём после nFillObserver, чтобы не было в списке полей Observer
        @isDataObserverHaveChanges = false
        @netDataObserver.refreshAll(@)
        return

    # * Тут применён автоматический сбор всех полей
    _.nFillObserver = ->
        fields = []
        entries = Object.entries(@)
        for value in entries
            # * Так как сбор полей идёт после создания netDataObserver, то его надо исключить
            continue if value[0] == 'netDataObserver'
            fields.push value[0]
        @netDataObserver.addFields(@, fields)
        return

    _.nUpdateObserver = ->
        return unless @netDataObserver?
        @netDataObserver.check(@)
        if @netDataObserver.isDataChanged()
            @nDataObserverHaveChanges()
            @netDataObserver.refreshAll(@)
        return

    # * Тут мы напрямую не отправляем данные, так как мы не знаем кому (Battler) мы принадлежим
    # * Ставится флаг в TRUE, и Battler сам отправить данные
    _.nDataObserverHaveChanges = ->
        @isDataObserverHaveChanges = true

    _.getObserverDataForNetwork = ->
        @isDataObserverHaveChanges = false
        return @netDataObserver.getDataForNetwork(@)

    _.applyObserverData = (data) ->
        return unless @netDataObserver?
        @netDataObserver.setDataFromNetwork(@, data)
        return
    
    return
# ■ END Game_ActionResult.coffee
#---------------------------------------------------------------------------