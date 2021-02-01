(function () {

  //@[DEFINES]
  var PlayerData = require('./PlayerData').PlayerData;

  //@[NET MESSAGES]

  // * Список всех главных комманд и их флагов (под команд)
  let AllCommands = [{
    command: "lobby",
    flags: ["createRoom", "closeRoom", "setPlayerName"]
  }];


  class ServerMain {
    constructor(data) {
      this.data = data; //TODO: только настройки
      // * Массив игровых комнат созданных игроками
      this.gameRooms = [];
      // * Массив данных всех игроков на сервере (класс PlayerData)
      this.allServerPlayers = [];
      console.log('Server Main created');
    }

    start() {
      this.io = require('./Server')(this.data.settings.port);
      this._handleCommands();
    }

    getClientById(id) {
      return this.clientsList()[id];
    }

    clientsList() {
      return this.io.clients().sockets;
    }

    // * Это список всех комнат сокета, содержит и ID просто клиентов, которые подключились, но не в комнатах
    allRoomsList() {
      return this.io.sockets.adapter.rooms;
    }

    // * Игровые комнаты - это моя структура
    gameRoomsList() {
      return this.gameRooms;
    }


    // * Вернёт каманту, хостомм которой является данный клиент
    getRoomHostedByClient(clientId) {
      return this.gameRoomsList().find(r => r.masterId == clientId);
    }

    // * Возвращает данные комнаты, по её имени
    getGameRoomByRoomName(roomName) {
      return this.gameRoomsList().find(r => r.name == roomName);
    }

    // * Возвращает данные игрока по его clientId
    getPlayerDataById(clientId) {
      let client = this.getClientById(clientId);
      if (client) {
        return this.allServerPlayers.find(i => i.isMySocket(client));
      }
      return null;
    }

    // * Закрывает комнату (выгоняет всех клиентов)
    closeRoom(roomName) {
      "Closing room %1".p(roomName);
      // * Всемм клиентам в этой комнате сообщить что комната закрыта
      this.io.to(roomName).emit('roomClosed');
      let gameRoom = this.getGameRoomByRoomName(roomName);
      this.gameRoomsList().delete(gameRoom);
      console.log("Rooms left: " + this.gameRoomsList().length);
    }

    // * PRIVATE ==============================================================

    _handleCommands() {
      this.io.on('connection', (client) => {
        console.log("Client connected " + client.id);
        this._registerNewPlayer(client);
        // * Подписываемся чтобы читать комманды от этого клиента
        this._handleDisconnectForClient(client);
        this._handleDebugEventsForClient(client);
        this._handleANETEventsForClient(client);
      });
    }

    // * Создаём данные на сервере для нового игрока (класс PlayerData)
    _registerNewPlayer(client) {
      let plData = new PlayerData(client);
      this.allServerPlayers.push(plData);
      "Player registered on Server as %1".p(plData.name);
    }

    // * Когда клиент отключается от сервера
    _handleDisconnectForClient(client) {
      client.on('disconnect', () => {
        console.log("Client disconnected " + client.id)
        let room = this.getRoomHostedByClient(client.id);
        if (room) {
          console.log("This client hosted a room " + room.name);
          this.closeRoom(room.name);
        }
      });
    }

    // * Команда трассировки (просто сообщение)
    _handleDebugEventsForClient(client) {
      client.on('trace', (n) => {
        let str = "Client %1 trace: %2".format(client.id, n.data);
        console.log(str);
      });
    }

    // * Команды ANET
    _handleANETEventsForClient(client) {
      AllCommands.forEach(element => {
        this._handleMessageForClient(client, element.command);
      });
    }

    // * Подписываем клиент на все команды из списка
    _handleMessageForClient(client, cmdName) {
      let handler = this["cmd_" + cmdName].bind(this);
      client.on(cmdName, handler);
    }

    // * Определяем (извлекаем) флаг команды и вызываем соответствующий метод
    _onFlagCommand(cmdName, cmdData, cmdCallback) {
      let flag = cmdData.data.id;
      let log = "%1 command: %2".format(cmdName, flag);
      let cmdMethod = "cmd_%1_%2".format(cmdName, flag);
      console.log(log);
      if (!this[cmdMethod]) {
        console.warn(cmdMethod + " not found!");
        return;
      }
      try {
        this[cmdMethod](cmdData, cmdCallback);
      } catch (e) {
        console.warn(e);
      }
    }

    // ? КОМАНДЫ ОТ КЛИЕНТОВ
    // * COMMANDS FROM CLIENT ================================================================

    // * Все команды для лобби
    cmd_lobby(d, callback) {
      try {
        this._onFlagCommand("lobby", d, callback);
      } catch (e) {
        console.warn(e);
      }
    }

    // * Когда клиент создаёт новую комнату
    cmd_lobby_createRoom(d, callback) {
      let {
        from: id,
        data
      } = d;
      let socket = this.getClientById(id);
      let newRoomName = "Room_%1".format(this.gameRoomsList().length + 1);
      socket.join(newRoomName);
      let roomData = { //TODO: в класс?
        name: newRoomName,
        masterId: id,
        playersIds: []
      };
      this.gameRooms.push(roomData);
      console.log("Room %1 created, owner is %2".format(newRoomName, id));
      // * Ответ клиенту, что он создал комнату
      if (callback) {
        callback(roomData);
      }
      //TODO refrsh room list for all clients
    }

    cmd_lobby_closeRoom(d, callback) {
      let room = this.getRoomHostedByClient(d.from);
      if(!room) return;
      this.closeRoom(room.name);
      //if (callback) callback();
    }

    // * Регистрация имени игрока на сервере
    cmd_lobby_setPlayerName(d, callback) {
      let {
        from: id,
        data
      } = d;
      let playerData = this.getPlayerDataById(id);
      if (!playerData) {
        console.warn("Not found player data for " + id);
        return;
      }
      playerData.name = data.content;
      "Player ID %1 change name to %2".p(id, data.content);
      this.prc_lobby_playerNameChanged(playerData);
    }



    // ? КОМАНДЫ ОТ СЕРВЕРА КЛИЕНТАМ
    // * RPC TO CLIENTS ======================================================================

    // * Отправить всем что игрок сменил имя
    prc_lobby_playerNameChanged(playerData) {
      let data = {
        id: "lobby",
        flag: "changePlayerName", // * flag
        content: { // * данные команды именно этой
          who: playerData.id(),
          name: playerData.name
        }
      };
      this.io.sockets.emit('serverPrc', data);
    }

    // * NOT USING
    t() {
      // * ОТПРАВИТЬ ВСЕМ ВСЕМ
      this.io.sockets.emit('trace', '123');

      // * ОТПРАВИТЬ ВСЕМ В ДАННОЙ КОМНАТЕ
      this.io.to('some room').emit('trace', '444');

      //socket.rooms - текущие комнаты данного сокета

      var socket = this.getClientById(id);

      // * ОТПРАВИТЬ ВСЕМ, КРОМЕ ЭТОГО КЛИЕНТА (тут бы комнату?)
      socket.broadcast.emit('trace', '5555');

      // * ОТПРАВИТЬ ТОЛЬКО НА ЭТОТ КЛИЕНТ
      socket.emit('trace', '6666666');
    }

  }

  module.exports.ServerMain = ServerMain;
})();