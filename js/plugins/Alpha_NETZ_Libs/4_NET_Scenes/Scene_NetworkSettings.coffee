# * Сцена настроек для сетевой игры

#TODO: Пока что просто ввод имени игрока

class Scene_NetworkSettings extends Scene_MenuBase
    constructor: () ->
        super()

    create: ->
        super()
        @_showNameInput()

    stop: ->
        @_savePlayerName()
        @_hideNameInput()
        super()

    update: ->
        super()
        @popScene() if Input.isCancel() || Input.isTriggered('ok')

#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_NetworkSettings.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_NetworkSettings::

    _._showNameInput = ->
        HUIManager.showInput("Enter your name for network...")
        HUIManager.setInputValue(ANGameManager.myPlayerData().name)
        return

    _._savePlayerName = ->
        newName = HUIManager.getInputValue()
        if String.any(newName)
            ANGameManager.myPlayerData().name = newName
            # * Отправим на сервер
            ANPlayersManager.sendPlayerName()
            ConfigManager.netPlayerName = newName
            ConfigManager.save()
        return

    _._hideNameInput = ->
        HUIManager.removeInput()
    
    return
# ■ END Scene_NetworkSettings.coffee
#---------------------------------------------------------------------------