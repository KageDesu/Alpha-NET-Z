#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_NetworkGameMenu.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

#TODO: Version for MV (rect!)

class Window_NetworkGameMenu extends Window_Command
    constructor: (rect) ->
        super(rect)
        @setBackgroundType ANET.VD.getWindowBackgroundType()

    makeCommandList: ->
        @addCommand("Create Room", "createRoom")
        @addCommand("Join Room", "joinRoom")
        @addCommand("Join Random Room", "joinRandRoom")
        @addCommand("Settings", "settings")
        return

do ->

    #@[DEFINES]
    _ = Window_NetworkGameMenu::



    
    return
# ■ END Window_NetworkGameMenu.coffee
#---------------------------------------------------------------------------