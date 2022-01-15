## Changelog

### Version 0.7
**(15.01.2022)**

#### New features
- Connection via [HTTPS](https://github.com/KageDesu/Alpha-NET-Z/wiki/Connection-and-Rooms) `[PRO only]`
- [In-Game Player Menu](https://github.com/KageDesu/Alpha-NET-Z/wiki/In-Game-Player-Menu) `[PRO only]`
- [In-Game Trade](https://github.com/KageDesu/Alpha-NET-Z/wiki/In-Game-Trade-System) `[PRO only]`

#### Improvements:
- Now you can start enter text by click (touch) chat window  

#### New plugin parameters:
- `Trade Settings`
- `In-Game Player Menu?`  
- `Is show network icons?`

#### Bugs fixes:
- Diagonal movement not synced over network for events
- Using item on another player (not in my party) from menu
- Added `OK` button in text input scene for char `[RPG Maker MV]`  

#### New [nAPI script](https://github.com/KageDesu/Alpha-NET-Z/wiki/Script-calls-User-API) calls:  
- `startNetworkGameScene`
- `getPlayerInfo`
- `getPlayerCharacter`
- `callPlayerMenuAction`

#### Plugins support:
- Added `Alpha ABS Z` plugin support  

#### Other:
- Plugin now have one .js file for RPG Maker MV and MZ  

---

### Version 0.6
**(09.10.2021)**

#### New features
- [In-Game Chat](https://github.com/KageDesu/Alpha-NET-Z/wiki/In-Game-Chat) `[PRO only]`
- [Save and Load](https://github.com/KageDesu/Alpha-NET-Z/wiki/Save-and-Load-Game) network game support

#### New plugin parameters:
- `Save and Load Allowed?`
- `In-Game Chat?`  

#### Bugs fixes:
- Critical bug in RPG Maker MV singleplayer battle (game crush)  
- Battle result condition not works after battle end (Win, Loose, Escape)

#### Plugins support:
- Added `Map Inventory` plugin support  

---

### Version 0.5
**(25.05.2021)**

#### New features
- Now you can control who can make choice (all players or only one) in [Shared Events](https://github.com/KageDesu/Alpha-NET-Z/wiki/Shared-Events)
- In lobby added a player counter on the server 

#### New plugin parameters:
- `Rooms Filter?`  

#### Plugins support:
- Added `Visual Choices` plugin support  
- Added `Mobile Controls` plugin support (diagonal movement)  
- Added `VPlayer` plugin support

---

### Version 0.4
**(17.04.2021)**

#### New features
- [Shared Events](https://github.com/KageDesu/Alpha-NET-Z/wiki/Shared-Events) _(Now you can create cutscenes)_  
- [Script calls user API](https://github.com/KageDesu/Alpha-NET-Z/wiki/Script-calls-User-API) _(Now you can create custom commands to server as game developer and plugin developer)_  

#### New plugin parameters:
- `One player start?`  
- `New Game Allowed?`  
- `On Player Disconnect CE`   

#### Bugs fixes:
- Game crush in actor select screen if press `Ok` and not select any actor
- Player name change scene not exit by `Ok`
- Sometimes after changing Room or Player name mouse movement not works in game  
- Wrong players count limit in room
- Sometimes game crushes if leave and join room
- Menu state icon above player disappear if player change main menu scene to another menu scene (items, skills, equips)  
- Shared battle: wrong enemies count for different players  
- Shared battle: when the first player select an action (attack, magic, item, or defend), and then the second player choose escape, the game then freeze for the first player
