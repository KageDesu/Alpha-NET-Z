# * Класс для персонажей на карте других игроков

class NETCharacter extends Game_Character
    constructor: (@id) ->
        super()
        #* Иконка сетевого состояния игрока (меню, карта, торговля, чат и т.д.)
        @networkStateIcon = null
        # * Персонаж получил начальную позицию от сервера
        @nIsGetInitialLocation = false
        @refresh()

    # * Синхронизация движения

    playerData: -> ANGameManager.getPlayerDataById(@id)

    actor: -> $gameActors.actor(@playerData().actorId)

    refresh: ->
        return unless @actor()?
        if @nIsGetInitialLocation is false
            @setImage "", 0
        else
            charName = @actor().characterName()
            charIndex = @actor().characterIndex()
            @setImage charName, charIndex

    requestNetworkStateIcon: (@networkStateIcon) ->

    # * Этот метод был сделан для того, чтобы когда выходишь из меню
    # * Персонаж другого игрока не совершал "движения" в конечную точку
    # * А совершает он движение, так как карта сперва показывается, а только затем
    # * идёт запрос на сервер
    # * Данные о начальной позиции на экране (от сервера)
    nSetInitialLocation: (x, y) ->
        @nIsGetInitialLocation = true
        @setPosition(x, y)
        @refresh()
        return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ NETCharacter.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = NETCharacter::

    
    return
# ■ END NETCharacter.coffee
#---------------------------------------------------------------------------