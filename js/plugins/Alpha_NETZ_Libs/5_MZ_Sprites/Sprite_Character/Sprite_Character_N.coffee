#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Sprite_Character::

    #?DYNAMIC
    _._updateNetworkCharacter = -> # * DUMMY

    _._updateNetworkCharacterMain = ->
        @_updateNetworkStateIcon()

    _._updateNetworkStateIcon = ->
        unless @netStateIcon?
            @_createNetworkStateIcon()
        else
            @netStateIcon.x = @x
            @netStateIcon.y = @y - @height
        return

    _._createNetworkStateIcon = ->
        @netStateIcon = new ANET.Sprite_PlayerNetworkStatus(@)
        @netStateIcon.setupNETCharacter(@_character)
        try
            # * Не лучший способ
            SceneManager._scene._spriteset.addNetworkStatusIconForCharacter(@netStateIcon)
        catch e
            ANET.w e
        return


    return
# ■ END Sprite_Character.coffee
#---------------------------------------------------------------------------