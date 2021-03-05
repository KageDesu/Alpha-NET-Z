#@[GLOBAL]
#?[STORABLE]

class DataObserver
    constructor: (@_checkTime = 0, @_instante = false) ->
        @_fields = {}
        @_isDataChanged = false
        @_isShouldSkipCheck = false
        @_timer = 0
        return

    # * таймер проверки изменений (отправки)
    setInstanteMode: -> @_instante = true

    # * не проверять изменения, устанавливать флаг _isDataChanged сразу (по истечению таймера)
    setCheckInterval: (@_checkTime) ->

    # * Пропустить проверку данных, например когда данные пришли от сервера
    skip: -> @_isShouldSkipCheck = true

    addFields: (obj, fieldsList) ->
        @readField(obj, f) for f in fieldsList
        return

    removeFields: (fieldsList) ->
        delete @_fields[f] for f in fieldsList

    # * Прочитать все значения с объекта
    refreshAll: (obj) ->
        for f of @_fields
            @readField(obj, f)
        @_isDataChanged = false
        
    readField: (obj, field) ->
        @_fields[field] = obj[field]

    check: (obj) ->
        # * Если данные изменены, но зачем снова проверять?
        # * Всё равно не отслеживается какое именно поле было изменнено
        return if @isDataChanged()
        @_timer--
        # * Если таймер, то ждём, не проверяем
        return if @_timer > 0
        @_timer = @_checkTime
        # * Если надо пропустить проверку, то пропускаем
        if @_isShouldSkipCheck is true
            @_isShouldSkipCheck = false
            return
        # * Если постоянное обновление, то сразу флаг и пропускаем проверку
        if @_instante is true
            @_isDataChanged = true
            return
        for f of @_fields
            if obj[f] != @_fields[f]
                @_isDataChanged = true
                break
        return

    isDataChanged: -> @_isDataChanged == true

    # * Получить данные всех полей для отправки на сервер
    getDataForNetwork: (obj) ->
        @refreshAll(obj)
        return @_fields

    # * Установить данные всех полей, когда пришли с сервера
    setDataFromNetwork: (obj, observerData) ->
        for f of @_fields
            obj[f] = observerData[f]
        @refreshAll(obj)
        return