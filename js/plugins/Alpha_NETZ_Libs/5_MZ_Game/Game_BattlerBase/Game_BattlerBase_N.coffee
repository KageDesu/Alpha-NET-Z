#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_BattlerBase.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_BattlerBase::

    # * Специальное представление данных для сети
    _.packForNetwork = -> ANET.Utils.packBattlerForNetwork(@)

    # * OBSERVER
    do ->

        _._createNetworkObserver = ->
            @netDataObserver = new DataObserver()
            @_applyDataObserverInitialParameters()
            @_fillNetworkObserver()
            @netDataObserver.refreshAll(@)

        _._applyDataObserverInitialParameters = ->
            # * Тут нужен Instante, чтобы данные на карте всегда были актуальны
            # * Если CheckMode, то при помощи событий можно менять параметры ХП
            # * всей группы и ХП других игроков будут отображаться не правильно
            @netDataObserver.setInstanteMode()
            @netDataObserver.setCheckInterval(ANET.PP.playerDataRefreshRate())
            return

        #TODO: Можно автоматически и удалять лишнее (см. Game_ActionResult)
        _._fillNetworkObserver = ->
            @netDataObserver.addFields(@, [
                "_hp"
                "_mp"
                "_tp"
                "_paramPlus"
                "_states"
                "_stateTurns"
                "_buffs"
                "_buffTurns"
            ])
            return

        #TODO: updateStateTurns и баффы не должны выполняться на фантоме (???)

        # * Этот метод должны вызывать потомки верхнего уровня, так как нету Update в этом классе
        _._updateDataObserver = ->
            return unless @netDataObserver?
            @netDataObserver.check(@)
            if @netDataObserver.isDataChanged()
                @dataObserverHaveChanges()
                @netDataObserver.refreshAll(@)
            return

        # * Этот метод вызывается, когда изменились сихнронизируеммые данные
        _.dataObserverHaveChanges = -> # * EMPTY (for childrens)

        _.getObserverDataForNetwork = -> @netDataObserver.getDataForNetwork(@)

        _.applyObserverData = (data) ->
            return unless @netDataObserver?
            @netDataObserver.setDataFromNetwork(@, data)
            return

        return
    
    return
# ■ END Game_BattlerBase.coffee
#---------------------------------------------------------------------------