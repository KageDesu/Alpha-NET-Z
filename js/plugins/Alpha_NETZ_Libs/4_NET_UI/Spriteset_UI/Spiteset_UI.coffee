# * Элементы интерфейса ANET Z на карте

# * Интерфейс AABS на карте

do ->

    class Spriteset_UI extends Sprite
        constructor: () ->
            super()
            @_init()
            return

        isActive: -> @visible is true

        show: -> @visible = true

        hide: -> @visible = false

        terminate: ->
            @visible = false
            return

        # * Обновить все контроллеры и элементы
        refresh: ->
            return

        onGameMessageStart: ->

        onGameMessageEnd: ->


    ANET.link Spriteset_UI
    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ PRIVATE
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = ANET.Spriteset_UI::

    _._init = ->
        # * Регестрирует себя в менеджере
        ANET.UI.setUI @
        # * Набор всех элементов
        @elements = []
        # * Набор всех контроллеров
        @controllers = []
        @_create()

    _._create = ->
        @_createNormalUILayer()
        @_createElements()

    _._createNormalUILayer = ->
        @layer = new Sprite()
        @addChild @layer

    _._createElements = ->
        @_createInGameChat() if ANET.PP.isGameChatAllowed()

    # * Создаём окно чата
    _._createInGameChat = ->
        #TODO: from parameters
        @chatWindow = new FWindow_InGameChat(@, 312, 192)
        @_addElementToUI @chatWindow
        return

    # * Добавить элемент на обычный слой
    _._addElementToUI = (sprite) -> @layer.addChild sprite
    
    return
# ■ END PRIVATE
#---------------------------------------------------------------------------
