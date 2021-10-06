# * Класс для реализации набора кнопок переключателей (Tabs)
# * Когда только одна кнопка может быть нажата (выбрана)

#TODO: Вынести в Alpha_Core (или KDCore)
#TODO: Сделать как UI Элемент ??? Наследоваться от

class KDButtonsGroup extends KDCore.Sprite
    # buttonsArray = [
    #       {image: NAME, position: [X,Y]}, ...
    #    ]
    constructor: (buttonsArray, activeIndex, @clickCallback) ->
        super()
        @_buttons = []
        @_createButton(button) for button in buttonsArray
        @_onButtonClick(activeIndex)
        return

    getSelectedIndex: -> @_buttons.findIndex (btn) -> !btn.isEnabled()

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ KDButtonsGroup.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = KDButtonsGroup::

    _._createButton = ({ image, position }) ->
        # * Так как кнопки работают как переключатели, то 03 должен быть всегда
        index = @_buttons.length
        btn = new KDCore.ButtonM(image, true, "Alpha")
        btn.move(position)
        method = => @_onButtonClick(index)
        btn.addClickHandler(method)
        @_buttons.push(btn)
        @add btn
        return

    _._onButtonClick = (index = 0) ->
        @_resetAllButtons()
        @_buttons[index]?.disable() # * Нажата
        do @clickCallback if @clickCallback?
        return

    _._resetAllButtons = () ->
        btn?.enable() for btn in @_buttons
        return
    
    return
# ■ END KDButtonsGroup.coffee
#---------------------------------------------------------------------------