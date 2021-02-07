#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_PlayerNetworkStatus.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    class Sprite_PlayerNetworkStatus extends Sprite_Balloon
        constructor: () ->
            super()
            @visible = false
            return

        setupNETCharacter: (@_character) ->
            @_checkStateThread = new KDCore.TimedUpdate(10, @_updateStateCheck.bind(@))

        loadBitmap: ->
            @bitmap = ImageManager.loadANET("PlayerStateIcons")
            @setFrame 0, 0, 0, 0

        setup: (iconId) ->
            if iconId < 0
                @reset()
            else
                @_balloonId = iconId
                @visible = true
                @_duration = 5 * @speed() + @waitTime()
            return

        reset: () ->
            @_duration = 0
            @_balloonId = -1
            @visible = false

        # * Не используется, так как прикрепляется к персонажу
        updatePosition: -> # * EMPTY

        update: ->
            super()
            @_checkStateThread.update()
            # * Начинается снова
            if @_balloonId >= 0 && @_duration <= 0
                @_firstStep = true
                @setup(@_balloonId)

        frameIndex: ->
            index = (this._duration - this.waitTime()) / this.speed()
            frameIndex = 4 - Math.max(Math.floor(index), 0)
            unless @_firstStep?
                return frameIndex
            else
                return if frameIndex == 0 then 1 else frameIndex


        # * PRIVATE =====================================================

        _updateStateCheck: ->
            return unless @_character?
            if @_character.isNetworkStateIconRequested()
                @setup(@_character.networkStateIcon)
                @_character.clearNetworkStateIcon()
            return

    ANET.link Sprite_PlayerNetworkStatus
    return
# ■ END Sprite_PlayerNetworkStatus.coffee
#---------------------------------------------------------------------------