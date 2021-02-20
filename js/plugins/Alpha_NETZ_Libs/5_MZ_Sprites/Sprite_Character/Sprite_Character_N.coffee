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
            @_createNetworkStateIcon() if @parent?
        else
            @netStateIcon.y = -@height

    _._createNetworkStateIcon = ->
        @netStateIcon = new ANET.Sprite_PlayerNetworkStatus()
        @netStateIcon.setupNETCharacter(@_character)
        @addChild @netStateIcon
        return
    
    return
# ■ END Sprite_Character.coffee
#---------------------------------------------------------------------------