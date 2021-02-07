# * Класс для персонажей на карте других игроков

class NETCharacter extends Game_Character
    constructor: (@id) ->
        super()
        # * Получил ли начальную позицию?
        #@_isHaveInitialPosition = false
        # * Пока не получит позицию, не видимый
        #@setTransparent(!@_isHaveInitialPosition)
        #TODO: refresh visibility if not on this map? or delete?
        #* Иконка сетеввого состояния игрока (меню, карта, торговля, чат и т.д.)
        @networkStateIcon = null
        @refresh()


    #TODO: Тут остановился, получение координат когда игрок загружается на карту

    # * Синхронизация движения

    playerData: -> ANGameManager.getPlayerDataById(@id)

    actor: -> $gameActors.actor(@playerData().actorId)

    refresh: ->
        charName = @actor().characterName()
        charIndex = @actor().characterIndex()
        @setImage charName, charIndex


    # * Сетевое состояние игрока
    # * =====================================================================

    requestNetworkStateIcon: (@networkStateIcon) ->

    isNetworkStateIconRequested: -> @networkStateIcon?

    clearNetworkStateIcon: -> @networkStateIcon = null
    
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