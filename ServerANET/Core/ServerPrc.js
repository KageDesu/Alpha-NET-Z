// Данный класс содержит все команды от сервера на клиенты

class ServerPrc {
    constructor(server) {
        this.server = server;
    }

    buildMsg(id, flag, content) {
        return {
            id: id,
            flag: flag,
            content: content
        };
    }

    buildLobbyMsg(flag, content) {
        return this.buildMsg("lobby", flag, content);
    }

    buildGameMsg(flag, content) {
        return this.buildMsg("game", flag, content);
    }

    buildMapMsg(flag, content) {
        return this.buildMsg("map", flag, content);
    }

    collectPlayersData(room) {
        var playersData = this.server.getRoomPlayersData(room);

        var playersDataForNetwork = [];
        playersData.forEach(pl => {
            playersDataForNetwork.push(pl.getNetworkData());
        });

        return playersDataForNetwork;
    }

    sendAll(data) {
        console.log("PRC: send all: " + data.id + "_" + data.flag);
        this.server.io.sockets.emit('serverPrc', data);
    }

    sendToRoom(roomName, data) {
        console.log("PRC: send to room " + roomName + ": " + data.id + "_" + data.flag);
        this.server.io.to(roomName).emit('serverPrc', data);
    }

    //TODO: Тут надо будет проверить что точно в комнату отправлять
    // Можно если что отправлять всем, но тот не должен принимать 
    // Это уже реализуется на стороне клиента (фильтр по ID)
    broadcastToRoom(client, roomName, data) {
        console.log("PRC: broadcast to room " + roomName + ": " + data.id + "_" + data.flag + " from " + client.id);
        client.to(roomName).broadcast.emit('serverPrc', data);
    }

    // ? КОМАНДЫ ОТ СЕРВЕРА КЛИЕНТАМ
    // * RPC TO CLIENTS ======================================================================

    // * Отправить всем что игрок сменил имя
    lobby_playerNameChanged(playerData) {
        let content = {
            who: playerData.id(),
            name: playerData.name
        };
        let data = this.buildLobbyMsg("changePlayerName", content);
        this.sendAll(data);
    }

    // * Отправить что были изменены данные игроков в комнате (имя, кто-то подключился или что-то ещё)
    lobby_roomPlayersChanged(room) {
        var playersDataForNetwork = this.collectPlayersData(room);
        let content = {
            room: room,
            playersData: playersDataForNetwork
        };
        let data = this.buildLobbyMsg("refreshRoomData", content);
        this.sendToRoom(room.name, data);
    }

    // * Отправить команду клиентам, что коммната в которойо они находятся, закрыта
    lobby_roomClosed(roomName) {
        let data = this.buildLobbyMsg("roomClosed", null);
        this.sendToRoom(roomName, data);
    }

    // * Запустить игру (всей комнате)
    lobby_startGame(roomName) {
        let data = this.buildLobbyMsg("startGame", null);
        this.sendToRoom(roomName, data);
    }

    // * Отправить данные всех игроков комнаты
    game_playersData(room) {
        let data = this.buildGameMsg("playersData", this.collectPlayersData(room));
        this.sendToRoom(room.name, data);
    }

    // * Отправить команду на обновление группы (добавление персонажей, выбранных игроками)
    game_refreshParty(roomName) {
        let data = this.buildGameMsg("refreshParty");
        this.sendToRoom(roomName, data);
    }

    // * Отправить всем (кроме отправителя) синхронизацию данных
    game_observer(id, roomName, observerData) {
        let client = this.server.getClientById(id);
        if(!client) {
            "Client with ID %1 not found!".p(id);
            return;
        }
        let data = this.buildGameMsg("observerData", observerData);
        this.broadcastToRoom(client, roomName, data);
    }

    map_playerMove(id, roomName, moveData) {
        let client = this.server.getClientById(id);
        if(!client) {
            "Client with ID %1 not found!".p(id);
            return;
        }
        let data = this.buildMapMsg("playerMove", moveData);
        this.broadcastToRoom(client, roomName, data);
    }

    map_eventMove(id, roomName, moveData) {
        let client = this.server.getClientById(id);
        if(!client) {
            "Client with ID %1 not found!".p(id);
            return;
        }
        // * Отправляется всем в комнате, фильтр карты на клиенте обрабатывается
        // чтобы уменьшить нагрузку на сервер
        let data = this.buildMapMsg("eventMove", moveData);
        this.broadcastToRoom(client, roomName, data);
    }
}


module.exports.ServerPrc = ServerPrc;