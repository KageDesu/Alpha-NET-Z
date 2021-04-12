#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_TitleCommand.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_TitleCommand::

    # * Чтобы не была последнией, меняю местами с командой options
    _._nRearangeNetworkCommand = ->
        try
            optionsCommandIndex = @_list.indexOf(@_list.find((item) -> item.symbol == "options"))
            return if optionsCommandIndex < 0
            netCommandIndex = @_list.length - 1
            optionsCmd = @_list[optionsCommandIndex]
            netCmd = @_list[netCommandIndex]
            @_list[optionsCommandIndex] = netCmd
            @_list[netCommandIndex] = optionsCmd
        catch e
            ANET.w e

    _._nRemoveNewGameCommand = ->
        try
            newGameIndex = @_list.indexOf(@_list.find((item) -> item.symbol == "newGame"))
            @_list.splice(newGameIndex, 1)
        catch e
            ANET.w e
    
    return
# ■ END Window_TitleCommand.coffee
#---------------------------------------------------------------------------