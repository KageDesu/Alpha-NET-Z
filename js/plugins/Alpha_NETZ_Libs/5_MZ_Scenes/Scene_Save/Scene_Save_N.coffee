#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Scene_Save.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Scene_Save::

    _.nUpdateSavePool = () -> @nSaveDataPool?.update()

    _.nCreateTempSaveData = () ->
        # * Делаем глобальную переменную чтобы DataManager мог перехватить данные
        $gameTemp.nSaveData = @nSaveDataPool
        # * Чтобы у всех был одинаковый, нужно при опредлении какой файл загружать
        $gameTemp.nUniqueSaveID = ANET.Utils.generateSaveUniqueId()
        return

    _.nClearTempSaveData = () ->
        $gameTemp.nSaveData = null
        $gameTemp.nUniqueSaveID = null

    # * Запросить проверку статуса других игроков
    # * чтобы они не были "заняты" (например битва или событие)
    # * сейчас используется проверка, что все должны быть в меню
    _.nRequestClientsStatesForSave = (savefileId) ->
        #TODO: пропустим пока что

    # * Отправить всем команду что нужны данные для сохранения
    _.nExecuteNetworkSave = (savefileId) ->
        # * Создаём пул данных сохранений для каждого игрока
        @nSaveDataPool = new PlayersDataPool () -> ANGameManager.anotherPlayers()
        # * Задаём сразу свои данные
        @nSaveDataPool.setMyData(DataManager.makeSaveContents())
        # * Задаём методы callbacks
        @nSaveDataPool.onFail () => @nOnWaitSaveDataDone(-1) # * fail
        @nSaveDataPool.onReady () => @nOnWaitSaveDataDone(savefileId)
        @nCreateTempSaveData()
        # * Посылаем запрос на сервер ($gameTemp.nUniqueSaveID должен быть уже создан)
        @nSaveDataPool.register () ->
            ANGameManager.sendSaveDataRequest(savefileId)
        @nOnWaitSaveDataStart()
        return
    
    _.nOnWaitSaveDataStart = -> HUIManager.showLoader(600)

    _.nOnWaitSaveDataDone = (savefileId) ->
        HUIManager.hideLoader()
        "SAVE DATA RECEIVED".p(savefileId)
        if savefileId >= 0
            # * Вызываем стандартный метод
            _.nALIAS__executeSave_43243.call(@, savefileId)
        else
            @onSaveFailure()
        return
    
    return
# ■ END Scene_Save.coffee
#---------------------------------------------------------------------------