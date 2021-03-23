#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_Battler.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Sprite_Battler::

    #@[ALIAS]
    ALIAS__initMembers = _.initMembers
    _.initMembers = ->
        ALIAS__initMembers.call(@)
        #@_onlyServerPosition = false
        #TODO: Только при VisuStella
        ###if ANNetwork.isConnected()
            @nInitObserver()
            setTimeout (=>
                unless ANGameManager.isBattleMaster()
                    @_onlyServerPosition = true
                ), 1000###
    
    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        #if ANNetwork.isConnected()
        #    @nUpdateObserver()

    #@[ALIAS]
    #ALIAS__setHome = _.setHome
    #_.setHome = (x, y) ->
    #    ALIAS__setHome.call(@, x, y)
     ##   if ANNetwork.isConnected() && !ANGameManager.isBattleMaster()
     #       ALIAS__updatePosition.call(@)

    #@[ALIAS]
    ###ALIAS__updateMove = _.updateMove
    _.updateMove = ->
        if ANNetwork.isConnected() && !ANGameManager.isBattleMaster()
            return
        ALIAS__updateMove.call(@)###
        
    #@[ALIAS]
    #ALIAS__updatePosition = _.updatePosition
    #_.updatePosition = ->
    #    if @_onlyServerPosition is true
    #        return
    #    ALIAS__updatePosition.call(@)
        

    return
# ■ END Sprite_Battler.coffee
#---------------------------------------------------------------------------