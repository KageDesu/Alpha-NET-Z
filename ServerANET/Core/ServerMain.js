(function () {

  //@[DEFINES]


  //@[NET MESSAGES]
  let AllCommands = [{
    command: "lobby",
    flags: ["createRoom"]
  }];
  class ServerMain {
    constructor(data) {
      this.data = data;
      this.gameRooms = [];
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

    clientsForRoom(roomName) {
      return this.io.clients(roomName);
    }

    allRoomsList() {
      return this.io.sockets.adapter.rooms;
    }

    gameRoomsList() {
      return this.gameRooms;
    }

    getRoomNameHostedByClient(clientId) {
      for(var roomData of this.gameRoomsList()) {
        if(roomData.id == clientId) {
          return roomData.name;
        }
      }
      return null;
    }

    // * PRIVATE ==============================================================

    _handleCommands() {
      this._handleBaseSocketEvents();
      // this._handleDebugEvents();
      // this._handleANETEvents();
    }

    _handleBaseSocketEvents() {
      this.io.on('connection', (client) => {
        console.log("Client connected " + client.id);
        // * Подписываемся чтобы читать комманды от этого клиента
        this._handleDisconnectForClient(client);
        this._handleDebugEventsForClient(client);
        this._handleANETEventsForClient(client);
      });
    }

    _handleDisconnectForClient(client) {
      //TODO: remove room, disconnect all from room
      client.on('disconnect', () => {
        console.log("Client disconnected " + client.id)
          let roomName = this.getRoomNameHostedByClient(client.id);
          if(roomName) {

            console.log("This client hosted a room " + roomName);
            //
            //
            //io.sockets.clients(someRoom).forEach(function(s){
            //    s.leave(someRoom);
            //});
            //
            // TODO: выкинуть всех в лобби
            // TODO: удалить комнату из gameRooms
          }
        }
      );
    }

    _handleDebugEventsForClient(client) {
      client.on('trace', (n) => {
        let str = "Client %1 trace: %2".format(client.id, n.data);
        console.log(str);
      });
    }

    _handleANETEventsForClient(client) {
      AllCommands.forEach(element => {
        this._handleMessageForClient(client, element.command);
      });
    }

    _handleMessageForClient(client, cmdName) {
      let handler = this["cmd_" + cmdName].bind(this);
      client.on(cmdName, handler);
    }

    _onFlagCommand(cmdName, cmdData, cmdCallback) {
      let flag = cmdData.data.id;
      let log = "%1 command: %2".format(cmdName, flag);
      let cmdMethod = "cmd_%1_%2".format(cmdName, flag);
      console.log(log);
      if(!this[cmdMethod]) {
        console.warn(cmdMethod + " not found!");
        return;
      }
      try {
        this[cmdMethod](cmdData, cmdCallback);
      } catch (e) {
        console.warn(e);
      }
    }

    // * COMMANDS FROM CLIENT ================================================================

    cmd_lobby(d, callback) {
      try {
        this._onFlagCommand("lobby", d, callback);
      } catch (e) {
        console.warn(e);
      }
    }

    cmd_lobby_createRoom(d, callback) {
      let {from: id, data} = d;
      let socket = this.getClientById(id);
      let newRoomName = "Room_%1".format(this.gameRoomsList().length + 1);
      socket.join(newRoomName);
      this.gameRooms.push({id, name: newRoomName});
      console.log("Room %1 created, owner is %2".format(newRoomName, id));
      // * Ответ клиенту, что он создал комнату
      if(callback) {
        callback(newRoomName);
      }
      //TODO refrsh room list for all clients
    }

    // * RPC TO CLIENTS ======================================================================


    

  }

  module.exports.ServerMain = ServerMain;
})();