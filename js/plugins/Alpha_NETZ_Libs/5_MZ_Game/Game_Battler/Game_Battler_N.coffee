#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Battler.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Battler::

    _.nInitializeNetwork = ->
        @_nRegisterSyncBattleMethod("requestEffect")
        @_nRegisterSyncBattleMethod("requestMotion")
        @_nRegisterSyncBattleMethod("startWeaponAnimation")
        @_nRegisterSyncBattleMethod("setActionState")

        # * Sound effects
        @_nRegisterSyncBattleMethod("performDamage")
        @_nRegisterSyncBattleMethod("performCollapse")
        @_nRegisterSyncBattleMethod("performMiss")
        @_nRegisterSyncBattleMethod("performRecovery")
        @_nRegisterSyncBattleMethod("performEvasion")
        @_nRegisterSyncBattleMethod("performMagicEvasion")
        @_nRegisterSyncBattleMethod("performCounter")
        @_nRegisterSyncBattleMethod("performReflection")
        return

    # * Данный баттлер является моим (этого сетевого игрока)
    _.isMyNetworkBattler = ->
        if ANNetwork.isConnected()
            return @ == $gameParty.leader()
        else
            return true

    # * Подписать метод на синхронизацию через сервер
    _._nRegisterSyncBattleMethod = (methodName) ->
        alias = @[methodName]
        @[methodName] = () ->
            if ANNetwork.isConnected() && ANGameManager.isBattleMaster()
                # * В данной реализации передаётся только один аргумент, так как ... перед arguments
                ANBattleManager.callBattleMethod(@, methodName, ...arguments)
            alias.call(@, ...arguments)
        return

    _.isNeedNetPushBattleData = -> @_netBattleObserverNeedToPush is true

    _.onNetBattleDataPushed = -> @_netBattleObserverNeedToPush = null

    _.requestNetBattleDataPush = -> @_netBattleObserverNeedToPush = true

    # * Специальный Data Observer для боя
    # -----------------------------------------------------------------------
    do ->

        # * Данные только для боя (эти данные передаёт только Battle Master)
        _._nStartBattleObserver = ->
            # * Включаем Instance режим
            #@netDataObserver.setInstanteMode()
            @netDataObserver.setCheckInterval(ANET.PP.battleDataRefreshRate())
            @_addBattleFieldsToNetowrkDataObserver()
            return

        # * Добавляем дополнительные поля в Observer
        _._addBattleFieldsToNetowrkDataObserver = ->
            @netDataObserver.addFields(@, ANET.System.BattlerObserverFields)
            return

        #TODO: Теперь ActionResult передаётся непосредственно перед методом startDamagePopup
        # * Этот метод вызывается во время битвы
        _._updateBattleDataObserver = ->
            # * У ActionResult свой обсервер, надо его синхронизировать тут
            #@result().nUpdateObserver()
            #if @result().isDataObserverHaveChanges == true
            #    ANSyncDataManager.sendBattlerResultObserver(@)
            return

        # * После битвы нет необходимости хранить observer
        _._nEndBattleObserver = ->
            # * Возвращаем режим проверки
            @_applyDataObserverInitialParameters()
            # * Убираем добавленные для боя поля
            @netDataObserver.removeFields(@, ANET.System.BattlerObserverFields)
            return
    
    return
# ■ END Game_Battler.coffee
#---------------------------------------------------------------------------