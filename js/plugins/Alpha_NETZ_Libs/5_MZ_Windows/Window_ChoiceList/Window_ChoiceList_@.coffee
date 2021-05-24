#╒═════════════════════════════════════════════════════════════════════════╛
# ■ Window_ChoiceList.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = Window_ChoiceList::

    #@[ALIAS]
    ALIAS__isCursorMovable = _.isCursorMovable
    _.isCursorMovable = ->
        if @nIsNetworkSelection()
            return ANInterpreterManager.isSharedEventMaster()
        else
            return ALIAS__isCursorMovable.call(@)


    #TODO: Может через это, заместо Handling перекрывать?
    #isOkEnabled
    #isCancelEnabled

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        @nUpdateNetworkSelection() if @nIsNetworkSelection()
        return

    #@[ALIAS]
    ALIAS__processHandling = _.processHandling
    _.processHandling = ->
        return if @nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()
        return ALIAS__processHandling.call(@)
        
    #@[ALIAS]
    ALIAS__processTouch = _.processTouch
    _.processTouch = ->
        return if @nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()
        return ALIAS__processTouch.call(@)

    #@[ALIAS]
    ALIAS__select = _.select
    _.select = (index) ->
        if @nIsNetworkSelection()
            # * Если мастер, то выбор проходит и отправляем всем выбор
            if ANInterpreterManager.isSharedEventMaster()
                ALIAS__select.call(@, index)
                @nSendNetworkSelection(index)
            else
                # * Если не мастер, но выбор пришёл с сервера (т.е. есть флаг), то ставим выбор
                if @nIsSelectFromNetworkMaster is true
                    @nIsSelectFromNetworkMaster = false
                    ALIAS__select.call(@, index)
                else
                    # * NOTHING
                    # * Клиент сам не может менять выбор
        else
            ALIAS__select.call(@, index)
        
    #@[ALIAS]
    ALIAS__initialize = _.initialize
    _.initialize = ->
        ALIAS__initialize.call(@, ...arguments)
        @nSetNetworkSelectMode(false) if ANNetwork.isConnected()
        return

    #@[ALIAS]
    ALIAS__start = _.start
    _.start = ->
        @nPrepareNetworkSelection() if ANNetwork.isConnected()
        ALIAS__start.call(@)
        return
    
    #@[ALIAS]
    ALIAS__processOk = _.processOk
    _.processOk = ->
        ALIAS__processOk.call(@)
        if @nIsNetworkSelection() && @isCurrentItemEnabled()
            @nSendNetworkSelectionAciton('ok')
        return

    #@[ALIAS]
    ALIAS__processCancel = _.processCancel
    _.processCancel = ->
        ALIAS__processCancel.call(@)
        if @nIsNetworkSelection() && @isCurrentItemEnabled()
            @nSendNetworkSelectionAciton('cancel')
        return

    return
# ■ END Window_ChoiceList.coffee
#---------------------------------------------------------------------------