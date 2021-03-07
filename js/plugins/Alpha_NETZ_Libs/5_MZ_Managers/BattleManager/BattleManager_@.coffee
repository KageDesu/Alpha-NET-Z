#╒═════════════════════════════════════════════════════════════════════════╛
# ■ BattleManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = BattleManager

    # * На данный момент в сетевом режиме всегда Time Progress Battle
    #@[ALIAS]
    ALIAS__isTpb = _.isTpb
    _.isTpb = ->
        if ANNetwork.isConnected()
            return true
        else
            return ALIAS__isTpb.call(@)
        
    # * На данный момент в сетевом режиме всегда Active Time Battle
    # * (Эти два метода связаны)
    #@[ALIAS]
    ALIAS__isActiveTpb = _.isActiveTpb
    _.isActiveTpb = ->
        if ANNetwork.isConnected()
            return true
        else
            return ALIAS__isActiveTpb.call(@)
        
    #@[ALIAS]
    ALIAS__selectNextActor = _.selectNextActor
    _.selectNextActor = ->
        if ANNetwork.isConnected() && !ANGameManager.isBattleMaster()
            @nSelectNextActorOnClient()
        else
            ALIAS__selectNextActor.call(@)
        return

    #@[ALIAS]
    # * В сетевом режиме Update вызывается только на мастере боя!
    ALIAS__update = _.update
    _.update = (activeTime) ->
        ALIAS__update.call(@, activeTime)
        return unless ANNetwork.isConnected()
        @nUpdateNetwork()
        return

    #TODO: test
    #@[ALIAS]
    ALIAS__displayStartMessages = _.displayStartMessages
    _.displayStartMessages = -> # * EMPTY
        #ALIAS__displayStartMessages.call(@)
        

    return
# ■ END BattleManager.coffee
#---------------------------------------------------------------------------