/*
 * Copyright (c) 2021 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *
 *
 */

 // * CHANGELOG ===================
 /*
 * v 2.0 (X.09.2021)
 * - New: Items name color matching Quality System level color
 *      (see new Plugin Parameters)
 * - New: Added show and hide Map Inventory UI script calls
 * - Fixed: Battle Test from RPG Maker Editor not works with Map Inventory Plugin
 * - Fixed: Sticky inventory (chest) windows when dragging
 * - Some small fixes and changes
 *
 * v 1.9 (11.05.2021)
 * - New: Limited Cells System (PRO)
 * - New: Plugin commands for MZ
 * - Plugin parameter: Description static position?
 *      (allows you set static position for description windows)
 * - New: Items now supports multiple types
 *      (for example: Weapon|Tool)
 * - New: You can set custom icons for diffirent chests
 *      (script call MISetIconForChest)
 * - Fixed: Take All button and Gold Item bug
 * - Some small fixes and changes
 *
 * v 1.8 (02.02.2021)
 * - Added extra items descriptions
 * - Added Throw Out feature (PRO)
 * - More comfortable plugin parameters
 * - Bug fixes and small changes
 * 
 * v 1.7 (23.11.2020)
 * - Now you can change inventory size
 * - Plugin parameter: Use custom size of cells?
 *      (allows you change cells size and count per page)
 * - New: Change Gold event command now works with visual chests
 * - Plugin parameter: Gold Item
 *      (you can add gold as item in visual chests)
 * - New: Using images instead icons (PRO)
 *      (see also new plugin parameter: Icons images in Windows?)
 * - Bug fixes and small changes
 *  
 * v 1.6 (09.10.2020)
 * - New: Hot Items System (PRO)
 * - New: Chests item drop chance (PRO)
 * - Some small fixes and changes
 *
 * v 1.5 (09.09.2020)
 * - Added MZ Support
 * - Fixed: Weight is not taken into account when you using standard Event Change Items (and etc.) commands
 * - New: Limited Types Stored Chests (PRO)
 * - New: Equipments statistic table
 * - New: Now you can create empty Stored chests (PRO)
 * - Some small fixes and changes
 * 
 * v 1.4 (05.08.2020)
 * - New: Items Quality System
 * - New: Screen Button for open Inventory (PRO)
 * - Improvements to Item Weight System (PRO)
 *    - Notify when inventory is overweight
 *    - Auto State when inventory is overweight (optional)
 *    - Slowdown movement speed when inventory is overweight (optional)
 *    - You can create equipments that's rise inventory max weight
 *    - You can create consumable items that's rise inventory max weight permanently
 * - Added new Script Calls
 * - Some small fixes and changes
 * 
 * v 1.3 (10.07.2020)
 * - New: Possibility to delete unnecessary categories
 * - New: Added restriction for dragging windows by mouse to out of screen
 * - New: Now you can devide count when moving items between storages (RPO)
 * - New: Added items weights system (PRO)
 * - Fixed: Inventory is closing when player use item with Common Event calls
 * - Some small fixes and changes
 * 
 * v 1.2 (05.06.2020)
 * - New: Description text auto word wrap
 * - New: Support up to 8 party members (PRO)
 * - New: Direct using items with 'None' scope
 * - New: Select a party member when equip armors or weapons
 * - New: HP, MP, TP gauges (PRO)
 * - Improved Items sorting (now by ID, then by occasion)
 * - Fixed: Items no longer disappear from the chest(or storage) if you take more than possible (max items)
 * - Improved YEP_ItemCore compability
 *
 * v 1.1 (23.04.2020)
 * - New: Script calls for work with Player Storage
 * - New: Select a party member when using items
 * - New: Move items from inventory to StoredChest
 * - Improved checking of the conditions of use of the items
 * - New plugin parameters
 * 
 * v 1.0 - Release (16.03.2020)
 */
 // ===============================

/*:
 * @plugindesc (v.2.0)[PRO] Visual Map Inventory
 * @author Pheonix KageDesu
 * @target MZ
 * @url http://kdworkshop.net/plugins/map-inventory
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 * Guides and extra resources you can find at:
 * http://kdworkshop.net/map-inventory/
 * 
 * Special Thanks: SMO_Valadorn, Zee, Fiquei, Carlos Ferreira
 *
 * === Plugin have Plugin Commands
 *
 
 * ---------------------------------------------------------------------------
 * === Plugin script calls
 *
 *      OpenMapInventory()
 *      CloseMapInventory()
 *      DisableMapInventory()
 *      EnableMapInventory()
 *      IsInventoryAllowed() - return true of false
 *      OpenOrCloseMapInventory()
 *      HideMapInventoryUI()
 *      ShowMapInventoryUI()
 *
     OpenMapUserChest()    CloseMapUserChest()    MIOpenVisualChest(NAME) - open visual chest, where NAME - chest name        Example: MIOpenVisualChest("Chest");    MIOpenVisualChestStored(NAME, TYPE) - open visual chest that can keep only specific items types        MIOpenVisualChestStored("Ammunition", "Ammo|Grenade"); (for example)        You can use multiple types, separating them by | (no spaces)        Use Note <aItemType:TYPE> to set TYPE for Item    MISetIconForChest(ICON_PIC_NAME) - set custom icon for visual chest        Call this script call before MIOpenVisualChest | MIOpenVisualChestStored        ICON_PIC_NAME - image name from img\pMapInventory folder    MIButtonMove(x, y)    MIButtonVisibility(state), where true - visible, false - hidden    MIButtonState(state), where true - enabled, false - disabled    MIButtonReset() - reset UI button settings (and position) to default        ClearAllStoredChests() - clear from all maps, all chests    ClearStoredChestsOnMap() - clear all stored chests on current map    ClearStoredChestsOnMap(ID) - clear all stored chests from map with ID    AddWeaponInPlayerStorage(ID, COUNT) - add weapon with ID to player storage    AddArmorInPlayerStorage(ID, COUNT) - add armor with ID  to player storage    AddItemInPlayerStorage(ID, COUNT) - add item with ID to player storage (not key items!)    MoveAllItemsToStorage() - move all items from inventory to player storage (not key items!)    MoveEquipedItemsToStorage() - move all equipped items to player storage (only party leader!)    ClearPlayerStorage() - delete all from player storage(warning!can 't be undone)    TakeAllFromContainer() - take all items from opened chest (or user chest) (same as Take All button)        Weight system:    GetMaxWeight() - return max carrying weight weight    GetCurrentWeight() - return current weight    IsOverWeight() - return true if overload (current items weight > max weight)    RefreshWeightSystem() - refrsh party weight    ModifyInventoryMaxWeight(value) - permanently add value to Party Max Weight(value should be > 0)    Limited Cells System:    IsHaveFreeSlotsForItems() - return true if player have free inventory slots for new items    IsHaveFreeSlotsForWeapons() - return true if player have free inventory slots for new weapons    IsHaveFreeSlotsForArmors() - return true if player have free inventory slots for new armors    MISetStoredChestLimit(limit) - set cells limit for next Visual Chest
 * ---------------------------------------------------------------------------
 *
 * === Database Note's
 * Items\Equipments\Weapons NOTES:
 *      <aItemType: CUSTOM_TYPE>
 *      <aItemType: CUSTOM_TYPE|CUSTOM_TYPE> (can be many types for one item)
 *      <aItemTypeColor: HEX_COLOR>
 *      <itemRare: QUALITY_LEVEL>
 * 
 *      [PRO only]
 *      <weight: ITEM_WEIGHT>
 *      <weightStore: ADD_TO_MAX_WEIGHT>
 *      <iImg: NAME> - image as item icon (should be in img\pMapInventory\Icons\)
 * 
 *  Example:
 *      <aItemType:Ammunition>
 *      <aItemType:Weapon|Tool>
 *      <aItemTypeColor:#ba9059>
 *      <itemRare:2>
 *      <weight:6>
 *      <weightStore:20>
 *      <iImg:potion>
 * ---------------------------------------------------------------------------
 *  [PRO only] How add drop chance to item in visual chest:
 * 
 *  Add comment "chance:X" before Change Items event command
 *      where X - chance to drop in percent, 10, 20, 50 etc...
 * 
 *      Example: chance:50 - 50% drop chance to next item (weapon, equipment)
 * ---------------------------------------------------------------------------
 *  For configurate visual, modify:
 *      img \ pMapInventory folder
 *      data \ PKD_MapInventorySettings.json
 *      data \ PKD_UserChestSettings.json
 *      data \ PKD_MapChestSettings.json
 * ---------------------------------------------------------------------------
 * If you like my Plugins, want more and offten updates,
 * please support me on Patreon!
 * 
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 * 
  *
 * 

 * @param OpenMapInventoryKey
 * @text Open Inventory Key
 * @type string
 * @default i
 * @desc
 * 
 * @param TakeAllChestKey
 * @text Take All From Chest Key
 * @type string
 * @default t
 * @desc
 * 
 * @param spacer|inventorySettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param headerInventorySettings
 * @text Inventory settings
 * 
 * @param ShowEquipedItemsInInventory
 * @parent headerInventorySettings
 * @text Show Equipped items?
 * @type boolean
 * @default true
 * @desc Show already equiped items (armor, weapon) in inventory?
 * 
 * @param MapInventoryDrag
 * @parent headerInventorySettings
 * @text Allow Drag?
 * @type boolean
 * @default true
 * @desc Allow drag inventory window by mouse?
 * 
 * @param MapInventorySortEquip
 * @parent headerInventorySettings
 * @text Sort Equipments?
 * @type boolean
 * @default true
 * @desc Equipped items (armors, weapon) show first in inventory
 * 
 * @param MapInventorySortItems
 * @parent headerInventorySettings
 * @text Sort Items?
 * @type boolean
 * @default true
 * @desc Usable items show first in inventory
 * 
 * @param AllowAutoRefreshUsable
 * @parent headerInventorySettings
 * @text Auto Inventory Refresh?
 * @type boolean
 * @default true
 * @desc May cause lower game performance if inventory have many items
 * 
 * @param UseSlider
 * @parent headerInventorySettings
 * @text Use division slider?
 * @type boolean
 * @default true
 * @desc If true, you can divide item count when transferring items from one storage to another
 * 
 * @param AllowPartySelect
 * @parent headerInventorySettings
 * @text Allow Party Selector?
 * @type boolean
 * 
 * @default true
 * @desc Allow opens party selector when player want use item
 * 
 * @param AllowNonBattlePartyMembers
 * @parent headerInventorySettings
 * @text Allow > 4 party members?
 * @type boolean
 * @default false
 * @desc [PRO] If true, you can apply items from inventory to all party members
 * 
 * @param StaticDescPosition:b
 * @parent headerInventorySettings
 * @text Description static position?
 * @type boolean
 * @default false
 * @desc If true, description will be always in X, Y coordinates you set, not near the cursor  
 * 
 * @param StaticDescPosXY:struct
 * @parent StaticDescPosition:b
 * @text Description static XY
 * @type struct<XY2>
 * @default {"x:e":"0","y:e":"0"}
 * @desc X and Y coordinates for description window static position  
 * 
 * @param spacer|chestsSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param headerChestsSettings
 * @text Chests settings
 * 
 * @param AllowStoreInChest
 * @parent headerChestsSettings
 * @text Store items in chest?
 * @type boolean
 * @default true
 * @desc If true, you can move items from inventory to any stored chest
 * 
 * @param GoldItem:i
 * @parent headerChestsSettings
 * @text Gold Item
 * @type item
 * @default 0
 * @desc Item template for gold in visual chest, if 0 - just receive gold directly
 * 
 * @param spacer|weightSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param UseWSystem
 * @text Use items weight system?
 * @type boolean
 * @default false
 * @desc [PRO] If true, you can set weights to different items and should carry about inventory overloading
 * 
 * 
 * @param wSystemVariableId
 * @parent UseWSystem
 * @text Maximum Weight Var ID
 * @type variable
 * @default 1
 * @desc Set the maximum weight of the party in this variable
 * 
 * @param wSystemAutoStateId
 * @parent UseWSystem
 * @text Overweight Auto State ID
 * @type state
 * @default 0
 * @desc When there is an overweight, this state is applied automatically(it is removed itself too)
 * 
 * @param wSystemAllowSlowDown
 * @parent UseWSystem
 * @text Slowdown player when overweight?
 * @type boolean
 * @default false
 * @desc If true, player will moving slowly when inventoy is overweighted
 * 
 * @param spacer|limitedSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param UseLimitedCellsSystem:b
 * @text Use limited cells system?
 * @type boolean
 * @default false
 * @desc [PRO] If true, you can limit available inventory and stored chest cells
 * 
 * @param lcVariableItems:int
 * @parent UseLimitedCellsSystem:b
 * @text Cells count for Items
 * @type variable
 * @default 1
 * @desc Set open cells count for items category in this variable
 * 
 * @param lcVariableWeapons:int
 * @parent UseLimitedCellsSystem:b
 * @text Cells count for Weapons
 * @type variable
 * @default 1
 * @desc Set open cells count for weapons category in this variable
 * 
 * @param lcVariableArmors:int
 * @parent UseLimitedCellsSystem:b
 * @text Cells count for Armors
 * @type variable
 * @default 1
 * @desc Set open cells count for armor category in this variable
 * 
 * @param lsIgnoreLimitByGainItems:b
 * @parent UseLimitedCellsSystem:b
 * @text Limit item gain only from chests?
 * @type boolean
 * @default true
 * @desc If true, items will be added in inventory via Change Items event command anyway (if no free slots too)
 * 
 * @param spacer|screenButton @text‏‏‎ ‎@desc ===============================================
 * 
 * @param UseScreenButton
 * @text Button on Screen?
 * @type boolean
 * @default true
 * @desc [PRO] If true, you can open or close inventory using button on game screen
 * 
 * @param spacer|rareItemsSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param AllowRareItemSystem
 * @text Allow Item Quality System?
 * @type boolean
 * @default true
 * @desc If true, you can set quality level to items, using Note command
 * 
 * @param QualitySystemColor:b
 * @parent AllowRareItemSystem
 * @text Items names with quality colors?
 * @type boolean
 * @default false
 * @desc If true, item name color in Map Inventory will be same as item quality level color
 * 
 * @param QualitySystemColorWindows:b
 * @parent QualitySystemColor:b
 * @text In default windows as well?
 * @type boolean
 * @default false
 * @desc If true, item name color in default windows will be same as item quality level color
 * 
 * 
 * @param spacer|equipStatsSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param AllowEquipsStats
 * @text Allow Equipments stats?
 * @type boolean
 * @default true
 * @desc If true, you can see extra information (mouse scroll)
 * 
 * @param ShowFullEquipedStats
 * @parent AllowEquipsStats
 * @text Show full stats when equipped?
 * @type boolean
 * @default false
 * @desc If false, when item is equipped you can see only gained stats (without actor ones)
 * 
 * @param spacer|outerItemsSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param AllowOuterItems
 * @text Allow HotItems?
 * @type boolean
 * @default false
 * @desc [PRO] If true, you can see and use extra hot items cells on UI
 *  *
 * @param OIHotKeyText:struct
 * @parent AllowOuterItems
 * @text Hot Key Text Settings
 * @type struct<CText>
 * @default {"visible:bool":"true","size:struct":"{\"w:int\":\"22\",\"h:int\":\"20\"}","margins:struct":"{\"x:int\":\"10\",\"y:int\":\"18\"}","alignment:str":"right","outline:struct":"{\"color:css\":\"\",\"width:int\":\"2\"}","font:struct":"{\"face:str\":\"Consolas\",\"size:int\":\"14\",\"italic:bool\":\"false\"}","textColor:css":"#F9E159"}
 * 
 * @param OIHotKeyEnable:bool
 * @parent AllowOuterItems
 * @text Hot Keys Enabled?
 * @type boolean
 * @default true
 * @desc Can player use hot keys to activate hot items?
 * 
 * @param OIHotCells:structA
 * @parent AllowOuterItems
 * @text Screen Hot Cells
 * @type struct<LHotCell>[]
 * @default ["{\"key:str\":\"1\",\"pos:struct\":\"{\\\"x:int\\\":\\\"40\\\",\\\"y:int\\\":\\\"560\\\"}\"}", "{\"key:str\":\"2\",\"pos:struct\":\"{\\\"x:int\\\":\\\"80\\\",\\\"y:int\\\":\\\"560\\\"}\"}", "{\"key:str\":\"3\",\"pos:struct\":\"{\\\"x:int\\\":\\\"120\\\",\\\"y:int\\\":\\\"560\\\"}\"}", "{\"key:str\":\"f\",\"pos:struct\":\"{\\\"x:int\\\":\\\"160\\\",\\\"y:int\\\":\\\"560\\\"}\"}"]
 * @desc Hot cells for inventory items on screen
 * 
 * @param spacer|cellsSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param headerCellsSettings
 * @text Inventory Cells Settings
 * 
 * @param UseImageIconsInWindows:b
 * @parent headerCellsSettings
 * @text Icons images in Windows?
 * @type boolean
 * @default true
 * @desc Use images as icons (iImg) in default windows?
 * 
 * @param UseCustomCellsSize:b
 * @parent headerCellsSettings
 * @text Use custom size of cells?
 * @type boolean
 * @default false
 * @desc If true, you can change size and count per page of inventory cells
 * 
 * @param CustomCellSettings:struct
 * @parent UseCustomCellsSize:b
 * @text Custom Cells Settings
 * @type struct<LCustomCell>
 * @default {"iconSize:i":"30","columnsPerPage:i":"5","rowsPerPage:i":"5","iconMode:i":"1"}
 * @desc Custom Cells Settings
 * 
 * @param spacer|extraDescriptions @text‏‏‎ ‎@desc ===============================================
 * 
 * 
 * @param ExtraDescriptions:structA
 * @text Extra Descriptions
 * @type struct<LBigInfoData>[]
 * @default []
 * @desc Description text for item when you press left mouse button on it
 * 
 * 
 * @param spacer|throwOutSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param AllowThrowOutSystem:b
 * @text Allow Items Throw Out?
 * @type boolean
 * @default true
 * @desc [PRO] If true, you can throw out items from inventory
 * 
 * @param ThrowOutSettings:struct
 * @parent AllowThrowOutSystem:b
 * @type struct<LThrowOutSettings>
 * @text Throw Out Settings
 * @desc Items throw out feature configuration 
 * @default {"margins:struct":"{\"x:int\":\"15\",\"y:int\":\"350\"}","startOpacity:int":"175","fadeOutSpeed:int":"5","throwOutSE":"Wind7"}
 * 


 * @command MI_VisualChest
 * @text Visual Chest
 * @desc Open Visual Chest
 * 
 * @arg name
 * @text Name
 * @desc Chest Title
 * @type text
 * @default CHEST
 * 
 * @arg image
 * @text Custom Icon
 * @desc Custom Icon image for this chest. Leave empty for default one
 * @type file
 * @require 1
 * @dir img\pMapInventory
 * @default
 * 
 * @command MI_VisualChestStored
 * @text Stored Visual Chest
 * @desc Open Stored Visual Chest
 * 
 * @arg name
 * @text Name
 * @desc Chest Title
 * @type text
 * @default STORED
 * 
 * @arg types
 * @text Types
 * @desc You can store in chest only this types, example: Potions (for multiple types, use | -> Keys|Potions)
 * @type text
 * 
 * @arg limit
 * @text Limit
 * @type number
 * @min 0
 * @desc Cells limit in this chest (only if parameter Use limited cells system? is ON) 0 - no limit
 * @default 0
 * 
 * @arg image
 * @text Custom Icon
 * @desc Custom Icon image for this chest. Leave empty for default one
 * @type file
 * @require 1
 * @dir img\pMapInventory
 * @default
 * 
 * @command MI_UserChestOpen
 * @text Player Storage: Open
 * @desc Open User (Player) Storage
 * 
 * @command MI_Inventory_State
 * @text Inventory: State
 * @desc Set Inventory State (Enable or Disable)
 * 
 * @arg state
 * @text Enable (Active)
 * @desc Set ON (true) to allow open inventory or OFF (false) to disallow
 * @type boolean
 * @default true
 * 
 * @command MI_Button_Move
 * @text Button: Move
 * @desc Move UI Button X, Y
 * 
 * @arg X
 * @desc In pixels
 * @type number
 * @default 0
 * 
 * @arg Y
 * @desc In pixels
 * @type number
 * @default 0
 * 
 * @command MI_Button_Visibility
 * @text Button: Visible
 * @desc Set UI Button Visibility
 * 
 * @arg state
 * @text Visible
 * @desc Set ON (true) to set button visible or OFF (false) to hide button
 * @type boolean
 * @default true
 * 
 * @command MI_Button_State
 * @text Button: State
 * @desc Set UI Button State (Enable or Disable)
 * 
 * @arg state
 * @text Enable (Active)
 * @desc Set ON (true) to set button active or OFF (false) to disable button
 * @type boolean
 * @default true
 * 
 * @command MI_Button_Reset
 * @text Button: Reset
 * @desc Reset UI Button position and settings to default


 */
/*~struct~LCustomCell:
 * @param iconSize:i
 * @text Cell Size
 * @type number
 * @min 1
 * @default 30
 * @desc Cell size in px
 * 
 * @param columnsPerPage:i
 * @text Columns
 * @type number
 * @min 1
 * @default 5
 * @desc Columns count per page
 * 
 * @param rowsPerPage:i
 * @text Rows
 * @type number
 * @min 1
 * @default 5
 * @desc Rows count per page
 * 
 * @param iconMode:i
 * @text Icon Draw Mode
 * @type select
 * @option Center
 * @value 0
 * @option Stretch
 * @value 1
 * @default 1
 * @desc How icons will draw in cell
 */
/*~struct~LHotCell:
 * @param key:str
 * @text Hot Key
 * @type string
 * @default
 * @desc Keyboard key to use hot cell item
 *
 * @param pos:struct
 * @text Position
 * @type struct<XY2>
 * @default
 * @desc Hot cell position on screen
 */
/*~struct~CText:
 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this text visible?
 * 
 * @param size:struct
 * @text TextBox Size
 * @type struct<WH>
 * @default
 * @desc Size of text zone
 * 
 * @param margins:struct
 * @text Margin
 * @type struct<XY>
 * @default
 * @desc Position of text, relative parent
 * 
 * @param alignment:str
 * @text Alignment
 * @type combo
 * @option center
 * @option right
 * @option left
 * @default center
 * @desc Text alignment
 * 
 * @param outline:struct
 * @text Text Outline
 * @type struct<Outline>
 * @default
 * @desc Text outline settings
 * 
 * @param font:struct
 * @type struct<Font>
 * @text Font Settings
 * @default
 * @desc Text font settings
 * 
 * @param textColor:css
 * @type string
 * @text Text Color
 * @default #FFFFFF
 * @desc Text color in HEX format (#000000)
 * 
 */
/*~struct~XY:
 * @param x:int
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y:int
 * @text Y
 * @type number
 * @default 0
 * @min -1000
 */
/*~struct~XY2:
 * @param x:e
 * @text X
 * @type text
 * @default 0
 * @desc Number or script (example: Graphics.width / 2)
 *
 * @param y:e
 * @text Y
 * @type text
 * @default 0
 * @desc Number or script (example: $gameVariables.value(12) * 2)
 */
/*~struct~WH:
 * @param w:int
 * @text Width
 * @type number
 * @default 100
 * @min 0
 *
 * @param h:int
 * @text Height
 * @type number
 * @default 100
 * @min 0
 */
/*~struct~Font:
 * @param face:str
 * @text Face
 * @type string
 * @default
 *
 * @param size:int
 * @text Size
 * @type number
 * @default 24
 * @min 1
 * 
 * @param italic:bool
 * @text IsItalic
 * @type boolean
 * @default false
 */
/*~struct~Outline:
 * @param color:css
 * @text Color
 * @type text
 * @default #000000
 * @desc Outline color in HEX (#000000) or empty "" (black)
 *
 * @param width:int
 * @text Width
 * @type number
 * @default 3
 * @min 0
 * @desc Outline stroke width in px
 */
/*~struct~LBigInfoPicture:
 * @param imgName
 * @text Image
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Image filename
 * 
 * @param size:struct
 * @text Image Size
 * @type struct<WH>
 * @default
 * @desc Image size
 * 
 * @param position:struct
 * @text Position
 * @type struct<XY2>
 * @default
 * @desc Description image position
 */
/*~struct~LBigInfoText:
 * @param font:struct
 * @type struct<Font>
 * @text Font Settings
 * @default
 * @desc Text font settings
 * 
 * @param text
 * @text Text
 * @type note
 * @default This is \C[3] some example \C[0] description
 * @desc Description text, supports escape-characters and auto words wrapping
 * 
 * @param size:struct
 * @text Window Size
 * @type struct<WH>
 * @default
 * @desc Description text window size
 * 
 * @param position:struct
 * @text Position
 * @type struct<XY2>
 * @default
 * @desc Description text window position
 */
/*~struct~LBigInfoData:
 * @param itemId:int
 * @text Item
 * @type item
 * @default 1
 * @desc The item to be described [Only]
 * 
 * @param weaponId:int
 * @text Weapon
 * @type weapon
 * @default 0
 * @desc The weapon to be described [Only]
 * 
 * @param armorId:int
 * @text Armor
 * @type armor
 * @default 0
 * @desc The armor to be described [Only]
 * 
 * @param picture:struct
 * @text Image
 * @type struct<LBigInfoPicture>
 * @default
 * @desc Image for item description [Optional]
 * 
 * @param info:struct
 * @text Desctiption
 * @type struct<LBigInfoText>
 * @default
 * @desc Description text
*/
/*~struct~LThrowOutSettings:

  * @param margins:struct
  * @text Margin
  * @type struct<XY>
  * @default
  * @desc Position of throw out box relative to Map Invenotry position

    * @param startOpacity:int
    * @type number
    * @min 0
    * @max 255
    * @text Start Opacity
    * @default 125
    * @desc from 0 to 255, 0 - transparent, 255 - opaque
    * 
    * 
    * @param fadeOutSpeed:int
    * @type number
    * @min 1
    * @max 255
    * @text Fade Out Speed
    * @default 5
    * @desc How fast throw out box will be active to throw item (opaque)
    * 
    * 
    * @param throwOutSE
    * @text SE
    * @type file
    * @dir audio/se
    * @require 1
    * @desc Sound effect when item been thowed out
*/
var Imported = Imported || {};
Imported.PKD_MapInventory = true;

var PKD_MI = {};
PKD_MI.LIBS = {};

PKD_MI.register = function (library) {
    this.LIBS[library.name] = library;
};

PKD_MI.warning = function(warnMsg, error) {
    console.warn(warnMsg);
    if (error) {
        console.warn(error);
    }
};

PKD_MI.Version = 200; // 2.0

DataManager._databaseFiles.push({
    name: '$PKD_MapInventorySettings',
    src: 'PKD_MapInventorySettings.json'
});

DataManager._databaseFiles.push({
    name: '$PKD_MapChestSettings',
    src: 'PKD_MapChestSettings.json'
});

DataManager._databaseFiles.push({
    name: '$PKD_UserChestSettings',
    src: 'PKD_UserChestSettings.json'
});

ImageManager.loadPKDMI = function (filename) {
    return this.loadBitmap('img/pMapInventory/', filename, 0, true);
};

ImageManager.loadPKDMI_Icon = function (filename) {
    return this.loadBitmap('img/pMapInventory/icons/', filename, 0, true);
};

// * from ALPHA ABS, NOT ABS MAP
PKD_MI.isMap = function() {
    return false;
};

PKD_MI.getUIMapInventorySettings = function() {
    return $PKD_MapInventorySettings;
};

PKD_MI.getUIMapUserChestSettings = function() {
    return $PKD_UserChestSettings;
};

PKD_MI.getUIMapChestSettings = function () {
    return $PKD_MapChestSettings;
};

// Generated by CoffeeScript 2.5.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 13.04.21
var KDCore;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается
KDCore._fileVersion = '2.5';

if ((KDCore.Version != null) && KDCore.Version > KDCore._fileVersion) {
  // * ПРОПУСКАЕМ ЗАГРУЗКУ, так как уже загруженна более новая
  console.log('XDev KDCore ' + KDCore._fileVersion + ' skipped by new version');
} else {
  KDCore.Version = KDCore._fileVersion;
  KDCore.LIBS = KDCore.LIBS || {};
  KDCore.register = function(library) {
    return this.LIBS[library.name] = library;
  };
  window.KDCore = KDCore;
  console.warn("XDev KDCore is loaded " + KDCore.Version);
  (function() {
    var BitmapSrc, Color, DevLog, Point, SDK, __TMP_LOGS__, ___Sprite_alias_Move_KDCORE_2, __alias_Bitmap_blt_kdCore, __alias_Bitmap_fillAll, i, l, m, o;
    // * Array Extension
    //------------------------------------------------------------------------------
    Array.prototype.delete = function() {
      var L, a, ax, what;
      what = void 0;
      a = arguments;
      L = a.length;
      ax = void 0;
      while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
        }
      }
      return this;
    };
    Array.prototype.max = function() {
      return Math.max.apply(null, this);
    };
    Array.prototype.min = function() {
      return Math.min.apply(null, this);
    };
    Array.prototype.sample = function() {
      if (this.length === 0) {
        return [];
      }
      return this[SDK.rand(0, this.length - 1)];
    };
    Array.prototype.first = function() {
      return this[0];
    };
    Array.prototype.last = function() {
      return this[this.length - 1];
    };
    Array.prototype.shuffle = function() {
      var k, n, v;
      n = this.length;
      while (n > 1) {
        n--;
        k = SDK.rand(0, n + 1);
        v = this[k];
        this[k] = this[n];
        this[n] = v;
      }
    };
    Array.prototype.count = function() {
      return this.length;
    };
    Array.prototype.isEmpty = function() {
      return this.length === 0;
    };
    // * Number Extension
    //------------------------------------------------------------------------------
    Number.prototype.do = function(method) {
      return SDK.times(this, method);
    };
    Number.prototype.clamp = function(min, max) {
      return Math.min(Math.max(this, min), max);
    };
    Number.prototype.any = function(number) {
      return (number != null) && number > 0;
    };
    // * String Extension
    //------------------------------------------------------------------------------
    String.prototype.toCss = function() {
      return KDCore.Color.FromHex(this).CSS;
    };
    String.prototype.toCSS = function() {
      return this.toCss();
    };
    String.prototype.isEmpty = function() {
      return this.length === 0 || !this.trim();
    };
    String.isNullOrEmpty = function(str) {
      return (str == null) || str.isEmpty();
    };
    String.any = function(str) {
      return !String.isNullOrEmpty(str);
    };
    String.prototype.replaceAll = function(search, replacement) {
      var target;
      target = this;
      return target.split(search).join(replacement);
    };
    // * Sprite Extension
    //------------------------------------------------------------------------------
    Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
      return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
    };
    Sprite.prototype.setStaticAnchor = function(floatX = 1, floatY = 1) {
      this.x -= Math.round(this.width * floatX);
      this.y -= Math.round(this.height * floatY);
    };
    Sprite.prototype.moveToParentCenter = function() {
      if (!this.parent) {
        return;
      }
      return this.move(this.parent.width / 2, this.parent.height / 2);
    };
    ___Sprite_alias_Move_KDCORE_2 = Sprite.prototype.move;
    Sprite.prototype.move = function(x, y) {
      if (x instanceof Array) {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x[0], x[1]);
      } else if (x instanceof KDCore.Point || ((x != null ? x.x : void 0) != null)) {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x.x, x.y);
      } else if ((x != null) && (x._x != null)) {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x._x, x._y);
      } else {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x, y);
      }
    };
    Sprite.prototype.isContainsPoint = function(point) {
      var rect, rx, ry;
      if (this.width === 0 || this.height === 0) {
        return false;
      }
      rx = KDCore.SDK.toGlobalCoord(this, 'x');
      ry = KDCore.SDK.toGlobalCoord(this, 'y');
      rect = this._getProperFullRect(rx, ry);
      return rect.contains(point.x, point.y);
    };
    // * Возвращает Rect с учётом Scale и Anchor спрайта
    Sprite.prototype._getProperFullRect = function(rx, ry) {
      var height, width, x, y;
      width = this.width * Math.abs(this.scale.x);
      height = this.height * Math.abs(this.scale.y);
      x = rx - this.anchor.x * width;
      y = ry - this.anchor.y * height;
      if (this.anchor.x === 0 && this.scale.x < 0) {
        x += this.width * this.scale.x;
      }
      if (this.anchor.y === 0 && this.scale.y < 0) {
        y += this.height * this.scale.y;
      }
      return new PIXI.Rectangle(x, y, width, height);
    };
    Sprite.prototype.fillAll = function(color) {
      if (color != null) {
        return this.bitmap.fillAll(color);
      } else {
        return this.fillAll(KDCore.Color.WHITE);
      }
    };
    Sprite.prototype.removeFromParent = function() {
      if (this.parent != null) {
        return this.parent.removeChild(this);
      }
    };
    // * Bitmap Extension
    //------------------------------------------------------------------------------
    __alias_Bitmap_fillAll = Bitmap.prototype.fillAll;
    Bitmap.prototype.fillAll = function(color) {
      if (color instanceof KDCore.Color) {
        return this.fillRect(0, 0, this.width, this.height, color.CSS);
      } else {
        return __alias_Bitmap_fillAll.call(this, color);
      }
    };
    __alias_Bitmap_blt_kdCore = Bitmap.prototype.blt;
    Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
      if (this._needModBltDWH > 0) {
        dh = dw = this._needModBltDWH;
        __alias_Bitmap_blt_kdCore.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
        this._needModBltDWH = null;
      } else {
        __alias_Bitmap_blt_kdCore.call(this, ...arguments);
      }
    };
    Bitmap.prototype.drawIcon = function(x, y, icon, size = 32) {
      var bitmap;
      bitmap = null;
      if (icon instanceof Bitmap) {
        bitmap = icon;
      } else {
        bitmap = BitmapSrc.LoadFromIconIndex(icon).bitmap;
      }
      return this.drawOnMe(bitmap, x, y, size, size);
    };
    Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
      if (sw <= 0) {
        sw = bitmap.width;
      }
      if (sh <= 0) {
        sh = bitmap.height;
      }
      this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
    };
    Bitmap.prototype.drawInMe = function(bitmap) {
      return Bitmap.prototype.drawOnMe(bitmap, 0, 0, this.width, this.height);
    };
    Bitmap.prototype.drawTextFull = function(text, position = 'center') {
      return this.drawText(text, 0, 0, this.width, this.height, position);
    };
    // * Input Extension
    //------------------------------------------------------------------------------

    //TODO: Gamepad support
    Input.KeyMapperPKD = {};
//Numbers
    for (i = l = 48; l <= 57; i = ++l) {
      Input.KeyMapperPKD[i] = String.fromCharCode(i);
    }
//Letters Upper
    for (i = m = 65; m <= 90; i = ++m) {
      Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
    }
//Letters Lower (for key code events)
    for (i = o = 97; o <= 122; i = ++o) {
      Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
    }
    (function() {
      var _input_onKeyDown, _input_onKeyUp;
      
      //@[ALIAS]
      _input_onKeyDown = Input._onKeyDown;
      Input._onKeyDown = function(event) {
        _input_onKeyDown.call(this, event);
        if (Input.keyMapper[event.keyCode]) {
          return;
        }
        Input._setStateWithMapperPKD(event.keyCode);
      };
      //@[ALIAS]
      _input_onKeyUp = Input._onKeyUp;
      Input._onKeyUp = function(event) {
        _input_onKeyUp.call(this, event);
        if (Input.keyMapper[event.keyCode]) {
          return;
        }
        Input._setStateWithMapperPKD(event.keyCode, false);
      };
      //?NEW
      Input._setStateWithMapperPKD = function(keyCode, state = true) {
        var symbol;
        symbol = Input.KeyMapperPKD[keyCode];
        if (symbol != null) {
          return this._currentState[symbol] = state;
        }
      };
      //?NEW
      Input.isCancel = function() {
        return Input.isTriggered('cancel') || TouchInput.isCancelled();
      };
      //?NEW
      TouchInput.toPoint = function() {
        return new KDCore.Point(TouchInput.x, TouchInput.y);
      };
    })();
    // * Window_Base Extension
    //------------------------------------------------------------------------------
    Window_Base.prototype.drawFaceWithCustomSize = function(faceName, faceIndex, x, y, finalSize) {
      this.contents._needModBltDWH = finalSize;
      this.drawFace(faceName, faceIndex, x, y);
    };
    // * SDK
    //------------------------------------------------------------------------------
    SDK = function() {
      throw new Error('This is a static class');
    };
    SDK.rand = function(min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    };
    SDK.setConstantToObject = function(object, constantName, constantValue) {
      object[constantName] = constantValue;
      if (typeof object[constantName] === 'object') {
        Object.freeze(object[constantName]);
      }
      Object.defineProperty(object, constantName, {
        writable: false
      });
    };
    SDK.convertBitmapToBase64Data = function(bitmap) {
      return bitmap._canvas.toDataURL('image/png');
    };
    SDK.times = function(times, method) {
      var results;
      i = 0;
      results = [];
      while (i < times) {
        method(i);
        results.push(i++);
      }
      return results;
    };
    SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
      var node, t;
      t = layer[coordSymbol];
      node = layer;
      while (node) {
        t -= node[coordSymbol];
        node = node.parent;
      }
      return (t * -1) + layer[coordSymbol];
    };
    SDK.canvasToLocalX = function(layer, x) {
      while (layer) {
        x -= layer.x;
        layer = layer.parent;
      }
      return x;
    };
    SDK.canvasToLocalY = function(layer, y) {
      while (layer) {
        y -= layer.y;
        layer = layer.parent;
      }
      return y;
    };
    SDK.isInt = function(n) {
      return Number(n) === n && n % 1 === 0;
    };
    SDK.isFloat = function(n) {
      return Number(n) === n && n % 1 !== 0;
    };
    SDK.checkSwitch = function(switchValue) {
      if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
        return true;
      }
      return false;
    };
    SDK.toNumber = function(string, none = 0) {
      var number;
      if (string == null) {
        return none;
      }
      number = Number(string);
      if (isNaN(number)) {
        return none;
      }
      return number;
    };
    // * Color
    //------------------------------------------------------------------------------
    Color = class Color {
      constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.a = a1;
      }

      getLightestColor(lightLevel) {
        var bf, newColor, p;
        bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
        p = 0;
        newColor = [0, 0, 0, 0];
        if (bf - lightLevel >= 0) {
          if (bf >= 0) {
            p = Math.abs(bf - lightLevel) / lightLevel;
          }
          newColor = this.ARR.map(function(c) {
            return c - (p * c);
          });
        } else {
          if (bf >= 0) {
            p = (lightLevel - bf) / (255 - bf);
          }
          newColor = this.ARR.map(function(c) {
            return [(255 - c) * p + c, 255].min();
          });
        }
        return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
      }

      clone() {
        return this.reAlpha(this.a);
      }

      reAlpha(newAlpha) {
        return new Color(this.r, this.g, this.b, newAlpha || 255);
      }

      static AddConstantColor(name, color) {
        color.toHex();
        color.toArray();
        color.toCSS();
        SDK.setConstantToObject(Color, name, color);
      }

      toHex() {
        var b, g, r;
        if (this._colorHex != null) {
          return this._colorHex;
        }
        r = Math.floor(this.r).toString(16).padZero(2);
        g = Math.floor(this.g).toString(16).padZero(2);
        b = Math.floor(this.b).toString(16).padZero(2);
        return this._colorHex = '#' + r + g + b;
      }

      toArray() {
        if (this._colorArray != null) {
          return this._colorArray;
        }
        return this._colorArray = [this.r, this.g, this.b, this.a];
      }

      toCSS() {
        var na, nb, ng, nr;
        if (this._colorCss != null) {
          return this._colorCss;
        }
        nr = Math.round(this.r);
        ng = Math.round(this.g);
        nb = Math.round(this.b);
        na = this.a / 255;
        return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
      }

      toNumber() {
        return Number(this.toHex().replace("#", "0x"));
      }

      static Random() {
        var a, b, c;
        a = SDK.rand(1, 254);
        b = SDK.rand(1, 254);
        c = SDK.rand(1, 254);
        return new Color(a, b, c, 255);
      }

      static FromHex(hexString) {
        var color, result;
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
        color = null;
        if (result != null) {
          color = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          };
        }
        if (color != null) {
          return new Color(color.r, color.g, color.b, 255);
        } else {
          return Color.NONE;
        }
      }

    };
    Object.defineProperties(Color.prototype, {
      R: {
        get: function() {
          return this.r;
        },
        configurable: true
      },
      G: {
        get: function() {
          return this.g;
        },
        configurable: true
      },
      B: {
        get: function() {
          return this.b;
        },
        configurable: true
      },
      A: {
        get: function() {
          return this.a;
        },
        configurable: true
      },
      ARR: {
        get: function() {
          return this.toArray();
        },
        configurable: true
      },
      CSS: {
        get: function() {
          return this.toCSS();
        },
        configurable: true
      },
      HEX: {
        get: function() {
          return this.toHex();
        },
        configurable: true
      },
      OX: {
        get: function() {
          return this.toNumber();
        },
        configurable: true
      }
    });
    Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));
    Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));
    Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));
    Color.AddConstantColor('RED', new Color(255, 0, 0, 255));
    Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));
    Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));
    Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));
    Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));
    Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));
    Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));
    BitmapSrc = (function() {
      
        //BitmapSrc
      //------------------------------------------------------------------------------
      class BitmapSrc {
        constructor() {
          this.bitmap = null;
        }

        static LoadFromIconIndex(iconIndex) {
          var bs, icon_bitmap, iconset, ph, pw, sx, sy;
          bs = new BitmapSrc();
          if (BitmapSrc.CACHE[iconIndex] == null) {
            iconset = ImageManager.loadSystem('IconSet');
            if (KDCore.isMV()) {
              pw = Window_Base._iconWidth;
              ph = Window_Base._iconHeight;
            } else {
              pw = ImageManager.iconWidth;
              ph = ImageManager.iconHeight;
            }
            sx = iconIndex % 16 * pw;
            sy = Math.floor(iconIndex / 16) * ph;
            icon_bitmap = new Bitmap(pw, ph);
            icon_bitmap.addLoadListener(function() {
              icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
            });
            BitmapSrc.CACHE[iconIndex] = icon_bitmap;
          }
          bs.bitmap = BitmapSrc.CACHE[iconIndex];
          return bs;
        }

        static LoadFromImageFolder(filename) {
          var bs;
          bs = new BitmapSrc();
          bs.bitmap = ImageManager.loadPicture(filename);
          return bs;
        }

        static LoadFromBase64(data, name) {
          var bs;
          bs = new BitmapSrc();
          if (name != null) {
            if (BitmapSrc.CACHE[name] != null) {
              bs.bitmap = BitmapSrc.CACHE[name];
            } else {
              BitmapSrc.CACHE[name] = Bitmap.load(data);
              bs.bitmap = BitmapSrc.CACHE[name];
            }
          } else {
            bs.bitmap = Bitmap.load(data);
          }
          return bs;
        }

        static LoadFromMemory(symbol) {
          var bs;
          bs = new BitmapSrc();
          if (BitmapSrc.CACHE[symbol] != null) {
            bs.bitmap = BitmapSrc.CACHE[symbol];
          } else {
            bs.bitmap = ImageManager.loadEmptyBitmap();
          }
          return bs;
        }

      };

      BitmapSrc.CACHE = {};

      return BitmapSrc;

    }).call(this);
    // * DevLog
    //------------------------------------------------------------------------------
    __TMP_LOGS__ = [];
    DevLog = class DevLog {
      constructor(prefix = "") {
        this.prefix = prefix;
        this._isShow = typeof DEV !== 'undefined';
        this._color = Color.BLACK;
        this._backColor = Color.WHITE;
        __TMP_LOGS__.push(this);
      }

      on() {
        this._isShow = true;
        return this;
      }

      off() {
        this._isShow = false;
        return this;
      }

      applyRandomColors() {
        this.applyRandomWithoutBackgroundColors();
        this.setBackColor(Color.Random());
        return this;
      }

      applyRandomWithoutBackgroundColors() {
        this.setColor(Color.Random());
        return this;
      }

      setColor(color) {
        this._color = color;
        return this;
      }

      setBackColor(backColor) {
        this._backColor = backColor;
        return this;
      }

      applyLibraryColors() {
        this.setColors(new Color(22, 120, 138, 0), Color.BLACK);
        return this;
      }

      setColors(color, backColor) {
        this.setColor(color);
        this.setBackColor(backColor);
        return this;
      }

      applyExtensionColors() {
        this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
        return this;
      }

      applyWarningColors() {
        this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
        return this;
      }

      p(text) {
        if (!this._isShow) {
          return;
        }
        if (text == null) {
          console.log("");
        }
        this._printText(text);
      }

      _printText(text) {
        text = this.prefix + " : " + text;
        if (this._isUsingColor()) {
          return this._printTextWithColors(text);
        } else {
          return console.log(text);
        }
      }

      _isUsingColor() {
        return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
      }

      _printTextWithColors(text) {
        var args;
        args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
        return window.console.log.apply(console, args);
      }

      static CreateForLib(library) {
        var dlog;
        dlog = new DevLog(library.name);
        dlog.applyLibraryColors();
        return dlog;
      }

      static EnableAllLogs() {
        return __TMP_LOGS__.forEach(function(log) {
          return log.on();
        });
      }

    };
    // * ParametersManager
    //------------------------------------------------------------------------------
    PluginManager.getPluginParametersByRoot = function(rootName) {
      var pluginParameters, property;
      for (property in this._parameters) {
        if (this._parameters.hasOwnProperty(property)) {
          pluginParameters = this._parameters[property];
          if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
            return pluginParameters;
          }
        }
      }
      return PluginManager.parameters(rootName);
    };
    PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
      return pluginParameters[key] != null;
    };
    //@[AUTO EXTEND]
    //?[DEPRECATED]
    KDCore.ParametersManager = class ParametersManager {
      constructor(pluginName) {
        this.pluginName = pluginName;
        this._cache = {};
        this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
      }

      isLoaded() {
        return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
      }

      isHasParameter(name) {
        return this._parameters[name] != null;
      }

      getString(name) {
        return this._parameters[name];
      }

      convertField(object, fieldName) {
        var e;
        try {
          object[fieldName] = JSON.parse(object[fieldName] || 'false');
        } catch (error1) {
          e = error1;
          console.error('Error while convert field ' + e.name);
          object[fieldName] = false;
        }
        return object;
      }

      convertImage(object, fieldName) {
        return object[fieldName] = this.loadImage(object[fieldName]);
      }

      loadImage(filename, smooth) {
        var e, path;
        try {
          if (filename) {
            path = filename.split('/');
            filename = path.last();
            path = path.first() + '/';
            return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
          } else {
            return ImageManager.loadEmptyBitmap();
          }
        } catch (error1) {
          e = error1;
          console.error(e);
          return ImageManager.loadEmptyBitmap();
        }
      }

      getFromCacheOrInit(name, func) {
        var object;
        if (!this.isInCache(name)) {
          if (func != null) {
            object = func.call(this);
            this.putInCache(name, object);
          }
        }
        return this.getFromCache(name);
      }

      isInCache(name) {
        return this._cache.hasOwnProperty(name);
      }

      putInCache(name, object) {
        return this._cache[name] = object;
      }

      getFromCache(name) {
        return this._cache[name];
      }

      getNumber(name) {
        var number;
        number = this.getObject(name);
        if (SDK.isInt(number)) {
          return number;
        }
        return 0;
      }

      getObject(name) {
        if (this.isHasParameter(name)) {
          return JSON.parse(this.getString(name) || '{}');
        } else {
          return {};
        }
      }

      getBoolean(name) {
        if (this.isHasParameter(name)) {
          return JSON.parse(this.getString(name) || false);
        } else {
          return false;
        }
      }

      getBooleanFromCacheWithDefault(name, defaultValue) {
        if (this.isHasParameter(name)) {
          return this.getBooleanFromCache(name);
        } else {
          return defaultValue;
        }
      }

      getNumberFromCacheWithDefault(name, defaultValue) {
        if (this.isHasParameter(name)) {
          return this.getNumberFromCache(name);
        } else {
          return defaultValue;
        }
      }

      getStringFromCacheWithDefault(name, defaultValue) {
        if (this.isHasParameter(name)) {
          return this.getStringFromCache(name);
        } else {
          return defaultValue;
        }
      }

      getBooleanFromCache(name) {
        return this.getFromCacheOrInit(name, function() {
          return this.getBoolean(name);
        });
      }

      getNumberFromCache(name) {
        return this.getFromCacheOrInit(name, function() {
          return this.getNumber(name);
        });
      }

      getStringFromCache(name) {
        return this.getFromCacheOrInit(name, function() {
          return this.getString(name);
        });
      }

    };
    // * ParamLoader (ParametersManager alternative)

      //@[AUTO EXTEND]
    KDCore.ParamLoader = class ParamLoader {
      constructor(pluginName) {
        this.pluginName = pluginName;
        this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
        this.params = this.parseParameters(this.paramsRaw);
      }

      parseParameters(paramSet) {
        var clearKey, key, params, typeKey, value;
        params = {};
        for (key in paramSet) {
          value = paramSet[key];
          clearKey = this.parseKey(key);
          typeKey = this.parseKeyType(key);
          params[clearKey] = this.parseParamItem(typeKey, value);
        }
        return params;
      }

      parseKey(keyRaw) {
        return keyRaw.split(":")[0];
      }

      parseKeyType(keyRaw) {
        return keyRaw.split(":")[1];
      }

      // * Проверка, загружены ли параметры плагина
      isLoaded() {
        return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
      }

      // * Имя параметра без ключа
      isHasParameter(paramName) {
        return this.params[paramName] != null;
      }

      
        // * Возвращает значение параметра (def - по умолчанию, если не найден)
      getParam(paramName, def) {
        if (this.isHasParameter(paramName)) {
          return this.params[paramName];
        } else {
          return def;
        }
      }

      // * Данные ключи должны идти после названия параметра через :
      // * Пример: @param ShowDelay:int, @param TestBool:bool
      // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
      parseParamItem(type, item) {
        var e;
        if (type == null) {
          return item;
        }
        try {
          switch (type) {
            case "int":
            case "i":
              return parseInt(item);
            case "intA": // * массив чисел
              if (String.any(item)) {
                return JsonEx.parse(item).map((e) => {
                  return this.parseParamItem("int", e);
                });
              } else {
                return [];
              }
              break;
            case "bool":
            case "b":
            case "e":
              return eval(item);
            case "struct":
            case "s":
              if (String.any(item)) {
                return this.parseParameters(JsonEx.parse(item));
              } else {
                return null;
              }
              break;
            case "structA": // * массив структур
              return JsonEx.parse(item).map((e) => {
                return this.parseParameters(JsonEx.parse(e));
              });
            case "str":
              return item;
            case "strA":
              if (String.any(item)) {
                return JsonEx.parse(item).map((e) => {
                  return this.parseParamItem("str", e);
                });
              } else {
                return [];
              }
              break;
            case "note": // * если несколько строк в тексте
              return JsonEx.parse(item);
            case "css":
              return item.toCss();
            case "color":
              return KDCore.Color.FromHex(item);
            default:
              return item;
          }
        } catch (error1) {
          e = error1;
          console.warn(e);
          return item;
        }
      }

    };
    Point = (function() {
      // * Point
      //------------------------------------------------------------------------------
      class Point {
        constructor(_x = 0, _y = 0) {
          this._x = _x;
          this._y = _y;
        }

        clone() {
          return new Point(this._x, this._y);
        }

        toString() {
          return "[" + this._x + " ; " + this._y + "]";
        }

        isSame(anotherPoint) {
          return this.x === anotherPoint.x && this.y === anotherPoint.y;
        }

        convertToCanvas() {
          return new Point(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
        }

        convertToMap() {
          return new Point($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
        }

        convertToScreen() {
          return new Point(this.screenX(), this.screenY());
        }

        screenX() {
          var t, tw;
          t = $gameMap.adjustX(this._x);
          tw = $gameMap.tileWidth();
          return Math.round(t * tw + tw / 2);
        }

        screenY() {
          var t, th;
          t = $gameMap.adjustY(this._y);
          th = $gameMap.tileHeight();
          return Math.round(t * th + th);
        }

        round() {
          return new Point(Math.round(this._x), Math.round(this._y));
        }

        floor() {
          return new Point(Math.floor(this._x), Math.floor(this._y));
        }

        mapPointOnScreen() {
          var nx, ny;
          nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
          ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
          return new Point(nx, ny);
        }

        multiplyBy(val) {
          return new Point(this._x * val, this._y * val);
        }

        simple() {
          return new PIXI.Point(this.x, this.y);
        }

        delta(point) {
          var dx, dy;
          dx = point.x - this._x;
          dy = point.y - this._y;
          return new KDCore.Point(dx, dy);
        }

        static _getEmpty() {
          if (Point._emptyPoint == null) {
            Point._emptyPoint = new Point(0, 0);
          }
          return Point._emptyPoint;
        }

      };

      Object.defineProperties(Point.prototype, {
        x: {
          get: function() {
            return this._x;
          },
          configurable: true
        },
        y: {
          get: function() {
            return this._y;
          },
          configurable: true
        }
      });

      Object.defineProperties(Point, {
        Empty: {
          get: function() {
            return Point._getEmpty();
          },
          configurable: false
        }
      });

      Array.prototype.toPoint = function() {
        return new Point(this[0], this[1]);
      };

      Sprite.prototype.toPoint = function() {
        return new Point(this.x, this.y);
      };

      Game_CharacterBase.prototype.toPoint = function() {
        return new Point(this.x, this.y);
      };

      return Point;

    }).call(this);
    // * Utils
    //------------------------------------------------------------------------------
    KDCore.Utils = {};
    (function() {
      var _;
      _ = KDCore.Utils;
      _.getJDataById = function(id, source) {
        var d, len, q;
        for (q = 0, len = source.length; q < len; q++) {
          d = source[q];
          if (d.id === id) {
            return d;
          }
        }
        return null;
      };
      _.hasMeta = function(symbol, obj) {
        return (obj.meta != null) && (obj.meta[symbol] != null);
      };
      _.getValueFromMeta = function(symbol, obj) {
        if (!_.hasMeta(symbol, obj)) {
          return null;
        }
        return obj.meta[symbol];
      };
      _.getNumberFromMeta = function(symbol, obj) {
        var value;
        if (!_.hasMeta(symbol, obj)) {
          return null;
        }
        if (obj.meta[symbol] === true) {
          return 0;
        } else {
          value = KDCore.SDK.toNumber(obj.meta[symbol], 0);
        }
        return value;
      };
      _.isSceneMap = function() {
        try {
          return SceneManager._scene instanceof Scene_Map;
        } catch (error1) {
          return false;
        }
      };
      _.isSceneBattle = function() {
        try {
          return SceneManager._scene instanceof Scene_Battle;
        } catch (error1) {
          return false;
        }
      };
      _.getEventCommentValue = function(commentCode, list) {
        var comment, e, item;
        try {
          if (list && list.length > 1) {
            i = 0;
            while (i < list.length) {
              item = list[i++];
              if (!item) {
                continue;
              }
              if (item.code === 108) {
                comment = item.parameters[0];
                if (comment.contains(commentCode)) {
                  return comment;
                }
              }
            }
          }
        } catch (error1) {
          e = error1;
          console.warn(e);
        }
        return null;
      };
      _.getPositionPointFromJSON = function(jsonSettings) {
        return _.convertPositionPointFromJSON(jsonSettings.position);
      };
      _.convertPositionPointFromJSON = function(position) {
        var e, x, y;
        try {
          x = position[0];
          y = position[1];
          if (!KDCore.SDK.isInt(x)) {
            x = eval(x);
          }
          if (!KDCore.SDK.isInt(y)) {
            y = eval(y);
          }
          return new KDCore.Point(x, y);
        } catch (error1) {
          e = error1;
          console.warn('Utils.getPositionPointFromJSON', e);
          return KDCore.Point.Empty;
        }
      };
      _.jsonPos = function(jsonPosition) {
        return _.convertPositionPointFromJSON(jsonPosition);
      };
      _.jsonPosXY = function(jsonPosition) {
        var e, x, y;
        try {
          ({x, y} = jsonPosition);
          return new KDCore.Point(eval(x), eval(y));
        } catch (error1) {
          e = error1;
          console.warn('Utils.jsonPosXY', e);
          return KDCore.Point.Empty;
        }
      };
      _.getVar = function(id) {
        return $gameVariables.value(id);
      };
      _.setVar = function(id, value) {
        return $gameVariables.setValue(id, value);
      };
      _.addToVar = function(id, value) {
        var prevVal;
        prevVal = _.getVar(id);
        return _.setVar(id, prevVal + value);
      };
      _.playSE = function(seFileName, pitch = 100, volume = 100) {
        var sound;
        if (seFileName == null) {
          return;
        }
        if (seFileName === "") {
          return;
        }
        sound = {
          name: seFileName,
          pan: 0,
          pitch: pitch,
          volume: volume
        };
        AudioManager.playStaticSe(sound);
      };
      _.getItemTypeId = function(item) {
        if (DataManager.isWeapon(item)) {
          return 1;
        } else if (DataManager.isArmor(item)) {
          return 2;
        }
        return 0;
      };
      _.getItemByType = function(itemId, typeId) {
        var data;
        data = [$dataItems, $dataWeapons, $dataArmors];
        return data[typeId][itemId];
      };
      _.loadFont = function(name) {
        if (!KDCore.isMZ()) {
          return;
        }
        if (String.isNullOrEmpty(name)) {
          return;
        }
        if (FontManager._states[name] != null) {
          return;
        }
        FontManager.load(name, name + ".ttf");
      };
      _.convertTimeShort = function(seconds) {
        var e;
        try {
          if (seconds > 59) {
            return Math.floor(seconds / 60) + 'm';
          } else {
            return seconds;
          }
        } catch (error1) {
          e = error1;
          console.warn(e);
          return seconds;
        }
      };
      _.isPointInScreen = function(point, margin = 10) {
        var maxH, maxW, screenMargin, x, y;
        ({x, y} = point);
        maxW = Graphics.width;
        maxH = Graphics.height;
        // * Граница от краёв экрана
        screenMargin = margin;
        if (x < screenMargin) {
          return false;
        }
        if (y < screenMargin) {
          return false;
        }
        if (x > (maxW - screenMargin)) {
          return false;
        }
        if (y > (maxH - screenMargin)) {
          return false;
        }
        return true;
      };
      // * Ассинхронная загрузка изображения, возвращает bitmap, когда загружен
      // * Пример использования loadImageAsync(a, b).then(метод)
      // в метод будет передан bitmap первым аргументом
      _.loadImageAsync = async function(folder, filename) {
        var promise;
        promise = new Promise(function(resolve, reject) {
          var b;
          b = ImageManager.loadBitmap("img/" + folder + "/", filename);
          return b.addLoadListener(function() {
            return resolve(b);
          });
        });
        return (await promise);
      };
    })();
    // * TimedUpdate
    //------------------------------------------------------------------------------
    //@[AUTO EXTEND]
    KDCore.TimedUpdate = class TimedUpdate {
      constructor(interval, method1) {
        this.interval = interval;
        this.method = method1;
        this._timer = 0;
        this._once = false;
      }

      update() {
        if (this.interval == null) {
          return;
        }
        if (this._timer++ >= this.interval) {
          this.call();
          this._timer = 0;
          if (this._once === true) {
            return this.stop();
          }
        }
      }

      once() {
        return this._once = true;
      }

      onUpdate(method1) {
        this.method = method1;
      }

      stop() {
        return this.interval = null;
      }

      isAlive() {
        return this.interval != null;
      }

      // * Рандомизировать интервал @interval (-min, +max)
      applyTimeRange(min, max) {
        var value;
        if (!this.isAlive()) {
          return;
        }
        value = SDK.rand(min, max);
        return this.interval += value;
      }

      call() {
        if (this.method != null) {
          return this.method();
        }
      }

    };
    // * Button (Sprite_XButton)
    //------------------------------------------------------------------------------
    //@[AUTO EXTEND]
    //?DEPRECATED
    KDCore.Button = class Button extends Sprite {
      constructor() {
        super();
        this._mouseIn = false;
        this._touching = false;
        this._slowUpdateActive = false;
        this._localMode = false;
        this._images = [];
        this._checkAlpha = false;
        this._textSprite = null;
        this._textPosition = 0;
        this._override = false; // * TouchClick in game messages not work anymore if TRUE
        this._clickHandlers = [];
        this._manualHided = false;
        this._manualDisabled = false;
        this._condition = null; // * Условие для Visible
        this._condition2 = null; // * Условие для Enable \ Disable
        this._disabled = false;
        this._infoData = null;
        this._isNeedShowText = false;
        return;
      }

      isMouseInButton() {
        return this._mouseIn === true;
      }

      isActive() {
        return this.visible === true;
      }

      activateSlowUpdate() {
        return this._slowUpdateActive = true;
      }

      setLocalMode() {
        this._realX = this.x;
        this._realY = this.y;
        return this._localMode = true;
      }

      setAlphaMode() {
        return this._checkAlpha = true;
      }

      // * above, below
      setTextPosition(position) {
        return this._textPosition = position;
      }

      setHelpText(text, size) {
        return this._createText(text, size);
      }

      setInfoData(data) {
        return this._infoData = data;
      }

      setOverrideMode() {
        return this._override = true;
      }

      isOverride() {
        return this._override === true && this.isActive() && this.touchInButton();
      }

      isDisabled() {
        return this._disabled === true;
      }

      isEnabled() {
        return !this.isDisabled();
      }

      isNeedShowText() {
        return this._isNeedShowText === true;
      }

      addClickHandler(method) {
        return this._clickHandlers.push(method);
      }

      clearClickHandlers() {
        return this._clickHandlers = [];
      }

      isLocalMode() {
        return this._localMode === true;
      }

      setCondition(method) {
        return this._condition = method;
      }

      setConditionForDisable(method) {
        return this._condition2 = method;
      }

      getInfoData() {
        return this._infoData;
      }

      simulateClick() { //?NEW
        return this.applyClickedState();
      }

      simulateClickManual() { //?NEW
        this.simulateClick();
        return setTimeout((() => {
          try {
            return this.applyNormalState();
          } catch (error1) {

          }
        }), 50);
      }

      prepare() { //?NEW
        return this.slowUpdate();
      }

      realX() {
        if (this.isLocalMode()) {
          return this._realX;
        } else {
          return this.x;
        }
      }

      realY() {
        if (this.isLocalMode()) {
          return this._realY;
        } else {
          return this.y;
        }
      }

      show() {
        this.visible = true;
        return this._manualHided = false;
      }

      hide() {
        this.visible = false;
        return this._manualHided = true;
      }

      disable() {
        this._disabled = true;
        this._manualDisabled = true;
        this.refreshEnDisState();
        return this._mouseIn = false;
      }

      enable() {
        this._disabled = false;
        this._manualDisabled = false;
        return this.refreshEnDisState();
      }

      update() {
        super.update();
        if (this._destroyed === true) {
          return;
        }
        this.updateMouseClick();
        this.updatePosition();
        if (!this._slowUpdateActive) {
          this.slowUpdate();
        }
        return this.updateComplexTextVisible();
      }

      slowUpdate() {
        if (this._destroyed === true) {
          return;
        }
        this.updateMouseTracking();
        this.updateConditionForVisible();
        return this.updateConditionForEnabling();
      }

      updateMouseTracking() {
        if (!this.isActive()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (this.cursorInButton()) {
          this._onMouseEnter();
          return this._mouseIn = true;
        } else {
          this._onMouseLeave();
          return this._mouseIn = false;
        }
      }

      // * In MZ TouchInput always have X,Y
      cursorInButton() {
        return this.touchInButton();
      }

      xyInButton(x, y) {
        var inRect, rect, rx, ry;
        rx = KDCore.SDK.toGlobalCoord(this, 'x');
        ry = KDCore.SDK.toGlobalCoord(this, 'y');
        rect = new PIXI.Rectangle(rx, ry, this._realWidth(), this._realHeight());
        inRect = rect.contains(x, y);
        if (inRect === true && this._checkAlpha === true) {
          return this._checkAlphaPixel(x - rx, y - ry);
        } else {
          return inRect;
        }
      }

      _realWidth() {
        if (this._hasImage()) {
          return this._mainImage().width;
        } else {
          return this.width;
        }
      }

      _hasImage() {
        return this._mainImage() != null;
      }

      _mainImage() {
        return this._images[0];
      }

      _realHeight() {
        if (this._hasImage()) {
          return this._mainImage().height;
        } else {
          return this.height;
        }
      }

      _checkAlphaPixel(x, y) {
        var pixel;
        pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
        return pixel >= 200;
      }

      _onMouseEnter() {
        if (this._mouseIn === true) {
          return;
        }
        if (!this.isDisabled()) {
          this.applyCoverState();
        }
        this._showText();
        if (this.getInfoData() != null) {
          return this._startComplexTimer();
        }
      }

      _onMouseLeave() {
        if (this._mouseIn === false) {
          return;
        }
        if (!this.isDisabled()) {
          this.applyNormalState();
        }
        this._hideText();
        return this._stopComplexTimer();
      }

      _showText() {
        if (this._textSprite == null) {
          return;
        }
        this._updateTextPosition();
        return this._textSprite.visible = true;
      }

      _hideText() {
        if (this._textSprite == null) {
          return;
        }
        return this._textSprite.visible = false;
      }

      _startComplexTimer() {
        this._stopComplexTimer();
        return this._cTimer = setTimeout((() => {
          if (this._mouseIn === true) {
            return this._isNeedShowText = true;
          }
        }), 1000);
      }

      _stopComplexTimer() {
        if (this._cTimer != null) {
          clearTimeout(this._cTimer);
        }
        return this._isNeedShowText = false;
      }

      updateMouseClick() {
        if (!this.isActive()) {
          this._unTouch();
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (TouchInput.isTriggered() && this.touchInButton()) {
          this._touching = true;
          this.applyClickedState();
        }
        if (this._touching === true) {
          if (TouchInput.isReleased() || !this.touchInButton()) {
            this._unTouch();
            if (TouchInput.isReleased()) {
              return this.callClickHandler();
            }
          }
        }
      }

      _unTouch() {
        this._touching = false;
        if (this.touchInButton()) {
          return this.applyCoverState();
        } else {
          return this.applyNormalState();
        }
      }

      touchInButton() {
        return this.xyInButton(TouchInput.x, TouchInput.y);
      }

      callClickHandler() {
        if (this._clickHandlers.length > 0) {
          return this._clickHandlers.forEach(function(method) {
            return method();
          });
        }
      }

      updatePosition() {
        var p;
        if (!this._localMode) {
          return;
        }
        p = new KDCore.Point(this._realX, this._realY);
        return this.move(p.screenX(), p.screenY());
      }

      updateConditionForVisible() {
        var result;
        if (this._condition == null) {
          return;
        }
        if (this._manualHided === true) {
          return;
        }
        try {
          result = this._condition();
          return this.visible = !result;
        } catch (error1) {
          console.warn('wrong condition in button');
          return this.visible = true;
        }
      }

      updateConditionForEnabling() {
        if (!this._condition2) {
          return;
        }
        if (this._manualDisabled === true) {
          return;
        }
        try {
          this._disabled = this._condition2();
          return this.refreshEnDisState();
        } catch (error1) {
          console.warn('wrong condition in button for enable state');
          return this.disable();
        }
      }

      setButtonImages(img1, img2, img3, img4) {
        if (this._images != null) {
          this._images.forEach(function(img) {
            if (img != null) {
              return img.parent.removeChild(img);
            }
          });
        }
        this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
        this._images.forEach((img) => {
          if (img != null) {
            return this.addChild(img);
          }
        });
        return this.applyNormalState();
      }

      applyNormalState() {
        var ref;
        this.refreshImages();
        return (ref = this._images[0]) != null ? ref.visible = true : void 0;
      }

      refreshImages() {
        return this._images.forEach(function(img) {
          return img != null ? img.visible = false : void 0;
        });
      }

      applyCoverState() {
        this.refreshImages();
        if (this._images[1] != null) {
          return this._images[1].visible = true;
        } else {
          return this.applyNormalState();
        }
      }

      applyClickedState() {
        this.refreshImages();
        if (this._images[2] != null) {
          return this._images[2].visible = true;
        } else {
          return this.applyNormalState();
        }
      }

      _createText(text, size) {
        var h, w;
        if (this._textSprite) {
          this.removeChild(this._textSprite);
        }
        w = Math.round(((size / 10) + 1) * 5 * text.length);
        h = size + 4;
        this._textSprite = new Sprite(new Bitmap(w, h));
        this._textSprite.bitmap.fontSize = size;
        this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
        this._textSprite.visible = false;
        return this.addChild(this._textSprite);
      }

      _updateTextPosition() {
        var nx, ny;
        if (!this._textSprite) {
          return;
        }
        nx = this._realWidth() / 2 - this._textSprite.width / 2;
        if (this._textPosition === 0) {
          ny = -this._textSprite.height;
        } else {
          ny = this._realHeight() + this._textSprite.height / 2;
        }
        return this._textSprite.move(nx, ny);
      }

      applyDisableState() {
        var ref;
        this.refreshImages();
        return (ref = this._images[3]) != null ? ref.visible = true : void 0;
      }

      refreshEnDisState() {
        if (this.isDisabled()) {
          this.applyDisableState();
          return this._hideText();
        } else {
          if (this._mouseIn === false) {
            return this.applyNormalState();
          }
        }
      }

      //else
      //    do @applyCoverState
      updateComplexTextVisible() {}

      applyScale(mod) {
        var img, len, q, ref;
        ref = this._images;
        for (q = 0, len = ref.length; q < len; q++) {
          img = ref[q];
          if (img != null) {
            img.scale.x = mod;
            img.scale.y = mod;
          }
        }
      }

      static FromSet(imgName, sourceFolder = null) {
        var button, getterFunc, img0, img1;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        img0 = getterFunc(imgName + "_00");
        img1 = getterFunc(imgName + "_01");
        button = new KDCore.Button();
        button.setButtonImages(img0, img1, img0, img0);
        return button;
      }

      static FromSetFull(imgName, sourceFolder = null) {
        var button, getterFunc, img0, img1, img2, img3;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        img0 = getterFunc(imgName + "_00");
        img1 = getterFunc(imgName + "_01");
        img2 = getterFunc(imgName + "_02");
        img3 = getterFunc(imgName + "_03");
        button = new KDCore.Button();
        button.setButtonImages(img0, img1, img2, img3);
        return button;
      }

    };
    KDCore.Sprite = (function(superClass) {
      // * Sprite
      //------------------------------------------------------------------------------
      //@[AUTO EXTEND]
      class Sprite extends superClass {
        constructor() {
          super(...arguments);
        }

        b() {
          return this.bitmap;
        }

        clear() {
          return this.bitmap.clear();
        }

        add(child) {
          return this.addChild(child);
        }

        bNew(w, h) {
          if (h == null) {
            h = w;
          }
          return this.bitmap = new Bitmap(w, h);
        }

        bImg(filename, sourceFolder) {
          var getterFunc;
          getterFunc = function(filename) {
            return ImageManager.loadPicture(filename);
          };
          if (sourceFolder != null) {
            getterFunc = function(filename) {
              return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
            };
          }
          return this.bitmap = getterFunc(filename);
        }

        onReady(method) {
          if (method != null) {
            return this.bitmap.addLoadListener(method);
          }
        }

        drawText() {
          return this.bitmap.drawText(...arguments);
        }

        drawTextFull(text, position = "center") {
          if (this.textSettingsPosition != null) {
            position = this.textSettingsPosition;
          }
          return this.bitmap.drawTextFull(text, position);
        }

        //?DEPRECATED
        drawTextWithSettings(text) {
          this.clear();
          this.drawTextFull(text, this.textSettingsPosition);
        }

        //? x, y, icon, size
        drawIcon() {
          return this.bitmap.drawIcon(...arguments);
        }

        moveByJson(settings) {
          var pos;
          pos = KDCore.Utils.getPositionPointFromJSON(settings);
          return this.move(pos.x, pos.y);
        }

        applyTextSettingsByJson(sprite, settings) {
          this.applyTextSettingsByExtraSettings(sprite, settings.text);
        }

        applyTextSettingsByExtraSettings(sprite, s) {
          sprite.move(s.marginX, s.marginY);
          sprite.b().fontSize = s.fontSize;
          sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
          sprite.b().outlineWidth = s.outlineWidth;
          if (s.outlineColor != null) {
            sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
          }
          if (s.fontFace != null) {
            sprite.b().fontFace = s.fontFace;
          }
          sprite.b().fontItalic = s.fontItalic;
          sprite.visible = s.visible;
        }

        isReady() {
          var q, ref;
          if (this.bitmap != null) {
            if (!this.bitmap.isReady()) {
              return false;
            }
          }
          for (i = q = 0, ref = this.children.length; (0 <= ref ? q < ref : q > ref); i = 0 <= ref ? ++q : --q) {
            if (!this.children[i].bitmap.isReady()) {
              return false;
            }
          }
          return true;
        }

        inPosition(point) {
          return this.isContainsPoint(point);
        }

        isUnderMouse() {
          return this.inPosition(TouchInput);
        }

        // * Из параметров плагина
        applyFontParam(font) {
          var b;
          if (font == null) {
            return;
          }
          b = this.b();
          if (font.size != null) {
            b.fontSize = font.size;
          }
          if (!String.isNullOrEmpty(font.face)) {
            b.fontFace = font.face;
          }
          if (font.italic != null) {
            b.fontItalic = font.italic;
          }
        }

        applyOutlineParam(outline) {
          var b;
          if (outline == null) {
            return;
          }
          b = this.b();
          if (outline.width != null) {
            b.outlineWidth = outline.width;
          }
          if (!String.isNullOrEmpty(outline.color)) {
            b.outlineColor = outline.color;
          }
        }

        static FromImg(filename, sourceFolder) {
          var s;
          s = new KDCore.Sprite();
          s.bImg(filename, sourceFolder);
          return s;
        }

        static FromBitmap(w, h) {
          var s;
          s = new KDCore.Sprite();
          s.bNew(w, h);
          return s;
        }

        static FromTextSettings(settings) {
          var s;
          s = KDCore.Sprite.FromBitmap(settings.textBoxWidth, settings.textBoxHeight);
          s.applyTextSettingsByExtraSettings(s, settings);
          s.textSettingsPosition = settings.position;
          return s;
        }

        // * Загрузчик из параметров плагина (безопасный)
        static FromParams(pluginParams) {
          var e, margins, s, size;
          try {
            size = pluginParams.size;
            s = KDCore.Sprite.FromBitmap(size.w, size.h);
            s.textSettingsPosition = pluginParams.alignment;
            margins = pluginParams.margins;
            if (margins != null) {
              s.move(margins.x, margins.y);
            }
            s.applyFontParam(pluginParams.font);
            s.applyOutlineParam(pluginParams.outline);
            if (!String.isNullOrEmpty(pluginParams.textColor)) {
              s.b().textColor = pluginParams.textColor;
            }
            if (pluginParams.visible != null) {
              s.visible = pluginParams.visible;
            }
            return s;
          } catch (error1) {
            e = error1;
            console.warn('Something wrong with Text Settings!', e);
            return KDCore.Sprite.FromBitmap(60, 30);
          }
        }

      };

      return Sprite;

    }).call(this, Sprite);
    // * Button M
    //------------------------------------------------------------------------------
    //@[AUTO EXTEND]
    // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

      // * Принимает название файла изображения кнопки без _00
    // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
    // * _02 - не используются в этом классе

      // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

      // * Если isFull - true, значит нужен _03
    KDCore.ButtonM = class ButtonM extends KDCore.Sprite {
      constructor(filename, isFull = false, sourceFolder = null) {
        super();
        this._bitmaps = [];
        this._disabled = false;
        this._isTriggered = false;
        // * Когда произошло нажатие на кнопку
        this._handler = null;
        this._isCanBeClicked = true;
        this._isManualHoverMode = false;
        this._isManualSelected = false;
        this._loadBitmaps(filename, isFull, sourceFolder);
        this._setImageState(0);
        this._createThread();
      }

      setManualHover() {
        return this._isManualHoverMode = true;
      }

      disableManualHover() {
        return this._isManualHoverMode = false;
      }

      setManualSelected(_isManualSelected) {
        this._isManualSelected = _isManualSelected;
      }

      enableClick() {
        return this._isCanBeClicked = true;
      }

      disableClick() {
        return this._isCanBeClicked = false;
      }

      desaturate() {
        this.filters = [new PIXI.filters.ColorMatrixFilter()];
        this.filters[0].desaturate();
      }

      isMouseIn() {
        if (this._isManualHoverMode === true) {
          return this._isManualSelected;
        } else {
          return this.inPosition(TouchInput);
        }
      }

      isActive() {
        if (this._isCanBeClicked === false) {
          return false;
        }
        if (this.parent != null) {
          return this.parent.visible === true && this.visible === true;
        } else {
          return this.visible === true;
        }
      }

      isDisabled() {
        return this._disabled === true;
      }

      addClickHandler(_handler) {
        this._handler = _handler;
      }

      clearClickHandler() {
        return this._handler = null;
      }

      // * Воспроизводит визуальный эффект нажатия
      simulateClick() {
        if (!this.isActive()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (this.isMouseIn()) {
          return;
        }
        this._startSimulation();
      }

      isEnabled() {
        return !this.isDisabled();
      }

      refreshState(isEnable = true) {
        if (isEnable === true) {
          if (this.isDisabled()) {
            this.enable();
          }
        } else {
          if (this.isEnabled()) {
            this.disable();
          }
        }
      }

      disable() {
        this._disabled = true;
        return this._setImageState(2);
      }

      enable() {
        this._disabled = false;
        return this._setImageState(0);
      }

      click() {
        if (this._handler != null) {
          return this._handler();
        }
      }

      update() {
        super.update();
        return this._updateMain();
      }

    };
    (function() {      
      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ ButtonM Implementation
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var _, alias_SM_isAnyButtonPressed, alias_SM_onMapLoaded;
      //@[DEFINES]
      _ = KDCore.ButtonM.prototype;
      _._loadBitmaps = function(filename, isFull = false, sourceFolder = null) {
        var getterFunc;
        getterFunc = this._getGetter(sourceFolder);
        this._bitmaps.push(getterFunc(filename + '_00'));
        this._bitmaps.push(getterFunc(filename + '_01'));
        if (isFull) {
          this._bitmaps.push(getterFunc(filename + '_03'));
        }
      };
      _._getGetter = function(sourceFolder = null) {
        var getterFunc;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder !== null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
          };
        }
        return getterFunc;
      };
      _._setImageState = function(index = 0) {
        if (this._bitmaps[index] == null) {
          index = 0;
        }
        this.bitmap = this._bitmaps[index];
        this._lastState = index;
      };
      _._createThread = function() {
        this.hoverThread = new KDCore.TimedUpdate(3, this._updateHover.bind(this));
        this.hoverThread.applyTimeRange(-1, 1);
        this.hoverThread.call();
      };
      //?[DYNAMIC]
      _._updateMain = function() {
        this._updateMouseLogic();
        if (!this.isActive()) {
          if (($gameTemp.kdButtonUnderMouse != null) && $gameTemp.kdButtonUnderMouse === this) {
            return $gameTemp.kdButtonUnderMouse = null;
          }
        }
      };
      _._updateMouseLogic = function() {
        this.hoverThread.update();
        return this._updateMouseClick();
      };
      _._updateHover = function() {
        if (!this.isActive()) {
          return;
        }
        // * чтобы эффект нажатия не прекратить
        if (this._isTriggered === true) {
          return;
        }
        if (this.isMouseIn()) {
          if (this._lastState !== 1) {
            if (!this.isDisabled()) {
              this._setImageState(1);
            }
            $gameTemp.kdButtonUnderMouse = this;
          }
        } else {
          if (this._lastState !== 0) {
            if (!this.isDisabled()) {
              this._setImageState(0);
            }
            if ($gameTemp.kdButtonUnderMouse === this) {
              $gameTemp.kdButtonUnderMouse = null;
            }
          } else if ($gameTemp.kdButtonUnderMouse === this) {
            $gameTemp.kdButtonUnderMouse = null;
          }
        }
      };
      _._updateMouseClick = function() {
        if (!this.isActive()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (TouchInput.isTriggered() && this.isMouseIn()) {
          this._isTriggered = true;
          this._setImageState(0);
        }
        if (this._isTriggered === true) {
          if (TouchInput.isReleased()) {
            this._isTriggered = false;
            if (this.isMouseIn()) {
              this.click();
            }
          }
        }
      };
      _._startSimulation = function() {
        this._setImageState(1);
        this._simulateThread = new KDCore.TimedUpdate(10, () => {
          return this._setImageState(0);
        });
        this._simulateThread.once();
        return this._updateMain = this._updateMouseClickSimulated;
      };
      _._updateMouseClickSimulated = function() {
        this._simulateThread.update();
        if (!this._simulateThread.isAlive()) {
          this._simulateThread = null;
          this._updateMain = this._updateMouseLogic;
        }
      };
      // * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте

      //@[ALIAS]
      alias_SM_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
      Scene_Map.prototype.isAnyButtonPressed = function() {
        if ($gameTemp.kdButtonUnderMouse != null) {
          return true;
        } else {
          return alias_SM_isAnyButtonPressed.call(this);
        }
      };
      //@[ALIAS]
      alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
      Scene_Map.prototype.onMapLoaded = function() {
        $gameTemp.kdButtonUnderMouse = null;
        return alias_SM_onMapLoaded.call(this);
      };
    })();
    // ■ END ButtonM Implementation
    //---------------------------------------------------------------------------

      // * Button Mini User - класс с определением файла каждого состояния отдельно
    // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
    // ? states = { main, hover, disabled }
    KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
      constructor() {
        super(...arguments);
      }

      //$[OVER]
      _loadBitmaps(states, isFull = true, sourceFolder = null) {
        var getterFunc;
        getterFunc = this._getGetter(sourceFolder);
        this._bitmaps.push(getterFunc(states.main));
        this._bitmaps.push(getterFunc(states.hover));
        // * Optional 03
        if (String.any(states.disabled)) {
          this._bitmaps.push(getterFunc(states.disabled));
        }
      }

    };
    
    //@[EXTENSION TO GLOBAL]
    //------------------------------------------------------------------------------
    KDCore.SDK = SDK;
    KDCore.Color = Color;
    KDCore.DevLog = DevLog;
    KDCore.Point = Point;
    KDCore.BitmapSrc = BitmapSrc;
    //? SOME KDCORE METHODS
    //--------------------------------------------------------------------------------
    KDCore.isMV = function() {
      return Utils.RPGMAKER_NAME.contains("MV");
    };
    KDCore.isMZ = function() {
      return !KDCore.isMV();
    };
    KDCore.warning = function(msg, error) {
      if (msg != null) {
        console.warn(msg);
      }
      if (error != null) {
        console.warn(error);
      }
    };
    (function() {      //--------------------------------------------------------------------------------
      // Word Wrapping =================================================================
      //--------------------------------------------------------------------------------
      //?NEW
      Window_Base.prototype.drawTextExWithWordWrap = function(text, x, y, width, maxLines) {
        var maxWidth, wrappedText;
        maxWidth = this.contentsWidth();
        wrappedText = Window_Message.prototype.pWordWrap.call(this, text, width || maxWidth, maxLines);
        this.drawTextEx(wrappedText, x, y);
      };
      //?NEW
      Window_Message.prototype.pWordWrap = function(text, maxWidth, maxLines) {
        var j, line, lines, newLines, q, ref, ref1, result, spaceLeft, spaceWidth, u, wordWidth, wordWidthWithSpace, words;
        lines = text.split('\n');
        maxWidth = maxWidth;
        spaceWidth = this.contents.measureTextWidth(' ');
        result = '';
        newLines = 1;
        for (i = q = 0, ref = lines.length; (0 <= ref ? q < ref : q > ref); i = 0 <= ref ? ++q : --q) {
          spaceLeft = maxWidth;
          line = lines[i];
          words = line.split(' ');
          for (j = u = 0, ref1 = words.length; (0 <= ref1 ? u < ref1 : u > ref1); j = 0 <= ref1 ? ++u : --u) {
            wordWidth = this.contents.measureTextWidth(words[j]);
            wordWidthWithSpace = wordWidth + spaceWidth;
            if (j === 0 || wordWidthWithSpace > spaceLeft) {
              if (j > 0) {
                if (maxLines === newLines) {
                  return result;
                }
                result += '\n';
                newLines++;
              }
              result += words[j];
              spaceLeft = maxWidth - wordWidth;
              if (j === 0 && line.match(/\\n\w*\s*<\s*\\n\[\w*\s*\]\s*>*/gi)) {
                spaceLeft += 200;
              }
            } else {
              spaceLeft -= wordWidthWithSpace;
              result += ' ' + words[j];
            }
          }
          if (i < lines.length - 1) {
            result += '\n';
          }
        }
        return result;
      };
    })();
    //--------------------------------------------------------------------------------
    // MV TouchInput Extension =======================================================
    //--------------------------------------------------------------------------------

    // * Для совместимости MV и MZ
    //TouchInput.getMousePosition = -> new KDCore.Point(TouchInput.x, TouchInput.y)
    TouchInput.toMapPoint = function() {
      return this.toPoint().convertToMap();
    };
    //?SMouse better alternative
    (function() {
      var alias_SM_processMapTouch, alias_TIOMM;
      if (KDCore.isMZ()) {
        return;
      }
      
      // * Для ButtonM
      //@[ALIAS]
      alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
      Scene_Map.prototype.processMapTouch = function() {
        if ($gameTemp.kdButtonUnderMouse != null) {

        } else {
          return alias_SM_processMapTouch.call(this);
        }
      };
      //@[ALIAS]
      alias_TIOMM = TouchInput._onMouseMove;
      TouchInput._onMouseMove = function(event) {
        var x, y;
        alias_TIOMM.call(this, event);
        x = Graphics.pageToCanvasX(event.pageX);
        y = Graphics.pageToCanvasY(event.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
          return this._onHover(x, y);
        }
      };
      
      //?NEW, from MZ
      TouchInput._onHover = function(_x, _y) {
        this._x = _x;
        this._y = _y;
      };
    })();
    (function() {      // * VirtualInput для RPG Maker MV
      //$[OVER]
      //TouchInput.getMousePosition = ->
      //    new KDCore.Point(TouchInput._x, TouchInput._y)
      var ALIAS__clear, ALIAS__update, _;
      if (KDCore.isMZ()) {
        return;
      }
      //@[DEFINES]
      _ = Input;
      //@[ALIAS]
      ALIAS__clear = _.clear;
      _.clear = function() {
        ALIAS__clear.call(this);
        return this._virtualButton = null;
      };
      //@[ALIAS]
      ALIAS__update = _.update;
      _.update = function() {
        ALIAS__update.call(this);
        if (this._virtualButton == null) {
          return;
        }
        this._latestButton = this._virtualButton;
        this._pressedTime = 0;
        return this._virtualButton = null;
      };
      _.virtualClick = function(buttonName) {
        return this._virtualButton = buttonName;
      };
    })();
    (function() {      // * Right mouse pressed
      // * Определение когда правая (вторая) кнопка мыши зажата и удерживается
      var ALIAS___onMouseUp, ALIAS___onRightButtonDown, ALIAS__clear, ALIAS__update, _;
      //@[DEFINES]
      _ = TouchInput;
      //@[ALIAS]
      ALIAS__clear = _.clear;
      _.clear = function() {
        ALIAS__clear.call(this);
        this._kdMousePressed2 = false;
        this._kdPressedTime2 = 0;
      };
      //@[ALIAS]
      ALIAS___onRightButtonDown = _._onRightButtonDown;
      _._onRightButtonDown = function(event) {
        var check;
        ALIAS___onRightButtonDown.call(this, event);
        // * Это значит что ALIAS метод прошёл (верные X и Y в Canvas)
        if (KDCore.isMZ()) {
          check = this._newState.cancelled === true;
        } else {
          check = this._events.cancelled === true;
        }
        if (check === true) {
          this._kdMousePressed2 = true;
          this._kdPressedTime2 = 0;
        }
      };
      //@[ALIAS]
      ALIAS___onMouseUp = _._onMouseUp;
      _._onMouseUp = function(event) {
        ALIAS___onMouseUp.call(this, event);
        if (event.button === 2) {
          this._kdMousePressed2 = false;
        }
      };
      //@[ALIAS]
      ALIAS__update = _.update;
      _.update = function() {
        ALIAS__update.call(this);
        if (this.kdIsPressed2()) {
          return this._kdPressedTime2++;
        }
      };
      //?[NEW]
      _.kdIsPressed2 = function() {
        return this._kdMousePressed2 === true;
      };
    })();
  })();
}

// ■ END KDCore.coffee
//---------------------------------------------------------------------------
//? КОНЕЦ KDCORE

// Generated by CoffeeScript 2.5.1
(function() {
  var alias_atbs_input_onKeyDown, alias_atbs_input_onKeyUp, i, j, k, l;
  Input.KeyMapperPKD = {};
//Numbers
  for (i = j = 48; j <= 57; i = ++j) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
//Letters Upper
  for (i = k = 65; k <= 90; i = ++k) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
//Letters Lower (for key code events)
  for (i = l = 97; l <= 122; i = ++l) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
  alias_atbs_input_onKeyDown = Input._onKeyDown;
  Input._onKeyDown = function(event) {
    alias_atbs_input_onKeyDown.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode);
  };
  Input._setStateWithMapperPKD = function(keyCode, state = true) {
    var symbol;
    symbol = Input.KeyMapperPKD[keyCode];
    if (symbol != null) {
      this._currentState[symbol] = state;
    }
  };
  alias_atbs_input_onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function(event) {
    alias_atbs_input_onKeyUp.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode, false);
  };
  Input.isCancel = function() {
    return Input.isTriggered('cancel') || TouchInput.isCancelled();
  };
  Input.KeyMapperPKDUNSAFE = ['q', 'w', 'x', 'z', 'space'];
  Input.convertUnsafeSymbols = function(symbol) {
    if (symbol == null) {
      return '';
    }
    symbol = symbol.toLowerCase();
    if (!Input.KeyMapperPKDUNSAFE.include(symbol)) {
      return symbol;
    }
    if (symbol === 'q') {
      return 'pageup';
    }
    if (symbol === 'w') {
      return 'pagedown';
    }
    if (symbol === 'x') {
      return 'escape';
    }
    if (symbol === 'z') {
      return 'ok';
    }
    if (symbol === 'space') {
      return 'ok';
    }
  };
})();

// Generated by CoffeeScript 2.5.1


(function () {

    window.OpenMapInventory = function () {
        PKD_MI.openInventory();
    };

    window.CloseMapInventory = function () {
        PKD_MI.closeInventory();
    };

    window.OpenOrCloseMapInventory = function () {
        PKD_MI.openOrCloseInventory();
    };

    window.OpenMapUserChest = function () {
        PKD_MI.openUserChest();
    };
    
    window.CloseMapUserChest = function () {
        PKD_MI.closeUserChest();
    };

    window.IsInventoryAllowed = function () {
        return $gamePlayer._absInvOffByUAPI != true;
    };

    //u19
    window.DisableMapInventory = function () {
        $gamePlayer._absInvOffByUAPI = true;
        CloseMapInventory();
    };

    window.EnableMapInventory = function () {
        $gamePlayer._absInvOffByUAPI = null;
    };

    window.ClearAllStoredChests = function () {
        $gamePlayer._aaChestStorages = {};
    };

    window.ClearStoredChestsOnMap = function (mapId) {
        try {
            if (!mapId) {
                mapId = $gameMap.mapId();
                $gamePlayer.aaClearStoredChestOnMap(mapId);
            }
        } catch (e) {
            console.warn(e);
        }
    };

    window.ModifyInventoryMaxWeight = function (value) {
        try {
            if (value > 0)
                $gamePlayer.modifyPlayerStaticWeight(value);
            PKD_MI.refreshInventory();
        } catch (e) {
            console.warn(e);
        }
    };

    //@[ALIAS]
    var _Game_Interpreter_pluginCommand_3434 = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand_3434.call(this, command, args);
        if (command === 'OpenMapInventory') {
            try {
                OpenMapInventory();
            } catch (e) {
                console.warn(e);
            }
        } else if (command === "VisualChest") {
            if (PKD_MI.isPro()) {
                try {
                    this._aaPrepareVisualChest();
                    if (args[0]) {
                        PKD_MI.setChestName(args[0]);
                    }
                    if (args[1]) {
                        MISetIconForChest(args[1]);
                    }
                } catch (e) {
                    PKD_MI.warning('VisualChest plugin command', e);
                }
            }
        } else if (command === "VisualChestStored") {
            if (PKD_MI.isPro()) {
                try {
                    $gameTemp._visualChestRestrictionTypes = [];
                    this._aaPrepareVisualChestStored();
                    if (args[0]) {
                        PKD_MI.setChestName(args[0]);
                    }
                    if (args[1]) {
                        PKD_MI.setChestItemTypeLimit(args[1]);
                    }
                    if (args[2]) {
                        MISetIconForChest(args[2]);
                    }
                } catch (e) {
                    PKD_MI.warning('VisualChestStored plugin command', e);
                }
            }
        } else if (command === "MapUserChest") {
            if (PKD_MI.isPro()) {
                try {
                    this.setWaitMode('chest');
                    PKD_MI.openUserChest();
                } catch (e) {
                    PKD_MI.warning('UserChest plugin command', e);
                }
            } //?UPDX
        } else if (command === "InventoryButton") {
            if (!PKD_MI.isPro()) return;
            switch (args[0]) {
                case "Move":
                    var x = 0;
                    var y = 0;
                    try {
                        x = parseInt(args[1]);
                        y = parseInt(args[2]);
                        $gameSystem.getPKIButtonSettings().position = [x, y];
                    } catch (e) {
                        PKD_MI.warning('InventoryButton Move plugin command', e);
                    }
                    break;
                case "Reset":
                    $gameSystem.pkmiButtonSettings = null;
                    break;
                case "Show":
                    $gameSystem.getPKIButtonSettings().visibility = true;
                    break;
                case "Hide":
                    $gameSystem.getPKIButtonSettings().visibility = false;
                    break;
                case "Disable":
                    $gameSystem.getPKIButtonSettings().disable = true;
                    break;
                case "Enable":
                    $gameSystem.getPKIButtonSettings().disable = false;
                    break;
                default:
                    break;
            }
            PKD_MI.refreshInventoryButton();
        } else if (command === "VisualChestIcon") {
            if (!PKD_MI.isPro()) return;
            MISetIconForChest(args[0]);
        } else if (command === "SetStoredChestLimit") {
            if (!PKD_MI.isPro()) return;
            MISetStoredChestLimit(parseInt(args[0]));
        }
    };

    if(KDCore.isMV()) {
        Window.prototype._setRectPartsGeometry = function(sprite, srect, drect, m) {
            const sx = srect.x;
            const sy = srect.y;
            const sw = srect.width;
            const sh = srect.height;
            const dx = drect.x;
            const dy = drect.y;
            const dw = drect.width;
            const dh = drect.height;
            const smw = sw - m * 2;
            const smh = sh - m * 2;
            const dmw = dw - m * 2;
            const dmh = dh - m * 2;
            const children = sprite.children;
            sprite.setFrame(0, 0, dw, dh);
            sprite.move(dx, dy);
            // corner
            children[0].setFrame(sx, sy, m, m);
            children[1].setFrame(sx + sw - m, sy, m, m);
            children[2].setFrame(sx, sy + sw - m, m, m);
            children[3].setFrame(sx + sw - m, sy + sw - m, m, m);
            children[0].move(0, 0);
            children[1].move(dw - m, 0);
            children[2].move(0, dh - m);
            children[3].move(dw - m, dh - m);
            // edge
            children[4].move(m, 0);
            children[5].move(m, dh - m);
            children[6].move(0, m);
            children[7].move(dw - m, m);
            children[4].setFrame(sx + m, sy, smw, m);
            children[5].setFrame(sx + m, sy + sw - m, smw, m);
            children[6].setFrame(sx, sy + m, m, smh);
            children[7].setFrame(sx + sw - m, sy + m, m, smh);
            children[4].scale.x = dmw / smw;
            children[5].scale.x = dmw / smw;
            children[6].scale.y = dmh / smh;
            children[7].scale.y = dmh / smh;
            // center
            if (children[8]) {
                children[8].setFrame(sx + m, sy + m, smw, smh);
                children[8].move(m, m);
                children[8].scale.x = dmw / smw;
                children[8].scale.y = dmh / smh;
            }
            for (const child of children) {
                child.visible = dw > 0 && dh > 0;
            }
        };
    }

})();
// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_INV_UI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI;
  //?UPDX
  // * Для registerCommand MZ
  _.PluginName = "PKD_MapInventory";
  _.setUI = function(eUI) {
    this.eUI = eUI;
  };
  //UPD20
  _.isProcessEUITouch = function() {
    if (this.eUI == null) {
      return false;
    }
    return this.eUI.visible === true && (this.eUI.isMouseInInventory() || this.eUI.isMouseInIButton());
  };
  _.openInventory = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.openInventory() : void 0;
  };
  //UPD20
  _.hideUI = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.visible = false : void 0;
  };
  //UPD20
  _.showUI = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.visible = true : void 0;
  };
  _.closeInventory = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.closeInventory() : void 0;
  };
  _.openOrCloseInventory = function() {
    if (this.isInventoryOpened()) {
      return this.closeInventory();
    } else {
      return this.openInventory();
    }
  };
  _.isInventoryOpened = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.isInventoryOpen() : void 0;
  };
  _.invShowNextPage = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.showNextInvPage() : void 0;
  };
  _.invShowPrevPage = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.showPrevInvPage() : void 0;
  };
  //UPD20
  _.onInvCellClick = function(index) {
    var ref, ref1;
    if (((ref = this.eUI) != null ? ref.visible : void 0) === true) {
      return (ref1 = this.eUI) != null ? ref1.clickInvItem(index) : void 0;
    }
  };
  _.invShowCategoryItems = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.openCategory(0) : void 0;
  };
  _.invShowCategoryWeapons = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.openCategory(1) : void 0;
  };
  _.invShowCategoryArmors = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.openCategory(2) : void 0;
  };
  _.invShowCategoryKeyItems = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.openCategory(3) : void 0;
  };
  _.refreshInventory = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.refreshInventory() : void 0;
  };
  // * =========================  CHEST ===============================
  _.onChestCellClick = function(index) {
    var ref;
    if (_.isChestIsOpen()) {
      if ((ref = this.eUI) != null) {
        ref.clickChestItem(index);
      }
    } else if (_.isUserChestIsOpen()) {
      this.eUI.clickUserChestItem(index);
    }
  };
  _.openChest = function() {
    var ref;
    if (PKD_MI.isPro()) {
      return (ref = this.eUI) != null ? ref.openMapChest() : void 0;
    }
  };
  _.closeChest = function() {
    var e, ref, ref1, ref2;
    if ((ref = this.eUI) != null) {
      ref.closeMapChest();
    }
    try {
      if (this.isInventoryOpened() && ((ref1 = this.eUI) != null ? ref1.inventory.isSomeItemFocused() : void 0)) {
        return (ref2 = this.eUI) != null ? ref2.inventory.clearFocus() : void 0;
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.setChestName = function(name) {
    return $gameTemp.__aaChestName = name;
  };
  _.setChestLootIcon = function() {
    return $gameTemp.__aaChestIsLoot = true;
  };
  _.resetChestName = function() {
    return $gameTemp.__aaChestName = null;
  };
  _.isChestIsOpen = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.isChestOpen() : void 0;
  };
  _.takeAllFromChest = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.takeAllFromChest() : void 0;
  };
  _.chestShowNextPage = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.showNextChestPage() : void 0;
  };
  _.chestShowPrevPage = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.showPrevChestPage() : void 0;
  };
  // * ========================= USER CHEST ===========================
  _.openUserChest = function() {
    var ref;
    if (!PKD_MI.isPro()) {
      return;
    }
    if (!_.isUserChestIsOpen()) {
      return (ref = this.eUI) != null ? ref.openUserChest() : void 0;
    }
  };
  _.closeUserChest = function() {
    var e, ref, ref1, ref2;
    if ((ref = this.eUI) != null) {
      ref.closeUserChest();
    }
    try {
      if (this.isInventoryOpened() && ((ref1 = this.eUI) != null ? ref1.inventory.isSomeItemFocused() : void 0)) {
        return (ref2 = this.eUI) != null ? ref2.inventory.clearFocus() : void 0;
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.isUserChestIsOpen = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.isUserChestOpen() : void 0;
  };
  _.refreshUserChest = function() {
    var ref;
    if (_.isUserChestIsOpen()) {
      if ((ref = this.eUI) != null) {
        ref.refreshUserChest();
      }
    }
  };
  _.userChestShowCategoryWeapons = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.openUserChestCategory(1) : void 0;
  };
  _.userChestShowCategoryArmors = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.openUserChestCategory(2) : void 0;
  };
  _.userChestShowCategoryItems = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.openUserChestCategory(0) : void 0;
  };
  // * =========================== COMMON =============================
  _.isSomeIsOpen = function() {
    return this.isInventoryOpened() || this.isUserChestIsOpen();
  };
  _.closeSome = function() {
    if (this.isUserChestIsOpen()) {
      this.closeUserChest();
    } else if (this.isInventoryOpened()) {
      this.closeInventory();
    }
  };
  // * ============================ UPDATE 1.1 =========================
  _.onInvCellFocusedClick = function(index) {
    var ref;
    return (ref = this.eUI) != null ? ref.clickInvFocusedItem(index) : void 0;
  };
  _.onInvPartyCellClick = function(actor) {
    var ref;
    return (ref = this.eUI) != null ? ref.clickInvPartyActor(actor) : void 0;
  };
  
  //u20
  _.isPartyInventoryAllowed = function() {
    if (this.IsNETZM()) {
      return false;
    } else {
      return PKD_MI.Parameters.get_MapInventoryAllowPartySelect() === true && PKD_MI.partyGroup().length > 1;
    }
  };
  _.isStoredChestIsOpen = function() {
    if (PKD_MI.Parameters.get_AllowUseStoredChestLikeStorage() === true) {
      return PKD_MI.isChestIsOpen() && $gameTemp.__isStoredVisualChestShouldOpened === true;
    } else {
      return false;
    }
  };
  _.refreshStoredChest = function() {
    var ref;
    if (_.isStoredChestIsOpen()) {
      return (ref = this.eUI) != null ? ref.refreshStoredChest() : void 0;
    }
  };
  // * ============================ UPDATE 1.2 =========================
  //u20
  _.partyGroup = function() {
    if (this.IsNETZM()) {
      return [$gameParty.leader()];
    } else {
      if (PKD_MI.Parameters.get_Allow8()) {
        return $gameParty.allMembers();
      } else {
        return $gameParty.battleMembers();
      }
    }
  };
  _.closeInventoryByClick = function() {
    if (this.eUI == null) {
      return;
    }
    if (this.eUI.inventory == null) {
      return;
    }
    if (this.eUI.inventory.isSomeItemFocused()) {
      return;
    }
    return this.eUI.closeInventory();
  };
  // * ============================ UPDATE 1.3 =========================
  _.onSliderValueChanged = function(valuePercent) {
    return _.eUI.inventory.onSliderValueChanged(valuePercent);
  };
  _.onSliderChestValueChanged = function(valuePercent) {
    var ref;
    if (_.isUserChestIsOpen()) {
      return _.eUI.userChest.onSliderValueChanged(valuePercent);
    } else {
      return (ref = _.eUI.chest) != null ? ref.onSliderValueChanged(valuePercent) : void 0;
    }
  };
  _.onSliderOkClick = function() {
    if (_.isInventoryOpened()) {
      _.eUI.inventory.onSliderOkClick();
    }
  };
  _.onSliderChestOkClick = function() {
    var ref;
    if (_.isUserChestIsOpen()) {
      _.eUI.userChest.onSliderOkClick();
    } else {
      if ((ref = _.eUI.chest) != null) {
        ref.onSliderOkClick();
      }
    }
  };
  _.isUseSlider = function() {
    return PKD_MI.isPro() && PKD_MI.Parameters.get_UseSlider() === true;
  };
  // * ============================ UPDATE 1.4 =========================
  _.requestWeigthNotify = function() {
    var ref, ref1;
    if (this.isInventoryOpened()) {
      return (ref = this.eUI) != null ? (ref1 = ref.inventory) != null ? ref1._executeNoWeightNotify() : void 0 : void 0;
    }
  };
  _.getInventoryScreenButton = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.getMIButton() : void 0;
  };
  _.refreshInventoryButton = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.applyMIButtonSettings() : void 0;
  };
  //?UPDX
  _.registerExtraMethods = function() {
    if (PKD_MI.Parameters.get_IsWSSlowDown() === true) {
      $gamePlayer.refreshInventoryWSpeedDebuff();
      Game_Player.prototype.realMoveSpeed = Game_Player.prototype.invRealMoveSpeed;
    }
    if (PKD_MI.Parameters.get_WSAutoState() <= 0) {
      Game_Party.prototype._refreshInventoryWAutoState = function() {}; // * EMTPY
      Game_Actor.prototype._updateInventoryWeightAutoState = function() {}; // * EMPTY
    }
    if (!PKD_MI.Parameters.isOuterItemsHotKeysEnabled()) {
      Spriteset_InvUI.prototype._updateOuterHotKeys = function() {}; // * EMPTY
    }
    if (PKD_MI.Parameters.isIconImagesInDefaultWindows() && PKD_MI.isPro()) {
      return this.registerDrawImageIconMethods();
    }
  };
  
  // * ============================ UPDATE 1.5 =========================
  _.setChestItemTypeLimit = function(typesRaw) {
    var j, len, t, types;
    $gameTemp._visualChestRestrictionTypesRaw = typesRaw;
    types = typesRaw.split("|");
    for (j = 0, len = types.length; j < len; j++) {
      t = types[j];
      $gameTemp._visualChestRestrictionTypes.push(t);
    }
  };
  _.isHaveSomeTypeLimit = function() {
    var ref;
    if (PKD_MI.isStoredChestIsOpen() && ((ref = $gameTemp._visualChestRestrictionTypes) != null ? ref.length : void 0) > 0) {
      return true;
    }
    return false;
  };
  //?u19
  _.isProperItemForTypeLimit = function(item) {
    var j, len, ref, subType, subTypes;
    if (item == null) {
      return false;
    }
    if (((ref = item.meta) != null ? ref.aItemType : void 0) == null) {
      return false;
    }
    // * multi types
    if (item.meta.aItemType.contains("|")) {
      subTypes = item.meta.aItemType.split("|");
      for (j = 0, len = subTypes.length; j < len; j++) {
        subType = subTypes[j];
        if ($gameTemp._visualChestRestrictionTypes.some(function(t) {
          return t === subType;
        })) {
          return true;
        }
      }
    }
    // * single type
    return $gameTemp._visualChestRestrictionTypes.some(function(t) {
      return t === item.meta.aItemType;
    });
  };
  // * ============================ UPDATE 1.6 =========================

  //?UPDX
  _.startMoveCell = function(item) {
    var ref;
    if (PKD_MI.isPro()) {
      return (ref = this.eUI) != null ? ref.startMoveCellItem(item) : void 0;
    }
  };
  //?UPDX
  _.onMapHotCellClick = function(index) {
    var ref;
    return (ref = this.eUI) != null ? ref.callHotCellItem(index) : void 0;
  };
  // * ============================ UPDATE 1.7 =========================
  _.registerDrawImageIconMethods = function() {
    var _alias_Window_Base_drawIcon, _alias_Window_Base_drawItemName;
    _alias_Window_Base_drawItemName = Window_Base.prototype.drawItemName;
    Window_Base.prototype.drawItemName = function(item, x, y, width) {
      var _iconIndex;
      if (item == null) {
        return;
      }
      if (String.any(DataManager.getItemInvImage(item))) {
        // * field swapping
        _iconIndex = item.iconIndex;
        item.iconIndex = ImageManager.loadPKDMI_Icon(item.iImg);
        _alias_Window_Base_drawItemName.call(this, item, x, y, width);
        item.iconIndex = _iconIndex;
      } else {
        _alias_Window_Base_drawItemName.call(this, item, x, y, width);
      }
    };
    _alias_Window_Base_drawIcon = Window_Base.prototype.drawIcon;
    Window_Base.prototype.drawIcon = function(iconIndex, x, y) {
      if (iconIndex instanceof Bitmap) {
        return this.contents.drawIcon(x, y, iconIndex, 32);
      } else {
        return _alias_Window_Base_drawIcon.call(this, iconIndex, x, y);
      }
    };
  };
  _.isGoldItem = function(item) {
    if (item == null) {
      return false;
    }
    if (PKD_MI.Parameters.getGoldItemId() > 0) {
      return item.id === PKD_MI.Parameters.getGoldItemId();
    } else {
      return false;
    }
  };
  //?UPD18 (all below)
  // * ============================ UPDATE 1.8 =========================
  _.isCellUnderRightClick = function() {
    var cellUnderMouse, openedIntances;
    if (this.eUI == null) {
      //#return true
      return false;
    }
    if (this.eUI.isMouseInInventory()) {
      openedIntances = this.eUI.allOpenedInstances();
      cellUnderMouse = openedIntances.find(function(i) {
        return i.isSomeCellUnderMouse();
      });
      return cellUnderMouse != null;
    }
    return false;
  };
  //return false
  /*if @isInventoryOpened()
      return @eUI?.inventory.isSomeCellUnderMouse()
  else
      return false*/
  _.IsHaveExtraInfo = function(item) {
    return this.GetExtraInfo(item) != null;
  };
  _.GetExtraInfo = function(item) {
    var data, infoItem, j, len, searchField;
    data = PKD_MI.Parameters.getExtraInfoData();
    if (data.length === 0) {
      return null;
    }
    searchField = "itemId";
    if (DataManager.isWeapon(item)) {
      searchField = "weaponId";
    } else if (DataManager.isArmor(item)) {
      searchField = "armorId";
    }
    for (j = 0, len = data.length; j < len; j++) {
      infoItem = data[j];
      if (infoItem[searchField] === item.id) {
        return infoItem;
      }
    }
    return null;
  };
  _.FromImgI = function(filename) {
    return KDCore.Sprite.FromImg(filename, 'pMapInventory');
  };
  //?u19
  // * ============================ UPDATE 1.9 =========================
  _.ApplyPluginsExtensions = function() {
    var __alias_GI_MOG_RP;
    if (Imported.MOG_TreasurePopup === true) {
      __alias_GI_MOG_RP = Game_Interpreter.prototype.checkTreasurePopup;
      return Game_Interpreter.prototype.checkTreasurePopup = function(type) {
        if (this._params != null) {
          return __alias_GI_MOG_RP.call(this, type); // * NOTHING
        } else {

        }
      };
    }
  };
  
  //?u20
  // * ============================ UPDATE 2.0 =========================
  _.GetColorForQuealityLevel = function(qualityLevel) {
    var e, levelData, settings;
    try {
      settings = PKD_MI.getUIMapInventorySettings();
      levelData = settings.QualitySystem.Levels[qualityLevel];
      if (levelData == null) {
        return KDCore.Color.WHITE.CSS;
      }
      return KDCore.Color.FromHex(levelData[1]).CSS;
    } catch (error) {
      e = error;
      console.warn(e);
      return "rgba(255,255,255,1)";
    }
  };
  // * Плагин ANETZ подключён
  _.IsNETZ = function() {
    return Imported.Alpha_NETZ === true;
  };
  // * Сетевая игра
  _.IsNETZM = function() {
    var e;
    try {
      return this.IsNETZ() && window.ANNetwork.isConnected();
    } catch (error) {
      e = error;
      console.warn(e);
      return false;
    }
  };
})();

// ■ END PKD_INV_UI.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
(function() {
  var _addRawItemInPlayerStorage;
  window.AddWeaponInPlayerStorage = function(id, count = 1) {
    var e;
    try {
      return _addRawItemInPlayerStorage(id, $dataWeapons, count);
    } catch (error) {
      e = error;
      return PKD_MI.warning('addWeaponInPlayerStorage', e);
    }
  };
  window.AddItemInPlayerStorage = function(id, count = 1) {
    var e, item;
    try {
      item = $dataItems[id];
      if (item == null) {
        return;
      }
      if (item.itypeId === 1) { // * Только не ключи
        return _addRawItemInPlayerStorage(id, $dataItems, count);
      }
    } catch (error) {
      e = error;
      return PKD_MI.warning('addItemInPlayerStorage', e);
    }
  };
  _addRawItemInPlayerStorage = function(id, data, count = 1) {
    var item;
    item = data[id];
    if ((item != null) && count > 0) {
      $gamePlayer.addPutItemToPlayerChest(item, count);
      PKD_MI.refreshUserChest();
    }
  };
  window.AddArmorInPlayerStorage = function(id, count = 1) {
    var e;
    try {
      return _addRawItemInPlayerStorage(id, $dataArmors, count);
    } catch (error) {
      e = error;
      return PKD_MI.warning('addArmorInPlayerStorage', e);
    }
  };
  window.MoveAllItemsToStorage = function() {
    var e;
    try {
      return $gameParty.moveAllItemsToAAStorage();
    } catch (error) {
      e = error;
      return PKD_MI.warning('moveAllItemsToStorage', e);
    }
  };
  window.MoveEquipedItemsToStorage = function() {
    var e;
    try {
      return $gameParty.moveEquipedItemsToStorage();
    } catch (error) {
      e = error;
      return PKD_MI.warning('moveEquipedItemsToStorage', e);
    }
  };
  window.ClearPlayerStorage = function() {
    var e;
    try {
      $gamePlayer.initAAPlayerChestStorage();
      return PKD_MI.refreshUserChest();
    } catch (error) {
      e = error;
      return PKD_MI.warning('clearPlayerStorage', e);
    }
  };
  window.GetMaxWeight = function() {
    var e;
    try {
      return $gameParty.getMaxWeightCapacity();
    } catch (error) {
      e = error;
      PKD_MI.warning('GetMaxWeight', e);
      return 0;
    }
  };
  window.GetCurrentWeight = function() {
    var e;
    try {
      return $gameParty.getCurrentWeight();
    } catch (error) {
      e = error;
      PKD_MI.warning('GetCurrentWeight', e);
      return 0;
    }
  };
  window.IsOverWeight = function() {
    return GetCurrentWeight() > GetMaxWeight();
  };
  window.RefreshWeightSystem = function() {
    var e;
    try {
      $gameParty._refreshInventoryWAutoState();
      $gamePlayer.refreshInventoryWSpeedDebuff();
      return $gameParty.requestWeightCapacityRefresh();
    } catch (error) {
      e = error;
      return PKD_MI.warning('RefreshWeightSystem', e);
    }
  };
  window.TakeAllFromContainer = function() {
    var e;
    try {
      return PKD_MI.takeAllFromChest();
    } catch (error) {
      e = error;
      PKD_MI.warning('TakeAllFromContainer', e);
    }
  };
  //u19
  window.IsHaveFreeSlotsForItems = function() {
    return $gameParty.isHaveFreeSlotInCategory(0);
  };
  window.IsHaveFreeSlotsForWeapons = function() {
    return $gameParty.isHaveFreeSlotInCategory(1);
  };
  window.IsHaveFreeSlotsForArmors = function() {
    return $gameParty.isHaveFreeSlotInCategory(2);
  };
  window.MISetStoredChestLimit = function(limit) {
    return $gameTemp.__aaVisualChestLimitCount = limit;
  };
  window.MISetIconForChest = function(imageName) {
    return $gameTemp.__nextVisualChestExtraIcon = imageName;
  };
  //u20
  window.HideMapInventoryUI = function() {
    return typeof PKD_MI !== "undefined" && PKD_MI !== null ? PKD_MI.hideUI() : void 0;
  };
  window.ShowMapInventoryUI = function() {
    return typeof PKD_MI !== "undefined" && PKD_MI !== null ? PKD_MI.showUI() : void 0;
  };
})();

//?DEPRECATED, NOT USED!
(function(){
    
    if (KDCore.isMZ()) {

        PluginManager.registerCommand(PKD_MI.PluginName, 'MI_VisualChest', args => {
            try {
                if (PKD_MI.isPro()) {
                    PKD_MI.setChestName(args.name);
                    $gameMap._interpreter._aaPrepareVisualChest();
                    if(String.any(args.image)) {
                        MISetIconForChest(args.image);
                    }
                    // * NO limit for Visual Chest (no stored)
                    $gameTemp.__aaVisualChestLimitCount = null;
                } else {
                    window.alert("Map Inventory: Visual Chests works only in PRO version");
                }
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(PKD_MI.PluginName, 'MI_VisualChestStored', args => {
            try {
                if (PKD_MI.isPro()) {
                    PKD_MI.setChestName(args.name);
                    $gameTemp._visualChestRestrictionTypes = [];
                    $gameMap._interpreter._aaPrepareVisualChestStored();
                    if (args.types && args.types != "")
                        PKD_MI.setChestItemTypeLimit(args.types);
                    if(String.any(args.image)) {
                        MISetIconForChest(args.image);
                    }
                    let limit = parseInt(args.limit);
                    if(limit > 0) {
                        $gameTemp.__aaVisualChestLimitCount = limit;
                    } else {
                        $gameTemp.__aaVisualChestLimitCount = null;
                    }
                } else {
                    window.alert("Map Inventory: Visual Chests works only in PRO version");
                }
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(PKD_MI.PluginName, 'MI_Inventory_State', args => {
            try {
                let state = eval(args.state);
                if(state == true) {
                    EnableMapInventory();
                } else {
                    DisableMapInventory();
                }
            } catch (e) {
                console.warn(e);
            }
        }); 

        PluginManager.registerCommand(PKD_MI.PluginName, 'MI_UserChestOpen', args => {
            try {
                OpenMapUserChest();
            } catch (e) {
                console.warn(e);
            }
        }); 

        PluginManager.registerCommand(PKD_MI.PluginName, 'MI_Button_Move', args => {
            try {
                if (PKD_MI.isPro()) {
                        let x = parseInt(args.X);
                        let y = parseInt(args.Y);
                        $gameSystem.getPKIButtonSettings().position = [x, y];
                        PKD_MI.refreshInventoryButton();
                } else {
                    window.alert("Map Inventory: UI Button works only in PRO version");
                }
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(PKD_MI.PluginName, 'MI_Button_Visibility', args => {
            try {
                if (PKD_MI.isPro()) {
                    let state = eval(args.state);
                    $gameSystem.getPKIButtonSettings().visibility = state;
                    PKD_MI.refreshInventoryButton();
                } else {
                    window.alert("Map Inventory: UI Button works only in PRO version");
                }
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(PKD_MI.PluginName, 'MI_Button_State', args => {
            try {
                if (PKD_MI.isPro()) {
                    let state = eval(args.state);
                    $gameSystem.getPKIButtonSettings().disable = !state;
                    PKD_MI.refreshInventoryButton();
                } else {
                    window.alert("Map Inventory: UI Button works only in PRO version");
                }
            } catch (e) {
                console.warn(e);
            }
        }); 
        
        PluginManager.registerCommand(PKD_MI.PluginName, 'MI_Button_Reset', args => {
            try {
                if (PKD_MI.isPro()) {
                    $gameSystem.pkmiButtonSettings = null;
                    PKD_MI.refreshInventoryButton();
                } else {
                    window.alert("Map Inventory: UI Button works only in PRO version");
                }
            } catch (e) {
                console.warn(e);
            }
        });

    }

})();
// Generated by CoffeeScript 2.5.1
// * Эти вызовы используются вместо команд плагина
(function() {
  window.MIOpenVisualChest = function(name) {
    var e;
    try {
      if (PKD_MI.isPro()) {
        if (name != null) {
          PKD_MI.setChestName(name);
        }
        return $gameMap._interpreter._aaPrepareVisualChest();
      } else {
        return window.alert("Map Inventory: Visual Chests works only in PRO version");
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  window.MIOpenVisualChestStored = function(name, types) {
    var e;
    try {
      if (PKD_MI.isPro()) {
        if (name != null) {
          PKD_MI.setChestName(name);
        }
        $gameTemp._visualChestRestrictionTypes = [];
        $gameMap._interpreter._aaPrepareVisualChestStored();
        if ((types != null) && types !== "") {
          return PKD_MI.setChestItemTypeLimit(types);
        }
      } else {
        return window.alert("Map Inventory: Visual Chests works only in PRO version");
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  window.MIButtonMove = function(x, y) {
    var e;
    try {
      if (PKD_MI.isPro()) {
        $gameSystem.getPKIButtonSettings().position = [x, y];
        return PKD_MI.refreshInventoryButton();
      } else {
        return window.alert("Map Inventory: UI Button works only in PRO version");
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  window.MIButtonVisibility = function(state) {
    var e;
    try {
      if (PKD_MI.isPro()) {
        $gameSystem.getPKIButtonSettings().visibility = state;
        return PKD_MI.refreshInventoryButton();
      } else {
        return window.alert("Map Inventory: UI Button works only in PRO version");
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  window.MIButtonState = function(state) {
    var e;
    try {
      if (PKD_MI.isPro()) {
        $gameSystem.getPKIButtonSettings().disable = !state;
        return PKD_MI.refreshInventoryButton();
      } else {
        return window.alert("Map Inventory: UI Button works only in PRO version");
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  window.MIButtonReset = function() {
    var e;
    try {
      if (PKD_MI.isPro()) {
        $gameSystem.pkmiButtonSettings = null;
        return PKD_MI.refreshInventoryButton();
      } else {
        return window.alert("Map Inventory: UI Button works only in PRO version");
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDataFile, _;
  //@[DEFINES]
  _ = DataManager;
  //UPD20
  //@[ALIAS]
  ALIAS__loadDataFile = _.loadDataFile;
  _.loadDataFile = function(n, s) {
    if (s.contains("Test_") && (s.contains("PKD_MapInventorySettings") || s.contains("PKD_MapChestSettings") || s.contains("PKD_UserChestSettings"))) {
      this.onXhrLoad({
        responseText: "{}",
        status: 100
      }, n, s, "null");
      return;
    }
    ALIAS__loadDataFile.call(this, n, s);
  };
  _.isItemHaveHPEffect = function(item) {
    return _.isItemHaveEffectWithCode(item, 11);
  };
  _.isItemHaveMPEffect = function(item) {
    return _.isItemHaveEffectWithCode(item, 12);
  };
  _.isItemHaveTPEffect = function(item) {
    return _.isItemHaveEffectWithCode(item, 13);
  };
  _.isItemHaveEffectWithCode = function(item, effectCode) {
    return _.isItem(item) && item.effects.some(function(e) {
      return e.code === effectCode;
    });
  };
  _.getItemWeight = function(item) {
    var e, w;
    if (item.weight != null) {
      return item.weight;
    } else {
      w = KDCore.Utils.getValueFromMeta("weight", item);
      if (w == null) {
        if (DataManager.isItem(item) && item.itypeId === 2) {
          item.weight = 0;
        } else {
          item.weight = 1;
        }
      } else {
        try {
          item.weight = Number(w);
        } catch (error) {
          e = error;
          console.warn(e);
          item.weight = 1;
        }
      }
      return _.getItemWeight(item);
    }
  };
  _.getItemInvImage = function(item) {
    var img;
    if (!PKD_MI.isPro()) {
      return null;
    }
    if (item.iImg != null) {
      return item.iImg;
    } else {
      img = KDCore.Utils.getValueFromMeta("iImg", item);
      if (img == null) {
        item.iImg = "";
      } else {
        item.iImg = img;
      }
      return item.iImg;
    }
  };
  _.getItemQualityLevel = function(item) {
    var e, q;
    if (item.qLevel != null) {
      return item.qLevel;
    } else {
      q = KDCore.Utils.getValueFromMeta("itemRare", item);
      if (q == null) {
        item.qLevel = 0;
      } else {
        try {
          item.qLevel = Number(q);
        } catch (error) {
          e = error;
          console.warn(e);
          item.qLevel = 0;
        }
      }
      return _.getItemQualityLevel(item);
    }
  };
  //u19
  _.getMIIItemCategoryIndex = function(item) {
    if (this.isItem(item)) {
      if (item.itypeId === 2) {
        return 3;
      } else {
        return 0;
      }
    } else if (this.isArmor(item)) {
      return 2;
    } else if (this.isWeapon(item)) {
      return 1;
    }
    return -1;
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__refresh, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    $gameParty.requestWeightCapacityRefresh();
    $gamePlayer.refreshInventoryWSpeedDebuff();
    return this._updateInventoryWeightAutoState();
  };
  _._updateInventoryWeightAutoState = function() {
    var stateId;
    if (!PKD_MI.isPro()) {
      return;
    }
    stateId = PKD_MI.Parameters.get_WSAutoState();
    if (stateId <= 0) {
      return;
    }
    if (IsOverWeight()) {
      return this.addState(stateId);
    } else {
      return this.removeState(stateId);
    }
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__command125, ALIAS__command126, ALIAS__command127, ALIAS__command128, ALIAS__command129, ALIAS__updateWaitMode, _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  //@[ALIAS]
  ALIAS__command125 = _.command125;
  _.command125 = function(params) {
    var value;
    if (this.isAAVisualChest()) {
      if (this._isAAStoredChest === false) {
        if (this._params == null) {
          this._params = params; // * MV PATCH
        }
        if (this._chestItemChance !== 1 && this._chestItemChance < Math.random()) {

        } else {
          // * NOTHING
          value = this.operateValue(this._params[0], this._params[1], this._params[2]);
          // * Если предмет для золота задан, то будет визуально
          if (PKD_MI.Parameters.getGoldItemId() > 0) {
            // * Если значение больше 0, но золота ещё не было, то создаём предмет золота
            if (value > 0 && $gameTemp.__visualChestGoldCount === 0) {
              $gameTemp.__aaItemsForChest.push([$dataItems[PKD_MI.Parameters.getGoldItemId()], 1]);
            }
            $gameTemp.__visualChestGoldCount += value; // * Иначе просто даём золото группе
          } else {
            $gameParty.gainGold(value);
          }
        }
      }
      this._params = null;
      this._chestItemChance = 1;
      return this._checkNextAAVisualChestCommand();
    } else {
      return ALIAS__command125.call(this, params);
    }
  };
  
  //@[ALIAS]
  ALIAS__command126 = _.command126;
  _.command126 = function(params) {
    var value;
    if (this.isAAVisualChest()) {
      if (this._isAAStoredChest === false) {
        if (this._params == null) {
          this._params = params; // * MV PATCH
        }
        if (this._chestItemChance !== 1 && this._chestItemChance < Math.random()) {

        } else {
          // * NOTHING
          value = Math.abs(this.operateValue(this._params[1], this._params[2], this._params[3]));
          $gameTemp.__aaItemsForChest.push([$dataItems[this._params[0]], value]);
        }
      }
      this._params = null;
      this._chestItemChance = 1;
      return this._checkNextAAVisualChestCommand();
    } else {
      return ALIAS__command126.call(this, params);
    }
  };
  //@[ALIAS]
  ALIAS__command127 = _.command127;
  _.command127 = function(params) {
    var value;
    if (this.isAAVisualChest()) {
      if (this._isAAStoredChest === false) {
        if (this._params == null) {
          this._params = params; // * MV PATCH
        }
        if (this._chestItemChance !== 1 && this._chestItemChance < Math.random()) {

        } else {
          // * NOTHING
          value = Math.abs(this.operateValue(this._params[1], this._params[2], this._params[3]));
          $gameTemp.__aaItemsForChest.push([$dataWeapons[this._params[0]], value]);
        }
      }
      this._params = null;
      this._chestItemChance = 1;
      return this._checkNextAAVisualChestCommand();
    } else {
      return ALIAS__command127.call(this, params);
    }
  };
  
  //@[ALIAS]
  ALIAS__command128 = _.command128;
  _.command128 = function(params) {
    var value;
    if (this.isAAVisualChest()) {
      if (this._isAAStoredChest === false) {
        if (this._params == null) {
          this._params = params; // * MV PATCH
        }
        if (this._chestItemChance !== 1 && this._chestItemChance < Math.random()) {

        } else {
          // * NOTHING
          value = Math.abs(this.operateValue(this._params[1], this._params[2], this._params[3]));
          $gameTemp.__aaItemsForChest.push([$dataArmors[this._params[0]], value]);
        }
      }
      this._params = null;
      this._chestItemChance = 1;
      return this._checkNextAAVisualChestCommand();
    } else {
      return ALIAS__command128.call(this, params);
    }
  };
  _.isAAVisualChest = function() {
    return this._isAAChestMode === true;
  };
  _._checkNextAAVisualChestCommand = function() {
    if (!this._isNextCommandForChest()) {
      this._index++; // * Переходим к следующей команде
      this._aaShowVisualChest();
      return false;
    }
    return true;
  };
  _._aaShowVisualChest = function() {
    this.setWaitMode('chest');
    PKD_MI.openChest();
    return this._isAAChestMode = false;
  };
  _._aaPrepareVisualChest = function() {
    this._chestItemChance = 1;
    $gameTemp.__visualChestGoldCell = null;
    $gameTemp.__visualChestGoldCount = 0;
    $gameTemp.__isStoredVisualChestShouldOpened = false;
    this._isAAStoredChest = false;
    $gameTemp.__aaItemsForChest = [];
    if (this._isNextCommandForChest()) {
      return this._isAAChestMode = true;
    }
  };
  _._aaPrepareVisualChestStored = function() {
    var chestData;
    this._aaPrepareVisualChest();
    if (this._isAAChestMode === true || !this._isNextCommandForChest()) {
      $gameTemp.__isStoredVisualChestShouldOpened = true;
      $gameTemp.__storedVisualChestId = [$gameMap.mapId(), this.eventId()];
      chestData = $gamePlayer.getItemsForStoredChest($gameMap.mapId(), this.eventId());
      this._isAAStoredChest = chestData != null;
      if (this._isAAStoredChest === true) {
        $gameTemp.__aaItemsForChest = chestData.getAllItems();
      }
      this._isAAChestMode = true;
      if (!this._isNextCommandForChest()) {
        return this._aaShowVisualChest();
      }
    }
  };
  // * Параметы команды плагина тоже имеет свою команду
  _._isNextCommandForChest = function() {
    return [125, 126, 127, 128].contains(this.nextEventCodeWithoutArgs());
  };
  _.nextEventCodeWithoutArgs = function() {
    var command, i;
    i = 1;
    command = this._list[this._index + i];
    while ((command != null) && (command.code === 657 || command.code === 108)) {
      if (command.code === 108) {
        if (this._isAAStoredChest === false) {
          this.checkChestChanceItem();
        }
      }
      command = this._list[this._index + ++i];
    }
    if (command != null) {
      return command.code;
    } else {
      return 0;
    }
  };
  _.checkChestChanceItem = function() {
    var command, e, value;
    command = this._list[this._index + 1];
    try {
      if (command.parameters[0].contains("chance")) {
        value = command.parameters[0].split(":")[1];
        this._chestItemChance = parseInt(value) / 100;
      }
    } catch (error) {
      e = error;
      console.warn(e);
      this._chestItemChance = 1;
    }
  };
  //@[ALIAS]
  ALIAS__updateWaitMode = _.updateWaitMode;
  _.updateWaitMode = function() {
    if (this._waitMode === 'chest') {
      return this._aaUpdateChestWait();
    } else {
      return ALIAS__updateWaitMode.call(this);
    }
  };
  _._aaUpdateChestWait = function() {
    var waiting;
    waiting = PKD_MI.isChestIsOpen() || PKD_MI.isUserChestIsOpen();
    if (!waiting) {
      this._waitMode = '';
    }
    return waiting;
  };
  
  //@[ALIAS]
  // * Change Party member
  ALIAS__command129 = _.command129;
  _.command129 = function(params) {
    var r, shouldOpen;
    shouldOpen = PKD_MI.isInventoryOpened();
    PKD_MI.closeInventory();
    r = ALIAS__command129.call(this, params);
    if (shouldOpen === true) {
      PKD_MI.openInventory();
    }
    return r;
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__gainItem, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //u19
  //@[ALIAS]
  ALIAS__gainItem = _.gainItem;
  _.gainItem = function(item, amount, includeEquip) {
    if (PKD_MI.Parameters.isCellLockSystemAllowed()) {
      // * Если выключен игнор стандартной команды, то идёт проверка на свободные ячейки тоже
      if (!PKD_MI.Parameters.isIgnoreLimitByGainItem()) {
        if (!this.isCanAddNewItem(item)) {
          return;
        }
      }
    }
    ALIAS__gainItem.call(this, ...arguments);
    PKD_MI.refreshInventory();
  };
  
  //u19
  _.moveAllItemsToAAStorage = function() {
    var count, item, items, j, len;
    items = this.getInventoryNoKeyItems(); //line
    for (j = 0, len = items.length; j < len; j++) {
      item = items[j];
      count = this.numItems(item);
      $gameParty.gainItem(item, -count);
      $gamePlayer.addPutItemToPlayerChest(item, count);
    }
    PKD_MI.refreshUserChest();
  };
  //u19
  _.getInventoryNoKeyItems = function() {
    return this.items().filter(function(item) {
      return item.itypeId === 1;
    });
  };
  //u19
  _.getInventoryWeapons = function(includeEquipped) {
    var weapons;
    weapons = $gameParty.weapons();
    if (includeEquipped === true) {
      weapons = weapons.concat($gameParty.getAllEquippedItems(DataManager.isWeapon));
    }
    return weapons;
  };
  //u19
  _.getInventoryArmors = function(includeEquipped) {
    var armors;
    armors = $gameParty.armors();
    if (includeEquipped === true) {
      armors = armors.concat($gameParty.getAllEquippedItems(DataManager.isArmor));
    }
    return armors;
  };
  //u19
  _.getInventoryKeyItems = function() {
    return this.items().filter(function(i) {
      return i.itypeId === 2;
    });
  };
  _.moveEquipedItemsToStorage = function() {
    var item, j, len, pl, ref;
    pl = this.leader();
    if (pl == null) {
      return;
    }
    ref = pl.equips();
    for (j = 0, len = ref.length; j < len; j++) {
      item = ref[j];
      if (item == null) {
        continue;
      }
      $gamePlayer.addPutItemToPlayerChest(item, 1);
      pl.discardEquip(item);
      $gameParty.gainItem(item, -1);
    }
    PKD_MI.refreshUserChest();
  };
  _.getAllEquippedItems = function(itemTypeMethod) {
    var actor, equiped, items, j, len, ref;
    equiped = [];
    ref = PKD_MI.partyGroup();
    for (j = 0, len = ref.length; j < len; j++) {
      actor = ref[j];
      items = actor.equips().filter(function(i) {
        return (i != null) && itemTypeMethod(i);
      });
      equiped.push(...items);
    }
    return equiped;
  };
  _.canAnyEquip = function(item) {
    var actor, j, len, ref;
    ref = PKD_MI.partyGroup();
    for (j = 0, len = ref.length; j < len; j++) {
      actor = ref[j];
      if (actor.canEquip(item)) {
        return true;
      }
    }
    return false;
  };
  //u20
  _.getMaxWeightCapacity = function() {
    return $gameTemp._miMaxWeightCapacity || 0;
  };
  //u20
  _.refreshMaxWeightCapacity = function() {
    var varValue;
    "ZEZE".p();
    varValue = KDCore.Utils.getVar(PKD_MI.Parameters.get_partyMaxWeighVar());
    varValue += this._collectWeightCapacityFromEquipment();
    varValue += $gamePlayer.getPlayerStaticWeight();
    $gameTemp._miMaxWeightCapacity = varValue;
  };
  _.isShouldRefreshWeightCapacity = function() {
    return !(this._isRefreshedCapacity != null);
  };
  _.requestWeightCapacityRefresh = function() {
    return this._isRefreshedCapacity = null;
  };
  _.getCurrentWeight = function() {
    var f, items, w;
    items = this.allItems();
    f = function(a, b) {
      return a + (DataManager.getItemWeight(b) * $gameParty.numItems(b));
    };
    w = items.reduce(f, 0);
    return w;
  };
  _._collectWeightCapacityFromEquipment = function() {
    var actor, e, item, j, k, len, len1, ref, ref1;
    if (this.isShouldRefreshWeightCapacity()) {
      this._lastCapacityValue = 0;
      ref = PKD_MI.partyGroup();
      for (j = 0, len = ref.length; j < len; j++) {
        actor = ref[j];
        if (actor == null) {
          continue;
        }
        ref1 = actor.equips();
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          item = ref1[k];
          if (item == null) {
            continue;
          }
          try {
            if ((item.meta != null) && (item.meta.weightStore != null)) {
              this._lastCapacityValue += parseInt(item.meta.weightStore);
            }
          } catch (error) {
            e = error;
            PKD_MI.warning(e);
          }
        }
      }
      this._isRefreshedCapacity = true;
      this._refreshInventoryWAutoState();
    }
    return this._lastCapacityValue;
  };
  _._refreshInventoryWAutoState = function() {
    var actor, j, len, ref;
    if (!PKD_MI.isPro()) {
      return;
    }
    ref = PKD_MI.partyGroup();
    for (j = 0, len = ref.length; j < len; j++) {
      actor = ref[j];
      if (actor == null) {
        continue;
      }
      actor._updateInventoryWeightAutoState();
    }
  };
  //u19
  // * Можно ли добавить предмет в инвентарь (с учётом открытых ячеек)
  _.isCanAddNewItem = function(item) {
    var catIndex, e;
    try {
      if (!PKD_MI.isPro()) {
        return true;
      }
      if (!PKD_MI.Parameters.isCellLockSystemAllowed()) {
        return true;
      }
      if (this.numItems(item) > 0) {
        // * If player already have item, we can add to same slot
        return true;
      }
      catIndex = DataManager.getMIIItemCategoryIndex(item);
      return this.isHaveFreeSlotInCategory(catIndex);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //u19
  _.isHaveFreeSlotInCategory = function(catIndex) {
    var itemsCount;
    if (catIndex == null) {
      return true;
    }
    if (catIndex < 0) {
      return true;
    }
    if (catIndex === 3) {
      // * Key items allowed always
      return true;
    }
    itemsCount = this.getAllItemsByMICategory(catIndex, true).length;
    return $gamePlayer.getMapInventoryUnlockedCount(catIndex) > itemsCount;
  };
  //u19
  _.getAllItemsByMICategory = function(catIndex, includeEquipped = false) {
    switch (catIndex) {
      case 0:
        return this.getInventoryNoKeyItems();
      case 1:
        return this.getInventoryWeapons(includeEquipped);
      case 2:
        return this.getInventoryArmors(includeEquipped);
      case 3:
        return this.getInventoryKeyItems();
    }
    return [];
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__moveByInput, ALIAS__realMoveSpeed, ALIAS__refresh, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  
  //@[ALIAS]
  ALIAS__moveByInput = _.moveByInput;
  _.moveByInput = function() {
    var key;
    key = PKD_MI.Parameters.get_InventoryOpenKey();
    if (Input.isTriggered(key)) {
      if (PKD_MI.isChestIsOpen()) {
        this.onPKDInventoryKey();
      } else {
        if (this.canMove()) {
          this.onPKDInventoryKey();
        }
      }
    }
    return ALIAS__moveByInput.call(this);
  };
  _.onPKDInventoryKey = function() {
    if (!this.isPKDInventoryAllowed()) {
      return;
    }
    return PKD_MI.openOrCloseInventory();
  };
  _.isPKDInventoryAllowed = function() {
    return this._absInvOffByUAPI == null;
  };
  // =========================================================================

  //?UPDX
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    this.initAAChestStorage();
    this.initAAPlayerChestStorage();
    return this.initAAHotCells(); //?line
  };
  _.initAAChestStorage = function() {
    return this._aaChestStorages = {};
  };
  _.initAAPlayerChestStorage = function() {
    return this._aaUserChestStorage = [];
  };
  _.getPlayerStaticWeight = function() {
    if (this._staticPSW == null) {
      this._staticPSW = 0;
    }
    return this._staticPSW;
  };
  _.modifyPlayerStaticWeight = function(value) {
    this.getPlayerStaticWeight();
    this._staticPSW += value;
  };
  _.aaRegisterStoredChest = function(mapId, eventId, storeItems) {
    if (this._aaChestStorages == null) {
      this.initAAChestStorage();
    }
    if (this._aaChestStorages[mapId] == null) {
      this._aaChestStorages[mapId] = {};
    }
    return this._aaChestStorages[mapId][eventId] = storeItems.items;
  };
  _.getItemsForStoredChest = function(mapId, eventId) {
    var itemsRaw;
    if (this._aaChestStorages == null) {
      this.initAAChestStorage();
    }
    if (this._aaChestStorages[mapId] != null) {
      if (this._aaChestStorages[mapId][eventId] != null) {
        itemsRaw = this._aaChestStorages[mapId][eventId];
        return PKD_MI.LIBS.CStoredItems.FromRawItems(itemsRaw);
      }
    }
    return null;
  };
  _.aaClearStoredChestOnMap = function(mapId) {
    if (this._aaChestStorages == null) {
      this.initAAChestStorage();
    }
    if (this._aaChestStorages[mapId] != null) {
      this._aaChestStorages[mapId] = {};
      delete this._aaChestStorages[mapId];
    }
  };
  _.aaGetPlayerChestStoredItems = function() {
    var sStored;
    if (this._aaUserChestStorage == null) {
      this.initAAPlayerChestStorage();
    }
    sStored = this.__getConvertedStoredItems();
    return sStored;
  };
  _.__getConvertedStoredItems = function() {
    return PKD_MI.LIBS.CStoredItems.FromRawItems(this._aaUserChestStorage);
  };
  _.addPutItemToPlayerChest = function(item, count) {
    var sStored;
    if (this._aaUserChestStorage == null) {
      this.initAAPlayerChestStorage();
    }
    sStored = this.__getConvertedStoredItems();
    sStored.putItem(item, count);
    PKD_MI.refreshUserChest();
  };
  _.removeItemFromChestStorage = function(item, count) {
    var sStored;
    if (this._aaUserChestStorage == null) {
      this.initAAPlayerChestStorage();
    }
    sStored = this.__getConvertedStoredItems();
    sStored.removeItem(item, count);
    this._aaUserChestStorage = sStored.items;
    PKD_MI.refreshUserChest();
  };
  _.removeFullTypeFromChestStorage = function(typeId) {
    var sStored;
    if (this._aaUserChestStorage == null) {
      this.initAAPlayerChestStorage();
    }
    sStored = this.__getConvertedStoredItems();
    sStored.removeType(typeId);
    this._aaUserChestStorage = sStored.items;
    PKD_MI.refreshUserChest();
  };
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshInventoryWSpeedDebuff();
  };
  _.refreshInventoryWSpeedDebuff = function() {
    this._miwsdb = 0;
    if (!PKD_MI.isPro()) {
      return;
    }
    if (IsOverWeight()) {
      return this._miwsdb = 1;
    }
  };
  //@[ALIAS]
  ALIAS__realMoveSpeed = _.realMoveSpeed;
  _.invRealMoveSpeed = function() {
    var speed;
    speed = ALIAS__realMoveSpeed.call(this);
    speed -= this._miwsdb;
    return speed;
  };
  // ========================== UPDATE 1.6 ===============================

  //?UPDX
  _.aaGetPlayerHotCellsData = function() {
    if (this._aaUserHotCellsData == null) {
      this.initAAHotCells();
    }
    return this._aaUserHotCellsData;
  };
  //?UPDX
  _.initAAHotCells = function() {
    return this._aaUserHotCellsData = [];
  };
  //*Nullable
  //?UPDX
  _.aaPutItemToHotCell = function(item, cellIndex) {
    var typeId;
    if (item != null) {
      typeId = KDCore.Utils.getItemTypeId(item);
      this._aaUserHotCellsData[cellIndex] = [item.id, typeId];
    } else {
      this._aaUserHotCellsData[cellIndex] = null;
    }
  };
  //?UPDX
  _.addGetItemForHotCell = function(cellIndex) {
    var e, item, itemData;
    itemData = this._aaUserHotCellsData[cellIndex];
    if (itemData != null) {
      try {
        item = KDCore.Utils.getItemByType(...itemData);
        return item;
      } catch (error) {
        e = error;
        console.warning(e);
        return null;
      }
    }
    return null;
  };
  //?UPD18 (ALL BELOW)
  // ========================== UPDATE 1.8 ===============================

  //TODO: Магазин?
  //u19
  _.getMapInventoryUnlockedCount = function(categoryIndex) {
    var db;
    db = this.miGetLockSystem();
    return db[categoryIndex];
  };
  //u19
  _.miGetLockSystem = function() {
    var i, j, len, v, values;
    values = [PKD_MI.Parameters.getCellLockVariableForItems(), PKD_MI.Parameters.getCellLockVariableForWeapons(), PKD_MI.Parameters.getCellLockVariableForArmors()];
    for (i = j = 0, len = values.length; j < len; i = ++j) {
      v = values[i];
      values[i] = $gameVariables.value(v);
    }
    return values;
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_System.prototype;
  _.initMapInventoryScreenButtonData = function() {
    if (this.pkmiButtonSettings != null) {
      return;
    }
    return this.pkmiButtonSettings = {
      "position": null,
      "visibility": true,
      "disable": false
    };
  };
  _.getPKIButtonSettings = function() {
    this.initMapInventoryScreenButtonData();
    return this.pkmiButtonSettings;
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__drawItemName, ALIAS__resetTextColor, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__drawItemName = _.drawItemName;
  _.drawItemName = function(item, x, y, width) {
    var color, qualityLevel;
    this.__pkdMiRequestedSpecialColor = null;
    if (!PKD_MI.Parameters.isShowItemNameWithQualityColorInWindows()) {
      return;
    }
    if (item != null) {
      qualityLevel = DataManager.getItemQualityLevel(item);
      if (qualityLevel >= 0) {
        color = PKD_MI.GetColorForQuealityLevel(qualityLevel);
        this.__pkdMiRequestedSpecialColor = color;
      }
    }
    ALIAS__drawItemName.call(this, item, x, y, width);
  };
  //@[ALIAS]
  ALIAS__resetTextColor = _.resetTextColor;
  _.resetTextColor = function() {
    ALIAS__resetTextColor.call(this);
    if (this.__pkdMiRequestedSpecialColor != null) {
      this.changeTextColor(this.__pkdMiRequestedSpecialColor);
      this.__pkdMiRequestedSpecialColor = null;
    }
  };
})();

// ■ END Window_Base.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ CStoredItems.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var CStoredItems;
  CStoredItems = class CStoredItems {
    constructor() {
      this.items = [];
    }

    putItem(item, count) {
      var exI, existsIndex, typeId;
      typeId = this._getItemTypeId(item);
      existsIndex = this._getIndexOfItem(item.id, typeId);
      if (existsIndex >= 0) {
        exI = this.items[existsIndex];
        return exI[1] = exI[1] + count;
      } else {
        return this.items.push([item.id, count, typeId]);
      }
    }

    _getIndexOfItem(itemId, typeId) {
      var i, id, index, j, len, ref, t;
      ref = this.items;
      for (index = j = 0, len = ref.length; j < len; index = ++j) {
        i = ref[index];
        id = i[0];
        t = i[2];
        if (id === itemId && typeId === t) {
          return index;
        }
      }
      return -1;
    }

    _getItemTypeId(item) {
      var typeId;
      typeId = 0;
      if (DataManager.isWeapon(item)) {
        typeId = 1;
      } else if (DataManager.isArmor(item)) {
        typeId = 2;
      }
      return typeId;
    }

    removeType(typeId) {
      var i, item, j, ref;
      for (i = j = 0, ref = this.items.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        item = this.items[i];
        if (item == null) {
          continue;
        }
        if (item[2] === typeId) {
          this.items[i] = null;
        }
      }
      this.items.delete(null);
    }

    removeItem(item, count) {
      var i, j, ref, typeId, x;
      typeId = this._getItemTypeId(item);
      for (i = j = 0, ref = this.items.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        x = this.items[i];
        if (x[0] === item.id && x[2] === typeId) {
          x[1] = x[1] - count;
          if (x[1] <= 0) {
            this.items.splice(i, 1);
          }
          return;
        }
      }
    }

    getAllItems() {
      var i, j, len, ref, result;
      result = [];
      ref = this.items;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        if (i[2] === 0) {
          result.push([$dataItems[i[0]], i[1]]);
        } else if (i[2] === 1) {
          result.push([$dataWeapons[i[0]], i[1]]);
        } else if (i[2] === 2) {
          result.push([$dataArmors[i[0]], i[1]]);
        }
      }
      return result;
    }

    static ConvertToMVItem(storedItem) {
      if (storedItem[2] === 0) {
        return $dataItems[storedItem[0]];
      } else if (storedItem[2] === 1) {
        return $dataItems[storedItem[0]];
      } else if (storedItem[2] === 2) {
        return $dataArmors[storedItem[0]];
      }
      return $dataItems[storedItem[0]];
    }

    getOnlyItems() {
      return this._getOnlyTypeId(0);
    }

    _getOnlyTypeId(typeId) {
      var i, j, len, ref, result, type;
      result = [];
      type = $dataItems;
      if (typeId === 1) {
        type = $dataWeapons;
      }
      if (typeId === 2) {
        type = $dataArmors;
      }
      ref = this.items;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        if (i[2] === typeId) {
          result.push([type[i[0]], i[1]]);
        }
      }
      return result;
    }

    getOnlyWeapons() {
      return this._getOnlyTypeId(1);
    }

    getOnlyArmors() {
      return this._getOnlyTypeId(2);
    }

    static FromRawItems(items) {
      var c;
      c = new CStoredItems();
      c.items = items;
      return c;
    }

    static FromChestItems(items) {
      var c, i, j, len;
      c = new CStoredItems();
      for (j = 0, len = items.length; j < len; j++) {
        i = items[j];
        c.putItem(i[0], i[1]);
      }
      return c;
    }

  };
  PKD_MI.register(CStoredItems);
})();

// ■ END CStoredItems.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var MapInvController;
  MapInvController = class MapInvController {
    constructor(invSprite, layer) {
      var params;
      this.invSprite = invSprite;
      this.layer = layer;
      this.MAX = 25;
      if (PKD_MI.Parameters.isCustomSizeCells()) {
        params = PKD_MI.Parameters.getCustomSizeCellsParameters();
        this.MAX = params.columnsPerPage * params.rowsPerPage;
      }
      this._wallMargin = PKD_MI.getUIMapInventorySettings().screenOutSafeMargin;
      this.__pressTimer = 0;
      this.invSprite.visible = false;
      this.refreshTitle = new KDCore.TimedUpdate(3, this._onTitleTick.bind(this));
      this.goldRefreshThread = new KDCore.TimedUpdate(10, this._onGoldTick.bind(this));
      this._categoryLastPage = {};
      this._config();
    }

    _config() {
      this._moveToLastPos();
      if (!PKD_MI.Parameters.get_MapInventoryAllowDrag()) {
        return this._updateInvDrag = function() {};
      }
    }

    _moveToLastPos() {
      if ($gameTemp.__lastInventoryDragPos != null) {
        return this.invSprite.move($gameTemp.__lastInventoryDragPos);
      }
    }

    isInventoryActive() {
      return this.invSprite.visible === true;
    }

    open() {
      if (this.isInventoryActive()) {
        return;
      }
      this.invSprite.createMain();
      this.content = this.invSprite._content;
      this._onGoldTick();
      this.invSprite.visible = true;
      this.invSprite.playStartSE();
    }

    close() {
      var ref;
      if (!this.isInventoryActive()) {
        return;
      }
      this._hideHelp();
      if ((ref = this.partyController) != null) {
        ref.close();
      }
      this.invSprite.visible = false;
      this.content = null;
      this.invSprite.destroyMain();
    }

    showNextPage() {
      if (!this.isInventoryActive()) {
        return;
      }
      if (this.isSomeItemFocused()) {
        return;
      }
      if (this._currentPage === this._maxPages) {
        return;
      }
      return this._loadPage(this._currentPage + 1);
    }

    showPrevPage() {
      if (!this.isInventoryActive()) {
        return;
      }
      if (this.isSomeItemFocused()) {
        return;
      }
      if (this._currentPage === 0) {
        return;
      }
      return this._loadPage(this._currentPage - 1);
    }

    _loadPage(pageIndex) {
      var e;
      try {
        if (pageIndex <= 0) {
          this._currentPage = 0;
          this.loadItemsInCategory(this._loadedCatIndex);
        } else {
          if (this._loadedItems == null) {
            return;
          }
          this.content.clearAllItems();
          this._hideHelp();
          this._currentPage = pageIndex;
          this._showItemsGroup(pageIndex);
          this._refreshPageInfo();
        }
      } catch (error) {
        e = error;
        PKD_MI.warning('inventory:loadPage', e);
      }
    }

    loadItemsInCategory(catIndex = 0) {
      if (!this.isInventoryActive()) {
        return;
      }
      if (this.isSomeItemFocused()) {
        return;
      }
      this._hideHelp();
      this._onNewCategoryWillLoad();
      this._loadedCatIndex = catIndex;
      this.content.clearAllItems();
      this.content.prepareForCategory(catIndex);
      switch (catIndex) {
        case 0:
          this.showItems();
          break;
        case 1:
          this.showWeapons();
          break;
        case 2:
          this.showArmors();
          break;
        case 3:
          this.showKeys();
      }
      this._onNewCategoryLoaded();
    }

    _onNewCategoryWillLoad() {
      if (this._loadedCatIndex == null) {
        return;
      }
      if (this._maxPages === 1) {
        return;
      }
      // * Сохраняем
      return this._categoryLastPage[this._loadedCatIndex] = this._currentPage;
    }

    //u19
    showItems() {
      this._loadedItems = $gameParty.getAllItemsByMICategory(0);
      this._sortByUsable();
      this._setPages();
      return this._showItemsGroup(0);
    }

    _sortByUsable() {
      var sortMethod, sortMethod2;
      if (!PKD_MI.Parameters.get_MapInventorySortItems()) {
        return;
      }
      sortMethod = null;
      sortMethod = function(a, b) {
        if (a.occasion === 2 || a.occasion === 0) {
          return -1;
        } else {
          return 1;
        }
      };
      sortMethod2 = function(a, b) {
        if (a.id < b.id) {
          return -1;
        } else {
          return 1;
        }
      };
      this._loadedItems.sort(sortMethod2);
      this._loadedItems.sort(sortMethod);
    }

    _setPages() {
      this._currentPage = 0;
      this._maxPages = 1;
      if (this._loadedItems.length <= this.MAX) {
        this._maxPages = 1;
      } else {
        this._maxPages = Math.ceil(this._loadedItems.length / this.MAX);
      }
      this._refreshPageInfo();
    }

    _refreshPageInfo() {
      var t;
      t = this.invSprite._footer;
      t.disableArrows();
      t.drawPagesCount(this._currentPage + 1, this._maxPages);
      if (this._maxPages > 1) {
        t._arrowR.enable();
        t._arrowL.enable();
        if (this._currentPage === 0) {
          t._arrowL.disable();
        }
        if (this._currentPage === (this._maxPages - 1)) {
          return t._arrowR.disable();
        }
      }
    }

    _showItemsGroup(pageIndex = 0) {
      var cell, cellIndex, e, i, item, j, ref, ref1, s;
      cellIndex = 0;
      s = pageIndex * this.MAX;
      e = s + this.MAX;
      for (i = j = ref = s, ref1 = e; (ref <= ref1 ? j < ref1 : j > ref1); i = ref <= ref1 ? ++j : --j) {
        item = this._loadedItems[i];
        cell = this.content.getCellAt(cellIndex++);
        this._setItemToCell(cell, item);
      }
    }

    _setItemToCell(cell, item) {
      return cell.setItem(item);
    }

    showWeapons() {
      var equiped, items;
      $gameTemp._equipmentWeapCandidates = {};
      items = $gameParty.weapons();
      equiped = [];
      if (PKD_MI.Parameters.get_ShowEquipedItemsInInventory() === true) {
        equiped = $gameParty.getAllEquippedItems(DataManager.isWeapon);
      }
      items.sort(function(a, b) {
        if ($gameParty.canAnyEquip(a)) {
          return -1;
        } else {
          return 1;
        }
      });
      this._loadedItems = equiped.concat(items);
      this._sortByEquiped(DataManager.isWeapon);
      this._setPages();
      return this._showItemsGroup(0);
    }

    _sortByEquiped(itemTypeMethod) {
      var equiped;
      if (!PKD_MI.Parameters.get_MapInventorySortEquips()) {
        return;
      }
      equiped = $gameParty.getAllEquippedItems(itemTypeMethod);
      this._loadedItems.sort(function(a, b) {
        if (equiped.contains(a)) {
          return -1;
        } else {
          return 1;
        }
      });
    }

    showArmors() {
      var equiped, items;
      $gameTemp._equipmentArmrCandidates = {};
      items = $gameParty.armors();
      equiped = [];
      if (PKD_MI.Parameters.get_ShowEquipedItemsInInventory() === true) {
        equiped = $gameParty.getAllEquippedItems(DataManager.isArmor);
      }
      items.sort(function(a, b) {
        if ($gameParty.canAnyEquip(a)) {
          return -1;
        } else {
          return 1;
        }
      });
      this._loadedItems = equiped.concat(items);
      this._sortByEquiped(DataManager.isArmor);
      this._setPages();
      return this._showItemsGroup(0);
    }

    //u19
    showKeys() {
      var items;
      items = $gameParty.getAllItemsByMICategory(3);
      this._loadedItems = items;
      this._setPages();
      return this._showItemsGroup(0);
    }

    _onNewCategoryLoaded() {
      var pageIndex;
      this._refreshCategoryButtons();
      pageIndex = this._categoryLastPage[this._loadedCatIndex];
      if (pageIndex > 0 && pageIndex < this._maxPages) {
        return this._loadPage(pageIndex);
      }
    }

    _refreshCategoryButtons() {
      var ref;
      this.invSprite._header.enableAllButtons();
      return (ref = this.invSprite._header.categoryBtns[this._loadedCatIndex]) != null ? ref.disable() : void 0;
    }

    update() {
      if (this.isInventoryActive()) {
        return this.updateWhenOpen();
      } else {
        return this._hideHelp();
      }
    }

    updateWhenOpen() {
      var ref, ref1;
      this.refreshTitle.update();
      if ((ref = this.goldRefreshThread) != null) {
        ref.update();
      }
      this._updateInvDrag();
      this._updateHelp(); //?{PART}
      if (this.isSomeItemFocused()) {
        this.updateClearFocusClick();
        return (ref1 = this.partyController) != null ? ref1.update() : void 0;
      }
    }

    clickAt(index) {
      var cell, e;
      try {
        cell = this.content.getCellAt(index);
        if (cell == null) {
          return;
        }
        if (cell.item == null) {
          return;
        }
        return this._onAction(cell);
      } catch (error) {
        e = error;
        return PKD_MI.warning(e);
      }
    }

    _onAction(cell) {
      var e;
      try {
        if (PKD_MI.isUserChestIsOpen() || PKD_MI.isStoredChestIsOpen()) {
          return this._onStoreItem(cell);
        } else {
          return this._onActionItem(cell);
        }
      } catch (error) {
        e = error;
        return PKD_MI.warning('inventory:_onAction', e);
      }
    }

    _onStoreItem(cell) {
      if (this._loadedCatIndex === 3) {
        // * Нельзя квестовые предметы передавать в сундук
        SoundManager.playBuzzer();
        return;
      }
      if (this._loadedCatIndex === 2 || this._loadedCatIndex === 1) {
        // * Нельзя экиперованные предметы передавать в сундук
        if (cell.isCanBeUnEquiped()) {
          SoundManager.playBuzzer();
          return;
        }
      }
      return this._onStoreItemProcess(cell);
    }

    _onActionItem(cell) {
      if (!cell.isEnabled()) {
        return;
      }
      if (this.isSomeItemFocused()) {
        return;
      }
      switch (this._loadedCatIndex) {
        case 0:
        case 3: // * ITEMS
          this._onActionOnGameItem(cell);
          break;
        case 1:
        case 2: // * EQUIPMENT
          this._onActionOnEquipItem(cell);
      }
    }

    _equipFromInv(actor, etypeId, item) {
      var slotId;
      slotId = actor.equipSlots().indexOf(etypeId);
      if (slotId >= 0) {
        if (actor.isEquipChangeOk(slotId)) {
          actor.changeEquip(slotId, item);
          SoundManager.playEquip();
        } else {
          SoundManager.playBuzzer();
        }
      }
    }

    terminate() {
      $gameTemp._tempItemForParty = null;
      if (this.isInventoryActive()) {
        return this.close();
      }
    }

    _onTitleTick() {
      var cellUnderMouse;
      cellUnderMouse = this.content.getHoveredCell();
      if ((cellUnderMouse != null) && (cellUnderMouse.item != null)) {
        return this.content.drawItemName(cellUnderMouse.item.name);
      } else if (cellUnderMouse != null) {
        return this.content.drawItemName("");
      } else {
        cellUnderMouse = this.invSprite._header.getHoveredIndex();
        if (cellUnderMouse != null) {
          return this.content.drawItemName(this._getCategoryTitle(cellUnderMouse));
        } else {
          return this.content.drawItemName(this._getCategoryTitle(this._loadedCatIndex));
        }
      }
    }

    _getCategoryTitle(index) {
      switch (index) {
        case 0:
          return TextManager.item;
        case 1:
          return TextManager.weapon;
        case 2:
          return TextManager.armor;
        case 3:
          return TextManager.keyItem;
      }
      return "";
    }

    _onGoldTick() {
      this.invSprite._footer.drawGold($gameParty.gold());
      return this._refreshWeight();
    }

    _refreshWeight() {
      var isOver, wa, wc;
      if (!PKD_MI.Parameters.get_UsedWSystem()) {
        return;
      }
      wc = $gameParty.getCurrentWeight();
      wa = $gameParty.getMaxWeightCapacity();
      isOver = wc > wa;
      return this.invSprite._footer.drawWeight(wc + "/" + wa, isOver);
    }

    //?UPD18
    //?UPD20
    _updateInvDrag() {
      var pos, x;
      if ($gameTemp._pkdMICellMoving === true) { //?line
        return;
      }
      if ($gameTemp._pkdMIInvMoving != null) {
        if ($gameTemp._pkdMIInvMoving !== this) {
          return;
        }
      }
      if (TouchInput.isPressed()) {
        x = this.invSprite._header;
        pos = TouchInput;
        if (x.isMouseIn()) {
          $gameTemp._pkdMIInvMoving = this;
          this.__pressTimer++;
          if (!(this.__pressTimer > 5)) {
            return;
          }
          if (this.__dragOffset == null) {
            this.__dragOffset = [];
            this.__dragOffset[0] = this.invSprite.x - pos.x;
            this.__dragOffset[1] = this.invSprite.y - pos.y;
          }
        }
        if ((this.__dragOffset != null) && this._isProperMouseCursorPos(pos)) {
          this.invSprite.move(pos.x + this.__dragOffset[0], pos.y + this.__dragOffset[1]);
        }
      } else {
        this.__pressTimer = 0;
        if ($gameTemp._pkdMIInvMoving === this) {
          $gameTemp._pkdMIInvMoving = null;
        }
        if (this.__dragOffset != null) {
          this._saveLastDragPos();
          this.__dragOffset = null;
        }
      }
    }

    _isProperMouseCursorPos(pos) {
      var maxH, maxW, wall;
      if (this._wallMargin === 0) {
        return true;
      }
      maxW = Graphics.width;
      maxH = Graphics.height;
      wall = this._wallMargin;
      if (pos.x < wall) {
        return false;
      }
      if (pos.x > (maxW - wall)) {
        return false;
      }
      if (pos.y < wall) {
        return false;
      }
      if (pos.y > (maxH - wall)) {
        return false;
      }
      return true;
    }

    _saveLastDragPos() {
      return $gameTemp.__lastInventoryDragPos = [this.invSprite.x, this.invSprite.y];
    }

    placeItemToPanel(index) {
      var cellUnderMouse, e;
      if (this._loadedCatIndex === 1) {
        return false;
      }
      cellUnderMouse = this.content.getHoveredCell();
      if (cellUnderMouse == null) {
        return false;
      }
      if (!cellUnderMouse.isEnabled()) {
        return false;
      }
      if (cellUnderMouse.item != null) {
        try {
          $gameParty.leader().setItemOnPanel(cellUnderMouse.item.id, index - 1);
          SoundManager.playEquip();
          this._refreshCellItem(cellUnderMouse);
          return true;
        } catch (error) {
          e = error;
          PKD_MI.warning(e);
        }
      }
      return false;
    }

    _refreshCellItem(cell) {
      //item = cell.item
      //cell.clear()
      //76cell.setItem(item)
      this._loadPage(this._currentPage);
    }

    placeWeaponToFavorite(index) {
      var cellUnderMouse, e;
      if (this._loadedCatIndex === 2) {
        return false;
      }
      cellUnderMouse = this.content.getHoveredCell();
      if (cellUnderMouse == null) {
        return false;
      }
      if (!cellUnderMouse.isEnabled()) {
        return false;
      }
      if (cellUnderMouse.item != null) {
        try {
          $gameParty.leader().setFavWeap(cellUnderMouse.item, index);
          SoundManager.playEquip();
          this._refreshCellItem(cellUnderMouse);
          return true;
        } catch (error) {
          e = error;
          PKD_MI.warning(e);
        }
      }
      return false;
    }

    //?UPDX
    onHotCellItemAction(cell) {
      var type;
      if (!cell.isEnabled()) {
        return;
      }
      if (cell.item == null) {
        return;
      }
      if (this.isSomeItemFocused()) {
        return;
      }
      type = KDCore.Utils.getItemTypeId(cell.item);
      if (type === 0) {
        this._onActionOnGameItem(cell);
      } else {
        this._onActionOnEquipItem(cell);
      }
      cell.refreshHotCell();
    }

    //?UPD18
    isSomeCellUnderMouse() {
      return this.content.getHoveredCell() != null;
    }

  };
  PKD_MI.register(MapInvController);
})();

// ■ END MapInvController.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvPartySelectCntrl.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var MapInvPartySelectCntrl;
  MapInvPartySelectCntrl = class MapInvPartySelectCntrl {
    constructor(contentSprite, partyUseCases) {
      this.contentSprite = contentSprite;
      this.partyUseCases = partyUseCases;
      this._actors = this.contentSprite.createPartyActors();
      this._checkEnabled();
      this.open();
    }

    _checkEnabled() {
      var i, j, k, len, ref, results;
      ref = this.partyUseCases;
      results = [];
      for (j = k = 0, len = ref.length; k < len; j = ++k) {
        i = ref[j];
        if (!i) {
          results.push(this._actors[j].disable());
        } else {
          results.push(void 0);
        }
      }
      return results;
    }

    open() {
      var ref, ref1, ref2, ref3;
      if ((ref = this._actors[0]) != null) {
        ref.moveLeft();
      }
      if ((ref1 = this._actors[1]) != null) {
        ref1.moveRight();
      }
      if ((ref2 = this._actors[2]) != null) {
        ref2.moveDown();
      }
      return (ref3 = this._actors[3]) != null ? ref3.moveUp() : void 0;
    }

    close() {
      var i, k, len, ref;
      ref = this._actors;
      for (k = 0, len = ref.length; k < len; k++) {
        i = ref[k];
        i.close();
      }
      return this.terminate();
    }

    //setTimeout @terminate.bind(@), 200
    update() {}

    terminate() {
      var e, ref, ref1;
      try {
        if ((ref = this.contentSprite) != null) {
          ref.destroyPartyActors();
        }
        return (ref1 = this.contentSprite) != null ? ref1.clearFocus() : void 0;
      } catch (error) {
        e = error;
        return console.warn(e);
      }
    }

  };
  PKD_MI.register(MapInvPartySelectCntrl);
})();

// ■ END MapInvPartySelectCntrl.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
(function() {
  var Parameters;
  Parameters = (function() {
    
      //?UPDX
    class Parameters extends KDCore.ParametersManager {
      constructor() {
        super("MapInventoryDrag");
        this.newParser = new KDCore.ParamLoader("MapInventoryDrag"); //?line
      }

      
        //?UPDX
      getCellItemHotKeyText() {
        return this.newParser.getParam('OIHotKeyText', {
          visible: true,
          size: {
            w: 22,
            h: 20
          },
          alignment: "right",
          font: {
            face: "Consolas",
            size: 14,
            italic: false
          },
          margins: {
            x: 10,
            y: 18
          },
          outline: {
            color: "",
            width: 2
          },
          textColor: "#F9E159".toCss()
        });
      }

      //?UPDX
      getHotCells() {
        return this.newParser.getParam('OIHotCells', []);
      }

      //?UPDX
      isOuterItemsHotKeysEnabled() {
        return this.newParser.getParam('OIHotKeyEnable', true);
      }

      isCustomSizeCells() {
        return this.newParser.getParam('UseCustomCellsSize', false);
      }

      isIconImagesInDefaultWindows() {
        return this.newParser.getParam('UseImageIconsInWindows', true);
      }

      // 0 - center , 1 - stretch
      getCustomSizeCellsParameters() {
        return this.newParser.getParam('CustomCellSettings', {
          iconSize: 30,
          columnsPerPage: 5,
          rowsPerPage: 5,
          iconMode: 1
        });
      }

      getGoldItemId() {
        return this.newParser.getParam('GoldItem', 0);
      }

      //?UPD18
      getExtraInfoData() {
        return this.newParser.getParam('ExtraDescriptions', []);
      }

      //?UPD18
      isThrowOutEnabled() {
        return this.newParser.getParam('AllowThrowOutSystem', true);
      }

      //?UPD18
      getThrowOutSettings() {
        return this.newParser.getParam('ThrowOutSettings', {
          enabled: true,
          margins: {
            x: 15,
            y: 350
          },
          startOpacity: 175,
          fadeOutSpeed: 5,
          throwOutSE: "Wind7"
        });
      }

      //u19
      isStaticDescPosition() {
        return this.newParser.getParam('StaticDescPosition', false);
      }

      //u19
      getStaticDescPosition() {
        return this.newParser.getParam('StaticDescPosXY', null);
      }

      //TODO: Параметры новой системы замков

        //u19
      isCellLockSystemAllowed() {
        return this.newParser.getParam('UseLimitedCellsSystem', false);
      }

      //u19
      getCellLockVariableForItems() {
        return this.newParser.getParam('lcVariableItems', 1);
      }

      //u19
      getCellLockVariableForWeapons() {
        return this.newParser.getParam('lcVariableWeapons', 1);
      }

      //u19
      getCellLockVariableForArmors() {
        return this.newParser.getParam('lcVariableArmors', 1);
      }

      //u19
      isIgnoreLimitByGainItem() {
        return this.newParser.getParam('lsIgnoreLimitByGainItems', true);
      }

      //u20
      isShowItemNameWithQualityColor() {
        return this.newParser.getParam('QualitySystemColor', false);
      }

      
        //u20
      isShowItemNameWithQualityColorInWindows() {
        return this.newParser.getParam('QualitySystemColorWindows', false);
      }

    };

    PKD_MI.register(Parameters);

    return Parameters;

  }).call(this);
})();

(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.Parameters.prototype;
  _.get_MapInventoryAllowDrag = function() {
    return this.getBooleanFromCacheWithDefault('MapInventoryDrag', true);
  };
  _.get_MapInventorySortItems = function() {
    return this.getBooleanFromCacheWithDefault('MapInventorySortItems', true);
  };
  _.get_MapInventorySortEquips = function() {
    return this.getBooleanFromCacheWithDefault('MapInventorySortEquip', true);
  };
  _.get_ShowEquipedItemsInInventory = function() {
    return this.getBooleanFromCacheWithDefault('ShowEquipedItemsInInventory', true);
  };
  _.get_InventoryOpenKey = function() {
    return this.getStringFromCacheWithDefault('OpenMapInventoryKey', 'i');
  };
  _.get_ChestTakeAllKey = function() {
    return this.getStringFromCacheWithDefault('TakeAllChestKey', 't');
  };
  _.get_MapInventoryAllowPartySelect = function() {
    return this.getBooleanFromCacheWithDefault('AllowPartySelect', true);
  };
  _.get_AutoRefreshItems = function() {
    return this.getBooleanFromCacheWithDefault('AllowAutoRefreshUsable', true);
  };
  _.get_AllowUseStoredChestLikeStorage = function() {
    return this.getBooleanFromCacheWithDefault('AllowStoreInChest', true);
  };
  _.get_UseSlider = function() {
    return this.getBooleanFromCacheWithDefault('UseSlider', true);
  };
  _.get_UsedWSystem = function() {
    if (!PKD_MI.isPro()) {
      return false;
    } else {
      return this.getBooleanFromCacheWithDefault('UseWSystem', false);
    }
  };
  _.get_partyMaxWeighVar = function() {
    return this.getNumberFromCacheWithDefault('wSystemVariableId', 1);
  };
  _.get_WSAutoState = function() {
    return this.getNumberFromCacheWithDefault('wSystemAutoStateId', 0);
  };
  _.get_IsWSSlowDown = function() {
    return this.getBooleanFromCacheWithDefault('wSystemAllowSlowDown', true);
  };
  _.get_UseScreenButton = function() {
    return this.getBooleanFromCacheWithDefault('UseScreenButton', true);
  };
  _.get_AllowRareSystem = function() {
    return this.getBooleanFromCacheWithDefault('AllowRareItemSystem', true);
  };
  _.get_Allow8 = function() {
    return this.getBooleanFromCacheWithDefault('AllowNonBattlePartyMembers', false);
  };
  _.get_AllowEquipStats = function() {
    return this.getBooleanFromCacheWithDefault('AllowEquipsStats', true);
  };
  _.get_AllowFullStats = function() {
    return this.getBooleanFromCacheWithDefault('ShowFullEquipedStats', false);
  };
  //?UPDX
  _.get_UseOuterItems = function() {
    return this.getBooleanFromCacheWithDefault('AllowOuterItems', false);
  };
})();

PKD_MI.Parameters = new PKD_MI.LIBS.Parameters();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Scene_Boot.prototype;
  //u19
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    // * Не успевают eval выполнить
    PKD_MI.Parameters = new PKD_MI.LIBS.Parameters();
    return PKD_MI.ApplyPluginsExtensions();
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createSpriteset, ALIAS__isMenuCalled, ALIAS__onMapLoaded, ALIAS__processMapTouch, ALIAS__stop, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__createSpriteset = _.createSpriteset;
  _.createSpriteset = function() {
    ALIAS__createSpriteset.call(this);
    this._createInvUILayer();
    PKD_MI.registerExtraMethods();
    if (PKD_MI.isPro()) {
      return RefreshWeightSystem();
    }
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    var e, ref;
    ALIAS__stop.call(this);
    try {
      if ((ref = this._spritesetIUI) != null) {
        ref.terminate();
      }
      this.removeChild(this._spritesetIUI);
    } catch (error) {
      e = error;
      PKD_MI.warning(e);
    }
  };
  //u20
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    this._miWeightCheckTimer = 30;
  };
  
  //@[ALIAS]
  ALIAS__processMapTouch = _.processMapTouch;
  _.processMapTouch = function() {
    if (PKD_MI.isProcessEUITouch()) {
      return;
    }
    return ALIAS__processMapTouch.call(this);
  };
  
  //?UPD18
  //@[ALIAS]
  ALIAS__isMenuCalled = _.isMenuCalled;
  _.isMenuCalled = function() {
    if (TouchInput.isCancelled() || Input.isTriggered('menu')) {
      if (PKD_MI.isCellUnderRightClick()) {
        return false;
      } else if (PKD_MI.isSomeIsOpen()) {
        PKD_MI.closeSome();
        return false;
      }
    }
    return ALIAS__isMenuCalled.call(this);
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this, ...arguments);
    return this._updateMIWSystemTimer();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  _._createInvUILayer = function() {
    var e;
    try {
      this._spritesetIUI = new Spriteset_InvUI();
      PKD_MI.setUI(this._spritesetIUI);
      this.addChild(this._spritesetIUI);
    } catch (error) {
      e = error;
      PKD_MI.warning(e);
    }
  };
  
  //u20
  _._updateMIWSystemTimer = function() {
    this._miWeightCheckTimer--;
    if (PKD_MI.isInventoryOpened()) {
      this._miWeightCheckTimer -= 2;
    }
    if (this._miWeightCheckTimer <= 0) {
      this._miWeightCheckTimer = 120;
      return $gameParty.refreshMaxWeightCapacity();
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

(function(){

    ImageManager.loadPKDMI('background');

    isInMousePosition = function (sprite, dx, dy) {
        function inRect(point, rect) {
            var x2, y2;
            try {
                x2 = rect.x + rect.width;
                y2 = rect.y + rect.height;
                return point.x > rect.x && point.x < x2 && point.y < y2 && point.y > rect.y;
            } catch (error) {
                
            }
        }
        if (dx === undefined)
            dx = 0;
        if (dy === undefined)
            dy = 0;
        var rect, rx, ry;
        rx = KDCore.SDK.toGlobalCoord(sprite, 'x');
        ry = KDCore.SDK.toGlobalCoord(sprite, 'y');
        rect = new Rectangle(rx - dx, ry - dy, sprite.width + (dx * 2), sprite.height + (dy * 2));
        return inRect(TouchInput, rect);
    };

    function Sprite_NumberSlider() {
        this.initialize.apply(this, arguments);
    }

    Sprite_NumberSlider.prototype = Object.create(Sprite.prototype);
    Sprite_NumberSlider.prototype.constructor = Sprite_NumberSlider;

    Sprite_NumberSlider.prototype.initialize = function (callback, valueChangeCallback) {
        Sprite.prototype.initialize.call(this);
        this.afterLoadCallback = callback;
        this.valueChangeCallback = valueChangeCallback;
        this._create();
    };

    //?[NEW]
    Sprite_NumberSlider.prototype.update = function () {
        Sprite.prototype.update.call(this);
        this.updateSliderMoveByMouse();
    };

    PKD_MI.register(Sprite_NumberSlider);

    //@[IMPLEMENTATION]
    (function () {

        //@[DEFINES]
        var _ = Sprite_NumberSlider.prototype;
        var __ = null; //@[PRE]

        _.terminate = function() {
            this.visible = false;
            if(this.parent)
                this.parent.removeChild(this);
            if(KDCore.isMV())
                this.destroy();
        };

        //?[NEW]
        _._create = function () {
            __ = PKD_MI.getUIMapInventorySettings().itemSliderSettings;
            this._loadSliderResources();
            this.bitmap = ImageManager.loadPKDMI('background');
            if(this.bitmap.isReady()) {
                this._createAfterLoad();
            } else
                this.bitmap.addLoadListener(_._createAfterLoad.bind(this));
        };

        //?[NEW]
        _._loadSliderResources = function () {
            ImageManager.loadPKDMI('background');
            ImageManager.loadPKDMI('fill');
            ImageManager.loadPKDMI('slider');
        };

        //?[NEW]
        _._createAfterLoad = function () {
            if (!this.bitmap.width) return;
            this._ww = this.bitmap.width;
            //this._createIcon();
            this._createFill();
            this._mouseZone = new Sprite(new Bitmap(this.width + 20, this.height + (__.zoneDY * 2)));
            this._mouseZone.move(-10, -__.zoneDY);
            this.addChild(this._mouseZone);
            if(this.afterLoadCallback)
                this.afterLoadCallback();
        };

        //?[NEW]
        _._createFill = function () {
            var fillBitmap = ImageManager.loadPKDMI('fill');
            var fillImg = new Sprite(fillBitmap);
            fillBitmap.addLoadListener(function () {
                var sliderFill = new Sprite(new Bitmap(fillBitmap.width, fillBitmap.height));
                this.sliderFill = sliderFill;
                this.addChild(this.sliderFill);
                this._createSlider();
            }.bind(this));
            this.fillImg = fillImg;
        };

        //?[NEW]
        _._createSlider = function () {
            this.sliderSprite = new Sprite(ImageManager.loadPKDMI('slider'));
            this.sliderSprite.anchor.x = 0.5;
            this.sliderSprite.move(__.sliderMarginX, __.sliderMarginY);
            this.addChild(this.sliderSprite);

            function applyS() {
                this.setPercent(1);
            }

            setTimeout(applyS.bind(this), 20);
            setTimeout(applyS.bind(this), 50);
            setTimeout(applyS.bind(this), 100);
        };

        //?[NEW]
        _.setPercent = function (percent) {
            try {
                if (!this.sliderFill)
                    return;
                if (!this.fillImg)
                    return;
                if (percent === undefined)
                    percent = 1;
                if (percent > 1)
                    percent = 1;
                var w = this.fillImg.width * percent;
                this._fillSliderBy(w);
            } catch (e) {
                console.warn(e);
            }
        };

        //?[NEW]
        _._fillSliderBy = function (w) {
            //"fill0".p(w);
            this.sliderFill.bitmap.clear();
            this.sliderFill.bitmap.blt(this.fillImg.bitmap, 0, 0, w, this.fillImg.height, 0, 0);
            this.sliderSprite.move(__.sliderMarginX + w - __.sliderDX, __.sliderMarginY);
        };

        //?[NEW]
        _._applyValueSettings = function (w) {
            var percent = (w / this.fillImg.width);
            percent = ~~(percent * 100);
            if (percent < 0)
                percent = 0;
            if (percent > 99)
                percent = 100;
            //PKD_MI.onSliderValueChanged(percent);
            this.valueChangeCallback(percent);
            this.setPercent(percent / 100);
        };

        _.isInMousePositionAll = function() {
            return isInMousePosition(this._mouseZone, 0, 0);
        };

        _.isInMousePositionHandler = function() {
            return isInMousePosition(this.sliderSprite, 5, 5);
        };

        //?[NEW]
        _.updateSliderMoveByMouse = function () {
            if (!this.sliderSprite)
                return;
            if (!this._mouseZone)
                return;
            if (this.isInMousePositionHandler()) {
                this._canMoveSlider = true;
            }
            if (!this.isInMousePositionAll()) {
                this._canMoveSlider = false;
            } else {
                if (TouchInput.isTriggered() && this._canMoveSlider == false) {
                    this._moveSliderByMouse();
                }
            }

            if (this._canMoveSlider) {
                if (TouchInput.isPressed()) {
                    this._moveSliderByMouse();
                }
            }
        };

        //?[NEW]
        _._moveSliderByMouse = function () {
            var localMPX = KDCore.SDK.canvasToLocalX(this, TouchInput.x);
            if (localMPX <= this.fillImg.width) {
                this._fillSliderBy(localMPX);
                this._applyValueSettings(localMPX);
            }
        };

    })();
    // ===============================================================================
})();
// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SliderController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var SliderController;
  SliderController = class SliderController {
    constructor(contentSprite, type) {
      var mA, mB;
      this.contentSprite = contentSprite;
      if (type === 0) {
        mA = PKD_MI.onSliderOkClick;
        mB = PKD_MI.onSliderValueChanged;
      } else if (type === 1) {
        mA = PKD_MI.onSliderChestOkClick;
        mB = PKD_MI.onSliderChestValueChanged;
      }
      this.contentSprite.createSlider(mA, mB);
    }

    close() {
      return this.terminate();
    }

    terminate() {
      var e, ref, ref1;
      try {
        if ((ref = this.contentSprite) != null) {
          ref.destroySlider();
        }
        return (ref1 = this.contentSprite) != null ? ref1.clearFocus() : void 0;
      } catch (error) {
        e = error;
        return console.warn(e);
      }
    }

  };
  PKD_MI.register(SliderController);
})();

// ■ END SliderController.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_ColorGauge.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_ColorGauge;
  Sprite_ColorGauge = class Sprite_ColorGauge extends KDCore.Sprite {
    constructor(settings) {
      super();
      this.settings = settings;
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createBackground();
      this._createFill();
      this._createForeground();
      return this.visible = this.settings.visible;
    }

    _loadSettings() {
      return this.moveByJson(this.settings);
    }

    _createBackground() {
      this.bitmap = new Bitmap(this.settings.width, this.settings.height);
      this._background = KDCore.Sprite.FromBitmap(this.settings.width, this.settings.height);
      this._background.fillAll(KDCore.Color.FromHex(this.settings.backgroundColor));
      this._background.opacity = this.settings.backgroundOpacity;
      return this.add(this._background);
    }

    _createFill() {
      this._fillImg = KDCore.Sprite.FromBitmap(this.settings.width, this.settings.height);
      this._fillImg.b().fillAll(KDCore.Color.FromHex(this.settings.fillColor));
      this._fill = KDCore.Sprite.FromBitmap(this.settings.width, this.settings.height);
      this.add(this._fill);
      return this.drawGauge();
    }

    drawGauge(percent = 1) {
      var w;
      if (this._fill == null) {
        return;
      }
      this._fill.clear();
      w = this.settings.width * percent;
      return this._fill.b().blt(this._fillImg.b(), 0, 0, w, this.settings.height, 0, 0);
    }

    _createForeground() {
      if (this.settings.foregroundImg != null) {
        this._foreground = PKD_MI.FromImgI(this.settings.foregroundImg);
        return this.add(this._foreground);
      }
    }

  };
  PKD_MI.register(Sprite_ColorGauge);
})();

// ■ END Sprite_ColorGauge.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ GSprite.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var GSprite;
  GSprite = class GSprite extends KDCore.Sprite {
    constructor() {
      super(...arguments);
    }

  };
  PKD_MI.register(GSprite);
})();

(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.GSprite.prototype;
  // * ==============================================

  // * Исчезнуть
  _.fadeIn = function(sp) {
    this._fadeMode = 0;
    this._fadeStep = sp;
    return this._fadeTimer = new KDCore.TimedUpdate(2, this._onFadeTick.bind(this));
  };
  // * Появление
  _.fadeOut = function(sp) {
    this._fadeMode = 1;
    this._fadeStep = sp;
    return this._fadeTimer = new KDCore.TimedUpdate(2, this._onFadeTick.bind(this));
  };
  _._onFadeTick = function() {
    if (this._fadeMode === 0) {
      this.opacity -= this._fadeStep;
      if (this.opacity <= 0) {
        return this._fadeTimer.stop();
      }
    } else {
      this.opacity += this._fadeStep;
      if (this.opacity >= 255) {
        return this._fadeTimer.stop();
      }
    }
  };
  // * ==============================================

  // * Движение
  _.startMove = function(direction, speed, distance) {
    this._moveDirection = direction;
    this._moveSpeed = speed;
    this._moveDistance = distance;
    return this._moveTimer = new KDCore.TimedUpdate(2, this._onMoveTick.bind(this));
  };
  _._onMoveTick = function() {
    switch (this._moveDirection) {
      case 0: // * LEFT
        this.x -= this._moveSpeed;
        break;
      case 1: // * UP
        this.y -= this._moveSpeed;
        break;
      case 2: // * RIGHT
        this.x += this._moveSpeed;
        break;
      case 3: // * DOWN
        this.y += this._moveSpeed;
        break;
      case 4: // * LEFT AND UP
        this.x -= this._moveSpeed;
        this.y -= this._moveSpeed;
        break;
      case 5: // * LEFT AND DOWN
        this.x -= this._moveSpeed;
        this.y += this._moveSpeed;
        break;
      case 6: // * RIGHT AND UP
        this.x += this._moveSpeed;
        this.y -= this._moveSpeed;
        break;
      case 7: // * RIGHT AND DOWN
        this.x += this._moveSpeed;
        this.y += this._moveSpeed;
    }
    this._moveDistance -= this._moveSpeed;
    if (this.isOutOfDistance()) {
      return this._moveTimer.stop();
    }
  };
  _.isOutOfDistance = function() {
    return this._moveDistance <= 0;
  };
  // * ==============================================
  _.update = function() {
    Sprite.prototype.update.call(this);
    if (this._fadeTimer != null) {
      this._fadeTimer.update();
    }
    if (this._moveTimer != null) {
      //@_shakeTimer.update() if @_shakeTimer?
      //@_shakeTimer2.update() if @_shakeTimer2?
      return this._moveTimer.update();
    }
  };
})();

// ■ END GSprite.coffee
//---------------------------------------------------------------------------
//@_pulseTimer.update() if @_pulseTimer?

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_ItemExtraInfo.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_ItemExtraInfo;
  Sprite_ItemExtraInfo = class Sprite_ItemExtraInfo extends KDCore.Sprite {
    constructor(extraInfo) {
      super();
      this.extraInfo = extraInfo;
      this._extraInfoText = this._prepareDescriptionText(this.extraInfo.info.text);
      this._createContent();
    }

    _prepareDescriptionText(text) {
      text = text.replaceAll("\"", "");
      text = text.replaceAll("\\\\", "\\");
      text = text.replace(/\\n+/g, ' ');
      return text;
    }

    _createContent() {
      this._createInfoBlock();
      if (String.any(this.extraInfo.picture.imgName)) {
        return this._creactePictureBlock();
      }
    }

    _createInfoBlock() {
      var s;
      s = this.extraInfo.info;
      this.textBack = new PKD_MI.LIBS.Sprite_TilingFrame(s.size.w, s.size.h, 'ExtraInfoFrame');
      this.addChild(this.textBack);
      this.textBack.move(s.position);
      this._createText();
      return this._drawText();
    }

    _createText() {
      var resetFont, s;
      s = this.extraInfo.info;
      if (KDCore.isMV()) {
        this._description = new Window_Base(0, 0, s.size.w, s.size.h);
      } else {
        this._description = new Window_Base(new PIXI.Rectangle(0, 0, s.size.w, s.size.h));
      }
      resetFont = function() {
        if (String.any(s.font.face)) {
          this.contents.fontFace = s.font.face;
        }
        this.contents.fontSize = s.font.size;
        this.contents.fontItalic = s.font.italic;
        this.resetTextColor();
      };
      this._description.resetFontSettings = resetFont.bind(this._description);
      this._description.setBackgroundType(2);
      return this.textBack.addChild(this._description);
    }

    _drawText() {
      this._description.contents.clear();
      this._description.resetFontSettings();
      return this._description.drawTextExWithWordWrap(this._extraInfoText, 0, 0, this.extraInfo.info.size.w - 10);
    }

    _creactePictureBlock() {
      var s;
      s = this.extraInfo.picture;
      this.picBack = new PKD_MI.LIBS.Sprite_TilingFrame(s.size.w, s.size.h, 'ExtraInfoFrame');
      this.addChild(this.picBack);
      this.picBack.move(s.position);
      return KDCore.Utils.loadImageAsync('pictures', s.imgName).then(this._drawPicture.bind(this));
    }

    _drawPicture(sBitmap) {
      var imgSpr, s;
      s = this.extraInfo.picture.size;
      imgSpr = KDCore.Sprite.FromBitmap(s.w, s.h);
      imgSpr.bitmap.drawOnMe(sBitmap, 4, 4, s.w - 8, s.h - 8);
      this.picBack.content.addChild(imgSpr);
    }

  };
  PKD_MI.register(Sprite_ItemExtraInfo);
})();

// ■ END Sprite_ItemExtraInfo.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInventoryActorCell.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapInventoryActorCell;
  //?UPD
  Sprite_MapInventoryActorCell = class Sprite_MapInventoryActorCell extends PKD_MI.LIBS.GSprite {
    constructor() {
      super();
      this._init();
      this._create();
      if (!PKD_MI.Parameters.isCustomSizeCells()) { //?line
        this.move(-11, -11);
      }
      this.opacity = 0;
    }

    _init() {
      this._moveDistance = 50;
      this._moveSpeed = 10;
      this._fadeOutSpeed = 25;
      return this._fadeInSpeed = 50;
    }

    _create() {
      this._loadSettings();
      this._loadImages();
      this._createCell();
      this._createActorFaceSpr();
      return this._createDisableLayer();
    }

    _loadSettings() {
      return this.settings = this._settingsJSON();
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    _loadImages() {
      return this._imgs0 = [ImageManager.loadPKDMI("partySlot_00"), ImageManager.loadPKDMI("partySlot_01"), ImageManager.loadPKDMI("partySlot_00"), ImageManager.loadPKDMI("partySlot_00")];
    }

    _createCell() {
      this._cell = new KDCore.Button();
      this._cell.setButtonImages(...this._imgs0);
      return this.add(this._cell);
    }

    _createActorFaceSpr() {
      this.actorFaceSpr = KDCore.Sprite.FromBitmap(46, 46);
      this.actorFaceSpr.move(6, 6);
      //@actorFaceSpr.bitmap.fillAll KDCore.Color.RED
      return this.addChild(this.actorFaceSpr);
    }

    _createDisableLayer() {
      this.disableLayer = KDCore.Sprite.FromBitmap(46, 46);
      this.disableLayer.bitmap.fillAll(KDCore.Color.BLACK);
      this.disableLayer.opacity = 200;
      this.disableLayer.move(6, 6);
      this.disableLayer.visible = false;
      return this.addChild(this.disableLayer);
    }

    disable() {
      var ref;
      this.disableLayer.visible = true;
      //@actorFaceSpr.opacity = 200
      this._cell._clickHandlers = [];
      this._cell.addClickHandler(function() {
        return SoundManager.playBuzzer();
      });
      return (ref = this.iconSpr) != null ? ref.visible = false : void 0;
    }

    //g.visible = false for g in @gaugeitems
    setActor(actor1) {
      var item;
      this.actor = actor1;
      this.drawActorFace();
      this.registerClick();
      item = $gameTemp._tempItemForParty;
      if (item == null) {
        return;
      }
      if (DataManager.isItem(item)) {
        return this.drawGauges(item);
      } else if (!DataManager.isSkill(item)) {
        return this.drawEquipedIcon(item);
      }
    }

    drawActorFace() {
      var fIndex, tBitmap;
      tBitmap = ImageManager.loadFace(this.actor.faceName());
      fIndex = this.actor.faceIndex();
      tBitmap.addLoadListener(() => {
        var ph, pw, sx, sy;
        if (KDCore.isMV()) {
          pw = Window_Base._faceWidth;
          ph = Window_Base._faceHeight;
        } else {
          pw = ImageManager.faceWidth;
          ph = ImageManager.faceHeight;
        }
        sx = fIndex % 4 * pw;
        sy = Math.floor(fIndex / 4) * ph;
        return this.actorFaceSpr.bitmap.blt(tBitmap, sx, sy, pw, ph, 0, 0, this.actorFaceSpr.width, this.actorFaceSpr.height);
      });
    }

    drawGauges(item) {
      return this.gaugeitems = [];
    }

    //?UPD
    drawEquipedIcon(item) {
      var e, equippedOne, etype, extraIcon, i, len, ref;
      try {
        etype = item.etypeId;
        equippedOne = null;
        ref = this.actor.equips();
        for (i = 0, len = ref.length; i < len; i++) {
          e = ref[i];
          if ((e != null) && e.etypeId === item.etypeId) {
            equippedOne = e;
            break;
          }
        }
        if (equippedOne != null) {
          extraIcon = DataManager.getItemInvImage(equippedOne);
          if (String.any(extraIcon)) {
            return this._drawEquipIcon(ImageManager.loadPKDMI_Icon(extraIcon), true);
          } else {
            return this._drawEquipIcon(equippedOne.iconIndex);
          }
        } else {
          return this._drawEquipIcon(this.settings.partySelectorEquipIcons.nothingEquippedIcon);
        }
      } catch (error) {
        e = error;
        return PKD_MI.warning(e);
      }
    }

    //?UPD
    _drawEquipIcon(iconIndex, withBack) {
      var s;
      s = this.settings.partySelectorEquipIcons;
      this.iconSpr = KDCore.Sprite.FromBitmap(20);
      if (withBack === true) {
        this.iconSpr.drawIcon(0, 0, this.settings.partySelectorEquipIcons.nothingEquippedIcon, 20);
      }
      this.iconSpr.drawIcon(0, 0, iconIndex, 20);
      this.iconSpr.move(s.marginX, s.marginY);
      //if @actor == $gameParty.leader()
      //    @iconSpr.move 0, s.marginY
      return this.addChild(this.iconSpr);
    }

    moveUp() {
      this.fadeOut(this._fadeOutSpeed);
      return this.startMove(1, this._moveSpeed, this._moveDistance);
    }

    moveLeft() {
      this.fadeOut(this._fadeOutSpeed);
      return this.startMove(0, this._moveSpeed, this._moveDistance);
    }

    moveRight() {
      this.fadeOut(this._fadeOutSpeed);
      return this.startMove(2, this._moveSpeed, this._moveDistance);
    }

    moveDown() {
      this.fadeOut(this._fadeOutSpeed);
      return this.startMove(3, this._moveSpeed, this._moveDistance);
    }

    moveLeftAndUp() {
      this.fadeOut(this._fadeOutSpeed);
      return this.startMove(4, this._moveSpeed, this._moveDistance + 1);
    }

    moveLeftAndDown() {
      this.fadeOut(this._fadeOutSpeed);
      return this.startMove(5, this._moveSpeed, this._moveDistance + 1);
    }

    moveRightAndUp() {
      this.fadeOut(this._fadeOutSpeed);
      return this.startMove(6, this._moveSpeed, this._moveDistance + 1);
    }

    moveRightAndDown() {
      this.fadeOut(this._fadeOutSpeed);
      return this.startMove(7, this._moveSpeed, this._moveDistance + 1);
    }

    close() {
      return this.fadeIn(this._fadeInSpeed);
    }

    registerClick() {
      var actor;
      this._cell._clickHandlers = [];
      actor = this.actor;
      this._cell.addClickHandler(function() {
        return PKD_MI.onInvPartyCellClick(actor);
      });
    }

    isHovered() {
      return this._cell.isMouseInButton();
    }

  };
  PKD_MI.register(Sprite_MapInventoryActorCell);
})();

// ■ END Sprite_MapInventoryActorCell.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInvCell.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapInvCell;
  //?UPD18
  Sprite_MapInvCell = class Sprite_MapInvCell extends KDCore.Sprite {
    constructor(index1, isLockSupportType = false) {
      super();
      this.index = index1;
      this.isLockSupportType = isLockSupportType;
      this._inSpecialState = false;
      this._isEquipedItem = false;
      this._isFavWeapon = false;
      this._isChestItem = false;
      this._pressTimer = 0; //?line
      this.isHotCell = false; //?line
      this._create();
    }

    //?UPD18
    isLocked() {
      var ref;
      return ((ref = this._lockCellSpr) != null ? ref.visible : void 0) === true;
    }

    //?UPD18
    _create() {
      this._loadSettings();
      this._iconSprPlace = new Sprite();
      this._loadImages();
      this._createCell();
      this.add(this._iconSprPlace);
      //@_createIconSpr()
      this._createQualityLevelSpr();
      this._createSpecial();
      this._createCountText();
      this._createLockCellSprite();
      return this._createFader();
    }

    _loadSettings() {
      this.settings = this._settingsJSON();
      this.customCellParams = null;
      if (PKD_MI.Parameters.isCustomSizeCells()) {
        this.customCellParams = PKD_MI.Parameters.getCustomSizeCellsParameters();
      }
    }

    _loadImages() {
      // * Нужен для размеров
      this.slotBitmap = ImageManager.loadPKDMI("InventorySlot_00");
      this.slotBitmap.addLoadListener(this._createIconSpr.bind(this));
      this._imgs0 = [this.slotBitmap, ImageManager.loadPKDMI("InventorySlot_01"), ImageManager.loadPKDMI("InventorySlot_00"), ImageManager.loadPKDMI("InventorySlot_00")];
      //@_imgs1 = [
      //    ImageManager.loadPKDMI("InventorySlotA_00")
      //    ImageManager.loadPKDMI("InventorySlotA_01")
      //    ImageManager.loadPKDMI("InventorySlotA_00")
      //    ImageManager.loadPKDMI("InventorySlotA_00")
      //]
      this._imgs2 = [ImageManager.loadPKDMI("InventorySlotB_00"), ImageManager.loadPKDMI("InventorySlotB_01"), ImageManager.loadPKDMI("InventorySlotB_00"), ImageManager.loadPKDMI("InventorySlotB_00")];
      return this._imgs3 = [ImageManager.loadPKDMI("InventorySlotC_00"), ImageManager.loadPKDMI("InventorySlotC_01"), ImageManager.loadPKDMI("InventorySlotC_00"), ImageManager.loadPKDMI("InventorySlotC_00")];
    }

    _createCell() {
      this._cell = new KDCore.Button();
      this._cell.setButtonImages(...this._imgs0);
      //index = @getMyIndex()
      return this.add(this._cell);
    }

    //getMyIndex: -> @i * 5 + @j
    _createIconSpr() {
      if (this.customCellParams != null) {
        this._iconSpr = this._createCustomIconSpr();
      } else {
        this._iconSpr = KDCore.Sprite.FromBitmap(30, 30);
        this._iconSpr.move(4, 4);
      }
      this._iconSprPlace.addChild(this._iconSpr);
      if (this.item != null) {
        return this.drawIconExt(this.item.iconIndex);
      }
    }

    _createCustomIconSpr() {
      var h, iconSpr, w;
      if (this.customCellParams.iconMode === 0) {
        iconSpr = KDCore.Sprite.FromBitmap(32);
        w = this.slotBitmap.width;
        h = this.slotBitmap.height;
        iconSpr.anchor.x = 0.5;
        iconSpr.anchor.y = 0.5;
        iconSpr.x = w / 2;
        iconSpr.y = h / 2;
      } else {
        iconSpr = KDCore.Sprite.FromBitmap(this.customCellParams.iconSize);
        iconSpr.move(4, 4);
      }
      return iconSpr;
    }

    _createQualityLevelSpr() {
      if (!PKD_MI.Parameters.get_AllowRareSystem()) {
        return;
      }
      this._rareSpr = new Sprite();
      return this.add(this._rareSpr);
    }

    _createSpecial() {
      this._createSpecialSpr();
      return this._createSpecialText();
    }

    _createSpecialSpr() {
      this._specialSpr = PKD_MI.FromImgI("InventorySlotA");
      this._specialSpr.move(KDCore.Utils.jsonPos(this.settings.invCellCornerPosition));
      this._specialSpr.visible = false;
      return this.add(this._specialSpr);
    }

    _createSpecialText() {
      this._specialSprText = KDCore.Sprite.FromBitmap(this.settings.cellItemSpecialText.textBoxWidth, this.settings.cellItemSpecialText.textBoxHeight);
      this.applyTextSettingsByExtraSettings(this._specialSprText, this.settings.cellItemSpecialText);
      this._specialSpr.add(this._specialSprText);
    }

    _createCountText() {
      this._textSpr = KDCore.Sprite.FromBitmap(this.settings.cellItemCountText.textBoxWidth, this.settings.cellItemCountText.textBoxHeight);
      this.applyTextSettingsByExtraSettings(this._textSpr, this.settings.cellItemCountText);
      return this.add(this._textSpr);
    }

    //@drawCount 4

      //?UPD18
    setItem(item1) {
      this.item = item1;
      if ((this.item != null) && !this.isLocked()) {
        this.drawIconExt();
        this.drawQualityLevel(DataManager.getItemQualityLevel(this.item));
        this.drawCount($gameParty.numItems(this.item));
        this.refreshSpecialState();
        return this.registerClick();
      } else {
        return this.clear();
      }
    }

    drawIconExt() {
      var extraImg;
      extraImg = DataManager.getItemInvImage(this.item);
      if (String.any(extraImg)) {
        this.drawIcon(ImageManager.loadPKDMI_Icon(extraImg));
      } else {
        this.drawIcon(this.item.iconIndex);
      }
    }

    refreshSpecialState() {
      if (this.item == null) {
        return;
      }
      this._checkUsableThread = null;
      if (DataManager.isItem(this.item)) {
        return this._refreshItemState();
      } else {
        return this._refreshEquipmentState();
      }
    }

    //?UPD18
    _refreshItemState() {
      var notAllowedOccasion;
      if (this.isLocked()) {
        this.disableItem();
      }
      //allowedOccasion = 2 # * MENU SCREEN
      //allowedOccasion = 1 if PKD_MI.isMap() # * BATTLE SCREEN
      //@disableItem() if @item.occasion != allowedOccasion
      //@disableItem() if PKD_MI.isMap() and !@item.meta.ABS?
      notAllowedOccasion = 1; // * BATTLE SCREEN
      if (this.item.occasion === notAllowedOccasion) {
        this.disableItem();
      }
      if (this.isEnabled()) {
        //@_checkItemOnPanel()
        return this._checkUsable();
      }
    }

    disableItem() {
      return this._fader.visible = true;
    }

    _checkItemOnPanel() {}

    //index = $gameParty.leader().skillIndexOnUI(@item.id, true)
    //index = -1
    //if index >= 0
    //@_applyItemSpecialState(index + 1)
    _applyItemSpecialState(index) {
      this._inSpecialState = true;
      this._cell.setButtonImages(...this._imgs1);
      this._specialSpr.bitmap = ImageManager.loadPKDMI('InventorySlotA');
      this._specialSprText.clear();
      this._specialSprText.drawTextFull(index.toString(), this.settings.cellItemSpecialText.position);
      return this._specialSpr.visible = true;
    }

    _refreshEquipmentState() {
      var actor, canEquip, e, equippedAlready, equips, i, j, k, len, ref, results;
      try {
        if (PKD_MI.isPartyInventoryAllowed()) {
          // * Чтобы одна и таже вещь на разных показывалась
          this.whoCanEquip = [];
          this.whoCanUnEquip = [];
          ref = PKD_MI.partyGroup();
          for (k = 0, len = ref.length; k < len; k++) {
            actor = ref[k];
            if (this.whoCanUnEquip.length === 0) {
              this._refreshEquipmentStateForActor(actor);
            }
          }
          if (this.whoCanEquip.length === 0 && this.whoCanUnEquip.length === 0) {
            // * Если предмет не экиперован и никто не может экиперовать, отключить
            this.disableItem();
          }
          if (this.isEnabled()) { // * Метод из версии 1.0
            return this._checkEquipmentsUsable();
          }
        } else {
          // * DISABLE IF CANNOT EQUIP
          canEquip = $gameParty.leader().canEquip(this.item);
          if (!canEquip) {
            this.disableItem();
          }
          equips = $gameParty.leader().equips();
          results = [];
          for (i in equips) {
            j = equips[i];
            if (j === this.item) {
              equippedAlready = this._getUnequipCandidtaes()[this.item.id];
              if (equippedAlready != null) {
                continue;
              }
              this._setCandidateForUnequip($gameParty.leader().actorId());
              this._isEquipedItem = true;
              results.push(this._applyEquipmenSpecialState());
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      } catch (error) {
        //@_checkFavState() if DataManager.isWeapon(@item) * NOT NEED, from AA
        e = error;
        return PKD_MI.warning(e);
      }
    }

    _applyEquipmenSpecialState() {
      this._applyEquipmentSpecialCellState();
      this._specialSprText.clear();
      this._specialSprText.drawTextFull(this.settings.cellEquipmentSymbol, this.settings.cellItemSpecialText.position);
      if (this._inSpecialState) {
        return this.drawCount(1);
      } else {
        return this.drawCount($gameParty.numItems(this.item));
      }
    }

    _applyEquipmentSpecialCellState() {
      this._inSpecialState = true;
      this._cell.setButtonImages(...this._imgs2);
      this._specialSpr.bitmap = ImageManager.loadPKDMI('InventorySlotB');
      this._specialSpr.visible = true;
    }

    _checkFavState() {
      var symbol;
      //symbol = $gameParty.leader().getFavWeapSymbol(@item)
      symbol = null;
      if (symbol == null) {
        return;
      }
      this._isFavWeapon = true;
      symbol = symbol.toUpperCase();
      if (this._inSpecialState === true) {
        symbol = this.settings.cellEquipmentSymbol + "|" + symbol;
      }
      return this._applyEquipmenFavSpecialState(symbol);
    }

    _applyEquipmenFavSpecialState(symbol) {
      this._applyEquipmentSpecialCellState();
      this._specialSprText.clear();
      this._specialSprText.drawTextFull(symbol, this.settings.cellItemSpecialText.position);
    }

    //@drawCount($gameParty.numItems(@item))
    registerClick() {
      var index;
      //if @isEnabled()
      this._cell._clickHandlers = [];
      index = this.index;
      this._cell.addClickHandler(function() {
        return PKD_MI.onInvCellClick(index);
      });
    }

    //else
    //    @_cell._clickHandlers = []
    clear() {
      this.item = null;
      this._checkUsableThread = null;
      this._isEquipedItem = false;
      this._isFavWeapon = false;
      this._fader.visible = false;
      this._isChestItem = false;
      this._cell._clickHandlers = [];
      this._clearSpeacialState();
      this.drawCount(0);
      this.drawIcon(0);
      return this.drawQualityLevel(-1);
    }

    _clearSpeacialState() {
      if (this._inSpecialState === true) {
        this._cell.setButtonImages(...this._imgs0);
        this._specialSpr.visible = false;
      }
      return this._inSpecialState = false;
    }

    drawCount(count) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      //@_textSpr.bitmap.fillAll KDCore.Color.RED
      if (count > 1) {
        return this._textSpr.drawTextFull(count, this.settings.cellItemCountText.position);
      }
    }

    drawIcon(iconIndex) {
      if (this._iconSpr == null) {
        return;
      }
      this._iconSpr.clear();
      if (iconIndex instanceof Bitmap || iconIndex > 0) {
        if (iconIndex instanceof Bitmap && !iconIndex.isReady()) {
          iconIndex.addLoadListener(() => {
            return this.drawIcon(iconIndex);
          });
        }
        if (this.customCellParams != null) {
          if (this.customCellParams.iconMode === 0) {
            this._iconSpr.bitmap.drawIcon(0, 0, iconIndex, 32);
          } else {
            this._iconSpr.bitmap.drawIcon(0, 0, iconIndex, this.slotBitmap.width - 8);
          }
        } else {
          this._iconSpr.bitmap.drawIcon(0, 0, iconIndex, 30);
        }
      }
    }

    drawQualityLevel(level) {
      if (this._rareSpr == null) {
        return;
      }
      if (level < 0) {
        this._rareSpr.bitmap = new Bitmap(1, 1);
        return;
      }
      this._rareSpr.bitmap = ImageManager.loadPKDMI('QualityLevel_' + level);
    }

    isHovered() {
      return this._cell.isMouseInButton();
    }

    isEnabled() {
      return this._fader.visible === false;
    }

    _createFader() {
      if (this.customCellParams != null) {
        this._fader = KDCore.Sprite.FromBitmap(this.customCellParams.iconSize);
      } else {
        this._fader = KDCore.Sprite.FromBitmap(30, 30);
      }
      this._fader.bitmap.fillAll(KDCore.Color.BLACK);
      this._fader.opacity = 120;
      this._fader.visible = false;
      this._fader.move(4, 4);
      return this.add(this._fader);
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    isCanBeUnEquiped() {
      return this._inSpecialState === true && this._isEquipedItem === true;
    }

    setChestItem(item) {
      var iCount;
      if (item == null) {
        return;
      }
      this.item = item[0];
      if (PKD_MI.isGoldItem(this.item)) {
        iCount = $gameTemp.__visualChestGoldCount;
        $gameTemp.__visualChestGoldCell = this;
      } else {
        iCount = item[1];
      }
      if ((this.item != null) && (iCount != null)) {
        this.drawIconExt();
        this.drawCount(iCount);
        this.drawQualityLevel(DataManager.getItemQualityLevel(this.item));
        this.registerClickForChest();
        return this._isChestItem = true;
      } else {
        return this.clear();
      }
    }

    registerClickForChest() {
      var index;
      index = this.index;
      return this._cell.addClickHandler(function() {
        return PKD_MI.onChestCellClick(index);
      });
    }

    
      //?UPDX
    update() {
      var ref;
      KDCore.Sprite.prototype.update.call(this);
      if ((ref = this._checkUsableThread) != null) {
        ref.update();
      }
      if ($gameTemp._pkdMICellMoving === true) {
        return;
      }
      if (TouchInput.isPressed() && this.isHovered()) {
        if (this.item == null) {
          return;
        }
        this._pressTimer++;
        if (this._pressTimer >= 10) {
          return this.startMovingCell();
        }
      } else {
        return this._pressTimer = 0;
      }
    }

    //?UPDX, #?UPD18
    startMovingCell() {
      if (this._isChestItem === true) {
        return;
      }
      if (!PKD_MI.Parameters.get_UseOuterItems() && !PKD_MI.Parameters.isThrowOutEnabled()) {
        return;
      }
      if ($gameTemp._pkdMICellFocused === true) {
        return;
      }
      $gameTemp._pkdMIHotCellMoving = -1;
      return PKD_MI.startMoveCell(this.item);
    }

    _createLockCellSprite() {
      this._lockCellSpr = new Sprite(ImageManager.loadPKDMI("InventorySlot_locked"));
      this._lockCellSpr.visible = false;
      return this.addChild(this._lockCellSpr);
    }

    //?u19
    //?VERSION
    prepareForCategory(categoryIndex) { // * NOTHING
      this.categoryIndex = categoryIndex;
    }

  };
  PKD_MI.register(Sprite_MapInvCell);
})();

// ■ END Sprite_MapInvCell.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInventoryStatText.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapInventoryStatText;
  Sprite_MapInventoryStatText = class Sprite_MapInventoryStatText extends KDCore.Sprite {
    constructor(statId, cell) {
      super();
      this.statId = statId;
      this.cell = cell;
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createContent();
      return this._drawValues();
    }

    _loadSettings() {
      return this.settings = this._settingsJSON();
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    _createContent() {
      this.baseTextLine = KDCore.Sprite.FromTextSettings(this.settings.EquipmentStats.statText);
      //@baseTextLine.fillAll(KDCore.Color.RED)
      return this.addChild(this.baseTextLine);
    }

    _drawValues() {
      var actor, item;
      item = this.cell.item;
      if (PKD_MI.partyGroup().length === 1 || !PKD_MI.isPartyInventoryAllowed()) {
        return this._drawStateValueForActor($gameParty.leader());
      } else {
        if (this.isEquipped() && (this.cell.whoCanEquip.last() != null)) {
          actor = $gameActors.actor(this.cell.whoCanEquip.last());
          return this._drawStateValueForActor(actor);
        } else {
          if (this.cell.whoCanEquip != null) {
            actor = $gameActors.actor(this.cell.whoCanEquip.first());
            if (actor != null) {
              return this._drawStateValueForActor(actor);
            } else {
              return this._drawEquipValue();
            }
          } else {
            return this._drawEquipValue(); // * CHESTS
          }
        }
      }
    }

    _drawStateValueForActor(actor) {
      if (this.isEquipped()) {
        if (PKD_MI.Parameters.get_AllowFullStats()) {
          return this._drawStateValue(actor[this.statId], 'normal');
        } else {
          return this._drawEquipValue();
        }
      } else {
        return this._drawStateDiffValue(actor);
      }
    }

    _drawStateValue(value, colorType) {
      this.baseTextLine.b().textColor = this.getColorHex(colorType);
      return this.baseTextLine.drawTextFull(value, 'center');
    }

    _drawEquipValue() {
      var paramId, type, value;
      paramId = this.paramValueId();
      if (paramId >= 0) {
        value = this.cell.item.params[paramId];
      } else {
        value = 0;
      }
      type = 'normal';
      if (value < 0) {
        type = 'lower';
      } else if (value > 0) {
        type = 'hight';
        value = "+" + value;
      }
      this.baseTextLine.b().textColor = this.getColorHex(type);
      this.baseTextLine.drawTextFull(value, 'center');
    }

    _drawStateDiffValue(actor) {
      var actorCurrentParam, actorParamBase, eq, equippedValue, newValue, paramId, paramValue, t, type;
      paramId = this.paramValueId();
      if (paramId >= 0) {
        paramValue = this.cell.item.params[paramId];
      } else {
        paramValue = 0;
      }
      eq = this._equipedOne(actor, this.cell.item);
      if (eq != null) {
        equippedValue = eq.params[paramId];
      } else {
        equippedValue = 0;
      }
      actorParamBase = actor[this.statId] - equippedValue;
      actorCurrentParam = actor[this.statId];
      newValue = actorParamBase + paramValue;
      if (newValue === actorCurrentParam) {
        type = 'normal';
      } else if (newValue > actorCurrentParam) {
        type = 'hight';
      } else {
        type = 'lower';
      }
      if (type === 'normal') {
        this._drawStateValue(newValue, 'normal');
      } else {
        t = "";
        if (type === 'lower') {
          t = newValue + "(-" + (actorCurrentParam - newValue) + ")";
        } else {
          t = newValue + "(+" + (newValue - actorCurrentParam) + ")";
        }
        this.baseTextLine.b().textColor = this.getColorHex(type);
        this.baseTextLine.drawTextFull(t, 'center');
      }
    }

    _equipedOne(actor, item) {
      item = actor.equips()[item.etypeId - 1];
      //console.info item
      return item;
    }

    paramValueId() {
      switch (this.statId) {
        case 'atk':
          return 2;
        case 'def':
          return 3;
        case 'mat':
          return 4;
        case 'mdf':
          return 5;
        case 'agi':
          return 6;
        case 'luk':
          return 7;
        default:
          return -1;
      }
    }

    isOnlyleader() {
      return PKD_MI.partyGroup().length === 1;
    }

    isEquipped() {
      return this.cell._isEquipedItem === true && this.cell._inSpecialState === true;
    }

    getColorHex(colorType) {
      switch (colorType) {
        case 'normal':
          return KDCore.Color.FromHex(this.settings.EquipmentStats.statTextColor).CSS;
        case 'lower':
          return KDCore.Color.FromHex(this.settings.EquipmentStats.statLowerColor).CSS;
        case 'hight':
          return KDCore.Color.FromHex(this.settings.EquipmentStats.statHightColor).CSS;
        default:
          return KDCore.Color.WHITE.CSS;
      }
    }

  };
  PKD_MI.register(Sprite_MapInventoryStatText);
})();

// ■ END Sprite_MapInventoryStatText.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInvFooter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapInvFooter;
  Sprite_MapInvFooter = class Sprite_MapInvFooter extends KDCore.Sprite {
    constructor() {
      super();
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createContent();
      return this._createSectionControl();
    }

    _loadSettings() {
      return this.settings = this._settingsJSON();
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    _createContent() {
      this._createGoldIcon();
      this._createGoldTextSpr();
      return this._createWeightSystem();
    }

    _createWeightSystem() {
      if (PKD_MI.Parameters.get_UsedWSystem()) {
        this._createWeightTextSpr();
        return this._createWeightIcon();
      }
    }

    _createGoldIcon() {
      this.goldIcon = PKD_MI.FromImgI(this.settings.goldIcon);
      this.goldIcon.move(KDCore.Utils.jsonPos(this.settings.goldIconPosition));
      return this.add(this.goldIcon);
    }

    _createGoldTextSpr() {
      this._textSpr = KDCore.Sprite.FromBitmap(this.settings.goldText.textBoxWidth, this.settings.goldText.textBoxHeight);
      this.applyTextSettingsByExtraSettings(this._textSpr, this.settings.goldText);
      return this.add(this._textSpr);
    }

    //@drawGold "3444"
    drawGold(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      //@_textSpr.bitmap.fillAll KDCore.Color.RED
      return this._textSpr.drawTextFull(text, this.settings.goldText.position);
    }

    _createWeightIcon() {
      var icon;
      icon = PKD_MI.FromImgI(this.settings.weightIcon);
      icon.move(KDCore.Utils.jsonPos(this.settings.weightIconPosition));
      return this.add(icon);
    }

    _createWeightTextSpr() {
      var extraFooter;
      extraFooter = PKD_MI.FromImgI(this.settings.extraFooter);
      extraFooter.move(KDCore.Utils.jsonPos(this.settings.extraFooterPosition));
      this.add(extraFooter);
      this._textSpr3 = KDCore.Sprite.FromBitmap(this.settings.weightText.textBoxWidth, this.settings.weightText.textBoxHeight);
      this.applyTextSettingsByExtraSettings(this._textSpr3, this.settings.weightText);
      return this.add(this._textSpr3);
    }

    //@drawWeight "344/444", false
    drawWeight(text, isOver) {
      var tc;
      if (this._textSpr3 == null) {
        return;
      }
      this._textSpr3.clear();
      if (this.settings.weightText.backgroundFill != null) {
        this._textSpr3.bitmap.fillAll(KDCore.Color.FromHex(this.settings.weightText.backgroundFill));
      }
      tc = KDCore.Color.FromHex(this.settings.weightText.textColor).CSS;
      if (isOver) {
        tc = KDCore.Color.FromHex(this.settings.weightText.textColor2).CSS;
      }
      this._textSpr3.bitmap.textColor = tc;
      return this._textSpr3.drawTextFull(text, this.settings.weightText.position);
    }

    _createSectionControl() {
      this._createArrows();
      return this._createPageText();
    }

    _createArrows() {
      var img0, img1, img3;
      this._arrowL = new KDCore.Button();
      img0 = ImageManager.loadPKDMI("inventoryArrowLeft_00");
      img1 = ImageManager.loadPKDMI("inventoryArrowLeft_01");
      img3 = ImageManager.loadPKDMI("inventoryArrowLeft_03");
      this._arrowL.setButtonImages(img0, img1, img0, img3);
      this._arrowL.move(KDCore.Utils.jsonPos(this.settings.pageArrowLeftInSectionPos));
      this._arrowL.disable();
      this._arrowL.addClickHandler(function() {
        SoundManager.playCursor();
        PKD_MI.invShowPrevPage();
      });
      this.add(this._arrowL);
      this._arrowR = new KDCore.Button();
      img0 = ImageManager.loadPKDMI("inventoryArrowRight_00");
      img1 = ImageManager.loadPKDMI("inventoryArrowRight_01");
      img3 = ImageManager.loadPKDMI("inventoryArrowRight_03");
      this._arrowR.setButtonImages(img0, img1, img0, img3);
      this._arrowR.move(KDCore.Utils.jsonPos(this.settings.pageArrowRightInSectionPos));
      this._arrowR.disable();
      this._arrowR.addClickHandler(function() {
        SoundManager.playCursor();
        PKD_MI.invShowNextPage();
      });
      this.add(this._arrowR);
    }

    _createPageText() {
      this._textSpr2 = KDCore.Sprite.FromBitmap(this.settings.pageText.textBoxWidth, this.settings.pageText.textBoxHeight);
      this.applyTextSettingsByExtraSettings(this._textSpr2, this.settings.pageText);
      this.add(this._textSpr2);
      return this.drawPagesCount(1, 1);
    }

    drawPagesCount(current, max) {
      var text;
      if (this._textSpr2 == null) {
        return;
      }
      this._textSpr2.clear();
      //@_textSpr2.bitmap.fillAll KDCore.Color.RED
      text = current + "/" + max;
      return this._textSpr2.drawTextFull(text, this.settings.pageText.position);
    }

    //@[ALIAS]
    update() {
      super.update();
      if (this._wPulseThread != null) {
        this._wPulseThread.update();
      }
    }

    pulseWeightText() {
      if (this._textSpr3 == null) {
        return;
      }
      if (this._wPulseThread != null) {
        this._textSpr3.opacity = 255;
      }
      this._pulseCount = 3;
      this._pulseTimer = 0;
      return this._wPulseThread = new KDCore.TimedUpdate(10, this._onPulseThread.bind(this));
    }

    _onPulseThread() {
      this._textSpr3.opacity = Math.abs(Math.sin(this._pulseTimer)) * 255;
      this._pulseTimer += 10;
      //console.log(@_pulseTimer)
      if (this._pulseTimer >= 30) {
        this._pulseTimer = 0;
        this._pulseCount--;
      }
      //console.log(@_pulseCount)
      if (this._pulseCount <= 0) {
        this._wPulseThread = null;
        this._textSpr3.opacity = 255;
      }
    }

    disableArrows() {
      this._arrowL.disable();
      return this._arrowR.disable();
    }

  };
  PKD_MI.register(Sprite_MapInvFooter);
})();

// ■ END Sprite_MapInvFooter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInvHeader.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapInvHeader;
  Sprite_MapInvHeader = class Sprite_MapInvHeader extends KDCore.Sprite {
    constructor() {
      super();
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createBackground();
      this._drawIcon();
      this._createContent();
      return this._createCloseButton();
    }

    _createBackground() {
      this._background = PKD_MI.FromImgI(this.settings.headerBackImg);
      return this.add(this._background);
    }

    _drawIcon() {
      var icon;
      if (this.settings.icon == null) {
        return;
      }
      icon = PKD_MI.FromImgI(this.settings.icon);
      icon.move(this.settings.iconMarginX, this.settings.iconMarginY);
      return this.add(icon);
    }

    _createContent() {
      var addedCount, availableCatList, img0, img1, img3;
      this._content = new Sprite();
      availableCatList = this.settings.availableCategories;
      addedCount = 0;
      this.categoryBtns = [];
      //? this is must be above items! here...
      img0 = ImageManager.loadPKDMI(this.settings.categoryButtonImg);
      img1 = ImageManager.loadPKDMI(this.settings.categoryButtonHoverImg);
      img3 = ImageManager.loadPKDMI(this.settings.categoryButtonSelectedImg);
      if (availableCatList.items === true) {
        this.category1 = new KDCore.Button();
        this.category1.setButtonImages(img0, img1, img0, img3);
        this.category1.addClickHandler(function() {
          SoundManager.playCursor();
          PKD_MI.invShowCategoryItems();
        });
        this._content.addChild(this.category1);
        this.categoryBtns.push(this.category1);
        addedCount++;
      } else {
        this.category1 = null;
        this.categoryBtns.push(null);
      }
      if (availableCatList.weapons === true) {
        this.category2 = new KDCore.Button();
        this.category2.setButtonImages(img0, img1, img0, img3);
        if (addedCount !== 0) {
          this.category2.move(this.settings.categoryButtonMarginBetween * addedCount, 0);
        } else {
          this.category2.move(0, 0); //?line
        }
        this.category2.addClickHandler(function() {
          SoundManager.playCursor();
          PKD_MI.invShowCategoryWeapons();
        });
        this._content.addChild(this.category2);
        this.categoryBtns.push(this.category2);
        addedCount++;
      } else {
        this.categoryBtns.push(null);
      }
      if (availableCatList.armors === true) {
        this.category3 = new KDCore.Button();
        this.category3.setButtonImages(img0, img1, img0, img3);
        if (addedCount !== 0) {
          this.category3.move(this.settings.categoryButtonMarginBetween * addedCount, 0);
        } else {
          this.category3.move(0, 0); //?line
        }
        this.category3.addClickHandler(function() {
          SoundManager.playCursor();
          PKD_MI.invShowCategoryArmors();
        });
        this._content.addChild(this.category3);
        this.categoryBtns.push(this.category3);
        addedCount++;
      } else {
        this.categoryBtns.push(null);
      }
      if (availableCatList.keyItems === true) {
        this.category4 = new KDCore.Button();
        this.category4.setButtonImages(img0, img1, img0, img3);
        if (addedCount !== 0) {
          this.category4.move(this.settings.categoryButtonMarginBetween * addedCount, 0);
        } else {
          this.category4.move(0, 0); //?line
        }
        this.category4.addClickHandler(function() {
          SoundManager.playCursor();
          PKD_MI.invShowCategoryKeyItems();
        });
        this._content.addChild(this.category4);
        this.categoryBtns.push(this.category4);
      } else {
        this.categoryBtns.push(null);
      }
      this._content.move(this.settings.categoryButtonsMarginX, this.settings.categoryButtonsMarginY);
      this._createCategoryIcons();
      this.add(this._content);
    }

    _createCategoryIcons() {
      var i, icon, j, ref, ref1, results;
      results = [];
      for (i = j = 0, ref = this.categoryBtns.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        icon = PKD_MI.FromImgI(this.settings.categoriesIcons[i]);
        results.push((ref1 = this.categoryBtns[i]) != null ? ref1.addChild(icon) : void 0);
      }
      return results;
    }

    _createCloseButton() {
      var img0, img1;
      if (this.settings.isCloseButtonVisible !== true) {
        return;
      }
      this.closeBtn = new KDCore.Button();
      img0 = ImageManager.loadPKDMI(this.settings.closeButtonImg);
      img1 = ImageManager.loadPKDMI(this.settings.closeButtonHoverImg);
      this.closeBtn.setButtonImages(img0, img1, img0, img0);
      this.closeBtn.move(this.settings.closeButtonMarginX, this.settings.closeButtonMarginY);
      this.closeBtn.addClickHandler(function() {
        return PKD_MI.closeInventoryByClick();
      });
      return this.add(this.closeBtn);
    }

    _loadSettings() {
      return this.settings = this._settingsJSON();
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    enableAllButtons() {
      var btn, j, len, ref, results;
      ref = this.categoryBtns;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        btn = ref[j];
        results.push(btn != null ? btn.enable() : void 0);
      }
      return results;
    }

    getHoveredIndex() {
      var btn, i, j, ref;
      for (i = j = 0, ref = this.categoryBtns.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        btn = this.categoryBtns[i];
        if (btn != null ? btn.isMouseInButton() : void 0) {
          return i;
        }
      }
      return null;
    }

    isMouseIn() {
      var pos, rx, ry;
      pos = TouchInput;
      rx = KDCore.SDK.canvasToLocalX(this._background, pos.x);
      ry = KDCore.SDK.canvasToLocalY(this._background, pos.y);
      return rx >= 0 && ry >= 0 && rx <= this._background.width && ry <= this._background.height;
    }

  };
  PKD_MI.register(Sprite_MapInvHeader);
})();

// ■ END Sprite_MapInvHeader.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInvHelp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapInvHelp;
  Sprite_MapInvHelp = class Sprite_MapInvHelp extends KDCore.Sprite {
    constructor() {
      super();
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createBackground();
      this._createContent();
      return this._createCorner();
    }

    _loadSettings() {
      this.basicSettings = this._settingsJSON();
      return this.settings = this.basicSettings.helpWindow;
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    _createBackground() {
      this._background = KDCore.Sprite.FromBitmap(this.settings.width, this.settings.height);
      this._background.bitmap.fillAll(KDCore.Color.FromHex(this.settings.backgroundColor));
      this._background.opacity = this.settings.backgroundOpacity;
      return this.add(this._background);
    }

    _createCorner() {
      this._corner = PKD_MI.FromImgI('inventoryHintCorner');
      return this._background.add(this._corner);
    }

    _createContent() {
      this.content = new Sprite();
      this._createCost();
      this._createName();
      this._creatType();
      this._createDescription();
      this._createWeight();
      this._createQLevel();
      this._createStats();
      return this._background.add(this.content);
    }

    _createCost() {
      this._textCostSpr = KDCore.Sprite.FromTextSettings(this.settings.itemCostText);
      this.content.addChild(this._textCostSpr);
      this.goldIcon = PKD_MI.FromImgI(this.basicSettings.goldIcon);
      this.goldIcon.move(KDCore.Utils.jsonPos(this.settings.goldIconPosition));
      return this.content.addChild(this.goldIcon);
    }

    _createName() {
      this._textNameSpr = KDCore.Sprite.FromTextSettings(this.settings.itemNameText);
      return this.content.addChild(this._textNameSpr);
    }

    _creatType() {
      this._textTypeSpr = KDCore.Sprite.FromTextSettings(this.settings.itemTypeText);
      return this.content.addChild(this._textTypeSpr);
    }

    _createDescription() {
      var ffFace, ffSize, fontProcess, p;
      p = this.settings.descriptionWindow;
      //console.info @settings.descriptionWindow
      if (KDCore.isMV()) {
        this._description = new Window_Base(p.x, p.y, p.width, p.height);
      } else {
        this._description = new Window_Base(new PIXI.Rectangle(p.x, p.y, p.width, p.height));
      }
      this._description.setBackgroundType(2);
      this.content.addChild(this._description);
      if (KDCore.isMV()) {
        this._description.standardFontSize = function() {
          return p.fontSize;
        };
        this._description.lineHeight = function() {
          return 12;
        };
        this._description.standardPadding = function() {
          return 6;
        };
        if (p.fontFace != null) {
          return this._description.standardFontFace = function() {
            return p.fontFace;
          };
        }
      } else {
        ffFace = p.fontFace;
        ffSize = p.fontSize;
        fontProcess = function() {
          if (ffFace != null) {
            this.contents.fontFace = ffFace;
          } else {
            this.contents.fontFace = $gameSystem.mainFontFace();
          }
          this.contents.fontSize = ffSize;
          return this.resetTextColor();
        };
        this._description.resetFontSettings = fontProcess.bind(this._description);
      }
    }

    _createWeight() {
      var wIcon;
      if (!PKD_MI.Parameters.get_UsedWSystem()) {
        return;
      }
      this._textWeightSpr = KDCore.Sprite.FromTextSettings(this.settings.itemWeightText);
      this.content.addChild(this._textWeightSpr);
      wIcon = PKD_MI.FromImgI(this.basicSettings.weightIcon);
      wIcon.move(KDCore.Utils.jsonPos(this.settings.weighIconPosition));
      return this.content.addChild(wIcon);
    }

    _createQLevel() {
      var wIcon;
      if (!PKD_MI.Parameters.get_AllowRareSystem()) {
        return;
      }
      this._textQLevelSpr = KDCore.Sprite.FromTextSettings(this.settings.itemQualityText);
      if (this.basicSettings.QualitySystem.qualityIcon != null) {
        wIcon = PKD_MI.FromImgI(this.basicSettings.QualitySystem.qualityIcon);
        wIcon.move(KDCore.Utils.jsonPos(this.settings.qualityIconPosition));
        this.content.addChild(wIcon);
      }
      return this.content.addChild(this._textQLevelSpr);
    }

    _createStats() {
      if (!PKD_MI.Parameters.get_AllowEquipStats()) {
        return;
      }
      this._stats = PKD_MI.FromImgI(this.basicSettings.EquipmentStats.statsBackImage);
      this._stats.move(this.basicSettings.EquipmentStats.position);
      this._stats.visible = false;
      return this.content.addChild(this._stats);
    }

    delay() {
      return this.settings.showDelay;
    }

    showItemStats() {
      if (this._stats == null) {
        return;
      }
      if (!this._isStatsAllowed) {
        return;
      }
      if (this._stats.visible === true) {
        this._description.visible = true;
        this._stats.visible = false;
      } else {
        this._description.visible = false;
        this._stats.visible = true;
      }
    }

    setup(cell) {
      this.cell = cell;
      this._isStatsAllowed = false;
      if (this.cell == null) {
        return;
      }
      this.drawCost();
      this.drawName();
      this.drawType();
      this.drawDesc();
      this.showActionHelp();
      if (PKD_MI.Parameters.get_UsedWSystem()) {
        this.drawWeight();
      }
      if (PKD_MI.Parameters.get_AllowRareSystem()) {
        this.drawQLevel();
      }
      if (PKD_MI.Parameters.get_AllowEquipStats()) {
        this.setupStats();
        return this.showStatsHelp();
      }
    }

    setupStats() {
      var item;
      item = this.cell.item;
      if (DataManager.isItem(item)) {
        return this._isStatsAllowed = false;
      } else {
        this._createStatesParamsValues();
        return this._isStatsAllowed = true;
      }
    }

    showStatsHelp() {
      var actionHelpSpr, helpIcon, s;
      if (!this._isStatsAllowed) {
        return;
      }
      s = this.basicSettings.EquipmentStats;
      actionHelpSpr = KDCore.Sprite.FromTextSettings(s.statsHelpText);
      //actionHelpSpr.fillAll()
      actionHelpSpr.drawTextWithSettings(s.helpIconText);
      this.content.addChild(actionHelpSpr);
      helpIcon = PKD_MI.FromImgI("inventoryScrollHelp");
      helpIcon.move(KDCore.Utils.jsonPos(s.helpIconPosition));
      return this.content.addChild(helpIcon);
    }

    drawCost() {
      var ref, text;
      text = this.cell.item.price;
      //@_textCostSpr.fillAll()
      return (ref = this._textCostSpr) != null ? ref.drawTextWithSettings(text) : void 0;
    }

    //u20
    drawName() {
      var text;
      if (this._textNameSpr == null) {
        return;
      }
      text = this.cell.item.name;
      this._textNameSpr.drawTextWithSettings(text);
      if (!PKD_MI.Parameters.isShowItemNameWithQualityColor()) {
        return;
      }
      this._drawNameWithQualityColor(text);
    }

    //u20
    _drawNameWithQualityColor(name) {
      var quality;
      quality = DataManager.getItemQualityLevel(this.cell.item);
      if (quality < 0) {
        return;
      }
      this._textNameSpr.clear();
      this._textNameSpr.bitmap.textColor = PKD_MI.GetColorForQuealityLevel(quality);
      return this._textNameSpr.drawTextFull(name, this.settings.itemNameText.position);
    }

    drawType() {
      var ref, text, type;
      type = this._getTypeText(this.cell.item);
      text = type.text;
      this._textTypeSpr.bitmap.textColor = KDCore.Color.FromHex(type.color).CSS;
      //@_textTypeSpr.fillAll()
      return (ref = this._textTypeSpr) != null ? ref.drawTextWithSettings(text) : void 0;
    }

    _getTypeText(item) {
      var color, e, specialColor, specialText, text;
      color = null;
      text = null;
      try {
        if (DataManager.isItem(item)) {
          if (item.itypeId === 1) { // * NORMAL
            if (item.consumable === true) {
              text = this.settings.consumableTypeText;
              color = this.settings.defaultTypeColors.consumableItem;
            } else {
              text = TextManager.item;
              color = this.settings.defaultTypeColors.normalItem; // * KEY
            }
          } else {
            text = TextManager.keyItem;
            color = this.settings.defaultTypeColors.keyItem;
          }
        } else {
          if (DataManager.isWeapon(item)) {
            text = $dataSystem.weaponTypes[item.wtypeId];
            color = this.settings.defaultTypeColors.weapon;
          } else if (DataManager.isArmor(item)) {
            text = $dataSystem.armorTypes[item.atypeId];
            color = this.settings.defaultTypeColors.armor;
          }
        }
      } catch (error) {
        e = error;
        PKD_MI.warning('_getTypeText', e);
      }
      specialText = this._getItemSpecialTypeText(item);
      if (specialText != null) {
        text = specialText.trim();
      }
      specialColor = this._getItemSpecialTypeColor(item);
      if (specialColor != null) {
        color = specialColor.trim();
      }
      if (text == null) {
        text = "Unknown";
      }
      if (color == null) {
        color = "#FFFFFF";
      }
      return {text, color};
    }

    //u19
    _getItemSpecialTypeText(item) {
      var text;
      if (item.meta == null) {
        return null;
      }
      text = item.meta.aItemType;
      if (String.any(text)) {
        text = text.replaceAll("|", ", ");
      }
      return text;
    }

    _getItemSpecialTypeColor(item) {
      if (item.meta == null) {
        return null;
      }
      return item.meta.aItemTypeColor;
    }

    drawDesc() {
      var text;
      this._description.contents.clear();
      text = this.cell.item.description;
      // * why + 150 ???
      this._description.drawTextExWithWordWrap(text, 0, 0, this.settings.descriptionWindow.width + 150);
      this._description.contents.clear();
      return this._description.drawTextExWithWordWrap(text, 0, 0, this.settings.descriptionWindow.width - 10);
    }

    //@_description.drawTextEx text, 0, 0, @settings.descriptionWindow.width + 150
    showActionHelp() {
      var item, name, text;
      if ((PKD_MI.isUserChestIsOpen() || PKD_MI.isStoredChestIsOpen()) && this.cell._isChestItem === false) {
        text = PKD_MI.getUIMapUserChestSettings().putInHelpText;
        this._drawActionHelpText(text);
        return;
      }
      if (!this.cell.isEnabled()) {
        return;
      }
      if (this.cell._isChestItem === true) {
        text = this._getwActionHelpTextChestItem();
      } else {
        item = this.cell.item;
        text = "";
        if (DataManager.isItem(item)) {
          text = this.settings.helpUseItemText;
        } else {
          if (this.cell.isCanBeUnEquiped()) {
            text = this.settings.helpUnEquipItemText;
            if (PKD_MI.isPartyInventoryAllowed()) {
              name = this.cell._getSpecialStateActorName();
              if (name != null) {
                text += " [" + name + "]";
              }
            }
          } else {
            if (PKD_MI.isPartyInventoryAllowed()) {
              text = this.settings.helpEquipItemText;
              if (this.cell.whoCanEquip.length === 1) {
                name = $gameActors.actor(this.cell.whoCanEquip[0]).name();
                if (name != null) {
                  text += " [" + name + "]";
                }
              } else if (this.cell.whoCanEquip.length > 1) {
                text += " [*]";
              }
            } else {
              text = this.settings.helpEquipItemText;
            }
          }
        }
      }
      this._drawActionHelpText(text);
    }

    _getwActionHelpTextChestItem() {
      return PKD_MI.getUIMapChestSettings().helpWindow.helpTakeItemText;
    }

    _drawActionHelpText(text) {
      var actionHelpSpr, helpIcon;
      if ((text != null) && text !== "") {
        actionHelpSpr = KDCore.Sprite.FromTextSettings(this.settings.clickHelpText);
        //actionHelpSpr.fillAll()
        actionHelpSpr.drawTextWithSettings(text);
        this.content.addChild(actionHelpSpr);
        helpIcon = PKD_MI.FromImgI("inventoryClickHelp");
        helpIcon.move(KDCore.Utils.jsonPos(this.settings.helpIconPosition));
        return this.content.addChild(helpIcon);
      }
    }

    drawWeight() {
      var ref, text;
      text = DataManager.getItemWeight(this.cell.item);
      return (ref = this._textWeightSpr) != null ? ref.drawTextWithSettings(text) : void 0;
    }

    drawQLevel() {
      var color, qualityLevel, ref;
      qualityLevel = DataManager.getItemQualityLevel(this.cell.item);
      color = this._getColorForQualityLevel(qualityLevel);
      this._textQLevelSpr.b().textColor = color;
      return (ref = this._textQLevelSpr) != null ? ref.drawTextWithSettings(this._getTextForQualityLevel(qualityLevel)) : void 0;
    }

    _getTextForQualityLevel(qualityLevel) {
      var levelData;
      levelData = this.basicSettings.QualitySystem.Levels[qualityLevel];
      if (levelData == null) {
        return "";
      }
      return levelData[0];
    }

    //u20
    _getColorForQualityLevel(qualityLevel) {
      return PKD_MI.GetColorForQuealityLevel(qualityLevel);
    }

    //u19
    refreshPlacement() {
      var dx, dy, pos;
      if (PKD_MI.Parameters.isStaticDescPosition() === true && (PKD_MI.Parameters.getStaticDescPosition() != null)) {
        this._setStaticPosition();
      } else {
        pos = this.getSourcePos();
        this.move(pos.x + this.settings.marginX, pos.y + this.settings.marginY);
        dx = dy = 0;
        if (this._background.width + this.x + 5 > Graphics.boxWidth) {
          dx = 1;
          this.x -= this.settings.marginX;
        }
        if (this._background.height + this.y + 5 > Graphics.boxHeight) {
          dy = 1;
          this.y -= this.settings.marginY;
        }
        this._background.setStaticAnchor(dx, dy);
        this._refreshCornerPlacement(dx, dy);
      }
    }

    //u19
    _setStaticPosition() {
      var pos;
      pos = PKD_MI.Parameters.getStaticDescPosition();
      if (pos != null) {
        this.move(pos.x, pos.y);
      }
      // * В данном случае corner скрываем
      this._corner.visible = false;
    }

    getSourcePos() {
      var x, y;
      if (this.cell != null) {
        x = KDCore.SDK.toGlobalCoord(this.cell, "x");
        y = KDCore.SDK.toGlobalCoord(this.cell, "y");
        return new KDCore.Point(x, y);
      } else {
        return TouchInput;
      }
    }

    _refreshCornerPlacement(dx, dy) {
      var pos;
      this._corner.scale.x = 1;
      this._corner.scale.y = 1;
      if (dx === 1 && dy === 0) {
        pos = this.settings.cornerPositions.topRight;
      }
      if (dx === 0 && dy === 0) {
        pos = this.settings.cornerPositions.topLeft;
        this._corner.scale.x = -1;
      }
      if (dx === 1 && dy === 1) {
        pos = this.settings.cornerPositions.downRight;
        this._corner.scale.y = -1;
      }
      if (dx === 0 && dy === 1) {
        pos = this.settings.cornerPositions.downLeft;
        this._corner.scale.x = -1;
        this._corner.scale.y = -1;
      }
      return this._corner.move(KDCore.Utils.jsonPos(pos));
    }

    _createStatesParamsValues() {
      var s, sp;
      s = this.basicSettings.EquipmentStats.stats;
      if (s.atk.visible === true) {
        sp = new PKD_MI.LIBS.Sprite_MapInventoryStatText("atk", this.cell);
        sp.move(s.atk.position);
        this._stats.addChild(sp);
      }
      if (s.def.visible === true) {
        sp = new PKD_MI.LIBS.Sprite_MapInventoryStatText("def", this.cell);
        sp.move(s.def.position);
        this._stats.addChild(sp);
      }
      if (s.agi.visible === true) {
        sp = new PKD_MI.LIBS.Sprite_MapInventoryStatText("agi", this.cell);
        sp.move(s.agi.position);
        this._stats.addChild(sp);
      }
      if (s.mat.visible === true) {
        sp = new PKD_MI.LIBS.Sprite_MapInventoryStatText("mat", this.cell);
        sp.move(s.mat.position);
        this._stats.addChild(sp);
      }
      if (s.mdf.visible === true) {
        sp = new PKD_MI.LIBS.Sprite_MapInventoryStatText("mdf", this.cell);
        sp.move(s.mdf.position);
        this._stats.addChild(sp);
      }
      if (s.luk.visible === true) {
        sp = new PKD_MI.LIBS.Sprite_MapInventoryStatText("luk", this.cell);
        sp.move(s.luk.position);
        return this._stats.addChild(sp);
      }
    }

  };
  PKD_MI.register(Sprite_MapInvHelp);
})();

// ■ END Sprite_MapInvHelp.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MainInvItems.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MainInvItems;
  Sprite_MainInvItems = class Sprite_MainInvItems extends KDCore.Sprite {
    constructor(isLockable = false) {
      super();
      this.isLockable = isLockable;
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createItemNameLine();
      return this._createContent();
    }

    _createItemNameLine() {
      this._textSpr = KDCore.Sprite.FromBitmap(this.settings.itemName.textBoxWidth, this.settings.itemName.textBoxHeight);
      this.applyTextSettingsByExtraSettings(this._textSpr, this.settings.itemName);
      return this.add(this._textSpr);
    }

    //@drawItemName "Apple"
    drawItemName(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      //@_textSpr.bitmap.fillAll KDCore.Color.RED
      return this._textSpr.drawTextFull(text, this.settings.itemName.position);
    }

    _createContent() {
      this.content = new Sprite();
      this._createCells();
      this.content.move(KDCore.Utils.jsonPos(this.settings.invCellStartPosition));
      this.add(this.content);
    }

    _createCells() {
      var c, cell, i, index, j, k, params, r, ref, results;
      this._cells = [];
      index = 0;
      r = 5;
      c = 5;
      if (PKD_MI.Parameters.isCustomSizeCells() === true) {
        params = PKD_MI.Parameters.getCustomSizeCellsParameters();
        r = params.rowsPerPage;
        c = params.columnsPerPage;
      }
      results = [];
      for (i = k = 0, ref = r; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
        results.push((function() {
          var l, ref1, results1;
          results1 = [];
          for (j = l = 0, ref1 = c; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
            cell = this._createCell(index++);
            this._cells.push(cell);
            results1.push(this._placeCell(i, j, cell));
          }
          return results1;
        }).call(this));
      }
      return results;
    }

    //?UPD18
    _createCell(index) {
      var cell;
      cell = new PKD_MI.LIBS.Sprite_MapInvCell(index, this._isCellsCanBeLocked());
      this.content.addChild(cell);
      return cell;
    }

    //?UPD18
    _isCellsCanBeLocked() {
      return this.isLockable === true;
    }

    _placeCell(i, j, cell) {
      return cell.move(this.settings.invCellMarginX * j, this.settings.invCellMarginY * i);
    }

    _loadSettings() {
      return this.settings = this._settingsJSON();
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    getCellAt(index) {
      return this._cells[index];
    }

    getHoveredCell() {
      var cell, k, len, ref;
      if (this.focusedCell != null) {
        //return @focusedCell if @focusedCell.isHovered()
        return null;
      }
      ref = this._cells;
      for (k = 0, len = ref.length; k < len; k++) {
        cell = ref[k];
        if (cell.isHovered()) {
          return cell;
        }
      }
      return null;
    }

    clearAllItems() {
      var cell, k, len, ref, results;
      this.clearFocus();
      ref = this._cells;
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        cell = ref[k];
        results.push(cell.clear());
      }
      return results;
    }

    //?UPD18
    prepareForCategory(catIndex) {
      var cell, k, len, ref, results;
      ref = this._cells;
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        cell = ref[k];
        results.push(cell.prepareForCategory(catIndex));
      }
      return results;
    }

  };
  PKD_MI.register(Sprite_MainInvItems);
})();

// ■ END Sprite_MainInvItems.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AA_MInvMainSprite.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapInvMain;
  Sprite_MapInvMain = class Sprite_MapInvMain extends KDCore.Sprite {
    constructor() {
      super();
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createBackground();
      this._main = new Sprite();
      return this.add(this._main);
    }

    _loadSettings() {
      this.settings = this._settingsJSON();
      this.moveByJson(this.settings);
      return this.visible = this.settings.visible;
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    _createBackground() {
      this._background = PKD_MI.FromImgI(this.settings.backgroundImg);
      return this.add(this._background);
    }

    _createHeader() {
      this._header = new PKD_MI.LIBS.Sprite_MapInvHeader();
      return this._main.addChild(this._header);
    }

    //?UPD18
    _createContent() {
      this._content = new PKD_MI.LIBS.Sprite_MainInvItems(PKD_MI.isPro());
      return this._main.addChild(this._content);
    }

    _createFooter() {
      this._footer = new PKD_MI.LIBS.Sprite_MapInvFooter();
      return this._main.addChild(this._footer);
    }

    isMouseIn() {
      var pos, rx, ry;
      if (this._content._isSomePartyActorIsHovered()) {
        return true;
      }
      pos = TouchInput;
      rx = KDCore.SDK.canvasToLocalX(this._background, pos.x);
      ry = KDCore.SDK.canvasToLocalY(this._background, pos.y);
      return rx >= 0 && ry >= 0 && rx <= this._background.width && ry <= this._background.height;
    }

    createMain() {
      this._createHeader();
      this._createContent();
      return this._createFooter();
    }

    destroyMain() {
      this._main.removeChild(this._header);
      this._main.removeChild(this._footer);
      this._main.removeChild(this._content);
      this._header.destroy();
      this._footer.destroy();
      this._content.destroy();
      this._header = null;
      this._content = null;
      this._footer = null;
    }

    playStartSE() {
      return KDCore.Utils.playSE(this.settings.openInventorySE);
    }

  };
  PKD_MI.register(Sprite_MapInvMain);
})();

// ■ END AA_MInvMainSprite.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ zSprite_MapUserChestMain_PRO.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapUserChestMain;
  Sprite_MapUserChestMain = class Sprite_MapUserChestMain extends PKD_MI.LIBS.Sprite_MapInvMain {
    constructor() {
      super();
    }

    //?UPD18
    _createContent() {
      this._content = new PKD_MI.LIBS.Sprite_MainInvItems(false);
      return this._main.addChild(this._content);
    }

    _createHeader() {
      this._header = new PKD_MI.LIBS.Sprite_MapUserChestHeader();
      this._main.addChild(this._header);
      return this.moveByJson(PKD_MI.getUIMapUserChestSettings());
    }

    _createFooter() {
      this._footer = new PKD_MI.LIBS.Sprite_MapChestFooter();
      return this._main.addChild(this._footer);
    }

    playStartSE() {
      return KDCore.Utils.playSE(this.settings.openChestSE);
    }

  };
  PKD_MI.register(Sprite_MapUserChestMain);
})();

// ■ END zSprite_MapUserChestMain_PRO.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SpriteThrowOutBox.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var SpriteThrowOutBox;
  SpriteThrowOutBox = class SpriteThrowOutBox extends KDCore.Sprite {
    constructor(params, x, y) {
      super();
      this.params = params;
      this.x = x;
      this.y = y;
      this._create();
      this.x += this.params.margins.x;
      this.y += this.params.margins.y;
      return;
    }

    isReadyToThrow() {
      return this.isUnderMouse() && this.opacity >= 255;
    }

    update() {
      if (this.isUnderMouse()) {
        this.opacity += this.params.fadeOutSpeed;
      } else {
        this.opacity = this.params.startOpacity;
      }
      this.foreImage.visible = this.opacity < 255;
      this.foreImage2.visible = !this.foreImage.visible;
    }

    _create() {
      this.bitmap = ImageManager.loadPKDMI('dropOutZoneBack');
      this.foreImage = new Sprite(ImageManager.loadPKDMI('dropOutZoneFore'));
      this.foreImage2 = new Sprite(ImageManager.loadPKDMI('dropOutZoneFore2'));
      this.addChild(this.foreImage);
      this.addChild(this.foreImage2);
    }

  };
  PKD_MI.register(SpriteThrowOutBox);
})();

// ■ END SpriteThrowOutBox.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_TilingFrame.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_TilingFrame;
  Sprite_TilingFrame = class Sprite_TilingFrame extends KDCore.Sprite {
    constructor(_width, _height, skin) {
      super();
      this._width = _width;
      this._height = _height;
      this._createParts();
      this.skinBitmap = ImageManager.loadPKDMI(skin);
      this.skinBitmap.addLoadListener(() => {
        return this._refreshAll();
      });
    }

    _createParts() {
      var i, j;
      this.backSprite = new Sprite();
      //@backSprite.addChild(new TilingSprite())
      this.addChild(this.backSprite);
      this.content = new Sprite();
      this.addChild(this.content);
      this.frame = new Sprite();
      for (i = j = 0; j < 8; i = ++j) {
        this.frame.addChild(new Sprite());
      }
      return this.addChild(this.frame);
    }

    _refreshAll() {
      this._refreshBack();
      //@_refreshFrame()
      return this._refreshTFrame();
    }

    _refreshBack() {
      var h, m, sprite, w;
      m = 2; // * Отступ, чтобы за рамку не выходить
      w = Math.max(0, this._width - m * 2);
      h = Math.max(0, this._height - m * 2);
      sprite = this.backSprite;
      sprite.bitmap = this.skinBitmap;
      // * Координаты фона из картинки
      sprite.setFrame(0, 0, 96, 96);
      sprite.move(m, m);
      sprite.scale.x = w / 96;
      return sprite.scale.y = h / 96;
    }

    // * Координаты заливки фона из картинки
    //tilingSprite = sprite.children[0]
    //tilingSprite.bitmap = @skinBitmap
    //tilingSprite.setFrame(0, 96, 96, 96)
    //tilingSprite.move(0, 0, w, h)
    //tilingSprite.scale.x = 96 / w
    //tilingSprite.scale.y = 96 / h
    //sprite.setColorTone(@_colorTone)
    _refreshTFrame() {
      var drect, j, len, m, ref, spr, srect;
      // * Положение назначения
      drect = {
        x: 0,
        y: 0,
        width: this._width,
        height: this._height
      };
      // * Координаты рамки на картинке
      srect = {
        x: 96,
        y: 0,
        width: 96,
        height: 96
      };
      m = 12; // * Толщина
      ref = this.frame.children;
      for (j = 0, len = ref.length; j < len; j++) {
        spr = ref[j];
        spr.bitmap = this.skinBitmap;
      }
      return Window.prototype._setRectPartsGeometry.call(this, this.frame, srect, drect, m);
    }

  };
  PKD_MI.register(Sprite_TilingFrame);
})();

// ■ END Sprite_TilingFrame.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_ExtraUI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

//@[GLOBAL]
var Spriteset_InvUI;

Spriteset_InvUI = class Spriteset_InvUI extends Sprite {
  constructor() {
    super();
    this._initEU();
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_InvUI.prototype;
  //?UPDX
  _._initEU = function() {
    this._inventorySprite = new PKD_MI.LIBS.Sprite_MapInvMain();
    this.inventory = new PKD_MI.LIBS.MapInvController(this._inventorySprite, this);
    this.uiExtraCells = [];
    this.addChild(this._inventorySprite);
    if (PKD_MI.Parameters.get_UseScreenButton() === true && PKD_MI.isPro()) {
      this._createMIButton();
    }
    if (PKD_MI.Parameters.get_UseOuterItems() === true && PKD_MI.isPro()) { //?line
      this._createOUTItems();
    }
  };
  //?UPDX
  _.isMouseInInventory = function() {
    if (this.isAnyOuterCellUnderMouse()) {
      return true;
    }
    if (this.isInventoryOpen()) {
      if (this._inventorySprite.isMouseIn()) {
        return true;
      }
    }
    if (this.isChestOpen()) {
      if (this._chestSprite.isMouseIn()) {
        return true;
      }
    } else if (this.isUserChestOpen()) {
      if (this._userChestSprite.isMouseIn()) {
        return true;
      }
    }
    return false;
  };
  //?UPD18
  _.allOpenedInstances = function() {
    var instances;
    instances = [];
    if (this.isInventoryOpen()) {
      instances.push(this.inventory);
    }
    if (this.isChestOpen()) {
      instances.push(this.chest);
    }
    if (this.isUserChestOpen()) {
      instances.push(this.userChest);
    }
    return instances;
  };
  _.openInventory = function() {
    this.inventory.open();
    return this.openCategory($gameTemp._lastInvCategory);
  };
  _.closeInventory = function() {
    return this.inventory.close();
  };
  _.isInventoryOpen = function() {
    return this.inventory.isInventoryActive();
  };
  _.openCategory = function(catId) {
    if (this.inventory.isSomeItemFocused()) {
      return;
    }
    if (catId == null) {
      catId = 0;
    }
    catId = this._checkAvailableCategory(catId); //?line
    $gameTemp._lastInvCategory = catId;
    return this.inventory.loadItemsInCategory(catId);
  };
  _._checkAvailableCategory = function(catId) {
    var avail, nextCatId;
    if (this._availCats == null) {
      avail = PKD_MI.getUIMapInventorySettings().availableCategories;
      if (!this._availCats) {
        this._availCats = [];
      }
      if (avail.items === true) {
        this._availCats.push(0);
      }
      if (avail.weapons === true) {
        this._availCats.push(1);
      }
      if (avail.armors === true) {
        this._availCats.push(2);
      }
      if (avail.keyItems === true) {
        this._availCats.push(3);
      }
      return this._checkAvailableCategory(catId);
    } else {
      if (this._availCats.contains(catId)) {
        return catId;
      } else {
        nextCatId = catId + 1;
        if (nextCatId === 4) {
          nextCatId = 0;
        }
        return this._checkAvailableCategory(nextCatId);
      }
    }
  };
  //?UPDX
  _.refreshInventory = function() {
    var e;
    try {
      $gameParty.requestWeightCapacityRefresh();
      $gameParty._refreshInventoryWAutoState();
      $gamePlayer.refreshInventoryWSpeedDebuff();
      if (this.isInventoryOpen()) {
        this.openCategory($gameTemp._lastInvCategory);
      }
      if (PKD_MI.isPro()) { //?line
        return this.refreshMapHotCells();
      }
    } catch (error) {
      e = error;
      return PKD_MI.warning(e);
    }
  };
  _.showNextInvPage = function() {
    if (!this.isInventoryOpen()) {
      return;
    }
    return this.inventory.showNextPage();
  };
  _.showPrevInvPage = function() {
    if (!this.isInventoryOpen()) {
      return;
    }
    return this.inventory.showPrevPage();
  };
  _.showNextChestPage = function() {
    var ref, ref1;
    if ((ref = this.chest) != null) {
      ref.showNextPage();
    }
    return (ref1 = this.userChest) != null ? ref1.showNextPage() : void 0;
  };
  _.showPrevChestPage = function() {
    var ref, ref1;
    if ((ref = this.chest) != null) {
      ref.showPrevPage();
    }
    return (ref1 = this.userChest) != null ? ref1.showPrevPage() : void 0;
  };
  //?UPDX
  _.clickInvItem = function(index) {
    if ($gameTemp._pkdMICellMoving === true) { //?line
      return;
    }
    if (!this.isInventoryOpen()) {
      return;
    }
    return this.inventory.clickAt(index);
  };
  _.activateHotKey = function(index) {};
  //return false unless @isInventoryOpen()
  //return false unless PKD_MI.isABS()
  //return @inventory.placeItemToPanel(index)
  _.activateFavKey = function(index) {};
  //return false unless @isInventoryOpen()
  //return false unless PKD_MI.isABS()
  //return @inventory.placeWeaponToFavorite(index)

  //?UPDX
  _.update = function() {
    var ref, ref1;
    Sprite.prototype.update.call(this);
    this.inventory.update();
    if ((ref = this.chest) != null) {
      ref.update();
    }
    if ((ref1 = this.userChest) != null) {
      ref1.update();
    }
    if ((this.chest != null) || (this.userChest != null)) {
      this._updateChestClose();
    }
    return this._updateOuterCells(); //?line
  };
  
  //?UPDX, PRO
  _._updateOuterCells = function() {}; //*EMPTY
  _.terminate = function() {
    var ref, ref1;
    this.inventory.terminate();
    if ((ref = this.chest) != null) {
      ref.terminate();
    }
    return (ref1 = this.userChest) != null ? ref1.terminate() : void 0;
  };
  // * ============= CHEST ==============================
  _.openMapChest = function() {
    if (this.isUserChestOpen()) {
      this.closeUserChest();
    }
    this._chestSprite = new PKD_MI.LIBS.Sprite_MapChestMain();
    this.chest = new PKD_MI.LIBS.MapChestController(this._chestSprite, this);
    this.chest.open();
    if ($gameTemp.__aaItemsForChest != null) {
      this.chest.loadItemsInCategory();
    }
    this.chest._moveToLastPos();
    this.addChild(this._chestSprite);
  };
  _.closeMapChest = function() {
    var ref;
    if ((ref = this.chest) != null) {
      ref.close();
    }
    this.saveStoredChest();
    if (this._chestSprite != null) {
      this.removeChild(this._chestSprite);
    }
    this.chest = null;
  };
  _.saveStoredChest = function() {
    var e, itemsToStore, key;
    try {
      if ($gameTemp.__isStoredVisualChestShouldOpened !== true) {
        return;
      }
      itemsToStore = PKD_MI.LIBS.CStoredItems.FromChestItems($gameTemp.__aaItemsForChest);
      key = $gameTemp.__storedVisualChestId;
      $gamePlayer.aaRegisterStoredChest(key[0], key[1], itemsToStore);
      $gameTemp.__storedVisualChestId = null;
      $gameTemp.__aaItemsForChest = [];
      $gameTemp.__isStoredVisualChestShouldOpened = false;
    } catch (error) {
      e = error;
      PKD_MI.warning('saveStoredChest', e);
    }
  };
  _.takeAllFromChest = function() {
    var ref, ref1;
    // * Два одновременно не могут быть открыты
    if ((ref = this.chest) != null) {
      ref.takeAll();
    }
    return (ref1 = this.userChest) != null ? ref1.takeAll() : void 0;
  };
  _.isChestOpen = function() {
    return this.chest != null;
  };
  _.clickChestItem = function(index) {
    var ref;
    return (ref = this.chest) != null ? ref.clickAt(index) : void 0;
  };
  //?UPD18
  _._updateChestClose = function() {
    if (Input.isCancel()) {
      if (PKD_MI.isCellUnderRightClick()) {

      } else {
        // * NOTHING
        this.closeMapChest();
        this.closeUserChest();
        Input.clear();
        TouchInput.clear();
      }
    }
  };
  // * ======================== USER CHEST ==============
  _.openUserChest = function() {
    if (this.isChestOpen()) {
      this.closeMapChest();
    }
    this._userChestSprite = new PKD_MI.LIBS.Sprite_MapUserChestMain();
    this.userChest = new PKD_MI.LIBS.MapUserChestController(this._userChestSprite, this);
    this.userChest.open();
    this.userChest._moveToLastPos();
    this.userChest.loadItemsInCategory();
    this.addChild(this._userChestSprite);
    this.refreshUserChest();
  };
  _.isUserChestOpen = function() {
    return this.userChest != null;
  };
  _.closeUserChest = function() {
    var ref;
    if ((ref = this.userChest) != null) {
      ref.close();
    }
    if (this._userChestSprite != null) {
      this.removeChild(this._userChestSprite);
    }
    this._userChestSprite = null;
    this.userChest = null;
  };
  _.refreshUserChest = function() {
    if (this.isUserChestOpen()) {
      return this.openUserChestCategory($gameTemp._newUserChestCat);
    }
  };
  _.openUserChestCategory = function(catId) {
    if (catId == null) {
      catId = 0;
    }
    catId = this._checkAvailableCategory(catId);
    this.userChest.loadItemsInCategory(catId);
    if (PKD_MI.getUIMapUserChestSettings().isLinkedCategories === true) {
      if (this.isInventoryOpen()) {
        return this.openCategory(catId);
      }
    }
  };
  _.clickUserChestItem = function(index) {
    var ref;
    return (ref = this.userChest) != null ? ref.clickAt(index) : void 0;
  };
  // * ============================ UPDATE 1.1 =========================
  _.clickInvFocusedItem = function(index) {
    if (!this.isInventoryOpen()) {
      return;
    }
    return this.inventory.clickAtFocusItem(index);
  };
  _.clickInvPartyActor = function(actor) {
    if (!this.isInventoryOpen()) {
      return;
    }
    return this.inventory.clickAtPartyActor(actor);
  };
  _.refreshStoredChest = function() {
    var ref;
    return (ref = this.chest) != null ? ref.loadItemsInCategory() : void 0;
  };
  // * ============================ UPDATE 1.4 =========================
  _.getMIButton = function() {
    return this._button;
  };
  _.isMouseInIButton = function() {
    if ((this._button != null) && this._button.visible === true) {
      return this._button.cursorInButton();
    } else {
      return false;
    }
  };
  // * ============================ UPDATE 1.6 =========================

  //?UPDX
  _.isAnyOuterCellUnderMouse = function() {
    var c, i, len, ref;
    if (!PKD_MI.isPro()) {
      return false;
    }
    if (this.uiExtraCells == null) {
      return false;
    }
    ref = this.uiExtraCells;
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i];
      if (c.isHovered()) {
        return true;
      }
    }
    return false;
  };
})();

// ■ END Spriteset_ExtraUI.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
PKD_MI.isPro = function() {
  return false;
};

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapChestController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var MapChestController;
  MapChestController = class MapChestController extends PKD_MI.LIBS.MapInvController {
    constructor() {
      super(...arguments);
      this.goldRefreshThread = null;
    }

    _onGoldTick() {} // * EMPTY

    
      //u19
    close() {
      super.close();
      $gameTemp.__aaVisualChestLimitCount = null;
      return $gameTemp.__visualChestGoldCell = null;
    }

    updateWhenOpen() {
      var key, ref, ref1;
      this.refreshTitle.update();
      this._updateInvDrag();
      this._updateHelp(); //?{PART}
      if (this.isSomeItemFocused()) {
        this.updateClearFocusClick();
      }
      key = PKD_MI.Parameters.get_ChestTakeAllKey();
      if (Input.isTriggered(key)) {
        this.takeAll();
      }
      if ((ref = this._autoCloseThread) != null) {
        ref.update();
      }
      return (ref1 = $gameTemp.__visualChestGoldCell) != null ? ref1.drawCount($gameTemp.__visualChestGoldCount) : void 0;
    }

    _onTitleTick() {
      var cellUnderMouse;
      cellUnderMouse = this.content.getHoveredCell();
      if ((cellUnderMouse != null) && (cellUnderMouse.item != null)) {
        return this.content.drawItemName(cellUnderMouse.item.name);
      } else {
        if (PKD_MI.isHaveSomeTypeLimit()) {
          return this.content.drawItemName($gameTemp._visualChestRestrictionTypesRaw);
        } else {
          return this.content.drawItemName("");
        }
      }
    }

    _moveToLastPos() {
      if ($gameTemp.__lastVChestDragPos != null) {
        return this.invSprite.move($gameTemp.__lastVChestDragPos);
      }
    }

    _saveLastDragPos() {
      return $gameTemp.__lastVChestDragPos = [this.invSprite.x, this.invSprite.y];
    }

    //u19
    loadItemsInCategory(catIndex = 4) {
      if (!this.isInventoryActive()) {
        return;
      }
      if (this.isSomeItemFocused()) {
        return;
      }
      this._hideHelp();
      this._onNewCategoryWillLoad();
      this._loadedCatIndex = 4; // * 4 - CHEST
      this.content.clearAllItems();
      this.showAllChestItems();
      if ($gameTemp.__aaVisualChestLimitCount != null) {
        this.content.prepareForCategory(this._loadedCatIndex);
      }
      return this._onNewCategoryLoaded();
    }

    showAllChestItems() {
      if (PKD_MI.Parameters.isCellLockSystemAllowed()) {
        if (($gameTemp.__aaVisualChestLimitCount != null) && $gameTemp.__aaVisualChestLimitCount > 0) {
          $gameTemp.__aaItemsForChest = $gameTemp.__aaItemsForChest.slice(0, $gameTemp.__aaVisualChestLimitCount);
        }
      }
      this._loadedItems = $gameTemp.__aaItemsForChest;
      this._loadedItems.delete(null);
      this._concatItems();
      this._setPages();
      return this._showItemsGroup(0);
    }

    _concatItems() {
      var i, j, k, l, ref, ref1, ref2;
      if (this._loadedItems.length <= 1) {
        return;
      }
      for (i = k = 0, ref = this._loadedItems.length; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
        for (j = l = ref1 = i, ref2 = this._loadedItems.length; (ref1 <= ref2 ? l < ref2 : l > ref2); j = ref1 <= ref2 ? ++l : --l) {
          if (i === j) {
            continue;
          }
          if (this._loadedItems[i][0] === this._loadedItems[j][0]) {
            this._loadedItems[i][1] += this._loadedItems[j][1];
            this._loadedItems.splice(j, 1);
            this._concatItems();
            return;
          }
        }
      }
    }

    _setItemToCell(cell, item) {
      return cell.setChestItem(item);
    }

    _refreshCategoryButtons() {} // * EMPTY

    clickAt(index) {
      if (this._loadedCatIndex !== 4) {
        return;
      }
      return this._onChestAction(index + (this._currentPage * this.MAX));
    }

    _onChestAction(index) {
      var e, itemData;
      if (this.isSomeItemFocused()) {
        return;
      }
      itemData = this._loadedItems[index];
      if (itemData == null) {
        return;
      }
      try {
        //$gameParty.gainItem(itemData[0], itemData[1])
        //$gameTemp.__aaItemsForChest.splice(index, 1)
        if (PKD_MI.isGoldItem(itemData[0])) {
          return this._onGainGoldItem(index);
        } else {
          return this._onGainItem(index, itemData);
        }
      } catch (error) {
        e = error;
        return PKD_MI.warning('When try take item from visual chest', e);
      }
    }

    //u19
    _onGainGoldItem(index) {
      this._onGainGoldItemProcess(index);
      this.loadItemsInCategory(this._loadedCatIndex);
      this._checkToAutoClose();
      SoundManager.playCursor();
    }

    //u19
    _onGainGoldItemProcess(index) {
      var count;
      count = $gameTemp.__visualChestGoldCount;
      $gameParty.gainGold(count);
      $gameTemp.__aaItemsForChest[index] = null;
      $gameTemp.__visualChestGoldCount = 0;
    }

    //u19
    _onGainItem(index, itemData, fast = false) {
      var item, realCount, resultCount;
      resultCount = itemData[1];
      item = itemData[0];
      realCount = this._getItemCountToReturn(resultCount, item);
      if (realCount <= 0) {
        SoundManager.playBuzzer();
        return;
      }
      if (!$gameParty.isCanAddNewItem(itemData[0])) {
        SoundManager.playBuzzer();
        return;
      }
      if (realCount === 1 || fast === true || !PKD_MI.isUseSlider()) {
        this._onGainItemFinal(index, itemData, realCount);
        if (fast === false) { // * Если множественный, то в другом месте перезагрузка
          this.loadItemsInCategory(this._loadedCatIndex);
          this._checkToAutoClose();
          SoundManager.playCursor();
        }
      } else {
        this._onGainItemWithSlider(index, itemData, realCount);
      }
    }

    _onGainItemWithSlider(index, itemData, realCount) {
      var cell;
      cell = this.content.getCellAt(index);
      this.content.showFocusLayer();
      this.content.showFocusedItem(cell, itemData[1]);
      this.sliderController = new PKD_MI.LIBS.SliderController(this.content, 1);
      this._tempSliderIndex = index;
      this._tempSliderItem = itemData;
      this._tempSliderMaxValue = realCount;
      return this.content.refreshSlider(realCount, this._isSliderNewValueIsAllowed(realCount));
    }

    _onGainItemFinal(index, itemData, realCount) {
      $gameParty.gainItem(itemData[0], realCount);
      $gameTemp.__aaItemsForChest[index][1] = itemData[1] - realCount;
      if ($gameTemp.__aaItemsForChest[index][1] <= 0) {
        return $gameTemp.__aaItemsForChest[index] = null;
      }
    }

    
      //$[OVER BASE]
    onSliderOkClick() {
      if (!this.isSomeItemFocused()) {
        return;
      }
      this.clearFocus();
      this._onGainItemFinal(this._tempSliderIndex, this._tempSliderItem, this.content.getSliderValue());
      this._tempSliderItem = null;
      this._tempSliderIndex = 0;
      this.loadItemsInCategory(this._loadedCatIndex);
      this._checkToAutoClose();
      return SoundManager.playCursor();
    }

    //$[OVER BASE]
    getMaxValueForSlider() {
      return this._tempSliderMaxValue;
    }

    takeAll() {
      var e, index, itemData, k, len, ref;
      try {
        ref = $gameTemp.__aaItemsForChest;
        for (index = k = 0, len = ref.length; k < len; index = ++k) {
          itemData = ref[index];
          if (PKD_MI.isGoldItem(itemData[0])) {
            this._onGainGoldItemProcess(index);
          } else {
            if (itemData != null) {
              //$gameParty.gainItem(itemData[0], itemData[1]) if itemData?
              this._onGainItem(index, itemData, true);
            }
          }
        }
        SoundManager.playCursor();
      } catch (error) {
        e = error;
        PKD_MI.warning('When try take ALL from visual chest', e);
      }
      //$gameTemp.__aaItemsForChest = []
      this.loadItemsInCategory(this._loadedCatIndex);
      return this._checkToAutoClose();
    }

    _checkToAutoClose() {
      if (this._loadedItems.length === 0) {
        this._autoCloseThread = new KDCore.TimedUpdate(20, this.__onAutoCloseTick.bind(this));
        return this._autoCloseThread.once();
      }
    }

    __onAutoCloseTick() {
      return PKD_MI.closeChest();
    }

  };
  PKD_MI.register(MapChestController);
})();

// ■ END MapChestController.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.MapInvController.prototype;
  //?UPD18
  _._updateHelp = function() {
    var haveExtraInfo, hovered;
    if (this._itemDescShowTimer != null) {
      this._itemDescShowTimer.update();
    }
    hovered = this.content.getHoveredCell();
    haveExtraInfo = this._isCellHaveExtraInfo(hovered);
    if ((hovered != null) && (hovered.item != null) && haveExtraInfo === false) {
      this._hideExtraInfo();
      this._showHelp(hovered);
    } else {
      this._hideHelp();
      if (haveExtraInfo === true) {
        this._showExtraInfo(hovered);
      } else {
        this._hideExtraInfo();
      }
    }
    if (this._itemDescWindow != null) {
      return this._updateEquipStatShow();
    }
  };
  _._updateEquipStatShow = function() {
    if (TouchInput.wheelY >= 20 || TouchInput.wheelY <= -20) {
      this._itemDescWindow.showItemStats();
    }
  };
  _._showHelp = function(cell) {
    if (this.__lastHelpItem === cell) {

    } else {
      this._hideHelp();
      this.__lastHelpItem = cell;
      return this._createHelpWindow();
    }
  };
  _._createHelpWindow = function() {
    this._itemDescWindow = new PKD_MI.LIBS.Sprite_MapInvHelp();
    this._waitTime = this._itemDescWindow.delay();
    this._itemDescShowTimer = new KDCore.TimedUpdate(1, this._onShowTimeTick.bind(this));
    this._itemDescWindow.opacity = 0;
    this._itemDescWindow.setup(this.__lastHelpItem);
    this._placeDescription();
    return this.layer.addChild(this._itemDescWindow);
  };
  _._onShowTimeTick = function() {
    if (this._waitTime > 0) {
      return this._waitTime--;
    } else {
      if (this._itemDescWindow.opacity < 255) {
        return this._itemDescWindow.opacity += 20;
      } else {
        return this._itemDescShowTimer = null;
      }
    }
  };
  _._placeDescription = function() {
    var e;
    try {
      if (this._itemDescWindow == null) {
        return;
      }
      return this._itemDescWindow.refreshPlacement();
    } catch (error) {
      e = error;
      return PKD_MI.warning(e);
    }
  };
  _._hideHelp = function() {
    if (this.__lastHelpItem == null) {
      return;
    }
    this._itemDescShowTimer = null;
    this._destroyHelpWindow();
    return this.__lastHelpItem = null;
  };
  _._destroyHelpWindow = function() {
    this._itemDescShowTimer = null;
    if (this._itemDescWindow == null) {
      return;
    }
    this.layer.removeChild(this._itemDescWindow);
    this._itemDescWindow.visible = false;
    return this._itemDescWindow = null;
  };
})();

// ■ END MapInvController.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.MapInvController.prototype;
  //?UPD
  _._onActionOnGameItem = function(cell) {
    var item;
    if (cell._inSpecialState === true) {

    } else {
      // * THIS IS FOR ABS only
      //indexOnPanel = $gameParty.leader().skillIndexOnUI(cell.item.id, true)
      //$gamePlayer.touchSkillAt(indexOnPanel + 1) if indexOnPanel >= 0
      item = cell.item;
      // * Если нет цели, если использовать в меню или всегда, то выполнять сразу
      if ((item != null) && item.scope === 0 && (item.occasion === 0 || item.occasion === 2)) {
        this.useInventoryItem($gameParty.leader(), cell.item);
        return;
      }
      if (PKD_MI.isPartyInventoryAllowed() && !cell.isHotCell) { //?line
        this._tempItemForParty = cell.item;
        $gameTemp._tempItemForParty = cell.item;
        this._onPartySelectItemClick(cell);
      } else {
        //$gamePlayer.startSimpleItemFromInventory(cell.item)
        this.useInventoryItem($gameParty.leader(), cell.item);
      }
    }
  };
  _._onPartySelectItemClick = function(cell) {
    //@invSprite.setFocusedMode(cell)
    this.content.showFocusLayer();
    this.content.showFocusedItem(cell, $gameParty.numItems(cell.item));
    return this.partyController = new PKD_MI.LIBS.MapInvPartySelectCntrl(this.content, cell.partyUsecases);
  };
  _.isSomeItemFocused = function() {
    var ref;
    return (ref = this.content) != null ? ref.isFocused() : void 0;
  };
  _.clickAtFocusItem = function(index) {
    return this.clearFocus();
  };
  //?UPD
  _.clearFocus = function() {
    var ref, ref1;
    if ((ref = this.partyController) != null) {
      ref.close();
    }
    if ((ref1 = this.sliderController) != null) {
      ref1.close();
    }
    this.sliderController = null;
    this.content.clearFocus();
    this.loadItemsInCategory(this._loadedCatIndex);
    return $gameTemp._pkdMICellFocused = false; //?line
  };
  _.updateClearFocusClick = function() {
    if (TouchInput.isTriggered()) {
      if (this.content.isMouseInFocusZone()) {
        return this.clearFocus();
      }
    }
  };
  _.clickAtPartyActor = function(actor) {
    this.partyController.close();
    if (DataManager.isItem(this._tempItemForParty)) {
      return this.useInventoryItem(actor, this._tempItemForParty);
    } else {
      return this._equipInventoryItemOnActor(actor, this._tempItemForParty);
    }
  };
  _.useInventoryItem = function(actor, item) {
    var actorIndex, e;
    if (item == null) {
      return;
    }
    try {
      actorIndex = PKD_MI.partyGroup().indexOf(actor);
      if (actorIndex < 0) {
        return;
      }
      SoundManager.playUseItem();
      actor.useItem(item);
      this.item = function() {
        return item;
      };
      this.user = function() {
        return actor;
      };
      this._actorWindow = {};
      this._actorWindow.index = function() {
        return actorIndex;
      };
      this.itemTargetActors = function() {
        return Scene_Item.prototype.itemTargetActors.call(this);
      };
      Scene_Item.prototype.applyItem.call(this);
      //Scene_Item::checkCommonEvent.call(@)
      Scene_Item.prototype.checkGameover.call(this);
      delete this._actorWindow;
      delete this.item;
      delete this.user;
      delete this.itemTargetActors;
    } catch (error) {
      e = error;
      PKD_MI.warning(e);
    }
  };
})();

// ■ END MapInvController.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //?UPD18 all

  //@[DEFINES]
  _ = PKD_MI.LIBS.MapInvController.prototype;
  _._isCellHaveExtraInfo = function(cell) {
    if (!TouchInput.kdIsPressed2()) {
      return false;
    }
    if (cell == null) {
      return false;
    }
    if (cell.item == null) {
      return false;
    }
    return PKD_MI.IsHaveExtraInfo(cell.item);
  };
  _._hideExtraInfo = function() {
    if (this.__lastExtraInfoCell == null) {
      return;
    }
    this._destroyExtraHelpWindow();
    return this.__lastExtraInfoCell = null;
  };
  _._showExtraInfo = function(cell) {
    var info;
    if (this.__lastExtraInfoCell === cell) {

    } else {
      this._hideExtraInfo();
      this.__lastExtraInfoCell = cell;
      info = PKD_MI.GetExtraInfo(cell.item);
      if (info != null) {
        return this._createExtraHelpWindow(info);
      }
    }
  };
  _._createExtraHelpWindow = function(info) {
    this._itemExtraHelpWindow = new PKD_MI.LIBS.Sprite_ItemExtraInfo(info);
    return this.layer.addChild(this._itemExtraHelpWindow);
  };
  _._destroyExtraHelpWindow = function() {
    if (this._itemExtraHelpWindow == null) {
      return;
    }
    this.layer.removeChild(this._itemExtraHelpWindow);
    this._itemExtraHelpWindow.visible = false;
    return this._itemExtraHelpWindow = null;
  };
})();

// ■ END MapInvController.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.MapInvController.prototype;
  _._onActionOnEquipItem = function(cell) {
    var etype;
    etype = cell.item.etypeId;
    if (cell._inSpecialState === false) {
      this.equipInventoryItem(cell);
    } else {
      if (cell.isCanBeUnEquiped()) {
        this._unEquipItem(cell);
      } else {
        SoundManager.playBuzzer();
        return;
      }
    }
    return this.loadItemsInCategory(this._loadedCatIndex);
  };
  _._unEquipItem = function(cell) {
    var actor, etype;
    etype = cell.item.etypeId;
    actor = cell._getEquipmentActor();
    return this._equipFromInv(actor, etype, null);
  };
  
  //?UPD
  _.equipInventoryItem = function(cell) {
    if (PKD_MI.isPartyInventoryAllowed() && !cell.isHotCell) { //?line
      this._tempItemForParty = cell.item;
      $gameTemp._tempItemForParty = cell.item;
      return this._onPartySelectItemClick(cell);
    } else {
      return this._equipInventoryItemOnActor($gameParty.leader(), cell.item);
    }
  };
  _._equipInventoryItemOnActor = function(actor, item) {
    var etype;
    etype = item.etypeId;
    if (actor.isEquipTypeLocked(etype)) {
      SoundManager.playBuzzer();
    } else {
      this._equipFromInv(actor, etype, item);
      this.loadItemsInCategory(this._loadedCatIndex);
    }
  };
  _._getItemCountToReturn = function(resultCount, item) {
    var c;
    c = this._getItemCountByMaxLimit(resultCount, item);
    if (c > 0 && PKD_MI.Parameters.get_UsedWSystem()) {
      c = this._getItemCountByWeight(c, item);
    }
    return c;
  };
  _._getItemCountByMaxLimit = function(resultCount, item) {
    var haveCount, maxCount, newCount;
    haveCount = $gameParty.numItems(item);
    maxCount = $gameParty.maxItems(item);
    if (resultCount <= (maxCount - haveCount)) {
      // * Предметы вмещаются
      return resultCount; // * Предметы не вмещаются
    } else {
      newCount = maxCount - haveCount;
      return newCount;
    }
  };
  _._getItemCountByWeight = function(resultCount, item) {
    var finalW, freeW, w;
    freeW = $gameParty.getMaxWeightCapacity() - $gameParty.getCurrentWeight();
    w = DataManager.getItemWeight(item);
    if (w === 0) {
      return resultCount;
    }
    finalW = resultCount * w;
    if (finalW <= freeW) {
      return resultCount;
    } else {
      if (w > freeW) { // * Даже один нельзя
        this._requestNoWeightNotify();
        return 0;
      } else {
        this._requestNoWeightNotify();
        return Math.floor(freeW / w);
      }
    }
  };
  _._requestNoWeightNotify = function() {
    return PKD_MI.requestWeigthNotify();
  };
  _._executeNoWeightNotify = function() {
    return this.invSprite._footer.pulseWeightText();
  };
})();

// ■ END MapInvController.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.MapInvController.prototype;
  _.onSliderOkClick = function() {
    if (!this.isSomeItemFocused()) {
      return;
    }
    this.clearFocus();
    this._onStoreItemFinal(this._tempSliderItem, this.content.getSliderValue());
    return this._tempSliderItem = null;
  };
  _.onSliderValueChanged = function(percent) {
    var isAllowed, max, value;
    max = this.getMaxValueForSlider();
    value = Math.round(max * percent / 100);
    if (value <= 0) {
      value = 1;
    }
    if (value >= max) {
      value = max;
    }
    // * Из инвентаря всегда можно убрать
    isAllowed = this._isSliderNewValueIsAllowed(value);
    return this.content.refreshSlider(value, isAllowed);
  };
  // * FOR OVERRIDE
  _.getMaxValueForSlider = function() {
    return $gameParty.numItems(this._tempSliderItem);
  };
  // * FOR OVERRIDE
  _._isSliderNewValueIsAllowed = function(value) {
    return true;
  };
  //u19
  _._onStoreItemProcess = function(cell) {
    var count, item;
    if (this.isSomeItemFocused()) {
      return;
    }
    if (!this.isCanPutItemWithChestLimit(cell.item)) {
      SoundManager.playBuzzer();
      return;
    }
    item = cell.item;
    if (PKD_MI.isHaveSomeTypeLimit()) {
      if (!PKD_MI.isProperItemForTypeLimit(item)) {
        SoundManager.playBuzzer();
        return;
      }
    }
    count = $gameParty.numItems(item);
    if (count === 1 || !PKD_MI.isUseSlider()) {
      this._onStoreItemFinal(item, count);
    } else {
      this.content.showFocusLayer();
      this.content.showFocusedItem(cell, count);
      this.sliderController = new PKD_MI.LIBS.SliderController(this.content, 0);
      this._tempSliderItem = item;
      this.content.refreshSlider(count, true);
    }
  };
  //u19
  _.isCanPutItemWithChestLimit = function(item) {
    var i, items, len, ref;
    if (!PKD_MI.Parameters.isCellLockSystemAllowed()) {
      return true;
    }
    if ($gameTemp.__aaVisualChestLimitCount == null) {
      return true;
    }
    ref = $gameTemp.__aaItemsForChest;
    // * Если уже есть, увеличиваем количество
    for (i = 0, len = ref.length; i < len; i++) {
      items = ref[i];
      if (items[0] === item) {
        return true;
      }
    }
    return $gameTemp.__aaVisualChestLimitCount > $gameTemp.__aaItemsForChest.length;
  };
  //u19
  _._onStoreItemFinal = function(item, count) {
    var i, inStack, index, items, len, ref;
    $gameParty.loseItem(item, count, true);
    SoundManager.playCursor();
    this.loadItemsInCategory(this._loadedCatIndex);
    if (PKD_MI.isUserChestIsOpen()) {
      $gameTemp._newUserChestCat = this._loadedCatIndex;
      return $gamePlayer.addPutItemToPlayerChest(item, count);
    } else if (PKD_MI.isStoredChestIsOpen()) {
      inStack = false;
      ref = $gameTemp.__aaItemsForChest;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        items = ref[index];
        if (items[0] === item) {
          items[1] += count;
          inStack = true;
          break;
        }
      }
      if (inStack === false) {
        $gameTemp.__aaItemsForChest.push([item, count]);
      }
      return PKD_MI.refreshStoredChest();
    }
  };
  _.inSliderMode = function() {
    return (this.sliderController != null) && this.isSomeItemFocused();
  };
})();

// ■ END MapInvController.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvPartySelectCntrl.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.MapInvPartySelectCntrl.prototype;
  //?UPD12
  //$[OVER BASE]
  _.open = function() {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
    if ((ref = this._actors[0]) != null) {
      ref.moveLeft();
    }
    if ((ref1 = this._actors[1]) != null) {
      ref1.moveRight();
    }
    if ((ref2 = this._actors[2]) != null) {
      ref2.moveDown();
    }
    if ((ref3 = this._actors[3]) != null) {
      ref3.moveUp();
    }
    if ((ref4 = this._actors[4]) != null) {
      ref4.moveLeftAndUp();
    }
    if ((ref5 = this._actors[5]) != null) {
      ref5.moveRightAndUp();
    }
    if ((ref6 = this._actors[6]) != null) {
      ref6.moveLeftAndDown();
    }
    return (ref7 = this._actors[7]) != null ? ref7.moveRightAndDown() : void 0;
  };
})();

// ■ END MapInvPartySelectCntrl.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapUserChestController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var MapUserChestController;
  MapUserChestController = class MapUserChestController extends PKD_MI.LIBS.MapInvController {
    constructor() {
      super(...arguments);
      this.goldRefreshThread = null;
    }

    _onGoldTick() {} // * EMPTY

    _moveToLastPos() {
      if ($gameTemp.__lastUserChestDragPos != null) {
        return this.invSprite.move($gameTemp.__lastUserChestDragPos);
      }
    }

    _saveLastDragPos() {
      return $gameTemp.__lastUserChestDragPos = [this.invSprite.x, this.invSprite.y];
    }

    updateWhenOpen() {
      var key, key2, ref;
      super.updateWhenOpen();
      if ((ref = this._autoCloseThread) != null) {
        ref.update();
      }
      key = PKD_MI.Parameters.get_ChestTakeAllKey();
      if (Input.isTriggered(key)) {
        this.takeAll();
      }
      key2 = PKD_MI.Parameters.get_InventoryOpenKey();
      if (Input.isTriggered(key2)) {
        $gamePlayer.onPKDInventoryKey();
      }
    }

    showItems() {
      this._loadedItems = $gamePlayer.aaGetPlayerChestStoredItems().getOnlyItems();
      this._setPages();
      return this._showItemsGroup(0);
    }

    showWeapons() {
      this._loadedItems = $gamePlayer.aaGetPlayerChestStoredItems().getOnlyWeapons();
      this._setPages();
      return this._showItemsGroup(0);
    }

    showArmors() {
      this._loadedItems = $gamePlayer.aaGetPlayerChestStoredItems().getOnlyArmors();
      this._setPages();
      return this._showItemsGroup(0);
    }

    showKeys() {
      this._loadedItems = [];
      this._setPages();
      return this._showItemsGroup(0);
    }

    clickAt(index) {
      var e;
      try {
        this._onReturnItem(index + (this._currentPage * this.MAX));
        if (PKD_MI.isInventoryOpened()) {
          return PKD_MI.refreshInventory();
        }
      } catch (error) {
        e = error;
        return PKD_MI.warning(e);
      }
    }

    _onReturnItem(index) {
      var itemData;
      itemData = this._loadedItems[index];
      if (itemData == null) {
        return;
      }
      this._onReturnItemWithCheck(index, itemData);
    }

    _onReturnItemWithCheck(index, itemData, fast = false) {
      var cell, item, realCount, resultCount;
      resultCount = itemData[1];
      item = itemData[0];
      realCount = this._getItemCountToReturn(resultCount, item);
      if (realCount <= 0) {
        SoundManager.playBuzzer();
        return;
      }
      if (!$gameParty.isCanAddNewItem(itemData[0])) {
        SoundManager.playBuzzer();
        return;
      }
      if (realCount === 1 || fast === true || !PKD_MI.isUseSlider()) {
        this._onStoreItemFinal(itemData, realCount);
        if (fast === false) { // * Если множественный, то в другом месте перезагрузка
          SoundManager.playCursor();
          this.loadItemsInCategory(this._loadedCatIndex);
        }
      } else {
        //cell = @content.getCellAt(index)
        //@_checkToAutoClose()
        cell = this.content.getCellByItem(itemData[0]);
        this._onReturnItemWithSlider(cell, itemData, realCount);
      }
    }

    //$[OVER BASE]
    onSliderOkClick() {
      if (!this.isSomeItemFocused()) {
        return;
      }
      this.clearFocus();
      this._onStoreItemFinal(this._tempSliderItem, this.content.getSliderValue());
      this._tempSliderItem = null;
      this.loadItemsInCategory(this._loadedCatIndex);
      //@_checkToAutoClose()
      return SoundManager.playCursor();
    }

    _onReturnItemWithSlider(cell, itemData, realCount) {
      this.content.showFocusLayer();
      this.content.showFocusedItem(cell, itemData[1]);
      this.sliderController = new PKD_MI.LIBS.SliderController(this.content, 1);
      this._tempSliderItem = itemData;
      this._tempSliderMaxValue = realCount;
      return this.content.refreshSlider(realCount, this._isSliderNewValueIsAllowed(realCount));
    }

    //$[OVER BASE]
    getMaxValueForSlider() {
      return this._tempSliderMaxValue;
    }

    //$[OVER BASE]
    _onStoreItemFinal(itemData, count) {
      var item;
      $gameTemp._newUserChestCat = this._loadedCatIndex;
      item = itemData[0];
      $gamePlayer.removeItemFromChestStorage(item, count);
      //* Прятать всплывающее, если инвентарь открыт
      $gameParty._noNotifyABS = PKD_MI.isInventoryOpened();
      $gameParty.gainItem(itemData[0], count);
      $gameParty._noNotifyABS = false;
    }

    _setItemToCell(cell, item) {
      return cell.setChestItem(item);
    }

    takeAll() {
      var e;
      try {
        // * Забирает все вещи с текущей категории
        //"TAKE ALL".p()
        this._returnAllItemsOfCategory();
        if (PKD_MI.isInventoryOpened()) {
          //$gamePlayer.removeFullTypeFromChestStorage(@_loadedCatIndex)
          PKD_MI.refreshInventory();
        }
        SoundManager.playCursor();
      } catch (error) {
        e = error;
        PKD_MI.warning('When try take ALL from User storage chest', e);
      }
      this.loadItemsInCategory(this._loadedCatIndex);
      return this._checkToAutoClose();
    }

    _returnAllItemsOfCategory() {
      var i, itemData, j, l, ref;
      $gameParty._noNotifyABS = PKD_MI.isInventoryOpened();
      l = this._loadedItems.length;
      for (i = j = 0, ref = l; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        itemData = this._loadedItems[i];
        if (itemData == null) {
          continue;
        }
        //$gameParty.gainItem(itemData[0], itemData[1])
        this._onReturnItemWithCheck(i, itemData, true);
        if (l !== this._loadedItems.length) {
          this._returnAllItemsOfCategory();
          return;
        }
      }
      $gameParty._noNotifyABS = false;
    }

    // * Если нету вообще ничего (а не только в текущей категории)
    _checkToAutoClose() {
      if ($gamePlayer.aaGetPlayerChestStoredItems().items.length === 0) {
        this._autoCloseThread = new KDCore.TimedUpdate(20, this.__onAutoCloseTick.bind(this));
        return this._autoCloseThread.once();
      }
    }

    __onAutoCloseTick() {
      return PKD_MI.closeUserChest();
    }

  };
  PKD_MI.register(MapUserChestController);
})();

// ■ END MapUserChestController.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapChestFooter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapChestFooter;
  Sprite_MapChestFooter = class Sprite_MapChestFooter extends PKD_MI.LIBS.Sprite_MapInvFooter {
    constructor() {
      super();
    }

    _createContent() {
      this._createTakeAllBtn();
      return this._createTakeText();
    }

    _createTakeAllBtn() {
      var img0, img1;
      this.takeBtn = new KDCore.Button();
      img0 = ImageManager.loadPKDMI("inventoryChestTakeAllButton_00");
      img1 = ImageManager.loadPKDMI("inventoryChestTakeAllButton_01");
      this.takeBtn.setButtonImages(img0, img1, img0, img0);
      this.takeBtn.move(KDCore.Utils.jsonPos(this.settings.takeAllButtonPosition));
      this.takeBtn.addClickHandler(function() {
        return PKD_MI.takeAllFromChest();
      });
      return this.add(this.takeBtn);
    }

    _createTakeText() {
      var text, textSpr;
      textSpr = KDCore.Sprite.FromTextSettings(this.settings.takeTextSettings);
      //textSpr.fillAll()
      text = this.settings.takeDefaultText;
      textSpr.drawTextWithSettings(text);
      return this.add(textSpr);
    }

    _createArrows() {
      PKD_MI.LIBS.Sprite_MapInvFooter.prototype._createArrows.call(this);
      this._arrowL.clearClickHandlers();
      this._arrowR.clearClickHandlers();
      this._arrowL.addClickHandler(function() {
        SoundManager.playCursor();
        PKD_MI.chestShowPrevPage();
      });
      return this._arrowR.addClickHandler(function() {
        SoundManager.playCursor();
        PKD_MI.chestShowNextPage();
      });
    }

    _settingsJSON() {
      return PKD_MI.getUIMapChestSettings();
    }

  };
  PKD_MI.register(Sprite_MapChestFooter);
})();

// ■ END Sprite_MapChestFooter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapChestHeader.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapChestHeader;
  Sprite_MapChestHeader = class Sprite_MapChestHeader extends PKD_MI.LIBS.Sprite_MapInvHeader {
    constructor() {
      super();
    }

    _createContent() {
      var text;
      text = $gameTemp.__aaChestName;
      if (text == null) {
        text = this.settings.defaultChestName;
      }
      this._content = KDCore.Sprite.FromTextSettings(this.settings.chestName);
      this._content.drawTextWithSettings(text);
      this.add(this._content);
      return $gameTemp.__aaChestName = null;
    }

    //u19
    _drawIcon() {
      if (String.any($gameTemp.__nextVisualChestExtraIcon)) {
        this._drawCustomIcon($gameTemp.__nextVisualChestExtraIcon);
        return $gameTemp.__nextVisualChestExtraIcon = null;
      } else {
        return this._drawSettingsIcon();
      }
    }

    //u19
    _drawCustomIcon(customImage) {
      var icon;
      icon = PKD_MI.FromImgI(customImage);
      icon.move(this.settings.iconMarginX, this.settings.iconMarginY);
      return this.add(icon);
    }

    //u19
    _drawSettingsIcon() {
      var icon;
      if (this.settings.icon == null) {
        return;
      }
      if ($gameTemp.__aaChestIsLoot === true) {
        icon = PKD_MI.FromImgI("InventoryIconLoot");
        $gameTemp.__aaChestIsLoot = null;
      } else {
        icon = PKD_MI.FromImgI(this.settings.icon);
      }
      icon.move(this.settings.iconMarginX, this.settings.iconMarginY);
      return this.add(icon);
    }

    _settingsJSON() {
      return PKD_MI.getUIMapChestSettings();
    }

    _createCloseButton() {
      super._createCloseButton();
      this.closeBtn.clearClickHandlers();
      return this.closeBtn.addClickHandler(function() {
        return PKD_MI.closeChest();
      });
    }

  };
  PKD_MI.register(Sprite_MapChestHeader);
})();

// ■ END Sprite_MapChestHeader.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ zSprite_MapChestMain_PRO.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapChestMain;
  Sprite_MapChestMain = class Sprite_MapChestMain extends PKD_MI.LIBS.Sprite_MapInvMain {
    constructor() {
      super();
    }

    _settingsJSON() {
      return PKD_MI.getUIMapChestSettings();
    }

    
      //?UPD18
    _createContent() {
      this._content = new PKD_MI.LIBS.Sprite_MainInvItems(true);
      return this._main.addChild(this._content);
    }

    _createHeader() {
      this._header = new PKD_MI.LIBS.Sprite_MapChestHeader();
      return this._main.addChild(this._header);
    }

    _createFooter() {
      this._footer = new PKD_MI.LIBS.Sprite_MapChestFooter();
      return this._main.addChild(this._footer);
    }

    playStartSE() {
      return KDCore.Utils.playSE(this.settings.openChestSE);
    }

  };
  PKD_MI.register(Sprite_MapChestMain);
})();

// ■ END zSprite_MapChestMain_PRO.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInventoryActorCell.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.Sprite_MapInventoryActorCell.prototype;
  //$[OVER BASE]
  _.drawGauges = function(item) {
    var gauge;
    this.gaugeitems = [];
    if (DataManager.isItemHaveHPEffect(item)) {
      gauge = this.drawHpGauge();
      if (gauge.visible) {
        this.gaugeitems.push(gauge);
      }
    }
    if (DataManager.isItemHaveMPEffect(item)) {
      gauge = this.drawMpGauge();
      if (gauge.visible) {
        this.gaugeitems.push(gauge);
      }
    }
    if (DataManager.isItemHaveTPEffect(item)) {
      gauge = this.drawTpGauge();
      if (gauge.visible) {
        this.gaugeitems.push(gauge);
      }
    }
  };
  _.drawHpGauge = function() {
    return this._drawIGauge(this.settings.partySelectorHpGauge, this.actor.hpRate());
  };
  _.drawMpGauge = function() {
    return this._drawIGauge(this.settings.partySelectorMpGauge, this.actor.mpRate());
  };
  _.drawTpGauge = function() {
    return this._drawIGauge(this.settings.partySelectorTpGauge, this.actor.tpRate());
  };
  _._drawIGauge = function(gaugeSettings, value) {
    var gauge, i, item, len, ref;
    gauge = new PKD_MI.LIBS.Sprite_ColorGauge(gaugeSettings);
    gauge.drawGauge(value);
    this.addChild(gauge);
    if (this.gaugeitems.length > 0) {
      ref = this.gaugeitems;
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        gauge.y += item.height - 1;
      }
    }
    return gauge;
  };
})();

// ■ END Sprite_MapInventoryActorCell.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInvCell.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.Sprite_MapInvCell.prototype;
  //?UPD
  _.setFocusItem = function(item1, count) {
    this.item = item1;
    this.drawIconExt();
    this.drawCount(count);
    this.registerFocusClick();
    return this.drawFocusFrame();
  };
  _.registerFocusClick = function() {
    var index;
    this._cell._clickHandlers = [];
    index = this.index;
    return this._cell.addClickHandler(function() {
      return PKD_MI.onInvCellFocusedClick(index);
    });
  };
  _.drawFocusFrame = function() {
    return this._cell.setButtonImages(...this._imgs3);
  };
  _._checkUsable = function() {
    this.partyUsecases = [];
    if (PKD_MI.Parameters.get_AutoRefreshItems() === true) {
      this._onCheckUsableTick();
      return this._checkUsableThread = new KDCore.TimedUpdate(20, this._onCheckUsableTick.bind(this));
    } else {
      return this._onCheckUsableTick();
    }
  };
  //?UPDX
  _._onCheckUsableTick = function() {
    var canUse, e, i, j, k, len, ref;
    //"CHECK USABLE FOR ITEM".p(@item.name)
    if (this.item.occasion === 1) { // * battle screen
      this.disableItem();
      return false;
    }
    if (this.item.scope === 0 && (this.item.occasion === 2 || this.item.occasion === 0)) {
      this.enableItem();
      return true;
    }
    canUse = true;
    try {
      if (PKD_MI.isPartyInventoryAllowed() && !this.isHotCell) { //?line
        ref = PKD_MI.partyGroup();
        for (j = k = 0, len = ref.length; k < len; j = ++k) {
          i = ref[j];
          this.partyUsecases[j] = this._canActorUseItem(i);
        }
        canUse = this.partyUsecases.some(function(i) {
          return i === true;
        });
      } else {
        canUse = this._canActorUseItem($gameParty.leader());
      }
      if (!canUse) {
        return this.disableItem();
      } else {
        return this.enableItem();
      }
    } catch (error) {
      e = error;
      PKD_MI.warning(e);
      return this.disableItem();
    }
  };
  _._canActorUseItem = function(actor) {
    var _S, actorIndex, item, result;
    _S = Scene_Item.prototype; //?line
    this.user = function() {
      return actor;
    };
    item = this.item;
    this.item = function() {
      return item;
    };
    this.isItemEffectsValid = function() {
      return _S.isItemEffectsValid.call(this);
    };
    this._actorWindow = {};
    actorIndex = PKD_MI.partyGroup().indexOf(actor);
    this._actorWindow.index = function() {
      return actorIndex;
    };
    this.itemTargetActors = function() {
      return _S.itemTargetActors.call(this);
    };
    result = _S.canUse.call(this);
    this.item = item;
    return result;
  };
  _.enableItem = function() {
    return this._fader.visible = false;
  };
})();

// ■ END Sprite_MapInvCell.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInvCell.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.Sprite_MapInvCell.prototype;
  _._refreshEquipmentStateForActor = function(actor) {
    var canEquip, candidates, e, equips, i, j, ref, results;
    try {
      canEquip = actor.canEquip(this.item);
      if (canEquip === true) {
        this.whoCanEquip.push(actor.actorId());
        candidates = this._getUnequipCandidtaes();
        if ((ref = candidates[this.item.id]) != null ? ref.contains(actor.actorId()) : void 0) {
          return;
        }
        equips = actor.equips();
        results = [];
        for (i in equips) {
          j = equips[i];
          if (j === this.item) {
            this._isEquipedItem = true;
            this._applyEquipmenSpecialState();
            this.whoCanUnEquip.push(actor.actorId());
            results.push(this._setCandidateForUnequip(actor.actorId()));
          } else {
            results.push(void 0);
          }
        }
        return results;
      }
    } catch (error) {
      e = error;
      return PKD_MI.warning(e);
    }
  };
  // * Имя, кто будет унЭкиперовать
  _._getSpecialStateActorName = function() {
    var actor;
    actor = this._getEquipmentActor();
    if (actor != null) {
      return actor.name();
    }
    return "";
  };
  _._setCandidateForUnequip = function(actorId) {
    var candidates;
    candidates = $gameTemp._equipmentArmrCandidates;
    if (DataManager.isWeapon(this.item)) {
      candidates = $gameTemp._equipmentWeapCandidates;
    }
    if (candidates[this.item.id] != null) {
      return candidates[this.item.id].push(actorId);
    } else {
      return candidates[this.item.id] = [actorId];
    }
  };
  _._getUnequipCandidtaes = function() {
    if (DataManager.isWeapon(this.item)) {
      return $gameTemp._equipmentWeapCandidates;
    } else {
      return $gameTemp._equipmentArmrCandidates;
    }
  };
  //?UPD
  _._getEquipmentActor = function() {
    var actor;
    actor = $gameParty.leader();
    if (PKD_MI.isPartyInventoryAllowed() && !this.isHotCell) {
      if (this.whoCanUnEquip != null) {
        actor = $gameActors.actor(this.whoCanUnEquip[0]);
      }
    }
    return actor;
  };
  _._checkEquipmentsUsable = function() {
    var actor, index, k, len, ref, result;
    if (this._inSpecialState === true) { // * Если экиперовано, то нет смысла
      return;
    }
    this.partyUsecases = [];
    ref = PKD_MI.partyGroup();
    for (index = k = 0, len = ref.length; k < len; index = ++k) {
      actor = ref[index];
      result = this.whoCanEquip.contains(actor.actorId());
      this.partyUsecases[index] = result;
    }
  };
})();

// ■ END Sprite_MapInvCell.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_MI_LIBS.Sprite_MapInvCell.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.Sprite_MapInvCell.prototype;
  //u19
  _.prepareForCategory = function(categoryIndex) {
    this.categoryIndex = categoryIndex;
    this._lockCellSpr.visible = false;
    this._iconSprPlace.visible = true;
    // * KEY ITEMS CAN'T BE LOCKED
    //console.log(@categoryIndex)
    if (this.categoryIndex === 3) {
      return;
    }
    if (this.categoryIndex < 0) {
      return;
    }
    if (this.isLockSupportType !== true) {
      return;
    }
    if (!PKD_MI.Parameters.isCellLockSystemAllowed()) {
      return;
    }
    if (this.categoryIndex !== 4) {
      this._checkLockedState();
    } else {
      this._checkLockedStateForChest();
    }
  };
  //u19
  _._checkLockedState = function() {
    if (this.index < $gamePlayer.getMapInventoryUnlockedCount(this.categoryIndex)) {
      return;
    }
    this._lockCellSpr.visible = true;
    this._iconSprPlace.visible = false;
  };
  //u19
  _._checkLockedStateForChest = function() {
    if (!this._isOutOfRangeIndex()) {
      return;
    }
    this._lockCellSpr.visible = true;
    this._iconSprPlace.visible = false;
  };
  //u19
  _._isOutOfRangeIndex = function() {
    if ($gameTemp.__aaVisualChestLimitCount == null) {
      return false;
    }
    if ($gameTemp.__aaVisualChestLimitCount < 0) {
      return false;
    }
    return this.index >= $gameTemp.__aaVisualChestLimitCount;
  };
})();

// ■ END PKD_MI_LIBS.Sprite_MapInvCell.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInventoryHotItemCell.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapInventoryHotItemCell;
  //?UPD18
  Sprite_MapInventoryHotItemCell = class Sprite_MapInventoryHotItemCell extends PKD_MI.LIBS.Sprite_MapInvCell {
    constructor(index) {
      super(index, false);
      this._isNoMoreItems = false;
    }

    setHotKey(hotKey) {
      this.hotKey = hotKey;
      return this._drawHotKey();
    }

    setHotCellItem(item) {
      this.isHotCell = true;
      this.setItem(item);
      this._checkHotItemExists();
      return this._drawHotKey();
    }

    isHotKeyTriggered() {
      if (this.hotKey == null) {
        return false;
      }
      if (!this.isEnabled()) {
        return false;
      }
      return Input.isTriggered(this.hotKey.toLowerCase());
    }

    _drawHotKey() {
      if (this.hotKey == null) {
        return;
      }
      this._textSprHK.bitmap.clear();
      return this._textSprHK.drawTextFull(this.hotKey);
    }

    _create() {
      super._create();
      return this._createHotKeyText();
    }

    _createHotKeyText() {
      this._textSprHK = KDCore.Sprite.FromParams(PKD_MI.Parameters.getCellItemHotKeyText());
      return this.add(this._textSprHK);
    }

    refreshHotCell() {
      this._clearSpeacialState();
      return this.setHotCellItem(this.item);
    }

    registerClick() {
      var index;
      this._cell._clickHandlers = [];
      index = this.index;
      this._cell.addClickHandler(function() {
        return PKD_MI.onMapHotCellClick(index);
      });
    }

    _refreshItemState() {
      super._refreshItemState();
      this._checkHotItemExists();
      return this._checkUsable();
    }

    _checkHotItemExists() {
      var count;
      if (!this.isHotCell) {
        return;
      }
      if (this._isEquipedItem === false) {
        count = $gameParty.numItems(this.item);
        if (!DataManager.isItem(this.item)) {
          return;
        }
        if (count === 0) {
          this._isNoMoreItems = true;
          this.drawZeroCount();
          this.disableItem();
        } else {
          if (this._isNoMoreItems === true) {
            this._isNoMoreItems = false;
            this.enableItem();
            this._onCheckUsableTick();
          }
        }
      }
    }

    _onCheckUsableTick() {
      super._onCheckUsableTick();
      return this._checkHotItemExists();
    }

    drawZeroCount() {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      this._textSpr.bitmap.textColor = KDCore.Color.RED.CSS;
      return this._textSpr.drawTextFull("0", this.settings.cellItemCountText.position);
    }

    startMovingCell() {
      super.startMovingCell();
      return $gameTemp._pkdMIHotCellMoving = this.index;
    }

    _refreshEquipmentState() {
      var canEquip, e, equips, i, j;
      try {
        canEquip = $gameParty.leader().canEquip(this.item);
        if (!canEquip) {
          this.disableItem();
        }
        equips = $gameParty.leader().equips();
        for (i in equips) {
          j = equips[i];
          if (j === this.item) {
            this._isEquipedItem = true;
            this._applyEquipmenSpecialState();
            return;
          }
        }
      } catch (error) {
        e = error;
        return PKD_MI.warning(e);
      }
    }

    _checkUsable() {
      this.partyUsecases = [];
      // * ALWAYS
      this._onCheckUsableTick();
      if (this._checkUsableThread == null) {
        return this._checkUsableThread = new KDCore.TimedUpdate(5, this._onCheckUsableTick.bind(this));
      }
    }

  };
  PKD_MI.register(Sprite_MapInventoryHotItemCell);
})();

// ■ END Sprite_MapInventoryHotItemCell.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MainInvItems.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.Sprite_MainInvItems.prototype;
  _.showFocusLayer = function() {
    var h, w;
    w = this.settings.invCellMarginX * 5;
    h = this.settings.invCellMarginY * 5;
    this._focusLayer = KDCore.Sprite.FromBitmap(w, h);
    //@_focusLayer.move -1, -1
    this._focusLayer.bitmap.fillAll(KDCore.Color.BLACK);
    this._focusLayer.opacity = 180;
    this.content.addChild(this._focusLayer);
    return $gameTemp._pkdMICellFocused = true;
  };
  _.showFocusedItem = function(cell, itemCount) {
    this.focusedCell = new PKD_MI.LIBS.Sprite_MapInvCell(cell.index);
    this.focusedCell.move(cell.x, cell.y);
    this.focusedCell.setFocusItem(cell.item, itemCount);
    return this._focusLayer.addChild(this.focusedCell);
  };
  _.isFocused = function() {
    return this._focusLayer != null;
  };
  _.clearFocus = function() {
    if (!this.isFocused()) {
      return;
    }
    this.content.removeChild(this._focusLayer);
    this._focusLayer.visible = false;
    this._focusLayer.destroy();
    this._focusLayer = null;
    //@focusedCell?.destroy()
    this.focusedCell = null;
    return $gameTemp._pkdMICellFocused = false;
  };
  _.isMouseInFocusZone = function() {
    var pos, rx, ry;
    if (this.focusedCell.isHovered()) {
      return false;
    }
    if (this._isSomePartyActorIsHovered()) {
      return false;
    }
    if (this._isSliderIsHovered()) {
      return false;
    }
    pos = TouchInput;
    rx = KDCore.SDK.canvasToLocalX(this._focusLayer, pos.x);
    ry = KDCore.SDK.canvasToLocalY(this._focusLayer, pos.y);
    return rx >= 0 && ry >= 0 && rx <= this._focusLayer.width && ry <= this._focusLayer.height;
  };
  _.createPartyActors = function() {
    var i, j, len, ref, spr;
    this.partyFaces = [];
    this._focusGroup = new Sprite();
    this.content.addChild(this._focusGroup);
    this._focusGroup.move(this.focusedCell.x, this.focusedCell.y);
    ref = PKD_MI.partyGroup();
    //?line
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      spr = new PKD_MI.LIBS.Sprite_MapInventoryActorCell();
      spr.setActor(i);
      this.partyFaces.push(spr);
      this._focusGroup.addChild(spr);
    }
    return this.partyFaces;
  };
  _._isSomePartyActorIsHovered = function() {
    var i, j, len, ref;
    if (this.partyFaces == null) {
      return false;
    }
    ref = this.partyFaces;
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (i.isHovered()) {
        return true;
      }
    }
    return false;
  };
  _.destroyPartyActors = function() {
    this.partyFaces = null;
    return this._destroyFocusGroup();
  };
  _._destroyFocusGroup = function() {
    var ref;
    this.removeChild(this._focusGroup);
    if ((ref = this._focusGroup) != null) {
      ref.destroy();
    }
    return this._focusGroup = null;
  };
})();

// ■ END Sprite_MainInvItems.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MainInvItems.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.Sprite_MainInvItems.prototype;
  _.createSlider = function(methodA, methodB) {
    //"SHOW SLIDER".p()
    this._focusGroup = new Sprite();
    this.content.addChild(this._focusGroup);
    this._focusGroup.move(this.focusedCell.x, this.focusedCell.y);
    this._sliderItem = new PKD_MI.LIBS.Sprite_NumberSlider(this._onSliderLoaded.bind(this), methodB);
    this._sliderItem.visible = false;
    this._focusGroup.addChild(this._sliderItem);
    this._sliderOkBtn = this._createSliderOkBtn(methodA);
    this._sliderOkBtn.visible = false;
    this._focusGroup.addChild(this._sliderOkBtn);
    this._createSlidedItemRealCountText();
    this._onSliderLoaded();
  };
  _.refreshSlider = function(value, isAllowed) {
    this._lastSliderValue = value;
    this._slierItemCountText.clear();
    //@_slierItemCountText.bitmap.fillAll KDCore.Color.RED
    if (isAllowed) {
      this._slierItemCountText.bitmap.textColor = KDCore.Color.FromHex(this.settings.cellItemSliderCountText.textColor).CSS;
      this._sliderOkBtn.enable();
    } else {
      this._slierItemCountText.bitmap.textColor = KDCore.Color.FromHex(this.settings.cellItemSliderCountText.textColor2).CSS;
      this._sliderOkBtn.disable();
    }
    return this._slierItemCountText.drawTextFull(value, this.settings.cellItemSliderCountText.position);
  };
  _.getSliderValue = function() {
    return this._lastSliderValue;
  };
  _._createSlidedItemRealCountText = function() {
    this._slierItemCountText = KDCore.Sprite.FromBitmap(this.settings.cellItemSliderCountText.textBoxWidth, this.settings.cellItemSliderCountText.textBoxHeight);
    this.applyTextSettingsByExtraSettings(this._slierItemCountText, this.settings.cellItemSliderCountText);
    return this._focusGroup.addChild(this._slierItemCountText);
  };
  _._createSliderOkBtn = function(methodA) {
    var btn, btn1, btn2;
    this._sliderOkBtn = new KDCore.Button();
    btn = ImageManager.loadPKDMI('slider_button_ok_00');
    btn1 = ImageManager.loadPKDMI('slider_button_ok_01');
    btn2 = ImageManager.loadPKDMI('slider_button_ok_03');
    this._sliderOkBtn.setButtonImages(btn, btn1, btn, btn2);
    this._sliderOkBtn.x = this.settings.itemSliderSettings.sliderOkButtonMarginX;
    this._sliderOkBtn.y = this.settings.itemSliderSettings.sliderOkButtonMarginY;
    this._sliderOkBtn.addClickHandler(function() {
      return methodA();
    });
    return this._sliderOkBtn;
  };
  _._onSliderLoaded = function() {
    //"AFTER LOAD".p()
    if (this._sliderItem == null) {
      return;
    }
    this._sliderItem.x = this.settings.itemSliderSettings.sliderCellMarginX;
    this._sliderItem.y = this.settings.itemSliderSettings.sliderCellMarginY;
    this._sliderItem.visible = true;
    return this._sliderOkBtn.visible = true;
  };
  _.destroySlider = function() {
    var ref;
    if ((ref = this._sliderItem) != null) {
      ref.terminate();
    }
    this._destroyFocusGroup();
    return this._sliderItem = null;
  };
  _._isSliderIsHovered = function() {
    if (this._sliderItem == null) {
      return false;
    }
    if (this._sliderOkBtn.isMouseInButton()) {
      return true;
    }
    if (this._sliderItem.isInMousePositionAll()) {
      return true;
    }
  };
  _.getCellByItem = function(item) {
    var c, i, len, ref;
    ref = this._cells;
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i];
      if (c.item === item) {
        return c;
      }
    }
    return null;
  };
})();

// ■ END Sprite_MainInvItems.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapUserChestHeader.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapUserChestHeader;
  Sprite_MapUserChestHeader = class Sprite_MapUserChestHeader extends PKD_MI.LIBS.Sprite_MapInvHeader {
    constructor() {
      super();
    }

    _drawIcon() {
      var icon, tempSettings;
      tempSettings = PKD_MI.getUIMapUserChestSettings();
      if (tempSettings.icon == null) {
        return;
      }
      icon = PKD_MI.FromImgI(tempSettings.icon);
      icon.move(tempSettings.iconMarginX, tempSettings.iconMarginY);
      return this.add(icon);
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    _createCloseButton() {
      var ref, tempSettings;
      super._createCloseButton();
      this.closeBtn.clearClickHandlers();
      this.closeBtn.addClickHandler(function() {
        return PKD_MI.closeUserChest();
      });
      if ((ref = this.category4) != null) {
        ref.visible = false;
      }
      tempSettings = PKD_MI.getUIMapUserChestSettings();
      this._content.move(tempSettings.categoryButtonsMarginX, tempSettings.categoryButtonsMarginY);
      if (this.category1 != null) {
        this.category1.clearClickHandlers();
        this.category1.addClickHandler(function() {
          SoundManager.playCursor();
          PKD_MI.userChestShowCategoryItems();
        });
      }
      if (this.category2 != null) {
        this.category2.clearClickHandlers();
        this.category2.addClickHandler(function() {
          SoundManager.playCursor();
          PKD_MI.userChestShowCategoryWeapons();
        });
      }
      if (this.category3 != null) {
        this.category3.clearClickHandlers();
        this.category3.addClickHandler(function() {
          SoundManager.playCursor();
          PKD_MI.userChestShowCategoryArmors();
        });
      }
      if (this.category4 != null) {
        this.category4.clearClickHandlers();
      }
    }

  };
  PKD_MI.register(Sprite_MapUserChestHeader);
})();

// ■ END Sprite_MapUserChestHeader.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_InvUI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_InvUI.prototype;
  //u19
  _._createMIButton = function() {
    var img0, img1, img2, img3, settings;
    this._button = new KDCore.Button();
    settings = $PKD_MapInventorySettings.ScreenButtonSettings;
    this._button.move(KDCore.Utils.jsonPos(settings.position));
    img0 = ImageManager.loadPKDMI(settings.mainImg);
    img1 = ImageManager.loadPKDMI(settings.hoverImg);
    img2 = ImageManager.loadPKDMI(settings.pressedImg);
    img3 = ImageManager.loadPKDMI(settings.disabledImg);
    this._button.setButtonImages(img0, img1, img2, img3);
    this._button.setAlphaMode();
    if (settings.labelText != null) {
      this._button.setHelpText(settings.labelText[0], settings.labelText[1]);
      this._button.setTextPosition(settings.labelText[2]);
    }
    this._button.addClickHandler(function() {
      SoundManager.playCursor();
      if ($gamePlayer.isPKDInventoryAllowed()) { //line
        return PKD_MI.openOrCloseInventory(); //line
      }
    });
    this.addChild(this._button);
    this.applyMIButtonSettings();
  };
  _.applyMIButtonSettings = function() {
    var settings;
    settings = $gameSystem.getPKIButtonSettings();
    if (settings == null) {
      return;
    }
    if (settings.position != null) {
      this._button.move(settings.position);
    } else {
      this._button.move(KDCore.Utils.jsonPos($PKD_MapInventorySettings.ScreenButtonSettings.position));
    }
    this._button.visible = settings.visibility;
    if (settings.disable === true) {
      this._button.disable();
    } else {
      this._button.enable();
    }
  };
  
  // * ============================== UPDATE 1.6 ============================================

  //?UPDX
  _._createOUTItems = function() {
    var c, cells, i, j, len, results;
    cells = PKD_MI.Parameters.getHotCells();
    this.uiExtraCells = [];
// * Индекс нужен чтобы Click обрабатывать
    results = [];
    for (i = j = 0, len = cells.length; j < len; i = ++j) {
      c = cells[i];
      results.push(this.uiExtraCells.push(this._createAndAddOUTItemToUI(c, i)));
    }
    return results;
  };
  //?UPDX
  _._createAndAddOUTItemToUI = function(cellData, index) {
    var cell, item;
    cell = new PKD_MI.LIBS.Sprite_MapInventoryHotItemCell(index);
    item = $gamePlayer.addGetItemForHotCell(index);
    if (item != null) {
      this.setItemToOuterCell(cell, item);
    }
    // * сохранять по индексу
    cell.move(cellData.pos.x, cellData.pos.y);
    if (PKD_MI.Parameters.isOuterItemsHotKeysEnabled()) {
      cell.setHotKey(cellData.key);
    }
    this.addChild(cell);
    return cell;
  };
  //?UPDX
  _.startMoveCellItem = function(item) {
    var extraImg, iconSize;
    this._dragItem = item;
    $gameTemp._pkdMICellMoving = true;
    iconSize = 32;
    if (PKD_MI.Parameters.isCustomSizeCells()) {
      iconSize = PKD_MI.Parameters.getCustomSizeCellsParameters().iconSize;
    }
    this._movingItemSprite = new Sprite(new Bitmap(iconSize, iconSize));
    extraImg = DataManager.getItemInvImage(item);
    if (String.any(extraImg)) {
      this._movingItemSprite.bitmap.drawIcon(0, 0, ImageManager.loadPKDMI_Icon(extraImg), iconSize);
    } else {
      this._movingItemSprite.bitmap.drawIcon(0, 0, item.iconIndex, iconSize);
    }
    this.addChild(this._movingItemSprite);
    return this._showThrowOutBox(); //TO
  };
  
  //?UPDX
  _._updateOuterCells = function() {
    if ($gameTemp._pkdMICellMoving === true) {
      this._updateDrag();
    } else {
      this._updateOuterHotKeys();
    }
  };
  //?UPDX
  _._updateOuterHotKeys = function() {
    var c, j, len, ref;
    ref = this.uiExtraCells;
    for (j = 0, len = ref.length; j < len; j++) {
      c = ref[j];
      if (c.isHotKeyTriggered()) {
        PKD_MI.onMapHotCellClick(c.index);
        return;
      }
    }
  };
  //?UPDX
  _._updateDrag = function() {
    // * drag is end
    this._movingItemSprite.move(TouchInput.x, TouchInput.y);
    this._updateThrowOutBox(); //TO
    if (TouchInput.isCancelled()) {
      this._clearMovingItemSprite();
      return;
    }
    if (!TouchInput.isPressed()) {
      this._onRelaseDragginCell();
      this._cancelThrowOutBox(); //TO
      return this._clearMovingItemSprite();
    }
  };
  //?UPDX, UPD18
  _._onRelaseDragginCell = function() {
    var cell;
    if (this.isAnyOuterCellUnderMouse()) {
      cell = this.uiExtraCells.find(function(c) {
        return c.isHovered();
      });
      if (cell != null) {
        return this.setItemToOuterCell(cell, this._dragItem);
      }
    } else {
      if (this.isThrowOutBoxIsReadyToThrow()) { //TO
        return this.throwOutItem(); //TO
      } else {
        if ($gameTemp._pkdMIHotCellMoving >= 0) {
          cell = this.uiExtraCells[$gameTemp._pkdMIHotCellMoving];
          if (cell != null) {
            return this.setItemToOuterCell(cell, null);
          }
        } else {
          return SoundManager.playBuzzer();
        }
      }
    }
  };
  //?UPDX, UPD18
  _._clearMovingItemSprite = function() {
    this.removeChild(this._movingItemSprite);
    this._movingItemSprite.visible = false;
    this._movingItemSprite = null;
    $gameTemp._pkdMICellMoving = false;
    $gameTemp._pkdMIHotCellMoving = -1;
    this._dragItem = null;
    this._cancelThrowOutBox(); //TO
  };
  //?UPDX
  _.setItemToOuterCell = function(outerCell, item) {
    outerCell.setHotCellItem(item);
    return $gamePlayer.aaPutItemToHotCell(item, outerCell.index);
  };
  //?UPDX
  _.refreshMapHotCells = function() {
    return this.uiExtraCells.forEach(function(c) {
      return c.refreshHotCell();
    });
  };
  //?UPDX
  _.callHotCellItem = function(index) {
    var cell, ref;
    if ($gameTemp._pkdMICellMoving === true) {
      return;
    }
    cell = this.uiExtraCells[index];
    if ((cell != null) && (cell.item != null)) {
      return (ref = this.inventory) != null ? ref.onHotCellItemAction(cell) : void 0;
    }
  };
})();

// ■ END Spriteset_InvUI.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_InvUI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //?UPD18 ALL

  //@[DEFINES]
  _ = Spriteset_InvUI.prototype;
  _._showThrowOutBox = function() {
    var params;
    if (!PKD_MI.Parameters.isThrowOutEnabled()) {
      return;
    }
    if (this._dragItem == null) {
      return;
    }
    if ((this._dragItem.itypeId != null) && this._dragItem.itypeId === 2) {
      return;
    }
    params = PKD_MI.Parameters.getThrowOutSettings();
    this._toSprite = new PKD_MI.LIBS.SpriteThrowOutBox(params, this._inventorySprite.x, this._inventorySprite.y);
    return this.addChild(this._toSprite);
  };
  _.isThrowOutBoxIsReadyToThrow = function() {
    var ref;
    return (ref = this._toSprite) != null ? ref.isReadyToThrow() : void 0;
  };
  _.throwOutItem = function() {
    var params, removeCount;
    removeCount = 1;
    if (Input.isPressed('shift')) {
      removeCount = $gameParty.maxItems();
    }
    params = PKD_MI.Parameters.getThrowOutSettings();
    KDCore.Utils.playSE(params.throwOutSE);
    $gameParty.loseItem(this._dragItem, removeCount, true);
  };
  _._updateThrowOutBox = function() {
    if (this._toSprite == null) {
      return;
    }
    if (!this.isInventoryOpen()) {
      return this._cancelThrowOutBox();
    }
  };
  _._cancelThrowOutBox = function() {
    if (this._toSprite == null) {
      return;
    }
    this._toSprite.visible = false;
    this.removeChild(this._toSprite);
    return this._toSprite = null;
  };
})();

// ■ END Spriteset_InvUI.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
PKD_MI.isPro = function() {
  return true;
};

//Plugin PKD_MapInventory automatic build by PKD PluginBuilder 1.9.2 09.09.2021
