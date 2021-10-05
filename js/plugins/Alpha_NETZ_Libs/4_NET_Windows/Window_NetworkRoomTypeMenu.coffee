#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_NetworkRoomTypeMenu.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------

class Window_NetworkRoomTypeMenu extends Window_Command
    constructor: (rect) ->
        super(rect)
        @setBackgroundType ANET.VD.getWindowBackgroundType()

    makeCommandList: ->
        @addCommand("New Game", "newGame")
        @addCommand("Load Game", "continue", @isHaveSavedGames())
        return

    isHaveSavedGames: -> true #TODO: првоерка наличия сетевых сохранений

do ->

    #@[DEFINES]
    _ = Window_NetworkRoomTypeMenu::



    
    return
# ■ END Window_NetworkRoomTypeMenu.coffee
#---------------------------------------------------------------------------