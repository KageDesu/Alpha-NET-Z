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
        # * Для списка персонажей
        #TODO: Может не надо
        info.nActors = ANGameManager.playersData.map (pl) -> pl.actorId
        # * Для определения своего персонажа
        info.nMyActorId = ANGameManager.myActorId()
        # * Флаг что данный клиент сделал это сохранение
        info.nIsMaster = ANNetwork.isMasterClient()
        return
    
    # * Является ли файл сохранения сетевым (созданным по сети)
    _.nIsNetworkSaveFile = (savefileId) ->
        info = DataManager.savefileInfo(savefileId)
        if info? and info.nUniqueSaveID? and info.nIsMaster?
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

    return
# ■ END DataManager.coffee
#---------------------------------------------------------------------------