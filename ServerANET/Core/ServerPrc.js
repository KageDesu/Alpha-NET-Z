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

    sendAll(data) {
        this.server.io.sockets.emit('serverPrc', data);
    }

    sendToRoom(roomName, data) {
        this.server.io.to(roomName).emit('serverPrc', data);
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
        var playersData = this.server.getRoomPlayersData(room);

        var playersDataForNetwork = [];
        playersData.forEach(pl => {
            playersDataForNetwork.push(pl.getNetworkData());
        });

        let content = {
            room: room,
            playersData: playersDataForNetwork
        };
        let data = this.buildLobbyMsg("refreshRoomData", content);
        this.sendToRoom(room.name, data);
    }

}


module.exports.ServerPrc = ServerPrc;