#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_NetworkGameMenu.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

class Window_NetworkGameMenu extends Window_Command
    constructor: (rect) ->
        super(rect)

    makeCommandList: ->
        @addCommand("Create Room", "createRoom")
        @addCommand("Join Room", "joinRoom")
        return

do ->

    #@[DEFINES]
    _ = Window_NetworkGameMenu::



    
    return
# ■ END Window_NetworkGameMenu.coffee
#---------------------------------------------------------------------------