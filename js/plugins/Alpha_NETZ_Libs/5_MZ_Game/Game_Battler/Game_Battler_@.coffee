#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Game_Battler.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Game_Battler::

    #@[ALIAS]
    ALIAS__onBattleStart = _.onBattleStart
    _.onBattleStart = () ->
        if ANNetwork.isConnected()
            @_nCreateBattleObserver()
        ALIAS__onBattleStart.call(@, ...arguments)
    
    #@[ALIAS]
    ALIAS__onBattleEnd = _.onBattleEnd
    _.onBattleEnd = ->
        ALIAS__onBattleEnd.call(@)
        if ANNetwork.isConnected()
            @_nDestroyBattleObserver()
        return

    # * Визуальные методы в бою
    # -----------------------------------------------------------------------
    do ->

        #@[ALIAS]
        ALIAS__startDamagePopup = _.startDamagePopup
        _.startDamagePopup = ->
            if ANNetwork.isConnected()
                if ANGameManager.isBattleMaster()
                    ANBattleManager.callBattleMethod(@, "startDamagePopup")
            ALIAS__startDamagePopup.call(@, ...arguments)
            
        #TODO: передавать аргументы можно через ...arguments
        #@[ALIAS]
        ALIAS__requestEffect = _.requestEffect
        _.requestEffect = (effectType) ->
            if ANNetwork.isConnected()
                if ANGameManager.isBattleMaster()
                    ANBattleManager.callBattleMethod(@, "requestEffect", effectType)
            ALIAS__requestEffect.call(@, ...arguments)
            
        #@[ALIAS]
        ALIAS__requestMotion = _.requestMotion
        _.requestMotion = (motionType) ->
            if ANNetwork.isConnected()
                if ANGameManager.isBattleMaster()
                    ANBattleManager.callBattleMethod(@, "requestMotion", motionType)
            ALIAS__requestMotion.call(@, ...arguments)

        #@[ALIAS]
        ALIAS__startWeaponAnimation = _.startWeaponAnimation
        _.startWeaponAnimation = (weaponImageId) ->
            if ANNetwork.isConnected()
                if ANGameManager.isBattleMaster()
                    ANBattleManager.callBattleMethod(@, "startWeaponAnimation", weaponImageId)
            ALIAS__startWeaponAnimation.call(@, ...arguments)
            
            

    return
# ■ END Game_Battler.coffee
#---------------------------------------------------------------------------