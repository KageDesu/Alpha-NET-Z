#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_Battler.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #TODO: Эксперементы

    #@[DEFINES]
    _ = Sprite_Battler::

    _.nInitObserver = ->
        @netDataObserver = new DataObserver()
        @netDataObserver.setCheckMode()
        @netDataObserver.setCheckInterval(10)
        @netDataObserver.addFields(@, [
                #"_homeX"
                #"_homeY"
                "_movementDuration"
                #"_offsetX"
                #"_offsetY"
                #"_targetOffsetX"
                #"_targetOffsetY"
                #"x"
                #"y"
                "_baseX"
                "_baseY"
                "_floatHeight"
                "_targetFloatHeight"
                "_floatDuration"
                "_floatWholeDuration"
                "_floatEasing"
                "_jumpHeight"
                "_jumpMaxHeight"
                "_jumpDuration"
                "_jumpWholeDuration"
                #"_targetOpacity"
                #"_opacityDuration"
                #"_opacityWholeDuration"
                #"_opacityEasing"
                "_currentAngle"
                "_targetAngle"
                "_angleDuration"
                "_angleWholeDuration"
                "_angleEasing"
                "_angleRevertOnFinish"
                "_skewX"
                "_skewY"
                "_targetSkewX"
                "_targetSkewY"
                "_skewDuration"
                "_skewWholeDuration"
                "_skewEasing"
                "_growX"
                "_growY"
                "_targetGrowX"
                "_targetGrowY"
                "_growWholeDuration"
                "_growEasing"
                "_flipScaleX"
            ])
        return

    _.nUpdateObserver = ->
        return unless @_battler?
        return unless @netDataObserver?
        @netDataObserver.check(@)
        if @netDataObserver.isDataChanged()
            @dataObserverHaveChanges()
            @netDataObserver.refreshAll(@)
        return

    # * Этот метод вызывается, когда изменились сихнронизируеммые данные
    _.dataObserverHaveChanges = ->
        if ANGameManager.isBattleMaster()
            ANSyncDataManager.sendBattlerSpriteObserver(@_battler)
        return

    _.getObserverDataForNetwork = -> @netDataObserver.getDataForNetwork(@)

    _.applyObserverData = (data) ->
        return unless @netDataObserver?
        @netDataObserver.setDataFromNetwork(@, data)
        return
    
    return
# ■ END Sprite_Battler.coffee
#---------------------------------------------------------------------------