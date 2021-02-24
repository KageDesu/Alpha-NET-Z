class Window_NetworkRoomCommands extends Window_HorzCommand
    constructor: (rect) ->
        super(rect)
        @setBackgroundType ANET.VD.getWindowBackgroundType()

    maxCols: -> 3

    makeCommandList: ->
        if ANNetwork.isMasterClient()
            @addCommand('Start', 'start', @_isStartEnabled()) #TODO: Третий аргумент : enabled
            #TODO: Надо проверять все ли готовы, только тогда кнопка активна
            #TODO: Ещё можно проверять больше 1 игрока или нет
        else
            @addCommand('Ready', 'ready', false)
            #TODO: Пока отключим, нет функционала
        if ANET.PP.isActorSelectionAllowed()
            @addCommand("Character", 'character', @_isCharSelectEnabled())
        leaveCommandName = if ANNetwork.isMasterClient() then "Close" else "Leave"
        @addCommand(leaveCommandName, 'leave')
        return

    

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_NetworkRoomCommands.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_NetworkRoomCommands::

    _._myActorId = -> ANGameManager.myPlayerData().actorId

    _._isAllPlayersSelectActors = -> ANGameManager.playersData.every (pl) -> pl.actorId != 0

    _._isStartEnabled = ->
        # * Надо выбрать персонажа, потом можно начинать игру
        if ANET.PP.isActorSelectionAllowed()
            return @_isAllPlayersSelectActors()
        else
            return true
    
    _._isCharSelectEnabled = -> @_myActorId() <= 0

    return
# ■ END Window_NetworkRoomCommands.coffee
#---------------------------------------------------------------------------
    