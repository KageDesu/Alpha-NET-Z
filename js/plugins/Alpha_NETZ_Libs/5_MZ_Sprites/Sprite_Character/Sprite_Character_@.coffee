#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Sprite_Character.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Sprite_Character::

    #@[ALIAS]
    ALIAS__updateOther = _.updateOther
    _.updateOther = ->
        ALIAS__updateOther.call(@)
        @_updateNetworkCharacter()
    
    #@[ALIAS]
    ALIAS__setCharacter = _.setCharacter
    _.setCharacter = (character) ->
        ALIAS__setCharacter.call(@, character)
        @_isNetworkCharacter = ANNetwork.isConnected() and character instanceof NETCharacter
        # * Смена методов
        if @_isNetworkCharacter is true
            @_updateNetworkCharacter = @_updateNetworkCharacterMain
        return

    return
# ■ END Sprite_Character.coffee
#---------------------------------------------------------------------------