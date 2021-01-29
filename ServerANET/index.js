
// * Дополнительные функции расширений стандартных классов
require('./Core/JSExt');

const JSONLoader = require('./Core/JSONLoader');
var ServerLib = require('./Core/ServerMain');


console.log("ANET Server by Pheonix KageDesu");
console.log("");

let settings = JSONLoader.LoadFromFile("Settings.json");


var mapData = JSONLoader.LoadFromFile("Data/" + settings.mapToLoad);

console.log(settings);

var data = {
	"settings": settings,
	"mapData": mapData
};
var server = new ServerLib.ServerMain(data);

console.log("Start Server at port: " + settings.port);
server.start();

