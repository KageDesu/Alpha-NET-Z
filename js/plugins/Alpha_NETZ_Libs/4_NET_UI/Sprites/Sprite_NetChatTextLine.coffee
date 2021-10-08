# * Сообщение в чате

do ->

    class Sprite_NetChatTextLine extends KDCore.Sprite
        constructor: () ->
            super()
            @params = @getSettings()
            @_needAnimation = false
            @_create()
            return

        #TODO: From plugin parameters!!!
        getSettings: -> @defaultSettings()

        defaultSettings: -> {
            size: { w: 306, h: 18 }
            backgroundA: {
                color: "#59a3d9".toCss()
                opacity: 40
            },
            backgroundB: {
                color: "#59a3d9".toCss()
                opacity: 70
            }
            textLine: {
                visible: true
                size: { w: 520, h: 20 }
                font: { face: null, size: 14, italic: false }
                margins: { x: 4, y: -3 }
            }
            # 1 - Channel
            # 2 - Actor Name
            # 4 - Player Name
            # 3 - Message
            textFormat: "\\}\\}\\C[3][%1] \\{\\{\\C[2]%2 \\C[0]%3"
            textFormatForPlayer: "\\}\\}\\C[3][%1]\\C[1][ME]\\{\\{ \\C[0]%3"
            textFormatForSystem: "\\}\\}\\C[3][%1]\\{\\{ \\C[6]%3"
            animationSpeedInPx: 18
        }

        # * Применить стиль задника А (по умолчанию)
        applyBackgroundStyleA: -> @_applyBackgroundStyle(@params.backgroundA)

        # * Применить стиль задника Б (чтобы легче было видно, каждый чётный)
        applyBackgroundStyleB: -> @_applyBackgroundStyle(@params.backgroundB)

        # * Написать сообщение
        drawChatMessage: (channelId, actorId, text) ->
            return unless @_textSpr?
            if @isMyActorMessage(actorId)
                textFormat = @params.textFormatForPlayer
            else
                if actorId <= 0
                    textFormat = @params.textFormatForSystem
                else
                    textFormat = @params.textFormat
            channelIdText = @_convertChannelIdToText(channelId) #1
            actorName = @_getActorName(actorId) #2
            playerName = @_getPlayerName(actorId) #4
            @_textSpr.drawTextWithFormat(textFormat, channelIdText, actorName, text, playerName)
            return

        # * Сообщение от меня (текущего клиента), имеет отдельный формат
        isMyActorMessage: (actorId) ->
            if ANNetwork.isConnected()
                return ANGameManager.myActorId() == actorId
            else
                return false

        # * Сдвинуть эту строчку выше
        moveUp: ->
            @y -= @params.size.h
            return

        # * Анимированное появление сообщения (справа "едет")
        animate: ->
            @_textSpr.x = -@params.textLine.size.w
            @_needAnimation = true
            return

        update: ->
            super()
            @_updateAnimation()
            return

    ANET.link Sprite_NetChatTextLine
    return


#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = ANET.Sprite_NetChatTextLine::

    _._applyBackgroundStyle = (params) ->
        return unless @_background?
        @_background.fillAll(params.color)
        @_background.opacity = params.opacity
        return

    _._create = ->
        @_createBackground()
        @_createTextLine()
        return

    _._createBackground = ->
        @_background = KDCore.Sprite.FromBitmap(@params.size.w, @params.size.h)
        @applyBackgroundStyleA()
        @add @_background

    _._createTextLine = ->
        @_textSpr = new AA.Sprite_UITextExt(@params.textLine)
        @add @_textSpr
    
    _._updateAnimation = ->
        return if @_needAnimation is false
        if @params.animationSpeedInPx == 0
            @_textSpr.x = 0 # * Сразу, без анимации
        else
            @_textSpr.x += @params.animationSpeedInPx
        @_textSpr.x = 0 if @_textSpr.x > 0 # * Граница
        @_needAnimation = @_textSpr.x != 0
        return

    _._convertChannelIdToText = (channelId) ->
        return "ALL" if channelId <= 0
        return "MAP"

    _._getActorName = (actorId) ->
        return "" if actorId <= 0
        return $dataActors[actorId]?.name

    _._getPlayerName = (actorId) ->
        return "" if actorId <= 0
        if ANNetwork.isConnected()
            return ANGameManager.getPlayerDataByActorId(actorId)?.name
        else
            return @_getActorName(actorId)

    return
# ■ END PRIVATE
#---------------------------------------------------------------------------
