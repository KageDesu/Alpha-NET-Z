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

    // * Данные для отправки клиентам
    getNetworkData() {
        return {
            "name": this.name,
            "id": this.id()
        };
    }

}


module.exports.PlayerData = PlayerData;