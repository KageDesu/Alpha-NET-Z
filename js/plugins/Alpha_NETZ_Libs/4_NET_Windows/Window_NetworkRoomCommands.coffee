class Window_NetworkRoomCommands extends Window_HorzCommand
    constructor: (rect) ->
        super(rect)
        @setBackgroundType 2

    maxCols: -> 2

    makeCommandList: ->
        if ANNetwork.isMasterClient()
            @addCommand('Start', 'start') #TODO: Третий аргумент : enabled
            #TODO: Надо проверять все ли готовы, только тогда кнопка активна
            #TODO: Ещё можно проверять больше 1 игрока или нет
        else
            @addCommand('Ready', 'ready', false)
            #TODO: Пока отключим, нет функционала
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


    
    return
# ■ END Window_NetworkRoomCommands.coffee
#---------------------------------------------------------------------------
    