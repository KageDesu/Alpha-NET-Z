(function () {

  //@[DEFINES]
  let PlayerData = require('./PlayerData').PlayerData;
  let ServerPrc = require('./ServerPrc').ServerPrc;
  let ServerCmd = require('./ServerCmd').ServerCmd;

  //@[NET MESSAGES]

  // * Список всех главных комманд и их флагов (под команд)
  let AllCommands = [{
      command: "lobby",
      flags: ["createRoom", "closeRoom", "joinToRoom", "setPlayerName", "startGame"]
    },
    {
      command: "map",
      flags: ["loaded"]
    },
    {
      command: "game",
      flags: ["bindActor", "actorReady"]
    }
  ];


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
      this.prc = new ServerPrc(this);
      this.cmd = new ServerCmd(this);
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

    // * список игроков комнаты
    getRoomPlayersData(gameRoom) {
      var playersData = [];
      gameRoom.playersIds.forEach(pl => {
        playersData.push(this.getPlayerDataById(pl));
      });
      return playersData;
    }

    // * Вернёт каманту, хостомм которой является данный клиент
    getRoomHostedByClient(clientId) {
      return this.gameRoomsList().find(r => r.masterId == clientId);
    }

    // * Получить комнату, к которой подключён клиент
    getRoomForClient(clientId) {
      let room = this.gameRoomsList().find(r => r.playersIds.contains(clientId));
      return room;
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
      this.prc.lobby_roomClosed(roomName);
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
        var room = this.getRoomHostedByClient(client.id);
        if (room) {
          console.log("This client hosted a room " + room.name);
          this.closeRoom(room.name);
        } else {
          room = this.getRoomForClient(client.id);
          if (room) {
            this.cmd.lobby_leaveRoom({
              from: client.id,
              data: {
                content: room.name
              }
            });
          }
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
      let handler = (d, callback) => this._onFlagCommand(cmdName, d, callback);
      client.on(cmdName, handler);
    }

    // * Определяем (извлекаем) флаг команды и вызываем соответствующий метод
    _onFlagCommand(cmdName, cmdData, cmdCallback) {
      let flag = cmdData.data.id;
      let log = "%1 command: %2".format(cmdName, flag);
      let cmdMethod = "%1_%2".format(cmdName, flag);
      console.log(log);
      if (!this.cmd[cmdMethod]) {
        console.warn(cmdMethod + " not found!");
        return;
      }
      try {
        this.cmd[cmdMethod](cmdData, cmdCallback);
      } catch (e) {
        console.warn(e);
      }
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