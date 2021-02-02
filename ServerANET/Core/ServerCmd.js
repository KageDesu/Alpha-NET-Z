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

    // ? КОМАНДЫ ОТ КЛИЕНТОВ
    // * COMMANDS FROM CLIENT ================================================================

    // * Регистрация имени игрока на сервере
    lobby_setPlayerName(d, callback) {
        let {
            from: id,
            data
        } = d;
        let playerData = this.server.getPlayerDataById(id);
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
        //TODO: Задать статус комнате - что комната в игре! (игра запущена)
        // Чтобы другие игроки не могли соединиться к комнате и не видели её в списке
        // Или видели, но с запущенной игрой
        if (callback) callback(true);
        this.prc().lobby_startGame(room.name);
    }

    // TODO: ТУТ ОСТАНОВИЛСЯ
    map_loaded(d, callback) {
        // * Сервер устанавливает ID игроку данному в номер карты
        // * Затем отправляем всем игроках статусы всех игроков
        // * Игроки должны на клиенте поймать обновлённые статусы
        // * и уже в зависимости от режима, либо продолжить игру
        // * либо проверить все ли игроки на данной карте, чтобы продолжить
    }
}

module.exports.ServerCmd = ServerCmd;