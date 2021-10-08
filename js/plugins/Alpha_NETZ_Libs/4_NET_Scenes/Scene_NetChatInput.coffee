# * Сцена ввода сообщения для чата

class Scene_NetChatInput extends Scene_MenuBase
    constructor: () ->
        super()

    create: ->
        super()
        unless $gameTemp._nChatLastChannelId?
            $gameTemp._nChatLastChannelId = 0
        @_showNameInput()
        @_createGroupButtons()
        @_createOkButton()
        # * Делаем фокус ввода
        setTimeout (->
            HUIManager.focusInput()
        ), 100
        return

    stop: ->
        $gameTemp._nChatLastChannelId = @buttonsGroup.getSelectedIndex()
        @_hideNameInput()
        super()

    update: ->
        super()
        if Input.isCancel()
            @popScene()
        else if Input.isTriggered("ok")
            @onOkClick()
        return

    onOkClick: ->
        msg = HUIManager.getInputValue()
        @_sendMessageToServer(msg) if String.any(msg)
        @popScene()

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_NetChatInput.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_NetChatInput::

    _._sendMessageToServer = (msg) ->
        try
            channelId = @buttonsGroup.getSelectedIndex()
            console.log("Send message from chat: " + msg)
            if ANNetwork.isConnected()
                ANGameManager.sendMyChatMessage(channelId, msg)
        catch e
            AA.w(e)
        return

    _._showNameInput = ->
        HUIManager.showInput("Enter your message...")
        HUIManager.setInputValue("")
        return
    
    _._hideNameInput = ->
        HUIManager.removeInput()

    #TODO: Customizable
    _._createGroupButtons = ->
        @buttonsGroup = new AA.Sprite_ButtonsGroup(
            [
                {
                    image: "nzButton_ChatGroup_All", position: [0, 0]
                },
                {
                    image: "nzButton_ChatGroup_Map", position: [100, 0]
                }
            ], $gameTemp._nChatLastChannelId, null
        )
        @buttonsGroup.move(4, @buttonY())
        @addChild @buttonsGroup
        return

    _._createOkButton = ->
        @_okButton = new Sprite_Button("ok")
        @_okButton.x = Graphics.boxWidth / 2 - @_okButton.width / 2
        @_okButton.y = Graphics.boxHeight / 2 - @_okButton.height / 2
        @addWindow(@_okButton)
        return

    return
# ■ END Scene_NetChatInput.coffee
#---------------------------------------------------------------------------