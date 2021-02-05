// Данный класс содержит все команды (их обработку) от клиентов к серверу

class ServerCmd {
    constructor(server) {
        this.server = server;
    }

    getClientById(id) {
        return this.server.getClientById(id);
    }

    getClientRoom(id) {
        return this.server.getRoomForClient(id);
    }

    getPlayerData(id) {
        return  this.server.getPlayerDataById(id);
    }

    getMapMasterFor(room, mapId) {
        return this.server.getMapMasterFor(room, mapId);
    }

    prc() {
        return this.server.prc;
    }

    createNewRoomData(name, masterId) {
        return { //TODO: в класс?
            name: name,
            masterId: masterId,
            inGame: false,
            playersIds: [masterId] // * Этого игрока тоже помещаем в список игроков
        };
    }

    parsePlayerInfo(data) {
        let result = {
            id: data.from,
            room: this.getClientRoom(data.from),
            playerData: this.getPlayerData(data.from)
        };
        return result;
    }

    parseData(data) {
        return data.data.content;
    }

    // ? КОМАНДЫ ОТ КЛИЕНТОВ
    // * COMMANDS FROM CLIENT ================================================================

    // * Регистрация имени игрока на сервере
    lobby_setPlayerName(d, callback) {
        let {
            from: id,
            data
        } = d;
        let playerData = this.getPlayerData(id);
        if (!playerData) {
            console.warn("Not found player data for " + id);
            return;
        }
        playerData.name = data.content;
        "Player ID %1 change name to %2".p(id, data.content);
        this.prc().lobby_playerNameChanged(playerData);
    }

    // * Когда клиент создаёт новую комнату
    lobby_createRoom(d, callback) {
        let id = d.from;
        let socket = this.getClientById(id);
        let newRoomName = "Room_%1".format(this.server.gameRoomsList().length + 1);
        socket.join(newRoomName);
        let roomData = this.createNewRoomData(newRoomName, id);
        this.server.gameRooms.push(roomData);
        console.log("Room %1 created, owner is %2".format(newRoomName, id));
        // * Ответ клиенту, что он создал комнату
        if (callback) {
            callback(roomData);
        }
        //TODO refrsh room list for all clients
    }

    lobby_closeRoom(d, callback) {
        let room = this.server.getRoomHostedByClient(d.from);
        if (!room) return;
        this.server.closeRoom(room.name);
        //if (callback) callback();
    }

    // * Когда клиент подключается к комнате
    lobby_joinToRoom(d, callback) {
        let roomName = d.data.content;
        let room = this.server.getGameRoomByRoomName(roomName);
        if (!room) {
            console.log("Client %1 try join to room: %2, but room not exists!".format(d.from, roomName));
            if (callback) callback(null);
            return;
        }
        let socket = this.getClientById(d.from);
        //TODO: А если уже подключён к этой комнате?
        socket.join(roomName);
        room.playersIds.push(d.from);
        "Client %1 join to Room: %2".p(d.from, roomName);
        if (callback) callback(room);
        // * Отправить всем в этой комнате данные о игроках этой коматы
        this.prc().lobby_roomPlayersChanged(room);
    }

    // * Когда игрок выходит из комнаты
    // * Этот метод вызывается и с самого сервера тоже
    //?[SERVER TOO]
    lobby_leaveRoom(d, callback) {
        let socket = this.getClientById(d.from);
        let roomName = d.data.content;
        if (socket) socket.leave(roomName); // * Игрока может не существовать (при disconnect)
        let room = this.server.getGameRoomByRoomName(roomName);
        if (room) { // * Комнаты может не существовать уже (когда игрока отключило от комнаты сперва)
            room.playersIds.delete(d.from);
            "Client %1 leave Room: %2".p(d.from, roomName);
            if (callback) callback(room);
            // * Отправить всем в этой комнате данные о игроках этой коматы
            this.prc().lobby_roomPlayersChanged(room);
        }

    }

    // * Когда клиент (мастер комнаты) запускает игру (Старт игры)
    // * Любой участник комнаты может запустить игру, надо уже в клиенте давать право только хосту это делать
    lobby_startGame(d, callback) {
        let room = this.getClientRoom(d.from);
        if(!room) {
            "Client %1 try start game, but not joined any room".p(d.from);
            if (callback) callback(false);
            return;
        }
        "Starting game for room %1".p(room.name);
        // * Комната имеет статус теперь "в игре"
        // Чтобы другие игроки не могли соединиться к комнате и не видели её в списке
        // Или видели, но с запущенной игрой
        room.inGame = true;
        var i = 0;
        // * Задаём индексы всем игрокам (начиня от 1 - хост)
        room.playersIds.forEach((plId) => {
            var plData = this.getPlayerData(plId);
            plData.index = ++i;
        });
        if (callback) callback(true);
        this.prc().lobby_startGame(room.name);
    }

    // * Когда клиент перешёл на сцену карты (выполнился метод onMapLoaded)
    map_loaded(d, callback) {
        let id = d.from;
        let playerData = this.getPlayerData(id);
        let room = this.getClientRoom(id);
        if(!playerData) {
            console.log("Not find Player Data for %1".format(id));
        } else {
            //TODO: проверки
            let mapId = d.data.content;
            playerData.mapId = mapId;
            playerData.scene = "map";
            "Player %1 now on Map ID %2".p(playerData.name, mapId);
            // * Если мастера карты нету, то теперь этот игрок мастер карты
            let mapMaster = this.getMapMasterFor(room, mapId);
            if(!mapMaster) {
                playerData.isMapMaster = true;
                "Player %1 now Map ID %2 Master!".p(playerData.name, mapId);
            }
        }
        this.prc().game_playersData(room);
        if (callback) callback();
    }

    // * Когда клиент просит установить себе персонажа
    game_bindActor(d, callback) {
        //TODO: Проверка, не занят ли персонаж, если занят то callback(false)
        let id = d.from;
        let actorId = d.data.content;
        let playerData = this.getPlayerData(id);
        "Try binding Actor %1 for Player %2".p(actorId, playerData.name);
        //TODO: проверки
        playerData.actorId = actorId;
        let room = this.getClientRoom(id);
        this.prc().game_playersData(room);
        "Binding Actor %1 for Player %2 - Good".p(actorId, playerData.name);
        if (callback) callback(true);
    }

    // * Игрок настроил своего персонажа (готов к игре)
    game_actorReady(d, callback) {
        let {id, playerData, room} = this.parsePlayerInfo(d);
        let actorData = this.parseData(d);
        playerData.characterReady = true;
        this.prc().game_playersData(room);
        //TODO: Надо реализовать передачу настроенных игроком параметров Game_Actor
        //this.prc().game_refreshActorData(); // * Отправить всем данные Game_Actor
        this.prc().game_refreshParty(room.name);
        if (callback) callback();
    }

    // * Пришли данные которые надо синхронизировать
    game_observer(d, callback) {
        let {id, room} = this.parsePlayerInfo(d);
        let content = this.parseData(d);
        this.prc().game_observer(id, room.name, content);
        if (callback) callback();
    }

    // * Пришли данные о движении игрока
    map_playerMove(d, callback) {
        let {id, room} = this.parsePlayerInfo(d);
        let content = this.parseData(d);
        this.prc().map_playerMove(id, room.name, content);
        if (callback) callback();
    }

    // * Пришли данные о движении события на карте
    map_eventMove(d, callback) {
        let {id, room} = this.parsePlayerInfo(d);
        let content = this.parseData(d);
        this.prc().map_eventMove(id, room.name, content);
        if (callback) callback();
    }
}

module.exports.ServerCmd = ServerCmd;