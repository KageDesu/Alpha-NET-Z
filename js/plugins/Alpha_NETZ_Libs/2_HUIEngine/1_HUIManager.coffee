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
        document.body.removeChild(@_input)
        @_input = null
        return

    _.getInputValue = () ->
        return "" unless @_input?
        return document.getElementById("anetInputName")?.value

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

    _._createInputField = (placeholder) ->
        @_input = document.createElement("div")
        @_input.id = "anetInput"
        @_input.addEventListener("mouseenter", () -> HUIManager._isMouseHoverHtmlElement = true)
        @_input.addEventListener("mouseleave", () -> HUIManager._isMouseHoverHtmlElement = false)
        @_input.classList.add("form__group")
        @_input.classList.add("field")
        #@_input.style.width = "200px"
        #@_input.style.margin = "auto"
        #@_input.style.position = "absolute"
        #@_input.style.left = "400px"
        #@_input.style.top = "300px"
        #@_input.style.zIndex = 2
        htmlCode =
            "<input type=\"input\" class=\"form__field\" placeholder=\"" + placeholder + "\" name=\"anetInputName\" id='anetInputName' required />
            <label for=\"anetInputName\" class=\"form__label\">" + placeholder + "</label>"
        @_input.insertAdjacentHTML('beforeend', htmlCode)
        document.body.appendChild(@_input)
        return

    return

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Map.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Map::

    #TODO: MV SUPPORT

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
    
    return
# ■ END Input.coffee
#---------------------------------------------------------------------------