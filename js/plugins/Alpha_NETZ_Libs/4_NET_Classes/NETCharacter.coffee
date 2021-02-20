# * Класс для персонажей на карте других игроков

class NETCharacter extends Game_Character
    constructor: (@id) ->
        super()
        #* Иконка сетеввого состояния игрока (меню, карта, торговля, чат и т.д.)
        @networkStateIcon = null
        @refresh()

    # * Синхронизация движения

    playerData: -> ANGameManager.getPlayerDataById(@id)

    actor: -> $gameActors.actor(@playerData().actorId)

    refresh: ->
        return unless @actor()?
        charName = @actor().characterName()
        charIndex = @actor().characterIndex()
        @setImage charName, charIndex


    # * Сетевое состояние игрока
    # * =====================================================================

    requestNetworkStateIcon: (@networkStateIcon) ->
    
    # * =====================================================================


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