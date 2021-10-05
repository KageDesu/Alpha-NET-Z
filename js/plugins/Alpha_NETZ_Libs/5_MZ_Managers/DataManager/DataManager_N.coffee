#╒═════════════════════════════════════════════════════════════════════════╛
# ■ DataManager.coffee
#╒═════════════════════════════════════════════════════════════════════════╛
#---------------------------------------------------------------------------
do ->

    #@[DEFINES]
    _ = DataManager

    # * Записать информацию о сетевом сохранении (что в этом файле сетевое сохранение)
    _.nWriteNetworkSaveFileInfo = (info) ->
        # * Для определения подходящих файлов у других клиентов
        info.nUniqueSaveID = $gameTemp.nUniqueSaveID
        # * Для определения своего персонажа
        info.nMyActorId = ANGameManager.myActorId()
        return
    
    # * Является ли файл сохранения сетевым (созданным по сети)
    _.nIsNetworkSaveFile = (savefileId) ->
        info = DataManager.savefileInfo(savefileId)
        if info? and info.nUniqueSaveID? and info.nMyActorId?
            return true
        return false

    # * Есть ли файл сетевого сохранения с уникальным ID
    _.nHaveNetworkSaveWithId = (uniqueSaveID) -> @nGetNetworkSaveInfoWithId(uniqueSaveID)?

    # * Получить данные сетвого сохранения по уникальному ID
    _.nGetNetworkSaveInfoWithId = (uniqueSaveID) ->
        for file, index in @_globalInfo
            continue unless file?
            if @nIsNetworkSaveFile(index)
                if file.nUniqueSaveID == uniqueSaveID
                    return file
        return null

    # * Получить индекс файла сохранения по уникальнмоу ID
    # * Это нужно для загрузки правильного файла
    _.nGetNetworkSaveFileIdByUniqueId = (uniqueSaveID) ->
        for file, index in @_globalInfo
            continue unless file?
            if @nIsNetworkSaveFile(index) and file.nUniqueSaveID == uniqueSaveID
                return index
        return -1

    return
# ■ END DataManager.coffee
#---------------------------------------------------------------------------