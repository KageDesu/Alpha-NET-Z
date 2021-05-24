#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_ChoiceList.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_ChoiceList::

    # * Выбор (только одного игрока) в общем событии
    # -----------------------------------------------------------------------
    do ->

        # * Подготовка окна к выбору по сети
        _.nPrepareNetworkSelection = ->
            # * Обнуляем действие из сети
            $gameTemp.nSelectionActionFromNetwork = null
            @nSetNetworkSelectMode($gameTemp.nRequireChoiceOnlyForMaster)
            # * Сбрасываем флаг (чтобы не повторился на следующем выборе)
            $gameTemp.nRequireChoiceOnlyForMaster = false
            # * При открытии окна, первый выбор Default всегда проходит (не запрещён) на клиенте
            # * Поэтому ставим разрешающий флаг (якобы от сервера первый выбор)
            @nIsSelectFromNetworkMaster = true
            # * Очищаем последний отправленный индекс
            @__nLastSentIndex = null
            return
        
        _.nSetNetworkSelectMode = (@_networkSelectMode) ->

        _.nIsNetworkSelection = -> @_networkSelectMode is true and ANNetwork.isConnected()

        # * Отправить на сервер индекс выбора
        _.nSendNetworkSelection = (index) ->
            # * Чтобы не спамить
            return if @__nLastSentIndex == index
            @__nLastSentIndex = index
            ANInterpreterManager.sendChoiceSelection(index, null)
            return

        # * Отправить на сервер действие (ОК, отмена)
        _.nSendNetworkSelectionAciton = (action) ->
            ANInterpreterManager.sendChoiceSelection(@index(), action)
            return

        # * Ожидание действие от сервера (не мастер)
        _.nUpdateNetworkSelection = ->
            return unless $gameTemp.nSelectionActionFromNetwork?
            return if ANInterpreterManager.isSharedEventMaster()
            { action, index } = $gameTemp.nSelectionActionFromNetwork
            @nIsSelectFromNetworkMaster = true
            # * Всегда ставим выбор аналогичный масетеру (пришёл от сервера который), затем уже действия
            @select(index) if index?
            switch action
                when 'ok'
                    @processOk()
                when 'cancel'
                    @processCancel()
                else # select
                    # * Ничего, выбор всегда идёт
            # * Флаг обработан, очищаем
            $gameTemp.nSelectionActionFromNetwork = null
            return
    
    return
# ■ END Window_ChoiceList.coffee
#---------------------------------------------------------------------------