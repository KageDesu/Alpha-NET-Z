class FWindow_InGameChat extends AA.FloatingWindow
    constructor: () ->
        super(...arguments)
        @params = @getSettings()
        @setDragEndHandler(@_savePlayerDragPosition.bind(@))
        return

    #TODO: From plugin parameters!!!
    getSettings: -> @defaultSettings()

    #TODO: param Open chat if close and new message is arrived

    defaultSettings: -> {
        position: { x: 1, y: "Graphics.height - 193" }
        notActiveOpacity: 140
        maxMessages: 9
        firstChatMessageMargin: { x: 3, y: 145 }
    }

    #? message: {
    #   channelId
    #   actorId
    #   text
    #}
    addMessageToChat: (message) -> @_addMessageToChat(message, true)

    open: () ->
        super()
        $gamePlayer._nChatIsClosed = false

    close: () ->
        super()
        $gamePlayer._nChatIsClosed = true

    update: ->
        super()
        @_changer?.update()
    
#╒═════════════════════════════════════════════════════════════════════════╛
# ■ FWindow_InGameChat.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = FWindow_InGameChat::

    #@[ALIAS]
    ALIAS___onMouseIn = _._onMouseIn
    _._onMouseIn = ->
        ALIAS___onMouseIn.call(@)
        return if @opacity == 255
        @_changer = new AA.Changer(@)
        @_changer.change('opacity').from(@opacity).to(255).step(10)
        @_changer.start()
        return
        
    #@[ALIAS]
    ALIAS___onMouseOut = _._onMouseOut
    _._onMouseOut = ->
        ALIAS___onMouseOut.call(@)
        return if @params.notActiveOpacity == 255
        @_changer = new AA.Changer(@)
        @_changer.change('opacity').from(@opacity).to(@params.notActiveOpacity).step(5).delay(10)
        @_changer.start()
        return

    #$[OVER]
    _._createCustomElements = ->
        @_lines = []
        @_loadChatHistory()
        return

    _._loadChatHistory = ->
        unless $gameTemp._nChatHistory?
            $gameTemp._nChatHistory = []
        for message in $gameTemp._nChatHistory
            @_addMessageToChat(message, false)
        return

    _._addMessageToChat = (message, isNew) ->
        return unless message?
        { channelId, actorId, text } = message
        line = new ANET.Sprite_NetChatTextLine()
        @addContent line
        line.drawChatMessage(channelId, actorId, text)
        # * Анимируем, если сцена карта и сообщение новое (а не из истории)
        line.animate() if isNew is true and KDCore.Utils.isSceneMap() and @isOpen()
        line.move @params.firstChatMessageMargin
        @_lines.unshift(line)
        # * Разный цвет для каждой последующей
        line.applyBackgroundStyleB() if @_lines.length % 2 == 0
        for i in [1...@_lines.length]
            @_lines[i].moveUp()
            if i == @params.maxMessages
                @_removeLine(@_lines[i])
                break
        
        if isNew is true
            # * Добавляем в историю только новые сообщения (а не из истории)
            $gameTemp._nChatHistory.push(message)
            # * Очищаем историю, чтобы память не занимала
            if $gameTemp._nChatHistory.length > @params.maxMessages
                $gameTemp._nChatHistory.shift()
        return

    _._removeLine = (line) ->
        line.visible = false
        line.parent?.removeChild(line)
        @_lines.delete(line)
        return

    #$[OVER]
    _._moveToStartPosition = -> @_moveToLastSavedPosition()

    #$[OVER]
    _._afterOpen = ->
        @_checkMousePositionAfterOpen()

    # * Доп. проверка нахождения курсора мышки при открытии окна
    _._checkMousePositionAfterOpen = ->
        @_mouseIn = !@isMouseIn()
        @_registerMouseInOut()
        return

    _._moveToLastSavedPosition = ->
        unless $gamePlayer._nLastChatWindowPosition?
            { x, y } = @getSettings().position
            try
                $gamePlayer._nLastChatWindowPosition = {
                    x: eval(x)
                    y: eval(y)
                }
            catch e
                AA.warning(e)
                $gamePlayer._nLastChatWindowPosition = { x: 0, y: 0 }
        @move $gamePlayer._nLastChatWindowPosition
        return
    
    _._savePlayerDragPosition = ->
        $gamePlayer._nLastChatWindowPosition = {
            x: @x, y: @y
        }
        return

    return
# ■ END FWindow_InGameChat.coffee
#---------------------------------------------------------------------------