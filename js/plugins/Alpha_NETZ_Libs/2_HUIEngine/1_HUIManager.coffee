# * Данный класс отвечает за HTML элементы пользовательского интерфейса на сценах

#https://github.com/caroso1222/notyf

#TODO: load material icons? make more notifies (info, warning?)

#<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

HUIManager = ->


do ->

    #@[DEFINES]
    _ = HUIManager

    #TODO: Есть проблемы с позиционированнием, надо динамически менять свойства элемента

    _.init = ->
        @_isMouseHoverHtmlElement = false
        @_loadCSS()
        @_createRelativeParent()
        @_createLoadSpinner()
        @_createNotify()
        return

    _.isUnderMouse = -> @_isMouseHoverHtmlElement is true

    _.showLoader = (delay = 200) ->
        return if @isLoaderActive()
        @_loaderThread = setTimeout (->
                unless document.getElementById("anetLoader")
                    document.body.appendChild(HUIManager._loader)
            ), delay
        return
    
    _.hideLoader = ->
        return unless @isLoaderActive()
        clearTimeout(@_loaderThread)
        @_loaderThread = null
        if document.getElementById("anetLoader")
            document.body.removeChild(@_loader)

    _.isLoaderActive = -> @_loaderThread?

    _.notifyError = (msg) -> @_notify.error(msg)

    _.notifySucess = (msg) -> @_notify.success(msg)

    _.isInputActive = -> @_input?

    _.showInput = (placeholder) ->
        @removeInput() if @_input?
        @_createInputField(placeholder)
        return

    _.removeInput = () ->
        return unless @_input?
        document.getElementById("anetCanvasElements").removeChild(@_input)
        @_input = null
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
            "<input type=\"input\" class=\"form__field\" placeholder=\"" + placeholder + "\" name=\"anetInputName\" id='anetInputName' required />
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
    
    if KDCore.isMV()
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
            return
    
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
        # * Чтобы игнорировать стандартные кнопки Z и X во время ввода
        if HUIManager.isInputActive()
            if event.keyCode == 90 || event.keyCode == 88
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