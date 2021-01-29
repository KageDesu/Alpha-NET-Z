#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_TitleCommand.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_TitleCommand::


    #@[ALIAS]
    ALIAS__makeCommandList = _.makeCommandList
    _.makeCommandList = ->
        ALIAS__makeCommandList.call(@)
        @addCommand('Network', "network")
        optionsCommandIndex = @_list.indexOf(@_list.find((item) -> item.symbol == "options"))
        return if optionsCommandIndex < 0
        # * Чтобы не была последнией, меняю местами с командой options
        netCommandIndex = @_list.length - 1
        optionsCmd = @_list[optionsCommandIndex]
        netCmd = @_list[netCommandIndex]
        @_list[optionsCommandIndex] = netCmd
        @_list[netCommandIndex] = optionsCmd
        return
    
    return
# ■ END Window_TitleCommand.coffee
#---------------------------------------------------------------------------