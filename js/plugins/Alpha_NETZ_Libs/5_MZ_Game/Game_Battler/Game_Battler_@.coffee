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

        # * Суть в том, что request приходит от сервера, а вот clear должен
        # * выполняться только локально, когда эффект был отработан (показан)

        #@[ALIAS]
        ###ALIAS__clearDamagePopup = _.clearDamagePopup
        _.clearDamagePopup = ->
            if ANNetwork.isConnected()
                return unless @isMyNetworkBattler()
            ALIAS__clearDamagePopup.call(@)###

        #@[ALIAS]
        ###ALIAS__clearWeaponAnimation = _.clearWeaponAnimation
        _.clearWeaponAnimation = ->
            if ANNetwork.isConnected()
                return unless @isMyNetworkBattler()
            ALIAS__clearWeaponAnimation.call(@)###
            
        #@[ALIAS]
        ###ALIAS__clearEffect = _.clearEffect
        _.clearEffect = ->
            if ANNetwork.isConnected()
                return unless @isMyNetworkBattler()
            ALIAS__clearEffect.call(@)###
    
        #@[ALIAS]
        ###ALIAS__clearMotion = _.clearMotion
        _.clearMotion = ->
            if ANNetwork.isConnected()
                return unless @isMyNetworkBattler()
            ALIAS__clearMotion.call(@)###
        
        
        

    return
# ■ END Game_Battler.coffee
#---------------------------------------------------------------------------