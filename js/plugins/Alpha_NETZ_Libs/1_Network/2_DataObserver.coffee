#@[GLOBAL]
#?[STORABLE]

class DataObserver
    constructor: () ->
        @_fields = {}
        @_isDataChanged = false
        @_isShouldSkipCheck = false
        #TODO: Добавить режим каждый кадр, без проверки на изменение

    # * Пропустить проверку данных, например когда данные пришли от сервера
    skip: -> @_isShouldSkipCheck = true

    addFields: (obj, fieldsList) ->
        @readField(obj, f) for f in fieldsList
        return

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
        #TODO: Добавить таймер, чтобы не каждый кадр проверять
        if @_isShouldSkipCheck is true
            @_isShouldSkipCheck = false
            return
        for f of @_fields
            if obj[f] != @_fields[f]
                @_isDataChanged = true
                break

    isTimeOut: -> true

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