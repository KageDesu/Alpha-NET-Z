#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Battler.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Battler::

    _.isMyNetworkBattler = ->
        if ANNetwork.isConnected()
            return @ == $gameParty.leader()
        else
            return true

    # * Специальный Data Observer для боя
    # -----------------------------------------------------------------------
    do ->

        # * Данные только для боя (эти данные передаёт только Battle Master)
        _._nCreateBattleObserver = ->
            #@netBattleDataObserver = new DataObserver()
            #@netBattleDataObserver.setInstanteMode()
            #"BATTLE OBSERVER CREATED".p()
            #@_fillBattleDataObserver()
            #@netBattleDataObserver.refreshAll(@)
            # * Ускоренный режим обновления (TODO: может и не надо!)
            #@netDataObserver.setCheckInterval(10)

            @netDataObserver.setCheckInterval(0)
            @_addBattleFieldsToNetowrkDataObserver()
            return

        # * Добавлять эти поля в начале битвы только!!!
        _._addBattleFieldsToNetowrkDataObserver = ->
            @netDataObserver.addFields(@, [
                    "_speed"
                    "_actionState"
                    "_damagePopup"
                    "_effectType"
                    "_motionType"
                    "_weaponImageId"
                    "_motionRefresh"
                    "_selected"
                    "_tpbState"
                    "_tpbChargeTime"
                    "_tpbCastTime"
                    "_tpbIdleTime"
                    "_tpbTurnCount"
                    "_tpbTurnEnd"
                ])
            return

        # * Этот метод вызывается во время битвы
        _._updateBattleDataObserver = ->
            @result().nUpdateObserver()
            if @result().isDataObserverHaveChanges == true
                ANSyncDataManager.sendActorBattlerResultObserver(@)
            #return unless @netBattleDataObserver?
            #@netBattleDataObserver.check(@)
            #if @netBattleDataObserver.isDataChanged()
            #    @nBattleDataObserverHaveChanges()
            #    @netBattleDataObserver.refreshAll(@)
            return

        _.nBattleDataObserverHaveChanges = ->

        _.getBattleObserverDataForNetwork = -> @netBattleDataObserver.getDataForNetwork(@)

        _.applyBattleObserverData = (data) ->
            #return unless @netBattleDataObserver?
            #@netBattleDataObserver.setDataFromNetwork(@, data)
            return

        # * После битвы нет необходимости хранить observer
        _._nDestroyBattleObserver = ->
            #TODO: удалить поля не нужные
            @netBattleDataObserver = null
            @netDataObserver.setCheckInterval(60) #TODO: вернуть стандартное значение
            return
    
    return
# ■ END Game_Battler.coffee
#---------------------------------------------------------------------------