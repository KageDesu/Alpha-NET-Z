//=============================================================================
// VisuStella MZ - Battle Core
// VisuMZ_1_BattleCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_BattleCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCore = VisuMZ.BattleCore || {};
VisuMZ.BattleCore.version = 1.27;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.27] [BattleCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Battle Core plugin revamps the battle engine provided by RPG Maker MZ to
 * become more flexible, streamlined, and support a variety of features. The
 * updated battle engine allows for custom Action Sequences, battle layout
 * styles, and a lot of control over the battle mechanics, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Action Sequence Plugin Commands to give you full control over what happens
 *   during the course of a skill or item.
 * * Animated Sideview Battler support for enemies!
 * * Auto Battle options for party-wide and actor-only instances.
 * * Base Troop Events to quickly streamline events for all Troop events.
 * * Battle Command control to let you change which commands appear for actors.
 * * Battle Layout styles to change the way the battle scene looks.
 * * Casting animation support for skills.
 * * Critical Hit control over the success rate formula and damage multipliers.
 * * Custom target scopes added for skills and items.
 * * Damage formula control, including Damage Styles.
 * * Damage caps, both hard caps and soft caps.
 * * Damage traits such Armor Penetration/Reduction to bypass defenses.
 * * Elements & Status Menu Core support for traits.
 * * Multitude of JavaScript notetags and global Plugin Parameters to let you
 *   make a variety of effects across various instances during battle.
 * * Party Command window can be skipped/disabled entirely.
 * * Weather effects now show in battle.
 * * Streamlined Battle Log to remove redundant information and improve the
 *   flow of battle.
 * * Visual HP Gauges can be displayed above the heads of actors and/or enemies
 *   with a possible requirement for enemies to be defeated at least once first
 *   in order for them to show.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin will overwrite some core parts of the RPG Maker MZ base code in
 * order to ensure the Battle Core plugin will work at full capacity. The
 * following are explanations of what has been changed.
 *
 * ---
 *
 * Action Sequences
 *
 * - Action sequences are now done either entirely by the Battle Log Window or
 * through common events if the <Custom Action Sequence> notetag is used.
 * In RPG Maker MZ by default, Action Sequences would be a mixture of using the
 * Battle Log Window, the Battle Manager, and the Battle Scene, making it hard
 * to fully grab control of the situation.
 *
 * ---
 *
 * Action Speed
 *
 * - Action speeds determine the turn order in the default battle system. The
 * AGI of a battle unit is also taken into consideration. However, the random
 * variance applied to the action speed system makes the turn order extremely
 * chaotic and hard for the player to determine. Thus, the random variance
 * aspect of it has been turned off. This can be reenabled by default through
 * Plugin Parameters => Mechanics Settings => Allow Random Speed?
 *
 * ---
 *
 * Animated Sideview Battler Support For Enemies
 *
 * - Enemies can now use Sideview Actor sprites for themselves! They will
 * behave like actors and can even carry their own set of weapons for physical
 * attacks. These must be set up using notetags. More information can be found
 * in the notetag section.
 *
 * - As the sprites are normally used for actors, some changes have been made
 * to Sprite_Actor to be able to support both actors and enemies. These changes
 * should have minimal impact on other plugins.
 *
 * ---
 *
 * Battle Sprite Updates
 *
 * - A lot of functions in Sprite_Battler, Sprite_Actor, and Sprite_Enemy have
 * been overwritten to make the new Action Sequence system added by this plugin
 * possible. These changes make it possible for the sprites to move anywhere on
 * the screen, jump, float, change visibility, and more.
 *
 * ---
 *
 * Change Battle Back in Battle
 * 
 * - By default, the Change Battle Back event command does not work in battle.
 * Any settings made to it will only reflect in the following battle. Now, if
 * the battle back event command is used during battle, it will reflect upon
 * any new changes immediately.
 *
 * ---
 *
 * Critical Hit - LUK Influence
 *
 * - The LUK Buffs now affect the critical hit rate based off how the formula
 * is now calculated. Each stack of a LUK Buff will double the critical hit
 * rate and compound upon that. That means a x1 LUK Buff stack will raise it by
 * x2, a x2 LUK Buff stack will raise the critical hit rate by x4, a x3 LUK
 * Buff Stack will raise the critical hit rate stack by x8, and so on.
 *
 * - LUK also plays a role in how much damage is dealt with critical hits. The
 * default critical hit multiplier has been reduced from x3 to x2. However, a
 * percentage of LUK will added on (based off the user's CRI rate) onto the
 * finalized critical damage. If the user's CRI rate is 4%, then 4% of the user
 * LUK value will also be added onto the damage.
 *
 * - This change can be altered through Plugin Parameters => Damage Settings =>
 * Critical Hits => JS: Rate Formula and JS: Damage Formula.
 *
 * ---
 * 
 * Damage Popups
 * 
 * - Damage popups are now formatted with + and - to determine healing and
 * damage. MP Damage will also include "MP" at the back. This is to make it
 * clearer what each colored variant of the damage popup means as well as help
 * color blind players read the on-screen data properly.
 * 
 * - Damage popups have also been rewritten to show all changed aspects instead
 * of just one. Previously with RPG Maker MZ, if an action would deal both HP
 * and MP damage, only one of them would show. Now, everything is separated and
 * both HP and MP changes will at a time.
 * 
 * ---
 * 
 * Dual Wielding
 * 
 * - Previously, RPG Maker MZ had "Dual Wielding" attack using both weapon
 * animations at once, with the combined ATK of each weapon. It's confusing to
 * look at and does not portray the nature of "Dual Wielding".
 * 
 * - Dual Wielding, or in the case of users adding in third and fourth weapons,
 * Multi Wielding is now changed. Each weapon is displayed individually, each
 * producing its own attack animation, showing each weapon type, and applying
 * only that weapon's ATK, Traits, and related effects. It is no longer a
 * combined effect to display everything at once like RPG Maker MZ default.
 * 
 * - If an actor has multiple weapon slots but some of them are unequipped,
 * then the action will treat the attack as a single attack. There will be no
 * barehanded attack to add on top of it. This is to match RPG Maker MZ's
 * decision to omit a second animation if the same scenario is applied.
 * 
 * ---
 *
 * Force Action
 *
 * - Previously, Forced Actions would interrupt the middle of an event to
 * perform an action. However, with the addition of more flexible Action
 * Sequences, the pre-existing Force Action system would not be able to exist
 * and would require being remade.
 *
 * - Forced Actions now are instead, added to a separate queue from the action
 * battler list. Whenever an action and/or common event is completed, then if
 * there's a Forced Action battler queued, then the Forced Action battler will
 * have its turn. This is the cleanest method available and avoids the most
 * conflicts possible.
 *
 * - This means if you planned to make cinematic sequences with Forced Actions,
 * you will need to account for the queued Force Actions. However, in the case
 * of battle cinematics, we would highly recommend that you use the newly added
 * Action Sequence Plugin Commands instead as those give you more control than
 * any Force Action ever could.
 *
 * ---
 *
 * Random Scope
 *
 * - The skill and item targeting scopes for Random Enemy, 2 Random Enemies,
 * 3 Random Enemies, 4 Random Enemies will now ignore TGR and utilize true
 * randomness.
 *
 * ---
 *
 * Spriteset_Battle Update
 *
 * - The spriteset now has extra containers to separate battlers (actors and
 * enemies), animations, and damage. This is to make actors and enemy battler
 * sprites more efficient to sort (if enabled), so that animations won't
 * interfere with and cover damage sprites, and to make sure damage sprites are
 * unaffected by screen tints in order to ensure the player will always have a
 * clear read on the information relaying sprites.
 *
 * ---
 *
 * Weather Displayed in Battle
 *
 * - Previously, weather has not been displayed in battle. This means that any
 * weather effects placed on the map do not transfer over to battle and causes
 * a huge disconnect for players. The Battle Core plugin will add weather
 * effects to match the map's weather conditions. Any changes made to weather
 * through event commands midway through battle will also be reflected.
 *
 * ---
 *
 * ============================================================================
 * Base Troops
 * ============================================================================
 *
 * Base Troops can be found, declared, and modified in the Plugin Parameters =>
 * Mechanics Settings => Base Troop ID's. All of the listed Troop ID's here
 * will have their page events replicated and placed under all other troops
 * found in the database.
 *
 * ---
 *
 * This means that if you have an event that runs on Turn 1 of a Base Troop,
 * then for every troop out there, that same event will also run on Turn 1,
 * as well. This is useful for those who wish to customize their battle system
 * further and to reduce the amount of work needed to copy/paste said event
 * pages into every database troop object manually.
 *
 * ---
 *
 * ============================================================================
 * Damage Styles
 * ============================================================================
 *
 * Damage Styles are a new feature added through the Battle Core plugin. When
 * using certain Battle Styles, you can completely ignore typing in the whole
 * damage formula inside the damage formula input box, and instead, insert
 * either a power amount or a multiplier depending on the Damage Style. The
 * plugin will then automatically calculate damage using that value factoring
 * in ATK, DEF, MAT, MDF values.
 *
 * ---
 *
 * Here is a list of the Damage Styles that come with this plugin by default.
 * You can add in your own and even edit them to your liking.
 * Or just remove them if you want.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Style          Use Formula As   PH/MA Disparity   Stat Scale   Damage Scale
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Standard       Formula          No                Varies       Varies
 * ArmorScaling   Formula          No                Varies       Varies
 * CT             Multiplier       Yes               Low          Normal
 * D4             Multiplier       No                High         Normal
 * DQ             Multiplier       No                Low          Low
 * FF7            Power            Yes               Low          High
 * FF8            Power            Yes               Medium       Normal
 * FF9            Power            Yes               Low          Normal
 * FF10           Power            Yes               Medium       High
 * MK             Multiplier       No                Medium       Low
 * MOBA           Multiplier       No                Medium       Normal
 * PKMN           Power            No                Low          Normal
 *
 * Use the above chart to figure out which Damage Style best fits your game,
 * if you plan on using them.
 *
 * The 'Standard' style is the same as the 'Manual' formula input, except that
 * it allows for the support of <Armor Penetration> and <Armor Reduction>
 * notetags.
 *
 * The 'Armor Scaling' style allows you to type in the base damage calculation
 * without the need to type in any defending modifiers.
 *
 * NOTE: While these are based off the damage formulas found in other games,
 * not all of them are exact replicas. Many of them are adapted for use in
 * RPG Maker MZ since not all RPG's use the same set of parameters and not all
 * external multipliers function the same way as RPG Maker MZ.
 * 
 * ---
 *
 * Style:
 * - This is what the Damage Style is.
 *
 * Use Formula As:
 * - This is what you insert into the formula box.
 * - Formula: Type in the formula for the action just as you would normally.
 * - Multiplier: Type in the multiplier for the action.
 *     Use float values. This means 250% is typed out as 2.50
 * - Power: Type in the power constant for the action.
 *     Use whole numbers. Type in something like 16 for a power constant.
 * 
 * PH/MA Disparity:
 * - Is there a disparity between how Physical Attacks and Magical Attacks
 *   are calculated?
 * - If yes, then physical attacks and magical attacks will have different
 *   formulas used.
 * - If no, then physical attacks and magical attacks will share similar
 *   formulas for how they're calculated.
 *
 * Stat Scale:
 * - How much should stats scale throughout the game?
 * - Low: Keep them under 100 for the best results.
 * - Medium: Numbers work from low to mid 400's for best results.
 * - High: The numbers really shine once they're higher.
 *
 * Damage Scale:
 * - How much does damage vary depending on small parameter changes?
 * - Low: Very little increase from parameter changes.
 * - Normal: Damage scales close to proportionally with parameter changes.
 * - High: Damage can boost itself drastically with parameter changes.
 *
 * ---
 *
 * To determine what kind of parameters are used for the Damage Styles, they
 * will depend on two things: the action's 'Hit Type' (ie Physical Attack,
 * Magical Attack, and Certain Hit) and the action's 'Damage Type' (ie. Damage,
 * Recovery, or Drain).
 *
 * Certain Hit tends to use whichever value is higher: ATK or MAT, and then
 * ignores the target's defense values. Use Certain Hits for 'True Damage'.
 *
 * Use the chart below to figure out everything else:
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Hit Type      Damage Type   Attacker Parameter   Defender Parameter
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Physical      Damage        ATK                  DEF
 * Magical       Damage        MAT                  MDF
 * Certain Hit   Damage        Larger (ATK, MAT)    -Ignores-
 * Physical      Recover       DEF                  -Ignores-
 * Magical       Recover       MDF                  -Ignores-
 * Certain Hit   Recover       Larger (ATK, MAT)    -Ignores-
 * Physical      Drain         ATK                  DEF
 * Magical       Drain         MAT                  MDF
 * Certain Hit   Drain         Larger (ATK, MAT)    -Ignores-
 *
 * These can be modified within the Plugin Parameters in the individual
 * Damage Styles themselves.
 *
 * ---
 *
 * Skills and Items can use different Damage Styles from the setting you've
 * selected in the Plugin Parameters. They can be altered to have different
 * Damage Styles through the usage of a notetag:
 *
 * <Damage Style: name>
 *
 * This will use whichever style is found in the Plugin Parameters.
 *
 * If "Manual" is used, then no style will be used and all calculations will be
 * made strictly based off the formula found inside the formula box.
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
 * === HP Gauge-Related Notetags ===
 * 
 * The following notetags allow you to set whether or not HP Gauges can be
 * displayed by enemies regardless of Plugin Parameter settings.
 * 
 * ---
 *
 * <Show HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always show the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * - This does not bypass disabling enemy HP Gauges as a whole.
 * 
 * ---
 *
 * <Hide HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always hide the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * 
 * ---
 * 
 * <Battle UI Offset: +x, +y>
 * <Battle UI Offset: -x, -y>
 * 
 * <Battle UI Offset X: +x>
 * <Battle UI Offset X: -x>
 * 
 * <Battle UI Offset Y: +y>
 * <Battle UI Offset Y: -y>
 * 
 * - Used for: Actor and Enemy Notetags
 * - Adjusts the offset of HP Gauges and State Icons above the heads of actors
 *   and enemies.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 *
 * === Animation-Related Notetags ===
 *
 * The following notetags allow you to set animations to play at certain
 * instances and/or conditions.
 *
 * ---
 *
 * <Slip Animation: x>
 *
 * - Requires VisuMZ_0_CoreEngine!
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - During the phase at which the user regenerates HP, MP, or TP, this
 *   animation will play as long as the user is alive and visible.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Cast Animation: x>
 *
 * - Used for: Skill Notetags
 * - Plays a battle animation at the start of the skill.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Attack Animation: x>
 *
 * - Used for: Enemy Notetags
 * - Gives an enemy an attack animation to play for its basic attack.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * === Battleback-Related Notetags ===
 *
 * You can apply these notetags to have some control over the battlebacks that
 * appear in different regions of the map for random or touch encounters.
 *
 * ---
 *
 * <Region x Battleback1: filename>
 * <Region x Battleback2: filename>
 * 
 * - Used for: Map Notetags
 * - If the player starts a battle while standing on 'x' region, then the
 *   'filename' battleback will be used.
 * - Replace 'x' with a number representing the region ID you wish to use.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Castle1.png' will be only inserted
 *   as 'Castle1' without the '.png' at the end.
 * - *NOTE: This will override any specified battleback settings.
 *
 * ---
 *
 * === Battle Command-Related Notetags ===
 *
 * You can use notetags to change how the battle commands of playable
 * characters appear in battle as well as whether or not they can be used.
 *
 * ---
 *
 * <Seal Attack>
 * <Seal Guard>
 * <Seal Item>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Prevents specific battle commands from being able to be used.
 *
 * ---
 *
 * <Battle Commands>
 *  Attack
 *  Skills
 *  SType: x
 *  SType: name
 *  All Skills
 *  Skill: x
 *  Skill: name
 *  Guard
 *  Item
 *  Party
 *  Escape
 *  Auto Battle
 *  Combat Log
 * </Battle Commands>
 *
 * - Used for: Class Notetags
 * - Changes which commands appear in the Actor Command Window in battle.
 *   If this notetag is not used, then the default commands determined in
 *   Plugin Parameters => Actor Command Window => Command List will be used.
 * - Add/remove/modify entries as needed.
 *
 * - Attack 
 *   - Adds the basic attack command.
 * 
 * - Skills
 *   - Displays all the skill types available to the actor.
 * 
 * - SType: x
 * - Stype: name
 *   - Adds in a specific skill type.
 *   - Replace 'x' with the ID of the skill type.
 *   - Replace 'name' with the name of the skill type (without text codes).
 *
 * - All Skills
 *   - Adds all usable battle skills as individual actions.
 * 
 * - Skill: x
 * - Skill: name
 *   - Adds in a specific skill as a usable action.
 *   - Replace 'x' with the ID of the skill.
 *   - Replace 'name' with the name of the skill.
 * 
 * - Guard
 *   - Adds the basic guard command.
 * 
 * - Item
 *   - Adds the basic item command.
 *
 * - Party
 *   - Requires VisuMZ_2_PartySystem.
 *   - Allows this actor to switch out with a different party member.
 * 
 * - Escape
 *   - Adds the escape command.
 * 
 * - Auto Battle
 *   - Adds the auto battle command.
 *
 * Example:
 *
 * <Battle Commands>
 *  Attack
 *  Skill: Heal
 *  Skills
 *  Guard
 *  Item
 *  Escape
 * </Battle Commands>
 *
 * ---
 *
 * <Command Text: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill name text that appears to something else.
 * - Replace 'x' with the skill's name you want to shown in the Actor Battle
 *   Command window.
 * - Recommended Usage: Shorten skill names that are otherwise too big to fit
 *   inside of the Actor Battle Command window.
 *
 * ---
 *
 * <Command Icon: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill icon that appears to something else.
 * - Replace 'x' with the ID of icon you want shown in the Actor Battle Command
 *   window to represent the skill.
 *
 * ---
 * 
 * <Command Show Switch: x>
 * 
 * <Command Show All Switches: x,x,x>
 * <Command Show Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all
 *   switches are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Command Hide Switch: x>
 * 
 * <Command Hide All Switches: x,x,x>
 * <Command Hide Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be shown until all
 *   switches are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Battle Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" Battle Layout.
 * - Sets the battle portrait image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - This will override any menu images used for battle only.
 * 
 * ---
 * 
 * <Battle Portrait Offset: +x, +y>
 * <Battle Portrait Offset: -x, -y>
 * 
 * <Battle Portrait Offset X: +x>
 * <Battle Portrait Offset X: -x>
 * 
 * <Battle Portrait Offset Y: +y>
 * <Battle Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" and "Border" Battle Layouts.
 * - Offsets the X and Y coordinates for the battle portrait.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 * 
 * === JavaScript Notetag: Battle Command-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if skill-based battle commands are visible or hidden.
 * 
 * ---
 * 
 * <JS Command Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Command Visible>
 * 
 * - Used for: Skill Notetags
 * - The 'visible' variable is the final returned variable to determine the
 *   skill's visibility in the Battle Command Window.
 * - Replace 'code' with JavaScript code to determine the skill's visibility in
 *   the Battle Command Window.
 * - The 'user' variable represents the user who will perform the skill.
 * - The 'skill' variable represents the skill to be used.
 * 
 * ---
 *
 * === Targeting-Related Notetags ===
 *
 * The following notetags are related to the targeting aspect of skills and
 * items and may adjust the scope of how certain skills/items work.
 *
 * ---
 *
 * <Always Hit>
 *
 * <Always Hit Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to always hit or to always have a hit rate of exactly
 *   the marked x%.
 * - Replace 'x' with a number value representing the hit success percentage.
 *
 * ---
 *
 * <Repeat Hits: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the number of hits the action will produce.
 * - Replace 'x' with a number value representing the number of hits to incur.
 *
 * ---
 *
 * <Target: x Random Any>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets can be both actors and enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Enemies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Allies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only actors.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: All Allies But User>
 *
 * - Used for: Skill, Item Notetags
 * - Targets all allies with the exception of the user.
 *
 * ---
 *
 * === JavaScript Notetag: Targeting-Related ===
 *
 * ---
 * 
 * <JS Targets>
 *  code
 *  code
 *  targets = [code];
 * </JS Targets>
 *
 * - Used for: Skill, Item Notetags
 * - The 'targets' variable is an array that is returned to be used as a
 *   container for all the valid action targets.
 * - Replace 'code' with JavaScript code to determine valid targets.
 *
 * ---
 *
 * === Damage-Related Notetags ===
 *
 * ---
 *
 * <Damage Style: name>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'name' with a Damage Style name to change the way calculations are
 *   made using the damage formula input box.
 * - Names can be found in Plugin Parameters => Damage Settings => Style List
 *
 * ---
 *
 * <Armor Reduction: x>
 * <Armor Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Armor Penetration: x>
 * <Armor Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Magic Reduction: x>
 * <Magic Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Magic Penetration: x>
 * <Magic Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Bypass Damage Cap>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage capped.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage capped.
 *
 * ---
 *
 * <Damage Cap: x>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will declare the hard damage cap to
 *   be the 'x' value.
 * - If used on trait objects, this will raise the affect unit's hard damage
 *   cap to 'x' value. If another trait object has a higher value, use that
 *   value instead.
 *
 * ---
 *
 * <Bypass Soft Damage Cap>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage scaled downward to the soft cap.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage scaled downward to the soft cap.
 *
 * ---
 *
 * <Soft Damage Cap: +x%>
 * <Soft Damage Cap: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will increase/decrease the action's
 *   soft cap by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 * - If used on trait objects, this will raise the affect unit's soft damage
 *   limit by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 *
 * ---
 *
 * <Unblockable>
 *
 * - Used for: Skill, Item Notetags
 * - Using "Guard" against this skill will not reduce any damage.
 *
 * ---
 *
 * === Critical-Related Notetags ===
 *
 * The following notetags affect skill and item critical hit rates and the
 * critical damage multiplier.
 *
 * ---
 *
 * <Always Critical>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always land a critical hit regardless of the
 *   user's CRI parameter value.
 *
 * ---
 *
 * <Set Critical Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always have a x% change to land a critical hit
 *   regardless of user's CRI parameter value.
 * - Replace 'x' with a percerntage value representing the success rate.
 *
 * ---
 *
 * <Modify Critical Rate: x%>
 * <Modify Critical Rate: +x%>
 * <Modify Critical Rate: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Modifies the user's CRI parameter calculation for this skill/item.
 * - The 'x%' notetag variant will multiply the user's CRI parameter value
 *   for this skill/item.
 * - The '+x%' and '-x%' notetag variants will incremenetally increase/decrease
 *   the user's CRI parameter value for this skill/item.
 *
 * ---
 *
 * <Modify Critical Multiplier: x%>
 * <Modify Critical Multiplier: +x%>
 * <Modify Critical Multiplier: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the damage multiplier when a critical hit lands.
 * - The 'x%' notetag variant multiply the multiplier to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the multiplier with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * <Modify Critical Bonus Damage: x%>
 * <Modify Critical Bonus Damage: +x%>
 * <Modify Critical Bonus Damage: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the bonus damage added when a critical hit lands.
 * - The 'x%' notetag variant multiply the damage to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the bonus damage with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * === JavaScript Notetags: Critical-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine how critical hit-related aspects are calculated.
 *
 * ---
 *
 * <JS Critical Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Critical Rate>
 *
 * - Used for: Skill, Item Notetags
 * - The 'rate' variable is the final returned amount to determine the
 *   critical hit success rate.
 * - Replace 'code' with JavaScript code to determine the final 'rate' to be
 *   returned as the critical hit success rate.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Critical Damage>
 *  code
 *  code
 *  multiplier = code;
 *  bonusDamage = code;
 * </JS Critical Damage>
 *
 * - Used for: Skill, Item Notetags
 * - The 'multiplier' variable is returned later and used as the damage
 *   multiplier used to amplify the critical damage amount.
 * - The 'bonusDamage' variable is returned later and used as extra added
 *   damage for the critical damage amount.
 * - Replace 'code' with JavaScript code to determine how the 'multiplier' and
 *   'bonusDamage' variables are calculated.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * === Action Sequence-Related Notetags ===
 *
 * Action Sequences allow you full control over how a skill and/or item plays
 * through its course. These notetags give you control over various aspects of
 * those Action Sequences. More information is found in the Action Sequences
 * help section.
 *
 * ---
 *
 * <Custom Action Sequence>
 *
 * - Used for: Skill, Item Notetags
 * - Removes all automated Action Sequence parts from the skill.
 * - Everything Action Sequence-related will be done by Common Events.
 * - Insert Common Event(s) into the skill/item's effects list to make use of
 *   the Custom Action Sequences.
 * - This will prevent common events from loading in the Item Scene and Skill
 *   Scene when used outside of battle.
 *
 * ---
 * 
 * <Auto Action Sequence>
 * 
 * - Used for: Skill, Item Notetags
 * - If the Action Sequence Plugin Parameter "Auto Notetag" is enabled, this
 *   plugin will prevent custom action sequences from happening for the skill
 *   or item, and instead, use an Automatic Action Sequence instead.
 * - Ignore this if you have "Auto Notetag" disabled or set to false.
 * 
 * ---
 * 
 * <Common Event: name>
 *
 * - Used for: Skill, Item Notetags
 * - Battle only: calls forth a Common Event of a matching name.
 * - Replace 'name' with the name of a Common Event to call from when this
 *   skill/item is used in battle.
 *   - Remove any \I[x] in the name.
 * - Insert multiple notetags to call multiple Common Events in succession.
 * - This will occur after any Common Event Trait Effects for the skill/item's
 *   database entry.
 * - This is primarily used for users who are reorganizing around their Common
 *   Events and would still like to have their skills/items perform the correct
 *   Action Sequences in case the ID's are different.
 * 
 * ---
 *
 * <Display Icon: x>
 * <Display Text: string>
 *
 * - Used for: Skill, Item Notetags
 * - When displaying the skill/item name in the Action Sequence, determine the
 *   icon and/or text displayed.
 * - Replace 'x' with a number value representing the icon ID to be displayed.
 * - Replace 'string' with a text value representing the displayed name.
 *
 * ---
 *
 * === Animated Sideview Battler-Related Notetags ===
 *
 * Enemies can use Animated Sideview Actor graphics thanks to this plugin.
 * These notetags give you control over that aspect. Some of these also affect
 * actors in addition to enemies.
 *
 * ---
 *
 * <Sideview Battler: filename>
 *
 * <Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Replaces the enemy's battler graphic with an animated Sideview Actor
 *   graphic found in the img/sv_actors/ folder.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Sideview Battlers>
 *
 * ---
 *
 * <Sideview Anchor: x, y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the sprite anchor positions for the sideview sprite.
 * - Replace 'x' and 'y' with numbers depicting where the anchors should be for
 *   the sideview sprite.
 * - By default, the x and y anchors are 0.5 and 1.0.
 *
 * ---
 * 
 * <Sideview Home Offset: +x, +y>
 * <Sideview Home Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Offsets the sideview actor sprite's home position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * - This notetag will not work if you remove it from the JavaScript code in
 *   Plugin Parameters > Actor > JS:  Home Position
 * 
 * ---
 * 
 * <Sideview Weapon Offset: +x, +y>
 * <Sideview Weapon Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy State Notetags
 * - Offsets the sideview weapon sprite's position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * 
 * ---
 *
 * <Sideview Show Shadow>
 * <Sideview Hide Shadow>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets it so the sideview battler's shadow will be visible or hidden.
 *
 * ---
 *
 * <Sideview Collapse>
 * <Sideview No Collapse>
 *
 * - Used for: Enemy Notetags
 * - Either shows the collapse graphic or does not show the collapse graphic.
 * - Collapse graphic means the enemy will 'fade away' once it's defeated.
 * - No collapse graphic means the enemy's corpse will remain on the screen.
 *
 * ---
 *
 * <Sideview Idle Motion: name>
 *
 * <Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Changes the default idle motion for the enemy.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Idle Motions>
 *  walk: 25
 *  wait: 50
 *  guard
 *  victory
 *  abnormal
 * </Sideview Idle Motions>
 *
 * ---
 *
 * <Sideview Size: width, height>
 *
 * - Used for: Enemy Notetags
 * - When using a sideview battler, its width and height will default to the
 *   setting made in Plugin Parameters => Enemy Settings => Size: Width/Height.
 * - This notetag lets you change that value to something else.
 * - Replace 'width' and 'height' with numbers representing how many pixels
 *   wide/tall the sprite will be treated as.
 *
 * ---
 *
 * <Sideview Weapon: weapontype>
 *
 * <Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Give your sideview enemies weapons to use.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Sideview Weapons>
 *
 * ---
 *
 * <traitname Sideview Battler: filename>
 *
 * <traitname Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Male Sideview Battlers>
 *
 * <Female Sideview Battlers>
 *  Actor1_2: 25
 *  Actor1_4: 10
 *  Actor1_6
 *  Actor1_8
 * </Female Sideview Battlers>
 *
 * ---
 *
 * <traitname Sideview Idle Motion: name>
 *
 * <traitname Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </traitname Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique idle motions.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Jolly Sideview Idle Motions>
 *  wait: 25
 *  victory: 10
 *  walk
 * </Jolly Sideview Idle Motions>
 *
 * <Serious Sideview Idle Motions>
 *  walk: 25
 *  guard: 10
 *  wait
 * </Jolly Sideview Idle Motions>
 *
 * ---
 *
 * <traitname Sideview Weapon: weapontype>
 *
 * <traitname Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </traitname Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique weapons.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Male Sideview Weapons>
 *
 * <Female Sideview Weapons>
 *  Dagger: 25
 *  Spear: 25
 *  Cane
 * </Female Sideview Weapons>
 *
 * ---
 *
 * === Enemy-Related Notetags ===
 *
 * ---
 *
 * <Battler Sprite Cannot Move>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to move, jump, and/or float due to
 *   Action Sequences. Useful for rooted enemies.
 *
 * ---
 * 
 * <Battler Sprite Grounded>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to jumping and/or floating due to
 *   Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * ---
 *
 * <Swap Enemies>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Swap Enemies>
 *
 * - Used for: Enemy Notetags
 * - Causes this enemy database object to function as a randomizer for any of
 *   the listed enemies inside the notetag. When the enemy is loaded into the
 *   battle scene, the enemy is immediately replaced with one of the enemies
 *   listed. The randomization is based off the 'weight' given to each of the
 *   enemy 'names'.
 * - Replace 'name' with the database enemy of the enemy you wish to replace
 *   the enemy with.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Swap Enemies>
 *  Bat: 50
 *  Slime: 25
 *  Orc
 *  Minotaur
 * </Swap Enemies>
 *
 * ---
 *
 * === JavaScript Notetags: Mechanics-Related ===
 *
 * These JavaScript notetags allow you to run code at specific instances during
 * battle provided that the unit has that code associated with them in a trait
 * object (actor, class, weapon, armor, enemy, or state). How you use these is
 * entirely up to you and will depend on your ability to understand the code
 * used and driven for each case.
 *
 * ---
 *
 * <JS Pre-Start Battle>
 *  code
 *  code
 *  code
 * </JS Pre-Start Battle>
 *
 * <JS Post-Start Battle>
 *  code
 *  code
 *  code
 * </JS Post-Start Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of battle aimed at the function:
 *   BattleManager.startBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Start Turn>
 *
 * <JS Post-Start Turn>
 *  code
 *  code
 *  code
 * </JS Post-Start Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of a turn aimed at the function:
 *   BattleManager.startTurn()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Action>
 *  code
 *  code
 *  code
 * </JS Pre-Start Action>
 *
 * <JS Post-Start Action>
 *  code
 *  code
 *  code
 * </JS Post-Start Action>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action aimed at the function:
 *   BattleManager.startAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Apply>
 *  code
 *  code
 *  code
 * </JS Pre-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Apply as User>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as User>
 *
 * <JS Pre-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage>
 *  code
 *  code
 *  code
 * </JS Pre-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage as User>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as User>
 *
 * <JS Pre-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage>
 *  code
 *  code
 *  code
 * </JS Post-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage as User>
 *  code
 *  code
 *  code
 * </JS Post-Damage as User>
 *
 * <JS Post-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Post-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply>
 *  code
 *  code
 *  code
 * </JS Post-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply as User>
 *  code
 *  code
 *  code
 * </JS Post-Apply as User>
 *
 * <JS Post-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Post-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 *
 * ---
 *
 * <JS Pre-End Action>
 *  code
 *  code
 *  code
 * </JS Pre-End Action>
 *
 * <JS Post-End Action>
 *  code
 *  code
 *  code
 * </JS Post-End Action>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action aimed at the function:
 *   BattleManager.endAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Turn>
 *  code
 *  code
 *  code
 * </JS Pre-End Turn>
 *
 * <JS Post-End Turn>
 *  code
 *  code
 *  code
 * </JS Post-End Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of a turn aimed at the function:
 *   Game_Battler.prototype.onTurnEnd()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Regenerate>
 *  code
 *  code
 *  code
 * </JS Pre-Regenerate>
 *
 * <JS Post-Regenerate>
 *  code
 *  code
 *  code
 * </JS Post-Regenerate>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a unit regenerates HP/MP aimed at the function:
 *   Game_Battler.prototype.regenerateAll()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Victory>
 *  code
 *  code
 *  code
 * </JS Battle Victory>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is won aimed at the function:
 *   BattleManager.processVictory()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Success>
 *  code
 *  code
 *  code
 * </JS Escape Success>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping succeeds aimed at the function:
 *   BattleManager.onEscapeSuccess()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Failure>
 *  code
 *  code
 *  code
 * </JS Escape Failure>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping fails aimed at the function:
 *   BattleManager.onEscapeFailure()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Defeat>
 *  code
 *  code
 *  code
 * </JS Battle Defeat>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is lost aimed at the function:
 *   BattleManager.processDefeat()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Battle>
 *  code
 *  code
 *  code
 * </JS Pre-End Battle>
 *
 * <JS Post-End Battle>
 *  code
 *  code
 *  code
 * </JS Post-End Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when the battle is over aimed at the function:
 *   BattleManager.endBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 * 
 * === Battle Layout-Related Notetags ===
 * 
 * These tags will change the battle layout for a troop regardless of how the
 * plugin parameters are set up normally. Insert these tags in either the
 * noteboxes of maps or the names of troops for them to take effect. If both
 * are present for a specific battle, then priority goes to the setting found
 * in the troop name.
 * 
 * ---
 * 
 * <Layout: type>
 * <Battle Layout: type>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle layout style used for this specific map or battle.
 * - Replace 'type' with 'default', 'list', 'xp', 'portrait', or 'border'.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * Skills and items, when used in battle, have a pre-determined series of
 * actions to display to the player as a means of representing what's going on
 * with the action. For some game devs, this may not be enough and they would
 * like to get more involved with the actions themselves.
 *
 * Action Sequences, added through this plugin, enable this. To give a skill or
 * item a Custom Action Sequence, a couple of steps must be followed:
 *
 * ---
 *
 * 1. Insert the <Custom Action Sequence> notetag into the skill or item's
 *    notebox (or else this would not work as intended).
 * 2. Give that skill/item a Common Event through the Effects box. The selected
 *    Common Event will contain all the Action Sequence data.
 * 3. Create the Common Event with Action Sequence Plugin Commands and/or event
 *    commands to make the skill/item do what you want it to do.
 *
 * ---
 *
 * The Plugin Commands added through the Battle Core plugin focus entirely on
 * Action Sequences. However, despite the fact that they're made for skills and
 * items, some of these Action Sequence Plugin Commands can still be used for
 * regular Troop events and Common Events.
 *
 * ---
 *
 * === Action Sequence - Action Sets ===
 *
 * Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * ---
 *
 * ACSET: Setup Action Set
 * - The generic start to most actions.
 *
 *   Display Action:
 *   Immortal: On:
 *   Battle Step:
 *   Wait For Movement:
 *   Cast Animation:
 *   Wait For Animation:
 *   - Use this part of the action sequence?
 *
 * ---
 *
 * ACSET: All Targets Action Set
 * - Affects all targets simultaneously performing the following.
 *
 *   Dual/Multi Wield?
 *   - Add times struck based on weapon quantity equipped?
 * 
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait For Animation:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Each Target Action Set
 * - Goes through each target one by one to perform the following.
 *
 *   Dual/Multi Wield?
 *   - Add times struck based on weapon quantity equipped?
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait Count:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Finish Action
 * - The generic ending to most actions.
 *
 *   Wait For New Line:
 *   Wait For Effects:
 *   Clear Battle Log:
 *   Home Reset:
 *   Wait For Movement:
 *   - Use this part of the action sequence?
 *
 * ---
 * 
 * === Action Sequences - Angle ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Animations ===
 *
 * These Action Sequences are related to the 'Animations' that can be found in
 * the Animations tab of the Database.
 *
 * ---
 *
 * ANIM: Action Animation
 * - Plays the animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation
 * - Plays the animation associated with the user's weapon.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation 2+
 * - Plays the animation associated with the user's other weapons.
 * - Plays nothing if there is no other weapon equipped.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 * 
 *   Slot:
 *   - Which weapon slot to get this data from?
 *   - Main-hand weapon is weapon slot 1.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Cast Animation
 * - Plays the cast animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Change Battle Portrait
 * - Changes the battle portrait of the actor (if it's an actor).
 * - Can be used outside of battle/action sequences.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *   - Valid units can only be actors.
 *
 *   Filename:
 *   - Select the file to change the actor's portrait to.
 *
 * ---
 *
 * ANIM: Show Animation
 * - Plays the a specific animation on unit(s).
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Animation ID:
 *   - Select which animation to play on unit(s).
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Wait For Animation
 * - Causes the interpreter to wait for any animation(s) to finish.
 *
 * ---
 *
 * === Action Sequences - Battle Log ===
 *
 * These Action Sequences are related to the Battle Log Window, the window
 * found at the top of the battle screen.
 *
 * ---
 *
 * BTLOG: Add Text
 * - Adds a new line of text into the Battle Log.
 *
 *   Text:
 *   - Add this text into the Battle Log.
 *   - Text codes allowed.
 * 
 *   Copy to Combat Log?:
 *   - Copies text to the Combat Log.
 *   - Requires VisuMZ_4_CombatLog
 * 
 *     Combat Log Icon:
 *     - What icon would you like to bind to this entry?
 *     - Requires VisuMZ_4_CombatLog
 *
 * ---
 *
 * BTLOG: Clear Battle Log
 * - Clears all the text in the Battle Log.
 *
 * ---
 *
 * BTLOG: Display Action
 * - plays the current action in the Battle Log.
 *
 * ---
 *
 * BTLOG: Pop Base Line
 * - Removes the Battle Log's last added base line and  all text up to its
 *   former location.
 *
 * ---
 *
 * BTLOG: Push Base Line
 * - Adds a new base line to where the Battle Log currently is at.
 *
 * ---
 *
 * BTLOG: Refresh Battle Log
 * - Refreshes the Battle Log.
 *
 * ---
 *
 * BTLOG: UI Show/Hide
 * - Shows or hides the Battle UI (including the Battle Log).
 *
 *   Show/Hide?:
 *   - Shows/hides the Battle UI.
 *
 * ---
 *
 * BTLOG: Wait For Battle Log
 * - Causes the interpreter to wait for the Battle Log to finish.
 *
 * ---
 *
 * BTLOG: Wait For New Line
 * - Causes the interpreter to wait for a new line in the Battle Log.
 *
 * ---
 *
 * === Action Sequences - Camera ===
 *
 * These Action Sequences are battle camera-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Dragonbones ===
 *
 * These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * ---
 *
 * DB: Dragonbones Animation
 * - Causes the unit(s) to play a Dragonbones motion animation.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Motion Animation:
 *   - What is the name of the Dragonbones motion animation you wish to play?
 *
 * ---
 *
 * DB: Dragonbones Time Scale
 * - Causes the unit(s) to change their Dragonbones time scale.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Time Scale:
 *   - Change the value of the Dragonbones time scale to this.
 *
 * ---
 *
 * === Action Sequences - Elements ===
 *
 * These Action Sequences can change up the element(s) used for the action's
 * damage calculation midway through an action.
 *
 * They also require the VisuMZ_1_ElementStatusCore plugin to be present in
 * order for them to work.
 *
 * ---
 *
 * ELE: Add Elements
 * - Adds element(s) to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to add onto the action.
 *   - Insert multiple element ID's to add multiple at once.
 *
 * ---
 *
 * ELE: Clear Element Changes
 * - Clears all element changes made through Action Sequences.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * ELE: Force Elements
 * - Forces only specific element(s) when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to force in the action.
 *   - Insert multiple element ID's to force multiple at once.
 *
 * ---
 *
 * ELE: Null Element
 * - Forces no element to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 * 
 * === Action Sequences - Horror Effects ===
 * 
 * These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 * 
 * ---
 *
 * HORROR: Clear All Filters
 * - Clear all Horror Effects filters on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove Horror Effects for.
 *
 * ---
 *
 * HORROR: Glitch Create
 * - Creates the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * HORROR: Glitch Remove
 * - Removes the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: Noise Create
 * - Creates the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * HORROR: Noise Remove
 * - Removes the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: TV Create
 * - Creates the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * HORROR: TV Remove
 * - Removes the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 * 
 * === Action Sequences - Impact ===
 * 
 * These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * ---
 *
 * IMPACT: Color Break
 * - Breaks the colors on the screen before reassembling.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Intensity:
 *   - What is the intensity of the color break effect?
 *
 *   Duration:
 *   - What is the duration of the color break effect?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Screen
 * - Creates a motion blur on the whole screen.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Target(s)
 * - Creates a motion blur on selected target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion blur effects for.
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Trail Create
 * - Creates a motion trail effect for the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion trail effects for.
 *
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less motion trails there are.
 *
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 *
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 *
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 *
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 *
 * ---
 *
 * IMPACT: Motion Trail Remove
 * - Removes the motion trail effect from the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to clear motion trail effects for.
 *
 * ---
 *
 * IMPACT: Shockwave at Point
 * - Creates a shockwave at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to create a shockwave at?
 *   - You can use JavaScript code.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Each Target(s)
 * - Creates a shockwave at each of the target(s) location(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Target(s) Center
 * - Creates a shockwave from the center of the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Zoom Blur at Point
 * - Creates a zoom blur at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to focus the zoom at?
 *   - You can use JavaScript code.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Zoom Blur at Target(s) Center
 * - Creates a zoom blur at the center of targets.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a zoom blur from.
 *
 *   Target Location:
 *   - Select which part target group to start a zoom blur from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the zoom blur X/Y point by.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * === Action Sequences - Mechanics ===
 *
 * These Action Sequences are related to various mechanics related to the
 * battle system.
 *
 * ---
 *
 * MECH: Action Effect
 * - Causes the unit(s) to take damage/healing from action and incurs any
 *   changes made such as buffs and states.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 * ---
 *
 * MECH: Add Buff/Debuff
 * - Adds buff(s)/debuff(s) to unit(s). 
 * - Determine which parameters are affected and their durations.
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s) and/or debuff(s).
 *
 *   Buff Parameters:
 *   - Select which parameter(s) to buff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Debuff Parameters:
 *   - Select which parameter(s) to debuff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Turns:
 *   - Number of turns to set the parameter(s) buffs to.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * MECH: Add State
 * - Adds state(s) to unit(s).
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s).
 *
 *   States:
 *   - Select which state ID(s) to add to unit(s).
 *   - Insert multiple state ID's to add multiple at once.
 *
 * ---
 *
 * MECH: Armor Penetration
 * - Adds an extra layer of defensive penetration/reduction.
 * - You may use JavaScript code for any of these.
 *
 *   Armor/Magic Penetration:
 *
 *     Rate:
 *     - Penetrates an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Penetrates a flat amount of armor by this value.
 *
 *   Armor/Magic Reduction:
 *
 *     Rate:
 *     - Reduces an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Reduces a flat amount of armor by this value.
 *
 * ---
 * 
 * MECH: ATB Gauge
 * - Alters the ATB/TPB Gauges.
 * - Requires VisuMZ_2_BattleSystemATB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Charging:
 *   
 *     Charge Rate:
 *     - Changes made to the ATB Gauge if it is currently charging.
 * 
 *   Casting:
 *   
 *     Cast Rate:
 *     - Changes made to the ATB Gauge if it is currently casting.
 *   
 *     Interrupt?:
 *     - Interrupt the ATB Gauge if it is currently casting?
 * 
 * ---
 * 
 * MECH: Break Shield Change
 * - Changes Break Shields for target(s) if not Break Stunned.
 * - Requires VisuMZ_4_BreakShields!
 * 
 *   Targets:
 *   - Select unit(s) to alter the Break Shields for.
 * 
 *   Alter Break Shields By:
 *   - Alters the unit(s) Break Shields.
 *   - Positive for gaining shields. Negative for losing shields.
 * 
 * ---
 * 
 * MECH: Break Shield Reset
 * - Resets Break Shields for target(s) if not Break Stunned.
 * - Requires VisuMZ_4_BreakShields!
 * 
 *   Targets:
 *   - Select unit(s) to reset the Break Shields for.
 * 
 * ---
 * 
 * MECH: BTB Brave Points
 * - Alters the target(s) Brave Points to an exact value.
 * - Requires VisuMZ_2_BattleSystemBTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Alter Brave Points By:
 *   - Alters the target(s) Brave Points.
 *   - Positive for gaining BP.
 *   - Negative for losing BP.
 * 
 * ---
 *
 * MECH: Collapse
 * - Causes the unit(s) to perform its collapse animation if the unit(s)
 *   has died.
 *
 *   Targets:
 *   - Select unit(s) to process a death collapse.
 *
 *   Force Death:
 *   - Force death even if the unit has not reached 0 HP?
 *   - This will remove immortality.
 *
 *   Wait For Effect?:
 *   - Wait for the collapse effect to complete before performing next command?
 *
 * ---
 * 
 * MECH: CTB Order
 * - Alters the CTB Turn Order.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Turn Order for.
 * 
 *   Change Order By:
 *   - Changes turn order for target(s) by this amount.
 *   - Positive increases wait. Negative decreases wait.
 * 
 * ---
 * 
 * MECH: CTB Speed
 * - Alters the CTB Speed.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Speed for.
 * 
 *   Charge Rate:
 *   - Changes made to the CTB Speed if it is currently charging.
 * 
 *   Cast Rate:
 *   - Changes made to the CTB Speed if it is currently casting.
 * 
 * ---
 * 
 * MECH: Custom Damage Formula
 * - Changes the current action's damage formula to custom.
 * - This will assume the MANUAL damage style.
 * 
 *   Formula:
 *   - Changes the current action's damage formula to custom.
 *   - Use 'default' to revert the damage formula.
 * 
 * ---
 *
 * MECH: Damage Popup
 * - Causes the unit(s) to display the current state of damage received
 *   or healed.
 *
 *   Targets:
 *   - Select unit(s) to prompt a damage popup.
 *
 * ---
 *
 * MECH: Dead Label Jump
 * - If the active battler is dead, jump to a specific label in the
 *   common event.
 *
 *   Jump To Label:
 *   - If the active battler is dead, jump to this specific label in the
 *     common event.
 *
 * ---
 *
 * MECH: HP, MP, TP
 * - Alters the HP, MP, and TP values for unit(s).
 * - Positive values for healing. Negative values for damage.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 *   HP, MP, TP:
 *
 *     Rate:
 *     - Changes made to the parameter based on rate.
 *     - Positive values for healing. Negative values for damage.
 *
 *     Flat:
 *     - Flat changes made to the parameter.
 *     - Positive values for healing. Negative values for damage.
 *
 *   Damage Popup?:
 *   - Display a damage popup after?
 *
 * ---
 *
 * MECH: Immortal
 * - Changes the immortal flag of targets. If immortal flag is removed and a
 *   unit would die, collapse that unit.
 *
 *   Targets:
 *   - Alter the immortal flag of these groups. If immortal flag is removed and
 *     a unit would die, collapse that unit.
 *
 *   Immortal:
 *   - Turn immortal flag for unit(s) on/off?
 *
 * ---
 *
 * MECH: Multipliers
 * - Changes the multipliers for the current action.
 * - You may use JavaScript code for any of these.
 *
 *   Critical Hit%:
 *
 *     Rate:
 *     - Affects chance to land a critical hit by this multiplier.
 *
 *     Flat:
 *     - Affects chance to land a critical hit by this flat bonus.
 *
 *   Critical Damage
 *
 *     Rate:
 *     - Affects critical damage by this multiplier.
 *
 *     Flat:
 *     - Affects critical damage by this flat bonus.
 *
 *   Damage/Healing
 *
 *     Rate:
 *     - Sets the damage/healing multiplier for current action.
 *
 *     Flat:
 *     - Sets the damage/healing bonus for current action.
 *
 *   Hit Rate
 *
 *     Rate:
 *     - Affects chance to connect attack by this multiplier.
 *
 *     Flat:
 *     - Affects chance to connect attack by this flat bonus.
 *
 * ---
 *
 * MECH: Remove Buff/Debuff
 * - Removes buff(s)/debuff(s) from unit(s). 
 * - Determine which parameters are removed.
 *
 *   Targets:
 *   - Select unit(s) to have the buff(s) and/or debuff(s) removed.
 *
 *   Buff Parameters:
 *   - Select which buffed parameter(s) to remove.
 *
 *   Debuff Parameters:
 *   - Select which debuffed parameter(s) to remove.
 *
 * ---
 *
 * MECH: Remove State
 * - Remove state(s) from unit(s).
 *
 *   Targets:
 *   - Select unit(s) to have states removed from.
 *
 *   States:
 *   - Select which state ID(s) to remove from unit(s).
 *   - Insert multiple state ID's to remove multiple at once.
 *
 * ---
 * 
 * MECH: STB Exploit Effect
 * - Utilize the STB Exploitation mechanics!
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Target(s) Exploited?:
 *   - Exploit the below targets?
 * 
 *     Targets:
 *     - Select unit(s) to become exploited.
 * 
 *     Force Exploitation:
 *     - Force the exploited status?
 * 
 *   User Exploiter?:
 *   - Allow the user to become the exploiter?
 * 
 *     Force Exploitation:
 *     - Force the exploiter status?
 * 
 * ---
 * 
 * MECH: STB Extra Action
 * - Adds an extra action for the currently active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Extra Actions:
 *   - How many extra actions should the active battler gain?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: STB Remove Excess Actions
 * - Removes excess actions from the active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Remove Actions:
 *   - How many actions to remove from the active battler?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: Text Popup
 * - Causes the unit(s) to display a text popup.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Text:
 *   - What text do you wish to display?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * MECH: Variable Popup
 * - Causes the unit(s) to display a popup using the data stored inside
 *   a variable.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Variable:
 *   - Get data from which variable to display as a popup?
 * 
 *   Digit Grouping:
 *   - Use digit grouping to separate numbers?
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 *
 * MECH: Wait For Effect
 * - Waits for the effects to complete before performing next command.
 *
 * ---
 *
 * === Action Sequences - Motion ===
 *
 * These Action Sequences allow you the ability to control the motions of
 * sideview sprites.
 *
 * ---
 * 
 * MOTION: Clear Freeze Frame
 * - Clears any freeze frames from the unit(s).
 * 
 *   Targets:
 *   - Select which unit(s) to clear freeze frames for.
 * 
 * ---
 * 
 * MOTION: Freeze Motion Frame
 * - Forces a freeze frame instantly at the selected motion.
 * - Automatically clears with a new motion.
 * 
 *   Targets:
 *   - Select which unit(s) to freeze motions for.
 * 
 *   Motion Type:
 *   - Freeze this motion for the unit(s).
 * 
 *   Frame Index:
 *   - Which frame do you want to freeze the motion on?
 *   - Frame index values start at 0.
 * 
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 * 
 * ---
 *
 * MOTION: Motion Type
 * - Causes the unit(s) to play the selected motion.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 *   Motion Type:
 *   - Play this motion for the unit(s).
 *
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 *
 * ---
 *
 * MOTION: Perform Action
 * - Causes the unit(s) to play the proper motion based on the current action.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 * ---
 *
 * MOTION: Refresh Motion
 * - Cancels any set motions unit(s) has to do and use their most natural
 *   motion at the moment.
 *
 *   Targets:
 *   - Select which unit(s) to refresh their motion state.
 *
 * ---
 *
 * MOTION: Wait By Motion Frame
 * - Creates a wait equal to the number of motion frames passing.
 * - Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 *   Motion Frames to Wait?:
 *   - Each "frame" is equal to the value found in 
 *     Plugin Parameters => Actors => Motion Speed
 *
 * ---
 *
 * === Action Sequences - Movement ===
 *
 * These Action Sequences allow you the ability to control the sprites of
 * actors and enemies in battle.
 *
 * ---
 *
 * MOVE: Battle Step
 * - Causes the unit(s) to move forward past their home position to prepare
 *   for action.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Face Direction
 * - Causes the unit(s) to face forward or backward.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Direction:
 *   - Select which direction to face.
 *
 * ---
 *
 * MOVE: Face Point
 * - Causes the unit(s) to face a point on the screen.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Face Away From?:
 *   - Face away from the point instead?
 *
 * ---
 *
 * MOVE: Face Target(s)
 * - Causes the unit(s) to face other targets on the screen.
 * - Sideview-only!
 *
 *   Targets (facing):
 *   - Select which unit(s) to change direction.
 *
 *   Targets (destination):
 *   - Select which unit(s) for the turning unit(s) to face.
 *
 *   Face Away From?:
 *   - Face away from the unit(s) instead?
 *
 * ---
 *
 * MOVE: Float
 * - Causes the unit(s) to float above the ground.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Height:
 *   - Vertical distance to float upward.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total float amount.
 *
 *   Float Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Float?:
 *   - Wait for floating to complete before performing next command?
 *
 * ---
 *
 * MOVE: Home Reset
 * - Causes the unit(s) to move back to their home position(s) and face back to
 *   their original direction(s).
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Jump
 * - Causes the unit(s) to jump into the air.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make jump.
 *
 *   Desired Height:
 *   - Max jump height to go above the ground
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total jump amount.
 *
 *   Wait For Jump?:
 *   - Wait for jumping to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move Distance
 * - Moves unit(s) by a distance from their current position(s).
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Distance Adjustment:
 *   - Makes adjustments to distance values to determine which direction to
 *     move unit(s).
 *     - Normal - No adjustments made
 *     - Horizontal - Actors adjust left, Enemies adjust right
 *     - Vertical - Actors adjust Up, Enemies adjust down
 *     - Both - Applies both Horizontal and Vertical
 *
 *     Distance: X:
 *     - Horizontal distance to move.
 *     - You may use JavaScript code.
 *
 *     Distance: Y:
 *     - Vertical distance to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Point
 * - Moves unit(s) to a designated point on the screen.
 * - Sideview-only! Points based off Graphics.boxWidth/Height.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Destination Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Target(s)
 * - Moves unit(s) to another unit(s) on the battle field.
 * - Sideview-only!
 *
 *   Targets (Moving):
 *   - Select which unit(s) to move.
 *
 *   Targets (Destination):
 *   - Select which unit(s) to move to.
 *
 *     Target Location:
 *     - Select which part target group to move to.
 *       - front head
 *       - front center
 *       - front base
 *       - middle head
 *       - middle center
 *       - middle base
 *       - back head
 *       - back center
 *       - back base
 *
 *     Melee Distance:
 *     - The melee distance away from the target location in addition to the
 *       battler's width.
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Opacity
 * - Causes the unit(s) to change opacity.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change opacity.
 *
 *   Desired Opacity:
 *   - Change to this opacity value.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for opacity change.
 *
 *   Opacity Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Opacity?:
 *   - Wait for opacity changes to complete before performing next command?
 *
 * ---
 *
 * MOVE: Scale/Grow/Shrink
 * - Causes the unit(s) to scale, grow, or shrink?.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change the scale of.
 *
 *   Scale X:
 *   Scale Y:
 *   - What target scale value do you want?
 *   - 1.0 is normal size.
 *
 *   Duration:
 *   - Duration in frames to scale for.
 *
 *   Scale Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Scale?:
 *   - Wait for scaling to complete before performing next command?
 *
 * ---
 *
 * MOVE: Skew/Distort
 * - Causes the unit(s) to skew.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to skew.
 *
 *   Skew X:
 *   Skew Y:
 *   - What variance to skew?
 *   - Use small values for the best results.
 *
 *   Duration:
 *   - Duration in frames to skew for.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew to complete before performing next command?
 *
 * ---
 *
 * MOVE: Spin/Rotate
 * - Causes the unit(s) to spin.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to spin.
 *
 *   Angle:
 *   - How many degrees to spin?
 *
 *   Duration:
 *   - Duration in frames to spin for.
 *
 *   Spin Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Revert Angle on Finish:
 *   - Upon finishing the spin, revert the angle back to 0.
 *
 *   Wait For Spin?:
 *   - Wait for spin to complete before performing next command?
 *
 * ---
 *
 * MOVE: Wait For Float
 * - Waits for floating to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Jump
 * - Waits for jumping to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Movement
 * - Waits for movement to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Opacity
 * - Waits for opacity changes to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Scale
 * - Waits for scaling to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Skew
 * - Waits for skewing to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Spin
 * - Waits for spinning to complete before performing next command.
 *
 * ---
 * 
 * === Action Sequences - Projectiles ===
 * 
 * Create projectiles on the screen and fire them off at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * ---
 *
 * PROJECTILE: Animation
 * - Create an animation projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Animation ID:
 *     - Determine which animation to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * PROJECTILE: Icon
 * - Create an icon projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Icon:
 *     - Determine which icon to use as a projectile.
 *       - You may use JavaScript code.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * PROJECTILE: Picture
 * - Create a picture projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Picture Filename:
 *     - Determine which picture to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 * 
 * === Action Sequences - Skew ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Target ===
 *
 * If using a manual target by target Action Sequence, these commands will give
 * you full control over its usage.
 *
 * ---
 *
 * TARGET: Current Index
 * - Sets the current index to this value.
 * - Then decide to jump to a label (optional).
 *
 *   Set Index To:
 *   - Sets current targeting index to this value.
 *   - 0 is the starting index of a target group.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Next Target
 * - Moves index forward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Previous Target
 * - Moves index backward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Random Target
 * - Sets index randomly to determine new currernt target.
 * - Then decide to jump to a label (optional).
 *
 *   Force Random?:
 *   - Index cannot be its previous index amount after random.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * === Action Sequences - Weapon ===
 *
 * Allows for finer control over Dual/Multi Wielding actors.
 * Only works for Actors.
 *
 * ---
 *
 * WEAPON: Clear Weapon Slot
 * - Clears the active weapon slot (making others valid again).
 * - Only works for Actors.
 *
 *   Targets:
 *   - Select unit(s) to clear the active weapon slot for.
 *
 * ---
 *
 * WEAPON: Next Weapon Slot
 * - Goes to next active weapon slot (making others invalid).
 * - If next slot is weaponless, don't label jump.
 *
 *   Targets:
 *   - Select unit(s) to change the next active weapon slot for.
 *
 * ---
 *
 * WEAPON: Set Weapon Slot
 * - Sets the active weapon slot (making others invalid).
 * - Only works for Actors.
 *
 *   Targets:
 *   - Select unit(s) to change the active weapon slot for.
 *
 *   Weapon Slot ID:
 *   - Select weapon slot to make active (making others invalid).
 *   - Use 0 to clear and normalize. You may use JavaScript code.
 *
 * ---
 *
 * === Action Sequences - Zoom ===
 *
 * These Action Sequences are zoom-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto Battle Settings
 * ============================================================================
 *
 * These Plugin Parameter settings allow you to change the aspects added by
 * this plugin that support Auto Battle and the Auto Battle commands.
 *
 * Auto Battle commands can be added to the Party Command Window and/or Actor
 * Command Window. The one used by the Party Command Window will cause the
 * whole party to enter an Auto Battle state until stopped by a button input.
 * The command used by the Actor Command Window, however, will cause the actor
 * to select an action based off the Auto Battle A.I. once for the current turn
 * instead.
 *
 * ---
 *
 * Battle Display
 * 
 *   Message:
 *   - Message that's displayed when Auto Battle is on.
 *     Text codes allowed. %1 - OK button, %2 - Cancel button
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Background Type:
 *   - Select background type for Auto Battle window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Auto Battle options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Startup Name:
 *   - Command name of the option.
 * 
 *   Style Name:
 *   - Command name of the option.
 * 
 *   OFF:
 *   - Text displayed when Auto Battle Style is OFF.
 * 
 *   ON:
 *   - Text displayed when Auto Battle Style is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Damage Settings
 * ============================================================================
 *
 * These Plugin Parameters add a variety of things to how damage is handled in
 * battle. These range from hard damage caps to soft damage caps to how damage
 * popups appear, how the formulas for various aspects are handled and more.
 *
 * Damage Styles are also a feature added through this plugin. More information
 * can be found in the help section above labeled 'Damage Styles'.
 *
 * ---
 *
 * Damage Cap
 * 
 *   Enable Damage Cap?:
 *   - Put a maximum hard damage cap on how far damage can go?
 *   - This can be broken through the usage of notetags.
 * 
 *   Default Hard Cap:
 *   - The default hard damage cap used before applying damage.
 * 
 *   Enable Soft Cap?:
 *   - Soft caps ease in the damage values leading up to the  hard damage cap.
 *   - Requires hard Damage Cap enabled.
 * 
 *     Base Soft Cap Rate:
 *     - The default soft damage cap used before applying damage.
 * 
 *     Soft Scale Constant:
 *     - The default soft damage cap used before applying damage.
 *
 * ---
 *
 * Popups
 * 
 *   Popup Duration:
 *   - Adjusts how many frames a popup stays visible.
 * 
 *   Newest Popups Bottom:
 *   - Puts the newest popups at the bottom.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Sets how much to offset the sprites by horizontally/vertically.
 * 
 *   Shift X:
 *   Shift Y:
 *   - Sets how much to shift the sprites by horizontally/vertically.
 * 
 *   Shift Y:
 * 
 *   Critical Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Critical Duration:
 *   - Adjusts how many frames a the flash lasts.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Overall Formula:
 *   - The overall formula used when calculating damage.
 * 
 *   JS: Variance Formula:
 *   - The formula used when damage variance.
 * 
 *   JS: Guard Formula:
 *   - The formula used when damage is guarded.
 *
 * ---
 *
 * Critical Hits
 * 
 *   JS: Rate Formula:
 *   - The formula used to calculate Critical Hit Rates.
 * 
 *   JS: Damage Formula:
 *   - The formula used to calculate Critical Hit Damage modification.
 *
 * ---
 *
 * Damage Styles
 * 
 *   Default Style:
 *   - Which Damage Style do you want to set as default?
 *   - Use 'Manual' to not use any styles at all.
 *     - The 'Manual' style will not support <Armor Penetration> notetags.
 *     - The 'Manual' style will not support <Armor Reduction> notetags.
 * 
 *   Style List:
 *   - A list of the damage styles available.
 *   - These are used to calculate base damage.
 * 
 *     Name:
 *     - Name of this Damage Style.
 *     -Used for notetags and such.
 * 
 *     JS: Formula:
 *     - The base formula for this Damage Style.
 * 
 *     Items & Equips Core:
 * 
 *       HP Damage:
 *       MP Damage:
 *       HP Recovery:
 *       MP Recovery:
 *       HP Drain:
 *       MP Drain:
 *       - Vocabulary used for this data entry.
 * 
 *       JS: Damage Display:
 *       - Code used the data displayed for this category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Some of the base settings for the various mechanics found in the battle
 * system can be altered here in these Plugin Parameters. Most of these will
 * involve JavaScript code and require you to have to good understanding of
 * how the RPG Maker MZ code works before tampering with it.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Base Troop
 * 
 *   Base Troop ID's:
 *   - Select the Troop ID(s) to duplicate page events from for all
 *     other troops.
 *   - More information can be found in the dedicated Help section above.
 *
 * ---
 * 
 * Common Events (on Map)
 * 
 *   Pre-Battle Event:
 *   Post-Battle Event:
 *   Victory Event:
 *   Defeat Event:
 *   Escape Success Event:
 *   Escape Fail Event:
 *   - Queued Common Event to run upon meeting the condition.
 *   - Use to 0 to not run any Common Event at all.
 *   - "Post-Battle Event" will always run regardless.
 *   - If any events are running before the battle, they will continue running
 *     to the end first before the queued Common Events will run.
 *   - These common events only run on the map scene. They're not meant to run
 *     in the battle scene.
 *   - If the "Defeat Event" has a common event attached to it, then random
 *     encounters will be changed to allow defeat without being sent to the
 *     Game Over scene. Instead, the game will send the player to the map scene
 *     where the Defeat Event will run.
 *
 * ---
 *
 * Escape
 * 
 *   JS: Calc Escape Ratio:
 *   - Code used to calculate the escape success ratio.
 * 
 *   JS: Calc Escape Raise:
 *   - Code used to calculate how much the escape success ratio raises upon
 *     each failure.
 * 
 * ---
 * 
 * Switches
 * 
 *   Switch: Critical:
 *   - Turns switch ON if the action performs a critical hit.
 *   - Switch reverts to OFF whenever an action starts.
 *   - If multiple targets/hits are struck, as long as one hit lands a critical
 *     hit, then the switch will remain ON for the rest of the action.
 * 
 *   Switch: Miss/Evade:
 *   - Turns switch ON if the action misses/is evaded.
 *   - Switch reverts to OFF whenever an action starts.
 *   - If multiple targets/hits are struck, as long as one hit fails to land,
 *     then the switch will remain ON for the rest of the action.
 * 
 * ---
 * 
 * Variables
 * 
 *   Variable: Damage:
 *   - Variable records target damage during action.
 *   - Variable reverts to 0 whenever an action starts.
 *   - If multiple targets/hits are struck, the variable will record the total
 *     amount of damage done for the remainder of the action (unless manually
 *     reseting to 0 during an Action Sequence).
 * 
 *   Variable: Healing:
 *   - Variable records target healing during action.
 *   - Variable reverts to 0 whenever an action starts.
 *   - If multiple targets/hits are struck, the variable will record the total
 *     amount of healing done for the remainder of the action (unless manually
 *     reseting to 0 during an Action Sequence).
 * 
 * ---
 *
 * JS: Battle-Related
 * 
 *   JS: Pre-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Battle Victory:
 *   - Target function: BattleManager.processVictory()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Success:
 *   - Target function: BattleManager.onEscapeSuccess()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Failure:
 *   - Target function: BattleManager.onEscapeFailure()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Battle Defeat:
 *   - Target function: BattleManager.processDefeat()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Turn-Related
 * 
 *   JS: Pre-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Action-Related
 * 
 *   JS: Pre-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Post-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Action:
 *   - Target function: BattleManager.endAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Action:
 *   - DescriTarget function: BattleManager.endAction()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Layout Settings
 * ============================================================================
 *
 * The Battle Layout Settings Plugin Parameter gives you control over the look,
 * style, and appearance of certain UI elements. These range from the way the
 * Battle Status Window presents its information to the way certain windows
 * like the Party Command Window and Actor Command Window appear.
 *
 * ---
 *
 * Battle Layout Style
 * - The style used for the battle layout.
 * 
 *   Default:
 *   - Shows actor faces in Battle Status.
 * 
 *   List:
 *   - Lists actors in Battle Status.
 * 
 *   XP:
 *   - Shows actor battlers in a stretched Battle Status.
 * 
 *   Portrait:
 *   - Shows portraits in a stretched Battle Status.
 * 
 *   Border:
 *   - Displays windows around the screen border.
 *
 * ---
 *
 * List Style
 * 
 *   Show Faces:
 *   - Shows faces in List Style?
 * 
 *   Command Window Width:
 *   - Determine the window width for the Party and Actor Command Windows.
 *   - Affects Default and List Battle Layout styles.
 *
 * ---
 *
 * XP Style
 * 
 *   Command Lines:
 *   - Number of action lines in the Actor Command Window for the XP Style.
 * 
 *   Sprite Height:
 *   - Default sprite height used when if the sprite's height has not been
 *     determined yet.
 * 
 *   Sprite Base Location:
 *   - Determine where the sprite is located on the Battle Status Window.
 *     - Above Name - Sprite is located above the name.
 *     - Bottom - Sprite is located at the bottom of the window.
 *     - Centered - Sprite is centered in the window.
 *     - Top - Sprite is located at the top of the window.
 *
 * ---
 *
 * Portrait Style
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait instead of a face.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Border Style
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait at the edge of the screen.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Skill & Item Windows
 * 
 *   Middle Layout:
 *   - Shows the Skill & Item Windows in mid-screen?
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * These Plugin Parameters give you control over how the Battle Log Window, the
 * window shown at the top of the screen in the battle layout, appears, its
 * various properties, and which text will be displayed.
 *
 * The majority of the text has been disabled by default with this plugin to
 * make the flow of battle progress faster.
 *
 * ---
 *
 * General
 * 
 *   Back Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Max Lines:
 *   - Maximum number of lines to be displayed.
 * 
 *   Message Wait:
 *   - Number of frames for a usual message wait.
 * 
 *   Text Align:
 *   - Text alignment for the Window_BattleLog.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the battle log.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show Start Turn?:
 *   - Display turn changes at the start of the turn?
 * 
 *   Start Turn Message:
 *   - Message displayed at turn start.
 *   - %1 - Turn Count
 * 
 *   Start Turn Wait:
 *   - Number of frames to wait after a turn started.
 *
 * ---
 *
 * Display Action
 * 
 *   Show Centered Action?:
 *   - Display a centered text of the action name?
 * 
 *   Show Skill Message 1?:
 *   - Display the 1st skill message?
 * 
 *   Show Skill Message 2?:
 *   - Display the 2nd skill message?
 * 
 *   Show Item Message?:
 *   - Display the item use message?
 *
 * ---
 *
 * Action Changes
 * 
 *   Show Counter?:
 *   - Display counter text?
 * 
 *   Show Reflect?:
 *   - Display magic reflection text?
 * 
 *   Show Substitute?:
 *   - Display substitute text?
 *
 * ---
 *
 * Action Results
 * 
 *   Show No Effect?:
 *   - Display no effect text?
 * 
 *   Show Critical?:
 *   - Display critical text?
 * 
 *   Show Miss/Evasion?:
 *   - Display miss/evasion text?
 * 
 *   Show HP Damage?:
 *   - Display HP Damage text?
 * 
 *   Show MP Damage?:
 *   - Display MP Damage text?
 * 
 *   Show TP Damage?:
 *   - Display TP Damage text?
 *
 * ---
 *
 * Display States
 * 
 *   Show Added States?:
 *   - Display added states text?
 * 
 *   Show Removed States?:
 *   - Display removed states text?
 * 
 *   Show Current States?:
 *   - Display the currently affected state text?
 * 
 *   Show Added Buffs?:
 *   - Display added buffs text?
 * 
 *   Show Added Debuffs?:
 *   - Display added debuffs text?
 * 
 *   Show Removed Buffs?:
 *   - Display removed de/buffs text?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battleback Scaling Settings
 * ============================================================================
 *
 * By default, the battlebacks in RPG Maker MZ scale as if the screen size is
 * a static 816x624 resolution, which isn't always the case. These settings
 * here allow you to dictate how you want the battlebacks to scale for the
 * whole game. These settings CANNOT be changed midgame or per battle.
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default scaling style used for battlebacks.
 *   - MZ (MZ's default style)
 *   - 1:1 (No Scaling)
 *   - Scale To Fit (Scale to screen size)
 *   - Scale Down (Scale Downward if Larger than Screen)
 *   - Scale Up (Scale Upward if Smaller than Screen)
 * 
 *   JS: 1:1:
 *   JS: Scale To Fit:
 *   JS: Scale Down:
 *   JS: Scale Up:
 *   JS: 1:1:
 *   JS: 1:1:
 *   - This code gives you control over the scaling for this style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you control over how the Party Command Window
 * operates in the battle scene. You can turn disable it from appearing or make
 * it so that it doesn't 
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Party Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Party Command Window.
 * 
 *   Fight Icon:
 *   - The icon used for the Fight command.
 * 
 *   Add Auto Battle?:
 *   - Add the "Auto Battle" command to the Command Window?
 * 
 *     Auto Battle Icon:
 *     - The icon used for the Auto Battle command.
 * 
 *     Auto Battle Text:
 *     - The text used for the Auto Battle command.
 * 
 *   Add Options?:
 *   - Add the "Options" command to the Command Window?
 * 
 *     Options Icon:
 *     - The icon used for the Options command.
 * 
 *     Active TPB Message:
 *     - Message that will be displayed when selecting options during the
 *       middle of an action.
 * 
 *   Escape Icon:
 *   - The icon used for the Escape command.
 *
 * ---
 *
 * Access
 * 
 *   Skip Party Command:
 *   - DTB: Skip Party Command selection on turn start.
 *   - TPB: Skip Party Command selection at battle start.
 * 
 *   Disable Party Command:
 *   - Disable the Party Command Window entirely?
 *
 * ---
 *
 * Help Window
 * 
 *   Fight:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 * 
 *   Options:
 *   - Text displayed when selecting the Options command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you to change various aspects regarding the
 * Actor Command Window and how it operates in the battle scene. This ranges
 * from how it appears to the default battle commands given to all players
 * without a custom <Battle Commands> notetag.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Actor Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Actor Command Window.
 * 
 *   Item Icon:
 *   - The icon used for the Item command.
 * 
 *   Normal SType Icon:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * 
 *   Magic SType Icon:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 *
 * ---
 *
 * Battle Commands
 * 
 *   Command List:
 *   - List of battle commands that appear by default if the <Battle Commands>
 *     notetag isn't present.
 *
 *     - Attack 
 *       - Adds the basic attack command.
 * 
 *     - Skills
 *       - Displays all the skill types available to the actor.
 * 
 *     - SType: x
 *     - Stype: name
 *       - Adds in a specific skill type.
 *       - Replace 'x' with the ID of the skill type.
 *       - Replace 'name' with the name of the skill type (without text codes).
 *
 *     - All Skills
 *       - Adds all usable battle skills as individual actions.
 * 
 *     - Skill: x
 *     - Skill: name
 *       - Adds in a specific skill as a usable action.
 *       - Replace 'x' with the ID of the skill.
 *       - Replace 'name' with the name of the skill.
 * 
 *     - Guard
 *       - Adds the basic guard command.
 * 
 *     - Item
 *       - Adds the basic item command.
 * 
 *     - Escape
 *       - Adds the escape command.
 * 
 *     - Auto Battle
 *       - Adds the auto battle command.
 *
 * ---
 *
 * Help Window
 * 
 *   Skill Types:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Items:
 *   - Text displayed when selecting the item command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how the sideview battlers behave for
 * the actor sprites. Some of these settings are shared with enemies if they
 * use sideview battler graphics.
 *
 * ---
 *
 * Flinch
 * 
 *   Flinch Distance X:
 *   - The normal X distance when flinching.
 * 
 *   Flinch Distance Y:
 *   - The normal Y distance when flinching.
 * 
 *   Flinch Duration:
 *   - The number of frames for a flinch to complete.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Chant Style:
 *   - What determines the chant motion?
 *   - Hit type or skill type?
 * 
 *   Offset X:
 *   - Offsets X position where actor is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where actor is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Motion Speed:
 *   - The number of frames in between each motion.
 * 
 *   Priority: Active:
 *   - Place the active actor on top of actor and enemy sprites.
 * 
 *   Priority: Actors:
 *   - Prioritize actors over enemies when placing sprites on top of each other
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 * 
 *   JS: Home Position:
 *   - Code used to calculate the home position of actors.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how enemies appear visually in the
 * battle scene. Some of these settings will override the settings used for
 * actors if used as sideview battlers. Other settings include changing up the
 * default attack animation for enemies, how the enemy select window functions,
 * and more.
 *
 * ---
 *
 * Visual
 * 
 *   Attack Animation:
 *   - Default attack animation used for enemies.
 *   - Use <Attack Animation: x> for custom animations.
 * 
 *   Emerge Text:
 *   - Show or hide the 'Enemy emerges!' text at the start of battle.
 * 
 *   Offset X:
 *   - Offsets X position where enemy is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where enemy is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 *
 * ---
 *
 * Select Window
 * 
 *   FV: Right Priority:
 *   - If using frontview, auto select the enemy furthest right.
 * 
 *   SV: Right Priority:
 *   - If using sideview, auto select the enemy furthest right.
 * 
 *   Name: Font Size:
 *   - Font size used for enemy names.
 * 
 *   Name: Offset X:
 *   Name: Offset Y:
 *   - Offset the enemy name's position by this much.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Allow Collapse:
 *   - Causes defeated enemies with SV Battler graphics to "fade away"
 *     when defeated?
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Motion: Idle:
 *   - Sets default idle animation used by Sideview Battlers.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Size: Width:
 *   - Default width for enemies that use Sideview Battlers.
 * 
 *   Size: Height:
 *   - Default height for enemies that use Sideview Battlers.
 * 
 *   Weapon Type:
 *   - Sets default weapon type used by Sideview Battlers.
 *   - Use 0 for Bare Hands.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: HP Gauge Settings
 * ============================================================================
 *
 * Settings that adjust the visual HP Gauge displayed in battle.
 *
 * ---
 *
 * Show Gauges For
 * 
 *   Actors:
 *   - Show HP Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Enemies:
 *   - Show HP Gauges over the enemy sprites' heads?
 *   - Can be bypassed with <Hide HP Gauge> notetag.
 * 
 *     Requires Defeat?:
 *     - Requires defeating the enemy once to show HP Gauge?
 *     - Can be bypassed with <Show HP Gauge> notetag.
 * 
 *       Battle Test Bypass?:
 *       - Bypass the defeat requirement in battle test?
 *
 * ---
 *
 * Settings
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the HP Gauge sprite's anchor X/Y to be?
 *     Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the HP Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the HP Gauge's X/Y by?
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show HP Gauge' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Sequence Settings
 * ============================================================================
 *
 * Action Sequence Plugin Parameters allow you to decide if you want automatic
 * Action Sequences to be used for physical attacks, the default casting
 * animations used, how counters and reflects appear visually, and what the
 * default stepping distances are.
 *
 * ---
 *
 * Automatic Sequences
 * 
 *   Melee Single Target:
 *   - Allow this auto sequence for physical, single target actions?
 * 
 *   Melee Multi Target:
 *   - Allow this auto sequence for physical, multi-target actions?
 *
 * ---
 * 
 * Quality of Life
 * 
 *   Auto Notetag:
 *   - Automatically apply the <Custom Action Sequence> notetag effect to any
 *     item or skill that has a Common Event?
 *   - Any item or skill without a Common Event attached to it will use the
 *     Automatic Action Sequences instead.
 *   - The <Auto Action Sequence> notetag will disable this effect for that
 *     particular skill or item.
 * 
 * ---
 *
 * Cast Animations
 * 
 *   Certain Hit:
 *   - Cast animation for Certain Hit skills.
 * 
 *   Physical:
 *   - Cast animation for Physical skills.
 * 
 *   Magical:
 *   - Cast animation for Magical skills.
 *
 * ---
 *
 * Counter/Reflect
 * 
 *   Counter Back:
 *   - Play back the attack animation used?
 * 
 *   Reflect Animation:
 *   - Animation played when an action is reflected.
 * 
 *   Reflect Back:
 *   - Play back the attack animation used?
 *
 * ---
 *
 * Stepping
 * 
 *   Melee Distance:
 *   - Minimum distance in pixels for Movement Action Sequences.
 * 
 *   Step Distance X:
 *   - The normal X distance when stepping forward.
 * 
 *   Step Distance Y:
 *   - The normal Y distance when stepping forward.
 * 
 *   Step Duration:
 *   - The number of frames for a stepping action to complete.
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
 * Version 1.27: February 26, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Mechanics Settings > Switches > Switch: Critical
 * *** Plugin Parameters > Mechanics Settings > Switches > Switch: Miss/Evade
 * **** Turns Switches ON if the action performs a critical hit, misses, or is
 *      evaded at any point.
 * **** Switch reverts to OFF whenever an action starts.
 * **** If multiple targets/hits are struck, as long as one hit respectively
 *      lands a critical hit, fails to land, then the switch will remain ON for
 *      the rest of the action.
 * *** Plugin Parameters > Mechanics Settings > Variables > Variable: Damage
 * *** Plugin Parameters > Mechanics Settings > Variables > Variable: Healing
 * **** Variable records target damage/healing during action.
 * **** Variable reverts to 0 whenever an action starts.
 * **** If multiple targets/hits are struck, the variable will record the total
 *      amount of damage/healing done for the remainder of the action (unless
 *      manually reseting to 0 during an Action Sequence).
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Battles with branching event paths found within a conditional branch or
 *    choice tree will no longer be skipped over. Fix made by Arisu.
 * * Compatibility Update
 * ** Returning to the battle scene from the options scene in a Tpb-base battle
 *    system now links the current actor. Update by Irina.
 * 
 * Version 1.25: February 5, 2021
 * * Compatibility Update
 * ** Added compatibility update with VisuStella MZ Skills and States Core's
 *    Plugin Parameter > State Settings > Action End Update
 * * Feature Update!
 * ** <Common Event: name> notetag no longer requires <Custom Action Sequence>
 *    notetag if the Plugin Parameter: Auto Notetag is enabled.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** MOVE: Move To Point and MOVE: Move To Target(s) Action Sequences'
 *    "Offset Adjustment" normal setting will now factor in Offset X and
 *    Offset Y positions unlike before where it cancels them. Update by Irina.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Common Event: name>
 * **** Battle only: calls forth a Common Event of a matching name.
 * **** This is primarily used for users who are reorganizing around their
 *      Common Events and would still like to have their skills/items perform
 *      the correct Action Sequences in case the ID's are different.
 * 
 * Version 1.23: January 22, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** ACSET: All Targets Action Set and ACSET: Each Target Action Set updated
 * *** New parameter added: Dual/Multi Wield?
 * **** Add times struck based on weapon quantity equipped?
 * * New Features!
 * ** Dual Wielding now functions differently. Made by Olivia.
 * *** Previously, RPG Maker MZ had "Dual Wielding" attack using both weapon
 *     animations at once, with the combined ATK of each weapon. It's confusing
 *     to look at and does not portray the nature of "Dual Wielding".
 * *** Dual Wielding, or in the case of users adding in third and fourth
 *     weapons, Multi Wielding is now changed. Each weapon is displayed
 *     individually, each producing its own attack animation, showing each
 *     weapon type, and applying only that weapon's ATK, Traits, and related
 *     effects. It is no longer a combined effect to display everything at once
 *     like RPG Maker MZ default.
 * *** If an actor has multiple weapon slots but some of them are unequipped,
 *     then the action will treat the attack as a single attack. There will be
 *     no barehanded attack to add on top of it. This is to match RPG Maker
 *     MZ's decision to omit a second animation if the same scenario is
 *     applied.
 * ** New Action Sequence Plugin Commands added by Yanfly
 * *** ANIM: Attack Animation 2+
 * **** Plays the animation associated with the user's 2nd weapon.
 *      Plays nothing if there is no 2nd weapon equipped.
 * ** New Action Sequence Plugin Commands added by Olivia
 * *** WEAPON: Clear Weapon Slot
 * *** WEAPON: Next Weapon Slot
 * *** WEAPON: Set Weapon Slot
 * **** These are Action Sequence Plugin Commands for devs who want finer
 *      control over Dual/Multi Wielding weapons.
 * 
 * Version 1.22: January 15, 2021
 * * Compatibility Update
 * ** Compatibility with "All Skills" Actor Command should now work with the
 *    Skills & States Core hide skill notetags.
 * 
 * Version 1.21: January 8, 2021
 * * Bug Fixes!
 * ** "MOVE: Home Reset" Plugin Command Action Sequence should work properly.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Notetag snuck in by Arisu
 * *** <Auto Action Sequence>
 * **** Used for those who have the "Auto Notetag" Plugin Parameter enabled and
 *      just want to use an automatic Action Sequence instead.
 * ** New Plugin Parameter snuck in by Arisu!
 * *** Plugin Parameters > Action Sequences > Quality of Life > Auto Notetag
 * **** Automatically apply the <Custom Action Sequence> notetag effect to any
 *      item or skill that has a Common Event?
 * **** Any item or skill without a Common Event attached to it will use the
 *      Automatic Action Sequences instead.
 * **** The <Auto Action Sequence> notetag will disable this effect for that
 *      particular skill or item.
 * ** Arisu, you're going to be responsible for any bugs these may cause.
 * *** Bring it!!!!
 * **** And handling any bug report emails that are sent because this was
 *      turned on by accident.
 * ***** Please read the documentation, guys!
 * 
 * Version 1.20: January 1, 2021
 * * Bug Fixes!
 * ** For TPB Active or ATB Active, inputting actors that have received damage
 *    will return back to place after flinching. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Battle Portrait Offset: +x, +y>
 * *** <Battle Portrait Offset X: +x>
 * *** <Battle Portrait Offset Y: +y>
 * **** This is used with the "Portrait" and "Border" Battle Layouts.
 * **** Offsets the X and Y coordinates for the battle portrait.
 * 
 * Version 1.19: December 25, 2020
 * * Bug Fixes!
 * ** Removing a state from a Sideview Enemy during the middle of their a non-
 *    looping motion will no longer reset their motion to neutral.
 *    Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** Action Sequence "PROJECTILE: Icon" now supports code for the "Icon"
 *    parameter. Update made by Yanfly.
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** For TPB Active or ATB Active, inputting actors will no longer step back
 *    after an enemy's action is finished. Fix made by Yanfly and Shiro.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** Action Sequence "BTLOG: Add Text" is updated for the convenience of a new
 *    option to quickly copy the displayed text to the VisuStella MZ Combat Log
 *    if that plugin is installed. Added by Yanfly.
 * 
 * Version 1.17: December 11, 2020
 * * Bug Fixes!
 * ** Common Events in TPB Active that cause forced actions will no longer
 *    cause currently inputting actors that match the forced action battler to
 *    crash the game. Fix made by Yanfly and Shiro.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Action Sequence Impact Action Sequences "Shockwave from Each Target(s)",
 *    "Shockwave from Target(s) Center", and "Zoom Blur at Target(s) Center"
 *    now have "Offset X" and "Offset Y" plugin parameters. Added by Yanfly.
 * ** Action Sequence "MOVE: Move To Target(s)" is now changed so that if the
 *    "Melee Distance" value is set to 0, battlers will no longer stand a half
 *    body distance away. Added by Yanfly.
 * 
 * Version 1.16: December 4, 2020
 * * Bug Fixes!
 * ** Bug fixes made for the RPG Maker MZ base code. If a battler has no
 *    actions, then their action speed will not be Infinity. Fix by Olivia.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Completely replacing the whole party at once will no longer cause the
 *    battle system to crash. Fix made by Olivia.
 * ** Pre-Battle Common Events will no longer cancel out any win/lose branches.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Custom Action Sequences will no longer close the Actor Command Input
 *    window unless absolutely necessary (like for Show Message events) during
 *    Active TPB/ATB. Change made by Arisu.
 * 
 * Version 1.14: November 22, 2020
 * * Feature Update!
 * ** Natural Miss and Evasion motions now have flinch distance.
 *    Added by Yanfly.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Bug Fixes!
 * ** Failsafes added to prevent common events from running if they're empty.
 *    Fix made by Irina.
 * ** Skip Party Command will now work properly with TPB-based battle systems.
 *    Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** In preparation for upcoming VisuStella MZ plugins.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added clarity for the Plugin Parameters for the Common Events settings
 *    found in the mechanics section. The common events are only meant to run
 *    in the map scene and not for the battle scene. Update made by Irina.
 * * Feature Update!
 * ** The Plugin Parameter for Mechanics, Common Events (on Map), Defeat Event
 *    now has updated functionality. If this has a common event attached to it,
 *    then losing to random encounters will no longer send the player to the
 *    Game Over scene, but instead, send the player back to the map scene,
 *    where the Defeat Common Event will run. Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Action Sequence Plugin Command added by Olivia:
 * *** MECH: Custom Damage Formula
 * **** Changes the current action's damage formula to custom.
 *      This will assume the MANUAL damage style.
 * ** New Notetag added by Irina:
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Battleback Scaling Settings
 * **** These settings allow you to adjust how battlebacks scale to the screen
 *      in the game.
 * *** <Battler Sprite Grounded>
 * **** Prevents the enemy from being able to jumping and/or floating due to
 *      Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** Exiting out of the Options menu scene or Party menu scene will no longer
 *    cause party members to reset their starting position. Fix made by Arisu
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** There was a documentation error with <JS Pre-Regenerate> and
 *    <JS Post-Regenerate>. Fix made by Yanfly.
 * *** Before, these were written as <JS Pre-Regenerate Turn> and
 *     <JS Post-Regenerate Turn>. The "Turn" part of the notetag has been
 *     removed in the documentation.
 * * Feature Update!
 * ** Damage sprites on actors are now centered relative to the actor's anchor.
 *    Change made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Command added by Yanfly:
 * *** MECH: Variable Popup
 * **** Causes the unit(s) to display a popup using the data stored inside
 *      a variable.
 * 
 * Version 1.08: October 11, 2020
 * * Bug Fixes!
 * ** Dead party members at the start of battle no longer start offscreen.
 *    Fix made by Arisu.
 * ** Removed party members from battle no longer count as moving battlers.
 *    Fix made by Yanfly.
 * ** Using specific motions should now have the weapons showing and not
 *    showing properly. Fix made by Yanfly.
 * 
 * Version 1.07: October 4, 2020
 * * Bug Fixes!
 * ** Adding and removing actors will now refresh the battle status display.
 *    Fix made by Irina.
 * ** Adding new states that would change the affected battler's state motion
 *    will automatically refresh the battler's motion. Fix made by Irina.
 * ** Boss Collapse animation fixed and will sink into the ground.
 *    Fix made by Irina.
 * ** Failsafes added for certain animation types. Fix made by Yanfly.
 * ** Freeze Motion for thrust, swing, and missile animations will now show the
 *    weapons properly. Fix made by Yanfly.
 * ** The Guard command will no longer display the costs of the Attack command.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Updated help file for newly added plugin parameters.
 * * Feature Updates!
 * ** When using the Change Battleback event command in battle, the game client
 *    will wait until both battlebacks are loaded before changing the both of
 *    them so that the appearance is synched together. Change made by Yanfly.
 * * New Features!
 * ** New plugin parameters added by Irina!
 * *** Plugin Parameters > Actor Battler Settings > Chant Style
 * **** What determines the chant motion? Hit type or skill type?
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Enemy Battler Plugin Parameter "Shadow Visible" should now work again.
 *    Fix made by Irina.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins. Added by Yanfly.
 * * Documentation Update!
 * ** Updated the help file for all the new plugin parameters.
 * * Feature Update!
 * ** Action Sequence "MECH: HP, MP, TP" will now automatically collapse an
 *    enemy if it has been killed by the effect.
 * ** All battle systems for front view will now have damage popups appear
 *    in front of the status window instead of just the Portrait battle layout.
 *    Update made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Commands from Irina!
 * *** MOTION: Clear Freeze Frame
 * *** MOTION: Freeze Motion Frame
 * **** You can freeze a battler's sprite's motion with a specific frame.
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Battle Layout: type> to change the battle layout style used for
 *     specific maps and/or troops.
 * ** New plugin parameters added by Yanfly!
 * *** Plugin Parameters > Battle Layout Settings > Command Window Width
 * **** This plugin parameter lets you adjust the window width for Party and
 *      Actor Command windows in the Default and List Battle Layout styles.
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset X
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset Y
 * **** These plugin parameters allow you to offset the position of the enemy
 *      name positions on the screen by a specific amount.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Actors now use their casting or charging animations again during TPB/ATB.
 *    Fix made by Yanfly.
 * ** Defeat requirement for enemies will no longer crash the game if turned on
 *    after creating
 * ** Escaping animation no longer has actors stay in place. Fixed by Yanfly.
 * ** Failsafes added for newly added weapon types that have not been adjusted
 *    in the Database > System 2 tab. Fixed by Irina.
 * ** Shadows now appear under the actor sprites. Fix made by Yanfly.
 * ** Victory during TPB will no longer cancel the victory animations of
 *    actors that will have their turn after. Fixed by Yanfly.
 * * Documentation Update!
 * ** All Anchor Plugin Parameter descriptions now state to use values between
 *    0 and 1 to be safe. Update made by Yanfly.
 * * Feature Update!
 * ** During Active TPB / ATB, canceling out of the actor command window will
 *    go directly into the party window without having to sort through all of
 *    the available active actors.
 * ** Going from the Party Command Window's Fight command will immediately
 *    return back to the actor command window that was canceled from.
 * * New Features!
 * ** Action Sequence Plugin Command "MOVE: Spin/Rotate" has been updated.
 * *** A new parameter has been added: "Revert Angle on Finish"
 * *** Added by Yanfly.
 * ** New plugin parameters have been added to Damage Settings.
 * *** Appear Position: Selects where you want popups to appear relative to the
 *     battler. Head, Center, Base. Added by Yanfly.
 * *** Offset X: Sets how much to offset the sprites by vertically.
 *     Added by Yanfly.
 * *** Offset Y: Sets how much to offset the sprites by horizontally.
 *     Added by Yanfly.
 * ** New plugin parameters have been added to Actor Battler Settings.
 * *** Priority: Active - Place the active actor on top of actor and
 *     enemy sprites. Added by Yanfly.
 * *** Priority: Actors - Prioritize actors over enemies when placing 
 *     sprites on top of each other. Added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Active Battler Sprites now remain on top and won't be hidden behind
 *    other sprites for better visual clarity. Fix made by Arisu.
 * ** Collapsing battlers will now show the dead motion properly. Fix made by
 *    Olivia.
 * ** Dead battlers can no longer be given immortality. Fix made by Olivia.
 * ** Going into the Options menu with no battleback set will no longer set a
 *    battle snapshot.
 * ** HP Gauges for Sideview Enemies are no longer flipped! Fix made by Yanfly.
 * ** Moving a dead battler would no longer reset their animation. Fix made by
 *    Olivia.
 * ** Pre-Battle Common Events now work with events instead of just random
 *    encounters. Fix made by Yanfly.
 * ** Sideview Enemy shadows no longer twitch. Fix made by Irina.
 * * Documentation Updates!
 * ** Added further explanations for Anchor X and Anchor Y plugin parameters.
 *    This is because there's a lot of confusion for users who aren't familiar
 *    with how sprites work. Added by Irina.
 * ** <Magic Reduction: x> notetag updated to say magical damage instead of
 *    physical damage. Fix made by Yanfly.
 * * New Features!
 * ** Additional Action Sequence Plugin Commands have been added in preparation
 *    of upcoming plugins! Additions made by Irina.
 * *** Action Sequences - Angle (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Camera (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Skew (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Zoom (for VisuMZ_3_ActSeqCamera)
 * ** Additional Action Sequence Plugin Commands have been made available now
 *    and added to Battle Core! Additions made by Irina.
 * *** MOVE: Scale/Grow/Shrink
 * *** MOVE: Skew/Distort
 * *** MOVE: Spin/Rotate
 * *** MOVE: Wait For Scale
 * *** MOVE: Wait For Skew
 * *** MOVE: Wait For Spin
 * ** Plugin Parameters Additions. Additions made by Irina.
 * *** Plugin Params > Actor Battler Settings > Offset X
 * *** Plugin Params > Actor Battler Settings > Offset Y
 * *** Plugin Params > Actor Battler Settings > Smooth Image
 * *** Plugin Params > Enemy Battler Settings > Offset X
 * *** Plugin Params > Enemy Battler Settings > Offset Y
 * *** Plugin Params > Enemy Battler Settings > Smooth Image
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Animated Battlers will refresh their motions from the death motion once
 *    they're revived instead of waiting for their next input phase. Fix made
 *    by Yanfly.
 * ** Battle Log speed sometimes went by too fast for certain enabled messages.
 *    Wait timers are now added to them, like state results, buff results, and
 *    debuff results. Fix made by Yanfly.
 * ** Boss Collapse animation now works properly. Fix made by Yanfly.
 * ** Freeze fix for TPB (Wait) if multiple actors get a turn at the same time.
 *    Fix made by Olivia.
 * ** Pressing cancel on a target window after selecting a single skill no
 *    longer causes the status window to twitch.
 * ** Sideview Enemies had a split frame of being visible if they were to start
 *    off hidden in battle. Fix made by Shaz.
 * * Compatibility Update:
 * ** Battle Core's Sprite_Damage.setup() function is now separated fro the
 *    default to allow for better compatibility. Made by Yanfly.
 * * Documentation Update:
 * ** Inserted more information for "Damage Popups" under "Major Changes"
 * * New Features!
 * ** <Magic Penetration: x>, <Magic Penetration: x%> notetags added.
 * ** <Magic Reduction: x>, <Magic Reduction: x%> notetags added.
 * ** <Battle UI Offset: +x, +y>, <Battle UI Offset X: +x>, and
 *    <Battle UI Offset Y: +y> notetags added for adjusting the positions of
 *    HP Gauges and State Icons.
 * *** Notetags added by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** Failsafes added for parsing battle targets. Fix made by Yanfly.
 * ** Immortality is no longer ignored by skills/items with the Normal Attack
 *    state effect. Fix made by Yanfly.
 * ** Miss and Evasion sound effects work again! Fix made by Yanfly.
 * ** Selecting "Escape" from the Actor Command Window will now have the
 *    Inputting Battler show its escape motion. Fix made by Yanfly.
 * ** Wait for Movement now applies to SV Enemies. Fix made by Yanfly.
 * * New Features!
 * ** Plugin Command "ACSET: Finish Action" now has an option to turn off the
 *    Immortality of targets. Feature added by Yanfly.
 * * Optimization Update
 * ** Uses less resources when making checks for Pre-Battle Battle Start events
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Plugin Parameters > Damage Settings > Damage Formats are now fixed.
 *    Fix made by Olivia.
 * ** TPB Battle System with Disable Party Command fixed. Fix made by Olivia.
 * ** States now show in list format if faces are disabled. Fix made by Yanfly.
 * ** The default damage styles were missing the 'v' variable to allow for
 *    variable data input. These are back now. Fix made by Yanfly.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Damage Settings > Style List > the style
 *     you want, and adding "const v = $gameVariables._data;" to JS: Formula
 * * New Notetags Added:
 * ** <Command Show Switch: x> added by Olivia
 * ** <Command Show All Switches: x,x,x> added by Olivia
 * ** <Command Show Any Switches: x,x,x> added by Olivia
 * ** <Command Hide Switch: x> added by Olivia
 * ** <Command Hide All Switches: x,x,x> added by Olivia
 * ** <Command Hide Any Switches: x,x,x> added by Olivia
 * ** <JS Command Visible> added by Olivia
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
 * @command ActionSequenceSpaceStart
 * @text -
 * @desc The following are Action Sequences commands/sets.
 * These Plugin Commands only work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSet
 * @text Action Sequence - Action Sets
 * @desc Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_SetupAction
 * @text ACSET: Setup Action Set
 * @desc The generic start to most actions.
 * 
 * @arg DisplayAction:eval
 * @text Display Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: On
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionStart:eval
 * @text Battle Step
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg CastAnimation:eval
 * @text Cast Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_WholeActionSet
 * @text ACSET: All Targets Action Set
 * @desc Affects all targets simultaneously performing the following.
 * 
 * @arg DualWield:eval
 * @text Dual/Multi Wield?
 * @type boolean
 * @on Apply
 * @off Don't
 * @desc Add times struck based on weapon quantity equipped?
 * @default false
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_TargetActionSet
 * @text ACSET: Each Target Action Set
 * @desc Goes through each target one by one to perform the following.
 * 
 * @arg DualWield:eval
 * @text Dual/Multi Wield?
 * @type boolean
 * @on Apply
 * @off Don't
 * @desc Add times struck based on weapon quantity equipped?
 * @default false
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount1:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount2:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed * 2
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_FinishAction
 * @text ACSET: Finish Action
 * @desc The generic ending to most actions.
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForNewLine:eval
 * @text Wait For New Line
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effects
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ClearBattleLog:eval
 * @text Clear Battle Log
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEnd:eval
 * @text Home Reset
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAngle
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAngle
 * @text Action Sequences - Angle
 * @desc Allows you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeAngle
 * @text ANGLE: Change Angle
 * @desc Changes the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc Change the camera angle to this many degrees.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_Reset
 * @text ANGLE: Reset Angle
 * @desc Reset any angle settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_WaitForAngle
 * @text ANGLE: Wait For Angle
 * @desc Waits for angle changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAnimation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAnimation
 * @text Action Sequences - Animations
 * @desc These Action Sequences are related to the 'Animations' that
 * can be found in the Animations tab of the Database.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ActionAnimation
 * @text ANIM: Action Animation
 * @desc Plays the animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation
 * @text ANIM: Attack Animation
 * @desc Plays the animation associated with the user's 1st weapon.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation2
 * @text ANIM: Attack Animation 2+
 * @desc Plays the animation associated with the user's other weapons.
 * Plays nothing if there is no other weapon equipped.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Slot:eval
 * @text Slot
 * @desc Which weapon slot to get this data from?
 * Main-hand weapon is weapon slot 1.
 * @default 2
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_CastAnimation
 * @text ANIM: Cast Animation
 * @desc Plays the cast animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["user"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ChangeBattlePortrait
 * @text ANIM: Change Battle Portrait
 * @desc Changes the battle portrait of the actor (if it's an actor).
 * Can be used outside of battle/action sequences.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to change the portraits for.
 * Valid units can only be actors.
 * @default ["user"]
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Select the file to change the actor's portrait to.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ShowAnimation
 * @text ANIM: Show Animation
 * @desc Plays the a specific animation on unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg AnimationID:num
 * @text Animation ID
 * @type animation
 * @desc Select which animation to play on unit(s).
 * @default 1
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_WaitForAnimation
 * @text ANIM: Wait For Animation
 * @desc Causes the interpreter to wait for any animation(s) to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceBattleLog
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakBattleLog
 * @text Action Sequences - Battle Log
 * @desc These Action Sequences are related to the Battle Log Window,
 * the window found at the top of the battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_AddText
 * @text BTLOG: Add Text
 * @desc Adds a new line of text into the Battle Log.
 * 
 * @arg Text:str
 * @text Text
 * @desc Add this text into the Battle Log.
 * Text codes allowed.
 * @default Insert text here.
 * 
 * @arg CopyCombatLog:eval
 * @text Copy to Combat Log?
 * @type boolean
 * @on Copy Text
 * @off Don't Copy
 * @desc Copies text to the Combat Log.
 * Requires VisuMZ_4_CombatLog
 * @default true
 *
 * @arg CombatLogIcon:num
 * @text Combat Log Icon
 * @parent CopyCombatLog:eval
 * @desc What icon would you like to bind to this entry?
 * Requires VisuMZ_4_CombatLog
 * @default 87
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Clear
 * @text BTLOG: Clear Battle Log
 * @desc Clears all the text in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_DisplayAction
 * @text BTLOG: Display Action
 * @desc Displays the current action in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PopBaseLine
 * @text BTLOG: Pop Base Line
 * @desc Removes the Battle Log's last added base line and 
 * all text up to its former location.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PushBaseLine
 * @text BTLOG: Push Base Line
 * @desc Adds a new base line to where the Battle Log currently is at.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Refresh
 * @text BTLOG: Refresh Battle Log
 * @desc Refreshes the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_UI
 * @text BTLOG: UI Show/Hide
 * @desc Shows or hides the Battle UI (including the Battle Log).
 * 
 * @arg ShowHide:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the Battle UI.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForBattleLog
 * @text BTLOG: Wait For Battle Log
 * @desc Causes the interpreter to wait for the Battle Log to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForNewLine
 * @text BTLOG: Wait For New Line
 * @desc Causes the interpreter to wait for a new line in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakCamera
 * @text Action Sequences - Camera
 * @desc Allows you to have control over the camera.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Clamp
 * @text CAMERA: Clamp ON/OFF
 * @desc Turns battle camera clamping on/off.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Setting:eval
 * @text ON/OFF
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Turns camera clamping on/off.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusPoint
 * @text CAMERA: Focus Point
 * @desc Focus the battle camera on a certain point in the screen.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg FocusX:eval
 * @text X Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg FocusY:eval
 * @text Y Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusTarget
 * @text CAMERA: Focus Target(s)
 * @desc Focus the battle camera on certain battler target(s).
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to focus the battle camera on.
 * @default ["user"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Offset
 * @text CAMERA: Offset
 * @desc Offset the battle camera from the focus target.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @desc How much to offset the camera X by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc How much to offset the camera Y by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for offset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Reset
 * @text CAMERA: Reset
 * @desc Reset the battle camera settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg ResetFocus:eval
 * @text Reset Focus?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the focus point?
 * @default true
 * 
 * @arg ResetOffset:eval
 * @text Reset Offset?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the camera offset?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for reset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_WaitForCamera
 * @text CAMERA: Wait For Camera
 * @desc Waits for camera to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 *
 * @command ActionSequenceSpaceDragonbones
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreaDragonbones
 * @text Action Sequences - Dragonbones
 * @desc These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesMotionAni
 * @text DB: Dragonbones Animation
 * @desc Causes the unit(s) to play a Dragonbones motion animation.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg MotionAni:str
 * @text Motion Animation
 * @desc What is the name of the Dragonbones motion animation you wish to play?
 * @default attack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesTimeScale
 * @text DB: Dragonbones Time Scale
 * @desc Causes the unit(s) to change their Dragonbones time scale.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg TimeScale:num
 * @text Time Scale
 * @desc Change the value of the Dragonbones time scale to this.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceElements
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakElements
 * @text Action Sequences - Elements
 * @desc These Action Sequences are related to elements.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_AddElements
 * @text ELE: Add Elements
 * @desc Adds element(s) to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to add onto the action.
 * Insert multiple element ID's to add multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_Clear
 * @text ELE: Clear Element Changes
 * @desc Clears all element changes made through Action Sequences.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_ForceElements
 * @text ELE: Force Elements
 * @desc Forces only specific element(s) when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to force in the action.
 * Insert multiple element ID's to force multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_NullElements
 * @text ELE: Null Element
 * @desc Forces no element to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceHorror
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakHorror
 * @text Action Sequences - Horror Effects
 * @desc These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_Clear
 * @text HORROR: Clear All Filters
 * @desc Clear all Horror Effects filters on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove Horror Effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchCreate
 * @text HORROR: Glitch Create
 * @desc Creates the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchRemove
 * @text HORROR: Glitch Remove
 * @desc Removes the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseCreate
 * @text HORROR: Noise Create
 * @desc Creates the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseRemove
 * @text HORROR: Noise Remove
 * @desc Removes the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVCreate
 * @text HORROR: TV Create
 * @desc Creates the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVRemove
 * @text HORROR: TV Remove
 * @desc Removes the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceImpact
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakImpact
 * @text Action Sequences - Impact
 * @desc These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ColorBreak
 * @text IMPACT: Color Break
 * @desc Breaks the colors on the screen before reassembling.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Intensity:eval
 * @text Intensity
 * @desc What is the intensity of the color break effect?
 * @default 60
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the color break effect?
 * @default 60
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutBack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurScreen
 * @text IMPACT: Motion Blur Screen
 * @desc Creates a motion blur on the whole screen.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.1
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurTarget
 * @text IMPACT: Motion Blur Target(s)
 * @desc Creates a motion blur on selected target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion blur effects for.
 * @default ["user"]
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.5
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailCreate
 * @text IMPACT: Motion Trail Create
 * @desc Creates a motion trail effect for the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion trail effects for.
 * @default ["user"]
 *
 * @arg delay:num
 * @text Delay
 * @type Number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 1
 *
 * @arg duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type Number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type Number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 200
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailRemove
 * @text IMPACT: Motion Trail Remove
 * @desc Removes the motion trail effect from the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to clear motion trail effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwavePoint
 * @text IMPACT: Shockwave at Point
 * @desc Creates a shockwave at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveEachTargets
 * @text IMPACT: Shockwave from Each Target(s)
 * @desc Creates a shockwave at each of the target(s) location(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveCenterTargets
 * @text IMPACT: Shockwave from Target(s) Center
 * @desc Creates a shockwave from the center of the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurPoint
 * @text IMPACT: Zoom Blur at Point
 * @desc Creates a zoom blur at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurTargetCenter
 * @text IMPACT: Zoom Blur at Target(s) Center
 * @desc Creates a zoom blur at the center of targets.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a zoom blur from.
 * @default ["user"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a zoom blur from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the zoom blur X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the zoom blur Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMechanics
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMechanics
 * @text Action Sequences - Mechanics
 * @desc These Action Sequences are related to various mechanics
 * related to the battle system.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ActionEffect
 * @text MECH: Action Effect
 * @desc Causes the unit(s) to take damage/healing from action and
 * incurs any changes made such as buffs and states.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddBuffDebuff
 * @text MECH: Add Buff/Debuff
 * @desc Adds buff(s)/debuff(s) to unit(s). 
 * Determine which parameters are affected and their durations.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s) and/or debuff(s).
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to buff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["ATK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to debuff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["DEF"]
 * 
 * @arg Turns:eval
 * @text Turns
 * @desc Number of turns to set the parameter(s) buffs to.
 * You may use JavaScript code.
 * @default 5
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddState
 * @text MECH: Add State
 * @desc Adds state(s) to unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s).
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to add to unit(s).
 * Insert multiple state ID's to add multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ArmorPenetration
 * @text MECH: Armor Penetration
 * @desc Adds an extra layer of defensive penetration/reduction.
 * You may use JavaScript code for any of these.
 *
 * @arg ArmorPenetration
 * @text Armor/Magic Penetration
 * 
 * @arg ArPenRate:eval
 * @text Rate
 * @parent ArmorPenetration
 * @desc Penetrates an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArPenFlat:eval
 * @text Flat
 * @parent ArmorPenetration
 * @desc Penetrates a flat amount of armor by this value.
 * @default 0
 *
 * @arg ArmorReduction
 * @text Armor/Magic Reduction
 * 
 * @arg ArRedRate:eval
 * @text Rate
 * @parent ArmorReduction
 * @desc Reduces an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArRedFlat:eval
 * @text Flat
 * @parent ArmorReduction
 * @desc Reduces a flat amount of armor by this value.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AtbGauge
 * @text MECH: ATB Gauge
 * @desc Alters the ATB/TPB Gauges.
 * Requires VisuMZ_2_BattleSystemATB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 *
 * @arg Charging
 * 
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the ATB Gauge if it is currently charging.
 * @default -0.00
 * 
 * @arg Casting
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the ATB Gauge if it is currently casting.
 * @default -0.00
 * 
 * @arg Interrupt:eval
 * @text Interrupt?
 * @parent Casting
 * @type boolean
 * @on Interrupt
 * @off Don't Interrupt
 * @desc Interrupt the ATB Gauge if it is currently casting?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BreakShieldChange
 * @text MECH: Break Shield Change
 * @desc Changes Break Shields for target(s) if not Break Stunned.
 * Requires VisuMZ_4_BreakShields!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the Break Shields for.
 * @default ["all targets"]
 * 
 * @arg BreakShields:eval
 * @text Alter Break Shields By
 * @desc Alters the unit(s) Break Shields.
 * Positive for gaining shields. Negative for losing shields.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BreakShieldReset
 * @text MECH: Break Shield Reset
 * @desc Resets Break Shields for target(s) if not Break Stunned.
 * Requires VisuMZ_4_BreakShields!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to reset the Break Shields for.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BtbGain
 * @text MECH: BTB Brave Points
 * @desc Alters the target(s) Brave Points to an exact value.
 * Requires VisuMZ_2_BattleSystemBTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 * 
 * @arg BravePoints:eval
 * @text Alter Brave Points By
 * @desc Alters the target(s) Brave Points.
 * Positive for gaining BP. Negative for losing BP.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Collapse
 * @text MECH: Collapse
 * @desc Causes the unit(s) to perform its collapse animation
 * if the unit(s) has died.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to process a death collapse.
 * @default ["all targets"]
 * 
 * @arg ForceDeath:eval
 * @text Force Death
 * @type boolean
 * @on On
 * @off Off
 * @desc Force death even if the unit has not reached 0 HP?
 * This will remove immortality.
 * @default false
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effect?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for the collapse effect to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbOrder
 * @text MECH: CTB Order
 * @desc Alters the CTB Turn Order.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Turn Order for.
 * @default ["all targets"]
 *
 * @arg ChangeOrderBy:eval
 * @text Change Order By
 * @parent Charging
 * @desc Changes turn order for target(s) by this amount.
 * Positive increases wait. Negative decreases wait.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbSpeed
 * @text MECH: CTB Speed
 * @desc Alters the CTB Speed.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Speed for.
 * @default ["all targets"]
 *
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the CTB Speed if it is currently charging.
 * @default -0.00
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the CTB Speed if it is currently casting.
 * @default -0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CustomDmgFormula
 * @text MECH: Custom Damage Formula
 * @desc Changes the current action's damage formula to custom.
 * This will assume the MANUAL damage style.
 * 
 * @arg Formula:str
 * @text Formula
 * @desc Changes the current action's damage formula to custom.
 * Use 'default' to revert the damage formula.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DamagePopup
 * @text MECH: Damage Popup
 * @desc Causes the unit(s) to display the current state of
 * damage received or healed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a damage popup.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DeathBreak
 * @text MECH: Dead Label Jump
 * @desc If the active battler is dead, jump to a specific label in the common event.
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If the active battler is dead, jump to this specific label in the common event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_FtbAction
 * @text MECH: FTB Action Count
 * @desc Alters the subject team's available Action Count.
 * Requires VisuMZ_2_BattleSystemFTB!
 * 
 * @arg ActionCount:eval
 * @text Action Count
 * @desc Alters the subject team's available Action Count.
 * Positive for gaining actions. Negative for losing actions.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_HpMpTp
 * @text MECH: HP, MP, TP
 * @desc Alters the HP, MP, and TP values for unit(s).
 * Positive values for healing. Negative values for damage.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["user"]
 *
 * @arg HP
 * 
 * @arg HP_Rate:eval
 * @text HP Rate
 * @parent HP
 * @desc Changes made to HP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg HP_Flat:eval
 * @text HP Flat
 * @parent HP
 * @desc Flat changes made to HP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg MP
 * 
 * @arg MP_Rate:eval
 * @text MP Rate
 * @parent MP
 * @desc Changes made to MP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg MP_Flat:eval
 * @text MP Flat
 * @parent MP
 * @desc Flat changes made to MP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 *
 * @arg TP
 * 
 * @arg TP_Rate:eval
 * @text TP Rate
 * @parent TP
 * @desc Changes made to TP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg TP_Flat:eval
 * @text TP Flat
 * @parent TP
 * @desc Flat changes made to TP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg ShowPopup:eval
 * @text Damage Popup?
 * @type boolean
 * @on On
 * @off Off
 * @desc Display a damage popup after?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Immortal
 * @text MECH: Immortal
 * @desc Changes the immortal flag of targets. If immortal flag is
 * removed and a unit would die, collapse that unit.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Alter the immortal flag of these groups. If immortal flag
 * is removed and a unit would die, collapse that unit.
 * @default ["user","all targets"]
 * 
 * @arg Immortal:eval
 * @text Immortal
 * @type boolean
 * @on On
 * @off Off
 * @desc Turn immortal flag for unit(s) on/off?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Multipliers
 * @text MECH: Multipliers
 * @desc Changes the multipliers for the current action.
 * You may use JavaScript code for any of these.
 *
 * @arg CriticalHit
 * @text Critical Hit%
 * 
 * @arg CriticalHitRate:eval
 * @text Rate
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalHitFlat:eval
 * @text Flat
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this flat bonus.
 * @default +0.00
 *
 * @arg CriticalDmg
 * @text Critical Damage
 * 
 * @arg CriticalDmgRate:eval
 * @text Rate
 * @parent CriticalDmg
 * @desc Affects critical damage by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalDmgFlat:eval
 * @text Flat
 * @parent CriticalDmg
 * @desc Affects critical damage by this flat bonus.
 * @default +0.00
 *
 * @arg Damage
 * @text Damage/Healing
 * 
 * @arg DamageRate:eval
 * @text Rate
 * @parent Damage
 * @desc Sets the damage/healing multiplier for current action.
 * @default 1.00
 * 
 * @arg DamageFlat:eval
 * @text Flat
 * @parent Damage
 * @desc Sets the damage/healing bonus for current action.
 * @default +0.00
 *
 * @arg HitRate
 * @text Hit Rate
 * 
 * @arg HitRate:eval
 * @text Rate
 * @parent HitRate
 * @desc Affects chance to connect attack by this multiplier.
 * @default 1.00
 * 
 * @arg HitFlat:eval
 * @text Flat
 * @parent HitRate
 * @desc Affects chance to connect attack by this flat bonus.
 * @default +0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveBuffDebuff
 * @text MECH: Remove Buff/Debuff
 * @desc Removes buff(s)/debuff(s) from unit(s). 
 * Determine which parameters are removed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have the buff(s) and/or debuff(s) removed.
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which buffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which debuffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveState
 * @text MECH: Remove State
 * @desc Remove state(s) from unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have states removed from.
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to remove from unit(s).
 * Insert multiple state ID's to remove multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExploit
 * @text MECH: STB Exploit Effect
 * @desc Utilize the STB Exploitation mechanics!
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Exploited:eval
 * @text Target(s) Exploited?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Exploit the below targets?
 * @default true
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to become exploited.
 * @default ["all targets"]
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploited status?
 * @default false
 * 
 * @arg Exploiter:eval
 * @text User Exploiter?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Allow the user to become the exploiter?
 * @default true
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploiter status?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExtraAction
 * @text MECH: STB Extra Action
 * @desc Adds an extra action for the currently active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Extra Actions
 * @parent Charging
 * @desc How many extra actions should the active battler gain?
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbRemoveExcessActions
 * @text MECH: STB Remove Excess Actions
 * @desc Removes excess actions from the active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Remove Actions
 * @parent Charging
 * @desc How many actions to remove from the active battler?
 * You may use JavaScript code.
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_TextPopup
 * @text MECH: Text Popup
 * @desc Causes the unit(s) to display a text popup.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Text:str
 * @text Text
 * @desc What text do you wish to display?
 * @default Text
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_VariablePopup
 * @text MECH: Variable Popup
 * @desc Causes the unit(s) to display a popup using the data
 * stored inside a variable.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Variable:num
 * @text Variable ID
 * @type variable
 * @desc Get data from which variable to display as a popup?
 * @default 1
 * 
 * @arg DigitGrouping:eval
 * @text Digit Grouping
 * @parent Variable:num
 * @type boolean
 * @on Group Digits
 * @off Don't Group
 * @desc Use digit grouping to separate numbers?
 * Requires VisuMZ_0_CoreEngine!
 * @default true
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Variable:num
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_WaitForEffect
 * @text MECH: Wait For Effect
 * @desc Waits for the effects to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMotion
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMotion
 * @text Action Sequences - Motion
 * @desc These Action Sequences allow you the ability to control
 * the motions of sideview sprites.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_ClearFreezeFrame
 * @text MOTION: Clear Freeze Frame
 * @desc Clears any freeze frames from the unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to clear freeze frames for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_FreezeMotionFrame
 * @text MOTION: Freeze Motion Frame
 * @desc Forces a freeze frame instantly at the selected motion.
 * Automatically clears with a new motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to freeze motions for.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Freeze this motion for the unit(s).
 * @default attack
 * 
 * @arg Frame:num
 * @text Frame Index
 * @desc Which frame do you want to freeze the motion on?
 * Frame index values start at 0.
 * @default 2
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_MotionType
 * @text MOTION: Motion Type
 * @desc Causes the unit(s) to play the selected motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default attack
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_PerformAction
 * @text MOTION: Perform Action
 * @desc Causes the unit(s) to play the proper motion based
 * on the current action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_RefreshMotion
 * @text MOTION: Refresh Motion
 * @desc Cancels any set motions unit(s) has to do and use
 * their most natural motion at the moment.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to refresh their motion state.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_WaitMotionFrame
 * @text MOTION: Wait By Motion Frame
 * @desc Creates a wait equal to the number of motion frames passing.
 * Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 * @arg MotionFrameWait:num
 * @text Motion Frames to Wait?
 * @type number
 * @min 1
 * @desc Each "frame" is equal to the value found in
 * Plugin Parameters => Actors => Motion Speed
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMovement
 * @text Action Sequences - Movement
 * @desc These Action Sequences allow you the ability to control
 * the sprites of actors and enemies in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_BattleStep
 * @text MOVE: Battle Step
 * @desc Causes the unit(s) to move forward past their home position
 * to prepare for action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceDirection
 * @text MOVE: Face Direction
 * @desc Causes the unit(s) to face forward or backward.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Direction:str
 * @text Direction
 * @type combo
 * @option forward
 * @option backward
 * @option random
 * @desc Select which direction to face.
 * @default forward
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FacePoint
 * @text MOVE: Face Point
 * @desc Causes the unit(s) to face a point on the screen.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Point:str
 * @text Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the point instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceTarget
 * @text MOVE: Face Target(s)
 * @desc Causes the unit(s) to face other targets on the screen.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (facing)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for the turning unit(s) to face.
 * @default ["current target"]
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the unit(s) instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Float
 * @text MOVE: Float
 * @desc Causes the unit(s) to float above the ground.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Vertical distance to float upward.
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total float amount.
 * @default 12
 *
 * @arg EasingType:str
 * @text Float Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForFloat:eval
 * @text Wait For Float?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for floating to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_HomeReset
 * @text MOVE: Home Reset
 * @desc Causes the unit(s) to move back to their home position(s)
 * and face back to their original direction(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["alive battlers"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Jump
 * @text MOVE: Jump
 * @desc Causes the unit(s) to jump into the air.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make jump.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Max jump height to go above the ground
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total jump amount.
 * @default 12
 * 
 * @arg WaitForJump:eval
 * @text Wait For Jump?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for jumping to complete before performing next command?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveBy
 * @text MOVE: Move Distance
 * @desc Moves unit(s) by a distance from their current position(s).
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 *
 * @arg DistanceAdjust:str
 * @text Distance Adjustment
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to distance values to determine
 * which direction to move unit(s).
 * @default horz
 * 
 * @arg DistanceX:eval
 * @text Distance: X
 * @parent DistanceAdjust:str
 * @desc Horizontal distance to move.
 * You may use JavaScript code.
 * @default 48
 * 
 * @arg DistanceY:eval
 * @text Distance: Y
 * @parent DistanceAdjust:str
 * @desc Vertical distance to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToPoint
 * @text MOVE: Move To Point
 * @desc Moves unit(s) to a designated point on the screen.
 * Sideview-only! Points based off Graphics.boxWidth/Height.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Destination:str
 * @text Destination Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Destination:str
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToTarget
 * @text MOVE: Move To Target(s)
 * @desc Moves unit(s) to another unit(s) on the battle field.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (Moving)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (Destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move to.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to move to.
 * @default front base
 * 
 * @arg MeleeDistance:eval
 * @text Melee Distance
 * @parent TargetLocation:str
 * @desc The melee distance away from the target location
 * in addition to the battler's width.
 * @default 24
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Targets2:arraystr
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Opacity
 * @text MOVE: Opacity
 * @desc Causes the unit(s) to change opacity.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change opacity.
 * @default ["user"]
 * 
 * @arg Opacity:eval
 * @text Desired Opacity
 * @desc Change to this opacity value.
 * You may use JavaScript code.
 * @default 255
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for opacity change.
 * @default 12
 *
 * @arg EasingType:str
 * @text Opacity Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForOpacity:eval
 * @text Wait For Opacity?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for opacity changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Scale
 * @text MOVE: Scale/Grow/Shrink
 * @desc Causes the unit(s) to scale, grow, or shrink?.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change the scale of.
 * @default ["user"]
 * 
 * @arg ScaleX:eval
 * @text Scale X
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg ScaleY:eval
 * @text Scale Y
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to scale for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Scale Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForScale:eval
 * @text Wait For Scale?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for scaling to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Skew
 * @text MOVE: Skew/Distort
 * @desc Causes the unit(s) to skew.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to skew.
 * @default ["user"]
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc X variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Y variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to skew for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Skew Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Spin
 * @text MOVE: Spin/Rotate
 * @desc Causes the unit(s) to spin.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to spin.
 * @default ["user"]
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc How many degrees to spin?
 * @default 360
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to spin for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Spin Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg RevertAngle:eval
 * @text Revert Angle on Finish
 * @type boolean
 * @on Revert
 * @off Don't
 * @desc Revert angle after spinning?
 * @default true
 * 
 * @arg WaitForSpin:eval
 * @text Wait For Spin?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for spin to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForFloat
 * @text MOVE: Wait For Float
 * @desc Waits for floating to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForJump
 * @text MOVE: Wait For Jump
 * @desc Waits for jumping to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForMovement
 * @text MOVE: Wait For Movement
 * @desc Waits for movement to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForOpacity
 * @text MOVE: Wait For Opacity
 * @desc Waits for opacity changes to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForScale
 * @text MOVE: Wait For Scale
 * @desc Waits for scaling to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSkew
 * @text MOVE: Wait For Skew
 * @desc Waits for skewing to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSpin
 * @text MOVE: Wait For Spin
 * @desc Waits for spinning to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceProjectile
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakProjectile
 * @text Action Sequences - Projectiles
 * @desc Create projectiles on the screen and fire them off at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Animation
 * @text PROJECTILE: Animation
 * @desc Create an animation projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Settings
 * @type animation
 * @desc Determine which animation to use as a projectile.
 * @default 77
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExAni>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","EasingType:str":"Linear","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Icon
 * @text PROJECTILE: Icon
 * @desc Create an icon projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg Icon:eval
 * @text Icon Index
 * @parent Settings
 * @desc Determine which icon to use as a projectile.
 * You may use JavaScript code.
 * @default 118
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExtra>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","BlendMode:num":"0","EasingType:str":"Linear","Hue:eval":"0","Scale:eval":"1.0","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Picture
 * @text PROJECTILE: Picture
 * @desc Create a picture projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg Picture:str
 * @text Picture Filename
 * @parent Settings
 * @type file
 * @dir img/pictures/
 * @desc Determine which picture to use as a projectile.
 * @default Untitled
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExtra>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","BlendMode:num":"0","EasingType:str":"Linear","Hue:eval":"0","Scale:eval":"1.0","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceSkew
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSkew
 * @text Action Sequences - Skew
 * @desc Allows you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeSkew
 * @text SKEW: Change Skew
 * @desc Changes the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc Change the camera skew X to this value.
 * @default 0
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Change the camera skew Y to this value.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_Reset
 * @text SKEW: Reset Skew
 * @desc Reset any skew settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_WaitForSkew
 * @text SKEW: Wait For Skew
 * @desc Waits for skew changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceTarget
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakTarget
 * @text Action Sequences - Target
 * @desc If using a manual target by target Action Sequence,
 * these commands will give you full control over its usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_CurrentIndex
 * @text TARGET: Current Index
 * @desc Sets the current index to this value.
 * Then decide to jump to a label (optional).
 * 
 * @arg Index:eval
 * @text Set Index To
 * @desc Sets current targeting index to this value.
 * 0 is the starting index of a target group.
 * @default 0
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_NextTarget
 * @text TARGET: Next Target
 * @desc Moves index forward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_PrevTarget
 * @text TARGET: Previous Target
 * @desc Moves index backward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_RandTarget
 * @text TARGET: Random Target
 * @desc Sets index randomly to determine new currernt target.
 * Then decide to jump to a label (optional).
 * 
 * @arg ForceRandom:eval
 * @text Force Random?
 * @type boolean
 * @on On
 * @off Off
 * @desc Index cannot be its previous index amount after random.
 * @default false
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceWeapon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakWeapon
 * @text Action Sequences - Weapon
 * @desc Allows for finer control over Dual/Multi Wielding actors.
 * Only works for Actors.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Weapon_ClearActiveWeapon
 * @text WEAPON: Clear Weapon Slot
 * @desc Clears the active weapon slot (making others valid again).
 * Only works for Actors.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @desc Select unit(s) to clear the active weapon slot for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Weapon_NextActiveWeapon
 * @text WEAPON: Next Weapon Slot
 * @desc Goes to next active weapon slot (making others invalid).
 * If next slot is weaponless, don't label jump.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @desc Select unit(s) to change the next active weapon slot for.
 * @default ["user"]
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a weapon is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Weapon_SetActiveWeapon
 * @text WEAPON: Set Weapon Slot
 * @desc Sets the active weapon slot (making others invalid).
 * Only works for Actors.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @desc Select unit(s) to change the active weapon slot for.
 * @default ["user"]
 * 
 * @arg SlotID:eval
 * @text Weapon Slot ID
 * @desc Select weapon slot to make active (making others invalid).
 * Use 0 to clear and normalize. You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceZoom
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakZoom
 * @text Action Sequences - Zoom
 * @desc Allows you to have control over the screen zoom.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Scale
 * @text ZOOM: Change Scale
 * @desc Changes the zoom scale.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Scale:eval
 * @text Scale
 * @desc The zoom scale to change to.
 * @default 1.0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Reset
 * @text ZOOM: Reset Zoom
 * @desc Reset any zoom settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_WaitForZoom
 * @text ZOOM: Wait For Zoom
 * @desc Waits for zoom to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceEnd
 * @text -
 * @desc -
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
 * @param BattleCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoBattle:struct
 * @text Auto Battle Settings
 * @type struct<AutoBattle>
 * @desc Settings pertaining to Auto Battle.
 * @default {"BattleDisplay":"","AutoBattleMsg:str":"Press %1 or %2 to stop Auto Battle","AutoBattleOK:str":"OK","AutoBattleCancel:str":"Cancel","AutoBattleBgType:num":"1","AutoBattleRect:func":"\"const width = Graphics.width;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = 0;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","StartName:str":"Auto Battle Start","StyleName:str":"Auto Battle Style","StyleOFF:str":"Attack","StyleON:str":"Skills"}
 *
 * @param Damage:struct
 * @text Damage Settings
 * @type struct<Damage>
 * @desc Settings pertaining to damage calculations.
 * @default {"Cap":"","EnableDamageCap:eval":"false","DefaultHardCap:num":"9999","EnableSoftCap:eval":"false","DefaultSoftCap:num":"0.80","DefaultSoftScaler:num":"0.1275","Popups":"","PopupDuration:num":"128","NewPopupBottom:eval":"true","PopupPosition:str":"base","PopupOffsetX:num":"0","PopupOffsetY:num":"0","PopupShiftX:num":"8","PopupShiftY:num":"-28","hpDamageFmt:str":"-%1","hpHealingFmt:str":"+%1","mpDamageFmt:str":"-%1 %2","mpHealingFmt:str":"+%1 %2","CriticalColor:eval":"[255, 0, 0, 160]","CriticalDuration:num":"128","Formulas":"","OverallFormulaJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst critical = arguments[1];\\nconst item = this.item();\\n\\n// Get Base Damage\\nconst baseValue = this.evalDamageFormula(target);\\n\\n// Calculate Element Modifiers\\nlet value = baseValue * this.calcElementRate(target);\\n\\n// Calculate Physical and Magical Modifiers\\nif (this.isPhysical()) {\\n    value *= target.pdr;\\n}\\nif (this.isMagical()) {\\n    value *= target.mdr;\\n}\\n\\n// Apply Healing Modifiers\\nif (baseValue < 0) {\\n    value *= target.rec;\\n}\\n\\n// Apply Critical Modifiers\\nif (critical) {\\n    value = this.applyCritical(value);\\n}\\n\\n// Apply Variance and Guard Modifiers\\nvalue = this.applyVariance(value, item.damage.variance);\\nvalue = this.applyGuard(value, target);\\n\\n// Finalize Damage\\nvalue = Math.round(value);\\nreturn value;\"","VarianceFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst variance = arguments[1];\\n\\n// Calculate Variance\\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\\n\\n// Return Damage\\nreturn damage >= 0 ? damage + v : damage - v;\"","GuardFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst target = arguments[1];\\n\\n// Return Damage Early\\nconst note = this.item().note;\\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\\nif (!target.isGuard()) return damage;\\nif (damage < 0) return damage;\\n\\n// Declare Guard Rate\\nlet guardRate = 0.5;\\nguardRate /= target.grd;\\n\\n// Return Damage\\nreturn damage * guardRate;\"","Critical":"","CriticalHitRateJS:func":"\"// Declare Constants\\nconst user = this.subject();\\nconst target = arguments[0];\\n\\n// Create Base Critical Rate\\nlet rate = this.subject().cri * (1 - target.cev);\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<ALWAYS CRITICAL>/i)) {\\n    return 1;\\n}\\nif (note.match(/<SET CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    return Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    rate *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    rate += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL RATE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL RATE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Apply LUK Buffs/Debuffs\\nconst lukStack = this.subject().buff(7);\\nrate *= 2 ** lukStack;\\n\\n// Return Rate\\nreturn rate;\"","CriticalHitMultiplier:func":"\"// Declare Constants\\nconst user = this.subject();\\nlet damage = arguments[0];\\nlet multiplier = 2.0;\\nlet bonusDamage = this.subject().luk * this.subject().cri;\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\\\d+)([%％])>/i)) {\\n    multiplier = Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    multiplier += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\\\d+)([%％])>/i)) {\\n    bonusDamage *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL DAMAGE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL DAMAGE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Return Damage\\nreturn damage * multiplier + bonusDamage;\"","DamageStyles":"","DefaultDamageStyle:str":"Standard","DamageStyleList:arraystruct":"[\"{\\\"Name:str\\\":\\\"Standard\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"Armor Scaling\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"CT\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\\\\\nvalue = attackStat * 4;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"D4\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nlet stat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n    armor = 0;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n    armor = 0;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"DQ\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Get Primary Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Check for Recovery\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    let value = stat * multiplier * sign;\\\\\\\\n    return isNaN(value) ? 0 : value;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = 0;\\\\\\\\nif (stat < ((2 + armor) / 2)) {\\\\\\\\n    // Plink Damage\\\\\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\\\\\n    value = baseline / 3;\\\\\\\\n} else {\\\\\\\\n    // Normal Damage\\\\\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\\\\\n    value = baseline / 2;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF7\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare base Damage\\\\\\\\nlet baseDamage = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = 6 * (a.mat + level);\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.def + level);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.mdf + level);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Final Damage\\\\\\\\nlet value = baseDamage;\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    value += 22 * power;\\\\\\\\n} else {\\\\\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF8\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Damage\\\\\\\\nlet Value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\\\\\n    value *= power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.mat + power;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\\\\\n    value *= power / 256;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = (power + a.def) * power / 2;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = (power + a.mdf) * power / 2;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF9\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Main Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Base Damage\\\\\\\\nlet baseDamage = power;\\\\\\\\nif (this.isPhysical()) {\\\\\\\\n    baseDamage += stat;\\\\\\\\n}\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    baseDamage -= armor;\\\\\\\\n    baseDamage = Math.max(1, baseDamage);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Bonus Damage\\\\\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\\\\\n\\\\\\\\n// Declare Final Damage\\\\\\\\nlet value = baseDamage * bonusDamage * sign;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF10\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Create Damage Offense Value\\\\\\\\nlet value = power;\\\\\\\\n\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.def + power) / 2);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.mdf + power) / 2);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Damage Defense Value\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\\\\\n    armor = Math.max(armor, 1);\\\\\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\\\\\n} else if (this.isRecover()) {\\\\\\\\n    value *= -1;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MK\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nconst denominator = Math.max(200 + armor, 1);\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.atk / denominator;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.mat / denominator;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.def / 200;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.mdf / 200;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MOBA\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Value\\\\\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\\\\\n\\\\\\\\n// Apply Attacker's Offense Parameter\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value *= a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value *= a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"PKMN\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\"]"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings pertaining to various game mechanics.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","BaseTroop":"","BaseTroopIDs:arraynum":"[\"1\"]","CommonEvents":"","BattleStartEvent:num":"0","BattleEndEvent:num":"0","VictoryEvent:num":"0","DefeatEvent:num":"0","EscapeSuccessEvent:num":"0","EscapeFailEvent:num":"0","Escape":"","CalcEscapeRatioJS:func":"\"// Calculate Escape Ratio\\nlet ratio = 0.5;\\nratio *= $gameParty.agility();\\nratio /= $gameTroop.agility();\\n\\n// Return Ratio\\nreturn ratio;\"","CalcEscapeRaiseJS:func":"\"// Calculate Escape Ratio\\nlet value = 0.1;\\nvalue += $gameParty.aliveMembers().length;\\n\\n// Return Value\\nreturn value;\"","BattleJS":"","PreStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleVictoryJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeSuccessJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeFailureJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleDefeatJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","TurnJS":"","PreStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","ActionJS":"","PreStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PreApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\""}
 *
 * @param CmdWindows
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleLayout:struct
 * @text Battle Layout Settings
 * @type struct<BattleLayout>
 * @desc Settings that adjust how the battle layout appears.
 * @default {"Style:str":"default","ListStyle":"","ShowFacesListStyle:eval":"true","CommandWidth:num":"192","XPStyle":"","XPActorCommandLines:num":"4","XPActorDefaultHeight:num":"64","XPSpriteYLocation:str":"name","PotraitStyle":"","ShowPortraits:eval":"true","PortraitScale:num":"0.5","BorderStyle":"","SkillItemBorderCols:num":"1","ShowPortraitsBorderStyle:eval":"true","PortraitScaleBorderStyle:num":"1.25","SkillItemWindows":"","SkillItemMiddleLayout:eval":"false","SkillItemStandardCols:num":"2"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings that adjust how Window_BattleLog behaves.
 * @default {"General":"","BackColor:str":"#000000","MaxLines:num":"10","MessageWait:num":"16","TextAlign:str":"center","BattleLogRectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(10, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","StartTurn":"","StartTurnShow:eval":"true","StartTurnMsg:str":"Turn %1","StartTurnWait:num":"40","DisplayAction":"","ActionCenteredName:eval":"true","ActionSkillMsg1:eval":"false","ActionSkillMsg2:eval":"true","ActionItemMsg:eval":"false","ActionChanges":"","ShowCounter:eval":"true","ShowReflect:eval":"true","ShowSubstitute:eval":"true","ActionResults":"","ShowFailure:eval":"false","ShowCritical:eval":"false","ShowMissEvasion:eval":"false","ShowHpDmg:eval":"false","ShowMpDmg:eval":"false","ShowTpDmg:eval":"false","DisplayStates":"","ShowAddedState:eval":"false","ShowRemovedState:eval":"false","ShowCurrentState:eval":"false","ShowAddedBuff:eval":"false","ShowAddedDebuff:eval":"false","ShowRemovedBuff:eval":"false"}
 *
 * @param Battleback:struct
 * @text Battleback Scaling
 * @type struct<Battleback>
 * @desc Settings that adjust how battlebacks scale.
 * @default {"DefaultStyle:str":"MZ","jsOneForOne:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst scale = 1.0;\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = 0;\\nthis.y = 0;\"","jsScaleToFit:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = this.width / this.bitmap.width;\\nconst ratioY = this.height / this.bitmap.height;\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScaleDown:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScale Up:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\""}
 *
 * @param PartyCmd:struct
 * @text Party Command Window
 * @type struct<PartyCmd>
 * @desc Settings that alter the Party Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconFight:num":"76","CommandAddAutoBattle:eval":"true","CmdIconAutoBattle:num":"78","CmdTextAutoBattle:str":"Auto","CommandAddOptions:eval":"true","CmdIconOptions:num":"83","ActiveTpbOptionsMessage:str":"Options Menu queued after action is complete.","CmdIconEscape:num":"82","Access":"","SkipPartyCmd:eval":"true","DisablePartyCmd:eval":"false","HelpWindow":"","HelpFight:str":"Select actions to fight.","HelpAutoBattle:str":"Sets party to Auto Battle mode.","HelpOptions:str":"Opens up the Options Menu.","HelpEscape:str":"Attempt to escape the battle."}
 *
 * @param ActorCmd:struct
 * @text Actor Command Window
 * @type struct<ActorCmd>
 * @desc Settings that alter the Actor Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconItem:num":"176","IconStypeNorm:num":"78","IconStypeMagic:num":"79","BattleCmd":"","BattleCmdList:arraystr":"[\"attack\",\"skills\",\"guard\",\"item\",\"escape\"]","HelpWindow":"","HelpSkillType:str":"Opens up a list of skills under the \\C[16]%1\\C[0] category.","HelpItem:str":"Opens up a list of items that you can use.","HelpEscape:str":"Attempt to escape the battle.","HelpAutoBattle:str":"Automatically choose an action suitable for combat."}
 *
 * @param VisualBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Actor:struct
 * @text Actor Battler Settings
 * @type struct<Actor>
 * @desc Settings that alter various properties for actors.
 * @default {"Flinch":"","FlinchDistanceX:num":"12","FlinchDistanceY:num":"0","FlinchDuration:num":"6","SvBattlers":"","AnchorX:num":"0.5","AnchorY:num":"1.0","ChantStyle:eval":"true","OffsetX:num":"0","OffsetY:num":"0","MotionSpeed:num":"12","PrioritySortActive:eval":"true","PrioritySortActors:eval":"false","Shadow:eval":"true","SmoothImage:eval":"true","HomePosJS:func":"\"// Declare Constants\\nconst sprite = this;\\nconst actor = this._actor;\\nconst index = arguments[0];\\n\\n// Make Calculations\\nlet x = Math.round((Graphics.width / 2) + 192)\\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\\nx += index * 32;\\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\\ny += index * 48;\\n\\n// Home Position Offsets\\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\\\+\\\\-]\\\\d+),[ ]([\\\\+\\\\-]\\\\d+)>/i;\\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\\nx = xOffsets.reduce((r, offset) => r + offset, x);\\ny = yOffsets.reduce((r, offset) => r + offset, y);\\n\\n// Set Home Position\\nthis.setHome(x, y);\""}
 *
 * @param Enemy:struct
 * @text Enemy Battler Settings
 * @type struct<Enemy>
 * @desc Settings that alter various properties for enemies.
 * @default {"Visual":"","AttackAnimation:num":"1","EmergeText:eval":"false","OffsetX:num":"0","OffsetY:num":"0","SmoothImage:eval":"true","SelectWindow":"","FrontViewSelect:eval":"false","SideviewSelect:eval":"true","NameFontSize:num":"22","SvBattlers":"","AllowCollapse:eval":"false","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionIdle:str":"walk","Shadow:eval":"true","Width:num":"64","Height:num":"64","WtypeId:num":"0"}
 *
 * @param HpGauge:struct
 * @text HP Gauge Settings
 * @type struct<HpGauge>
 * @desc Settings that adjust the visual HP Gauge displayed in battle.
 * @default {"Display":"","ShowActorGauge:eval":"false","ShowEnemyGauge:eval":"true","RequiresDefeat:eval":"false","BTestBypass:eval":"true","Settings":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"-3","Options":"","AddHpGaugeOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show HP Gauge"}
 *
 * @param ActionSequence:struct
 * @text Action Sequence Settings
 * @type struct<ActionSequence>
 * @desc Settings that adjust how certain Action Sequences work.
 * @default {"AutoSequences":"","AutoMeleeSolo:eval":"true","AutoMeleeAoE:eval":"true","CastAnimations":"","CastCertain:num":"120","CastPhysical:num":"52","CastMagical:num":"51","CounterReflection":"","CounterPlayback:eval":"true","ReflectAnimation:num":"1","ReflectPlayback:eval":"true","Stepping":"","MeleeDistance:num":"24","StepDistanceX:num":"48","StepDistanceY:num":"0","StepDuration:num":"12"}
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
 * Auto Battle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoBattle:
 *
 * @param BattleDisplay
 * @text Battle Display
 *
 * @param AutoBattleMsg:str
 * @text Message
 * @parent BattleDisplay
 * @desc Message that's displayed when Auto Battle is on.
 * Text codes allowed. %1 - OK button, %2 - Cancel button
 * @default Press %1 or %2 to stop Auto Battle
 *
 * @param AutoBattleOK:str
 * @text OK Button
 * @parent BattleDisplay
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param AutoBattleCancel:str
 * @text Cancel Button
 * @parent BattleDisplay
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param AutoBattleBgType:num
 * @text Background Type
 * @parent BattleDisplay
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for Auto Battle window.
 * @default 1
 *
 * @param AutoBattleRect:func
 * @text JS: X, Y, W, H
 * @parent BattleDisplay
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.width;\nconst height = this.calcWindowHeight(1, false);\nconst x = 0;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Auto Battle options to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param StartName:str
 * @text Startup Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Start
 *
 * @param StyleName:str
 * @text Style Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Style
 *
 * @param StyleOFF:str
 * @text OFF
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is OFF.
 * @default Attack
 *
 * @param StyleON:str
 * @text ON
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is ON.
 * @default Skills
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Damage:
 *
 * @param Cap
 * @text Damage Cap
 *
 * @param EnableDamageCap:eval
 * @text Enable Damage Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Put a maximum hard damage cap on how far damage can go?
 * This can be broken through the usage of notetags.
 * @default false
 *
 * @param DefaultHardCap:num
 * @text Default Hard Cap
 * @parent EnableDamageCap:eval
 * @type number
 * @min 1
 * @desc The default hard damage cap used before applying damage.
 * @default 9999
 *
 * @param EnableSoftCap:eval
 * @text Enable Soft Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Soft caps ease in the damage values leading up to the 
 * hard damage cap. Requires hard Damage Cap enabled.
 * @default false
 *
 * @param DefaultSoftCap:num
 * @text Base Soft Cap Rate
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.80
 *
 * @param DefaultSoftScaler:num
 * @text Soft Scale Constant
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.1275
 *
 * @param Popups
 *
 * @param PopupDuration:num
 * @text Popup Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a popup stays visible.
 * @default 128
 *
 * @param NewPopupBottom:eval
 * @text Newest Popups Bottom
 * @parent Popups
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Puts the newest popups at the bottom.
 * @default true
 *
 * @param PopupPosition:str
 * @text Appear Position
 * @parent Popups
 * @type select
 * @option Head - At the top of the battler.
 * @value head
 * @option Center - At the center of the battler.
 * @value center
 * @option Base - At the foot of the battler.
 * @value base
 * @desc Selects where you want popups to appear relative to the battler.
 * @default base
 *
 * @param PopupOffsetX:num
 * @text Offset X
 * @parent Popups
 * @desc Sets how much to offset the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param PopupOffsetY:num
 * @text Offset Y
 * @parent Popups
 * @desc Sets how much to offset the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param PopupShiftX:num
 * @text Shift X
 * @parent Popups
 * @desc Sets how much to shift the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 8
 *
 * @param PopupShiftY:num
 * @text Shift Y
 * @parent Popups
 * @desc Sets how much to shift the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default -28
 *
 * @param hpDamageFmt:str
 * @text HP Damage Format
 * @parent Popups
 * @desc Determines HP damage format for popup.
 * %1 - Value, %2 - HP Text
 * @default -%1
 *
 * @param hpHealingFmt:str
 * @text HP Healing Format
 * @parent Popups
 * @desc Determines HP healing format for popup.
 * %1 - Value, %2 - HP Text
 * @default +%1
 *
 * @param mpDamageFmt:str
 * @text MP Damage Format
 * @parent Popups
 * @desc Determines MP damage format for popup.
 * %1 - Value, %2 - MP Text
 * @default -%1 %2
 *
 * @param mpHealingFmt:str
 * @text MP Healing Format
 * @parent Popups
 * @desc Determines MP healing format for popup.
 * %1 - Value, %2 - MP Text
 * @default +%1 %2
 *
 * @param CriticalColor:eval
 * @text Critical Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 *
 * @param CriticalDuration:num
 * @text Critical Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a the flash lasts.
 * @default 128
 *
 * @param Formulas
 *
 * @param OverallFormulaJS:func
 * @text JS: Overall Formula
 * @parent Formulas
 * @type note
 * @desc The overall formula used when calculating damage.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst critical = arguments[1];\nconst item = this.item();\n\n// Get Base Damage\nconst baseValue = this.evalDamageFormula(target);\n\n// Calculate Element Modifiers\nlet value = baseValue * this.calcElementRate(target);\n\n// Calculate Physical and Magical Modifiers\nif (this.isPhysical()) {\n    value *= target.pdr;\n}\nif (this.isMagical()) {\n    value *= target.mdr;\n}\n\n// Apply Healing Modifiers\nif (baseValue < 0) {\n    value *= target.rec;\n}\n\n// Apply Critical Modifiers\nif (critical) {\n    value = this.applyCritical(value);\n}\n\n// Apply Variance and Guard Modifiers\nvalue = this.applyVariance(value, item.damage.variance);\nvalue = this.applyGuard(value, target);\n\n// Finalize Damage\nvalue = Math.round(value);\nreturn value;"
 *
 * @param VarianceFormulaJS:func
 * @text JS: Variance Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage variance.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst variance = arguments[1];\n\n// Calculate Variance\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\n\n// Return Damage\nreturn damage >= 0 ? damage + v : damage - v;"
 *
 * @param GuardFormulaJS:func
 * @text JS: Guard Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage is guarded.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst target = arguments[1];\n\n// Return Damage Early\nconst note = this.item().note;\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\nif (!target.isGuard()) return damage;\nif (damage < 0) return damage;\n\n// Declare Guard Rate\nlet guardRate = 0.5;\nguardRate /= target.grd;\n\n// Return Damage\nreturn damage * guardRate;"
 *
 * @param Critical
 * @text Critical Hits
 *
 * @param CriticalHitRateJS:func
 * @text JS: Rate Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Rates.
 * @default "// Declare Constants\nconst user = this.subject();\nconst target = arguments[0];\n\n// Create Base Critical Rate\nlet rate = this.subject().cri * (1 - target.cev);\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<ALWAYS CRITICAL>/i)) {\n    return 1;\n}\nif (note.match(/<SET CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    return Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    rate *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    rate += Number(RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL RATE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL RATE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Apply LUK Buffs/Debuffs\nconst lukStack = this.subject().buff(7);\nrate *= 2 ** lukStack;\n\n// Return Rate\nreturn rate;"
 *
 * @param CriticalHitMultiplier:func
 * @text JS: Damage Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Damage modification.
 * @default "// Declare Constants\nconst user = this.subject();\nlet damage = arguments[0];\nlet multiplier = 2.0;\nlet bonusDamage = this.subject().luk * this.subject().cri;\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\d+)([%％])>/i)) {\n    multiplier = Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    multiplier += Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\d+)([%％])>/i)) {\n    bonusDamage *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL DAMAGE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL DAMAGE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Return Damage\nreturn damage * multiplier + bonusDamage;"
 *
 * @param DamageStyles
 * @text Damage Styles
 *
 * @param DefaultDamageStyle:str
 * @text Default Style
 * @parent DamageStyles
 * @desc Which Damage Style do you want to set as default?
 * Use 'Manual' to not use any styles at all.
 * @default Standard
 *
 * @param DamageStyleList:arraystruct
 * @text Style List
 * @parent DamageStyles
 * @type struct<DamageStyle>[]
 * @desc A list of the damage styles available.
 * These are used to calculate base damage.
 * @default ["{\"Name:str\":\"Standard\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"Armor Scaling\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"CT\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\nvalue = attackStat * 4;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"D4\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nlet stat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n    armor = 0;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n    armor = 0;\\\\n}\\\\n\\\\n// Calculate Damage \\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"DQ\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\n}\\\\n\\\\n// Get Primary Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Check for Recovery\\\\nif (this.isRecover()) {\\\\n    let value = stat * multiplier * sign;\\\\n    return isNaN(value) ? 0 : value;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = 0;\\\\nif (stat < ((2 + armor) / 2)) {\\\\n    // Plink Damage\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\n    value = baseline / 3;\\\\n} else {\\\\n    // Normal Damage\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\n    value = baseline / 2;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF7\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare base Damage\\\\nlet baseDamage = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = 6 * (a.mat + level);\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.def + level);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.mdf + level);\\\\n}\\\\n\\\\n// Calculate Final Damage\\\\nlet value = baseDamage;\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isRecover()) {\\\\n    value += 22 * power;\\\\n} else {\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF8\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Damage\\\\nlet Value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\n    value *= power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.mat + power;\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\n    value *= power / 256;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = (power + a.def) * power / 2;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = (power + a.mdf) * power / 2;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF9\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Declare Main Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Declare Base Damage\\\\nlet baseDamage = power;\\\\nif (this.isPhysical()) {\\\\n    baseDamage += stat;\\\\n}\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    baseDamage -= armor;\\\\n    baseDamage = Math.max(1, baseDamage);\\\\n}\\\\n\\\\n// Declare Bonus Damage\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\n\\\\n// Declare Final Damage\\\\nlet value = baseDamage * bonusDamage * sign;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF10\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Create Damage Offense Value\\\\nlet value = power;\\\\n\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = power * ((a.def + power) / 2);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = power * ((a.mdf + power) / 2);\\\\n}\\\\n\\\\n// Apply Damage Defense Value\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\n    armor = Math.max(armor, 1);\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\n} else if (this.isRecover()) {\\\\n    value *= -1;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MK\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nconst denominator = Math.max(200 + armor, 1);\\\\n\\\\n// Calculate Damage \\\\nlet value = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.atk / denominator;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.mat / denominator;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = 200 * a.def / 200;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = 200 * a.mdf / 200;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MOBA\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Value\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\n\\\\n// Apply Attacker's Offense Parameter\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value *= a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value *= a.mdf;\\\\n}\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"PKMN\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}"]
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Formula Style
 * ----------------------------------------------------------------------------
 */
/*~struct~DamageStyle:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Damage Style.
 * Used for notetags and such.
 * @default Untitled
 *
 * @param Formula:func
 * @text JS: Formula
 * @parent Name:str
 * @type note
 * @desc The base formula for this Damage Style.
 * @default "// Define Constants\nconst item = this.item();\nconst a = this.subject();\nconst b = target;\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\n\n// Create Damage Value\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\n\n// Return Value\nreturn isNaN(value) ? 0 : value;"
 *
 * @param ItemsEquipsCore
 * @text Items & Equips Core
 *
 * @param DamageType
 * @text Damage Label
 * @parent ItemsEquipsCore
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageDisplay:func
 * @text JS: Damage Display
 * @parent ItemsEquipsCore
 * @type note
 * @desc Code used the data displayed for this category.
 * @default "// Define Constants\nconst item = this._item;\nconst formula = item.damage.formula;\nconst a = this._tempActorA;\nconst b = this._tempActorB;\nconst user = a;\nconst target = b;\n\n// Return Value\ntry {\n    const value = Math.max(eval(formula), 0);\n    return '%1%'.format(Math.round(value * 100));\n} catch (e) {\n    if ($gameTemp.isPlaytest()) {\n        console.log('Damage Formula Error for %1'.format(this._item.name));\n    }\n    return '?????';\n}"
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param BaseTroop
 * @text Base Troop
 *
 * @param BaseTroopIDs:arraynum
 * @text Base Troop ID's
 * @parent BaseTroop
 * @type troop[]
 * @desc Select the Troop ID(s) to duplicate page events from for all other troops.
 * @default ["1"]
 *
 * @param CommonEvents
 * @text Common Events (on Map)
 *
 * @param BattleStartEvent:num
 * @text Pre-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Common Event to run before each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param BattleEndEvent:num
 * @text Post-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run after each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param VictoryEvent:num
 * @text Victory Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon victory on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param DefeatEvent:num
 * @text Defeat Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon defeat on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeSuccessEvent:num
 * @text Escape Success Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape success on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeFailEvent:num
 * @text Escape Fail Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape failure on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param Escape
 *
 * @param CalcEscapeRatioJS:func
 * @text JS: Calc Escape Ratio
 * @parent Escape
 * @type note
 * @desc Code used to calculate the escape success ratio.
 * @default "// Calculate Escape Ratio\nlet ratio = 0.5;\nratio *= $gameParty.agility();\nratio /= $gameTroop.agility();\n\n// Return Ratio\nreturn ratio;"
 *
 * @param CalcEscapeRaiseJS:func
 * @text JS: Calc Escape Raise
 * @parent Escape
 * @type note
 * @desc Code used to calculate how much the escape success ratio raises upon each failure.
 * @default "// Calculate Escape Ratio\nlet value = 0.1;\nvalue += $gameParty.aliveMembers().length;\n\n// Return Value\nreturn value;"
 *
 * @param Switches
 *
 * @param SwitchCritical:num
 * @text Switch: Critical
 * @parent Switches
 * @type switch
 * @desc Turns switch ON if the action performs a critical hit.
 * Switch reverts to OFF whenever an action starts.
 * @default 0
 *
 * @param SwitchMissEvade:num
 * @text Switch: Miss/Evade
 * @parent Switches
 * @type switch
 * @desc Turns switch ON if the action misses/is evaded.
 * Switch reverts to OFF whenever an action starts.
 * @default 0
 *
 * @param Variables
 *
 * @param VariableDmg:num
 * @text Variable: Damage
 * @parent Variables
 * @type variable
 * @desc Variable records target damage during action.
 * Variable reverts to 0 whenever an action starts.
 * @default 0
 *
 * @param VariableHeal:num
 * @text Variable: Healing
 * @parent Variables
 * @type variable
 * @desc Variable records target healing during action.
 * Variable reverts to 0 whenever an action starts.
 * @default 0
 *
 * @param BattleJS
 * @text JS: Battle-Related
 * 
 * @param PreStartBattleJS:func
 * @text JS: Pre-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartBattleJS:func
 * @text JS: Post-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleVictoryJS:func
 * @text JS: Battle Victory
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processVictory()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeSuccessJS:func
 * @text JS: Escape Success
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeSuccess()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeFailureJS:func
 * @text JS: Escape Failure
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeFailure()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleDefeatJS:func
 * @text JS: Battle Defeat
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processDefeat()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param PreEndBattleJS:func
 * @text JS: Pre-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndBattleJS:func
 * @text JS: Post-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param TurnJS
 * @text JS: Turn-Related
 *
 * @param PreStartTurnJS:func
 * @text JS: Pre-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartTurnJS:func
 * @text JS: Post-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreEndTurnJS:func
 * @text JS: Pre-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndTurnJS:func
 * @text JS: Post-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreRegenerateJS:func
 * @text JS: Pre-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostRegenerateJS:func
 * @text JS: Post-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param ActionJS
 * @text JS: Action-Related
 *
 * @param PreStartActionJS:func
 * @text JS: Pre-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostStartActionJS:func
 * @text JS: Post-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PreApplyJS:func
 * @text JS: Pre-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreDamageJS:func
 * @text JS: Pre-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostDamageJS:func
 * @text JS: Post-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostApplyJS:func
 * @text JS: Post-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreEndActionJS:func
 * @text JS: Pre-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostEndActionJS:func
 * @text JS: Post-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLayout:
 *
 * @param Style:str
 * @text Battle Layout Style
 * @type select
 * @option Default - Shows actor faces in Battle Status.
 * @value default
 * @option List - Lists actors in Battle Status.
 * @value list
 * @option XP - Shows actor battlers in a stretched Battle Status.
 * @value xp
 * @option Portrait - Shows portraits in a stretched Battle Status.
 * @value portrait
 * @option Border - Displays windows around the screen border.
 * @value border
 * @desc The style used for the battle layout.
 * @default default
 *
 * @param ListStyle
 * @text List Style
 * @parent Style:str
 *
 * @param ShowFacesListStyle:eval
 * @text Show Faces
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows faces in List Style?
 * @default true
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent ListStyle
 * @type number
 * @min 1
 * @desc Determine the window width for the Party and Actor Command
 * Windows. Affects Default and List Battle Layout styles.
 * @default 192
 *
 * @param XPStyle
 * @text XP Style
 * @parent Style:str
 *
 * @param XPActorCommandLines:num
 * @text Command Lines
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Number of action lines in the Actor Command Window for the XP Style.
 * @default 4
 *
 * @param XPActorDefaultHeight:num
 * @text Sprite Height
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Default sprite height used when if the sprite's height has not been determined yet.
 * @default 64
 *
 * @param XPSpriteYLocation:str
 * @text Sprite Base Location
 * @parent XPStyle
 * @type select
 * @option Above Name - Sprite is located above the name.
 * @value name
 * @option Bottom - Sprite is located at the bottom of the window.
 * @value bottom
 * @option Centered - Sprite is centered in the window.
 * @value center
 * @option Top - Sprite is located at the top of the window.
 * @value top
 * @desc Determine where the sprite is located on the Battle Status Window.
 * @default name
 *
 * @param PotraitStyle
 * @text Portrait Style
 * @parent Style:str
 *
 * @param ShowPortraits:eval
 * @text Show Portraits?
 * @parent PotraitStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait instead of a face.
 * @default true
 *
 * @param PortraitScale:num
 * @text Portrait Scaling
 * @parent PotraitStyle
 * @desc If portraits are used, scale them by this much.
 * @default 0.5
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Style:str
 *
 * @param SkillItemBorderCols:num
 * @text Columns
 * @parent BorderStyle
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 1
 *
 * @param ShowPortraitsBorderStyle:eval
 * @text Show Portraits?
 * @parent BorderStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait at the edge of the screen.
 * @default true
 *
 * @param PortraitScaleBorderStyle:num
 * @text Portrait Scaling
 * @parent BorderStyle
 * @desc If portraits are used, scale them by this much.
 * @default 1.0
 *
 * @param SkillItemWindows
 * @text Skill & Item Windows
 *
 * @param SkillItemMiddleLayout:eval
 * @text Middle Layout
 * @parent SkillItemWindows
 * @type boolean
 * @on Middle
 * @off Bottom
 * @desc Shows the Skill & Item Windows in mid-screen?
 * @default false
 *
 * @param SkillItemStandardCols:num
 * @text Columns
 * @parent SkillItemWindows
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param General
 *
 * @param BackColor:str
 * @text Back Color
 * @parent General
 * @desc Use #rrggbb for a hex color.
 * @default #000000
 *
 * @param MaxLines:num
 * @text Max Lines
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of lines to be displayed.
 * @default 10
 *
 * @param MessageWait:num
 * @text Message Wait
 * @parent General
 * @type number
 * @min 1
 * @desc Number of frames for a usual message wait.
 * @default 16
 *
 * @param TextAlign:str
 * @text Text Align
 * @parent General
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Window_BattleLog.
 * @default center
 *
 * @param BattleLogRectJS:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions for the battle log.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(10, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StartTurn
 * @text Start Turn
 *
 * @param StartTurnShow:eval
 * @text Show Start Turn?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display turn changes at the start of the turn?
 * @default false
 *
 * @param StartTurnMsg:str
 * @text Start Turn Message
 * @parent StartTurn
 * @desc Message displayed at turn start.
 * %1 - Turn Count
 * @default Turn %1
 *
 * @param StartTurnWait:num
 * @text Start Turn Wait
 * @parent StartTurn
 * @type number
 * @min 1
 * @desc Number of frames to wait after a turn started.
 * @default 40
 *
 * @param DisplayAction
 * @text Display Action
 *
 * @param ActionCenteredName:eval
 * @text Show Centered Action?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display a centered text of the action name?
 * @default true
 *
 * @param ActionSkillMsg1:eval
 * @text Show Skill Message 1?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 1st skill message?
 * @default false
 *
 * @param ActionSkillMsg2:eval
 * @text Show Skill Message 2?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 2nd skill message?
 * @default true
 *
 * @param ActionItemMsg:eval
 * @text Show Item Message?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the item use message?
 * @default false
 *
 * @param ActionChanges
 * @text Action Changes
 *
 * @param ShowCounter:eval
 * @text Show Counter?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display counter text?
 * @default true
 *
 * @param ShowReflect:eval
 * @text Show Reflect?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display magic reflection text?
 * @default true
 *
 * @param ShowSubstitute:eval
 * @text Show Substitute?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display substitute text?
 * @default true
 *
 * @param ActionResults
 * @text Action Results
 *
 * @param ShowFailure:eval
 * @text Show No Effect?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display no effect text?
 * @default false
 *
 * @param ShowCritical:eval
 * @text Show Critical?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display critical text?
 * @default false
 *
 * @param ShowMissEvasion:eval
 * @text Show Miss/Evasion?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display miss/evasion text?
 * @default false
 *
 * @param ShowHpDmg:eval
 * @text Show HP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display HP Damage text?
 * @default false
 *
 * @param ShowMpDmg:eval
 * @text Show MP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display MP Damage text?
 * @default false
 *
 * @param ShowTpDmg:eval
 * @text Show TP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display TP Damage text?
 * @default false
 *
 * @param DisplayStates
 * @text Display States
 *
 * @param ShowAddedState:eval
 * @text Show Added States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added states text?
 * @default false
 *
 * @param ShowRemovedState:eval
 * @text Show Removed States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed states text?
 * @default false
 *
 * @param ShowCurrentState:eval
 * @text Show Current States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the currently affected state text?
 * @default false
 *
 * @param ShowAddedBuff:eval
 * @text Show Added Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added buffs text?
 * @default false
 *
 * @param ShowAddedDebuff:eval
 * @text Show Added Debuffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added debuffs text?
 * @default false
 *
 * @param ShowRemovedBuff:eval
 * @text Show Removed Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed de/buffs text?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Battleback Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battleback:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option MZ (MZ's default style)
 * @value MZ
 * @option 1:1 (No Scaling)
 * @value 1:1
 * @option Scale To Fit (Scale to screen size)
 * @value ScaleToFit
 * @option Scale Down (Scale Downward if Larger than Screen)
 * @value ScaleDown
 * @option Scale Up (Scale Upward if Smaller than Screen)
 * @value ScaleUp
 * @desc The default scaling style used for battlebacks.
 * @default MZ
 *
 * @param jsOneForOne:func
 * @text JS: 1:1
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst scale = 1.0;\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = 0;\nthis.y = 0;"
 *
 * @param jsScaleToFit:func
 * @text JS: Scale To Fit
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = this.width / this.bitmap.width;\nconst ratioY = this.height / this.bitmap.height;\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScaleDown:func
 * @text JS: Scale Down
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScale Up:func
 * @text JS: Scale Up
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 */
/* ----------------------------------------------------------------------------
 * Party Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PartyCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Party Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Party Command Window.
 * @default left
 *
 * @param CmdIconFight:num
 * @text Fight Icon
 * @parent Cmd
 * @desc The icon used for the Fight command.
 * @default 76
 *
 * @param CommandAddAutoBattle:eval
 * @text Add Auto Battle?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Auto Battle" command to the Command Window?
 * @default true
 *
 * @param CmdIconAutoBattle:num
 * @text Auto Battle Icon
 * @parent CommandAddAutoBattle:eval
 * @desc The icon used for the Auto Battle command.
 * @default 78
 *
 * @param CmdTextAutoBattle:str
 * @text Auto Battle Text
 * @parent CommandAddAutoBattle:eval
 * @desc The text used for the Auto Battle command.
 * @default Auto
 *
 * @param CommandAddOptions:eval
 * @text Add Options?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Options" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptions:num
 * @text Options Icon
 * @parent CommandAddOptions:eval
 * @desc The icon used for the Options command.
 * @default 83
 *
 * @param ActiveTpbOptionsMessage:str
 * @text Active TPB Message
 * @parent CommandAddOptions:eval
 * @desc Message that will be displayed when selecting options during the middle of an action.
 * @default Options Menu queued after action is complete.
 *
 * @param CmdIconEscape:num
 * @text Escape Icon
 * @parent Cmd
 * @desc The icon used for the Escape command.
 * @default 82
 *
 * @param Access
 *
 * @param SkipPartyCmd:eval
 * @text Skip Party Command
 * @parent Access
 * @type boolean
 * @on Skip
 * @off Don't
 * @desc DTB: Skip Party Command selection on turn start.
 * TPB: Skip Party Command selection at battle start.
 * @default true
 *
 * @param DisablePartyCmd:eval
 * @text Disable Party Command
 * @parent Access
 * @type boolean
 * @on Disable
 * @off Don't
 * @desc Disable the Party Command Window entirely?
 * @default false
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFight:str
 * @text Fight
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Select actions to fight.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Sets party to Auto Battle mode.
 *
 * @param HelpOptions:str
 * @text Options
 * @parent HelpWindow
 * @desc Text displayed when selecting the Options command.
 * @default Opens up the Options Menu.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActorCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Actor Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Actor Command Window.
 * @default left
 *
 * @param CmdIconItem:num
 * @text Item Icon
 * @parent Cmd
 * @desc The icon used for the Item command.
 * @default 176
 *
 * @param IconStypeNorm:num
 * @text Normal SType Icon
 * @parent Cmd
 * @desc Icon used for normal skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Magic SType Icon
 * @parent Cmd
 * @desc Icon used for magic skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 79
 *
 * @param BattleCmd
 * @text Battle Commands
 *
 * @param BattleCmdList:arraystr
 * @text Command List
 * @parent BattleCmd
 * @type combo[]
 * @option attack
 * @option skills
 * @option guard
 * @option item
 * @option party
 * @option escape
 * @option auto battle
 * @option stypes
 * @option stype: x
 * @option stype: name
 * @option all skills
 * @option skill: x
 * @option skill: name
 * @option combat log
 * @desc List of battle commands that appear by default
 * if the <Battle Commands> notetag isn't present.
 * @default ["attack","skills","guard","party","item"]
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpSkillType:str
 * @text Skill Types
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Opens up a list of skills under the \C[16]%1\C[0] category.
 *
 * @param HelpItem:str
 * @text Items
 * @parent HelpWindow
 * @desc Text displayed when selecting the item command.
 * @default Opens up a list of items that you can use.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Automatically choose an action suitable for combat.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param Flinch
 *
 * @param FlinchDistanceX:num
 * @text Flinch Distance X
 * @parent Flinch
 * @desc The normal X distance when flinching.
 * @default 12
 *
 * @param FlinchDistanceY:num
 * @text Flinch Distance Y
 * @parent Flinch
 * @desc The normal Y distance when flinching.
 * @default 0
 *
 * @param FlinchDuration:num
 * @text Flinch Duration
 * @parent Flinch
 * @desc The number of frames for a flinch to complete.
 * @default 6
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param ChantStyle:eval
 * @text Chant Style
 * @parent SvBattlers
 * @type boolean
 * @on Magical Hit Type
 * @off Magical Skill Type
 * @desc What determines the chant motion?
 * Hit type or skill type?
 * @default true
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent SvBattlers
 * @desc Offsets X position where actor is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent SvBattlers
 * @desc Offsets Y position where actor is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param MotionSpeed:num
 * @text Motion Speed
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc The number of frames in between each motion.
 * @default 12
 *
 * @param PrioritySortActive:eval
 * @text Priority: Active
 * @parent SvBattlers
 * @type boolean
 * @on Active Actor over All Else
 * @off Active Actor is Sorted Normally
 * @desc Place the active actor on top of actor and enemy sprites.
 * @default false
 *
 * @param PrioritySortActors:eval
 * @text Priority: Actors
 * @parent SvBattlers
 * @type boolean
 * @on Actors over Enemies
 * @off Sort by Y Position
 * @desc Prioritize actors over enemies when placing sprites on top
 * of each other.
 * @default true
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent SvBattlers
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default false
 *
 * @param HomePosJS:func
 * @text JS: Home Position
 * @parent SvBattlers
 * @type note
 * @desc Code used to calculate the home position of actors.
 * @default "// Declare Constants\nconst sprite = this;\nconst actor = this._actor;\nconst index = arguments[0];\n\n// Make Calculations\nlet x = Math.round((Graphics.width / 2) + 192)\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\nx += index * 32;\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\ny += index * 48;\n\n// Home Position Offsets\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\+\\-]\\d+),[ ]([\\+\\-]\\d+)>/i;\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\nx = xOffsets.reduce((r, offset) => r + offset, x);\ny = yOffsets.reduce((r, offset) => r + offset, y);\n\n// Set Home Position\nthis.setHome(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Enemy Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Enemy:
 *
 * @param Visual
 *
 * @param AttackAnimation:num
 * @text Attack Animation
 * @parent Visual
 * @type animation
 * @desc Default attack animation used for enemies.
 * Use <Attack Animation: x> for custom animations.
 * @default 1
 *
 * @param EmergeText:eval
 * @text Emerge Text
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the 'Enemy emerges!' text at the start of battle.
 * @default false
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Visual
 * @desc Offsets X position where enemy is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Visual
 * @desc Offsets Y position where enemy is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent Visual
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default true
 *
 * @param SelectWindow
 * @text Select Window
 *
 * @param LastSelected:eval
 * @text Any: Last Selected
 * @parent SelectWindow
 * @type boolean
 * @on Last Selected
 * @off FV/SV Priority
 * @desc Prioritize last selected enemy over front view or sideview settings?
 * @default true
 *
 * @param FrontViewSelect:eval
 * @text FV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using frontview, auto select the enemy furthest right.
 * @default false
 *
 * @param SideviewSelect:eval
 * @text SV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using sideview, auto select the enemy furthest right.
 * @default true
 *
 * @param NameFontSize:num
 * @text Name: Font Size
 * @parent SelectWindow
 * @desc Font size used for enemy names.
 * @default 22
 *
 * @param NameOffsetX:num
 * @text Name: Offset X
 * @parent SelectWindow
 * @desc Offset the enemy name's X position by this much.
 * @default 0
 *
 * @param NameOffsetY:num
 * @text Name: Offset Y
 * @parent SelectWindow
 * @desc Offset the enemy name's Y position by this much.
 * @default 0
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AllowCollapse:eval
 * @text Allow Collapse
 * @parent SvBattlers
 * @type boolean
 * @on Allow
 * @off Don't
 * @desc Causes defeated enemies with SV Battler graphics
 * to "fade away" when defeated?
 * @default false
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param MotionIdle:str
 * @text Motion: Idle
 * @parent SvBattlers
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Sets default idle animation used by Sideview Battlers.
 * @default walk
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param Width:num
 * @text Size: Width
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default width for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param Height:num
 * @text Size: Height
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default height for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param WtypeId:num
 * @text Weapon Type
 * @parent SvBattlers
 * @type number
 * @min 0
 * @desc Sets default weapon type used by Sideview Battlers.
 * Use 0 for Bare Hands.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * HP Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HpGauge:
 *
 * @param Display
 * @text Show Gauges For
 *
 * @param ShowActorGauge:eval
 * @text Actors
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowEnemyGauge:eval
 * @text Enemies
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the enemy sprites' heads?
 * Can be bypassed with <Hide HP Gauge> notetag.
 * @default true
 *
 * @param RequiresDefeat:eval
 * @text Requires Defeat?
 * @parent ShowEnemyGauge:eval
 * @type boolean
 * @on Require Defeat First
 * @off No Requirement
 * @desc Requires defeating the enemy once to show HP Gauge?
 * Can be bypassed with <Show HP Gauge> notetag.
 * @default true
 *
 * @param BTestBypass:eval
 * @text Battle Test Bypass?
 * @parent RequiresDefeat:eval
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass the defeat requirement in battle test?
 * @default true
 *
 * @param Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Settings
 * @desc How large/small do you want the HP Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's Y by?
 * @default -3
 *
 * @param Options
 * @text Options
 *
 * @param AddHpGaugeOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show HP Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show HP Gauge
 *
 */
/* ----------------------------------------------------------------------------
 * Action Sequence Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionSequence:
 *
 * @param AutoSequences
 * @text Automatic Sequences
 *
 * @param AutoMeleeSolo:eval
 * @text Melee Single Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, single target actions?
 * @default true
 *
 * @param AutoMeleeAoE:eval
 * @text Melee Multi Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, multi-target actions?
 * @default true
 *
 * @param QoL
 * @text Quality of Life
 *
 * @param AutoNotetag:eval
 * @text Auto Notetag
 * @parent QoL
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically apply the <Custom Action Sequence> notetag
 * effect to any item or skill that has a Common Event?
 * @default false
 *
 * @param CastAnimations
 * @text Cast Animations
 *
 * @param CastCertain:num
 * @text Certain Hit
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Certain Hit skills.
 * @default 120
 *
 * @param CastPhysical:num
 * @text Physical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Physical skills.
 * @default 52
 *
 * @param CastMagical:num
 * @text Magical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Magical skills.
 * @default 51
 *
 * @param CounterReflection
 * @text Counter/Reflect
 *
 * @param CounterPlayback:eval
 * @text Counter Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param ReflectAnimation:num
 * @text Reflect Animation
 * @parent CounterReflection
 * @type animation
 * @desc Animation played when an action is reflected.
 * @default 1
 *
 * @param ReflectPlayback:eval
 * @text Reflect Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param Stepping
 *
 * @param MeleeDistance:num
 * @text Melee Distance
 * @parent Stepping
 * @desc Minimum distance in pixels for Movement Action Sequences.
 * @default 24
 *
 * @param StepDistanceX:num
 * @text Step Distance X
 * @parent Stepping
 * @desc The normal X distance when stepping forward.
 * @default 48
 *
 * @param StepDistanceY:num
 * @text Step Distance Y
 * @parent Stepping
 * @desc The normal Y distance when stepping forward.
 * @default 0
 *
 * @param StepDuration:num
 * @text Step Duration
 * @parent Stepping
 * @desc The number of frames for a stepping action to complete.
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Start Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileStart:
 * 
 * @param Type:str
 * @text Type
 * @type select
 * @option Target - Start from battler target(s)
 * @value target
 * @option Point - Start from a point on the screen
 * @value point
 * @desc Select where the projectile should start from.
 * @default target
 * 
 * @param Targets:arraystr
 * @text Target(s)
 * @parent Type:str
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to start the projectile from.
 * @default ["user"]
 * 
 * @param TargetCenter:eval
 * @text Centralize
 * @parent Targets:arraystr
 * @type boolean
 * @on Center Projectile
 * @off Create Each
 * @desc Create one projectile at the center of the targets?
 * Or create a projectile for each target?
 * @default false
 * 
 * @param PointX:eval
 * @text Point X
 * @parent Type:str
 * @desc Insert the X coordinate to start the projectile at.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @param PointY:eval
 * @text Point Y
 * @parent Type:str
 * @desc Insert the Y coordinate to start the projectile at.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @param OffsetX:eval
 * @text Offset X
 * @desc Insert how many pixels to offset the X coordinate by.
 * You may use JavaScript code.
 * @default +0
 * 
 * @param OffsetY:eval
 * @text Offset Y
 * @desc Insert how many pixels to offset the Y coordinate by.
 * You may use JavaScript code.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Goal Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileGoal:
 * 
 * @param Type:str
 * @text Type
 * @type select
 * @option Target - Goal is battler target(s)
 * @value target
 * @option Point - Goal is a point on the screen
 * @value point
 * @desc Select where the projectile should go to.
 * @default target
 * 
 * @param Targets:arraystr
 * @text Target(s)
 * @parent Type:str
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for projectile to go to.
 * @default ["all targets"]
 * 
 * @param TargetCenter:eval
 * @text Centralize
 * @parent Targets:arraystr
 * @type boolean
 * @on Center Projectile
 * @off Create Each
 * @desc Set goal in the center of targets?
 * Or create a projectile to go to each target?
 * @default false
 * 
 * @param PointX:eval
 * @text Point X
 * @parent Type:str
 * @desc Insert the X coordinate to send the projectile to.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @param PointY:eval
 * @text Point Y
 * @parent Type:str
 * @desc Insert the Y coordinate to send the projectile to.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @param OffsetX:eval
 * @text Offset X
 * @desc Insert how many pixels to offset the X coordinate by.
 * You may use JavaScript code.
 * @default +0
 * 
 * @param OffsetY:eval
 * @text Offset Y
 * @desc Insert how many pixels to offset the Y coordinate by.
 * You may use JavaScript code.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Extra Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileExAni:
 * 
 * @param AutoAngle:eval
 * @text Auto Angle?
 * @parent Settings
 * @type boolean
 * @on Automatically Angle
 * @off Normal
 * @desc Automatically angle the projectile to tilt the direction it's moving?
 * @default true
 * 
 * @param AngleOffset:eval
 * @text Angle Offset
 * @desc Alter the projectile's tilt by this many degrees.
 * @default +0
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Settings
 * @desc This is the height of the project's trajectory arc
 * in pixels.
 * @default 0
 *
 * @param EasingType:str
 * @text Easing
 * @parent Settings
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type to apply to the projectile's trajectory.
 * @default Linear
 * 
 * @param Spin:eval
 * @text Spin Speed
 * @parent Settings
 * @desc Determine how much angle the projectile spins per frame.
 * Does not work well with "Auto Angle".
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Extra Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileExtra:
 * 
 * @param AutoAngle:eval
 * @text Auto Angle?
 * @parent Settings
 * @type boolean
 * @on Automatically Angle
 * @off Normal
 * @desc Automatically angle the projectile to tilt the direction it's moving?
 * @default true
 * 
 * @param AngleOffset:eval
 * @text Angle Offset
 * @desc Alter the projectile's tilt by this many degrees.
 * @default +0
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Settings
 * @desc This is the height of the project's trajectory arc
 * in pixels.
 * @default 0
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the projectile?
 * @default 0
 *
 * @param EasingType:str
 * @text Easing
 * @parent Settings
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type to apply to the projectile's trajectory.
 * @default Linear
 * 
 * @param Hue:eval
 * @text Hue
 * @parent Settings
 * @desc Adjust the hue of the projectile.
 * Insert a number between 0 and 360.
 * @default 0
 * 
 * @param Scale:eval
 * @text Scale
 * @parent Settings
 * @desc Adjust the size scaling of the projectile.
 * Use decimals for exact control.
 * @default 1.0
 * 
 * @param Spin:eval
 * @text Spin Speed
 * @parent Settings
 * @desc Determine how much angle the projectile spins per frame.
 * Does not work well with "Auto Angle".
 * @default +0.0
 *
 */
//=============================================================================

const _0x246e=['clearActiveWeaponSlot','_battler','_canLose','updateFrame','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','hasSvBattler','concat','onEnemyCancel','createShadowSprite','skewDuration','_targetOpacity','applyData','battlerSmoothImage','WaitForScale','BattleManager_onEncounter','updateBattleProcess','_dimmerSprite','ActSeq_ChangeAngle','ActSeq_Element_ForceElements','surprise','_battlerName','alive\x20opponents','ActionEnd','undecided','ActSeq_Movement_WaitForJump','initBattleCore','updateBattlebackBitmap','XPActorDefaultHeight','useItem','_enemyNameContainer','StartTurnShow','updateMain','setValue','getSkillIdWithName','adjustWeaponSpriteOffset','\x5cI[%1]%2','ActionSkillMsg2','EscapeFailureJS','battleSys','autoBattleWindowRect','setImmortal','Window_Options_statusText','displayType','isItemCommandEnabled','XPSpriteYLocation','match','battleCommandIcon','isAnyoneFloating','ActSeq_Target_RandTarget','addSkillTypeCommand','battleDisplayText','svAnchorX','PreRegenerateJS','_regionBattleback1','Window_BattleLog_displayCritical','getDualWieldTimes','Actions','performAttackSlot','Sprite_Battler_isMoving','Game_Battler_regenerateAll','Scene_Battle_createHelpWindow','SkillItemBorderCols','gaugeX','ScaleY','checkShowHideBattleNotetags','battleCoreResumeLaunchBattle','ext','createBattleUIOffsetY','_inputting','Window_BattleLog_displayCurrentState','terminate','refreshCursor','#ffffff','BattleManager_startTurn','startSkew','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20targets\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20targets\x20||\x20[];\x0a\x20\x20\x20\x20','startTpbTurn','addActor','onEscapeSuccess','Wave','dead\x20opponents','ActSeq_Mechanics_DeathBreak','canMove','createEnemyNameContainer','partyCommandWindowRectDefaultStyle','updateShadowBattleCore','isDebuffAffected','Scene_Options_maxCommands','_borderPortraitTargetX','Sprite_Battler_setHome','VisuMZ_3_ActSeqCamera','gradientFillRect','isQueueOptionsMenu','setupBattleCoreData','isEnemy','duration','blockWidth','-%1','_itemWindow','BattleManager_onEscapeFailure','messageSpeed','isNextScene','waitForFloat','StyleON','_flashDuration','ShowTpDmg','motionType','_battleCoreForcedElements','startSpin','Scene_Battle_partyCommandWindowRect','updatePositionBattleCore','Sprite_Enemy_setBattler','EscapeFail','skillItemWindowRectBorderStyle','alive\x20battlers\x20not\x20user','clearBattlerMotionTrailData','_skewX','Window_BattleLog_performCollapse','createDigits','MotionFrameWait','displayTpDamage','ActSeq_Movement_WaitForScale','startWeaponAnimation','SKILLS','%1StartActionJS','updateBattlebackBitmap2','exit','getBattlePortraitFilename','DefaultStyle','createWeather','ParseActorNotetags','HelpEscape','cameraDuration','adjustPosition_ScaleToFit','Spriteset_Battle_createLowerLayer','_damageContainer','_currentActor','isForFriend','logWindowRect','TimeScale','command301','getBattlePortrait','_cursorSprite','updateShadow','_targetAngle','-%1\x20MP','refreshActorPortrait','UNTITLED','isPlaytest','_forcedBattleLayout','validTargets','Window_BattleLog_performReflection','commandNameWindowDrawBackground','split','JS\x20%1START\x20BATTLE','startDamagePopup','createCommandNameWindow','Game_BattlerBase_initMembers','SkewY','PreStartBattleJS','isAtbCastingState','current\x20target','Window_BattleLog_popupDamage','AsTarget','swing','ReflectAnimation','VisuMZ_3_ActSeqImpact','Formula','setCursorRect','onRegeneratePlayStateAnimation','Spriteset_Battle_updateActors','Exploited','setText','min','Height','BattleEndEvent','displayReflectionPlayBack','battleFloat','removeAnimationFromContainer','targetObjects','ActSeq_Mechanics_StbRemoveExcessActions','getDefeatedEnemies','createActionSequenceProjectile','PreApplyJS','ARRAYFUNC','ActSeq_Motion_MotionType','_stateIconSprite','refresh','ActSeq_BattleLog_WaitForBattleLog','_angleWholeDuration','PARTY','clear','Sprite_Battler_damageOffsetX','NewPopupBottom','displayItemMessage','actorCommandEscape','_requestRefresh','STYPES','arRedFlat','createActorCommandWindowBattleCore','format','Scene_Battle_startPartyCommandSelection','AlphaFilter','WaitForSpin','HomePosJS','ActSeq_Camera_Offset','createAnimationContainer','ArPenFlat','ShowPortraitsBorderStyle','prepareCustomActionSequence','Game_Interpreter_updateWaitMode','createLowerLayer','victory','iconWidth','<CENTER>%1','substitute','_distortionSprite','Window_BattleLog_displayMiss','battleProjectiles','rowSpacing','removedStateObjects','stop','ConfigManager_makeData','isPhysical','State-%1-%2','selectPreviousCommand','auto','%1EndBattleJS','resetFontSettings','performJump','onTurnEnd','VisuMZ_2_HorrorEffects','setupBattleback','contentsOpacity','createDamageContainer','ApplyImmortal','isNextSceneBattleTransitionable','Intensity','createBattleUIOffsetX','CombatLogIcon','ARRAYEVAL','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20','isDisplayEmergedEnemies','Scene_Battle_updateBattleProcess','onDisabledPartyCommandSelection','VisuMZ_2_BattleSystemSTB','isForOne','itemWindowRect','subject','createBattleFieldBattleCore','Game_Action_itemEffectAddAttackState','AllowCollapse','ActSeq_Weapon_NextActiveWeapon','applyAngleChange','startEnemySelection','updateStateSprite','onEncounterBattleCore','trueRandomTarget','checkAutoCustomActionSequenceNotetagEffect','parent','Actor','Scene_Battle_logWindowRect','_actions','isPreviousSceneBattleTransitionable','WaitForNewLine','registerCommand','Debuffs','displayCritical','requestMotion','visible','setFrame','displayEvasion','Scene_Map_initialize','process_VisuMZ_BattleCore_DamageStyles','anchor','PostDamageJS','remove','createInnerPortrait','Game_Action_applyGlobal','makeData','setActiveWeaponSet','shouldPopupDamage','ActSeq_Mechanics_ActionEffect','GuardFormulaJS','Game_Action_makeTargets','PartyCmd','_forcing','okButtonText','regenerateAll','ParseArmorNotetags','isFightCommandEnabled','description','ActSeq_Mechanics_StbExtraAction','addCustomCommands','updateEffectContainers','atbInterrupt','Game_Map_battleback2Name','_cursorArea','_effectType','displaySubstitute','Game_Interpreter_terminate','createJS','%1StartTurnJS','some','PreDamage%1JS','COMBATLOG','ShowFailure','Scene_ItemBase_applyItem','CheckMapBattleEventValid','evade','createCommandVisibleJS','speed','chantStyle','RepositionEnemies','drawSkillCost','VisuMZ_3_ActSeqProjectiles','placeBasicGauges','revertTpbCachedActor','_floatWholeDuration','show','bitmapHeight','softDamageCapRate','call','ForceDeath','MIN_SAFE_INTEGER','MAXMP','length','Game_Action_isForFriend','ActSeq_Projectile_Picture','initialize','ActSeq_Horror_NoiseRemove','setupShockwaveImpactFilter','_action','textSizeEx','ITEM','_skillWindow','updatePosition','PostStartBattleJS','filters','isAlive','mhp','skill','isShownOnBattlePortrait','isTickBased','VisuMZ_0_CoreEngine','_isBattlerFlipped','drawActorFace','onSelectAction','VariableHeal','drawItemImageListStyle','battleback2Name','Game_Party_addActor','JS\x20%1START\x20TURN','join','_waitCount','ShowEnemyGauge','HpGauge','Skill-%1-%2','updateBorderStyle','RegExp','equips','gainMp','WaitCount1','_executedValue','animationBaseDelay','5MMUFOL','ActSeq_Horror_TVRemove','Immortal','showPortraits','Window_BattleLog_performRecovery','attackSkillId','extraPositionY','SkillItemMiddleLayout','commandStyle','_growWholeDuration','drawItemStatusListStyle','focus','ActionSkillMsg1','createAnimationSprite','_active','ActSeq_Projectile_Animation','PreEndActionJS','floatBattler','DualWield','inputtingAction','members','displayMiss','isItem','CmdIconEscape','allBattleMembers','MOTIONS','DefaultSoftScaler','isSkipPartyCommandWindow','swapEnemyIDs','createCancelButton','ParseWeaponNotetags','StartTurnMsg','Radius','compareBattlerSprites','canEscape','singleSkill','applySoftDamageCap','glitch','onEncounter','2611lWhKAu','ShowSubstitute','startAttackWeaponAnimation','%1EndActionJS','item','Sprite_Enemy_loadBitmap','DisplayAction','addDebuff','pattern','wait','origin','ActSeq_Animation_AttackAnimation2','performMoveToPoint','callOkHandler','applyFreezeMotionFrames','ActSeq_Impact_ShockwavePoint','isActing','ActSeq_BattleLog_AddText','hpDamage','front\x20center','_defeatedEnemies','ActorCmd','MaxLines','Scene_Battle_onActorCancel','WaitForCamera','LUK','escape','ActSeq_Animation_CastAnimation','%1StartBattleJS','itemEffectAddAttackState','Turns','_skewDuration','helpAreaHeight','_growY','custom','BattleManager_startInput','CheckSkillCommandShowSwitches','battleGrow','alive\x20friends\x20not\x20user','HitRate','addGuardCommand','36188HRJDeE','requestDragonbonesAnimation','makeActionListAutoAttack','startMotion','removeStatesAuto','getStypeIdWithName','WaitForZoom','_spriteset','performCastAnimation','cancelTargetSelectionVisibility','moveToStartPosition','animationShouldMirror','autoSelectLastSelected','ActSeq_Mechanics_FtbAction','isBorderStylePortraitShown','createKeyJS','isMVAnimation','clearResult','traitSet','skillItemWindowRectMiddle','isDuringNonLoopingMotion','Window_PartyCommand_initialize','isOnCurrentMap','gainTp','prepareBorderActor','clearActiveWeaponSet','isPartyCommandWindowDisabled','Window_BattleStatus_initialize','weapons','svBattlerAnchorY','cancelButtonText','ScaleX','refreshBattlerMotions','CreateActionSequenceTargets','commandSymbol','resizeWindowXPStyle','addState','_enemy','MP_Rate','_methods','abnormal','battlerSprites','isOkEnabled','_baseX','effects','_jumpHeight','processAnimationRequests','Battleback','drawBackgroundRect','AdjustRect','isTpb','Game_Interpreter_command283','OffsetX','drawItemStatus','wtypeId','waitCount','center','Window_BattleEnemy_show','createBattleField','addAnimationSpriteToContainer','_targetSkewY','isMagicSkill','_opacityWholeDuration','Scene_Battle_selectNextCommand','IconStypeMagic','redraw','isGuard','ActSeq_Target_NextTarget','actor%1-portrait','setupTextPopup','nextActiveWeaponSlot','canGuardBattleCore','dead\x20battlers','cameraOffsetDuration','canGuard','ActSeq_Mechanics_BreakShieldReset','updateScale','SvMotionIdleMass-%1-%2','Game_Battler_onBattleStart','updateHelp','dimColor2','shadow','startGrow','Scene_Battle_helpWindowRect','isPartyTpbInputtable','isImmortal','requestFauxAnimation','autoMeleeSingleTargetActionSet','getSkillTypes','WaitCount','ActSeq_Horror_Clear','DistanceX','_allTargets','text\x20target','damageRate','Game_Party_removeActor','uiInputPosition','getDamageStyle','deathStateId','ATK','_battleField','Sprite_Actor_setActorHome','ActSeq_ChangeSkew','AutoBattleRect','getItemDamageAmountLabelBattleCore','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','AnchorX','isOptionsCommandAdded','selectNextCommandTpb','skewBattler','StyleName','PerformAction','_baseLineStack','_borderPortraitDuration','PopupDuration','Window_BattleEnemy_initialize','displayAddedStates','hide','commandOptions','HelpAutoBattle','partyCommandWindowRectBorderStyle','VariableDmg','setBattleCameraTargets','splice','_phase','_skillIDs','ActSeq_Mechanics_CustomDmgFormula','code','battleEnd','_hpGaugeSprite','isAnimationShownOnBattlePortrait','bind','mainSprite','Window_BattleLog_performEvasion','stepFlinch','isUndecided','drawItemImagePortraitStyle','executeDamage','PreDamageJS','Weapon-%1-%2','ActionCount','updateShadowVisibility','toUpperCase','isEscapeCommandEnabled','ActSeq_Mechanics_TextPopup','PostStartActionJS','Window_BattleLog_popBaseLine','itemTextAlign','applyItem','_weaponImageId','battleSkew','getColor','Game_BattlerBase_canGuard','drawItemStyleIcon','changeBattlerOpacity','setHelpWindowItem','CriticalDuration','makeTargets','debuffAdd','STR','BattleLayout','setupDamagePopup','getConfigValue','hasSkill','Game_Enemy_setup','ActSeq_Movement_FaceTarget','MotionAni','ActSeq_Motion_WaitMotionFrame','resetResultSwitches','map','setBackgroundType','isGuardWaiting','waitForEffect','makeSpeed','currentAction','ActSeq_Mechanics_RemoveBuffDebuff','weatherPower','battleAngle','Sprite_StateIcon_updateFrame','findTargetSprite','clearMotion','Rate','updateShadowPosition','Sprite_Actor_updateShadow','repositionCancelButtonBorderStyle','Game_BattlerBase_addNewState','_commandNameWindow','ActSeq_Weapon_SetActiveWeapon','_actionBattlers','isJumping','isAnyoneChangingOpacity','actor','Window_BattleLog_performActionStart','ALL\x20SKILLS','arPenFlat','_battleCoreNoElement','_tpbNeedsPartyCommand','initMembersBattleCore','skills','ShowRemovedBuff','CmdTextAlign','transform','statusWindowRectBorderStyle','_currentAngle','missile','updateCollapse','hitRate','CriticalDmgFlat','isRightInputMode','setBattleCameraOffset','performFlinch','applyImmortal','_freezeMotionData','actorCommandSingleSkill','Damage','updatePadding','PostApplyAsTargetJS','preemptive','19724Zkeqku','isFriendly','removeHorrorEffect','Sprite_Enemy_updateBossCollapse','move','ActSeq_Movement_Opacity','smooth','updateHpGaugePosition','Angle','displayAction','parse','PostRegenerateJS','isInputting','Scene_Battle_startActorSelection','HP_Flat','ActSeq_BattleLog_PushBaseLine','CriticalDmgRate','applyBattleCoreJS','_opacityEasing','_preBattleCommonEvent','_statusWindow','VisuMZ_1_MainMenuCore','mainSpriteScaleX','PopupShiftY','_motionSpeed','drawTextEx','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20obj\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[3]\x20||\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20value;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Constants\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20action\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this\x20:\x20user.currentAction();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20attacker\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20defender\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20healer\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20receiver\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20actor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20currentClass\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20weapon\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20armor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20obj;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Create\x20Compatibility\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20origin\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Imported.VisuMZ_1_SkillsStatesCore\x20&&\x20$dataStates.includes(obj))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20origin\x20=\x20target.getStateOrigin(obj.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(value)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20value\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20value\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','getBattlePortraitOffsetX','command283','isSceneChanging','skillId','ActSeq_Skew_Reset','checkShowHideSwitchNotetags','process_VisuMZ_BattleCore_jsFunctions','getNextSubjectFromPool','ActSeq_Movement_Float','CastAnimation','changeCtbChargeTime','BattleLog','ScaleToFit','ActSeq_Camera_FocusPoint','_updateFilterArea','randomInt','DistanceAdjust','BattleDefeatJS','ActSeq_Movement_BattleStep','repeats','pop','evaded','_stypeIDs','flashColor','_createCursorSprite','_battlerHue','alive\x20enemies','recoverAll','jump','Point','_partyCommandWindow','ActionItemMsg','setHome','process_VisuMZ_BattleCore_Notetags','damageContainer','HelpFight','startMove','CriticalHitRate','performSTBExploiter','onFloatEnd','dataId','Game_BattlerBase_canAttack','contents','updateFlip','_activeWeaponSlot','status','applyCritical','_updateCursorFilterArea','slices','addChildToBack','Scene_Battle_selectPreviousCommand','dead','_shadowSprite','TargetLocation','createContents','_enemyID','isAnyoneJumping','Window_ItemList_maxCols','HitFlat','compareEnemySprite','helpAreaBottom','ShowCounter','getInputButtonString','requestAnimation','createPartyCommandWindowBattleCore','attackAnimationIdSlot','isNonSubmenuCancel','boxWidth','Window_BattleStatus_drawItemImage','animation','changeBattlebacks','JS\x20ESCAPE\x20SUCCESS','STRUCT','ActSeq_Motion_ClearFreezeFrame','apply','alive\x20battlers\x20not\x20target','actionSplicePoint','FrontViewSelect','isTriggered','alive\x20actors','BattleManager_makeActionOrders','statusWindowRectDefaultStyle','sliceMax','pushBaseLine','ParseStateNotetags','BTestBypass','softDamageCap','filterArea','angle','extraPositionX','commandAutoBattle','Game_Action_itemEffectAddNormalState','Window_BattleLog_displayEvasion','updateEventMain','WaitForAnimation','Window_BattleLog_displayMpDamage','changeWeather','Shadow','Window_BattleLog_displayTpDamage','MessageWait','Game_Action_isForRandom','equipSlots','addedStateObjects','counterAttack','finishActionSet','opponentsUnit','arPenRate','freezeMotion','startActorSelection','boxHeight','Sprite_Actor_moveToStartPosition','Filename','getMenuImage','ceil','_helpWindow','updateCancel','ActSeq_Animation_ChangeBattlePortrait','showHelpWindow','+%1\x20MP','Sprite_Battler_updateMain','PostDamageAsUserJS','ActSeq_Mechanics_RemoveState','Game_Action_needsSelection','enemyNames','callUpdateHelp','command3011','performReflection','_additionalSprites','svBattlerShadowVisible','VisuMZ_2_DragonbonesUnion','Name','stepBack','create','processEscape','hue','canAddSkillCommand','currentExt','getWtypeIdWithName','popBaseLine','EnableSoftCap','BattleCore','changeAtbCastTime','FlinchDuration','onJumpEnd','Armor-%1-%2','1:1','getBattlePortraitOffsetY','Sprite_Enemy_update','StepDistanceY','_targetFloatHeight','autoBattleStyle','waitForMovement','JS\x20BATTLE\x20DEFEAT','Duration','loadPicture','canAttackBattleCore','PreStartTurnJS','Sprite_Weapon_loadBitmap','tone','PostEndActionJS','ChangeOrderBy','ShowRemovedState','onGrowEnd','turnCount','_dragonbonesSpriteContainer','shift','onActorOk','updateVisibility','_item','Game_Action_itemHit','isBattlerGrounded','isAnyoneMoving','command357','Mirror','battleCommandName','setBattlePortrait','Game_BattlerBase_isStateResist','updateWaitMode','value','includes','opacityStart','result','PreEndTurnJS','onAllActionsEnd','pow','StartTurnWait','destroy','onActorCancel','makeTargetsBattleCore','playCancel','portrait','loadSystem','sortDamageSprites','Elements','missle','width','_createDamageContainer','_duration','DTB','fittingHeight','startTurn','AutoBattleBgType','battleCamera','enemy','RequiresDefeat','command119','mainSpriteScaleY','calcWindowHeight','makeCommandList','Game_BattlerBase_refresh','_shake','_motionCount','_enemyId','_skewEasing','bgType','Scene_Battle_startEnemySelection','_escapeRatio','Window_BattleLog_refresh','ActSeq_Movement_FaceDirection','isWaiting','return\x200','updateMotionCount','EFFECT_COMMON_EVENT','displayCurrentState','Window_BattleLog_performDamage','adjustPosition_1for1','ActSeq_Target_CurrentIndex','iconIndex','ActSeq_BattleLog_UI','DEF','Parse_Notetags_TraitObjects','loadEnemy','WaitCount2','Game_BattlerBase_eraseState','loop','itemRect','canUseItemCommand','applyGlobalCommonEventNotetags','createEnemies','isCustomBattleScope','dying','inHomePosition','isForRandom','drawText','BattleManager_startBattle','faceWidth','ActSeq_Animation_WaitForAnimation','updateCommandNameWindow','_lastPluginCommandInterpreter','ActSeq_Motion_PerformAction','setupBattlebackBattleCore','isSpriteVisible','_flipScaleX','Game_Action_apply','max','IconSet','destroyDamageSprite','isBattlerFlipped','Slot','ActSeq_Movement_Spin','processPostBattleCommonEvents','Window_ActorCommand_setup','children','clamp','battleCoreTpbMainPhase','extraHeight','Sprite_Battler_update','addAutoBattleCommands','_weather','_cancelButton','DamageRate','createPartyCommandWindow','_jumpWholeDuration','QoL','onBattleStartBattleCore','AGI','drawItem','PortraitScale','displayHpDamage','clearWeaponAnimation','isSideView','_skewWholeDuration','isFrameVisible','applyDamageCaps','#%1','MotionType','_skewY','abs','createBorderStylePortraitSprite','setBattleCameraPoint','hpDamageFmt','SkillItemStandardCols','createString','isFastForward','criticalDmgRate','ActSeq_Element_AddElements','_mainSprite','SkewX','Game_Interpreter_PluginCommand','getSimilarSTypes','displayBuffs','_autoBattle','Window_BattleLog_performActionEnd','JS\x20%1DAMAGE\x20%2','addSkillCommands','_padding','battleCorePreBattleCommonEvent','alive\x20enemies\x20not\x20user','checkTpbInputClose','FlashColor','Sprite_Actor_createStateSprite','alive\x20actors\x20not\x20user','forceSelect','cancel','setActorHome','delay','createHelpWindow','PrioritySortActive','clearRect','performActionMotions','_updateClientArea','VarianceFormulaJS','HP_Rate','isFloating','isCharging','criticalDmgFlat','isSkewing','addChildAt','Settings','Destination','isBattleSys','_targetIndex','BattleStartEvent','clearForcedGameTroopSettingsBattleCore','_homeX','%1RegenerateJS','updateBitmap','displayRemovedStates','itemHit','partyCommandWindowRect','collapseType','process_VisuMZ_BattleCore_Failsafes','placeStateIcon','right','text','_growDuration','_enemies','BARE\x20HANDS','addAutoBattleCommand','VisuMZ_1_SkillsStatesCore','Sprite_Enemy_setHue','_actorCommandWindow','ActSeq_Movement_Skew','_offsetX','Scene_Battle_skillWindowRect','StepDuration','addCombatLogCommand','animationId','_interpreter','Scene_Battle_updateStatusWindowPosition','isAppeared','ActSeq_Movement_WaitForOpacity','ActSeq_Mechanics_CtbSpeed','aliveMembers','requestMotionRefresh','Scene_Battle_stop','MDF','BattleManager_cancelActorInput','XPActorCommandLines','_createEffectsContainer','isForAll','icon','ActSeq_Motion_FreezeMotionFrame','CastMagical','commandFight','WaitForEffect','criticalHitFlat','BattleManager_isTpbMainPhase','loadBitmap','ArRedRate','dead\x20enemies','35JBSpot','scope','Scene_Battle_itemWindowRect','PopupPosition','processRandomizedData','Style','isAutoBattle','applyTargetFilters','FocusX','regionId','createAllWindows','makeActionList','JS\x20%1END\x20BATTLE','performAttack','command339','iconHeight','Strength','loadBattleback1','_actorSprites','createHpGaugeSprite','isOptionsCommandEnabled','Mechanics','damage','_battlePortrait','customDamageFormula','maxBattleMembers','setAttack','PreEndBattleJS','_weaponSprite','createActorCommandWindow','finalizeScale','parseForcedGameTroopSettingsBattleCore','AnchorY','scale','_customDamageFormula','makeHpDamageText','_back2Sprite','_endBattle','Sprite_Battler_initMembers','process_VisuMZ_BattleCore_PluginParams','ActSeq_Movement_Scale','refreshStatusWindow','isForRandomBattleCore','EscapeSuccessJS','Targets2','forceAction','isHidden','applyHardDamageCap','Game_Battler_performMiss','Scene_Battle_createActorCommandWindow','alive\x20actors\x20not\x20target','createEffectActionSet','_commonEventQueue','_list','mainSpriteWidth','_target','clearBattleCoreData','prototype','setupWeaponAnimation','isChanting','isAttack','_flinched','makeBattleCommand','SmoothImage','_surprise','_actorWindow','reduce','process_VisuMZ_BattleCore_Action_Notetags','_enemySprites','AS\x20TARGET','walk','SkillsStatesCore','JS\x20%1START\x20ACTION','partyCommandWindowRectXPStyle','isBattleFlipped','CastCertain','ActSeq_Set_TargetActionSet','setWaitMode','weaponTypes','_tempEquipCheck','isPreviousScene','ActSeq_Element_Clear','notFocusValid','actorCommandCancelTPB','gainBravePoints','Game_Action_isForOpponent','growBattler','ReflectPlayback','startAction','motionSpeed','parameters','ActSeq_Mechanics_VariablePopup','actionEffect','_baseY','evalDamageFormulaBattleCore','sleep','makeActions','setupZoomBlurImpactFilter','displayMpDamage','setupCriticalEffect','options','randomTargets','turn','ActionCenteredName','message4','processDefeat','_targetGrowY','itemEffectAddNormalState','_cache','FlashDuration','isForFriendBattleCore','isActionSelectionValid','finishActorInput','performActionEnd','Sprite_Enemy_updateCollapse','Skills','setVisibleUI','ActSeq_Horror_TVCreate','battleCommands','_jumpMaxHeight','getNextDamagePopup','isSceneBattle','battleUIOffsetY','isActiveTpb','launchBattle','flashDuration','setHandler','damageOffsetY','maxTp','svBattlerAnchorX','frameVisible','VisuMZ_2_BattleSystemCTB','_immortal','_tpbSceneChangeCacheActor','isMeleeSingleTargetAction','JumpToLabel','NameOffsetX','isDying','visualHpGauge','damageStyle','setBattlerMotionTrailData','setBattleZoom','_actor','isAnyoneSpinning','ShowWeapon','playEnemyAttack','_lastEnemy','updateStart','isBreakStunned','unshift','bitmap','removeChild','stepForward','EscapeSuccess','moveBattlerToPoint','processBattleCoreJS','Window_BattleLog_performSubstitute','_createClientArea','Game_Battler_startTpbTurn','Game_Action_evalDamageFormula','Window_SkillList_maxCols','CmdIconOptions','isCommandEnabled','iterateBattler','Targets1','currentValue','getAttackWeaponAnimationId','statusWindowRectXPStyle','NUM','_targetSkewX','_attackAnimationId','initElementStatusCore','_growEasing','isEffecting','changePaintOpacity','StepDistanceX','ActSeq_Movement_FacePoint','windowPadding','Game_Action_executeDamage','isMoving','itemCri','onDatabaseLoaded','26890uJONSc','snapForBackground','mpDamage','ActSeq_Impact_MotionTrailRemove','allowRandomSpeed','CopyCombatLog','getEnemyIdWithName','_colorType','commandName','magicReflection','isAutoBattleCommandEnabled','CriticalHitMultiplier','Game_Battler_performActionStart','useDigitGrouping','MotionIdle','active','performRecovery','frontviewSpriteY','addBattleCoreAutoBattleStyleCommand','isAffectedByBreakShield','note','isTurnBased','isHiddenSkill','padding','PostEndBattleJS','_motion','canBattlerMove','AsUser','battleCameraData','updateSkew','thrust','addLoadListener','random','ActSeq_Weapon_ClearActiveWeapon','front\x20base','alive\x20battlers','fontSize','getAttackMotion','battleOpacity','SvBattlerMass-%1-%2','currentSymbol','SwitchMissEvade','actorCommandAutoBattle','waitForNewLine','updateStateSpriteBattleCore','activate','ActSeq_Mechanics_Multipliers','createTargetsJS','battleJump','ActSeq_Impact_ColorBreak','addCommand','_floatHeight','Amp','Scene_Battle_createAllWindows','setupBattleCore','message1','isForOpponentBattleCore','helpWindowRect','buffAdd','dead\x20friends','commandEscape','endBattle','performCounter','endAnimation','missed','skillTypes','BattleManager_updatePhase','Sprite_Battler_updatePosition','setHelpWindow','isBattleCoreTargetScope','ShowFacesListStyle','_animationCount','forceWeaponAnimation','DefaultDamageStyle','alive\x20enemies\x20not\x20target','isAnyProjectilePresent','Sprite_Actor_initMembers','canAttack','commandNameWindowCenter','CalcEscapeRaiseJS','performEvasion','setupHpGaugeSprite','ScaleDown','Sprite_Actor_updateFrame','name','Scene_Battle_onEnemyCancel','Parse_Notetags_Action','ActSeq_Zoom_WaitForZoom','updateJump','Scene_Battle_start','applyEasing','gainCurrentActionsFTB','svShadow','ActSeq_Horror_NoiseCreate','startJump','_autoBattleWindow','stypeId','faceRect','ConvertParams','_angleEasing','float','PopupShiftX','EnableDamageCap','floor','227159fBOeGm','skew','ActSeq_Movement_MoveBy','refreshRequest','_regionBattleback2','Window_BattleLog_performMagicEvasion','isCustomActionSequence','spell','_damages','updateBattlerContainer','removeActor','push','createStateIconSprite','setMoveEasingType','_flashColor','_damagePopupArray','drawSingleSkillCost','fight','jumpBattler','_text','DamageDisplay','Scene_Battle_createPartyCommandWindow','Sprite_Enemy_initVisibility','Scene_Battle_commandFight','_totalValue','height','lineHeight','magicSkills','ARRAYSTRUCT','repeatTargets','addAttackCommand','_updateCursorArea','ActSeq_Movement_MoveToTarget','_battleCoreAddedElements','commandStyleCheck','_svBattlerSprite','performActionEndMembers','actionBattleCoreJS','log','isStateResist','canUse','drawItemStyleIconText','MANUAL','MotionSpeed','clearDamagePopup','ActSeq_Movement_MoveToPoint','ActiveTpbOptionsMessage','BattleManager_processVictory','battleMove','version','performMiss','clone','applyGlobal','removedBuffs','actorId','BattleManager_selectNextCommand','AddOption','BattleVictoryJS','selectNextCommand','slice','getLastPluginCommandInterpreter','registerDefeatedEnemy','Interrupt','214734pUAegc','_animationSprites','loadSvEnemy','open','ActSeq_Impact_MotionTrailCreate','WaitForOpacity','addSingleSkillCommand','Window_BattleLog_performMiss','_borderPortraitSprite','svBattlerName','weaponImageId','performWeaponAnimation','DisablePartyCmd','makeTargetSprites','addTextToCombatLog','displayCounter','Parse_Notetags_Targets','uiMenuStyle','Actor-%1-%2','_floatEasing','CoreEngine','_callSceneOptions','BattleManager_onEscapeSuccess','isChangingOpacity','ActSeq_Mechanics_AddState','drawIcon','regenerateAllBattleCore','performSubstitute','ConfigManager_applyData','BattleManager_inputtingAction','hardDamageCap','retreat','isSpinning','VisuMZ_1_ElementStatusCore','CriticalHitRateJS','angleDuration','prev\x20target','Width','process_VisuMZ_BattleCore_CreateRegExp','Spriteset_Battle_createBattleField','forceEscapeSprite','ParseClassNotetags','sortEnemies','SvWeaponMass-%1-%2','round','_animationContainer','drawItemImageXPStyle','left','SwitchCritical','svBattlerData','setupIconTextPopup','Game_Map_setupBattleback','performDamage','removeImmortal','_branch','autoBattleStart','clearFreezeMotion','initMembers','CommandVisible','addBattleCoreAutoBattleStartupCommand','_index','Sprite_Enemy_createStateIconSprite','getCommonEventIdWithName','_multipliers','_scene','ActSeq_Mechanics_DamagePopup','CriticalColor','itemLineRect','isTpbMainPhase','ShowHpDmg','isAnimationPlaying','drawItemStatusXPStyle','updateAction','collapse','createEmptyBitmap','Enemy','_targetGrowX','updateWeather','applyVariance','battleMembers','battler','damageOffsetX','GUARD','GroupDigits','drawLineText','updateForceAction','okTargetSelectionVisibility','waitForOpacity','ForceExploiter','top','BattleManager_endAction','battleUIOffsetX','_wtypeIDs','isClicked','_motionType','Game_Battler_clearMotion','blt','createMiss','ParseSkillNotetags','onEnemyOk','autoBattleUseSkills','ShowPortraits','updateRefresh','autoSelectPriority','start','isDamagePopupRequested','_iconIndex','BattleManager_startAction','callNextMethod','_effectsContainer','VisuMZ_4_CombatLog','updateAngleCalculations','getItemDamageAmountTextBattleCore','ForceExploited','_eventId','RevertAngle','alive\x20friends\x20not\x20target','_battlerContainer','update','ResetOffset','needsSelection','removeDamageSprite','SkipPartyCmd','spriteId','addEscapeCommand','list','MP_Flat','HelpSkillType','BattleManager_processDefeat','noise','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','weatherType','setBattlerFlip','BreakShields','LastSelected','ActSeq_Set_SetupAction','createStateSprite','maxLines','_back1Sprite','windowAreaHeight','Scene_Battle_terminate','chant','hasBeenDefeatedBefore','Frame','clearHorrorEffects','alive\x20friends','setupMotionBlurImpactFilter','_createCursorArea','Linear','Sprite_Actor_updateBitmap','pages','Scene_Battle_onActorOk','Targets','%1EndTurnJS','applyForcedGameTroopSettingsBattleCore','Game_Battler_performDamage','index','startPartyCommandSelection','_waitMode','CalcEscapeRatioJS','hpAffected','PreStartActionJS','toLowerCase','user','Shadow2','Sprite_Battler_setBattler','isGrowing','adjustPosition_ScaleDown','_angleDuration','battleSpin','setBattlerBattleCore','isSkillItemWindowsMiddle','ElementStatusCore','Pre','showAnimation','updateFloat','getAttackMotionSlot','isAtbChargingState','Game_Map_battleback1Name','JS\x20ESCAPE\x20FAILURE','setHorrorEffectSettings','needsSelectionBattleCore','Sprite_Battleback_adjustPosition','bossCollapse','_subject','Sprite_Enemy_updateStateSprite','performMagicEvasion','refreshMotion','cancelActorInput','deadMembers','onBattleStart','CommandAddAutoBattle','message2','OverallFormulaJS','Setting','command236','process_VisuMZ_BattleCore_BaseTroops','updateSpin','isDead','moveToStartPositionBattleCore','ResetFocus','adjustPosition_ScaleUp','occasion','ScaleUp','_enemyWindow','addBuff','updateBattlebackBitmap1','ChargeRate','setBattleSkew','_angleRevertOnFinish','AutoBattleCancel','ActSeq_Mechanics_StbExploit','onSkewEnd','innerHeight','isBusy','ARRAYNUM','createChildSprite','_lines','putActiveBattlerOnTop','setBattler','dead\x20actors','setupRgbSplitImpactFilter','attackStates','battleEffect','ActSeq_Projectile_Icon','statusWindowRect','TextColor','ActSeq_Skew_WaitForSkew','isOpponent','iconText','IconStypeNorm','formula','targetActionSet','MAT','allowCollapse','PreApplyAsUserJS','JS\x20BATTLE\x20VICTORY','addDamageSprite','replace','PostDamage%1JS','PopupOffsetY','AutoNotetag','waitForAnimation','traitObjects','battleback1Name','autoBattle','buffRemove','DamageStyleList','Index','getItemDamageAmountTextOriginal','ATTACK','setupActionSet','States','BackColor','startInput','centerFrontViewSprite','playEnemyDamage','addFightCommand','onOpacityEnd','_stateSprite','Direction','updateStyleOpacity','zoomDuration','PreDamageAsTargetJS','processBorderActor','itemHeight','createSeparateDamagePopups','commandNameWindowDrawText','string','clearFreezeMotionForWeapons','optDisplayTp','%1Event','stateMotionIndex','requestRefresh','onMoveEnd','battlelog','setup','performMoveToTargets','autoBattleAtStart','Game_Temp_requestAnimation','setEventCallback','ActionSequence','_enemyIDs','addedDebuffs','moveBattlerDistance','isTeamBased','isVisualHpGaugeDisplayed','addChild','endAction','_speed','performCollapse','preparePartyRefresh','wholeActionSet','WaitForJump','performActionStart','_emptyBitmap','Sprite_Actor_update','guard','getHardDamageCap','_pattern','makeDeepCopy','movement','_tpbState','Game_Actor_equips','Game_BattlerBase_die','processRefresh','PostStartTurnJS','isForOpponent','ActSeq_Mechanics_BreakShieldChange','addImmortal','ActSeq_Animation_ActionAnimation','changeTurnOrderByCTB','Sprite_Actor_setBattler','Window_BattleLog_pushBaseLine','ShowActorGauge','PreApplyAsTargetJS','evalDamageFormula','_animation','Game_Battler_forceAction','animationWait','freezeFrame','createBattleFieldContainer','changeInputWindow','AutoBattle','displayChangedBuffs','alterBreakShield','updateOpacity','SvWeaponSolo-%1-%2','mmp','isAnyoneGrowing','indexOf','displayActionResults','_battleCoreBattleStartEvent','svAnchorY','casting','nameY','setCustomDamageFormula','isMagical','callOptions','invokeMagicReflection','ActSeq_Animation_ShowAnimation','textColor','ActSeq_Mechanics_ArmorPenetration','setBattlerFacePoint','JS\x20%1APPLY\x20%2','addShowHpGaugeCommand','ShowMpDmg','Game_Battler_onTurnEnd','performAction','process_VisuMZ_BattleCore_TraitObject_Notetags','CommandWidth','trim','_appeared','_offsetY','CriticalHitFlat','opacity','autoSelect','Game_Troop_setup','dimColor1','isDTB','addSingleSkillCommands','drain','helpWindowRectBorderStyle','playReflection','Window_Options_addGeneralOptions','isFlipped','_floatDuration','SvMotionIdleSolo-%1-%2','battleStatusWindowAnimationContainer','Game_Interpreter_command301','updateStatusWindowPosition','DamageStyles','Game_System_initialize','default','hpHealingFmt','Spriteset_Battle_update','battleLayoutStyle','checkCacheKey','ShowCritical','updateCustomActionSequence','_logWindow','BattleManager_endBattle','hitFlat','guardSkillId','startBattle','maxCommands','WaitForProjectile','17935hPRsLv','logActionList','setHue','updateBorderSprite','POST-','ActSeq_Mechanics_Immortal','FaceDirection','addOptionsCommand','maxItems','startOpacity','_battleLayoutStyle','arRedRate','Game_Battler_clearDamagePopup','isAnyoneSkewing','Game_Enemy_transform','mainSpriteHeight','attackAnimationId1','_armorPenetration','enemyId','popupDamage','constructor','ActSeq_Mechanics_AddBuffDebuff','updateActors','NameOffsetY','createAutoBattleWindow','displayStartMessages','ActSeq_Movement_WaitForFloat','resizeWindowBorderStyle','Window_BattleLog_update','param','ActSeq_Impact_MotionBlurScreen','ActSeq_Impact_ZoomBlurPoint','Scene_Boot_onDatabaseLoaded','worldTransform','ChantStyle','Scene_Map_launchBattle','initBattlePortrait','command301_PreBattleEvent','loadSvActor','ActSeq_BattleLog_Clear','PrioritySortActors','attackMotions','ActSeq_Angle_WaitForAngle','maxCols','isActor','critical','Window_BattleLog_clear','TP_Flat','Sprite_Battler_damageOffsetY','PopupOffsetX','ActSeq_Motion_RefreshMotion','addNewState','Window_BattleLog_displayFailure','_homeY','placeTimeGauge','isBattleTest','ActSeq_Camera_Reset','_svBattlerData','ParseItemNotetags','close','_windowLayer','AutoMeleeSolo','forceMotion','processVictory','ShowPopup','sort','1hriieF','isSideButtonLayout','JS\x20%1REGENERATE','MAXHP','filter','OffsetY','isBattleRefreshRequested','measureTextWidth','addText','innerWidth','eraseState','isConfused','setLastPluginCommandInterpreter','numTargets','ActSeq_Camera_WaitForCamera','placeGauge','PostEndTurnJS','setBattleAngle','needsActorInputCancel','WaitForSkew','_forcedBattlers','createMainSprite','_jumpDuration','SideviewSelect','AllowRandomSpeed','battleAnimation','Game_Actor_setup','action','Game_Action_clear','createHelpWindowBattleCore','physical','isCertainHit','ArRedFlat','reserveCommonEvent','showEnemyAttackAnimation','attack','WaitForMovement','isAutoBattleCommandAdded','_handlers','emerge','_commonEventIDs','_growX','usePremadeActionSequence','ParseEnemyNotetags','anchorX','_effectDuration','makeEscapeRatio','battleZoom','FaceAway','changeCtbCastTime','removeBuff','type','Game_Actor_makeActionList','friendsUnit','Scene_Battle_startActorCommandSelection','_visualHpGauge_JustDied','VisuMZ_4_BreakShields','Text','setSkill','border','battleSpriteSkew','Window_BattleLog_performAction','adjustFlippedBattlefield','placeActorName','SceneManager_isSceneChanging','Buffs','ESCAPE','createDistortionSprite','_opacityDuration','inBattle','addItemCommand','Scene_Battle_onEnemyOk','WaitForAngle','makeTargetSelectionMoreVisible','setActiveWeaponSlot','die','TP_Rate','drawItemImage','ActionAnimation','ActionStart','createDamageSprite','EasingType','power','adjustPosition','startActorCommandSelection','Sprite_Battler_startMove','motionIdle','_actionInputIndex','getItemDamageAmountLabelOriginal','Window_BattleLog_performCounter'];const _0x246b=function(_0x1b7dd4,_0x312668){_0x1b7dd4=_0x1b7dd4-0xab;let _0x246ef9=_0x246e[_0x1b7dd4];return _0x246ef9;};const _0x3f1f6b=_0x246b;(function(_0x5d919f,_0x203624){const _0xf3448b=_0x246b;while(!![]){try{const _0x574f33=parseInt(_0xf3448b(0x15c))*parseInt(_0xf3448b(0x286))+-parseInt(_0xf3448b(0x1ac))*parseInt(_0xf3448b(0x740))+parseInt(_0xf3448b(0x53c))+parseInt(_0xf3448b(0x6fe))+-parseInt(_0xf3448b(0x57b))+parseInt(_0xf3448b(0x183))*parseInt(_0xf3448b(0x41e))+-parseInt(_0xf3448b(0x4d4));if(_0x574f33===_0x203624)break;else _0x5d919f['push'](_0x5d919f['shift']());}catch(_0x26ac10){_0x5d919f['push'](_0x5d919f['shift']());}}}(_0x246e,0x26667));var label=_0x3f1f6b(0x32d),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3f1f6b(0x744)](function(_0x24dafb){const _0x5c23c6=_0x3f1f6b;return _0x24dafb[_0x5c23c6(0x2ce)]&&_0x24dafb[_0x5c23c6(0x112)][_0x5c23c6(0x354)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x3f1f6b(0x3e9)]||{},VisuMZ[_0x3f1f6b(0x536)]=function(_0x4d7320,_0x5b14aa){const _0x14145b=_0x3f1f6b;for(const _0x5dcfec in _0x5b14aa){if(_0x5dcfec['match'](/(.*):(.*)/i)){const _0x1ad6c1=String(RegExp['$1']),_0x479473=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x521c01,_0x21d802,_0x218eee;switch(_0x479473){case _0x14145b(0x4c6):_0x521c01=_0x5b14aa[_0x5dcfec]!==''?Number(_0x5b14aa[_0x5dcfec]):0x0;break;case _0x14145b(0x652):_0x21d802=_0x5b14aa[_0x5dcfec]!==''?JSON['parse'](_0x5b14aa[_0x5dcfec]):[],_0x521c01=_0x21d802[_0x14145b(0x255)](_0x4bcfff=>Number(_0x4bcfff));break;case'EVAL':_0x521c01=_0x5b14aa[_0x5dcfec]!==''?eval(_0x5b14aa[_0x5dcfec]):null;break;case _0x14145b(0xdf):_0x21d802=_0x5b14aa[_0x5dcfec]!==''?JSON[_0x14145b(0x290)](_0x5b14aa[_0x5dcfec]):[],_0x521c01=_0x21d802[_0x14145b(0x255)](_0x3252f8=>eval(_0x3252f8));break;case'JSON':_0x521c01=_0x5b14aa[_0x5dcfec]!==''?JSON[_0x14145b(0x290)](_0x5b14aa[_0x5dcfec]):'';break;case'ARRAYJSON':_0x21d802=_0x5b14aa[_0x5dcfec]!==''?JSON[_0x14145b(0x290)](_0x5b14aa[_0x5dcfec]):[],_0x521c01=_0x21d802['map'](_0x4ffd4e=>JSON['parse'](_0x4ffd4e));break;case'FUNC':_0x521c01=_0x5b14aa[_0x5dcfec]!==''?new Function(JSON[_0x14145b(0x290)](_0x5b14aa[_0x5dcfec])):new Function(_0x14145b(0x37d));break;case _0x14145b(0x852):_0x21d802=_0x5b14aa[_0x5dcfec]!==''?JSON[_0x14145b(0x290)](_0x5b14aa[_0x5dcfec]):[],_0x521c01=_0x21d802[_0x14145b(0x255)](_0x339e79=>new Function(JSON[_0x14145b(0x290)](_0x339e79)));break;case _0x14145b(0x24b):_0x521c01=_0x5b14aa[_0x5dcfec]!==''?String(_0x5b14aa[_0x5dcfec]):'';break;case'ARRAYSTR':_0x21d802=_0x5b14aa[_0x5dcfec]!==''?JSON[_0x14145b(0x290)](_0x5b14aa[_0x5dcfec]):[],_0x521c01=_0x21d802[_0x14145b(0x255)](_0x217a88=>String(_0x217a88));break;case _0x14145b(0x2e9):_0x218eee=_0x5b14aa[_0x5dcfec]!==''?JSON[_0x14145b(0x290)](_0x5b14aa[_0x5dcfec]):{},_0x4d7320[_0x1ad6c1]={},VisuMZ[_0x14145b(0x536)](_0x4d7320[_0x1ad6c1],_0x218eee);continue;case _0x14145b(0x558):_0x21d802=_0x5b14aa[_0x5dcfec]!==''?JSON['parse'](_0x5b14aa[_0x5dcfec]):[],_0x521c01=_0x21d802[_0x14145b(0x255)](_0x4e94e9=>VisuMZ[_0x14145b(0x536)]({},JSON['parse'](_0x4e94e9)));break;default:continue;}_0x4d7320[_0x1ad6c1]=_0x521c01;}}return _0x4d7320;},(_0x267b71=>{const _0x583f13=_0x3f1f6b,_0x5238b3=_0x267b71[_0x583f13(0x528)];for(const _0x44b8f9 of dependencies){if(!Imported[_0x44b8f9]){alert(_0x583f13(0x5fd)[_0x583f13(0xb7)](_0x5238b3,_0x44b8f9)),SceneManager[_0x583f13(0x818)]();break;}}const _0x99e83=_0x267b71[_0x583f13(0x112)];if(_0x99e83['match'](/\[Version[ ](.*?)\]/i)){const _0x18ab88=Number(RegExp['$1']);_0x18ab88!==VisuMZ[label][_0x583f13(0x56d)]&&(alert(_0x583f13(0x215)[_0x583f13(0xb7)](_0x5238b3,_0x18ab88)),SceneManager[_0x583f13(0x818)]());}if(_0x99e83[_0x583f13(0x7c7)](/\[Tier[ ](\d+)\]/i)){const _0x5dd8c9=Number(RegExp['$1']);_0x5dd8c9<tier?(alert(_0x583f13(0x79e)[_0x583f13(0xb7)](_0x5238b3,_0x5dd8c9,tier)),SceneManager[_0x583f13(0x818)]()):tier=Math['max'](_0x5dd8c9,tier);}VisuMZ[_0x583f13(0x536)](VisuMZ[label][_0x583f13(0x3e9)],_0x267b71[_0x583f13(0x478)]);})(pluginData),VisuMZ[_0x3f1f6b(0x1cd)]=function(_0x27968a){const _0x119302=_0x3f1f6b;let _0x5e1947=[];for(const _0x2d9b99 of _0x27968a){_0x5e1947=_0x5e1947[_0x119302(0x7a0)](VisuMZ['ConvertActionSequenceTarget'](_0x2d9b99));}return _0x5e1947[_0x119302(0x744)](_0x4dad38=>_0x4dad38);},VisuMZ['ConvertActionSequenceTarget']=function(_0x40c597){const _0x46b8d1=_0x3f1f6b,_0x32ff17=BattleManager[_0x46b8d1(0x174)]()[_0x46b8d1(0x744)](_0x3ac516=>_0x3ac516&&_0x3ac516[_0x46b8d1(0x409)]()),_0x174cf7=BattleManager[_0x46b8d1(0x633)],_0x259807=BattleManager['_target'],_0x164662=BattleManager[_0x46b8d1(0x208)]?BattleManager['_allTargets'][_0x46b8d1(0x577)](0x0):_0x32ff17;_0x40c597=_0x40c597['toLowerCase']()[_0x46b8d1(0x6da)]();if(_0x40c597===_0x46b8d1(0x61e))return[_0x174cf7];else{if(_0x40c597===_0x46b8d1(0x83b))return[_0x259807];else{if(_0x40c597===_0x46b8d1(0x59f)){if(_0x259807){const _0x3a01d9=_0x164662[_0x46b8d1(0x6c5)](_0x259807);return _0x3a01d9>=0x0?[_0x164662[_0x3a01d9-0x1]||_0x259807]:[_0x259807];}}else{if(_0x40c597===_0x46b8d1(0x209)){if(_0x259807){const _0x29fcc6=_0x164662[_0x46b8d1(0x6c5)](_0x259807);return _0x29fcc6>=0x0?[_0x164662[_0x29fcc6+0x1]||_0x259807]:[_0x259807];}}else{if(_0x40c597==='all\x20targets')return _0x164662;else{if(_0x40c597===_0x46b8d1(0x167))return[_0x174cf7]['concat'](_0x164662);else{if(_0x40c597==='not\x20focus')return _0x32ff17['filter'](_0x2bff57=>_0x2bff57!==_0x174cf7&&!_0x164662[_0x46b8d1(0x354)](_0x2bff57)&&_0x2bff57[_0x46b8d1(0x470)]());}}}}}}if(_0x174cf7){if(_0x40c597===_0x46b8d1(0x60c))return _0x174cf7['friendsUnit']()[_0x46b8d1(0x40c)]();else{if(_0x40c597===_0x46b8d1(0x1a9))return _0x174cf7[_0x46b8d1(0x775)]()[_0x46b8d1(0x40c)]()[_0x46b8d1(0x744)](_0x9b6117=>_0x9b6117!==_0x174cf7);else{if(_0x40c597===_0x46b8d1(0x5ef))return _0x174cf7['friendsUnit']()['aliveMembers']()['filter'](_0x29b672=>_0x29b672!==_0x259807);else{if(_0x40c597===_0x46b8d1(0x50f))return _0x174cf7[_0x46b8d1(0x775)]()[_0x46b8d1(0x638)]();else{if(_0x40c597[_0x46b8d1(0x7c7)](/FRIEND INDEX (\d+)/i)){const _0x17cbf8=Number(RegExp['$1']);return[_0x174cf7[_0x46b8d1(0x775)]()['members']()[_0x17cbf8]];}}}}}if(_0x40c597===_0x46b8d1(0x7af))return _0x174cf7['opponentsUnit']()['aliveMembers']();else{if(_0x40c597==='alive\x20opponents\x20not\x20target')return _0x174cf7['opponentsUnit']()[_0x46b8d1(0x40c)]()['filter'](_0x4c47ff=>_0x4c47ff!==_0x259807);else{if(_0x40c597===_0x46b8d1(0x7ea))return _0x174cf7[_0x46b8d1(0x30a)]()['deadMembers']();else{if(_0x40c597['match'](/OPPONENT INDEX (\d+)/i)){const _0xa2e502=Number(RegExp['$1']);return[_0x174cf7[_0x46b8d1(0x30a)]()[_0x46b8d1(0x170)]()[_0xa2e502]];}}}}}if(_0x40c597===_0x46b8d1(0x2f0))return $gameParty['aliveMembers']();else{if(_0x40c597===_0x46b8d1(0x3d8))return $gameParty[_0x46b8d1(0x40c)]()[_0x46b8d1(0x744)](_0xe9d854=>_0xe9d854!==_0x174cf7);else{if(_0x40c597===_0x46b8d1(0x450))return $gameParty[_0x46b8d1(0x40c)]()[_0x46b8d1(0x744)](_0x26c162=>_0x26c162!==_0x259807);else{if(_0x40c597===_0x46b8d1(0x657))return $gameParty[_0x46b8d1(0x638)]();else{if(_0x40c597[_0x46b8d1(0x7c7)](/ACTOR INDEX (\d+)/i)){const _0x40c2d1=Number(RegExp['$1']);return[$gameParty[_0x46b8d1(0x170)]()[_0x40c2d1]];}else{if(_0x40c597['match'](/ACTOR ID (\d+)/i)){const _0x5d1e67=Number(RegExp['$1']);return[$gameActors['actor'](_0x5d1e67)];}}}}}}if(_0x40c597===_0x46b8d1(0x2bb))return $gameTroop[_0x46b8d1(0x40c)]();else{if(_0x40c597===_0x46b8d1(0x3d4))return $gameTroop[_0x46b8d1(0x40c)]()[_0x46b8d1(0x744)](_0x236450=>_0x236450!==_0x174cf7);else{if(_0x40c597===_0x46b8d1(0x51e))return $gameTroop[_0x46b8d1(0x40c)]()[_0x46b8d1(0x744)](_0x275488=>_0x275488!==_0x259807);else{if(_0x40c597===_0x46b8d1(0x41d))return $gameTroop[_0x46b8d1(0x638)]();else{if(_0x40c597['match'](/ENEMY INDEX (\d+)/i)){const _0x46e180=Number(RegExp['$1']);return[$gameTroop[_0x46b8d1(0x170)]()[_0x46e180]];}else{if(_0x40c597['match'](/ENEMY ID (\d+)/i)){const _0x503024=Number(RegExp['$1']);return $gameTroop[_0x46b8d1(0x40c)]()[_0x46b8d1(0x744)](_0x1a6d3a=>_0x1a6d3a[_0x46b8d1(0x710)]()===_0x503024);}}}}}}if(_0x40c597===_0x46b8d1(0x4f7))return _0x32ff17[_0x46b8d1(0x744)](_0x15f6b7=>_0x15f6b7[_0x46b8d1(0x142)]());else{if(_0x40c597===_0x46b8d1(0x80c))return _0x32ff17[_0x46b8d1(0x744)](_0x32dc80=>_0x32dc80[_0x46b8d1(0x142)]()&&_0x32dc80!==_0x174cf7);else{if(_0x40c597===_0x46b8d1(0x2ec))return _0x32ff17['filter'](_0x5a3a10=>_0x5a3a10[_0x46b8d1(0x142)]()&&_0x5a3a10!==_0x259807);else{if(_0x40c597===_0x46b8d1(0x1f4))return _0x32ff17[_0x46b8d1(0x744)](_0x2ce1d4=>_0x2ce1d4[_0x46b8d1(0x641)]());}}}return[];},PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x602),_0xf81fb7=>{const _0x39258f=_0x3f1f6b;if(!SceneManager[_0x39258f(0x497)]())return;VisuMZ[_0x39258f(0x536)](_0xf81fb7,_0xf81fb7);const _0x31306c=$gameTemp[_0x39258f(0x578)](),_0x329a42=BattleManager[_0x39258f(0x13b)],_0x40142e=BattleManager['_subject'],_0x22e83d=BattleManager[_0x39258f(0x208)]?BattleManager[_0x39258f(0x208)]['slice'](0x0):[],_0x5aa1d0=BattleManager[_0x39258f(0x6f7)];if(!_0x31306c||!_0x329a42||!_0x40142e)return;if(!_0x329a42[_0x39258f(0x187)]())return;if(_0xf81fb7[_0x39258f(0x189)])_0x5aa1d0[_0x39258f(0x28f)](_0x40142e,_0x329a42['item']());_0xf81fb7['ApplyImmortal']&&_0x5aa1d0[_0x39258f(0x547)](_0x39258f(0x27f),_0x40142e,_0x22e83d,!![]);if(_0xf81fb7[_0x39258f(0x78f)])_0x5aa1d0['push'](_0x39258f(0x6a1),_0x40142e,_0x329a42);if(_0xf81fb7[_0x39258f(0x764)])_0x5aa1d0[_0x39258f(0x547)](_0x39258f(0x338));if(_0xf81fb7[_0x39258f(0x2aa)])_0x5aa1d0['push']('performCastAnimation',_0x40142e,_0x329a42);if(_0xf81fb7[_0x39258f(0x2ff)])_0x5aa1d0['push'](_0x39258f(0x66d));_0x31306c[_0x39258f(0x46b)](_0x39258f(0x68e));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],'ActSeq_Set_WholeActionSet',_0x5dc676=>{const _0x59f153=_0x3f1f6b;if(!SceneManager[_0x59f153(0x497)]())return;VisuMZ[_0x59f153(0x536)](_0x5dc676,_0x5dc676);const _0x12f3ab=$gameTemp['getLastPluginCommandInterpreter'](),_0xa5d662=BattleManager[_0x59f153(0x13b)],_0x2bbd39=BattleManager[_0x59f153(0x633)],_0xc64774=BattleManager['_allTargets']?BattleManager[_0x59f153(0x208)][_0x59f153(0x577)](0x0):[],_0x9f0f7b=BattleManager[_0x59f153(0x6f7)],_0x5b910f=_0x5dc676['DualWield']??![];if(!_0x12f3ab||!_0xa5d662||!_0x2bbd39)return;if(!_0xa5d662[_0x59f153(0x187)]())return;let _0x2c5ce8=_0x5b910f?_0x9f0f7b[_0x59f153(0x7d1)](_0x2bbd39):0x1;for(let _0x1a84fd=0x0;_0x1a84fd<_0x2c5ce8;_0x1a84fd++){_0x5b910f&&_0x2bbd39['isActor']()&&_0x9f0f7b['push'](_0x59f153(0x107),_0x2bbd39,_0x1a84fd);if(_0x5dc676[_0x59f153(0x21b)])_0x9f0f7b['push'](_0x59f153(0x6d7),_0x2bbd39,_0xa5d662);if(_0x5dc676['WaitCount']>0x0)_0x9f0f7b[_0x59f153(0x547)](_0x59f153(0x1e3),_0x5dc676[_0x59f153(0x205)]);if(_0x5dc676[_0x59f153(0x78e)])_0x9f0f7b['push'](_0x59f153(0x629),_0x2bbd39,_0xc64774,_0xa5d662['item']()[_0x59f153(0x406)]);if(_0x5dc676[_0x59f153(0x2ff)])_0x9f0f7b[_0x59f153(0x547)]('waitForAnimation');for(const _0x33c20e of _0xc64774){if(!_0x33c20e)continue;if(_0x5dc676['ActionEffect'])_0x9f0f7b[_0x59f153(0x547)](_0x59f153(0x47a),_0x2bbd39,_0x33c20e);}}_0x5b910f&&_0x2bbd39[_0x59f153(0x72a)]()&&_0x9f0f7b[_0x59f153(0x547)](_0x59f153(0x1c5),_0x2bbd39);if(_0x5dc676[_0x59f153(0xda)])_0x9f0f7b[_0x59f153(0x547)](_0x59f153(0x27f),_0x2bbd39,_0xc64774,![]);_0x12f3ab[_0x59f153(0x46b)](_0x59f153(0x68e));}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],_0x3f1f6b(0x46a),_0x1b976a=>{const _0x1eef19=_0x3f1f6b;if(!SceneManager[_0x1eef19(0x497)]())return;VisuMZ[_0x1eef19(0x536)](_0x1b976a,_0x1b976a);const _0x2314fe=$gameTemp[_0x1eef19(0x578)](),_0x15df19=BattleManager['_action'],_0xb5ee77=BattleManager[_0x1eef19(0x633)],_0x3bf468=BattleManager[_0x1eef19(0x208)]?BattleManager[_0x1eef19(0x208)][_0x1eef19(0x577)](0x0):[],_0x45f8c8=BattleManager['_logWindow'],_0x987b22=_0x1b976a[_0x1eef19(0x16e)]??![];if(!_0x2314fe||!_0x15df19||!_0xb5ee77)return;if(!_0x15df19[_0x1eef19(0x187)]())return;let _0x5b0e26=_0x987b22?_0x45f8c8[_0x1eef19(0x7d1)](_0xb5ee77):0x1;for(let _0x356b98=0x0;_0x356b98<_0x5b0e26;_0x356b98++){for(const _0x2d9498 of _0x3bf468){if(!_0x2d9498)continue;_0x987b22&&_0xb5ee77[_0x1eef19(0x72a)]()&&_0x45f8c8[_0x1eef19(0x547)](_0x1eef19(0x107),_0xb5ee77,_0x356b98);if(_0x1b976a[_0x1eef19(0x21b)])_0x45f8c8[_0x1eef19(0x547)](_0x1eef19(0x6d7),_0xb5ee77,_0x15df19);if(_0x1b976a['WaitCount1']>0x0)_0x45f8c8['push'](_0x1eef19(0x1e3),_0x1b976a[_0x1eef19(0x159)]);if(_0x1b976a[_0x1eef19(0x78e)])_0x45f8c8[_0x1eef19(0x547)](_0x1eef19(0x629),_0xb5ee77,[_0x2d9498],_0x15df19['item']()[_0x1eef19(0x406)]);if(_0x1b976a[_0x1eef19(0x389)]>0x0)_0x45f8c8[_0x1eef19(0x547)](_0x1eef19(0x1e3),_0x1b976a[_0x1eef19(0x389)]);if(_0x1b976a['ActionEffect'])_0x45f8c8[_0x1eef19(0x547)](_0x1eef19(0x47a),_0xb5ee77,_0x2d9498);}}_0x987b22&&_0xb5ee77[_0x1eef19(0x72a)]()&&_0x45f8c8[_0x1eef19(0x547)]('clearActiveWeaponSet',_0xb5ee77);if(_0x1b976a[_0x1eef19(0xda)])_0x45f8c8[_0x1eef19(0x547)](_0x1eef19(0x27f),_0xb5ee77,_0x3bf468,![]);_0x2314fe[_0x1eef19(0x46b)]('battlelog');}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],'ActSeq_Set_FinishAction',_0x343870=>{const _0x222902=_0x3f1f6b;if(!SceneManager[_0x222902(0x497)]())return;VisuMZ[_0x222902(0x536)](_0x343870,_0x343870);const _0x4e81ff=$gameTemp[_0x222902(0x578)](),_0x273db9=BattleManager[_0x222902(0x13b)],_0x85ce0f=BattleManager[_0x222902(0x633)],_0x4331e1=BattleManager[_0x222902(0x208)]?BattleManager[_0x222902(0x208)][_0x222902(0x577)](0x0):[],_0x228b8e=BattleManager['_logWindow'];if(!_0x4e81ff||!_0x273db9||!_0x85ce0f)return;if(!_0x273db9[_0x222902(0x187)]())return;if(_0x343870[_0x222902(0xda)])_0x228b8e[_0x222902(0x547)](_0x222902(0x27f),_0x85ce0f,_0x4331e1,![]);if(_0x343870[_0x222902(0xf7)])_0x228b8e['push'](_0x222902(0x4ff));if(_0x343870[_0x222902(0x418)])_0x228b8e[_0x222902(0x547)](_0x222902(0x258));if(_0x343870['ClearBattleLog'])_0x228b8e[_0x222902(0x547)]('clear');if(_0x343870[_0x222902(0x7b0)])_0x228b8e['push']('performActionEnd',_0x85ce0f);if(_0x343870[_0x222902(0x764)])_0x228b8e[_0x222902(0x547)](_0x222902(0x338));_0x4e81ff[_0x222902(0x46b)](_0x222902(0x68e));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x7ab),_0x4d065d=>{const _0x5d7f0e=_0x3f1f6b;if(!SceneManager[_0x5d7f0e(0x497)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x5d7f0e(0x536)](_0x4d065d,_0x4d065d);const _0x5625e4=$gameTemp[_0x5d7f0e(0x578)](),_0x2d1e3a=_0x4d065d['WaitForAngle'];if(!_0x5625e4)return;$gameScreen[_0x5d7f0e(0x751)](_0x4d065d[_0x5d7f0e(0x28e)],_0x4d065d[_0x5d7f0e(0x33a)],_0x4d065d['EasingType']);if(_0x2d1e3a)_0x5625e4['setWaitMode']('battleAngle');}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],'ActSeq_Angle_Reset',_0x236ea1=>{const _0x32bc39=_0x3f1f6b;if(!SceneManager[_0x32bc39(0x497)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ['ConvertParams'](_0x236ea1,_0x236ea1);const _0xa78630=$gameTemp['getLastPluginCommandInterpreter'](),_0x4d466b=_0x236ea1[_0x32bc39(0x788)];if(!_0xa78630)return;$gameScreen[_0x32bc39(0x751)](0x0,_0x236ea1['Duration'],_0x236ea1[_0x32bc39(0x791)]);if(_0x4d466b)_0xa78630[_0x32bc39(0x46b)]('battleAngle');}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x728),_0x187b6c=>{const _0x26fef9=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0x53f0f0=$gameTemp[_0x26fef9(0x578)]();if(!_0x53f0f0)return;_0x53f0f0[_0x26fef9(0x46b)]('battleAngle');}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x6b1),_0x134f49=>{const _0x3c130a=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x134f49,_0x134f49);const _0x57be61=$gameTemp[_0x3c130a(0x578)](),_0x4f5d38=BattleManager[_0x3c130a(0x13b)],_0x10e0e3=BattleManager[_0x3c130a(0x633)],_0x2f05c2=VisuMZ[_0x3c130a(0x1cd)](_0x134f49[_0x3c130a(0x613)]),_0x4bd1c1=_0x134f49['Mirror'],_0x3baed4=BattleManager[_0x3c130a(0x6f7)];if(!_0x57be61||!_0x4f5d38||!_0x10e0e3)return;if(!_0x4f5d38['item']())return;let _0x59d95a=_0x4f5d38[_0x3c130a(0x187)]()[_0x3c130a(0x406)];if(_0x59d95a<0x0)_0x59d95a=_0x10e0e3[_0x3c130a(0x70e)]();$gameTemp[_0x3c130a(0x2e0)](_0x2f05c2,_0x59d95a,_0x4bd1c1),_0x134f49[_0x3c130a(0x2ff)]&&_0x57be61[_0x3c130a(0x46b)]('battleAnimation');}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],'ActSeq_Animation_AttackAnimation',_0x415d87=>{const _0x50b927=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x50b927(0x536)](_0x415d87,_0x415d87);const _0x351aec=$gameTemp['getLastPluginCommandInterpreter'](),_0x462f2d=BattleManager['_subject'],_0x1da650=VisuMZ[_0x50b927(0x1cd)](_0x415d87['Targets']),_0x3c0dfe=_0x415d87[_0x50b927(0x34e)],_0x5c83a1=BattleManager[_0x50b927(0x6f7)];if(!_0x351aec||!_0x462f2d)return;const _0x205911=_0x462f2d[_0x50b927(0x70e)]();$gameTemp[_0x50b927(0x2e0)](_0x1da650,_0x205911,_0x3c0dfe),_0x415d87[_0x50b927(0x2ff)]&&_0x351aec[_0x50b927(0x46b)](_0x50b927(0x759));}),PluginManager['registerCommand'](pluginData['name'],_0x3f1f6b(0x18e),_0x571688=>{const _0x333588=_0x3f1f6b;if(!SceneManager[_0x333588(0x497)]())return;VisuMZ[_0x333588(0x536)](_0x571688,_0x571688);const _0x43ae3d=_0x4df8d0[_0x333588(0x2e2)](_0x571688[_0x333588(0x3a3)]);if(_0x43ae3d<=0x0)return;const _0x100670=$gameTemp[_0x333588(0x578)](),_0x4df8d0=BattleManager[_0x333588(0x633)],_0x4bc3d0=VisuMZ[_0x333588(0x1cd)](_0x571688[_0x333588(0x613)]),_0x5ea31d=_0x571688[_0x333588(0x34e)],_0xb09735=BattleManager['_logWindow'];if(!_0x100670||!_0x4df8d0)return;$gameTemp[_0x333588(0x2e0)](_0x4bc3d0,_0x43ae3d,_0x5ea31d),_0x571688[_0x333588(0x2ff)]&&_0x100670['setWaitMode'](_0x333588(0x759));}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],_0x3f1f6b(0x19e),_0x1a4b5b=>{const _0xeb8cad=_0x3f1f6b;if(!SceneManager[_0xeb8cad(0x497)]())return;VisuMZ[_0xeb8cad(0x536)](_0x1a4b5b,_0x1a4b5b);const _0x19ccd7=$gameTemp[_0xeb8cad(0x578)](),_0x250952=BattleManager[_0xeb8cad(0x13b)],_0x3a4eee=_0x1a4b5b[_0xeb8cad(0x34e)],_0x11daef=VisuMZ['CreateActionSequenceTargets'](_0x1a4b5b[_0xeb8cad(0x613)]);if(!_0x19ccd7||!_0x250952)return;if(!_0x250952[_0xeb8cad(0x187)]())return;for(const _0x3b5efb of _0x11daef){if(!_0x3b5efb)continue;_0x3b5efb[_0xeb8cad(0x1b4)](_0x250952,_0x3a4eee);}if(_0x1a4b5b[_0xeb8cad(0x2ff)])_0x19ccd7[_0xeb8cad(0x46b)](_0xeb8cad(0x759));}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],_0x3f1f6b(0x315),_0x29796f=>{const _0x1b268c=_0x3f1f6b;VisuMZ[_0x1b268c(0x536)](_0x29796f,_0x29796f);const _0x14a2d2=$gameTemp[_0x1b268c(0x578)](),_0x4b7504=VisuMZ[_0x1b268c(0x1cd)](_0x29796f[_0x1b268c(0x613)]),_0x4854c8=_0x29796f[_0x1b268c(0x310)];if(!_0x4854c8)return;for(const _0x515d2a of _0x4b7504){if(!_0x515d2a)continue;if(!_0x515d2a['isActor']())continue;_0x515d2a[_0x1b268c(0x350)](_0x4854c8);}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x6cf),_0x2523c8=>{const _0x7c235b=_0x3f1f6b;if(!SceneManager[_0x7c235b(0x497)]())return;VisuMZ[_0x7c235b(0x536)](_0x2523c8,_0x2523c8);const _0x2172f7=$gameTemp[_0x7c235b(0x578)](),_0x4aadb3=VisuMZ[_0x7c235b(0x1cd)](_0x2523c8['Targets']),_0x1c55d6=_0x2523c8['AnimationID'],_0x5ab4cb=_0x2523c8['Mirror'];if(!_0x2172f7)return;$gameTemp['requestAnimation'](_0x4aadb3,_0x1c55d6,_0x5ab4cb);if(_0x2523c8[_0x7c235b(0x2ff)])_0x2172f7[_0x7c235b(0x46b)](_0x7c235b(0x759));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x397),_0x36e781=>{const _0x5c94a6=_0x3f1f6b;if(!SceneManager[_0x5c94a6(0x497)]())return;const _0x236000=$gameTemp[_0x5c94a6(0x578)]();if(!_0x236000)return;_0x236000[_0x5c94a6(0x46b)](_0x5c94a6(0x759));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x194),_0x2dba7b=>{const _0x52ab87=_0x3f1f6b;if(!SceneManager[_0x52ab87(0x497)]())return;VisuMZ[_0x52ab87(0x536)](_0x2dba7b,_0x2dba7b);const _0x14b1aa=BattleManager[_0x52ab87(0x6f7)],_0x41e4e7=_0x2dba7b[_0x52ab87(0x4d9)]&&Imported[_0x52ab87(0x5e9)];_0x14b1aa[_0x52ab87(0x748)](_0x2dba7b['Text']),_0x41e4e7&&Imported[_0x52ab87(0x5e9)]&&$gameSystem[_0x52ab87(0x589)](_0x2dba7b['Text']||'',_0x2dba7b[_0x52ab87(0xde)]||0x0);}),PluginManager['registerCommand'](pluginData['name'],_0x3f1f6b(0x725),_0x1da487=>{const _0x880790=_0x3f1f6b;if(!SceneManager[_0x880790(0x497)]())return;const _0x47f973=BattleManager[_0x880790(0x6f7)];_0x47f973[_0x880790(0xae)]();}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],'ActSeq_BattleLog_DisplayAction',_0x110e2a=>{const _0x5e299e=_0x3f1f6b;if(!SceneManager[_0x5e299e(0x497)]())return;const _0x156084=$gameTemp['getLastPluginCommandInterpreter'](),_0x4cc2cf=BattleManager['_action'],_0x438337=BattleManager['_subject'],_0x2077bd=BattleManager[_0x5e299e(0x6f7)];if(!_0x156084||!_0x4cc2cf||!_0x438337)return;if(!_0x4cc2cf[_0x5e299e(0x187)]())return;_0x2077bd[_0x5e299e(0x28f)](_0x438337,_0x4cc2cf[_0x5e299e(0x187)]()),_0x156084[_0x5e299e(0x46b)]('battlelog');}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],'ActSeq_BattleLog_PopBaseLine',_0x5f5cf0=>{if(!SceneManager['isSceneBattle']())return;const _0x4021bf=BattleManager['_logWindow'];_0x4021bf['popBaseLine']();}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x295),_0x4900b6=>{const _0x8d4610=_0x3f1f6b;if(!SceneManager[_0x8d4610(0x497)]())return;const _0x5aaed9=BattleManager[_0x8d4610(0x6f7)];_0x5aaed9[_0x8d4610(0x2f4)]();}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],'ActSeq_BattleLog_Refresh',_0x43a762=>{const _0x51a2e9=_0x3f1f6b;if(!SceneManager[_0x51a2e9(0x497)]())return;const _0x528fa0=BattleManager['_logWindow'];_0x528fa0[_0x51a2e9(0x855)]();}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x385),_0x4caed9=>{const _0x33e716=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x33e716(0x536)](_0x4caed9,_0x4caed9),SceneManager[_0x33e716(0x5bb)][_0x33e716(0x492)](_0x4caed9['ShowHide']);}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],_0x3f1f6b(0xab),_0x41cbcb=>{const _0x102a8d=_0x3f1f6b;if(!SceneManager[_0x102a8d(0x497)]())return;const _0x50212d=$gameTemp['getLastPluginCommandInterpreter']();_0x50212d['setWaitMode'](_0x102a8d(0x68e));}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],'ActSeq_BattleLog_WaitForNewLine',_0x213d30=>{const _0x338709=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;const _0x140a0e=$gameTemp[_0x338709(0x578)](),_0x9c905c=BattleManager[_0x338709(0x6f7)];_0x9c905c['waitForNewLine'](),_0x140a0e['setWaitMode'](_0x338709(0x68e));}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],'ActSeq_Camera_Clamp',_0x39942d=>{const _0x480881=_0x3f1f6b;if(!SceneManager[_0x480881(0x497)]())return;if(!Imported[_0x480881(0x7f4)])return;VisuMZ[_0x480881(0x536)](_0x39942d,_0x39942d);const _0x26e01b=$gameScreen[_0x480881(0x4f0)]();_0x26e01b['cameraClamp']=_0x39942d[_0x480881(0x63d)];}),PluginManager['registerCommand'](pluginData['name'],_0x3f1f6b(0x2ae),_0x2344ef=>{const _0x339793=_0x3f1f6b;if(!SceneManager[_0x339793(0x497)]())return;if(!Imported[_0x339793(0x7f4)])return;VisuMZ[_0x339793(0x536)](_0x2344ef,_0x2344ef);const _0x52873f=$gameTemp[_0x339793(0x578)](),_0x1662fb=_0x2344ef[_0x339793(0x19b)];$gameScreen[_0x339793(0x3c2)](_0x2344ef[_0x339793(0x426)],_0x2344ef['FocusY'],_0x2344ef[_0x339793(0x33a)],_0x2344ef[_0x339793(0x791)]);if(_0x1662fb)_0x52873f['setWaitMode']('battleCamera');}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],'ActSeq_Camera_FocusTarget',_0x2af1e6=>{const _0x4468a8=_0x3f1f6b;if(!SceneManager[_0x4468a8(0x497)]())return;if(!Imported[_0x4468a8(0x7f4)])return;VisuMZ[_0x4468a8(0x536)](_0x2af1e6,_0x2af1e6);const _0x1f0bfc=$gameTemp[_0x4468a8(0x578)](),_0x423b6a=VisuMZ[_0x4468a8(0x1cd)](_0x2af1e6[_0x4468a8(0x613)]),_0x54b4e2=_0x2af1e6[_0x4468a8(0x19b)];$gameScreen[_0x4468a8(0x226)](_0x423b6a,_0x2af1e6[_0x4468a8(0x33a)],_0x2af1e6['EasingType']);if(_0x54b4e2)_0x1f0bfc[_0x4468a8(0x46b)](_0x4468a8(0x36b));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0xbc),_0x4b7b12=>{const _0x1a24b1=_0x3f1f6b;if(!SceneManager[_0x1a24b1(0x497)]())return;if(!Imported[_0x1a24b1(0x7f4)])return;VisuMZ[_0x1a24b1(0x536)](_0x4b7b12,_0x4b7b12);const _0x3c7583=$gameTemp[_0x1a24b1(0x578)](),_0x43ec6d=_0x4b7b12[_0x1a24b1(0x19b)];$gameScreen[_0x1a24b1(0x27d)](_0x4b7b12['OffsetX'],_0x4b7b12[_0x1a24b1(0x745)],_0x4b7b12[_0x1a24b1(0x33a)],_0x4b7b12[_0x1a24b1(0x791)]);if(_0x43ec6d)_0x3c7583[_0x1a24b1(0x46b)](_0x1a24b1(0x36b));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x736),_0x3e3df1=>{const _0x48251b=_0x3f1f6b;if(!SceneManager[_0x48251b(0x497)]())return;if(!Imported[_0x48251b(0x7f4)])return;VisuMZ['ConvertParams'](_0x3e3df1,_0x3e3df1);const _0x37ed02=$gameTemp['getLastPluginCommandInterpreter'](),_0x53ffc2=_0x3e3df1[_0x48251b(0x643)],_0x1bedcb=_0x3e3df1[_0x48251b(0x5f2)],_0x4c227c=_0x3e3df1[_0x48251b(0x19b)];if(_0x53ffc2){const _0x58dc09=Math[_0x48251b(0x5a7)](Graphics['width']/0x2),_0x1a8074=Math['round'](Graphics[_0x48251b(0x555)]/0x2);$gameScreen[_0x48251b(0x3c2)](_0x58dc09,_0x1a8074,_0x3e3df1['Duration'],_0x3e3df1[_0x48251b(0x791)]);}_0x1bedcb&&$gameScreen[_0x48251b(0x27d)](0x0,0x0,_0x3e3df1[_0x48251b(0x33a)],_0x3e3df1[_0x48251b(0x791)]);if(_0x4c227c)_0x37ed02[_0x48251b(0x46b)](_0x48251b(0x36b));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x74e),_0x3f56fb=>{const _0x394ef1=_0x3f1f6b;if(!SceneManager[_0x394ef1(0x497)]())return;if(!Imported[_0x394ef1(0x7f4)])return;const _0x272f33=$gameTemp[_0x394ef1(0x578)]();if(!_0x272f33)return;_0x272f33[_0x394ef1(0x46b)](_0x394ef1(0x36b));}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_DB_DragonbonesMotionAni',_0x5530ac=>{const _0x1a5303=_0x3f1f6b;if(!SceneManager[_0x1a5303(0x497)]())return;if(!Imported[_0x1a5303(0x322)])return;VisuMZ[_0x1a5303(0x536)](_0x5530ac,_0x5530ac);const _0x328d27=VisuMZ[_0x1a5303(0x1cd)](_0x5530ac[_0x1a5303(0x613)]),_0x1d80bf=_0x5530ac[_0x1a5303(0x252)]['toLowerCase']()[_0x1a5303(0x6da)]();for(const _0x2095c8 of _0x328d27){if(!_0x2095c8)continue;_0x2095c8[_0x1a5303(0x1ad)](_0x1d80bf);}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],'ActSeq_DB_DragonbonesTimeScale',_0x1d646d=>{const _0x271c90=_0x3f1f6b;if(!SceneManager[_0x271c90(0x497)]())return;if(!Imported[_0x271c90(0x322)])return;VisuMZ[_0x271c90(0x536)](_0x1d646d,_0x1d646d);const _0x1ea70d=VisuMZ[_0x271c90(0x1cd)](_0x1d646d[_0x271c90(0x613)]),_0x260ada=_0x1d646d[_0x271c90(0x825)];for(const _0x71c5b6 of _0x1ea70d){if(!_0x71c5b6)continue;_0x71c5b6['dragonbonesData']()['timeScale']=_0x260ada;}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x3c8),_0x5f1e2c=>{const _0x436b58=_0x3f1f6b;if(!SceneManager[_0x436b58(0x497)]())return;if(!Imported[_0x436b58(0x59c)])return;VisuMZ[_0x436b58(0x536)](_0x5f1e2c,_0x5f1e2c);const _0x41a851=BattleManager[_0x436b58(0x13b)],_0x4d8705=_0x5f1e2c[_0x436b58(0x362)];if(!_0x41a851)return;_0x41a851[_0x436b58(0x55d)]=_0x4d8705;}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x46f),_0x28c5c2=>{const _0x56e34b=_0x3f1f6b;if(!SceneManager[_0x56e34b(0x497)]())return;if(!Imported[_0x56e34b(0x59c)])return;const _0xd8c1e9=BattleManager[_0x56e34b(0x13b)];if(!_0xd8c1e9)return;_0xd8c1e9['clearElementChanges']();}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x7ac),_0x1fe1da=>{const _0x258780=_0x3f1f6b;if(!SceneManager[_0x258780(0x497)]())return;if(!Imported[_0x258780(0x59c)])return;VisuMZ[_0x258780(0x536)](_0x1fe1da,_0x1fe1da);const _0x264430=BattleManager[_0x258780(0x13b)],_0x556669=_0x1fe1da[_0x258780(0x362)];if(!_0x264430)return;_0x264430[_0x258780(0x805)]=_0x556669;}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Element_NullElements',_0x3ae73b=>{const _0x1acfb0=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x1acfb0(0x59c)])return;const _0x28ce2f=BattleManager[_0x1acfb0(0x13b)];if(!_0x28ce2f)return;_0x28ce2f[_0x1acfb0(0x26f)]=!![];}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x206),_0x1a7cd5=>{const _0x575804=_0x3f1f6b;if(!Imported['VisuMZ_2_HorrorEffects'])return;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x575804(0x536)](_0x1a7cd5,_0x1a7cd5);const _0x2432ce=VisuMZ[_0x575804(0x1cd)](_0x1a7cd5[_0x575804(0x613)]);for(const _0x4f1c97 of _0x2432ce){if(!_0x4f1c97)continue;_0x4f1c97[_0x575804(0x288)]('noise'),_0x4f1c97[_0x575804(0x288)](_0x575804(0x181)),_0x4f1c97[_0x575804(0x288)]('tv'),_0x4f1c97[_0x575804(0x60b)]();}$gamePlayer['refresh']();}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],'ActSeq_Horror_GlitchCreate',_0x4ab7a0=>{const _0x2101ee=_0x3f1f6b;if(!Imported[_0x2101ee(0xd6)])return;if(!SceneManager[_0x2101ee(0x497)]())return;VisuMZ[_0x2101ee(0x536)](_0x4ab7a0,_0x4ab7a0);const _0x11cb37=VisuMZ[_0x2101ee(0x1cd)](_0x4ab7a0[_0x2101ee(0x613)]),_0x30561=_0x2101ee(0x181);_0x4ab7a0['sliceMin']=Math['ceil'](_0x4ab7a0['slices']/0x2),_0x4ab7a0[_0x2101ee(0x2f3)]=_0x4ab7a0[_0x2101ee(0x2d1)],_0x4ab7a0[_0x2101ee(0x53f)]=!![];for(const _0x31bed7 of _0x11cb37){if(!_0x31bed7)continue;_0x31bed7[_0x2101ee(0x62f)](_0x30561,_0x4ab7a0);}$gamePlayer[_0x2101ee(0x855)]();}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Horror_GlitchRemove',_0x2a3e64=>{const _0x50d6b2=_0x3f1f6b;if(!Imported[_0x50d6b2(0xd6)])return;if(!SceneManager[_0x50d6b2(0x497)]())return;VisuMZ[_0x50d6b2(0x536)](_0x2a3e64,_0x2a3e64);const _0x3c1294=VisuMZ[_0x50d6b2(0x1cd)](_0x2a3e64['Targets']);for(const _0x249b12 of _0x3c1294){if(!_0x249b12)continue;_0x249b12[_0x50d6b2(0x288)](_0x50d6b2(0x181));}$gamePlayer[_0x50d6b2(0x855)]();}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x531),_0x4d3767=>{const _0x1bd496=_0x3f1f6b;if(!Imported[_0x1bd496(0xd6)])return;if(!SceneManager[_0x1bd496(0x497)]())return;VisuMZ[_0x1bd496(0x536)](_0x4d3767,_0x4d3767);const _0x1d7b0a=VisuMZ['CreateActionSequenceTargets'](_0x4d3767[_0x1bd496(0x613)]),_0x1b22f1=_0x1bd496(0x5fc);for(const _0x5f0c9e of _0x1d7b0a){if(!_0x5f0c9e)continue;_0x5f0c9e['setHorrorEffectSettings'](_0x1b22f1,_0x4d3767);}$gamePlayer['refresh']();}),PluginManager['registerCommand'](pluginData['name'],_0x3f1f6b(0x139),_0x25bd2c=>{const _0x1165f4=_0x3f1f6b;if(!Imported[_0x1165f4(0xd6)])return;if(!SceneManager[_0x1165f4(0x497)]())return;VisuMZ[_0x1165f4(0x536)](_0x25bd2c,_0x25bd2c);const _0x5c7567=VisuMZ['CreateActionSequenceTargets'](_0x25bd2c['Targets']);for(const _0x29b6ca of _0x5c7567){if(!_0x29b6ca)continue;_0x29b6ca[_0x1165f4(0x288)]('noise');}$gamePlayer[_0x1165f4(0x855)]();}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x493),_0x5a1006=>{const _0x5568cf=_0x3f1f6b;if(!Imported[_0x5568cf(0xd6)])return;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x5568cf(0x536)](_0x5a1006,_0x5a1006);const _0x2808b0=VisuMZ[_0x5568cf(0x1cd)](_0x5a1006[_0x5568cf(0x613)]),_0x1afc07='tv';for(const _0x29cfd2 of _0x2808b0){if(!_0x29cfd2)continue;_0x29cfd2['setHorrorEffectSettings'](_0x1afc07,_0x5a1006);}$gamePlayer[_0x5568cf(0x855)]();}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x15d),_0x510027=>{const _0x2cb4f1=_0x3f1f6b;if(!Imported[_0x2cb4f1(0xd6)])return;if(!SceneManager[_0x2cb4f1(0x497)]())return;VisuMZ['ConvertParams'](_0x510027,_0x510027);const _0x5c866f=VisuMZ['CreateActionSequenceTargets'](_0x510027[_0x2cb4f1(0x613)]);for(const _0x33a78f of _0x5c866f){if(!_0x33a78f)continue;_0x33a78f[_0x2cb4f1(0x288)]('tv');}$gamePlayer[_0x2cb4f1(0x855)]();}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],_0x3f1f6b(0x505),_0x33354f=>{const _0xceabfd=_0x3f1f6b;if(!SceneManager[_0xceabfd(0x497)]())return;if(!Imported[_0xceabfd(0x840)])return;const _0x2e25cf=SceneManager[_0xceabfd(0x5bb)]['_spriteset'];if(!_0x2e25cf)return;VisuMZ[_0xceabfd(0x536)](_0x33354f,_0x33354f);const _0x4600ba=_0x33354f[_0xceabfd(0xdc)]||0x1,_0x4ef051=_0x33354f[_0xceabfd(0x33a)]||0x1,_0x52787e=_0x33354f[_0xceabfd(0x791)]||_0xceabfd(0x60f);_0x2e25cf[_0xceabfd(0x658)](_0x4600ba,_0x4ef051,_0x52787e);}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x71c),_0x5a3c5a=>{const _0x218ecb=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x218ecb(0x840)])return;const _0x16d586=SceneManager[_0x218ecb(0x5bb)][_0x218ecb(0x1b3)];if(!_0x16d586)return;VisuMZ['ConvertParams'](_0x5a3c5a,_0x5a3c5a);const _0x13ab05=Number(_0x5a3c5a[_0x218ecb(0x28e)])||0x0,_0x271799=Number(_0x5a3c5a[_0x218ecb(0x261)]),_0x580e0a=_0x5a3c5a['Duration']||0x1,_0x515dfd=_0x5a3c5a[_0x218ecb(0x791)]||'Linear';_0x16d586[_0x218ecb(0x60d)](_0x13ab05,_0x271799,_0x580e0a,_0x515dfd);}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],'ActSeq_Impact_MotionBlurTarget',_0x60c91=>{const _0x294555=_0x3f1f6b;if(!SceneManager[_0x294555(0x497)]())return;if(!Imported[_0x294555(0x840)])return;const _0x2e5123=SceneManager[_0x294555(0x5bb)][_0x294555(0x1b3)];if(!_0x2e5123)return;VisuMZ['ConvertParams'](_0x60c91,_0x60c91);const _0x54f95d=Number(_0x60c91[_0x294555(0x28e)])||0x0,_0x378c5a=Number(_0x60c91['Rate']),_0x46e29d=_0x60c91[_0x294555(0x33a)]||0x1,_0x405c13=_0x60c91[_0x294555(0x791)]||_0x294555(0x60f),_0x5714e1=VisuMZ[_0x294555(0x1cd)](_0x60c91[_0x294555(0x613)]);for(const _0x1fb106 of _0x5714e1){if(!_0x1fb106)continue;if(!_0x1fb106[_0x294555(0x5cb)]())continue;_0x1fb106[_0x294555(0x5cb)]()[_0x294555(0x60d)](_0x54f95d,_0x378c5a,_0x46e29d,_0x405c13);}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x57f),_0x2ed25c=>{const _0x4a4a27=_0x3f1f6b;if(!SceneManager[_0x4a4a27(0x497)]())return;if(!Imported[_0x4a4a27(0x840)])return;VisuMZ['ConvertParams'](_0x2ed25c,_0x2ed25c);const _0x13f81f={'delay':_0x2ed25c[_0x4a4a27(0x3dc)],'duration':_0x2ed25c[_0x4a4a27(0x7f9)],'hue':_0x2ed25c[_0x4a4a27(0x327)],'opacityStart':_0x2ed25c[_0x4a4a27(0x355)],'tone':_0x2ed25c[_0x4a4a27(0x33f)],'visible':!![]},_0x3c9a1b=VisuMZ['CreateActionSequenceTargets'](_0x2ed25c[_0x4a4a27(0x613)]);for(const _0x5ad4ac of _0x3c9a1b){if(!_0x5ad4ac)continue;_0x5ad4ac[_0x4a4a27(0x4aa)](_0x13f81f);}}),PluginManager['registerCommand'](pluginData['name'],_0x3f1f6b(0x4d7),_0x2f787f=>{const _0x321a58=_0x3f1f6b;if(!SceneManager[_0x321a58(0x497)]())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;VisuMZ['ConvertParams'](_0x2f787f,_0x2f787f);const _0x262ebe=VisuMZ[_0x321a58(0x1cd)](_0x2f787f[_0x321a58(0x613)]);for(const _0x5b79fe of _0x262ebe){if(!_0x5b79fe)continue;_0x5b79fe[_0x321a58(0x80d)]();}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x192),_0x486052=>{const _0x599127=_0x3f1f6b;if(!Imported[_0x599127(0x840)])return;const _0x4ca8c7=SceneManager[_0x599127(0x5bb)]['_spriteset'];if(!_0x4ca8c7)return;VisuMZ[_0x599127(0x536)](_0x486052,_0x486052);const _0x4d06a5=_0x486052['X']||0x0,_0x128808=_0x486052['Y']||0x0,_0x2516dd=_0x486052[_0x599127(0x508)]||0x0,_0x1cd760=_0x486052[_0x599127(0x7e9)]||0x0,_0x2c493d=_0x486052['Duration']||0x1;_0x4ca8c7[_0x599127(0x13a)](_0x4d06a5,_0x128808,_0x2516dd,_0x1cd760,_0x2c493d);}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],'ActSeq_Impact_ShockwaveEachTargets',_0x44d243=>{const _0x3990f3=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x13b9c2=SceneManager[_0x3990f3(0x5bb)][_0x3990f3(0x1b3)];if(!_0x13b9c2)return;VisuMZ[_0x3990f3(0x536)](_0x44d243,_0x44d243);const _0x3164a8=VisuMZ[_0x3990f3(0x1cd)](_0x44d243['Targets']),_0x19744f=_0x44d243['TargetLocation'],_0x1ebd9f=_0x44d243[_0x3990f3(0x1e0)]||0x0,_0x3eed14=_0x44d243['OffsetY']||0x0,_0x549db3=_0x44d243[_0x3990f3(0x508)]||0x0,_0x262819=_0x44d243[_0x3990f3(0x7e9)]||0x0,_0x2aeb55=_0x44d243[_0x3990f3(0x33a)]||0x1;for(const _0x524289 of _0x3164a8){if(!_0x524289)continue;if(!_0x524289[_0x3990f3(0x5cb)]())continue;const _0x318a31=_0x524289[_0x3990f3(0x5cb)]();let _0x2fea39=_0x318a31[_0x3990f3(0x1d7)],_0x35f74d=_0x318a31[_0x3990f3(0x47b)];_0x2fea39+=(Graphics[_0x3990f3(0x364)]-Graphics[_0x3990f3(0x2e4)])/0x2,_0x35f74d+=(Graphics[_0x3990f3(0x555)]-Graphics[_0x3990f3(0x30e)])/0x2;if(_0x19744f[_0x3990f3(0x7c7)](/front/i))_0x2fea39+=(_0x524289[_0x3990f3(0x7f8)]()?0x1:-0x1)*_0x318a31[_0x3990f3(0x454)]()/0x2;else _0x19744f[_0x3990f3(0x7c7)](/back/i)&&(_0x2fea39+=(_0x524289[_0x3990f3(0x7f8)]()?-0x1:0x1)*_0x318a31[_0x3990f3(0x454)]()/0x2);if(_0x19744f[_0x3990f3(0x7c7)](/head/i))_0x35f74d-=_0x318a31['mainSpriteHeight']();else _0x19744f['match'](/center/i)&&(_0x35f74d-=_0x318a31[_0x3990f3(0x70d)]()/0x2);_0x2fea39+=_0x1ebd9f,_0x35f74d+=_0x3eed14,_0x13b9c2[_0x3990f3(0x13a)](_0x2fea39,_0x35f74d,_0x549db3,_0x262819,_0x2aeb55);}}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],'ActSeq_Impact_ShockwaveCenterTargets',_0x444397=>{const _0x59dde7=_0x3f1f6b;if(!SceneManager[_0x59dde7(0x497)]())return;if(!Imported[_0x59dde7(0x840)])return;const _0x20826e=SceneManager[_0x59dde7(0x5bb)][_0x59dde7(0x1b3)];if(!_0x20826e)return;VisuMZ[_0x59dde7(0x536)](_0x444397,_0x444397);const _0x9e9749=VisuMZ['CreateActionSequenceTargets'](_0x444397[_0x59dde7(0x613)]),_0x4578f2=_0x444397[_0x59dde7(0x2d6)],_0x29459a=_0x444397['OffsetX']||0x0,_0x33f3c3=_0x444397[_0x59dde7(0x745)]||0x0,_0x103a57=_0x444397[_0x59dde7(0x508)]||0x0,_0x3625c6=_0x444397[_0x59dde7(0x7e9)]||0x0,_0x2b8fec=_0x444397[_0x59dde7(0x33a)]||0x1,_0x63ad45=Math[_0x59dde7(0x847)](..._0x9e9749[_0x59dde7(0x255)](_0x942a80=>_0x942a80['battler']()[_0x59dde7(0x1d7)]-_0x942a80[_0x59dde7(0x5cb)]()[_0x59dde7(0x454)]()/0x2)),_0x5edbed=Math[_0x59dde7(0x39f)](..._0x9e9749['map'](_0x34d246=>_0x34d246['battler']()[_0x59dde7(0x1d7)]+_0x34d246[_0x59dde7(0x5cb)]()[_0x59dde7(0x454)]()/0x2)),_0x4aca68=Math[_0x59dde7(0x847)](..._0x9e9749[_0x59dde7(0x255)](_0x33fffe=>_0x33fffe[_0x59dde7(0x5cb)]()[_0x59dde7(0x47b)]-_0x33fffe['battler']()[_0x59dde7(0x70d)]())),_0x5b463e=Math['max'](..._0x9e9749[_0x59dde7(0x255)](_0x356c7d=>_0x356c7d[_0x59dde7(0x5cb)]()[_0x59dde7(0x47b)])),_0xd712c9=_0x9e9749[_0x59dde7(0x744)](_0x13a2b9=>_0x13a2b9[_0x59dde7(0x72a)]())[_0x59dde7(0x135)],_0x56df1b=_0x9e9749[_0x59dde7(0x744)](_0x1c504d=>_0x1c504d[_0x59dde7(0x7f8)]())[_0x59dde7(0x135)];let _0x12767c=0x0,_0x3ffbe5=0x0;if(_0x4578f2[_0x59dde7(0x7c7)](/front/i))_0x12767c=_0xd712c9>=_0x56df1b?_0x63ad45:_0x5edbed;else{if(_0x4578f2[_0x59dde7(0x7c7)](/middle/i))_0x12767c=(_0x63ad45+_0x5edbed)/0x2,melee=-0x1;else _0x4578f2['match'](/back/i)&&(_0x12767c=_0xd712c9>=_0x56df1b?_0x5edbed:_0x63ad45);}if(_0x4578f2['match'](/head/i))_0x3ffbe5=_0x4aca68;else{if(_0x4578f2[_0x59dde7(0x7c7)](/center/i))_0x3ffbe5=(_0x4aca68+_0x5b463e)/0x2;else _0x4578f2[_0x59dde7(0x7c7)](/base/i)&&(_0x3ffbe5=_0x5b463e);}_0x12767c+=(Graphics['width']-Graphics[_0x59dde7(0x2e4)])/0x2,_0x3ffbe5+=(Graphics[_0x59dde7(0x555)]-Graphics[_0x59dde7(0x30e)])/0x2,_0x12767c+=_0x29459a,_0x3ffbe5+=_0x33f3c3,_0x20826e[_0x59dde7(0x13a)](_0x12767c,_0x3ffbe5,_0x103a57,_0x3625c6,_0x2b8fec);}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x71d),_0x389702=>{const _0x96e6c7=_0x3f1f6b;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x45f689=SceneManager[_0x96e6c7(0x5bb)][_0x96e6c7(0x1b3)];if(!_0x45f689)return;VisuMZ[_0x96e6c7(0x536)](_0x389702,_0x389702);const _0x211e84=_0x389702['X']||0x0,_0x432b35=_0x389702['Y']||0x0,_0x669287=_0x389702[_0x96e6c7(0x42e)]||0x0,_0x542392=_0x389702[_0x96e6c7(0x17c)]||0x0,_0xc92097=_0x389702['Duration']||0x1,_0x284d8a=_0x389702[_0x96e6c7(0x791)]||_0x96e6c7(0x60f);_0x45f689['setupZoomBlurImpactFilter'](_0x669287,_0x211e84,_0x432b35,_0x542392,_0xc92097,_0x284d8a);}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],'ActSeq_Impact_ZoomBlurTargetCenter',_0x51fe73=>{const _0x58a1e6=_0x3f1f6b;if(!Imported[_0x58a1e6(0x840)])return;const _0x146ff8=SceneManager[_0x58a1e6(0x5bb)]['_spriteset'];if(!_0x146ff8)return;VisuMZ[_0x58a1e6(0x536)](_0x51fe73,_0x51fe73);const _0x187c2f=VisuMZ['CreateActionSequenceTargets'](_0x51fe73[_0x58a1e6(0x613)]),_0xf8f8e7=_0x51fe73[_0x58a1e6(0x2d6)],_0x4d3a6a=_0x51fe73[_0x58a1e6(0x1e0)]||0x0,_0x3294a6=_0x51fe73[_0x58a1e6(0x745)]||0x0,_0x458af1=_0x51fe73[_0x58a1e6(0x42e)]||0x0,_0xd7689b=_0x51fe73['Radius']||0x0,_0x42fa84=_0x51fe73[_0x58a1e6(0x33a)]||0x1,_0x51b8a8=_0x51fe73[_0x58a1e6(0x791)]||_0x58a1e6(0x60f),_0xbdd65f=Math[_0x58a1e6(0x847)](..._0x187c2f[_0x58a1e6(0x255)](_0x178833=>_0x178833[_0x58a1e6(0x5cb)]()[_0x58a1e6(0x1d7)]-_0x178833['battler']()[_0x58a1e6(0x454)]()/0x2)),_0x22af8d=Math[_0x58a1e6(0x39f)](..._0x187c2f[_0x58a1e6(0x255)](_0x2c6234=>_0x2c6234['battler']()[_0x58a1e6(0x1d7)]+_0x2c6234[_0x58a1e6(0x5cb)]()[_0x58a1e6(0x454)]()/0x2)),_0x5cde1b=Math[_0x58a1e6(0x847)](..._0x187c2f[_0x58a1e6(0x255)](_0xc63c32=>_0xc63c32[_0x58a1e6(0x5cb)]()[_0x58a1e6(0x47b)]-_0xc63c32[_0x58a1e6(0x5cb)]()['mainSpriteHeight']())),_0x3946b3=Math[_0x58a1e6(0x39f)](..._0x187c2f[_0x58a1e6(0x255)](_0x56b993=>_0x56b993[_0x58a1e6(0x5cb)]()[_0x58a1e6(0x47b)])),_0x2a1273=_0x187c2f[_0x58a1e6(0x744)](_0x2a5dd8=>_0x2a5dd8[_0x58a1e6(0x72a)]())[_0x58a1e6(0x135)],_0x1043ef=_0x187c2f[_0x58a1e6(0x744)](_0x46f964=>_0x46f964[_0x58a1e6(0x7f8)]())[_0x58a1e6(0x135)];let _0x3dfd6a=0x0,_0x31ad13=0x0;if(_0xf8f8e7[_0x58a1e6(0x7c7)](/front/i))_0x3dfd6a=_0x2a1273>=_0x1043ef?_0xbdd65f:_0x22af8d;else{if(_0xf8f8e7[_0x58a1e6(0x7c7)](/middle/i))_0x3dfd6a=(_0xbdd65f+_0x22af8d)/0x2,melee=-0x1;else _0xf8f8e7[_0x58a1e6(0x7c7)](/back/i)&&(_0x3dfd6a=_0x2a1273>=_0x1043ef?_0x22af8d:_0xbdd65f);}if(_0xf8f8e7[_0x58a1e6(0x7c7)](/head/i))_0x31ad13=_0x5cde1b;else{if(_0xf8f8e7['match'](/center/i))_0x31ad13=(_0x5cde1b+_0x3946b3)/0x2;else _0xf8f8e7[_0x58a1e6(0x7c7)](/base/i)&&(_0x31ad13=_0x3946b3);}_0x3dfd6a+=(Graphics['width']-Graphics[_0x58a1e6(0x2e4)])/0x2,_0x31ad13+=(Graphics['height']-Graphics[_0x58a1e6(0x30e)])/0x2,_0x3dfd6a+=_0x4d3a6a,_0x31ad13+=_0x3294a6,_0x146ff8[_0x58a1e6(0x47f)](_0x458af1,_0x3dfd6a,_0x31ad13,_0xd7689b,_0x42fa84,_0x51b8a8);}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x109),_0x4d6bd3=>{const _0x273d62=_0x3f1f6b;if(!SceneManager[_0x273d62(0x497)]())return;VisuMZ['ConvertParams'](_0x4d6bd3,_0x4d6bd3);const _0x562e93=$gameTemp['getLastPluginCommandInterpreter'](),_0x9bd255=BattleManager[_0x273d62(0x13b)],_0x198ff9=BattleManager[_0x273d62(0x633)],_0x368733=BattleManager[_0x273d62(0x6f7)];if(!_0x562e93||!_0x9bd255||!_0x198ff9)return;if(!_0x9bd255[_0x273d62(0x187)]())return;const _0x353a41=VisuMZ[_0x273d62(0x1cd)](_0x4d6bd3[_0x273d62(0x613)]);for(const _0x886c56 of _0x353a41){if(!_0x886c56)continue;_0x368733[_0x273d62(0x547)]('actionEffect',_0x198ff9,_0x886c56);}_0x562e93[_0x273d62(0x46b)]('battlelog');}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x713),_0x4b57f6=>{const _0x25d0a8=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x25d0a8(0x536)](_0x4b57f6,_0x4b57f6);const _0x17da8d=[_0x25d0a8(0x743),'MAXMP',_0x25d0a8(0x20f),_0x25d0a8(0x386),_0x25d0a8(0x664),'MDF','AGI',_0x25d0a8(0x19c)],_0x422ec3=_0x4b57f6[_0x25d0a8(0x781)],_0x3cf7cc=_0x4b57f6[_0x25d0a8(0xf9)],_0x17a5a1=_0x4b57f6[_0x25d0a8(0x1a1)],_0x29e667=VisuMZ['CreateActionSequenceTargets'](_0x4b57f6[_0x25d0a8(0x613)]);for(const _0x32c067 of _0x29e667){if(!_0x32c067)continue;for(const _0x422dda of _0x422ec3){const _0x38530c=_0x17da8d[_0x25d0a8(0x6c5)](_0x422dda[_0x25d0a8(0x23a)]()[_0x25d0a8(0x6da)]());_0x38530c>=0x0&&_0x38530c<=0x7&&_0x32c067[_0x25d0a8(0x648)](_0x38530c,_0x17a5a1);}for(const _0x4785ac of _0x3cf7cc){const _0x401c04=_0x17da8d[_0x25d0a8(0x6c5)](_0x4785ac[_0x25d0a8(0x23a)]()[_0x25d0a8(0x6da)]());_0x401c04>=0x0&&_0x401c04<=0x7&&_0x32c067[_0x25d0a8(0x18a)](_0x401c04,_0x17a5a1);}}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x593),_0xc157d6=>{const _0x4fa905=_0x3f1f6b;if(!SceneManager[_0x4fa905(0x497)]())return;VisuMZ['ConvertParams'](_0xc157d6,_0xc157d6);const _0x5d194c=_0xc157d6[_0x4fa905(0x677)],_0x564b11=VisuMZ[_0x4fa905(0x1cd)](_0xc157d6[_0x4fa905(0x613)]);for(const _0x5eb61f of _0x564b11){if(!_0x5eb61f)continue;for(const _0x57e57e of _0x5d194c){_0x5eb61f[_0x4fa905(0x1d0)](_0x57e57e);}}}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x6d1),_0x52f94b=>{const _0x2a020a=_0x3f1f6b;if(!SceneManager[_0x2a020a(0x497)]())return;VisuMZ[_0x2a020a(0x536)](_0x52f94b,_0x52f94b);const _0x421aa7=BattleManager[_0x2a020a(0x13b)],_0x41a62d={'arPenRate':_0x52f94b['ArPenRate'],'arPenFlat':_0x52f94b[_0x2a020a(0xbe)],'arRedRate':_0x52f94b[_0x2a020a(0x41c)],'arRedFlat':_0x52f94b[_0x2a020a(0x760)]};_0x421aa7[_0x2a020a(0x70f)]=_0x41a62d;}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],'ActSeq_Mechanics_AtbGauge',_0xdb8329=>{const _0x93f278=_0x3f1f6b;if(!SceneManager[_0x93f278(0x497)]())return;if(!Imported['VisuMZ_2_BattleSystemATB'])return;VisuMZ['ConvertParams'](_0xdb8329,_0xdb8329);const _0x3adf8e=VisuMZ['CreateActionSequenceTargets'](_0xdb8329[_0x93f278(0x613)]),_0x735f6b=_0xdb8329['ChargeRate'],_0x36de64=_0xdb8329[_0x93f278(0x64a)],_0x26357b=_0xdb8329[_0x93f278(0x57a)];for(const _0x714897 of _0x3adf8e){if(!_0x714897)continue;if(_0x714897[_0x93f278(0x62c)]())_0x714897['changeAtbChargeTime'](_0x735f6b);else{if(_0x714897[_0x93f278(0x83a)]()){_0x714897[_0x93f278(0x32e)](_0x36de64);if(_0x26357b)_0x714897[_0x93f278(0x116)]();}}}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x6af),_0x4944d9=>{const _0x3851f3=_0x3f1f6b;if(!SceneManager[_0x3851f3(0x497)]())return;if(!Imported[_0x3851f3(0x778)])return;VisuMZ[_0x3851f3(0x536)](_0x4944d9,_0x4944d9);const _0x1f7f0c=VisuMZ['CreateActionSequenceTargets'](_0x4944d9[_0x3851f3(0x613)]),_0x453131=_0x4944d9[_0x3851f3(0x600)];for(const _0x200df6 of _0x1f7f0c){if(!_0x200df6)continue;if(_0x200df6[_0x3851f3(0x4b2)]())continue;if(!_0x200df6[_0x3851f3(0x4e7)]())continue;_0x200df6[_0x3851f3(0x6c0)](_0x453131);}}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],_0x3f1f6b(0x1f7),_0x59df12=>{const _0x4338b3=_0x3f1f6b;if(!SceneManager[_0x4338b3(0x497)]())return;if(!Imported[_0x4338b3(0x778)])return;VisuMZ['ConvertParams'](_0x59df12,_0x59df12);const _0xff8970=VisuMZ['CreateActionSequenceTargets'](_0x59df12[_0x4338b3(0x613)]);for(const _0x2f3820 of _0xff8970){if(!_0x2f3820)continue;if(_0x2f3820[_0x4338b3(0x4b2)]())continue;if(!_0x2f3820[_0x4338b3(0x4e7)]())continue;_0x2f3820['resetBreakShield']();}}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],'ActSeq_Mechanics_BtbGain',_0x445873=>{const _0x57be19=_0x3f1f6b;if(!SceneManager[_0x57be19(0x497)]())return;if(!Imported['VisuMZ_2_BattleSystemBTB'])return;VisuMZ[_0x57be19(0x536)](_0x445873,_0x445873);const _0x4b1507=VisuMZ[_0x57be19(0x1cd)](_0x445873[_0x57be19(0x613)]),_0x2313c0=_0x445873['BravePoints'];for(const _0x15d113 of _0x4b1507){if(!_0x15d113)continue;_0x15d113[_0x57be19(0x472)](_0x2313c0);}}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],'ActSeq_Mechanics_Collapse',_0x1dccee=>{const _0x646646=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x1dccee,_0x1dccee);const _0x4ba8ba=$gameTemp[_0x646646(0x578)](),_0x64631d=BattleManager[_0x646646(0x13b)],_0x164c97=BattleManager[_0x646646(0x633)];if(!_0x4ba8ba||!_0x64631d||!_0x164c97)return;if(!_0x64631d['item']())return;const _0x55e12f=VisuMZ[_0x646646(0x1cd)](_0x1dccee[_0x646646(0x613)]);for(const _0x1a208e of _0x55e12f){if(!_0x1a208e)continue;_0x1dccee[_0x646646(0x132)]&&(_0x1a208e['removeImmortal'](),_0x1a208e['addState'](_0x1a208e['deathStateId']())),_0x1a208e['isDeathStateAffected']()&&_0x1a208e['performCollapse']();}_0x4ba8ba[_0x646646(0x46b)]('battleEffect');}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],'ActSeq_Mechanics_CtbOrder',_0x46e912=>{const _0x33bb6b=_0x3f1f6b;if(!SceneManager[_0x33bb6b(0x497)]())return;if(!Imported[_0x33bb6b(0x4a1)])return;VisuMZ[_0x33bb6b(0x536)](_0x46e912,_0x46e912);const _0x4da9f1=VisuMZ['CreateActionSequenceTargets'](_0x46e912[_0x33bb6b(0x613)]),_0x36483c=_0x46e912[_0x33bb6b(0x341)];for(const _0x17fd0c of _0x4da9f1){if(!_0x17fd0c)continue;_0x17fd0c[_0x33bb6b(0x6b2)](_0x36483c);}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x40b),_0x270ea9=>{const _0x5ca609=_0x3f1f6b;if(!SceneManager[_0x5ca609(0x497)]())return;if(!Imported[_0x5ca609(0x4a1)])return;VisuMZ[_0x5ca609(0x536)](_0x270ea9,_0x270ea9);const _0x4c9f14=VisuMZ[_0x5ca609(0x1cd)](_0x270ea9['Targets']),_0x1905d8=_0x270ea9['ChargeRate'],_0x3440f4=_0x270ea9[_0x5ca609(0x64a)];for(const _0x55c5ed of _0x4c9f14){if(!_0x55c5ed)continue;if(_0x55c5ed['_tpbState']==='charging')_0x55c5ed[_0x5ca609(0x2ab)](_0x1905d8);else _0x55c5ed[_0x5ca609(0x6a9)]==='casting'&&_0x55c5ed[_0x5ca609(0x771)](_0x3440f4);}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x22a),_0x51ae8a=>{const _0x3a64be=_0x3f1f6b;if(!SceneManager[_0x3a64be(0x497)]())return;VisuMZ['ConvertParams'](_0x51ae8a,_0x51ae8a);const _0x192c61=BattleManager[_0x3a64be(0x13b)];if(!_0x192c61)return;let _0x2aba4f=_0x51ae8a[_0x3a64be(0x841)];_0x192c61[_0x3a64be(0x6cb)](_0x2aba4f);}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x5bc),_0x1cf3a5=>{const _0x2fe265=_0x3f1f6b;if(!SceneManager[_0x2fe265(0x497)]())return;VisuMZ['ConvertParams'](_0x1cf3a5,_0x1cf3a5);const _0x57ae6d=VisuMZ[_0x2fe265(0x1cd)](_0x1cf3a5['Targets']);for(const _0x5a454e of _0x57ae6d){if(!_0x5a454e)continue;if(_0x5a454e[_0x2fe265(0x108)]())_0x5a454e[_0x2fe265(0x835)]();}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x7eb),_0x2430e5=>{const _0x99b087=_0x3f1f6b;if(!SceneManager[_0x99b087(0x497)]())return;VisuMZ[_0x99b087(0x536)](_0x2430e5,_0x2430e5);const _0x14d68c=$gameTemp['getLastPluginCommandInterpreter'](),_0x2c90a9=BattleManager[_0x99b087(0x633)],_0xfc7216=_0x2430e5[_0x99b087(0x4a5)];if(!_0x14d68c)return;if(!_0x2c90a9)return;_0x2c90a9&&_0x2c90a9[_0x99b087(0x641)]()&&_0xfc7216[_0x99b087(0x23a)]()['trim']()!==_0x99b087(0x82d)&&_0x14d68c[_0x99b087(0x36e)]([_0xfc7216]);}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x1b9),_0x51d8e8=>{const _0x183353=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_2_BattleSystemFTB'])return;VisuMZ['ConvertParams'](_0x51d8e8,_0x51d8e8);const _0x29b07b=_0x51d8e8[_0x183353(0x238)];BattleManager[_0x183353(0x633)]&&BattleManager['_subject']['friendsUnit']()[_0x183353(0x52f)](_0x29b07b);}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],'ActSeq_Mechanics_HpMpTp',_0x2490b0=>{const _0x3c9115=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x3c9115(0x536)](_0x2490b0,_0x2490b0);const _0x3727d3=VisuMZ['CreateActionSequenceTargets'](_0x2490b0['Targets']),_0x3fc5df=_0x2490b0[_0x3c9115(0x3e3)],_0x10fca2=_0x2490b0[_0x3c9115(0x294)],_0x18e134=_0x2490b0[_0x3c9115(0x1d2)],_0x2fc114=_0x2490b0[_0x3c9115(0x5f9)],_0x23f29e=_0x2490b0[_0x3c9115(0x78c)],_0x386240=_0x2490b0[_0x3c9115(0x72d)],_0x3537f0=_0x2490b0[_0x3c9115(0x73e)];for(const _0x4041a4 of _0x3727d3){if(!_0x4041a4)continue;const _0x504e37=_0x4041a4['isAlive'](),_0x3c4d1f=Math['round'](_0x3fc5df*_0x4041a4[_0x3c9115(0x143)]+_0x10fca2),_0x301aac=Math[_0x3c9115(0x5a7)](_0x18e134*_0x4041a4[_0x3c9115(0x6c3)]+_0x2fc114),_0x10833c=Math[_0x3c9115(0x5a7)](_0x23f29e*_0x4041a4[_0x3c9115(0x49e)]()+_0x386240);if(_0x3c4d1f!==0x0)_0x4041a4['gainHp'](_0x3c4d1f);if(_0x301aac!==0x0)_0x4041a4[_0x3c9115(0x158)](_0x301aac);if(_0x10833c!==0x0)_0x4041a4[_0x3c9115(0x1c3)](_0x10833c);if(_0x3537f0)_0x4041a4[_0x3c9115(0x835)]();_0x504e37&&_0x4041a4[_0x3c9115(0x641)]()&&_0x4041a4[_0x3c9115(0x69d)]();}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x703),_0x5d6551=>{const _0x2b6c85=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x2b6c85(0x536)](_0x5d6551,_0x5d6551);const _0x2d6655=VisuMZ[_0x2b6c85(0x1cd)](_0x5d6551[_0x2b6c85(0x613)]);for(const _0x41d5c7 of _0x2d6655){if(!_0x41d5c7)continue;_0x41d5c7[_0x2b6c85(0x7c2)](_0x5d6551[_0x2b6c85(0x15e)]);}}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x502),_0x27d8b9=>{const _0x480eb4=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x480eb4(0x536)](_0x27d8b9,_0x27d8b9);const _0x10da1a=BattleManager[_0x480eb4(0x13b)],_0x5d21b7={'criticalHitRate':_0x27d8b9[_0x480eb4(0x2c6)],'criticalHitFlat':_0x27d8b9[_0x480eb4(0x6dd)],'criticalDmgRate':_0x27d8b9[_0x480eb4(0x296)],'criticalDmgFlat':_0x27d8b9[_0x480eb4(0x27b)],'damageRate':_0x27d8b9[_0x480eb4(0x3af)],'damageFlat':_0x27d8b9['DamageFlat'],'hitRate':_0x27d8b9[_0x480eb4(0x1aa)],'hitFlat':_0x27d8b9[_0x480eb4(0x2db)]};_0x10da1a['_multipliers']=_0x5d21b7;}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],_0x3f1f6b(0x25b),_0xdf462f=>{const _0x468283=_0x3f1f6b;if(!SceneManager[_0x468283(0x497)]())return;VisuMZ[_0x468283(0x536)](_0xdf462f,_0xdf462f);const _0x5aff63=[_0x468283(0x743),_0x468283(0x134),_0x468283(0x20f),_0x468283(0x386),_0x468283(0x664),_0x468283(0x40f),_0x468283(0x3b4),_0x468283(0x19c)],_0x4d6071=_0xdf462f[_0x468283(0x781)],_0x2b8a9d=_0xdf462f['Debuffs'],_0x38ff99=VisuMZ[_0x468283(0x1cd)](_0xdf462f[_0x468283(0x613)]);for(const _0x11ba0e of _0x38ff99){if(!_0x11ba0e)continue;for(const _0x105a0e of _0x4d6071){const _0x4c0436=_0x5aff63[_0x468283(0x6c5)](_0x105a0e['toUpperCase']()[_0x468283(0x6da)]());_0x4c0436>=0x0&&_0x4c0436<=0x7&&_0x11ba0e['isBuffAffected'](_0x4c0436)&&_0x11ba0e[_0x468283(0x772)](_0x4c0436);}for(const _0x41bcc4 of _0x2b8a9d){const _0x3c3aa8=_0x5aff63[_0x468283(0x6c5)](_0x41bcc4[_0x468283(0x23a)]()['trim']());_0x3c3aa8>=0x0&&_0x3c3aa8<=0x7&&_0x11ba0e[_0x468283(0x7f0)](_0x3c3aa8)&&_0x11ba0e[_0x468283(0x772)](_0x3c3aa8);}}}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],_0x3f1f6b(0x31a),_0x38ee5a=>{const _0x524846=_0x3f1f6b;if(!SceneManager[_0x524846(0x497)]())return;VisuMZ['ConvertParams'](_0x38ee5a,_0x38ee5a);const _0xb09606=_0x38ee5a['States'],_0x3eed3e=VisuMZ['CreateActionSequenceTargets'](_0x38ee5a[_0x524846(0x613)]);for(const _0xc13d1a of _0x3eed3e){if(!_0xc13d1a)continue;for(const _0x2d308a of _0xb09606){_0xc13d1a['removeState'](_0x2d308a);}}}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],_0x3f1f6b(0x64e),_0x2d675a=>{const _0x349ca4=_0x3f1f6b;if(!SceneManager[_0x349ca4(0x497)]())return;if(!Imported[_0x349ca4(0xe4)])return;VisuMZ[_0x349ca4(0x536)](_0x2d675a,_0x2d675a);const _0x5acee0=_0x2d675a[_0x349ca4(0x845)],_0x33e49c=VisuMZ[_0x349ca4(0x1cd)](_0x2d675a[_0x349ca4(0x613)]),_0x285f5f=_0x2d675a[_0x349ca4(0x5ec)],_0x1810d8=_0x2d675a['Exploiter'],_0x479177=_0x2d675a[_0x349ca4(0x5d3)],_0x411144=BattleManager[_0x349ca4(0x13b)];if(_0x5acee0)for(const _0x4fde2b of _0x33e49c){if(!_0x4fde2b)continue;if(_0x4fde2b===user)continue;if(_0x285f5f)_0x4fde2b['setSTBExploited'](![]);_0x4fde2b['becomeSTBExploited'](BattleManager[_0x349ca4(0x633)],_0x411144);}if(_0x1810d8&&BattleManager[_0x349ca4(0x633)]){if(_0x479177)BattleManager[_0x349ca4(0x633)]['setSTBExploited'](![]);const _0x591f74=_0x33e49c[0x0];BattleManager[_0x349ca4(0x2c7)](_0x591f74,_0x411144);}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x113),_0x3ca99d=>{const _0x1baad8=_0x3f1f6b;if(!SceneManager[_0x1baad8(0x497)]())return;if(!Imported['VisuMZ_2_BattleSystemSTB'])return;VisuMZ[_0x1baad8(0x536)](_0x3ca99d,_0x3ca99d);const _0x4d8815=_0x3ca99d[_0x1baad8(0x7d2)];BattleManager['_subject']&&BattleManager[_0x1baad8(0x633)]['stbGainInstant'](_0x4d8815);}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x84e),_0x433231=>{const _0x443a12=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_2_BattleSystemSTB'])return;VisuMZ['ConvertParams'](_0x433231,_0x433231);let _0x48f14f=_0x433231[_0x443a12(0x7d2)];if(BattleManager[_0x443a12(0x633)]){BattleManager['_subject']['_actions']=BattleManager[_0x443a12(0x633)]['_actions']||[];while(_0x48f14f--){if(BattleManager[_0x443a12(0x633)]['_actions'][_0x443a12(0x135)]<=0x0)break;BattleManager['_subject'][_0x443a12(0xf5)][_0x443a12(0x346)]();}}}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],_0x3f1f6b(0x23c),_0x425660=>{const _0x1888da=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x1888da(0x536)](_0x425660,_0x425660);const _0x297fcf=VisuMZ[_0x1888da(0x1cd)](_0x425660[_0x1888da(0x613)]),_0x320791=_0x425660[_0x1888da(0x779)],_0x569f25={'textColor':ColorManager['getColor'](_0x425660[_0x1888da(0x65d)]),'flashColor':_0x425660[_0x1888da(0x3d6)],'flashDuration':_0x425660['FlashDuration']};for(const _0x398b86 of _0x297fcf){if(!_0x398b86)continue;_0x398b86['setupTextPopup'](_0x320791,_0x569f25);}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x479),_0x9aaab8=>{const _0x18ea5d=_0x3f1f6b;if(!SceneManager[_0x18ea5d(0x497)]())return;VisuMZ[_0x18ea5d(0x536)](_0x9aaab8,_0x9aaab8);const _0x7e1c93=VisuMZ['CreateActionSequenceTargets'](_0x9aaab8[_0x18ea5d(0x613)]);let _0xf4f8ea=$gameVariables[_0x18ea5d(0x353)](_0x9aaab8['Variable']);Imported[_0x18ea5d(0x147)]&&_0x9aaab8['DigitGrouping']&&(_0xf4f8ea=VisuMZ['GroupDigits'](_0xf4f8ea));const _0xf250ef=String(_0xf4f8ea),_0x5babf3={'textColor':ColorManager[_0x18ea5d(0x243)](_0x9aaab8[_0x18ea5d(0x65d)]),'flashColor':_0x9aaab8['FlashColor'],'flashDuration':_0x9aaab8[_0x18ea5d(0x48b)]};for(const _0x5b08a2 of _0x7e1c93){if(!_0x5b08a2)continue;_0x5b08a2[_0x18ea5d(0x1f1)](_0xf250ef,_0x5babf3);}}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],'ActSeq_Mechanics_WaitForEffect',_0x5de6ff=>{const _0x4bbd90=_0x3f1f6b;if(!SceneManager[_0x4bbd90(0x497)]())return;const _0x4587b2=$gameTemp[_0x4bbd90(0x578)]();if(!_0x4587b2)return;_0x4587b2[_0x4bbd90(0x46b)](_0x4bbd90(0x65a));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x2ea),_0x567e36=>{const _0x4202a0=_0x3f1f6b;if(!SceneManager[_0x4202a0(0x497)]())return;VisuMZ[_0x4202a0(0x536)](_0x567e36,_0x567e36);const _0xfe92e3=VisuMZ['CreateActionSequenceTargets'](_0x567e36[_0x4202a0(0x613)]);for(const _0x203e53 of _0xfe92e3){if(!_0x203e53)continue;_0x203e53[_0x4202a0(0x5b3)]();}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x415),_0x11b29a=>{const _0x5662e9=_0x3f1f6b;if(!SceneManager[_0x5662e9(0x497)]())return;VisuMZ[_0x5662e9(0x536)](_0x11b29a,_0x11b29a);const _0x95d14e=VisuMZ[_0x5662e9(0x1cd)](_0x11b29a[_0x5662e9(0x613)]),_0x35017d=_0x11b29a[_0x5662e9(0x3be)][_0x5662e9(0x61d)]()[_0x5662e9(0x6da)](),_0x44e716=_0x11b29a[_0x5662e9(0x4ae)],_0x150d09=_0x11b29a[_0x5662e9(0x60a)];for(const _0x1cbab9 of _0x95d14e){if(!_0x1cbab9)continue;_0x1cbab9[_0x5662e9(0x30c)](_0x35017d,_0x44e716,_0x150d09);}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x853),_0x52c235=>{const _0x41acb3=_0x3f1f6b;if(!SceneManager[_0x41acb3(0x497)]())return;VisuMZ[_0x41acb3(0x536)](_0x52c235,_0x52c235);const _0x2c530f=VisuMZ['CreateActionSequenceTargets'](_0x52c235[_0x41acb3(0x613)]),_0x1cbc0d=_0x52c235[_0x41acb3(0x3be)]['toLowerCase']()[_0x41acb3(0x6da)](),_0x1b4f6d=_0x52c235[_0x41acb3(0x4ae)];for(const _0x28615a of _0x2c530f){if(!_0x28615a)continue;if(_0x1cbc0d['match'](/ATTACK[ ](\d+)/i))_0x28615a['performAttackSlot'](Number(RegExp['$1']));else _0x1cbc0d===_0x41acb3(0x763)?_0x28615a[_0x41acb3(0x42b)]():_0x28615a[_0x41acb3(0xfb)](_0x1cbc0d);if(!_0x1b4f6d)_0x28615a[_0x41acb3(0x814)](0x0);else{if(_0x1b4f6d&&[_0x41acb3(0x4f2),_0x41acb3(0x83e),_0x41acb3(0x363)]['includes'](_0x1cbc0d)){}}}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x39a),_0x50ffd9=>{const _0x405cd4=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x405cd4(0x536)](_0x50ffd9,_0x50ffd9);const _0xaeb3d8=BattleManager['_action'];if(!_0xaeb3d8)return;if(!_0xaeb3d8[_0x405cd4(0x187)]())return;const _0x2c6786=VisuMZ[_0x405cd4(0x1cd)](_0x50ffd9[_0x405cd4(0x613)]);for(const _0x21c9ff of _0x2c6786){if(!_0x21c9ff)continue;_0x21c9ff[_0x405cd4(0x6d7)](_0xaeb3d8);}}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],_0x3f1f6b(0x730),_0x28b3a6=>{const _0x1717b2=_0x3f1f6b;if(!SceneManager[_0x1717b2(0x497)]())return;VisuMZ[_0x1717b2(0x536)](_0x28b3a6,_0x28b3a6);const _0x216bef=VisuMZ[_0x1717b2(0x1cd)](_0x28b3a6[_0x1717b2(0x613)]);for(const _0x230b8e of _0x216bef){if(!_0x230b8e)continue;if(!_0x230b8e[_0x1717b2(0x5cb)]())continue;_0x230b8e[_0x1717b2(0x5cb)]()[_0x1717b2(0x636)]();}}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],_0x3f1f6b(0x253),_0x3a36dd=>{const _0xbced9=_0x3f1f6b;if(!SceneManager[_0xbced9(0x497)]())return;VisuMZ[_0xbced9(0x536)](_0x3a36dd,_0x3a36dd);const _0x5b8383=$gameTemp[_0xbced9(0x578)](),_0x753008=_0x3a36dd[_0xbced9(0x811)]*Sprite_Battler['_motionSpeed'];_0x5b8383[_0xbced9(0x18c)](_0x753008);}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x2b3),_0x23be36=>{const _0x4b91fb=_0x3f1f6b;if(!SceneManager[_0x4b91fb(0x497)]())return;VisuMZ['ConvertParams'](_0x23be36,_0x23be36);const _0x18943e=$gameTemp[_0x4b91fb(0x578)](),_0x56ecf2=BattleManager[_0x4b91fb(0x13b)];if(!_0x18943e||!_0x56ecf2)return;if(!_0x56ecf2[_0x4b91fb(0x187)]())return;const _0x421836=VisuMZ['CreateActionSequenceTargets'](_0x23be36[_0x4b91fb(0x613)]);for(const _0x438a28 of _0x421836){if(!_0x438a28)continue;_0x438a28[_0x4b91fb(0x6a1)](_0x56ecf2);}if(_0x23be36['WaitForMovement'])_0x18943e[_0x4b91fb(0x46b)]('battleMove');}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],_0x3f1f6b(0x37b),_0x270314=>{const _0x12ca41=_0x3f1f6b;if(!SceneManager[_0x12ca41(0x497)]())return;if(!$gameSystem['isSideView']())return;VisuMZ[_0x12ca41(0x536)](_0x270314,_0x270314);const _0x4bcb56=VisuMZ[_0x12ca41(0x1cd)](_0x270314[_0x12ca41(0x613)]);let _0x3b8322=_0x270314[_0x12ca41(0x67f)][_0x12ca41(0x7c7)](/back/i);for(const _0x28eea5 of _0x4bcb56){if(!_0x28eea5)continue;if(_0x270314[_0x12ca41(0x67f)][_0x12ca41(0x7c7)](/rand/i))_0x3b8322=Math[_0x12ca41(0x2b0)](0x2);_0x28eea5['setBattlerFlip'](!!_0x3b8322);}}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x4ce),_0x358837=>{const _0x10c603=_0x3f1f6b;if(!SceneManager[_0x10c603(0x497)]())return;if(!$gameSystem[_0x10c603(0x3b9)]())return;VisuMZ[_0x10c603(0x536)](_0x358837,_0x358837);const _0x4f79e7=VisuMZ[_0x10c603(0x1cd)](_0x358837[_0x10c603(0x613)]);let _0x6e337a=_0x358837[_0x10c603(0x2be)];const _0x4d7bdc=_0x358837['FaceAway'];for(const _0x46a6e7 of _0x4f79e7){if(!_0x46a6e7)continue;let _0x494e6e=_0x46a6e7[_0x10c603(0x5cb)]()[_0x10c603(0x1d7)],_0x3f1a19=_0x46a6e7[_0x10c603(0x5cb)]()[_0x10c603(0x47b)];if(_0x6e337a[_0x10c603(0x7c7)](/home/i))_0x494e6e=_0x46a6e7[_0x10c603(0x5cb)]()[_0x10c603(0x3ef)],_0x3f1a19=_0x46a6e7[_0x10c603(0x5cb)]()[_0x10c603(0x733)];else{if(_0x6e337a['match'](/center/i))_0x494e6e=Graphics['boxWidth']/0x2,_0x3f1a19=Graphics[_0x10c603(0x30e)]/0x2;else _0x6e337a[_0x10c603(0x7c7)](/point (\d+), (\d+)/i)&&(_0x494e6e=Number(RegExp['$1']),_0x3f1a19=Number(RegExp['$2']));}_0x46a6e7[_0x10c603(0x6d2)](Math[_0x10c603(0x5a7)](_0x494e6e),Math[_0x10c603(0x5a7)](_0x3f1a19),!!_0x4d7bdc);}}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x251),_0x39b112=>{const _0x31e111=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem['isSideView']())return;VisuMZ[_0x31e111(0x536)](_0x39b112,_0x39b112);const _0x50b999=VisuMZ[_0x31e111(0x1cd)](_0x39b112[_0x31e111(0x4c2)]),_0x2e801d=VisuMZ[_0x31e111(0x1cd)](_0x39b112[_0x31e111(0x44a)]),_0x115c24=_0x2e801d['map'](_0x3290fd=>_0x3290fd&&_0x3290fd[_0x31e111(0x5cb)]()?_0x3290fd[_0x31e111(0x5cb)]()[_0x31e111(0x1d7)]:0x0)/(_0x2e801d[_0x31e111(0x135)]||0x1),_0x9fa26d=_0x2e801d['map'](_0x245bdc=>_0x245bdc&&_0x245bdc[_0x31e111(0x5cb)]()?_0x245bdc[_0x31e111(0x5cb)]()['_baseY']:0x0)/(_0x2e801d[_0x31e111(0x135)]||0x1),_0x1dc33a=_0x39b112[_0x31e111(0x770)];for(const _0x4fe371 of _0x50b999){if(!_0x4fe371)continue;_0x4fe371[_0x31e111(0x6d2)](Math[_0x31e111(0x5a7)](_0x115c24),Math[_0x31e111(0x5a7)](_0x9fa26d),!!_0x1dc33a);}}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x2a9),_0x4781b2=>{const _0x416970=_0x3f1f6b;if(!SceneManager[_0x416970(0x497)]())return;VisuMZ[_0x416970(0x536)](_0x4781b2,_0x4781b2);const _0x2a4e13=$gameTemp[_0x416970(0x578)](),_0x440fdc=VisuMZ[_0x416970(0x1cd)](_0x4781b2[_0x416970(0x613)]),_0x255bb4=_0x4781b2[_0x416970(0x848)],_0x5720c2=_0x4781b2[_0x416970(0x33a)],_0x515330=_0x4781b2[_0x416970(0x791)],_0x56a887=_0x4781b2['WaitForFloat'];if(!_0x2a4e13)return;for(const _0x5c8689 of _0x440fdc){if(!_0x5c8689)continue;_0x5c8689[_0x416970(0x16d)](_0x255bb4,_0x5720c2,_0x515330);}if(_0x56a887)_0x2a4e13[_0x416970(0x46b)](_0x416970(0x84b));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],'ActSeq_Movement_HomeReset',_0x2bd4b0=>{const _0x50ca76=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x2bd4b0,_0x2bd4b0);const _0x250d89=$gameTemp[_0x50ca76(0x578)]();if(!_0x250d89)return;const _0xae488d=VisuMZ[_0x50ca76(0x1cd)](_0x2bd4b0[_0x50ca76(0x613)]);for(const _0x58f83b of _0xae488d){if(!_0x58f83b)continue;_0x58f83b[_0x50ca76(0x48f)](),_0x58f83b[_0x50ca76(0x560)]();}if(_0x2bd4b0[_0x50ca76(0x764)])_0x250d89[_0x50ca76(0x46b)](_0x50ca76(0x56c));}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],'ActSeq_Movement_Jump',_0x18f5d1=>{const _0xfbfa42=_0x3f1f6b;if(!SceneManager[_0xfbfa42(0x497)]())return;VisuMZ[_0xfbfa42(0x536)](_0x18f5d1,_0x18f5d1);const _0x428971=$gameTemp['getLastPluginCommandInterpreter'](),_0x368f55=VisuMZ[_0xfbfa42(0x1cd)](_0x18f5d1['Targets']),_0x12d570=_0x18f5d1[_0xfbfa42(0x848)],_0x4f51f8=_0x18f5d1['Duration'],_0x3b4dac=_0x18f5d1[_0xfbfa42(0x6a0)];if(!_0x428971)return;for(const _0x18c160 of _0x368f55){if(!_0x18c160)continue;_0x18c160[_0xfbfa42(0x54e)](_0x12d570,_0x4f51f8);}if(_0x3b4dac)_0x428971[_0xfbfa42(0x46b)](_0xfbfa42(0x504));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x53e),_0x5a804a=>{const _0x1cdd43=_0x3f1f6b;if(!SceneManager[_0x1cdd43(0x497)]())return;if(!$gameSystem[_0x1cdd43(0x3b9)]())return;VisuMZ[_0x1cdd43(0x536)](_0x5a804a,_0x5a804a);const _0xb69499=$gameTemp[_0x1cdd43(0x578)](),_0x5d61b8=VisuMZ[_0x1cdd43(0x1cd)](_0x5a804a[_0x1cdd43(0x613)]),_0x4e7877=_0x5a804a[_0x1cdd43(0x2b1)],_0x255191=_0x5a804a[_0x1cdd43(0x207)],_0x5e45d3=_0x5a804a['DistanceY'],_0x2a2a0f=_0x5a804a[_0x1cdd43(0x33a)],_0x725b30=_0x5a804a[_0x1cdd43(0x704)],_0x1455c8=_0x5a804a[_0x1cdd43(0x791)],_0x3fe252=_0x5a804a[_0x1cdd43(0x3be)],_0x58bfab=_0x5a804a[_0x1cdd43(0x764)];if(!_0xb69499)return;for(const _0x8859b of _0x5d61b8){if(!_0x8859b)continue;let _0x139c36=_0x255191,_0x27908=_0x5e45d3;if(_0x4e7877[_0x1cdd43(0x7c7)](/horz/i))_0x139c36*=_0x8859b[_0x1cdd43(0x72a)]()?-0x1:0x1;if(_0x4e7877['match'](/vert/i))_0x27908*=_0x8859b[_0x1cdd43(0x72a)]()?-0x1:0x1;_0x8859b[_0x1cdd43(0x697)](_0x139c36,_0x27908,_0x2a2a0f,_0x725b30,_0x1455c8),_0x8859b[_0x1cdd43(0xfb)](_0x3fe252);}if(_0x58bfab)_0xb69499['setWaitMode'](_0x1cdd43(0x56c));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x569),_0x5e9b8f=>{const _0x4b05e8=_0x3f1f6b;if(!SceneManager[_0x4b05e8(0x497)]())return;if(!$gameSystem['isSideView']())return;VisuMZ[_0x4b05e8(0x536)](_0x5e9b8f,_0x5e9b8f);const _0x3be3a8=$gameTemp[_0x4b05e8(0x578)](),_0x3a7bdc=VisuMZ[_0x4b05e8(0x1cd)](_0x5e9b8f[_0x4b05e8(0x613)]),_0x2f4eba=_0x5e9b8f[_0x4b05e8(0x3ea)],_0x5a09dc=_0x5e9b8f['OffsetAdjust'],_0x1570d7=_0x5e9b8f[_0x4b05e8(0x1e0)],_0x3cfb68=_0x5e9b8f[_0x4b05e8(0x745)],_0x487f6b=_0x5e9b8f[_0x4b05e8(0x33a)],_0x3e6ba4=_0x5e9b8f[_0x4b05e8(0x704)],_0x4eddb3=_0x5e9b8f[_0x4b05e8(0x791)],_0xdc4ef3=_0x5e9b8f[_0x4b05e8(0x3be)],_0x51fad3=_0x5e9b8f['WaitForMovement'];if(!_0x3be3a8)return;for(const _0x161595 of _0x3a7bdc){if(!_0x161595)continue;let _0x42d993=_0x161595['battler']()[_0x4b05e8(0x1d7)],_0x1a0dcc=_0x161595[_0x4b05e8(0x5cb)]()[_0x4b05e8(0x47b)];if(_0x2f4eba[_0x4b05e8(0x7c7)](/home/i))_0x42d993=_0x161595[_0x4b05e8(0x5cb)]()[_0x4b05e8(0x3ef)],_0x1a0dcc=_0x161595['battler']()[_0x4b05e8(0x733)];else{if(_0x2f4eba[_0x4b05e8(0x7c7)](/center/i))_0x42d993=Graphics[_0x4b05e8(0x2e4)]/0x2,_0x1a0dcc=Graphics['boxHeight']/0x2;else _0x2f4eba[_0x4b05e8(0x7c7)](/point (\d+), (\d+)/i)&&(_0x42d993=Number(RegExp['$1']),_0x1a0dcc=Number(RegExp['$2']));}if(_0x5a09dc[_0x4b05e8(0x7c7)](/none/i))_0x42d993+=_0x1570d7,_0x1a0dcc+=_0x3cfb68;else{if(_0x5a09dc[_0x4b05e8(0x7c7)](/horz/i)&&_0x5a09dc[_0x4b05e8(0x7c7)](/vert/i))_0x42d993+=_0x161595['isActor']()?-_0x1570d7:_0x1570d7,_0x1a0dcc+=_0x161595[_0x4b05e8(0x72a)]()?-_0x3cfb68:_0x3cfb68;else{if(_0x5a09dc['match'](/horz/i))_0x42d993+=_0x161595[_0x4b05e8(0x72a)]()?-_0x1570d7:_0x1570d7,_0x1a0dcc+=_0x3cfb68;else _0x5a09dc[_0x4b05e8(0x7c7)](/vert/i)&&(_0x42d993+=_0x1570d7,_0x1a0dcc+=_0x161595['isActor']()?-_0x3cfb68:_0x3cfb68);}}_0x161595['moveBattlerToPoint'](_0x42d993,_0x1a0dcc,_0x487f6b,_0x3e6ba4,_0x4eddb3,-0x1),_0x161595['requestMotion'](_0xdc4ef3);}if(_0x51fad3)_0x3be3a8[_0x4b05e8(0x46b)](_0x4b05e8(0x56c));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x55c),_0x4a3e43=>{const _0x1d6d74=_0x3f1f6b;if(!SceneManager[_0x1d6d74(0x497)]())return;if(!$gameSystem[_0x1d6d74(0x3b9)]())return;VisuMZ['ConvertParams'](_0x4a3e43,_0x4a3e43);const _0x4c0c4a=$gameTemp['getLastPluginCommandInterpreter'](),_0x583fe1=VisuMZ['CreateActionSequenceTargets'](_0x4a3e43[_0x1d6d74(0x4c2)]),_0x1b312f=VisuMZ[_0x1d6d74(0x1cd)](_0x4a3e43[_0x1d6d74(0x44a)]),_0x3f252f=_0x4a3e43['TargetLocation'];let _0x3a1486=_0x4a3e43['MeleeDistance'];const _0x4a41c7=_0x4a3e43['OffsetAdjust'],_0x234da9=_0x4a3e43[_0x1d6d74(0x1e0)],_0x2c08fd=_0x4a3e43['OffsetY'],_0x1b2271=_0x4a3e43['Duration'],_0x317456=_0x4a3e43[_0x1d6d74(0x704)],_0x218189=_0x4a3e43[_0x1d6d74(0x791)],_0x4fee56=_0x4a3e43[_0x1d6d74(0x3be)],_0x222e43=_0x4a3e43[_0x1d6d74(0x764)],_0x336a3d=Math[_0x1d6d74(0x847)](..._0x1b312f[_0x1d6d74(0x255)](_0x11ff8f=>_0x11ff8f['battler']()[_0x1d6d74(0x1d7)]-_0x11ff8f['battler']()['mainSpriteWidth']()/0x2)),_0x57bab4=Math[_0x1d6d74(0x39f)](..._0x1b312f[_0x1d6d74(0x255)](_0x3295c0=>_0x3295c0[_0x1d6d74(0x5cb)]()[_0x1d6d74(0x1d7)]+_0x3295c0[_0x1d6d74(0x5cb)]()[_0x1d6d74(0x454)]()/0x2)),_0x36e6ba=Math['min'](..._0x1b312f[_0x1d6d74(0x255)](_0x1c7250=>_0x1c7250[_0x1d6d74(0x5cb)]()[_0x1d6d74(0x47b)]-_0x1c7250['battler']()['mainSpriteHeight']())),_0x460648=Math['max'](..._0x1b312f['map'](_0x51eafb=>_0x51eafb[_0x1d6d74(0x5cb)]()[_0x1d6d74(0x47b)])),_0xd3368f=_0x1b312f[_0x1d6d74(0x744)](_0x4eed17=>_0x4eed17[_0x1d6d74(0x72a)]())[_0x1d6d74(0x135)],_0x443cd3=_0x1b312f[_0x1d6d74(0x744)](_0x3bae7e=>_0x3bae7e[_0x1d6d74(0x7f8)]())['length'];let _0x17710e=0x0,_0x13b3ac=0x0;if(_0x3f252f[_0x1d6d74(0x7c7)](/front/i))_0x17710e=_0xd3368f>=_0x443cd3?_0x336a3d:_0x57bab4;else{if(_0x3f252f[_0x1d6d74(0x7c7)](/middle/i))_0x17710e=(_0x336a3d+_0x57bab4)/0x2,_0x3a1486=-0x1;else _0x3f252f['match'](/back/i)&&(_0x17710e=_0xd3368f>=_0x443cd3?_0x57bab4:_0x336a3d);}if(_0x3f252f[_0x1d6d74(0x7c7)](/head/i))_0x13b3ac=_0x36e6ba;else{if(_0x3f252f[_0x1d6d74(0x7c7)](/center/i))_0x13b3ac=(_0x36e6ba+_0x460648)/0x2;else _0x3f252f['match'](/base/i)&&(_0x13b3ac=_0x460648);}if(!_0x4c0c4a)return;for(const _0x3296be of _0x583fe1){if(!_0x3296be)continue;let _0x24a47a=_0x17710e,_0x25cdd7=_0x13b3ac;if(_0x4a41c7[_0x1d6d74(0x7c7)](/none/i))_0x24a47a+=_0x234da9,_0x25cdd7+=_0x2c08fd;else{if(_0x4a41c7['match'](/horz/i)&&_0x4a41c7['match'](/vert/i))_0x24a47a+=_0x3296be[_0x1d6d74(0x72a)]()?-_0x234da9:_0x234da9,_0x25cdd7+=_0x3296be[_0x1d6d74(0x72a)]()?-_0x2c08fd:_0x2c08fd;else{if(_0x4a41c7[_0x1d6d74(0x7c7)](/horz/i))_0x24a47a+=_0x3296be[_0x1d6d74(0x72a)]()?-_0x234da9:_0x234da9,_0x25cdd7+=_0x2c08fd;else _0x4a41c7[_0x1d6d74(0x7c7)](/vert/i)&&(_0x24a47a+=_0x234da9,_0x25cdd7+=_0x3296be[_0x1d6d74(0x72a)]()?-_0x2c08fd:_0x2c08fd);}}_0x3296be[_0x1d6d74(0x4b8)](_0x24a47a,_0x25cdd7,_0x1b2271,_0x317456,_0x218189,_0x3a1486),_0x3296be['requestMotion'](_0x4fee56);}if(_0x222e43)_0x4c0c4a['setWaitMode'](_0x1d6d74(0x56c));}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x28b),_0x1ee1ef=>{const _0x392ba6=_0x3f1f6b;if(!SceneManager[_0x392ba6(0x497)]())return;VisuMZ[_0x392ba6(0x536)](_0x1ee1ef,_0x1ee1ef);const _0x2b0cd3=$gameTemp[_0x392ba6(0x578)](),_0x1e2ea0=VisuMZ[_0x392ba6(0x1cd)](_0x1ee1ef[_0x392ba6(0x613)]),_0x5bf708=_0x1ee1ef['Opacity'],_0xa577b4=_0x1ee1ef[_0x392ba6(0x33a)],_0x1b04c9=_0x1ee1ef[_0x392ba6(0x791)],_0x146294=_0x1ee1ef[_0x392ba6(0x580)];if(!_0x2b0cd3)return;for(const _0x46a069 of _0x1e2ea0){if(!_0x46a069)continue;_0x46a069[_0x392ba6(0x246)](_0x5bf708,_0xa577b4,_0x1b04c9);}if(_0x146294)_0x2b0cd3[_0x392ba6(0x46b)]('battleOpacity');}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],_0x3f1f6b(0x446),_0xc2d0fa=>{const _0xc09524=_0x3f1f6b;if(!SceneManager[_0xc09524(0x497)]())return;VisuMZ[_0xc09524(0x536)](_0xc2d0fa,_0xc2d0fa);const _0x2671bb=$gameTemp[_0xc09524(0x578)](),_0x14b894=VisuMZ[_0xc09524(0x1cd)](_0xc2d0fa[_0xc09524(0x613)]),_0x58da30=_0xc2d0fa[_0xc09524(0x1cb)],_0x294538=_0xc2d0fa[_0xc09524(0x7d9)],_0x3a9e7a=_0xc2d0fa[_0xc09524(0x33a)],_0x29555b=_0xc2d0fa[_0xc09524(0x791)],_0x5e9c95=_0xc2d0fa[_0xc09524(0x7a7)];if(!_0x2671bb)return;for(const _0x1e7888 of _0x14b894){if(!_0x1e7888)continue;_0x1e7888[_0xc09524(0x474)](_0x58da30,_0x294538,_0x3a9e7a,_0x29555b);}if(_0x5e9c95)_0x2671bb[_0xc09524(0x46b)]('battleGrow');}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x401),_0x10c2d2=>{const _0x16d6f5=_0x3f1f6b;if(!SceneManager[_0x16d6f5(0x497)]())return;VisuMZ['ConvertParams'](_0x10c2d2,_0x10c2d2);const _0x25f913=$gameTemp[_0x16d6f5(0x578)](),_0xa7d40=VisuMZ[_0x16d6f5(0x1cd)](_0x10c2d2[_0x16d6f5(0x613)]),_0x59f587=_0x10c2d2[_0x16d6f5(0x3ca)],_0x42c250=_0x10c2d2[_0x16d6f5(0x838)],_0x2b0997=_0x10c2d2[_0x16d6f5(0x33a)],_0x5a6282=_0x10c2d2[_0x16d6f5(0x791)],_0x54cdf4=_0x10c2d2['WaitForSkew'];if(!_0x25f913)return;for(const _0x2b6fef of _0xa7d40){if(!_0x2b6fef)continue;_0x2b6fef[_0x16d6f5(0x219)](_0x59f587,_0x42c250,_0x2b0997,_0x5a6282);}if(_0x54cdf4)_0x25f913['setWaitMode'](_0x16d6f5(0x77c));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x3a4),_0x5b0232=>{const _0x1df184=_0x3f1f6b;if(!SceneManager[_0x1df184(0x497)]())return;VisuMZ[_0x1df184(0x536)](_0x5b0232,_0x5b0232);const _0x292990=$gameTemp[_0x1df184(0x578)](),_0x1fffad=VisuMZ[_0x1df184(0x1cd)](_0x5b0232[_0x1df184(0x613)]),_0x2710db=_0x5b0232['Angle'],_0x42c331=_0x5b0232[_0x1df184(0x33a)],_0x50640f=_0x5b0232['EasingType'],_0x376831=_0x5b0232[_0x1df184(0x5ee)],_0x16d4e1=_0x5b0232[_0x1df184(0xba)];if(!_0x292990)return;for(const _0x10b6d4 of _0x1fffad){if(!_0x10b6d4)continue;_0x10b6d4['spinBattler'](_0x2710db,_0x42c331,_0x50640f,_0x376831);}if(_0x16d4e1)_0x292990[_0x1df184(0x46b)]('battleSpin');}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x718),_0x5354ab=>{const _0x3bff66=_0x3f1f6b;if(!SceneManager[_0x3bff66(0x497)]())return;const _0x19e6a6=$gameTemp[_0x3bff66(0x578)]();if(!_0x19e6a6)return;_0x19e6a6[_0x3bff66(0x46b)](_0x3bff66(0x84b));}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x7b2),_0x40f8a3=>{const _0x119050=_0x3f1f6b;if(!SceneManager[_0x119050(0x497)]())return;const _0x1c3c85=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x1c3c85)return;_0x1c3c85[_0x119050(0x46b)](_0x119050(0x504));}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],'ActSeq_Movement_WaitForMovement',_0x54a3cb=>{const _0x38198d=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;const _0x1105e7=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x1105e7)return;_0x1105e7[_0x38198d(0x46b)](_0x38198d(0x56c));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x40a),_0x2b6065=>{const _0x368807=_0x3f1f6b;if(!SceneManager[_0x368807(0x497)]())return;const _0x26bbeb=$gameTemp[_0x368807(0x578)]();if(!_0x26bbeb)return;_0x26bbeb['setWaitMode'](_0x368807(0x4fa));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x813),_0x5acdbd=>{const _0x48ce94=_0x3f1f6b;if(!SceneManager[_0x48ce94(0x497)]())return;const _0x158207=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x158207)return;_0x158207[_0x48ce94(0x46b)](_0x48ce94(0x1a8));}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],'ActSeq_Movement_WaitForSkew',_0x36578b=>{const _0x2dd463=_0x3f1f6b;if(!SceneManager[_0x2dd463(0x497)]())return;const _0x3920df=$gameTemp[_0x2dd463(0x578)]();if(!_0x3920df)return;_0x3920df['setWaitMode'](_0x2dd463(0x77c));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],'ActSeq_Movement_WaitForSpin',_0x248a19=>{const _0x3a5097=_0x3f1f6b;if(!SceneManager[_0x3a5097(0x497)]())return;const _0x4c9419=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x4c9419)return;_0x4c9419['setWaitMode'](_0x3a5097(0x624));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x16b),_0x4d9adc=>{const _0x3c6cb8=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_3_ActSeqProjectiles'])return;VisuMZ[_0x3c6cb8(0x536)](_0x4d9adc,_0x4d9adc);const _0x3d025c=$gameTemp[_0x3c6cb8(0x578)](),_0x53261d=_0x4d9adc[_0x3c6cb8(0x6fd)];if(!_0x3d025c)return;const _0x49f419=BattleManager[_0x3c6cb8(0x1b3)];if(!_0x49f419)return;_0x49f419[_0x3c6cb8(0x850)](_0x4d9adc);if(_0x53261d)_0x3d025c[_0x3c6cb8(0x46b)]('battleProjectiles');}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x65b),_0x17f912=>{const _0x34a38a=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x34a38a(0x12a)])return;VisuMZ[_0x34a38a(0x536)](_0x17f912,_0x17f912);const _0x816e81=$gameTemp[_0x34a38a(0x578)](),_0x23ae2d=_0x17f912['WaitForProjectile'];if(!_0x816e81)return;const _0x247edd=BattleManager[_0x34a38a(0x1b3)];if(!_0x247edd)return;_0x247edd[_0x34a38a(0x850)](_0x17f912);if(_0x23ae2d)_0x816e81[_0x34a38a(0x46b)]('battleProjectiles');}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x137),_0x385ac7=>{const _0x1ff74c=_0x3f1f6b;if(!SceneManager[_0x1ff74c(0x497)]())return;if(!Imported['VisuMZ_3_ActSeqProjectiles'])return;VisuMZ[_0x1ff74c(0x536)](_0x385ac7,_0x385ac7);const _0x14f0d7=$gameTemp[_0x1ff74c(0x578)](),_0x419736=_0x385ac7[_0x1ff74c(0x6fd)];if(!_0x14f0d7)return;const _0x4d45d8=BattleManager['_spriteset'];if(!_0x4d45d8)return;_0x4d45d8['createActionSequenceProjectile'](_0x385ac7);if(_0x419736)_0x14f0d7[_0x1ff74c(0x46b)](_0x1ff74c(0xc9));}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],_0x3f1f6b(0x212),_0x254023=>{const _0x5ce76f=_0x3f1f6b;if(!SceneManager[_0x5ce76f(0x497)]())return;if(!Imported[_0x5ce76f(0x7f4)])return;VisuMZ['ConvertParams'](_0x254023,_0x254023);const _0x240a12=$gameTemp[_0x5ce76f(0x578)](),_0x3abfca=_0x254023['WaitForSkew'];if(!_0x240a12)return;$gameScreen['setBattleSkew'](_0x254023[_0x5ce76f(0x3ca)],_0x254023[_0x5ce76f(0x838)],_0x254023[_0x5ce76f(0x33a)],_0x254023[_0x5ce76f(0x791)]);if(_0x3abfca)_0x240a12[_0x5ce76f(0x46b)](_0x5ce76f(0x242));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x2a5),_0x3ef0b3=>{const _0x3fdfcc=_0x3f1f6b;if(!SceneManager[_0x3fdfcc(0x497)]())return;if(!Imported[_0x3fdfcc(0x7f4)])return;VisuMZ[_0x3fdfcc(0x536)](_0x3ef0b3,_0x3ef0b3);const _0xe50b30=$gameTemp['getLastPluginCommandInterpreter'](),_0x2ae2c6=_0x3ef0b3[_0x3fdfcc(0x753)];if(!_0xe50b30)return;$gameScreen[_0x3fdfcc(0x64b)](0x0,0x0,_0x3ef0b3['Duration'],_0x3ef0b3['EasingType']);if(_0x2ae2c6)_0xe50b30[_0x3fdfcc(0x46b)](_0x3fdfcc(0x242));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x65e),_0x3d64a5=>{const _0x5d8252=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x5d8252(0x7f4)])return;const _0x4856f0=$gameTemp[_0x5d8252(0x578)]();if(!_0x4856f0)return;_0x4856f0['setWaitMode'](_0x5d8252(0x242));}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x383),_0x3650ae=>{const _0x22fca2=_0x3f1f6b;if(!SceneManager[_0x22fca2(0x497)]())return;VisuMZ[_0x22fca2(0x536)](_0x3650ae,_0x3650ae);const _0x4aa0ed=$gameTemp[_0x22fca2(0x578)](),_0x43d934=_0x3650ae[_0x22fca2(0x673)],_0x38b6f8=_0x3650ae['JumpToLabel'];if(!_0x4aa0ed)return;BattleManager[_0x22fca2(0x3ec)]=_0x43d934,BattleManager[_0x22fca2(0x455)]=BattleManager[_0x22fca2(0x208)]?BattleManager[_0x22fca2(0x208)][BattleManager[_0x22fca2(0x3ec)]]||null:null,BattleManager[_0x22fca2(0x455)]&&_0x38b6f8['toUpperCase']()[_0x22fca2(0x6da)]()!=='UNTITLED'&&_0x4aa0ed[_0x22fca2(0x36e)]([_0x38b6f8]);}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x1ef),_0x132601=>{const _0x181b89=_0x3f1f6b;if(!SceneManager[_0x181b89(0x497)]())return;VisuMZ[_0x181b89(0x536)](_0x132601,_0x132601);const _0x53df57=$gameTemp[_0x181b89(0x578)](),_0x107273=_0x132601[_0x181b89(0x4a5)];if(!_0x53df57)return;BattleManager['_targetIndex']++,BattleManager['_target']=BattleManager[_0x181b89(0x208)][BattleManager[_0x181b89(0x3ec)]]||null,BattleManager[_0x181b89(0x455)]&&_0x107273[_0x181b89(0x23a)]()[_0x181b89(0x6da)]()!==_0x181b89(0x82d)&&_0x53df57[_0x181b89(0x36e)]([_0x107273]);}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],'ActSeq_Target_PrevTarget',_0x5f4e37=>{const _0x404a22=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x404a22(0x536)](_0x5f4e37,_0x5f4e37);const _0x1385e0=$gameTemp[_0x404a22(0x578)](),_0x2594de=_0x5f4e37['JumpToLabel'];if(!_0x1385e0)return;BattleManager[_0x404a22(0x3ec)]--,BattleManager[_0x404a22(0x455)]=BattleManager[_0x404a22(0x208)][BattleManager['_targetIndex']]||null,BattleManager[_0x404a22(0x455)]&&_0x2594de[_0x404a22(0x23a)]()[_0x404a22(0x6da)]()!==_0x404a22(0x82d)&&_0x1385e0[_0x404a22(0x36e)]([_0x2594de]);}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x7ca),_0x1f2df4=>{const _0x55c807=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x55c807(0x536)](_0x1f2df4,_0x1f2df4);const _0x1d6e67=$gameTemp[_0x55c807(0x578)](),_0x5e7b1a=_0x1f2df4['ForceRandom'],_0x71e09c=_0x1f2df4[_0x55c807(0x4a5)];if(!_0x1d6e67)return;const _0x12dc38=BattleManager['_targetIndex'];for(;;){BattleManager[_0x55c807(0x3ec)]=Math['randomInt'](BattleManager['_allTargets'][_0x55c807(0x135)]);if(!_0x5e7b1a)break;if(BattleManager['_targetIndex']!==_0x12dc38)break;if(BattleManager[_0x55c807(0x208)][_0x55c807(0x135)]<=0x1){BattleManager[_0x55c807(0x3ec)]=0x0;break;}}BattleManager[_0x55c807(0x455)]=BattleManager[_0x55c807(0x208)][BattleManager[_0x55c807(0x3ec)]]||null,BattleManager[_0x55c807(0x455)]&&_0x71e09c[_0x55c807(0x23a)]()[_0x55c807(0x6da)]()!==_0x55c807(0x82d)&&_0x1d6e67[_0x55c807(0x36e)]([_0x71e09c]);}),PluginManager['registerCommand'](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x4f5),_0x38085d=>{const _0x319d58=_0x3f1f6b;if(!SceneManager[_0x319d58(0x497)]())return;VisuMZ[_0x319d58(0x536)](_0x38085d,_0x38085d);const _0x5cf553=VisuMZ[_0x319d58(0x1cd)](_0x38085d[_0x319d58(0x613)]);for(const _0x12e3fa of _0x5cf553){if(!_0x12e3fa)continue;if(!_0x12e3fa['isActor']())continue;_0x12e3fa['clearActiveWeaponSlot']();}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0xeb),_0x52eddb=>{const _0x31f697=_0x3f1f6b;if(!SceneManager[_0x31f697(0x497)]())return;VisuMZ[_0x31f697(0x536)](_0x52eddb,_0x52eddb);const _0x4ca618=$gameTemp[_0x31f697(0x578)]();let _0x2b7826=![];const _0x1a13a6=_0x52eddb[_0x31f697(0x4a5)],_0x51e537=VisuMZ[_0x31f697(0x1cd)](_0x52eddb['Targets']);for(const _0x54d00b of _0x51e537){if(!_0x54d00b)continue;if(!_0x54d00b[_0x31f697(0x72a)]())continue;_0x54d00b[_0x31f697(0x1f2)](),_0x54d00b['weapons']()[_0x31f697(0x135)]>0x0?_0x2b7826=!![]:_0x54d00b[_0x31f697(0x79a)]();}_0x2b7826&&_0x1a13a6['toUpperCase']()[_0x31f697(0x6da)]()!==_0x31f697(0x82d)&&_0x4ca618['command119']([_0x1a13a6]);}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x267),_0x2f80bc=>{const _0x50cb4a=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x50cb4a(0x536)](_0x2f80bc,_0x2f80bc);let _0x35255d=_0x2f80bc['SlotID'];_0x35255d--,_0x35255d=Math[_0x50cb4a(0x39f)](_0x35255d,0x0);const _0x5067f6=VisuMZ[_0x50cb4a(0x1cd)](_0x2f80bc['Targets']);for(const _0x4de096 of _0x5067f6){if(!_0x4de096)continue;if(!_0x4de096['isActor']())continue;_0x4de096[_0x50cb4a(0x78a)](_0x35255d);}}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],'ActSeq_Zoom_Scale',_0x46542b=>{const _0x434f51=_0x3f1f6b;if(!SceneManager[_0x434f51(0x497)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ['ConvertParams'](_0x46542b,_0x46542b);const _0x436aa0=$gameTemp[_0x434f51(0x578)](),_0x53df54=_0x46542b['WaitForZoom'];if(!_0x436aa0)return;$gameScreen[_0x434f51(0x4ab)](_0x46542b['Scale'],_0x46542b[_0x434f51(0x33a)],_0x46542b[_0x434f51(0x791)]);if(_0x53df54)_0x436aa0['setWaitMode'](_0x434f51(0x76f));}),PluginManager[_0x3f1f6b(0xf8)](pluginData['name'],'ActSeq_Zoom_Reset',_0x4a2cae=>{const _0x17b3d4=_0x3f1f6b;if(!SceneManager[_0x17b3d4(0x497)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x17b3d4(0x536)](_0x4a2cae,_0x4a2cae);const _0x5b74bd=$gameTemp[_0x17b3d4(0x578)](),_0x36289b=_0x4a2cae[_0x17b3d4(0x1b2)];if(!_0x5b74bd)return;$gameScreen[_0x17b3d4(0x4ab)](0x1,_0x4a2cae[_0x17b3d4(0x33a)],_0x4a2cae['EasingType']);if(_0x36289b)_0x5b74bd['setWaitMode'](_0x17b3d4(0x76f));}),PluginManager[_0x3f1f6b(0xf8)](pluginData[_0x3f1f6b(0x528)],_0x3f1f6b(0x52b),_0x33e919=>{const _0x1d4724=_0x3f1f6b;if(!SceneManager[_0x1d4724(0x497)]())return;if(!Imported[_0x1d4724(0x7f4)])return;const _0x488178=$gameTemp[_0x1d4724(0x578)]();if(!_0x488178)return;_0x488178['setWaitMode'](_0x1d4724(0x76f));}),VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x71e)]=Scene_Boot[_0x3f1f6b(0x457)][_0x3f1f6b(0x4d3)],Scene_Boot[_0x3f1f6b(0x457)][_0x3f1f6b(0x4d3)]=function(){const _0x19e5ee=_0x3f1f6b;this[_0x19e5ee(0x3f6)](),this[_0x19e5ee(0x445)](),this['process_VisuMZ_BattleCore_DamageStyles'](),this[_0x19e5ee(0x5a1)](),VisuMZ[_0x19e5ee(0x32d)]['Scene_Boot_onDatabaseLoaded'][_0x19e5ee(0x131)](this),this[_0x19e5ee(0x2c2)](),this[_0x19e5ee(0x63f)]();},Scene_Boot[_0x3f1f6b(0x457)]['process_VisuMZ_BattleCore_Notetags']=function(){if(VisuMZ['ParseAllNotetags'])return;this['process_VisuMZ_BattleCore_Action_Notetags'](),this['process_VisuMZ_BattleCore_TraitObject_Notetags'](),this['process_VisuMZ_BattleCore_jsFunctions']();},Scene_Boot[_0x3f1f6b(0x457)][_0x3f1f6b(0x3f6)]=function(){const _0x229bb3=_0x3f1f6b,_0x113047=$dataSystem[_0x229bb3(0x46c)][_0x229bb3(0x135)];for(let _0x533318=0x0;_0x533318<_0x113047;_0x533318++){const _0x2f542e=$dataSystem[_0x229bb3(0x727)][_0x533318];if(_0x2f542e)continue;$dataSystem[_0x229bb3(0x727)][_0x533318]=JsonEx[_0x229bb3(0x6a7)]($dataSystem[_0x229bb3(0x727)][0x0]);}},Scene_Boot[_0x3f1f6b(0x457)][_0x3f1f6b(0x445)]=function(){const _0x48b5e4=_0x3f1f6b,_0x27c208=VisuMZ['BattleCore'][_0x48b5e4(0x3e9)];_0x27c208['Damage'][_0x48b5e4(0x421)]===undefined&&(_0x27c208[_0x48b5e4(0x282)][_0x48b5e4(0x421)]='base'),_0x27c208[_0x48b5e4(0xf3)]['SmoothImage']===undefined&&(_0x27c208['Actor'][_0x48b5e4(0x45d)]=![]),_0x27c208['Enemy'][_0x48b5e4(0x45d)]===undefined&&(_0x27c208[_0x48b5e4(0x5c6)]['SmoothImage']=!![]),_0x27c208['Actor'][_0x48b5e4(0x3de)]===undefined&&(_0x27c208['Actor'][_0x48b5e4(0x3de)]=![]),_0x27c208['Actor'][_0x48b5e4(0x726)]===undefined&&(_0x27c208[_0x48b5e4(0xf3)][_0x48b5e4(0x726)]=!![]);},VisuMZ[_0x3f1f6b(0x6ee)]={},Scene_Boot[_0x3f1f6b(0x457)][_0x3f1f6b(0x100)]=function(){const _0x87effe=_0x3f1f6b;for(const _0x579204 of VisuMZ[_0x87effe(0x32d)][_0x87effe(0x3e9)][_0x87effe(0x282)][_0x87effe(0x672)]){if(!_0x579204)continue;const _0x257a65=_0x579204[_0x87effe(0x323)][_0x87effe(0x23a)]()['trim']();VisuMZ[_0x87effe(0x6ee)][_0x257a65]=_0x579204;}},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x156)]={},Scene_Boot[_0x3f1f6b(0x457)][_0x3f1f6b(0x5a1)]=function(){const _0x1c4ae6=_0x3f1f6b,_0x5da85d=VisuMZ[_0x1c4ae6(0x32d)]['RegExp'],_0x408e5f='<%1>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1>',_0x445248=[[_0x1c4ae6(0x628),'PRE-'],['Post',_0x1c4ae6(0x702)]],_0x377db6=[['%1Apply%2JS',_0x1c4ae6(0x6d3)],['%1Damage%2JS',_0x1c4ae6(0x3d0)]],_0x508dab=[['',''],[_0x1c4ae6(0x4ef),'AS\x20USER'],[_0x1c4ae6(0x83d),_0x1c4ae6(0x463)]];for(const _0xf12005 of _0x377db6){for(const _0xb26006 of _0x508dab){for(const _0x3a9c70 of _0x445248){const _0x1defd2=_0xf12005[0x0]['format'](_0x3a9c70[0x0],_0xb26006[0x0]),_0x1a3653=_0xf12005[0x1][_0x1c4ae6(0xb7)](_0x3a9c70[0x1],_0xb26006[0x1])[_0x1c4ae6(0x6da)](),_0x5cf3b2=new RegExp(_0x408e5f['format'](_0x1a3653),'i');_0x5da85d[_0x1defd2]=_0x5cf3b2;}}}const _0x32ae4d=[[_0x1c4ae6(0x816),_0x1c4ae6(0x466)],[_0x1c4ae6(0x186),'JS\x20%1END\x20ACTION']];for(const _0x152c71 of _0x32ae4d){for(const _0x5bb613 of _0x445248){const _0x126a5a=_0x152c71[0x0][_0x1c4ae6(0xb7)](_0x5bb613[0x0]),_0x193273=_0x152c71[0x1]['format'](_0x5bb613[0x1]),_0x49a653=new RegExp(_0x408e5f['format'](_0x193273),'i');_0x5da85d[_0x126a5a]=_0x49a653;}}const _0x1eaf53=[[_0x1c4ae6(0x19f),_0x1c4ae6(0x834)],[_0x1c4ae6(0xd2),_0x1c4ae6(0x42a)],[_0x1c4ae6(0x575),_0x1c4ae6(0x667)],[_0x1c4ae6(0x2b2),_0x1c4ae6(0x339)],['EscapeSuccessJS',_0x1c4ae6(0x2e8)],['EscapeFailureJS',_0x1c4ae6(0x62e)],[_0x1c4ae6(0x11d),_0x1c4ae6(0x14f)],[_0x1c4ae6(0x614),'JS\x20%1END\x20TURN'],[_0x1c4ae6(0x3f0),_0x1c4ae6(0x742)]];for(const _0x2b1053 of _0x1eaf53){for(const _0x37308e of _0x445248){const _0x6069ec=_0x2b1053[0x0][_0x1c4ae6(0xb7)](_0x37308e[0x0]),_0x232678=_0x2b1053[0x1][_0x1c4ae6(0xb7)](_0x37308e[0x1]),_0x4e32ea=new RegExp(_0x408e5f['format'](_0x232678),'i');_0x5da85d[_0x6069ec]=_0x4e32ea;}}},Scene_Boot[_0x3f1f6b(0x457)][_0x3f1f6b(0x461)]=function(){const _0x74b3d1=_0x3f1f6b,_0x413fc4=$dataSkills[_0x74b3d1(0x7a0)]($dataItems);for(const _0x24ba5c of _0x413fc4){if(!_0x24ba5c)continue;VisuMZ['BattleCore'][_0x74b3d1(0x52a)](_0x24ba5c);}},Scene_Boot[_0x3f1f6b(0x457)][_0x3f1f6b(0x6d8)]=function(){const _0x5d9dff=_0x3f1f6b,_0x287269=$dataActors['concat']($dataClasses,$dataWeapons,$dataArmors,$dataEnemies,$dataStates);for(const _0xca5592 of _0x287269){if(!_0xca5592)continue;VisuMZ['BattleCore'][_0x5d9dff(0x387)](_0xca5592);}},Scene_Boot[_0x3f1f6b(0x457)][_0x3f1f6b(0x63f)]=function(){const _0x348f20=_0x3f1f6b,_0x4e529a=VisuMZ[_0x348f20(0x32d)][_0x348f20(0x3e9)][_0x348f20(0x433)]['BaseTroopIDs'],_0x41adb2=[];for(const _0x10f429 of _0x4e529a){const _0x48209e=$dataTroops[_0x10f429];if(_0x48209e)_0x41adb2[_0x348f20(0x547)](JsonEx['makeDeepCopy'](_0x48209e));}for(const _0x592ae5 of $dataTroops){if(!_0x592ae5)continue;for(const _0x728b4f of _0x41adb2){if(_0x728b4f['id']===_0x592ae5['id'])continue;_0x592ae5[_0x348f20(0x611)]=_0x592ae5['pages']['concat'](_0x728b4f['pages']);}}},Scene_Boot[_0x3f1f6b(0x457)][_0x3f1f6b(0x2a7)]=function(){const _0x1a7e27=_0x3f1f6b,_0x3a1540=$dataSkills[_0x1a7e27(0x7a0)]($dataItems);for(const _0x2d6374 of _0x3a1540){if(!_0x2d6374)continue;VisuMZ[_0x1a7e27(0x32d)]['Parse_Notetags_Targets'](_0x2d6374);}},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x81c)]=VisuMZ[_0x3f1f6b(0x81c)],VisuMZ[_0x3f1f6b(0x81c)]=function(_0x2ac6d1){const _0x1b5fec=_0x3f1f6b;VisuMZ[_0x1b5fec(0x32d)][_0x1b5fec(0x81c)]&&VisuMZ[_0x1b5fec(0x32d)][_0x1b5fec(0x81c)][_0x1b5fec(0x131)](this,_0x2ac6d1),VisuMZ[_0x1b5fec(0x32d)]['Parse_Notetags_TraitObjects'](_0x2ac6d1);},VisuMZ['BattleCore'][_0x3f1f6b(0x5a4)]=VisuMZ[_0x3f1f6b(0x5a4)],VisuMZ[_0x3f1f6b(0x5a4)]=function(_0x247fc7){const _0x16e544=_0x3f1f6b;VisuMZ[_0x16e544(0x32d)][_0x16e544(0x5a4)]&&VisuMZ[_0x16e544(0x32d)][_0x16e544(0x5a4)][_0x16e544(0x131)](this,_0x247fc7),VisuMZ[_0x16e544(0x32d)]['Parse_Notetags_TraitObjects'](_0x247fc7);},VisuMZ[_0x3f1f6b(0x32d)]['ParseSkillNotetags']=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x3f1f6b(0x5dd)]=function(_0x335482){const _0x2ad1ea=_0x3f1f6b;VisuMZ[_0x2ad1ea(0x32d)]['ParseSkillNotetags']&&VisuMZ['BattleCore'][_0x2ad1ea(0x5dd)][_0x2ad1ea(0x131)](this,_0x335482),VisuMZ[_0x2ad1ea(0x32d)][_0x2ad1ea(0x52a)](_0x335482),VisuMZ[_0x2ad1ea(0x32d)][_0x2ad1ea(0x58b)](_0x335482);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x738)]=VisuMZ[_0x3f1f6b(0x738)],VisuMZ[_0x3f1f6b(0x738)]=function(_0x2f6a16){const _0xbf9316=_0x3f1f6b;VisuMZ['BattleCore'][_0xbf9316(0x738)]&&VisuMZ[_0xbf9316(0x32d)][_0xbf9316(0x738)][_0xbf9316(0x131)](this,_0x2f6a16),VisuMZ[_0xbf9316(0x32d)][_0xbf9316(0x52a)](_0x2f6a16),VisuMZ[_0xbf9316(0x32d)]['Parse_Notetags_Targets'](_0x2f6a16);},VisuMZ[_0x3f1f6b(0x32d)]['ParseWeaponNotetags']=VisuMZ[_0x3f1f6b(0x17a)],VisuMZ['ParseWeaponNotetags']=function(_0x15024f){const _0x951994=_0x3f1f6b;VisuMZ[_0x951994(0x32d)][_0x951994(0x17a)]&&VisuMZ[_0x951994(0x32d)][_0x951994(0x17a)][_0x951994(0x131)](this,_0x15024f),VisuMZ[_0x951994(0x32d)][_0x951994(0x387)](_0x15024f);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x110)]=VisuMZ[_0x3f1f6b(0x110)],VisuMZ['ParseArmorNotetags']=function(_0x3b657c){const _0x553336=_0x3f1f6b;VisuMZ[_0x553336(0x32d)][_0x553336(0x110)]&&VisuMZ['BattleCore'][_0x553336(0x110)][_0x553336(0x131)](this,_0x3b657c),VisuMZ['BattleCore'][_0x553336(0x387)](_0x3b657c);},VisuMZ['BattleCore'][_0x3f1f6b(0x76b)]=VisuMZ[_0x3f1f6b(0x76b)],VisuMZ[_0x3f1f6b(0x76b)]=function(_0x15321d){const _0x11128d=_0x3f1f6b;VisuMZ[_0x11128d(0x32d)][_0x11128d(0x76b)]&&VisuMZ[_0x11128d(0x32d)]['ParseEnemyNotetags'][_0x11128d(0x131)](this,_0x15321d),VisuMZ['BattleCore'][_0x11128d(0x387)](_0x15321d);},VisuMZ[_0x3f1f6b(0x32d)]['ParseStateNotetags']=VisuMZ[_0x3f1f6b(0x2f5)],VisuMZ[_0x3f1f6b(0x2f5)]=function(_0x5b46c7){const _0x466bb4=_0x3f1f6b;VisuMZ[_0x466bb4(0x32d)][_0x466bb4(0x2f5)]&&VisuMZ['BattleCore'][_0x466bb4(0x2f5)][_0x466bb4(0x131)](this,_0x5b46c7),VisuMZ[_0x466bb4(0x32d)][_0x466bb4(0x387)](_0x5b46c7);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x52a)]=function(_0x151855){const _0x4d0b5b=_0x3f1f6b,_0x42f56e=[_0x4d0b5b(0x851),'PostApplyJS',_0x4d0b5b(0x236),_0x4d0b5b(0x102),'PreStartActionJS','PostStartActionJS',_0x4d0b5b(0x16c),_0x4d0b5b(0x340)];for(const _0x216d71 of _0x42f56e){VisuMZ[_0x4d0b5b(0x32d)][_0x4d0b5b(0x11c)](_0x151855,_0x216d71);}const _0x5133e7=_0x151855[_0x4d0b5b(0x4e8)];_0x5133e7[_0x4d0b5b(0x7c7)](/<ALWAYS CRITICAL/i)&&(_0x151855[_0x4d0b5b(0x434)]['critical']=!![]),_0x5133e7[_0x4d0b5b(0x7c7)](/<(?:REPEAT|REPEATS|REPEAT HITS):[ ](\d+)/i)&&(_0x151855[_0x4d0b5b(0x2b4)]=Math['max'](0x1,Number(RegExp['$1']))),_0x5133e7[_0x4d0b5b(0x7c7)](/<TARGET:[ ](.*)>/i)&&(_0x151855[_0x4d0b5b(0x41f)]=String(RegExp['$1'])[_0x4d0b5b(0x23a)]()[_0x4d0b5b(0x6da)]());},VisuMZ[_0x3f1f6b(0x32d)]['Parse_Notetags_TraitObjects']=function(_0x1027ab){const _0xa83c10=_0x3f1f6b,_0x3d5bf2=[_0xa83c10(0x666),'PostApplyAsUserJS','PreDamageAsUserJS',_0xa83c10(0x319),_0xa83c10(0x6b6),_0xa83c10(0x284),_0xa83c10(0x682),'PostDamageAsTargetJS',_0xa83c10(0x61c),_0xa83c10(0x23d),'PreEndActionJS','PostEndActionJS',_0xa83c10(0x839),_0xa83c10(0x140),_0xa83c10(0x439),_0xa83c10(0x4ec),_0xa83c10(0x575),_0xa83c10(0x2b2),_0xa83c10(0x449),_0xa83c10(0x7bf),_0xa83c10(0x33d),_0xa83c10(0x6ad),_0xa83c10(0x357),_0xa83c10(0x750),'PreRegenerateJS','PostRegenerateJS'];for(const _0x175688 of _0x3d5bf2){VisuMZ[_0xa83c10(0x32d)][_0xa83c10(0x11c)](_0x1027ab,_0x175688);}},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x58b)]=function(_0x3fa638){const _0x3fa68f=_0x3f1f6b,_0x1b2572=_0x3fa638['note'];if(_0x1b2572['match'](/<JS TARGETS>\s*([\s\S]*)\s*<\/JS TARGETS>/i)){const _0x15cdf0=String(RegExp['$1']),_0xa050a6=VisuMZ[_0x3fa68f(0x32d)]['createKeyJS'](_0x3fa638,_0x3fa68f(0x613));VisuMZ[_0x3fa68f(0x32d)][_0x3fa68f(0x503)](_0x15cdf0,_0xa050a6);}if(_0x1b2572[_0x3fa68f(0x7c7)](/<JS COMMAND (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS COMMAND (?:VISIBLE|SHOW|HIDE)>/i)){const _0x5a6cfb=String(RegExp['$1']),_0x25c254=VisuMZ[_0x3fa68f(0x32d)][_0x3fa68f(0x1bb)](_0x3fa638,_0x3fa68f(0x5b5));VisuMZ[_0x3fa68f(0x32d)][_0x3fa68f(0x125)](_0x5a6cfb,_0x25c254);}},VisuMZ[_0x3f1f6b(0x32d)]['JS']={},VisuMZ[_0x3f1f6b(0x32d)]['createJS']=function(_0x3b72e1,_0x94ce68){const _0x292971=_0x3f1f6b,_0x136267=_0x3b72e1[_0x292971(0x4e8)];if(_0x136267[_0x292971(0x7c7)](VisuMZ[_0x292971(0x32d)][_0x292971(0x156)][_0x94ce68])){const _0x106733=RegExp['$1'],_0x4c2e0e=_0x292971(0x2a0)[_0x292971(0xb7)](_0x106733),_0x1c55bc=VisuMZ[_0x292971(0x32d)]['createKeyJS'](_0x3b72e1,_0x94ce68);VisuMZ[_0x292971(0x32d)]['JS'][_0x1c55bc]=new Function(_0x4c2e0e);}},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x1bb)]=function(_0x52b1d4,_0x2a6986){const _0x329dfd=_0x3f1f6b;let _0x1ef1b8='';if($dataActors[_0x329dfd(0x354)](_0x52b1d4))_0x1ef1b8=_0x329dfd(0x58d)[_0x329dfd(0xb7)](_0x52b1d4['id'],_0x2a6986);if($dataClasses['includes'](_0x52b1d4))_0x1ef1b8='Class-%1-%2'['format'](_0x52b1d4['id'],_0x2a6986);if($dataSkills['includes'](_0x52b1d4))_0x1ef1b8=_0x329dfd(0x154)[_0x329dfd(0xb7)](_0x52b1d4['id'],_0x2a6986);if($dataItems[_0x329dfd(0x354)](_0x52b1d4))_0x1ef1b8='Item-%1-%2'['format'](_0x52b1d4['id'],_0x2a6986);if($dataWeapons[_0x329dfd(0x354)](_0x52b1d4))_0x1ef1b8=_0x329dfd(0x237)['format'](_0x52b1d4['id'],_0x2a6986);if($dataArmors[_0x329dfd(0x354)](_0x52b1d4))_0x1ef1b8=_0x329dfd(0x331)['format'](_0x52b1d4['id'],_0x2a6986);if($dataEnemies['includes'](_0x52b1d4))_0x1ef1b8='Enemy-%1-%2'[_0x329dfd(0xb7)](_0x52b1d4['id'],_0x2a6986);if($dataStates['includes'](_0x52b1d4))_0x1ef1b8=_0x329dfd(0xcf)[_0x329dfd(0xb7)](_0x52b1d4['id'],_0x2a6986);return _0x1ef1b8;},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x503)]=function(_0x460755,_0x27e1b2){const _0xa294a7=_0x3f1f6b,_0x4282a3=_0xa294a7(0x7e5)[_0xa294a7(0xb7)](_0x460755);VisuMZ['BattleCore']['JS'][_0x27e1b2]=new Function(_0x4282a3);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x125)]=function(_0x1b9bd6,_0x26079f){const _0x20c99=_0x3f1f6b,_0x2b594c=_0x20c99(0xe0)['format'](_0x1b9bd6);VisuMZ['BattleCore']['JS'][_0x26079f]=new Function(_0x2b594c);},TextManager[_0x3f1f6b(0x670)]=VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x3e9)]['PartyCmd']['CmdTextAutoBattle'],TextManager[_0x3f1f6b(0x5b2)]=VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x3e9)]['AutoBattle']['StartName'],TextManager['autoBattleStyle']=VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x3e9)][_0x3f1f6b(0x6be)][_0x3f1f6b(0x21a)],TextManager[_0x3f1f6b(0x4a8)]=VisuMZ['BattleCore'][_0x3f1f6b(0x3e9)]['HpGauge'][_0x3f1f6b(0x323)],ColorManager['getColor']=function(_0x4038c6){const _0x148aec=_0x3f1f6b;return _0x4038c6=String(_0x4038c6),_0x4038c6[_0x148aec(0x7c7)](/#(.*)/i)?_0x148aec(0x3bd)[_0x148aec(0xb7)](String(RegExp['$1'])):this['textColor'](Number(_0x4038c6));},DataManager[_0x3f1f6b(0x20d)]=function(_0x517ff2){const _0x224759=_0x3f1f6b;if(_0x517ff2[_0x224759(0x4e8)][_0x224759(0x7c7)](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x445e0a=String(RegExp['$1'])['toUpperCase']()[_0x224759(0x6da)]();if(_0x445e0a==='MANUAL')return _0x224759(0x566);if(VisuMZ['DamageStyles'][_0x445e0a])return _0x445e0a;}const _0xd419e2=VisuMZ['BattleCore'][_0x224759(0x3e9)]['Damage'][_0x224759(0x51d)][_0x224759(0x23a)]()['trim']();if(VisuMZ[_0x224759(0x6ee)][_0xd419e2])return _0xd419e2;return _0x224759(0x566);},DataManager[_0x3f1f6b(0x1b1)]=function(_0x56dc6e){const _0x3b4551=_0x3f1f6b;_0x56dc6e=_0x56dc6e[_0x3b4551(0x23a)]()['trim'](),this[_0x3b4551(0x2b7)]=this[_0x3b4551(0x2b7)]||{};if(this[_0x3b4551(0x2b7)][_0x56dc6e])return this[_0x3b4551(0x2b7)][_0x56dc6e];for(let _0x1e98f9=0x1;_0x1e98f9<0x64;_0x1e98f9++){if(!$dataSystem[_0x3b4551(0x515)][_0x1e98f9])continue;let _0x45a2bf=$dataSystem[_0x3b4551(0x515)][_0x1e98f9][_0x3b4551(0x23a)]()[_0x3b4551(0x6da)]();_0x45a2bf=_0x45a2bf[_0x3b4551(0x669)](/\x1I\[(\d+)\]/gi,''),_0x45a2bf=_0x45a2bf['replace'](/\\I\[(\d+)\]/gi,''),this[_0x3b4551(0x2b7)][_0x45a2bf]=_0x1e98f9;}return this[_0x3b4551(0x2b7)][_0x56dc6e]||0x0;},DataManager[_0x3f1f6b(0x7bb)]=function(_0x59458f){const _0x2aec2e=_0x3f1f6b;_0x59458f=_0x59458f[_0x2aec2e(0x23a)]()['trim'](),this['_skillIDs']=this[_0x2aec2e(0x229)]||{};if(this[_0x2aec2e(0x229)][_0x59458f])return this[_0x2aec2e(0x229)][_0x59458f];for(const _0x9cf5e4 of $dataSkills){if(!_0x9cf5e4)continue;this[_0x2aec2e(0x229)][_0x9cf5e4[_0x2aec2e(0x528)][_0x2aec2e(0x23a)]()['trim']()]=_0x9cf5e4['id'];}return this[_0x2aec2e(0x229)][_0x59458f]||0x0;},DataManager[_0x3f1f6b(0x4da)]=function(_0x4684b6){const _0x3abd8a=_0x3f1f6b;_0x4684b6=_0x4684b6[_0x3abd8a(0x23a)]()['trim'](),this[_0x3abd8a(0x695)]=this[_0x3abd8a(0x695)]||{};if(this['_enemyIDs'][_0x4684b6])return this[_0x3abd8a(0x695)][_0x4684b6];for(const _0x1934b7 of $dataEnemies){if(!_0x1934b7)continue;this[_0x3abd8a(0x695)][_0x1934b7[_0x3abd8a(0x528)][_0x3abd8a(0x23a)]()['trim']()]=_0x1934b7['id'];}return this[_0x3abd8a(0x695)][_0x4684b6]||0x0;},DataManager[_0x3f1f6b(0x32a)]=function(_0xf84afe){const _0x5c53c7=_0x3f1f6b;_0xf84afe=_0xf84afe[_0x5c53c7(0x23a)]()[_0x5c53c7(0x6da)](),this['_wtypeIDs']=this['_wtypeIDs']||{};if(this[_0x5c53c7(0x5d7)][_0xf84afe])return this[_0x5c53c7(0x5d7)][_0xf84afe];for(let _0x5305e2=0x1;_0x5305e2<0x64;_0x5305e2++){if(!$dataSystem[_0x5c53c7(0x46c)][_0x5305e2])continue;let _0x103aeb=$dataSystem[_0x5c53c7(0x46c)][_0x5305e2][_0x5c53c7(0x23a)]()[_0x5c53c7(0x6da)]();_0x103aeb=_0x103aeb['replace'](/\x1I\[(\d+)\]/gi,''),_0x103aeb=_0x103aeb[_0x5c53c7(0x669)](/\\I\[(\d+)\]/gi,''),this[_0x5c53c7(0x5d7)][_0x103aeb]=_0x5305e2;}return this[_0x5c53c7(0x5d7)][_0x5c53c7(0x3fc)]=0x0,this[_0x5c53c7(0x5d7)][_0xf84afe]||0x0;},DataManager[_0x3f1f6b(0x7cc)]=function(_0x4c74b0){const _0x2726f6=_0x3f1f6b,_0x58fb86='\x5cI[%1]%2';let _0x217def=_0x4c74b0['iconIndex'],_0x53c749=_0x4c74b0[_0x2726f6(0x528)];const _0x4ec03a=_0x4c74b0[_0x2726f6(0x4e8)];return _0x4ec03a[_0x2726f6(0x7c7)](/<DISPLAY ICON: (\d+)>/i)&&(_0x217def=Number(RegExp['$1'])),_0x4ec03a[_0x2726f6(0x7c7)](/<DISPLAY TEXT: (.*)>/i)&&(_0x53c749=String(RegExp['$1'])),_0x58fb86[_0x2726f6(0xb7)](_0x217def,_0x53c749);},DataManager[_0x3f1f6b(0x34f)]=function(_0x48d323){const _0x95652a=_0x3f1f6b;return _0x48d323[_0x95652a(0x4e8)][_0x95652a(0x7c7)](/<COMMAND TEXT: (.*)>/i)?String(RegExp['$1']):_0x48d323['name'];},DataManager[_0x3f1f6b(0x7c8)]=function(_0x2c1644){const _0x1bfc59=_0x3f1f6b;return _0x2c1644[_0x1bfc59(0x4e8)]['match'](/<COMMAND ICON: (\d+)>/i)?Number(RegExp['$1']):_0x2c1644[_0x1bfc59(0x384)];},DataManager[_0x3f1f6b(0x178)]=function(_0x3f7de4){const _0x508194=_0x3f1f6b,_0x102145=$dataEnemies[_0x3f7de4];if(_0x102145){if(_0x102145[_0x508194(0x4e8)][_0x508194(0x7c7)](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){const _0x484bd9=String(RegExp['$1'])[_0x508194(0x833)](/[\r\n]+/)[_0x508194(0x103)](''),_0x4e710f=this[_0x508194(0x422)](_0x484bd9);_0x3f7de4=this[_0x508194(0x4da)](_0x4e710f)||_0x3f7de4,_0x3f7de4=DataManager[_0x508194(0x178)](_0x3f7de4);}}return _0x3f7de4;},DataManager[_0x3f1f6b(0x422)]=function(_0x3f8d55){const _0xf390fc=_0x3f1f6b;let _0x37ac73=0x0;const _0x55eb05={};for(const _0x369c85 of _0x3f8d55){if(_0x369c85[_0xf390fc(0x7c7)](/(.*):[ ](\d+)/i)){const _0x2c7da0=String(RegExp['$1'])[_0xf390fc(0x6da)](),_0x42922c=Number(RegExp['$2']);_0x55eb05[_0x2c7da0]=_0x42922c,_0x37ac73+=_0x42922c;}else{if(_0x369c85['match'](/(.*):[ ](\d+\.?\d+)/i)){const _0x530409=String(RegExp['$1'])[_0xf390fc(0x6da)](),_0x4bd9fa=Number(RegExp['$2']);_0x55eb05[_0x530409]=_0x4bd9fa,_0x37ac73+=_0x4bd9fa;}else _0x369c85!==''&&(_0x55eb05[_0x369c85]=0x1,_0x37ac73++);}}if(_0x37ac73<=0x0)return'';let _0x25aaf1=Math[_0xf390fc(0x4f4)]()*_0x37ac73;for(const _0x253c3b in _0x55eb05){_0x25aaf1-=_0x55eb05[_0x253c3b];if(_0x25aaf1<=0x0)return _0x253c3b;}return'';},DataManager[_0x3f1f6b(0xf1)]=function(_0x4c2917){const _0x37c112=_0x3f1f6b;if(!_0x4c2917)return![];if(!VisuMZ[_0x37c112(0x32d)][_0x37c112(0x3e9)][_0x37c112(0x694)][_0x37c112(0x66c)])return![];if(_0x4c2917[_0x37c112(0x4e8)][_0x37c112(0x7c7)](/<AUTO ACTION SEQUENCE>/i))return![];if(_0x4c2917[_0x37c112(0x4e8)]['match'](/<COMMON (?:EVENT|EVENTS):[ ](.*)>/gi))return!![];for(const _0xf79170 of _0x4c2917[_0x37c112(0x1d8)]){if(!_0xf79170)continue;if(_0xf79170[_0x37c112(0x22b)]===Game_Action[_0x37c112(0x37f)])return!![];}return![];},ConfigManager[_0x3f1f6b(0x691)]=![],ConfigManager[_0x3f1f6b(0x5df)]=![],ConfigManager[_0x3f1f6b(0x4a8)]=!![],VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0xcd)]=ConfigManager[_0x3f1f6b(0x106)],ConfigManager['makeData']=function(){const _0x1cf60f=_0x3f1f6b,_0x54344c=VisuMZ[_0x1cf60f(0x32d)][_0x1cf60f(0xcd)][_0x1cf60f(0x131)](this);return _0x54344c[_0x1cf60f(0x691)]=this[_0x1cf60f(0x691)],_0x54344c[_0x1cf60f(0x5df)]=this['autoBattleUseSkills'],_0x54344c[_0x1cf60f(0x4a8)]=this[_0x1cf60f(0x4a8)],_0x54344c;},VisuMZ['BattleCore'][_0x3f1f6b(0x597)]=ConfigManager['applyData'],ConfigManager[_0x3f1f6b(0x7a5)]=function(_0x44f22f){const _0x576899=_0x3f1f6b;VisuMZ[_0x576899(0x32d)]['ConfigManager_applyData']['call'](this,_0x44f22f),_0x576899(0x691)in _0x44f22f?this[_0x576899(0x691)]=_0x44f22f['autoBattleAtStart']:this[_0x576899(0x691)]=![],'autoBattleUseSkills'in _0x44f22f?this[_0x576899(0x5df)]=_0x44f22f[_0x576899(0x5df)]:this['autoBattleUseSkills']=![],_0x576899(0x4a8)in _0x44f22f?this[_0x576899(0x4a8)]=_0x44f22f['visualHpGauge']:this['visualHpGauge']=!![];},VisuMZ['BattleCore']['BattleManager_initMembers']=BattleManager['initMembers'],BattleManager['initMembers']=function(){const _0xb0a571=_0x3f1f6b;VisuMZ['BattleCore']['BattleManager_initMembers']['call'](this),this[_0xb0a571(0x754)]=[];},BattleManager[_0x3f1f6b(0x447)]=function(){const _0x4ee364=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;const _0xf59941=SceneManager[_0x4ee364(0x5bb)][_0x4ee364(0x29a)];if(_0xf59941)_0xf59941[_0x4ee364(0x68c)]();},BattleManager['battleSys']=function(){const _0x4a2363=_0x3f1f6b;if(BattleManager['isTpb']())return'TPB';return _0x4a2363(0x367);},BattleManager['isBattleSys']=function(_0x1410af){const _0x3d9d35=_0x3f1f6b;return _0x1410af=_0x1410af[_0x3d9d35(0x23a)]()[_0x3d9d35(0x6da)](),this[_0x3d9d35(0x7c0)]()===_0x1410af;},BattleManager[_0x3f1f6b(0x6e2)]=function(){const _0x3138cf=_0x3f1f6b;return this[_0x3138cf(0x3eb)](_0x3138cf(0x367));},BattleManager['isTurnBased']=function(){const _0x84c65f=_0x3f1f6b;return this[_0x84c65f(0x6e2)]();},BattleManager[_0x3f1f6b(0x146)]=function(){const _0x4aabe4=_0x3f1f6b;return!this[_0x4aabe4(0x4e9)]();},BattleManager[_0x3f1f6b(0x698)]=function(){const _0x358a7e=_0x3f1f6b;return!this['isTurnBased']()&&!this[_0x358a7e(0x146)]();},BattleManager['processBattleCoreJS']=function(_0x4fb461){const _0x1cdb85=_0x3f1f6b;$gameParty[_0x1cdb85(0x4b9)](_0x4fb461),$gameTroop[_0x1cdb85(0x4b9)](_0x4fb461);},VisuMZ[_0x3f1f6b(0x32d)]['BattleManager_startBattle']=BattleManager[_0x3f1f6b(0x6fb)],BattleManager[_0x3f1f6b(0x6fb)]=function(){const _0x5d10e6=_0x3f1f6b;this[_0x5d10e6(0x443)]=![],this[_0x5d10e6(0x3ce)]=ConfigManager['autoBattleAtStart'],this[_0x5d10e6(0x4b9)](_0x5d10e6(0x839)),VisuMZ[_0x5d10e6(0x32d)][_0x5d10e6(0x395)][_0x5d10e6(0x131)](this),this['processBattleCoreJS'](_0x5d10e6(0x140));},BattleManager[_0x3f1f6b(0x3a5)]=function(_0x31c0c6){const _0x9980f8=_0x3f1f6b,_0x1cf9f8=VisuMZ['BattleCore']['Settings']['Mechanics'];_0x1cf9f8[_0x9980f8(0x849)]&&VisuMZ[_0x9980f8(0x32d)][_0x9980f8(0x123)](_0x1cf9f8[_0x9980f8(0x849)])&&$gameTemp[_0x9980f8(0x761)](_0x1cf9f8[_0x9980f8(0x849)]);const _0x510d8d=_0x9980f8(0x68a)[_0x9980f8(0xb7)](_0x31c0c6);_0x1cf9f8[_0x510d8d]&&VisuMZ[_0x9980f8(0x32d)][_0x9980f8(0x123)](_0x1cf9f8[_0x510d8d])&&$gameTemp[_0x9980f8(0x761)](_0x1cf9f8[_0x510d8d]);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x56b)]=BattleManager['processVictory'],BattleManager[_0x3f1f6b(0x73d)]=function(){const _0x43faa2=_0x3f1f6b;this[_0x43faa2(0x4b9)](_0x43faa2(0x575)),VisuMZ['BattleCore'][_0x43faa2(0x56b)][_0x43faa2(0x131)](this),this[_0x43faa2(0x3a5)]('Victory');},VisuMZ[_0x3f1f6b(0x32d)]['BattleManager_processDefeat']=BattleManager[_0x3f1f6b(0x487)],BattleManager[_0x3f1f6b(0x487)]=function(){const _0x2ed1f5=_0x3f1f6b;this['processBattleCoreJS'](_0x2ed1f5(0x2b2)),VisuMZ['BattleCore'][_0x2ed1f5(0x5fb)]['call'](this),this[_0x2ed1f5(0x3a5)]('Defeat');},VisuMZ['BattleCore']['BattleManager_endBattle']=BattleManager[_0x3f1f6b(0x511)],BattleManager[_0x3f1f6b(0x511)]=function(_0xe93b04){const _0x5d3e8c=_0x3f1f6b;this[_0x5d3e8c(0x443)]=!![],this[_0x5d3e8c(0x3ce)]=![],this['processBattleCoreJS'](_0x5d3e8c(0x439)),VisuMZ[_0x5d3e8c(0x32d)][_0x5d3e8c(0x6f8)][_0x5d3e8c(0x131)](this,_0xe93b04),this[_0x5d3e8c(0x4b9)]('PostEndBattleJS');},VisuMZ['BattleCore'][_0x3f1f6b(0x7e3)]=BattleManager[_0x3f1f6b(0x369)],BattleManager[_0x3f1f6b(0x369)]=function(){const _0x22597e=_0x3f1f6b;if(this['isTurnBased']())this[_0x22597e(0x4b9)](_0x22597e(0x33d));VisuMZ[_0x22597e(0x32d)]['BattleManager_startTurn'][_0x22597e(0x131)](this);if(this[_0x22597e(0x4e9)]())this['processBattleCoreJS'](_0x22597e(0x6ad));},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x5e6)]=BattleManager[_0x3f1f6b(0x476)],BattleManager[_0x3f1f6b(0x476)]=function(){const _0x370c3d=_0x3f1f6b,_0x546f06=this[_0x370c3d(0x633)][_0x370c3d(0x25a)]();if(_0x546f06)_0x546f06[_0x370c3d(0x561)](_0x370c3d(0x61c));VisuMZ['BattleCore']['BattleManager_startAction'][_0x370c3d(0x131)](this);if(_0x546f06)_0x546f06[_0x370c3d(0x561)]('PostStartActionJS');},VisuMZ['BattleCore'][_0x3f1f6b(0x5d5)]=BattleManager[_0x3f1f6b(0x69b)],BattleManager[_0x3f1f6b(0x69b)]=function(){const _0x58b15e=_0x3f1f6b,_0x516797=this[_0x58b15e(0x13b)];_0x516797&&_0x516797[_0x58b15e(0x561)](_0x58b15e(0x16c)),VisuMZ[_0x58b15e(0x32d)]['BattleManager_endAction'][_0x58b15e(0x131)](this),_0x516797&&_0x516797[_0x58b15e(0x561)]('PostEndActionJS'),this[_0x58b15e(0x1cc)](this[_0x58b15e(0x174)]());},BattleManager[_0x3f1f6b(0x1cc)]=function(_0x3e530a){const _0x1bd798=_0x3f1f6b;for(const _0x580aae of _0x3e530a){if(!_0x580aae)continue;if(!_0x580aae['battler']())continue;_0x580aae['battler']()[_0x1bd798(0x636)]();}},BattleManager[_0x3f1f6b(0x5c3)]=function(){const _0x318f90=_0x3f1f6b;!this[_0x318f90(0x6f7)]['isBusy']()&&this[_0x318f90(0x69b)]();},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x358)]=function(){const _0x4a6a00=_0x3f1f6b;this['clearResult']();if(Imported[_0x4a6a00(0x3fe)]){const _0x4a63a5=VisuMZ[_0x4a6a00(0x465)]['Settings'][_0x4a6a00(0x677)];_0x4a63a5&&_0x4a63a5['ActionEndUpdate']===![]&&this[_0x4a6a00(0x1b0)](0x1);}else this[_0x4a6a00(0x1b0)](0x1);this['removeBuffsAuto']();},BattleManager[_0x3f1f6b(0x76e)]=function(){const _0x45c18f=_0x3f1f6b;this[_0x45c18f(0x379)]=VisuMZ[_0x45c18f(0x32d)][_0x45c18f(0x3e9)][_0x45c18f(0x433)][_0x45c18f(0x61a)]['call'](this);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x591)]=BattleManager[_0x3f1f6b(0x7e8)],BattleManager[_0x3f1f6b(0x7e8)]=function(){const _0x169d98=_0x3f1f6b;this[_0x169d98(0x4b9)](_0x169d98(0x449)),BattleManager[_0x169d98(0x1b3)][_0x169d98(0x326)](),VisuMZ[_0x169d98(0x32d)]['BattleManager_onEscapeSuccess'][_0x169d98(0x131)](this),this[_0x169d98(0x3a5)](_0x169d98(0x4b7));},VisuMZ['BattleCore'][_0x3f1f6b(0x7fd)]=BattleManager['onEscapeFailure'],BattleManager['onEscapeFailure']=function(){const _0x45df44=_0x3f1f6b;this[_0x45df44(0x4b9)](_0x45df44(0x7bf));const _0x4fc82e=this[_0x45df44(0x379)];VisuMZ[_0x45df44(0x32d)][_0x45df44(0x7fd)][_0x45df44(0x131)](this),this[_0x45df44(0x379)]=_0x4fc82e+VisuMZ[_0x45df44(0x32d)][_0x45df44(0x3e9)][_0x45df44(0x433)][_0x45df44(0x523)]['call'](this),this[_0x45df44(0x3a5)](_0x45df44(0x80a));},BattleManager[_0x3f1f6b(0x717)]=function(){const _0x294d3b=_0x3f1f6b;let _0x87590=![];if(this['isDisplayEmergedEnemies']())for(const _0x439f9a of $gameTroop[_0x294d3b(0x31c)]()){this[_0x294d3b(0x6f7)][_0x294d3b(0x547)](_0x294d3b(0x748),TextManager[_0x294d3b(0x767)][_0x294d3b(0xb7)](_0x439f9a)),this['_logWindow'][_0x294d3b(0x547)](_0x294d3b(0x18c)),_0x87590=!![];}if(this['_preemptive'])this[_0x294d3b(0x6f7)][_0x294d3b(0x547)](_0x294d3b(0x748),TextManager[_0x294d3b(0x285)]['format']($gameParty['name']())),this[_0x294d3b(0x6f7)][_0x294d3b(0x547)](_0x294d3b(0x18c));else this[_0x294d3b(0x45e)]&&(this[_0x294d3b(0x6f7)][_0x294d3b(0x547)](_0x294d3b(0x748),TextManager[_0x294d3b(0x7ad)]['format']($gameParty[_0x294d3b(0x528)]())),this[_0x294d3b(0x6f7)]['push']('wait'));_0x87590&&(this[_0x294d3b(0x6f7)][_0x294d3b(0x547)]('wait'),this[_0x294d3b(0x6f7)][_0x294d3b(0x547)](_0x294d3b(0xae))),this['isTpb']()&&this[_0x294d3b(0x177)]()&&(this[_0x294d3b(0x270)]=![]);},BattleManager[_0x3f1f6b(0xe1)]=function(){const _0x283b1c=_0x3f1f6b;if(BattleManager['_autoBattle'])return![];return VisuMZ[_0x283b1c(0x32d)][_0x283b1c(0x3e9)]['Enemy']['EmergeText'];},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x1a6)]=BattleManager[_0x3f1f6b(0x679)],BattleManager['startInput']=function(){const _0x25f535=_0x3f1f6b;VisuMZ['BattleCore']['BattleManager_startInput']['call'](this),this[_0x25f535(0x6e2)]()&&this[_0x25f535(0x177)]()&&!this[_0x25f535(0x45e)]&&$gameParty['canInput']()&&this[_0x25f535(0x576)]();},BattleManager[_0x3f1f6b(0x177)]=function(){const _0x31069c=_0x3f1f6b;return VisuMZ[_0x31069c(0x32d)][_0x31069c(0x3e9)][_0x31069c(0x10c)][_0x31069c(0x5f5)];},BattleManager['checkTpbInputOpen']=function(){const _0x4da6c6=_0x3f1f6b;this['isPartyTpbInputtable']()&&this[_0x4da6c6(0x576)]();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x776)]=Scene_Battle['prototype'][_0x3f1f6b(0x794)],Scene_Battle['prototype'][_0x3f1f6b(0x794)]=function(){const _0x5590ce=_0x3f1f6b;VisuMZ[_0x5590ce(0x32d)][_0x5590ce(0x776)][_0x5590ce(0x131)](this),BattleManager[_0x5590ce(0x1de)]()&&BattleManager[_0x5590ce(0x270)]&&(BattleManager[_0x5590ce(0x270)]=![],this[_0x5590ce(0x471)]());},BattleManager[_0x3f1f6b(0x6ce)]=function(_0x133ef3,_0x4fd61a){const _0x5c1851=_0x3f1f6b;this[_0x5c1851(0x13b)]['_reflectionTarget']=_0x4fd61a,this[_0x5c1851(0x6f7)]['displayReflection'](_0x4fd61a),this[_0x5c1851(0x6f7)][_0x5c1851(0x84a)](_0x133ef3,this[_0x5c1851(0x13b)]),this['_action'][_0x5c1851(0x2eb)](_0x133ef3),this[_0x5c1851(0x6f7)][_0x5c1851(0x6c6)](_0x133ef3,_0x133ef3);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x2f1)]=BattleManager['makeActionOrders'],BattleManager['makeActionOrders']=function(){const _0x122d7f=_0x3f1f6b;VisuMZ['BattleCore'][_0x122d7f(0x2f1)][_0x122d7f(0x131)](this),this[_0x122d7f(0x268)]=this[_0x122d7f(0x268)]['filter'](_0x58cb72=>_0x58cb72&&_0x58cb72[_0x122d7f(0x409)]());},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x516)]=BattleManager['updatePhase'],BattleManager['updatePhase']=function(_0x44a774){const _0x530ce7=_0x3f1f6b;if(this[_0x530ce7(0x228)]===_0x530ce7(0x1a5))this[_0x530ce7(0x6f6)]();else this[_0x530ce7(0x228)]===_0x530ce7(0x44b)?this[_0x530ce7(0x5d0)]():VisuMZ[_0x530ce7(0x32d)][_0x530ce7(0x516)][_0x530ce7(0x131)](this,_0x44a774);},BattleManager[_0x3f1f6b(0xc0)]=function(){const _0x62dc57=_0x3f1f6b;this[_0x62dc57(0x208)]=this['_targets'][_0x62dc57(0x577)](0x0),this['_targetIndex']=0x0,this['_target']=this[_0x62dc57(0x208)][0x0]||null,this['_phase']=_0x62dc57(0x1a5);},BattleManager[_0x3f1f6b(0x6f6)]=function(){const _0x1ed1f5=_0x3f1f6b;!this[_0x1ed1f5(0x2fe)]()&&!this[_0x1ed1f5(0x6f7)]['isBusy']()&&(this[_0x1ed1f5(0x228)]=_0x1ed1f5(0x75b));},BattleManager[_0x3f1f6b(0x44b)]=function(_0xfb571e){const _0x223359=_0x3f1f6b;this['_actionBattlers'][_0x223359(0x103)](_0xfb571e);if(_0xfb571e===this[_0x223359(0x633)])return;const _0x2e1d3e=JsonEx['makeDeepCopy'](_0xfb571e['currentAction']());this[_0x223359(0x754)][_0x223359(0x547)]([_0xfb571e,_0x2e1d3e]);},BattleManager['processForcedAction']=function(){},BattleManager[_0x3f1f6b(0x4b1)]=function(){const _0x8febdf=_0x3f1f6b;if(this[_0x8febdf(0x1de)]())this[_0x8febdf(0x228)]=_0x8febdf(0x484);else this['_forcedBattlers'][_0x8febdf(0x135)]>0x0?this['_phase']=_0x8febdf(0x484):this['startInput']();},BattleManager['getNextSubject']=function(){const _0x2dd89c=_0x3f1f6b,_0xe890db=this[_0x2dd89c(0x633)];_0xe890db&&this[_0x2dd89c(0x1de)]()&&_0xe890db['setActionState'](_0x2dd89c(0x7b1));for(;;){const _0x28c024=this[_0x2dd89c(0x2a8)]();if(!_0x28c024)return null;if(_0x28c024['isBattleMember']()&&_0x28c024['isAlive']())return _0x28c024;}},BattleManager[_0x3f1f6b(0x2a8)]=function(){const _0x48d003=_0x3f1f6b;if(this['_forcedBattlers'][_0x48d003(0x135)]>0x0){const _0x129dc5=this[_0x48d003(0x754)]['shift'](),_0x1bac5c=_0x129dc5[0x0];return _0x1bac5c[_0x48d003(0xf5)]=_0x1bac5c['_actions']||[],_0x1bac5c[_0x48d003(0xf5)][0x0]=_0x129dc5[0x1],_0x1bac5c;}else return this['_actionBattlers'][_0x48d003(0x346)]();},VisuMZ[_0x3f1f6b(0x32d)]['Game_Battler_forceAction']=Game_Battler[_0x3f1f6b(0x457)]['forceAction'],Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x44b)]=function(_0xf7a6bc,_0x5b4f6f){const _0x52a1d5=_0x3f1f6b;VisuMZ[_0x52a1d5(0x32d)][_0x52a1d5(0x6b9)][_0x52a1d5(0x131)](this,_0xf7a6bc,_0x5b4f6f),this['_actions'][this[_0x52a1d5(0xf5)]['length']-0x1]['_forceAction']=!![];},Game_Interpreter[_0x3f1f6b(0x457)][_0x3f1f6b(0x42c)]=function(_0x47ddeb){const _0x3b3a1f=_0x3f1f6b;return this[_0x3b3a1f(0x4c1)](_0x47ddeb[0x0],_0x47ddeb[0x1],_0x284872=>{const _0x21a2f3=_0x3b3a1f;!_0x284872['isDeathStateAffected']()&&(_0x284872[_0x21a2f3(0x44b)](_0x47ddeb[0x2],_0x47ddeb[0x3]),BattleManager[_0x21a2f3(0x44b)](_0x284872));}),!![];},VisuMZ[_0x3f1f6b(0x32d)]['Game_Battler_makeSpeed']=Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x259)],Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x259)]=function(){const _0x18bcc7=_0x3f1f6b;VisuMZ[_0x18bcc7(0x32d)]['Game_Battler_makeSpeed'][_0x18bcc7(0x131)](this),this[_0x18bcc7(0xf5)][_0x18bcc7(0x135)]<=0x0&&(this[_0x18bcc7(0x69c)]=Number[_0x18bcc7(0x133)]);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x573)]=BattleManager[_0x3f1f6b(0x576)],BattleManager[_0x3f1f6b(0x576)]=function(){const _0x312ee4=_0x3f1f6b;this[_0x312ee4(0x1de)]()?this[_0x312ee4(0x218)]():VisuMZ[_0x312ee4(0x32d)][_0x312ee4(0x573)][_0x312ee4(0x131)](this);},BattleManager[_0x3f1f6b(0x218)]=function(){const _0xe245d9=_0x3f1f6b;if(this['_currentActor']){if(this[_0xe245d9(0x822)]['selectNextCommand']())return;this[_0xe245d9(0x48e)](),this[_0xe245d9(0x3d5)](),!this[_0xe245d9(0x633)]&&!this[_0xe245d9(0x822)]&&SceneManager[_0xe245d9(0x5bb)][_0xe245d9(0x7a9)]();}else!this[_0xe245d9(0x633)]&&this['selectNextActor']();},BattleManager[_0x3f1f6b(0x3d5)]=function(){const _0x5417f7=_0x3f1f6b;(!this[_0x5417f7(0x200)]()||this[_0x5417f7(0x752)]())&&(this['_tpbSceneChangeCacheActor']&&(!$gameParty[_0x5417f7(0x5ca)]()[_0x5417f7(0x354)](this[_0x5417f7(0x4a3)])&&(this[_0x5417f7(0x4a3)]=null)),!this[_0x5417f7(0x4a3)]?(this[_0x5417f7(0x637)](),this['_currentActor']=null,this[_0x5417f7(0x7de)]=![]):this[_0x5417f7(0x12c)]());},BattleManager['revertTpbCachedActor']=function(){const _0x38153e=_0x3f1f6b;!$gameParty['battleMembers']()[_0x38153e(0x354)](this[_0x38153e(0x4a3)])&&(this[_0x38153e(0x4a3)]=null),this[_0x38153e(0x4a3)]?(this['_currentActor']=this[_0x38153e(0x4a3)],this[_0x38153e(0x822)]['_tpbState']='charged',this['_inputting']=!![],this[_0x38153e(0x4a3)]=null):(this['cancelActorInput'](),this[_0x38153e(0x822)]=null,this['_inputting']=![]);},VisuMZ['BattleCore'][_0x3f1f6b(0x41a)]=BattleManager['isTpbMainPhase'],BattleManager[_0x3f1f6b(0x5bf)]=function(){const _0x1f9d4b=_0x3f1f6b;return this[_0x1f9d4b(0x228)]===_0x1f9d4b(0x1a5)?this[_0x1f9d4b(0x3a9)]():VisuMZ['BattleCore'][_0x1f9d4b(0x41a)][_0x1f9d4b(0x131)](this);},BattleManager[_0x3f1f6b(0x3a9)]=function(){return this['isActiveTpb']();},VisuMZ['BattleCore'][_0x3f1f6b(0x410)]=BattleManager['cancelActorInput'],BattleManager[_0x3f1f6b(0x637)]=function(){const _0x14d779=_0x3f1f6b;this[_0x14d779(0x1de)]()&&this[_0x14d779(0x228)]===_0x14d779(0x22c)&&(this[_0x14d779(0x822)]=null),VisuMZ[_0x14d779(0x32d)]['BattleManager_cancelActorInput'][_0x14d779(0x131)](this);},VisuMZ['BattleCore'][_0x3f1f6b(0x598)]=BattleManager[_0x3f1f6b(0x16f)],BattleManager[_0x3f1f6b(0x16f)]=function(){const _0x521d82=_0x3f1f6b,_0xa76da1=this[_0x521d82(0x822)];if(_0xa76da1&&!_0xa76da1['inputtingAction']()){const _0x51b024=_0xa76da1[_0x521d82(0x797)];_0xa76da1[_0x521d82(0xf5)][_0x51b024]=new Game_Action(_0xa76da1);}return VisuMZ[_0x521d82(0x32d)][_0x521d82(0x598)][_0x521d82(0x131)](this);},SceneManager[_0x3f1f6b(0x497)]=function(){return this['_scene']&&this['_scene']['constructor']===Scene_Battle;},SceneManager[_0x3f1f6b(0x468)]=function(){const _0x2c1773=_0x3f1f6b;return Spriteset_Battle['prototype'][_0x2c1773(0x6e8)]();},SceneManager[_0x3f1f6b(0xf6)]=function(){const _0x408410=_0x3f1f6b;if(SceneManager[_0x408410(0x46e)](Scene_Options))return!![];return![];},SceneManager[_0x3f1f6b(0xdb)]=function(){const _0x47c5dd=_0x3f1f6b;if(SceneManager[_0x47c5dd(0x7ff)](Scene_Options))return!![];return![];},VisuMZ[_0x3f1f6b(0x32d)]['Game_Temp_requestAnimation']=Game_Temp[_0x3f1f6b(0x457)][_0x3f1f6b(0x2e0)],Game_Temp[_0x3f1f6b(0x457)]['requestAnimation']=function(_0x652cad,_0x2ea88c,_0x1f195e){const _0x432d83=_0x3f1f6b;_0x652cad=_0x652cad[_0x432d83(0x744)]((_0x24b2bc,_0x4be2c2,_0x25973)=>_0x25973[_0x432d83(0x6c5)](_0x24b2bc)===_0x4be2c2),SceneManager['isSceneBattle']()&&SceneManager[_0x432d83(0x468)]()&&(_0x1f195e=!_0x1f195e),VisuMZ[_0x432d83(0x32d)][_0x432d83(0x692)][_0x432d83(0x131)](this,_0x652cad,_0x2ea88c,_0x1f195e),SceneManager[_0x432d83(0x497)]()&&BattleManager[_0x432d83(0x1b3)][_0x432d83(0x1da)]();},Game_Temp[_0x3f1f6b(0x457)][_0x3f1f6b(0x74c)]=function(_0x14a2a3){const _0x5e3eb6=_0x3f1f6b;this[_0x5e3eb6(0x399)]=_0x14a2a3;},Game_Temp['prototype'][_0x3f1f6b(0x578)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x3f1f6b(0x457)][_0x3f1f6b(0x3ee)]=function(){const _0x51d0b1=_0x3f1f6b;this[_0x51d0b1(0x82f)]=undefined;},Game_Temp['prototype'][_0x3f1f6b(0x615)]=function(_0x2fb5c7){const _0x4872af=_0x3f1f6b;$gameMap&&$dataMap&&$dataMap['note']&&this[_0x4872af(0x43d)]($dataMap[_0x4872af(0x4e8)]);const _0x9b7887=$dataTroops[_0x2fb5c7];_0x9b7887&&this['parseForcedGameTroopSettingsBattleCore'](_0x9b7887[_0x4872af(0x528)]);},Game_Temp['prototype'][_0x3f1f6b(0x43d)]=function(_0x234cf8){const _0x5430f1=_0x3f1f6b;if(!_0x234cf8)return;if(_0x234cf8[_0x5430f1(0x7c7)](/<(?:BATTLELAYOUT|BATTLE LAYOUT|LAYOUT):[ ](.*)>/i)){const _0x167de8=String(RegExp['$1']);if(_0x167de8[_0x5430f1(0x7c7)](/DEFAULT/i))this['_forcedBattleLayout']='default';else{if(_0x167de8['match'](/LIST/i))this['_forcedBattleLayout']=_0x5430f1(0x5f8);else{if(_0x167de8[_0x5430f1(0x7c7)](/XP/i))this[_0x5430f1(0x82f)]='xp';else{if(_0x167de8['match'](/PORTRAIT/i))this[_0x5430f1(0x82f)]=_0x5430f1(0x35f);else _0x167de8[_0x5430f1(0x7c7)](/BORDER/i)&&(this[_0x5430f1(0x82f)]=_0x5430f1(0x77b));}}}}},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x6ef)]=Game_System[_0x3f1f6b(0x457)][_0x3f1f6b(0x138)],Game_System[_0x3f1f6b(0x457)][_0x3f1f6b(0x138)]=function(){const _0xb3316e=_0x3f1f6b;VisuMZ[_0xb3316e(0x32d)][_0xb3316e(0x6ef)][_0xb3316e(0x131)](this),this[_0xb3316e(0x7b3)]();},Game_System['prototype']['initBattleCore']=function(){const _0x3627e7=_0x3f1f6b;this[_0x3627e7(0x197)]=this['_defeatedEnemies']||[];},Game_System[_0x3f1f6b(0x457)][_0x3f1f6b(0x84f)]=function(){const _0x2fbefe=_0x3f1f6b;if(this[_0x2fbefe(0x197)]===undefined)this[_0x2fbefe(0x7b3)]();return this[_0x2fbefe(0x197)];},Game_System[_0x3f1f6b(0x457)][_0x3f1f6b(0x579)]=function(_0x4ca5e3){const _0x50104f=_0x3f1f6b;if(this[_0x50104f(0x197)]===undefined)this[_0x50104f(0x7b3)]();if(!_0x4ca5e3)return;if(this[_0x50104f(0x197)][_0x50104f(0x354)](_0x4ca5e3))return;this[_0x50104f(0x197)][_0x50104f(0x547)](_0x4ca5e3),this['_defeatedEnemies'][_0x50104f(0x73f)]((_0x28cc30,_0x5a46d0)=>_0x28cc30-_0x5a46d0);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x265)]=Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x731)],Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x731)]=function(_0x324f40){const _0x1af40d=_0x3f1f6b,_0x2ee326=this[_0x1af40d(0x142)](),_0x94dc8e=this[_0x1af40d(0x68b)]();VisuMZ[_0x1af40d(0x32d)][_0x1af40d(0x265)]['call'](this,_0x324f40),this[_0x1af40d(0x7f8)]()&&_0x2ee326&&this[_0x1af40d(0x641)]()&&(this['_visualHpGauge_JustDied']=!this[_0x1af40d(0x609)](),$gameSystem['registerDefeatedEnemy'](this[_0x1af40d(0x710)]())),SceneManager['isSceneBattle']()&&_0x94dc8e!==this['stateMotionIndex']()&&(this[_0x1af40d(0x5cb)]()&&this['battler']()['refreshMotion']());},Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x609)]=function(){const _0x25a9c0=_0x3f1f6b;return $gameSystem[_0x25a9c0(0x84f)]()['includes'](this[_0x25a9c0(0x375)]);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x38a)]=Game_BattlerBase[_0x3f1f6b(0x457)]['eraseState'],Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x74a)]=function(_0x4d93ab){const _0x263f54=_0x3f1f6b;VisuMZ[_0x263f54(0x32d)][_0x263f54(0x38a)]['call'](this,_0x4d93ab),this[_0x263f54(0x7f8)]()&&_0x4d93ab===this[_0x263f54(0x20e)]()&&this[_0x263f54(0x142)]()&&(this[_0x263f54(0x777)]=![]),SceneManager[_0x263f54(0x497)]()&&this['requestMotionRefresh']();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x75c)]=Game_Action[_0x3f1f6b(0x457)]['clear'],Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0xae)]=function(){const _0x9e8289=_0x3f1f6b;VisuMZ[_0x9e8289(0x32d)][_0x9e8289(0x75c)][_0x9e8289(0x131)](this),this[_0x9e8289(0x70f)]={'arPenRate':0x0,'arPenFlat':0x0,'arRedRate':0x0,'arRedFlat':0x0},this['_multipliers']={'criticalHitRate':0x1,'criticalHitFlat':0x0,'criticalDmgRate':0x1,'criticalDmgFlat':0x0,'damageRate':0x1,'damageFlat':0x0,'hitRate':0x1,'hitFlat':0x0},this[_0x9e8289(0x440)]='default';},Game_Action[_0x3f1f6b(0x457)]['makeDamageValue']=function(_0x3bf89c,_0x2ca33d){const _0x443931=_0x3f1f6b;return VisuMZ[_0x443931(0x32d)][_0x443931(0x3e9)]['Damage'][_0x443931(0x63c)][_0x443931(0x131)](this,_0x3bf89c,_0x2ca33d);},Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x5c9)]=function(_0x571888,_0x703911){const _0x293ec1=_0x3f1f6b;return VisuMZ[_0x293ec1(0x32d)][_0x293ec1(0x3e9)][_0x293ec1(0x282)][_0x293ec1(0x3e2)][_0x293ec1(0x131)](this,_0x571888,_0x703911);},Game_Action[_0x3f1f6b(0x457)]['applyGuard']=function(_0x5d75ff,_0x4af607){const _0x4b23f4=_0x3f1f6b;return VisuMZ[_0x4b23f4(0x32d)][_0x4b23f4(0x3e9)][_0x4b23f4(0x282)][_0x4b23f4(0x10a)][_0x4b23f4(0x131)](this,_0x5d75ff,_0x4af607);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x34a)]=Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x3f3)],Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x3f3)]=function(_0x16389f){const _0x1191a8=_0x3f1f6b,_0x5d0b50=this[_0x1191a8(0x187)]()[_0x1191a8(0x4e8)];if(_0x5d0b50[_0x1191a8(0x7c7)](/<ALWAYS HIT>/i))return 0x1;else{if(_0x5d0b50['match'](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return Number(RegExp['$1'])/0x64;else{let _0x3b1ce4=VisuMZ['BattleCore']['Game_Action_itemHit'][_0x1191a8(0x131)](this,_0x16389f);return _0x3b1ce4=this[_0x1191a8(0x5ba)][_0x1191a8(0x27a)]*_0x3b1ce4+this[_0x1191a8(0x5ba)][_0x1191a8(0x6f9)],_0x3b1ce4;}}},Game_Action['prototype'][_0x3f1f6b(0x4d2)]=function(_0x55e198){const _0x2a7e34=_0x3f1f6b;if(!this[_0x2a7e34(0x187)]()[_0x2a7e34(0x434)][_0x2a7e34(0x72b)])return 0x0;let _0x1c401f=VisuMZ[_0x2a7e34(0x32d)]['Settings']['Damage'][_0x2a7e34(0x59d)][_0x2a7e34(0x131)](this,_0x55e198);return _0x1c401f=this[_0x2a7e34(0x5ba)]['criticalHitRate']*_0x1c401f+this[_0x2a7e34(0x5ba)][_0x2a7e34(0x419)],_0x1c401f;},Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x2cf)]=function(_0x4eeda6){const _0x322bcd=_0x3f1f6b;return _0x4eeda6=VisuMZ[_0x322bcd(0x32d)][_0x322bcd(0x3e9)][_0x322bcd(0x282)][_0x322bcd(0x4df)][_0x322bcd(0x131)](this,_0x4eeda6),_0x4eeda6=this[_0x322bcd(0x5ba)][_0x322bcd(0x3c7)]*_0x4eeda6+this[_0x322bcd(0x5ba)][_0x322bcd(0x3e6)],_0x4eeda6;},VisuMZ[_0x3f1f6b(0x32d)]['Game_Action_evalDamageFormula']=Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x6b7)],Game_Action['prototype'][_0x3f1f6b(0x6b7)]=function(_0x3719fd){const _0x45ad32=_0x3f1f6b;if(this['_customDamageFormula']!==_0x45ad32(0x6f0))return this[_0x45ad32(0x436)](_0x3719fd);else return DataManager[_0x45ad32(0x20d)](this[_0x45ad32(0x187)]())===_0x45ad32(0x566)?VisuMZ[_0x45ad32(0x32d)][_0x45ad32(0x4bd)]['call'](this,_0x3719fd):this[_0x45ad32(0x47c)](_0x3719fd);},Game_Action['prototype'][_0x3f1f6b(0x6cb)]=function(_0x2fc045){const _0x1b1b2d=_0x3f1f6b;this[_0x1b1b2d(0x440)]=_0x2fc045;},Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x436)]=function(_0x9aa311){const _0x378008=_0x3f1f6b,_0x563661=this[_0x378008(0x187)](),_0x303404=_0x563661[_0x378008(0x434)][_0x378008(0x662)];_0x563661[_0x378008(0x434)]['formula']=this[_0x378008(0x440)];let _0x5151ee=VisuMZ[_0x378008(0x32d)][_0x378008(0x4bd)]['call'](this,_0x9aa311);return _0x563661[_0x378008(0x434)][_0x378008(0x662)]=_0x303404,_0x5151ee;},Game_Action['prototype'][_0x3f1f6b(0x4a9)]=function(){const _0x15b806=_0x3f1f6b;if(this['item']()[_0x15b806(0x4e8)][_0x15b806(0x7c7)](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x53379f=String(RegExp['$1'])[_0x15b806(0x23a)]()[_0x15b806(0x6da)]();return _0x53379f;}return _0x15b806(0x566);},Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x47c)]=function(_0x114c6a){const _0x30fbf2=_0x3f1f6b,_0x390f21=DataManager[_0x30fbf2(0x20d)](this[_0x30fbf2(0x187)]()),_0x4ae30f=VisuMZ['DamageStyles'][_0x390f21];try{return _0x4ae30f['Formula'][_0x30fbf2(0x131)](this,_0x114c6a);}catch(_0x55cb34){if($gameTemp['isPlaytest']())console['log'](_0x55cb34);return VisuMZ[_0x30fbf2(0x32d)]['Game_Action_evalDamageFormula'][_0x30fbf2(0x131)](this);}},Game_Action[_0x3f1f6b(0x457)]['applyArmorModifiers']=function(_0x591a09,_0x208d78){const _0xbadd34=_0x3f1f6b;if(this[_0xbadd34(0x75f)]())return _0x208d78;const _0x2bb5e5=this[_0xbadd34(0xe7)](),_0x46fef8=_0x591a09;let _0xc2acf9=[],_0x25db9f=[];_0xc2acf9[_0xbadd34(0x547)](this[_0xbadd34(0x70f)][_0xbadd34(0x26e)],this[_0xbadd34(0x70f)][_0xbadd34(0xb5)]),_0x25db9f['push'](this[_0xbadd34(0x70f)][_0xbadd34(0x30b)],this[_0xbadd34(0x70f)][_0xbadd34(0x709)]);const _0x2ccdf5=this[_0xbadd34(0xce)]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)>/i,_0x113383=this['isPhysical']()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)([%％])>/i,_0x59463e=this[_0xbadd34(0xce)]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)>/i,_0x57b67c=this[_0xbadd34(0xce)]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)([%％])>/i;return _0xc2acf9=_0xc2acf9['concat'](_0x46fef8[_0xbadd34(0x66e)]()[_0xbadd34(0x255)](_0x5a09d5=>_0x5a09d5&&_0x5a09d5[_0xbadd34(0x4e8)]['match'](_0x2ccdf5)?Number(RegExp['$1']):0x0)),_0x25db9f=_0x25db9f[_0xbadd34(0x7a0)](_0x46fef8[_0xbadd34(0x66e)]()[_0xbadd34(0x255)](_0x5b6eaf=>_0x5b6eaf&&_0x5b6eaf[_0xbadd34(0x4e8)][_0xbadd34(0x7c7)](_0x113383)?Number(RegExp['$1'])/0x64:0x0)),_0xc2acf9=_0xc2acf9[_0xbadd34(0x7a0)](_0x2bb5e5[_0xbadd34(0x66e)]()[_0xbadd34(0x255)](_0x23244a=>_0x23244a&&_0x23244a['note'][_0xbadd34(0x7c7)](_0x59463e)?Number(RegExp['$1']):0x0)),_0x25db9f=_0x25db9f[_0xbadd34(0x7a0)](_0x2bb5e5[_0xbadd34(0x66e)]()[_0xbadd34(0x255)](_0x6049a0=>_0x6049a0&&_0x6049a0[_0xbadd34(0x4e8)][_0xbadd34(0x7c7)](_0x57b67c)?Number(RegExp['$1'])/0x64:0x0)),this[_0xbadd34(0x187)]()[_0xbadd34(0x4e8)][_0xbadd34(0x7c7)](_0x59463e)&&_0xc2acf9[_0xbadd34(0x547)](Number(RegExp['$1'])),this[_0xbadd34(0x187)]()[_0xbadd34(0x4e8)][_0xbadd34(0x7c7)](_0x57b67c)&&_0x25db9f['push'](Number(RegExp['$1'])),_0x208d78=_0xc2acf9['reduce']((_0x53f1ed,_0x47fc7b)=>_0x53f1ed-_0x47fc7b,_0x208d78),_0x208d78>0x0&&(_0x208d78=_0x25db9f[_0xbadd34(0x460)]((_0x4ce61d,_0x300051)=>_0x4ce61d*(0x1-_0x300051),_0x208d78)),_0x208d78;},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x4d0)]=Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x235)],Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x235)]=function(_0x20d24e,_0x470422){const _0x410f85=_0x3f1f6b;_0x470422=_0x470422*this[_0x410f85(0x5ba)][_0x410f85(0x20a)],_0x470422+=this['_multipliers']['damageFlat']*(_0x470422>=0x0?0x1:-0x1),_0x470422=this[_0x410f85(0x297)](_0x410f85(0x11f),_0x20d24e,_0x470422,![]),_0x470422=this['applyDamageCaps'](_0x470422),_0x470422=Math[_0x410f85(0x5a7)](_0x470422),this[_0x410f85(0x15a)]=_0x470422,this[_0x410f85(0x554)]=this['_totalValue']||0x0,this[_0x410f85(0x554)]+=_0x470422,VisuMZ['BattleCore'][_0x410f85(0x4d0)][_0x410f85(0x131)](this,_0x20d24e,_0x470422),this['applyBattleCoreJS'](_0x410f85(0x66a),_0x20d24e,_0x470422,!![]);},Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x3bc)]=function(_0x114c7d){const _0x423bec=_0x3f1f6b;if(this['isBypassDamageCap']())return _0x114c7d;return _0x114c7d=this[_0x423bec(0x180)](_0x114c7d),_0x114c7d=this[_0x423bec(0x44d)](_0x114c7d),_0x114c7d;},Game_Action['prototype']['isBypassDamageCap']=function(){const _0x336deb=_0x3f1f6b,_0x304a5c=/<BYPASS DAMAGE CAP>/i;if(this['item']()[_0x336deb(0x4e8)]['match'](_0x304a5c))return!![];if(this['subject']()['traitObjects']()['some'](_0x4b1ff2=>_0x4b1ff2&&_0x4b1ff2['note'][_0x336deb(0x7c7)](_0x304a5c)))return!![];return!VisuMZ['BattleCore'][_0x336deb(0x3e9)][_0x336deb(0x282)][_0x336deb(0x53a)];},Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x180)]=function(_0x3a641d){const _0x2f3ff7=_0x3f1f6b;if(!VisuMZ[_0x2f3ff7(0x32d)]['Settings'][_0x2f3ff7(0x282)][_0x2f3ff7(0x32c)])return _0x3a641d;const _0x3969fb=/<BYPASS SOFT DAMAGE CAP>/i;if(this[_0x2f3ff7(0x187)]()[_0x2f3ff7(0x4e8)][_0x2f3ff7(0x7c7)](_0x3969fb))return!![];if(this['subject']()[_0x2f3ff7(0x66e)]()[_0x2f3ff7(0x11e)](_0x15345c=>_0x15345c&&_0x15345c[_0x2f3ff7(0x4e8)][_0x2f3ff7(0x7c7)](_0x3969fb)))return!![];const _0x5a26ec=_0x3a641d<0x0?-0x1:0x1;_0x3a641d=Math[_0x2f3ff7(0x3c0)](_0x3a641d);let _0x30ba89=this[_0x2f3ff7(0xe7)]()[_0x2f3ff7(0x130)]();this[_0x2f3ff7(0x187)]()[_0x2f3ff7(0x4e8)]['match'](/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i)&&(_0x30ba89+=Number(RegExp['$1'])/0x64);_0x30ba89=_0x30ba89[_0x2f3ff7(0x3a8)](0.01,0x1);const _0x31e191=this['getHardDamageCap'](),_0x4d4bb5=_0x30ba89*_0x31e191;if(_0x3a641d>_0x4d4bb5&&_0x31e191>_0x4d4bb5){_0x3a641d-=_0x4d4bb5;const _0x551b73=VisuMZ[_0x2f3ff7(0x32d)][_0x2f3ff7(0x3e9)][_0x2f3ff7(0x282)][_0x2f3ff7(0x176)],_0x28d9e9=Math[_0x2f3ff7(0x39f)](0x1-_0x3a641d/((_0x31e191-_0x4d4bb5)*_0x551b73+_0x3a641d),0.01);_0x3a641d*=_0x28d9e9,_0x3a641d+=_0x4d4bb5;}return _0x3a641d*_0x5a26ec;},Game_Action[_0x3f1f6b(0x457)]['getHardDamageCap']=function(){const _0x5e3dcd=_0x3f1f6b;return this[_0x5e3dcd(0x187)]()['note']['match'](/<DAMAGE CAP:[ ](\d+)>/i)?Number(RegExp['$1']):this[_0x5e3dcd(0xe7)]()[_0x5e3dcd(0x599)]();},Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x44d)]=function(_0x32e45c){const _0x18d176=_0x3f1f6b;let _0x55388e=this[_0x18d176(0x6a5)]();return _0x32e45c[_0x18d176(0x3a8)](-_0x55388e,_0x55388e);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x39e)]=Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x2eb)],Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x2eb)]=function(_0x4d2b54){const _0x3b1cd4=_0x3f1f6b;this['applyBattleCoreJS']('PreApply%1JS',_0x4d2b54,0x0,!![]),VisuMZ['BattleCore'][_0x3b1cd4(0x39e)][_0x3b1cd4(0x131)](this,_0x4d2b54),this['applyBattleCoreJS']('PostApply%1JS',_0x4d2b54,this[_0x3b1cd4(0x15a)]||0x0,!![]),this['applyResultSwitches'](_0x4d2b54);},Game_Action[_0x3f1f6b(0x457)]['applyBattleCoreJS']=function(_0x59fdb4,_0x3d84fa,_0x225c76,_0xb30e61){const _0xd6c9f8=_0x3f1f6b;_0x225c76=_0x225c76||0x0;const _0x11a0ee=_0x225c76,_0x29d185=VisuMZ['BattleCore'][_0xd6c9f8(0x3e9)]['Mechanics'],_0x3e9fa7=_0x59fdb4[_0xd6c9f8(0xb7)]('');if(_0x29d185[_0x3e9fa7]){_0x225c76=_0x29d185[_0x3e9fa7][_0xd6c9f8(0x131)](this,_0x225c76,_0x3d84fa);if(_0xb30e61)_0x225c76=_0x11a0ee;}let _0x547a32=VisuMZ[_0xd6c9f8(0x32d)][_0xd6c9f8(0x1bb)](this['item'](),_0x59fdb4['format'](''));if(VisuMZ['BattleCore']['JS'][_0x547a32]){_0x225c76=VisuMZ[_0xd6c9f8(0x32d)]['JS'][_0x547a32][_0xd6c9f8(0x131)](this,this['subject'](),_0x3d84fa,this[_0xd6c9f8(0x187)](),_0x225c76);if(_0xb30e61)_0x225c76=_0x11a0ee;}for(const _0x5c826e of this[_0xd6c9f8(0xe7)]()[_0xd6c9f8(0x66e)]()){if(!_0x5c826e)continue;_0x547a32=VisuMZ[_0xd6c9f8(0x32d)][_0xd6c9f8(0x1bb)](_0x5c826e,_0x59fdb4[_0xd6c9f8(0xb7)](_0xd6c9f8(0x4ef)));if(VisuMZ[_0xd6c9f8(0x32d)]['JS'][_0x547a32]){_0x225c76=VisuMZ[_0xd6c9f8(0x32d)]['JS'][_0x547a32][_0xd6c9f8(0x131)](this,this[_0xd6c9f8(0xe7)](),_0x3d84fa,_0x5c826e,_0x225c76);if(_0xb30e61)_0x225c76=_0x11a0ee;}}for(const _0x2586c7 of _0x3d84fa[_0xd6c9f8(0x66e)]()){if(!_0x2586c7)continue;_0x547a32=VisuMZ[_0xd6c9f8(0x32d)][_0xd6c9f8(0x1bb)](_0x2586c7,_0x59fdb4['format'](_0xd6c9f8(0x83d)));if(VisuMZ[_0xd6c9f8(0x32d)]['JS'][_0x547a32]){_0x225c76=VisuMZ[_0xd6c9f8(0x32d)]['JS'][_0x547a32][_0xd6c9f8(0x131)](this,this['subject'](),_0x3d84fa,_0x2586c7,_0x225c76);if(_0xb30e61)_0x225c76=_0x11a0ee;}}return _0x225c76;},Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x561)]=function(_0x18e92f){const _0x6d546a=_0x3f1f6b,_0xc19176=this[_0x6d546a(0x554)]||0x0,_0x848170=VisuMZ[_0x6d546a(0x32d)]['Settings'][_0x6d546a(0x433)],_0x123799=_0x18e92f[_0x6d546a(0xb7)]('');_0x848170[_0x123799]&&_0x848170[_0x123799][_0x6d546a(0x131)](this,_0xc19176);let _0x877059=VisuMZ[_0x6d546a(0x32d)]['createKeyJS'](this[_0x6d546a(0x187)](),_0x18e92f);VisuMZ[_0x6d546a(0x32d)]['JS'][_0x877059]&&VisuMZ[_0x6d546a(0x32d)]['JS'][_0x877059][_0x6d546a(0x131)](this,this[_0x6d546a(0xe7)](),this[_0x6d546a(0xe7)](),this[_0x6d546a(0x187)](),_0xc19176);for(const _0xcb9aee of this[_0x6d546a(0xe7)]()[_0x6d546a(0x66e)]()){if(!_0xcb9aee)continue;_0x877059=VisuMZ[_0x6d546a(0x32d)][_0x6d546a(0x1bb)](_0xcb9aee,_0x18e92f),VisuMZ[_0x6d546a(0x32d)]['JS'][_0x877059]&&VisuMZ['BattleCore']['JS'][_0x877059][_0x6d546a(0x131)](this,this[_0x6d546a(0xe7)](),this['subject'](),_0xcb9aee,_0xc19176);}},Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x126)]=function(){const _0x317e65=_0x3f1f6b;return VisuMZ[_0x317e65(0x32d)][_0x317e65(0x3e9)]['Mechanics']['CalcActionSpeedJS'][_0x317e65(0x131)](this);},Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x4d8)]=function(){const _0xe6fc62=_0x3f1f6b;return VisuMZ[_0xe6fc62(0x32d)][_0xe6fc62(0x3e9)]['Mechanics'][_0xe6fc62(0x758)];},Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x390)]=function(){const _0x4a99c6=_0x3f1f6b;return this[_0x4a99c6(0x187)]()[_0x4a99c6(0x4e8)]['match'](/<JS TARGETS>/i);},Game_Action[_0x3f1f6b(0x457)]['isBattleCoreTargetScope']=function(){const _0x5cb277=_0x3f1f6b;if(!this[_0x5cb277(0x10d)]&&this['subject']()[_0x5cb277(0x74b)]())return![];if(this[_0x5cb277(0x390)]())return!![];return typeof this[_0x5cb277(0x187)]()[_0x5cb277(0x41f)]===_0x5cb277(0x687);},VisuMZ[_0x3f1f6b(0x32d)]['Game_Action_isForOpponent']=Game_Action[_0x3f1f6b(0x457)]['isForOpponent'],Game_Action[_0x3f1f6b(0x457)]['isForOpponent']=function(){const _0x4ea9e9=_0x3f1f6b;return this[_0x4ea9e9(0x519)]()&&!this[_0x4ea9e9(0x390)]()?this['isForOpponentBattleCore']():VisuMZ[_0x4ea9e9(0x32d)][_0x4ea9e9(0x473)][_0x4ea9e9(0x131)](this);},Game_Action['prototype'][_0x3f1f6b(0x50c)]=function(){const _0x442dd3=_0x3f1f6b,_0x1e88c6=this['item']()[_0x442dd3(0x41f)];return _0x1e88c6[_0x442dd3(0x7c7)](/(?:ENEMY|ENEMIES|FOE|FOES)/i);},VisuMZ['BattleCore'][_0x3f1f6b(0x136)]=Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x823)],Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x823)]=function(){const _0x225986=_0x3f1f6b;return this[_0x225986(0x519)]()&&!this[_0x225986(0x390)]()?this['isForFriendBattleCore']():VisuMZ[_0x225986(0x32d)][_0x225986(0x136)][_0x225986(0x131)](this);},Game_Action['prototype'][_0x3f1f6b(0x48c)]=function(){const _0x3485af=_0x3f1f6b,_0x5db5aa=this['item']()[_0x3485af(0x41f)];return _0x5db5aa['match'](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);},VisuMZ[_0x3f1f6b(0x32d)]['Game_Action_isForRandom']=Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x393)],Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x393)]=function(){const _0x3e797e=_0x3f1f6b;return this['isBattleCoreTargetScope']()&&!this[_0x3e797e(0x390)]()?this[_0x3e797e(0x448)]():VisuMZ[_0x3e797e(0x32d)][_0x3e797e(0x305)][_0x3e797e(0x131)](this);},Game_Action['prototype'][_0x3f1f6b(0x448)]=function(){const _0x22f7ff=_0x3f1f6b,_0x4ae493=this['item']()[_0x22f7ff(0x41f)];return _0x4ae493['match'](/(?:RAND|RANDOM)/i);},VisuMZ[_0x3f1f6b(0x32d)]['Game_Action_needsSelection']=Game_Action[_0x3f1f6b(0x457)]['needsSelection'],Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x5f3)]=function(){const _0x4204dd=_0x3f1f6b;return this[_0x4204dd(0x519)]()&&!this[_0x4204dd(0x390)]()?this[_0x4204dd(0x630)]():VisuMZ[_0x4204dd(0x32d)][_0x4204dd(0x31b)][_0x4204dd(0x131)](this);},Game_Action['prototype'][_0x3f1f6b(0x630)]=function(){const _0x5da7ae=_0x3f1f6b,_0x1fa97a=this[_0x5da7ae(0x187)]()[_0x5da7ae(0x41f)];if(_0x1fa97a[_0x5da7ae(0x7c7)](/RANDOM/i))return![];return VisuMZ[_0x5da7ae(0x32d)][_0x5da7ae(0x31b)]['call'](this);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x10b)]=Game_Action[_0x3f1f6b(0x457)]['makeTargets'],Game_Action['prototype'][_0x3f1f6b(0x249)]=function(){const _0x1516d5=_0x3f1f6b;let _0x2d5e22=[];return this['isBattleCoreTargetScope']()?_0x2d5e22=this[_0x1516d5(0x35d)]():_0x2d5e22=VisuMZ[_0x1516d5(0x32d)][_0x1516d5(0x10b)][_0x1516d5(0x131)](this),_0x2d5e22=this[_0x1516d5(0x425)](_0x2d5e22),_0x2d5e22;},Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x35d)]=function(){const _0x3a5c59=_0x3f1f6b;let _0x56c4f7=[];const _0x2e421f=String(this[_0x3a5c59(0x187)]()[_0x3a5c59(0x41f)]),_0x1c2bd7=VisuMZ[_0x3a5c59(0x32d)]['createKeyJS'](this[_0x3a5c59(0x187)](),_0x3a5c59(0x613));if(VisuMZ[_0x3a5c59(0x32d)]['JS'][_0x1c2bd7]){const _0x5bdc2e=VisuMZ[_0x3a5c59(0x32d)][_0x3a5c59(0x1bb)](this[_0x3a5c59(0x187)](),_0x3a5c59(0x613));return _0x56c4f7=VisuMZ[_0x3a5c59(0x32d)]['JS'][_0x5bdc2e][_0x3a5c59(0x131)](this,this[_0x3a5c59(0xe7)](),_0x56c4f7),this[_0x3a5c59(0x559)](_0x56c4f7);}if(_0x2e421f[_0x3a5c59(0x7c7)](/(\d+) RANDOM ANY/i)){let _0x54e66d=Number(RegExp['$1']);while(_0x54e66d--){const _0x4b5f7e=Math[_0x3a5c59(0x2b0)](0x2)===0x0?this[_0x3a5c59(0x30a)]():this[_0x3a5c59(0x775)]();_0x56c4f7['push'](_0x4b5f7e[_0x3a5c59(0xf0)]());}return this[_0x3a5c59(0x559)](_0x56c4f7);}if(_0x2e421f[_0x3a5c59(0x7c7)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){let _0x2a25f1=Number(RegExp['$1']);while(_0x2a25f1--){_0x56c4f7[_0x3a5c59(0x547)](this[_0x3a5c59(0x30a)]()['trueRandomTarget']());}return this[_0x3a5c59(0x559)](_0x56c4f7);}if(_0x2e421f[_0x3a5c59(0x7c7)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){let _0x2b1f5b=Number(RegExp['$1']);while(_0x2b1f5b--){_0x56c4f7[_0x3a5c59(0x547)](this[_0x3a5c59(0x775)]()[_0x3a5c59(0xf0)]());}return this['repeatTargets'](_0x56c4f7);}if(_0x2e421f['match'](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x56c4f7[_0x3a5c59(0x547)](...this[_0x3a5c59(0x775)]()[_0x3a5c59(0x40c)]()[_0x3a5c59(0x744)](_0x229c82=>_0x229c82!==this[_0x3a5c59(0xe7)]())),this['repeatTargets'](_0x56c4f7);return VisuMZ[_0x3a5c59(0x32d)][_0x3a5c59(0x10b)][_0x3a5c59(0x131)](this);},Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x483)]=function(_0x298051){const _0x11233d=_0x3f1f6b,_0x594586=[];for(let _0x5f2ee7=0x0;_0x5f2ee7<this[_0x11233d(0x74d)]();_0x5f2ee7++){_0x594586[_0x11233d(0x547)](_0x298051[_0x11233d(0xf0)]());}return _0x594586;},Game_Action[_0x3f1f6b(0x457)]['applyTargetFilters']=function(_0x7db9b1){const _0x4f25d1=_0x3f1f6b;if(!this[_0x4f25d1(0x187)]())return _0x7db9b1;const _0x109721=this['item']()['note'];return _0x7db9b1;},VisuMZ['BattleCore']['Game_Action_itemEffectAddAttackState']=Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x1a0)],Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x1a0)]=function(_0x2037d7,_0x11c92a){const _0x570494=_0x3f1f6b,_0x3fa8ad=_0x2037d7[_0x570494(0x201)]();this['subject']()[_0x570494(0x659)]()[_0x570494(0x354)](_0x2037d7[_0x570494(0x20e)]())&&_0x2037d7[_0x570494(0x7c2)](![]),VisuMZ['BattleCore'][_0x570494(0xe9)]['call'](this,_0x2037d7,_0x11c92a),_0x2037d7[_0x570494(0x7c2)](_0x3fa8ad);},VisuMZ[_0x3f1f6b(0x32d)]['Game_Action_itemEffectAddNormalState']=Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x489)],Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x489)]=function(_0x202a9f,_0x1efbf8){const _0x334fd4=_0x3f1f6b,_0x595d1d=_0x202a9f['isImmortal']();_0x1efbf8[_0x334fd4(0x2c9)]===_0x202a9f[_0x334fd4(0x20e)]()&&_0x202a9f[_0x334fd4(0x7c2)](![]),VisuMZ[_0x334fd4(0x32d)][_0x334fd4(0x2fc)]['call'](this,_0x202a9f,_0x1efbf8),_0x202a9f['setImmortal'](_0x595d1d);},VisuMZ[_0x3f1f6b(0x32d)]['Game_Action_applyGlobal']=Game_Action[_0x3f1f6b(0x457)]['applyGlobal'],Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x570)]=function(){const _0x43cb69=_0x3f1f6b;VisuMZ[_0x43cb69(0x32d)][_0x43cb69(0x105)]['call'](this),this[_0x43cb69(0x38e)](),this['resetResultSwitches']();},Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x38e)]=function(){const _0x301aec=_0x3f1f6b;if(!SceneManager[_0x301aec(0x497)]())return;const _0x850dcf=/<COMMON (?:EVENT|EVENTS):[ ](.*)>/gi,_0x4b665b=this[_0x301aec(0x187)]()['note'][_0x301aec(0x7c7)](_0x850dcf);if(_0x4b665b)for(const _0x310586 of _0x4b665b){if(!_0x310586)continue;_0x310586[_0x301aec(0x7c7)](_0x850dcf);const _0x38f531=String(RegExp['$1'])[_0x301aec(0x833)](',')['map'](_0x129520=>String(_0x129520)[_0x301aec(0x6da)]()),_0x37aa71=_0x38f531[_0x301aec(0x255)](_0x493d05=>DataManager[_0x301aec(0x5b9)](_0x493d05));for(const _0x5d35b2 of _0x37aa71){const _0xf2e6e4=$dataCommonEvents[_0x5d35b2];_0xf2e6e4&&$gameTemp[_0x301aec(0x761)](_0x5d35b2);}}},DataManager[_0x3f1f6b(0x5b9)]=function(_0x56c7fc){const _0x353030=_0x3f1f6b;_0x56c7fc=_0x56c7fc[_0x353030(0x23a)]()[_0x353030(0x6da)](),this[_0x353030(0x768)]=this[_0x353030(0x768)]||{};if(this[_0x353030(0x768)][_0x56c7fc])return this['_commonEventIDs'][_0x56c7fc];for(const _0x2ef12c of $dataCommonEvents){if(!_0x2ef12c)continue;let _0xacb643=_0x2ef12c[_0x353030(0x528)];_0xacb643=_0xacb643[_0x353030(0x669)](/\x1I\[(\d+)\]/gi,''),_0xacb643=_0xacb643[_0x353030(0x669)](/\\I\[(\d+)\]/gi,''),this[_0x353030(0x768)][_0xacb643[_0x353030(0x23a)]()[_0x353030(0x6da)]()]=_0x2ef12c['id'];}return this[_0x353030(0x768)][_0x56c7fc]||0x0;},Game_Action[_0x3f1f6b(0x457)][_0x3f1f6b(0x254)]=function(){const _0x27b24e=_0x3f1f6b;if(!SceneManager['isSceneBattle']())return;const _0x117c52=VisuMZ['BattleCore'][_0x27b24e(0x3e9)][_0x27b24e(0x433)];_0x117c52[_0x27b24e(0x5ab)]&&$gameSwitches[_0x27b24e(0x7ba)](_0x117c52[_0x27b24e(0x5ab)],![]),_0x117c52[_0x27b24e(0x4fd)]&&$gameSwitches[_0x27b24e(0x7ba)](_0x117c52[_0x27b24e(0x4fd)],![]),_0x117c52[_0x27b24e(0x225)]&&$gameVariables['setValue'](_0x117c52[_0x27b24e(0x225)],0x0),_0x117c52[_0x27b24e(0x14b)]&&$gameVariables['setValue'](_0x117c52['VariableHeal'],0x0);},Game_Action[_0x3f1f6b(0x457)]['applyResultSwitches']=function(_0x5c2d0d){const _0xa30c40=_0x3f1f6b;if(!SceneManager[_0xa30c40(0x497)]())return;if(!_0x5c2d0d)return;const _0x2fbf99=_0x5c2d0d[_0xa30c40(0x356)](),_0x45ebfa=VisuMZ[_0xa30c40(0x32d)][_0xa30c40(0x3e9)][_0xa30c40(0x433)];_0x45ebfa[_0xa30c40(0x5ab)]&&_0x2fbf99[_0xa30c40(0x72b)]&&$gameSwitches[_0xa30c40(0x7ba)](_0x45ebfa[_0xa30c40(0x5ab)],!![]);_0x45ebfa['SwitchMissEvade']&&(_0x2fbf99[_0xa30c40(0x514)]||_0x2fbf99[_0xa30c40(0x2b6)])&&$gameSwitches[_0xa30c40(0x7ba)](_0x45ebfa[_0xa30c40(0x4fd)],!![]);if(_0x45ebfa[_0xa30c40(0x225)]){let _0x25cd7b=$gameVariables[_0xa30c40(0x353)](_0x45ebfa[_0xa30c40(0x225)]);_0x2fbf99[_0xa30c40(0x195)]>0x0&&(_0x25cd7b+=Math[_0xa30c40(0x3c0)](_0x2fbf99[_0xa30c40(0x195)])),$gameVariables['setValue'](_0x45ebfa[_0xa30c40(0x225)],_0x25cd7b);}if(_0x45ebfa[_0xa30c40(0x14b)]){let _0x581750=$gameVariables[_0xa30c40(0x353)](_0x45ebfa['VariableHeal']);_0x2fbf99[_0xa30c40(0x195)]<0x0&&(_0x581750+=Math[_0xa30c40(0x3c0)](_0x2fbf99[_0xa30c40(0x195)])),$gameVariables['setValue'](_0x45ebfa[_0xa30c40(0x14b)],_0x581750);}},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x837)]=Game_BattlerBase[_0x3f1f6b(0x457)]['initMembers'],Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x5b4)]=function(){const _0x52a16f=_0x3f1f6b;VisuMZ[_0x52a16f(0x32d)][_0x52a16f(0x837)][_0x52a16f(0x131)](this),this[_0x52a16f(0x271)]();},Game_BattlerBase['prototype'][_0x3f1f6b(0x271)]=function(){const _0x473ad4=_0x3f1f6b;this[_0x473ad4(0x4a2)]=![];},VisuMZ['BattleCore'][_0x3f1f6b(0x372)]=Game_BattlerBase['prototype']['refresh'],Game_BattlerBase['prototype'][_0x3f1f6b(0x855)]=function(){const _0x40b06f=_0x3f1f6b;this[_0x40b06f(0x48a)]={},VisuMZ[_0x40b06f(0x32d)][_0x40b06f(0x372)]['call'](this);},Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x6f4)]=function(_0x270a32){const _0x10baad=_0x3f1f6b;return this[_0x10baad(0x48a)]=this[_0x10baad(0x48a)]||{},this[_0x10baad(0x48a)][_0x270a32]!==undefined;},Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x599)]=function(){const _0x82256f=_0x3f1f6b;if(this[_0x82256f(0x48a)][_0x82256f(0x599)]!==undefined)return this[_0x82256f(0x48a)]['hardDamageCap'];const _0x296375=/<DAMAGE CAP:[ ](\d+)>/i,_0x3d5dbc=this[_0x82256f(0x66e)]()[_0x82256f(0x255)](_0x5e1e8b=>_0x5e1e8b&&_0x5e1e8b[_0x82256f(0x4e8)][_0x82256f(0x7c7)](_0x296375)?Number(RegExp['$1']):0x0);let _0xe977ab=_0x3d5dbc[_0x82256f(0x135)]>0x0?Math[_0x82256f(0x39f)](..._0x3d5dbc):0x0;if(_0xe977ab<=0x0)_0xe977ab=VisuMZ[_0x82256f(0x32d)]['Settings'][_0x82256f(0x282)]['DefaultHardCap'];return this[_0x82256f(0x48a)][_0x82256f(0x599)]=_0xe977ab,this[_0x82256f(0x48a)][_0x82256f(0x599)];},Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x130)]=function(){const _0x1705b8=_0x3f1f6b;if(this[_0x1705b8(0x48a)][_0x1705b8(0x2f7)]!==undefined)return this[_0x1705b8(0x48a)]['softDamageCap'];let _0x43c0c3=VisuMZ['BattleCore'][_0x1705b8(0x3e9)][_0x1705b8(0x282)]['DefaultSoftCap'];const _0x4b2e98=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x415fe8=this[_0x1705b8(0x66e)]()[_0x1705b8(0x255)](_0xa92581=>_0xa92581&&_0xa92581['note'][_0x1705b8(0x7c7)](_0x4b2e98)?Number(RegExp['$1'])/0x64:0x0);return _0x43c0c3=_0x415fe8[_0x1705b8(0x460)]((_0x332894,_0x4f817d)=>_0x332894+_0x4f817d,_0x43c0c3),this['_cache']['softDamageCap']=_0x43c0c3,this[_0x1705b8(0x48a)][_0x1705b8(0x2f7)][_0x1705b8(0x3a8)](0.01,0x1);},VisuMZ['BattleCore'][_0x3f1f6b(0x6ab)]=Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x78b)],Game_BattlerBase[_0x3f1f6b(0x457)]['die']=function(){const _0x1ca728=_0x3f1f6b;VisuMZ[_0x1ca728(0x32d)][_0x1ca728(0x6ab)][_0x1ca728(0x131)](this),SceneManager[_0x1ca728(0x497)]()&&this[_0x1ca728(0xfb)]('dead');},Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x5cb)]=function(){const _0x457603=_0x3f1f6b;if(!SceneManager[_0x457603(0x497)]())return null;if(!SceneManager[_0x457603(0x5bb)][_0x457603(0x1b3)])return null;return SceneManager[_0x457603(0x5bb)]['_spriteset'][_0x457603(0x25f)](this);},Game_BattlerBase['prototype'][_0x3f1f6b(0x49f)]=function(){const _0x445814=_0x3f1f6b;return VisuMZ[_0x445814(0x32d)][_0x445814(0x3e9)][_0x445814(0xf3)][_0x445814(0x216)];},Game_BattlerBase[_0x3f1f6b(0x457)]['svBattlerAnchorY']=function(){const _0x32179a=_0x3f1f6b;return VisuMZ['BattleCore'][_0x32179a(0x3e9)][_0x32179a(0xf3)][_0x32179a(0x43e)];},Game_BattlerBase['prototype'][_0x3f1f6b(0x321)]=function(){const _0x45cb07=_0x3f1f6b;return this[_0x45cb07(0x72a)]&&this['isActor']()?VisuMZ[_0x45cb07(0x32d)]['Settings'][_0x45cb07(0xf3)][_0x45cb07(0x302)]:VisuMZ[_0x45cb07(0x32d)][_0x45cb07(0x3e9)][_0x45cb07(0x5c6)][_0x45cb07(0x302)];},Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x7a6)]=function(){return!![];},Game_BattlerBase['prototype'][_0x3f1f6b(0x5d6)]=function(){return 0x0;},Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x498)]=function(){return 0x0;},Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0xdd)]=function(_0x270f3f){const _0x231596=_0x3f1f6b;if(!_0x270f3f)return 0x0;let _0x33836c=0x0;const _0x2b096d=_0x270f3f[_0x231596(0x4e8)];return _0x2b096d[_0x231596(0x7c7)](/<BATTLE UI OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x33836c+=Number(RegExp['$1'])),_0x2b096d[_0x231596(0x7c7)](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x33836c+=Number(RegExp['$1'])),_0x33836c;},Game_BattlerBase['prototype'][_0x3f1f6b(0x7dd)]=function(_0x57c077){const _0x100f98=_0x3f1f6b;if(!_0x57c077)return 0x0;let _0x15dc8f=0x0;const _0x43170d=_0x57c077[_0x100f98(0x4e8)];return _0x43170d[_0x100f98(0x7c7)](/<BATTLE UI OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x15dc8f+=Number(RegExp['$1'])),_0x43170d[_0x100f98(0x7c7)](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x15dc8f+=Number(RegExp['$2'])),_0x15dc8f;},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x351)]=Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x563)],Game_BattlerBase[_0x3f1f6b(0x457)]['isStateResist']=function(_0x547ff2){const _0x34fa4d=_0x3f1f6b;if(_0x547ff2===this[_0x34fa4d(0x20e)]()&&this[_0x34fa4d(0x201)]())return!![];return VisuMZ['BattleCore']['Game_BattlerBase_isStateResist'][_0x34fa4d(0x131)](this,_0x547ff2);},Game_BattlerBase['prototype']['isImmortal']=function(){return this['_immortal'];},Game_BattlerBase[_0x3f1f6b(0x457)]['setImmortal']=function(_0x134385){const _0x3899cb=_0x3f1f6b;_0x134385?this['addImmortal']():this[_0x3899cb(0x5b0)]();},Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x6b0)]=function(){const _0x95ef88=_0x3f1f6b;if(this[_0x95ef88(0x641)]())return;this[_0x95ef88(0x4a2)]=!![];},Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x5b0)]=function(){const _0x24bfc0=_0x3f1f6b,_0x55ff9a=this[_0x24bfc0(0x142)]();this['_immortal']=![],this[_0x24bfc0(0x855)](),this[_0x24bfc0(0x641)]()&&_0x55ff9a&&(this[_0x24bfc0(0x69d)](),this[_0x24bfc0(0x40d)]());},VisuMZ['BattleCore'][_0x3f1f6b(0x2ca)]=Game_BattlerBase['prototype']['canAttack'],Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x521)]=function(){const _0x57315d=_0x3f1f6b;if(!this[_0x57315d(0x33c)]())return![];return VisuMZ[_0x57315d(0x32d)]['Game_BattlerBase_canAttack'][_0x57315d(0x131)](this);},Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x33c)]=function(){const _0xbaa69a=_0x3f1f6b;for(const _0x276e56 of this[_0xbaa69a(0x66e)]()){if(!_0x276e56)continue;if(_0x276e56[_0xbaa69a(0x4e8)][_0xbaa69a(0x7c7)](/<(?:ATTACK SEAL|SEAL ATTACK)>/i))return![];}return!![];},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x244)]=Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x1f6)],Game_BattlerBase['prototype'][_0x3f1f6b(0x1f6)]=function(){const _0x1ad30d=_0x3f1f6b;if(!this[_0x1ad30d(0x1f3)]())return![];return VisuMZ[_0x1ad30d(0x32d)]['Game_BattlerBase_canGuard'][_0x1ad30d(0x131)](this);},Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x1f3)]=function(){const _0x1c7f45=_0x3f1f6b;for(const _0x2bd5cf of this[_0x1c7f45(0x66e)]()){if(!_0x2bd5cf)continue;if(_0x2bd5cf[_0x1c7f45(0x4e8)][_0x1c7f45(0x7c7)](/<(?:GUARD SEAL|SEAL GUARD)>/i))return![];}return!![];},Game_BattlerBase[_0x3f1f6b(0x457)][_0x3f1f6b(0x38d)]=function(){const _0x5a78b8=_0x3f1f6b;for(const _0x4c1f3e of this[_0x5a78b8(0x66e)]()){if(!_0x4c1f3e)continue;if(_0x4c1f3e['note'][_0x5a78b8(0x7c7)](/<(?:ITEM SEAL|SEAL ITEM|SEAL ITEMS)>/i))return![];}return!![];},VisuMZ['BattleCore']['Game_Battler_regenerateAll']=Game_Battler['prototype'][_0x3f1f6b(0x10f)],Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x10f)]=function(){const _0x3882a7=_0x3f1f6b;if(SceneManager[_0x3882a7(0x497)]()&&$gameTroop['turnCount']()<=0x0)return;this[_0x3882a7(0x4b9)](_0x3882a7(0x7ce)),VisuMZ[_0x3882a7(0x32d)][_0x3882a7(0x7d5)]['call'](this),this[_0x3882a7(0x595)](),this['processBattleCoreJS'](_0x3882a7(0x291));},Game_Battler['prototype'][_0x3f1f6b(0x595)]=function(){const _0x33cb22=_0x3f1f6b;if(SceneManager[_0x33cb22(0x497)]())for(const _0x15b734 of this[_0x33cb22(0x66e)]()){if(!_0x15b734)continue;this['onRegeneratePlayStateAnimation'](_0x15b734);}},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x843)]=function(_0x4814a6){const _0x3e39ce=_0x3f1f6b;if(!Imported[_0x3e39ce(0x147)])return;if(!SceneManager[_0x3e39ce(0x497)]())return;if(this['isDead']())return;if(this[_0x3e39ce(0x44c)]())return;if(_0x4814a6[_0x3e39ce(0x4e8)]['match'](/<(?:REGENERATE|REGEN|DEGEN|DOT|SLIP)[ ]ANIMATION:[ ](\d+)>/i)){const _0x4586b8=Number(RegExp['$1']);$gameTemp[_0x3e39ce(0x202)]([this],_0x4586b8,![],![]);}},VisuMZ[_0x3f1f6b(0x32d)]['Game_Battler_startTpbTurn']=Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x7e6)],Game_Battler['prototype']['startTpbTurn']=function(){const _0x555fb2=_0x3f1f6b;this['processBattleCoreJS'](_0x555fb2(0x33d)),VisuMZ[_0x555fb2(0x32d)][_0x555fb2(0x4bc)][_0x555fb2(0x131)](this),this[_0x555fb2(0x4b9)]('PostStartTurnJS');},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x6d6)]=Game_Battler['prototype']['onTurnEnd'],Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0xd5)]=function(){const _0x55c15d=_0x3f1f6b;this[_0x55c15d(0x4b9)]('PreEndTurnJS'),VisuMZ[_0x55c15d(0x32d)]['Game_Battler_onTurnEnd'][_0x55c15d(0x131)](this),this['processBattleCoreJS'](_0x55c15d(0x750));},Game_Battler[_0x3f1f6b(0x457)]['processBattleCoreJS']=function(_0x299d8a){const _0x4bf217=_0x3f1f6b,_0x52d62c=VisuMZ[_0x4bf217(0x32d)][_0x4bf217(0x3e9)][_0x4bf217(0x433)];if(_0x52d62c[_0x299d8a])_0x52d62c[_0x299d8a][_0x4bf217(0x131)](this);for(const _0x36946b of this[_0x4bf217(0x66e)]()){if(!_0x36946b)continue;key=VisuMZ[_0x4bf217(0x32d)]['createKeyJS'](_0x36946b,_0x299d8a),VisuMZ['BattleCore']['JS'][key]&&VisuMZ[_0x4bf217(0x32d)]['JS'][key]['call'](this,this,this,_0x36946b,0x0);}},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x127)]=function(){const _0x1c4dac=_0x3f1f6b;return VisuMZ[_0x1c4dac(0x32d)]['Settings']['Actor'][_0x1c4dac(0x720)]||![];},Game_Battler[_0x3f1f6b(0x457)]['isChanting']=function(){const _0x2a44ef=_0x3f1f6b;if(this[_0x2a44ef(0x37c)]()){if(this[_0x2a44ef(0x127)]()){if(this[_0x2a44ef(0xf5)][_0x2a44ef(0x11e)](_0x4ddb1f=>_0x4ddb1f[_0x2a44ef(0x187)]()&&_0x4ddb1f[_0x2a44ef(0x6cc)]()))return!![];}else{if(this[_0x2a44ef(0xf5)]['some'](_0x194c7e=>_0x194c7e[_0x2a44ef(0x187)]()&&_0x194c7e[_0x2a44ef(0x1e9)]()))return!![];}}if(BattleManager['isTpb']()&&this[_0x2a44ef(0x6a9)]===_0x2a44ef(0x6c9))return this['chantStyle']()?this[_0x2a44ef(0x25a)]()&&this['currentAction']()[_0x2a44ef(0x187)]()&&this[_0x2a44ef(0x25a)]()[_0x2a44ef(0x6cc)]():this[_0x2a44ef(0x25a)]()&&this[_0x2a44ef(0x25a)]()['item']()&&this[_0x2a44ef(0x25a)]()[_0x2a44ef(0x1e9)]();return![];},Game_Battler['prototype'][_0x3f1f6b(0x3e5)]=function(){const _0x1447ed=_0x3f1f6b;if(BattleManager[_0x1447ed(0x1de)]()&&this['_tpbState']===_0x1447ed(0x6c9))return this['chantStyle']()?this[_0x1447ed(0x25a)]()&&this[_0x1447ed(0x25a)]()[_0x1447ed(0x187)]()&&!this['currentAction']()[_0x1447ed(0x6cc)]():this[_0x1447ed(0x25a)]()&&this[_0x1447ed(0x25a)]()['item']()&&!this[_0x1447ed(0x25a)]()[_0x1447ed(0x1e9)]();return![];},VisuMZ['BattleCore'][_0x3f1f6b(0x70a)]=Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x568)],Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x568)]=function(){const _0x1aab58=_0x3f1f6b;VisuMZ['BattleCore'][_0x1aab58(0x70a)][_0x1aab58(0x131)](this),this['_damagePopupArray']=[];},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x5e4)]=function(){const _0x47ab93=_0x3f1f6b;if(!this[_0x47ab93(0x54b)])this[_0x47ab93(0x568)]();return this[_0x47ab93(0x54b)]['length']>0x0;},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x835)]=function(){const _0x3660d9=_0x3f1f6b;if(!SceneManager[_0x3660d9(0x497)]())return;if(!this[_0x3660d9(0x54b)])this[_0x3660d9(0x568)]();this[_0x3660d9(0x685)]();const _0x5a7165=this['battler']();if(_0x5a7165)_0x5a7165[_0x3660d9(0x24d)]();},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x685)]=function(){const _0x5d4751=_0x3f1f6b,_0x3bc061=this[_0x5d4751(0x356)]();if(_0x3bc061[_0x5d4751(0x514)]||_0x3bc061[_0x5d4751(0x2b6)]){const _0x4ebbfe=JsonEx[_0x5d4751(0x6a7)](_0x3bc061);_0x4ebbfe[_0x5d4751(0x61b)]=![],_0x4ebbfe[_0x5d4751(0x4d6)]=0x0,this[_0x5d4751(0x54b)]['push'](_0x4ebbfe);}if(_0x3bc061[_0x5d4751(0x61b)]){const _0x43f7be=JsonEx[_0x5d4751(0x6a7)](_0x3bc061);_0x43f7be['missed']=![],_0x43f7be[_0x5d4751(0x2b6)]=![],_0x43f7be['mpDamage']=0x0,this[_0x5d4751(0x54b)][_0x5d4751(0x547)](_0x43f7be);}if(_0x3bc061[_0x5d4751(0x4d6)]!==0x0){const _0x46f4d4=JsonEx['makeDeepCopy'](_0x3bc061);_0x46f4d4['missed']=![],_0x46f4d4[_0x5d4751(0x2b6)]=![],_0x46f4d4[_0x5d4751(0x61b)]=![],this[_0x5d4751(0x54b)]['push'](_0x46f4d4);}},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x496)]=function(){const _0x2b8cba=_0x3f1f6b;if(!this[_0x2b8cba(0x54b)])this[_0x2b8cba(0x568)]();return VisuMZ[_0x2b8cba(0x32d)][_0x2b8cba(0x3e9)][_0x2b8cba(0x282)][_0x2b8cba(0xb0)]?this[_0x2b8cba(0x54b)][_0x2b8cba(0x346)]():this[_0x2b8cba(0x54b)][_0x2b8cba(0x2b5)]();},Game_Battler['prototype'][_0x3f1f6b(0x1f1)]=function(_0xb9478c,_0x48adfe){const _0x22bbb7=_0x3f1f6b;if(!SceneManager[_0x22bbb7(0x497)]())return;if(!this[_0x22bbb7(0x5cb)]())return;if(_0xb9478c[_0x22bbb7(0x135)]<=0x0)return;_0x48adfe=_0x48adfe||{},_0x48adfe[_0x22bbb7(0x6d0)]=_0x48adfe[_0x22bbb7(0x6d0)]||_0x22bbb7(0x7e2),_0x48adfe[_0x22bbb7(0x2b8)]=_0x48adfe[_0x22bbb7(0x2b8)]||[0x0,0x0,0x0,0x0],_0x48adfe[_0x22bbb7(0x49b)]=_0x48adfe[_0x22bbb7(0x49b)]||0x0,this[_0x22bbb7(0x5cb)]()['setupTextPopup'](_0xb9478c,_0x48adfe);},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x5ad)]=function(_0x27d081,_0x3d4c4f,_0x1a2b05){const _0x53b866=_0x3f1f6b;if(!SceneManager[_0x53b866(0x497)]())return;if(!this['battler']())return;if(_0x3d4c4f[_0x53b866(0x135)]<=0x0)return;_0x1a2b05=_0x1a2b05||{},_0x1a2b05[_0x53b866(0x6d0)]=_0x1a2b05['textColor']||_0x53b866(0x7e2),_0x1a2b05[_0x53b866(0x2b8)]=_0x1a2b05[_0x53b866(0x2b8)]||[0x0,0x0,0x0,0x0],_0x1a2b05[_0x53b866(0x49b)]=_0x1a2b05[_0x53b866(0x49b)]||0x0,this[_0x53b866(0x5cb)]()[_0x53b866(0x5ad)](_0x27d081,_0x3d4c4f,_0x1a2b05);},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x470)]=function(){const _0x18edd0=_0x3f1f6b;if(this[_0x18edd0(0x44c)]())return![];if(this[_0x18edd0(0x142)]()&&this['isAppeared']())return!![];if(this[_0x18edd0(0x7f8)]()&&this['hasSvBattler']()){if(this[_0x18edd0(0x641)]()&&this[_0x18edd0(0x665)]())return![];}else{if(this[_0x18edd0(0x641)]())return![];}return!![];},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x5da)]=Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x260)],Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x260)]=function(){const _0x404ff9=_0x3f1f6b;VisuMZ['BattleCore'][_0x404ff9(0x5da)][_0x404ff9(0x131)](this),this[_0x404ff9(0x5b3)]();},Game_Battler['prototype'][_0x3f1f6b(0x4ee)]=function(){return!![];},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x34b)]=function(){return![];},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x1fa)]=Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x639)],Game_Battler[_0x3f1f6b(0x457)]['onBattleStart']=function(_0x863683){const _0x2d2f4d=_0x3f1f6b;VisuMZ['BattleCore'][_0x2d2f4d(0x1fa)][_0x2d2f4d(0x131)](this,_0x863683),this['onBattleStartBattleCore'](_0x863683);},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x3b3)]=function(_0x14b155){const _0x2b569d=_0x3f1f6b;this[_0x2b569d(0x5ff)](![]);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x4e0)]=Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x6a1)],Game_Battler['prototype']['performActionStart']=function(_0x3cae24){const _0x35ba27=_0x3f1f6b;VisuMZ['BattleCore'][_0x35ba27(0x4e0)][_0x35ba27(0x131)](this,_0x3cae24);if(!_0x3cae24[_0x35ba27(0x1ee)]()){const _0x171f5f=this[_0x35ba27(0x5cb)]();if(_0x171f5f)_0x171f5f[_0x35ba27(0x4b6)]();}this[_0x35ba27(0x5ff)](![]);},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x560)]=function(){const _0x14b594=_0x3f1f6b,_0x2df29e=this[_0x14b594(0x45b)];this[_0x14b594(0x45b)]=![];if(BattleManager[_0x14b594(0x499)]()&&this[_0x14b594(0x292)]()){const _0x4c0c57=this[_0x14b594(0x5cb)]();if(_0x4c0c57&&_0x2df29e)_0x4c0c57[_0x14b594(0x4b6)]();return;}const _0x4298a1=this[_0x14b594(0x5cb)]();if(_0x4298a1)_0x4298a1[_0x14b594(0x324)]();this[_0x14b594(0x5ff)](![]),this[_0x14b594(0x40d)]();},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x3e0)]=function(_0x1c3d33){const _0x2801eb=_0x3f1f6b;if(_0x1c3d33['isAttack']())this[_0x2801eb(0x42b)]();else{if(_0x1c3d33[_0x2801eb(0x1ee)]())this[_0x2801eb(0xfb)](_0x2801eb(0x6a4));else{if(_0x1c3d33[_0x2801eb(0x6cc)]())this[_0x2801eb(0xfb)](_0x2801eb(0x543));else{if(_0x1c3d33['isSkill']())_0x1c3d33['item']()[_0x2801eb(0x434)][_0x2801eb(0x773)]>0x0?this[_0x2801eb(0x42b)]():this[_0x2801eb(0xfb)](_0x2801eb(0x144));else _0x1c3d33[_0x2801eb(0x172)]()&&this[_0x2801eb(0xfb)](_0x2801eb(0x187));}}}},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x4f9)]=function(){const _0x1dca52=_0x3f1f6b;return $dataSystem[_0x1dca52(0x727)][0x0];},Game_Battler['prototype']['getAttackWeaponAnimationId']=function(){const _0xf26a5c=_0x3f1f6b,_0x59dd72=this[_0xf26a5c(0x4f9)]();return _0x59dd72?_0x59dd72['weaponImageId']:0x0;},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x596)]=function(_0x44884b){const _0x40616b=_0x3f1f6b;if(!$gameSystem[_0x40616b(0x3b9)]())return;const _0x4d60de=this[_0x40616b(0x5cb)](),_0xf62e82=_0x44884b[_0x40616b(0x5cb)]();if(!_0x4d60de||!_0xf62e82)return;const _0x53bf0b=_0xf62e82[_0x40616b(0x1d7)],_0x240161=_0xf62e82[_0x40616b(0x47b)];this['moveBattlerToPoint'](_0x53bf0b,_0x240161,0x0,![],_0x40616b(0x60f),-0x1),_0x4d60de[_0x40616b(0x13f)]();const _0x392911=VisuMZ[_0x40616b(0x32d)][_0x40616b(0x3e9)][_0x40616b(0x694)];let _0x383a28=(_0xf62e82['width']+_0x4d60de[_0x40616b(0x364)])/0x2;_0x383a28*=this[_0x40616b(0x72a)]()?0x1:-0x1;let _0x5f3fec=_0x392911[_0x40616b(0x335)]*(this[_0x40616b(0x72a)]()?0x1:-0x1);_0x44884b['moveBattlerDistance'](_0x383a28,_0x5f3fec,0x0,![],_0x40616b(0x60f)),_0xf62e82[_0x40616b(0x13f)]();},Game_Battler['prototype'][_0x3f1f6b(0xfb)]=function(_0x50292f){const _0x23ca1a=_0x3f1f6b;if(SceneManager[_0x23ca1a(0x497)]()){const _0x197434=this[_0x23ca1a(0x5cb)]();_0x197434&&(_0x197434[_0x23ca1a(0x73c)](_0x50292f),[_0x23ca1a(0x83e),_0x23ca1a(0x4f2),'missile'][_0x23ca1a(0x354)](_0x50292f)&&this['performWeaponAnimation']());}this[_0x23ca1a(0x5b3)]();},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x586)]=function(){},Game_Battler[_0x3f1f6b(0x457)]['startWeaponAnimation']=function(_0x5948c3){const _0x5eec24=_0x3f1f6b;if(SceneManager['isSceneBattle']()){const _0x4c8085=this[_0x5eec24(0x5cb)]();if(_0x4c8085)_0x4c8085[_0x5eec24(0x51c)](_0x5948c3);}},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x185)]=function(){const _0x2a6d79=_0x3f1f6b;if(SceneManager[_0x2a6d79(0x497)]()){const _0x278fdc=this[_0x2a6d79(0x4c4)]();this[_0x2a6d79(0x814)](_0x278fdc);}},Game_Battler[_0x3f1f6b(0x457)]['performCastAnimation']=function(_0x42160b,_0x59ede8){const _0x5cf92d=_0x3f1f6b;if(!_0x42160b)return;if(!_0x42160b[_0x5cf92d(0x187)]())return;if(_0x42160b[_0x5cf92d(0x45a)]())return;if(_0x42160b[_0x5cf92d(0x1ee)]())return;if(_0x42160b[_0x5cf92d(0x172)]())return;let _0x3e5661=0x0;const _0x2fcad1=VisuMZ[_0x5cf92d(0x32d)][_0x5cf92d(0x3e9)][_0x5cf92d(0x694)],_0x4b6d17=_0x42160b['item']()[_0x5cf92d(0x4e8)];if(_0x4b6d17[_0x5cf92d(0x7c7)](/<CAST ANIMATION: (\d+)>/i))_0x3e5661=Number(RegExp['$1']);else{if(_0x4b6d17[_0x5cf92d(0x7c7)](/<NO CAST ANIMATION>/i))return;else{if(_0x42160b[_0x5cf92d(0x75f)]())_0x3e5661=_0x2fcad1[_0x5cf92d(0x469)];else{if(_0x42160b['isPhysical']())_0x3e5661=_0x2fcad1['CastPhysical'];else _0x42160b[_0x5cf92d(0x6cc)]()&&(_0x3e5661=_0x2fcad1[_0x5cf92d(0x416)]);}}}_0x3e5661>0x0&&$gameTemp[_0x5cf92d(0x2e0)]([this],_0x3e5661,!!_0x59ede8);},Game_Battler['prototype'][_0x3f1f6b(0x31f)]=function(){const _0x45b087=_0x3f1f6b;SoundManager[_0x45b087(0x6e6)]();let _0x4671ba=VisuMZ[_0x45b087(0x32d)][_0x45b087(0x3e9)][_0x45b087(0x694)][_0x45b087(0x83f)];_0x4671ba>0x0&&$gameTemp[_0x45b087(0x2e0)]([this],_0x4671ba);},VisuMZ[_0x3f1f6b(0x32d)]['Game_Battler_performDamage']=Game_Battler[_0x3f1f6b(0x457)]['performDamage'],Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x5af)]=function(){const _0x2d71f4=_0x3f1f6b;VisuMZ['BattleCore'][_0x2d71f4(0x616)]['call'](this),this[_0x2d71f4(0x27e)]();},VisuMZ['BattleCore'][_0x3f1f6b(0x44e)]=Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x56e)],Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x56e)]=function(){const _0x557c7f=_0x3f1f6b;VisuMZ[_0x557c7f(0x32d)][_0x557c7f(0x44e)]['call'](this),this[_0x557c7f(0x27e)]();},VisuMZ[_0x3f1f6b(0x32d)]['Game_Battler_performEvasion']=Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x524)],Game_Battler[_0x3f1f6b(0x457)]['performEvasion']=function(){const _0x448311=_0x3f1f6b;VisuMZ[_0x448311(0x32d)]['Game_Battler_performEvasion'][_0x448311(0x131)](this),this[_0x448311(0x27e)]();},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x27e)]=function(){const _0x25cd44=_0x3f1f6b;if(!$gameSystem[_0x25cd44(0x3b9)]())return;if(this['_flinched'])return;this['_flinched']=!![];const _0x18e66a=this[_0x25cd44(0x5cb)]();if(_0x18e66a)_0x18e66a[_0x25cd44(0x232)]();},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x40d)]=function(){const _0x5b586c=_0x3f1f6b;if(this[_0x5b586c(0x641)]()&&this[_0x5b586c(0x5d9)]!==_0x5b586c(0x2d4)){this['requestMotion']('dead');return;}if(this['isDead']()&&this['_motionType']===_0x5b586c(0x2d4))return;if(!!this[_0x5b586c(0x280)])return;if(this['isEnemy']()){if(!this[_0x5b586c(0x1c0)]())this[_0x5b586c(0x5cb)]()[_0x5b586c(0x636)]();this[_0x5b586c(0x5b3)]();return;}if(this[_0x5b586c(0x5d9)]===_0x5b586c(0xc3))return;if(this['_motionType']===_0x5b586c(0x19d)&&!BattleManager[_0x5b586c(0x292)]())return;if(this[_0x5b586c(0x5d9)]===_0x5b586c(0x6a4)&&!BattleManager[_0x5b586c(0x292)]())return;this['clearMotion']();if(this[_0x5b586c(0x5cb)]()&&BattleManager[_0x5b586c(0x292)]()){this[_0x5b586c(0x5cb)]()[_0x5b586c(0x636)](),this[_0x5b586c(0x5b3)]();return;}},Game_Enemy[_0x3f1f6b(0x457)]['isDuringNonLoopingMotion']=function(){const _0x1920e6=_0x3f1f6b;if(!this[_0x1920e6(0x79f)]())return![];const _0x567ccc=this[_0x1920e6(0x5cb)]();if(!_0x567ccc)return![];const _0x349fff=_0x567ccc['_svBattlerSprite'];if(!_0x349fff)return![];const _0x109245=_0x349fff[_0x1920e6(0x4ed)];return _0x109245&&!_0x109245[_0x1920e6(0x38b)];},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x3a2)]=function(){return this['_isBattlerFlipped'];},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x5ff)]=function(_0x4e3f4b){const _0x11893e=_0x3f1f6b;if(!$gameSystem['isSideView']())return;this[_0x11893e(0x148)]=_0x4e3f4b;const _0x1540f5=this['battler']();if(_0x1540f5)_0x1540f5[_0x11893e(0x2cc)]();},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x6d2)]=function(_0x10e192,_0x597423,_0x5339e2){const _0x3223d6=_0x3f1f6b;if(!$gameSystem[_0x3223d6(0x3b9)]())return;const _0x48721c=this['battler']();if(!_0x48721c)return;if(_0x10e192===_0x48721c[_0x3223d6(0x1d7)])return;let _0x421116=![];if(this[_0x3223d6(0x72a)]()){if(_0x10e192>_0x48721c[_0x3223d6(0x1d7)])_0x421116=!![];if(_0x10e192<_0x48721c[_0x3223d6(0x1d7)])_0x421116=![];}else{if(this[_0x3223d6(0x7f8)]()){if(_0x10e192>_0x48721c['_baseX'])_0x421116=![];if(_0x10e192<_0x48721c[_0x3223d6(0x1d7)])_0x421116=!![];}};this[_0x3223d6(0x5ff)](_0x5339e2?!_0x421116:_0x421116),_0x48721c[_0x3223d6(0x2cc)]();},Game_Battler['prototype'][_0x3f1f6b(0x697)]=function(_0x1dc8f9,_0x31f78a,_0xe8bde9,_0x1b14aa,_0xc8452d){const _0x1ed9fd=_0x3f1f6b;if(!$gameSystem['isSideView']())return;const _0x6d216c=this[_0x1ed9fd(0x5cb)]();if(!_0x6d216c)return;if(_0x1b14aa)this[_0x1ed9fd(0x6d2)](_0x1dc8f9+_0x6d216c[_0x1ed9fd(0x1d7)],_0x31f78a+_0x6d216c['_baseY'],![]);_0x1dc8f9+=_0x6d216c['_baseX']-_0x6d216c['_homeX'],_0x31f78a+=_0x6d216c[_0x1ed9fd(0x47b)]-_0x6d216c[_0x1ed9fd(0x733)],_0x6d216c[_0x1ed9fd(0x2c5)](_0x1dc8f9,_0x31f78a,_0xe8bde9);if(Imported[_0x1ed9fd(0x147)])_0x6d216c[_0x1ed9fd(0x549)](_0xc8452d||_0x1ed9fd(0x60f));},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x4b8)]=function(_0x5dd5e9,_0x1b08e9,_0x6dbd86,_0x1954c5,_0x178c1e,_0x83d96b){const _0x467090=_0x3f1f6b;if(!$gameSystem['isSideView']())return;const _0x239f12=this[_0x467090(0x5cb)]();if(!_0x239f12)return;_0x83d96b=_0x83d96b||0x0;if(_0x83d96b>0x0){if(_0x239f12['_baseX']>_0x5dd5e9)_0x5dd5e9+=_0x239f12['width']/0x2+_0x83d96b;if(_0x239f12[_0x467090(0x1d7)]<_0x5dd5e9)_0x5dd5e9-=_0x239f12['width']/0x2+_0x83d96b;}if(_0x1954c5)this[_0x467090(0x6d2)](_0x5dd5e9,_0x1b08e9,![]);_0x5dd5e9-=_0x239f12['_homeX'],_0x1b08e9-=_0x239f12[_0x467090(0x733)],_0x239f12['startMove'](_0x5dd5e9,_0x1b08e9,_0x6dbd86);if(Imported['VisuMZ_0_CoreEngine'])_0x239f12[_0x467090(0x549)](_0x178c1e||_0x467090(0x60f));},Game_Battler[_0x3f1f6b(0x457)]['floatBattler']=function(_0x33c408,_0x6d4c9f,_0x59712c){const _0x53ac87=_0x3f1f6b;if(!$gameSystem[_0x53ac87(0x3b9)]())return;const _0x2f3d74=this[_0x53ac87(0x5cb)]();if(!_0x2f3d74)return;_0x2f3d74['startFloat'](_0x33c408,_0x6d4c9f,_0x59712c);},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x54e)]=function(_0x116601,_0x298d7a){const _0x19c13e=_0x3f1f6b;if(!$gameSystem[_0x19c13e(0x3b9)]())return;const _0x415be1=this[_0x19c13e(0x5cb)]();if(!_0x415be1)return;_0x415be1[_0x19c13e(0x532)](_0x116601,_0x298d7a);},Game_Battler[_0x3f1f6b(0x457)]['spinBattler']=function(_0x16c83e,_0x55f9fd,_0x40d81e,_0x2108fa){const _0xd203a2=_0x3f1f6b;if(!$gameSystem[_0xd203a2(0x3b9)]())return;const _0x4617d9=this[_0xd203a2(0x5cb)]();if(!_0x4617d9)return;_0x4617d9[_0xd203a2(0x806)](_0x16c83e,_0x55f9fd,_0x40d81e,_0x2108fa);},Game_Battler['prototype']['skewBattler']=function(_0x4a83c2,_0x109573,_0x5ef242,_0x11f7e6){const _0x1a60cb=_0x3f1f6b;if(!$gameSystem['isSideView']())return;const _0x2ec3b2=this[_0x1a60cb(0x5cb)]();if(!_0x2ec3b2)return;this[_0x1a60cb(0x72a)]()&&(_0x4a83c2*=-0x1,_0x109573*=-0x1),_0x2ec3b2[_0x1a60cb(0x7e4)](_0x4a83c2,_0x109573,_0x5ef242,_0x11f7e6);},Game_Battler[_0x3f1f6b(0x457)]['growBattler']=function(_0x2b8a7a,_0xc5eecb,_0x1aa58d,_0x1492c4){const _0x1e85ce=_0x3f1f6b;if(!$gameSystem[_0x1e85ce(0x3b9)]())return;const _0x465731=this[_0x1e85ce(0x5cb)]();if(!_0x465731)return;_0x465731[_0x1e85ce(0x1fe)](_0x2b8a7a,_0xc5eecb,_0x1aa58d,_0x1492c4);},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x246)]=function(_0x2ab431,_0x35c77e,_0x1a5c33){const _0x17bf5f=_0x3f1f6b;if(!$gameSystem['isSideView']())return;const _0x13b0a3=this[_0x17bf5f(0x5cb)]();if(!_0x13b0a3)return;_0x13b0a3[_0x17bf5f(0x707)](_0x2ab431,_0x35c77e,_0x1a5c33);},Game_Battler['prototype'][_0x3f1f6b(0x5b3)]=function(){const _0xd311f1=_0x3f1f6b,_0x4a72d3=!!this[_0xd311f1(0x280)];this[_0xd311f1(0x280)]=undefined,_0x4a72d3&&(this[_0xd311f1(0x40d)](),this[_0xd311f1(0x688)]());},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x688)]=function(){const _0x4f9623=_0x3f1f6b;if(!SceneManager[_0x4f9623(0x497)]())return;const _0xf1adda=this['battler']();if(!_0xf1adda)return;let _0x38b160=this[_0x4f9623(0x72a)]()?_0xf1adda[_0x4f9623(0x43a)]:_0xf1adda[_0x4f9623(0x55f)][_0x4f9623(0x43a)];_0x38b160&&_0x38b160[_0x4f9623(0x68f)](0x0);},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x30c)]=function(_0x2c9a18,_0xf18ab9,_0x237b9d){const _0x5e0c16=_0x3f1f6b;if(this[_0x5e0c16(0x7f8)]()&&!this[_0x5e0c16(0x79f)]())return;let _0x303eff=0x0,_0x587a65=0x0;_0x2c9a18[_0x5e0c16(0x7c7)](/ATTACK[ ](\d+)/i)&&(_0x587a65=Number(RegExp['$1']),_0x587a65--);if(this[_0x5e0c16(0x72a)]()){const _0x455a61=this[_0x5e0c16(0x1c8)]();_0x303eff=_0x455a61[_0x587a65]?_0x455a61[_0x587a65][_0x5e0c16(0x1e2)]:0x0;}else this[_0x5e0c16(0x7f8)]()&&(_0x303eff=this[_0x5e0c16(0x5ac)]()['wtypeId']||0x0);const _0x59ab83=$dataSystem['attackMotions'][_0x303eff];_0x2c9a18['match'](/attack/i)&&(_0x2c9a18=[_0x5e0c16(0x4f2),_0x5e0c16(0x83e),'missile'][_0x59ab83[_0x5e0c16(0x773)]]||_0x5e0c16(0x83e)),this['_freezeMotionData']={'motionType':_0x2c9a18,'weaponImageId':_0xf18ab9?_0x59ab83['weaponImageId']:0x0,'pattern':_0x237b9d};},Game_Battler['prototype'][_0x3f1f6b(0x287)]=function(_0x2ba963){const _0x871e43=_0x3f1f6b;if(!_0x2ba963)return![];return _0x2ba963[_0x871e43(0x775)]()===this[_0x871e43(0x775)]();},Game_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x65f)]=function(_0x81d08a){const _0x22ab5c=_0x3f1f6b;if(!_0x81d08a)return![];return _0x81d08a[_0x22ab5c(0x30a)]()===this[_0x22ab5c(0x775)]();},VisuMZ[_0x3f1f6b(0x32d)]['Game_Actor_setup']=Game_Actor[_0x3f1f6b(0x457)]['setup'],Game_Actor['prototype']['setup']=function(_0x13ad69){const _0x57dc97=_0x3f1f6b;VisuMZ[_0x57dc97(0x32d)][_0x57dc97(0x75a)][_0x57dc97(0x131)](this,_0x13ad69),this[_0x57dc97(0x722)]();},Game_Actor[_0x3f1f6b(0x457)]['initBattlePortrait']=function(){const _0x2d2743=_0x3f1f6b;this[_0x2d2743(0x435)]='',this[_0x2d2743(0x26b)]()&&this[_0x2d2743(0x26b)]()[_0x2d2743(0x4e8)][_0x2d2743(0x7c7)](/<BATTLE (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x2d2743(0x435)]=String(RegExp['$1']));},Game_Actor[_0x3f1f6b(0x457)]['getBattlePortraitFilename']=function(){const _0x46cb12=_0x3f1f6b;if(this[_0x46cb12(0x827)]()!=='')return this[_0x46cb12(0x827)]();else{if(Imported[_0x46cb12(0x29b)]&&this[_0x46cb12(0x311)]()!=='')return this['getMenuImage']();}return'';},Game_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x827)]=function(){const _0x2fa757=_0x3f1f6b;if(this[_0x2fa757(0x435)]===undefined)this[_0x2fa757(0x722)]();return this[_0x2fa757(0x435)];},Game_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x350)]=function(_0x38bdd4){const _0x76e452=_0x3f1f6b;if(this['_battlePortrait']===undefined)this[_0x76e452(0x722)]();this[_0x76e452(0x435)]=_0x38bdd4;if(SceneManager[_0x76e452(0x497)]()&&$gameParty[_0x76e452(0x5ca)]()['includes'](this)){const _0x597dee=SceneManager['_scene']['_statusWindow'];if(_0x597dee)_0x597dee['refreshActorPortrait'](this);}},Game_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x39c)]=function(){return!![];},Game_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x424)]=function(){const _0x619f7a=_0x3f1f6b;if(!this['isConfused']()&&BattleManager[_0x619f7a(0x3ce)])return!![];return Game_Battler[_0x619f7a(0x457)][_0x619f7a(0x424)][_0x619f7a(0x131)](this);},VisuMZ['BattleCore'][_0x3f1f6b(0x774)]=Game_Actor['prototype'][_0x3f1f6b(0x429)],Game_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x429)]=function(){const _0x23bdd3=_0x3f1f6b;if(BattleManager[_0x23bdd3(0x3ce)]&&!ConfigManager[_0x23bdd3(0x5df)])return this[_0x23bdd3(0x1ae)]();else{return VisuMZ['BattleCore'][_0x23bdd3(0x774)][_0x23bdd3(0x131)](this);;}},Game_Actor['prototype'][_0x3f1f6b(0x1ae)]=function(){const _0x4f6281=_0x3f1f6b,_0x30906d=[],_0x1e3523=new Game_Action(this);return _0x1e3523[_0x4f6281(0x438)](),_0x30906d['push'](_0x1e3523),_0x30906d;},Game_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x494)]=function(){const _0x527996=_0x3f1f6b;return this['currentClass']()[_0x527996(0x4e8)]['match'](/<BATTLE COMMANDS>\s*([\s\S]*)\s*<\/BATTLE COMMANDS>/i)?String(RegExp['$1'])[_0x527996(0x833)](/[\r\n]+/):VisuMZ['BattleCore'][_0x527996(0x3e9)][_0x527996(0x198)]['BattleCmdList'];},Game_Actor[_0x3f1f6b(0x457)]['svBattlerAnchorX']=function(){const _0x1dccc4=_0x3f1f6b;if(this[_0x1dccc4(0x48a)][_0x1dccc4(0x7cd)]!==undefined)return this[_0x1dccc4(0x48a)][_0x1dccc4(0x7cd)];return this[_0x1dccc4(0x26b)]()[_0x1dccc4(0x4e8)]['match'](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x1dccc4(0x48a)][_0x1dccc4(0x7cd)]=eval(RegExp['$1']),this[_0x1dccc4(0x48a)][_0x1dccc4(0x6c8)]=eval(RegExp['$2'])):this['_cache'][_0x1dccc4(0x7cd)]=Game_Battler['prototype'][_0x1dccc4(0x49f)][_0x1dccc4(0x131)](this),this[_0x1dccc4(0x48a)][_0x1dccc4(0x7cd)];},Game_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x1c9)]=function(){const _0x3df20f=_0x3f1f6b;if(this['_cache'][_0x3df20f(0x6c8)]!==undefined)return this[_0x3df20f(0x48a)][_0x3df20f(0x6c8)];return this[_0x3df20f(0x26b)]()['note'][_0x3df20f(0x7c7)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x3df20f(0x48a)][_0x3df20f(0x7cd)]=eval(RegExp['$1']),this[_0x3df20f(0x48a)][_0x3df20f(0x6c8)]=eval(RegExp['$2'])):this['_cache'][_0x3df20f(0x6c8)]=Game_Battler[_0x3df20f(0x457)][_0x3df20f(0x1c9)][_0x3df20f(0x131)](this),this[_0x3df20f(0x48a)][_0x3df20f(0x6c8)];},Game_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x321)]=function(){const _0x5676ef=_0x3f1f6b;if(this[_0x5676ef(0x48a)][_0x5676ef(0x530)]!==undefined)return this[_0x5676ef(0x48a)][_0x5676ef(0x530)];if(this[_0x5676ef(0x26b)]()[_0x5676ef(0x4e8)][_0x5676ef(0x7c7)](/<SIDEVIEW SHOW SHADOW>/i))this[_0x5676ef(0x48a)][_0x5676ef(0x530)]=!![];else this[_0x5676ef(0x26b)]()['note']['match'](/<SIDEVIEW HIDE SHADOW>/i)?this[_0x5676ef(0x48a)][_0x5676ef(0x530)]=![]:this[_0x5676ef(0x48a)][_0x5676ef(0x530)]=Game_Battler['prototype']['svBattlerShadowVisible']['call'](this);return this[_0x5676ef(0x48a)]['svShadow'];},Game_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x7a6)]=function(){const _0x2ccd10=_0x3f1f6b;return VisuMZ[_0x2ccd10(0x32d)][_0x2ccd10(0x3e9)][_0x2ccd10(0xf3)]['SmoothImage'];},Game_Actor['prototype'][_0x3f1f6b(0x586)]=function(){const _0x450fcd=_0x3f1f6b,_0x351445=this['weapons'](),_0xa695cb=_0x351445[0x0]?_0x351445[0x0][_0x450fcd(0x1e2)]:0x0,_0x3562e5=$dataSystem[_0x450fcd(0x727)][_0xa695cb];_0x3562e5&&this[_0x450fcd(0x814)](_0x3562e5[_0x450fcd(0x585)]);},Game_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x6d7)]=function(_0x26aa9d){const _0x45d472=_0x3f1f6b;Game_Battler[_0x45d472(0x457)][_0x45d472(0x6d7)]['call'](this,_0x26aa9d),this[_0x45d472(0x3e0)](_0x26aa9d);},Game_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x4f9)]=function(){const _0x19997c=_0x3f1f6b,_0xb593=this['weapons'](),_0x408377=_0xb593[0x0]?_0xb593[0x0][_0x19997c(0x1e2)]:0x0;return $dataSystem['attackMotions'][_0x408377];},Game_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x2e2)]=function(_0x44c8c2){const _0x3341a9=_0x3f1f6b;_0x44c8c2=_0x44c8c2||0x1,_0x44c8c2--;const _0x38b69d=this[_0x3341a9(0x1c8)]();return _0x38b69d[_0x44c8c2]?_0x38b69d[_0x44c8c2][_0x3341a9(0x406)]:0x0;},Game_Actor[_0x3f1f6b(0x457)]['getAttackMotionSlot']=function(_0x1de546){const _0x387da8=_0x3f1f6b;_0x1de546=_0x1de546||0x1,_0x1de546--;const _0x2b527d=this[_0x387da8(0x1c8)](),_0x5ce052=_0x2b527d[_0x1de546]?_0x2b527d[_0x1de546]['wtypeId']:0x0;return $dataSystem[_0x387da8(0x727)][_0x5ce052];},Game_Actor['prototype'][_0x3f1f6b(0x7d3)]=function(_0x5534b9){const _0x428a77=_0x3f1f6b;_0x5534b9=_0x5534b9||0x1,_0x5534b9--;const _0x17cb7d=this['weapons'](),_0x5e8410=_0x17cb7d[_0x5534b9]?_0x17cb7d[_0x5534b9][_0x428a77(0x1e2)]:0x0,_0x175209=$dataSystem['attackMotions'][_0x5e8410];if(_0x175209){if(_0x175209[_0x428a77(0x773)]===0x0)this[_0x428a77(0xfb)]('thrust');else{if(_0x175209[_0x428a77(0x773)]===0x1)this['requestMotion'](_0x428a77(0x83e));else _0x175209['type']===0x2&&this[_0x428a77(0xfb)](_0x428a77(0x278));}this[_0x428a77(0x814)](_0x175209['weaponImageId']);}},Game_Battler['prototype']['setActiveWeaponSlot']=function(_0xc814d5){const _0x36360c=_0x3f1f6b;this[_0x36360c(0x2cd)]=_0xc814d5||0x0;},Game_Battler[_0x3f1f6b(0x457)]['nextActiveWeaponSlot']=function(){const _0x132f19=_0x3f1f6b;this[_0x132f19(0x2cd)]=this[_0x132f19(0x2cd)]||0x0,this[_0x132f19(0x2cd)]++;},Game_Battler['prototype']['clearActiveWeaponSlot']=function(){const _0x560799=_0x3f1f6b;this[_0x560799(0x2cd)]=undefined;},VisuMZ[_0x3f1f6b(0x32d)]['Game_Actor_equips']=Game_Actor['prototype'][_0x3f1f6b(0x157)],Game_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x157)]=function(){const _0x8a5cac=_0x3f1f6b;let _0x2e284d=VisuMZ[_0x8a5cac(0x32d)][_0x8a5cac(0x6aa)]['call'](this);if(this[_0x8a5cac(0x46d)])return _0x2e284d;if(this[_0x8a5cac(0x2cd)]!==undefined){this['_tempEquipCheck']=!![];const _0x5aaa3c=this[_0x8a5cac(0x306)]();for(let _0x52e73a=0x0;_0x52e73a<_0x5aaa3c[_0x8a5cac(0x135)];_0x52e73a++){_0x5aaa3c[_0x52e73a]===0x1&&this[_0x8a5cac(0x2cd)]!==_0x52e73a&&(_0x2e284d[_0x52e73a]=null);}this[_0x8a5cac(0x46d)]=undefined;}return _0x2e284d;},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x7d1)]=function(_0x2142c1){const _0x420e4b=_0x3f1f6b;return _0x2142c1[_0x420e4b(0x72a)]()?_0x2142c1[_0x420e4b(0x1c8)]()[_0x420e4b(0x135)]||0x1:0x1;},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x107)]=function(_0x12ab3c,_0x51c39d){const _0x158dce=_0x3f1f6b;_0x12ab3c&&_0x12ab3c['isActor']()&&_0x12ab3c[_0x158dce(0x78a)](_0x51c39d),this[_0x158dce(0x5e7)]();},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x1c5)]=function(_0x4a136c){const _0x1a8500=_0x3f1f6b;_0x4a136c&&_0x4a136c[_0x1a8500(0x72a)]()&&_0x4a136c[_0x1a8500(0x79a)](),this[_0x1a8500(0x5e7)]();},Game_Actor['prototype'][_0x3f1f6b(0x5d6)]=function(){const _0x11f2fc=_0x3f1f6b;let _0x1ab9d5=_0x11f2fc(0x5d6);if(this[_0x11f2fc(0x6f4)](_0x1ab9d5))return this[_0x11f2fc(0x48a)][_0x1ab9d5];return this[_0x11f2fc(0x48a)][_0x1ab9d5]=this[_0x11f2fc(0xdd)](this['actor']()),this[_0x11f2fc(0x48a)][_0x1ab9d5];},Game_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x498)]=function(){const _0x506fb3=_0x3f1f6b;let _0x354e24=_0x506fb3(0x498);if(this[_0x506fb3(0x6f4)](_0x354e24))return this[_0x506fb3(0x48a)][_0x354e24];return this[_0x506fb3(0x48a)][_0x354e24]=this[_0x506fb3(0x7dd)](this['actor']()),this[_0x506fb3(0x48a)][_0x354e24];},VisuMZ['BattleCore'][_0x3f1f6b(0x250)]=Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x68f)],Game_Enemy['prototype'][_0x3f1f6b(0x68f)]=function(_0x3cf6fd,_0x5cc752,_0x5559e4){const _0xecbbc8=_0x3f1f6b;_0x3cf6fd=DataManager[_0xecbbc8(0x178)](_0x3cf6fd),VisuMZ[_0xecbbc8(0x32d)][_0xecbbc8(0x250)]['call'](this,_0x3cf6fd,_0x5cc752,_0x5559e4),Imported[_0xecbbc8(0x59c)]&&this[_0xecbbc8(0x4c9)](),this['clearBattleCoreData'](),this[_0xecbbc8(0x7f7)](),Imported['VisuMZ_1_ElementStatusCore']&&this[_0xecbbc8(0x2bc)]();},Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x456)]=function(){const _0x591695=_0x3f1f6b,_0x5a4c3e=VisuMZ[_0x591695(0x32d)][_0x591695(0x3e9)]['Enemy'];this[_0x591695(0x4c8)]=_0x5a4c3e['AttackAnimation'],this[_0x591695(0x737)]={};},Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x7f7)]=function(){const _0x576cf3=_0x3f1f6b,_0x21c6e8=VisuMZ[_0x576cf3(0x32d)][_0x576cf3(0x3e9)]['Enemy'],_0x388000=this[_0x576cf3(0x36c)]()[_0x576cf3(0x4e8)];this[_0x576cf3(0x737)]={'name':'','wtypeId':_0x21c6e8['WtypeId'],'collapse':_0x21c6e8[_0x576cf3(0xea)],'motionIdle':_0x21c6e8[_0x576cf3(0x4e2)],'width':_0x21c6e8[_0x576cf3(0x5a0)]||0x40,'height':_0x21c6e8[_0x576cf3(0x848)]||0x40,'anchorX':_0x21c6e8[_0x576cf3(0x216)]||0x0,'anchorY':_0x21c6e8[_0x576cf3(0x43e)]||0x0,'shadow':_0x21c6e8[_0x576cf3(0x302)]};_0x388000['match'](/<ATTACK ANIMATION:[ ](\d+)>/i)&&(this[_0x576cf3(0x4c8)]=Number(RegExp['$1']));const _0x4f4611=this[_0x576cf3(0x737)];if(_0x388000[_0x576cf3(0x7c7)](/<SIDEVIEW BATTLER: (.*)>/i))_0x4f4611['name']=String(RegExp['$1']);else{if(_0x388000['match'](/<SIDEVIEW BATTLERS>\s*([\s\S]*)\s*<\/SIDEVIEW BATTLERS>/i)){const _0x50a8e3=String(RegExp['$1'])[_0x576cf3(0x833)](/[\r\n]+/)[_0x576cf3(0x103)]('');_0x4f4611['name']=DataManager[_0x576cf3(0x422)](_0x50a8e3);}}_0x388000[_0x576cf3(0x7c7)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)&&(_0x4f4611[_0x576cf3(0x76c)]=eval(RegExp['$1']),_0x4f4611['anchorY']=eval(RegExp['$2']));if(_0x388000[_0x576cf3(0x7c7)](/<SIDEVIEW COLLAPSE>/i))_0x4f4611[_0x576cf3(0x5c4)]=!![];else _0x388000['match'](/<SIDEVIEW NO COLLAPSE>/i)&&(_0x4f4611[_0x576cf3(0x5c4)]=![]);if(_0x388000[_0x576cf3(0x7c7)](/<SIDEVIEW SHOW SHADOW>/i))_0x4f4611[_0x576cf3(0x1fd)]=!![];else _0x388000[_0x576cf3(0x7c7)](/<SIDEVIEW HIDE SHADOW>/i)&&(_0x4f4611[_0x576cf3(0x1fd)]=![]);if(_0x388000['match'](/<SIDEVIEW IDLE MOTION: (.*)>/i))_0x4f4611[_0x576cf3(0x796)]=String(RegExp['$1'])[_0x576cf3(0x61d)]()[_0x576cf3(0x6da)]();else{if(_0x388000[_0x576cf3(0x7c7)](/<SIDEVIEW IDLE MOTIONS>\s*([\s\S]*)\s*<\/SIDEVIEW IDLE MOTIONS>/i)){const _0x4dbba4=String(RegExp['$1'])[_0x576cf3(0x833)](/[\r\n]+/)[_0x576cf3(0x103)]('');_0x4f4611['motionIdle']=DataManager['processRandomizedData'](_0x4dbba4);}}_0x388000[_0x576cf3(0x7c7)](/<SIDEVIEW SIZE: (\d+), (\d+)>/i)&&(_0x4f4611[_0x576cf3(0x364)]=Number(RegExp['$1']),_0x4f4611['height']=Number(RegExp['$2']));if(_0x388000[_0x576cf3(0x7c7)](/<SIDEVIEW WEAPON: (.*)>/i))_0x4f4611['wtypeId']=DataManager[_0x576cf3(0x32a)](RegExp['$1']);else{if(_0x388000[_0x576cf3(0x7c7)](/<SIDEVIEW WEAPONS>\s*([\s\S]*)\s*<\/SIDEVIEW WEAPONS>/i)){const _0x16b6ff=String(RegExp['$1'])[_0x576cf3(0x833)](/[\r\n]+/)[_0x576cf3(0x103)](''),_0x5030a7=DataManager[_0x576cf3(0x422)](_0x16b6ff);_0x4f4611[_0x576cf3(0x1e2)]=DataManager['getWtypeIdWithName'](_0x5030a7);}}if(Imported['VisuMZ_1_ElementStatusCore']){const _0x309cdb=this['getTraitSetKeys']();for(const _0x485f15 of _0x309cdb){const _0x3af620=this[_0x576cf3(0x1be)](_0x485f15)[_0x576cf3(0x323)]['toUpperCase']()['trim'](),_0x509f8a=_0x485f15[_0x576cf3(0x23a)]()[_0x576cf3(0x6da)]();if(_0x388000[_0x576cf3(0x7c7)](VisuMZ[_0x576cf3(0x627)]['RegExp']['SvBattlerSolo-%1-%2'[_0x576cf3(0xb7)](_0x509f8a,_0x3af620)]))_0x4f4611[_0x576cf3(0x528)]=String(RegExp['$1']);else{if(_0x388000[_0x576cf3(0x7c7)](VisuMZ[_0x576cf3(0x627)][_0x576cf3(0x156)][_0x576cf3(0x4fb)[_0x576cf3(0xb7)](_0x509f8a,_0x3af620)])){const _0x3fce8c=String(RegExp['$1'])[_0x576cf3(0x833)](/[\r\n]+/)['remove']('');_0x4f4611[_0x576cf3(0x528)]=DataManager[_0x576cf3(0x422)](_0x3fce8c);}}if(_0x388000['match'](VisuMZ[_0x576cf3(0x627)][_0x576cf3(0x156)][_0x576cf3(0x6c2)[_0x576cf3(0xb7)](_0x509f8a,_0x3af620)]))_0x4f4611['wtypeId']=DataManager[_0x576cf3(0x32a)](RegExp['$1']);else{if(_0x388000[_0x576cf3(0x7c7)](VisuMZ[_0x576cf3(0x627)][_0x576cf3(0x156)][_0x576cf3(0x5a6)[_0x576cf3(0xb7)](_0x509f8a,_0x3af620)])){const _0x4e2c81=String(RegExp['$1'])['split'](/[\r\n]+/)['remove'](''),_0x2a6d42=DataManager['processRandomizedData'](_0x4e2c81);_0x4f4611['wtypeId']=DataManager[_0x576cf3(0x32a)](_0x2a6d42);}}if(_0x388000[_0x576cf3(0x7c7)](VisuMZ['ElementStatusCore'][_0x576cf3(0x156)][_0x576cf3(0x6ea)[_0x576cf3(0xb7)](_0x509f8a,_0x3af620)]))_0x4f4611['motionIdle']=String(RegExp['$1'])[_0x576cf3(0x61d)]()[_0x576cf3(0x6da)]();else{if(_0x388000[_0x576cf3(0x7c7)](VisuMZ[_0x576cf3(0x627)][_0x576cf3(0x156)][_0x576cf3(0x1f9)[_0x576cf3(0xb7)](_0x509f8a,_0x3af620)])){const _0x19825a=String(RegExp['$1'])[_0x576cf3(0x833)](/[\r\n]+/)[_0x576cf3(0x103)]('');_0x4f4611['motionIdle']=DataManager[_0x576cf3(0x422)](_0x19825a);}}}}},Game_Enemy['prototype']['attackAnimationId1']=function(){return this['_attackAnimationId']||0x0;},Game_Enemy[_0x3f1f6b(0x457)]['attackAnimationId2']=function(){const _0x1fd9c4=_0x3f1f6b;return this[_0x1fd9c4(0x70e)]();},Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x2e2)]=function(_0x474457){const _0x285662=_0x3f1f6b;return this[_0x285662(0x70e)]();},Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x4ee)]=function(){const _0x94274e=_0x3f1f6b;if(this[_0x94274e(0x36c)]()[_0x94274e(0x4e8)][_0x94274e(0x7c7)](/<BATTLER SPRITE CANNOT MOVE>/i))return![];return Game_Battler[_0x94274e(0x457)]['canBattlerMove'][_0x94274e(0x131)](this);},Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x34b)]=function(){const _0x1216b7=_0x3f1f6b;if(this[_0x1216b7(0x36c)]()[_0x1216b7(0x4e8)]['match'](/<BATTLER SPRITE GROUNDED>/i))return!![];return![];},Game_Enemy[_0x3f1f6b(0x457)]['skills']=function(){const _0x2e825d=_0x3f1f6b,_0x5c9856=[];for(const _0x3c6c5d of this[_0x2e825d(0x36c)]()['actions']){const _0x94e397=$dataSkills[_0x3c6c5d[_0x2e825d(0x2a4)]];if(_0x94e397&&!_0x5c9856[_0x2e825d(0x354)](_0x94e397))_0x5c9856['push'](_0x94e397);}return _0x5c9856;},Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x5d6)]=function(){const _0x8030f8=_0x3f1f6b;let _0x4d39b6='battleUIOffsetX';if(this[_0x8030f8(0x6f4)](_0x4d39b6))return this[_0x8030f8(0x48a)][_0x4d39b6];return this['_cache'][_0x4d39b6]=this[_0x8030f8(0xdd)](this[_0x8030f8(0x36c)]()),this[_0x8030f8(0x48a)][_0x4d39b6];},Game_Enemy['prototype'][_0x3f1f6b(0x498)]=function(){const _0x255b7c=_0x3f1f6b;let _0xea75bb='battleUIOffsetY';if(this['checkCacheKey'](_0xea75bb))return this[_0x255b7c(0x48a)][_0xea75bb];return this[_0x255b7c(0x48a)][_0xea75bb]=this[_0x255b7c(0x7dd)](this['enemy']()),this[_0x255b7c(0x48a)][_0xea75bb];},Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x5ac)]=function(){const _0x4a0d4e=_0x3f1f6b;if(this[_0x4a0d4e(0x737)]!==undefined)return this['_svBattlerData'];return this[_0x4a0d4e(0x7f7)](),this[_0x4a0d4e(0x737)];},Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x79f)]=function(){const _0xd6cc02=_0x3f1f6b;return this[_0xd6cc02(0x5ac)]()[_0xd6cc02(0x528)]!=='';},Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x584)]=function(){return this['svBattlerData']()['name'];},Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x7a6)]=function(){const _0x5c66c5=_0x3f1f6b;return this['hasSvBattler']()?VisuMZ['BattleCore'][_0x5c66c5(0x3e9)][_0x5c66c5(0xf3)][_0x5c66c5(0x45d)]:VisuMZ[_0x5c66c5(0x32d)]['Settings'][_0x5c66c5(0x5c6)]['SmoothImage'];},Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x6d7)]=function(_0x3fc38f){const _0x5f4c3e=_0x3f1f6b;Game_Battler[_0x5f4c3e(0x457)][_0x5f4c3e(0x6d7)][_0x5f4c3e(0x131)](this,_0x3fc38f);if(this['hasSvBattler']())this[_0x5f4c3e(0x3e0)](_0x3fc38f);},Game_Enemy['prototype'][_0x3f1f6b(0x42b)]=function(){const _0x154890=_0x3f1f6b,_0x4ca23c=this[_0x154890(0x5ac)]()['wtypeId']||0x0,_0x4455b4=$dataSystem['attackMotions'][_0x4ca23c];if(_0x4455b4){if(_0x4455b4[_0x154890(0x773)]===0x0)this[_0x154890(0xfb)](_0x154890(0x4f2));else{if(_0x4455b4[_0x154890(0x773)]===0x1)this['requestMotion'](_0x154890(0x83e));else _0x4455b4[_0x154890(0x773)]===0x2&&this[_0x154890(0xfb)]('missile');}}},Game_Enemy['prototype'][_0x3f1f6b(0x586)]=function(){const _0x173020=_0x3f1f6b,_0x3dd750=this['svBattlerData']()['wtypeId']||0x0,_0x2cc56b=$dataSystem['attackMotions'][_0x3dd750];_0x2cc56b&&this[_0x173020(0x814)](_0x2cc56b['weaponImageId']);},Game_Enemy[_0x3f1f6b(0x457)]['getAttackMotion']=function(){const _0x19c193=_0x3f1f6b,_0x1333c1=this[_0x19c193(0x5ac)]()[_0x19c193(0x1e2)]||0x0;return $dataSystem[_0x19c193(0x727)][_0x1333c1];},Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x62b)]=function(_0x88809f){const _0x337bcc=_0x3f1f6b;return this[_0x337bcc(0x4f9)]();},Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x5af)]=function(){const _0x58a4e6=_0x3f1f6b;Game_Battler[_0x58a4e6(0x457)][_0x58a4e6(0x5af)][_0x58a4e6(0x131)](this),this['isSpriteVisible']()&&this[_0x58a4e6(0x79f)]()&&this[_0x58a4e6(0xfb)](_0x58a4e6(0x434)),SoundManager[_0x58a4e6(0x67b)]();},Game_Enemy['prototype']['performEvasion']=function(){const _0xf111ad=_0x3f1f6b;Game_Battler[_0xf111ad(0x457)][_0xf111ad(0x524)][_0xf111ad(0x131)](this),this[_0xf111ad(0xfb)](_0xf111ad(0x124));},Game_Enemy['prototype'][_0x3f1f6b(0x635)]=function(){const _0xde6b11=_0x3f1f6b;Game_Battler['prototype']['performMagicEvasion'][_0xde6b11(0x131)](this),this[_0xde6b11(0xfb)](_0xde6b11(0x124));},Game_Enemy['prototype'][_0x3f1f6b(0x512)]=function(){const _0xf48e5d=_0x3f1f6b;Game_Battler[_0xf48e5d(0x457)][_0xf48e5d(0x512)][_0xf48e5d(0x131)](this),this[_0xf48e5d(0x42b)]();},Game_Enemy[_0x3f1f6b(0x457)]['allowCollapse']=function(){const _0x1ef9bf=_0x3f1f6b;if(this['hasSvBattler']()){if(this[_0x1ef9bf(0x3f5)]()>=0x1)return!![];return this[_0x1ef9bf(0x5ac)]()[_0x1ef9bf(0x5c4)];}else return!![];},Game_Enemy['prototype'][_0x3f1f6b(0x49f)]=function(){const _0x4b4ae1=_0x3f1f6b;return this[_0x4b4ae1(0x5ac)]()[_0x4b4ae1(0x76c)];},Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x1c9)]=function(){return this['svBattlerData']()['anchorY'];},Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x321)]=function(){const _0x5b4598=_0x3f1f6b;return this[_0x5b4598(0x5ac)]()[_0x5b4598(0x1fd)];},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x70c)]=Game_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x275)],Game_Enemy['prototype'][_0x3f1f6b(0x275)]=function(_0x381a38){const _0x339845=_0x3f1f6b;VisuMZ[_0x339845(0x32d)]['Game_Enemy_transform'][_0x339845(0x131)](this,_0x381a38),this[_0x339845(0x456)](),this['setupBattleCoreData']();const _0x3a7820=this[_0x339845(0x5cb)]();if(_0x3a7820)_0x3a7820[_0x339845(0x656)](this);},Game_Unit[_0x3f1f6b(0x457)][_0x3f1f6b(0x4b9)]=function(_0x2a300f){const _0x478c8e=_0x3f1f6b;for(const _0x3214d4 of this['members']()){if(_0x3214d4)_0x3214d4[_0x478c8e(0x4b9)](_0x2a300f);}},Game_Unit[_0x3f1f6b(0x457)][_0x3f1f6b(0xf0)]=function(){const _0x185a80=_0x3f1f6b,_0x6ab25a=this[_0x185a80(0x40c)]();return _0x6ab25a[Math[_0x185a80(0x2b0)](_0x6ab25a[_0x185a80(0x135)])];},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x14e)]=Game_Party['prototype'][_0x3f1f6b(0x7e7)],Game_Party['prototype'][_0x3f1f6b(0x7e7)]=function(_0x486a10){const _0x1cd0e9=_0x3f1f6b;VisuMZ[_0x1cd0e9(0x32d)][_0x1cd0e9(0x14e)][_0x1cd0e9(0x131)](this,_0x486a10),BattleManager[_0x1cd0e9(0x447)]();},VisuMZ['BattleCore'][_0x3f1f6b(0x20b)]=Game_Party[_0x3f1f6b(0x457)][_0x3f1f6b(0x546)],Game_Party[_0x3f1f6b(0x457)][_0x3f1f6b(0x546)]=function(_0x49818f){const _0x3e7ca3=_0x3f1f6b;VisuMZ[_0x3e7ca3(0x32d)]['Game_Party_removeActor'][_0x3e7ca3(0x131)](this,_0x49818f),BattleManager[_0x3e7ca3(0x447)]();},VisuMZ['BattleCore']['Game_Troop_setup']=Game_Troop[_0x3f1f6b(0x457)][_0x3f1f6b(0x68f)],Game_Troop[_0x3f1f6b(0x457)]['setup']=function(_0x1951b0){const _0x16e801=_0x3f1f6b;$gameTemp['clearForcedGameTroopSettingsBattleCore'](),$gameTemp[_0x16e801(0x615)](_0x1951b0),VisuMZ[_0x16e801(0x32d)][_0x16e801(0x6e0)][_0x16e801(0x131)](this,_0x1951b0);},VisuMZ['BattleCore'][_0x3f1f6b(0x5ae)]=Game_Map[_0x3f1f6b(0x457)][_0x3f1f6b(0xd7)],Game_Map[_0x3f1f6b(0x457)][_0x3f1f6b(0xd7)]=function(){const _0x4f3465=_0x3f1f6b;VisuMZ[_0x4f3465(0x32d)][_0x4f3465(0x5ae)][_0x4f3465(0x131)](this),this[_0x4f3465(0x39b)]();},Game_Map[_0x3f1f6b(0x457)][_0x3f1f6b(0x39b)]=function(){const _0x1e608e=_0x3f1f6b;this[_0x1e608e(0x7cf)]={},this['_regionBattleback2']={};if(!$dataMap)return;const _0x51bf67=$dataMap[_0x1e608e(0x4e8)];if(!_0x51bf67)return;const _0x18948d=_0x51bf67[_0x1e608e(0x7c7)](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/gi);if(_0x18948d)for(const _0x2a44d7 of _0x18948d){_0x2a44d7[_0x1e608e(0x7c7)](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x2458c1=Number(RegExp['$1']),_0x3dcab3=Number(RegExp['$2']),_0x17ec89=_0x3dcab3===0x1?this[_0x1e608e(0x7cf)]:this[_0x1e608e(0x540)],_0x5016e8=String(RegExp['$3']);_0x17ec89[_0x2458c1]=_0x5016e8;}},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x62d)]=Game_Map[_0x3f1f6b(0x457)][_0x3f1f6b(0x66f)],Game_Map['prototype'][_0x3f1f6b(0x66f)]=function(){const _0x52069d=_0x3f1f6b;if(!BattleManager[_0x52069d(0x735)]()){const _0x533330=$gamePlayer[_0x52069d(0x427)]($gamePlayer['x'],$gamePlayer['y']);if(this['_regionBattleback1']&&this[_0x52069d(0x7cf)][_0x533330])return this[_0x52069d(0x7cf)][_0x533330];}return VisuMZ[_0x52069d(0x32d)]['Game_Map_battleback1Name'][_0x52069d(0x131)](this);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x117)]=Game_Map['prototype'][_0x3f1f6b(0x14d)],Game_Map[_0x3f1f6b(0x457)][_0x3f1f6b(0x14d)]=function(){const _0x2d6d2f=_0x3f1f6b;if(!BattleManager[_0x2d6d2f(0x735)]()){const _0x220d8c=$gamePlayer['regionId']($gamePlayer['x'],$gamePlayer['y']);if(this['_regionBattleback1']&&this[_0x2d6d2f(0x540)][_0x220d8c])return this[_0x2d6d2f(0x540)][_0x220d8c];}return VisuMZ[_0x2d6d2f(0x32d)][_0x2d6d2f(0x117)][_0x2d6d2f(0x131)](this);},VisuMZ[_0x3f1f6b(0x32d)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x3f1f6b(0x457)][_0x3f1f6b(0x34d)],Game_Interpreter[_0x3f1f6b(0x457)][_0x3f1f6b(0x34d)]=function(_0x4bff02){const _0x5bb50a=_0x3f1f6b;return $gameTemp[_0x5bb50a(0x74c)](this),VisuMZ[_0x5bb50a(0x32d)][_0x5bb50a(0x3cb)][_0x5bb50a(0x131)](this,_0x4bff02);},VisuMZ['BattleCore'][_0x3f1f6b(0xc1)]=Game_Interpreter[_0x3f1f6b(0x457)]['updateWaitMode'],Game_Interpreter[_0x3f1f6b(0x457)][_0x3f1f6b(0x352)]=function(){const _0x59e0df=_0x3f1f6b;if(SceneManager[_0x59e0df(0x497)]())switch(this[_0x59e0df(0x619)]){case _0x59e0df(0x25d):if(Imported[_0x59e0df(0x7f4)]){if($gameScreen[_0x59e0df(0x4f0)]()[_0x59e0df(0x59e)]>0x0)return!![];this[_0x59e0df(0x619)]='';}break;case _0x59e0df(0x759):if(BattleManager[_0x59e0df(0x1b3)]['isAnimationPlaying']())return!![];this[_0x59e0df(0x619)]='';break;case'battleCamera':if(Imported[_0x59e0df(0x7f4)]){if($gameScreen[_0x59e0df(0x4f0)]()[_0x59e0df(0x81e)]>0x0)return!![];if($gameScreen[_0x59e0df(0x4f0)]()[_0x59e0df(0x1f5)]>0x0)return!![];this[_0x59e0df(0x619)]='';}break;case'battleEffect':if(BattleManager[_0x59e0df(0x1b3)][_0x59e0df(0x4cb)]())return!![];this[_0x59e0df(0x619)]='';break;case'battleFloat':if(BattleManager['_spriteset'][_0x59e0df(0x7c9)]())return!![];this[_0x59e0df(0x619)]='';break;case _0x59e0df(0x504):if(BattleManager['_spriteset']['isAnyoneJumping']())return!![];this['_waitMode']='';break;case _0x59e0df(0x68e):if(BattleManager[_0x59e0df(0x6f7)][_0x59e0df(0x651)]())return!![];this[_0x59e0df(0x619)]='';break;case _0x59e0df(0x56c):if(BattleManager[_0x59e0df(0x1b3)]['isAnyoneMoving']())return!![];this['_waitMode']='';break;case _0x59e0df(0x4fa):if(BattleManager[_0x59e0df(0x1b3)][_0x59e0df(0x26a)]())return!![];this[_0x59e0df(0x619)]='';break;case _0x59e0df(0x1a8):if(BattleManager[_0x59e0df(0x1b3)][_0x59e0df(0x6c4)]())return!![];this[_0x59e0df(0x619)]='';break;case _0x59e0df(0x77c):if(BattleManager[_0x59e0df(0x1b3)][_0x59e0df(0x70b)]())return!![];this[_0x59e0df(0x619)]='';break;case _0x59e0df(0xc9):if(Imported['VisuMZ_3_ActSeqProjectiles']){if(BattleManager[_0x59e0df(0x1b3)][_0x59e0df(0x51f)]())return!![];this[_0x59e0df(0x619)]='';}break;case'battleSkew':if(Imported[_0x59e0df(0x7f4)]){if($gameScreen['battleCameraData']()[_0x59e0df(0x7a3)]>0x0)return!![];this[_0x59e0df(0x619)]='';}break;case _0x59e0df(0x624):if(BattleManager[_0x59e0df(0x1b3)][_0x59e0df(0x4ad)]())return!![];this[_0x59e0df(0x619)]='';break;case _0x59e0df(0x76f):if(Imported['VisuMZ_3_ActSeqCamera']){if($gameScreen[_0x59e0df(0x4f0)]()[_0x59e0df(0x681)]>0x0)return!![];this['_waitMode']='';}break;}return VisuMZ['BattleCore'][_0x59e0df(0xc1)][_0x59e0df(0x131)](this);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x6ec)]=Game_Interpreter[_0x3f1f6b(0x457)][_0x3f1f6b(0x826)],Game_Interpreter[_0x3f1f6b(0x457)][_0x3f1f6b(0x826)]=function(_0x5d38c1){const _0x21374d=_0x3f1f6b;return!$gameParty[_0x21374d(0x785)]()?this['command301_PreBattleEvent'](_0x5d38c1):VisuMZ[_0x21374d(0x32d)][_0x21374d(0x6ec)]['call'](this,_0x5d38c1);},Game_Interpreter[_0x3f1f6b(0x457)][_0x3f1f6b(0x31e)]=function(_0x422c8f){const _0x1a8288=_0x3f1f6b;return VisuMZ['BattleCore'][_0x1a8288(0x6ec)][_0x1a8288(0x131)](this,_0x422c8f),BattleManager[_0x1a8288(0x693)](_0x3e02b9=>{const _0x1a78ee=_0x1a8288;this[_0x1a78ee(0x5b1)][this['_indent']]=_0x3e02b9;}),!![];},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x123)]=function(_0xf10384){const _0xccfe7=_0x3f1f6b,_0x43993d=$dataCommonEvents[_0xf10384];if(!_0x43993d)return![];if(_0x43993d[_0xccfe7(0x5f8)][_0xccfe7(0x135)]<=0x1)return![];return!![];},Game_Interpreter[_0x3f1f6b(0x457)][_0x3f1f6b(0x723)]=function(_0x246dfd){const _0x458953=_0x3f1f6b,_0x263537=VisuMZ['BattleCore']['Settings'][_0x458953(0x433)],_0x25ec06=_0x263537[_0x458953(0x3ed)],_0x1dd170=$dataCommonEvents[_0x25ec06];if(_0x1dd170&&VisuMZ[_0x458953(0x32d)][_0x458953(0x123)](_0x25ec06)){const _0x5c2679=this[_0x458953(0x1c2)]()?this[_0x458953(0x5ed)]:0x0,_0x56002f=_0x1dd170[_0x458953(0x5f8)];this['setupChild'](_0x56002f,_0x5c2679),this['_list']=JsonEx[_0x458953(0x6a7)](this[_0x458953(0x453)]);const _0x36b730={'code':0xbc3,'indent':this['_indent'],'parameters':JsonEx['makeDeepCopy'](_0x246dfd)};return this['_list'][_0x458953(0x227)](this[_0x458953(0x5b7)]+0x1,0x0,_0x36b730),!![];}else return VisuMZ[_0x458953(0x32d)][_0x458953(0x6ec)]['call'](this,_0x246dfd);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x7a8)]=BattleManager[_0x3f1f6b(0x182)],BattleManager[_0x3f1f6b(0x182)]=function(){const _0x228cb5=_0x3f1f6b;VisuMZ[_0x228cb5(0x32d)]['BattleManager_onEncounter'][_0x228cb5(0x131)](this),this['onEncounterBattleCore']();},BattleManager[_0x3f1f6b(0xef)]=function(){const _0xd947d7=_0x3f1f6b,_0x55f735=VisuMZ[_0xd947d7(0x32d)][_0xd947d7(0x3e9)][_0xd947d7(0x433)],_0x238024=_0x55f735[_0xd947d7(0x3ed)];_0x238024&&VisuMZ[_0xd947d7(0x32d)][_0xd947d7(0x123)](_0x238024)&&(this[_0xd947d7(0x6c7)]=!![],$gameTemp[_0xd947d7(0x761)](_0x55f735[_0xd947d7(0x3ed)]),$gameMap['updateInterpreter'](),$gameMap[_0xd947d7(0x407)]['_preBattleCommonEvent']=!![]),_0x55f735['DefeatEvent']>0x0&&(this[_0xd947d7(0x79c)]=!![]);},VisuMZ['BattleCore']['Scene_Map_launchBattle']=Scene_Map[_0x3f1f6b(0x457)][_0x3f1f6b(0x49a)],Scene_Map['prototype'][_0x3f1f6b(0x49a)]=function(){const _0x37cce5=_0x3f1f6b;BattleManager[_0x37cce5(0x6c7)]?this[_0x37cce5(0x3d3)]():VisuMZ['BattleCore'][_0x37cce5(0x721)][_0x37cce5(0x131)](this);},Scene_Map[_0x3f1f6b(0x457)][_0x3f1f6b(0x3d3)]=function(){const _0x5e6f15=_0x3f1f6b;this[_0x5e6f15(0x16a)]=!![];},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x780)]=SceneManager[_0x3f1f6b(0x2a3)],SceneManager[_0x3f1f6b(0x2a3)]=function(){const _0x1e914c=_0x3f1f6b;if(BattleManager[_0x1e914c(0x6c7)])return![];return VisuMZ['BattleCore'][_0x1e914c(0x780)][_0x1e914c(0x131)](this);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x11b)]=Game_Interpreter['prototype'][_0x3f1f6b(0x7e0)],Game_Interpreter['prototype'][_0x3f1f6b(0x7e0)]=function(){const _0x47ff85=_0x3f1f6b;VisuMZ[_0x47ff85(0x32d)]['Game_Interpreter_terminate'][_0x47ff85(0x131)](this),this[_0x47ff85(0x299)]&&(this[_0x47ff85(0x299)]=undefined,SceneManager['_scene'][_0x47ff85(0x7db)]());},Scene_Map['prototype'][_0x3f1f6b(0x7db)]=function(){const _0x92c74=_0x3f1f6b;BattleManager[_0x92c74(0x6c7)]=undefined,this[_0x92c74(0xcc)]();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0xff)]=Scene_Map[_0x3f1f6b(0x457)]['initialize'],Scene_Map[_0x3f1f6b(0x457)][_0x3f1f6b(0x138)]=function(){const _0x3970ec=_0x3f1f6b;VisuMZ[_0x3970ec(0x32d)][_0x3970ec(0xff)][_0x3970ec(0x131)](this),$gameTemp[_0x3970ec(0x3ee)]();},VisuMZ['BattleCore'][_0x3f1f6b(0x122)]=Scene_ItemBase[_0x3f1f6b(0x457)]['applyItem'],Scene_ItemBase['prototype'][_0x3f1f6b(0x240)]=function(){const _0x322787=_0x3f1f6b;VisuMZ['BattleCore'][_0x322787(0x122)]['call'](this),this[_0x322787(0x187)]()[_0x322787(0x4e8)][_0x322787(0x7c7)](/<CUSTOM ACTION SEQUENCE>/i)&&($gameTemp[_0x322787(0x452)]=[]),DataManager[_0x322787(0xf1)](this[_0x322787(0x187)]())&&($gameTemp[_0x322787(0x452)]=[]);},VisuMZ['BattleCore'][_0x3f1f6b(0x7f1)]=Scene_Options[_0x3f1f6b(0x457)][_0x3f1f6b(0x6fc)],Scene_Options[_0x3f1f6b(0x457)][_0x3f1f6b(0x6fc)]=function(){const _0x1d8303=_0x3f1f6b;let _0x15e954=VisuMZ[_0x1d8303(0x32d)][_0x1d8303(0x7f1)]['call'](this);const _0x310c69=VisuMZ[_0x1d8303(0x32d)][_0x1d8303(0x3e9)];if(_0x310c69[_0x1d8303(0x6be)]['AddOption']&&_0x310c69[_0x1d8303(0x6be)][_0x1d8303(0x1dd)])_0x15e954+=0x2;if(_0x310c69[_0x1d8303(0x153)][_0x1d8303(0x574)]&&_0x310c69[_0x1d8303(0x153)][_0x1d8303(0x1dd)])_0x15e954+=0x1;return _0x15e954;},VisuMZ[_0x3f1f6b(0x32d)]['Scene_Battle_start']=Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x5e3)],Scene_Battle[_0x3f1f6b(0x457)]['start']=function(){const _0x16580e=_0x3f1f6b;SceneManager[_0x16580e(0xf6)]()?(Scene_Message[_0x16580e(0x457)][_0x16580e(0x5e3)][_0x16580e(0x131)](this),this[_0x16580e(0x1b3)]&&this[_0x16580e(0x1b3)][_0x16580e(0x5f1)](),BattleManager['_tpbSceneChangeCacheActor']&&BattleManager[_0x16580e(0x12c)]()):VisuMZ[_0x16580e(0x32d)][_0x16580e(0x52d)]['call'](this);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x40e)]=Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0xcc)],Scene_Battle['prototype'][_0x3f1f6b(0xcc)]=function(){const _0xe9b685=_0x3f1f6b;SceneManager[_0xe9b685(0xdb)]()?Scene_Message[_0xe9b685(0x457)]['stop'][_0xe9b685(0x131)](this):VisuMZ[_0xe9b685(0x32d)]['Scene_Battle_stop']['call'](this);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x607)]=Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x7e0)],Scene_Battle['prototype'][_0x3f1f6b(0x7e0)]=function(){const _0x28d794=_0x3f1f6b;SceneManager['isNextSceneBattleTransitionable']()?Scene_Message[_0x28d794(0x457)][_0x28d794(0x7e0)][_0x28d794(0x131)](this):VisuMZ[_0x28d794(0x32d)][_0x28d794(0x607)][_0x28d794(0x131)](this);},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x27c)]=function(){const _0x113ba1=_0x3f1f6b;if(ConfigManager[_0x113ba1(0x58c)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x113ba1(0x20c)];else{if(this[_0x113ba1(0x6f3)]()===_0x113ba1(0x77b))return![];else{return Scene_Message[_0x113ba1(0x457)][_0x113ba1(0x27c)][_0x113ba1(0x131)](this);;}}},VisuMZ[_0x3f1f6b(0x32d)]['Scene_Battle_createAllWindows']=Scene_Battle['prototype'][_0x3f1f6b(0x428)],Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x428)]=function(){const _0x1a089f=_0x3f1f6b;this[_0x1a089f(0x7ed)](),VisuMZ[_0x1a089f(0x32d)][_0x1a089f(0x509)][_0x1a089f(0x131)](this),this[_0x1a089f(0x716)]();},VisuMZ[_0x3f1f6b(0x32d)]['Scene_Battle_createCancelButton']=Scene_Battle['prototype'][_0x3f1f6b(0x179)],Scene_Battle[_0x3f1f6b(0x457)]['createCancelButton']=function(){const _0x41b9a8=_0x3f1f6b;VisuMZ['BattleCore']['Scene_Battle_createCancelButton'][_0x41b9a8(0x131)](this),this[_0x41b9a8(0x6f3)]()===_0x41b9a8(0x77b)&&this[_0x41b9a8(0x264)]();},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x492)]=function(_0x3ad4ed){const _0x104775=_0x3f1f6b;_0x3ad4ed?(this[_0x104775(0x73a)]['x']=(Graphics[_0x104775(0x364)]-Graphics[_0x104775(0x2e4)])/0x2,this['_windowLayer']['y']=(Graphics['height']-Graphics['boxHeight'])/0x2):(this[_0x104775(0x73a)]['x']=Graphics[_0x104775(0x364)]*0xa,this[_0x104775(0x73a)]['y']=Graphics[_0x104775(0x555)]*0xa);},VisuMZ[_0x3f1f6b(0x32d)]['Scene_Battle_selectNextCommand']=Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x576)],Scene_Battle['prototype']['selectNextCommand']=function(){const _0x55e5e3=_0x3f1f6b,_0x2658a=BattleManager[_0x55e5e3(0x26b)]();VisuMZ[_0x55e5e3(0x32d)][_0x55e5e3(0x1eb)]['call'](this);if(_0x2658a){if(_0x2658a===BattleManager[_0x55e5e3(0x26b)]())return;if(_0x2658a===BattleManager[_0x55e5e3(0x633)])return;if(_0x2658a[_0x55e5e3(0x5cb)]())_0x2658a[_0x55e5e3(0x5cb)]()[_0x55e5e3(0x324)]();}},VisuMZ[_0x3f1f6b(0x32d)]['Scene_Battle_selectPreviousCommand']=Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0xd0)],Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0xd0)]=function(){const _0xb1fc99=_0x3f1f6b,_0x18168f=BattleManager[_0xb1fc99(0x26b)]();if(_0x18168f&&_0x18168f[_0xb1fc99(0x5cb)])_0x18168f[_0xb1fc99(0x5cb)]()[_0xb1fc99(0x324)]();VisuMZ[_0xb1fc99(0x32d)][_0xb1fc99(0x2d3)][_0xb1fc99(0x131)](this);},VisuMZ[_0x3f1f6b(0x32d)]['Scene_Battle_logWindowRect']=Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x824)],Scene_Battle[_0x3f1f6b(0x457)]['logWindowRect']=function(){const _0x2ea50e=_0x3f1f6b;if(VisuMZ['BattleCore'][_0x2ea50e(0x3e9)][_0x2ea50e(0x2ac)]['BattleLogRectJS'])return VisuMZ[_0x2ea50e(0x32d)][_0x2ea50e(0x3e9)][_0x2ea50e(0x2ac)]['BattleLogRectJS'][_0x2ea50e(0x131)](this);return VisuMZ[_0x2ea50e(0x32d)][_0x2ea50e(0xf4)]['call'](this);},VisuMZ['BattleCore'][_0x3f1f6b(0x551)]=Scene_Battle[_0x3f1f6b(0x457)]['createPartyCommandWindow'],Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x3b0)]=function(){const _0x223824=_0x3f1f6b;VisuMZ[_0x223824(0x32d)][_0x223824(0x551)][_0x223824(0x131)](this),this[_0x223824(0x2e1)]();},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x2e1)]=function(){const _0x4e91d0=_0x3f1f6b,_0x15f6e1=this[_0x4e91d0(0x2bf)];_0x15f6e1[_0x4e91d0(0x49c)](_0x4e91d0(0x670),this[_0x4e91d0(0x2fb)][_0x4e91d0(0x22f)](this)),_0x15f6e1['setHandler']('options',this[_0x4e91d0(0x222)]['bind'](this));const _0x1aced0=this[_0x4e91d0(0x6f3)]();switch(_0x1aced0){case'xp':case _0x4e91d0(0x35f):return this[_0x4e91d0(0x2bf)][_0x4e91d0(0x256)](0x1);break;}},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x2fb)]=function(){const _0x3dbcde=_0x3f1f6b;BattleManager[_0x3dbcde(0x3ce)]=!![],$gameParty[_0x3dbcde(0x47e)](),this[_0x3dbcde(0x576)](),BattleManager[_0x3dbcde(0x1de)]()&&(BattleManager[_0x3dbcde(0x7de)]=![]);},Scene_Battle['prototype'][_0x3f1f6b(0x222)]=function(){const _0x5045ba=_0x3f1f6b;this[_0x5045ba(0x7f6)]()?(this['_callSceneOptions']=!![],this[_0x5045ba(0x6f7)]['push'](_0x5045ba(0x748),VisuMZ[_0x5045ba(0x32d)][_0x5045ba(0x3e9)][_0x5045ba(0x10c)][_0x5045ba(0x56a)])):this[_0x5045ba(0x6cd)]();},Scene_Battle['prototype'][_0x3f1f6b(0x7f6)]=function(){const _0x3fdc22=_0x3f1f6b;return BattleManager[_0x3fdc22(0x499)]();},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x6cd)]=function(){const _0x18e531=_0x3f1f6b;this[_0x18e531(0x590)]=![],this[_0x18e531(0x1b3)][_0x18e531(0x5f1)](),this[_0x18e531(0x73a)][_0x18e531(0xfc)]=![];if(BattleManager[_0x18e531(0x735)]())($dataSystem[_0x18e531(0x66f)]||$dataSystem['battleback2Name'])&&SceneManager[_0x18e531(0x4d5)]();else($gameMap['battleback1Name']()||$gameMap[_0x18e531(0x14d)]())&&SceneManager[_0x18e531(0x4d5)]();SceneManager[_0x18e531(0x547)](Scene_Options),BattleManager[_0x18e531(0x1de)]()&&(BattleManager[_0x18e531(0x4a3)]=BattleManager[_0x18e531(0x26b)]());},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0xe2)]=Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x7a9)],Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x7a9)]=function(){const _0x199c27=_0x3f1f6b;VisuMZ[_0x199c27(0x32d)]['Scene_Battle_updateBattleProcess'][_0x199c27(0x131)](this);if(this[_0x199c27(0x590)]&&!BattleManager[_0x199c27(0x633)])this[_0x199c27(0x6cd)]();},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x716)]=function(){const _0x29e158=_0x3f1f6b,_0x2ef588=this[_0x29e158(0x7c1)]();this[_0x29e158(0x533)]=new Window_AutoBattleCancel(_0x2ef588),this[_0x29e158(0x533)][_0x29e158(0x221)](),this[_0x29e158(0x69a)](this[_0x29e158(0x533)]);},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x7c1)]=function(){const _0xb6838b=_0x3f1f6b;return VisuMZ[_0xb6838b(0x32d)][_0xb6838b(0x3e9)]['AutoBattle'][_0xb6838b(0x213)][_0xb6838b(0x131)](this);},Scene_Battle['prototype']['isPartyCommandWindowDisabled']=function(){const _0x3c6010=_0x3f1f6b;return VisuMZ[_0x3c6010(0x32d)]['Settings'][_0x3c6010(0x10c)][_0x3c6010(0x587)];},VisuMZ['BattleCore'][_0x3f1f6b(0xb8)]=Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x618)],Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x618)]=function(){const _0x14c9f2=_0x3f1f6b;this[_0x14c9f2(0x1c6)]()?this[_0x14c9f2(0xe3)]():VisuMZ[_0x14c9f2(0x32d)][_0x14c9f2(0xb8)][_0x14c9f2(0x131)](this);},Scene_Battle['prototype']['onDisabledPartyCommandSelection']=function(){const _0x5c3b78=_0x3f1f6b;if(BattleManager['isDTB']())this[_0x5c3b78(0x576)]();else BattleManager['isTpb']()&&VisuMZ[_0x5c3b78(0x32d)][_0x5c3b78(0xb8)][_0x5c3b78(0x131)](this);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x553)]=Scene_Battle[_0x3f1f6b(0x457)]['commandFight'],Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x417)]=function(){const _0xb0a934=_0x3f1f6b;BattleManager['isTpb']()?this[_0xb0a934(0x794)]():VisuMZ[_0xb0a934(0x32d)][_0xb0a934(0x553)][_0xb0a934(0x131)](this);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x44f)]=Scene_Battle['prototype']['createActorCommandWindow'],Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x43b)]=function(){const _0x5a025f=_0x3f1f6b;VisuMZ['BattleCore'][_0x5a025f(0x44f)][_0x5a025f(0x131)](this),this[_0x5a025f(0xb6)]();},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0xb6)]=function(){const _0x1ac411=_0x3f1f6b,_0x414070=this['_actorCommandWindow'];_0x414070[_0x1ac411(0x49c)](_0x1ac411(0x19d),this['actorCommandEscape'][_0x1ac411(0x22f)](this)),_0x414070[_0x1ac411(0x49c)](_0x1ac411(0x670),this[_0x1ac411(0x4fe)][_0x1ac411(0x22f)](this)),_0x414070[_0x1ac411(0x49c)](_0x1ac411(0x17f),this[_0x1ac411(0x281)][_0x1ac411(0x22f)](this)),BattleManager[_0x1ac411(0x1de)]()&&(this[_0x1ac411(0x1c6)]()?delete _0x414070[_0x1ac411(0x766)][_0x1ac411(0x3da)]:_0x414070['setHandler']('cancel',this['actorCommandCancelTPB'][_0x1ac411(0x22f)](this)));},Scene_Battle['prototype'][_0x3f1f6b(0xb2)]=function(){const _0x56c99c=_0x3f1f6b;this[_0x56c99c(0x510)]();},Scene_Battle['prototype'][_0x3f1f6b(0x4fe)]=function(){const _0x13af73=_0x3f1f6b;BattleManager['actor']()['makeAutoBattleActions'](),BattleManager['finishActorInput'](),BattleManager['selectNextActor'](),this[_0x13af73(0x6bd)]();},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x281)]=function(){const _0x35df34=_0x3f1f6b,_0x1ac284=BattleManager['inputtingAction']();_0x1ac284[_0x35df34(0x77a)](this[_0x35df34(0x400)][_0x35df34(0x329)]()),this[_0x35df34(0x14a)]();},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x471)]=function(){const _0x1ddff9=_0x3f1f6b;this[_0x1ddff9(0x2bf)][_0x1ddff9(0x68f)](),this[_0x1ddff9(0x400)][_0x1ddff9(0x739)]();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x7d6)]=Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x3dd)],Scene_Battle[_0x3f1f6b(0x457)]['createHelpWindow']=function(){const _0x48dc33=_0x3f1f6b;VisuMZ[_0x48dc33(0x32d)][_0x48dc33(0x7d6)][_0x48dc33(0x131)](this),this[_0x48dc33(0x75d)]();},Scene_Battle['prototype'][_0x3f1f6b(0x75d)]=function(){const _0x847a21=_0x3f1f6b;this[_0x847a21(0x400)][_0x847a21(0x518)](this['_helpWindow']),this[_0x847a21(0x2bf)][_0x847a21(0x518)](this[_0x847a21(0x313)]);},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x6f3)]=function(){const _0x4970c6=_0x3f1f6b;if($gameTemp[_0x4970c6(0x82f)]!==undefined)return $gameTemp[_0x4970c6(0x82f)];if(this[_0x4970c6(0x708)])return this[_0x4970c6(0x708)];return this[_0x4970c6(0x708)]=VisuMZ[_0x4970c6(0x32d)][_0x4970c6(0x3e9)]['BattleLayout'][_0x4970c6(0x423)][_0x4970c6(0x61d)]()[_0x4970c6(0x6da)](),this[_0x4970c6(0x708)];},VisuMZ[_0x3f1f6b(0x32d)]['Scene_Battle_windowAreaHeight']=Scene_Battle['prototype'][_0x3f1f6b(0x606)],Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x606)]=function(){const _0x29ed21=_0x3f1f6b,_0x41c1e8=this[_0x29ed21(0x6f3)]();switch(_0x41c1e8){case _0x29ed21(0x5f8):return this[_0x29ed21(0x370)](Math[_0x29ed21(0x39f)](0x1,$gameParty[_0x29ed21(0x437)]()),!![]);break;default:return VisuMZ[_0x29ed21(0x32d)]['Scene_Battle_windowAreaHeight']['call'](this);break;}},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x1ff)]=Scene_Battle['prototype'][_0x3f1f6b(0x50d)],Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x50d)]=function(){const _0x56d786=_0x3f1f6b,_0x1aba1c=this['battleLayoutStyle']();switch(_0x1aba1c){case _0x56d786(0x77b):return this[_0x56d786(0x6e5)]();break;case _0x56d786(0x6f0):case _0x56d786(0x5f8):case'xp':case'portrait':default:return VisuMZ[_0x56d786(0x32d)][_0x56d786(0x1ff)][_0x56d786(0x131)](this);break;}},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x65c)]=function(){const _0x1056ae=_0x3f1f6b,_0x453c0b=this[_0x1056ae(0x6f3)]();switch(_0x453c0b){case'xp':case _0x1056ae(0x35f):return this[_0x1056ae(0x4c5)]();break;case _0x1056ae(0x77b):return this[_0x1056ae(0x276)]();break;case _0x1056ae(0x6f0):case _0x1056ae(0x5f8):default:return this[_0x1056ae(0x2f2)]();break;}},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x807)]=Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x3f4)],Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x3f4)]=function(){const _0x10b631=_0x3f1f6b,_0x487c68=this[_0x10b631(0x6f3)]();switch(_0x487c68){case'xp':case _0x10b631(0x35f):return this[_0x10b631(0x467)]();break;case _0x10b631(0x77b):return this[_0x10b631(0x224)]();case _0x10b631(0x6f0):case _0x10b631(0x5f8):default:return this[_0x10b631(0x7ee)]();break;}},Scene_Battle['prototype'][_0x3f1f6b(0x7ee)]=function(){const _0x2e597f=_0x3f1f6b,_0x56cc13=VisuMZ[_0x2e597f(0x32d)]['Settings'][_0x2e597f(0x24c)],_0x1b4637=_0x56cc13[_0x2e597f(0x6d9)]||0xc0,_0x82e315=this['windowAreaHeight'](),_0x3a478c=this[_0x2e597f(0x27c)]()?Graphics[_0x2e597f(0x2e4)]-_0x1b4637:0x0,_0x195d48=Graphics[_0x2e597f(0x30e)]-_0x82e315;return new Rectangle(_0x3a478c,_0x195d48,_0x1b4637,_0x82e315);},Scene_Battle[_0x3f1f6b(0x457)]['actorCommandWindowRect']=function(){const _0x588018=_0x3f1f6b;return this[_0x588018(0x3f4)]();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x408)]=Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x6ed)],Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x6ed)]=function(){const _0xaa3aac=_0x3f1f6b,_0x21a7a2=this[_0xaa3aac(0x6f3)]();switch(_0x21a7a2){case'xp':case'portrait':case _0xaa3aac(0x77b):break;case _0xaa3aac(0x6f0):case _0xaa3aac(0x5f8):default:VisuMZ[_0xaa3aac(0x32d)][_0xaa3aac(0x408)][_0xaa3aac(0x131)](this);break;}},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x293)]=Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x30d)],Scene_Battle['prototype'][_0x3f1f6b(0x30d)]=function(){const _0x1fdb28=_0x3f1f6b;VisuMZ[_0x1fdb28(0x32d)][_0x1fdb28(0x293)][_0x1fdb28(0x131)](this),this[_0x1fdb28(0x789)]();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x378)]=Scene_Battle['prototype'][_0x3f1f6b(0xed)],Scene_Battle[_0x3f1f6b(0x457)]['startEnemySelection']=function(){const _0x42445d=_0x3f1f6b;VisuMZ[_0x42445d(0x32d)][_0x42445d(0x378)][_0x42445d(0x131)](this),this[_0x42445d(0x647)][_0x42445d(0x6df)](),this[_0x42445d(0x789)]();},Scene_Battle['prototype'][_0x3f1f6b(0x789)]=function(){const _0x65e004=_0x3f1f6b,_0x47f10e=this[_0x65e004(0x6f3)]();['xp',_0x65e004(0x35f),_0x65e004(0x77b)][_0x65e004(0x354)](_0x47f10e)&&this[_0x65e004(0x400)][_0x65e004(0x739)](),(_0x47f10e==='border'||this['isSkillItemWindowsMiddle']())&&(this[_0x65e004(0x13e)]['close'](),this['_itemWindow'][_0x65e004(0x739)]());},VisuMZ[_0x3f1f6b(0x32d)]['Scene_Battle_onActorOk']=Scene_Battle[_0x3f1f6b(0x457)]['onActorOk'],Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x347)]=function(){const _0x32ea55=_0x3f1f6b;VisuMZ['BattleCore'][_0x32ea55(0x612)]['call'](this),this['okTargetSelectionVisibility']();},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x2e3)]=function(){const _0xd3c44f=_0x3f1f6b;return[_0xd3c44f(0x763),_0xd3c44f(0x6a4),_0xd3c44f(0x17f)][_0xd3c44f(0x354)](this[_0xd3c44f(0x400)][_0xd3c44f(0x4fc)]());},VisuMZ['BattleCore'][_0x3f1f6b(0x19a)]=Scene_Battle['prototype']['onActorCancel'],Scene_Battle['prototype'][_0x3f1f6b(0x35c)]=function(){const _0x1ce836=_0x3f1f6b;this[_0x1ce836(0x2e3)]()?(this[_0x1ce836(0x29a)][_0x1ce836(0x12e)](),this[_0x1ce836(0x45f)][_0x1ce836(0x221)](),this[_0x1ce836(0x400)][_0x1ce836(0x501)]()):VisuMZ[_0x1ce836(0x32d)][_0x1ce836(0x19a)][_0x1ce836(0x131)](this),this[_0x1ce836(0x1b5)]();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x787)]=Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x5de)],Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x5de)]=function(){const _0x43a1df=_0x3f1f6b;VisuMZ[_0x43a1df(0x32d)][_0x43a1df(0x787)][_0x43a1df(0x131)](this),this[_0x43a1df(0x5d1)]();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x529)]=Scene_Battle['prototype'][_0x3f1f6b(0x7a1)],Scene_Battle['prototype'][_0x3f1f6b(0x7a1)]=function(){const _0x3a5b90=_0x3f1f6b;this['isNonSubmenuCancel']()?(this[_0x3a5b90(0x29a)]['show'](),this[_0x3a5b90(0x647)][_0x3a5b90(0x221)](),this[_0x3a5b90(0x400)][_0x3a5b90(0x501)]()):VisuMZ[_0x3a5b90(0x32d)][_0x3a5b90(0x529)]['call'](this),this[_0x3a5b90(0x1b5)]();},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x5d1)]=function(){const _0x6cde91=_0x3f1f6b,_0x3cb84d=this[_0x6cde91(0x6f3)]();(_0x3cb84d===_0x6cde91(0x77b)||this[_0x6cde91(0x626)]())&&(this[_0x6cde91(0x13e)]['open'](),this[_0x6cde91(0x13e)][_0x6cde91(0x4e3)]&&this[_0x6cde91(0x13e)]['show'](),this['_itemWindow'][_0x6cde91(0x57e)](),this[_0x6cde91(0x7fc)][_0x6cde91(0x4e3)]&&this[_0x6cde91(0x7fc)][_0x6cde91(0x12e)]());},Scene_Battle['prototype'][_0x3f1f6b(0x1b5)]=function(){const _0x3c3796=_0x3f1f6b,_0x349062=this[_0x3c3796(0x6f3)]();['xp','portrait',_0x3c3796(0x77b)][_0x3c3796(0x354)](_0x349062)&&this[_0x3c3796(0x400)][_0x3c3796(0x57e)](),this['okTargetSelectionVisibility']();},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x2f2)]=function(){const _0x223026=_0x3f1f6b,_0x489bb1=VisuMZ[_0x223026(0x32d)][_0x223026(0x3e9)][_0x223026(0x24c)],_0x41d59e=Window_BattleStatus[_0x223026(0x457)][_0x223026(0x3aa)](),_0x425593=Graphics[_0x223026(0x2e4)]-(_0x489bb1['CommandWidth']||0xc0),_0x4b001e=this['windowAreaHeight']()+_0x41d59e,_0x5b3f55=this[_0x223026(0x27c)]()?0x0:Graphics['boxWidth']-_0x425593,_0x41be6f=Graphics[_0x223026(0x30e)]-_0x4b001e+_0x41d59e;return new Rectangle(_0x5b3f55,_0x41be6f,_0x425593,_0x4b001e);},Scene_Battle['prototype'][_0x3f1f6b(0x4c5)]=function(){const _0x1cd244=_0x3f1f6b,_0x320798=Window_BattleStatus['prototype']['extraHeight'](),_0x11bd9e=Graphics[_0x1cd244(0x2e4)],_0x51886f=this['windowAreaHeight']()+_0x320798,_0x14af2e=0x0,_0x1924d7=Graphics[_0x1cd244(0x30e)]-_0x51886f+_0x320798;return new Rectangle(_0x14af2e,_0x1924d7,_0x11bd9e,_0x51886f);},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x467)]=function(){const _0x2f37e7=_0x3f1f6b,_0x2ce115=Graphics['boxWidth']/0x2,_0x5ba162=this[_0x2f37e7(0x370)](VisuMZ['BattleCore']['Settings'][_0x2f37e7(0x24c)][_0x2f37e7(0x411)],!![]),_0x5e4a54=Math[_0x2f37e7(0x5a7)]((Graphics[_0x2f37e7(0x2e4)]-_0x2ce115)/0x2),_0x4884b6=Graphics[_0x2f37e7(0x30e)]-_0x5ba162-this['statusWindowRectXPStyle']()['height'];return new Rectangle(_0x5e4a54,_0x4884b6,_0x2ce115,_0x5ba162);},Scene_Battle['prototype'][_0x3f1f6b(0x6e5)]=function(){const _0x444481=_0x3f1f6b,_0x87395e=Graphics['width'],_0x20657c=Math[_0x444481(0x5a7)]((Graphics[_0x444481(0x2e4)]-_0x87395e)/0x2),_0xa2833e=this[_0x444481(0x1a3)](),_0x58b94d=(Graphics[_0x444481(0x555)]-Graphics[_0x444481(0x30e)])/-0x2;return new Rectangle(_0x20657c,_0x58b94d,_0x87395e,_0xa2833e);},Scene_Battle[_0x3f1f6b(0x457)]['statusWindowRectBorderStyle']=function(){const _0xaeae3b=_0x3f1f6b,_0x286100=Graphics['width'],_0x1da9b9=Math[_0xaeae3b(0x5a7)]((Graphics[_0xaeae3b(0x2e4)]-_0x286100)/0x2),_0x2350aa=this['calcWindowHeight'](0x4,!![]),_0x40791f=Graphics['boxHeight']-_0x2350aa+(Graphics['height']-Graphics[_0xaeae3b(0x30e)])/0x2;return new Rectangle(_0x1da9b9,_0x40791f,_0x286100,_0x2350aa);},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x224)]=function(){const _0x2c9a25=_0x3f1f6b,_0x4f6a34=Math['floor'](Graphics[_0x2c9a25(0x364)]/0x3),_0x4d44b1=this[_0x2c9a25(0x27c)]()?(Graphics[_0x2c9a25(0x364)]+Graphics[_0x2c9a25(0x2e4)])/0x2-_0x4f6a34:(Graphics[_0x2c9a25(0x364)]-Graphics[_0x2c9a25(0x2e4)])/-0x2,_0x3eb83b=this[_0x2c9a25(0x6e5)](),_0x2358c6=_0x3eb83b['y']+_0x3eb83b[_0x2c9a25(0x555)],_0x171bbf=this[_0x2c9a25(0x276)](),_0x10e09d=_0x171bbf['y']-_0x2358c6;return new Rectangle(_0x4d44b1,_0x2358c6,_0x4f6a34,_0x10e09d);},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x80b)]=function(){const _0x1966d0=_0x3f1f6b,_0x1b5ba3=Math[_0x1966d0(0x312)](Graphics[_0x1966d0(0x364)]/0x3),_0x2e3919=Math[_0x1966d0(0x5a7)]((Graphics[_0x1966d0(0x2e4)]-_0x1b5ba3)/0x2),_0x2c02a1=this[_0x1966d0(0x224)](),_0x4c5bd1=_0x2c02a1['y'],_0x37afb6=_0x2c02a1[_0x1966d0(0x555)];return new Rectangle(_0x2e3919,_0x4c5bd1,_0x1b5ba3,_0x37afb6);},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x264)]=function(){const _0x58f4d4=_0x3f1f6b;this[_0x58f4d4(0x3ae)]['y']=this['_helpWindow']['y']+this['_helpWindow'][_0x58f4d4(0x555)],this['isRightInputMode']()?this[_0x58f4d4(0x6f3)]()==='border'?this[_0x58f4d4(0x3ae)]['x']=0x8:this[_0x58f4d4(0x3ae)]['x']=-this[_0x58f4d4(0x3ae)][_0x58f4d4(0x364)]-0x4:this[_0x58f4d4(0x3ae)]['x']=Graphics[_0x58f4d4(0x364)]-(Graphics[_0x58f4d4(0x364)]-Graphics[_0x58f4d4(0x2e4)])/0x2-this[_0x58f4d4(0x3ae)][_0x58f4d4(0x364)]-0x4;},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x403)]=Scene_Battle[_0x3f1f6b(0x457)]['skillWindowRect'],Scene_Battle[_0x3f1f6b(0x457)]['skillWindowRect']=function(){const _0x3f5bbf=_0x3f1f6b;if(this['battleLayoutStyle']()===_0x3f5bbf(0x77b))return this['skillItemWindowRectBorderStyle']();else return this[_0x3f5bbf(0x626)]()?this['skillItemWindowRectMiddle']():VisuMZ[_0x3f5bbf(0x32d)]['Scene_Battle_skillWindowRect'][_0x3f5bbf(0x131)](this);},VisuMZ['BattleCore'][_0x3f1f6b(0x420)]=Scene_Battle['prototype']['itemWindowRect'],Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0xe6)]=function(){const _0x155fbb=_0x3f1f6b;if(this[_0x155fbb(0x6f3)]()===_0x155fbb(0x77b))return this[_0x155fbb(0x80b)]();else return this['isSkillItemWindowsMiddle']()?this[_0x155fbb(0x1bf)]():VisuMZ[_0x155fbb(0x32d)][_0x155fbb(0x420)][_0x155fbb(0x131)](this);},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x626)]=function(){const _0x5596cf=_0x3f1f6b;return VisuMZ[_0x5596cf(0x32d)][_0x5596cf(0x3e9)][_0x5596cf(0x24c)][_0x5596cf(0x163)];},Scene_Battle[_0x3f1f6b(0x457)]['skillItemWindowRectMiddle']=function(){const _0x510dee=_0x3f1f6b,_0x126497=Sprite_Button[_0x510dee(0x457)][_0x510dee(0x7fa)]()*0x2+0x4;let _0x137b88=Graphics[_0x510dee(0x2e4)]-_0x126497;Imported[_0x510dee(0x147)]&&SceneManager[_0x510dee(0x741)]()&&(_0x137b88+=_0x126497);const _0x472f5d=this[_0x510dee(0x2dd)](),_0x40c37b=Graphics['boxHeight']-_0x472f5d-this[_0x510dee(0x65c)]()[_0x510dee(0x555)]+Window_BattleStatus[_0x510dee(0x457)]['extraHeight'](),_0x2084e9=0x0;return new Rectangle(_0x2084e9,_0x472f5d,_0x137b88,_0x40c37b);},Scene_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x7ed)]=function(){const _0x917adf=_0x3f1f6b;this[_0x917adf(0x7b7)]=new Sprite(),this[_0x917adf(0x7b7)]['x']=this[_0x917adf(0x73a)]['x'],this[_0x917adf(0x7b7)]['y']=this[_0x917adf(0x73a)]['y'];const _0x14767a=this[_0x917adf(0x3a7)][_0x917adf(0x6c5)](this[_0x917adf(0x73a)]);this['addChildAt'](this[_0x917adf(0x7b7)],_0x14767a);for(let _0x4e81db=0x0;_0x4e81db<0x8;_0x4e81db++){const _0x27093b=new Window_EnemyName(_0x4e81db);this['_enemyNameContainer'][_0x917adf(0x69a)](_0x27093b);}},Sprite_Battler[_0x3f1f6b(0x29e)]=VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x3e9)][_0x3f1f6b(0xf3)][_0x3f1f6b(0x567)],VisuMZ['BattleCore'][_0x3f1f6b(0x444)]=Sprite_Battler['prototype'][_0x3f1f6b(0x5b4)],Sprite_Battler[_0x3f1f6b(0x457)]['initMembers']=function(){const _0x423d08=_0x3f1f6b;VisuMZ['BattleCore'][_0x423d08(0x444)][_0x423d08(0x131)](this),this[_0x423d08(0x271)]();if(this[_0x423d08(0x712)]===Sprite_Enemy)this[_0x423d08(0x7a2)]();this[_0x423d08(0x783)]();},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x271)]=function(){const _0x314376=_0x3f1f6b;this[_0x314376(0x1d7)]=0x0,this['_baseY']=0x0,this['_floatHeight']=0x0,this[_0x314376(0x336)]=0x0,this[_0x314376(0x6e9)]=0x0,this['_floatWholeDuration']=0x0,this[_0x314376(0x58e)]=_0x314376(0x60f),this['_jumpHeight']=0x0,this[_0x314376(0x495)]=0x0,this[_0x314376(0x756)]=0x0,this[_0x314376(0x3b1)]=0x0,this[_0x314376(0x7a4)]=0xff,this['_opacityDuration']=0x0,this[_0x314376(0x1ea)]=0x0,this['_opacityEasing']=_0x314376(0x60f),this['_currentAngle']=0x0,this[_0x314376(0x82a)]=0x0,this[_0x314376(0x623)]=0x0,this[_0x314376(0xac)]=0x0,this[_0x314376(0x537)]=_0x314376(0x60f),this[_0x314376(0x64c)]=!![],this[_0x314376(0x80e)]=0x0,this[_0x314376(0x3bf)]=0x0,this['_targetSkewX']=0x0,this[_0x314376(0x1e8)]=0x0,this[_0x314376(0x1a2)]=0x0,this[_0x314376(0x3ba)]=0x0,this[_0x314376(0x376)]=_0x314376(0x60f),this['_growX']=0x1,this['_growY']=0x1,this[_0x314376(0x5c7)]=0x1,this[_0x314376(0x488)]=0x1,this[_0x314376(0x3fa)]=0x0,this['_growWholeDuration']=0x0,this[_0x314376(0x4ca)]=_0x314376(0x60f),this['_flipScaleX']=0x1;},Sprite_Battler[_0x3f1f6b(0x457)]['createShadowSprite']=function(){const _0x4fd247=_0x3f1f6b;this['_shadowSprite']=new Sprite(),this[_0x4fd247(0x2d5)][_0x4fd247(0x4b4)]=ImageManager['loadSystem'](_0x4fd247(0x61f)),this[_0x4fd247(0x2d5)]['bitmap'][_0x4fd247(0x28c)]=VisuMZ[_0x4fd247(0x32d)][_0x4fd247(0x3e9)][_0x4fd247(0xf3)][_0x4fd247(0x45d)],this['_shadowSprite']['anchor']['x']=0.5,this['_shadowSprite']['anchor']['y']=0.5,this[_0x4fd247(0x2d5)]['y']=-0x2,this[_0x4fd247(0x2d5)][_0x4fd247(0xfc)]=![],this[_0x4fd247(0x69a)](this[_0x4fd247(0x2d5)]);},Sprite_Battler[_0x3f1f6b(0x457)]['createDistortionSprite']=function(){const _0x513ca7=_0x3f1f6b;this[_0x513ca7(0xc7)]=new Sprite(),this[_0x513ca7(0xc7)][_0x513ca7(0x101)]['x']=0.5,this[_0x513ca7(0xc7)]['anchor']['y']=0.5,this['addChild'](this[_0x513ca7(0xc7)]);},Sprite_Battler[_0x3f1f6b(0x457)]['attachSpritesToDistortionSprite']=function(){const _0x3d2ec0=_0x3f1f6b;if(!this[_0x3d2ec0(0xc7)])return;if(this[_0x3d2ec0(0x2d5)]){const _0x18c4c5=this['getChildIndex'](this[_0x3d2ec0(0xc7)]);this['addChildAt'](this[_0x3d2ec0(0x2d5)],_0x18c4c5),this['updateShadowVisibility']();}this[_0x3d2ec0(0x55f)]&&this[_0x3d2ec0(0xc7)][_0x3d2ec0(0x69a)](this['_svBattlerSprite']),this[_0x3d2ec0(0x43a)]&&this[_0x3d2ec0(0xc7)][_0x3d2ec0(0x69a)](this[_0x3d2ec0(0x43a)]),this[_0x3d2ec0(0x3c9)]&&this[_0x3d2ec0(0xc7)][_0x3d2ec0(0x69a)](this[_0x3d2ec0(0x3c9)]),this[_0x3d2ec0(0x345)]&&this['_distortionSprite']['addChild'](this[_0x3d2ec0(0x345)]);},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x239)]=function(){const _0x81681c=_0x3f1f6b;if(!this['_shadowSprite'])return;if(this['_battler']&&this['_battler'][_0x81681c(0x321)]()){const _0x54a0d0=this[_0x81681c(0x2d5)]['bitmap'];this[_0x81681c(0x2d5)][_0x81681c(0xfd)](0x0,0x0,_0x54a0d0[_0x81681c(0x364)],_0x54a0d0[_0x81681c(0x555)]);}else this[_0x81681c(0x2d5)][_0x81681c(0xfd)](0x0,0x0,0x0,0x0);},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x2c3)]=function(){const _0x51d00c=_0x3f1f6b;return SceneManager[_0x51d00c(0x497)]()?SceneManager[_0x51d00c(0x5bb)][_0x51d00c(0x1b3)][_0x51d00c(0x821)]:this[_0x51d00c(0xf2)];},Sprite_Battler[_0x3f1f6b(0x457)]['setupTextPopup']=function(_0x105ba8,_0x4e33e7){const _0x27fd7e=_0x3f1f6b;if(!this[_0x27fd7e(0x79b)][_0x27fd7e(0x39c)]())return;const _0x66347b=VisuMZ[_0x27fd7e(0x32d)]['Settings'][_0x27fd7e(0x282)],_0x443964=new Sprite_Damage();_0x443964[_0x27fd7e(0x366)]=_0x66347b[_0x27fd7e(0x21e)],this['sortDamageSprites'](_0x443964),_0x443964[_0x27fd7e(0x1f1)](_0x105ba8,_0x4e33e7),this[_0x27fd7e(0x668)](_0x443964);},Sprite_Battler['prototype'][_0x3f1f6b(0x5ad)]=function(_0x5841f9,_0x315d9b,_0x43cf30){const _0x587ed1=_0x3f1f6b;if(!this['_battler'][_0x587ed1(0x39c)]())return;const _0x3343c4=VisuMZ[_0x587ed1(0x32d)][_0x587ed1(0x3e9)][_0x587ed1(0x282)],_0x54d525=new Sprite_Damage();_0x54d525['_duration']=_0x3343c4[_0x587ed1(0x21e)],this[_0x587ed1(0x361)](_0x54d525),_0x54d525[_0x587ed1(0x5ad)](_0x5841f9,_0x315d9b,_0x43cf30),this[_0x587ed1(0x668)](_0x54d525);},Sprite_Battler[_0x3f1f6b(0x457)]['setupDamagePopup']=function(){const _0x49a3fc=_0x3f1f6b;if(!this[_0x49a3fc(0x79b)]['isDamagePopupRequested']())return;while(this[_0x49a3fc(0x79b)][_0x49a3fc(0x5e4)]()){this[_0x49a3fc(0x79b)][_0x49a3fc(0x39c)]()&&this[_0x49a3fc(0x790)]();}this['_battler'][_0x49a3fc(0x568)](),this[_0x49a3fc(0x79b)][_0x49a3fc(0x1bd)]();},Sprite_Battler['prototype'][_0x3f1f6b(0x790)]=function(){const _0x59f28d=_0x3f1f6b,_0xbd141d=VisuMZ[_0x59f28d(0x32d)][_0x59f28d(0x3e9)][_0x59f28d(0x282)],_0x5db4d8=new Sprite_Damage();_0x5db4d8[_0x59f28d(0x366)]=_0xbd141d[_0x59f28d(0x21e)],this[_0x59f28d(0x361)](_0x5db4d8),_0x5db4d8[_0x59f28d(0x68f)](this[_0x59f28d(0x79b)]),_0x5db4d8['setupBattleCore'](this['_battler']),this[_0x59f28d(0x668)](_0x5db4d8);},Sprite_Battler['prototype']['addDamageSprite']=function(_0xf49b48){const _0x287bf0=_0x3f1f6b;this[_0x287bf0(0x544)]['push'](_0xf49b48);if(this['isShownOnBattlePortrait']())SceneManager['_scene'][_0x287bf0(0x29a)][_0x287bf0(0x668)](_0xf49b48,this[_0x287bf0(0x79b)]);else{this[_0x287bf0(0x2c3)]()[_0x287bf0(0x69a)](_0xf49b48);if(SceneManager[_0x287bf0(0x468)]())_0xf49b48[_0x287bf0(0x43f)]['x']=-0x1;}},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x145)]=function(){const _0x1be2da=_0x3f1f6b;return!$gameSystem[_0x1be2da(0x3b9)]()&&this[_0x1be2da(0x79b)]&&this[_0x1be2da(0x79b)]['isActor']();},Sprite_Battler[_0x3f1f6b(0x457)]['sortDamageSprites']=function(_0x12db4f){const _0x2eef43=_0x3f1f6b,_0x37b200=VisuMZ['BattleCore'][_0x2eef43(0x3e9)][_0x2eef43(0x282)],_0x228f9e=SceneManager[_0x2eef43(0x468)]()?-0x1:0x1;let _0x403783=this['x'],_0x4f6d03=this['y'];const _0x575988=SceneManager[_0x2eef43(0x5bb)]['_statusWindow'];if(_0x575988&&this[_0x2eef43(0xf2)]===_0x575988){_0x403783+=_0x575988['x']-this['damageOffsetX']();const _0xa731d8=_0x575988[_0x2eef43(0x556)]()*0x3/0x4;_0x4f6d03=_0x575988['y']+_0xa731d8,_0x4f6d03=Math[_0x2eef43(0x847)](_0x4f6d03,_0x575988['y']+this['y']-this[_0x2eef43(0x555)]+_0xa731d8);}_0x12db4f['x']=Math[_0x2eef43(0x5a7)](_0x403783+this[_0x2eef43(0x5cc)]()*_0x228f9e),_0x12db4f['y']=Math[_0x2eef43(0x5a7)](_0x4f6d03+this[_0x2eef43(0x49d)]());if(_0x37b200['NewPopupBottom'])for(const _0x34e257 of this[_0x2eef43(0x544)]){_0x34e257['x']+=_0x37b200[_0x2eef43(0x539)]*_0x228f9e,_0x34e257['y']+=_0x37b200['PopupShiftY'];}else{const _0x709316=this['_damages'][this[_0x2eef43(0x544)][_0x2eef43(0x135)]-0x1];_0x709316&&(_0x12db4f['x']=_0x709316['x']+_0x37b200[_0x2eef43(0x539)]*_0x228f9e,_0x12db4f['y']=_0x709316['y']+_0x37b200[_0x2eef43(0x29d)]);}},VisuMZ[_0x3f1f6b(0x32d)]['Sprite_Battler_damageOffsetX']=Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x5cc)],Sprite_Battler['prototype'][_0x3f1f6b(0x5cc)]=function(){const _0x48a453=_0x3f1f6b;let _0x88df58=VisuMZ[_0x48a453(0x32d)][_0x48a453(0xaf)][_0x48a453(0x131)](this),_0x381758=VisuMZ['BattleCore'][_0x48a453(0x3e9)]['Damage'][_0x48a453(0x72f)]||0x0;return Math[_0x48a453(0x5a7)](_0x88df58+_0x381758);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x72e)]=Sprite_Battler['prototype'][_0x3f1f6b(0x49d)],Sprite_Battler['prototype'][_0x3f1f6b(0x49d)]=function(){const _0x2e527e=_0x3f1f6b;let _0x1fc9b0=VisuMZ[_0x2e527e(0x32d)][_0x2e527e(0x72e)][_0x2e527e(0x131)](this);switch(VisuMZ[_0x2e527e(0x32d)][_0x2e527e(0x3e9)][_0x2e527e(0x282)][_0x2e527e(0x421)]){case'head':_0x1fc9b0-=this[_0x2e527e(0x555)]*this['scale']['y'];break;case'center':_0x1fc9b0-=this['height']*this[_0x2e527e(0x43f)]['y']*0.5;break;}let _0x32d67c=VisuMZ[_0x2e527e(0x32d)][_0x2e527e(0x3e9)][_0x2e527e(0x282)][_0x2e527e(0x66b)]||0x0;return Math[_0x2e527e(0x5a7)](_0x1fc9b0+_0x32d67c);},Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x5cc)]=function(){const _0x24d284=_0x3f1f6b;return Sprite_Battler[_0x24d284(0x457)][_0x24d284(0x5cc)][_0x24d284(0x131)](this);},Sprite_Actor[_0x3f1f6b(0x457)]['damageOffsetY']=function(){const _0x476332=_0x3f1f6b;return Sprite_Battler[_0x476332(0x457)][_0x476332(0x49d)]['call'](this);},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x3a1)]=function(_0x3079cb){const _0x84f9a3=_0x3f1f6b;this[_0x84f9a3(0x145)]()?SceneManager[_0x84f9a3(0x5bb)][_0x84f9a3(0x29a)][_0x84f9a3(0x5f4)](_0x3079cb):(this[_0x84f9a3(0x2c3)]()[_0x84f9a3(0x4b5)](_0x3079cb),this[_0x84f9a3(0x544)][_0x84f9a3(0x103)](_0x3079cb),_0x3079cb[_0x84f9a3(0x35b)]());},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x7f3)]=Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x2c1)],Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x2c1)]=function(_0xf4f4ba,_0x35ad6e){const _0x239acd=_0x3f1f6b,_0x261e65=VisuMZ[_0x239acd(0x32d)][_0x239acd(0x3e9)];if(this[_0x239acd(0x712)]===Sprite_Actor)_0xf4f4ba+=_0x261e65[_0x239acd(0xf3)][_0x239acd(0x1e0)]||0x0,_0x35ad6e+=_0x261e65[_0x239acd(0xf3)][_0x239acd(0x745)]||0x0;else this[_0x239acd(0x712)]===Sprite_Enemy&&(_0xf4f4ba+=_0x261e65['Enemy'][_0x239acd(0x1e0)]||0x0,_0x35ad6e+=_0x261e65[_0x239acd(0x5c6)][_0x239acd(0x745)]||0x0);VisuMZ[_0x239acd(0x32d)][_0x239acd(0x7f3)][_0x239acd(0x131)](this,_0xf4f4ba,_0x35ad6e);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x3ab)]=Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x5f1)],Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x5f1)]=function(){const _0x15ec70=_0x3f1f6b;VisuMZ[_0x15ec70(0x32d)][_0x15ec70(0x3ab)][_0x15ec70(0x131)](this),!this['_battler']&&this[_0x15ec70(0x22d)]&&(this[_0x15ec70(0x22d)][_0x15ec70(0xfc)]=![]);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x318)]=Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x7b9)],Sprite_Battler['prototype']['updateMain']=function(){const _0x2a4415=_0x3f1f6b;this[_0x2a4415(0x1f8)](),this['updateSkew'](),this[_0x2a4415(0x640)](),this[_0x2a4415(0x2cc)](),this[_0x2a4415(0x28d)](),VisuMZ['BattleCore']['Sprite_Battler_updateMain']['call'](this);if(this[_0x2a4415(0x712)]===Sprite_Enemy)this[_0x2a4415(0x829)]();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x517)]=Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x13f)],Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x13f)]=function(){const _0x4e0bfc=_0x3f1f6b;VisuMZ['BattleCore'][_0x4e0bfc(0x517)]['call'](this),this[_0x4e0bfc(0x808)](),this[_0x4e0bfc(0x6c1)]();},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x808)]=function(){const _0x22c4da=_0x3f1f6b;this[_0x22c4da(0x1d7)]=this['x'],this[_0x22c4da(0x47b)]=this['y'],this[_0x22c4da(0x62a)](),this['updateJump'](),this['x']+=this[_0x22c4da(0x2fa)](),this['y']+=this[_0x22c4da(0x162)](),this['x']=Math[_0x22c4da(0x5a7)](this['x']),this['y']=Math[_0x22c4da(0x5a7)](this['y']);},Sprite_Battler[_0x3f1f6b(0x457)]['extraPositionX']=function(){let _0x3875a9=0x0;return _0x3875a9;},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x162)]=function(){const _0x45c5b4=_0x3f1f6b;let _0x87efc1=0x0;this[_0x45c5b4(0x79b)]&&!this['_battler'][_0x45c5b4(0x34b)]()&&(_0x87efc1-=this[_0x45c5b4(0x507)],_0x87efc1-=this['_jumpHeight']);if(this[_0x45c5b4(0xc7)]&&this['constructor']!==Sprite_SvEnemy){const _0x7af2a1=this[_0x45c5b4(0xc7)][_0x45c5b4(0x43f)]['y'];_0x87efc1-=(_0x7af2a1-0x1)*this[_0x45c5b4(0x555)];}return _0x87efc1;},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x2cc)]=function(){const _0x300dc8=_0x3f1f6b,_0x5ce20f=this['_battler']&&this[_0x300dc8(0x79b)][_0x300dc8(0x3a2)]();this['_flipScaleX']=(_0x5ce20f?-0x1:0x1)*Math[_0x300dc8(0x3c0)](this[_0x300dc8(0x43f)]['x']);},Sprite_Battler[_0x3f1f6b(0x457)]['startFloat']=function(_0x36cead,_0x3ea6f4,_0x1cc452){const _0x2dbfd9=_0x3f1f6b;if(!this[_0x2dbfd9(0x7ec)]())return;if(this['_targetFloatHeight']===_0x36cead)return;this[_0x2dbfd9(0x336)]=_0x36cead,this[_0x2dbfd9(0x6e9)]=_0x3ea6f4,this[_0x2dbfd9(0x12d)]=_0x3ea6f4,this[_0x2dbfd9(0x58e)]=_0x1cc452||_0x2dbfd9(0x60f);if(_0x3ea6f4<=0x0)this[_0x2dbfd9(0x507)]=_0x36cead;},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x62a)]=function(){const _0x47e251=_0x3f1f6b;if(this[_0x47e251(0x6e9)]<=0x0)return;const _0x221fcf=this['_floatDuration'],_0x58bef3=this['_floatWholeDuration'],_0x235c1c=this[_0x47e251(0x58e)];Imported[_0x47e251(0x147)]?this[_0x47e251(0x507)]=this['applyEasing'](this[_0x47e251(0x507)],this[_0x47e251(0x336)],_0x221fcf,_0x58bef3,_0x235c1c):this[_0x47e251(0x507)]=(this[_0x47e251(0x507)]*(_0x221fcf-0x1)+this[_0x47e251(0x336)])/_0x221fcf;this['_floatDuration']--;if(this['_floatDuration']<=0x0)this[_0x47e251(0x2c8)]();},Sprite_Battler['prototype'][_0x3f1f6b(0x2c8)]=function(){const _0x23fbbb=_0x3f1f6b;this[_0x23fbbb(0x507)]=this[_0x23fbbb(0x336)];},Sprite_Battler['prototype'][_0x3f1f6b(0x3e4)]=function(){const _0x1327da=_0x3f1f6b;return this[_0x1327da(0x6e9)]>0x0;},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x532)]=function(_0xd2b8ee,_0x17f081){const _0x5e45e8=_0x3f1f6b;if(!this['canMove']())return;if(_0x17f081<=0x0)return;this[_0x5e45e8(0x495)]=_0xd2b8ee,this[_0x5e45e8(0x756)]=_0x17f081,this[_0x5e45e8(0x3b1)]=_0x17f081;},Sprite_Battler['prototype'][_0x3f1f6b(0x52c)]=function(){const _0x2b689c=_0x3f1f6b;if(this[_0x2b689c(0x756)]<=0x0)return;const _0x419cdb=this['_jumpWholeDuration']-this['_jumpDuration'],_0x15ffcb=this[_0x2b689c(0x3b1)]/0x2,_0x1c87b9=this['_jumpMaxHeight'],_0x742489=-_0x1c87b9/Math[_0x2b689c(0x359)](_0x15ffcb,0x2);this[_0x2b689c(0x1d9)]=_0x742489*Math['pow'](_0x419cdb-_0x15ffcb,0x2)+_0x1c87b9,this['_jumpDuration']--;if(this[_0x2b689c(0x756)]<=0x0)return this[_0x2b689c(0x330)]();},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x330)]=function(){const _0x55f7fa=_0x3f1f6b;this[_0x55f7fa(0x1d9)]=0x0;},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x269)]=function(){const _0x431c88=_0x3f1f6b;return this[_0x431c88(0x756)]>0x0;},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x707)]=function(_0x14feba,_0x660b5,_0x4fd634){const _0x24897b=_0x3f1f6b;if(this[_0x24897b(0x7a4)]===_0x14feba)return;this[_0x24897b(0x7a4)]=_0x14feba,this[_0x24897b(0x784)]=_0x660b5,this[_0x24897b(0x1ea)]=_0x660b5,this[_0x24897b(0x298)]=_0x4fd634||'Linear';if(_0x660b5<=0x0)this[_0x24897b(0x6de)]=_0x14feba;},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x6c1)]=function(){const _0x5e5180=_0x3f1f6b;if(this[_0x5e5180(0x784)]<=0x0)return;const _0x772cdb=this[_0x5e5180(0x784)],_0x2a7b56=this['_opacityWholeDuration'],_0x4ba41e=this['_opacityEasing'];Imported['VisuMZ_0_CoreEngine']?this[_0x5e5180(0x6de)]=this[_0x5e5180(0x52e)](this[_0x5e5180(0x6de)],this[_0x5e5180(0x7a4)],_0x772cdb,_0x2a7b56,_0x4ba41e):this[_0x5e5180(0x6de)]=(this[_0x5e5180(0x6de)]*(_0x772cdb-0x1)+this['_targetOpacity'])/_0x772cdb;this['_opacityDuration']--;if(this[_0x5e5180(0x784)]<=0x0)this[_0x5e5180(0x67d)]();},Sprite_Battler[_0x3f1f6b(0x457)]['onOpacityEnd']=function(){const _0x5ca071=_0x3f1f6b;this[_0x5ca071(0x6de)]=this['_targetOpacity'];},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x592)]=function(){const _0x2984c1=_0x3f1f6b;return this[_0x2984c1(0x784)]>0x0;},Sprite_Battler[_0x3f1f6b(0x457)]['updateShadow']=function(){const _0x33f5a8=_0x3f1f6b;this['_shadowSprite'][_0x33f5a8(0xfc)]=this['_battler'][_0x33f5a8(0x79f)](),this[_0x33f5a8(0x262)]();},Sprite_Battler['prototype']['updateShadowPosition']=function(){const _0x26cdc9=_0x3f1f6b;if(!this[_0x26cdc9(0x2d5)])return;this['_shadowSprite']['y']=Math[_0x26cdc9(0x5a7)](-this[_0x26cdc9(0x162)]()-0x2);},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x1f8)]=function(){const _0x3fe50d=_0x3f1f6b;if(this['constructor']===Sprite_SvEnemy)return;this['updateGrow'](),this[_0x3fe50d(0x43c)]();},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x43c)]=function(){const _0x2f5620=_0x3f1f6b,_0xe7b714=this[_0x2f5620(0xc7)];_0xe7b714&&(_0xe7b714[_0x2f5620(0x43f)]['x']=this['mainSpriteScaleX'](),_0xe7b714[_0x2f5620(0x43f)]['y']=this[_0x2f5620(0x36f)]());},Sprite_Battler[_0x3f1f6b(0x457)]['mainSpriteScaleX']=function(){const _0x36a1eb=_0x3f1f6b;let _0x3ef05f=0x1;return _0x3ef05f*=this[_0x36a1eb(0x39d)],_0x3ef05f*=this[_0x36a1eb(0x769)],_0x3ef05f;},Sprite_Battler['prototype'][_0x3f1f6b(0x36f)]=function(){const _0x3064a1=_0x3f1f6b;return 0x1*this[_0x3064a1(0x1a4)];},Sprite_Battler[_0x3f1f6b(0x457)]['mainSpriteWidth']=function(){const _0x5d2b42=_0x3f1f6b;return this[_0x5d2b42(0x364)]*this[_0x5d2b42(0x29c)]();},Sprite_Battler['prototype']['mainSpriteHeight']=function(){const _0x39c10e=_0x3f1f6b;return this[_0x39c10e(0x555)]*this[_0x39c10e(0x36f)]();},Sprite_Battler['prototype'][_0x3f1f6b(0x1fe)]=function(_0x5c6270,_0x460bb8,_0x3a21f0,_0x16163a){const _0x27bc11=_0x3f1f6b;if(!this[_0x27bc11(0x7ec)]())return;if(!this[_0x27bc11(0xc7)])return;if(this[_0x27bc11(0x5c7)]===_0x5c6270&&this['_targetGrowY']===_0x460bb8)return;this[_0x27bc11(0x5c7)]=_0x5c6270,this[_0x27bc11(0x488)]=_0x460bb8,this['_growDuration']=_0x3a21f0,this[_0x27bc11(0x165)]=_0x3a21f0,this[_0x27bc11(0x4ca)]=_0x16163a||'Linear',_0x3a21f0<=0x0&&(this[_0x27bc11(0x769)]=this['_targetGrowX'],this['_growY']=this[_0x27bc11(0x488)]);},Sprite_Battler['prototype']['updateGrow']=function(){const _0x109c2c=_0x3f1f6b;if(this[_0x109c2c(0x3fa)]<=0x0)return;if(!this[_0x109c2c(0xc7)])return;const _0x582fd8=this[_0x109c2c(0x3fa)],_0x31d983=this[_0x109c2c(0x165)],_0x13bf14=this[_0x109c2c(0x4ca)];Imported[_0x109c2c(0x147)]?(this[_0x109c2c(0x769)]=this[_0x109c2c(0x52e)](this['_growX'],this[_0x109c2c(0x5c7)],_0x582fd8,_0x31d983,_0x13bf14),this[_0x109c2c(0x1a4)]=this[_0x109c2c(0x52e)](this[_0x109c2c(0x1a4)],this[_0x109c2c(0x488)],_0x582fd8,_0x31d983,_0x13bf14)):(this[_0x109c2c(0x769)]=(this['_growX']*(_0x582fd8-0x1)+this[_0x109c2c(0x5c7)])/_0x582fd8,this['_growY']=(this['_growY']*(_0x582fd8-0x1)+this[_0x109c2c(0x488)])/_0x582fd8);this[_0x109c2c(0x3fa)]--;if(this[_0x109c2c(0x3fa)]<=0x0)this[_0x109c2c(0x343)]();},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x343)]=function(){const _0x5a8231=_0x3f1f6b;this[_0x5a8231(0x769)]=this['_targetGrowX'],this['_growY']=this[_0x5a8231(0x488)];},Sprite_Battler[_0x3f1f6b(0x457)]['isGrowing']=function(){return this['_growDuration']>0x0;},Sprite_Battler['prototype'][_0x3f1f6b(0x7e4)]=function(_0x46fa9b,_0x67f042,_0x49b477,_0x2e643f){const _0x2f8081=_0x3f1f6b;if(!this['canMove']())return;if(!this[_0x2f8081(0xc7)])return;if(this[_0x2f8081(0x4c7)]===_0x46fa9b&&this['_targetSkewY']===_0x67f042)return;this[_0x2f8081(0x4c7)]=_0x46fa9b,this['_targetSkewY']=_0x67f042,this['_skewDuration']=_0x49b477,this[_0x2f8081(0x3ba)]=_0x49b477,this['_skewEasing']=_0x2e643f||_0x2f8081(0x60f),_0x49b477<=0x0&&(this[_0x2f8081(0xc7)]['skew']['x']=this[_0x2f8081(0x4c7)],this['_distortionSprite']['skew']['y']=this['_targetSkewY']);},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x4f1)]=function(){const _0x1310fc=_0x3f1f6b;if(this[_0x1310fc(0x1a2)]<=0x0)return;if(!this[_0x1310fc(0xc7)])return;const _0x5e7e56=this[_0x1310fc(0x1a2)],_0x16fda6=this[_0x1310fc(0x3ba)],_0x2a8dca=this['_skewEasing'],_0xe18997=this['_distortionSprite'];Imported[_0x1310fc(0x147)]?(_0xe18997[_0x1310fc(0x53d)]['x']=this[_0x1310fc(0x52e)](_0xe18997[_0x1310fc(0x53d)]['x'],this[_0x1310fc(0x4c7)],_0x5e7e56,_0x16fda6,_0x2a8dca),_0xe18997[_0x1310fc(0x53d)]['y']=this[_0x1310fc(0x52e)](_0xe18997[_0x1310fc(0x53d)]['y'],this['_targetSkewY'],_0x5e7e56,_0x16fda6,_0x2a8dca)):(_0xe18997[_0x1310fc(0x53d)]['x']=(_0xe18997[_0x1310fc(0x53d)]['x']*(_0x5e7e56-0x1)+this[_0x1310fc(0x4c7)])/_0x5e7e56,_0xe18997[_0x1310fc(0x53d)]['y']=(_0xe18997['skew']['y']*(_0x5e7e56-0x1)+this['_targetSkewY'])/_0x5e7e56);this[_0x1310fc(0x1a2)]--;if(this[_0x1310fc(0x1a2)]<=0x0)this['onSkewEnd']();},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x64f)]=function(){const _0x559ec0=_0x3f1f6b;this[_0x559ec0(0xc7)]['skew']['x']=this[_0x559ec0(0x4c7)],this['_distortionSprite'][_0x559ec0(0x53d)]['y']=this['_targetSkewY'];},Sprite_Battler[_0x3f1f6b(0x457)]['isSkewing']=function(){const _0x3f2e9c=_0x3f1f6b;return this[_0x3f2e9c(0x1a2)]>0x0;},Sprite_Battler[_0x3f1f6b(0x457)]['startSpin']=function(_0x49cc4f,_0x3bf3b4,_0x328812,_0x5cd811){const _0x11e988=_0x3f1f6b;if(!this['canMove']())return;if(!this[_0x11e988(0xc7)])return;if(this[_0x11e988(0x82a)]===_0x49cc4f)return;this[_0x11e988(0x82a)]=_0x49cc4f,this[_0x11e988(0x623)]=_0x3bf3b4,this[_0x11e988(0xac)]=_0x3bf3b4,this['_angleEasing']=_0x328812||'Linear',this['_angleRevertOnFinish']=_0x5cd811,this[_0x11e988(0x64c)]===undefined&&(this[_0x11e988(0x64c)]=!![]),_0x3bf3b4<=0x0&&(this['_currentAngle']=_0x49cc4f,this[_0x11e988(0x64c)]&&(this['_targetAngle']=0x0,this[_0x11e988(0x277)]=0x0));},Sprite_Battler['prototype'][_0x3f1f6b(0x640)]=function(){const _0x19b048=_0x3f1f6b;this[_0x19b048(0x5ea)](),this[_0x19b048(0xec)]();},Sprite_Battler['prototype'][_0x3f1f6b(0x5ea)]=function(){const _0x3d17e8=_0x3f1f6b;if(this[_0x3d17e8(0x623)]<=0x0)return;const _0x662b43=this[_0x3d17e8(0x623)],_0x5835d5=this[_0x3d17e8(0xac)],_0x9786b8=this[_0x3d17e8(0x537)];Imported['VisuMZ_0_CoreEngine']?this[_0x3d17e8(0x277)]=this['applyEasing'](this[_0x3d17e8(0x277)],this['_targetAngle'],_0x662b43,_0x5835d5,_0x9786b8):this['_currentAngle']=(this[_0x3d17e8(0x277)]*(_0x662b43-0x1)+this['_targetAngle'])/_0x662b43;this[_0x3d17e8(0x623)]--;if(this[_0x3d17e8(0x623)]<=0x0)this['onAngleEnd']();},Sprite_Battler[_0x3f1f6b(0x457)]['onAngleEnd']=function(){const _0x56528d=_0x3f1f6b;this[_0x56528d(0x277)]=this[_0x56528d(0x82a)],this['_angleRevertOnFinish']&&(this[_0x56528d(0x82a)]=0x0,this[_0x56528d(0x277)]=0x0);},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x59b)]=function(){return this['_angleDuration']>0x0;},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0xec)]=function(){const _0x1fe298=_0x3f1f6b;if(!this[_0x1fe298(0xc7)])return;const _0x5aff3c=this[_0x1fe298(0x277)],_0x2bc097=this[_0x1fe298(0x43f)]['x'],_0x541ba6=this['_battler'][_0x1fe298(0x72a)]()?-0x1:0x1;this[_0x1fe298(0xc7)][_0x1fe298(0x2f9)]=_0x5aff3c*_0x2bc097*_0x541ba6;const _0x5d4656=this[_0x1fe298(0xc7)]['scale']['y'];this['_distortionSprite']['y']=this[_0x1fe298(0x555)]*-0.5*(0x2-_0x5d4656);const _0xaa759e=[this[_0x1fe298(0x3c9)],this[_0x1fe298(0x55f)],this[_0x1fe298(0x345)]];for(const _0x5ee25b of _0xaa759e){if(!_0x5ee25b)continue;_0x5ee25b['y']=this['height']*0.5;}this[_0x1fe298(0x2d5)]&&(this[_0x1fe298(0x2d5)][_0x1fe298(0x43f)]['x']=this['_distortionSprite']['scale']['x'],this['_shadowSprite'][_0x1fe298(0x43f)]['y']=this[_0x1fe298(0xc7)][_0x1fe298(0x43f)]['y']);},VisuMZ['BattleCore']['Sprite_Actor_createStateSprite']=Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x603)],Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x603)]=function(){const _0x50f06a=_0x3f1f6b;VisuMZ[_0x50f06a(0x32d)][_0x50f06a(0x3d7)]['call'](this),VisuMZ[_0x50f06a(0x32d)][_0x50f06a(0x3e9)][_0x50f06a(0x153)][_0x50f06a(0x6b5)]&&this[_0x50f06a(0x431)]();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x5b8)]=Sprite_Enemy['prototype'][_0x3f1f6b(0x548)],Sprite_Enemy[_0x3f1f6b(0x457)]['createStateIconSprite']=function(){const _0x35518=_0x3f1f6b;VisuMZ[_0x35518(0x32d)][_0x35518(0x3e9)][_0x35518(0x153)][_0x35518(0x152)]&&this['createHpGaugeSprite'](),VisuMZ[_0x35518(0x32d)][_0x35518(0x5b8)]['call'](this);},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x431)]=function(){const _0x2023ec=_0x3f1f6b;if(!ConfigManager[_0x2023ec(0x4a8)])return;if(this[_0x2023ec(0x712)]===Sprite_SvEnemy)return;const _0xcca789=VisuMZ[_0x2023ec(0x32d)][_0x2023ec(0x3e9)][_0x2023ec(0x153)],_0x52ebfa=new Sprite_HpGauge();_0x52ebfa[_0x2023ec(0x101)]['x']=_0xcca789['AnchorX'],_0x52ebfa[_0x2023ec(0x101)]['y']=_0xcca789[_0x2023ec(0x43e)],_0x52ebfa[_0x2023ec(0x43f)]['x']=_0x52ebfa[_0x2023ec(0x43f)]['y']=_0xcca789['Scale'],this[_0x2023ec(0x22d)]=_0x52ebfa,this['addChild'](this[_0x2023ec(0x22d)]);},VisuMZ['BattleCore'][_0x3f1f6b(0x620)]=Sprite_Battler[_0x3f1f6b(0x457)]['setBattler'],Sprite_Battler['prototype'][_0x3f1f6b(0x656)]=function(_0x41c217){const _0x3eb1a8=_0x3f1f6b;VisuMZ['BattleCore'][_0x3eb1a8(0x620)][_0x3eb1a8(0x131)](this,_0x41c217),this[_0x3eb1a8(0x525)](_0x41c217);},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x525)]=function(_0x5ce017){const _0x3a3e5a=_0x3f1f6b;if(!_0x5ce017)return;if(!this[_0x3a3e5a(0x22d)])return;if(_0x5ce017[_0x3a3e5a(0x72a)]()){}else{if(_0x5ce017['isEnemy']()){if(this['constructor']===Sprite_SvEnemy&&!_0x5ce017[_0x3a3e5a(0x79f)]())return;}}this[_0x3a3e5a(0x22d)]['setup'](_0x5ce017,'hp');},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x28d)]=function(){const _0x4fe4c2=_0x3f1f6b;if(!this[_0x4fe4c2(0x79b)])return;if(!this[_0x4fe4c2(0x22d)])return;const _0x5a090d=VisuMZ['BattleCore']['Settings'][_0x4fe4c2(0x153)],_0x5993d7=this['_hpGaugeSprite'];_0x5993d7[_0x4fe4c2(0xfc)]=this['isVisualHpGaugeDisplayed']();const _0x47bd15=_0x5a090d['OffsetX'],_0x4cded3=_0x5a090d[_0x4fe4c2(0x745)];_0x5993d7['x']=_0x47bd15,_0x5993d7['x']+=this[_0x4fe4c2(0x79b)][_0x4fe4c2(0x5d6)](),_0x5993d7['y']=-this[_0x4fe4c2(0x555)]+_0x4cded3,_0x5993d7['y']+=this[_0x4fe4c2(0x79b)][_0x4fe4c2(0x498)]();},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x699)]=function(){const _0x43346d=_0x3f1f6b;if(!this[_0x43346d(0x79b)])return![];if(this[_0x43346d(0x79b)][_0x43346d(0x72a)]())return!![];const _0x4da503=this[_0x43346d(0x79b)][_0x43346d(0x36c)]()[_0x43346d(0x4e8)];if(_0x4da503[_0x43346d(0x7c7)](/<SHOW HP GAUGE>/i))return!![];if(_0x4da503[_0x43346d(0x7c7)](/<HIDE HP GAUGE>/i))return![];const _0xf5de61=VisuMZ[_0x43346d(0x32d)]['Settings']['HpGauge'];if(_0xf5de61[_0x43346d(0x36d)]){if(_0xf5de61[_0x43346d(0x2f6)]&&BattleManager[_0x43346d(0x735)]())return!![];if(this[_0x43346d(0x79b)][_0x43346d(0x777)])return![];return this[_0x43346d(0x79b)][_0x43346d(0x609)]();}return!![];},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x7d4)]=Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x4d1)],Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x4d1)]=function(){const _0x484604=_0x3f1f6b;if(!this['_battler'])return![];return VisuMZ[_0x484604(0x32d)]['Sprite_Battler_isMoving'][_0x484604(0x131)](this);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x795)]=Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x2c5)],Sprite_Battler[_0x3f1f6b(0x457)]['startMove']=function(_0x1904ac,_0x4126bc,_0x20c730){const _0x118636=_0x3f1f6b;this[_0x118636(0x7ec)]()&&VisuMZ[_0x118636(0x32d)][_0x118636(0x795)][_0x118636(0x131)](this,_0x1904ac,_0x4126bc,_0x20c730);},Sprite_Battler[_0x3f1f6b(0x457)]['canMove']=function(){const _0x3ef6e5=_0x3f1f6b;if(this['_battler']&&this[_0x3ef6e5(0x79b)][_0x3ef6e5(0x641)]())return![];if(this[_0x3ef6e5(0x79b)]&&!this['_battler'][_0x3ef6e5(0x4ee)]())return![];return $gameSystem[_0x3ef6e5(0x3b9)]();},Sprite_Battler[_0x3f1f6b(0x457)]['stepForward']=function(){},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x324)]=function(){const _0x1d5515=_0x3f1f6b;this[_0x1d5515(0x2c5)](0x0,0x0,0xc);},Sprite_Battler[_0x3f1f6b(0x457)][_0x3f1f6b(0x59a)]=function(){},Sprite_Battler['prototype']['stepFlinch']=function(){const _0x41d04e=_0x3f1f6b,_0xc3ed7a=VisuMZ[_0x41d04e(0x32d)][_0x41d04e(0x3e9)][_0x41d04e(0xf3)],_0xbabfa7=this[_0x41d04e(0x79b)]&&this[_0x41d04e(0x79b)][_0x41d04e(0x72a)]()?0x1:-0x1,_0x510f15=this[_0x41d04e(0x1d7)]-this['_homeX']+_0xbabfa7*_0xc3ed7a['FlinchDistanceX'],_0x5eca98=this['_baseY']-this[_0x41d04e(0x733)]+_0xbabfa7*_0xc3ed7a['FlinchDistanceY'],_0x53f68c=_0xc3ed7a[_0x41d04e(0x32f)];this['startMove'](_0x510f15,_0x5eca98,_0x53f68c);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x520)]=Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x5b4)],Sprite_Actor['prototype'][_0x3f1f6b(0x5b4)]=function(){const _0x535a1f=_0x3f1f6b;VisuMZ[_0x535a1f(0x32d)]['Sprite_Actor_initMembers'][_0x535a1f(0x131)](this),this['attachSpritesToDistortionSprite']();},Sprite_Actor[_0x3f1f6b(0x457)]['mainSprite']=function(){const _0x3e9452=_0x3f1f6b;return this[_0x3e9452(0xc7)]||this['_mainSprite']||this;},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x30f)]=Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x1b6)],Sprite_Actor[_0x3f1f6b(0x457)]['moveToStartPosition']=function(){},Sprite_Actor[_0x3f1f6b(0x457)]['moveToStartPositionBattleCore']=function(_0x5f5148){const _0x4891b2=_0x3f1f6b;if(SceneManager['isPreviousSceneBattleTransitionable']())return;if(!_0x5f5148)return;if(!_0x5f5148['canMove']())return;VisuMZ[_0x4891b2(0x32d)]['Sprite_Actor_moveToStartPosition'][_0x4891b2(0x131)](this);},VisuMZ['BattleCore'][_0x3f1f6b(0x211)]=Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x3db)],Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x3db)]=function(_0x2b6aac){const _0x5909b3=_0x3f1f6b;VisuMZ[_0x5909b3(0x32d)][_0x5909b3(0x3e9)][_0x5909b3(0xf3)][_0x5909b3(0xbb)]?VisuMZ[_0x5909b3(0x32d)][_0x5909b3(0x3e9)][_0x5909b3(0xf3)][_0x5909b3(0xbb)]['call'](this,_0x2b6aac):VisuMZ[_0x5909b3(0x32d)][_0x5909b3(0x211)][_0x5909b3(0x131)](this,_0x2b6aac);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x6b3)]=Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x656)],Sprite_Actor['prototype']['setBattler']=function(_0x49d375){const _0x41fbaa=_0x3f1f6b;VisuMZ['BattleCore'][_0x41fbaa(0x6b3)]['call'](this,_0x49d375),this[_0x41fbaa(0x625)](_0x49d375);},Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x625)]=function(_0x1b32c6){const _0x2557ec=_0x3f1f6b;if(!_0x1b32c6)return;if(!this[_0x2557ec(0x3c9)])return;this[_0x2557ec(0x3c9)][_0x2557ec(0x101)]['x']=this['_actor'][_0x2557ec(0x49f)](),this['_mainSprite'][_0x2557ec(0x101)]['y']=this[_0x2557ec(0x4ac)]['svBattlerAnchorY'](),this['updateShadowVisibility']();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x6a3)]=Sprite_Actor['prototype'][_0x3f1f6b(0x5f1)],Sprite_Actor['prototype'][_0x3f1f6b(0x5f1)]=function(){const _0x570cd8=_0x3f1f6b;VisuMZ[_0x570cd8(0x32d)]['Sprite_Actor_update']['call'](this),this[_0x570cd8(0x4ac)]&&(this[_0x570cd8(0xee)](),this[_0x570cd8(0x680)]());},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x610)]=Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x3f1)],Sprite_Actor['prototype'][_0x3f1f6b(0x3f1)]=function(){const _0x5e3680=_0x3f1f6b;VisuMZ[_0x5e3680(0x32d)][_0x5e3680(0x610)][_0x5e3680(0x131)](this),this[_0x5e3680(0x3c9)]&&this[_0x5e3680(0x3c9)][_0x5e3680(0x4b4)]&&this[_0x5e3680(0x79b)]&&(this[_0x5e3680(0x3c9)][_0x5e3680(0x4b4)][_0x5e3680(0x28c)]!==this[_0x5e3680(0x79b)][_0x5e3680(0x7a6)]()&&(this[_0x5e3680(0x3c9)][_0x5e3680(0x4b4)]['smooth']=this[_0x5e3680(0x79b)][_0x5e3680(0x7a6)]()));},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x263)]=Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x829)],Sprite_Actor['prototype'][_0x3f1f6b(0x829)]=function(){const _0x41fab0=_0x3f1f6b;VisuMZ[_0x41fab0(0x32d)]['Sprite_Actor_updateShadow'][_0x41fab0(0x131)](this),this[_0x41fab0(0x7ef)]();},Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x7ef)]=function(){const _0x3b8a54=_0x3f1f6b;if(!this[_0x3b8a54(0x3c9)])return;if(!this[_0x3b8a54(0x2d5)])return;this['updateShadowVisibility'](),this['updateShadowPosition']();},Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0xee)]=function(){const _0x2fb768=_0x3f1f6b;this[_0x2fb768(0x67e)][_0x2fb768(0x43f)]['x']=0x1/(this[_0x2fb768(0x43f)]['x']||0.001),this[_0x2fb768(0x67e)]['scale']['y']=0x1/(this[_0x2fb768(0x43f)]['y']||0.001);},Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x680)]=function(){const _0xde1237=_0x3f1f6b;if(!$gameSystem['isSideView']()&&this[_0xde1237(0x712)]===Sprite_Actor){const _0x1c1a4b=Scene_Battle[_0xde1237(0x457)][_0xde1237(0x6f3)]();[_0xde1237(0x6f0),_0xde1237(0x5f8),_0xde1237(0x35f),_0xde1237(0x77b)][_0xde1237(0x354)](_0x1c1a4b)&&(this[_0xde1237(0x6de)]=0x0);}},Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x636)]=function(){const _0x690484=_0x3f1f6b,_0x5eedbe=this['_actor'];if(_0x5eedbe){const _0x34762a=_0x5eedbe[_0x690484(0x68b)]();if(_0x5eedbe[_0x690484(0x292)]()||_0x5eedbe[_0x690484(0x193)]())this[_0x690484(0x1af)](_0x690484(0x464));else{if(_0x34762a===0x3)this[_0x690484(0x1af)]('dead');else{if(_0x34762a===0x2)this[_0x690484(0x1af)](_0x690484(0x47d));else{if(this[_0x690484(0x5a3)])this['startMotion'](_0x690484(0x19d));else{if(_0x5eedbe['isCharging']())this[_0x690484(0x1af)](_0x690484(0x18c));else{if(_0x5eedbe['isChanting']())this[_0x690484(0x1af)](_0x690484(0x608));else{if(_0x5eedbe[_0x690484(0x1ee)]()||_0x5eedbe[_0x690484(0x257)]())this['startMotion']('guard');else{if(_0x34762a===0x1)this[_0x690484(0x1af)](_0x690484(0x1d4));else{if(_0x5eedbe[_0x690484(0x4a7)]())this[_0x690484(0x1af)](_0x690484(0x391));else{if(_0x5eedbe[_0x690484(0x233)]())this['startMotion'](_0x690484(0x464));else _0x5eedbe[_0x690484(0x25a)]()?this['startMotion'](_0x690484(0x18c)):this[_0x690484(0x1af)](_0x690484(0x464));}}}}}}}}}}},Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x59a)]=function(){const _0x4cde91=0xa,_0x278a80=0x12c*_0x4cde91,_0x4fa514=0x1e*_0x4cde91;this['startMove'](_0x278a80,0x0,_0x4fa514);},Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x68d)]=function(){const _0x3979d9=_0x3f1f6b;Sprite_Battler[_0x3979d9(0x457)][_0x3979d9(0x68d)]['call'](this);},Sprite_Actor[_0x3f1f6b(0x457)]['motionSpeed']=function(){const _0x33b248=_0x3f1f6b;return Sprite_Battler[_0x33b248(0x29e)];},Sprite_Weapon[_0x3f1f6b(0x457)][_0x3f1f6b(0x6ba)]=function(){const _0x4f33bd=_0x3f1f6b;return Sprite_Battler[_0x4f33bd(0x29e)];},Sprite_Actor[_0x3f1f6b(0x457)]['setupMotion']=function(){},Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x458)]=function(){},Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x37e)]=function(){const _0x42e8af=_0x3f1f6b;if(this[_0x42e8af(0x4ed)]&&++this[_0x42e8af(0x374)]>=this[_0x42e8af(0x477)]()){if(this[_0x42e8af(0x4ed)]['loop'])this[_0x42e8af(0x6a6)]=(this[_0x42e8af(0x6a6)]+0x1)%0x4;else this['_pattern']<0x2?this[_0x42e8af(0x6a6)]++:this[_0x42e8af(0x636)]();this[_0x42e8af(0x374)]=0x0;}},Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x73c)]=function(_0x5f10fb){const _0x505e8b=_0x3f1f6b;if(_0x5f10fb===_0x505e8b(0xc3))this['_checkOn']=!![];if(this[_0x505e8b(0x79b)]&&this[_0x505e8b(0x79b)][_0x505e8b(0x641)]()){this['_motion']=Sprite_Actor['MOTIONS']['dead'];return;}const _0x14b1a5=Sprite_Actor[_0x505e8b(0x175)][_0x5f10fb];this['_motion']=_0x14b1a5,this[_0x505e8b(0x374)]=0x0,this[_0x505e8b(0x6a6)]=0x0;},Sprite_Actor[_0x3f1f6b(0x457)]['forceWeaponAnimation']=function(_0x45e001){const _0x54340c=_0x3f1f6b;this['adjustWeaponSpriteOffset'](),this[_0x54340c(0x43a)][_0x54340c(0x68f)](_0x45e001),this[_0x54340c(0x4ac)][_0x54340c(0x3b8)]();},Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x7bc)]=function(){const _0x432932=_0x3f1f6b;let _0x39b8e9=-0x10,_0x5f5502=this['height']*0.5;const _0x2279d8=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0xb5173b=this[_0x432932(0x79b)][_0x432932(0x66e)]()[_0x432932(0x255)](_0x1aec72=>_0x1aec72&&_0x1aec72[_0x432932(0x4e8)]['match'](_0x2279d8)?Number(RegExp['$1']):0x0),_0x6b72eb=this[_0x432932(0x79b)][_0x432932(0x66e)]()[_0x432932(0x255)](_0x5e4b9f=>_0x5e4b9f&&_0x5e4b9f[_0x432932(0x4e8)]['match'](_0x2279d8)?Number(RegExp['$2']):0x0);_0x39b8e9=_0xb5173b[_0x432932(0x460)]((_0x1d0e1b,_0x402473)=>_0x1d0e1b+_0x402473,_0x39b8e9),_0x5f5502=_0x6b72eb['reduce']((_0xd5cb44,_0x392205)=>_0xd5cb44+_0x392205,_0x5f5502),this[_0x432932(0x43a)]['x']=_0x39b8e9,this[_0x432932(0x43a)]['y']=_0x5f5502,this[_0x432932(0x43a)][_0x432932(0x5f1)]();},Sprite_Weapon['prototype'][_0x3f1f6b(0x68f)]=function(_0xea368){const _0x125e71=_0x3f1f6b;this[_0x125e71(0x241)]=_0xea368,this[_0x125e71(0x51b)]=-0x1,this['_pattern']=0x0,this[_0x125e71(0x41b)](),this[_0x125e71(0x79d)]();},Sprite_Actor[_0x3f1f6b(0x457)]['updateTargetPosition']=function(){},Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x4b6)]=function(){const _0x9e7477=_0x3f1f6b,_0x1ee6ee=VisuMZ[_0x9e7477(0x32d)][_0x9e7477(0x3e9)]['ActionSequence'],_0x2da49d=_0x1ee6ee[_0x9e7477(0x4cd)],_0x1f2a98=_0x1ee6ee[_0x9e7477(0x335)],_0x489e97=_0x1ee6ee[_0x9e7477(0x404)];this[_0x9e7477(0x2c5)](-_0x2da49d,-_0x1f2a98,_0x489e97);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x527)]=Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x79d)],Sprite_Actor[_0x3f1f6b(0x457)]['updateFrame']=function(){const _0x5163dd=_0x3f1f6b;this['applyFreezeMotionFrames'](),VisuMZ[_0x5163dd(0x32d)][_0x5163dd(0x527)]['call'](this);},Sprite_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x191)]=function(){const _0x24950f=_0x3f1f6b;if(this[_0x24950f(0x79b)]&&this['_battler']['_freezeMotionData']){const _0xee96cb=this['_battler'][_0x24950f(0x280)];this[_0x24950f(0x4ed)]=Sprite_Actor[_0x24950f(0x175)][_0xee96cb[_0x24950f(0x804)]],this[_0x24950f(0x6a6)]=_0xee96cb[_0x24950f(0x18b)];const _0x5164c5=this[_0x24950f(0x43a)];_0x5164c5[_0x24950f(0x6bb)](_0xee96cb[_0x24950f(0x585)],_0xee96cb[_0x24950f(0x18b)]),this[_0x24950f(0x7bc)]();}},Sprite_Weapon[_0x3f1f6b(0x457)][_0x3f1f6b(0x6bb)]=function(_0x1cf192,_0x23ae0f){const _0x3bcad0=_0x3f1f6b;this[_0x3bcad0(0x241)]=_0x1cf192,this[_0x3bcad0(0x51b)]=-Infinity,this[_0x3bcad0(0x6a6)]=_0x23ae0f,this[_0x3bcad0(0x41b)](),this[_0x3bcad0(0x79d)]();},Sprite_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x5b4)]=function(){const _0x46b7dd=_0x3f1f6b;Sprite_Battler[_0x46b7dd(0x457)][_0x46b7dd(0x5b4)][_0x46b7dd(0x131)](this),this[_0x46b7dd(0x1d1)]=null,this[_0x46b7dd(0x6db)]=![],this[_0x46b7dd(0x7ae)]='',this[_0x46b7dd(0x2ba)]=0x0,this[_0x46b7dd(0x119)]=null,this[_0x46b7dd(0x76d)]=0x0,this[_0x46b7dd(0x373)]=0x0,this[_0x46b7dd(0x755)](),this[_0x46b7dd(0x548)]();},VisuMZ[_0x3f1f6b(0x32d)]['Sprite_Enemy_update']=Sprite_Enemy[_0x3f1f6b(0x457)]['update'],Sprite_Enemy[_0x3f1f6b(0x457)]['update']=function(){const _0x1e9b52=_0x3f1f6b;VisuMZ['BattleCore'][_0x1e9b52(0x334)][_0x1e9b52(0x131)](this),this[_0x1e9b52(0x239)]();},Sprite_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x755)]=function(){const _0x529ca2=_0x3f1f6b;this[_0x529ca2(0x3c9)]=new Sprite(),this[_0x529ca2(0x3c9)]['anchor']['x']=0.5,this[_0x529ca2(0x3c9)]['anchor']['y']=0x1,this[_0x529ca2(0x69a)](this[_0x529ca2(0x3c9)]),this['attachSpritesToDistortionSprite']();},Sprite_Enemy['prototype'][_0x3f1f6b(0x230)]=function(){return this['_distortionSprite']||this['_mainSprite']||this;},Sprite_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x41b)]=function(_0x5b2e27){const _0x5da612=_0x3f1f6b;this[_0x5da612(0x4b4)]=new Bitmap(0x1,0x1),$gameSystem[_0x5da612(0x3b9)]()?this[_0x5da612(0x3c9)][_0x5da612(0x4b4)]=ImageManager[_0x5da612(0x57d)](_0x5b2e27):this[_0x5da612(0x3c9)]['bitmap']=ImageManager[_0x5da612(0x388)](_0x5b2e27),this[_0x5da612(0x3c9)][_0x5da612(0x4b4)]['addLoadListener'](this[_0x5da612(0x5c5)][_0x5da612(0x22f)](this));},Sprite_Enemy[_0x3f1f6b(0x457)]['createEmptyBitmap']=function(){const _0x38565d=_0x3f1f6b,_0x424675=this[_0x38565d(0x3c9)][_0x38565d(0x4b4)];_0x424675&&(this[_0x38565d(0x4b4)]=new Bitmap(_0x424675['width'],_0x424675['height']));},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x3ff)]=Sprite_Enemy['prototype'][_0x3f1f6b(0x700)],Sprite_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x700)]=function(_0x147216){const _0x1e084d=_0x3f1f6b;this[_0x1e084d(0x3c9)]&&this[_0x1e084d(0x3c9)][_0x1e084d(0x700)](_0x147216);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x552)]=Sprite_Enemy[_0x3f1f6b(0x457)]['initVisibility'],Sprite_Enemy[_0x3f1f6b(0x457)]['initVisibility']=function(){const _0x1d8bdd=_0x3f1f6b;this[_0x1d8bdd(0x665)]()?VisuMZ[_0x1d8bdd(0x32d)]['Sprite_Enemy_initVisibility'][_0x1d8bdd(0x131)](this):(this[_0x1d8bdd(0x6db)]=!this['_enemy'][_0x1d8bdd(0x44c)](),!this[_0x1d8bdd(0x6db)]&&(this[_0x1d8bdd(0x6de)]=0x0));},VisuMZ['BattleCore'][_0x3f1f6b(0x490)]=Sprite_Enemy['prototype']['updateCollapse'],Sprite_Enemy['prototype'][_0x3f1f6b(0x279)]=function(){const _0x1b709a=_0x3f1f6b;if(this['allowCollapse']())VisuMZ[_0x1b709a(0x32d)][_0x1b709a(0x490)][_0x1b709a(0x131)](this);},Sprite_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x79d)]=function(){const _0x3039d7=_0x3f1f6b;Sprite_Battler['prototype']['updateFrame'][_0x3039d7(0x131)](this);const _0x26ad1b=this[_0x3039d7(0x230)]()||this;if(!_0x26ad1b)return;!_0x26ad1b[_0x3039d7(0x4b4)]&&(_0x26ad1b[_0x3039d7(0x4b4)]=new Bitmap(this[_0x3039d7(0x364)],this[_0x3039d7(0x555)])),this[_0x3039d7(0x119)]===_0x3039d7(0x632)?this[_0x3039d7(0x3c9)]['setFrame'](0x0,0x0,this[_0x3039d7(0x3c9)][_0x3039d7(0x364)],this[_0x3039d7(0x76d)]):_0x26ad1b['setFrame'](0x0,0x0,_0x26ad1b[_0x3039d7(0x4b4)][_0x3039d7(0x364)],this[_0x3039d7(0x4b4)][_0x3039d7(0x555)]);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x289)]=Sprite_Enemy[_0x3f1f6b(0x457)]['updateBossCollapse'],Sprite_Enemy[_0x3f1f6b(0x457)]['updateBossCollapse']=function(){const _0x1be0ca=_0x3f1f6b;if(this[_0x1be0ca(0x665)]())VisuMZ[_0x1be0ca(0x32d)][_0x1be0ca(0x289)][_0x1be0ca(0x131)](this);},Sprite_Enemy[_0x3f1f6b(0x457)]['isMoving']=function(){const _0x565683=_0x3f1f6b;return Sprite_Battler[_0x565683(0x457)][_0x565683(0x4d1)]['call'](this);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x634)]=Sprite_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0xee)],Sprite_Enemy['prototype']['updateStateSprite']=function(){const _0x232770=_0x3f1f6b;VisuMZ[_0x232770(0x32d)][_0x232770(0x634)][_0x232770(0x131)](this),this[_0x232770(0x500)]();},Sprite_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x500)]=function(){const _0x5a5728=_0x3f1f6b;this['_stateIconSprite']['x']=0x0,this[_0x5a5728(0x854)]['x']+=this[_0x5a5728(0x79b)][_0x5a5728(0x5d6)](),this[_0x5a5728(0x854)]['y']=-this[_0x5a5728(0x4b4)][_0x5a5728(0x555)]-this[_0x5a5728(0x854)][_0x5a5728(0x555)],this[_0x5a5728(0x854)]['y']+=this['_battler'][_0x5a5728(0x498)](),this['_stateIconSprite']['scale']['x']=0x1/(this[_0x5a5728(0x43f)]['x']||0.001),this['_stateIconSprite'][_0x5a5728(0x43f)]['y']=0x1/(this[_0x5a5728(0x43f)]['y']||0.001),this['hasSvBattler']()&&(this['_svBattlerSprite'][_0x5a5728(0x67e)]['scale']['x']=-0x1/(this['scale']['x']||0.001),this[_0x5a5728(0x55f)][_0x5a5728(0x67e)]['scale']['y']=0x1/(this[_0x5a5728(0x43f)]['y']||0.001));},VisuMZ['BattleCore'][_0x3f1f6b(0x809)]=Sprite_Enemy['prototype'][_0x3f1f6b(0x656)],Sprite_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x656)]=function(_0x2a0f0b){const _0x2c4a8f=_0x3f1f6b;VisuMZ['BattleCore'][_0x2c4a8f(0x809)][_0x2c4a8f(0x131)](this,_0x2a0f0b),this['setSvBattlerSprite'](_0x2a0f0b);},Sprite_Enemy[_0x3f1f6b(0x457)]['setSvBattlerSprite']=function(_0x5c955b){const _0x14d968=_0x3f1f6b;!this[_0x14d968(0x55f)]&&(this[_0x14d968(0x55f)]=new Sprite_SvEnemy(_0x5c955b),this['attachSpritesToDistortionSprite']()),this['_svBattlerSprite'][_0x14d968(0x656)](_0x5c955b);},Sprite_Enemy['prototype'][_0x3f1f6b(0x79f)]=function(){const _0x3d9868=_0x3f1f6b;return this[_0x3d9868(0x1d1)]&&this['_enemy']['hasSvBattler']();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x188)]=Sprite_Enemy['prototype']['loadBitmap'],Sprite_Enemy['prototype']['loadBitmap']=function(_0x428adb){const _0x3dabd3=_0x3f1f6b;if(this[_0x3dabd3(0x79f)]()){const _0x42d369=this[_0x3dabd3(0x1d1)][_0x3dabd3(0x5ac)]();this[_0x3dabd3(0x4b4)]=new Bitmap(_0x42d369['width'],_0x42d369[_0x3dabd3(0x555)]);}else VisuMZ[_0x3dabd3(0x32d)]['Sprite_Enemy_loadBitmap'][_0x3dabd3(0x131)](this,_0x428adb);},Sprite_Enemy['prototype'][_0x3f1f6b(0x665)]=function(){const _0x5a86a7=_0x3f1f6b;return this[_0x5a86a7(0x79f)]()?this[_0x5a86a7(0x1d1)][_0x5a86a7(0x665)]():!![];},Sprite_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x636)]=function(){const _0x3eff1e=_0x3f1f6b;this[_0x3eff1e(0x79f)]()&&this[_0x3eff1e(0x55f)][_0x3eff1e(0x636)]();},Sprite_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x73c)]=function(_0x98d944){const _0x517359=_0x3f1f6b;if(this[_0x517359(0x79f)]())this[_0x517359(0x55f)][_0x517359(0x73c)](_0x98d944);},Sprite_Enemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x51c)]=function(_0x56121f){const _0x2c1c59=_0x3f1f6b;if(this[_0x2c1c59(0x79f)]())this[_0x2c1c59(0x55f)][_0x2c1c59(0x51c)](_0x56121f);},Sprite_Enemy['prototype']['stepForward']=function(){const _0x216bd6=_0x3f1f6b,_0x587c5e=VisuMZ['BattleCore']['Settings']['ActionSequence'],_0x1f9c5c=_0x587c5e[_0x216bd6(0x4cd)],_0x5a1e07=_0x587c5e[_0x216bd6(0x335)],_0x253853=_0x587c5e[_0x216bd6(0x404)];this[_0x216bd6(0x2c5)](_0x1f9c5c,_0x5a1e07,_0x253853);};function Sprite_SvEnemy(){const _0x12bf43=_0x3f1f6b;this[_0x12bf43(0x138)](...arguments);}Sprite_SvEnemy[_0x3f1f6b(0x457)]=Object[_0x3f1f6b(0x325)](Sprite_Actor[_0x3f1f6b(0x457)]),Sprite_SvEnemy[_0x3f1f6b(0x457)]['constructor']=Sprite_SvEnemy,Sprite_SvEnemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x138)]=function(_0x2d0e60){const _0x569b2f=_0x3f1f6b;Sprite_Actor['prototype'][_0x569b2f(0x138)][_0x569b2f(0x131)](this,_0x2d0e60),this[_0x569b2f(0x43f)]['x']=-0x1,this['_stateSprite'][_0x569b2f(0x43f)]['x']=-0x1;},Sprite_SvEnemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x7a2)]=function(){},Sprite_SvEnemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x1b6)]=function(){},Sprite_SvEnemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x3db)]=function(_0x5c51aa){},Sprite_SvEnemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x829)]=function(){},Sprite_SvEnemy['prototype'][_0x3f1f6b(0x262)]=function(){},Sprite_SvEnemy['prototype'][_0x3f1f6b(0xee)]=function(){const _0x4a1d5b=_0x3f1f6b;this['_stateSprite'][_0x4a1d5b(0xfc)]=![];},Sprite_SvEnemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x3f1)]=function(){const _0xde9f48=_0x3f1f6b;Sprite_Battler[_0xde9f48(0x457)][_0xde9f48(0x3f1)][_0xde9f48(0x131)](this);const _0x31143d=this[_0xde9f48(0x4ac)][_0xde9f48(0x584)]();this[_0xde9f48(0x7ae)]!==_0x31143d&&(this[_0xde9f48(0x7ae)]=_0x31143d,this[_0xde9f48(0x3c9)][_0xde9f48(0x4b4)]=ImageManager[_0xde9f48(0x724)](_0x31143d)),this['_mainSprite']&&this['_mainSprite']['bitmap']&&this[_0xde9f48(0x79b)]&&(this[_0xde9f48(0x3c9)]['bitmap'][_0xde9f48(0x28c)]!==this['_battler'][_0xde9f48(0x7a6)]()&&(this[_0xde9f48(0x3c9)][_0xde9f48(0x4b4)]['smooth']=this['_battler'][_0xde9f48(0x7a6)]()));},Sprite_SvEnemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x59a)]=function(){},Sprite_SvEnemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x2c5)]=function(_0x103cef,_0x144e20,_0x4c2f39){const _0x508d67=_0x3f1f6b;if(this['parent'])this[_0x508d67(0xf2)][_0x508d67(0x2c5)](_0x103cef,_0x144e20,_0x4c2f39);},Sprite_SvEnemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x636)]=function(){const _0x449a82=_0x3f1f6b,_0x715cd5=this[_0x449a82(0x4ac)];if(_0x715cd5){const _0x10bf05=_0x715cd5[_0x449a82(0x68b)]();if(_0x715cd5[_0x449a82(0x292)]()||_0x715cd5['isActing']())this[_0x449a82(0x1af)](_0x449a82(0x464));else{if(_0x10bf05===0x3)this[_0x449a82(0x1af)]('dead');else{if(_0x10bf05===0x2)this['startMotion']('sleep');else{if(_0x715cd5[_0x449a82(0x459)]())this[_0x449a82(0x1af)](_0x449a82(0x608));else{if(_0x715cd5[_0x449a82(0x1ee)]()||_0x715cd5[_0x449a82(0x257)]())this[_0x449a82(0x1af)](_0x449a82(0x6a4));else{if(_0x10bf05===0x1)this[_0x449a82(0x1af)](_0x449a82(0x1d4));else{if(_0x715cd5[_0x449a82(0x4a7)]())this[_0x449a82(0x1af)](_0x449a82(0x391));else _0x715cd5[_0x449a82(0x233)]()?this[_0x449a82(0x1af)](_0x449a82(0x464)):this[_0x449a82(0x1af)](_0x715cd5['svBattlerData']()[_0x449a82(0x796)]||_0x449a82(0x464));}}}}}}}},Sprite_SvEnemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x392)]=function(){const _0x2001d6=_0x3f1f6b;return this[_0x2001d6(0xf2)]?this['parent'][_0x2001d6(0x402)]===0x0&&this[_0x2001d6(0xf2)][_0x2001d6(0x6dc)]===0x0:!![];},Sprite_SvEnemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x2cc)]=function(){},Sprite_Damage['prototype'][_0x3f1f6b(0x50a)]=function(_0x2e4e28){const _0x471df4=_0x3f1f6b,_0x600cde=_0x2e4e28[_0x471df4(0x496)]()||_0x2e4e28[_0x471df4(0x356)]();if(_0x600cde[_0x471df4(0x514)]||_0x600cde[_0x471df4(0x2b6)])this[_0x471df4(0x4db)]=0x0,this[_0x471df4(0x5dc)]();else{if(_0x600cde[_0x471df4(0x61b)])this[_0x471df4(0x4db)]=_0x600cde['hpDamage']>=0x0?0x0:0x1,this[_0x471df4(0x810)](_0x600cde[_0x471df4(0x195)]);else _0x2e4e28['isAlive']()&&_0x600cde[_0x471df4(0x4d6)]!==0x0&&(this['_colorType']=_0x600cde[_0x471df4(0x4d6)]>=0x0?0x2:0x3,this['createDigits'](_0x600cde[_0x471df4(0x4d6)]));}_0x600cde[_0x471df4(0x72b)]&&this[_0x471df4(0x481)]();},Sprite_Damage[_0x3f1f6b(0x457)][_0x3f1f6b(0x68f)]=function(_0x24cc1d){},Sprite_Damage[_0x3f1f6b(0x457)][_0x3f1f6b(0x810)]=function(_0x1d4bcf){const _0x1182df=_0x3f1f6b;let _0x19b131=this[_0x1182df(0x3c5)](_0x1d4bcf);const _0x475803=this[_0x1182df(0x4f8)](),_0x1d41c1=Math[_0x1182df(0x53b)](_0x475803*0.75);for(let _0x375904=0x0;_0x375904<_0x19b131['length'];_0x375904++){const _0x33bce4=this[_0x1182df(0x653)](_0x1d41c1,_0x475803);_0x33bce4[_0x1182df(0x4b4)][_0x1182df(0x394)](_0x19b131[_0x375904],0x0,0x0,_0x1d41c1,_0x475803,_0x1182df(0x1e4)),_0x33bce4['x']=(_0x375904-(_0x19b131[_0x1182df(0x135)]-0x1)/0x2)*_0x1d41c1,_0x33bce4['dy']=-_0x375904;}},Sprite_Damage[_0x3f1f6b(0x457)][_0x3f1f6b(0x3c5)]=function(_0x4d1131){const _0x10d1a3=_0x3f1f6b;let _0x46aa00=Math['abs'](_0x4d1131)['toString']();this[_0x10d1a3(0x4e1)]()&&(_0x46aa00=VisuMZ[_0x10d1a3(0x5ce)](_0x46aa00));const _0x5e500b=VisuMZ[_0x10d1a3(0x32d)][_0x10d1a3(0x3e9)]['Damage'];let _0x18c205='',_0x5da633='';switch(this['_colorType']){case 0x0:_0x18c205=_0x5e500b[_0x10d1a3(0x3c3)]||_0x10d1a3(0x7fb),_0x5da633=TextManager['hp'];if(_0x4d1131===0x0)_0x18c205='%1';break;case 0x1:_0x18c205=_0x5e500b[_0x10d1a3(0x6f1)]||'+%1',_0x5da633=TextManager['hp'];break;case 0x2:_0x18c205=_0x5e500b['mpDamageFmt']||_0x10d1a3(0x82b),_0x5da633=TextManager['mp'];break;case 0x3:_0x18c205=_0x5e500b['mpHealingFmt']||_0x10d1a3(0x317),_0x5da633=TextManager['mp'];break;}return _0x18c205[_0x10d1a3(0xb7)](_0x46aa00,_0x5da633)['trim']();},Sprite_Damage[_0x3f1f6b(0x457)][_0x3f1f6b(0x4e1)]=function(){const _0x165552=_0x3f1f6b;return Imported['VisuMZ_0_CoreEngine']?VisuMZ['CoreEngine']['Settings'][_0x165552(0x3b2)]['DigitGroupingDamageSprites']:![];},Sprite_Damage[_0x3f1f6b(0x457)]['setupCriticalEffect']=function(){const _0x44d977=_0x3f1f6b,_0x6d71b3=VisuMZ['BattleCore'][_0x44d977(0x3e9)]['Damage'];this[_0x44d977(0x54a)]=_0x6d71b3[_0x44d977(0x5bd)]['slice'](0x0),this[_0x44d977(0x802)]=_0x6d71b3[_0x44d977(0x248)];},Sprite_Damage['prototype']['setupTextPopup']=function(_0x109dca,_0x156d73){const _0x371402=_0x3f1f6b;this[_0x371402(0x54a)]=_0x156d73[_0x371402(0x2b8)]||[0x0,0x0,0x0,0x0],this[_0x371402(0x54a)]=JsonEx[_0x371402(0x6a7)](this[_0x371402(0x54a)]),this[_0x371402(0x802)]=_0x156d73[_0x371402(0x49b)]||0x0;const _0x3cd8af=this[_0x371402(0x4f8)](),_0x35a5af=Math['floor'](_0x3cd8af*0x1e),_0x17a1bd=this[_0x371402(0x653)](_0x35a5af,_0x3cd8af);_0x17a1bd[_0x371402(0x4b4)][_0x371402(0x6d0)]=ColorManager[_0x371402(0x243)](_0x156d73[_0x371402(0x6d0)]),_0x17a1bd[_0x371402(0x4b4)][_0x371402(0x394)](_0x109dca,0x0,0x0,_0x35a5af,_0x3cd8af,'center'),_0x17a1bd['dy']=0x0;},Sprite_Damage[_0x3f1f6b(0x457)][_0x3f1f6b(0x5ad)]=function(_0x3f9b2e,_0x569a6e,_0x2b5cd9){const _0x27bae8=_0x3f1f6b,_0x29d5ee=Math[_0x27bae8(0x39f)](this[_0x27bae8(0x4f8)](),ImageManager[_0x27bae8(0x42d)]),_0x48d345=Math['floor'](_0x29d5ee*0x1e),_0x20403a=this[_0x27bae8(0x653)](_0x48d345,_0x29d5ee),_0x31b65b=ImageManager[_0x27bae8(0xc4)]/0x2,_0x6799fc=_0x20403a[_0x27bae8(0x4b4)][_0x27bae8(0x747)](_0x569a6e+'\x20');_0x20403a[_0x27bae8(0x4b4)][_0x27bae8(0x6d0)]=ColorManager[_0x27bae8(0x243)](_0x2b5cd9['textColor']),_0x20403a[_0x27bae8(0x4b4)][_0x27bae8(0x394)](_0x569a6e,_0x31b65b,0x0,_0x48d345-_0x31b65b,_0x29d5ee,_0x27bae8(0x1e4));const _0x78979c=Math['round']((_0x29d5ee-ImageManager['iconHeight'])/0x2),_0x133e23=_0x48d345/0x2-ImageManager['iconWidth']-_0x6799fc/0x2+_0x31b65b/0x2,_0x192613=ImageManager[_0x27bae8(0x360)](_0x27bae8(0x3a0)),_0x29b090=ImageManager[_0x27bae8(0xc4)],_0x29ec9f=ImageManager['iconHeight'],_0x1babe5=_0x3f9b2e%0x10*_0x29b090,_0x5e2f0b=Math['floor'](_0x3f9b2e/0x10)*_0x29ec9f;_0x20403a['bitmap'][_0x27bae8(0x5db)](_0x192613,_0x1babe5,_0x5e2f0b,_0x29b090,_0x29ec9f,_0x133e23,_0x78979c),this[_0x27bae8(0x54a)]=_0x2b5cd9[_0x27bae8(0x2b8)]||[0x0,0x0,0x0,0x0],this[_0x27bae8(0x54a)]=JsonEx[_0x27bae8(0x6a7)](this[_0x27bae8(0x54a)]),this[_0x27bae8(0x802)]=_0x2b5cd9['flashDuration']||0x0,_0x20403a['dy']=0x0;},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x25e)]=Sprite_StateIcon['prototype']['updateFrame'],Sprite_StateIcon[_0x3f1f6b(0x457)][_0x3f1f6b(0x79d)]=function(){const _0xae5eb7=_0x3f1f6b;VisuMZ[_0xae5eb7(0x32d)]['Sprite_StateIcon_updateFrame'][_0xae5eb7(0x131)](this),this['visible']=this[_0xae5eb7(0x5e5)]>0x0?!![]:![];},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x33e)]=Sprite_Weapon[_0x3f1f6b(0x457)][_0x3f1f6b(0x41b)],Sprite_Weapon[_0x3f1f6b(0x457)][_0x3f1f6b(0x41b)]=function(){const _0x3c8e5b=_0x3f1f6b;VisuMZ['BattleCore'][_0x3c8e5b(0x33e)]['call'](this),this['bitmap']&&(this['bitmap'][_0x3c8e5b(0x28c)]=VisuMZ[_0x3c8e5b(0x32d)]['Settings'][_0x3c8e5b(0xf3)][_0x3c8e5b(0x45d)]);};function Sprite_HpGauge(){const _0x223033=_0x3f1f6b;this[_0x223033(0x138)](...arguments);}Sprite_HpGauge[_0x3f1f6b(0x457)]=Object['create'](Sprite_Gauge[_0x3f1f6b(0x457)]),Sprite_HpGauge[_0x3f1f6b(0x457)][_0x3f1f6b(0x712)]=Sprite_HpGauge,Sprite_HpGauge['prototype'][_0x3f1f6b(0x138)]=function(){const _0x4bdbc9=_0x3f1f6b;Sprite_Gauge['prototype'][_0x4bdbc9(0x138)][_0x4bdbc9(0x131)](this);},Sprite_HpGauge[_0x3f1f6b(0x457)][_0x3f1f6b(0x7d8)]=function(){return 0x0;},Sprite_HpGauge[_0x3f1f6b(0x457)][_0x3f1f6b(0x1ed)]=function(){const _0x540732=_0x3f1f6b;this[_0x540732(0x4b4)][_0x540732(0xae)]();const _0xfb9c4b=this[_0x540732(0x4c3)]();!isNaN(_0xfb9c4b)&&this['drawGauge']();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x631)]=Sprite_Battleback['prototype'][_0x3f1f6b(0x793)],Sprite_Battleback[_0x3f1f6b(0x457)][_0x3f1f6b(0x793)]=function(){const _0x2dc7dc=_0x3f1f6b,_0x260a34=VisuMZ['BattleCore'][_0x2dc7dc(0x3e9)][_0x2dc7dc(0x1db)];if(!_0x260a34)return VisuMZ[_0x2dc7dc(0x32d)][_0x2dc7dc(0x631)]['call'](this);const _0x10ccbf=String(_0x260a34[_0x2dc7dc(0x81a)])||'MZ';switch(_0x10ccbf){case'MZ':VisuMZ[_0x2dc7dc(0x32d)]['Sprite_Battleback_adjustPosition']['call'](this);break;case _0x2dc7dc(0x332):this[_0x2dc7dc(0x382)]();break;case _0x2dc7dc(0x2ad):this[_0x2dc7dc(0x81f)]();break;case _0x2dc7dc(0x526):this[_0x2dc7dc(0x622)]();break;case _0x2dc7dc(0x646):this['adjustPosition_ScaleUp']();break;}},Sprite_Battleback[_0x3f1f6b(0x457)]['adjustPosition_1for1']=function(){const _0x56776d=_0x3f1f6b;this[_0x56776d(0x364)]=Graphics[_0x56776d(0x364)],this[_0x56776d(0x555)]=Graphics['height'];const _0x229441=0x1;this[_0x56776d(0x43f)]['x']=_0x229441,this[_0x56776d(0x43f)]['y']=_0x229441,this['x']=0x0,this['y']=0x0;},Sprite_Battleback['prototype'][_0x3f1f6b(0x81f)]=function(){const _0x10261a=_0x3f1f6b;this[_0x10261a(0x364)]=Graphics[_0x10261a(0x364)],this[_0x10261a(0x555)]=Graphics[_0x10261a(0x555)];const _0x588876=this[_0x10261a(0x364)]/this['bitmap']['width'],_0x2de605=this[_0x10261a(0x555)]/this['bitmap']['height'],_0x180507=Math[_0x10261a(0x39f)](_0x588876,_0x2de605);this[_0x10261a(0x43f)]['x']=_0x180507,this['scale']['y']=_0x180507,this['x']=(Graphics[_0x10261a(0x364)]-this[_0x10261a(0x364)])/0x2,this['y']=Graphics[_0x10261a(0x555)]-this['height'];},Sprite_Battleback[_0x3f1f6b(0x457)][_0x3f1f6b(0x622)]=function(){const _0x48d6c4=_0x3f1f6b;this[_0x48d6c4(0x364)]=Graphics['width'],this[_0x48d6c4(0x555)]=Graphics['height'];const _0x3fa760=Math[_0x48d6c4(0x847)](0x1,this['width']/this[_0x48d6c4(0x4b4)][_0x48d6c4(0x364)]),_0x18a3e0=Math[_0x48d6c4(0x847)](0x1,this[_0x48d6c4(0x555)]/this[_0x48d6c4(0x4b4)][_0x48d6c4(0x555)]),_0x537312=Math[_0x48d6c4(0x39f)](_0x3fa760,_0x18a3e0);this[_0x48d6c4(0x43f)]['x']=_0x537312,this[_0x48d6c4(0x43f)]['y']=_0x537312,this['x']=(Graphics['width']-this[_0x48d6c4(0x364)])/0x2,this['y']=Graphics['height']-this[_0x48d6c4(0x555)];},Sprite_Battleback[_0x3f1f6b(0x457)][_0x3f1f6b(0x644)]=function(){const _0x4acefd=_0x3f1f6b;this[_0x4acefd(0x364)]=Graphics[_0x4acefd(0x364)],this[_0x4acefd(0x555)]=Graphics[_0x4acefd(0x555)];const _0x2757d3=Math['max'](0x1,this[_0x4acefd(0x364)]/this[_0x4acefd(0x4b4)]['width']),_0x477a75=Math[_0x4acefd(0x39f)](0x1,this[_0x4acefd(0x555)]/this[_0x4acefd(0x4b4)]['height']),_0x59c5e3=Math[_0x4acefd(0x39f)](_0x2757d3,_0x477a75);this[_0x4acefd(0x43f)]['x']=_0x59c5e3,this['scale']['y']=_0x59c5e3,this['x']=(Graphics[_0x4acefd(0x364)]-this[_0x4acefd(0x364)])/0x2,this['y']=Graphics[_0x4acefd(0x555)]-this['height'];},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x6e8)]=function(){if(!$gameSystem['isSideView']())return![];return![];},Spriteset_Battle['prototype'][_0x3f1f6b(0x15b)]=function(){return 0x0;},Spriteset_Battle['prototype']['animationNextDelay']=function(){return 0x0;},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x820)]=Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0xc2)],Spriteset_Battle['prototype'][_0x3f1f6b(0xc2)]=function(){const _0x384b4f=_0x3f1f6b;VisuMZ['BattleCore'][_0x384b4f(0x820)][_0x384b4f(0x131)](this),this[_0x384b4f(0x81b)]();},VisuMZ['BattleCore'][_0x3f1f6b(0x6f2)]=Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x5f1)],Spriteset_Battle['prototype'][_0x3f1f6b(0x5f1)]=function(){const _0x3d7953=_0x3f1f6b;VisuMZ[_0x3d7953(0x32d)][_0x3d7953(0x6f2)][_0x3d7953(0x131)](this),this[_0x3d7953(0x5c8)]();},Spriteset_Battle[_0x3f1f6b(0x457)]['createWeather']=function(){const _0x18b4e8=_0x3f1f6b;this[_0x18b4e8(0x3ad)]=new Weather(),this[_0x18b4e8(0x210)][_0x18b4e8(0x69a)](this[_0x18b4e8(0x3ad)]);},Spriteset_Battle[_0x3f1f6b(0x457)]['updateWeather']=function(){const _0x456750=_0x3f1f6b;this[_0x456750(0x3ad)]['type']=$gameScreen[_0x456750(0x5fe)](),this['_weather'][_0x456750(0x792)]=$gameScreen[_0x456750(0x25c)]();},Game_Interpreter[_0x3f1f6b(0x457)][_0x3f1f6b(0x63e)]=function(_0x441182){const _0x4f8990=_0x3f1f6b;$gameScreen[_0x4f8990(0x301)](_0x441182[0x0],_0x441182[0x1],_0x441182[0x2]);if(_0x441182[0x3])this[_0x4f8990(0x18c)](_0x441182[0x2]);return!![];},VisuMZ['BattleCore'][_0x3f1f6b(0x1df)]=Game_Interpreter[_0x3f1f6b(0x457)]['command283'],Game_Interpreter[_0x3f1f6b(0x457)][_0x3f1f6b(0x2a2)]=function(_0x3183dd){const _0x4a952f=_0x3f1f6b;return SceneManager[_0x4a952f(0x497)]()?(SceneManager[_0x4a952f(0x5bb)][_0x4a952f(0x1b3)][_0x4a952f(0x2e7)](_0x3183dd[0x0],_0x3183dd[0x1]),!![]):VisuMZ[_0x4a952f(0x32d)]['Game_Interpreter_command283']['call'](this,_0x3183dd);},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x7b4)]=function(_0x35d065,_0xdafb03){const _0x105032=_0x3f1f6b;_0x35d065[_0x105032(0x4b4)]=_0xdafb03;},Spriteset_Battle['prototype']['changeBattlebacks']=function(_0x19efda,_0x545652){const _0x37af38=_0x3f1f6b;_0x19efda=_0x19efda||'',_0x545652=_0x545652||'';_0x19efda===''&&_0x545652===''&&(_0x19efda=this['_back1Sprite'][_0x37af38(0x66f)](),_0x545652=this['_back2Sprite'][_0x37af38(0x14d)]());const _0x3c872a=ImageManager[_0x37af38(0x42f)](_0x19efda),_0x5adab=ImageManager['loadBattleback2'](_0x545652);_0x3c872a[_0x37af38(0x4f3)](this['updateBattlebackBitmap1'][_0x37af38(0x22f)](this,this[_0x37af38(0x605)],this[_0x37af38(0x442)],_0x3c872a,_0x5adab));},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x649)]=function(_0x42b8e8,_0x2075a7,_0x2514e1,_0x24fc8){const _0x5ab73e=_0x3f1f6b;_0x24fc8[_0x5ab73e(0x4f3)](this['updateBattlebackBitmap2']['bind'](this,_0x42b8e8,_0x2075a7,_0x2514e1,_0x24fc8));},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x817)]=function(_0x369e28,_0x408b8d,_0x10e9c0,_0x2323b2){const _0x37958e=_0x3f1f6b;_0x369e28[_0x37958e(0x4b4)]=_0x10e9c0,_0x408b8d[_0x37958e(0x4b4)]=_0x2323b2,_0x369e28[_0x37958e(0x793)](),_0x408b8d[_0x37958e(0x793)]();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x5a2)]=Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x1e6)],Spriteset_Battle['prototype'][_0x3f1f6b(0x1e6)]=function(){const _0x3fc053=_0x3f1f6b;VisuMZ['BattleCore'][_0x3fc053(0x5a2)][_0x3fc053(0x131)](this),this[_0x3fc053(0xe8)]();},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0xe8)]=function(){const _0x35aa0e=_0x3f1f6b;this['createBattleFieldContainer'](),this[_0x35aa0e(0xbd)](),this[_0x35aa0e(0xd9)](),this[_0x35aa0e(0x77e)]();},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x6bc)]=function(){const _0x56c4eb=_0x3f1f6b;this[_0x56c4eb(0x5f0)]=new Sprite(),this[_0x56c4eb(0x210)][_0x56c4eb(0x69a)](this[_0x56c4eb(0x5f0)]);},Spriteset_Battle['prototype'][_0x3f1f6b(0xbd)]=function(){const _0x22eeb8=_0x3f1f6b;this[_0x22eeb8(0x5a8)]=new Sprite(),this[_0x22eeb8(0x210)][_0x22eeb8(0x69a)](this['_animationContainer']);},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0xd9)]=function(){const _0x1b800c=_0x3f1f6b;this[_0x1b800c(0x821)]=new Sprite(),this[_0x1b800c(0x821)]['x']=this[_0x1b800c(0x210)]['x'],this['_damageContainer']['y']=this[_0x1b800c(0x210)]['y'],this[_0x1b800c(0x69a)](this[_0x1b800c(0x821)]);},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x77e)]=function(){const _0x2be3a9=_0x3f1f6b;if(!this[_0x2be3a9(0x6e8)]())return;this[_0x2be3a9(0x5f0)][_0x2be3a9(0x43f)]['x']=-0x1,this['_battlerContainer']['x']=this[_0x2be3a9(0x210)][_0x2be3a9(0x364)],this['_animationContainer']['scale']['x']=-0x1,this['_animationContainer']['x']=this[_0x2be3a9(0x210)][_0x2be3a9(0x364)],this[_0x2be3a9(0x821)][_0x2be3a9(0x43f)]['x']=-0x1,this['_damageContainer']['x']=this[_0x2be3a9(0x210)]['x']+this[_0x2be3a9(0x210)][_0x2be3a9(0x364)];},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x38f)]=function(){const _0x1f2ae9=_0x3f1f6b;Imported[_0x1f2ae9(0x147)]&&VisuMZ[_0x1f2ae9(0x58f)][_0x1f2ae9(0x3e9)]['UI'][_0x1f2ae9(0x128)]&&this['repositionEnemiesByResolution']();const _0x191c4b=$gameTroop['members'](),_0x4bbbeb=[];for(const _0x31878c of _0x191c4b){_0x4bbbeb[_0x1f2ae9(0x547)](new Sprite_Enemy(_0x31878c));}_0x4bbbeb[_0x1f2ae9(0x73f)](this[_0x1f2ae9(0x2dc)][_0x1f2ae9(0x22f)](this));for(const _0x52b256 of _0x4bbbeb){this[_0x1f2ae9(0x5f0)][_0x1f2ae9(0x69a)](_0x52b256);}this[_0x1f2ae9(0x462)]=_0x4bbbeb;},Spriteset_Battle[_0x3f1f6b(0x457)]['createActors']=function(){const _0x3c8b9b=_0x3f1f6b;this[_0x3c8b9b(0x430)]=[];for(let _0x1638bb=0x0;_0x1638bb<$gameParty[_0x3c8b9b(0x437)]();_0x1638bb++){const _0x2dcab8=$gameParty[_0x3c8b9b(0x5ca)]()[_0x1638bb],_0x1d7b39=new Sprite_Actor();_0x1d7b39[_0x3c8b9b(0x642)](_0x2dcab8),_0x1d7b39['setBattler'](_0x2dcab8),_0x1d7b39['update'](),this[_0x3c8b9b(0x430)][_0x3c8b9b(0x547)](_0x1d7b39),this[_0x3c8b9b(0x5f0)]['addChild'](_0x1d7b39);}},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x169)]=function(_0x11e5ea,_0x4069e4,_0xfbd8a7,_0x5077b5){const _0x180834=_0x3f1f6b,_0x365f68=this[_0x180834(0x1bc)](_0x4069e4),_0x5b38b2=new(_0x365f68?Sprite_AnimationMV:Sprite_Animation)(),_0x4edbc9=this[_0x180834(0x588)](_0x11e5ea);this[_0x180834(0x1b7)](_0x11e5ea[0x0])&&(_0xfbd8a7=!_0xfbd8a7),_0x5b38b2[_0x180834(0x84d)]=_0x11e5ea,_0x5b38b2['setup'](_0x4edbc9,_0x4069e4,_0xfbd8a7,_0x5077b5),this['addAnimationSpriteToContainer'](_0x5b38b2);},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x1e7)]=function(_0x3de3e4){const _0x4e8fe4=_0x3f1f6b;this[_0x4e8fe4(0x22e)](_0x3de3e4)?this[_0x4e8fe4(0x6eb)]()[_0x4e8fe4(0x69a)](_0x3de3e4):this[_0x4e8fe4(0x5a8)][_0x4e8fe4(0x69a)](_0x3de3e4),this[_0x4e8fe4(0x57c)][_0x4e8fe4(0x547)](_0x3de3e4);},Spriteset_Battle[_0x3f1f6b(0x457)]['isAnimationShownOnBattlePortrait']=function(_0x89b563){const _0x53f1e2=_0x3f1f6b;if(!_0x89b563)return![];if(!_0x89b563[_0x53f1e2(0x6b8)])return![];if(_0x89b563[_0x53f1e2(0x6b8)][_0x53f1e2(0x7c4)]!==0x0)return![];if(!_0x89b563[_0x53f1e2(0x84d)][0x0])return![];if(!_0x89b563[_0x53f1e2(0x84d)][0x0][_0x53f1e2(0x72a)]())return![];if($gameSystem[_0x53f1e2(0x3b9)]())return![];if(!this[_0x53f1e2(0x6eb)]())return![];return Window_BattleStatus[_0x53f1e2(0x457)]['battleLayoutStyle']()===_0x53f1e2(0x35f);},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x6eb)]=function(){const _0x32f3a9=_0x3f1f6b;if(!SceneManager['_scene'])return;if(!SceneManager[_0x32f3a9(0x5bb)][_0x32f3a9(0x29a)])return;if(!SceneManager[_0x32f3a9(0x5bb)][_0x32f3a9(0x29a)][_0x32f3a9(0x5e8)])return;return SceneManager[_0x32f3a9(0x5bb)][_0x32f3a9(0x29a)][_0x32f3a9(0x5e8)];},Spriteset_Battle['prototype']['removeAnimation']=function(_0x4ec0e4){const _0x3c14b0=_0x3f1f6b;this['removeAnimationFromContainer'](_0x4ec0e4);for(const _0x3b0864 of _0x4ec0e4[_0x3c14b0(0x84d)]){_0x3b0864[_0x3c14b0(0x513)]&&_0x3b0864['endAnimation']();}_0x4ec0e4[_0x3c14b0(0x35b)]();},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x84c)]=function(_0x1130ea){const _0x5bb171=_0x3f1f6b;this[_0x5bb171(0x57c)][_0x5bb171(0x103)](_0x1130ea),this[_0x5bb171(0x22e)](_0x1130ea)?this[_0x5bb171(0x6eb)]()[_0x5bb171(0x4b5)](_0x1130ea):this[_0x5bb171(0x5a8)]['removeChild'](_0x1130ea);},VisuMZ['BattleCore'][_0x3f1f6b(0x844)]=Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x714)],Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x714)]=function(){const _0x2f1242=_0x3f1f6b;VisuMZ[_0x2f1242(0x32d)][_0x2f1242(0x844)][_0x2f1242(0x131)](this),this[_0x2f1242(0x545)]();},Spriteset_Battle[_0x3f1f6b(0x457)]['updateBattlerContainer']=function(){const _0xd43d0e=_0x3f1f6b;this[_0xd43d0e(0x5f0)]['children'][_0xd43d0e(0x73f)](this['compareBattlerSprites'][_0xd43d0e(0x22f)](this)),this[_0xd43d0e(0x655)]();},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x17d)]=function(_0x24621a,_0x4c3b4c){const _0x62ab18=_0x3f1f6b;if(VisuMZ['BattleCore'][_0x62ab18(0x3e9)]['Actor'][_0x62ab18(0x726)]){if(_0x24621a[_0x62ab18(0x79b)]&&_0x4c3b4c[_0x62ab18(0x79b)]){if(_0x24621a['_battler'][_0x62ab18(0x72a)]()&&_0x4c3b4c[_0x62ab18(0x79b)][_0x62ab18(0x7f8)]())return 0x1;else{if(_0x4c3b4c[_0x62ab18(0x79b)][_0x62ab18(0x72a)]()&&_0x24621a[_0x62ab18(0x79b)]['isEnemy']())return-0x1;}}}return _0x24621a[_0x62ab18(0x47b)]!==_0x4c3b4c[_0x62ab18(0x47b)]?_0x24621a[_0x62ab18(0x47b)]-_0x4c3b4c[_0x62ab18(0x47b)]:_0x4c3b4c[_0x62ab18(0x5f6)]-_0x24621a[_0x62ab18(0x5f6)];},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x655)]=function(){const _0x5a1425=_0x3f1f6b;if(!VisuMZ['BattleCore'][_0x5a1425(0x3e9)][_0x5a1425(0xf3)][_0x5a1425(0x3de)])return;const _0x23d4e4=BattleManager[_0x5a1425(0x633)];if(_0x23d4e4){if(_0x23d4e4[_0x5a1425(0x72a)]()&&!$gameSystem[_0x5a1425(0x3b9)]())return;const _0x3aa129=_0x23d4e4[_0x5a1425(0x5cb)]();if(_0x3aa129&&_0x23d4e4[_0x5a1425(0x72a)]())this['_battlerContainer'][_0x5a1425(0x69a)](_0x3aa129);}},Spriteset_Battle['prototype'][_0x3f1f6b(0x326)]=function(){const _0x4fc40c=_0x3f1f6b;for(const _0x1c2abf of $gameParty[_0x4fc40c(0x40c)]()){if(!_0x1c2abf)continue;if(!_0x1c2abf[_0x4fc40c(0x5cb)]())continue;_0x1c2abf[_0x4fc40c(0x5cb)]()[_0x4fc40c(0x5a3)]=!![],_0x1c2abf[_0x4fc40c(0x5cb)]()[_0x4fc40c(0x59a)]();}},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x651)]=function(){return![];},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x7c9)]=function(){const _0x13404e=_0x3f1f6b;return this[_0x13404e(0x1d5)]()[_0x13404e(0x11e)](_0x17d0f4=>_0x17d0f4[_0x13404e(0x3e4)]());},Spriteset_Battle['prototype'][_0x3f1f6b(0x2d9)]=function(){const _0x5010ae=_0x3f1f6b;return this[_0x5010ae(0x1d5)]()[_0x5010ae(0x11e)](_0x4b4d21=>_0x4b4d21[_0x5010ae(0x269)]());},Spriteset_Battle[_0x3f1f6b(0x457)]['isAnyoneGrowing']=function(){const _0x5514ff=_0x3f1f6b;return this[_0x5514ff(0x1d5)]()[_0x5514ff(0x11e)](_0x404d01=>_0x404d01[_0x5514ff(0x621)]());},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x70b)]=function(){const _0x1fcb8f=_0x3f1f6b;return this[_0x1fcb8f(0x1d5)]()[_0x1fcb8f(0x11e)](_0xcc565f=>_0xcc565f[_0x1fcb8f(0x3e7)]());},Spriteset_Battle[_0x3f1f6b(0x457)][_0x3f1f6b(0x4ad)]=function(){const _0x3c36ee=_0x3f1f6b;return this[_0x3c36ee(0x1d5)]()[_0x3c36ee(0x11e)](_0x579277=>_0x579277[_0x3c36ee(0x59b)]());},Spriteset_Battle[_0x3f1f6b(0x457)]['isAnyoneChangingOpacity']=function(){const _0xfeb2a9=_0x3f1f6b;return this['battlerSprites']()[_0xfeb2a9(0x11e)](_0x3f41cd=>_0x3f41cd['isChangingOpacity']());},VisuMZ[_0x3f1f6b(0x32d)]['Window_ItemList_maxCols']=Window_ItemList[_0x3f1f6b(0x457)]['maxCols'],Window_ItemList[_0x3f1f6b(0x457)][_0x3f1f6b(0x729)]=function(){const _0x428d25=_0x3f1f6b;return SceneManager[_0x428d25(0x497)]()?SceneManager[_0x428d25(0x5bb)][_0x428d25(0x6f3)]()===_0x428d25(0x77b)?VisuMZ[_0x428d25(0x32d)][_0x428d25(0x3e9)][_0x428d25(0x24c)][_0x428d25(0x7d7)]:VisuMZ[_0x428d25(0x32d)][_0x428d25(0x3e9)][_0x428d25(0x24c)][_0x428d25(0x3c4)]:VisuMZ[_0x428d25(0x32d)][_0x428d25(0x2da)][_0x428d25(0x131)](this);},VisuMZ['BattleCore'][_0x3f1f6b(0x4be)]=Window_SkillList[_0x3f1f6b(0x457)][_0x3f1f6b(0x729)],Window_SkillList[_0x3f1f6b(0x457)][_0x3f1f6b(0x729)]=function(){const _0x3d099=_0x3f1f6b;return SceneManager[_0x3d099(0x497)]()?SceneManager[_0x3d099(0x5bb)]['battleLayoutStyle']()==='border'?VisuMZ[_0x3d099(0x32d)]['Settings'][_0x3d099(0x24c)][_0x3d099(0x7d7)]:VisuMZ[_0x3d099(0x32d)][_0x3d099(0x3e9)]['BattleLayout'][_0x3d099(0x3c4)]:VisuMZ[_0x3d099(0x32d)][_0x3d099(0x4be)][_0x3d099(0x131)](this);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x6e7)]=Window_Options['prototype']['addGeneralOptions'],Window_Options[_0x3f1f6b(0x457)]['addGeneralOptions']=function(){const _0x2deea1=_0x3f1f6b;VisuMZ[_0x2deea1(0x32d)][_0x2deea1(0x6e7)][_0x2deea1(0x131)](this),this[_0x2deea1(0x3ac)](),this[_0x2deea1(0x6d4)]();},Window_Options[_0x3f1f6b(0x457)][_0x3f1f6b(0x3ac)]=function(){const _0x17bc6e=_0x3f1f6b;VisuMZ[_0x17bc6e(0x32d)][_0x17bc6e(0x3e9)][_0x17bc6e(0x6be)][_0x17bc6e(0x574)]&&(this[_0x17bc6e(0x5b6)](),this['addBattleCoreAutoBattleStyleCommand']());},Window_Options[_0x3f1f6b(0x457)][_0x3f1f6b(0x6d4)]=function(){const _0x1f61e7=_0x3f1f6b;if(!VisuMZ[_0x1f61e7(0x32d)][_0x1f61e7(0x3e9)][_0x1f61e7(0x153)]['AddHpGaugeOption'])return;const _0x137ecd=TextManager[_0x1f61e7(0x4a8)],_0x330ff7=_0x1f61e7(0x4a8);this[_0x1f61e7(0x506)](_0x137ecd,_0x330ff7);},Window_Options[_0x3f1f6b(0x457)][_0x3f1f6b(0x5b6)]=function(){const _0x31013d=_0x3f1f6b,_0x57aca3=TextManager[_0x31013d(0x5b2)],_0x4f00c6=_0x31013d(0x691);this[_0x31013d(0x506)](_0x57aca3,_0x4f00c6);},Window_Options[_0x3f1f6b(0x457)][_0x3f1f6b(0x4e6)]=function(){const _0x3e50ac=_0x3f1f6b,_0x1970ea=TextManager[_0x3e50ac(0x337)],_0x30ffd8=_0x3e50ac(0x5df);this['addCommand'](_0x1970ea,_0x30ffd8);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x7c3)]=Window_Options[_0x3f1f6b(0x457)]['statusText'],Window_Options[_0x3f1f6b(0x457)]['statusText']=function(_0x534b3b){const _0x1b93cf=_0x3f1f6b,_0x27dcc8=this[_0x1b93cf(0x1ce)](_0x534b3b);return _0x27dcc8==='autoBattleUseSkills'?this['statusTextAutoBattleStyle']():VisuMZ['BattleCore'][_0x1b93cf(0x7c3)][_0x1b93cf(0x131)](this,_0x534b3b);},Window_Options['prototype']['statusTextAutoBattleStyle']=function(){const _0xd4beb4=_0x3f1f6b,_0x52817b=VisuMZ[_0xd4beb4(0x32d)][_0xd4beb4(0x3e9)][_0xd4beb4(0x6be)],_0x4de07d=this[_0xd4beb4(0x24e)](_0xd4beb4(0x5df));return _0x4de07d?_0x52817b[_0xd4beb4(0x801)]:_0x52817b['StyleOFF'];},Window_ShopStatus['prototype'][_0x3f1f6b(0x214)]=function(){const _0x1349b7=_0x3f1f6b,_0x51c632=DataManager[_0x1349b7(0x20d)](this[_0x1349b7(0x349)]),_0x3ec8b7=VisuMZ[_0x1349b7(0x6ee)][_0x51c632];if(!_0x3ec8b7)return this[_0x1349b7(0x798)]();const _0x507daf='DamageType%1'[_0x1349b7(0xb7)](this['_item']['damage']['type']),_0x359eac=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x1349b7(0x349)][_0x1349b7(0x434)]['type']];return _0x3ec8b7[_0x507daf][_0x1349b7(0xb7)](_0x359eac);},Window_ShopStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x5eb)]=function(){const _0x403d0b=_0x3f1f6b,_0x2e112a=DataManager['getDamageStyle'](this[_0x403d0b(0x349)]),_0x409b26=VisuMZ['DamageStyles'][_0x2e112a];if(!_0x409b26)return this[_0x403d0b(0x674)]();return _0x409b26[_0x403d0b(0x550)][_0x403d0b(0x131)](this);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x1c1)]=Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x138)],Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x138)]=function(_0x4f3c92){const _0x524d22=_0x3f1f6b;VisuMZ[_0x524d22(0x32d)][_0x524d22(0x1c1)][_0x524d22(0x131)](this,_0x4f3c92),this[_0x524d22(0x836)](_0x4f3c92);},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x836)]=function(_0x254f83){const _0x49e4aa=_0x3f1f6b,_0x519562=new Rectangle(0x0,0x0,_0x254f83[_0x49e4aa(0x364)],_0x254f83[_0x49e4aa(0x555)]);this['_commandNameWindow']=new Window_Base(_0x519562),this[_0x49e4aa(0x266)][_0x49e4aa(0x6de)]=0x0,this[_0x49e4aa(0x69a)](this[_0x49e4aa(0x266)]),this[_0x49e4aa(0x398)]();},Window_PartyCommand['prototype'][_0x3f1f6b(0x31d)]=function(){const _0x3033bf=_0x3f1f6b;Window_Command[_0x3033bf(0x457)][_0x3033bf(0x31d)]['call'](this);if(this[_0x3033bf(0x266)])this[_0x3033bf(0x398)]();},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x398)]=function(){const _0x189aa0=_0x3f1f6b,_0x273106=this[_0x189aa0(0x266)];_0x273106[_0x189aa0(0x2cb)][_0x189aa0(0xae)]();const _0x194545=this['commandStyleCheck'](this['index']());if(_0x194545===_0x189aa0(0x414)&&this[_0x189aa0(0x706)]()>0x0){const _0x495e34=this[_0x189aa0(0x5be)](this[_0x189aa0(0x617)]());let _0x456f4c=this['commandName'](this[_0x189aa0(0x617)]());_0x456f4c=_0x456f4c['replace'](/\\I\[(\d+)\]/gi,''),_0x273106['resetFontSettings'](),this[_0x189aa0(0x832)](_0x456f4c,_0x495e34),this[_0x189aa0(0x686)](_0x456f4c,_0x495e34),this['commandNameWindowCenter'](_0x456f4c,_0x495e34);}},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x832)]=function(_0x5d8512,_0x3a9a76){},Window_PartyCommand[_0x3f1f6b(0x457)]['commandNameWindowDrawText']=function(_0x8d2d18,_0x4f849e){const _0x3b7475=_0x3f1f6b,_0x3a2e23=this[_0x3b7475(0x266)];_0x3a2e23[_0x3b7475(0x394)](_0x8d2d18,0x0,_0x4f849e['y'],_0x3a2e23[_0x3b7475(0x749)],_0x3b7475(0x1e4));},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x522)]=function(_0x31c45b,_0x2fa0d5){const _0x305356=_0x3f1f6b,_0x2b7a1c=this[_0x305356(0x266)],_0x5e8317=$gameSystem[_0x305356(0x4cf)](),_0x4237e3=_0x2fa0d5['x']+Math['floor'](_0x2fa0d5[_0x305356(0x364)]/0x2)+_0x5e8317;_0x2b7a1c['x']=_0x2b7a1c[_0x305356(0x364)]/-0x2+_0x4237e3,_0x2b7a1c['y']=Math['floor'](_0x2fa0d5[_0x305356(0x555)]/0x2);},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x371)]=function(){const _0x1927ae=_0x3f1f6b;this[_0x1927ae(0x67c)](),this[_0x1927ae(0x3fd)](),this[_0x1927ae(0x114)](),this['addOptionsCommand'](),this['addEscapeCommand']();},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x67c)]=function(){const _0x2e5b28=_0x3f1f6b,_0x1e3d17=this[_0x2e5b28(0x164)](),_0x3f2ec5=VisuMZ[_0x2e5b28(0x32d)][_0x2e5b28(0x3e9)]['PartyCmd']['CmdIconFight'],_0x52d32d=_0x1e3d17===_0x2e5b28(0x3f9)?TextManager['fight']:_0x2e5b28(0x7bd)['format'](_0x3f2ec5,TextManager[_0x2e5b28(0x54d)]),_0x162238=this[_0x2e5b28(0x111)]();this['addCommand'](_0x52d32d,'fight',_0x162238);},Window_PartyCommand['prototype']['isFightCommandEnabled']=function(){return!![];},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x3fd)]=function(){const _0x58b52f=_0x3f1f6b;if(!this['isAutoBattleCommandAdded']())return;const _0x5ebd3d=this[_0x58b52f(0x164)](),_0x1f35cb=VisuMZ[_0x58b52f(0x32d)][_0x58b52f(0x3e9)]['PartyCmd']['CmdIconAutoBattle'],_0x50c768=_0x5ebd3d===_0x58b52f(0x3f9)?TextManager[_0x58b52f(0x670)]:_0x58b52f(0x7bd)['format'](_0x1f35cb,TextManager[_0x58b52f(0x670)]),_0x31dcfb=this[_0x58b52f(0x4de)]();this[_0x58b52f(0x506)](_0x50c768,'autoBattle',_0x31dcfb);},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x765)]=function(){const _0x39ca2e=_0x3f1f6b;return VisuMZ[_0x39ca2e(0x32d)][_0x39ca2e(0x3e9)][_0x39ca2e(0x10c)][_0x39ca2e(0x63a)];},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x4de)]=function(){return!![];},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x114)]=function(){},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x705)]=function(){const _0x2f0317=_0x3f1f6b;if(!this[_0x2f0317(0x217)]())return;const _0x5ca468=this[_0x2f0317(0x164)](),_0x4f4e07=VisuMZ[_0x2f0317(0x32d)][_0x2f0317(0x3e9)][_0x2f0317(0x10c)][_0x2f0317(0x4bf)],_0x572694=_0x5ca468===_0x2f0317(0x3f9)?TextManager['options']:_0x2f0317(0x7bd)['format'](_0x4f4e07,TextManager[_0x2f0317(0x482)]),_0x55c329=this[_0x2f0317(0x432)]();this[_0x2f0317(0x506)](_0x572694,_0x2f0317(0x482),_0x55c329);},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x217)]=function(){const _0x449be0=_0x3f1f6b;return VisuMZ[_0x449be0(0x32d)][_0x449be0(0x3e9)][_0x449be0(0x10c)]['CommandAddOptions'];},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x432)]=function(){return!![];},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x5f7)]=function(){const _0x4bf622=_0x3f1f6b,_0x1c36f4=this['commandStyle'](),_0x2fba8d=VisuMZ[_0x4bf622(0x32d)][_0x4bf622(0x3e9)][_0x4bf622(0x10c)]['CmdIconEscape'],_0xd4312c=_0x1c36f4==='text'?TextManager[_0x4bf622(0x19d)]:_0x4bf622(0x7bd)[_0x4bf622(0xb7)](_0x2fba8d,TextManager[_0x4bf622(0x19d)]),_0x18fb27=this[_0x4bf622(0x23b)]();this[_0x4bf622(0x506)](_0xd4312c,_0x4bf622(0x19d),_0x18fb27);},Window_PartyCommand[_0x3f1f6b(0x457)]['isEscapeCommandEnabled']=function(){const _0x5b7aa0=_0x3f1f6b;return BattleManager[_0x5b7aa0(0x17e)]();},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x23f)]=function(){const _0x1e7bd0=_0x3f1f6b;return VisuMZ[_0x1e7bd0(0x32d)]['Settings']['PartyCmd'][_0x1e7bd0(0x274)];},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x3b5)]=function(_0x3c3580){const _0x40f6fb=_0x3f1f6b,_0x226c4d=this[_0x40f6fb(0x55e)](_0x3c3580);if(_0x226c4d===_0x40f6fb(0x660))this[_0x40f6fb(0x565)](_0x3c3580);else _0x226c4d===_0x40f6fb(0x414)?this[_0x40f6fb(0x245)](_0x3c3580):Window_Command[_0x40f6fb(0x457)]['drawItem'][_0x40f6fb(0x131)](this,_0x3c3580);},Window_PartyCommand['prototype'][_0x3f1f6b(0x164)]=function(){const _0x541ba0=_0x3f1f6b;return VisuMZ[_0x541ba0(0x32d)][_0x541ba0(0x3e9)][_0x541ba0(0x10c)]['CmdStyle'];},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x55e)]=function(_0x460cdc){const _0x50e83a=_0x3f1f6b;if(_0x460cdc<0x0)return _0x50e83a(0x3f9);const _0x1ca066=this['commandStyle']();if(_0x1ca066!==_0x50e83a(0xd1))return _0x1ca066;else{if(this[_0x50e83a(0x706)]()>0x0){const _0x29bc8a=this[_0x50e83a(0x4dc)](_0x460cdc);if(_0x29bc8a['match'](/\\I\[(\d+)\]/i)){const _0x17e6fe=this[_0x50e83a(0x5be)](_0x460cdc),_0x51c086=this[_0x50e83a(0x13c)](_0x29bc8a)['width'];return _0x51c086<=_0x17e6fe[_0x50e83a(0x364)]?'iconText':_0x50e83a(0x414);}}}return'text';},Window_PartyCommand[_0x3f1f6b(0x457)]['drawItemStyleIconText']=function(_0x3014ef){const _0x90161a=_0x3f1f6b,_0x3977be=this[_0x90161a(0x5be)](_0x3014ef),_0x1bbecc=this[_0x90161a(0x4dc)](_0x3014ef),_0x1f17a9=this[_0x90161a(0x13c)](_0x1bbecc)['width'];this[_0x90161a(0x4cc)](this[_0x90161a(0x4c0)](_0x3014ef));const _0x387c05=this['itemTextAlign']();if(_0x387c05===_0x90161a(0x3f8))this['drawTextEx'](_0x1bbecc,_0x3977be['x']+_0x3977be[_0x90161a(0x364)]-_0x1f17a9,_0x3977be['y'],_0x1f17a9);else{if(_0x387c05===_0x90161a(0x1e4)){const _0x267be9=_0x3977be['x']+Math[_0x90161a(0x53b)]((_0x3977be[_0x90161a(0x364)]-_0x1f17a9)/0x2);this[_0x90161a(0x29f)](_0x1bbecc,_0x267be9,_0x3977be['y'],_0x1f17a9);}else this[_0x90161a(0x29f)](_0x1bbecc,_0x3977be['x'],_0x3977be['y'],_0x1f17a9);}},Window_PartyCommand['prototype'][_0x3f1f6b(0x245)]=function(_0x5d0707){const _0x54fc90=_0x3f1f6b;this[_0x54fc90(0x4dc)](_0x5d0707)['match'](/\\I\[(\d+)\]/i);const _0x529987=Number(RegExp['$1'])||0x0,_0x269bf2=this[_0x54fc90(0x5be)](_0x5d0707),_0x368274=_0x269bf2['x']+Math[_0x54fc90(0x53b)]((_0x269bf2[_0x54fc90(0x364)]-ImageManager[_0x54fc90(0xc4)])/0x2),_0x2c53e4=_0x269bf2['y']+(_0x269bf2[_0x54fc90(0x555)]-ImageManager['iconHeight'])/0x2;this[_0x54fc90(0x594)](_0x529987,_0x368274,_0x2c53e4);},Window_PartyCommand[_0x3f1f6b(0x457)]['hide']=function(){},Window_PartyCommand['prototype'][_0x3f1f6b(0x501)]=function(){const _0x2a94df=_0x3f1f6b;Window_Command[_0x2a94df(0x457)][_0x2a94df(0x501)][_0x2a94df(0x131)](this);const _0x410bb2=this['battleLayoutStyle']();_0x410bb2===_0x2a94df(0x77b)&&this[_0x2a94df(0x316)]();},Window_PartyCommand['prototype'][_0x3f1f6b(0x6f3)]=function(){const _0x3bc9f0=_0x3f1f6b;if(this['_battleLayoutStyle'])return this[_0x3bc9f0(0x708)];return this[_0x3bc9f0(0x708)]=SceneManager[_0x3bc9f0(0x5bb)][_0x3bc9f0(0x6f3)](),this['_battleLayoutStyle'];},Window_PartyCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x1fb)]=function(){const _0x2f69ff=_0x3f1f6b,_0x20355c=VisuMZ[_0x2f69ff(0x32d)][_0x2f69ff(0x3e9)][_0x2f69ff(0x10c)],_0x364f45=this[_0x2f69ff(0x4fc)]();switch(_0x364f45){case'fight':this[_0x2f69ff(0x313)][_0x2f69ff(0x846)](_0x20355c[_0x2f69ff(0x2c4)]);break;case _0x2f69ff(0x670):this[_0x2f69ff(0x313)][_0x2f69ff(0x846)](_0x20355c['HelpAutoBattle']);break;case _0x2f69ff(0x482):this[_0x2f69ff(0x313)][_0x2f69ff(0x846)](_0x20355c['HelpOptions']);break;case'escape':this[_0x2f69ff(0x313)]['setText'](_0x20355c[_0x2f69ff(0x81d)]);break;default:this[_0x2f69ff(0x313)][_0x2f69ff(0x846)]('');break;}},VisuMZ[_0x3f1f6b(0x32d)]['Window_ActorCommand_initialize']=Window_ActorCommand['prototype']['initialize'],Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x138)]=function(_0x9c477e){const _0x439205=_0x3f1f6b;VisuMZ[_0x439205(0x32d)]['Window_ActorCommand_initialize'][_0x439205(0x131)](this,_0x9c477e),this[_0x439205(0x836)](_0x9c477e);},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x836)]=function(_0x229038){const _0x39904d=_0x3f1f6b,_0x190ff1=new Rectangle(0x0,0x0,_0x229038[_0x39904d(0x364)],_0x229038[_0x39904d(0x555)]);this['_commandNameWindow']=new Window_Base(_0x190ff1),this[_0x39904d(0x266)][_0x39904d(0x6de)]=0x0,this[_0x39904d(0x69a)](this[_0x39904d(0x266)]),this[_0x39904d(0x398)]();},Window_ActorCommand['prototype']['callUpdateHelp']=function(){const _0x4817dd=_0x3f1f6b;Window_Command[_0x4817dd(0x457)][_0x4817dd(0x31d)]['call'](this);if(this[_0x4817dd(0x266)])this['updateCommandNameWindow']();},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x398)]=function(){const _0x3f9bf6=_0x3f1f6b,_0x4acab2=this[_0x3f9bf6(0x266)];_0x4acab2[_0x3f9bf6(0x2cb)][_0x3f9bf6(0xae)]();const _0x142615=this[_0x3f9bf6(0x55e)](this['index']());if(_0x142615===_0x3f9bf6(0x414)&&this[_0x3f9bf6(0x706)]()>0x0){const _0x3c8b27=this[_0x3f9bf6(0x5be)](this['index']());let _0x2b7cd4=this[_0x3f9bf6(0x4dc)](this[_0x3f9bf6(0x617)]());_0x2b7cd4=_0x2b7cd4['replace'](/\\I\[(\d+)\]/gi,''),_0x4acab2[_0x3f9bf6(0xd3)](),this[_0x3f9bf6(0x832)](_0x2b7cd4,_0x3c8b27),this[_0x3f9bf6(0x686)](_0x2b7cd4,_0x3c8b27),this[_0x3f9bf6(0x522)](_0x2b7cd4,_0x3c8b27);}},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x832)]=function(_0x2658a6,_0x39712f){},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x686)]=function(_0x2d43b5,_0x218036){const _0x26b8c1=_0x3f1f6b,_0x127b15=this[_0x26b8c1(0x266)];_0x127b15[_0x26b8c1(0x394)](_0x2d43b5,0x0,_0x218036['y'],_0x127b15[_0x26b8c1(0x749)],_0x26b8c1(0x1e4));},Window_ActorCommand[_0x3f1f6b(0x457)]['commandNameWindowCenter']=function(_0x26e280,_0x3491a7){const _0x1deb24=_0x3f1f6b,_0x44885e=this[_0x1deb24(0x266)],_0x5718da=$gameSystem[_0x1deb24(0x4cf)](),_0x1480e8=_0x3491a7['x']+Math['floor'](_0x3491a7['width']/0x2)+_0x5718da;_0x44885e['x']=_0x44885e['width']/-0x2+_0x1480e8,_0x44885e['y']=Math[_0x1deb24(0x53b)](_0x3491a7[_0x1deb24(0x555)]/0x2);},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x371)]=function(){const _0x411819=_0x3f1f6b;if(!this[_0x411819(0x4ac)])return;const _0x13cf1d=this[_0x411819(0x4ac)]['battleCommands']();for(const _0xbcff1b of _0x13cf1d){this[_0x411819(0x45c)](_0xbcff1b['toUpperCase']()[_0x411819(0x6da)]());}},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x45c)]=function(_0x2f2333){const _0x286cb2=_0x3f1f6b;_0x2f2333===_0x286cb2(0x675)&&this[_0x286cb2(0x55a)]();[_0x286cb2(0xb4),_0x286cb2(0x815)][_0x286cb2(0x354)](_0x2f2333)&&this[_0x286cb2(0x3d1)]();_0x2f2333===_0x286cb2(0x5cd)&&this[_0x286cb2(0x1ab)]();_0x2f2333===_0x286cb2(0x13d)&&this[_0x286cb2(0x786)]();_0x2f2333===_0x286cb2(0x782)&&this[_0x286cb2(0x5f7)]();_0x2f2333==='AUTO\x20BATTLE'&&this['addAutoBattleCommand']();if(_0x2f2333[_0x286cb2(0x7c7)](/STYPE: (\d+)/i)){const _0x2c34ac=Number(RegExp['$1']);this[_0x286cb2(0x7cb)](_0x2c34ac);}else{if(_0x2f2333[_0x286cb2(0x7c7)](/STYPE: (.*)/i)){const _0x1d114c=DataManager['getStypeIdWithName'](RegExp['$1']);this[_0x286cb2(0x7cb)](_0x1d114c);}}_0x2f2333===_0x286cb2(0x26d)&&this[_0x286cb2(0x6e3)]();if(_0x2f2333[_0x286cb2(0x7c7)](/SKILL: (\d+)/i)){const _0x1102cc=Number(RegExp['$1']);this[_0x286cb2(0x581)]($dataSkills[_0x1102cc]);}else{if(_0x2f2333['match'](/SKILL: (.*)/i)){const _0x25fd82=DataManager[_0x286cb2(0x7bb)](RegExp['$1']);this[_0x286cb2(0x581)]($dataSkills[_0x25fd82]);}}_0x2f2333===_0x286cb2(0xad)&&Imported['VisuMZ_2_PartySystem']&&this['addPartyCommand'](),[_0x286cb2(0x120),'COMBAT\x20LOG'][_0x286cb2(0x354)](_0x2f2333)&&Imported[_0x286cb2(0x5e9)]&&this[_0x286cb2(0x405)]();},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x55a)]=function(){const _0x3cf15f=_0x3f1f6b,_0x3ed00a=$dataSkills[this['_actor'][_0x3cf15f(0x161)]()];if(!_0x3ed00a)return;if(!this[_0x3cf15f(0x328)](_0x3ed00a))return;const _0x4fef22=this[_0x3cf15f(0x164)](),_0x10d9eb=DataManager[_0x3cf15f(0x34f)](_0x3ed00a),_0x2137e5=DataManager['battleCommandIcon'](_0x3ed00a),_0x544ae3=_0x4fef22===_0x3cf15f(0x3f9)?_0x10d9eb:'\x5cI[%1]%2'[_0x3cf15f(0xb7)](_0x2137e5,_0x10d9eb);this['addCommand'](_0x544ae3,_0x3cf15f(0x763),this[_0x3cf15f(0x4ac)][_0x3cf15f(0x521)]());},Window_ActorCommand[_0x3f1f6b(0x457)]['addGuardCommand']=function(){const _0x28a8ee=_0x3f1f6b,_0x510e4d=$dataSkills[this['_actor'][_0x28a8ee(0x6fa)]()];if(!_0x510e4d)return;if(!this[_0x28a8ee(0x328)](_0x510e4d))return;const _0x59ad35=this[_0x28a8ee(0x164)](),_0x31a4f1=DataManager[_0x28a8ee(0x34f)](_0x510e4d),_0x1a970a=DataManager[_0x28a8ee(0x7c8)](_0x510e4d),_0x544579=_0x59ad35===_0x28a8ee(0x3f9)?_0x31a4f1:_0x28a8ee(0x7bd)[_0x28a8ee(0xb7)](_0x1a970a,_0x31a4f1);this['addCommand'](_0x544579,_0x28a8ee(0x6a4),this[_0x28a8ee(0x4ac)][_0x28a8ee(0x1f6)]());},Window_ActorCommand[_0x3f1f6b(0x457)]['addItemCommand']=function(){const _0x33d512=_0x3f1f6b,_0x2e2775=this['commandStyle'](),_0x168b36=VisuMZ[_0x33d512(0x32d)][_0x33d512(0x3e9)]['ActorCmd']['CmdIconItem'],_0x4c0c99=_0x2e2775==='text'?TextManager[_0x33d512(0x187)]:_0x33d512(0x7bd)['format'](_0x168b36,TextManager['item']),_0x39e089=this[_0x33d512(0x7c5)]();this[_0x33d512(0x506)](_0x4c0c99,_0x33d512(0x187),_0x39e089);},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x7c5)]=function(){const _0x18acdd=_0x3f1f6b;return this['_actor']&&this[_0x18acdd(0x4ac)][_0x18acdd(0x38d)]();},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x3d1)]=function(){const _0x31f7c9=_0x3f1f6b,_0x1bd76d=this['_actor']['skillTypes']();for(const _0x4dc49 of _0x1bd76d){this[_0x31f7c9(0x7cb)](_0x4dc49);}},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x7cb)]=function(_0x394f71){const _0x13f36d=_0x3f1f6b;let _0x48c04a=$dataSystem[_0x13f36d(0x515)][_0x394f71];if(!_0x48c04a)return;let _0x286597=_0x48c04a;const _0x475945=this[_0x13f36d(0x164)]();if(_0x475945===_0x13f36d(0x3f9))_0x286597=_0x286597[_0x13f36d(0x669)](/\x1I\[(\d+)\]/gi,''),_0x286597=_0x286597['replace'](/\\I\[(\d+)\]/gi,'');else{if(!_0x48c04a['match'](/\\I\[(\d+)\]/i)){const _0x5f0bed=Imported[_0x13f36d(0x3fe)]?VisuMZ[_0x13f36d(0x465)]['Settings'][_0x13f36d(0x491)]:VisuMZ[_0x13f36d(0x32d)]['Settings'][_0x13f36d(0x198)],_0x92fd1c=$dataSystem[_0x13f36d(0x557)][_0x13f36d(0x354)](_0x394f71),_0x12d06c=_0x92fd1c?_0x5f0bed[_0x13f36d(0x1ec)]:_0x5f0bed[_0x13f36d(0x661)];_0x286597='\x5cI[%1]%2'['format'](_0x12d06c,_0x48c04a);}}this['addCommand'](_0x286597,_0x13f36d(0x144),!![],_0x394f71);},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x6e3)]=function(){const _0x42dff5=_0x3f1f6b,_0x260e92=this[_0x42dff5(0x4ac)]['skillTypes'](),_0xdc3365=this['_actor'][_0x42dff5(0x272)]();for(const _0x54b055 of _0xdc3365){if(!_0x54b055)continue;if(Imported[_0x42dff5(0x3fe)]){if(this['getSimilarSTypes'](_0x54b055))continue;if(this[_0x42dff5(0x4ea)](_0x54b055))continue;}else{if(!_0x260e92[_0x42dff5(0x354)](_0x54b055[_0x42dff5(0x534)]))continue;}this[_0x42dff5(0x581)](_0x54b055);}},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x3cc)]=function(_0x599c65){const _0x354eb0=_0x3f1f6b,_0x226175=this[_0x354eb0(0x4ac)]['skillTypes'](),_0x4ff0cf=_0x226175[_0x354eb0(0x744)](_0x54f9ef=>DataManager[_0x354eb0(0x204)](_0x599c65)[_0x354eb0(0x354)](_0x54f9ef));return _0x4ff0cf[_0x354eb0(0x135)]<=0x0;},Window_ActorCommand['prototype'][_0x3f1f6b(0x4ea)]=function(_0x31efce){const _0x334c80=_0x3f1f6b;if(!Window_SkillList[_0x334c80(0x457)][_0x334c80(0x7da)][_0x334c80(0x131)](this,_0x31efce))return!![];if(!Window_SkillList[_0x334c80(0x457)][_0x334c80(0x2a6)][_0x334c80(0x131)](this,_0x31efce))return!![];if(!Window_SkillList['prototype']['checkShowHideSkillNotetags'][_0x334c80(0x131)](this,_0x31efce))return!![];return![];},Window_ActorCommand['prototype'][_0x3f1f6b(0x581)]=function(_0x10871b){const _0x3bb448=_0x3f1f6b;if(!_0x10871b)return;if(!this[_0x3bb448(0x328)](_0x10871b))return;const _0x1dd99a=this[_0x3bb448(0x164)](),_0x28982b=DataManager['battleCommandName'](_0x10871b),_0x323cce=DataManager[_0x3bb448(0x7c8)](_0x10871b),_0x2826be=_0x1dd99a===_0x3bb448(0x3f9)?_0x28982b:'\x5cI[%1]%2'['format'](_0x323cce,_0x28982b),_0x1ce165=this[_0x3bb448(0x4ac)][_0x3bb448(0x564)](_0x10871b);this[_0x3bb448(0x506)](_0x2826be,'singleSkill',_0x1ce165,_0x10871b['id']);},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x328)]=function(_0x3f3be0){const _0x252da2=_0x3f1f6b,_0x55122d=_0x3f3be0[_0x252da2(0x4e8)];if(_0x55122d['match'](/<COMMAND REQUIRE LEARN>/i)){if(!this[_0x252da2(0x4ac)]['isLearnedSkill'](_0x3f3be0['id']))return![];}if(_0x55122d[_0x252da2(0x7c7)](/<COMMAND REQUIRE ACCESS>/i)){if(!this[_0x252da2(0x4ac)][_0x252da2(0x24f)](_0x3f3be0['id']))return![];}const _0xf0654d=VisuMZ[_0x252da2(0x32d)]['createKeyJS'](_0x3f3be0,_0x252da2(0x5b5));if(VisuMZ[_0x252da2(0x32d)]['JS'][_0xf0654d]){if(!VisuMZ[_0x252da2(0x32d)]['JS'][_0xf0654d]['call'](this,this[_0x252da2(0x4ac)],_0x3f3be0))return![];}return VisuMZ[_0x252da2(0x32d)][_0x252da2(0x1a7)](_0x3f3be0);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x1a7)]=function(_0x342930){const _0x1e2a98=_0x3f1f6b,_0x576c4b=_0x342930[_0x1e2a98(0x4e8)];if(_0x576c4b[_0x1e2a98(0x7c7)](/<COMMAND SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x45c0e7=JSON[_0x1e2a98(0x290)]('['+RegExp['$1'][_0x1e2a98(0x7c7)](/\d+/g)+']');for(const _0x9d43e4 of _0x45c0e7){if(!$gameSwitches['value'](_0x9d43e4))return![];}return!![];}if(_0x576c4b[_0x1e2a98(0x7c7)](/<COMMAND SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x578297=JSON['parse']('['+RegExp['$1'][_0x1e2a98(0x7c7)](/\d+/g)+']');for(const _0x3f9aec of _0x578297){if(!$gameSwitches[_0x1e2a98(0x353)](_0x3f9aec))return![];}return!![];}if(_0x576c4b[_0x1e2a98(0x7c7)](/<COMMAND SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xdfea03=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x304c8b of _0xdfea03){if($gameSwitches[_0x1e2a98(0x353)](_0x304c8b))return!![];}return![];}if(_0x576c4b[_0x1e2a98(0x7c7)](/<COMMAND HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xe1e21d=JSON[_0x1e2a98(0x290)]('['+RegExp['$1'][_0x1e2a98(0x7c7)](/\d+/g)+']');for(const _0x23ce5a of _0xe1e21d){if(!$gameSwitches['value'](_0x23ce5a))return!![];}return![];}if(_0x576c4b['match'](/<COMMAND HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x54e038=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5e3cff of _0x54e038){if(!$gameSwitches[_0x1e2a98(0x353)](_0x5e3cff))return!![];}return![];}if(_0x576c4b[_0x1e2a98(0x7c7)](/<COMMAND HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32f8b6=JSON['parse']('['+RegExp['$1'][_0x1e2a98(0x7c7)](/\d+/g)+']');for(const _0x37e67e of _0x32f8b6){if($gameSwitches[_0x1e2a98(0x353)](_0x37e67e))return![];}return!![];}return!![];},Window_ActorCommand[_0x3f1f6b(0x457)]['addEscapeCommand']=function(){const _0x459383=_0x3f1f6b,_0x431428=this['commandStyle'](),_0x1a576e=VisuMZ[_0x459383(0x32d)][_0x459383(0x3e9)][_0x459383(0x10c)][_0x459383(0x173)],_0x5672e4=_0x431428===_0x459383(0x3f9)?TextManager['escape']:_0x459383(0x7bd)['format'](_0x1a576e,TextManager[_0x459383(0x19d)]),_0x1d35a5=this[_0x459383(0x23b)]();this[_0x459383(0x506)](_0x5672e4,_0x459383(0x19d),_0x1d35a5);},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x23b)]=function(){const _0x33f3be=_0x3f1f6b;return BattleManager[_0x33f3be(0x17e)]();},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x3fd)]=function(){const _0x5ba949=_0x3f1f6b,_0x420501=this[_0x5ba949(0x164)](),_0xce5666=VisuMZ[_0x5ba949(0x32d)][_0x5ba949(0x3e9)][_0x5ba949(0x10c)]['CmdIconAutoBattle'],_0x171a2c=_0x420501===_0x5ba949(0x3f9)?TextManager[_0x5ba949(0x670)]:_0x5ba949(0x7bd)['format'](_0xce5666,TextManager[_0x5ba949(0x670)]),_0x129a37=this[_0x5ba949(0x4de)]();this[_0x5ba949(0x506)](_0x171a2c,_0x5ba949(0x670),_0x129a37);},Window_ActorCommand[_0x3f1f6b(0x457)]['isAutoBattleCommandEnabled']=function(){return!![];},Window_ActorCommand[_0x3f1f6b(0x457)]['itemTextAlign']=function(){const _0x425dd3=_0x3f1f6b;return VisuMZ[_0x425dd3(0x32d)][_0x425dd3(0x3e9)][_0x425dd3(0x198)][_0x425dd3(0x274)];},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x3b5)]=function(_0x4ccb01){const _0x5c5758=_0x3f1f6b,_0x213980=this['commandStyleCheck'](_0x4ccb01);if(_0x213980===_0x5c5758(0x660))this[_0x5c5758(0x565)](_0x4ccb01);else _0x213980===_0x5c5758(0x414)?this[_0x5c5758(0x245)](_0x4ccb01):Window_Command[_0x5c5758(0x457)][_0x5c5758(0x3b5)][_0x5c5758(0x131)](this,_0x4ccb01);this['drawSingleSkillCost'](_0x4ccb01);},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x164)]=function(){const _0x494087=_0x3f1f6b;return VisuMZ['BattleCore']['Settings'][_0x494087(0x198)]['CmdStyle'];},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x55e)]=function(_0x499c1f){const _0x2f97f2=_0x3f1f6b;if(_0x499c1f<0x0)return _0x2f97f2(0x3f9);const _0xced18e=this[_0x2f97f2(0x164)]();if(_0xced18e!==_0x2f97f2(0xd1))return _0xced18e;else{if(this[_0x2f97f2(0x706)]()>0x0){const _0x478eff=this[_0x2f97f2(0x4dc)](_0x499c1f);if(_0x478eff[_0x2f97f2(0x7c7)](/\\I\[(\d+)\]/i)){const _0x264b16=this[_0x2f97f2(0x5be)](_0x499c1f),_0x173732=this['textSizeEx'](_0x478eff)[_0x2f97f2(0x364)];return _0x173732<=_0x264b16[_0x2f97f2(0x364)]?_0x2f97f2(0x660):_0x2f97f2(0x414);}}}return _0x2f97f2(0x3f9);},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x565)]=function(_0x43a52){const _0x45a77f=_0x3f1f6b,_0x5f3080=this[_0x45a77f(0x5be)](_0x43a52),_0x242254=this[_0x45a77f(0x4dc)](_0x43a52),_0x307001=this[_0x45a77f(0x13c)](_0x242254)[_0x45a77f(0x364)];this[_0x45a77f(0x4cc)](this[_0x45a77f(0x4c0)](_0x43a52));const _0x10f677=this[_0x45a77f(0x23f)]();if(_0x10f677===_0x45a77f(0x3f8))this[_0x45a77f(0x29f)](_0x242254,_0x5f3080['x']+_0x5f3080['width']-_0x307001,_0x5f3080['y'],_0x307001);else{if(_0x10f677===_0x45a77f(0x1e4)){const _0x5b8831=_0x5f3080['x']+Math[_0x45a77f(0x53b)]((_0x5f3080[_0x45a77f(0x364)]-_0x307001)/0x2);this['drawTextEx'](_0x242254,_0x5b8831,_0x5f3080['y'],_0x307001);}else this[_0x45a77f(0x29f)](_0x242254,_0x5f3080['x'],_0x5f3080['y'],_0x307001);}},Window_ActorCommand['prototype']['drawItemStyleIcon']=function(_0x3ed08a){const _0x47482f=_0x3f1f6b;this['commandName'](_0x3ed08a)[_0x47482f(0x7c7)](/\\I\[(\d+)\]/i);const _0x567355=Number(RegExp['$1'])||0x0,_0x1f6f1e=this['itemLineRect'](_0x3ed08a),_0x1ac465=_0x1f6f1e['x']+Math['floor']((_0x1f6f1e[_0x47482f(0x364)]-ImageManager['iconWidth'])/0x2),_0x4661e8=_0x1f6f1e['y']+(_0x1f6f1e['height']-ImageManager[_0x47482f(0x42d)])/0x2;this['drawIcon'](_0x567355,_0x1ac465,_0x4661e8);},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x54c)]=function(_0x4c2516){const _0x380bad=_0x3f1f6b,_0x2ce4a7=this[_0x380bad(0x1ce)](_0x4c2516);if(![_0x380bad(0x763),_0x380bad(0x6a4),'singleSkill'][_0x380bad(0x354)](_0x2ce4a7))return;const _0x21e8ef=this[_0x380bad(0x5be)](_0x4c2516);let _0xb8d546=null;if(_0x2ce4a7===_0x380bad(0x763))_0xb8d546=$dataSkills[this[_0x380bad(0x4ac)]['attackSkillId']()];else _0x2ce4a7==='guard'?_0xb8d546=$dataSkills[this[_0x380bad(0x4ac)]['guardSkillId']()]:_0xb8d546=$dataSkills[this[_0x380bad(0x453)][_0x4c2516][_0x380bad(0x7dc)]];this[_0x380bad(0x129)](this['_actor'],_0xb8d546,_0x21e8ef['x'],_0x21e8ef['y'],_0x21e8ef['width']);},Window_ActorCommand[_0x3f1f6b(0x457)]['drawSkillCost']=function(_0x2883c6,_0x26fd0d,_0x2309da,_0x320938,_0xcecf20){const _0x11fe43=_0x3f1f6b;if(!_0x26fd0d)return;Imported[_0x11fe43(0x3fe)]?Window_Command[_0x11fe43(0x457)][_0x11fe43(0x129)][_0x11fe43(0x131)](this,_0x2883c6,_0x26fd0d,_0x2309da,_0x320938,_0xcecf20):Window_SkillList[_0x11fe43(0x457)]['drawSkillCost'][_0x11fe43(0x131)](this,_0x26fd0d,_0x2309da,_0x320938,_0xcecf20);},Window_ActorCommand['prototype'][_0x3f1f6b(0x221)]=function(){},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x501)]=function(){const _0x3ed06d=_0x3f1f6b;Window_Command[_0x3ed06d(0x457)][_0x3ed06d(0x501)][_0x3ed06d(0x131)](this);const _0x15f426=this[_0x3ed06d(0x6f3)]();_0x15f426===_0x3ed06d(0x77b)&&this[_0x3ed06d(0x316)]();},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x6f3)]=function(){const _0x1e6b15=_0x3f1f6b;if(this['_battleLayoutStyle'])return this['_battleLayoutStyle'];return this[_0x1e6b15(0x708)]=SceneManager['_scene'][_0x1e6b15(0x6f3)](),this[_0x1e6b15(0x708)];},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x3a6)]=Window_ActorCommand['prototype'][_0x3f1f6b(0x68f)],Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x68f)]=function(_0x2a7709){const _0x3b7294=_0x3f1f6b,_0x2f2632=this[_0x3b7294(0x6f3)]();if(_0x2a7709&&['xp',_0x3b7294(0x35f)]['includes'](_0x2f2632))this['resizeWindowXPStyle'](_0x2a7709);else _0x2a7709&&['border'][_0x3b7294(0x354)](_0x2f2632)&&(this['resizeWindowBorderStyle'](_0x2a7709),this[_0x3b7294(0x316)]());VisuMZ[_0x3b7294(0x32d)][_0x3b7294(0x3a6)][_0x3b7294(0x131)](this,_0x2a7709),_0x2a7709&&$gameTroop['aliveMembers']()[_0x3b7294(0x135)]>0x0&&_0x2a7709[_0x3b7294(0x5cb)]()&&_0x2a7709['battler']()[_0x3b7294(0x4b6)]();},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x1cf)]=function(_0x4ff5db){const _0x2cf6cd=_0x3f1f6b,_0x31f82e=Math[_0x2cf6cd(0x5a7)](Graphics[_0x2cf6cd(0x2e4)]/0x3),_0x14288f=Math['round'](Graphics[_0x2cf6cd(0x2e4)]/$gameParty['battleMembers']()[_0x2cf6cd(0x135)]),_0x1d3c87=Math[_0x2cf6cd(0x847)](_0x31f82e,_0x14288f),_0x5d3515=this[_0x2cf6cd(0x368)](VisuMZ[_0x2cf6cd(0x32d)]['Settings'][_0x2cf6cd(0x24c)][_0x2cf6cd(0x411)]),_0x5f1455=_0x14288f*_0x4ff5db[_0x2cf6cd(0x617)]()+(_0x14288f-_0x1d3c87)/0x2,_0x4b3df5=SceneManager['_scene']['_statusWindow']['y']-_0x5d3515;this[_0x2cf6cd(0x28a)](_0x5f1455,_0x4b3df5,_0x1d3c87,_0x5d3515),this[_0x2cf6cd(0x2d7)](),this[_0x2cf6cd(0x256)](0x1);},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x719)]=function(_0x2bcba8){const _0x299546=_0x3f1f6b,_0x8498d6=SceneManager[_0x299546(0x5bb)][_0x299546(0x224)]();this[_0x299546(0x28a)](_0x8498d6['x'],_0x8498d6['y'],_0x8498d6[_0x299546(0x364)],_0x8498d6[_0x299546(0x555)]),this[_0x299546(0x2d7)](),this['setBackgroundType'](0x0);},Window_ActorCommand['prototype']['refreshDimmerBitmap']=function(){const _0x436cf6=_0x3f1f6b;if(this[_0x436cf6(0x7aa)]){const _0x42a0cb=this['_dimmerSprite'][_0x436cf6(0x4b4)],_0x29cf12=this[_0x436cf6(0x364)]-0x8,_0x3f4207=this['height'],_0x45a0f0=this['padding'],_0x51cd27=ColorManager[_0x436cf6(0x6e1)](),_0x16da6f=ColorManager[_0x436cf6(0x1fc)]();this[_0x436cf6(0x7aa)]['x']=0x4,_0x42a0cb['resize'](_0x29cf12,_0x3f4207),_0x42a0cb[_0x436cf6(0x7f5)](0x0,0x0,_0x29cf12,_0x45a0f0,_0x16da6f,_0x51cd27,!![]),_0x42a0cb['fillRect'](0x0,_0x45a0f0,_0x29cf12,_0x3f4207-_0x45a0f0*0x2,_0x51cd27),_0x42a0cb['gradientFillRect'](0x0,_0x3f4207-_0x45a0f0,_0x29cf12,_0x45a0f0,_0x51cd27,_0x16da6f,!![]),this[_0x436cf6(0x7aa)][_0x436cf6(0xfd)](0x0,0x0,_0x29cf12,_0x3f4207);}},Window_ActorCommand[_0x3f1f6b(0x457)][_0x3f1f6b(0x1fb)]=function(){const _0x14861b=_0x3f1f6b;if(!this['_actor'])return;const _0x5b681e=VisuMZ[_0x14861b(0x32d)][_0x14861b(0x3e9)][_0x14861b(0x198)],_0x59d15d=this[_0x14861b(0x4fc)]();switch(_0x59d15d){case _0x14861b(0x763):this[_0x14861b(0x247)]($dataSkills[this[_0x14861b(0x4ac)][_0x14861b(0x161)]()]);break;case'guard':this[_0x14861b(0x247)]($dataSkills[this[_0x14861b(0x4ac)][_0x14861b(0x6fa)]()]);break;case _0x14861b(0x144):const _0x20ced8=_0x5b681e[_0x14861b(0x5fa)],_0x4e0027=_0x20ced8[_0x14861b(0xb7)]($dataSystem[_0x14861b(0x515)][this[_0x14861b(0x329)]()]);this[_0x14861b(0x313)]['setText'](_0x4e0027);break;case'singleSkill':this['setHelpWindowItem']($dataSkills[this[_0x14861b(0x329)]()]);break;case _0x14861b(0x187):this[_0x14861b(0x313)][_0x14861b(0x846)](_0x5b681e['HelpItem']);break;case _0x14861b(0x19d):this['_helpWindow'][_0x14861b(0x846)](_0x5b681e[_0x14861b(0x81d)]);break;case _0x14861b(0x670):this[_0x14861b(0x313)][_0x14861b(0x846)](_0x5b681e[_0x14861b(0x223)]);break;default:this[_0x14861b(0x313)][_0x14861b(0x846)]('');break;}},VisuMZ[_0x3f1f6b(0x32d)]['Window_BattleStatus_initialize']=Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x138)],Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x138)]=function(_0x235747){const _0xf70f6=_0x3f1f6b;VisuMZ[_0xf70f6(0x32d)][_0xf70f6(0x1c7)]['call'](this,_0x235747),this[_0xf70f6(0x7b3)]();},Window_BattleStatus['prototype'][_0x3f1f6b(0x7b3)]=function(){const _0x5d5b72=_0x3f1f6b;this[_0x5d5b72(0x4a0)]=this[_0x5d5b72(0x3bb)]();},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x6f3)]=function(){const _0x468f6d=_0x3f1f6b;if(this['_battleLayoutStyle'])return this['_battleLayoutStyle'];return this[_0x468f6d(0x708)]=SceneManager[_0x468f6d(0x5bb)]['battleLayoutStyle'](),this[_0x468f6d(0x708)];},Window_BattleStatus['prototype'][_0x3f1f6b(0x3bb)]=function(){const _0x464e6a=_0x3f1f6b,_0xf70daf=this[_0x464e6a(0x6f3)]();switch(_0xf70daf){case _0x464e6a(0x5f8):case _0x464e6a(0x77b):return!![];break;case _0x464e6a(0x6f0):case'xp':case _0x464e6a(0x35f):default:return![];break;}},Window_BattleStatus[_0x3f1f6b(0x457)]['extraHeight']=function(){const _0x5bd3b8=_0x3f1f6b;return this[_0x5bd3b8(0x3bb)]()?0x0:0xa;},Window_BattleStatus[_0x3f1f6b(0x457)]['maxCols']=function(){const _0x24c8a8=_0x3f1f6b,_0x18c357=this[_0x24c8a8(0x6f3)]();switch(_0x18c357){case _0x24c8a8(0x5f8):return 0x1;break;case'xp':case _0x24c8a8(0x35f):return $gameParty[_0x24c8a8(0x5ca)]()['length'];break;case _0x24c8a8(0x6f0):default:return $gameParty[_0x24c8a8(0x437)]();break;}},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x684)]=function(){const _0x537491=_0x3f1f6b,_0x1674b7=this[_0x537491(0x6f3)]();switch(_0x1674b7){case _0x537491(0x5f8):return Window_StatusBase[_0x537491(0x457)][_0x537491(0x684)][_0x537491(0x131)](this);break;case'default':case'xp':case _0x537491(0x35f):default:return this[_0x537491(0x650)];break;}},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0xca)]=function(){const _0x5735ed=_0x3f1f6b,_0x4ec57a=this[_0x5735ed(0x6f3)]();switch(_0x4ec57a){case'list':return Window_StatusBase[_0x5735ed(0x457)][_0x5735ed(0xca)][_0x5735ed(0x131)](this);break;case _0x5735ed(0x6f0):case'xp':case _0x5735ed(0x35f):default:return 0x0;break;}},Window_BattleStatus[_0x3f1f6b(0x457)]['updatePadding']=function(){const _0x4ca3b2=_0x3f1f6b;this[_0x4ca3b2(0x3bb)]()?Window_StatusBase[_0x4ca3b2(0x457)][_0x4ca3b2(0x283)][_0x4ca3b2(0x131)](this):this[_0x4ca3b2(0x4eb)]=0x8;},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x68c)]=function(){this['_requestRefresh']=!![];},Window_BattleStatus[_0x3f1f6b(0x457)]['update']=function(){const _0x212a27=_0x3f1f6b;Window_StatusBase[_0x212a27(0x457)][_0x212a27(0x5f1)][_0x212a27(0x131)](this),this['updateRefresh'](),this[_0x212a27(0x115)]();if(this[_0x212a27(0x6f3)]()===_0x212a27(0x77b))this['updateBorderStyle']();},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x5e1)]=function(){const _0x2eb1f6=_0x3f1f6b;if($gameTemp[_0x2eb1f6(0x746)]())this[_0x2eb1f6(0x69e)](),this[_0x2eb1f6(0xb3)]=![];else this[_0x2eb1f6(0xb3)]&&(this[_0x2eb1f6(0xb3)]=![],this['refresh']());},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x12e)]=function(){const _0x57f262=_0x3f1f6b;Window_StatusBase['prototype'][_0x57f262(0x12e)]['call'](this);if(!$gameSystem[_0x57f262(0x3b9)]())this[_0x57f262(0x855)]();},Window_BattleStatus['prototype'][_0x3f1f6b(0x221)]=function(){const _0x5a4ea8=_0x3f1f6b;if(this[_0x5a4ea8(0x712)]===Window_BattleStatus)return;Window_StatusBase[_0x5a4ea8(0x457)][_0x5a4ea8(0x221)][_0x5a4ea8(0x131)](this);},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x1dc)]=function(_0x14a1f7){const _0x1940b2=_0x3f1f6b,_0x5d2c42=this[_0x1940b2(0x6f3)]();switch(_0x5d2c42){case'xp':case'portrait':break;case'default':case _0x1940b2(0x5f8):case _0x1940b2(0x77b):default:return Window_StatusBase['prototype'][_0x1940b2(0x1dc)][_0x1940b2(0x131)](this,_0x14a1f7);break;}},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x2e5)]=Window_BattleStatus[_0x3f1f6b(0x457)]['drawItemImage'],Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x78d)]=function(_0x3b77cd){const _0x27295b=_0x3f1f6b,_0x5bbb68=this[_0x27295b(0x6f3)]();switch(_0x5bbb68){case _0x27295b(0x5f8):this[_0x27295b(0x14c)](_0x3b77cd);break;case'xp':this[_0x27295b(0x5a9)](_0x3b77cd);break;case'portrait':this[_0x27295b(0x234)](_0x3b77cd);break;case _0x27295b(0x6f0):case _0x27295b(0x77b):default:VisuMZ[_0x27295b(0x32d)]['Window_BattleStatus_drawItemImage'][_0x27295b(0x131)](this,_0x3b77cd);break;}},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x1e1)]=function(_0x36e460){const _0x28adf=_0x3f1f6b,_0x2b1628=this['battleLayoutStyle']();if(!$gameSystem[_0x28adf(0x3b9)]())this[_0x28adf(0x67a)](_0x36e460);switch(_0x2b1628){case _0x28adf(0x5f8):this[_0x28adf(0x166)](_0x36e460);break;case'xp':case _0x28adf(0x35f):case _0x28adf(0x6f0):case _0x28adf(0x77b):default:this[_0x28adf(0x5c2)](_0x36e460);break;}},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x7e1)]=function(){const _0x1e6a68=_0x3f1f6b,_0xb83fd8=this[_0x1e6a68(0x6f3)]();if(['xp'][_0x1e6a68(0x354)](_0xb83fd8)&&!$gameSystem[_0x1e6a68(0x3b9)]()){this[_0x1e6a68(0x842)](0x0,0x0,0x0,0x0);return;}Window_StatusBase[_0x1e6a68(0x457)]['refreshCursor']['call'](this);},Window_BattleStatus['prototype'][_0x3f1f6b(0x67a)]=function(_0x5546e9){const _0x5c755b=_0x3f1f6b,_0x3117fa=this['actor'](_0x5546e9)[_0x5c755b(0x5cb)]();if(!_0x3117fa)return;const _0x130411=this[_0x5c755b(0x6f3)](),_0x722d46=this['itemRect'](_0x5546e9);let _0x14e486=Math[_0x5c755b(0x5a7)](_0x722d46['x']+_0x722d46['width']/0x2);[_0x5c755b(0x5f8)][_0x5c755b(0x354)](_0x130411)&&(_0x14e486=_0x722d46['width']/$gameParty[_0x5c755b(0x5ca)]()['length'],_0x14e486*=_0x5546e9,_0x14e486+=_0x722d46['width']/$gameParty[_0x5c755b(0x5ca)]()[_0x5c755b(0x135)]/0x2);let _0x33b4ca=Math[_0x5c755b(0x5a7)](this[_0x5c755b(0x4e5)](_0x5546e9,_0x3117fa,_0x722d46));_0x3117fa[_0x5c755b(0x2c1)](_0x14e486,_0x33b4ca),this[_0x5c755b(0x3e8)](_0x3117fa,0x1),_0x3117fa[_0x5c755b(0x12e)]();},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x4e5)]=function(_0xc8dd9,_0x4e4f83,_0x2626fb){const _0x5f992c=_0x3f1f6b,_0x396277=VisuMZ[_0x5f992c(0x32d)][_0x5f992c(0x3e9)][_0x5f992c(0x24c)],_0x2ed0e6=this[_0x5f992c(0x6f3)]();if(_0x2ed0e6==='xp'){const _0x4f29f3=_0x396277[_0x5f992c(0x7c6)];switch(_0x4f29f3[_0x5f992c(0x61d)]()[_0x5f992c(0x6da)]()){case'bottom':return _0x2626fb[_0x5f992c(0x555)]-_0x4e4f83[_0x5f992c(0x2d5)]['height']/0x4;break;case _0x5f992c(0x1e4):const _0x50756b=_0x396277[_0x5f992c(0x7b5)];return(_0x2626fb['height']+(_0x4e4f83['height']||_0x50756b))/0x2;break;case _0x5f992c(0x5d4):return 0x0;case _0x5f992c(0x528):default:return this[_0x5f992c(0x6ca)](_0x2626fb);break;}}else{if(_0x2ed0e6==='portrait'){}}return _0x4e4f83[_0x5f992c(0x555)];},Window_BattleStatus[_0x3f1f6b(0x457)]['drawItemImageListStyle']=function(_0x34115b){const _0x43c62f=_0x3f1f6b;if(!VisuMZ[_0x43c62f(0x32d)][_0x43c62f(0x3e9)][_0x43c62f(0x24c)]['ShowFacesListStyle'])return;const _0x587d88=this['actor'](_0x34115b),_0xb5e4aa=this['itemRect'](_0x34115b);_0xb5e4aa[_0x43c62f(0x364)]=ImageManager[_0x43c62f(0x396)],_0xb5e4aa['height']-=0x2,this[_0x43c62f(0x149)](_0x587d88,_0xb5e4aa['x']+0x1,_0xb5e4aa['y']+0x1,_0xb5e4aa[_0x43c62f(0x364)],_0xb5e4aa[_0x43c62f(0x555)]);},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x166)]=function(_0x4861e4){const _0x6f4d11=_0x3f1f6b,_0x31366c=$dataSystem[_0x6f4d11(0x689)]?0x4:0x3,_0x593392=_0x31366c*0x80+(_0x31366c-0x1)*0x8+0x4,_0x8af127=this['actor'](_0x4861e4),_0x1294ff=this['itemRect'](_0x4861e4);let _0x5c6063=_0x1294ff['x']+this['padding'];VisuMZ[_0x6f4d11(0x32d)]['Settings'][_0x6f4d11(0x24c)][_0x6f4d11(0x51a)]?_0x5c6063=_0x1294ff['x']+ImageManager[_0x6f4d11(0x396)]+0x8:_0x5c6063+=ImageManager[_0x6f4d11(0xc4)];const _0x5f3b93=Math['round'](Math['min'](_0x1294ff['x']+_0x1294ff[_0x6f4d11(0x364)]-_0x593392,_0x5c6063)),_0x40b7fa=Math[_0x6f4d11(0x5a7)](_0x1294ff['y']+(_0x1294ff['height']-Sprite_Name[_0x6f4d11(0x457)][_0x6f4d11(0x12f)]())/0x2),_0x545485=Math[_0x6f4d11(0x5a7)](_0x5f3b93-ImageManager[_0x6f4d11(0xc4)]/0x2-0x4),_0x4dcd19=Math['round'](_0x1294ff['y']+(_0x1294ff[_0x6f4d11(0x555)]-ImageManager['iconHeight'])/0x2+ImageManager[_0x6f4d11(0x42d)]/0x2);let _0xd771dc=_0x5f3b93+0x88;const _0x1a2068=_0x40b7fa;this[_0x6f4d11(0x734)](_0x8af127,_0x5f3b93-0x4,_0x40b7fa),this[_0x6f4d11(0x77f)](_0x8af127,_0x5f3b93,_0x40b7fa),this['placeStateIcon'](_0x8af127,_0x545485,_0x4dcd19),this[_0x6f4d11(0x74f)](_0x8af127,'hp',_0xd771dc+0x88*0x0,_0x1a2068),this['placeGauge'](_0x8af127,'mp',_0xd771dc+0x88*0x1,_0x1a2068),$dataSystem[_0x6f4d11(0x689)]&&this[_0x6f4d11(0x74f)](_0x8af127,'tp',_0xd771dc+0x88*0x2,_0x1a2068);},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x5a9)]=function(_0x38b967){const _0x46dfb3=_0x3f1f6b;if(!$gameSystem['isSideView']())return;VisuMZ[_0x46dfb3(0x32d)][_0x46dfb3(0x2e5)][_0x46dfb3(0x131)](this,_0x38b967);},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x5c2)]=function(_0x452f7f){const _0x2c0a62=_0x3f1f6b,_0x3d3ec8=this[_0x2c0a62(0x26b)](_0x452f7f),_0xed3013=this[_0x2c0a62(0x38c)](_0x452f7f),_0x3aad7b=Math[_0x2c0a62(0x5a7)](_0xed3013['x']+(_0xed3013[_0x2c0a62(0x364)]-0x80)/0x2),_0x384b37=this[_0x2c0a62(0x6ca)](_0xed3013);let _0x239923=_0x3aad7b-ImageManager[_0x2c0a62(0xc4)]/0x2-0x4,_0x39b2f6=_0x384b37+ImageManager[_0x2c0a62(0x42d)]/0x2;_0x239923-ImageManager['iconWidth']/0x2<_0xed3013['x']&&(_0x239923=_0x3aad7b+ImageManager[_0x2c0a62(0xc4)]/0x2-0x4,_0x39b2f6=_0x384b37-ImageManager[_0x2c0a62(0x42d)]/0x2);const _0x3fadee=_0x3aad7b,_0x3bb12a=this['basicGaugesY'](_0xed3013);this['placeTimeGauge'](_0x3d3ec8,_0x3aad7b,_0x384b37),this['placeActorName'](_0x3d3ec8,_0x3aad7b,_0x384b37),this[_0x2c0a62(0x3f7)](_0x3d3ec8,_0x239923,_0x39b2f6),this[_0x2c0a62(0x12b)](_0x3d3ec8,_0x3fadee,_0x3bb12a);},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x15f)]=function(_0x4fe7ac){const _0x4c07e7=_0x3f1f6b;if(!VisuMZ[_0x4c07e7(0x32d)][_0x4c07e7(0x3e9)][_0x4c07e7(0x24c)][_0x4c07e7(0x5e0)])return![];if(_0x4fe7ac[_0x4c07e7(0x827)]())return!![];return Imported['VisuMZ_1_MainMenuCore']&&_0x4fe7ac[_0x4c07e7(0x311)]();},Game_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x2a1)]=function(){const _0xf84093=_0x3f1f6b;if(this[_0xf84093(0x26b)]()['note'][_0xf84093(0x7c7)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0xf84093(0x26b)]()['note'][_0xf84093(0x7c7)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor[_0x3f1f6b(0x457)][_0x3f1f6b(0x333)]=function(){const _0x2f73fb=_0x3f1f6b;if(this[_0x2f73fb(0x26b)]()[_0x2f73fb(0x4e8)][_0x2f73fb(0x7c7)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x2f73fb(0x26b)]()[_0x2f73fb(0x4e8)]['match'](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$2']);}return 0x0;},Window_BattleStatus['prototype'][_0x3f1f6b(0x234)]=function(_0x4e72a6){const _0x572f5f=_0x3f1f6b,_0x32d490=this[_0x572f5f(0x26b)](_0x4e72a6);if(this[_0x572f5f(0x15f)](_0x32d490)){const _0x131100=_0x572f5f(0x1f0)[_0x572f5f(0xb7)](_0x32d490[_0x572f5f(0x572)]()),_0x4dea36=this[_0x572f5f(0x104)](_0x131100,Sprite),_0x59e6e7=_0x32d490[_0x572f5f(0x819)]();_0x59e6e7!==''?_0x4dea36[_0x572f5f(0x4b4)]=ImageManager[_0x572f5f(0x33b)](_0x59e6e7):_0x4dea36[_0x572f5f(0x4b4)]=ImageManager[_0x572f5f(0x6a2)];const _0x3dda50=this[_0x572f5f(0x38c)](_0x4e72a6);_0x4dea36[_0x572f5f(0x101)]['x']=0.5,_0x4dea36['anchor']['y']=0x1;let _0x1f53eb=Math[_0x572f5f(0x5a7)](_0x3dda50['x']+_0x3dda50[_0x572f5f(0x364)]/0x2)+this[_0x572f5f(0x4eb)];_0x1f53eb+=_0x32d490['getBattlePortraitOffsetX']();let _0x5dfe02=Math[_0x572f5f(0x5a7)](this[_0x572f5f(0x555)]);_0x5dfe02+=_0x32d490[_0x572f5f(0x333)](),_0x4dea36[_0x572f5f(0x28a)](_0x1f53eb,_0x5dfe02);const _0x4ec9c0=VisuMZ[_0x572f5f(0x32d)]['Settings']['BattleLayout'][_0x572f5f(0x3b6)];_0x4dea36[_0x572f5f(0x43f)]['x']=_0x4ec9c0,_0x4dea36[_0x572f5f(0x43f)]['y']=_0x4ec9c0,_0x4dea36['show']();}else{const _0x973c63=this[_0x572f5f(0x535)](_0x4e72a6);this[_0x572f5f(0x149)](_0x32d490,_0x973c63['x'],_0x973c63['y'],_0x973c63[_0x572f5f(0x364)],_0x973c63[_0x572f5f(0x555)]);}},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x104)]=function(_0xfa7f91,_0x202285){const _0x35f015=_0x3f1f6b,_0x56701f=this[_0x35f015(0x320)];if(_0x56701f[_0xfa7f91])return _0x56701f[_0xfa7f91];else{const _0x34b65a=new _0x202285();return _0x56701f[_0xfa7f91]=_0x34b65a,this[_0x35f015(0x2d2)](_0x34b65a),this[_0x35f015(0x2d2)](this[_0x35f015(0x118)]),_0x34b65a;}},Window_BattleStatus[_0x3f1f6b(0x457)]['_createClientArea']=function(){const _0x5eda60=_0x3f1f6b;this[_0x5eda60(0x60e)](),this[_0x5eda60(0x412)](),Window_StatusBase[_0x5eda60(0x457)][_0x5eda60(0x4bb)]['call'](this),this[_0x5eda60(0x365)]();},Window_BattleStatus['prototype'][_0x3f1f6b(0x60e)]=function(){const _0x3e9bd6=_0x3f1f6b;this[_0x3e9bd6(0x118)]=new Sprite(),this['_cursorArea'][_0x3e9bd6(0x141)]=[new PIXI['filters'][(_0x3e9bd6(0xb9))]()],this['_cursorArea']['filterArea']=new Rectangle(),this[_0x3e9bd6(0x118)]['move'](this[_0x3e9bd6(0x3d2)],this[_0x3e9bd6(0x3d2)]),this[_0x3e9bd6(0x69a)](this[_0x3e9bd6(0x118)]);},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x412)]=function(){const _0x46de15=_0x3f1f6b;this[_0x46de15(0x5e8)]=new Sprite(),this[_0x46de15(0x69a)](this[_0x46de15(0x5e8)]);},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x365)]=function(){const _0x2a6e8e=_0x3f1f6b;this[_0x2a6e8e(0x821)]=new Sprite(),this[_0x2a6e8e(0x69a)](this['_damageContainer']);},Window_BattleStatus['prototype'][_0x3f1f6b(0x2b9)]=function(){const _0x2ee45f=_0x3f1f6b;this[_0x2ee45f(0x828)]=new Sprite();for(let _0x2cd0ff=0x0;_0x2cd0ff<0x9;_0x2cd0ff++){this[_0x2ee45f(0x828)][_0x2ee45f(0x69a)](new Sprite());}this[_0x2ee45f(0x118)]['addChild'](this[_0x2ee45f(0x828)]);},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x3e1)]=function(){const _0x4fd547=_0x3f1f6b;Window_StatusBase[_0x4fd547(0x457)][_0x4fd547(0x3e1)]['call'](this),this[_0x4fd547(0x55b)]();},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x55b)]=function(){const _0x2ad761=_0x3f1f6b,_0x36fa80=this['_padding'];this['_cursorArea']['move'](_0x36fa80,_0x36fa80),this[_0x2ad761(0x118)]['x']=_0x36fa80-this[_0x2ad761(0x18d)]['x'],this[_0x2ad761(0x118)]['y']=_0x36fa80-this[_0x2ad761(0x18d)]['y'],this[_0x2ad761(0x749)]>0x0&&this[_0x2ad761(0x650)]>0x0?this[_0x2ad761(0x118)]['visible']=this['isOpen']():this[_0x2ad761(0x118)][_0x2ad761(0xfc)]=![];},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x2af)]=function(){const _0x5ed476=_0x3f1f6b;Window_StatusBase['prototype'][_0x5ed476(0x2af)][_0x5ed476(0x131)](this),this['_updateCursorFilterArea']();},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x2d0)]=function(){const _0x3a570e=_0x3f1f6b,_0x301a4d=this[_0x3a570e(0x118)][_0x3a570e(0x71f)][_0x3a570e(0x2eb)](new Point(0x0,0x0)),_0x29c8b8=this[_0x3a570e(0x118)][_0x3a570e(0x2f8)];_0x29c8b8['x']=_0x301a4d['x']+this[_0x3a570e(0x18d)]['x'],_0x29c8b8['y']=_0x301a4d['y']+this['origin']['y'],_0x29c8b8[_0x3a570e(0x364)]=this[_0x3a570e(0x749)],_0x29c8b8['height']=this[_0x3a570e(0x650)];},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x82c)]=function(_0x42d4dd){const _0x3f0727=_0x3f1f6b;if(this['battleLayoutStyle']()!=='portrait')return;this[_0x3f0727(0x234)](_0x42d4dd[_0x3f0727(0x617)]());},Window_BattleStatus['prototype'][_0x3f1f6b(0x668)]=function(_0x2c8267,_0x2ae0fb){const _0x8929e6=_0x3f1f6b;if(!this[_0x8929e6(0x821)])return;if(!_0x2c8267)return;if(!_0x2ae0fb)return;const _0x4ed4c2=this[_0x8929e6(0x38c)](_0x2ae0fb[_0x8929e6(0x617)]());_0x4ed4c2['x']+=_0x4ed4c2[_0x8929e6(0x364)]/0x2+this['padding'],_0x2c8267['x']=_0x4ed4c2['x'],_0x2c8267['y']=_0x4ed4c2['y'],this[_0x8929e6(0x821)]['addChild'](_0x2c8267);},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x5f4)]=function(_0x24c37c){const _0x2182ed=_0x3f1f6b;if(!this[_0x2182ed(0x821)])return;if(!_0x24c37c)return;this[_0x2182ed(0x821)][_0x2182ed(0x4b5)](_0x24c37c);},Window_BattleStatus['prototype'][_0x3f1f6b(0x155)]=function(){const _0x55fae6=_0x3f1f6b;if(!this['isBorderStylePortraitShown']())return;if(!this[_0x55fae6(0x583)])this[_0x55fae6(0x3c1)]();this[_0x55fae6(0x1c4)](),this['updateBorderSprite']();},Window_BattleStatus['prototype'][_0x3f1f6b(0x1ba)]=function(){const _0x1cbd7c=_0x3f1f6b;if(this[_0x1cbd7c(0x712)]!==Window_BattleStatus)return![];if(!SceneManager['isSceneBattle']())return![];return VisuMZ[_0x1cbd7c(0x32d)][_0x1cbd7c(0x3e9)][_0x1cbd7c(0x24c)][_0x1cbd7c(0xbf)];},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x3c1)]=function(){const _0x725b94=_0x3f1f6b;this[_0x725b94(0x583)]=new Sprite();const _0x48614d=SceneManager['_scene'],_0x16513e=_0x48614d[_0x725b94(0x3a7)][_0x725b94(0x6c5)](_0x48614d[_0x725b94(0x73a)]);_0x48614d['addChildAt'](this[_0x725b94(0x583)],_0x16513e),this[_0x725b94(0x583)][_0x725b94(0x101)]['x']=0.5,this[_0x725b94(0x583)][_0x725b94(0x101)]['y']=0x1;const _0x77fd4d=VisuMZ[_0x725b94(0x32d)][_0x725b94(0x3e9)][_0x725b94(0x24c)]['PortraitScaleBorderStyle'];this['_borderPortraitSprite'][_0x725b94(0x43f)]['x']=_0x77fd4d,this[_0x725b94(0x583)][_0x725b94(0x43f)]['y']=_0x77fd4d,this[_0x725b94(0x583)]['y']=this['y']+this[_0x725b94(0x555)],this[_0x725b94(0x21d)]=0x0;},Window_BattleStatus[_0x3f1f6b(0x457)]['prepareBorderActor']=function(){const _0xfa506e=_0x3f1f6b;this[_0xfa506e(0x583)][_0xfa506e(0xfc)]=BattleManager['isInputting']();const _0x123b72=BattleManager[_0xfa506e(0x26b)]();if(_0x123b72===this['_borderPortraitSprite']['actor'])return;this[_0xfa506e(0x583)][_0xfa506e(0x26b)]=_0x123b72||this[_0xfa506e(0x583)][_0xfa506e(0x26b)];if(!_0x123b72)return;else{if(_0x123b72[_0xfa506e(0x819)]()===''){this[_0xfa506e(0x583)][_0xfa506e(0x4b4)]=ImageManager[_0xfa506e(0x6a2)];return;}else{const _0x3bd1b0=ImageManager['loadPicture'](_0x123b72[_0xfa506e(0x819)]());_0x3bd1b0[_0xfa506e(0x4f3)](this[_0xfa506e(0x683)]['bind'](this,_0x3bd1b0));}}},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x683)]=function(_0x45cf45){const _0x58cb44=_0x3f1f6b;this[_0x58cb44(0x21d)]=0x14,this[_0x58cb44(0x583)][_0x58cb44(0x4b4)]=_0x45cf45;SceneManager[_0x58cb44(0x5bb)][_0x58cb44(0x27c)]()?(this[_0x58cb44(0x583)]['x']=0x0,this['_borderPortraitTargetX']=Math[_0x58cb44(0x312)](_0x45cf45[_0x58cb44(0x364)]/0x2)):(this[_0x58cb44(0x583)]['x']=this[_0x58cb44(0x364)],this[_0x58cb44(0x7f2)]=this[_0x58cb44(0x364)]*0x3/0x4);this[_0x58cb44(0x583)]['opacity']=0x0,this[_0x58cb44(0x583)]['y']=this['y']+this[_0x58cb44(0x555)];const _0x1fe49b=BattleManager[_0x58cb44(0x26b)]();_0x1fe49b&&(this[_0x58cb44(0x7f2)]+=_0x1fe49b['getBattlePortraitOffsetX'](),this[_0x58cb44(0x583)]['y']+=_0x1fe49b[_0x58cb44(0x333)]());},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x701)]=function(){const _0x1b3d93=_0x3f1f6b;if(this['_borderPortraitDuration']>0x0){const _0x14d0c3=this[_0x1b3d93(0x21d)],_0x474d46=this[_0x1b3d93(0x583)];_0x474d46['x']=(_0x474d46['x']*(_0x14d0c3-0x1)+this[_0x1b3d93(0x7f2)])/_0x14d0c3,_0x474d46[_0x1b3d93(0x6de)]=(_0x474d46[_0x1b3d93(0x6de)]*(_0x14d0c3-0x1)+0xff)/_0x14d0c3,this[_0x1b3d93(0x21d)]--;}},Window_BattleStatus[_0x3f1f6b(0x457)][_0x3f1f6b(0x115)]=function(){const _0x560622=_0x3f1f6b;return;this[_0x560622(0x5e8)]&&(this['_effectsContainer']['x']=this['x'],this[_0x560622(0x5e8)]['y']=this['y']),this[_0x560622(0x821)]&&(this[_0x560622(0x821)]['x']=this['x'],this[_0x560622(0x821)]['y']=this['y']);},Window_BattleActor[_0x3f1f6b(0x457)][_0x3f1f6b(0x1d6)]=function(){const _0x323b40=_0x3f1f6b;return Window_BattleStatus[_0x323b40(0x457)][_0x323b40(0x1d6)][_0x323b40(0x131)](this)&&this[_0x323b40(0x48d)]();},Window_BattleActor[_0x3f1f6b(0x457)][_0x3f1f6b(0x48d)]=function(){const _0x749caa=_0x3f1f6b,_0x54fca7=BattleManager[_0x749caa(0x16f)](),_0x377a17=this[_0x749caa(0x26b)](this[_0x749caa(0x617)]());if(!_0x54fca7)return!![];if(!_0x54fca7['item']())return!![];const _0x32e61a=_0x54fca7[_0x749caa(0x187)]()[_0x749caa(0x4e8)];if(_0x32e61a[_0x749caa(0x7c7)](/<CANNOT TARGET (?:USER|SELF)>/i)){if(_0x377a17===BattleManager[_0x749caa(0x26b)]())return![];}return!![];},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x21f)]=Window_BattleEnemy['prototype']['initialize'],Window_BattleEnemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x138)]=function(_0x37b4d0){const _0x330f4c=_0x3f1f6b;this[_0x330f4c(0x4b0)]=null,VisuMZ[_0x330f4c(0x32d)][_0x330f4c(0x21f)][_0x330f4c(0x131)](this,_0x37b4d0);},Window_BattleEnemy['prototype'][_0x3f1f6b(0x729)]=function(){const _0x1a50d6=_0x3f1f6b;return this[_0x1a50d6(0x706)]();},VisuMZ['BattleCore'][_0x3f1f6b(0x1e5)]=Window_BattleEnemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x12e)],Window_BattleEnemy[_0x3f1f6b(0x457)]['show']=function(){const _0x2c2542=_0x3f1f6b;VisuMZ[_0x2c2542(0x32d)][_0x2c2542(0x1e5)][_0x2c2542(0x131)](this),this['y']=Graphics[_0x2c2542(0x555)]*0xa;},Window_BattleEnemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x830)]=function(){const _0x3943d6=_0x3f1f6b;return $gameTroop['aliveMembers']()[_0x3943d6(0x577)](0x0);},Window_BattleEnemy[_0x3f1f6b(0x457)]['refresh']=function(){const _0x10e8c9=_0x3f1f6b;this[_0x10e8c9(0x3fb)]=this[_0x10e8c9(0x830)](),this['sortEnemies'](),Window_Selectable[_0x10e8c9(0x457)][_0x10e8c9(0x855)][_0x10e8c9(0x131)](this);},Window_BattleEnemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x5a5)]=function(){const _0x54a38c=_0x3f1f6b;this[_0x54a38c(0x3fb)][_0x54a38c(0x73f)]((_0x51c4ff,_0x339c8d)=>{const _0xa7a32d=_0x54a38c;return _0x51c4ff[_0xa7a32d(0x5cb)]()[_0xa7a32d(0x1d7)]===_0x339c8d['battler']()[_0xa7a32d(0x1d7)]?_0x51c4ff[_0xa7a32d(0x5cb)]()[_0xa7a32d(0x47b)]-_0x339c8d[_0xa7a32d(0x5cb)]()[_0xa7a32d(0x47b)]:_0x51c4ff['battler']()[_0xa7a32d(0x1d7)]-_0x339c8d[_0xa7a32d(0x5cb)]()[_0xa7a32d(0x1d7)];}),SceneManager[_0x54a38c(0x468)]()&&this['_enemies']['reverse']();},Window_BattleEnemy['prototype'][_0x3f1f6b(0x6df)]=function(){const _0x1bb0b7=_0x3f1f6b,_0x2686e9=VisuMZ[_0x1bb0b7(0x32d)][_0x1bb0b7(0x3e9)][_0x1bb0b7(0x5c6)];_0x2686e9[_0x1bb0b7(0x601)]?this[_0x1bb0b7(0x1b8)]():this[_0x1bb0b7(0x5e2)]();},Window_BattleEnemy[_0x3f1f6b(0x457)][_0x3f1f6b(0x1b8)]=function(){const _0x45a736=_0x3f1f6b;if(this[_0x45a736(0x4b0)]&&this[_0x45a736(0x3fb)]['includes'](this[_0x45a736(0x4b0)])){const _0x1497a2=this[_0x45a736(0x3fb)][_0x45a736(0x6c5)](this[_0x45a736(0x4b0)]);this[_0x45a736(0x3d9)](_0x1497a2);}else this['autoSelectPriority']();},Window_BattleEnemy['prototype']['autoSelectPriority']=function(){const _0x5a7f47=_0x3f1f6b,_0x4e8a1d=VisuMZ[_0x5a7f47(0x32d)][_0x5a7f47(0x3e9)][_0x5a7f47(0x5c6)];let _0xa0be51=![];$gameSystem[_0x5a7f47(0x3b9)]()?_0xa0be51=_0x4e8a1d[_0x5a7f47(0x757)]:_0xa0be51=_0x4e8a1d[_0x5a7f47(0x2ee)],this['forceSelect'](_0xa0be51?this['maxItems']()-0x1:0x0);},Window_BattleEnemy['prototype']['callOkHandler']=function(){const _0x39aaf8=_0x3f1f6b;Window_Selectable[_0x39aaf8(0x457)][_0x39aaf8(0x190)][_0x39aaf8(0x131)](this),this[_0x39aaf8(0x4b0)]=this[_0x39aaf8(0x36c)]();},Window_BattleItem[_0x3f1f6b(0x457)][_0x3f1f6b(0x354)]=function(_0x43ccd0){const _0x5d784c=_0x3f1f6b;if(!_0x43ccd0)return![];return _0x43ccd0[_0x5d784c(0x645)]===0x0||_0x43ccd0[_0x5d784c(0x645)]===0x1;};function Window_AutoBattleCancel(){this['initialize'](...arguments);}Window_AutoBattleCancel[_0x3f1f6b(0x457)]=Object[_0x3f1f6b(0x325)](Window_Base[_0x3f1f6b(0x457)]),Window_AutoBattleCancel[_0x3f1f6b(0x457)][_0x3f1f6b(0x712)]=Window_AutoBattleCancel,Window_AutoBattleCancel['prototype'][_0x3f1f6b(0x138)]=function(_0x114d71){const _0x33f718=_0x3f1f6b;Window_Base[_0x33f718(0x457)][_0x33f718(0x138)]['call'](this,_0x114d71),this[_0x33f718(0x256)](this[_0x33f718(0x377)]()),this[_0x33f718(0x855)]();},Window_AutoBattleCancel['prototype'][_0x3f1f6b(0x377)]=function(){const _0x541b3f=_0x3f1f6b;return VisuMZ[_0x541b3f(0x32d)][_0x541b3f(0x3e9)]['AutoBattle'][_0x541b3f(0x36a)];},Window_AutoBattleCancel[_0x3f1f6b(0x457)][_0x3f1f6b(0x855)]=function(){const _0x2abc33=_0x3f1f6b;this[_0x2abc33(0x2cb)][_0x2abc33(0xae)]();const _0x1b44a5=VisuMZ[_0x2abc33(0x32d)][_0x2abc33(0x3e9)][_0x2abc33(0x6be)]['AutoBattleMsg'],_0x39e157=_0x1b44a5['format'](this[_0x2abc33(0x10e)](),this[_0x2abc33(0x1ca)]()),_0x5aa40f=this[_0x2abc33(0x13c)](_0x39e157)[_0x2abc33(0x364)],_0x50e361=Math[_0x2abc33(0x53b)]((this[_0x2abc33(0x749)]-_0x5aa40f)/0x2);this[_0x2abc33(0x29f)](_0x39e157,_0x50e361,0x0,_0x5aa40f);},Window_AutoBattleCancel[_0x3f1f6b(0x457)][_0x3f1f6b(0x10e)]=function(){const _0x120143=_0x3f1f6b;return Imported[_0x120143(0x147)]?TextManager[_0x120143(0x2df)]('ok'):VisuMZ['BattleCore']['Settings']['AutoBattle']['AutoBattleOK'];},Window_AutoBattleCancel[_0x3f1f6b(0x457)][_0x3f1f6b(0x1ca)]=function(){const _0x20469c=_0x3f1f6b;return Imported[_0x20469c(0x147)]?TextManager[_0x20469c(0x2df)](_0x20469c(0x3da)):VisuMZ[_0x20469c(0x32d)][_0x20469c(0x3e9)]['AutoBattle'][_0x20469c(0x64d)];},Window_AutoBattleCancel[_0x3f1f6b(0x457)]['update']=function(){const _0x5ea19c=_0x3f1f6b;Window_Base[_0x5ea19c(0x457)][_0x5ea19c(0x5f1)][_0x5ea19c(0x131)](this),this[_0x5ea19c(0x348)](),this[_0x5ea19c(0x314)]();},Window_AutoBattleCancel[_0x3f1f6b(0x457)][_0x3f1f6b(0x348)]=function(){const _0x567eb6=_0x3f1f6b;this[_0x567eb6(0xfc)]=BattleManager[_0x567eb6(0x3ce)];},Window_AutoBattleCancel[_0x3f1f6b(0x457)][_0x3f1f6b(0x314)]=function(){const _0x4bb3b6=_0x3f1f6b;if(!BattleManager['_autoBattle'])return;(Input[_0x4bb3b6(0x2ef)]('ok')||Input[_0x4bb3b6(0x2ef)](_0x4bb3b6(0x3da))||TouchInput[_0x4bb3b6(0x5d8)]()||TouchInput['isCancelled']())&&(SoundManager[_0x4bb3b6(0x35e)](),BattleManager[_0x4bb3b6(0x3ce)]=![],Input['clear'](),TouchInput[_0x4bb3b6(0xae)]());};function Window_EnemyName(){const _0x1273d6=_0x3f1f6b;this[_0x1273d6(0x138)](...arguments);}Window_EnemyName[_0x3f1f6b(0x457)]=Object[_0x3f1f6b(0x325)](Window_Base[_0x3f1f6b(0x457)]),Window_EnemyName[_0x3f1f6b(0x457)][_0x3f1f6b(0x712)]=Window_EnemyName,Window_EnemyName[_0x3f1f6b(0x457)][_0x3f1f6b(0x138)]=function(_0x1725ed){const _0x2bc043=_0x3f1f6b;this[_0x2bc043(0x2d8)]=_0x1725ed,this['_text']='';const _0x37a41d=new Rectangle(0x0,0x0,Graphics['boxWidth'],this[_0x2bc043(0x556)]()*0x4);Window_Base[_0x2bc043(0x457)][_0x2bc043(0x138)][_0x2bc043(0x131)](this,_0x37a41d),this['setBackgroundType'](0x2),this['contentsOpacity']=0x0;},Window_EnemyName[_0x3f1f6b(0x457)][_0x3f1f6b(0x283)]=function(){const _0x430439=_0x3f1f6b;this[_0x430439(0x4eb)]=0x0;},Window_EnemyName[_0x3f1f6b(0x457)][_0x3f1f6b(0x36c)]=function(){const _0x31a1ef=_0x3f1f6b;return $gameTroop['members']()[this[_0x31a1ef(0x2d8)]];},Window_EnemyName[_0x3f1f6b(0x457)][_0x3f1f6b(0x5f1)]=function(){const _0x1b7088=_0x3f1f6b;Window_Base['prototype'][_0x1b7088(0x5f1)][_0x1b7088(0x131)](this);if(this[_0x1b7088(0x36c)]()&&this[_0x1b7088(0x36c)]()[_0x1b7088(0x528)]()!==this[_0x1b7088(0x54f)])this[_0x1b7088(0x855)]();this[_0x1b7088(0x6c1)](),this[_0x1b7088(0x13f)]();},Window_EnemyName['prototype']['updateOpacity']=function(){const _0x5bffec=_0x3f1f6b;if(!this[_0x5bffec(0x36c)]()){if(this[_0x5bffec(0xd8)]>0x0)this[_0x5bffec(0xd8)]-=0x10;}else{if(this['enemy']()[_0x5bffec(0x641)]()){if(this[_0x5bffec(0xd8)]>0x0)this[_0x5bffec(0xd8)]-=0x10;}else{if(SceneManager[_0x5bffec(0x5bb)]['_enemyWindow']&&SceneManager[_0x5bffec(0x5bb)][_0x5bffec(0x647)][_0x5bffec(0x4e3)]&&SceneManager[_0x5bffec(0x5bb)][_0x5bffec(0x647)][_0x5bffec(0x3fb)][_0x5bffec(0x354)](this[_0x5bffec(0x36c)]())){if(this[_0x5bffec(0xd8)]<0xff)this[_0x5bffec(0xd8)]+=0x10;}else this[_0x5bffec(0xd8)]>0x0&&(this['contentsOpacity']-=0x10);}}},Window_EnemyName[_0x3f1f6b(0x457)][_0x3f1f6b(0x13f)]=function(){const _0x4ff981=_0x3f1f6b;if(!this['enemy']())return;SceneManager[_0x4ff981(0x468)]()?this['x']=Graphics['boxWidth']-this[_0x4ff981(0x36c)]()['battler']()[_0x4ff981(0x1d7)]:this['x']=this['enemy']()[_0x4ff981(0x5cb)]()['_baseX'];this['x']-=Math[_0x4ff981(0x5a7)](this['width']/0x2),this['y']=this['enemy']()['battler']()[_0x4ff981(0x47b)]-Math[_0x4ff981(0x5a7)](this['lineHeight']()*1.5);const _0x56454b=VisuMZ[_0x4ff981(0x32d)][_0x4ff981(0x3e9)][_0x4ff981(0x5c6)];this['x']+=_0x56454b[_0x4ff981(0x4a6)]||0x0,this['y']+=_0x56454b[_0x4ff981(0x715)]||0x0;},Window_EnemyName[_0x3f1f6b(0x457)][_0x3f1f6b(0xd3)]=function(){const _0x54b3c6=_0x3f1f6b;Window_Base['prototype'][_0x54b3c6(0xd3)][_0x54b3c6(0x131)](this),this[_0x54b3c6(0x2cb)]['fontSize']=VisuMZ[_0x54b3c6(0x32d)][_0x54b3c6(0x3e9)][_0x54b3c6(0x5c6)]['NameFontSize'];},Window_EnemyName['prototype'][_0x3f1f6b(0x855)]=function(){const _0x1a52c7=_0x3f1f6b;this[_0x1a52c7(0x2cb)]['clear']();if(!this[_0x1a52c7(0x36c)]())return;this[_0x1a52c7(0x54f)]=this[_0x1a52c7(0x36c)]()[_0x1a52c7(0x528)]();const _0x45dab0=this[_0x1a52c7(0x13c)](this[_0x1a52c7(0x54f)])['width'],_0x27816e=Math[_0x1a52c7(0x5a7)]((this[_0x1a52c7(0x749)]-_0x45dab0)/0x2);this[_0x1a52c7(0x29f)](this[_0x1a52c7(0x54f)],_0x27816e,0x0,_0x45dab0+0x8);},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x604)]=function(){const _0x51c27f=_0x3f1f6b;return VisuMZ[_0x51c27f(0x32d)][_0x51c27f(0x3e9)][_0x51c27f(0x2ac)][_0x51c27f(0x199)];},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x7fe)]=function(){const _0x1aa01e=_0x3f1f6b;return VisuMZ[_0x1aa01e(0x32d)][_0x1aa01e(0x3e9)][_0x1aa01e(0x2ac)][_0x1aa01e(0x304)];},Window_BattleLog['prototype']['backColor']=function(){const _0x4f69fa=_0x3f1f6b;return VisuMZ[_0x4f69fa(0x32d)][_0x4f69fa(0x3e9)][_0x4f69fa(0x2ac)][_0x4f69fa(0x678)];},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x3c6)]=function(){return![];},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x47a)]=function(_0xb7361d,_0x7d04e3){const _0x321ce7=_0x3f1f6b;this['unshift']('actionSplicePoint'),BattleManager['invokeAction'](_0xb7361d,_0x7d04e3),this[_0x321ce7(0x5e7)]();},Window_BattleLog[_0x3f1f6b(0x457)]['actionSplicePoint']=function(){const _0x1ce1fb=_0x3f1f6b;this[_0x1ce1fb(0x5e7)]();},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x547)]=function(_0x242f32){const _0x3bae1b=_0x3f1f6b,_0x4e5ff0=Array[_0x3bae1b(0x457)][_0x3bae1b(0x577)][_0x3bae1b(0x131)](arguments,0x1),_0x45b798={'name':_0x242f32,'params':_0x4e5ff0},_0x56260d=this[_0x3bae1b(0x1d3)][_0x3bae1b(0x255)](_0x27d557=>_0x27d557[_0x3bae1b(0x528)])[_0x3bae1b(0x6c5)](_0x3bae1b(0x2ed));_0x56260d>=0x0?this[_0x3bae1b(0x1d3)][_0x3bae1b(0x227)](_0x56260d,0x0,_0x45b798):this[_0x3bae1b(0x1d3)][_0x3bae1b(0x547)](_0x45b798);},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x4b3)]=function(_0x4d36d8){const _0x4d0e93=_0x3f1f6b,_0x226945=Array['prototype'][_0x4d0e93(0x577)][_0x4d0e93(0x131)](arguments,0x1);this[_0x4d0e93(0x1d3)][_0x4d0e93(0x4b3)]({'name':_0x4d36d8,'params':_0x226945});},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x6ff)]=function(){const _0x279967=_0x3f1f6b;if(!$gameTemp[_0x279967(0x82e)]())return;console[_0x279967(0x562)](this[_0x279967(0x1d3)][_0x279967(0x255)](_0x1cf5ce=>_0x1cf5ce[_0x279967(0x528)])[_0x279967(0x150)]('\x0a'));},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x37a)]=Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x855)],Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x855)]=function(){const _0x140e0c=_0x3f1f6b;this[_0x140e0c(0xb3)]=!![];},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x71a)]=Window_BattleLog['prototype'][_0x3f1f6b(0x5f1)],Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x5f1)]=function(){const _0x1d1c3d=_0x3f1f6b;VisuMZ[_0x1d1c3d(0x32d)][_0x1d1c3d(0x71a)][_0x1d1c3d(0x131)](this);if(this[_0x1d1c3d(0xb3)])this[_0x1d1c3d(0x6ac)]();},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x6ac)]=function(){const _0x4f3904=_0x3f1f6b;this[_0x4f3904(0xb3)]=![],VisuMZ[_0x4f3904(0x32d)]['Window_BattleLog_refresh']['call'](this);},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x5cf)]=function(_0x7dd6c5){const _0x292252=_0x3f1f6b;let _0x31fc04=VisuMZ[_0x292252(0x32d)][_0x292252(0x3e9)]['BattleLog']['TextAlign'][_0x292252(0x61d)]()[_0x292252(0x6da)](),_0xaf23dc=this[_0x292252(0x654)][_0x7dd6c5];if(_0xaf23dc[_0x292252(0x7c7)](/<LEFT>/i))_0x31fc04=_0x292252(0x5aa);else{if(_0xaf23dc[_0x292252(0x7c7)](/<CENTER>/i))_0x31fc04=_0x292252(0x1e4);else _0xaf23dc[_0x292252(0x7c7)](/<RIGHT>/i)&&(_0x31fc04=_0x292252(0x3f8));}_0xaf23dc=_0xaf23dc[_0x292252(0x669)](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0xaf23dc=_0xaf23dc[_0x292252(0x669)](/\\I\[0\]/gi,'');const _0xa8cdc2=this['lineRect'](_0x7dd6c5);this[_0x292252(0x2cb)][_0x292252(0x3df)](_0xa8cdc2['x'],_0xa8cdc2['y'],_0xa8cdc2[_0x292252(0x364)],_0xa8cdc2[_0x292252(0x555)]);const _0x2eac96=this[_0x292252(0x13c)](_0xaf23dc)[_0x292252(0x364)];let _0xd34666=_0xa8cdc2['x'];if(_0x31fc04===_0x292252(0x1e4))_0xd34666+=(_0xa8cdc2['width']-_0x2eac96)/0x2;else _0x31fc04===_0x292252(0x3f8)&&(_0xd34666+=_0xa8cdc2[_0x292252(0x364)]-_0x2eac96);this[_0x292252(0x29f)](_0xaf23dc,_0xd34666,_0xa8cdc2['y'],_0x2eac96+0x8);},Window_BattleLog['prototype'][_0x3f1f6b(0x748)]=function(_0x2d3259){const _0x3c040b=_0x3f1f6b;this[_0x3c040b(0x654)][_0x3c040b(0x547)](_0x2d3259),this[_0x3c040b(0x855)](),this[_0x3c040b(0x5e7)]();},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x352)]=function(){const _0xd537d7=_0x3f1f6b;let _0x1ee48f=![];switch(this[_0xd537d7(0x619)]){case'effect':_0x1ee48f=this[_0xd537d7(0x1b3)][_0xd537d7(0x4cb)]();break;case _0xd537d7(0x6a8):_0x1ee48f=this[_0xd537d7(0x1b3)][_0xd537d7(0x34c)]();break;case _0xd537d7(0x2e6):_0x1ee48f=this[_0xd537d7(0x1b3)][_0xd537d7(0x5c1)]();break;case _0xd537d7(0x538):_0x1ee48f=this[_0xd537d7(0x1b3)]['isAnyoneFloating']();break;case _0xd537d7(0x2bd):_0x1ee48f=this['_spriteset'][_0xd537d7(0x2d9)]();break;case'opacity':_0x1ee48f=this['_spriteset']['isAnyoneChangingOpacity']();break;}return!_0x1ee48f&&(this[_0xd537d7(0x619)]=''),_0x1ee48f;},Window_BattleLog['prototype'][_0x3f1f6b(0x66d)]=function(){const _0x36be91=_0x3f1f6b;this[_0x36be91(0x46b)](_0x36be91(0x2e6));},Window_BattleLog['prototype'][_0x3f1f6b(0x800)]=function(){const _0x533a6a=_0x3f1f6b;this[_0x533a6a(0x46b)]('float');},Window_BattleLog[_0x3f1f6b(0x457)]['waitForJump']=function(){const _0x22a2f2=_0x3f1f6b;this[_0x22a2f2(0x46b)](_0x22a2f2(0x2bd));},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x5d2)]=function(){const _0x2430e3=_0x3f1f6b;this['setWaitMode'](_0x2430e3(0x6de));},Window_BattleLog[_0x3f1f6b(0x457)]['startTurn']=function(){const _0x431d3c=_0x3f1f6b,_0x9209a7=VisuMZ['BattleCore']['Settings'][_0x431d3c(0x2ac)];if(!_0x9209a7[_0x431d3c(0x7b8)])return;this[_0x431d3c(0x547)](_0x431d3c(0x748),_0x9209a7[_0x431d3c(0x17b)][_0x431d3c(0xb7)]($gameTroop[_0x431d3c(0x344)]())),this[_0x431d3c(0x547)]('waitCount',_0x9209a7[_0x431d3c(0x35a)]),this[_0x431d3c(0x547)]('clear');},Window_BattleLog['prototype'][_0x3f1f6b(0x476)]=function(_0x3992c2,_0x37a13e,_0x21459c){const _0x553ed3=_0x3f1f6b;this[_0x553ed3(0x542)](_0x37a13e)?BattleManager[_0x553ed3(0xc0)]():this[_0x553ed3(0x76a)](_0x3992c2,_0x37a13e,_0x21459c);},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x542)]=function(_0x4d6cde){const _0x26e8c5=_0x3f1f6b;if(!SceneManager[_0x26e8c5(0x497)]())return![];if(!_0x4d6cde)return![];if(!_0x4d6cde[_0x26e8c5(0x187)]())return![];if(_0x4d6cde[_0x26e8c5(0x187)]()[_0x26e8c5(0x4e8)][_0x26e8c5(0x7c7)](/<CUSTOM ACTION SEQUENCE>/i))return!![];if(DataManager[_0x26e8c5(0xf1)](_0x4d6cde[_0x26e8c5(0x187)]()))return!![];return![];},Window_BattleLog[_0x3f1f6b(0x457)]['usePremadeActionSequence']=function(_0x364ebe,_0x187c82,_0x1c53fe){const _0x2e7960=_0x3f1f6b,_0x1b165f=_0x187c82['item']();this[_0x2e7960(0x676)](_0x364ebe,_0x187c82,_0x1c53fe),this[_0x2e7960(0x451)](_0x364ebe,_0x187c82,_0x1c53fe),this[_0x2e7960(0x309)](_0x364ebe,_0x187c82,_0x1c53fe);},Window_BattleLog['prototype'][_0x3f1f6b(0x28f)]=function(_0x324e4b,_0x3d33ee){const _0x2f73d6=_0x3f1f6b,_0x5d136f=VisuMZ[_0x2f73d6(0x32d)][_0x2f73d6(0x3e9)][_0x2f73d6(0x2ac)];_0x5d136f[_0x2f73d6(0x485)]&&this[_0x2f73d6(0x547)](_0x2f73d6(0x748),_0x2f73d6(0xc5)[_0x2f73d6(0xb7)](DataManager[_0x2f73d6(0x7cc)](_0x3d33ee)));if(DataManager['isSkill'](_0x3d33ee)){if(_0x5d136f[_0x2f73d6(0x168)])this['displayItemMessage'](_0x3d33ee['message1'],_0x324e4b,_0x3d33ee);if(_0x5d136f[_0x2f73d6(0x7be)])this[_0x2f73d6(0xb1)](_0x3d33ee[_0x2f73d6(0x63b)],_0x324e4b,_0x3d33ee);}else{if(_0x5d136f[_0x2f73d6(0x2c0)])this[_0x2f73d6(0xb1)](TextManager[_0x2f73d6(0x7b6)],_0x324e4b,_0x3d33ee);}},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x676)]=function(_0x4ffd89,_0x3b673e,_0x2e8abd){const _0x4b26c9=_0x3f1f6b,_0x5a2445=_0x3b673e[_0x4b26c9(0x187)]();this['displayAction'](_0x4ffd89,_0x5a2445),this['push'](_0x4b26c9(0x27f),_0x4ffd89,_0x2e8abd,!![]),this[_0x4b26c9(0x547)](_0x4b26c9(0x6a1),_0x4ffd89,_0x3b673e),this[_0x4b26c9(0x547)](_0x4b26c9(0x338)),this[_0x4b26c9(0x547)]('performCastAnimation',_0x4ffd89,_0x3b673e),this[_0x4b26c9(0x547)](_0x4b26c9(0x66d));},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x451)]=function(_0x3c2a4e,_0x4e0e13,_0x23d9c2){const _0x5c343e=_0x3f1f6b;if(this['isMeleeSingleTargetAction'](_0x4e0e13))this[_0x5c343e(0x203)](_0x3c2a4e,_0x4e0e13,_0x23d9c2);else{if(this['isMeleeMultiTargetAction'](_0x4e0e13))this['autoMeleeMultiTargetActionSet'](_0x3c2a4e,_0x4e0e13,_0x23d9c2);else _0x4e0e13[_0x5c343e(0x393)]()?this[_0x5c343e(0x663)](_0x3c2a4e,_0x4e0e13,_0x23d9c2):this[_0x5c343e(0x69f)](_0x3c2a4e,_0x4e0e13,_0x23d9c2);}},Window_BattleLog['prototype'][_0x3f1f6b(0x4a4)]=function(_0x15ad3a){const _0x3912a9=_0x3f1f6b;if(!_0x15ad3a[_0x3912a9(0xce)]())return![];if(!_0x15ad3a[_0x3912a9(0xe5)]())return![];if(!_0x15ad3a[_0x3912a9(0x6ae)]())return![];return VisuMZ[_0x3912a9(0x32d)]['Settings'][_0x3912a9(0x694)][_0x3912a9(0x73b)];},Window_BattleLog['prototype']['autoMeleeSingleTargetActionSet']=function(_0x2ac8a0,_0x3ae363,_0x43574a){const _0x1ee2d1=_0x3f1f6b,_0x4bca80=_0x2ac8a0[_0x1ee2d1(0x4f9)]()[_0x1ee2d1(0x773)]<0x2,_0x1bcb90=0x14,_0x2d28e6=0x30;_0x4bca80&&(this['push'](_0x1ee2d1(0xd4),[_0x2ac8a0],_0x2d28e6,_0x1bcb90),this[_0x1ee2d1(0x547)](_0x1ee2d1(0x690),_0x2ac8a0,_0x43574a,_0x1ee2d1(0x4f6),_0x1bcb90,!![],_0x1ee2d1(0x60f),!![]),this['push'](_0x1ee2d1(0xfb),[_0x2ac8a0],_0x1ee2d1(0x464)),this[_0x1ee2d1(0x547)]('waitForMovement'));let _0x6f4171=_0x3ae363[_0x1ee2d1(0x45a)]()?this[_0x1ee2d1(0x7d1)](_0x2ac8a0):0x1;for(let _0x1fd9ef=0x0;_0x1fd9ef<_0x6f4171;_0x1fd9ef++){_0x3ae363[_0x1ee2d1(0x45a)]()&&_0x2ac8a0['isActor']()&&this[_0x1ee2d1(0x547)]('setActiveWeaponSet',_0x2ac8a0,_0x1fd9ef),_0x3ae363[_0x1ee2d1(0x187)]()[_0x1ee2d1(0x406)]<0x0?this['targetActionSet'](_0x2ac8a0,_0x3ae363,_0x43574a):this[_0x1ee2d1(0x69f)](_0x2ac8a0,_0x3ae363,_0x43574a);}_0x3ae363[_0x1ee2d1(0x45a)]()&&_0x2ac8a0[_0x1ee2d1(0x72a)]()&&this['push']('clearActiveWeaponSet',_0x2ac8a0);this[_0x1ee2d1(0x547)](_0x1ee2d1(0x27f),_0x2ac8a0,_0x43574a,![]);if(_0x4bca80){const _0x34312c=_0x2ac8a0[_0x1ee2d1(0x5cb)]();this['push'](_0x1ee2d1(0xd4),[_0x2ac8a0],_0x2d28e6,_0x1bcb90),this['push'](_0x1ee2d1(0x18f),_0x2ac8a0,_0x34312c[_0x1ee2d1(0x3ef)],_0x34312c[_0x1ee2d1(0x733)],_0x1bcb90,![],_0x1ee2d1(0x60f)),this['push'](_0x1ee2d1(0xfb),[_0x2ac8a0],_0x1ee2d1(0x124)),this[_0x1ee2d1(0x547)](_0x1ee2d1(0x338)),this['push'](_0x1ee2d1(0xfb),[_0x2ac8a0],_0x1ee2d1(0x464));}},Window_BattleLog[_0x3f1f6b(0x457)]['isMeleeMultiTargetAction']=function(_0x145d53){const _0x482aea=_0x3f1f6b;if(!_0x145d53[_0x482aea(0xce)]())return![];if(!_0x145d53[_0x482aea(0x413)]())return![];if(!_0x145d53[_0x482aea(0x6ae)]())return![];return VisuMZ[_0x482aea(0x32d)][_0x482aea(0x3e9)][_0x482aea(0x694)]['AutoMeleeAoE'];},Window_BattleLog[_0x3f1f6b(0x457)]['autoMeleeMultiTargetActionSet']=function(_0x24f8b8,_0xe2d233,_0x4e3f03){const _0x351421=_0x3f1f6b,_0x2af653=_0x24f8b8[_0x351421(0x4f9)]()[_0x351421(0x773)]<0x2,_0x4635ef=0x14,_0x59c1db=0x30;_0x2af653&&(this[_0x351421(0x547)](_0x351421(0xd4),[_0x24f8b8],_0x59c1db,_0x4635ef),this[_0x351421(0x547)](_0x351421(0x690),_0x24f8b8,_0x4e3f03,_0x351421(0x196),_0x4635ef,!![],'Linear',!![]),this['push'](_0x351421(0xfb),[_0x24f8b8],_0x351421(0x464)),this[_0x351421(0x547)](_0x351421(0x338)));let _0x4369d4=_0xe2d233['isAttack']()?this[_0x351421(0x7d1)](_0x24f8b8):0x1;for(let _0x22250b=0x0;_0x22250b<_0x4369d4;_0x22250b++){_0xe2d233[_0x351421(0x45a)]()&&_0x24f8b8[_0x351421(0x72a)]()&&this[_0x351421(0x547)](_0x351421(0x107),_0x24f8b8,_0x22250b),this[_0x351421(0x69f)](_0x24f8b8,_0xe2d233,_0x4e3f03);}_0xe2d233[_0x351421(0x45a)]()&&_0x24f8b8[_0x351421(0x72a)]()&&this[_0x351421(0x547)]('clearActiveWeaponSet',_0x24f8b8);this[_0x351421(0x547)](_0x351421(0x27f),_0x24f8b8,_0x4e3f03,![]);if(_0x2af653){const _0x4ce851=_0x24f8b8['battler']();this[_0x351421(0x547)](_0x351421(0xd4),[_0x24f8b8],_0x59c1db,_0x4635ef),this[_0x351421(0x547)](_0x351421(0x18f),_0x24f8b8,_0x4ce851[_0x351421(0x3ef)],_0x4ce851[_0x351421(0x733)],_0x4635ef,![],_0x351421(0x60f)),this[_0x351421(0x547)]('requestMotion',[_0x24f8b8],_0x351421(0x124)),this['push'](_0x351421(0x338)),this[_0x351421(0x547)](_0x351421(0xfb),[_0x24f8b8],_0x351421(0x464));}},Window_BattleLog[_0x3f1f6b(0x457)]['targetActionSet']=function(_0x1d6be5,_0x172ca2,_0x515833){const _0x49ed7a=_0x3f1f6b,_0x376ab1=_0x172ca2[_0x49ed7a(0x187)]();for(const _0x3660a6 of _0x515833){if(!_0x3660a6)continue;this[_0x49ed7a(0x547)](_0x49ed7a(0x6d7),_0x1d6be5,_0x172ca2),this['push'](_0x49ed7a(0x1e3),Sprite_Battler['_motionSpeed']),this[_0x49ed7a(0x547)](_0x49ed7a(0x629),_0x1d6be5,[_0x3660a6],_0x376ab1[_0x49ed7a(0x406)]),this[_0x49ed7a(0x547)](_0x49ed7a(0x1e3),0x18),this[_0x49ed7a(0x547)](_0x49ed7a(0x47a),_0x1d6be5,_0x3660a6);}},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x69f)]=function(_0x311330,_0x18aa2f,_0x63a1a9){const _0xe5a516=_0x3f1f6b,_0x235e4b=_0x18aa2f[_0xe5a516(0x187)]();this[_0xe5a516(0x547)](_0xe5a516(0x6d7),_0x311330,_0x18aa2f),this[_0xe5a516(0x547)](_0xe5a516(0x1e3),Sprite_Battler[_0xe5a516(0x29e)]),this[_0xe5a516(0x547)]('showAnimation',_0x311330,_0x63a1a9[_0xe5a516(0x56f)](),_0x235e4b[_0xe5a516(0x406)]),this[_0xe5a516(0x547)]('waitForAnimation');for(const _0x569724 of _0x63a1a9){if(!_0x569724)continue;this[_0xe5a516(0x547)](_0xe5a516(0x47a),_0x311330,_0x569724);}},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x309)]=function(_0x536345,_0x3e8e56,_0xeabd4d){const _0x406be4=_0x3f1f6b,_0x3663f4=_0x3e8e56[_0x406be4(0x187)]();this[_0x406be4(0x547)](_0x406be4(0x27f),_0x536345,_0xeabd4d,![]),this[_0x406be4(0x547)](_0x406be4(0x4ff)),this[_0x406be4(0x547)](_0x406be4(0x258)),this['push']('clear'),this[_0x406be4(0x547)](_0x406be4(0x48f),_0x536345),this[_0x406be4(0x547)]('waitForMovement');},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x69b)]=function(_0x393422){},VisuMZ['BattleCore'][_0x3f1f6b(0x7df)]=Window_BattleLog['prototype'][_0x3f1f6b(0x380)],Window_BattleLog[_0x3f1f6b(0x457)]['displayCurrentState']=function(_0x19850b){const _0x1e0be1=_0x3f1f6b;if(!VisuMZ['BattleCore'][_0x1e0be1(0x3e9)][_0x1e0be1(0x2ac)]['ShowCurrentState'])return;VisuMZ['BattleCore'][_0x1e0be1(0x7df)][_0x1e0be1(0x131)](this,_0x19850b);},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x58a)]=function(_0x3148ba){const _0x3f744a=_0x3f1f6b;this[_0x3f744a(0x547)](_0x3f744a(0x512),_0x3148ba);VisuMZ['BattleCore'][_0x3f744a(0x3e9)][_0x3f744a(0x694)]['CounterPlayback']&&this[_0x3f744a(0x547)](_0x3f744a(0x629),_0x3148ba,[BattleManager[_0x3f744a(0x633)]],-0x1);if(!VisuMZ[_0x3f744a(0x32d)][_0x3f744a(0x3e9)][_0x3f744a(0x2ac)][_0x3f744a(0x2de)])return;this[_0x3f744a(0x547)](_0x3f744a(0x748),TextManager[_0x3f744a(0x308)][_0x3f744a(0xb7)](_0x3148ba[_0x3f744a(0x528)]()));},Window_BattleLog[_0x3f1f6b(0x457)]['displayReflection']=function(_0x50fd09){const _0x38435c=_0x3f1f6b;this[_0x38435c(0x547)]('performReflection',_0x50fd09);if(!VisuMZ[_0x38435c(0x32d)]['Settings'][_0x38435c(0x2ac)]['ShowReflect'])return;this['push']('addText',TextManager[_0x38435c(0x4dd)][_0x38435c(0xb7)](_0x50fd09[_0x38435c(0x528)]()));},Window_BattleLog['prototype'][_0x3f1f6b(0x84a)]=function(_0x1218d4,_0x71ecf6){const _0x1a41ed=_0x3f1f6b;if(VisuMZ[_0x1a41ed(0x32d)]['Settings'][_0x1a41ed(0x694)][_0x1a41ed(0x475)]){const _0x4d501e=_0x71ecf6[_0x1a41ed(0x187)]();this[_0x1a41ed(0x547)](_0x1a41ed(0x629),_0x1218d4,[_0x1218d4],_0x4d501e[_0x1a41ed(0x406)]);}},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x11a)]=function(_0xc64652,_0xba9f02){const _0x433add=_0x3f1f6b;this[_0x433add(0x547)](_0x433add(0x596),_0xc64652,_0xba9f02);if(!VisuMZ[_0x433add(0x32d)]['Settings'][_0x433add(0x2ac)][_0x433add(0x184)])return;const _0xd8f23a=_0xc64652[_0x433add(0x528)](),_0x44a961=TextManager[_0x433add(0xc6)][_0x433add(0xb7)](_0xd8f23a,_0xba9f02[_0x433add(0x528)]());this[_0x433add(0x547)](_0x433add(0x748),_0x44a961);},VisuMZ['BattleCore'][_0x3f1f6b(0x732)]=Window_BattleLog['prototype']['displayFailure'],Window_BattleLog[_0x3f1f6b(0x457)]['displayFailure']=function(_0x5ad80d){const _0x2c11d6=_0x3f1f6b;if(!VisuMZ[_0x2c11d6(0x32d)]['Settings'][_0x2c11d6(0x2ac)][_0x2c11d6(0x121)])return;VisuMZ['BattleCore'][_0x2c11d6(0x732)][_0x2c11d6(0x131)](this,_0x5ad80d);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x7d0)]=Window_BattleLog[_0x3f1f6b(0x457)]['displayCritical'],Window_BattleLog['prototype'][_0x3f1f6b(0xfa)]=function(_0x19f92c){const _0x245538=_0x3f1f6b;if(!VisuMZ[_0x245538(0x32d)]['Settings'][_0x245538(0x2ac)][_0x245538(0x6f5)])return;VisuMZ[_0x245538(0x32d)][_0x245538(0x7d0)][_0x245538(0x131)](this,_0x19f92c);},VisuMZ['BattleCore'][_0x3f1f6b(0xc8)]=Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x171)],Window_BattleLog[_0x3f1f6b(0x457)]['displayMiss']=function(_0x2cbd7d){const _0x9e126c=_0x3f1f6b;!VisuMZ['BattleCore'][_0x9e126c(0x3e9)]['BattleLog']['ShowMissEvasion']?this['push']('performMiss',_0x2cbd7d):VisuMZ['BattleCore'][_0x9e126c(0xc8)][_0x9e126c(0x131)](this,_0x2cbd7d);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x2fd)]=Window_BattleLog[_0x3f1f6b(0x457)]['displayEvasion'],Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0xfe)]=function(_0xf55608){const _0x508f3c=_0x3f1f6b;!VisuMZ[_0x508f3c(0x32d)][_0x508f3c(0x3e9)][_0x508f3c(0x2ac)]['ShowMissEvasion']?_0xf55608[_0x508f3c(0x356)]()[_0x508f3c(0x75e)]?this['push'](_0x508f3c(0x524),_0xf55608):this[_0x508f3c(0x547)](_0x508f3c(0x635),_0xf55608):VisuMZ['BattleCore'][_0x508f3c(0x2fd)][_0x508f3c(0x131)](this,_0xf55608);},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x3b7)]=function(_0xf1a6dc){const _0x4d1a82=_0x3f1f6b;_0xf1a6dc[_0x4d1a82(0x356)]()[_0x4d1a82(0x61b)]&&(_0xf1a6dc[_0x4d1a82(0x356)]()['hpDamage']>0x0&&!_0xf1a6dc[_0x4d1a82(0x356)]()[_0x4d1a82(0x6e4)]&&this[_0x4d1a82(0x547)]('performDamage',_0xf1a6dc),_0xf1a6dc[_0x4d1a82(0x356)]()['hpDamage']<0x0&&this[_0x4d1a82(0x547)](_0x4d1a82(0x4e4),_0xf1a6dc),VisuMZ[_0x4d1a82(0x32d)][_0x4d1a82(0x3e9)]['BattleLog'][_0x4d1a82(0x5c0)]&&this[_0x4d1a82(0x547)](_0x4d1a82(0x748),this[_0x4d1a82(0x441)](_0xf1a6dc)));},VisuMZ['BattleCore'][_0x3f1f6b(0x300)]=Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x480)],Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x480)]=function(_0x73acf1){const _0x5a190f=_0x3f1f6b;if(!VisuMZ[_0x5a190f(0x32d)][_0x5a190f(0x3e9)][_0x5a190f(0x2ac)][_0x5a190f(0x6d5)])return;VisuMZ[_0x5a190f(0x32d)]['Window_BattleLog_displayMpDamage'][_0x5a190f(0x131)](this,_0x73acf1);},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x303)]=Window_BattleLog[_0x3f1f6b(0x457)]['displayTpDamage'],Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x812)]=function(_0x5b736a){const _0x1e8d41=_0x3f1f6b;if(!VisuMZ[_0x1e8d41(0x32d)]['Settings']['BattleLog'][_0x1e8d41(0x803)])return;VisuMZ['BattleCore']['Window_BattleLog_displayTpDamage'][_0x1e8d41(0x131)](this,_0x5b736a);},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x220)]=function(_0x52e223){const _0x2e3ca1=_0x3f1f6b,_0x4b9232=_0x52e223['result'](),_0x65ada2=_0x4b9232[_0x2e3ca1(0x307)]();for(const _0x3979d7 of _0x65ada2){const _0x5b3426=_0x52e223[_0x2e3ca1(0x72a)]()?_0x3979d7[_0x2e3ca1(0x50b)]:_0x3979d7[_0x2e3ca1(0x63b)];_0x5b3426&&VisuMZ[_0x2e3ca1(0x32d)][_0x2e3ca1(0x3e9)][_0x2e3ca1(0x2ac)]['ShowAddedState']&&(this[_0x2e3ca1(0x547)](_0x2e3ca1(0x32b)),this['push'](_0x2e3ca1(0x2f4)),this['push']('addText',_0x5b3426[_0x2e3ca1(0xb7)](_0x52e223[_0x2e3ca1(0x528)]())),this[_0x2e3ca1(0x547)](_0x2e3ca1(0x18c))),_0x3979d7['id']===_0x52e223[_0x2e3ca1(0x20e)]()&&this[_0x2e3ca1(0x547)](_0x2e3ca1(0x69d),_0x52e223);}},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x3f2)]=function(_0xb83f99){const _0x174334=_0x3f1f6b;if(!VisuMZ[_0x174334(0x32d)][_0x174334(0x3e9)][_0x174334(0x2ac)][_0x174334(0x342)])return;const _0x314cf2=_0xb83f99[_0x174334(0x356)](),_0x6d588d=_0x314cf2[_0x174334(0xcb)]();for(const _0x4c65d1 of _0x6d588d){_0x4c65d1[_0x174334(0x486)]&&(this[_0x174334(0x547)]('popBaseLine'),this['push']('pushBaseLine'),this[_0x174334(0x547)](_0x174334(0x748),_0x4c65d1[_0x174334(0x486)]['format'](_0xb83f99[_0x174334(0x528)]())),this[_0x174334(0x547)](_0x174334(0x18c)));}},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x6bf)]=function(_0x1513df){const _0x3a6acf=_0x3f1f6b,_0x59b0b8=VisuMZ['BattleCore'][_0x3a6acf(0x3e9)][_0x3a6acf(0x2ac)],_0x36aeac=_0x1513df[_0x3a6acf(0x356)]();if(_0x59b0b8['ShowAddedBuff'])this[_0x3a6acf(0x3cd)](_0x1513df,_0x36aeac['addedBuffs'],TextManager[_0x3a6acf(0x50e)]);if(_0x59b0b8['ShowAddedDebuff'])this['displayBuffs'](_0x1513df,_0x36aeac[_0x3a6acf(0x696)],TextManager[_0x3a6acf(0x24a)]);if(_0x59b0b8[_0x3a6acf(0x273)])this[_0x3a6acf(0x3cd)](_0x1513df,_0x36aeac[_0x3a6acf(0x571)],TextManager[_0x3a6acf(0x671)]);},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x3cd)]=function(_0x551bc3,_0x1c725b,_0x2d4ebc){const _0x295b98=_0x3f1f6b;for(const _0x227fe5 of _0x1c725b){const _0x365506=_0x2d4ebc['format'](_0x551bc3[_0x295b98(0x528)](),TextManager[_0x295b98(0x71b)](_0x227fe5));this[_0x295b98(0x547)](_0x295b98(0x32b)),this[_0x295b98(0x547)](_0x295b98(0x2f4)),this[_0x295b98(0x547)]('addText',_0x365506),this[_0x295b98(0x547)](_0x295b98(0x18c));}},VisuMZ['BattleCore'][_0x3f1f6b(0x72c)]=Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0xae)],Window_BattleLog['prototype']['clear']=function(){const _0x153594=_0x3f1f6b;VisuMZ[_0x153594(0x32d)][_0x153594(0x72c)]['call'](this),this[_0x153594(0x5e7)]();},VisuMZ['BattleCore'][_0x3f1f6b(0x6b4)]=Window_BattleLog['prototype'][_0x3f1f6b(0x2f4)],Window_BattleLog[_0x3f1f6b(0x457)]['pushBaseLine']=function(){const _0x248a60=_0x3f1f6b;VisuMZ[_0x248a60(0x32d)][_0x248a60(0x6b4)][_0x248a60(0x131)](this),this[_0x248a60(0x5e7)]();},VisuMZ['BattleCore'][_0x3f1f6b(0x23e)]=Window_BattleLog['prototype'][_0x3f1f6b(0x32b)],Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x32b)]=function(){const _0x110b3b=_0x3f1f6b;VisuMZ[_0x110b3b(0x32d)][_0x110b3b(0x23e)][_0x110b3b(0x131)](this),this[_0x110b3b(0x855)](),this[_0x110b3b(0x5e7)]();},VisuMZ['BattleCore']['Window_BattleLog_popupDamage']=Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x711)],Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x711)]=function(_0x4174a8){const _0x279307=_0x3f1f6b;VisuMZ[_0x279307(0x32d)][_0x279307(0x83c)][_0x279307(0x131)](this,_0x4174a8),this[_0x279307(0x5e7)]();},Window_BattleLog[_0x3f1f6b(0x457)]['waitForNewLine']=function(){const _0x51d854=_0x3f1f6b;let _0x307291=0x0;this[_0x51d854(0x21c)][_0x51d854(0x135)]>0x0&&(_0x307291=this[_0x51d854(0x21c)][this[_0x51d854(0x21c)][_0x51d854(0x135)]-0x1]),this['_lines'][_0x51d854(0x135)]>_0x307291?this['wait']():this[_0x51d854(0x5e7)]();},VisuMZ[_0x3f1f6b(0x32d)]['Window_BattleLog_performActionStart']=Window_BattleLog[_0x3f1f6b(0x457)]['performActionStart'],Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x6a1)]=function(_0x5c4451,_0x47cd3c){const _0x1dfa2a=_0x3f1f6b;VisuMZ['BattleCore'][_0x1dfa2a(0x26c)][_0x1dfa2a(0x131)](this,_0x5c4451,_0x47cd3c),this[_0x1dfa2a(0x5e7)]();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x77d)]=Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x6d7)],Window_BattleLog['prototype'][_0x3f1f6b(0x6d7)]=function(_0x3e9955,_0x779256){const _0x1de4ad=_0x3f1f6b;VisuMZ[_0x1de4ad(0x32d)][_0x1de4ad(0x77d)]['call'](this,_0x3e9955,_0x779256),this[_0x1de4ad(0x5e7)]();},VisuMZ[_0x3f1f6b(0x32d)]['Window_BattleLog_performActionEnd']=Window_BattleLog['prototype'][_0x3f1f6b(0x48f)],Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x48f)]=function(_0x296be4){const _0x589fed=_0x3f1f6b;VisuMZ['BattleCore'][_0x589fed(0x3cf)][_0x589fed(0x131)](this,_0x296be4);for(const _0x13972f of BattleManager[_0x589fed(0x174)]()){if(!_0x13972f)continue;if(_0x13972f['isDead']())continue;_0x13972f[_0x589fed(0x560)]();}this[_0x589fed(0x5e7)]();},VisuMZ[_0x3f1f6b(0x32d)]['Window_BattleLog_performDamage']=Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x5af)],Window_BattleLog['prototype'][_0x3f1f6b(0x5af)]=function(_0x197a25){const _0x33d759=_0x3f1f6b;VisuMZ['BattleCore'][_0x33d759(0x381)]['call'](this,_0x197a25),this['callNextMethod']();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x582)]=Window_BattleLog['prototype'][_0x3f1f6b(0x56e)],Window_BattleLog['prototype'][_0x3f1f6b(0x56e)]=function(_0x4fde46){const _0x52192=_0x3f1f6b;VisuMZ[_0x52192(0x32d)][_0x52192(0x582)]['call'](this,_0x4fde46),this[_0x52192(0x5e7)]();},VisuMZ['BattleCore'][_0x3f1f6b(0x160)]=Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x4e4)],Window_BattleLog['prototype'][_0x3f1f6b(0x4e4)]=function(_0x5f3d89){const _0x3b8744=_0x3f1f6b;VisuMZ[_0x3b8744(0x32d)][_0x3b8744(0x160)]['call'](this,_0x5f3d89),this[_0x3b8744(0x5e7)]();},VisuMZ['BattleCore'][_0x3f1f6b(0x231)]=Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x524)],Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x524)]=function(_0x294ca6){const _0x5da3d8=_0x3f1f6b;VisuMZ[_0x5da3d8(0x32d)][_0x5da3d8(0x231)][_0x5da3d8(0x131)](this,_0x294ca6),this[_0x5da3d8(0x5e7)]();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x541)]=Window_BattleLog['prototype']['performMagicEvasion'],Window_BattleLog[_0x3f1f6b(0x457)]['performMagicEvasion']=function(_0x860c53){const _0x46a57b=_0x3f1f6b;VisuMZ[_0x46a57b(0x32d)][_0x46a57b(0x541)][_0x46a57b(0x131)](this,_0x860c53),this[_0x46a57b(0x5e7)]();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x799)]=Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x512)],Window_BattleLog[_0x3f1f6b(0x457)]['performCounter']=function(_0x3fe0ee){const _0x569a81=_0x3f1f6b;VisuMZ['BattleCore'][_0x569a81(0x799)][_0x569a81(0x131)](this,_0x3fe0ee),this[_0x569a81(0x5e7)]();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x831)]=Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x31f)],Window_BattleLog['prototype'][_0x3f1f6b(0x31f)]=function(_0x4eb38f){const _0x45b925=_0x3f1f6b;VisuMZ[_0x45b925(0x32d)][_0x45b925(0x831)][_0x45b925(0x131)](this,_0x4eb38f),this[_0x45b925(0x5e7)]();},VisuMZ[_0x3f1f6b(0x32d)][_0x3f1f6b(0x4ba)]=Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x596)],Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x596)]=function(_0x501eae,_0x412714){const _0x40774c=_0x3f1f6b;VisuMZ[_0x40774c(0x32d)][_0x40774c(0x4ba)][_0x40774c(0x131)](this,_0x501eae,_0x412714),this[_0x40774c(0x5e7)]();},VisuMZ['BattleCore'][_0x3f1f6b(0x80f)]=Window_BattleLog[_0x3f1f6b(0x457)]['performCollapse'],Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x69d)]=function(_0x1d3a56){const _0x28441f=_0x3f1f6b;VisuMZ[_0x28441f(0x32d)][_0x28441f(0x80f)][_0x28441f(0x131)](this,_0x1d3a56),this['callNextMethod']();},Window_BattleLog['prototype'][_0x3f1f6b(0x1b4)]=function(_0x153d13,_0x4b523e){const _0x38e56c=_0x3f1f6b;_0x153d13[_0x38e56c(0x1b4)](_0x4b523e),this[_0x38e56c(0x5e7)]();},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x762)]=function(_0x522998,_0x4226c1){const _0x1cd29f=_0x3f1f6b,_0xa895be=_0x522998[_0x1cd29f(0x70e)]();_0xa895be<=0x0?SoundManager[_0x1cd29f(0x4af)]():this['showNormalAnimation'](_0x4226c1,_0xa895be);},Window_BattleLog[_0x3f1f6b(0x457)]['applyImmortal']=function(_0x3e6a58,_0xbc2791,_0xa1cf77){const _0x405662=_0x3f1f6b,_0x3d4d6c=[_0x3e6a58][_0x405662(0x7a0)](_0xbc2791);for(const _0x1ae55f of _0x3d4d6c){if(!_0x1ae55f)continue;_0x1ae55f[_0x405662(0x7c2)](_0xa1cf77);}this[_0x405662(0x5e7)]();},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x1e3)]=function(_0x483754){const _0x346ae6=_0x3f1f6b;this[_0x346ae6(0x151)]=_0x483754;},Window_BattleLog[_0x3f1f6b(0x457)]['requestMotion']=function(_0x58d70a,_0x12bd09){const _0x86218d=_0x3f1f6b;for(const _0x21e59a of _0x58d70a){if(!_0x21e59a)continue;_0x21e59a['requestMotion'](_0x12bd09);}this[_0x86218d(0x5e7)]();},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x18f)]=function(_0x17f6b2,_0x7225b2,_0x7220c1,_0x4da103,_0x34fc38,_0x20f90e){const _0x3c5a19=_0x3f1f6b;_0x17f6b2['moveBattlerToPoint'](_0x7225b2,_0x7220c1,_0x4da103,_0x34fc38,_0x20f90e,-0x1),this[_0x3c5a19(0x5e7)]();},Window_BattleLog[_0x3f1f6b(0x457)][_0x3f1f6b(0x690)]=function(_0x457a59,_0x94857e,_0x2403cb,_0x45d089,_0x36a712,_0x542d03,_0x311234){const _0x224056=_0x3f1f6b,_0x4f1487=Math[_0x224056(0x847)](..._0x94857e['map'](_0x532565=>_0x532565[_0x224056(0x5cb)]()[_0x224056(0x1d7)]-_0x532565['battler']()['mainSpriteWidth']()/0x2)),_0x5dd723=Math['max'](..._0x94857e['map'](_0x243cd4=>_0x243cd4[_0x224056(0x5cb)]()[_0x224056(0x1d7)]+_0x243cd4[_0x224056(0x5cb)]()['mainSpriteWidth']()/0x2)),_0x129b3f=Math[_0x224056(0x847)](..._0x94857e[_0x224056(0x255)](_0x367bea=>_0x367bea['battler']()[_0x224056(0x47b)]-_0x367bea[_0x224056(0x5cb)]()[_0x224056(0x70d)]())),_0x1a2744=Math[_0x224056(0x39f)](..._0x94857e[_0x224056(0x255)](_0x2db4d4=>_0x2db4d4[_0x224056(0x5cb)]()[_0x224056(0x47b)])),_0xb7374=_0x94857e[_0x224056(0x744)](_0x2960bc=>_0x2960bc[_0x224056(0x72a)]())['length'],_0x27f400=_0x94857e[_0x224056(0x744)](_0x33497a=>_0x33497a['isEnemy']())[_0x224056(0x135)];let _0x3329c9=0x0,_0x4f6ddb=0x0;if(_0x2403cb[_0x224056(0x7c7)](/front/i))_0x3329c9=_0xb7374>=_0x27f400?_0x4f1487:_0x5dd723;else{if(_0x2403cb[_0x224056(0x7c7)](/middle/i))_0x3329c9=(_0x4f1487+_0x5dd723)/0x2,_0x311234=-0x1;else _0x2403cb[_0x224056(0x7c7)](/back/i)&&(_0x3329c9=_0xb7374>=_0x27f400?_0x5dd723:_0x4f1487);}if(_0x2403cb['match'](/head/i))_0x4f6ddb=_0x129b3f;else{if(_0x2403cb['match'](/center/i))_0x4f6ddb=(_0x129b3f+_0x1a2744)/0x2;else _0x2403cb[_0x224056(0x7c7)](/base/i)&&(_0x4f6ddb=_0x1a2744);}_0x457a59['moveBattlerToPoint'](_0x3329c9,_0x4f6ddb,_0x45d089,_0x36a712,_0x542d03,_0x311234),this[_0x224056(0x5e7)]();},Window_BattleLog['prototype'][_0x3f1f6b(0xd4)]=function(_0x1a75b8,_0x521a13,_0x1ab6da){for(const _0x2bafd6 of _0x1a75b8){if(!_0x2bafd6)continue;_0x2bafd6['jumpBattler'](_0x521a13,_0x1ab6da);}this['callNextMethod']();};