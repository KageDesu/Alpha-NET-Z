//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.18;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.18] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for singul column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optomized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optomized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x53ab=['_commandNameWindow','commandSell','isHoverEnabled','drawIcon','DrawIcons','Parse_Notetags_ParamJS','ARRAYSTRUCT','onTouchCancel','Parse_Notetags_EnableJS','buttonAssistText1','rateMP','getItemScopeText','windowPadding','BattleUsable','fillRect','CmdIconEquip','OffsetY','prepare','ARRAYFUNC','LabelHitType','PurchaseOnly','makeItemData','drawUpdatedAfterParamValue','_sellWindow','RegularItems','match','maxItemAmount','prepareNextScene','LabelSelfGainTP','playCursorSound','Parse_Notetags_Prices','drawItemQuantity','bestEquipItem','wtypeId','fontSizeRatio','CommandAddOptimize','process_VisuMZ_ItemsEquipsCore_RegExp','1678327cRBymc','RemoveEquipIcon','loadFaceImages','VisuMZ_1_MainMenuCore','ARRAYNUM','Speed1000','LabelRemove','Game_Party_initialize','ShopScene','MAT','clear','initNewItemsList','commandName','SellPriceRate','mainAreaHeight','onSlotOkAutoSelect','numberWindowRectItemsEquipsCore','processShiftRemoveShortcut','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Parse_Notetags_Batch','isTriggered','drawItemData','Step3End','buttonAssistCategory','goldWindowRect','getItemEffectsTpDamageLabel','ceil','ElementWeapon','drawItemStyleIconText','ParseAllNotetags','Scene_Shop_onSellCancel','Window_ItemCategory_initialize','map','BorderRegExp','resetFontSettings','ParseItemNotetags','Scene_Shop_onSellOk','setStatusWindow','categoryWindowRect','Scene_Equip_commandEquip','StatusWindowWidth','mainFontSize','commandStyle','REMOVED\x20EFFECTS','EFFECT_RECOVER_HP','getItemEffectsSelfTpGainLabel','EnableLayout','format','categoryStyleCheck','itemTextAlign','initialize','LabelRecoverTP','Categories','getItemDamageElementText','values','loadCharacter','buy','toUpperCase','commandWindowRectItemsEquipsCore','ActorChangeEquipSlots','optimizeEquipments','NUM','isEquipChangeOk','playOkSound','+%1','textColor','isClearEquipOk','sellWindowRectItemsEquipsCore','cancel','categoryItemTypes','onCategoryCancel','normalColor','drawItemName','ItemsEquipsCore','LabelConsume','equip2','categoryNameWindowCenter','KeyItems','drawText','Game_Actor_tradeItemWithParty','getItemEffectsMpDamageLabel','isItem','bind','Game_Actor_changeEquip','addItemCategory','getItemEffectsTpRecoveryText','canEquip','tpGain','DrawEquipData','icon','Param','forceChangeEquipSlots','weapon','updateCommandNameWindow','makeDeepCopy','getItemEffectsMpRecoveryLabel','getItemEffectsTpDamageText','refreshCursor','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','paramPlusItemsEquipsCoreCustomJS','cursorPagedown','checkShiftRemoveShortcut','smoothScrollTo','addBuyCommand','isOpen','translucentOpacity','processHandling','TP\x20RECOVERY','Scene_Shop_createSellWindow','NonRemoveETypes','onSellOkItemsEquipsCore','isArmor','Window_ItemList_colSpacing','currentSymbol','Game_Actor_discardEquip','isCancelled','pagedown','postCreateSellWindowItemsEquipsCore','drawItemEffectsRemovedStatesBuffs','isKeyItem','_slotWindow','gainItem','SpeedNeg1999','Scene_Shop_categoryWindowRect','onActorChange','itemWindowRect','isRightInputMode','updateCategoryNameWindow','round','Scene_Boot_onDatabaseLoaded','addState','drawCurrencyValue','uiHelpPosition','equips','max','fontSize','postCreateSlotWindowItemsEquipsCore','updateHelp','center','paramJS','drawItemDamageElement','Scene_Equip_onActorChange','convertInitEquipsToItems','_item','\x5cI[%1]','meetsItemConditionsNotetags','Blacklist','contents','_equips','0000','getItemDamageElementLabel','Scene_Equip_createSlotWindow','equipAdjustHpMp','getItemEffectsTpRecoveryLabel','postCreateItemsEquipsCore','textWidth','drawUpdatedParamValueDiff','onMenuImageLoad','Scene_Shop_statusWindowRect','postCreateItemWindowModernControls','drawItemActorMenuImage','BatchShop','Translucent','drawItemEffectsTpRecovery','versionId','_newLabelSprites','getInputMultiButtonStrings','ItemScene','isBottomHelpMode','create','processTouchModernControls','splice','isDualWield','value1','popScene','FUNC','damageColor','parse','_list','releaseUnequippableItems','param','createSlotWindow','commandBuyItemsEquipsCore','call','Scene_Shop_sellWindowRect','getItemEffectsRemovedStatesBuffsLabel','atk','Step3Start','Actors','flatMP','includes','hitIndex','createStatusWindow','setObject','DrawItemData','drawItemEffectsSelfTpGain','Icon','loadPicture','+%1%','itemEnableJS','isClearCommandEnabled','Scene_Item_create','Parse_Notetags_Category','isShiftShortcutKeyForRemove','drawItemEffectsMpRecovery','Step2End','clearNewItem','onBuyCancel','processCursorHomeEndTrigger','playBuzzerSound','Scene_Shop_onBuyCancel','height','getItemEffectsHpDamageText','onCategoryOk','smoothSelect','getItemDamageAmountTextBattleCore','onSellCancel','addOptimizeCommand','ParseWeaponNotetags','_shopStatusMenuMode','right','100%','log','mhp','drawRemoveItem','LUK','isShiftRemoveShortcutEnabled','DrawBackRect','drawItemNumber','discardEquip','forceResetEquipSlots','activate','CmdIconCancel','HitType%1','getItemEffectsMpRecoveryText','ParamValueFontSize','code','buyWindowRect','paramId','%1%','helpWindowRect','Window_EquipItem_isEnabled','getItemEffectsRemovedStatesBuffsText','geUpdatedLayoutStatusWidth','Parse_Notetags_ParamValues','createItemWindow','buttonAssistSmallIncrement','Window_ItemList_updateHelp','playEquip','defaultItemMax','ATK','commandWindowRect','commandStyleCheck','flatHP','slotWindowRect','isPressed','EFFECT_REMOVE_STATE','_commandWindow','gaugeBackColor','Speed2000','%1-%2','prepareItemCustomData','setItem','mainCommandWidth','ShopMenuStatusStandard','Parse_Notetags_EquipSlots','contentsBack','isOptimizeCommandAdded','systemColor','changeTextColor','AllArmors','isOptimizeEquipOk','_handlers','_buyWindowLastIndex','buttonAssistText2','meetsItemConditions','EquipScene','Whitelist','Scene_Shop_numberWindowRect','ScopeAlliesButUser','_money','hideNewLabelSprites','ItemQuantityFontSize','isPlaytest','isDrawItemNumber','LabelSuccessRate','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','currentEquippedItem','selfTP','isMainMenuCoreMenuImageOptionAvailable','drawActorParamDifference','paramPlus','onTouchSelectModern','ListWindowCols','commandNameWindowCenter','bitmap','VisuMZ_1_BattleCore','createSellWindow','_itemWindow','CmdTextAlign','updateNewLabelOpacity','prototype','Window_Selectable_update','EquipParams','maxItems','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','determineBaseSellingPrice','isHandled','value','buttonAssistKey2','allowShiftScrolling','CmdCancelRename','FontSize','Game_BattlerBase_param','setBackgroundType','itemPadding','FadeLimit','buttonAssistLargeIncrement','paintOpacity','hpRate','addLoadListener','BuyPriceJS','16RwdFcA','itemWindowRectItemsEquipsCore','Window_ShopSell_isEnabled','_calculatingJSParameters','_categoryWindow','gainTP','setupItemDamageTempActors','isPageChangeRequested','getTextColor','hideAdditionalSprites','Width','damage','scrollTo','shift','resetTextColor','SpeedNeg2000','MP\x20RECOVERY','currencyUnit','currentClass','LabelSpeed','Scene_Item_createCategoryWindow','cursorUp','shouldCommandWindowExist','drawParamText','Settings','floor','removeStateBuffChanges','trim','buyWindowRectItemsEquipsCore','_forcedSlots','EVAL','clamp','scope','_shopStatusMenuAlly','iconIndex','onTouchSelectModernControls','item','MaxItems','_newLabelOpacity','categoryNameWindowDrawBackground','iconWidth','category','isWeapon','createBitmap','HP\x20DAMAGE','RegExp','getItemDamageAmountText','getItemQuantityText','paramValueByName','uiMenuStyle','drawItemDamage','MaxArmors','isEnabled','dataId','_categoryNameWindow','809cGirtL','cursorRight','reloadMapIfUpdated','Window_Selectable_initialize','SellPriceJS','929kJfWVL','calcWindowHeight','drawItemEffectsHpDamage','#%1','drawItemEffectsHpRecovery','Speed0','Scope%1','onBuyCancelItemsEquipsCore','categoryWindowRectItemsEquipsCore','buffIconIndex','Scene_Shop_create','setNewItem','isUseItemsEquipsCoreUpdatedLayout','drawItemScope','params','setHp','isSellCommandEnabled','itemDataFontSize','successRate','\x5cb%1\x5cb','drawItemCustomEntryLine','setItemWindow','hitType','AGI','isClicked','isShowNew','refresh','drawItemDamageAmount','numItems','Scene_Item_itemWindowRect','changeBuff','fill','money','sellWindowRect','item-%1','ShiftShortcutKey','getInputButtonString','MaxMP','activateItemWindow','drawItemStyleIcon','W%1','?????','initNewLabelSprites','consumable','sell','elementId','CmdIconClear','commandNameWindowDrawText','Game_BattlerBase_meetsItemConditions','helpAreaTop','nonOptimizeEtypes','blt','ParseClassNotetags','clearNewLabelFromItem','Window_EquipStatus_refresh','show','isHovered','pageup','Scene_Equip_slotWindowRect','drawItemKeyData','Text','replace','getNextAvailableEtypeId','ScopeRandomAllies','maxCols','actor','onDatabaseLoaded','_statusWindow','Game_Actor_forceChangeEquip','drawUpdatedBeforeParamValue','getItemEffectsAddedStatesBuffsLabel','paramchangeTextColor','nonRemovableEtypes','Window_ItemCategory_setItemWindow','CmdStyle','callUpdateHelp','_actor','drawPossession','Scene_Shop_buyWindowRect','getItemEffectsHpRecoveryLabel','text','LabelElement','powerUpColor','isNewItem','Window_EquipCommand_initialize','isCursorMovable','Window_EquipItem_includes','_numberWindow','statusWidth','30906cGjaQr','_doubleTouch','getItemRepeatsLabel','boxWidth','addInnerChild','buttonAssistKey1','formula','CmdHideDisabled','Scene_Shop_commandBuy','addChild','meetsItemConditionsJS','_customItemInfo','onCategoryCancelItemsEquipsCore','getItemSuccessRateLabel','ParamChangeFontSize','_goodsCount','forceChangeEquip','USER\x20TP\x20GAIN','Scene_Equip_commandWindowRect','83656swFzce','setCategory','drawItemEffectsAddedStatesBuffs','getItemConsumableLabel','34zWAHVR','helpWindowRectItemsEquipsCore','Step1End','EFFECT_GAIN_TP','canShiftRemoveEquipment','drawItemEffectsMpDamage','updatedLayoutStyle','getItemSpeedText','ItemQuantityFmt','getItemColor','placeItemNewLabel','buttonAssistItemListRequirement','SpeedNeg999','sellPriceRate','width','FontFace','ScopeRandomAny','itemLineRect','changePaintOpacity','prepareNewEquipSlotsOnLoad','drawEquipData','MDF','VisuMZ_0_CoreEngine','addCancelCommand','removeDebuff','1234320uhszqi','LabelRepeats','processCursorMove','isUseModernControls','Window_Selectable_setHelpWindowItem','HiddenItemB','mainFontFace','commandEquip','Nonconsumable','Scene_Shop_commandWindowRect','push','ConvertParams','version','length','exit','statusWindowRectItemsEquipsCore','value2','occasion','filter','CmdIconSell','Style','removeBuff','_newItemsList','Scene_Equip_onSlotOk','processCursorMoveModernControls','canConsumeItem','getMatchingInitEquip','down','getColor','createCommandNameWindow','revertGlobalNamespaceVariables','allowCreateStatusWindow','placeNewLabel','getItemEffectsSelfTpGainText','prepareRefreshItemsEquipsCoreLayout','buttonAssistText3','postCreateCategoryWindowItemsEquipsCore','_tempActorB','(%1)','ELEMENT','possession','note','EFFECT_REMOVE_DEBUFF','KeyItemProtect','Scene_Item_createItemWindow','STRUCT','processCursorSpecialCheckModernControls','Scene_Load_reloadMapIfUpdated','paramValueFontSize','sellingPrice','_buyWindow','opacity','A%1','Window_ShopBuy_refresh','canUse','MP\x20DAMAGE','getItemDamageAmountLabelOriginal','powerDownColor','split','FadeSpeed','isEquipItem','categoryNameWindowDrawText','price','_scene','_newLabelOpacityChange','registerCommand','MaxWeapons','updateMoneyAmount','BackRectColor','armor-%1','Scene_Shop_prepare','tradeItemWithParty','LabelDamageTP','Scene_Equip_create','AllItems','categories','hideDisabledCommands','Window_ItemList_maxCols','getItemOccasionText','type','drawItemOccasion','679989nrRxTd','ParseArmorNotetags','itemAt','REPEAT','Scene_Shop_goldWindowRect','addSellCommand','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','setShopStatusWindowMode','_category','getItemEffectsMpDamageText','isOptimizeCommandEnabled','getItemsEquipsCoreBackColor2','CannotEquipMarker','Scene_Shop_commandSell','SCOPE','Window_ShopBuy_price','parameters','DEF','statusWindowRect','weaponTypes','getDamageStyle','description','StatusWindow','IconSet','getItemSuccessRateText','maxVisibleItems','FontColor','onTouchOk','Step1Start','AlwaysUsable','equip','_resetFontSize','ScopeRandomEnemies','onSlotCancel','_data','uiInputPosition','drawUpdatedParamName','drawing','allowCommandWindowCursorUp','optimize','LabelDamageHP','getItemHitTypeLabel','_bypassNewLabel','drawParamName','activateSellWindow','drawNewLabelIcon','onSellOk','EFFECT_ADD_STATE','mainAreaTop','getItemRepeatsText','constructor','buttonAssistOffset3','QUANTITY','isRepeated','slotWindowRectItemsEquipsCore','AllWeapons','drawItemHitType','effects','adjustItemWidthByStatus','Scene_Item_categoryWindowRect','drawItem','Scene_Shop_createCategoryWindow','CoreEngine','hide','keyItem','Window_Selectable_refresh','process_VisuMZ_ItemsEquipsCore_EquipSlots','iconText','colSpacing','TP\x20DAMAGE','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','Scene_Equip_itemWindowRect','CommandAddClear','\x5cI[%1]%2','Damage\x20Formula\x20Error\x20for\x20%1','makeCommandList','armorTypes','name','numberWindowRect','setHandler','helpAreaHeight','weapon-%1','iconHeight','FieldUsable','index','refreshActorEquipSlotsIfUpdated','_itemData','MANUAL','ItemMenuStatusBgType','drawItemEffectsTpDamage','Window_ItemList_drawItem','isCommandEnabled','categoryStyle','DrawParamJS','nextActor','deactivate','ActorResetEquipSlots','itypeId','newLabelEnabled','isEquipped','Scene_ItemBase_activateItemWindow','rateHP','members','MaxHP','Step2Start','Window_ShopCommand_initialize','drawNewLabelText','IncludeShopItem','getItemSpeedLabel','Scene_Shop_onCategoryCancel','update','LayoutStyle','onTouchSelect','createNewLabelSprite','_dummyWindow','addEquipCommand','lineHeight','getItemDamageAmountLabel','smallParamFontSize','drawItemDarkRect','innerWidth','Scene_Shop_sellingPrice','771502xVzutw','_purchaseOnly','optKeyItemsNumber','getItemConsumableText','goldWindowRectItemsEquipsCore','buttonAssistSlotWindowShift','drawItemSuccessRate','cursorPageup','characterName','select','isEquipCommandEnabled','mmp','deselect','createCategoryWindow','equipTypes','getMenuImage','indexOf','HiddenItemA','ADDED\x20EFFECTS','New','mainAreaBottom','textSizeEx','_tempActor','setHelpWindowItem','changeEquip','createCategoryNameWindow','getItemDamageAmountTextOriginal','addWindow','getItemEffectsHpDamageLabel','buttonAssistKey3','_tempActorA','etypeId','addClearCommand','commandBuy','DrawPortraitJS','mpRate','refreshItemsEquipsCoreNoMenuImage','remove','removeState','equipSlots','NotConsumable','commandNameWindowDrawBackground','addCommand','ElementNone','adjustHiddenShownGoods','commandSellItemsEquipsCore','modifiedBuyPriceItemsEquipsCore','ARRAYEVAL','left','status','elements','isBuyCommandEnabled','buttonAssistRemove','LabelApply','List','drawItemEquipType','drawParamsItemsEquipsCore','HP\x20RECOVERY','setMp','limitedPageUpDownSceneCheck','STR','loadSystem','isClearCommandAdded','getItemHitTypeText','EFFECT_ADD_DEBUFF','currentExt','visible','SUCCESS\x20RATE','drawTextEx','isEquipCommandAdded','process_VisuMZ_ItemsEquipsCore_Notetags','Consumable','_resetFontColor','active','auto','DrawFaceJS','addStateBuffChanges','LabelRecoverMP','drawItemEffects'];const _0x2942=function(_0x19af4f,_0x154b0b){_0x19af4f=_0x19af4f-0x8f;let _0x53ab99=_0x53ab[_0x19af4f];return _0x53ab99;};const _0x56eb94=_0x2942;(function(_0x57cab2,_0x458c16){const _0x1b2301=_0x2942;while(!![]){try{const _0x45f31f=parseInt(_0x1b2301(0x18a))*parseInt(_0x1b2301(0x232))+-parseInt(_0x1b2301(0x2a0))+parseInt(_0x1b2301(0x21f))*-parseInt(_0x1b2301(0x236))+parseInt(_0x1b2301(0x24f))+-parseInt(_0x1b2301(0x1c1))*parseInt(_0x1b2301(0x1c6))+parseInt(_0x1b2301(0x38e))+-parseInt(_0x1b2301(0x31a));if(_0x45f31f===_0x458c16)break;else _0x57cab2['push'](_0x57cab2['shift']());}catch(_0x2440d4){_0x57cab2['push'](_0x57cab2['shift']());}}}(_0x53ab,0xf37a7));var label='ItemsEquipsCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x56eb94(0x261)](function(_0x2a7bf0){const _0x193445=_0x56eb94;return _0x2a7bf0[_0x193445(0x34b)]&&_0x2a7bf0[_0x193445(0x2b5)][_0x193445(0x106)]('['+label+']');})[0x0];VisuMZ[label][_0x56eb94(0x1a2)]=VisuMZ[label][_0x56eb94(0x1a2)]||{},VisuMZ['ConvertParams']=function(_0x67b933,_0x40a7e7){const _0x148e54=_0x56eb94;for(const _0x5b16d2 in _0x40a7e7){if(_0x5b16d2[_0x148e54(0x382)](/(.*):(.*)/i)){const _0x2d981c=String(RegExp['$1']),_0x58ebe7=String(RegExp['$2'])['toUpperCase']()[_0x148e54(0x1a5)]();let _0x11f82b,_0x54cc19,_0x2ccac0;switch(_0x58ebe7){case _0x148e54(0x3cb):_0x11f82b=_0x40a7e7[_0x5b16d2]!==''?Number(_0x40a7e7[_0x5b16d2]):0x0;break;case _0x148e54(0x392):_0x54cc19=_0x40a7e7[_0x5b16d2]!==''?JSON[_0x148e54(0xf9)](_0x40a7e7[_0x5b16d2]):[],_0x11f82b=_0x54cc19['map'](_0x2db81a=>Number(_0x2db81a));break;case _0x148e54(0x1a8):_0x11f82b=_0x40a7e7[_0x5b16d2]!==''?eval(_0x40a7e7[_0x5b16d2]):null;break;case _0x148e54(0x349):_0x54cc19=_0x40a7e7[_0x5b16d2]!==''?JSON[_0x148e54(0xf9)](_0x40a7e7[_0x5b16d2]):[],_0x11f82b=_0x54cc19['map'](_0x2cf5ed=>eval(_0x2cf5ed));break;case'JSON':_0x11f82b=_0x40a7e7[_0x5b16d2]!==''?JSON['parse'](_0x40a7e7[_0x5b16d2]):'';break;case'ARRAYJSON':_0x54cc19=_0x40a7e7[_0x5b16d2]!==''?JSON[_0x148e54(0xf9)](_0x40a7e7[_0x5b16d2]):[],_0x11f82b=_0x54cc19['map'](_0x3bb602=>JSON[_0x148e54(0xf9)](_0x3bb602));break;case _0x148e54(0xf7):_0x11f82b=_0x40a7e7[_0x5b16d2]!==''?new Function(JSON[_0x148e54(0xf9)](_0x40a7e7[_0x5b16d2])):new Function('return\x200');break;case _0x148e54(0x37b):_0x54cc19=_0x40a7e7[_0x5b16d2]!==''?JSON['parse'](_0x40a7e7[_0x5b16d2]):[],_0x11f82b=_0x54cc19[_0x148e54(0x3ae)](_0x449d35=>new Function(JSON[_0x148e54(0xf9)](_0x449d35)));break;case _0x148e54(0x356):_0x11f82b=_0x40a7e7[_0x5b16d2]!==''?String(_0x40a7e7[_0x5b16d2]):'';break;case'ARRAYSTR':_0x54cc19=_0x40a7e7[_0x5b16d2]!==''?JSON['parse'](_0x40a7e7[_0x5b16d2]):[],_0x11f82b=_0x54cc19[_0x148e54(0x3ae)](_0x31b108=>String(_0x31b108));break;case _0x148e54(0x27c):_0x2ccac0=_0x40a7e7[_0x5b16d2]!==''?JSON['parse'](_0x40a7e7[_0x5b16d2]):{},_0x67b933[_0x2d981c]={},VisuMZ[_0x148e54(0x25a)](_0x67b933[_0x2d981c],_0x2ccac0);continue;case _0x148e54(0x36f):_0x54cc19=_0x40a7e7[_0x5b16d2]!==''?JSON[_0x148e54(0xf9)](_0x40a7e7[_0x5b16d2]):[],_0x11f82b=_0x54cc19[_0x148e54(0x3ae)](_0x574e88=>VisuMZ[_0x148e54(0x25a)]({},JSON['parse'](_0x574e88)));break;default:continue;}_0x67b933[_0x2d981c]=_0x11f82b;}}return _0x67b933;},(_0x43e9f5=>{const _0x1bb9d8=_0x56eb94,_0x55c0af=_0x43e9f5['name'];for(const _0x36bb6a of dependencies){if(!Imported[_0x36bb6a]){alert(_0x1bb9d8(0x3a0)[_0x1bb9d8(0x3bd)](_0x55c0af,_0x36bb6a)),SceneManager[_0x1bb9d8(0x25d)]();break;}}const _0x3ea498=_0x43e9f5['description'];if(_0x3ea498[_0x1bb9d8(0x382)](/\[Version[ ](.*?)\]/i)){const _0x168c85=Number(RegExp['$1']);_0x168c85!==VisuMZ[label][_0x1bb9d8(0x25b)]&&(alert(_0x1bb9d8(0xaa)[_0x1bb9d8(0x3bd)](_0x55c0af,_0x168c85)),SceneManager[_0x1bb9d8(0x25d)]());}if(_0x3ea498[_0x1bb9d8(0x382)](/\[Tier[ ](\d+)\]/i)){const _0x4b8efe=Number(RegExp['$1']);_0x4b8efe<tier?(alert(_0x1bb9d8(0x2a6)[_0x1bb9d8(0x3bd)](_0x55c0af,_0x4b8efe,tier)),SceneManager[_0x1bb9d8(0x25d)]()):tier=Math[_0x1bb9d8(0xce)](_0x4b8efe,tier);}VisuMZ[_0x1bb9d8(0x25a)](VisuMZ[label][_0x1bb9d8(0x1a2)],_0x43e9f5[_0x1bb9d8(0x2b0)]);})(pluginData),PluginManager[_0x56eb94(0x290)](pluginData[_0x56eb94(0x2ed)],_0x56eb94(0x3c9),_0x23c9a0=>{const _0x3a527c=_0x56eb94;VisuMZ[_0x3a527c(0x25a)](_0x23c9a0,_0x23c9a0);const _0x12d4c3=_0x23c9a0[_0x3a527c(0x104)]['map'](_0x1fee2e=>$gameActors['actor'](_0x1fee2e)),_0x64482f=_0x23c9a0['Slots']['map'](_0x15c286=>$dataSystem[_0x3a527c(0x328)][_0x3a527c(0x32a)](_0x15c286['trim']()));for(const _0x24f297 of _0x12d4c3){if(!_0x24f297)continue;_0x24f297[_0x3a527c(0xa3)](_0x64482f);}}),PluginManager[_0x56eb94(0x290)](pluginData[_0x56eb94(0x2ed)],_0x56eb94(0x300),_0x1cf04e=>{const _0x535281=_0x56eb94;VisuMZ[_0x535281(0x25a)](_0x1cf04e,_0x1cf04e);const _0xeb036a=_0x1cf04e[_0x535281(0x104)][_0x535281(0x3ae)](_0x3af50a=>$gameActors[_0x535281(0x207)](_0x3af50a));for(const _0x3d5c2d of _0xeb036a){if(!_0x3d5c2d)continue;_0x3d5c2d[_0x535281(0x12e)]();}}),PluginManager[_0x56eb94(0x290)](pluginData[_0x56eb94(0x2ed)],_0x56eb94(0xe9),_0x485549=>{const _0x5ad8fb=_0x56eb94;VisuMZ['ConvertParams'](_0x485549,_0x485549);const _0x3c6a6e=[],_0x5dbf89=_0x485549[_0x5ad8fb(0xda)]['map'](_0x59edf7=>_0x59edf7['toUpperCase']()[_0x5ad8fb(0x1a5)]()),_0x13dedc=_0x485549[_0x5ad8fb(0x15d)][_0x5ad8fb(0x3ae)](_0x1a0a68=>_0x1a0a68[_0x5ad8fb(0x3c7)]()[_0x5ad8fb(0x1a5)]()),_0x200961=_0x485549['Step1End']>=_0x485549[_0x5ad8fb(0x2bc)]?_0x485549[_0x5ad8fb(0x2bc)]:_0x485549[_0x5ad8fb(0x238)],_0x17b316=_0x485549['Step1End']>=_0x485549[_0x5ad8fb(0x2bc)]?_0x485549[_0x5ad8fb(0x238)]:_0x485549['Step1Start'],_0x37309b=Array(_0x17b316-_0x200961+0x1)[_0x5ad8fb(0x1e5)]()[_0x5ad8fb(0x3ae)]((_0xedc999,_0x47091e)=>_0x200961+_0x47091e);for(const _0x4a6e3f of _0x37309b){const _0x286a97=$dataItems[_0x4a6e3f];if(!_0x286a97)continue;if(!VisuMZ[_0x5ad8fb(0x91)][_0x5ad8fb(0x30b)](_0x286a97,_0x5dbf89,_0x13dedc))continue;_0x3c6a6e['push']([0x0,_0x4a6e3f,0x0,_0x286a97[_0x5ad8fb(0x28d)]]);}const _0x1cc61a=_0x485549[_0x5ad8fb(0x115)]>=_0x485549[_0x5ad8fb(0x308)]?_0x485549[_0x5ad8fb(0x308)]:_0x485549[_0x5ad8fb(0x115)],_0x57c5ce=_0x485549[_0x5ad8fb(0x115)]>=_0x485549[_0x5ad8fb(0x308)]?_0x485549[_0x5ad8fb(0x115)]:_0x485549[_0x5ad8fb(0x308)],_0x51e714=Array(_0x57c5ce-_0x1cc61a+0x1)[_0x5ad8fb(0x1e5)]()[_0x5ad8fb(0x3ae)]((_0x45d82c,_0x31b648)=>_0x1cc61a+_0x31b648);for(const _0xf73fae of _0x51e714){const _0x181451=$dataWeapons[_0xf73fae];if(!_0x181451)continue;if(!VisuMZ[_0x5ad8fb(0x91)][_0x5ad8fb(0x30b)](_0x181451,_0x5dbf89,_0x13dedc))continue;_0x3c6a6e[_0x5ad8fb(0x259)]([0x1,_0xf73fae,0x0,_0x181451[_0x5ad8fb(0x28d)]]);}const _0x148b62=_0x485549[_0x5ad8fb(0x3a4)]>=_0x485549[_0x5ad8fb(0x103)]?_0x485549['Step3Start']:_0x485549[_0x5ad8fb(0x3a4)],_0x83196e=_0x485549[_0x5ad8fb(0x3a4)]>=_0x485549['Step3Start']?_0x485549[_0x5ad8fb(0x3a4)]:_0x485549[_0x5ad8fb(0x103)],_0x279bae=Array(_0x83196e-_0x148b62+0x1)['fill']()[_0x5ad8fb(0x3ae)]((_0x29b064,_0x3d4cc6)=>_0x148b62+_0x3d4cc6);for(const _0x464b2d of _0x279bae){const _0x5b337a=$dataArmors[_0x464b2d];if(!_0x5b337a)continue;if(!VisuMZ['ItemsEquipsCore'][_0x5ad8fb(0x30b)](_0x5b337a,_0x5dbf89,_0x13dedc))continue;_0x3c6a6e['push']([0x2,_0x464b2d,0x0,_0x5b337a[_0x5ad8fb(0x28d)]]);}SceneManager[_0x5ad8fb(0x259)](Scene_Shop),SceneManager[_0x5ad8fb(0x384)](_0x3c6a6e,_0x485549[_0x5ad8fb(0x37d)]);}),VisuMZ[_0x56eb94(0x91)]['IncludeShopItem']=function(_0x1734a6,_0xa160d5,_0x5b7fb5){const _0x3b24e9=_0x56eb94;if(_0x1734a6[_0x3b24e9(0x2ed)]['trim']()==='')return![];if(_0x1734a6[_0x3b24e9(0x2ed)][_0x3b24e9(0x382)](/-----/i))return![];const _0x3728ed=_0x1734a6[_0x3b24e9(0x29a)];if(_0xa160d5[_0x3b24e9(0x25c)]>0x0)for(const _0xcee60e of _0xa160d5){if(!_0xcee60e)continue;if(_0x3728ed[_0x3b24e9(0x106)](_0xcee60e))return![];}if(_0x5b7fb5[_0x3b24e9(0x25c)]>0x0){for(const _0x41483a of _0x5b7fb5){if(!_0x41483a)continue;if(_0x3728ed['includes'](_0x41483a))return!![];}return![];}return!![];},VisuMZ['ItemsEquipsCore'][_0x56eb94(0xc9)]=Scene_Boot[_0x56eb94(0x175)][_0x56eb94(0x208)],Scene_Boot[_0x56eb94(0x175)]['onDatabaseLoaded']=function(){const _0xd38e89=_0x56eb94;this[_0xd38e89(0x38d)](),VisuMZ[_0xd38e89(0x91)][_0xd38e89(0xc9)]['call'](this),this[_0xd38e89(0x360)]();},Scene_Boot[_0x56eb94(0x175)][_0x56eb94(0x38d)]=function(){const _0x46222e=_0x56eb94;VisuMZ[_0x46222e(0x91)][_0x46222e(0x1b7)]={},VisuMZ[_0x46222e(0x91)][_0x46222e(0x1b7)]['EquipParams']=[],VisuMZ[_0x46222e(0x91)][_0x46222e(0x1b7)][_0x46222e(0x3af)]=[];const _0x53abaf=[_0x46222e(0x307),_0x46222e(0x1eb),_0x46222e(0x142),_0x46222e(0x2b1),_0x46222e(0x397),_0x46222e(0x24b),_0x46222e(0x1dd),_0x46222e(0x129)];for(const _0x50afea of _0x53abaf){const _0x54b446=_0x46222e(0x2e6)[_0x46222e(0x3bd)](_0x50afea);VisuMZ[_0x46222e(0x91)][_0x46222e(0x1b7)][_0x46222e(0x177)][_0x46222e(0x259)](new RegExp(_0x54b446,'i'));const _0x2cb78c=_0x46222e(0x1d9)[_0x46222e(0x3bd)](_0x50afea);VisuMZ['ItemsEquipsCore'][_0x46222e(0x1b7)]['BorderRegExp'][_0x46222e(0x259)](new RegExp(_0x2cb78c,'g'));}},Scene_Boot['prototype'][_0x56eb94(0x360)]=function(){const _0x5c6933=_0x56eb94;if(VisuMZ[_0x5c6933(0x3ab)])return;this[_0x5c6933(0x2e2)]();const _0x3a955a=[$dataItems,$dataWeapons,$dataArmors];for(const _0x475c3b of _0x3a955a){for(const _0x775b8d of _0x475c3b){if(!_0x775b8d)continue;VisuMZ[_0x5c6933(0x91)]['Parse_Notetags_Category'](_0x775b8d,_0x475c3b),VisuMZ[_0x5c6933(0x91)]['Parse_Notetags_Prices'](_0x775b8d,_0x475c3b),VisuMZ['ItemsEquipsCore']['Parse_Notetags_ParamValues'](_0x775b8d,_0x475c3b),VisuMZ[_0x5c6933(0x91)][_0x5c6933(0x36e)](_0x775b8d,_0x475c3b),VisuMZ['ItemsEquipsCore']['Parse_Notetags_EnableJS'](_0x775b8d,_0x475c3b);}}},Scene_Boot['prototype'][_0x56eb94(0x2e2)]=function(){const _0x3fc338=_0x56eb94;for(const _0x573b6e of $dataClasses){if(!_0x573b6e)continue;VisuMZ[_0x3fc338(0x91)][_0x3fc338(0x151)](_0x573b6e);}},VisuMZ['ItemsEquipsCore'][_0x56eb94(0x1fa)]=VisuMZ[_0x56eb94(0x1fa)],VisuMZ[_0x56eb94(0x1fa)]=function(_0x1665fe){const _0x25cb4a=_0x56eb94;VisuMZ['ItemsEquipsCore']['ParseClassNotetags'][_0x25cb4a(0xff)](this,_0x1665fe),VisuMZ[_0x25cb4a(0x91)][_0x25cb4a(0x151)](_0x1665fe);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x3b1)]=VisuMZ[_0x56eb94(0x3b1)],VisuMZ['ParseItemNotetags']=function(_0x3f2201){const _0x538522=_0x56eb94;VisuMZ[_0x538522(0x91)][_0x538522(0x3b1)][_0x538522(0xff)](this,_0x3f2201),VisuMZ[_0x538522(0x91)][_0x538522(0x3a1)](_0x3f2201,$dataItems);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x122)]=VisuMZ[_0x56eb94(0x122)],VisuMZ['ParseWeaponNotetags']=function(_0x228ba3){const _0x45ca88=_0x56eb94;VisuMZ['ItemsEquipsCore']['ParseWeaponNotetags']['call'](this,_0x228ba3),VisuMZ[_0x45ca88(0x91)][_0x45ca88(0x3a1)](_0x228ba3,$dataWeapons);},VisuMZ[_0x56eb94(0x91)]['ParseArmorNotetags']=VisuMZ[_0x56eb94(0x2a1)],VisuMZ['ParseArmorNotetags']=function(_0x549f21){const _0xea2a7c=_0x56eb94;VisuMZ[_0xea2a7c(0x91)][_0xea2a7c(0x2a1)][_0xea2a7c(0xff)](this,_0x549f21),VisuMZ[_0xea2a7c(0x91)]['Parse_Notetags_Batch'](_0x549f21,$dataArmors);},VisuMZ[_0x56eb94(0x91)]['Parse_Notetags_EquipSlots']=function(_0x35e0a3){const _0x50a387=_0x56eb94;_0x35e0a3[_0x50a387(0x341)]=[];if(_0x35e0a3[_0x50a387(0x278)][_0x50a387(0x382)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x1e3219=String(RegExp['$1'])[_0x50a387(0x289)](/[\r\n]+/);for(const _0x38eeb5 of _0x1e3219){const _0x49f5e1=$dataSystem['equipTypes'][_0x50a387(0x32a)](_0x38eeb5['trim']());if(_0x49f5e1>0x0)_0x35e0a3[_0x50a387(0x341)][_0x50a387(0x259)](_0x49f5e1);}}else for(const _0x144271 of $dataSystem[_0x50a387(0x328)]){const _0x2cfc96=$dataSystem[_0x50a387(0x328)][_0x50a387(0x32a)](_0x144271[_0x50a387(0x1a5)]());if(_0x2cfc96>0x0)_0x35e0a3[_0x50a387(0x341)][_0x50a387(0x259)](_0x2cfc96);}},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x3a1)]=function(_0xb8e23a,_0x4c1dd0){const _0x12738e=_0x56eb94;VisuMZ[_0x12738e(0x91)][_0x12738e(0x112)](_0xb8e23a,_0x4c1dd0),VisuMZ[_0x12738e(0x91)][_0x12738e(0x387)](_0xb8e23a,_0x4c1dd0),VisuMZ[_0x12738e(0x91)]['Parse_Notetags_ParamValues'](_0xb8e23a,_0x4c1dd0),VisuMZ[_0x12738e(0x91)][_0x12738e(0x36e)](_0xb8e23a,_0x4c1dd0),VisuMZ[_0x12738e(0x91)]['Parse_Notetags_EnableJS'](_0xb8e23a,_0x4c1dd0);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x112)]=function(_0x33348d,_0xe09cd1){const _0x284473=_0x56eb94;_0x33348d['categories']=[];const _0x533c8d=_0x33348d[_0x284473(0x278)],_0x3b1819=_0x533c8d[_0x284473(0x382)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x3b1819)for(const _0x63baf4 of _0x3b1819){_0x63baf4['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x2f626d=String(RegExp['$1'])[_0x284473(0x3c7)]()['trim']()[_0x284473(0x289)](',');for(const _0x41ec77 of _0x2f626d){_0x33348d[_0x284473(0x29a)][_0x284473(0x259)](_0x41ec77[_0x284473(0x1a5)]());}}if(_0x533c8d[_0x284473(0x382)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x3f99d0=RegExp['$1'][_0x284473(0x289)](/[\r\n]+/);for(const _0x57258e of _0x3f99d0){_0x33348d[_0x284473(0x29a)]['push'](_0x57258e[_0x284473(0x3c7)]()['trim']());}}},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x387)]=function(_0x32d074,_0xd994b6){const _0x7d107b=_0x56eb94;_0x32d074['note'][_0x7d107b(0x382)](/<PRICE:[ ](\d+)>/i)&&(_0x32d074[_0x7d107b(0x28d)]=Number(RegExp['$1']));},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x13c)]=function(_0x38e7b5,_0x1885f7){const _0x25f85f=_0x56eb94;if(_0x1885f7===$dataItems)return;for(let _0x1c3469=0x0;_0x1c3469<0x8;_0x1c3469++){const _0x24b33b=VisuMZ[_0x25f85f(0x91)][_0x25f85f(0x1b7)]['EquipParams'][_0x1c3469];_0x38e7b5['note'][_0x25f85f(0x382)](_0x24b33b)&&(_0x38e7b5[_0x25f85f(0x1d4)][_0x1c3469]=parseInt(RegExp['$1']));}},VisuMZ['ItemsEquipsCore']['paramJS']={},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x36e)]=function(_0x5b81c6,_0x38b93f){const _0x48941c=_0x56eb94;if(_0x38b93f===$dataItems)return;if(_0x5b81c6[_0x48941c(0x278)][_0x48941c(0x382)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x369de4=String(RegExp['$1']),_0x1d22c1=(_0x38b93f===$dataWeapons?_0x48941c(0x1ee):'A%1')[_0x48941c(0x3bd)](_0x5b81c6['id']),_0x5211c7=_0x48941c(0x179)['format'](_0x369de4);for(let _0x39b2b1=0x0;_0x39b2b1<0x8;_0x39b2b1++){if(_0x369de4['match'](VisuMZ[_0x48941c(0x91)][_0x48941c(0x1b7)][_0x48941c(0x3af)][_0x39b2b1])){const _0x350db3=_0x48941c(0x14c)['format'](_0x1d22c1,_0x39b2b1);VisuMZ[_0x48941c(0x91)][_0x48941c(0xd3)][_0x350db3]=new Function(_0x48941c(0x1ae),_0x48941c(0x136),_0x5211c7);}}}},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x10f)]={},VisuMZ['ItemsEquipsCore'][_0x56eb94(0x371)]=function(_0x1d4b84,_0x781552){const _0x5836ba=_0x56eb94;if(_0x781552!==$dataItems)return;if(_0x1d4b84[_0x5836ba(0x278)][_0x5836ba(0x382)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x4d8979=String(RegExp['$1']),_0x18ab41=_0x5836ba(0x166)[_0x5836ba(0x3bd)](_0x4d8979);VisuMZ[_0x5836ba(0x91)][_0x5836ba(0x10f)][_0x1d4b84['id']]=new Function('item',_0x18ab41);}},DataManager['isKeyItem']=function(_0x16ed34){const _0x2d610d=_0x56eb94;return this[_0x2d610d(0x99)](_0x16ed34)&&_0x16ed34['itypeId']===0x2;},DataManager[_0x56eb94(0x383)]=function(_0x32a871){const _0x1fa1be=_0x56eb94;if(!_0x32a871)return 0x63;else return _0x32a871[_0x1fa1be(0x278)][_0x1fa1be(0x382)](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this[_0x1fa1be(0x141)](_0x32a871);},DataManager[_0x56eb94(0x141)]=function(_0x478ed3){const _0x37cec5=_0x56eb94;if(this[_0x37cec5(0x99)](_0x478ed3))return VisuMZ[_0x37cec5(0x91)]['Settings']['ItemScene'][_0x37cec5(0x1af)];else{if(this[_0x37cec5(0x1b4)](_0x478ed3))return VisuMZ[_0x37cec5(0x91)]['Settings'][_0x37cec5(0xef)][_0x37cec5(0x291)];else{if(this[_0x37cec5(0xb7)](_0x478ed3))return VisuMZ[_0x37cec5(0x91)][_0x37cec5(0x1a2)][_0x37cec5(0xef)][_0x37cec5(0x1bd)];}}},ColorManager[_0x56eb94(0x23f)]=function(_0x45b329){const _0x23f736=_0x56eb94;if(!_0x45b329)return this[_0x23f736(0x8f)]();else{if(_0x45b329[_0x23f736(0x278)][_0x23f736(0x382)](/<COLOR:[ ](\d+)>/i))return this['textColor'](Number(RegExp['$1'])[_0x23f736(0x1a9)](0x0,0x1f));else return _0x45b329[_0x23f736(0x278)][_0x23f736(0x382)](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this[_0x23f736(0x8f)]();}},ColorManager[_0x56eb94(0x26b)]=function(_0x9e9ce4){const _0xc713=_0x56eb94;return _0x9e9ce4=String(_0x9e9ce4),_0x9e9ce4[_0xc713(0x382)](/#(.*)/i)?_0xc713(0x1c9)[_0xc713(0x3bd)](String(RegExp['$1'])):this[_0xc713(0x3cf)](Number(_0x9e9ce4));},Game_Temp[_0x56eb94(0x175)]['newLabelEnabled']=function(){const _0x1018ff=_0x56eb94;if(this[_0x1018ff(0x2ca)])return![];return VisuMZ[_0x1018ff(0x91)]['Settings'][_0x1018ff(0x32d)]['Enable'];},VisuMZ['ShopMenuStatusStandard']=VisuMZ[_0x56eb94(0x91)]['Settings'][_0x56eb94(0x2b6)]['MultiplierStandard'],VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x181)]=Game_BattlerBase[_0x56eb94(0x175)][_0x56eb94(0xfc)],Game_BattlerBase['prototype'][_0x56eb94(0xfc)]=function(_0xfe129d){const _0x102de2=_0x56eb94;return this['_shopStatusMenuMode']?this[_0x102de2(0x1ab)]?VisuMZ[_0x102de2(0x150)]:0x1:VisuMZ[_0x102de2(0x91)][_0x102de2(0x181)]['call'](this,_0xfe129d);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x1f6)]=Game_BattlerBase['prototype'][_0x56eb94(0x15b)],Game_BattlerBase[_0x56eb94(0x175)][_0x56eb94(0x15b)]=function(_0x496d93){const _0x22634a=_0x56eb94;if(!_0x496d93)return![];if(!VisuMZ[_0x22634a(0x91)][_0x22634a(0x1f6)][_0x22634a(0xff)](this,_0x496d93))return![];if(!this[_0x22634a(0xd9)](_0x496d93))return![];if(!this[_0x22634a(0x229)](_0x496d93))return![];return!![];},Game_BattlerBase[_0x56eb94(0x175)]['meetsItemConditionsNotetags']=function(_0x5d84ea){if(!this['checkItemConditionsSwitchNotetags'](_0x5d84ea))return![];return!![];},Game_BattlerBase[_0x56eb94(0x175)]['checkItemConditionsSwitchNotetags']=function(_0x5b4436){const _0x42f108=_0x56eb94,_0x5ed6ab=_0x5b4436['note'];if(_0x5ed6ab[_0x42f108(0x382)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x9d7eb9=JSON[_0x42f108(0xf9)]('['+RegExp['$1'][_0x42f108(0x382)](/\d+/g)+']');for(const _0x3163d8 of _0x9d7eb9){if(!$gameSwitches['value'](_0x3163d8))return![];}return!![];}if(_0x5ed6ab[_0x42f108(0x382)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x9b7d0e=JSON[_0x42f108(0xf9)]('['+RegExp['$1'][_0x42f108(0x382)](/\d+/g)+']');for(const _0x4cdbc6 of _0x9b7d0e){if(!$gameSwitches[_0x42f108(0x17c)](_0x4cdbc6))return![];}return!![];}if(_0x5ed6ab[_0x42f108(0x382)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x27f465=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x29b5f1 of _0x27f465){if($gameSwitches[_0x42f108(0x17c)](_0x29b5f1))return!![];}return![];}if(_0x5ed6ab[_0x42f108(0x382)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x810518=JSON[_0x42f108(0xf9)]('['+RegExp['$1'][_0x42f108(0x382)](/\d+/g)+']');for(const _0x3e5387 of _0x810518){if(!$gameSwitches[_0x42f108(0x17c)](_0x3e5387))return!![];}return![];}if(_0x5ed6ab[_0x42f108(0x382)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5e6985=JSON['parse']('['+RegExp['$1'][_0x42f108(0x382)](/\d+/g)+']');for(const _0x23089f of _0x5e6985){if(!$gameSwitches[_0x42f108(0x17c)](_0x23089f))return!![];}return![];}if(_0x5ed6ab['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32b549=JSON[_0x42f108(0xf9)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2a5b60 of _0x32b549){if($gameSwitches['value'](_0x2a5b60))return![];}return!![];}return!![];},Game_BattlerBase[_0x56eb94(0x175)][_0x56eb94(0x229)]=function(_0x340784){const _0xfcc73=_0x56eb94,_0x459afc=_0x340784[_0xfcc73(0x278)],_0x5ee43d=VisuMZ[_0xfcc73(0x91)][_0xfcc73(0x10f)];return _0x5ee43d[_0x340784['id']]?_0x5ee43d[_0x340784['id']][_0xfcc73(0xff)](this,_0x340784):!![];},Game_Actor[_0x56eb94(0x175)]['initEquips']=function(_0x377434){const _0x47fb5c=_0x56eb94;_0x377434=this['convertInitEquipsToItems'](_0x377434);const _0x3a0c79=this[_0x47fb5c(0x341)]();this[_0x47fb5c(0xdc)]=[];for(let _0x1a8ec7=0x0;_0x1a8ec7<_0x3a0c79[_0x47fb5c(0x25c)];_0x1a8ec7++){this['_equips'][_0x1a8ec7]=new Game_Item();}for(let _0x3afad3=0x0;_0x3afad3<_0x3a0c79[_0x47fb5c(0x25c)];_0x3afad3++){const _0x14b7fa=_0x3a0c79[_0x3afad3],_0x580dbc=this[_0x47fb5c(0x269)](_0x377434,_0x14b7fa);if(this['canEquip'](_0x580dbc))this[_0x47fb5c(0xdc)][_0x3afad3][_0x47fb5c(0x109)](_0x580dbc);}this['releaseUnequippableItems'](!![]),this[_0x47fb5c(0x1e0)]();},Game_Actor[_0x56eb94(0x175)][_0x56eb94(0xd6)]=function(_0x481ed6){const _0x1a62e5=_0x56eb94,_0x20a106=[];for(let _0x524105=0x0;_0x524105<_0x481ed6[_0x1a62e5(0x25c)];_0x524105++){const _0xcde579=_0x481ed6[_0x524105];if(_0xcde579<=0x0)continue;const _0x57961e=$dataSystem[_0x1a62e5(0x328)][_0x524105+0x1];_0x57961e===$dataSystem[_0x1a62e5(0x328)][0x1]||_0x524105===0x1&&this[_0x1a62e5(0xf4)]()?_0x20a106[_0x1a62e5(0x259)]($dataWeapons[_0xcde579]):_0x20a106[_0x1a62e5(0x259)]($dataArmors[_0xcde579]);}return _0x20a106;},Game_Actor['prototype'][_0x56eb94(0x269)]=function(_0x430b8d,_0x473cdd){const _0x4d490a=_0x56eb94;for(const _0xa66f92 of _0x430b8d){if(!_0xa66f92)continue;if(_0xa66f92[_0x4d490a(0x339)]===_0x473cdd)return _0x430b8d[_0x4d490a(0xf3)](_0x430b8d['indexOf'](_0xa66f92),0x1),_0xa66f92;}return null;},Game_Actor[_0x56eb94(0x175)]['equipSlots']=function(){const _0x37c0ea=_0x56eb94,_0x564212=JsonEx[_0x37c0ea(0xa6)](this[_0x37c0ea(0x1a7)]||this[_0x37c0ea(0x19c)]()[_0x37c0ea(0x341)]);if(_0x564212[_0x37c0ea(0x25c)]>=0x2&&this['isDualWield']())_0x564212[0x1]=0x1;return _0x564212;},Game_Actor[_0x56eb94(0x175)]['forceChangeEquipSlots']=function(_0x5420f3){const _0x468496=_0x56eb94;_0x5420f3['remove'](0x0),_0x5420f3[_0x468496(0x33f)](-0x1),this[_0x468496(0x1a7)]=_0x5420f3,this['refresh']();},Game_Actor[_0x56eb94(0x175)][_0x56eb94(0x12e)]=function(){const _0x33f734=_0x56eb94;this[_0x33f734(0x1a7)]=undefined,this['refresh']();},Game_Actor[_0x56eb94(0x175)][_0x56eb94(0x249)]=function(){const _0x6131c2=_0x56eb94,_0xbd5afb=this[_0x6131c2(0x341)]();for(let _0x1ea12b=0x0;_0x1ea12b<_0xbd5afb[_0x6131c2(0x25c)];_0x1ea12b++){if(!this['_equips'][_0x1ea12b])this[_0x6131c2(0xdc)][_0x1ea12b]=new Game_Item();}this[_0x6131c2(0xfb)](![]),this[_0x6131c2(0x1e0)]();},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x9b)]=Game_Actor[_0x56eb94(0x175)]['changeEquip'],Game_Actor[_0x56eb94(0x175)][_0x56eb94(0x332)]=function(_0x31c8d4,_0x5ce3db){const _0x30eb7f=_0x56eb94;if(!this[_0x30eb7f(0x330)]){const _0x15c9af=JsonEx[_0x30eb7f(0xa6)](this);_0x15c9af[_0x30eb7f(0x330)]=!![],VisuMZ[_0x30eb7f(0x91)][_0x30eb7f(0x9b)][_0x30eb7f(0xff)](this,_0x31c8d4,_0x5ce3db),this[_0x30eb7f(0xe0)](_0x15c9af);}else VisuMZ[_0x30eb7f(0x91)][_0x30eb7f(0x9b)][_0x30eb7f(0xff)](this,_0x31c8d4,_0x5ce3db);},VisuMZ[_0x56eb94(0x91)]['Game_Actor_forceChangeEquip']=Game_Actor['prototype'][_0x56eb94(0x22f)],Game_Actor['prototype'][_0x56eb94(0x22f)]=function(_0x305528,_0x32d23e){const _0x3eabb0=_0x56eb94;if(!this[_0x3eabb0(0x330)]){const _0x4897b2=JsonEx[_0x3eabb0(0xa6)](this);_0x4897b2['_tempActor']=!![],VisuMZ[_0x3eabb0(0x91)][_0x3eabb0(0x20a)][_0x3eabb0(0xff)](this,_0x305528,_0x32d23e),this[_0x3eabb0(0xe0)](_0x4897b2);}else VisuMZ[_0x3eabb0(0x91)][_0x3eabb0(0x20a)][_0x3eabb0(0xff)](this,_0x305528,_0x32d23e);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0xba)]=Game_Actor['prototype'][_0x56eb94(0x12d)],Game_Actor[_0x56eb94(0x175)][_0x56eb94(0x12d)]=function(_0x434efc){const _0x46bb96=_0x56eb94;if(!this[_0x46bb96(0x330)]){const _0xaba032=JsonEx[_0x46bb96(0xa6)](this);_0xaba032[_0x46bb96(0x330)]=!![],VisuMZ[_0x46bb96(0x91)][_0x46bb96(0xba)][_0x46bb96(0xff)](this,_0x434efc),this['equipAdjustHpMp'](_0xaba032);}else VisuMZ[_0x46bb96(0x91)][_0x46bb96(0xba)][_0x46bb96(0xff)](this,_0x434efc);},Game_Actor[_0x56eb94(0x175)]['releaseUnequippableItems']=function(_0x2e02fa){const _0x258b43=_0x56eb94;for(;;){const _0x24d4f2=this[_0x258b43(0x341)](),_0x3a864e=this[_0x258b43(0xcd)]();let _0x52e87b=![];for(let _0x1d86c8=0x0;_0x1d86c8<_0x3a864e[_0x258b43(0x25c)];_0x1d86c8++){const _0x1f0375=_0x3a864e[_0x1d86c8];if(_0x1f0375&&(!this[_0x258b43(0x9e)](_0x1f0375)||_0x1f0375[_0x258b43(0x339)]!==_0x24d4f2[_0x1d86c8])){!_0x2e02fa&&this[_0x258b43(0x296)](null,_0x1f0375);if(!this['_tempActor']){const _0x4840b3=JsonEx['makeDeepCopy'](this);_0x4840b3[_0x258b43(0x330)]=!![],this['_equips'][_0x1d86c8][_0x258b43(0x109)](null),this[_0x258b43(0xe0)](_0x4840b3);}else this['_equips'][_0x1d86c8]['setObject'](null);_0x52e87b=!![];}}if(!_0x52e87b)break;}},Game_Actor[_0x56eb94(0x175)][_0x56eb94(0xe0)]=function(_0x462e72){const _0x15f90f=_0x56eb94;if(this[_0x15f90f(0x330)])return;if(!VisuMZ[_0x15f90f(0x91)][_0x15f90f(0x1a2)][_0x15f90f(0x15c)]['EquipAdjustHpMp'])return;const _0xc843ee=Math['round'](_0x462e72[_0x15f90f(0x187)]()*this[_0x15f90f(0x127)]),_0x3d11e3=Math['round'](_0x462e72[_0x15f90f(0x33d)]()*this[_0x15f90f(0x325)]);if(this['hp']>0x0)this[_0x15f90f(0x1d5)](_0xc843ee);if(this['mp']>0x0)this[_0x15f90f(0x354)](_0x3d11e3);},Game_Actor[_0x56eb94(0x175)]['clearEquipments']=function(){const _0x275a07=_0x56eb94,_0xa549ef=this[_0x275a07(0x341)]()[_0x275a07(0x25c)];for(let _0x4c8ae3=0x0;_0x4c8ae3<_0xa549ef;_0x4c8ae3++){if(this[_0x275a07(0x3d0)](_0x4c8ae3))this[_0x275a07(0x332)](_0x4c8ae3,null);}},Game_Actor[_0x56eb94(0x175)][_0x56eb94(0x3d0)]=function(_0x4a4cd5){const _0x33dd70=_0x56eb94;return this[_0x33dd70(0x20e)]()[_0x33dd70(0x106)](this[_0x33dd70(0x341)]()[_0x4a4cd5])?![]:this[_0x33dd70(0x3cc)](_0x4a4cd5);},Game_Actor[_0x56eb94(0x175)][_0x56eb94(0x20e)]=function(){const _0x2cf484=_0x56eb94;return VisuMZ[_0x2cf484(0x91)][_0x2cf484(0x1a2)]['EquipScene'][_0x2cf484(0xb5)];},Game_Actor[_0x56eb94(0x175)][_0x56eb94(0x3ca)]=function(){const _0x4296a5=_0x56eb94,_0x3ba6ff=this[_0x4296a5(0x341)]()[_0x4296a5(0x25c)];for(let _0x4701ac=0x0;_0x4701ac<_0x3ba6ff;_0x4701ac++){if(this[_0x4296a5(0x157)](_0x4701ac))this[_0x4296a5(0x332)](_0x4701ac,null);}for(let _0x32036d=0x0;_0x32036d<_0x3ba6ff;_0x32036d++){if(this['isOptimizeEquipOk'](_0x32036d))this[_0x4296a5(0x332)](_0x32036d,this[_0x4296a5(0x389)](_0x32036d));}},Game_Actor['prototype'][_0x56eb94(0x157)]=function(_0x4b1ee7){const _0x4bd94e=_0x56eb94;return this[_0x4bd94e(0x1f8)]()[_0x4bd94e(0x106)](this[_0x4bd94e(0x341)]()[_0x4b1ee7])?![]:this['isEquipChangeOk'](_0x4b1ee7);},Game_Actor[_0x56eb94(0x175)][_0x56eb94(0x1f8)]=function(){const _0x4e7aa6=_0x56eb94;return VisuMZ[_0x4e7aa6(0x91)]['Settings']['EquipScene']['NonOptimizeETypes'];},VisuMZ[_0x56eb94(0x91)]['Game_Actor_tradeItemWithParty']=Game_Actor[_0x56eb94(0x175)]['tradeItemWithParty'],Game_Actor[_0x56eb94(0x175)]['tradeItemWithParty']=function(_0x2746e1,_0x3377b6){const _0x212b00=_0x56eb94;if(this[_0x212b00(0x330)])return![];$gameTemp['_bypassNewLabel']=!![];const _0x161588=VisuMZ[_0x212b00(0x91)][_0x212b00(0x97)]['call'](this,_0x2746e1,_0x3377b6);return $gameTemp['_bypassNewLabel']=![],_0x161588;},Game_Actor['prototype']['changeEquipById']=function(_0x4f01df,_0x1522b0){const _0x132bc0=this['getNextAvailableEtypeId'](_0x4f01df);if(_0x132bc0<0x0)return;const _0x24a2b5=_0x4f01df===0x1?$dataWeapons[_0x1522b0]:$dataArmors[_0x1522b0];this['changeEquip'](_0x132bc0,_0x24a2b5);},Game_Actor[_0x56eb94(0x175)][_0x56eb94(0x204)]=function(_0x475d77){const _0x3584f5=_0x56eb94;let _0x370a4c=0x0;const _0x886106=this['equipSlots'](),_0x58ce5c=this[_0x3584f5(0xcd)]();for(let _0x35520a=0x0;_0x35520a<_0x886106[_0x3584f5(0x25c)];_0x35520a++){if(_0x886106[_0x35520a]===_0x475d77){_0x370a4c=_0x35520a;if(!_0x58ce5c[_0x35520a])return _0x370a4c;}}return _0x370a4c;},VisuMZ['ItemsEquipsCore']['Game_Actor_paramPlus']=Game_Actor[_0x56eb94(0x175)][_0x56eb94(0x16b)],Game_Actor[_0x56eb94(0x175)][_0x56eb94(0x16b)]=function(_0x1bedf3){const _0x27492e=_0x56eb94;let _0x56288b=VisuMZ[_0x27492e(0x91)]['Game_Actor_paramPlus'][_0x27492e(0xff)](this,_0x1bedf3);for(const _0x3ff96e of this[_0x27492e(0xcd)]()){if(_0x3ff96e)_0x56288b+=this[_0x27492e(0xab)](_0x3ff96e,_0x1bedf3);}return _0x56288b;},Game_Actor['prototype'][_0x56eb94(0xab)]=function(_0x1efadd,_0x9af064){const _0x7f13b1=_0x56eb94;if(this[_0x7f13b1(0x18d)])return 0x0;const _0x5b3c23=(DataManager[_0x7f13b1(0x1b4)](_0x1efadd)?_0x7f13b1(0x1ee):_0x7f13b1(0x283))[_0x7f13b1(0x3bd)](_0x1efadd['id']),_0x1bb555=_0x7f13b1(0x14c)[_0x7f13b1(0x3bd)](_0x5b3c23,_0x9af064);if(VisuMZ[_0x7f13b1(0x91)]['paramJS'][_0x1bb555]){this['_calculatingJSParameters']=!![];const _0x4021d5=VisuMZ[_0x7f13b1(0x91)][_0x7f13b1(0xd3)][_0x1bb555][_0x7f13b1(0xff)](this,_0x1efadd,_0x9af064);return this[_0x7f13b1(0x18d)]=![],_0x4021d5;}else return 0x0;},Game_Actor[_0x56eb94(0x175)][_0x56eb94(0x2a7)]=function(_0x323cf9){const _0x312515=_0x56eb94;this[_0x312515(0x123)]=!![],this[_0x312515(0x1ab)]=_0x323cf9;},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x395)]=Game_Party[_0x56eb94(0x175)][_0x56eb94(0x3c0)],Game_Party['prototype'][_0x56eb94(0x3c0)]=function(){const _0x4246a7=_0x56eb94;VisuMZ[_0x4246a7(0x91)][_0x4246a7(0x395)][_0x4246a7(0xff)](this),this['initNewItemsList']();},Game_Party[_0x56eb94(0x175)]['initNewItemsList']=function(){const _0xd6ee0e=_0x56eb94;this[_0xd6ee0e(0x265)]=[];},Game_Party[_0x56eb94(0x175)][_0x56eb94(0x219)]=function(_0x4bd36c){const _0x300162=_0x56eb94;if(!$gameTemp[_0x300162(0x302)]())return![];if(this[_0x300162(0x265)]===undefined)this[_0x300162(0x399)]();let _0x3b4ecd='';if(DataManager[_0x300162(0x99)](_0x4bd36c))_0x3b4ecd='item-%1'[_0x300162(0x3bd)](_0x4bd36c['id']);else{if(DataManager[_0x300162(0x1b4)](_0x4bd36c))_0x3b4ecd=_0x300162(0x2f1)[_0x300162(0x3bd)](_0x4bd36c['id']);else{if(DataManager['isArmor'](_0x4bd36c))_0x3b4ecd=_0x300162(0x294)[_0x300162(0x3bd)](_0x4bd36c['id']);else return;}}return this[_0x300162(0x265)]['includes'](_0x3b4ecd);},Game_Party[_0x56eb94(0x175)][_0x56eb94(0x1d1)]=function(_0x4e4488){const _0x45d4aa=_0x56eb94;if(!$gameTemp[_0x45d4aa(0x302)]())return;if(this['_newItemsList']===undefined)this['initNewItemsList']();let _0xb65962='';if(DataManager[_0x45d4aa(0x99)](_0x4e4488))_0xb65962=_0x45d4aa(0x1e8)['format'](_0x4e4488['id']);else{if(DataManager[_0x45d4aa(0x1b4)](_0x4e4488))_0xb65962=_0x45d4aa(0x2f1)['format'](_0x4e4488['id']);else{if(DataManager[_0x45d4aa(0xb7)](_0x4e4488))_0xb65962='armor-%1'['format'](_0x4e4488['id']);else return;}}if(!this[_0x45d4aa(0x265)][_0x45d4aa(0x106)](_0xb65962))this[_0x45d4aa(0x265)][_0x45d4aa(0x259)](_0xb65962);},Game_Party[_0x56eb94(0x175)]['clearNewItem']=function(_0x3a2845){const _0x3aac11=_0x56eb94;if(!$gameTemp[_0x3aac11(0x302)]())return;if(this[_0x3aac11(0x265)]===undefined)this['initNewItemsList']();let _0x23ae0d='';if(DataManager[_0x3aac11(0x99)](_0x3a2845))_0x23ae0d=_0x3aac11(0x1e8)[_0x3aac11(0x3bd)](_0x3a2845['id']);else{if(DataManager[_0x3aac11(0x1b4)](_0x3a2845))_0x23ae0d=_0x3aac11(0x2f1)[_0x3aac11(0x3bd)](_0x3a2845['id']);else{if(DataManager['isArmor'](_0x3a2845))_0x23ae0d=_0x3aac11(0x294)['format'](_0x3a2845['id']);else return;}}this[_0x3aac11(0x265)]['includes'](_0x23ae0d)&&this['_newItemsList'][_0x3aac11(0xf3)](this[_0x3aac11(0x265)][_0x3aac11(0x32a)](_0x23ae0d),0x1);},VisuMZ[_0x56eb94(0x91)]['Game_Party_gainItem']=Game_Party[_0x56eb94(0x175)]['gainItem'],Game_Party[_0x56eb94(0x175)][_0x56eb94(0xc1)]=function(_0x50055c,_0x41172b,_0x3de80f){const _0x563da4=_0x56eb94,_0x113bf7=this[_0x563da4(0x1e2)](_0x50055c);VisuMZ['ItemsEquipsCore']['Game_Party_gainItem'][_0x563da4(0xff)](this,_0x50055c,_0x41172b,_0x3de80f);if(this[_0x563da4(0x1e2)](_0x50055c)>_0x113bf7)this['setNewItem'](_0x50055c);},Game_Party[_0x56eb94(0x175)][_0x56eb94(0x178)]=function(_0x4b5583){const _0x40c95b=_0x56eb94;return DataManager[_0x40c95b(0x383)](_0x4b5583);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x304)]=Scene_ItemBase['prototype'][_0x56eb94(0x1ec)],Scene_ItemBase[_0x56eb94(0x175)][_0x56eb94(0x1ec)]=function(){const _0x247cc6=_0x56eb94;VisuMZ[_0x247cc6(0x91)][_0x247cc6(0x304)][_0x247cc6(0xff)](this),this['_itemWindow']['callUpdateHelp']();},Scene_Item[_0x56eb94(0x175)]['isBottomHelpMode']=function(){const _0x4e0ae3=_0x56eb94;if(ConfigManager[_0x4e0ae3(0x1bb)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x4e0ae3(0xcc)];else{if(this[_0x4e0ae3(0x1d2)]())return this['updatedLayoutStyle']()[_0x4e0ae3(0x382)](/LOWER/i);else Scene_ItemBase[_0x4e0ae3(0x175)][_0x4e0ae3(0xc6)][_0x4e0ae3(0xff)](this);}},Scene_Item[_0x56eb94(0x175)][_0x56eb94(0xc6)]=function(){const _0x1f4ce8=_0x56eb94;if(ConfigManager[_0x1f4ce8(0x1bb)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x1f4ce8(0x2c3)];else{if(this[_0x1f4ce8(0x1d2)]())return this[_0x1f4ce8(0x23c)]()[_0x1f4ce8(0x382)](/RIGHT/i);else Scene_ItemBase[_0x1f4ce8(0x175)][_0x1f4ce8(0xc6)][_0x1f4ce8(0xff)](this);}},Scene_Item[_0x56eb94(0x175)][_0x56eb94(0x23c)]=function(){const _0x48caa3=_0x56eb94;return VisuMZ[_0x48caa3(0x91)][_0x48caa3(0x1a2)]['ItemScene'][_0x48caa3(0x30f)];},Scene_Item[_0x56eb94(0x175)][_0x56eb94(0x252)]=function(){const _0x13fc0b=_0x56eb94;return this[_0x13fc0b(0x18e)]&&this['_categoryWindow'][_0x13fc0b(0x252)]();},Scene_Item[_0x56eb94(0x175)][_0x56eb94(0x1d2)]=function(){const _0x233d83=_0x56eb94;return VisuMZ[_0x233d83(0x91)]['Settings'][_0x233d83(0xef)]['EnableLayout'];},VisuMZ['ItemsEquipsCore'][_0x56eb94(0x111)]=Scene_Item[_0x56eb94(0x175)][_0x56eb94(0xf1)],Scene_Item[_0x56eb94(0x175)][_0x56eb94(0xf1)]=function(){const _0x5d56ac=_0x56eb94;VisuMZ[_0x5d56ac(0x91)][_0x5d56ac(0x111)][_0x5d56ac(0xff)](this),this[_0x5d56ac(0x252)]()&&this[_0x5d56ac(0x11d)]();},Scene_Item[_0x56eb94(0x175)]['helpWindowRect']=function(){const _0x546dc1=_0x56eb94;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x546dc1(0x237)]():Scene_ItemBase[_0x546dc1(0x175)][_0x546dc1(0x138)][_0x546dc1(0xff)](this);},Scene_Item[_0x56eb94(0x175)][_0x56eb94(0x237)]=function(){const _0x24e480=_0x56eb94,_0x346672=0x0,_0x4d0afd=this[_0x24e480(0x1f7)](),_0x386377=Graphics['boxWidth'],_0x423f50=this[_0x24e480(0x2f0)]();return new Rectangle(_0x346672,_0x4d0afd,_0x386377,_0x423f50);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x19e)]=Scene_Item[_0x56eb94(0x175)][_0x56eb94(0x327)],Scene_Item[_0x56eb94(0x175)]['createCategoryWindow']=function(){const _0x1ea242=_0x56eb94;VisuMZ['ItemsEquipsCore'][_0x1ea242(0x19e)][_0x1ea242(0xff)](this),this[_0x1ea242(0x252)]()&&this[_0x1ea242(0x273)]();},Scene_Item['prototype'][_0x56eb94(0x273)]=function(){const _0x41f3d5=_0x56eb94;delete this[_0x41f3d5(0x18e)][_0x41f3d5(0x158)]['ok'],delete this[_0x41f3d5(0x18e)][_0x41f3d5(0x158)][_0x41f3d5(0x3d2)];},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x2db)]=Scene_Item['prototype'][_0x56eb94(0x3b4)],Scene_Item['prototype']['categoryWindowRect']=function(){const _0x42010b=_0x56eb94;return this[_0x42010b(0x1d2)]()?this[_0x42010b(0x1ce)]():VisuMZ[_0x42010b(0x91)][_0x42010b(0x2db)][_0x42010b(0xff)](this);},Scene_Item[_0x56eb94(0x175)][_0x56eb94(0x1ce)]=function(){const _0x4912cb=_0x56eb94,_0x11189d=0x0,_0x572710=this['mainAreaTop'](),_0x2668fb=Graphics[_0x4912cb(0x222)],_0x5a487b=this[_0x4912cb(0x1c7)](0x1,!![]);return new Rectangle(_0x11189d,_0x572710,_0x2668fb,_0x5a487b);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x27b)]=Scene_Item[_0x56eb94(0x175)][_0x56eb94(0x13d)],Scene_Item[_0x56eb94(0x175)][_0x56eb94(0x13d)]=function(){const _0x3e5553=_0x56eb94;VisuMZ[_0x3e5553(0x91)][_0x3e5553(0x27b)][_0x3e5553(0xff)](this),this[_0x3e5553(0x252)]()&&this['postCreateItemWindowModernControls'](),this[_0x3e5553(0x26e)]()&&this[_0x3e5553(0x108)]();},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x1e3)]=Scene_Item[_0x56eb94(0x175)]['itemWindowRect'],Scene_Item['prototype'][_0x56eb94(0xc5)]=function(){const _0x1a2d21=_0x56eb94;if(this[_0x1a2d21(0x1d2)]())return this[_0x1a2d21(0x18b)]();else{const _0x179db4=VisuMZ[_0x1a2d21(0x91)]['Scene_Item_itemWindowRect'][_0x1a2d21(0xff)](this);return this['allowCreateStatusWindow']()&&this[_0x1a2d21(0x2da)]()&&(_0x179db4['width']-=this['statusWidth']()),_0x179db4;}},Scene_Item[_0x56eb94(0x175)][_0x56eb94(0x18b)]=function(){const _0x4aaae5=_0x56eb94,_0x53c054=this[_0x4aaae5(0xc6)]()?this[_0x4aaae5(0x21e)]():0x0,_0x1cd618=this[_0x4aaae5(0x18e)]['y']+this[_0x4aaae5(0x18e)][_0x4aaae5(0x11b)],_0x5cb5c1=Graphics[_0x4aaae5(0x222)]-this[_0x4aaae5(0x21e)](),_0x5a92eb=this[_0x4aaae5(0x32e)]()-_0x1cd618;return new Rectangle(_0x53c054,_0x1cd618,_0x5cb5c1,_0x5a92eb);},Scene_Item[_0x56eb94(0x175)][_0x56eb94(0xe7)]=function(){const _0x304a2b=_0x56eb94;this[_0x304a2b(0x172)][_0x304a2b(0x2ef)]('cancel',this[_0x304a2b(0xf6)][_0x304a2b(0x9a)](this));},Scene_Item[_0x56eb94(0x175)][_0x56eb94(0x26e)]=function(){const _0x235a2b=_0x56eb94;return this['isUseItemsEquipsCoreUpdatedLayout']()?!![]:VisuMZ['ItemsEquipsCore'][_0x235a2b(0x1a2)][_0x235a2b(0xef)]['ShowShopStatus'];},Scene_Item[_0x56eb94(0x175)][_0x56eb94(0x2da)]=function(){const _0x468ee2=_0x56eb94;return VisuMZ[_0x468ee2(0x91)][_0x468ee2(0x1a2)]['ItemScene']['ItemSceneAdjustItemList'];},Scene_Item[_0x56eb94(0x175)][_0x56eb94(0x108)]=function(){const _0x57fb57=_0x56eb94,_0x45b021=this['statusWindowRect']();this['_statusWindow']=new Window_ShopStatus(_0x45b021),this[_0x57fb57(0x335)](this[_0x57fb57(0x209)]),this['_itemWindow']['setStatusWindow'](this[_0x57fb57(0x209)]);const _0xec4564=VisuMZ['ItemsEquipsCore']['Settings']['ItemScene'][_0x57fb57(0x2f8)];this['_statusWindow'][_0x57fb57(0x182)](_0xec4564||0x0);},Scene_Item[_0x56eb94(0x175)][_0x56eb94(0x2b2)]=function(){const _0x390ea9=_0x56eb94;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x390ea9(0x25e)]():VisuMZ[_0x390ea9(0x91)]['Settings'][_0x390ea9(0xef)]['ItemMenuStatusRect'][_0x390ea9(0xff)](this);},Scene_Item[_0x56eb94(0x175)]['statusWindowRectItemsEquipsCore']=function(){const _0x3757d6=_0x56eb94,_0x966bbf=this[_0x3757d6(0x21e)](),_0x3bb11a=this[_0x3757d6(0x172)][_0x3757d6(0x11b)],_0x22a122=this['isRightInputMode']()?0x0:Graphics['boxWidth']-this[_0x3757d6(0x21e)](),_0x4def3b=this[_0x3757d6(0x172)]['y'];return new Rectangle(_0x22a122,_0x4def3b,_0x966bbf,_0x3bb11a);},Scene_Item[_0x56eb94(0x175)][_0x56eb94(0x21e)]=function(){const _0x37a5fb=_0x56eb94;return Scene_Shop[_0x37a5fb(0x175)][_0x37a5fb(0x21e)]();},Scene_Item[_0x56eb94(0x175)]['buttonAssistItemListRequirement']=function(){const _0x4c4fbf=_0x56eb94;if(!this[_0x4c4fbf(0x23c)]())return![];if(!this[_0x4c4fbf(0x252)]())return![];if(!this['_itemWindow'])return![];if(!this[_0x4c4fbf(0x172)][_0x4c4fbf(0x363)])return![];return this[_0x4c4fbf(0x23c)]()&&this[_0x4c4fbf(0x252)]();},Scene_Item[_0x56eb94(0x175)][_0x56eb94(0x224)]=function(){const _0x5bde07=_0x56eb94;if(this[_0x5bde07(0x241)]())return this[_0x5bde07(0x172)]['maxCols']()===0x1?TextManager[_0x5bde07(0xee)]('left',_0x5bde07(0x124)):TextManager['getInputMultiButtonStrings'](_0x5bde07(0x1ff),'pagedown');return Scene_ItemBase['prototype'][_0x5bde07(0x224)][_0x5bde07(0xff)](this);},Scene_Item[_0x56eb94(0x175)]['buttonAssistText1']=function(){const _0x5663f6=_0x56eb94;if(this[_0x5663f6(0x241)]())return VisuMZ[_0x5663f6(0x91)]['Settings'][_0x5663f6(0xef)][_0x5663f6(0x3a5)];return Scene_ItemBase[_0x5663f6(0x175)][_0x5663f6(0x372)][_0x5663f6(0xff)](this);},Scene_Equip[_0x56eb94(0x175)]['isBottomHelpMode']=function(){const _0x34be37=_0x56eb94;if(ConfigManager[_0x34be37(0x1bb)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x34be37(0xcc)];else{if(this[_0x34be37(0x1d2)]())return this[_0x34be37(0x23c)]()[_0x34be37(0x382)](/LOWER/i);else Scene_MenuBase[_0x34be37(0x175)][_0x34be37(0xc6)][_0x34be37(0xff)](this);}},Scene_Equip[_0x56eb94(0x175)]['isRightInputMode']=function(){const _0x470899=_0x56eb94;if(ConfigManager[_0x470899(0x1bb)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x470899(0x2c3)];else{if(this[_0x470899(0x1d2)]())return this[_0x470899(0x23c)]()['match'](/RIGHT/i);else Scene_MenuBase[_0x470899(0x175)]['isRightInputMode'][_0x470899(0xff)](this);}},Scene_Equip['prototype'][_0x56eb94(0x23c)]=function(){const _0x53f80a=_0x56eb94;return VisuMZ[_0x53f80a(0x91)]['Settings'][_0x53f80a(0x15c)][_0x53f80a(0x30f)];},Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0x252)]=function(){const _0x117882=_0x56eb94;return this[_0x117882(0x149)]&&this[_0x117882(0x149)][_0x117882(0x252)]();},Scene_Equip['prototype'][_0x56eb94(0x1d2)]=function(){const _0x21a927=_0x56eb94;return VisuMZ[_0x21a927(0x91)][_0x21a927(0x1a2)]['EquipScene'][_0x21a927(0x3bc)];},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x298)]=Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0xf1)],Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0xf1)]=function(){const _0x1d9886=_0x56eb94;VisuMZ[_0x1d9886(0x91)][_0x1d9886(0x298)][_0x1d9886(0xff)](this),this[_0x1d9886(0x252)]()&&this[_0x1d9886(0x256)]();},Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0x138)]=function(){const _0x5a8d1f=_0x56eb94;return this[_0x5a8d1f(0x1d2)]()?this[_0x5a8d1f(0x237)]():Scene_MenuBase['prototype']['helpWindowRect'][_0x5a8d1f(0xff)](this);},Scene_Equip['prototype']['helpWindowRectItemsEquipsCore']=function(){const _0x21c7b0=_0x56eb94,_0x42cfad=0x0,_0x12bdf3=this[_0x21c7b0(0x1f7)](),_0x44a56d=Graphics['boxWidth'],_0x54b709=this[_0x21c7b0(0x2f0)]();return new Rectangle(_0x42cfad,_0x12bdf3,_0x44a56d,_0x54b709);},VisuMZ[_0x56eb94(0x91)]['Scene_Equip_statusWindowRect']=Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0x2b2)],Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0x2b2)]=function(){const _0x50268d=_0x56eb94;return this[_0x50268d(0x1d2)]()?this[_0x50268d(0x25e)]():VisuMZ[_0x50268d(0x91)]['Scene_Equip_statusWindowRect'][_0x50268d(0xff)](this);},Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0x25e)]=function(){const _0x4f75fd=_0x56eb94,_0x2975d0=this[_0x4f75fd(0xc6)]()?0x0:Graphics[_0x4f75fd(0x222)]-this[_0x4f75fd(0x21e)](),_0x539f0e=this[_0x4f75fd(0x2d0)](),_0x5cc5d0=this[_0x4f75fd(0x21e)](),_0x1dcef0=this[_0x4f75fd(0x39c)]();return new Rectangle(_0x2975d0,_0x539f0e,_0x5cc5d0,_0x1dcef0);},VisuMZ['ItemsEquipsCore'][_0x56eb94(0x231)]=Scene_Equip[_0x56eb94(0x175)]['commandWindowRect'],Scene_Equip[_0x56eb94(0x175)]['commandWindowRect']=function(){const _0x2c17dd=_0x56eb94;return this[_0x2c17dd(0x1d2)]()?this[_0x2c17dd(0x3c8)]():VisuMZ[_0x2c17dd(0x91)][_0x2c17dd(0x231)][_0x2c17dd(0xff)](this);},Scene_Equip['prototype'][_0x56eb94(0x1a0)]=function(){const _0xdbb9b9=_0x56eb94,_0x1cc9d4=VisuMZ[_0xdbb9b9(0x91)][_0xdbb9b9(0x1a2)]['EquipScene'];return _0x1cc9d4[_0xdbb9b9(0x38c)]||_0x1cc9d4[_0xdbb9b9(0x2e8)];},Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0x3c8)]=function(){const _0x117e21=_0x56eb94,_0x28ee11=this['shouldCommandWindowExist'](),_0xedad18=this['isRightInputMode']()?this[_0x117e21(0x21e)]():0x0,_0x1c9ef4=this[_0x117e21(0x2d0)](),_0xe3fe48=Graphics['boxWidth']-this[_0x117e21(0x21e)](),_0x43c686=_0x28ee11?this[_0x117e21(0x1c7)](0x1,!![]):0x0;return new Rectangle(_0xedad18,_0x1c9ef4,_0xe3fe48,_0x43c686);},VisuMZ['ItemsEquipsCore']['Scene_Equip_createSlotWindow']=Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0xfd)],Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0xfd)]=function(){const _0x112c24=_0x56eb94;VisuMZ[_0x112c24(0x91)][_0x112c24(0xdf)][_0x112c24(0xff)](this),this[_0x112c24(0x252)]()&&this['postCreateSlotWindowItemsEquipsCore']();},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x200)]=Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0x146)],Scene_Equip[_0x56eb94(0x175)]['slotWindowRect']=function(){const _0x3c9776=_0x56eb94;return this[_0x3c9776(0x1d2)]()?this[_0x3c9776(0x2d6)]():VisuMZ[_0x3c9776(0x91)][_0x3c9776(0x200)][_0x3c9776(0xff)](this);},Scene_Equip[_0x56eb94(0x175)]['slotWindowRectItemsEquipsCore']=function(){const _0x2c57a1=_0x56eb94,_0x428e68=this[_0x2c57a1(0x143)](),_0x152b4a=this[_0x2c57a1(0xc6)]()?this[_0x2c57a1(0x21e)]():0x0,_0x58221f=_0x428e68['y']+_0x428e68['height'],_0x48031b=Graphics[_0x2c57a1(0x222)]-this[_0x2c57a1(0x21e)](),_0x9840fe=this[_0x2c57a1(0x39c)]()-_0x428e68[_0x2c57a1(0x11b)];return new Rectangle(_0x152b4a,_0x58221f,_0x48031b,_0x9840fe);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x2e7)]=Scene_Equip['prototype'][_0x56eb94(0xc5)],Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0xc5)]=function(){const _0xe7465d=_0x56eb94;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0xe7465d(0x146)]():VisuMZ[_0xe7465d(0x91)][_0xe7465d(0x2e7)]['call'](this);},Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0x21e)]=function(){const _0x50bb7f=_0x56eb94;return this[_0x50bb7f(0x1d2)]()?this[_0x50bb7f(0x13b)]():VisuMZ[_0x50bb7f(0x91)][_0x50bb7f(0x1a2)]['EquipScene'][_0x50bb7f(0x3b6)];},Scene_Equip['prototype']['geUpdatedLayoutStatusWidth']=function(){const _0x2e3046=_0x56eb94;return Math[_0x2e3046(0x1a3)](Graphics[_0x2e3046(0x222)]/0x2);},Scene_Equip['prototype'][_0x56eb94(0xd0)]=function(){const _0x3cda35=_0x56eb94;this[_0x3cda35(0xc0)][_0x3cda35(0x2ef)](_0x3cda35(0x3d2),this['popScene'][_0x3cda35(0x9a)](this)),this['_slotWindow'][_0x3cda35(0x2ef)]('pagedown',this[_0x3cda35(0x2fe)][_0x3cda35(0x9a)](this)),this[_0x3cda35(0xc0)]['setHandler'](_0x3cda35(0x1ff),this['previousActor'][_0x3cda35(0x9a)](this));},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x3b5)]=Scene_Equip[_0x56eb94(0x175)]['commandEquip'],Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0x256)]=function(){const _0x429f77=_0x56eb94;this[_0x429f77(0x252)]()&&(this[_0x429f77(0x149)][_0x429f77(0x326)](),this[_0x429f77(0x149)][_0x429f77(0x2ff)]()),VisuMZ[_0x429f77(0x91)][_0x429f77(0x3b5)][_0x429f77(0xff)](this);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x266)]=Scene_Equip[_0x56eb94(0x175)]['onSlotOk'],Scene_Equip[_0x56eb94(0x175)]['onSlotOk']=function(){const _0x176671=_0x56eb94;this['_slotWindow'][_0x176671(0x2f4)]()>=0x0?(VisuMZ[_0x176671(0x91)][_0x176671(0x266)][_0x176671(0xff)](this),this[_0x176671(0x39d)]()):(this[_0x176671(0xc0)]['smoothSelect'](0x0),this[_0x176671(0xc0)]['activate']());},Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0x39d)]=function(){const _0x22446c=_0x56eb94,_0x503758=this[_0x22446c(0xc0)][_0x22446c(0x1ae)](),_0x56286b=this[_0x22446c(0x172)]['_data'][_0x22446c(0x32a)](_0x503758),_0x4c61f5=Math[_0x22446c(0x1a3)](this[_0x22446c(0x172)][_0x22446c(0x2b9)]()/0x2)-0x1;this[_0x22446c(0x172)][_0x22446c(0x11e)](_0x56286b>=0x0?_0x56286b:0x0),this[_0x22446c(0x172)]['setTopRow'](this[_0x22446c(0x172)]['index']()-_0x4c61f5);},VisuMZ[_0x56eb94(0x91)]['Scene_Equip_onSlotCancel']=Scene_Equip[_0x56eb94(0x175)]['onSlotCancel'],Scene_Equip['prototype'][_0x56eb94(0x2c1)]=function(){const _0x441f7e=_0x56eb94;VisuMZ['ItemsEquipsCore']['Scene_Equip_onSlotCancel'][_0x441f7e(0xff)](this),this[_0x441f7e(0x252)]()&&(this['_commandWindow'][_0x441f7e(0x11e)](0x0),this[_0x441f7e(0xc0)][_0x441f7e(0x2ff)]());},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0xd5)]=Scene_Equip['prototype'][_0x56eb94(0xc4)],Scene_Equip[_0x56eb94(0x175)]['onActorChange']=function(){const _0x1e7110=_0x56eb94;VisuMZ[_0x1e7110(0x91)][_0x1e7110(0xd5)][_0x1e7110(0xff)](this),this[_0x1e7110(0x252)]()&&(this[_0x1e7110(0x149)][_0x1e7110(0x2ff)](),this[_0x1e7110(0x149)][_0x1e7110(0x326)](),this[_0x1e7110(0xc0)][_0x1e7110(0x11e)](0x0),this[_0x1e7110(0xc0)]['activate']());},Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0x31f)]=function(){const _0x57e694=_0x56eb94;if(!this['_slotWindow'])return![];if(!this['_slotWindow']['active'])return![];return this['_slotWindow'][_0x57e694(0x12a)]();},Scene_Equip[_0x56eb94(0x175)]['buttonAssistKey3']=function(){const _0x20da55=_0x56eb94;if(this[_0x20da55(0x31f)]())return TextManager[_0x20da55(0x1ea)]('shift');return Scene_MenuBase[_0x20da55(0x175)][_0x20da55(0x337)][_0x20da55(0xff)](this);},Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0x272)]=function(){const _0x591c8c=_0x56eb94;if(this[_0x591c8c(0x31f)]())return VisuMZ[_0x591c8c(0x91)]['Settings'][_0x591c8c(0x15c)][_0x591c8c(0x34e)];return Scene_MenuBase[_0x591c8c(0x175)][_0x591c8c(0x272)][_0x591c8c(0xff)](this);},Scene_Equip[_0x56eb94(0x175)][_0x56eb94(0x2d3)]=function(){const _0x1e449a=_0x56eb94;if(this['buttonAssistSlotWindowShift']())return this['_buttonAssistWindow'][_0x1e449a(0x244)]/0x5/-0x3;return Scene_MenuBase[_0x1e449a(0x175)][_0x1e449a(0x2d3)][_0x1e449a(0xff)](this);},VisuMZ[_0x56eb94(0x91)]['Scene_Load_reloadMapIfUpdated']=Scene_Load[_0x56eb94(0x175)]['reloadMapIfUpdated'],Scene_Load[_0x56eb94(0x175)][_0x56eb94(0x1c3)]=function(){const _0x7753e3=_0x56eb94;VisuMZ['ItemsEquipsCore'][_0x7753e3(0x27e)][_0x7753e3(0xff)](this),this[_0x7753e3(0x2f5)]();},Scene_Load[_0x56eb94(0x175)][_0x56eb94(0x2f5)]=function(){const _0x30c8ee=_0x56eb94;if($gameSystem[_0x30c8ee(0xec)]()!==$dataSystem[_0x30c8ee(0xec)])for(const _0x18328b of $gameActors[_0x30c8ee(0x2c2)]){if(_0x18328b)_0x18328b[_0x30c8ee(0x249)]();}},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0xf0)]=function(){const _0x5d18df=_0x56eb94;if(ConfigManager[_0x5d18df(0x1bb)]&&ConfigManager[_0x5d18df(0xcc)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x5d18df(0x1d2)]())return this['updatedLayoutStyle']()['match'](/LOWER/i);else Scene_MenuBase[_0x5d18df(0x175)][_0x5d18df(0xc6)][_0x5d18df(0xff)](this);}},Scene_Shop['prototype'][_0x56eb94(0xc6)]=function(){const _0x9b86dd=_0x56eb94;if(ConfigManager[_0x9b86dd(0x1bb)]&&ConfigManager[_0x9b86dd(0x2c3)]!==undefined)return ConfigManager[_0x9b86dd(0x2c3)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x9b86dd(0x23c)]()[_0x9b86dd(0x382)](/RIGHT/i);else Scene_MenuBase[_0x9b86dd(0x175)][_0x9b86dd(0xc6)][_0x9b86dd(0xff)](this);}},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x23c)]=function(){const _0x588e1b=_0x56eb94;return VisuMZ['ItemsEquipsCore'][_0x588e1b(0x1a2)]['ShopScene'][_0x588e1b(0x30f)];},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x252)]=function(){const _0x528b9b=_0x56eb94;return this['_categoryWindow']&&this[_0x528b9b(0x18e)][_0x528b9b(0x252)]();},Scene_Shop['prototype'][_0x56eb94(0x1d2)]=function(){const _0x3a2540=_0x56eb94;return VisuMZ[_0x3a2540(0x91)]['Settings'][_0x3a2540(0x396)][_0x3a2540(0x3bc)];},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x295)]=Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x37a)],Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x37a)]=function(_0x109839,_0x5286ea){const _0x4c99ee=_0x56eb94;_0x109839=JsonEx[_0x4c99ee(0xa6)](_0x109839),VisuMZ[_0x4c99ee(0x91)][_0x4c99ee(0x295)][_0x4c99ee(0xff)](this,_0x109839,_0x5286ea),this[_0x4c99ee(0x346)]();},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x346)]=function(){const _0x4f7477=_0x56eb94;this[_0x4f7477(0x22e)]=0x0;for(const _0x47dafc of this['_goods']){this['isGoodShown'](_0x47dafc)?this[_0x4f7477(0x22e)]++:_0x47dafc[0x0]=-0x1;}},Scene_Shop[_0x56eb94(0x175)]['isGoodShown']=function(_0x1d2f03){const _0x41b308=_0x56eb94;if(_0x1d2f03[0x0]>0x2||_0x1d2f03[0x0]<0x0)return![];const _0x3cf3e6=[$dataItems,$dataWeapons,$dataArmors][_0x1d2f03[0x0]][_0x1d2f03[0x1]];if(!_0x3cf3e6)return![];const _0x521564=_0x3cf3e6[_0x41b308(0x278)]||'';if(_0x521564[_0x41b308(0x382)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3be1fb=JSON[_0x41b308(0xf9)]('['+RegExp['$1'][_0x41b308(0x382)](/\d+/g)+']');for(const _0x570525 of _0x3be1fb){if(!$gameSwitches[_0x41b308(0x17c)](_0x570525))return![];}return!![];}if(_0x521564['match'](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x106a75=JSON[_0x41b308(0xf9)]('['+RegExp['$1'][_0x41b308(0x382)](/\d+/g)+']');for(const _0xf180a1 of _0x106a75){if(!$gameSwitches['value'](_0xf180a1))return![];}return!![];}if(_0x521564[_0x41b308(0x382)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x35f531=JSON[_0x41b308(0xf9)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x564aa0 of _0x35f531){if($gameSwitches[_0x41b308(0x17c)](_0x564aa0))return!![];}return![];}if(_0x521564[_0x41b308(0x382)](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x55f369=JSON[_0x41b308(0xf9)]('['+RegExp['$1'][_0x41b308(0x382)](/\d+/g)+']');for(const _0x14a788 of _0x55f369){if(!$gameSwitches['value'](_0x14a788))return!![];}return![];}if(_0x521564[_0x41b308(0x382)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1d29ef=JSON[_0x41b308(0xf9)]('['+RegExp['$1'][_0x41b308(0x382)](/\d+/g)+']');for(const _0x3e0bba of _0x1d29ef){if(!$gameSwitches[_0x41b308(0x17c)](_0x3e0bba))return!![];}return![];}if(_0x521564[_0x41b308(0x382)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1e2d50=JSON[_0x41b308(0xf9)]('['+RegExp['$1'][_0x41b308(0x382)](/\d+/g)+']');for(const _0xa5d567 of _0x1e2d50){if($gameSwitches[_0x41b308(0x17c)](_0xa5d567))return![];}return!![];}return!![];},VisuMZ['ItemsEquipsCore'][_0x56eb94(0x1d0)]=Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0xf1)],Scene_Shop[_0x56eb94(0x175)]['create']=function(){const _0x228ccd=_0x56eb94;VisuMZ[_0x228ccd(0x91)][_0x228ccd(0x1d0)][_0x228ccd(0xff)](this),this[_0x228ccd(0x1d2)]()&&this[_0x228ccd(0xe2)]();},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0xe2)]=function(){const _0x3878c2=_0x56eb94;this['_dummyWindow'][_0x3878c2(0x2df)](),this[_0x3878c2(0x281)][_0x3878c2(0x1fd)](),this['_buyWindow'][_0x3878c2(0x326)](),this['_statusWindow'][_0x3878c2(0x1fd)]();},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x138)]=function(){const _0x356146=_0x56eb94;return this[_0x356146(0x1d2)]()?this['helpWindowRectItemsEquipsCore']():Scene_MenuBase['prototype']['helpWindowRect'][_0x356146(0xff)](this);},Scene_Shop['prototype']['helpWindowRectItemsEquipsCore']=function(){const _0x285a79=_0x56eb94,_0x4adc15=0x0,_0x3dce3c=this[_0x285a79(0x1f7)](),_0xd00604=Graphics[_0x285a79(0x222)],_0x23c7a2=this[_0x285a79(0x2f0)]();return new Rectangle(_0x4adc15,_0x3dce3c,_0xd00604,_0x23c7a2);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x2a4)]=Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x3a6)],Scene_Shop[_0x56eb94(0x175)]['goldWindowRect']=function(){const _0x1ef05b=_0x56eb94;return this[_0x1ef05b(0x1d2)]()?this['goldWindowRectItemsEquipsCore']():VisuMZ[_0x1ef05b(0x91)]['Scene_Shop_goldWindowRect'][_0x1ef05b(0xff)](this);},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x31e)]=function(){const _0x188d21=_0x56eb94,_0x106802=this['mainCommandWidth'](),_0x51f264=this[_0x188d21(0x1c7)](0x1,!![]),_0x56d269=this['isRightInputMode']()?0x0:Graphics['boxWidth']-_0x106802,_0x2d8e13=this[_0x188d21(0x2d0)]();return new Rectangle(_0x56d269,_0x2d8e13,_0x106802,_0x51f264);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x258)]=Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x143)],Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x143)]=function(){const _0x284175=_0x56eb94;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['commandWindowRectItemsEquipsCore']():VisuMZ[_0x284175(0x91)][_0x284175(0x258)][_0x284175(0xff)](this);},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x3c8)]=function(){const _0x220cad=_0x56eb94,_0x4d804e=this['isRightInputMode']()?this[_0x220cad(0x14f)]():0x0,_0x3152b8=this['mainAreaTop'](),_0x403ce0=Graphics[_0x220cad(0x222)]-this[_0x220cad(0x14f)](),_0x2fe9e2=this[_0x220cad(0x1c7)](0x1,!![]);return new Rectangle(_0x4d804e,_0x3152b8,_0x403ce0,_0x2fe9e2);},VisuMZ['ItemsEquipsCore'][_0x56eb94(0x15e)]=Scene_Shop[_0x56eb94(0x175)]['numberWindowRect'],Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x2ee)]=function(){const _0x554ca8=_0x56eb94;return this[_0x554ca8(0x1d2)]()?this[_0x554ca8(0x39e)]():VisuMZ[_0x554ca8(0x91)][_0x554ca8(0x15e)][_0x554ca8(0xff)](this);},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x39e)]=function(){const _0x3acf36=_0x56eb94,_0x3d312f=this[_0x3acf36(0x149)]['y']+this['_commandWindow'][_0x3acf36(0x11b)],_0x294e8b=Graphics['boxWidth']-this['statusWidth'](),_0x2eb9d2=this[_0x3acf36(0xc6)]()?Graphics[_0x3acf36(0x222)]-_0x294e8b:0x0,_0x361f86=this[_0x3acf36(0x39c)]()-this['_commandWindow'][_0x3acf36(0x11b)];return new Rectangle(_0x2eb9d2,_0x3d312f,_0x294e8b,_0x361f86);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0xe6)]=Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x2b2)],Scene_Shop[_0x56eb94(0x175)]['statusWindowRect']=function(){const _0x492636=_0x56eb94;return this[_0x492636(0x1d2)]()?this[_0x492636(0x25e)]():VisuMZ['ItemsEquipsCore'][_0x492636(0xe6)][_0x492636(0xff)](this);},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x25e)]=function(){const _0x5e9d11=_0x56eb94,_0xcd63bb=this[_0x5e9d11(0x21e)](),_0x2de138=this[_0x5e9d11(0x39c)]()-this[_0x5e9d11(0x149)][_0x5e9d11(0x11b)],_0x107a91=this[_0x5e9d11(0xc6)]()?0x0:Graphics[_0x5e9d11(0x222)]-_0xcd63bb,_0x306bfb=this[_0x5e9d11(0x149)]['y']+this[_0x5e9d11(0x149)][_0x5e9d11(0x11b)];return new Rectangle(_0x107a91,_0x306bfb,_0xcd63bb,_0x2de138);},VisuMZ['ItemsEquipsCore'][_0x56eb94(0x214)]=Scene_Shop['prototype'][_0x56eb94(0x135)],Scene_Shop['prototype']['buyWindowRect']=function(){const _0x224b67=_0x56eb94;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x224b67(0x1a6)]():VisuMZ['ItemsEquipsCore'][_0x224b67(0x214)][_0x224b67(0xff)](this);},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x1a6)]=function(){const _0x378f89=_0x56eb94,_0x11488b=this[_0x378f89(0x149)]['y']+this[_0x378f89(0x149)][_0x378f89(0x11b)],_0x50803b=Graphics[_0x378f89(0x222)]-this[_0x378f89(0x21e)](),_0x3d26a9=this[_0x378f89(0x39c)]()-this['_commandWindow']['height'],_0x1d3366=this['isRightInputMode']()?Graphics[_0x378f89(0x222)]-_0x50803b:0x0;return new Rectangle(_0x1d3366,_0x11488b,_0x50803b,_0x3d26a9);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x2dd)]=Scene_Shop['prototype'][_0x56eb94(0x327)],Scene_Shop['prototype']['createCategoryWindow']=function(){const _0x170726=_0x56eb94;VisuMZ[_0x170726(0x91)][_0x170726(0x2dd)][_0x170726(0xff)](this),this[_0x170726(0x252)]()&&this[_0x170726(0x273)]();},VisuMZ[_0x56eb94(0x91)]['Scene_Shop_categoryWindowRect']=Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x3b4)],Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x3b4)]=function(){const _0x1cf693=_0x56eb94;return this[_0x1cf693(0x1d2)]()?this[_0x1cf693(0x1ce)]():VisuMZ[_0x1cf693(0x91)][_0x1cf693(0xc3)][_0x1cf693(0xff)](this);},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x1ce)]=function(){const _0x12e7c6=_0x56eb94,_0x22142b=this['_commandWindow']['y'],_0x48d74f=this[_0x12e7c6(0x149)][_0x12e7c6(0x244)],_0x109f23=this[_0x12e7c6(0x1c7)](0x1,!![]),_0x424fc2=this[_0x12e7c6(0xc6)]()?Graphics[_0x12e7c6(0x222)]-_0x48d74f:0x0;return new Rectangle(_0x424fc2,_0x22142b,_0x48d74f,_0x109f23);},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x273)]=function(){const _0x57b541=_0x56eb94;delete this['_categoryWindow'][_0x57b541(0x158)]['ok'],delete this['_categoryWindow'][_0x57b541(0x158)][_0x57b541(0x3d2)];},VisuMZ['ItemsEquipsCore']['Scene_Shop_createSellWindow']=Scene_Shop['prototype'][_0x56eb94(0x171)],Scene_Shop['prototype'][_0x56eb94(0x171)]=function(){const _0xa20b31=_0x56eb94;VisuMZ[_0xa20b31(0x91)][_0xa20b31(0xb4)][_0xa20b31(0xff)](this),this[_0xa20b31(0x1d2)]()&&this[_0xa20b31(0xbd)]();},VisuMZ['ItemsEquipsCore'][_0x56eb94(0x100)]=Scene_Shop['prototype'][_0x56eb94(0x1e7)],Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x1e7)]=function(){const _0x4ad9c2=_0x56eb94;return this[_0x4ad9c2(0x1d2)]()?this[_0x4ad9c2(0x3d1)]():VisuMZ[_0x4ad9c2(0x91)][_0x4ad9c2(0x100)]['call'](this);},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x3d1)]=function(){const _0x42970d=_0x56eb94,_0x33b07d=this['_categoryWindow']['y']+this[_0x42970d(0x18e)][_0x42970d(0x11b)],_0x261f69=Graphics['boxWidth']-this[_0x42970d(0x21e)](),_0x4527f8=this[_0x42970d(0x39c)]()-this[_0x42970d(0x18e)][_0x42970d(0x11b)],_0x165cce=this[_0x42970d(0xc6)]()?Graphics[_0x42970d(0x222)]-_0x261f69:0x0;return new Rectangle(_0x165cce,_0x33b07d,_0x261f69,_0x4527f8);},Scene_Shop[_0x56eb94(0x175)]['postCreateSellWindowItemsEquipsCore']=function(){const _0x499867=_0x56eb94;this[_0x499867(0x380)][_0x499867(0x3b3)](this[_0x499867(0x209)]);},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x21e)]=function(){const _0x55d1af=_0x56eb94;return VisuMZ['ItemsEquipsCore'][_0x55d1af(0x1a2)]['StatusWindow'][_0x55d1af(0x194)];},VisuMZ[_0x56eb94(0x91)]['Scene_Shop_activateSellWindow']=Scene_Shop[_0x56eb94(0x175)]['activateSellWindow'],Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x2cc)]=function(){const _0x34be3a=_0x56eb94;VisuMZ[_0x34be3a(0x91)]['Scene_Shop_activateSellWindow']['call'](this),this[_0x34be3a(0x1d2)]()&&this[_0x34be3a(0x209)][_0x34be3a(0x1fd)]();},VisuMZ[_0x56eb94(0x91)]['Scene_Shop_commandBuy']=Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x33b)],Scene_Shop['prototype']['commandBuy']=function(){const _0x122a01=_0x56eb94;VisuMZ[_0x122a01(0x91)][_0x122a01(0x227)][_0x122a01(0xff)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x122a01(0xfe)]();},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0xfe)]=function(){const _0x5b04d7=_0x56eb94;this[_0x5b04d7(0x159)]=this[_0x5b04d7(0x159)]||0x0,this[_0x5b04d7(0x281)][_0x5b04d7(0x11e)](this['_buyWindowLastIndex']);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x2ad)]=Scene_Shop['prototype'][_0x56eb94(0x36a)],Scene_Shop['prototype'][_0x56eb94(0x36a)]=function(){const _0xfe1432=_0x56eb94;VisuMZ[_0xfe1432(0x91)]['Scene_Shop_commandSell']['call'](this),this[_0xfe1432(0x1d2)]()&&this['commandSellItemsEquipsCore'](),this['isUseModernControls']()&&(this[_0xfe1432(0x18e)][_0xfe1432(0x11e)](0x0),this[_0xfe1432(0x11d)]());},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x347)]=function(){const _0x3f87b3=_0x56eb94;this[_0x3f87b3(0x281)][_0x3f87b3(0x2df)](),this[_0x3f87b3(0x149)][_0x3f87b3(0x2df)]();},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x11a)]=Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x117)],Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x117)]=function(){const _0x94c946=_0x56eb94;VisuMZ[_0x94c946(0x91)][_0x94c946(0x11a)][_0x94c946(0xff)](this),this[_0x94c946(0x1d2)]()&&this[_0x94c946(0x1cd)]();},Scene_Shop[_0x56eb94(0x175)]['onBuyCancelItemsEquipsCore']=function(){const _0x109ba3=_0x56eb94;this[_0x109ba3(0x159)]=this[_0x109ba3(0x281)]['index'](),this[_0x109ba3(0x281)][_0x109ba3(0x1fd)](),this['_buyWindow'][_0x109ba3(0x326)](),this['_buyWindow'][_0x109ba3(0xae)](0x0,0x0),this['_statusWindow'][_0x109ba3(0x1fd)](),this[_0x109ba3(0x312)][_0x109ba3(0x2df)]();},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x30d)]=Scene_Shop['prototype'][_0x56eb94(0x3d4)],Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x3d4)]=function(){const _0x25b409=_0x56eb94;VisuMZ[_0x25b409(0x91)][_0x25b409(0x30d)]['call'](this),this[_0x25b409(0x1d2)]()&&this[_0x25b409(0x22b)]();},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x22b)]=function(){const _0x2ea274=_0x56eb94;this['_buyWindow'][_0x2ea274(0x1fd)](),this[_0x2ea274(0x149)]['show']();},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x3b2)]=Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x2ce)],Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x2ce)]=function(){const _0x490119=_0x56eb94;VisuMZ['ItemsEquipsCore'][_0x490119(0x3b2)][_0x490119(0xff)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x490119(0xb6)]();},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0xb6)]=function(){const _0x14087c=_0x56eb94;this[_0x14087c(0x18e)]['show']();},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x3ac)]=Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x120)],Scene_Shop[_0x56eb94(0x175)]['onSellCancel']=function(){const _0x1a7cc4=_0x56eb94;VisuMZ[_0x1a7cc4(0x91)]['Scene_Shop_onSellCancel']['call'](this),this['isUseModernControls']()&&this[_0x1a7cc4(0x3d4)](),this[_0x1a7cc4(0x1d2)]()&&this[_0x1a7cc4(0x312)][_0x1a7cc4(0x2df)]();},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x319)]=Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x280)],Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x280)]=function(){const _0x2ee741=_0x56eb94;let _0xc4f500=this[_0x2ee741(0x17a)]();const _0x53caa2=this['_item'];return _0xc4f500=VisuMZ[_0x2ee741(0x91)][_0x2ee741(0x1a2)][_0x2ee741(0x396)][_0x2ee741(0x1c5)][_0x2ee741(0xff)](this,_0x53caa2,_0xc4f500),_0xc4f500;},Scene_Shop['prototype'][_0x56eb94(0x17a)]=function(){const _0x3d95a1=_0x56eb94;if(!this[_0x3d95a1(0xd7)])return 0x0;else{if(this[_0x3d95a1(0xd7)][_0x3d95a1(0x278)][_0x3d95a1(0x382)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x374112=String(RegExp['$1']);let _0x13659a=this[_0x3d95a1(0xd7)],_0x1d73d4=_0x13659a[_0x3d95a1(0x28d)]*this[_0x3d95a1(0x243)]();try{eval(_0x374112);}catch(_0x2ae47d){if($gameTemp[_0x3d95a1(0x163)]())console['log'](_0x2ae47d);}if(isNaN(_0x1d73d4))_0x1d73d4=0x0;return Math[_0x3d95a1(0x1a3)](_0x1d73d4);}else return this[_0x3d95a1(0xd7)][_0x3d95a1(0x278)][_0x3d95a1(0x382)](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math[_0x3d95a1(0x1a3)](this[_0x3d95a1(0xd7)]['price']*this[_0x3d95a1(0x243)]());}},Scene_Shop['prototype']['sellPriceRate']=function(){const _0x1387e4=_0x56eb94;return VisuMZ[_0x1387e4(0x91)]['Settings'][_0x1387e4(0x396)][_0x1387e4(0x39b)];},Scene_Shop['prototype'][_0x56eb94(0x241)]=function(){const _0x1e9512=_0x56eb94;if(!this[_0x1e9512(0x23c)]())return![];if(!this[_0x1e9512(0x252)]())return![];if(!this['_sellWindow'])return![];if(!this['_sellWindow'][_0x1e9512(0x363)])return![];return this['updatedLayoutStyle']()&&this[_0x1e9512(0x252)]();},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x224)]=function(){const _0x179c06=_0x56eb94;if(this[_0x179c06(0x241)]())return this[_0x179c06(0x380)]['maxCols']()===0x1?TextManager[_0x179c06(0xee)]('left',_0x179c06(0x124)):TextManager[_0x179c06(0xee)](_0x179c06(0x1ff),'pagedown');else{if(this[_0x179c06(0x21d)]&&this[_0x179c06(0x21d)]['active'])return TextManager[_0x179c06(0xee)](_0x179c06(0x34a),'right');}return Scene_MenuBase[_0x179c06(0x175)][_0x179c06(0x224)][_0x179c06(0xff)](this);},Scene_Shop['prototype']['buttonAssistKey2']=function(){const _0x359dbc=_0x56eb94;if(this['_numberWindow']&&this[_0x359dbc(0x21d)][_0x359dbc(0x363)])return TextManager[_0x359dbc(0xee)]('up',_0x359dbc(0x26a));return Scene_MenuBase[_0x359dbc(0x175)][_0x359dbc(0x17d)][_0x359dbc(0xff)](this);},Scene_Shop[_0x56eb94(0x175)]['buttonAssistText1']=function(){const _0x5714fb=_0x56eb94;if(this[_0x5714fb(0x241)]())return VisuMZ[_0x5714fb(0x91)][_0x5714fb(0x1a2)][_0x5714fb(0xef)][_0x5714fb(0x3a5)];else{if(this[_0x5714fb(0x21d)]&&this[_0x5714fb(0x21d)][_0x5714fb(0x363)])return VisuMZ[_0x5714fb(0x91)][_0x5714fb(0x1a2)][_0x5714fb(0x396)][_0x5714fb(0x13e)];}return Scene_MenuBase[_0x5714fb(0x175)][_0x5714fb(0x372)]['call'](this);},Scene_Shop[_0x56eb94(0x175)][_0x56eb94(0x15a)]=function(){const _0x2bcafd=_0x56eb94;if(this['_numberWindow']&&this['_numberWindow'][_0x2bcafd(0x363)])return VisuMZ[_0x2bcafd(0x91)]['Settings']['ShopScene'][_0x2bcafd(0x185)];return Scene_MenuBase[_0x2bcafd(0x175)]['buttonAssistText2'][_0x2bcafd(0xff)](this);};function Sprite_NewLabel(){const _0x348873=_0x56eb94;this[_0x348873(0x3c0)](...arguments);}Sprite_NewLabel[_0x56eb94(0x175)]=Object['create'](Sprite['prototype']),Sprite_NewLabel[_0x56eb94(0x175)]['constructor']=Sprite_NewLabel,Sprite_NewLabel[_0x56eb94(0x175)][_0x56eb94(0x3c0)]=function(){const _0x8ed363=_0x56eb94;Sprite[_0x8ed363(0x175)]['initialize'][_0x8ed363(0xff)](this),this['createBitmap']();},Sprite_NewLabel[_0x56eb94(0x175)][_0x56eb94(0x1b5)]=function(){const _0x1ebc65=_0x56eb94,_0x3db699=ImageManager[_0x1ebc65(0x1b2)],_0x117db0=ImageManager[_0x1ebc65(0x2f2)];this[_0x1ebc65(0x16f)]=new Bitmap(_0x3db699,_0x117db0),this[_0x1ebc65(0x2cd)](),this[_0x1ebc65(0x30a)]();},Sprite_NewLabel[_0x56eb94(0x175)][_0x56eb94(0x2cd)]=function(){const _0x5a70be=_0x56eb94,_0x8cd010=VisuMZ[_0x5a70be(0x91)][_0x5a70be(0x1a2)][_0x5a70be(0x32d)][_0x5a70be(0x10c)];if(_0x8cd010<=0x0)return;const _0x5a85af=ImageManager[_0x5a70be(0x357)]('IconSet'),_0x43949f=ImageManager['iconWidth'],_0xd3957=ImageManager['iconHeight'],_0x315c48=_0x8cd010%0x10*_0x43949f,_0x5c7a13=Math[_0x5a70be(0x1a3)](_0x8cd010/0x10)*_0xd3957;this[_0x5a70be(0x16f)]['blt'](_0x5a85af,_0x315c48,_0x5c7a13,_0x43949f,_0xd3957,0x0,0x0);},Sprite_NewLabel['prototype'][_0x56eb94(0x30a)]=function(){const _0x52b564=_0x56eb94,_0x333ac5=VisuMZ[_0x52b564(0x91)][_0x52b564(0x1a2)][_0x52b564(0x32d)],_0x27e84b=_0x333ac5[_0x52b564(0x202)];if(_0x27e84b==='')return;const _0xe22ba1=ImageManager[_0x52b564(0x1b2)],_0xbc139=ImageManager[_0x52b564(0x2f2)];this['bitmap']['fontFace']=_0x333ac5[_0x52b564(0x245)]||$gameSystem[_0x52b564(0x255)](),this[_0x52b564(0x16f)][_0x52b564(0x3cf)]=this['getTextColor'](),this['bitmap'][_0x52b564(0xcf)]=_0x333ac5[_0x52b564(0x180)],this['bitmap'][_0x52b564(0x96)](_0x27e84b,0x0,_0xbc139/0x2,_0xe22ba1,_0xbc139/0x2,'center');},Sprite_NewLabel[_0x56eb94(0x175)][_0x56eb94(0x192)]=function(){const _0x14722c=_0x56eb94,_0x34d2a2=VisuMZ[_0x14722c(0x91)][_0x14722c(0x1a2)][_0x14722c(0x32d)][_0x14722c(0x2ba)];return _0x34d2a2[_0x14722c(0x382)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x14722c(0x3cf)](_0x34d2a2);},Window_Base[_0x56eb94(0x175)]['drawItemName']=function(_0x57a629,_0x3d09f8,_0x54155b,_0x46ca6f){const _0x3a5fcd=_0x56eb94;if(_0x57a629){const _0x6bbf58=_0x54155b+(this['lineHeight']()-ImageManager['iconHeight'])/0x2,_0x1965bc=ImageManager[_0x3a5fcd(0x1b2)]+0x4,_0x47316b=Math[_0x3a5fcd(0xce)](0x0,_0x46ca6f-_0x1965bc);this[_0x3a5fcd(0x155)](ColorManager[_0x3a5fcd(0x23f)](_0x57a629)),this[_0x3a5fcd(0x36c)](_0x57a629['iconIndex'],_0x3d09f8,_0x6bbf58),this[_0x3a5fcd(0x96)](_0x57a629[_0x3a5fcd(0x2ed)],_0x3d09f8+_0x1965bc,_0x54155b,_0x47316b),this['resetTextColor']();}},Window_Base[_0x56eb94(0x175)][_0x56eb94(0x12c)]=function(_0x4b708d,_0x1bfb4,_0x24bd86,_0x5cbee4){const _0x58ebb6=_0x56eb94;if(this[_0x58ebb6(0x164)](_0x4b708d)){this[_0x58ebb6(0x3b0)]();const _0x4121be=VisuMZ['ItemsEquipsCore'][_0x58ebb6(0x1a2)][_0x58ebb6(0xef)],_0x12fbbc=_0x4121be['ItemQuantityFmt'],_0x127e61=_0x12fbbc[_0x58ebb6(0x3bd)]($gameParty[_0x58ebb6(0x1e2)](_0x4b708d));this[_0x58ebb6(0xdb)][_0x58ebb6(0xcf)]=_0x4121be[_0x58ebb6(0x162)],this[_0x58ebb6(0x96)](_0x127e61,_0x1bfb4,_0x24bd86,_0x5cbee4,_0x58ebb6(0x124)),this['resetFontSettings']();}},Window_Base[_0x56eb94(0x175)]['isDrawItemNumber']=function(_0x4467aa){if(DataManager['isKeyItem'](_0x4467aa))return $dataSystem['optKeyItemsNumber'];return!![];},Window_Base['prototype'][_0x56eb94(0x317)]=function(_0x27b1a2,_0x2e2c16,_0x120888,_0x50fda9,_0x11b77b){const _0x286bd1=_0x56eb94;_0x11b77b=Math['max'](_0x11b77b||0x1,0x1);while(_0x11b77b--){_0x50fda9=_0x50fda9||this[_0x286bd1(0x314)](),this[_0x286bd1(0x152)]['paintOpacity']=0xa0;const _0x4a49bb=ColorManager[_0x286bd1(0x14a)]();this[_0x286bd1(0x152)][_0x286bd1(0x377)](_0x27b1a2+0x1,_0x2e2c16+0x1,_0x120888-0x2,_0x50fda9-0x2,_0x4a49bb),this[_0x286bd1(0x152)][_0x286bd1(0x186)]=0xff;}},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x1c4)]=Window_Selectable['prototype']['initialize'],Window_Selectable[_0x56eb94(0x175)][_0x56eb94(0x3c0)]=function(_0x455b50){const _0x536bc0=_0x56eb94;this['initNewLabelSprites'](),VisuMZ[_0x536bc0(0x91)][_0x536bc0(0x1c4)][_0x536bc0(0xff)](this,_0x455b50);},Window_Selectable[_0x56eb94(0x175)][_0x56eb94(0x1f0)]=function(){const _0x498fd2=_0x56eb94;this[_0x498fd2(0xed)]={},this[_0x498fd2(0x1b0)]=0xff,this[_0x498fd2(0x28f)]=VisuMZ[_0x498fd2(0x91)]['Settings'][_0x498fd2(0x32d)][_0x498fd2(0x28a)],this['_newLabelOpacityUpperLimit']=VisuMZ['ItemsEquipsCore'][_0x498fd2(0x1a2)][_0x498fd2(0x32d)][_0x498fd2(0x184)];},Window_Selectable['prototype'][_0x56eb94(0x1df)]=function(){return![];},VisuMZ['ItemsEquipsCore']['Window_Selectable_setHelpWindowItem']=Window_Selectable[_0x56eb94(0x175)][_0x56eb94(0x331)],Window_Selectable[_0x56eb94(0x175)][_0x56eb94(0x331)]=function(_0x1557fa){const _0x1daca5=_0x56eb94;VisuMZ[_0x1daca5(0x91)][_0x1daca5(0x253)][_0x1daca5(0xff)](this,_0x1557fa);if(this[_0x1daca5(0x1df)]())this['clearNewLabelFromItem'](_0x1557fa);},Window_Selectable[_0x56eb94(0x175)][_0x56eb94(0x1fb)]=function(_0x55ec4b){const _0x4ab597=_0x56eb94;if(!_0x55ec4b)return;$gameParty[_0x4ab597(0x116)](_0x55ec4b);let _0x221aca='';if(DataManager[_0x4ab597(0x99)](_0x55ec4b))_0x221aca=_0x4ab597(0x1e8)[_0x4ab597(0x3bd)](_0x55ec4b['id']);else{if(DataManager[_0x4ab597(0x1b4)](_0x55ec4b))_0x221aca=_0x4ab597(0x2f1)[_0x4ab597(0x3bd)](_0x55ec4b['id']);else{if(DataManager['isArmor'](_0x55ec4b))_0x221aca=_0x4ab597(0x294)['format'](_0x55ec4b['id']);else return;}}const _0x11c8ab=this['_newLabelSprites'][_0x221aca];if(_0x11c8ab)_0x11c8ab['hide']();},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x2e1)]=Window_Selectable[_0x56eb94(0x175)][_0x56eb94(0x1e0)],Window_Selectable[_0x56eb94(0x175)][_0x56eb94(0x1e0)]=function(){const _0x432f92=_0x56eb94;this['hideNewLabelSprites'](),VisuMZ[_0x432f92(0x91)]['Window_Selectable_refresh'][_0x432f92(0xff)](this);},Window_Selectable[_0x56eb94(0x175)][_0x56eb94(0x161)]=function(){const _0x2e34c3=_0x56eb94;for(const _0x350917 of Object[_0x2e34c3(0x3c4)](this['_newLabelSprites'])){_0x350917['hide']();}},VisuMZ['ItemsEquipsCore']['Window_Selectable_update']=Window_Selectable[_0x56eb94(0x175)][_0x56eb94(0x30e)],Window_Selectable['prototype'][_0x56eb94(0x30e)]=function(){const _0x33aa8c=_0x56eb94;this['updateNewLabelOpacity'](),VisuMZ[_0x33aa8c(0x91)][_0x33aa8c(0x176)][_0x33aa8c(0xff)](this);},Window_Selectable[_0x56eb94(0x175)][_0x56eb94(0x174)]=function(){const _0x23fc4c=_0x56eb94;if(!this[_0x23fc4c(0x1df)]())return;const _0x37932c=this['_newLabelOpacityUpperLimit'];this[_0x23fc4c(0x1b0)]+=this[_0x23fc4c(0x28f)];(this[_0x23fc4c(0x1b0)]>=_0x37932c||this[_0x23fc4c(0x1b0)]<=0x0)&&(this[_0x23fc4c(0x28f)]*=-0x1);this['_newLabelOpacity']=this[_0x23fc4c(0x1b0)][_0x23fc4c(0x1a9)](0x0,_0x37932c);for(const _0x376a81 of Object[_0x23fc4c(0x3c4)](this[_0x23fc4c(0xed)])){_0x376a81[_0x23fc4c(0x282)]=this[_0x23fc4c(0x1b0)];}},Window_Selectable[_0x56eb94(0x175)][_0x56eb94(0x311)]=function(_0x41b81c){const _0x2510da=_0x56eb94,_0x238ab6=this[_0x2510da(0xed)];if(_0x238ab6[_0x41b81c])return _0x238ab6[_0x41b81c];else{const _0x36dd51=new Sprite_NewLabel();return _0x238ab6[_0x41b81c]=_0x36dd51,this[_0x2510da(0x223)](_0x36dd51),_0x36dd51;}},Window_Selectable['prototype']['placeNewLabel']=function(_0x12ffa5,_0x52500e,_0x15d6b4){const _0x1f8a46=_0x56eb94;let _0x14c3f0='';if(DataManager['isItem'](_0x12ffa5))_0x14c3f0=_0x1f8a46(0x1e8)[_0x1f8a46(0x3bd)](_0x12ffa5['id']);else{if(DataManager['isWeapon'](_0x12ffa5))_0x14c3f0=_0x1f8a46(0x2f1)['format'](_0x12ffa5['id']);else{if(DataManager[_0x1f8a46(0xb7)](_0x12ffa5))_0x14c3f0=_0x1f8a46(0x294)[_0x1f8a46(0x3bd)](_0x12ffa5['id']);else return;}}const _0x310c80=this[_0x1f8a46(0x311)](_0x14c3f0);_0x310c80['move'](_0x52500e,_0x15d6b4),_0x310c80[_0x1f8a46(0x1fd)](),_0x310c80[_0x1f8a46(0x282)]=this[_0x1f8a46(0x1b0)];},Window_ItemCategory['categoryList']=VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x1a2)]['Categories'][_0x56eb94(0x350)],Window_ItemCategory['categoryItemTypes']=[_0x56eb94(0x32b),_0x56eb94(0x254),_0x56eb94(0x257),_0x56eb94(0x361),_0x56eb94(0x2bd),'BattleUsable',_0x56eb94(0x2f3),'NeverUsable'],VisuMZ['ItemsEquipsCore'][_0x56eb94(0x3ad)]=Window_ItemCategory[_0x56eb94(0x175)]['initialize'],Window_ItemCategory[_0x56eb94(0x175)][_0x56eb94(0x3c0)]=function(_0xf0bbe1){const _0x154b53=_0x56eb94;VisuMZ[_0x154b53(0x91)][_0x154b53(0x3ad)]['call'](this,_0xf0bbe1),this['createCategoryNameWindow'](_0xf0bbe1);},Window_ItemCategory[_0x56eb94(0x175)][_0x56eb94(0x333)]=function(_0x4a43f0){const _0x1270b6=_0x56eb94,_0x4bfaf3=new Rectangle(0x0,0x0,_0x4a43f0[_0x1270b6(0x244)],_0x4a43f0[_0x1270b6(0x11b)]);this[_0x1270b6(0x1c0)]=new Window_Base(_0x4bfaf3),this[_0x1270b6(0x1c0)][_0x1270b6(0x282)]=0x0,this[_0x1270b6(0x228)](this[_0x1270b6(0x1c0)]),this[_0x1270b6(0xc7)]();},Window_ItemCategory[_0x56eb94(0x175)]['isUseModernControls']=function(){const _0x2ba608=_0x56eb94;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand['prototype']['isUseModernControls'][_0x2ba608(0xff)](this);},Window_ItemCategory['prototype'][_0x56eb94(0x118)]=function(){},Window_ItemCategory['prototype']['playOkSound']=function(){const _0x221670=_0x56eb94;if(!this[_0x221670(0x252)]())Window_HorzCommand[_0x221670(0x175)][_0x221670(0x3cd)]['call'](this);},Window_ItemCategory[_0x56eb94(0x175)][_0x56eb94(0x206)]=function(){const _0x4827be=_0x56eb94;return this[_0x4827be(0xfa)]?this['maxItems']():0x4;},Window_ItemCategory[_0x56eb94(0x175)]['update']=function(){const _0x430cd4=_0x56eb94;Window_HorzCommand[_0x430cd4(0x175)][_0x430cd4(0x30e)][_0x430cd4(0xff)](this),this['_itemWindow']&&this['_itemWindow'][_0x430cd4(0x233)](this[_0x430cd4(0x35b)]());},Window_ItemCategory[_0x56eb94(0x175)][_0x56eb94(0x267)]=function(){const _0x5d031c=_0x56eb94;if(this[_0x5d031c(0x21b)]()){const _0x26bdb5=this[_0x5d031c(0x2f4)]();if(this[_0x5d031c(0x172)]&&this['_itemWindow'][_0x5d031c(0x206)]()<=0x1)Input[_0x5d031c(0x2d5)]('right')&&this['cursorRight'](Input[_0x5d031c(0x3a2)](_0x5d031c(0x124))),Input[_0x5d031c(0x2d5)]('left')&&this['cursorLeft'](Input['isTriggered'](_0x5d031c(0x34a)));else this[_0x5d031c(0x172)]&&this['_itemWindow'][_0x5d031c(0x206)]()>0x1&&(Input[_0x5d031c(0x2d5)](_0x5d031c(0xbc))&&!Input[_0x5d031c(0x147)](_0x5d031c(0x197))&&this[_0x5d031c(0x1c2)](Input[_0x5d031c(0x3a2)](_0x5d031c(0xbc))),Input[_0x5d031c(0x2d5)](_0x5d031c(0x1ff))&&!Input[_0x5d031c(0x147)](_0x5d031c(0x197))&&this['cursorLeft'](Input[_0x5d031c(0x3a2)]('pageup')));this[_0x5d031c(0x2f4)]()!==_0x26bdb5&&this[_0x5d031c(0x386)]();}},Window_ItemCategory[_0x56eb94(0x175)][_0x56eb94(0xb2)]=function(){const _0x4ed273=_0x56eb94;if(this[_0x4ed273(0x252)]())return;Window_HorzCommand[_0x4ed273(0x175)]['processHandling']['call'](this);},Window_ItemCategory[_0x56eb94(0x175)][_0x56eb94(0x36b)]=function(){const _0x30214d=_0x56eb94;return this[_0x30214d(0x252)]()?![]:Window_HorzCommand[_0x30214d(0x175)][_0x30214d(0x36b)]['call'](this);},Window_ItemCategory[_0x56eb94(0x175)][_0x56eb94(0xf2)]=function(){const _0x32210e=_0x56eb94;if(this['isOpenAndActive']()){TouchInput[_0x32210e(0x3a2)]()&&this[_0x32210e(0x310)](!![]);if(TouchInput[_0x32210e(0x1de)]())this['onTouchOk']();else TouchInput[_0x32210e(0xbb)]()&&this['onTouchCancel']();}},Window_ItemCategory[_0x56eb94(0x175)][_0x56eb94(0x310)]=function(_0x2aee83){const _0x3f1422=_0x56eb94;this[_0x3f1422(0x252)]()?this[_0x3f1422(0x16c)](!![]):Window_HorzCommand[_0x3f1422(0x175)]['onTouchSelect'][_0x3f1422(0xff)](this,_0x2aee83);},Window_ItemCategory[_0x56eb94(0x175)][_0x56eb94(0x16c)]=function(_0xb3ff09){const _0x16eb5e=_0x56eb94;this[_0x16eb5e(0x220)]=![];if(this[_0x16eb5e(0x21b)]()){const _0x56ed21=this['index'](),_0x9567cd=this[_0x16eb5e(0x107)]();_0x9567cd>=0x0&&_0x9567cd!==this[_0x16eb5e(0x2f4)]()&&this[_0x16eb5e(0x323)](_0x9567cd),_0xb3ff09&&this[_0x16eb5e(0x2f4)]()!==_0x56ed21&&this[_0x16eb5e(0x386)]();}},Window_ItemCategory['prototype'][_0x56eb94(0x2eb)]=function(){const _0x43f68b=_0x56eb94;for(const _0x52e80d of Window_ItemCategory['categoryList']){this[_0x43f68b(0x9c)](_0x52e80d);}this[_0x43f68b(0x323)](this[_0x43f68b(0x2f4)]());},Window_ItemCategory['prototype'][_0x56eb94(0x9c)]=function(_0x533900){const _0x221002=_0x56eb94,_0x3e92d3=_0x533900['Type'],_0x204767=_0x533900[_0x221002(0x10c)],_0x4c2cfa=_0x533900['SwitchID']||0x0;if(_0x4c2cfa>0x0&&!$gameSwitches[_0x221002(0x17c)](_0x4c2cfa))return;let _0x5f593c='',_0x5cfd27=_0x221002(0x1b3),_0x3c69df=_0x3e92d3;if(_0x3e92d3['match'](/Category:(.*)/i))_0x5f593c=String(RegExp['$1'])[_0x221002(0x1a5)]();else{if(Window_ItemCategory[_0x221002(0x3d3)]['includes'](_0x3e92d3))_0x5f593c=VisuMZ[_0x221002(0x91)][_0x221002(0x1a2)]['Categories'][_0x3e92d3];else{if([_0x221002(0x299),_0x221002(0x381)][_0x221002(0x106)](_0x3e92d3))_0x5f593c=TextManager[_0x221002(0x1ae)];else{if(_0x3e92d3===_0x221002(0x95))_0x5f593c=TextManager[_0x221002(0x2e0)];else{if(_0x3e92d3===_0x221002(0x2d7))_0x5f593c=TextManager[_0x221002(0xa4)];else{if(_0x3e92d3===_0x221002(0x156))_0x5f593c=TextManager['armor'];else{if(_0x3e92d3[_0x221002(0x382)](/WTYPE:(\d+)/i))_0x5f593c=$dataSystem[_0x221002(0x2b3)][Number(RegExp['$1'])]||'';else{if(_0x3e92d3[_0x221002(0x382)](/ATYPE:(\d+)/i))_0x5f593c=$dataSystem[_0x221002(0x2ec)][Number(RegExp['$1'])]||'';else _0x3e92d3['match'](/ETYPE:(\d+)/i)&&(_0x5f593c=$dataSystem[_0x221002(0x328)][Number(RegExp['$1'])]||'');}}}}}}}_0x204767>0x0&&this['categoryStyle']()!==_0x221002(0x216)&&(_0x5f593c=_0x221002(0x2e9)[_0x221002(0x3bd)](_0x204767,_0x5f593c)),this['addCommand'](_0x5f593c,_0x5cfd27,!![],_0x3c69df);},Window_ItemCategory[_0x56eb94(0x175)][_0x56eb94(0x3bf)]=function(){const _0x6f34a2=_0x56eb94;return VisuMZ[_0x6f34a2(0x91)][_0x6f34a2(0x1a2)][_0x6f34a2(0x3c2)]['TextAlign'];},Window_ItemCategory[_0x56eb94(0x175)]['drawItem']=function(_0x3af812){const _0x5f41aa=_0x56eb94,_0x16b64d=this[_0x5f41aa(0x3be)](_0x3af812);if(_0x16b64d==='iconText')this['drawItemStyleIconText'](_0x3af812);else _0x16b64d===_0x5f41aa(0xa1)?this['drawItemStyleIcon'](_0x3af812):Window_HorzCommand[_0x5f41aa(0x175)]['drawItem']['call'](this,_0x3af812);},Window_ItemCategory[_0x56eb94(0x175)][_0x56eb94(0x2fc)]=function(){const _0x50e29c=_0x56eb94;return VisuMZ[_0x50e29c(0x91)][_0x50e29c(0x1a2)][_0x50e29c(0x3c2)][_0x50e29c(0x263)];},Window_ItemCategory[_0x56eb94(0x175)][_0x56eb94(0x3be)]=function(_0x5c6991){const _0xaf2aef=_0x56eb94;if(_0x5c6991<0x0)return'text';const _0x1df08d=this[_0xaf2aef(0x2fc)]();if(_0x1df08d!==_0xaf2aef(0x364))return _0x1df08d;else{const _0x30b5bf=this[_0xaf2aef(0x39a)](_0x5c6991);if(_0x30b5bf['match'](/\\I\[(\d+)\]/i)){const _0x1b9629=this[_0xaf2aef(0x247)](_0x5c6991),_0x18c369=this[_0xaf2aef(0x32f)](_0x30b5bf)[_0xaf2aef(0x244)];return _0x18c369<=_0x1b9629[_0xaf2aef(0x244)]?_0xaf2aef(0x2e3):'icon';}else return _0xaf2aef(0x216);}},Window_ItemCategory[_0x56eb94(0x175)][_0x56eb94(0x3aa)]=function(_0x3f4174){const _0x157be6=_0x56eb94,_0x185154=this['itemLineRect'](_0x3f4174),_0x2fcac1=this[_0x157be6(0x39a)](_0x3f4174),_0x1a3257=this[_0x157be6(0x32f)](_0x2fcac1)[_0x157be6(0x244)];this['changePaintOpacity'](this[_0x157be6(0x2fb)](_0x3f4174));const _0x42c1e3=this[_0x157be6(0x3bf)]();if(_0x42c1e3==='right')this['drawTextEx'](_0x2fcac1,_0x185154['x']+_0x185154[_0x157be6(0x244)]-_0x1a3257,_0x185154['y'],_0x1a3257);else{if(_0x42c1e3==='center'){const _0x51dcaf=_0x185154['x']+Math[_0x157be6(0x1a3)]((_0x185154['width']-_0x1a3257)/0x2);this['drawTextEx'](_0x2fcac1,_0x51dcaf,_0x185154['y'],_0x1a3257);}else this['drawTextEx'](_0x2fcac1,_0x185154['x'],_0x185154['y'],_0x1a3257);}},Window_ItemCategory[_0x56eb94(0x175)]['drawItemStyleIcon']=function(_0x2b7ad0){const _0x15bcd2=_0x56eb94,_0x4c9cac=this[_0x15bcd2(0x39a)](_0x2b7ad0);if(_0x4c9cac[_0x15bcd2(0x382)](/\\I\[(\d+)\]/i)){const _0x1a3824=Number(RegExp['$1'])||0x0,_0x3f5709=this[_0x15bcd2(0x247)](_0x2b7ad0),_0x3bb3c5=_0x3f5709['x']+Math[_0x15bcd2(0x1a3)]((_0x3f5709['width']-ImageManager[_0x15bcd2(0x1b2)])/0x2),_0xce9376=_0x3f5709['y']+(_0x3f5709[_0x15bcd2(0x11b)]-ImageManager[_0x15bcd2(0x2f2)])/0x2;this[_0x15bcd2(0x36c)](_0x1a3824,_0x3bb3c5,_0xce9376);}},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x20f)]=Window_ItemCategory['prototype']['setItemWindow'],Window_ItemCategory['prototype'][_0x56eb94(0x1db)]=function(_0x24fab3){const _0x3694e0=_0x56eb94;VisuMZ[_0x3694e0(0x91)][_0x3694e0(0x20f)][_0x3694e0(0xff)](this,_0x24fab3),_0x24fab3['_categoryWindow']=this;},Window_ItemCategory[_0x56eb94(0x175)]['callUpdateHelp']=function(){const _0x20f7e0=_0x56eb94;Window_HorzCommand['prototype']['callUpdateHelp'][_0x20f7e0(0xff)](this);if(this[_0x20f7e0(0x1c0)])this[_0x20f7e0(0xc7)]();},Window_ItemCategory['prototype'][_0x56eb94(0xc7)]=function(){const _0x176489=_0x56eb94,_0x3bb8de=this[_0x176489(0x1c0)];_0x3bb8de['contents'][_0x176489(0x398)]();const _0x10feba=this[_0x176489(0x3be)](this[_0x176489(0x2f4)]());if(_0x10feba===_0x176489(0xa1)){const _0x4b48af=this[_0x176489(0x247)](this[_0x176489(0x2f4)]());let _0x439b71=this['commandName'](this[_0x176489(0x2f4)]());_0x439b71=_0x439b71[_0x176489(0x203)](/\\I\[(\d+)\]/gi,''),_0x3bb8de['resetFontSettings'](),this['categoryNameWindowDrawBackground'](_0x439b71,_0x4b48af),this[_0x176489(0x28c)](_0x439b71,_0x4b48af),this[_0x176489(0x94)](_0x439b71,_0x4b48af);}},Window_ItemCategory[_0x56eb94(0x175)][_0x56eb94(0x1b1)]=function(_0x4a834d,_0x392323){},Window_ItemCategory['prototype'][_0x56eb94(0x28c)]=function(_0x53aa15,_0x97b6c9){const _0x4a393f=_0x56eb94,_0x554446=this['_categoryNameWindow'];_0x554446[_0x4a393f(0x96)](_0x53aa15,0x0,_0x97b6c9['y'],_0x554446[_0x4a393f(0x318)],'center');},Window_ItemCategory[_0x56eb94(0x175)][_0x56eb94(0x94)]=function(_0x12e4d9,_0xac3ed0){const _0x111238=_0x56eb94,_0x1cafc6=this[_0x111238(0x1c0)],_0x57d841=$gameSystem[_0x111238(0x375)](),_0x589833=_0xac3ed0['x']+Math[_0x111238(0x1a3)](_0xac3ed0[_0x111238(0x244)]/0x2)+_0x57d841;_0x1cafc6['x']=_0x1cafc6[_0x111238(0x244)]/-0x2+_0x589833,_0x1cafc6['y']=Math[_0x111238(0x1a3)](_0xac3ed0['height']/0x2);},Window_ItemList[_0x56eb94(0x175)]['processCursorMoveModernControls']=function(){const _0x36467c=_0x56eb94;if(this[_0x36467c(0x21b)]()){const _0x441dea=this[_0x36467c(0x2f4)]();if(this['maxCols']()<=0x1)!this[_0x36467c(0x17b)](_0x36467c(0xbc))&&Input[_0x36467c(0x3a2)]('pagedown')&&this['cursorPagedown'](),!this[_0x36467c(0x17b)]('pageup')&&Input['isTriggered'](_0x36467c(0x1ff))&&this[_0x36467c(0x321)]();else this['maxCols']()>0x1&&(Input['isRepeated']('right')&&this[_0x36467c(0x1c2)](Input[_0x36467c(0x3a2)](_0x36467c(0x124))),Input[_0x36467c(0x2d5)]('left')&&this['cursorLeft'](Input[_0x36467c(0x3a2)](_0x36467c(0x34a))),this[_0x36467c(0x355)]()?(Input[_0x36467c(0x3a2)](_0x36467c(0xbc))&&Input[_0x36467c(0x147)](_0x36467c(0x197))&&this['cursorPagedown'](),Input['isTriggered'](_0x36467c(0x1ff))&&Input[_0x36467c(0x147)]('shift')&&this[_0x36467c(0x321)]()):(Input[_0x36467c(0x3a2)](_0x36467c(0xbc))&&this['cursorPagedown'](),Input[_0x36467c(0x3a2)](_0x36467c(0x1ff))&&this[_0x36467c(0x321)]()));Input[_0x36467c(0x2d5)]('down')&&(Input[_0x36467c(0x147)]('shift')&&this[_0x36467c(0x17e)]()?this[_0x36467c(0xac)]():this['cursorDown'](Input['isTriggered'](_0x36467c(0x26a)))),Input[_0x36467c(0x2d5)]('up')&&(Input[_0x36467c(0x147)](_0x36467c(0x197))&&this['allowShiftScrolling']()?this[_0x36467c(0x321)]():this[_0x36467c(0x19f)](Input[_0x36467c(0x3a2)]('up'))),Imported[_0x36467c(0x24c)]&&this[_0x36467c(0x118)](),this[_0x36467c(0x2f4)]()!==_0x441dea&&this['playCursorSound']();}},Window_ItemList[_0x56eb94(0x175)][_0x56eb94(0x355)]=function(){const _0x21d7df=_0x56eb94,_0x110a50=SceneManager[_0x21d7df(0x28e)],_0x225a3c=[Scene_Item,Scene_Shop];return _0x225a3c[_0x21d7df(0x106)](_0x110a50[_0x21d7df(0x2d2)]);},Window_ItemList[_0x56eb94(0x175)][_0x56eb94(0x12f)]=function(){const _0x6b5128=_0x56eb94;Window_Selectable[_0x6b5128(0x175)]['activate'][_0x6b5128(0xff)](this),this[_0x6b5128(0x18e)]&&this[_0x6b5128(0x18e)]['isUseModernControls']()&&this['_categoryWindow'][_0x6b5128(0x12f)]();},Window_ItemList['prototype'][_0x56eb94(0x2ff)]=function(){const _0xaaa946=_0x56eb94;Window_Selectable[_0xaaa946(0x175)][_0xaaa946(0x2ff)][_0xaaa946(0xff)](this),this[_0xaaa946(0x18e)]&&this[_0xaaa946(0x18e)][_0xaaa946(0x252)]()&&this[_0xaaa946(0x18e)]['deactivate']();},Window_ItemList[_0x56eb94(0x175)][_0x56eb94(0x233)]=function(_0x150f16){const _0x31d5ee=_0x56eb94;this['_category']!==_0x150f16&&(this[_0x31d5ee(0x2a8)]=_0x150f16,this[_0x31d5ee(0x1e0)](),this['_categoryWindow']&&this[_0x31d5ee(0x18e)][_0x31d5ee(0x252)]()?this['smoothSelect'](0x0):this[_0x31d5ee(0x196)](0x0,0x0));},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x29c)]=Window_ItemList['prototype'][_0x56eb94(0x206)],Window_ItemList['prototype'][_0x56eb94(0x206)]=function(){const _0x453e49=_0x56eb94;if(SceneManager[_0x453e49(0x28e)][_0x453e49(0x2d2)]===Scene_Battle)return VisuMZ[_0x453e49(0x91)][_0x453e49(0x29c)][_0x453e49(0xff)](this);else return SceneManager[_0x453e49(0x28e)][_0x453e49(0x2d2)]===Scene_Map?VisuMZ[_0x453e49(0x91)]['Window_ItemList_maxCols']['call'](this):VisuMZ[_0x453e49(0x91)][_0x453e49(0x1a2)][_0x453e49(0xef)][_0x453e49(0x16d)];},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0xb8)]=Window_ItemList[_0x56eb94(0x175)][_0x56eb94(0x2e4)],Window_ItemList[_0x56eb94(0x175)][_0x56eb94(0x2e4)]=function(){const _0x10981b=_0x56eb94;return this[_0x10981b(0x206)]()<=0x1?Window_Selectable[_0x10981b(0x175)][_0x10981b(0x2e4)][_0x10981b(0xff)](this):VisuMZ[_0x10981b(0x91)][_0x10981b(0xb8)][_0x10981b(0xff)](this);},Window_ItemList['prototype'][_0x56eb94(0x106)]=function(_0x4880a6){const _0x5d31f8=_0x56eb94;switch(this[_0x5d31f8(0x2a8)]){case _0x5d31f8(0x299):return DataManager[_0x5d31f8(0x99)](_0x4880a6);case _0x5d31f8(0x381):return DataManager[_0x5d31f8(0x99)](_0x4880a6)&&_0x4880a6['itypeId']===0x1;case _0x5d31f8(0x95):return DataManager[_0x5d31f8(0x99)](_0x4880a6)&&_0x4880a6[_0x5d31f8(0x301)]===0x2;case _0x5d31f8(0x32b):return DataManager[_0x5d31f8(0x99)](_0x4880a6)&&_0x4880a6[_0x5d31f8(0x301)]===0x3;case _0x5d31f8(0x254):return DataManager[_0x5d31f8(0x99)](_0x4880a6)&&_0x4880a6[_0x5d31f8(0x301)]===0x4;case _0x5d31f8(0x361):return DataManager[_0x5d31f8(0x99)](_0x4880a6)&&_0x4880a6[_0x5d31f8(0x1f1)];case _0x5d31f8(0x257):return DataManager[_0x5d31f8(0x99)](_0x4880a6)&&!_0x4880a6[_0x5d31f8(0x1f1)];case _0x5d31f8(0x2bd):return DataManager[_0x5d31f8(0x99)](_0x4880a6)&&[0x0][_0x5d31f8(0x106)](_0x4880a6['occasion']);case _0x5d31f8(0x376):return DataManager[_0x5d31f8(0x99)](_0x4880a6)&&[0x0,0x1]['includes'](_0x4880a6[_0x5d31f8(0x260)]);case _0x5d31f8(0x2f3):return DataManager['isItem'](_0x4880a6)&&[0x0,0x2][_0x5d31f8(0x106)](_0x4880a6[_0x5d31f8(0x260)]);case'NeverUsable':return DataManager[_0x5d31f8(0x99)](_0x4880a6)&&[0x3]['includes'](_0x4880a6[_0x5d31f8(0x260)]);case _0x5d31f8(0x2d7):return DataManager[_0x5d31f8(0x1b4)](_0x4880a6);case'AllArmors':return DataManager[_0x5d31f8(0xb7)](_0x4880a6);default:if(this[_0x5d31f8(0x2a8)]['match'](/WTYPE:(\d+)/i))return DataManager[_0x5d31f8(0x1b4)](_0x4880a6)&&_0x4880a6[_0x5d31f8(0x38a)]===Number(RegExp['$1']);else{if(this[_0x5d31f8(0x2a8)][_0x5d31f8(0x382)](/WTYPE:(.*)/i)){const _0x260d57=$dataSystem['weaponTypes']['indexOf'](String(RegExp['$1'])['trim']());return DataManager['isWeapon'](_0x4880a6)&&_0x4880a6[_0x5d31f8(0x38a)]===_0x260d57;}else{if(this[_0x5d31f8(0x2a8)][_0x5d31f8(0x382)](/ATYPE:(\d+)/i))return DataManager[_0x5d31f8(0xb7)](_0x4880a6)&&_0x4880a6['atypeId']===Number(RegExp['$1']);else{if(this[_0x5d31f8(0x2a8)][_0x5d31f8(0x382)](/ATYPE:(.*)/i)){const _0x23204e=$dataSystem['armorTypes'][_0x5d31f8(0x32a)](String(RegExp['$1'])['trim']());return DataManager['isArmor'](_0x4880a6)&&_0x4880a6['atypeId']===_0x23204e;}else{if(this[_0x5d31f8(0x2a8)][_0x5d31f8(0x382)](/ETYPE:(\d+)/i))return!!_0x4880a6&&_0x4880a6['etypeId']===Number(RegExp['$1']);else{if(this[_0x5d31f8(0x2a8)]['match'](/ETYPE:(.*)/i)){const _0x5f5d50=$dataSystem[_0x5d31f8(0x328)]['indexOf'](String(RegExp['$1'])['trim']());return DataManager[_0x5d31f8(0xb7)](_0x4880a6)&&_0x4880a6[_0x5d31f8(0x339)]===_0x5f5d50;}else{if(this[_0x5d31f8(0x2a8)]['match'](/Category:(.*)/i))return!!_0x4880a6&&_0x4880a6[_0x5d31f8(0x29a)]['includes'](String(RegExp['$1'])[_0x5d31f8(0x3c7)]()[_0x5d31f8(0x1a5)]());}}}}}}}return![];},Window_ItemList['prototype'][_0x56eb94(0x1df)]=function(){return!![];},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x2fa)]=Window_ItemList[_0x56eb94(0x175)][_0x56eb94(0x2dc)],Window_ItemList[_0x56eb94(0x175)][_0x56eb94(0x2dc)]=function(_0x18fda0){const _0x2bd6de=_0x56eb94;VisuMZ[_0x2bd6de(0x91)][_0x2bd6de(0x2fa)]['call'](this,_0x18fda0),this[_0x2bd6de(0x240)](_0x18fda0);},Window_ItemList[_0x56eb94(0x175)]['drawItemNumber']=function(_0x2174b3,_0x563aee,_0x1be120,_0x407dca){const _0x1cbe27=_0x56eb94;Window_Selectable[_0x1cbe27(0x175)][_0x1cbe27(0x12c)][_0x1cbe27(0xff)](this,_0x2174b3,_0x563aee,_0x1be120,_0x407dca);},Window_ItemList[_0x56eb94(0x175)][_0x56eb94(0x240)]=function(_0x3d09be){const _0xc1a172=_0x56eb94,_0xd5149c=this[_0xc1a172(0x2a2)](_0x3d09be);if(!_0xd5149c||!this[_0xc1a172(0x1df)]())return;if(!$gameParty[_0xc1a172(0x219)](_0xd5149c))return;const _0x46ebcb=this[_0xc1a172(0x247)](_0x3d09be),_0x5e3c00=_0x46ebcb['x'],_0x3b8901=_0x46ebcb['y']+(this[_0xc1a172(0x314)]()-ImageManager[_0xc1a172(0x2f2)])/0x2,_0x5d4a33=VisuMZ[_0xc1a172(0x91)]['Settings'][_0xc1a172(0x32d)]['OffsetX'],_0x4f33c4=VisuMZ['ItemsEquipsCore'][_0xc1a172(0x1a2)]['New'][_0xc1a172(0x379)];this[_0xc1a172(0x26f)](_0xd5149c,_0x5e3c00+_0x5d4a33,_0x3b8901+_0x4f33c4);},Window_ItemList[_0x56eb94(0x175)][_0x56eb94(0x3b3)]=function(_0x28207f){const _0x5c6cfe=_0x56eb94;this[_0x5c6cfe(0x209)]=_0x28207f,this[_0x5c6cfe(0x211)]();},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x13f)]=Window_ItemList[_0x56eb94(0x175)]['updateHelp'],Window_ItemList[_0x56eb94(0x175)][_0x56eb94(0xd1)]=function(){const _0x2d7ed4=_0x56eb94;VisuMZ['ItemsEquipsCore'][_0x2d7ed4(0x13f)][_0x2d7ed4(0xff)](this),this[_0x2d7ed4(0x209)]&&this['_statusWindow'][_0x2d7ed4(0x2d2)]===Window_ShopStatus&&this[_0x2d7ed4(0x209)][_0x2d7ed4(0x14e)](this[_0x2d7ed4(0x1ae)]());},Window_BattleItem[_0x56eb94(0x175)][_0x56eb94(0x1be)]=function(_0x3a5773){const _0x5a87c8=_0x56eb94;return BattleManager[_0x5a87c8(0x207)]()?BattleManager[_0x5a87c8(0x207)]()[_0x5a87c8(0x285)](_0x3a5773):Window_ItemList['prototype'][_0x5a87c8(0x1be)][_0x5a87c8(0xff)](this,_0x3a5773);},Window_EventItem[_0x56eb94(0x175)][_0x56eb94(0x1df)]=function(){return![];},Window_EquipStatus['prototype'][_0x56eb94(0x1d2)]=function(){const _0x8dd0e1=_0x56eb94;return VisuMZ[_0x8dd0e1(0x91)][_0x8dd0e1(0x1a2)][_0x8dd0e1(0x15c)][_0x8dd0e1(0x3bc)];},VisuMZ[_0x56eb94(0x91)]['Window_EquipStatus_refresh']=Window_EquipStatus[_0x56eb94(0x175)][_0x56eb94(0x1e0)],Window_EquipStatus[_0x56eb94(0x175)][_0x56eb94(0x1e0)]=function(){const _0x54e016=_0x56eb94;this[_0x54e016(0x193)](),this[_0x54e016(0x3b0)]();if(this[_0x54e016(0x212)])this[_0x54e016(0x212)][_0x54e016(0x1e0)]();this[_0x54e016(0x1d2)]()?this[_0x54e016(0x271)]():VisuMZ[_0x54e016(0x91)][_0x54e016(0x1fc)][_0x54e016(0xff)](this);},Window_EquipStatus[_0x56eb94(0x175)]['prepareRefreshItemsEquipsCoreLayout']=function(){const _0x17f591=_0x56eb94;this[_0x17f591(0xdb)]['clear']();if(!this[_0x17f591(0x212)])return;if(this['isMainMenuCoreMenuImageOptionAvailable']()){const _0x12e468=ImageManager['loadPicture'](this[_0x17f591(0x212)][_0x17f591(0x329)]());_0x12e468[_0x17f591(0x188)](this[_0x17f591(0xe5)][_0x17f591(0x9a)](this));}else this[_0x17f591(0x33e)]();},Window_EquipStatus[_0x56eb94(0x175)][_0x56eb94(0x169)]=function(){const _0x18b915=_0x56eb94;return Imported[_0x18b915(0x391)]&&this['_actor'][_0x18b915(0x329)]()!==''&&VisuMZ[_0x18b915(0x91)][_0x18b915(0x1a2)][_0x18b915(0x15c)]['MenuPortraits'];},Window_EquipStatus['prototype'][_0x56eb94(0xe5)]=function(){const _0x4149b6=_0x56eb94;VisuMZ['ItemsEquipsCore'][_0x4149b6(0x1a2)][_0x4149b6(0x15c)][_0x4149b6(0x33c)][_0x4149b6(0xff)](this),this[_0x4149b6(0x352)]();},Window_EquipStatus[_0x56eb94(0x175)][_0x56eb94(0x33e)]=function(){const _0x5d63d5=_0x56eb94;VisuMZ[_0x5d63d5(0x91)]['Settings'][_0x5d63d5(0x15c)][_0x5d63d5(0x365)]['call'](this),this['drawParamsItemsEquipsCore']();},Window_EquipStatus[_0x56eb94(0x175)][_0x56eb94(0x352)]=function(){const _0xb12a21=_0x56eb94;this[_0xb12a21(0x3b0)](),VisuMZ['ItemsEquipsCore']['Settings'][_0xb12a21(0x15c)][_0xb12a21(0x2fd)][_0xb12a21(0xff)](this);},Window_EquipStatus[_0x56eb94(0x175)][_0x56eb94(0xe8)]=function(_0x2334ee,_0x23dc00,_0x3e85f4,_0x350bf8,_0x4a4ece){const _0x4351fb=_0x56eb94,_0xe7510b=ImageManager[_0x4351fb(0x10d)](_0x2334ee['getMenuImage']()),_0x325b34=this[_0x4351fb(0x318)]-_0xe7510b['width'];_0x23dc00+=_0x325b34/0x2;if(_0x325b34<0x0)_0x350bf8-=_0x325b34;Window_StatusBase['prototype'][_0x4351fb(0xe8)][_0x4351fb(0xff)](this,_0x2334ee,_0x23dc00,_0x3e85f4,_0x350bf8,_0x4a4ece);},Window_EquipStatus[_0x56eb94(0x175)]['actorParams']=function(){const _0x1eb452=_0x56eb94;return Imported[_0x1eb452(0x24c)]?VisuMZ['CoreEngine'][_0x1eb452(0x1a2)][_0x1eb452(0xa2)]['ExtDisplayedParams']:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x56eb94(0x175)][_0x56eb94(0x27f)]=function(){const _0x1f2f11=_0x56eb94;return VisuMZ[_0x1f2f11(0x91)][_0x1f2f11(0x1a2)]['EquipScene'][_0x1f2f11(0x133)];},Window_EquipStatus['prototype']['isUseParamNamesWithIcons']=function(){const _0x1ffc16=_0x56eb94;return Imported['VisuMZ_0_CoreEngine']&&VisuMZ[_0x1ffc16(0x2de)][_0x1ffc16(0x1a2)][_0x1ffc16(0xa2)][_0x1ffc16(0x36d)];},Window_EquipStatus[_0x56eb94(0x175)][_0x56eb94(0x2c4)]=function(_0x1e869c,_0x5c00a6,_0x5e2dff,_0x33d72f){const _0x2ff527=_0x56eb94,_0x3c5b70=this['itemPadding']();Imported[_0x2ff527(0x24c)]?this['drawParamText'](_0x5c00a6+_0x3c5b70,_0x5e2dff,_0x33d72f,_0x1e869c,![]):this[_0x2ff527(0x96)](TextManager[_0x2ff527(0xfc)](_0x1e869c),_0x5c00a6+_0x3c5b70,_0x5e2dff,_0x33d72f);},Window_EquipStatus[_0x56eb94(0x175)][_0x56eb94(0x20b)]=function(_0x3932bb,_0xa25ddc,_0x12375d,_0xbd9d12){const _0x284da4=_0x56eb94,_0x98188=this[_0x284da4(0x183)]();let _0x1f5440=0x0;Imported[_0x284da4(0x24c)]?_0x1f5440=this[_0x284da4(0x212)][_0x284da4(0x1ba)](_0x3932bb,!![]):_0x1f5440=this['_actor'][_0x284da4(0xfc)](_0x3932bb);const _0x2ff655=_0x1f5440;this[_0x284da4(0x96)](_0x1f5440,_0xa25ddc,_0x12375d,_0xbd9d12-_0x98188,'right');},Window_EquipStatus['prototype'][_0x56eb94(0x37f)]=function(_0x40794d,_0x1f188e,_0x461c4b,_0x521dda){const _0x3fa45d=_0x56eb94,_0xc049b0=this['itemPadding']();let _0x54b3b1=0x0,_0x1b3879=0x0,_0x3db4cf='';if(this[_0x3fa45d(0x330)]){Imported['VisuMZ_0_CoreEngine']?(_0x54b3b1=this[_0x3fa45d(0x212)][_0x3fa45d(0x1ba)](_0x40794d,![]),_0x1b3879=this[_0x3fa45d(0x330)]['paramValueByName'](_0x40794d,![]),_0x3db4cf=this['_tempActor'][_0x3fa45d(0x1ba)](_0x40794d,!![])):(_0x54b3b1=this[_0x3fa45d(0x212)][_0x3fa45d(0xfc)](_0x40794d),_0x1b3879=this[_0x3fa45d(0x330)][_0x3fa45d(0xfc)](_0x40794d),_0x3db4cf=this[_0x3fa45d(0x330)][_0x3fa45d(0xfc)](_0x40794d));const _0x278e20=_0x54b3b1,_0x4f65d7=_0x1b3879;diffValue=_0x4f65d7-_0x278e20,this[_0x3fa45d(0x155)](ColorManager['paramchangeTextColor'](diffValue)),this[_0x3fa45d(0x96)](_0x3db4cf,_0x1f188e,_0x461c4b,_0x521dda-_0xc049b0,_0x3fa45d(0x124));}},Window_EquipStatus['prototype'][_0x56eb94(0xe4)]=function(_0x3fbeb3,_0x56697a,_0x3bbd97,_0x540ee3){const _0x51faa7=_0x56eb94,_0x5a0267=this[_0x51faa7(0x183)]();let _0xcf2bdd=0x0,_0xb2d382=0x0,_0xa97f66=![];if(this['_tempActor']){Imported[_0x51faa7(0x24c)]?(_0xcf2bdd=this[_0x51faa7(0x212)][_0x51faa7(0x1ba)](_0x3fbeb3,![]),_0xb2d382=this[_0x51faa7(0x330)][_0x51faa7(0x1ba)](_0x3fbeb3,![]),_0xa97f66=String(this[_0x51faa7(0x212)][_0x51faa7(0x1ba)](_0x3fbeb3,!![]))[_0x51faa7(0x382)](/([%％])/i)):(_0xcf2bdd=this['_actor'][_0x51faa7(0xfc)](_0x3fbeb3),_0xb2d382=this[_0x51faa7(0x330)][_0x51faa7(0xfc)](_0x3fbeb3),_0xa97f66=_0xcf2bdd%0x1!==0x0||_0xb2d382%0x1!==0x0);const _0x1c7674=_0xcf2bdd,_0x35a252=_0xb2d382,_0x33b2b1=_0x35a252-_0x1c7674;let _0x1323c4=_0x33b2b1;if(_0xa97f66)_0x1323c4=Math[_0x51faa7(0xc8)](_0x33b2b1*0x64)+'%';_0x33b2b1!==0x0&&(this[_0x51faa7(0x155)](ColorManager[_0x51faa7(0x20d)](_0x33b2b1)),_0x1323c4=(_0x33b2b1>0x0?'(+%1)':_0x51faa7(0x275))[_0x51faa7(0x3bd)](_0x1323c4),this[_0x51faa7(0x96)](_0x1323c4,_0x56697a+_0x5a0267,_0x3bbd97,_0x540ee3,'left'));}},Window_EquipStatus[_0x56eb94(0x175)][_0x56eb94(0x317)]=function(_0x430359,_0x324949,_0x9967e5,_0x2d4439,_0x57c527){const _0x4299d9=_0x56eb94;if(VisuMZ[_0x4299d9(0x91)][_0x4299d9(0x1a2)][_0x4299d9(0x15c)]['DrawBackRect']===![])return;_0x57c527=Math[_0x4299d9(0xce)](_0x57c527||0x1,0x1);while(_0x57c527--){_0x2d4439=_0x2d4439||this[_0x4299d9(0x314)](),this[_0x4299d9(0xdb)][_0x4299d9(0x186)]=0xa0;const _0x2abc88=ColorManager[_0x4299d9(0x2ab)]();this['contents'][_0x4299d9(0x377)](_0x430359+0x1,_0x324949+0x1,_0x9967e5-0x2,_0x2d4439-0x2,_0x2abc88),this[_0x4299d9(0xdb)]['paintOpacity']=0xff;}},ColorManager[_0x56eb94(0x2ab)]=function(){const _0x5d2a13=_0x56eb94,_0x1f438b=VisuMZ[_0x5d2a13(0x91)][_0x5d2a13(0x1a2)][_0x5d2a13(0x15c)];let _0x17bf7e=_0x1f438b[_0x5d2a13(0x293)]!==undefined?_0x1f438b['BackRectColor']:0x13;return ColorManager[_0x5d2a13(0x26b)](_0x17bf7e);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x21a)]=Window_EquipCommand['prototype'][_0x56eb94(0x3c0)],Window_EquipCommand['prototype'][_0x56eb94(0x3c0)]=function(_0x50da54){const _0x3d5c32=_0x56eb94;VisuMZ[_0x3d5c32(0x91)][_0x3d5c32(0x21a)]['call'](this,_0x50da54),this[_0x3d5c32(0x26c)](_0x50da54);},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0x26c)]=function(_0x6bf0d9){const _0x4aca63=_0x56eb94,_0x560be6=new Rectangle(0x0,0x0,_0x6bf0d9['width'],_0x6bf0d9[_0x4aca63(0x11b)]);this[_0x4aca63(0x369)]=new Window_Base(_0x560be6),this['_commandNameWindow'][_0x4aca63(0x282)]=0x0,this[_0x4aca63(0x228)](this[_0x4aca63(0x369)]),this[_0x4aca63(0xa5)]();},Window_EquipCommand[_0x56eb94(0x175)]['callUpdateHelp']=function(){const _0xba4e40=_0x56eb94;Window_HorzCommand[_0xba4e40(0x175)][_0xba4e40(0x211)]['call'](this);if(this['_commandNameWindow'])this[_0xba4e40(0xa5)]();},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0xa5)]=function(){const _0x506cc5=_0x56eb94,_0x53765f=this[_0x506cc5(0x369)];_0x53765f['contents'][_0x506cc5(0x398)]();const _0x495b3c=this['commandStyleCheck'](this[_0x506cc5(0x2f4)]());if(_0x495b3c===_0x506cc5(0xa1)){const _0x45239b=this[_0x506cc5(0x247)](this[_0x506cc5(0x2f4)]());let _0x4f3f0b=this[_0x506cc5(0x39a)](this[_0x506cc5(0x2f4)]());_0x4f3f0b=_0x4f3f0b[_0x506cc5(0x203)](/\\I\[(\d+)\]/gi,''),_0x53765f[_0x506cc5(0x3b0)](),this['commandNameWindowDrawBackground'](_0x4f3f0b,_0x45239b),this[_0x506cc5(0x1f5)](_0x4f3f0b,_0x45239b),this['commandNameWindowCenter'](_0x4f3f0b,_0x45239b);}},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0x343)]=function(_0x1d4fa5,_0x50c22f){},Window_EquipCommand['prototype'][_0x56eb94(0x1f5)]=function(_0x55986f,_0x567c6b){const _0x41cc48=_0x56eb94,_0x28180c=this['_commandNameWindow'];_0x28180c[_0x41cc48(0x96)](_0x55986f,0x0,_0x567c6b['y'],_0x28180c[_0x41cc48(0x318)],_0x41cc48(0xd2));},Window_EquipCommand[_0x56eb94(0x175)]['commandNameWindowCenter']=function(_0x46bf3c,_0x58d0e4){const _0x1e6a89=_0x56eb94,_0x1502c1=this['_commandNameWindow'],_0x49c30d=$gameSystem['windowPadding'](),_0x5a4945=_0x58d0e4['x']+Math[_0x1e6a89(0x1a3)](_0x58d0e4[_0x1e6a89(0x244)]/0x2)+_0x49c30d;_0x1502c1['x']=_0x1502c1[_0x1e6a89(0x244)]/-0x2+_0x5a4945,_0x1502c1['y']=Math[_0x1e6a89(0x1a3)](_0x58d0e4['height']/0x2);},Window_EquipCommand[_0x56eb94(0x175)]['isUseModernControls']=function(){const _0x274478=_0x56eb94;return Imported[_0x274478(0x24c)]&&Window_HorzCommand[_0x274478(0x175)][_0x274478(0x252)][_0x274478(0xff)](this);},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0x3cd)]=function(){const _0x5cc2c7=_0x56eb94;if(this[_0x5cc2c7(0xb9)]()==='equip')Window_HorzCommand[_0x5cc2c7(0x175)]['playOkSound'][_0x5cc2c7(0xff)](this);},Window_EquipCommand['prototype']['processCursorMoveModernControls']=function(){const _0x3c2978=_0x56eb94;!this[_0x3c2978(0x27d)]()&&Window_HorzCommand[_0x3c2978(0x175)][_0x3c2978(0x267)]['call'](this);},Window_EquipCommand['prototype'][_0x56eb94(0x27d)]=function(){const _0x5f14d9=_0x56eb94;if(!this[_0x5f14d9(0x21b)]())return![];if(SceneManager['_scene']['constructor']!==Scene_Equip)return![];return Input['isTriggered'](_0x5f14d9(0x26a))&&(this[_0x5f14d9(0x386)](),SceneManager['_scene'][_0x5f14d9(0x256)](),SceneManager['_scene'][_0x5f14d9(0xc0)]['smoothSelect'](-0x1)),![];},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0x206)]=function(){const _0x264512=_0x56eb94;return this[_0x264512(0xfa)]?this[_0x264512(0xfa)][_0x264512(0x25c)]:0x3;},Window_EquipCommand[_0x56eb94(0x175)]['processTouchModernControls']=function(){const _0x1db5cf=_0x56eb94;if(this[_0x1db5cf(0xb0)]()&&this[_0x1db5cf(0x35c)]&&SceneManager[_0x1db5cf(0x28e)][_0x1db5cf(0x2d2)]===Scene_Equip){if(this[_0x1db5cf(0x36b)]()&&TouchInput[_0x1db5cf(0x1fe)]())this[_0x1db5cf(0x1ad)](![]);else TouchInput[_0x1db5cf(0x3a2)]()&&this[_0x1db5cf(0x1ad)](!![]);if(TouchInput[_0x1db5cf(0x1de)]())this[_0x1db5cf(0x2bb)]();else TouchInput[_0x1db5cf(0xbb)]()&&this[_0x1db5cf(0x370)]();}},Window_EquipCommand['prototype']['onTouchSelectModernControls']=function(_0x700961){const _0x71d253=_0x56eb94;this[_0x71d253(0x220)]=![];const _0x58efbb=this['index'](),_0x5f40b2=this[_0x71d253(0x107)](),_0x588b80=SceneManager[_0x71d253(0x28e)][_0x71d253(0xc0)];if(_0x588b80[_0x71d253(0xb0)]()&&_0x588b80[_0x71d253(0x35c)]){if(_0x5f40b2>=0x0)_0x5f40b2===this[_0x71d253(0x2f4)]()&&(this['_doubleTouch']=!![]),this[_0x71d253(0x12f)](),this['select'](_0x5f40b2);else _0x588b80[_0x71d253(0x107)]()>=0x0&&(this[_0x71d253(0x2ff)](),this[_0x71d253(0x326)]());}_0x700961&&this[_0x71d253(0x2f4)]()!==_0x58efbb&&this['playCursorSound']();},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0x2eb)]=function(){const _0x187898=_0x56eb94;this[_0x187898(0x313)](),this[_0x187898(0x121)](),this[_0x187898(0x33a)]();},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0x1e0)]=function(){const _0x36e4ba=_0x56eb94;Window_HorzCommand[_0x36e4ba(0x175)][_0x36e4ba(0x1e0)][_0x36e4ba(0xff)](this),this[_0x36e4ba(0xa9)]();},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0x313)]=function(){const _0x3a36b5=_0x56eb94;if(!this[_0x3a36b5(0x35f)]())return;const _0x21be40=this['commandStyle'](),_0x18d523=VisuMZ[_0x3a36b5(0x91)][_0x3a36b5(0x1a2)]['EquipScene'][_0x3a36b5(0x378)],_0x5a1535=_0x21be40==='text'?TextManager[_0x3a36b5(0x93)]:'\x5cI[%1]%2'[_0x3a36b5(0x3bd)](_0x18d523,TextManager[_0x3a36b5(0x93)]),_0x4cb9b5=this['isEquipCommandEnabled']();this[_0x3a36b5(0x344)](_0x5a1535,_0x3a36b5(0x2be),_0x4cb9b5);},Window_EquipCommand[_0x56eb94(0x175)]['isEquipCommandAdded']=function(){return!this['isUseModernControls']();},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0x324)]=function(){return!![];},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0x121)]=function(){const _0x214296=_0x56eb94;if(!this[_0x214296(0x153)]())return;const _0x322fb0=this[_0x214296(0x3b8)](),_0x5bb065=VisuMZ['ItemsEquipsCore']['Settings'][_0x214296(0x15c)]['CmdIconOptimize'],_0x44fc47=_0x322fb0===_0x214296(0x216)?TextManager[_0x214296(0x2c7)]:_0x214296(0x2e9)['format'](_0x5bb065,TextManager[_0x214296(0x2c7)]),_0x3b11e5=this['isOptimizeCommandEnabled']();this['addCommand'](_0x44fc47,_0x214296(0x2c7),_0x3b11e5);},Window_EquipCommand['prototype'][_0x56eb94(0x153)]=function(){const _0x558ea8=_0x56eb94;return VisuMZ[_0x558ea8(0x91)][_0x558ea8(0x1a2)][_0x558ea8(0x15c)][_0x558ea8(0x38c)];},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0x2aa)]=function(){return!![];},Window_EquipCommand[_0x56eb94(0x175)]['addClearCommand']=function(){const _0x309f16=_0x56eb94;if(!this[_0x309f16(0x358)]())return;const _0x58044a=this[_0x309f16(0x3b8)](),_0x25063d=VisuMZ[_0x309f16(0x91)]['Settings']['EquipScene'][_0x309f16(0x1f4)],_0x338c48=_0x58044a==='text'?TextManager[_0x309f16(0x398)]:'\x5cI[%1]%2'[_0x309f16(0x3bd)](_0x25063d,TextManager['clear']),_0x4080a1=this[_0x309f16(0x110)]();this[_0x309f16(0x344)](_0x338c48,_0x309f16(0x398),_0x4080a1);},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0x358)]=function(){const _0x592900=_0x56eb94;return VisuMZ[_0x592900(0x91)][_0x592900(0x1a2)][_0x592900(0x15c)][_0x592900(0x2e8)];},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0x110)]=function(){return!![];},Window_EquipCommand['prototype']['itemTextAlign']=function(){const _0x1e8261=_0x56eb94;return VisuMZ[_0x1e8261(0x91)][_0x1e8261(0x1a2)][_0x1e8261(0x15c)][_0x1e8261(0x173)];},Window_EquipCommand[_0x56eb94(0x175)]['drawItem']=function(_0x17d860){const _0x13d7ed=_0x56eb94,_0x3870ad=this[_0x13d7ed(0x144)](_0x17d860);if(_0x3870ad==='iconText')this[_0x13d7ed(0x3aa)](_0x17d860);else _0x3870ad===_0x13d7ed(0xa1)?this[_0x13d7ed(0x1ed)](_0x17d860):Window_HorzCommand[_0x13d7ed(0x175)][_0x13d7ed(0x2dc)][_0x13d7ed(0xff)](this,_0x17d860);},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0x3b8)]=function(){const _0x544857=_0x56eb94;return VisuMZ[_0x544857(0x91)][_0x544857(0x1a2)]['EquipScene'][_0x544857(0x210)];},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0x144)]=function(_0x2e145e){const _0x5f5857=_0x56eb94;if(_0x2e145e<0x0)return _0x5f5857(0x216);const _0x2e3a56=this['commandStyle']();if(_0x2e3a56!==_0x5f5857(0x364))return _0x2e3a56;else{if(this[_0x5f5857(0x178)]()>0x0){const _0x1766d6=this[_0x5f5857(0x39a)](_0x2e145e);if(_0x1766d6[_0x5f5857(0x382)](/\\I\[(\d+)\]/i)){const _0x1edf75=this[_0x5f5857(0x247)](_0x2e145e),_0x3dde42=this[_0x5f5857(0x32f)](_0x1766d6)[_0x5f5857(0x244)];return _0x3dde42<=_0x1edf75[_0x5f5857(0x244)]?_0x5f5857(0x2e3):_0x5f5857(0xa1);}}}return _0x5f5857(0x216);},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0x3aa)]=function(_0x314d2d){const _0x4f2a2f=_0x56eb94,_0x24ada7=this[_0x4f2a2f(0x247)](_0x314d2d),_0x2e4ad5=this[_0x4f2a2f(0x39a)](_0x314d2d),_0x117353=this[_0x4f2a2f(0x32f)](_0x2e4ad5)['width'];this[_0x4f2a2f(0x248)](this['isCommandEnabled'](_0x314d2d));const _0x585eb1=this['itemTextAlign']();if(_0x585eb1==='right')this['drawTextEx'](_0x2e4ad5,_0x24ada7['x']+_0x24ada7[_0x4f2a2f(0x244)]-_0x117353,_0x24ada7['y'],_0x117353);else{if(_0x585eb1===_0x4f2a2f(0xd2)){const _0x112bcd=_0x24ada7['x']+Math[_0x4f2a2f(0x1a3)]((_0x24ada7[_0x4f2a2f(0x244)]-_0x117353)/0x2);this[_0x4f2a2f(0x35e)](_0x2e4ad5,_0x112bcd,_0x24ada7['y'],_0x117353);}else this[_0x4f2a2f(0x35e)](_0x2e4ad5,_0x24ada7['x'],_0x24ada7['y'],_0x117353);}},Window_EquipCommand[_0x56eb94(0x175)][_0x56eb94(0x1ed)]=function(_0xae9828){const _0x4fdde9=_0x56eb94;this[_0x4fdde9(0x39a)](_0xae9828)[_0x4fdde9(0x382)](/\\I\[(\d+)\]/i);const _0x1145b2=Number(RegExp['$1'])||0x0,_0x5224e1=this[_0x4fdde9(0x247)](_0xae9828),_0x2cdf85=_0x5224e1['x']+Math[_0x4fdde9(0x1a3)]((_0x5224e1['width']-ImageManager[_0x4fdde9(0x1b2)])/0x2),_0x3efa3c=_0x5224e1['y']+(_0x5224e1['height']-ImageManager['iconHeight'])/0x2;this[_0x4fdde9(0x36c)](_0x1145b2,_0x2cdf85,_0x3efa3c);},Window_EquipSlot[_0x56eb94(0x175)][_0x56eb94(0x252)]=function(){const _0x2db8a5=_0x56eb94;return Imported[_0x2db8a5(0x24c)]&&Window_HorzCommand['prototype'][_0x2db8a5(0x252)][_0x2db8a5(0xff)](this);},Window_EquipSlot[_0x56eb94(0x175)]['activate']=function(){const _0x8e5ce8=_0x56eb94;Window_StatusBase[_0x8e5ce8(0x175)][_0x8e5ce8(0x12f)]['call'](this),this[_0x8e5ce8(0x211)]();},Window_EquipSlot[_0x56eb94(0x175)][_0x56eb94(0x251)]=function(){const _0x2f520c=_0x56eb94;Window_StatusBase[_0x2f520c(0x175)][_0x2f520c(0x251)]['call'](this),this[_0x2f520c(0xad)]();},Window_EquipSlot[_0x56eb94(0x175)][_0x56eb94(0xad)]=function(){const _0x2550da=_0x56eb94;if(!this[_0x2550da(0x12a)]())return;if(Input[_0x2550da(0x3a2)](_0x2550da(0x197))&&this[_0x2550da(0x1ae)]()){const _0x1980ac=SceneManager[_0x2550da(0x28e)][_0x2550da(0x212)];_0x1980ac&&(this[_0x2550da(0x23a)](this[_0x2550da(0x2f4)]())?(this[_0x2550da(0x39f)](),this[_0x2550da(0xd1)]()):this[_0x2550da(0x119)]());}},Window_EquipSlot[_0x56eb94(0x175)][_0x56eb94(0x23a)]=function(_0x16c550){const _0x261c97=_0x56eb94,_0x32ae21=SceneManager[_0x261c97(0x28e)][_0x261c97(0x212)];if(!_0x32ae21)return;if(!_0x32ae21[_0x261c97(0x3cc)](this[_0x261c97(0x2f4)]()))return![];const _0x1dfdae=_0x32ae21['equipSlots']()[this['index']()];if(_0x32ae21[_0x261c97(0x20e)]()[_0x261c97(0x106)](_0x1dfdae))return![];return!![];;},Window_EquipSlot['prototype'][_0x56eb94(0x39f)]=function(){const _0x3da18e=_0x56eb94;SoundManager[_0x3da18e(0x140)]();const _0x19a757=SceneManager[_0x3da18e(0x28e)][_0x3da18e(0x212)];_0x19a757[_0x3da18e(0x332)](this[_0x3da18e(0x2f4)](),null),this[_0x3da18e(0x1e0)](),this[_0x3da18e(0x172)][_0x3da18e(0x1e0)](),this[_0x3da18e(0x211)]();const _0x343f93=SceneManager['_scene'][_0x3da18e(0x209)];if(_0x343f93)_0x343f93[_0x3da18e(0x1e0)]();},Window_EquipSlot[_0x56eb94(0x175)][_0x56eb94(0x12a)]=function(){const _0x39aec4=_0x56eb94;if(!this[_0x39aec4(0x363)])return![];if(!VisuMZ[_0x39aec4(0x91)]['Settings']['EquipScene'][_0x39aec4(0x1e9)])return![];return!![];},Window_EquipSlot[_0x56eb94(0x175)]['processCursorMoveModernControls']=function(){const _0x359152=_0x56eb94;!this[_0x359152(0x27d)]()&&Window_StatusBase[_0x359152(0x175)][_0x359152(0x267)][_0x359152(0xff)](this);},Window_EquipSlot[_0x56eb94(0x175)][_0x56eb94(0x27d)]=function(){const _0x49d7b2=_0x56eb94;if(!this['isCursorMovable']())return![];if(SceneManager[_0x49d7b2(0x28e)][_0x49d7b2(0x2d2)]!==Scene_Equip)return![];if(this[_0x49d7b2(0x2c6)]())return this[_0x49d7b2(0x386)](),Input['clear'](),SceneManager[_0x49d7b2(0x28e)][_0x49d7b2(0x2c1)](),![];else{if(Input[_0x49d7b2(0x2d5)](_0x49d7b2(0x26a))){const _0x53e72e=this[_0x49d7b2(0x2f4)]();return Input[_0x49d7b2(0x147)]('shift')?this[_0x49d7b2(0xac)]():this['cursorDown'](Input['isTriggered']('down')),this[_0x49d7b2(0x2f4)]()!==_0x53e72e&&this[_0x49d7b2(0x386)](),!![];}else{if(this[_0x49d7b2(0x113)]()&&Input[_0x49d7b2(0x3a2)](_0x49d7b2(0x197)))return!![];}}return![];},Window_EquipSlot[_0x56eb94(0x175)]['allowCommandWindowCursorUp']=function(){const _0x1c0309=_0x56eb94;if(this['index']()!==0x0)return![];const _0x1acf41=VisuMZ[_0x1c0309(0x91)][_0x1c0309(0x1a2)][_0x1c0309(0x15c)];if(!_0x1acf41[_0x1c0309(0x38c)]&&!_0x1acf41['CommandAddClear'])return![];return Input[_0x1c0309(0x3a2)]('up');},Window_EquipSlot['prototype'][_0x56eb94(0x113)]=function(){const _0x2948a4=_0x56eb94;return VisuMZ['ItemsEquipsCore'][_0x2948a4(0x1a2)][_0x2948a4(0x15c)][_0x2948a4(0x1e9)];},Window_EquipSlot[_0x56eb94(0x175)][_0x56eb94(0xf2)]=function(){const _0x18546d=_0x56eb94;if(this[_0x18546d(0xb0)]()&&this[_0x18546d(0x35c)]&&SceneManager[_0x18546d(0x28e)][_0x18546d(0x2d2)]===Scene_Equip){if(this[_0x18546d(0x36b)]()&&TouchInput[_0x18546d(0x1fe)]())this[_0x18546d(0x1ad)](![]);else TouchInput[_0x18546d(0x3a2)]()&&this[_0x18546d(0x1ad)](!![]);if(TouchInput['isClicked']())this['onTouchOk']();else TouchInput['isCancelled']()&&this[_0x18546d(0x370)]();}},Window_EquipSlot[_0x56eb94(0x175)][_0x56eb94(0x1ad)]=function(_0x316404){const _0x37c822=_0x56eb94;this[_0x37c822(0x220)]=![];const _0x1e0e07=this[_0x37c822(0x2f4)](),_0x343445=this['hitIndex'](),_0x2e34c1=SceneManager[_0x37c822(0x28e)][_0x37c822(0x149)];if(_0x2e34c1['isOpen']()&&_0x2e34c1[_0x37c822(0x35c)]){if(_0x343445>=0x0)_0x343445===this['index']()&&(this['_doubleTouch']=!![]),this[_0x37c822(0x12f)](),this[_0x37c822(0x323)](_0x343445);else _0x2e34c1[_0x37c822(0x107)]()>=0x0&&(this[_0x37c822(0x2ff)](),this['deselect']());}_0x316404&&this[_0x37c822(0x2f4)]()!==_0x1e0e07&&this[_0x37c822(0x386)]();},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x21c)]=Window_EquipItem['prototype'][_0x56eb94(0x106)],Window_EquipItem[_0x56eb94(0x175)][_0x56eb94(0x106)]=function(_0x3722b4){const _0x25fbc1=_0x56eb94;return _0x3722b4===null&&this[_0x25fbc1(0x20e)]()[_0x25fbc1(0x106)](this['etypeId']())?this[_0x25fbc1(0x2c2)][_0x25fbc1(0x25c)]>0x0?![]:!![]:VisuMZ[_0x25fbc1(0x91)]['Window_EquipItem_includes'][_0x25fbc1(0xff)](this,_0x3722b4);},VisuMZ['ItemsEquipsCore'][_0x56eb94(0x139)]=Window_EquipItem[_0x56eb94(0x175)][_0x56eb94(0x1be)],Window_EquipItem[_0x56eb94(0x175)]['isEnabled']=function(_0x5ec612){const _0x240613=_0x56eb94;return!_0x5ec612&&this[_0x240613(0x20e)]()[_0x240613(0x106)](this[_0x240613(0x339)]())?![]:VisuMZ[_0x240613(0x91)][_0x240613(0x139)][_0x240613(0xff)](this,_0x5ec612);},Window_EquipItem[_0x56eb94(0x175)][_0x56eb94(0x20e)]=function(){const _0x3586ba=_0x56eb94;return VisuMZ['ItemsEquipsCore'][_0x3586ba(0x1a2)][_0x3586ba(0x15c)][_0x3586ba(0xb5)];},Window_EquipItem[_0x56eb94(0x175)][_0x56eb94(0x2dc)]=function(_0x5a937b){const _0xd8021=_0x56eb94,_0x4a5427=this['itemAt'](_0x5a937b);_0x4a5427?Window_ItemList['prototype']['drawItem'][_0xd8021(0xff)](this,_0x5a937b):this[_0xd8021(0x128)](_0x5a937b);},Window_EquipItem[_0x56eb94(0x175)][_0x56eb94(0x128)]=function(_0x32cc90){const _0x48dda8=_0x56eb94;this['changePaintOpacity'](this[_0x48dda8(0x1be)](null));const _0x1e9c18=VisuMZ[_0x48dda8(0x91)]['Settings']['EquipScene'],_0x2e3afc=this[_0x48dda8(0x247)](_0x32cc90),_0x5a18d8=_0x2e3afc['y']+(this[_0x48dda8(0x314)]()-ImageManager[_0x48dda8(0x2f2)])/0x2,_0x249fa6=ImageManager[_0x48dda8(0x1b2)]+0x4,_0x7fa2a4=Math[_0x48dda8(0xce)](0x0,_0x2e3afc[_0x48dda8(0x244)]-_0x249fa6);this[_0x48dda8(0x198)](),this[_0x48dda8(0x36c)](_0x1e9c18[_0x48dda8(0x38f)],_0x2e3afc['x'],_0x5a18d8),this[_0x48dda8(0x96)](_0x1e9c18['RemoveEquipText'],_0x2e3afc['x']+_0x249fa6,_0x2e3afc['y'],_0x7fa2a4),this[_0x48dda8(0x248)](!![]);},Window_EquipItem['prototype'][_0x56eb94(0xd1)]=function(){const _0x1a123c=_0x56eb94;Window_ItemList[_0x1a123c(0x175)][_0x1a123c(0xd1)]['call'](this);if(this['_actor']&&this[_0x1a123c(0x209)]&&this['_slotId']>=0x0){const _0x24be56=JsonEx['makeDeepCopy'](this['_actor']);_0x24be56[_0x1a123c(0x330)]=!![],_0x24be56['forceChangeEquip'](this['_slotId'],this['item']()),this[_0x1a123c(0x209)]['setTempActor'](_0x24be56);}},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x309)]=Window_ShopCommand[_0x56eb94(0x175)][_0x56eb94(0x3c0)],Window_ShopCommand[_0x56eb94(0x175)][_0x56eb94(0x3c0)]=function(_0x21f6ea){const _0x217c7a=_0x56eb94;VisuMZ[_0x217c7a(0x91)][_0x217c7a(0x309)][_0x217c7a(0xff)](this,_0x21f6ea),this[_0x217c7a(0x26c)](_0x21f6ea);},Window_ShopCommand['prototype'][_0x56eb94(0x26c)]=function(_0x387410){const _0x54c87f=_0x56eb94,_0x16df0b=new Rectangle(0x0,0x0,_0x387410[_0x54c87f(0x244)],_0x387410[_0x54c87f(0x11b)]);this[_0x54c87f(0x369)]=new Window_Base(_0x16df0b),this['_commandNameWindow']['opacity']=0x0,this[_0x54c87f(0x228)](this[_0x54c87f(0x369)]),this['updateCommandNameWindow']();},Window_ShopCommand['prototype']['callUpdateHelp']=function(){const _0x3144f5=_0x56eb94;Window_HorzCommand[_0x3144f5(0x175)][_0x3144f5(0x211)][_0x3144f5(0xff)](this);if(this[_0x3144f5(0x369)])this[_0x3144f5(0xa5)]();},Window_ShopCommand['prototype'][_0x56eb94(0xa5)]=function(){const _0x1ce6d6=_0x56eb94,_0x3271c9=this[_0x1ce6d6(0x369)];_0x3271c9[_0x1ce6d6(0xdb)][_0x1ce6d6(0x398)]();const _0x2a3338=this[_0x1ce6d6(0x144)](this[_0x1ce6d6(0x2f4)]());if(_0x2a3338===_0x1ce6d6(0xa1)){const _0x5d4bb5=this[_0x1ce6d6(0x247)](this[_0x1ce6d6(0x2f4)]());let _0x520f01=this[_0x1ce6d6(0x39a)](this[_0x1ce6d6(0x2f4)]());_0x520f01=_0x520f01['replace'](/\\I\[(\d+)\]/gi,''),_0x3271c9[_0x1ce6d6(0x3b0)](),this[_0x1ce6d6(0x343)](_0x520f01,_0x5d4bb5),this['commandNameWindowDrawText'](_0x520f01,_0x5d4bb5),this[_0x1ce6d6(0x16e)](_0x520f01,_0x5d4bb5);}},Window_ShopCommand[_0x56eb94(0x175)][_0x56eb94(0x343)]=function(_0x281dc0,_0x473f27){},Window_ShopCommand[_0x56eb94(0x175)]['commandNameWindowDrawText']=function(_0x48f618,_0x284fa5){const _0x3abb75=_0x56eb94,_0x51a4ec=this[_0x3abb75(0x369)];_0x51a4ec[_0x3abb75(0x96)](_0x48f618,0x0,_0x284fa5['y'],_0x51a4ec[_0x3abb75(0x318)],_0x3abb75(0xd2));},Window_ShopCommand[_0x56eb94(0x175)]['commandNameWindowCenter']=function(_0x27866f,_0x38efec){const _0x25c1e3=_0x56eb94,_0x2c635b=this[_0x25c1e3(0x369)],_0x54b082=$gameSystem['windowPadding'](),_0x16a486=_0x38efec['x']+Math[_0x25c1e3(0x1a3)](_0x38efec['width']/0x2)+_0x54b082;_0x2c635b['x']=_0x2c635b['width']/-0x2+_0x16a486,_0x2c635b['y']=Math[_0x25c1e3(0x1a3)](_0x38efec['height']/0x2);},Window_ShopCommand[_0x56eb94(0x175)][_0x56eb94(0x206)]=function(){const _0x445e9b=_0x56eb94;return this['_list']?this[_0x445e9b(0xfa)][_0x445e9b(0x25c)]:0x3;},Window_ShopCommand[_0x56eb94(0x175)]['hideDisabledCommands']=function(){const _0x19fdca=_0x56eb94;return VisuMZ[_0x19fdca(0x91)][_0x19fdca(0x1a2)]['ShopScene'][_0x19fdca(0x226)];},Window_ShopCommand['prototype']['makeCommandList']=function(){const _0x1fce56=_0x56eb94;this[_0x1fce56(0xaf)](),this[_0x1fce56(0x2a5)](),this[_0x1fce56(0x24d)]();},Window_ShopCommand[_0x56eb94(0x175)][_0x56eb94(0x1e0)]=function(){const _0x48b784=_0x56eb94;Window_HorzCommand[_0x48b784(0x175)]['refresh'][_0x48b784(0xff)](this),this[_0x48b784(0xa9)]();},Window_ShopCommand['prototype']['addBuyCommand']=function(){const _0x4f8b1f=_0x56eb94,_0x5e2dd0=this[_0x4f8b1f(0x3b8)](),_0x58b26c=VisuMZ[_0x4f8b1f(0x91)][_0x4f8b1f(0x1a2)][_0x4f8b1f(0x396)]['CmdIconBuy'],_0x181743=_0x5e2dd0===_0x4f8b1f(0x216)?TextManager[_0x4f8b1f(0x3c6)]:_0x4f8b1f(0x2e9)[_0x4f8b1f(0x3bd)](_0x58b26c,TextManager[_0x4f8b1f(0x3c6)]),_0x4ac938=this[_0x4f8b1f(0x34d)]();if(this[_0x4f8b1f(0x29b)]()&&!_0x4ac938)return;this[_0x4f8b1f(0x344)](_0x181743,_0x4f8b1f(0x3c6),_0x4ac938);},Window_ShopCommand['prototype']['isBuyCommandEnabled']=function(){const _0x42d5ae=_0x56eb94;return SceneManager['_scene'][_0x42d5ae(0x2d2)]===Scene_Shop?SceneManager[_0x42d5ae(0x28e)][_0x42d5ae(0x22e)]>0x0:!![];},Window_ShopCommand[_0x56eb94(0x175)][_0x56eb94(0x2a5)]=function(){const _0x3d9589=_0x56eb94,_0x2bbae0=this[_0x3d9589(0x3b8)](),_0x1d3548=VisuMZ[_0x3d9589(0x91)][_0x3d9589(0x1a2)]['ShopScene'][_0x3d9589(0x262)],_0x13a591=_0x2bbae0===_0x3d9589(0x216)?TextManager[_0x3d9589(0x1f2)]:_0x3d9589(0x2e9)[_0x3d9589(0x3bd)](_0x1d3548,TextManager[_0x3d9589(0x1f2)]),_0x1812f3=this[_0x3d9589(0x1d6)]();if(this[_0x3d9589(0x29b)]()&&!_0x1812f3)return;this[_0x3d9589(0x344)](_0x13a591,'sell',_0x1812f3);},Window_ShopCommand[_0x56eb94(0x175)]['isSellCommandEnabled']=function(){const _0x2ea393=_0x56eb94;return!this[_0x2ea393(0x31b)];},Window_ShopCommand['prototype'][_0x56eb94(0x24d)]=function(){const _0x174234=_0x56eb94,_0x4b42ae=this[_0x174234(0x3b8)](),_0x2f4bbb=VisuMZ[_0x174234(0x91)][_0x174234(0x1a2)]['ShopScene'][_0x174234(0x130)],_0x5398e2=VisuMZ[_0x174234(0x91)]['Settings'][_0x174234(0x396)][_0x174234(0x17f)],_0x517419=_0x4b42ae===_0x174234(0x216)?_0x5398e2:_0x174234(0x2e9)[_0x174234(0x3bd)](_0x2f4bbb,_0x5398e2);this['addCommand'](_0x517419,_0x174234(0x3d2));},Window_ShopCommand[_0x56eb94(0x175)][_0x56eb94(0x3bf)]=function(){return VisuMZ['ItemsEquipsCore']['Settings']['ShopScene']['CmdTextAlign'];},Window_ShopCommand['prototype'][_0x56eb94(0x2dc)]=function(_0x43f6cf){const _0xb5d069=_0x56eb94,_0x1363d8=this[_0xb5d069(0x144)](_0x43f6cf);if(_0x1363d8===_0xb5d069(0x2e3))this[_0xb5d069(0x3aa)](_0x43f6cf);else _0x1363d8===_0xb5d069(0xa1)?this[_0xb5d069(0x1ed)](_0x43f6cf):Window_HorzCommand[_0xb5d069(0x175)][_0xb5d069(0x2dc)]['call'](this,_0x43f6cf);},Window_ShopCommand[_0x56eb94(0x175)][_0x56eb94(0x3b8)]=function(){const _0x584e0b=_0x56eb94;return VisuMZ[_0x584e0b(0x91)]['Settings'][_0x584e0b(0x396)][_0x584e0b(0x210)];},Window_ShopCommand[_0x56eb94(0x175)][_0x56eb94(0x144)]=function(_0x347e07){const _0x24b6a8=_0x56eb94;if(_0x347e07<0x0)return'text';const _0x1feb9c=this[_0x24b6a8(0x3b8)]();if(_0x1feb9c!=='auto')return _0x1feb9c;else{if(this[_0x24b6a8(0x178)]()>0x0){const _0x1f5842=this[_0x24b6a8(0x39a)](_0x347e07);if(_0x1f5842[_0x24b6a8(0x382)](/\\I\[(\d+)\]/i)){const _0x324a5f=this[_0x24b6a8(0x247)](_0x347e07),_0xf54b8a=this['textSizeEx'](_0x1f5842)[_0x24b6a8(0x244)];return _0xf54b8a<=_0x324a5f[_0x24b6a8(0x244)]?'iconText':_0x24b6a8(0xa1);}}}return'text';},Window_ShopCommand[_0x56eb94(0x175)][_0x56eb94(0x3aa)]=function(_0x584e43){const _0x5351c2=_0x56eb94,_0x23ea9a=this[_0x5351c2(0x247)](_0x584e43),_0xd4c62c=this['commandName'](_0x584e43),_0x50fb2f=this['textSizeEx'](_0xd4c62c)[_0x5351c2(0x244)];this[_0x5351c2(0x248)](this[_0x5351c2(0x2fb)](_0x584e43));const _0x26f0ce=this[_0x5351c2(0x3bf)]();if(_0x26f0ce===_0x5351c2(0x124))this[_0x5351c2(0x35e)](_0xd4c62c,_0x23ea9a['x']+_0x23ea9a[_0x5351c2(0x244)]-_0x50fb2f,_0x23ea9a['y'],_0x50fb2f);else{if(_0x26f0ce===_0x5351c2(0xd2)){const _0x54eef2=_0x23ea9a['x']+Math['floor']((_0x23ea9a['width']-_0x50fb2f)/0x2);this[_0x5351c2(0x35e)](_0xd4c62c,_0x54eef2,_0x23ea9a['y'],_0x50fb2f);}else this[_0x5351c2(0x35e)](_0xd4c62c,_0x23ea9a['x'],_0x23ea9a['y'],_0x50fb2f);}},Window_ShopCommand['prototype'][_0x56eb94(0x1ed)]=function(_0x4561ac){const _0x4ca74a=_0x56eb94;this[_0x4ca74a(0x39a)](_0x4561ac)[_0x4ca74a(0x382)](/\\I\[(\d+)\]/i);const _0x58b0e2=Number(RegExp['$1'])||0x0,_0x5c9467=this['itemLineRect'](_0x4561ac),_0x2785b5=_0x5c9467['x']+Math[_0x4ca74a(0x1a3)]((_0x5c9467['width']-ImageManager[_0x4ca74a(0x1b2)])/0x2),_0x41b643=_0x5c9467['y']+(_0x5c9467[_0x4ca74a(0x11b)]-ImageManager[_0x4ca74a(0x2f2)])/0x2;this['drawIcon'](_0x58b0e2,_0x2785b5,_0x41b643);},VisuMZ[_0x56eb94(0x91)][_0x56eb94(0x284)]=Window_ShopBuy['prototype'][_0x56eb94(0x1e0)],Window_ShopBuy[_0x56eb94(0x175)][_0x56eb94(0x1e0)]=function(){const _0x4302c3=_0x56eb94;this[_0x4302c3(0x292)](),VisuMZ[_0x4302c3(0x91)][_0x4302c3(0x284)]['call'](this);},Window_ShopBuy[_0x56eb94(0x175)][_0x56eb94(0x292)]=function(){const _0x2a03e7=_0x56eb94;SceneManager[_0x2a03e7(0x28e)][_0x2a03e7(0x2d2)]===Scene_Shop&&(this[_0x2a03e7(0x160)]=SceneManager[_0x2a03e7(0x28e)][_0x2a03e7(0x1e6)]());},VisuMZ[_0x56eb94(0x91)]['Window_ShopBuy_price']=Window_ShopBuy['prototype'][_0x56eb94(0x28d)],Window_ShopBuy[_0x56eb94(0x175)][_0x56eb94(0x28d)]=function(_0x268e8d){const _0x4f80cf=_0x56eb94;if(!_0x268e8d)return 0x0;const _0x408fe9=VisuMZ[_0x4f80cf(0x91)][_0x4f80cf(0x2af)]['call'](this,_0x268e8d);return this[_0x4f80cf(0x348)](_0x268e8d,_0x408fe9);},Window_ShopBuy[_0x56eb94(0x175)][_0x56eb94(0x348)]=function(_0x2a9649,_0x5a0d18){const _0xa16b98=_0x56eb94,_0x214dc0=_0x2a9649[_0xa16b98(0x278)];if(_0x214dc0[_0xa16b98(0x382)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x2dac0b=String(RegExp['$1']);try{eval(_0x2dac0b);}catch(_0x501dea){if($gameTemp['isPlaytest']())console[_0xa16b98(0x126)](_0x501dea);}}_0x5a0d18=VisuMZ[_0xa16b98(0x91)][_0xa16b98(0x1a2)]['ShopScene'][_0xa16b98(0x189)][_0xa16b98(0xff)](this,_0x2a9649,_0x5a0d18);if(isNaN(_0x5a0d18))_0x5a0d18=0x0;return Math[_0xa16b98(0x1a3)](_0x5a0d18);},Window_ShopBuy[_0x56eb94(0x175)]['drawItem']=function(_0x301b65){const _0x5f2843=_0x56eb94;this[_0x5f2843(0x3b0)]();const _0x5a9804=this[_0x5f2843(0x2a2)](_0x301b65),_0x35fad8=this[_0x5f2843(0x247)](_0x301b65),_0x234654=_0x35fad8[_0x5f2843(0x244)];this['changePaintOpacity'](this[_0x5f2843(0x1be)](_0x5a9804)),this[_0x5f2843(0x90)](_0x5a9804,_0x35fad8['x'],_0x35fad8['y'],_0x234654),this['drawItemCost'](_0x5a9804,_0x35fad8),this[_0x5f2843(0x248)](!![]);},Window_ShopBuy[_0x56eb94(0x175)]['drawItemCost']=function(_0x163066,_0x52b621){const _0x49bc0c=_0x56eb94,_0x42669f=this[_0x49bc0c(0x28d)](_0x163066);this[_0x49bc0c(0xcb)](_0x42669f,TextManager[_0x49bc0c(0x19b)],_0x52b621['x'],_0x52b621['y'],_0x52b621[_0x49bc0c(0x244)]);},Window_ShopSell['prototype'][_0x56eb94(0x206)]=function(){const _0x5a3e61=_0x56eb94;return SceneManager[_0x5a3e61(0x28e)][_0x5a3e61(0x1d2)]()?0x1:0x2;},VisuMZ[_0x56eb94(0x91)]['Window_ShopSell_isEnabled']=Window_ShopSell[_0x56eb94(0x175)][_0x56eb94(0x1be)],Window_ShopSell[_0x56eb94(0x175)]['isEnabled']=function(_0x45c0f2){const _0x3351a6=_0x56eb94;if(!_0x45c0f2)return![];const _0x2d6620=_0x45c0f2[_0x3351a6(0x278)];if(_0x2d6620[_0x3351a6(0x382)](/<CANNOT SELL>/i))return![];if(_0x2d6620[_0x3351a6(0x382)](/<CAN SELL>/i))return!![];if(_0x2d6620[_0x3351a6(0x382)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x25c510=JSON['parse']('['+RegExp['$1'][_0x3351a6(0x382)](/\d+/g)+']');for(const _0x2eabe5 of _0x25c510){if(!$gameSwitches[_0x3351a6(0x17c)](_0x2eabe5))return![];}}if(_0x2d6620[_0x3351a6(0x382)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x29371b=JSON[_0x3351a6(0xf9)]('['+RegExp['$1'][_0x3351a6(0x382)](/\d+/g)+']');for(const _0x43ce13 of _0x29371b){if(!$gameSwitches[_0x3351a6(0x17c)](_0x43ce13))return![];}}if(_0x2d6620['match'](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xc888ad=JSON[_0x3351a6(0xf9)]('['+RegExp['$1'][_0x3351a6(0x382)](/\d+/g)+']');for(const _0x51fb95 of _0xc888ad){if($gameSwitches[_0x3351a6(0x17c)](_0x51fb95))return![];}}return VisuMZ['ItemsEquipsCore'][_0x3351a6(0x18c)][_0x3351a6(0xff)](this,_0x45c0f2);},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x191)]=function(){return![];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x390)]=function(){const _0x64b1c9=_0x56eb94;Window_StatusBase[_0x64b1c9(0x175)][_0x64b1c9(0x390)]['call'](this);for(const _0x19f912 of $gameParty[_0x64b1c9(0x306)]()){ImageManager[_0x64b1c9(0x3c5)](_0x19f912[_0x64b1c9(0x322)]());}},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0xb1)]=function(){const _0x282853=_0x56eb94;return VisuMZ['ItemsEquipsCore'][_0x282853(0x1a2)][_0x282853(0x2b6)][_0x282853(0xea)];},Window_ShopStatus['prototype']['refresh']=function(){const _0x49c1a0=_0x56eb94;this[_0x49c1a0(0xdb)][_0x49c1a0(0x398)](),this[_0x49c1a0(0x152)][_0x49c1a0(0x398)](),this[_0x49c1a0(0xd7)]&&(this[_0x49c1a0(0x3b0)](),this['changePaintOpacity'](!![]),this[_0x49c1a0(0x14d)](),this['isEquipItem']()?this[_0x49c1a0(0x24a)]():this[_0x49c1a0(0x3a3)]());},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x213)]=function(_0xdfae72,_0x104c5c){const _0x534254=_0x56eb94;if(!this['isEquipItem']()&&!DataManager['isItem'](this[_0x534254(0xd7)]))return;const _0x425f40=this[_0x534254(0x318)]-this[_0x534254(0x183)]()-_0xdfae72,_0x431a31=this[_0x534254(0xe3)](_0x534254(0xdd));this[_0x534254(0x155)](ColorManager['systemColor']()),this[_0x534254(0x96)](TextManager['possession'],_0xdfae72+this[_0x534254(0x183)](),_0x104c5c,_0x425f40-_0x431a31),this[_0x534254(0x198)](),this['drawItemNumber'](this[_0x534254(0xd7)],_0xdfae72,_0x104c5c,_0x425f40);},Window_ShopStatus['prototype'][_0x56eb94(0x317)]=function(_0x170a33,_0x1313c7,_0xb90afd,_0x5e1c76,_0x80d9a2){const _0x29217f=_0x56eb94;if(VisuMZ[_0x29217f(0x91)][_0x29217f(0x1a2)][_0x29217f(0x2b6)][_0x29217f(0x12b)]===![])return;_0x80d9a2=Math[_0x29217f(0xce)](_0x80d9a2||0x1,0x1);while(_0x80d9a2--){_0x5e1c76=_0x5e1c76||this[_0x29217f(0x314)](),this[_0x29217f(0x152)][_0x29217f(0x186)]=0xa0;const _0x2d3863=ColorManager['getItemsEquipsCoreBackColor1']();this[_0x29217f(0x152)][_0x29217f(0x377)](_0x170a33+0x1,_0x1313c7+0x1,_0xb90afd-0x2,_0x5e1c76-0x2,_0x2d3863),this[_0x29217f(0x152)][_0x29217f(0x186)]=0xff;}},ColorManager['getItemsEquipsCoreBackColor1']=function(){const _0x4d199a=_0x56eb94,_0x984432=VisuMZ[_0x4d199a(0x91)]['Settings'][_0x4d199a(0x2b6)];let _0x94107c=_0x984432[_0x4d199a(0x293)]!==undefined?_0x984432[_0x4d199a(0x293)]:0x13;return ColorManager[_0x4d199a(0x26b)](_0x94107c);},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x24a)]=function(){const _0x123188=_0x56eb94;VisuMZ['ItemsEquipsCore'][_0x123188(0x1a2)][_0x123188(0x2b6)][_0x123188(0xa0)][_0x123188(0xff)](this);},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x351)]=function(_0x35a137,_0xff4fd9,_0x4e40b0){const _0x150e76=_0x56eb94;if(!this[_0x150e76(0x28b)]())return![];const _0x340d38=$dataSystem[_0x150e76(0x328)][this[_0x150e76(0xd7)][_0x150e76(0x339)]];return this['drawItemKeyData'](_0x340d38,_0x35a137,_0xff4fd9,_0x4e40b0,!![]),this[_0x150e76(0x317)](_0x35a137,_0xff4fd9,_0x4e40b0),this[_0x150e76(0x3b0)](),!![];},Window_ShopStatus['prototype'][_0x56eb94(0x1b9)]=function(){const _0x49dba2=_0x56eb94,_0x1bbe16=VisuMZ['ItemsEquipsCore'][_0x49dba2(0x1a2)]['ItemScene'][_0x49dba2(0x23e)];return _0x1bbe16[_0x49dba2(0x3bd)]($gameParty[_0x49dba2(0x1e2)](this[_0x49dba2(0xd7)]));},Window_ShopStatus[_0x56eb94(0x175)]['actorParams']=function(){const _0xb463e3=_0x56eb94;return Imported[_0xb463e3(0x24c)]?VisuMZ[_0xb463e3(0x2de)][_0xb463e3(0x1a2)]['Param']['ExtDisplayedParams']:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ShopStatus[_0x56eb94(0x175)]['smallParamFontSize']=function(){const _0x2ca9bf=_0x56eb94;return VisuMZ[_0x2ca9bf(0x91)][_0x2ca9bf(0x1a2)][_0x2ca9bf(0x2b6)][_0x2ca9bf(0x22d)];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x2cb)]=function(_0x58839e,_0x522a7f,_0x5ca5ba,_0x413fbb){const _0x37c717=_0x56eb94;this[_0x37c717(0x3b0)](),this[_0x37c717(0xdb)]['fontSize']=this[_0x37c717(0x316)]();let _0x459bbf=this['textWidth'](TextManager['param'](_0x58839e))+0x4+_0x522a7f;return Imported[_0x37c717(0x24c)]?(this[_0x37c717(0x1a1)](_0x522a7f,_0x5ca5ba,_0x413fbb,_0x58839e,!![]),VisuMZ[_0x37c717(0x2de)][_0x37c717(0x1a2)][_0x37c717(0xa2)][_0x37c717(0x36d)]&&(_0x459bbf+=ImageManager[_0x37c717(0x1b2)]+0x4)):(this['changeTextColor'](ColorManager[_0x37c717(0x154)]()),this[_0x37c717(0x96)](TextManager[_0x37c717(0xfc)](_0x58839e),_0x522a7f,_0x5ca5ba,_0x413fbb)),this[_0x37c717(0x3b0)](),_0x459bbf;},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x16a)]=function(_0x52c37,_0x17453a,_0x4965eb,_0x1da74e,_0x3b8d8d){const _0xb0e420=_0x56eb94;_0x4965eb+=this[_0xb0e420(0x183)](),_0x3b8d8d-=this[_0xb0e420(0x183)]()*0x2;const _0x5d22c3=VisuMZ[_0xb0e420(0x91)][_0xb0e420(0x1a2)][_0xb0e420(0x2b6)];this[_0xb0e420(0xdb)][_0xb0e420(0xcf)]=_0x5d22c3['ParamChangeFontSize'],this['changePaintOpacity'](_0x52c37[_0xb0e420(0x9e)](this[_0xb0e420(0xd7)]));if(_0x52c37[_0xb0e420(0x303)](this[_0xb0e420(0xd7)])){const _0x222cc0=_0x5d22c3['AlreadyEquipMarker'];this[_0xb0e420(0x96)](_0x222cc0,_0x4965eb,_0x1da74e,_0x3b8d8d,_0xb0e420(0xd2));}else{if(_0x52c37[_0xb0e420(0x9e)](this[_0xb0e420(0xd7)])){const _0x4030f5=this[_0xb0e420(0x167)](_0x52c37,this[_0xb0e420(0xd7)][_0xb0e420(0x339)]),_0x26e964=JsonEx['makeDeepCopy'](_0x52c37);_0x26e964[_0xb0e420(0x330)]=!![];const _0x3b6b57=_0x26e964['equipSlots']()[_0xb0e420(0x32a)](this[_0xb0e420(0xd7)][_0xb0e420(0x339)]);if(_0x3b6b57>=0x0)_0x26e964[_0xb0e420(0x22f)](_0x3b6b57,this[_0xb0e420(0xd7)]);let _0x1f48a8=0x0,_0x5cbb83=0x0,_0x2364c7=0x0;Imported[_0xb0e420(0x24c)]?(_0x1f48a8=_0x26e964[_0xb0e420(0x1ba)](_0x17453a),_0x5cbb83=_0x1f48a8-_0x52c37[_0xb0e420(0x1ba)](_0x17453a),this[_0xb0e420(0x155)](ColorManager[_0xb0e420(0x20d)](_0x5cbb83)),_0x2364c7=(_0x5cbb83>=0x0?'+':'')+VisuMZ['ConvertNumberToString'](_0x5cbb83,0x0,_0x17453a)):(_0x1f48a8=_0x26e964['param'](_0x17453a),_0x5cbb83=_0x1f48a8-_0x52c37[_0xb0e420(0xfc)](_0x17453a),this[_0xb0e420(0x155)](ColorManager[_0xb0e420(0x20d)](_0x5cbb83)),_0x2364c7=(_0x5cbb83>=0x0?'+':'')+_0x5cbb83);if(_0x2364c7==='+0')_0x2364c7=_0x5d22c3['NoChangeMarker'];this['drawText'](_0x2364c7,_0x4965eb,_0x1da74e,_0x3b8d8d,_0xb0e420(0xd2));}else{const _0x55516e=_0x5d22c3[_0xb0e420(0x2ac)];this[_0xb0e420(0x96)](_0x55516e,_0x4965eb,_0x1da74e,_0x3b8d8d,_0xb0e420(0xd2));}}this[_0xb0e420(0x3b0)](),this['changePaintOpacity'](!![]);},Window_ShopStatus['prototype'][_0x56eb94(0x3a3)]=function(){const _0x227d86=_0x56eb94;VisuMZ[_0x227d86(0x91)][_0x227d86(0x1a2)]['StatusWindow'][_0x227d86(0x10a)][_0x227d86(0xff)](this);},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x14d)]=function(){const _0x174c20=_0x56eb94;this['_customItemInfo']={};if(!this[_0x174c20(0xd7)])return;const _0x49d2d0=this['_item']['note'];if(_0x49d2d0[_0x174c20(0x382)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x2cb200=String(RegExp['$1'])[_0x174c20(0x289)](/[\r\n]+/);for(const _0x50453d of _0x2cb200){if(_0x50453d[_0x174c20(0x382)](/(.*):[ ](.*)/i)){const _0x5e9b57=String(RegExp['$1'])[_0x174c20(0x3c7)]()[_0x174c20(0x1a5)](),_0x44923e=String(RegExp['$2'])[_0x174c20(0x1a5)]();this[_0x174c20(0x22a)][_0x5e9b57]=_0x44923e;}}}},Window_ShopStatus[_0x56eb94(0x175)]['itemDataFontSize']=function(){const _0x350ded=_0x56eb94;return Math[_0x350ded(0xce)](0x1,$gameSystem[_0x350ded(0x3b7)]()-0x4);},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x3b0)]=function(){const _0x2e1d25=_0x56eb94;Window_StatusBase[_0x2e1d25(0x175)][_0x2e1d25(0x3b0)][_0x2e1d25(0xff)](this),this[_0x2e1d25(0xdb)][_0x2e1d25(0xcf)]=this[_0x2e1d25(0x2bf)]||this[_0x2e1d25(0xdb)]['fontSize'],this['contents'][_0x2e1d25(0x3cf)]=this[_0x2e1d25(0x362)]||this[_0x2e1d25(0xdb)][_0x2e1d25(0x3cf)];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x38b)]=function(){const _0x26f03f=_0x56eb94;return this[_0x26f03f(0xdb)]['fontSize']/$gameSystem[_0x26f03f(0x3b7)]();},Window_ShopStatus[_0x56eb94(0x175)]['drawIcon']=function(_0x5ce8b5,_0x598df5,_0x30733a){const _0x7aaf14=_0x56eb94,_0x38ac51=ImageManager['loadSystem'](_0x7aaf14(0x2b7)),_0x225547=ImageManager[_0x7aaf14(0x1b2)],_0x39aab8=ImageManager[_0x7aaf14(0x2f2)],_0x400dcb=_0x5ce8b5%0x10*_0x225547,_0x13df8c=Math['floor'](_0x5ce8b5/0x10)*_0x39aab8,_0x4effe0=Math['ceil'](_0x225547*this[_0x7aaf14(0x38b)]()),_0x3b0480=Math[_0x7aaf14(0x3a8)](_0x39aab8*this[_0x7aaf14(0x38b)]());this[_0x7aaf14(0xdb)][_0x7aaf14(0x1f9)](_0x38ac51,_0x400dcb,_0x13df8c,_0x225547,_0x39aab8,_0x598df5,_0x30733a,_0x4effe0,_0x3b0480);},Window_ShopStatus[_0x56eb94(0x175)]['processDrawIcon']=function(_0x5879ed,_0x166d83){const _0x37d593=_0x56eb94;_0x166d83[_0x37d593(0x2c5)]&&this['drawIcon'](_0x5879ed,_0x166d83['x'],_0x166d83['y']+0x2);_0x166d83['x']+=Math[_0x37d593(0x3a8)](ImageManager['iconWidth']*this['fontSizeRatio']());if(this[_0x37d593(0x38b)]()===0x1)_0x166d83['x']+=0x4;},Window_ShopStatus[_0x56eb94(0x175)]['drawItemKeyData']=function(_0x13eb64,_0x56a179,_0x31de0d,_0x2b4b7d,_0x3f5c64,_0x2212c0){const _0x954971=_0x56eb94;_0x13eb64=_0x13eb64||'',_0x2212c0=_0x2212c0||_0x954971(0x34a),this['_resetFontSize']=this[_0x954971(0x1d7)](),this[_0x954971(0x362)]=_0x3f5c64?ColorManager['systemColor']():this[_0x954971(0xdb)][_0x954971(0x3cf)],_0x56a179+=this[_0x954971(0x183)](),_0x2b4b7d-=this['itemPadding']()*0x2;const _0x3a3b78=this[_0x954971(0x32f)](_0x13eb64);if(_0x2212c0===_0x954971(0xd2))_0x56a179=_0x56a179+Math[_0x954971(0x1a3)]((_0x2b4b7d-_0x3a3b78[_0x954971(0x244)])/0x2);else _0x2212c0==='right'&&(_0x56a179=_0x56a179+_0x2b4b7d-_0x3a3b78[_0x954971(0x244)]);_0x31de0d+=(this[_0x954971(0x314)]()-_0x3a3b78[_0x954971(0x11b)])/0x2,this[_0x954971(0x35e)](_0x13eb64,_0x56a179,_0x31de0d,_0x2b4b7d),this[_0x954971(0x2bf)]=undefined,this[_0x954971(0x362)]=undefined,this[_0x954971(0x3b0)]();},Window_ShopStatus['prototype']['drawItemConsumable']=function(_0x1eb005,_0x21ca1e,_0x25f78d){const _0x1ed775=_0x56eb94;if(!DataManager[_0x1ed775(0x99)](this[_0x1ed775(0xd7)]))return![];const _0x3086a5=this[_0x1ed775(0x235)]();this[_0x1ed775(0x201)](_0x3086a5,_0x1eb005,_0x21ca1e,_0x25f78d,!![]);const _0x11bb57=this['getItemConsumableText']();return this['drawItemKeyData'](_0x11bb57,_0x1eb005,_0x21ca1e,_0x25f78d,![],_0x1ed775(0x124)),this['drawItemDarkRect'](_0x1eb005,_0x21ca1e,_0x25f78d),this[_0x1ed775(0x3b0)](),!![];},Window_ShopStatus[_0x56eb94(0x175)]['getItemConsumableLabel']=function(){const _0xa0951d=_0x56eb94;return VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0xa0951d(0x92)];},Window_ShopStatus['prototype'][_0x56eb94(0x31d)]=function(){const _0x4425ee=_0x56eb94,_0x226e8c='CONSUMABLE';if(this['_customItemInfo'][_0x226e8c])return this[_0x4425ee(0x22a)][_0x226e8c];return this[_0x4425ee(0x268)]()?VisuMZ[_0x4425ee(0x91)][_0x4425ee(0x1a2)][_0x4425ee(0x2b6)][_0x4425ee(0x361)]:VisuMZ[_0x4425ee(0x91)][_0x4425ee(0x1a2)][_0x4425ee(0x2b6)][_0x4425ee(0x342)];},Window_ShopStatus[_0x56eb94(0x175)]['canConsumeItem']=function(){const _0x2b44a6=_0x56eb94;return VisuMZ[_0x2b44a6(0x2de)]&&VisuMZ[_0x2b44a6(0x2de)][_0x2b44a6(0x1a2)]['QoL'][_0x2b44a6(0x27a)]&&DataManager[_0x2b44a6(0xbf)](this[_0x2b44a6(0xd7)])?![]:this['_item'][_0x2b44a6(0x1f1)];},Window_ShopStatus['prototype'][_0x56eb94(0x388)]=function(_0x4605b8,_0x4a35dd,_0x5b938e){const _0x262dbf=_0x56eb94;if(!this['isEquipItem']()&&!DataManager[_0x262dbf(0x99)](this[_0x262dbf(0xd7)]))return![];if(DataManager[_0x262dbf(0xbf)](this[_0x262dbf(0xd7)])&&!$dataSystem[_0x262dbf(0x31c)]){const _0xfa10db=TextManager[_0x262dbf(0x2e0)];this[_0x262dbf(0x201)](_0xfa10db,_0x4605b8,_0x4a35dd,_0x5b938e,!![],_0x262dbf(0xd2));}else{const _0x541ccb=TextManager[_0x262dbf(0x277)];this[_0x262dbf(0x201)](_0x541ccb,_0x4605b8,_0x4a35dd,_0x5b938e,!![]);const _0x268750=this['getItemQuantityText']();this[_0x262dbf(0x201)](_0x268750,_0x4605b8,_0x4a35dd,_0x5b938e,![],_0x262dbf(0x124));}return this[_0x262dbf(0x317)](_0x4605b8,_0x4a35dd,_0x5b938e),this[_0x262dbf(0x3b0)](),!![];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x1b9)]=function(){const _0x5c304d=_0x56eb94,_0x1a4921=_0x5c304d(0x2d4);if(this[_0x5c304d(0x22a)][_0x1a4921])return this['_customItemInfo'][_0x1a4921];const _0x13a4b2=VisuMZ[_0x5c304d(0x91)][_0x5c304d(0x1a2)][_0x5c304d(0xef)][_0x5c304d(0x23e)];return _0x13a4b2['format']($gameParty[_0x5c304d(0x1e2)](this['_item']));},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x29f)]=function(_0x48c670,_0x2f82af,_0x13e40a){const _0x5960b9=_0x56eb94,_0x1b61bf=this[_0x5960b9(0x29d)]();return this[_0x5960b9(0x201)](_0x1b61bf,_0x48c670,_0x2f82af,_0x13e40a,![],'center'),this[_0x5960b9(0x317)](_0x48c670,_0x2f82af,_0x13e40a),this[_0x5960b9(0x3b0)](),!![];},Window_ShopStatus[_0x56eb94(0x175)]['getItemOccasionText']=function(){const _0xd55719=_0x56eb94,_0x4c8bf7='OCCASION';if(this[_0xd55719(0x22a)][_0x4c8bf7])return this[_0xd55719(0x22a)][_0x4c8bf7];const _0x9502d7=VisuMZ[_0xd55719(0x91)][_0xd55719(0x1a2)][_0xd55719(0x2b6)],_0x7592bd='Occasion%1'[_0xd55719(0x3bd)](this['_item'][_0xd55719(0x260)]);return _0x9502d7[_0x7592bd];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x1d3)]=function(_0x2a4cb1,_0x1185f9,_0x105fb6){const _0x4d719d=_0x56eb94,_0x1fab64=this[_0x4d719d(0x374)]();return this[_0x4d719d(0x201)](_0x1fab64,_0x2a4cb1,_0x1185f9,_0x105fb6,![],_0x4d719d(0xd2)),this[_0x4d719d(0x317)](_0x2a4cb1,_0x1185f9,_0x105fb6),this[_0x4d719d(0x3b0)](),!![];},Window_ShopStatus['prototype']['getItemScopeText']=function(){const _0x4feaed=_0x56eb94,_0xa95a61=_0x4feaed(0x2ae);if(this[_0x4feaed(0x22a)][_0xa95a61])return this[_0x4feaed(0x22a)][_0xa95a61];const _0x4fe4d0=VisuMZ['ItemsEquipsCore'][_0x4feaed(0x1a2)][_0x4feaed(0x2b6)];if(Imported['VisuMZ_1_BattleCore']){const _0x5562ed=this[_0x4feaed(0xd7)][_0x4feaed(0x278)];if(_0x5562ed['match'](/<TARGET:[ ](.*)>/i)){const _0x9afb9=String(RegExp['$1']);if(_0x9afb9['match'](/(\d+) RANDOM ANY/i))return _0x4fe4d0[_0x4feaed(0x246)][_0x4feaed(0x3bd)](Number(RegExp['$1']));else{if(_0x9afb9['match'](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x4fe4d0[_0x4feaed(0x2c0)][_0x4feaed(0x3bd)](Number(RegExp['$1']));else{if(_0x9afb9['match'](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x4fe4d0[_0x4feaed(0x205)][_0x4feaed(0x3bd)](Number(RegExp['$1']));else{if(_0x9afb9['match'](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x4fe4d0[_0x4feaed(0x15f)];}}}}}const _0x51733f=_0x4feaed(0x1cc)[_0x4feaed(0x3bd)](this[_0x4feaed(0xd7)][_0x4feaed(0x1aa)]);return _0x4fe4d0[_0x51733f];},Window_ShopStatus[_0x56eb94(0x175)]['drawItemSpeed']=function(_0x2bb02a,_0x4f188b,_0x3887fa){const _0xcbc941=_0x56eb94,_0x5cf003=this['getItemSpeedLabel']();this[_0xcbc941(0x201)](_0x5cf003,_0x2bb02a,_0x4f188b,_0x3887fa,!![]);const _0x3ca1a8=this[_0xcbc941(0x23d)]();return this['drawItemKeyData'](_0x3ca1a8,_0x2bb02a,_0x4f188b,_0x3887fa,![],_0xcbc941(0x124)),this[_0xcbc941(0x317)](_0x2bb02a,_0x4f188b,_0x3887fa),this[_0xcbc941(0x3b0)](),!![];},Window_ShopStatus['prototype'][_0x56eb94(0x30c)]=function(){const _0xa1345=_0x56eb94;return VisuMZ['ItemsEquipsCore'][_0xa1345(0x1a2)][_0xa1345(0x2b6)][_0xa1345(0x19d)];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x23d)]=function(){const _0x27e529=_0x56eb94,_0x502c3c='SPEED';if(this[_0x27e529(0x22a)][_0x502c3c])return this[_0x27e529(0x22a)][_0x502c3c];const _0x3d0973=this[_0x27e529(0xd7)]['speed'];if(_0x3d0973>=0x7d0)return VisuMZ['ItemsEquipsCore'][_0x27e529(0x1a2)][_0x27e529(0x2b6)][_0x27e529(0x14b)];else{if(_0x3d0973>=0x3e8)return VisuMZ[_0x27e529(0x91)][_0x27e529(0x1a2)][_0x27e529(0x2b6)][_0x27e529(0x393)];else{if(_0x3d0973>0x0)return VisuMZ[_0x27e529(0x91)][_0x27e529(0x1a2)][_0x27e529(0x2b6)]['Speed1'];else{if(_0x3d0973===0x0)return VisuMZ[_0x27e529(0x91)][_0x27e529(0x1a2)][_0x27e529(0x2b6)][_0x27e529(0x1cb)];else{if(_0x3d0973>-0x3e8)return VisuMZ[_0x27e529(0x91)]['Settings'][_0x27e529(0x2b6)][_0x27e529(0x242)];else{if(_0x3d0973>-0x7d0)return VisuMZ[_0x27e529(0x91)][_0x27e529(0x1a2)][_0x27e529(0x2b6)][_0x27e529(0xc2)];else return _0x3d0973<=-0x7d0?VisuMZ[_0x27e529(0x91)]['Settings'][_0x27e529(0x2b6)][_0x27e529(0x199)]:_0x27e529(0x1ef);}}}}}},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x320)]=function(_0x3ba807,_0x298e46,_0xe67659){const _0x2b1c03=_0x56eb94,_0x2d1c7f=this[_0x2b1c03(0x22c)]();this[_0x2b1c03(0x201)](_0x2d1c7f,_0x3ba807,_0x298e46,_0xe67659,!![]);const _0x39e07d=this['getItemSuccessRateText']();return this[_0x2b1c03(0x201)](_0x39e07d,_0x3ba807,_0x298e46,_0xe67659,![],_0x2b1c03(0x124)),this['drawItemDarkRect'](_0x3ba807,_0x298e46,_0xe67659),this[_0x2b1c03(0x3b0)](),!![];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x22c)]=function(){const _0x4dc4f6=_0x56eb94;return VisuMZ[_0x4dc4f6(0x91)][_0x4dc4f6(0x1a2)]['StatusWindow'][_0x4dc4f6(0x165)];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x2b8)]=function(){const _0x411b49=_0x56eb94,_0x242232=_0x411b49(0x35d);if(this[_0x411b49(0x22a)][_0x242232])return this[_0x411b49(0x22a)][_0x242232];if(Imported[_0x411b49(0x170)]){const _0x2086d0=this[_0x411b49(0xd7)][_0x411b49(0x278)];if(_0x2086d0[_0x411b49(0x382)](/<ALWAYS HIT>/i))return _0x411b49(0x125);else{if(_0x2086d0[_0x411b49(0x382)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x411b49(0x137)[_0x411b49(0x3bd)](Number(RegExp['$1']));}}return _0x411b49(0x137)[_0x411b49(0x3bd)](this[_0x411b49(0xd7)][_0x411b49(0x1d8)]);},Window_ShopStatus[_0x56eb94(0x175)]['drawItemRepeats']=function(_0x5aff19,_0x28687f,_0x2e5ead){const _0x492fc8=_0x56eb94,_0x4fa3a0=this['getItemRepeatsLabel']();this['drawItemKeyData'](_0x4fa3a0,_0x5aff19,_0x28687f,_0x2e5ead,!![]);const _0x42fb08=this[_0x492fc8(0x2d1)]();return this[_0x492fc8(0x201)](_0x42fb08,_0x5aff19,_0x28687f,_0x2e5ead,![],'right'),this[_0x492fc8(0x317)](_0x5aff19,_0x28687f,_0x2e5ead),this[_0x492fc8(0x3b0)](),!![];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x221)]=function(){const _0x271464=_0x56eb94;return VisuMZ[_0x271464(0x91)][_0x271464(0x1a2)][_0x271464(0x2b6)][_0x271464(0x250)];},Window_ShopStatus['prototype'][_0x56eb94(0x2d1)]=function(){const _0x3cc193=_0x56eb94,_0x2b4bfd=_0x3cc193(0x2a3);if(this[_0x3cc193(0x22a)][_0x2b4bfd])return this[_0x3cc193(0x22a)][_0x2b4bfd];const _0x1f919e='×%1';return _0x1f919e[_0x3cc193(0x3bd)](this[_0x3cc193(0xd7)]['repeats']);},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x2d8)]=function(_0x4bd1ad,_0x1622d7,_0x4c5e49){const _0x23f448=_0x56eb94,_0x2ff774=this[_0x23f448(0x2c9)]();this[_0x23f448(0x201)](_0x2ff774,_0x4bd1ad,_0x1622d7,_0x4c5e49,!![]);const _0x342e6e=this['getItemHitTypeText']();return this['drawItemKeyData'](_0x342e6e,_0x4bd1ad,_0x1622d7,_0x4c5e49,![],_0x23f448(0x124)),this['drawItemDarkRect'](_0x4bd1ad,_0x1622d7,_0x4c5e49),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x2c9)]=function(){const _0x4d7bb8=_0x56eb94;return VisuMZ[_0x4d7bb8(0x91)][_0x4d7bb8(0x1a2)]['StatusWindow'][_0x4d7bb8(0x37c)];},Window_ShopStatus['prototype'][_0x56eb94(0x359)]=function(){const _0x526e6e=_0x56eb94,_0x5a207a='HIT\x20TYPE';if(this[_0x526e6e(0x22a)][_0x5a207a])return this[_0x526e6e(0x22a)][_0x5a207a];const _0x1f18d1=VisuMZ['ItemsEquipsCore'][_0x526e6e(0x1a2)][_0x526e6e(0x2b6)],_0x236d7b=_0x526e6e(0x131)[_0x526e6e(0x3bd)](this[_0x526e6e(0xd7)][_0x526e6e(0x1dc)]);return _0x1f18d1[_0x236d7b];},Window_ShopStatus['prototype'][_0x56eb94(0x1bc)]=function(_0x4893dd,_0x1778f6,_0x5ee56c){const _0x30b4c7=_0x56eb94;if(this[_0x30b4c7(0xd7)][_0x30b4c7(0x195)][_0x30b4c7(0x29e)]<=0x0)return _0x1778f6;if(this['drawItemDamageElement'](_0x4893dd,_0x1778f6,_0x5ee56c))_0x1778f6+=this[_0x30b4c7(0x314)]();if(this[_0x30b4c7(0x1e1)](_0x4893dd,_0x1778f6,_0x5ee56c))_0x1778f6+=this[_0x30b4c7(0x314)]();return this[_0x30b4c7(0x3b0)](),_0x1778f6;},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0xd4)]=function(_0xe559ba,_0x21f510,_0x454400){const _0x107a18=_0x56eb94,_0x56c529=this[_0x107a18(0xde)]();this[_0x107a18(0x201)](_0x56c529,_0xe559ba,_0x21f510,_0x454400,!![]);const _0x32c3ca=this['getItemDamageElementText']();return this['drawItemKeyData'](_0x32c3ca,_0xe559ba,_0x21f510,_0x454400,![],_0x107a18(0x124)),this['drawItemDarkRect'](_0xe559ba,_0x21f510,_0x454400),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0xde)]=function(){const _0x1ec534=_0x56eb94;return VisuMZ[_0x1ec534(0x91)][_0x1ec534(0x1a2)][_0x1ec534(0x2b6)][_0x1ec534(0x217)];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x3c3)]=function(){const _0xd89935=_0x56eb94,_0x76b18f=_0xd89935(0x276);if(this[_0xd89935(0x22a)][_0x76b18f])return this['_customItemInfo'][_0x76b18f];if(this[_0xd89935(0xd7)]['damage']['elementId']<=-0x1)return VisuMZ[_0xd89935(0x91)][_0xd89935(0x1a2)][_0xd89935(0x2b6)][_0xd89935(0x3a9)];else return this[_0xd89935(0xd7)][_0xd89935(0x195)][_0xd89935(0x1f3)]===0x0?VisuMZ['ItemsEquipsCore']['Settings'][_0xd89935(0x2b6)][_0xd89935(0x345)]:$dataSystem[_0xd89935(0x34c)][this[_0xd89935(0xd7)][_0xd89935(0x195)][_0xd89935(0x1f3)]];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x1e1)]=function(_0x546315,_0x1b0d4c,_0x5d16bf){const _0x4dd526=_0x56eb94,_0x56da5c=this[_0x4dd526(0x315)]();this[_0x4dd526(0x201)](_0x56da5c,_0x546315,_0x1b0d4c,_0x5d16bf,!![]),this['setupItemDamageTempActors']();const _0xcfa2ef=this[_0x4dd526(0x1b8)](),_0x113705=ColorManager['damageColor']([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x4dd526(0xd7)][_0x4dd526(0x195)]['type']]);return this[_0x4dd526(0x155)](_0x113705),this[_0x4dd526(0x201)](_0xcfa2ef,_0x546315,_0x1b0d4c,_0x5d16bf,![],_0x4dd526(0x124)),this[_0x4dd526(0x317)](_0x546315,_0x1b0d4c,_0x5d16bf),this[_0x4dd526(0x3b0)](),!![];},Window_ShopStatus['prototype']['getItemDamageAmountLabel']=function(){const _0x1c7607=_0x56eb94;return Imported[_0x1c7607(0x170)]&&DataManager[_0x1c7607(0x2b4)](this['_item'])!==_0x1c7607(0x2f7)?this['getItemDamageAmountLabelBattleCore']():this[_0x1c7607(0x287)]();},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x287)]=function(){const _0x29373b=_0x56eb94,_0x2febc0=VisuMZ[_0x29373b(0x91)][_0x29373b(0x1a2)]['StatusWindow'],_0x5f0f36='DamageType%1'[_0x29373b(0x3bd)](this[_0x29373b(0xd7)][_0x29373b(0x195)][_0x29373b(0x29e)]),_0x3182cf=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x29373b(0xd7)][_0x29373b(0x195)][_0x29373b(0x29e)]];return _0x2febc0[_0x5f0f36][_0x29373b(0x3bd)](_0x3182cf);},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x190)]=function(){const _0x3f16d9=_0x56eb94,_0x5328de=$gameActors[_0x3f16d9(0x207)](0x1);this['_tempActorA']=JsonEx[_0x3f16d9(0xa6)](_0x5328de),this[_0x3f16d9(0x274)]=JsonEx[_0x3f16d9(0xa6)](_0x5328de);},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x1b8)]=function(){const _0x517056=_0x56eb94,_0x231b55='DAMAGE\x20MULTIPLIER';if(this[_0x517056(0x22a)][_0x231b55])return this[_0x517056(0x22a)][_0x231b55];return Imported['VisuMZ_1_BattleCore']&&DataManager[_0x517056(0x2b4)](this['_item'])!=='MANUAL'?this[_0x517056(0x11f)]():this['getItemDamageAmountTextOriginal']();},Window_ShopStatus['prototype'][_0x56eb94(0x334)]=function(){const _0x4f728e=_0x56eb94;window['a']=this[_0x4f728e(0x338)],window['b']=this[_0x4f728e(0x274)],this['_tempActorA'][_0x4f728e(0x2a7)](!![]),this['_tempActorB'][_0x4f728e(0x2a7)]([0x3,0x4][_0x4f728e(0x106)](this[_0x4f728e(0xd7)][_0x4f728e(0x195)][_0x4f728e(0x29e)]));let _0x37d873=this[_0x4f728e(0xd7)][_0x4f728e(0x195)][_0x4f728e(0x225)];try{const _0xde0aad=Math[_0x4f728e(0xce)](eval(_0x37d873),0x0)/window['a'][_0x4f728e(0x102)];return this[_0x4f728e(0x26d)](),isNaN(_0xde0aad)?_0x4f728e(0x1ef):_0x4f728e(0x137)['format'](Math[_0x4f728e(0xc8)](_0xde0aad*0x64));}catch(_0xa44702){return $gameTemp[_0x4f728e(0x163)]()&&(console[_0x4f728e(0x126)](_0x4f728e(0x2ea)[_0x4f728e(0x3bd)](this[_0x4f728e(0xd7)]['name'])),console['log'](_0xa44702)),this[_0x4f728e(0x26d)](),_0x4f728e(0x1ef);}},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x26d)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x368)]=function(_0x15f6ce,_0x343eac,_0x548136){const _0x3c3bf5=_0x56eb94;if(!this[_0x3c3bf5(0x37e)]())return _0x343eac;if(this[_0x3c3bf5(0x1ca)](_0x15f6ce,_0x343eac,_0x548136))_0x343eac+=this[_0x3c3bf5(0x314)]();if(this[_0x3c3bf5(0x114)](_0x15f6ce,_0x343eac,_0x548136))_0x343eac+=this['lineHeight']();if(this[_0x3c3bf5(0xeb)](_0x15f6ce,_0x343eac,_0x548136))_0x343eac+=this[_0x3c3bf5(0x314)]();if(this[_0x3c3bf5(0x1c8)](_0x15f6ce,_0x343eac,_0x548136))_0x343eac+=this[_0x3c3bf5(0x314)]();if(this['drawItemEffectsMpDamage'](_0x15f6ce,_0x343eac,_0x548136))_0x343eac+=this[_0x3c3bf5(0x314)]();if(this[_0x3c3bf5(0x2f9)](_0x15f6ce,_0x343eac,_0x548136))_0x343eac+=this['lineHeight']();if(this[_0x3c3bf5(0x10b)](_0x15f6ce,_0x343eac,_0x548136))_0x343eac+=this[_0x3c3bf5(0x314)]();if(this[_0x3c3bf5(0x234)](_0x15f6ce,_0x343eac,_0x548136))_0x343eac+=this[_0x3c3bf5(0x314)]();if(this[_0x3c3bf5(0xbe)](_0x15f6ce,_0x343eac,_0x548136))_0x343eac+=this[_0x3c3bf5(0x314)]();return this[_0x3c3bf5(0x3b0)](),_0x343eac;},Window_ShopStatus['prototype'][_0x56eb94(0x37e)]=function(){const _0x59ef9b=_0x56eb94;let _0x279727=![];this[_0x59ef9b(0x2f6)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};for(const _0x11fc11 of this[_0x59ef9b(0xd7)][_0x59ef9b(0x2d9)]){switch(_0x11fc11[_0x59ef9b(0x134)]){case Game_Action[_0x59ef9b(0x3ba)]:this[_0x59ef9b(0x2f6)][_0x59ef9b(0x305)]+=_0x11fc11['value1'],this[_0x59ef9b(0x2f6)][_0x59ef9b(0x145)]+=_0x11fc11['value2'],_0x279727=!![];break;case Game_Action['EFFECT_RECOVER_MP']:this['_itemData'][_0x59ef9b(0x373)]+=_0x11fc11[_0x59ef9b(0xf5)],this[_0x59ef9b(0x2f6)][_0x59ef9b(0x105)]+=_0x11fc11[_0x59ef9b(0x25f)],_0x279727=!![];break;case Game_Action[_0x59ef9b(0x239)]:this['_itemData']['gainTP']+=_0x11fc11[_0x59ef9b(0xf5)],_0x279727=!![];break;case Game_Action[_0x59ef9b(0x2cf)]:this['_itemData'][_0x59ef9b(0xca)][_0x59ef9b(0x259)](_0x11fc11[_0x59ef9b(0x1bf)]),_0x279727=!![];break;case Game_Action[_0x59ef9b(0x148)]:this[_0x59ef9b(0x2f6)]['removeState']['push'](_0x11fc11[_0x59ef9b(0x1bf)]),this[_0x59ef9b(0x2f6)][_0x59ef9b(0x1a4)]=!![],_0x279727=!![];break;case Game_Action['EFFECT_ADD_BUFF']:this[_0x59ef9b(0x2f6)][_0x59ef9b(0x1e4)][_0x11fc11['dataId']]+=0x1,_0x279727=!![];break;case Game_Action[_0x59ef9b(0x35a)]:this[_0x59ef9b(0x2f6)][_0x59ef9b(0x1e4)][_0x11fc11[_0x59ef9b(0x1bf)]]-=0x1,_0x279727=!![];break;case Game_Action['EFFECT_REMOVE_BUFF']:this[_0x59ef9b(0x2f6)][_0x59ef9b(0x264)][_0x59ef9b(0x259)](_0x11fc11[_0x59ef9b(0x1bf)]),this[_0x59ef9b(0x2f6)]['removeStateBuffChanges']=!![],_0x279727=!![];break;case Game_Action[_0x59ef9b(0x279)]:this['_itemData']['removeDebuff'][_0x59ef9b(0x259)](_0x11fc11[_0x59ef9b(0x1bf)]),this[_0x59ef9b(0x2f6)][_0x59ef9b(0x1a4)]=!![],_0x279727=!![];break;}}if(this['_itemData']['addState'][_0x59ef9b(0x25c)]>0x0)this[_0x59ef9b(0x2f6)][_0x59ef9b(0x366)]=!![];for(let _0x3e7bd7=0x0;_0x3e7bd7<this[_0x59ef9b(0x2f6)][_0x59ef9b(0x1e4)][_0x59ef9b(0x25c)];_0x3e7bd7++){if(this['_itemData'][_0x59ef9b(0x1e4)][_0x3e7bd7]!==0x0)this[_0x59ef9b(0x2f6)][_0x59ef9b(0x366)]=!![];}this['_item']['tpGain']!==0x0&&(this[_0x59ef9b(0x2f6)][_0x59ef9b(0x168)]=this['_item'][_0x59ef9b(0x9f)],_0x279727=!![]);const _0x5c2bb9=[_0x59ef9b(0x353),_0x59ef9b(0x19a),'TP\x20RECOVERY',_0x59ef9b(0x1b6),_0x59ef9b(0x286),'TP\x20DAMAGE',_0x59ef9b(0x230),_0x59ef9b(0x32c),_0x59ef9b(0x3b9)];for(const _0x4cd583 of _0x5c2bb9){if(this[_0x59ef9b(0x22a)][_0x4cd583]){_0x279727=!![];break;}}return _0x279727;},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x1ca)]=function(_0x3aee9e,_0x2f67c2,_0x5a0384){const _0x2dbad8=_0x56eb94,_0x2b3a31='HP\x20RECOVERY';if(this[_0x2dbad8(0x2f6)]['rateHP']<=0x0&&this['_itemData'][_0x2dbad8(0x145)]<=0x0&&!this[_0x2dbad8(0x22a)][_0x2b3a31])return![];const _0x327b5c=this['getItemEffectsHpRecoveryLabel']();this['drawItemKeyData'](_0x327b5c,_0x3aee9e,_0x2f67c2,_0x5a0384,!![]);const _0x39c3ca=this['getItemEffectsHpRecoveryText']();return this[_0x2dbad8(0x155)](ColorManager[_0x2dbad8(0xf8)](0x1)),this[_0x2dbad8(0x201)](_0x39c3ca,_0x3aee9e,_0x2f67c2,_0x5a0384,![],_0x2dbad8(0x124)),this[_0x2dbad8(0x317)](_0x3aee9e,_0x2f67c2,_0x5a0384),this[_0x2dbad8(0x3b0)](),!![];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x215)]=function(){const _0x492c50=_0x56eb94,_0x351019=VisuMZ[_0x492c50(0x91)][_0x492c50(0x1a2)][_0x492c50(0x2b6)]['LabelRecoverHP'];return _0x351019[_0x492c50(0x3bd)](TextManager['hp']);},Window_ShopStatus[_0x56eb94(0x175)]['getItemEffectsHpRecoveryText']=function(){const _0x4a3c82=_0x56eb94,_0x232d40=_0x4a3c82(0x353);if(this[_0x4a3c82(0x22a)][_0x232d40])return this[_0x4a3c82(0x22a)][_0x232d40];let _0x2a72b9='';if(this['_itemData'][_0x4a3c82(0x305)]>0x0)_0x2a72b9+='+%1%'[_0x4a3c82(0x3bd)](Math[_0x4a3c82(0x1a3)](this['_itemData'][_0x4a3c82(0x305)]*0x64));if(this[_0x4a3c82(0x2f6)][_0x4a3c82(0x305)]>0x0&&this[_0x4a3c82(0x2f6)][_0x4a3c82(0x145)]>0x0)_0x2a72b9+='\x20';if(this[_0x4a3c82(0x2f6)]['flatHP']>0x0)_0x2a72b9+=_0x4a3c82(0x3ce)[_0x4a3c82(0x3bd)](this[_0x4a3c82(0x2f6)][_0x4a3c82(0x145)]);return _0x2a72b9;},Window_ShopStatus['prototype'][_0x56eb94(0x114)]=function(_0x519744,_0x2812c7,_0x2243de){const _0x1b5b1c=_0x56eb94,_0x43b267=_0x1b5b1c(0x19a);if(this[_0x1b5b1c(0x2f6)]['rateMP']<=0x0&&this[_0x1b5b1c(0x2f6)][_0x1b5b1c(0x105)]<=0x0&&!this[_0x1b5b1c(0x22a)][_0x43b267])return![];const _0x1ae9a3=this['getItemEffectsMpRecoveryLabel']();this[_0x1b5b1c(0x201)](_0x1ae9a3,_0x519744,_0x2812c7,_0x2243de,!![]);const _0x2b7d37=this[_0x1b5b1c(0x132)]();return this[_0x1b5b1c(0x155)](ColorManager['damageColor'](0x3)),this[_0x1b5b1c(0x201)](_0x2b7d37,_0x519744,_0x2812c7,_0x2243de,![],_0x1b5b1c(0x124)),this[_0x1b5b1c(0x317)](_0x519744,_0x2812c7,_0x2243de),this[_0x1b5b1c(0x3b0)](),!![];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0xa7)]=function(){const _0x6eca40=_0x56eb94,_0x2212a4=VisuMZ[_0x6eca40(0x91)][_0x6eca40(0x1a2)][_0x6eca40(0x2b6)][_0x6eca40(0x367)];return _0x2212a4[_0x6eca40(0x3bd)](TextManager['mp']);},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x132)]=function(){const _0x2fdce4=_0x56eb94,_0x225fe1=_0x2fdce4(0x19a);if(this[_0x2fdce4(0x22a)][_0x225fe1])return this['_customItemInfo'][_0x225fe1];let _0xe46cd2='';if(this[_0x2fdce4(0x2f6)][_0x2fdce4(0x373)]>0x0)_0xe46cd2+=_0x2fdce4(0x10e)[_0x2fdce4(0x3bd)](Math[_0x2fdce4(0x1a3)](this[_0x2fdce4(0x2f6)][_0x2fdce4(0x373)]*0x64));if(this[_0x2fdce4(0x2f6)]['rateMP']>0x0&&this[_0x2fdce4(0x2f6)]['flatMP']>0x0)_0xe46cd2+='\x20';if(this[_0x2fdce4(0x2f6)][_0x2fdce4(0x105)]>0x0)_0xe46cd2+=_0x2fdce4(0x3ce)[_0x2fdce4(0x3bd)](this[_0x2fdce4(0x2f6)][_0x2fdce4(0x105)]);return _0xe46cd2;},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0xeb)]=function(_0xf6b86d,_0x1f3425,_0x8c9d70){const _0x35664f=_0x56eb94,_0x4e21fe=_0x35664f(0xb3);if(this['_itemData'][_0x35664f(0x18f)]<=0x0&&!this['_customItemInfo'][_0x4e21fe])return![];const _0xb14b51=this['getItemEffectsTpRecoveryLabel']();this['drawItemKeyData'](_0xb14b51,_0xf6b86d,_0x1f3425,_0x8c9d70,!![]);const _0x1dbe38=this[_0x35664f(0x9d)]();return this['changeTextColor'](ColorManager['powerUpColor']()),this[_0x35664f(0x201)](_0x1dbe38,_0xf6b86d,_0x1f3425,_0x8c9d70,![],_0x35664f(0x124)),this[_0x35664f(0x317)](_0xf6b86d,_0x1f3425,_0x8c9d70),this[_0x35664f(0x3b0)](),!![];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0xe1)]=function(){const _0x527d52=_0x56eb94,_0x3ea06c=VisuMZ[_0x527d52(0x91)][_0x527d52(0x1a2)][_0x527d52(0x2b6)][_0x527d52(0x3c1)];return _0x3ea06c[_0x527d52(0x3bd)](TextManager['tp']);},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x9d)]=function(){const _0x48e643=_0x56eb94,_0x2046a8='TP\x20RECOVERY';if(this[_0x48e643(0x22a)][_0x2046a8])return this['_customItemInfo'][_0x2046a8];let _0x3c4299='';return _0x3c4299+=_0x48e643(0x3ce)[_0x48e643(0x3bd)](this[_0x48e643(0x2f6)]['gainTP']),_0x3c4299;},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x10b)]=function(_0x34f765,_0x116c38,_0x240afc){const _0x79f381=_0x56eb94,_0x5007ee=_0x79f381(0x230);if(this[_0x79f381(0x2f6)][_0x79f381(0x168)]===0x0&&!this[_0x79f381(0x22a)][_0x5007ee])return![];const _0x1a9d86=this['getItemEffectsSelfTpGainLabel']();this['drawItemKeyData'](_0x1a9d86,_0x34f765,_0x116c38,_0x240afc,!![]);const _0x23f7ad=this[_0x79f381(0x270)]();return this[_0x79f381(0x2f6)][_0x79f381(0x168)]>0x0?this[_0x79f381(0x155)](ColorManager[_0x79f381(0x218)]()):this['changeTextColor'](ColorManager[_0x79f381(0x288)]()),this['drawItemKeyData'](_0x23f7ad,_0x34f765,_0x116c38,_0x240afc,![],_0x79f381(0x124)),this[_0x79f381(0x317)](_0x34f765,_0x116c38,_0x240afc),this[_0x79f381(0x3b0)](),!![];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x3bb)]=function(){const _0x370cbf=_0x56eb94,_0x439653=VisuMZ[_0x370cbf(0x91)]['Settings']['StatusWindow'][_0x370cbf(0x385)];return _0x439653[_0x370cbf(0x3bd)](TextManager['tp']);},Window_ShopStatus[_0x56eb94(0x175)]['getItemEffectsSelfTpGainText']=function(){const _0x52cadf=_0x56eb94,_0x243a4c=_0x52cadf(0x230);if(this[_0x52cadf(0x22a)][_0x243a4c])return this['_customItemInfo'][_0x243a4c];let _0x2f120a='';return this[_0x52cadf(0x2f6)][_0x52cadf(0x168)]>0x0?_0x2f120a+=_0x52cadf(0x3ce)['format'](this[_0x52cadf(0x2f6)]['selfTP']):_0x2f120a+='%1'[_0x52cadf(0x3bd)](this[_0x52cadf(0x2f6)][_0x52cadf(0x168)]),_0x2f120a;},Window_ShopStatus['prototype']['drawItemEffectsHpDamage']=function(_0x3b046b,_0x3e1ca5,_0x1c9e61){const _0x344309=_0x56eb94,_0x2b48f6='HP\x20DAMAGE';if(this['_itemData'][_0x344309(0x305)]>=0x0&&this['_itemData'][_0x344309(0x145)]>=0x0&&!this[_0x344309(0x22a)][_0x2b48f6])return![];const _0x11889d=this[_0x344309(0x336)]();this[_0x344309(0x201)](_0x11889d,_0x3b046b,_0x3e1ca5,_0x1c9e61,!![]);const _0x1c871c=this[_0x344309(0x11c)]();return this[_0x344309(0x155)](ColorManager[_0x344309(0xf8)](0x0)),this[_0x344309(0x201)](_0x1c871c,_0x3b046b,_0x3e1ca5,_0x1c9e61,![],'right'),this[_0x344309(0x317)](_0x3b046b,_0x3e1ca5,_0x1c9e61),this[_0x344309(0x3b0)](),!![];},Window_ShopStatus[_0x56eb94(0x175)]['getItemEffectsHpDamageLabel']=function(){const _0xd35888=_0x56eb94,_0x426114=VisuMZ[_0xd35888(0x91)][_0xd35888(0x1a2)]['StatusWindow'][_0xd35888(0x2c8)];return _0x426114['format'](TextManager['hp']);},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x11c)]=function(){const _0x2533a6=_0x56eb94,_0x1ec177=_0x2533a6(0x1b6);if(this[_0x2533a6(0x22a)][_0x1ec177])return this[_0x2533a6(0x22a)][_0x1ec177];let _0x29c56c='';if(this[_0x2533a6(0x2f6)][_0x2533a6(0x305)]<0x0)_0x29c56c+='%1%'['format'](Math[_0x2533a6(0x1a3)](this[_0x2533a6(0x2f6)][_0x2533a6(0x305)]*0x64));if(this[_0x2533a6(0x2f6)][_0x2533a6(0x305)]<0x0&&this[_0x2533a6(0x2f6)][_0x2533a6(0x145)]<0x0)_0x29c56c+='\x20';if(this[_0x2533a6(0x2f6)][_0x2533a6(0x145)]<0x0)_0x29c56c+='%1'[_0x2533a6(0x3bd)](this[_0x2533a6(0x2f6)][_0x2533a6(0x145)]);return _0x29c56c;},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x23b)]=function(_0x34c8d6,_0x413e6b,_0x53b41d){const _0x37afa5=_0x56eb94,_0x2497e4=_0x37afa5(0x286);if(this[_0x37afa5(0x2f6)]['rateMP']>=0x0&&this[_0x37afa5(0x2f6)][_0x37afa5(0x105)]>=0x0&&!this[_0x37afa5(0x22a)][_0x2497e4])return![];const _0x1f6213=this[_0x37afa5(0x98)]();this[_0x37afa5(0x201)](_0x1f6213,_0x34c8d6,_0x413e6b,_0x53b41d,!![]);const _0xad96a3=this['getItemEffectsMpDamageText']();return this[_0x37afa5(0x155)](ColorManager['damageColor'](0x2)),this[_0x37afa5(0x201)](_0xad96a3,_0x34c8d6,_0x413e6b,_0x53b41d,![],_0x37afa5(0x124)),this[_0x37afa5(0x317)](_0x34c8d6,_0x413e6b,_0x53b41d),this[_0x37afa5(0x3b0)](),!![];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x98)]=function(){const _0x14db0a=_0x56eb94,_0x36f8cd=VisuMZ['ItemsEquipsCore'][_0x14db0a(0x1a2)][_0x14db0a(0x2b6)]['LabelDamageMP'];return _0x36f8cd[_0x14db0a(0x3bd)](TextManager['mp']);},Window_ShopStatus['prototype'][_0x56eb94(0x2a9)]=function(){const _0x53d442=_0x56eb94,_0x335775='MP\x20DAMAGE';if(this[_0x53d442(0x22a)][_0x335775])return this[_0x53d442(0x22a)][_0x335775];let _0x203fcc='';if(this[_0x53d442(0x2f6)][_0x53d442(0x373)]<0x0)_0x203fcc+='%1%'['format'](Math[_0x53d442(0x1a3)](this['_itemData'][_0x53d442(0x373)]*0x64));if(this[_0x53d442(0x2f6)][_0x53d442(0x373)]<0x0&&this[_0x53d442(0x2f6)][_0x53d442(0x105)]<0x0)_0x203fcc+='\x20';if(this['_itemData'][_0x53d442(0x105)]<0x0)_0x203fcc+='%1'[_0x53d442(0x3bd)](this[_0x53d442(0x2f6)][_0x53d442(0x105)]);return _0x203fcc;},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x2f9)]=function(_0x5a9fd0,_0x59df11,_0x2f24f5){const _0x1de525=_0x56eb94,_0x57abf9=_0x1de525(0x2e5);if(this[_0x1de525(0x2f6)]['gainTP']>=0x0&&!this[_0x1de525(0x22a)][_0x57abf9])return![];const _0x493294=this[_0x1de525(0x3a7)]();this[_0x1de525(0x201)](_0x493294,_0x5a9fd0,_0x59df11,_0x2f24f5,!![]);const _0x5d074a=this[_0x1de525(0xa8)]();return this[_0x1de525(0x155)](ColorManager[_0x1de525(0x288)]()),this[_0x1de525(0x201)](_0x5d074a,_0x5a9fd0,_0x59df11,_0x2f24f5,![],_0x1de525(0x124)),this[_0x1de525(0x317)](_0x5a9fd0,_0x59df11,_0x2f24f5),this[_0x1de525(0x3b0)](),!![];},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x3a7)]=function(){const _0x2e1d59=_0x56eb94,_0x3393fe=VisuMZ[_0x2e1d59(0x91)][_0x2e1d59(0x1a2)][_0x2e1d59(0x2b6)][_0x2e1d59(0x297)];return _0x3393fe[_0x2e1d59(0x3bd)](TextManager['tp']);},Window_ShopStatus['prototype'][_0x56eb94(0xa8)]=function(){const _0xe01447=_0x56eb94,_0x3c4285=_0xe01447(0x2e5);if(this[_0xe01447(0x22a)][_0x3c4285])return this[_0xe01447(0x22a)][_0x3c4285];let _0x2ee8c9='';return _0x2ee8c9+='%1'[_0xe01447(0x3bd)](this['_itemData'][_0xe01447(0x18f)]),_0x2ee8c9;},Window_ShopStatus[_0x56eb94(0x175)]['drawItemEffectsAddedStatesBuffs']=function(_0x22809e,_0x11c057,_0x3365fc){const _0x324f5a=_0x56eb94,_0xb0b1f6=_0x324f5a(0x32c);if(!this['_itemData'][_0x324f5a(0x366)]&&!this[_0x324f5a(0x22a)][_0xb0b1f6])return![];const _0x11cd2d=this[_0x324f5a(0x20c)]();this['drawItemKeyData'](_0x11cd2d,_0x22809e,_0x11c057,_0x3365fc,!![]);const _0x2276a3=this['getItemEffectsAddedStatesBuffsText']();return this[_0x324f5a(0x201)](_0x2276a3,_0x22809e,_0x11c057,_0x3365fc,![],_0x324f5a(0x124)),this['drawItemDarkRect'](_0x22809e,_0x11c057,_0x3365fc),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x56eb94(0x175)]['getItemEffectsAddedStatesBuffsLabel']=function(){const _0x4d808a=_0x56eb94;return VisuMZ['ItemsEquipsCore'][_0x4d808a(0x1a2)][_0x4d808a(0x2b6)][_0x4d808a(0x34f)];},Window_ShopStatus['prototype']['getItemEffectsAddedStatesBuffsText']=function(){const _0xb9547a=_0x56eb94,_0x2328d1=_0xb9547a(0x32c);if(this['_customItemInfo'][_0x2328d1])return this[_0xb9547a(0x22a)][_0x2328d1];let _0x239e2e='',_0x301029=0x0;const _0x397de2=0x8;for(const _0x4dc7a1 of this[_0xb9547a(0x2f6)][_0xb9547a(0xca)]){const _0x5b20c7=$dataStates[_0x4dc7a1];if(_0x5b20c7&&_0x5b20c7[_0xb9547a(0x1ac)]>0x0){_0x239e2e+=_0xb9547a(0xd8)['format'](_0x5b20c7[_0xb9547a(0x1ac)]),_0x301029++;if(_0x301029>=_0x397de2)return _0x239e2e;}}for(let _0x186870=0x0;_0x186870<this[_0xb9547a(0x2f6)][_0xb9547a(0x1e4)]['length'];_0x186870++){const _0x573603=this['_itemData'][_0xb9547a(0x1e4)][_0x186870],_0x1d23ed=Game_BattlerBase[_0xb9547a(0x175)][_0xb9547a(0x1cf)](_0x573603,_0x186870);if(_0x1d23ed>0x0){_0x239e2e+=_0xb9547a(0xd8)[_0xb9547a(0x3bd)](_0x1d23ed),_0x301029++;if(_0x301029>=_0x397de2)return _0x239e2e;}}return _0x239e2e;},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0xbe)]=function(_0x5a615f,_0x4a1947,_0x27310b){const _0x2c5619=_0x56eb94,_0x19537e=_0x2c5619(0x3b9);if(!this[_0x2c5619(0x2f6)][_0x2c5619(0x1a4)]&&!this[_0x2c5619(0x22a)][_0x19537e])return![];const _0x3fcec3=this[_0x2c5619(0x101)]();this[_0x2c5619(0x201)](_0x3fcec3,_0x5a615f,_0x4a1947,_0x27310b,!![]);const _0x1fd3e9=this[_0x2c5619(0x13a)]();return this[_0x2c5619(0x201)](_0x1fd3e9,_0x5a615f,_0x4a1947,_0x27310b,![],'right'),this[_0x2c5619(0x317)](_0x5a615f,_0x4a1947,_0x27310b),this[_0x2c5619(0x3b0)](),!![];},Window_ShopStatus['prototype'][_0x56eb94(0x101)]=function(){const _0x119e89=_0x56eb94;return VisuMZ[_0x119e89(0x91)]['Settings'][_0x119e89(0x2b6)][_0x119e89(0x394)];},Window_ShopStatus[_0x56eb94(0x175)]['getItemEffectsRemovedStatesBuffsText']=function(){const _0x1d8c2c=_0x56eb94,_0x550995=_0x1d8c2c(0x3b9);if(this[_0x1d8c2c(0x22a)][_0x550995])return this['_customItemInfo'][_0x550995];let _0x34f930='',_0xfc8e25=0x0;const _0x1daa3a=VisuMZ[_0x1d8c2c(0x91)][_0x1d8c2c(0x1a2)][_0x1d8c2c(0x2b6)]['MaxIcons'];for(const _0x1f61f1 of this[_0x1d8c2c(0x2f6)][_0x1d8c2c(0x340)]){const _0x381c3e=$dataStates[_0x1f61f1];if(_0x381c3e&&_0x381c3e[_0x1d8c2c(0x1ac)]>0x0){_0x34f930+='\x5cI[%1]'[_0x1d8c2c(0x3bd)](_0x381c3e['iconIndex']),_0xfc8e25++;if(_0xfc8e25>=_0x1daa3a)return _0x34f930;}}for(let _0x3584ab=0x0;_0x3584ab<this[_0x1d8c2c(0x2f6)]['removeBuff'][_0x1d8c2c(0x25c)];_0x3584ab++){const _0x43ede8=Game_BattlerBase['prototype'][_0x1d8c2c(0x1cf)](0x1,_0x3584ab);if(_0x43ede8>0x0){_0x34f930+=_0x1d8c2c(0xd8)[_0x1d8c2c(0x3bd)](_0x43ede8),_0xfc8e25++;if(_0xfc8e25>=_0x1daa3a)return _0x34f930;}}for(let _0x1bd4b0=0x0;_0x1bd4b0<this['_itemData'][_0x1d8c2c(0x24e)][_0x1d8c2c(0x25c)];_0x1bd4b0++){const _0x2ef90c=Game_BattlerBase[_0x1d8c2c(0x175)][_0x1d8c2c(0x1cf)](-0x1,_0x1bd4b0);if(_0x2ef90c>0x0){_0x34f930+='\x5cI[%1]'['format'](_0x2ef90c),_0xfc8e25++;if(_0xfc8e25>=_0x1daa3a)return _0x34f930;}}return _0x34f930;},Window_ShopStatus[_0x56eb94(0x175)]['drawItemCustomEntries']=function(_0x3fbc19,_0x1ae1a1,_0x19f091){const _0x36b445=_0x56eb94;if(this[_0x36b445(0xd7)][_0x36b445(0x278)][_0x36b445(0x382)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x5cffef=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x12cb1b of _0x5cffef){if(_0x12cb1b[_0x36b445(0x382)](/(.*):[ ](.*)/i)){const _0x4141f9=String(RegExp['$1'])[_0x36b445(0x1a5)](),_0x406c2d=String(RegExp['$2'])['trim']();this[_0x36b445(0x1da)](_0x4141f9,_0x406c2d,_0x3fbc19,_0x1ae1a1,_0x19f091),_0x1ae1a1+=this[_0x36b445(0x314)]();}}}return this[_0x36b445(0x3b0)](),_0x1ae1a1;},Window_ShopStatus[_0x56eb94(0x175)][_0x56eb94(0x1da)]=function(_0x196716,_0x11121e,_0x5991be,_0x40a104,_0x220a1d){const _0x5bb581=_0x56eb94;this[_0x5bb581(0x201)](_0x196716,_0x5991be,_0x40a104,_0x220a1d,!![]),this[_0x5bb581(0x201)](_0x11121e,_0x5991be,_0x40a104,_0x220a1d,![],_0x5bb581(0x124)),this['drawItemDarkRect'](_0x5991be,_0x40a104,_0x220a1d),this['resetFontSettings']();};