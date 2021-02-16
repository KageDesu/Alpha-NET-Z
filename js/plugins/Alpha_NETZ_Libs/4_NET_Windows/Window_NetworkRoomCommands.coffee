class Window_NetworkRoomCommands extends Window_HorzCommand
    constructor: (rect) ->
        super(rect)
        @setBackgroundType 2

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
            @addCommand("Character", 'character')
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

    _._isStartEnabled = ->
        # * Надо выбрать персонажа, потом можно начинать игру
        if ANET.PP.isActorSelectionAllowed()
            return ANGameManager.myPlayerData().actorId > 0
        else
            return true
    
    return
# ■ END Window_NetworkRoomCommands.coffee
#---------------------------------------------------------------------------
    