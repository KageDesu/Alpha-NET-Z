// * Данные об игроке на сервере
class PlayerData {

    constructor(socket) {
        this.socket = socket;
        // * Присваеваем случайное имя
        this.name = "Player " + Math.randomInt(1000);
    }

    id () {
        return this.socket.id;
    }

    isMySocket(socket) {
        return (this.socket == socket);
    }

}


module.exports.PlayerData = PlayerData;