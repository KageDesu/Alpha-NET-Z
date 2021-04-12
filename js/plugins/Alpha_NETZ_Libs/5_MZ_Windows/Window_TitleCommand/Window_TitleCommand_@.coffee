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
        @_nRearangeNetworkCommand()
        @_nRemoveNewGameCommand() unless ANET.PP.isSinglePlayerAllowed()
        return
        
    return
# ■ END Window_TitleCommand.coffee
#---------------------------------------------------------------------------