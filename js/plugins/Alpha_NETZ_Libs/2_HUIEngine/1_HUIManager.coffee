# * Данный класс отвечает за HTML элементы пользовательского интерфейса на сценах

#https://github.com/caroso1222/notyf

#TODO: load material icons? make more notifies (info, warning?)

#<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

#$[ENCODE]

window.HUIManager = ->

do ->

    #@[DEFINES]
    _ = window.HUIManager

    #TODO: Есть проблемы с позиционированнием, надо динамически менять свойства элемента

    _.init = ->
        @_isMouseHoverHtmlElement = false
        @_loadCSS()
        @_createRelativeParent()
        @_createLoadSpinner()
        @_createNotify()
        # * Отключаем контекстное меню у новых элементов
        Graphics._disableContextMenu()
        return

    _.isUnderMouse = -> @_isMouseHoverHtmlElement is true

    # * Когда происходит смена сцены в игре
    # * (надо убирать лишние элементы, которые не могут переходить на другую сцену)
    _.onGameSceneChanged = ->
        @hideWaitingInfo()

    _.showLoader = (delay = 200) ->
        try
            return if @isLoaderActive()
            @_loaderThread = setTimeout (->
                    unless document.getElementById("anetLoader")
                        document.body.appendChild(HUIManager._loader)
                ), delay
        catch e
            console.warn(e)
        return
    
    _.hideLoader = ->
        try
            return unless @isLoaderActive()
            clearTimeout(@_loaderThread)
            @_loaderThread = null
            if document.getElementById("anetLoader")
                document.body.removeChild(@_loader)
        catch e
            console.log(e)
        return

    _.isLoaderActive = -> @_loaderThread?

    _.showWaitingInfo = (text, text2, delay = 200) ->
        try
            return if @isWaitingInfoActive()
            @_waitingInfoThread = setTimeout (->
                HUIManager._createWaitPlayersAlert(text, text2)
                ), delay
        catch e
            console.warn(e)
        return

    _.hideWaitingInfo = ->
        try
            return unless @isWaitingInfoActive()
            clearTimeout(@_waitingInfoThread)
            @_waitingInfoThread = null
            if @_waitPlayers?
                document.getElementById("anetCanvasElements").removeChild(@_waitPlayers)
                @_waitPlayers = null
        catch e
            console.warn(e)
        return

    _.isWaitingInfoActive = -> @_waitingInfoThread?

    _.notifyError = (msg) ->
        try
            @_notify.error(msg)
        catch e
            console.warn(e)

    _.notifySucess = (msg) ->
        try
            @_notify.success(msg)
        catch e
            console.warn(e)

    _.isInputActive = -> @_input?

    _.showInput = (placeholder) ->
        @removeInput() if @_input?
        @_createInputField(placeholder)
        return

    _.removeInput = () ->
        return unless @_input?
        # * Не всегда автоматически выключается, поэтому надо выключить флаг вручную
        HUIManager._isMouseHoverHtmlElement = false
        document.getElementById("anetCanvasElements").removeChild(@_input)
        @_input = null
        return

    _.focusInput = () ->
        return unless @_input?
        document.getElementById("anetInputName")?.focus()
        return

    _.getInputValue = () ->
        return "" unless @_input?
        return document.getElementById("anetInputName")?.value

    _.setInputValue = (value) ->
        return unless @_input?
        document.getElementById("anetInputName")?.value = value
        return

    _.updateCanvasHtmlElements = ->
        return unless @_canvasRelativeElements?
        @_canvasRelativeElements.style.zIndex = 2
        @_canvasRelativeElements.width = Graphics.width
        @_canvasRelativeElements.height = Graphics.height
        Graphics._centerElement(@_canvasRelativeElements)
        return

    # * PRIVATE  ======================================================

    _._loadCSS = ->
        # * Подгружаем CSS стиль
        document.getElementsByTagName("head")[0].insertAdjacentHTML(
            "beforeend",
            "<link rel=\"stylesheet\" href=\"css/anet.css\" />"
        )
        return

    _._createLoadSpinner = ->
        @_loader = document.createElement("div")
        @_loader.id = "anetLoader"
        @_loaderThread = null
        return

    _._createNotify = ->
        @_notify = new Notyf(
            {
                duration: 1400,
                position: {
                        x: 'center',
                        y: 'bottom'
                    },
                ripple: false
            }
        )
        return

    # * Информация при ожидании других игроков (или другая информация, ожидание сервера)
    _._createWaitPlayersAlert = (text, extraText) ->
        @_waitPlayers = document.createElement("blockquote")
        @_waitPlayers.id = "anetWaitPlayersAlert"
        @_waitPlayers.classList.add("speech-bubble")
        htmlCode =
            "<p>" + text + "</p>" + "<cite>" + extraText + "</cite>"
        @_waitPlayers.insertAdjacentHTML('beforeend', htmlCode)
        @_canvasRelativeElements.appendChild(@_waitPlayers)
        return

    # * Элемент родитель, который будет изменяться вместе с размерами Canvas
    # * Это позволит сохранять фиксированные позиции HTML элементов не зависимо от размера окна игры
    _._createRelativeParent = ->
        @_canvasRelativeElements = document.createElement("div")
        @_canvasRelativeElements.id = "anetCanvasElements"
        @updateCanvasHtmlElements()
        document.body.appendChild(@_canvasRelativeElements)
        return

    _._createInputField = (placeholder) ->
        @_input = document.createElement("div")
        @_input.id = "anetInput"
        @_input.addEventListener("mouseenter", () -> HUIManager._isMouseHoverHtmlElement = true)
        @_input.addEventListener("mouseleave", () -> HUIManager._isMouseHoverHtmlElement = false)
        @_input.classList.add("form__group")
        @_input.classList.add("field")
        htmlCode =
            "<input type=\"input\" class=\"form__field\" placeholder=\"" + placeholder + "\" autocomplete=\"off\" name=\"anetInputName\" id='anetInputName' required />
            <label for=\"anetInputName\" class=\"form__label\">" + placeholder + "</label>"
        @_input.insertAdjacentHTML('beforeend', htmlCode)
        @_canvasRelativeElements.appendChild(@_input)
        return

    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::
    
    #TODO: Временно отключил, так как пока нет HUI элементов на карте
    ###if KDCore.isMV()
        #@[ALIAS]
        ALIAS__processMapTouch = _.processMapTouch
        _.processMapTouch = ->
            return if HUIManager.isUnderMouse()
            ALIAS__processMapTouch.call(@)
            return
    else
        #@[ALIAS]
        ALIAS__onMapTouch = _.onMapTouch
        _.onMapTouch = ->
            return if HUIManager.isUnderMouse()
            ALIAS__onMapTouch.call(@)
            return###
    
    return
# ■ END Scene_Map.coffee
#---------------------------------------------------------------------------

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Input.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Input

    #@[ALIAS]
    ALIAS___shouldPreventDefault = _._shouldPreventDefault
    _._shouldPreventDefault = ->
        # * Чтобы backspace и стрелки работали в поле ввода текста
        if HUIManager.isInputActive()
            return false
        else
            return ALIAS___shouldPreventDefault.call(@)
    
    #@[ALIAS]
    ALIAS___onKeyDown = _._onKeyDown
    _._onKeyDown = (event) ->
        # * Чтобы игнорировать стандартные кнопки Z, X, space во время ввода
        if HUIManager.isInputActive()
            if event.keyCode == 90 || event.keyCode == 88 || event.keyCode == 32
                @clear()
                return
        ALIAS___onKeyDown.call(@, event)
        

    return
# ■ END Input.coffee
#---------------------------------------------------------------------------

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Graphics.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Graphics

    #@[ALIAS]
    ALIAS___updateCanvas = _._updateCanvas
    _._updateCanvas = ->
        ALIAS___updateCanvas.call(@)
        HUIManager.updateCanvasHtmlElements()
    
    return
# ■ END Graphics.coffee
#---------------------------------------------------------------------------