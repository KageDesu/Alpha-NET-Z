/*:
 * @plugindesc (v.0.1)[PRO] Network System
 * @author Pheonix KageDesu
 * @target MZ
 * @url http://kdworkshop.net/
 *
 * @help
 *
 * This plugin version only for test purposes
 *

 * @param ANETZ @text @desc
 * 
 * 
 * @param connection:s
 * @text Connection
 * @type struct<LConnectionSettings>
 * @default {"serverIp":"195.161.41.20","serverPort":"3034"}
 * @desc If you don't have own server, don't change this settings
 * 
 * 
 * @param spacer|gamesettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param gameMode
 * @type combo
 * @text Game Mode
 * @option Cooperative
 * @option Multiplayer
 * @default Cooperative
 * @desc ! In current version only cooperative !
 * 
 * @param actorsForNetwork:intA
 * @type actor[]
 * @text Actors
 * @default ["1","2","3","4"]
 * @desc Available actors for network game players
 * 
 * @param isActorSelectionAllowed:b
 * @text Actor selection?
 * @type boolean
 * @default true
 * @desc Can player select actor in lobby?
 * 
 * @param networkStartMap:s
 * @text Network Start
 * @type struct<LNetworkMap>
 * @default {"gameStartMap:i":"0","isNetworkGameAutoStart:b":"true"}
 * @desc Network game start map settings
 * 
 * 
 * @param globalData:s
 * @text Global Data
 * @type struct<LGlobalData>
 * @default {"globalVariablesIds:intA":"[]","globalSwitchesIds:intA":"[]"}
 * @desc All this data will be automatically synchronized between all players
 * 


 * 


 */
/*~struct~LConnectionSettings:

@param serverIp
@text IP
@type combo
@option localhost
@option 195.161.41.20
@desc Server IP address (ip4)
@default 195.161.41.20

@param serverPort
@text Port
@default 3034

*/

/*~struct~LNetworkMap:

@param gameStartMap:i
@text Map ID
@type number
@min 0
@default 0
@desc Special start map ID for network game. 0 - default start map

@param isNetworkGameAutoStart:b
@text Auto Transfer?
@type boolean
@default true
@desc Automatically transfer all players (when all ready) from network start map to default start map

*/

/*~struct~LGlobalData:

@param globalVariablesIds:intA
@type variable[]
@text Variables
@default []
@desc Variables for auto synchronizaton

@param globalSwitchesIds:intA
@type switch[]
@text Switches
@default []
@desc Switches for auto synchronizaton

*/
