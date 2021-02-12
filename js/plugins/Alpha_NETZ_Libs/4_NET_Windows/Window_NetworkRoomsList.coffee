#TODO: Version for MV (rect!)
class Window_NetworkRoomsList extends Window_Selectable
    constructor: (rect) ->
        super(rect)
        @setBackgroundType 2
        @_createNoRoomsMessage()
        @refreshRooms([])
        return

    maxItems: ->
        return if @isHaveAnyRoom() then @roomsList.length else 0

    drawItem: (index) ->
        roomData = @roomData(index)
        return unless roomData?
        rect = @itemLineRect(index)
        @changePaintOpacity(@isEnabled(index))
        @_drawRoomInfo(rect, roomData)
        @changePaintOpacity(1)
        return

    isEnabled: (index) -> NetRoomDataWrapper.isRoomProperToJoin(@roomData(index))

    isCurrentRoomEnabled: () -> @isEnabled(@index())

    getSelectedRoom: -> @roomData(@index())

    refreshRooms: (@roomsList) ->
        #TODO: @_noRoomsTextSpr мелькает
        @_noRoomsTextSpr.visible = !@isHaveAnyRoom()
        @select(-1) if @_noRoomsTextSpr.visible is true
        @refresh()
        return

    isHaveAnyRoom: ->
        if @roomsList?
            return @roomsList.length > 0
        else
            return false

    roomData: (index) -> @roomsList[index]

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_NetworkRoomsList.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_NetworkRoomsList::

    _._createNoRoomsMessage = ->
        params = AA.Sprite_UIText::defaultParams()
        params.size.w = @width
        params.size.h = @height
        params.font.size = 32
        params.outline.width = 3
        @_noRoomsTextSpr = new AA.Sprite_UIText(params)
        @_noRoomsTextSpr.visible = false
        @_noRoomsTextSpr.drawText("There are no rooms on server")
        @addChild @_noRoomsTextSpr

    _._drawRoomInfo = (rect, roomData) ->
        @_ddX = 0
        rpgVersion = if roomData.rpgVersion is 0 then 'MZ' else 'MV'
        gameMode = if roomData.gameMode is 0 then  'Coop' else 'Mult'
        state = if roomData.inGame is true then 'In Game'  else 'In Lobby'
        # * [VER]{GAME MODE}(GAME NAME) RoomName 0\X (inGame|inLobby)
        roomText = "\\}\\C[1][%1]\\C[6]{%2}\\C[3](%3)\\{\\C[0]   %4   \\C[4]%5/%6 \\}\\C[5](%7)".format(
            rpgVersion,
            gameMode,
            roomData.gameTitle,
            roomData.name,
            roomData.playersIds.length,
            roomData.maxPlayers,
            state
        )
        @drawTextEx(roomText, rect.x, rect.y, rect.width, 'left')
        return

    return
# ■ END Window_NetworkRoomsList.coffee
#---------------------------------------------------------------------------
