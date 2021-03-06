//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.16] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
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
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x21ab=['name','_characterName','clearEventCache','push','canPass','PlayerAllow','Step1EventId','DashModifier','square','Game_Player_increaseSteps','processMoveCommandEventsMoveCore','EventLabelRefresh','updateShadow','processDrawIcon','eraseEvent','horizontal\x20mirror','copy','Game_Vehicle_isLandOk','realMoveSpeed','clearStepPattern','note','lastSpawnedEvent','ShipSpeed','firstSpawnedEvent','isRegionForbidPass','processMoveSynchMimic','MoveAllSynchTargets','removeChild','_eventMorphData','isSmartEventCollisionOn','constructor','destinationX','parent','_shadowOpacity','_event','processMoveSynchMirrorHorz','switches','updateVS8BalloonOffsets','Game_Event_refresh','_activationProximity','AutoBuffer','processMoveRouteJumpTo','updateParallel','findDiagonalDirectionTo','Game_Message_add','ARRAYSTRUCT','Game_CharacterBase_updatePattern','EventLocationCreate','Game_Troop_meetsConditionsCPC','distance','backX','random','directionOnLadderSpriteVS8dir','isBoat','VS8','_selfTargetItemChoice','pages','updateText','FontSize','_followerChaseOff','SCREEN','advancedFunc','FollowerID','setMoveSpeed','isSpriteVS8dir','Game_Follower_chaseCharacter','ARRAYJSON','morphInto','string','processMoveRouteSelfVariable','hideShadows','_periodicRefreshTimer','Game_Event_meetsConditionsCPC','hasClickTrigger','SpawnEventDespawnTerrainTags','_eventId','_duration','Window_EventItem_onCancel','OpacitySpeed','ZZZ','variables','includes','isEventOverloaded','setupSpawnTest','setupCopyEvent','_spriteOffsetY','adjustDir8MovementSpeed','right','HURT','_visibleEventY','exit','Visibility','AdvancedVariables','getPlayerDiagonalSetting','events','removeMorph','Game_Player_checkEventTriggerThere','Game_Event_initialize','NOTE','createSpawnedEventWithData','_eventOverloadThreshold','UPPER\x20LEFT','toLowerCase','_addedHitbox','Game_CharacterBase_initMembers','initFollowerController','addChild','meetsCPC','getDirectionFromPoint','hasStepAnime','VehicleAllow','setupPageSettings','Scene_Load_onLoadSuccess','DashEnableToggle','DiagonalSpeedMultiplier','LIGHT\x20BULB','FollowerSetGlobalChase','setupEventsMoveCoreEffects','metCPC','setupEvents','EventId','moveAwayFromCharacter','region','Game_Event_setupPageSettings','FALSE','_eventIconSprite','updatePatternEventsMoveCore','CPCsMet','Game_Event_start','_comments','standing','Spriteset_Map_createShadow','switch1Valid','Game_Switches_setValue','_spawnData','isPosing','destinationY','RegionOk','TemplateName','_EventsMoveCoreSettings','drawing','_chaseOff','2607wfoSNI','direction','RIGHT','zoomScale','splice','_tilemap','filter','_MapSpawnedEventData','Game_CharacterBase_setDirection','PostMorphJS','isSaveEventLocations','isDashingEnabled','mapId','EVAL','Game_Event_checkEventTriggerAuto','_saveEventLocations','BalloonOffsetX','left','turnRight90','_visiblePlayerX','_needsPeriodicRefresh','isActive','updateTilt','setupEventsMoveCoreNotetags','setOpacity','_interpreter','VisuMZ_2_DragonbonesUnion','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Chase','meetsConditions','AutoMoveEvents','reverseDir','Game_Message_setItemChoice','call','match','Game_CharacterBase_moveStraight','createLabelWindowForTarget','autoEventIconBuffer','Game_Character_setMoveRoute','Label','FastForwardKey','list','IconIndex','meetActivationRegionConditions','MapId','deltaY','_eventOverload','processMoveRouteSetIndex','isNearTheScreen','min','pos','opacity','unlockEvent','onLoadSuccess','setupChild','eventsXyNt','Sprite_Balloon_setup','deltaXFrom','getEventIconIndex','smooth','_eventCache','General','_labelWindows','randomInt','findTargetSprite','custom','startMessage','offsetX','length','processMoveRouteStepToPlayer','SwitchId','SLEEP','Game_Vehicle_isMapPassable','restoreSavedEventPosition','689KSNIWb','OFF','default','iconIndex','pluginCommandCallEvent','_cacheVisibility','selfValue','createShadows','update','364901WnKiEI','resetFontSettings','LIGHT-BULB','eventLabelsVisible','processMoveRouteMoveUntilStop','checkRegionEventTrigger','MorphEventTo','setPlayerControlDisable','eventsXy','timer','_commonEventId','Region','morphIntoTemplate','horz\x20mirror','CPC','setValue','HEART','hasAdvancedSwitchVariable','isMoveOnlyRegionPassable','meetActivationProximityConditions','Step1MapId','Self\x20Variable\x20%1','VICTORY','Movement','prepareSpawnedEventAtTerrainTag','isDashDisabled','_filename','Boat','initEventsMoveCoreEffects','_moveSynch','STR','replace','mirror\x20vertical','_shadowGraphic','isDashing','DashingEnable','QUESTION','deleteIconsOnEventsData','executeMove','round','refreshIfNeeded','Game_Follower_initialize','...','updateOpacity','code','FollowerSetControl','PreSpawnJS','down','processMoveRouteStepToCharacter','_labelWindow','Name','Game_Map_parallelCommonEvents','HMPH','jump','Event','dir8','trigger','_callEventMap','EventIconChange','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','updatePosition','_DisablePlayerControl','Game_Interpreter_character','Spriteset_Map_createLowerLayer','OffsetY','despawnRegions','log','padZero','hasCPCs','clearPose','_type','SpawnEventAtRegion','ADDITIVE','ANGER','boxWidth','searchLimit','BULB','PreloadedMaps','text','TRUE','Game_CharacterBase_screenY','ANNOYED','startMapCommonEventOnOKTarget','Game_Map_setupEvents','%1Allow','updatePattern','processMoveRouteAnimation','Value','setImage','Sprite_Balloon_updatePosition','FRUSTRATION','checkEventsMoveCoreStringTags','initEventsMoveCoreSettings','VariableGetSelfVariableID','deleteEventLocation','Collision','startCallEvent','%1Forbid','frameCount','clearPageSettings','bind','moveStraight','Game_Message_setNumberInput','setNumberInput','frontX','WalkForbid','_SavedEventLocations','PlayerMovementDiagonal','_lastPluginCommandInterpreter','PlayerMovementChange','_eventScreenX','mirror\x20vert','IconBufferX','PlayerForbid','boat','LEFT\x20TO\x20RIGHT','getInputDir8','processMoveRouteMoveRepeat','setControlledFollowerID','fontSize','type','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20<Copy\x20Event>\x20usage.','textSizeEx','Game_CharacterBase_hasStepAnime','parameters','away','getPosingCharacterDirection','SPIN\x20ANTICLOCKWISE','Window_ScrollText_startMessage','create','getSelfTarget','EventsMoveCore','Self\x20Switch\x20%1','VehicleForbid','processMoveRouteJumpToCharacter','start','isInVehicle','_characterSprites','value','setDiagonalDirection','Game_CharacterBase_canPass','MapID','some','_forceDashing','setItemChoice','screenY','despawnEverything','updateScale','setDirection','front','fittingHeight','roundY','_target','event','forceMoveRoute','execute','defaultFontSize','EnableDir8','processMoveCommand','Scene_Boot_onDatabaseLoaded','isDestinationValid','pageIndex','shadowY','slice','lineHeight','resizeWindow','isAllowCharacterTilt','isOnRope','conditions','Game_Map_refresh','GetMoveSynchTarget','getLastPluginCommandInterpreter','VisuMZ_Setup_Preload_Map','deletePreservedMorphEventDataKey','canPassDiagonally','767771ihuQhA','characterIndexVS8','drawIcon','createShadow','prepareSpawnedEventAtRegion','delay','TerrainTag','clamp','Game_Switches_value','Sprite_Character_setCharacterBitmap','AutoBalloon','characterPatternYVS8','EventLabelVisible','setupRegionRestrictions','isPassable','Game_Event_findProperPageIndex','meetsSwitchCondition','Game_CharacterBase_update','isSelfSwitch','EXCLAMATION','Game_Event_clearPageSettings','createSaveEventLocationData','increaseSteps','ARRAYNUM','updateMove','blendMode','_spriteset','processMoveRouteStepFrom','_pose','Game_Interpreter_updateWaitMode','forceDashing','isSupportDiagonalMovement','setupSaveEventLocations','onCancel','command108','CallEvent','_diagonalSupport','EnableDashTilt','Game_Map_setup','USER-DEFINED\x205','_lastMovedDirection','requestBalloon','processMoveSynchRandom','_poseDuration','AllForbid','onChange','RegionOkTarget','floor','setSelfValue','unlock','mirror\x20horz','windowPadding','updatePose','126837fkasUL','PostSpawnJS','format','Game_Event_meetsConditions','setPattern','%1%2','terrainTag','SwitchGetSelfSwitchABCD','IconBlendMode','correctFacingDirection','Game_Temp_setDestination','rotation','_scene','_moveRoute','setChaseOff','switchId','BlendMode','roundYWithDirection','_eventLabelOffsetX','UNTITLED','autosaveEventLocation','Game_Event_updateParallel','startMapCommonEventOnOK','_cpc','isAdvancedVariable','erase','_selfTarget','onDatabaseLoaded','Game_Player_getInputDirection','deltaYFrom','isSelfVariable','_PreservedEventMorphData','isAllowEventAutoMovement','COLLAPSE','USER-DEFINED\x203','MUSIC\x20NOTE','follower','moveTowardCharacter','_commonEvents','updateMoveSynch','_alwaysUpdateMove','startMapCommonEventOnTouch','_transparent','Game_CharacterBase_realMoveSpeed','isPassableByAnyDirection','setupSpawnedEvents','Visible','_forceCarrying','ROUTE_SCRIPT','anchor','checkValidEventerMap','checkEventTriggerAuto','isMapPassable','setEventIconDataKey','Window_NumberInput_processOk','Dock','moveAwayFromPoint','USER-DEFINED\x202','prepareSpawnedEventAtXY','_moveRouteIndex','379102QDDIAP','despawnAtXY','moveSynchTarget','loadSystem','roundXWithDirection','visibleRange','characterIndex','TurnInPlaceDelay','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','switch1Id','setBalloonPose','removeTemporaryMapSpawnedEvents','advancedValue','initialize','regionId','_saveEventLocation','Game_CharacterBase_moveDiagonally','vehicle','SuccessSwitchId','characterPatternY','Game_Variables_value','deltaX','_moveOnlyRegions','setDestination','updateShadowChanges','isAirship','deleteSavedEventLocation','SWEAT','max','getDirectionToPoint','_eventSpawnData','setStopFollowerChasing','SILENCE','BoatSpeed','loadDataFile','SPIN\x20ACW','_advancedSwitchVariable','findDirectionTo','_eventPageIndex','convertVariableValuesInScriptCall','isShadowVisible','_pattern','setCharacterBitmap','processMoveRouteStepTo','clearSpriteOffsets','turnTowardPoint','_mapId','roundX','setLastPluginCommandInterpreter','height','_eventCopyData','concat','forceCarrying','bufferY','posEventsMoveCore','_text','_spriteOffsetX','_isObjectCharacter','charAt','_eventLabelOffsetY','setPlayerDiagonalSetting','TiltLeft','turnAwayFromCharacter','LOWER\x20LEFT','map','_eventScreenY','SlowerSpeed','setEventIconData','Game_Interpreter_PluginCommand','itemPadding','processMoveRouteSelfSwitch','canMove','spawnEventId','AdvancedSwitches','_vehicleType','page','Game_Player_checkEventTriggerHere','Walk','SelfSwitchABCD','isNormalPriority','processMoveRoutePatternLock','isSpawnedEvent','executeCommand','Step2EventId','EventLocationDelete','reverse','row','isPlayerControlDisabled','_dragonbones','column','TargetSwitchId','saveEventLocation','EventAutoMovement','ARRAYSTR','moveDiagonally','determineEventOverload','AllAllow','getInputDirection','add','activationProximityDistance','EventForbid','contentsOpacity','checkExistingEntitiesAt','PreMorphJS','onOk','registerCommand','airship','reverse\x20copy','status','turnAwayFromPoint','determineCommonEventsWithCPC','checkNeedForPeriodicRefresh','Game_Troop_meetsConditions','player','setAllowEventAutoMovement','FavorHorz','parallelCommonEvents','Step2MapId','ARRAYEVAL','processMoveRouteTeleportToCharacter','width','updateSelfMovement','Game_SelfSwitches_setValue','updateEventsMoveCoreTagChanges','pattern','Game_Map_update','Operation','Game_Event_event','enable','Toggle','_data','setMoveRoute','DefaultShadow','createSpawnedEvent','dashSpeedModifier','lastSpawnedEventID','Game_Interpreter_executeCommand','PosX','startEncounterEffect','innerWidth','Sprite_Character_setTileBitmap','requestRefresh','KNEEL','setup','USER-DEFINED\x204','_moveSpeed','spawnPreserved','getSavedEventLocation','PreCopyJS','checkActivationProximity','_counter','canStartLocalEvents','Stop','Map%1.json','indexOf','contents','_regionRules','TiltVert','MessageCore','Game_CharacterBase_isDashing','scale','character','setupEventsMoveCoreCommentTags','Window_NumberInput_start','PosY','parse','PreloadMaps','Game_Player_executeMove','isValid','updateWaitMode','target','onClickTrigger','SelfVariables','clear','_eventErased','Game_Map_events','isRunning','description','_needsRefresh','isOnLadder','Game_CharacterBase_characterIndex','moveRouteIndex','isAdvancedSwitch','OperateValues','_EventIcons','Passability','Settings','hasEventIcon','Game_CharacterBase_screenX','Setting','processMoveSynchReverseMimic','turn180','Ship','EventLocationSave','Game_Map_unlockEvent','COBWEB','bitmap','getPosingCharacterIndex','MorphEventRemove','reserveCommonEvent','Game_Vehicle_initMoveSpeed','Sprite_Character_update','processMoveRouteFadeIn','eventId','Player','Template','Sprite_Character_initMembers','processMoveRouteMoveToCharacter','2tPrUpc','PostCopyJS','switch2Id','Game_Enemy_meetsSwitchCondition','isEventTest','activationRegionList','registerSelfTarget','locate','mimic','VehicleDock','isShadowShrink','setupMorphEvent','_CPCs','screenX','isRegionDockable','shadowFilename','processMoveSynchCustom','backY','SelfSwitchID','switch2Valid','processMoveSynchAway','Letter','convertSelfVariableValuesInScriptCall','addLoadListener','CustomPageConditions','SelfSwitches','moveTowardPoint','MULTIPLY','Game_CommonEvent_isActive','PageId','return\x200','FollowerReset','Game_Variables_setValue','iconHeight','prototype','All','checkAdvancedSwitchVariablePresent','TerrainTags','getPreservedMorphEventData','activationProximityType','MUSIC','LOWER\x20RIGHT','createLowerLayer','LineHeight','trim','shiftY','_character','regionList','Game_Map_isDashDisabled','setupSpawn','isStopFollowerChasing','registerSelfEvent','getPosingCharacterPattern','IconBufferY','createContents','CarryPose','Forbid','setDashingEnabled','despawnTerrainTags','isPreventSelfMovement','Game_CharacterBase_increaseSteps','_visiblePlayerY','initMembers','isAnyEventStarting','setTileBitmap','_selfEvent','VariableId','VisibleEventLabels','createCharacterShadow','isSaveEventLocation','jumpHeight','isRegionAllowPass','setupDiagonalSupport','despawnEventId','processMoveRouteTeleportTo','Game_Character_processMoveCommand','getMapSpawnedEventData','loadCPC','Game_Character_forceMoveRoute','iconWidth','moveByInput','isAutoBufferIcon','iconSize','_patternLocked','ship','deleteIconsOnEventsDataKey','NORMAL','processMoveRouteBalloon','_callEventData','Airship','StrictCollision','Game_Event_updateSelfMovement','isEventRunning','WalkAllow','setPose','_spawnedEvents','chaseCharacter','clearSelfTarget','IconSize','BalloonOffsetY','processOk','isSpawnHitboxCollisionOk','_spawnPreserved','Game_CharacterBase_pattern','_erased','isDiagonalDirection','updatePeriodicRefresh','_shadowSprite','isTurnInPlace','lastMovedDirection','labelWindowText','_waitMode','isCollidedWithEvents','FUNC','_followerControlID','opacitySpeed','processMoveRouteFadeOut','processMoveRouteMoveTo','_inputTime','pageId','getControlledFollowerID','Map%1-Event%2','25567LeRrMh','initMoveSpeed','ConvertParams','characterName','mirror\x20horizontal','toUpperCase','_encounterEffectDuration','isDashingAndMoving','checkEventTriggerHere','abs','_clickTrigger','setFrame','Icon','clearDashing','processMoveSynch','offsetY','createLabelWindows','getEventIconData','checkEventTriggerEventsMoveCore','deleteSavedEventLocationKey','spriteId','isPlaytest','findProperPageIndex','variableId','setEventLabelsVisible','Window_Message_startMessage','_activationProximityAutoTriggerBypass','PlayerIconDelete','Game_Map_event','Enable','hasDragonbones','BufferY','needsUpdate','command357','EventTemplates','_screenZoomScale','Window_EventItem_onOk','_stepPattern','_characterIndex','approach','Button','SwitchGetSelfSwitchID','makeDeepCopy','moveForward','createIconSprite','posNt','clearDestination','clearCarrying','executeMoveDir8','Game_SelfSwitches_value','processMoveRouteHugWall','turnLeft90','moveSynchType','Step2Preserve','checkEventTriggerThere','SpawnEventDespawnEverything','_eventIcon','vertical\x20mirror','Game_CharacterBase_direction','isLandOk','_visibleEventX','isLabelVisible','502774hrzIya','EventID','Direction','ITEM','Allow','none','visible','turnTowardCharacter','IconSet','followers','isMoving','template','radius','_pageIndex','disable','processMoveSynchMirrorVert','updateBitmapSmoothing','BitmapSmoothing','_selfTargetNumberInput','refresh','isBattleTest','initEventsMoveCore','_opacity','Game_Player_isMapPassable'];const _0x3f5a=function(_0x23464f,_0x1292de){_0x23464f=_0x23464f-0xb1;let _0x21ab2c=_0x21ab[_0x23464f];return _0x21ab2c;};const _0xbbde9f=_0x3f5a;(function(_0x2460c9,_0x38bf21){const _0x413045=_0x3f5a;while(!![]){try{const _0x4c84be=parseInt(_0x413045(0x3c7))+parseInt(_0x413045(0x2ce))+parseInt(_0x413045(0xd5))+-parseInt(_0x413045(0x290))*-parseInt(_0x413045(0x216))+parseInt(_0x413045(0x146))+parseInt(_0x413045(0x10a))+parseInt(_0x413045(0x374))*-parseInt(_0x413045(0x3be));if(_0x4c84be===_0x38bf21)break;else _0x2460c9['push'](_0x2460c9['shift']());}catch(_0x5caf36){_0x2460c9['push'](_0x2460c9['shift']());}}}(_0x21ab,0x60c08));var label='EventsMoveCore',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x14bb35){const _0x48bd07=_0x3f5a;return _0x14bb35[_0x48bd07(0x1b2)]&&_0x14bb35[_0x48bd07(0x1f7)][_0x48bd07(0x337)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0xbbde9f(0x200)]||{},VisuMZ[_0xbbde9f(0x292)]=function(_0x471219,_0x52bc82){const _0x409724=_0xbbde9f;for(const _0x55688a in _0x52bc82){if(_0x55688a[_0x409724(0x396)](/(.*):(.*)/i)){const _0x1b295c=String(RegExp['$1']),_0x177a7c=String(RegExp['$2'])['toUpperCase']()[_0x409724(0x242)]();let _0x54e902,_0x4641c5,_0xf44fc6;switch(_0x177a7c){case'NUM':_0x54e902=_0x52bc82[_0x55688a]!==''?Number(_0x52bc82[_0x55688a]):0x0;break;case _0x409724(0xec):_0x4641c5=_0x52bc82[_0x55688a]!==''?JSON[_0x409724(0x1eb)](_0x52bc82[_0x55688a]):[],_0x54e902=_0x4641c5['map'](_0x32e8d3=>Number(_0x32e8d3));break;case _0x409724(0x381):_0x54e902=_0x52bc82[_0x55688a]!==''?eval(_0x52bc82[_0x55688a]):null;break;case _0x409724(0x1bc):_0x4641c5=_0x52bc82[_0x55688a]!==''?JSON[_0x409724(0x1eb)](_0x52bc82[_0x55688a]):[],_0x54e902=_0x4641c5[_0x409724(0x186)](_0x1f06db=>eval(_0x1f06db));break;case'JSON':_0x54e902=_0x52bc82[_0x55688a]!==''?JSON['parse'](_0x52bc82[_0x55688a]):'';break;case _0x409724(0x328):_0x4641c5=_0x52bc82[_0x55688a]!==''?JSON['parse'](_0x52bc82[_0x55688a]):[],_0x54e902=_0x4641c5['map'](_0x867377=>JSON[_0x409724(0x1eb)](_0x867377));break;case _0x409724(0x287):_0x54e902=_0x52bc82[_0x55688a]!==''?new Function(JSON[_0x409724(0x1eb)](_0x52bc82[_0x55688a])):new Function(_0x409724(0x234));break;case'ARRAYFUNC':_0x4641c5=_0x52bc82[_0x55688a]!==''?JSON[_0x409724(0x1eb)](_0x52bc82[_0x55688a]):[],_0x54e902=_0x4641c5['map'](_0x586e7a=>new Function(JSON[_0x409724(0x1eb)](_0x586e7a)));break;case _0x409724(0x3e5):_0x54e902=_0x52bc82[_0x55688a]!==''?String(_0x52bc82[_0x55688a]):'';break;case _0x409724(0x1a3):_0x4641c5=_0x52bc82[_0x55688a]!==''?JSON['parse'](_0x52bc82[_0x55688a]):[],_0x54e902=_0x4641c5[_0x409724(0x186)](_0x3a3b58=>String(_0x3a3b58));break;case'STRUCT':_0xf44fc6=_0x52bc82[_0x55688a]!==''?JSON[_0x409724(0x1eb)](_0x52bc82[_0x55688a]):{},_0x471219[_0x1b295c]={},VisuMZ[_0x409724(0x292)](_0x471219[_0x1b295c],_0xf44fc6);continue;case _0x409724(0x313):_0x4641c5=_0x52bc82[_0x55688a]!==''?JSON[_0x409724(0x1eb)](_0x52bc82[_0x55688a]):[],_0x54e902=_0x4641c5['map'](_0x4938df=>VisuMZ[_0x409724(0x292)]({},JSON[_0x409724(0x1eb)](_0x4938df)));break;default:continue;}_0x471219[_0x1b295c]=_0x54e902;}}return _0x471219;},(_0x2895cc=>{const _0xe972e4=_0xbbde9f,_0x55b2f7=_0x2895cc[_0xe972e4(0x2e6)];for(const _0x5d8871 of dependencies){if(!Imported[_0x5d8871]){alert(_0xe972e4(0x14e)[_0xe972e4(0x10c)](_0x55b2f7,_0x5d8871)),SceneManager[_0xe972e4(0x340)]();break;}}const _0x4a20a9=_0x2895cc[_0xe972e4(0x1f7)];if(_0x4a20a9['match'](/\[Version[ ](.*?)\]/i)){const _0x428b48=Number(RegExp['$1']);_0x428b48!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0xe972e4(0x10c)](_0x55b2f7,_0x428b48)),SceneManager[_0xe972e4(0x340)]());}if(_0x4a20a9['match'](/\[Tier[ ](\d+)\]/i)){const _0x58b35a=Number(RegExp['$1']);_0x58b35a<tier?(alert(_0xe972e4(0x38f)[_0xe972e4(0x10c)](_0x55b2f7,_0x58b35a,tier)),SceneManager[_0xe972e4(0x340)]()):tier=Math['max'](_0x58b35a,tier);}VisuMZ[_0xe972e4(0x292)](VisuMZ[label]['Settings'],_0x2895cc['parameters']);})(pluginData),VisuMZ[_0xbbde9f(0x1fd)]=function(_0x50b559,_0x2ceac2,_0x323694){switch(_0x323694){case'=':return _0x2ceac2;break;case'+':return _0x50b559+_0x2ceac2;break;case'-':return _0x50b559-_0x2ceac2;break;case'*':return _0x50b559*_0x2ceac2;break;case'/':return _0x50b559/_0x2ceac2;break;case'%':return _0x50b559%_0x2ceac2;break;}return _0x50b559;},PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],_0xbbde9f(0x392),_0x585fe9=>{const _0x4f4932=_0xbbde9f;VisuMZ[_0x4f4932(0x292)](_0x585fe9,_0x585fe9);switch(_0x585fe9[_0x4f4932(0x41e)]){case _0x4f4932(0x2d2):$gameSystem[_0x4f4932(0x1b8)](!![]);break;case _0x4f4932(0x1de):$gameSystem[_0x4f4932(0x1b8)](![]);break;case _0x4f4932(0x1c7):$gameSystem[_0x4f4932(0x1b8)](!$gameSystem['isAllowEventAutoMovement']());break;}}),PluginManager['registerCommand'](pluginData['name'],_0xbbde9f(0xf8),_0x3b6384=>{const _0x2dd849=_0xbbde9f;VisuMZ[_0x2dd849(0x292)](_0x3b6384,_0x3b6384);const _0x2069a2=$gameTemp[_0x2dd849(0xd1)](),_0x1beb8d={'mapId':_0x3b6384[_0x2dd849(0x3a0)],'eventId':_0x3b6384[_0x2dd849(0x35e)]||_0x2069a2[_0x2dd849(0x211)](),'pageId':_0x3b6384[_0x2dd849(0x233)]};if(_0x1beb8d[_0x2dd849(0x380)]<=0x0)_0x1beb8d[_0x2dd849(0x380)]=$gameMap?$gameMap[_0x2dd849(0x380)]():0x1;$gameTemp[_0x2dd849(0xd1)]()[_0x2dd849(0x3c2)](_0x1beb8d);}),PluginManager[_0xbbde9f(0x1af)](pluginData['name'],_0xbbde9f(0x357),_0x7156ef=>{const _0x161863=_0xbbde9f;VisuMZ[_0x161863(0x292)](_0x7156ef,_0x7156ef);switch(_0x7156ef[_0x161863(0x41e)]){case _0x161863(0x2ad):$gameSystem['setDashingEnabled'](!![]);break;case'Disable':$gameSystem[_0x161863(0x24f)](![]);break;case'Toggle':$gameSystem[_0x161863(0x24f)](!$gameSystem['isDashingEnabled']());break;}}),PluginManager['registerCommand'](pluginData[_0xbbde9f(0x2e6)],_0xbbde9f(0x401),_0x1c086c=>{const _0x174cf9=_0xbbde9f;VisuMZ['ConvertParams'](_0x1c086c,_0x1c086c);const _0x57df6c=$gameTemp[_0x174cf9(0xd1)]();_0x1c086c[_0x174cf9(0x3a0)]=_0x1c086c[_0x174cf9(0x3a0)]||$gameMap[_0x174cf9(0x380)](),$gameSystem[_0x174cf9(0x13f)](_0x1c086c[_0x174cf9(0x3a0)],_0x1c086c[_0x174cf9(0x35e)]||_0x57df6c[_0x174cf9(0x211)](),_0x1c086c[_0x174cf9(0x39e)],_0x1c086c['IconBufferX'],_0x1c086c[_0x174cf9(0x24b)],_0x1c086c[_0x174cf9(0x112)]);}),PluginManager['registerCommand'](pluginData['name'],'EventIconDelete',_0x2c859b=>{const _0x304f6a=_0xbbde9f;VisuMZ[_0x304f6a(0x292)](_0x2c859b,_0x2c859b);const _0x2c7ff5=$gameTemp['getLastPluginCommandInterpreter']();_0x2c859b['MapId']=_0x2c859b['MapId']||$gameMap['mapId'](),$gameSystem['deleteIconsOnEventsDataKey'](_0x2c859b[_0x304f6a(0x3a0)],_0x2c859b['EventId']||_0x2c7ff5[_0x304f6a(0x211)]());}),PluginManager[_0xbbde9f(0x1af)](pluginData['name'],_0xbbde9f(0x2f1),_0x530463=>{const _0x26d11b=_0xbbde9f;if($gameMap)for(const _0x31e7d7 of $gameMap[_0x26d11b(0x344)]()){_0x31e7d7[_0x26d11b(0x2e1)]();}}),PluginManager['registerCommand'](pluginData[_0xbbde9f(0x2e6)],_0xbbde9f(0xe1),_0x8a968=>{const _0x472305=_0xbbde9f;VisuMZ['ConvertParams'](_0x8a968,_0x8a968);switch(_0x8a968[_0x472305(0x341)]){case _0x472305(0x138):$gameSystem['setEventLabelsVisible'](!![]);break;case'Hidden':$gameSystem['setEventLabelsVisible'](![]);break;case'Toggle':$gameSystem[_0x472305(0x2a8)](!$gameSystem[_0x472305(0x3ca)]());break;}}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],_0xbbde9f(0x207),_0xc466fd=>{const _0x3ab887=_0xbbde9f;VisuMZ[_0x3ab887(0x292)](_0xc466fd,_0xc466fd);const _0x3e045f=$gameTemp['getLastPluginCommandInterpreter']();if(!$gameMap)return;const _0x5c25fb=$gameMap[_0x3ab887(0xbf)](_0xc466fd[_0x3ab887(0x35e)]||_0x3e045f['eventId']());if(_0x5c25fb)_0x5c25fb[_0x3ab887(0x1a1)]();}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],_0xbbde9f(0x315),_0xa4050c=>{const _0x15961e=_0xbbde9f;VisuMZ[_0x15961e(0x292)](_0xa4050c,_0xa4050c);const _0x3effff=$gameTemp['getLastPluginCommandInterpreter'](),_0x21b7f5=_0xa4050c[_0x15961e(0x3a0)]||$gameMap[_0x15961e(0x380)](),_0x378d93=_0xa4050c[_0x15961e(0x35e)]||_0x3effff[_0x15961e(0x211)](),_0x15ddc6=_0xa4050c[_0x15961e(0x1cf)]||0x0,_0x2b7146=_0xa4050c[_0x15961e(0x1ea)]||0x0,_0x338039=_0xa4050c[_0x15961e(0x2d0)]||0x2,_0x570d1c=((_0xa4050c[_0x15961e(0x233)]||0x1)-0x1)[_0x15961e(0xdc)](0x0,0x13),_0x587485=_0xa4050c['MoveRouteIndex']||0x0;$gameSystem[_0x15961e(0xea)](_0x21b7f5,_0x378d93,_0x15ddc6,_0x2b7146,_0x338039,_0x570d1c,_0x587485);}),PluginManager[_0xbbde9f(0x1af)](pluginData['name'],_0xbbde9f(0x19a),_0x5a6ac5=>{const _0x26b64e=_0xbbde9f;VisuMZ[_0x26b64e(0x292)](_0x5a6ac5,_0x5a6ac5);const _0x10fe71=$gameTemp[_0x26b64e(0xd1)](),_0x329883=_0x5a6ac5[_0x26b64e(0x3a0)]||$gameMap[_0x26b64e(0x380)](),_0x4ef7b5=_0x5a6ac5[_0x26b64e(0x35e)]||_0x10fe71[_0x26b64e(0x211)]();$gameSystem[_0x26b64e(0x2a3)](_0x329883,_0x4ef7b5);}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],_0xbbde9f(0x35a),_0x1a6692=>{const _0x14c3b8=_0xbbde9f;VisuMZ[_0x14c3b8(0x292)](_0x1a6692,_0x1a6692);const _0x255d52=!_0x1a6692[_0x14c3b8(0x390)];$gameSystem[_0x14c3b8(0x165)](_0x255d52);}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],'FollowerSetTargetChase',_0x4346e9=>{const _0x19a97b=_0xbbde9f;VisuMZ[_0x19a97b(0x292)](_0x4346e9,_0x4346e9);const _0x15cb56=(_0x4346e9[_0x19a97b(0x324)]||0x0)-0x1,_0x1205c7=!_0x4346e9[_0x19a97b(0x390)],_0x7f10c0=$gamePlayer['followers']()[_0x19a97b(0x12e)](_0x15cb56);if(_0x7f10c0)_0x7f10c0[_0x19a97b(0x118)](_0x1205c7);}),PluginManager[_0xbbde9f(0x1af)](pluginData['name'],_0xbbde9f(0x3f4),_0x171506=>{const _0x4c0c47=_0xbbde9f;VisuMZ[_0x4c0c47(0x292)](_0x171506,_0x171506);const _0x50be44=_0x171506[_0x4c0c47(0x324)];$gameSystem[_0x4c0c47(0x43d)](_0x50be44);}),PluginManager['registerCommand'](pluginData[_0xbbde9f(0x2e6)],_0xbbde9f(0x235),_0x50c8ee=>{const _0x4f8081=_0xbbde9f;VisuMZ[_0x4f8081(0x292)](_0x50c8ee,_0x50c8ee),$gameSystem[_0x4f8081(0x43d)](0x0),$gameSystem[_0x4f8081(0x165)](![]);for(const _0x3fc190 of $gamePlayer[_0x4f8081(0x2d7)]()[_0x4f8081(0x1c8)]){if(_0x3fc190)_0x3fc190['setChaseOff'](![]);}}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],_0xbbde9f(0x111),_0x45e675=>{const _0x330954=_0xbbde9f;VisuMZ[_0x330954(0x292)](_0x45e675,_0x45e675);const _0x44fc3c=$gameTemp[_0x330954(0xd1)]();_0x45e675[_0x330954(0x3a0)]=_0x45e675[_0x330954(0x3a0)]||$gameMap['mapId']();const _0x1b33f1=[_0x45e675['MapId'],_0x45e675[_0x330954(0x35e)]||_0x44fc3c[_0x330954(0x211)](),_0x45e675['Letter']],_0x2817ab=_0x45e675[_0x330954(0x1a0)],_0x560c7b=$gameSelfSwitches[_0x330954(0x451)](_0x1b33f1)||![];$gameSwitches[_0x330954(0x3d6)](_0x2817ab,_0x560c7b);}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],_0xbbde9f(0x2b9),_0x3a6a1a=>{const _0x2c779d=_0xbbde9f;VisuMZ[_0x2c779d(0x292)](_0x3a6a1a,_0x3a6a1a);const _0x24678d=$gameTemp[_0x2c779d(0xd1)]();_0x3a6a1a['MapId']=_0x3a6a1a[_0x2c779d(0x3a0)]||$gameMap[_0x2c779d(0x380)]();const _0x4a6086=[_0x3a6a1a[_0x2c779d(0x3a0)],_0x3a6a1a[_0x2c779d(0x35e)]||_0x24678d[_0x2c779d(0x211)](),'Self\x20Switch\x20%1'[_0x2c779d(0x10c)](_0x3a6a1a[_0x2c779d(0x3ba)])],_0xd91df4=_0x3a6a1a[_0x2c779d(0x1a0)],_0x59d261=$gameSelfSwitches[_0x2c779d(0x451)](_0x4a6086)||![];$gameSwitches[_0x2c779d(0x3d6)](_0xd91df4,_0x59d261);}),PluginManager[_0xbbde9f(0x1af)](pluginData['name'],_0xbbde9f(0x424),_0x5eec92=>{const _0x71a486=_0xbbde9f;VisuMZ[_0x71a486(0x292)](_0x5eec92,_0x5eec92);const _0x1cbd2e=$gameTemp[_0x71a486(0xd1)]();_0x5eec92['MapId']=_0x5eec92[_0x71a486(0x3a0)]||$gameMap[_0x71a486(0x380)]();const _0x3a2e10=[_0x5eec92[_0x71a486(0x3a0)],_0x5eec92[_0x71a486(0x35e)]||_0x1cbd2e[_0x71a486(0x211)](),_0x71a486(0x3dc)['format'](_0x5eec92['VariableId'])],_0x4f3804=_0x5eec92['TargetVariableId'],_0x285021=$gameSelfSwitches[_0x71a486(0x451)](_0x3a2e10)||![];$gameVariables[_0x71a486(0x3d6)](_0x4f3804,_0x285021);}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],_0xbbde9f(0x3cd),_0x3792e9=>{const _0x274f4d=_0xbbde9f;VisuMZ[_0x274f4d(0x292)](_0x3792e9,_0x3792e9);if(!$gameMap)return;const _0x574bd6=$gameTemp[_0x274f4d(0xd1)](),_0x246228=_0x3792e9[_0x274f4d(0x2c5)];_0x3792e9[_0x274f4d(0x3db)]=_0x3792e9[_0x274f4d(0x3db)]||$gameMap[_0x274f4d(0x380)](),_0x3792e9[_0x274f4d(0x1bb)]=_0x3792e9['Step2MapId']||$gameMap[_0x274f4d(0x380)](),_0x3792e9[_0x274f4d(0x370)]=_0x3792e9[_0x274f4d(0x370)][_0x274f4d(0x295)]()['trim']();if(!_0x246228&&_0x3792e9[_0x274f4d(0x3db)]!==$gameMap['mapId']())return;if($gameMap[_0x274f4d(0x380)]()===_0x3792e9['Step1MapId']){const _0x248072=$gameMap[_0x274f4d(0xbf)](_0x3792e9[_0x274f4d(0x2ec)]||_0x574bd6[_0x274f4d(0x211)]());if(!_0x248072)return;_0x3792e9['TemplateName']!=='UNTITLED'?_0x248072[_0x274f4d(0x3d3)](_0x3792e9['TemplateName']):_0x248072['morphInto'](_0x3792e9[_0x274f4d(0x1bb)],_0x3792e9[_0x274f4d(0x199)]||_0x574bd6[_0x274f4d(0x211)]());}_0x246228&&$gameSystem['savePreservedMorphEventDataKey'](_0x3792e9[_0x274f4d(0x3db)],_0x3792e9[_0x274f4d(0x2ec)],_0x3792e9[_0x274f4d(0x370)],_0x3792e9['Step2MapId'],_0x3792e9['Step2EventId']);}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],_0xbbde9f(0x20c),_0x3f386d=>{const _0x4265fc=_0xbbde9f;VisuMZ['ConvertParams'](_0x3f386d,_0x3f386d);if(!$gameMap)return;const _0x4ae659=$gameTemp['getLastPluginCommandInterpreter']();_0x3f386d[_0x4265fc(0x3a0)]=_0x3f386d[_0x4265fc(0x3a0)]||$gameMap[_0x4265fc(0x380)]();if($gameMap['mapId']()===_0x3f386d['MapId']){const _0x4e66af=$gameMap[_0x4265fc(0xbf)](_0x3f386d[_0x4265fc(0x35e)]||_0x4ae659[_0x4265fc(0x211)]());_0x4e66af[_0x4265fc(0x345)]();}_0x3f386d['RemovePreserve']&&$gameSystem['deletePreservedMorphEventDataKey'](_0x3f386d[_0x4265fc(0x3a0)],_0x3f386d['EventId']||_0x4ae659[_0x4265fc(0x211)]());}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],_0xbbde9f(0x434),_0x3fc5d5=>{const _0x1bca99=_0xbbde9f;VisuMZ[_0x1bca99(0x292)](_0x3fc5d5,_0x3fc5d5),$gameSystem[_0x1bca99(0x3ce)](!_0x3fc5d5[_0x1bca99(0x2ad)]);}),PluginManager[_0xbbde9f(0x1af)](pluginData['name'],_0xbbde9f(0x432),_0x5e8a37=>{const _0x4455c7=_0xbbde9f;VisuMZ[_0x4455c7(0x292)](_0x5e8a37,_0x5e8a37),$gameSystem[_0x4455c7(0x182)](_0x5e8a37[_0x4455c7(0x203)]);}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],'PlayerIconChange',_0x4575b2=>{const _0x5079e8=_0xbbde9f;VisuMZ[_0x5079e8(0x292)](_0x4575b2,_0x4575b2),$gameSystem[_0x5079e8(0x189)]($gamePlayer,_0x4575b2[_0x5079e8(0x39e)],_0x4575b2[_0x5079e8(0x437)],_0x4575b2['IconBufferY'],_0x4575b2[_0x5079e8(0x112)]);}),PluginManager['registerCommand'](pluginData['name'],_0xbbde9f(0x2ab),_0x537c37=>{const _0x2c4196=_0xbbde9f;VisuMZ[_0x2c4196(0x292)](_0x537c37,_0x537c37),$gameSystem[_0x2c4196(0x3ec)]($gamePlayer);}),PluginManager[_0xbbde9f(0x1af)](pluginData['name'],_0xbbde9f(0x194),_0x80ed0c=>{const _0x1574f6=_0xbbde9f;VisuMZ[_0x1574f6(0x292)](_0x80ed0c,_0x80ed0c);const _0x584119=$gameTemp[_0x1574f6(0xd1)]();_0x80ed0c[_0x1574f6(0x3a0)]=_0x80ed0c[_0x1574f6(0x3a0)]||$gameMap[_0x1574f6(0x380)]();const _0x3e1c30=[_0x80ed0c[_0x1574f6(0x3a0)],_0x80ed0c[_0x1574f6(0x35e)]||_0x584119[_0x1574f6(0x211)](),_0x80ed0c[_0x1574f6(0x22b)]];switch(_0x80ed0c[_0x1574f6(0x41e)]){case'ON':$gameSelfSwitches['setValue'](_0x3e1c30,!![]);break;case _0x1574f6(0x3bf):$gameSelfSwitches[_0x1574f6(0x3d6)](_0x3e1c30,![]);break;case _0x1574f6(0x1c7):$gameSelfSwitches[_0x1574f6(0x3d6)](_0x3e1c30,!$gameSelfSwitches[_0x1574f6(0x451)](_0x3e1c30));break;}}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],_0xbbde9f(0x228),_0x56e52c=>{const _0x264918=_0xbbde9f;VisuMZ[_0x264918(0x292)](_0x56e52c,_0x56e52c);const _0x14ecfc=$gameTemp['getLastPluginCommandInterpreter']();_0x56e52c[_0x264918(0x3a0)]=_0x56e52c['MapId']||$gameMap[_0x264918(0x380)]();const _0x297359=[_0x56e52c['MapId'],_0x56e52c['EventId']||_0x14ecfc[_0x264918(0x211)](),_0x264918(0x44b)[_0x264918(0x10c)](_0x56e52c['SwitchId'])];switch(_0x56e52c['Value']){case'ON':$gameSelfSwitches[_0x264918(0x3d6)](_0x297359,!![]);break;case _0x264918(0x3bf):$gameSelfSwitches[_0x264918(0x3d6)](_0x297359,![]);break;case _0x264918(0x1c7):$gameSelfSwitches['setValue'](_0x297359,!$gameSelfSwitches['value'](_0x297359));break;}}),PluginManager['registerCommand'](pluginData[_0xbbde9f(0x2e6)],'SelfVariableID',_0x7f46e3=>{const _0x5d0983=_0xbbde9f;VisuMZ['ConvertParams'](_0x7f46e3,_0x7f46e3);const _0x179d7a=$gameTemp[_0x5d0983(0xd1)](),_0x1baa9d=[_0x7f46e3[_0x5d0983(0x3a0)],_0x7f46e3[_0x5d0983(0x35e)]||_0x179d7a[_0x5d0983(0x211)](),_0x5d0983(0x3dc)[_0x5d0983(0x10c)](_0x7f46e3[_0x5d0983(0x258)])];_0x7f46e3[_0x5d0983(0x3a0)]=_0x7f46e3['MapId']||$gameMap[_0x5d0983(0x380)]();const _0x5747c7=VisuMZ[_0x5d0983(0x1fd)]($gameSelfSwitches[_0x5d0983(0x451)](_0x1baa9d),_0x7f46e3[_0x5d0983(0x41e)],_0x7f46e3[_0x5d0983(0x1c4)]);$gameSelfSwitches[_0x5d0983(0x3d6)](_0x1baa9d,_0x5747c7);}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],'SpawnEventAtXY',_0x154faf=>{const _0xfa4c1d=_0xbbde9f;VisuMZ['ConvertParams'](_0x154faf,_0x154faf);const _0x2a5a8f=$gameTemp[_0xfa4c1d(0xd1)](),_0x1b5bfe={'template':_0x154faf['TemplateName'],'mapId':_0x154faf[_0xfa4c1d(0x3a0)]||$gameMap[_0xfa4c1d(0x380)](),'eventId':_0x154faf[_0xfa4c1d(0x35e)]||_0x2a5a8f['eventId'](),'x':_0x154faf[_0xfa4c1d(0x1cf)],'y':_0x154faf[_0xfa4c1d(0x1ea)],'spawnPreserved':_0x154faf['Preserve'],'spawnEventId':$gameMap[_0xfa4c1d(0x275)][_0xfa4c1d(0x3b8)]+0x3e8},_0x4cf99f=_0x154faf[_0xfa4c1d(0x158)]||0x0,_0x1124b4=$gameMap[_0xfa4c1d(0x144)](_0x1b5bfe,_0x154faf[_0xfa4c1d(0x426)],_0x154faf['Passability']);_0x4cf99f&&$gameSwitches['setValue'](_0x4cf99f,!!_0x1124b4);}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],_0xbbde9f(0x40e),_0x10935c=>{const _0x2c93c2=_0xbbde9f;VisuMZ[_0x2c93c2(0x292)](_0x10935c,_0x10935c);const _0x5b5ad5=$gameTemp[_0x2c93c2(0xd1)](),_0x3c73ed={'template':_0x10935c['TemplateName'],'mapId':_0x10935c[_0x2c93c2(0x3a0)]||$gameMap['mapId'](),'eventId':_0x10935c['EventId']||_0x5b5ad5[_0x2c93c2(0x211)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x10935c['Preserve'],'spawnEventId':$gameMap[_0x2c93c2(0x275)]['length']+0x3e8},_0x19587d=_0x10935c[_0x2c93c2(0x158)]||0x0,_0x317591=$gameMap['prepareSpawnedEventAtRegion'](_0x3c73ed,_0x10935c[_0x2c93c2(0x3d2)],_0x10935c['Collision'],_0x10935c[_0x2c93c2(0x1ff)]);_0x19587d&&$gameSwitches[_0x2c93c2(0x3d6)](_0x19587d,!!_0x317591);}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],'SpawnEventAtTerrainTag',_0x325267=>{const _0x27ea2e=_0xbbde9f;VisuMZ[_0x27ea2e(0x292)](_0x325267,_0x325267);const _0x281a49=$gameTemp['getLastPluginCommandInterpreter'](),_0xc0b526={'template':_0x325267[_0x27ea2e(0x370)],'mapId':_0x325267[_0x27ea2e(0x3a0)]||$gameMap[_0x27ea2e(0x380)](),'eventId':_0x325267[_0x27ea2e(0x35e)]||_0x281a49[_0x27ea2e(0x211)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x325267['Preserve'],'spawnEventId':$gameMap['_spawnedEvents'][_0x27ea2e(0x3b8)]+0x3e8},_0x259b66=_0x325267[_0x27ea2e(0x158)]||0x0,_0x28d906=$gameMap[_0x27ea2e(0x3df)](_0xc0b526,_0x325267[_0x27ea2e(0x23b)],_0x325267[_0x27ea2e(0x426)],_0x325267[_0x27ea2e(0x1ff)]);_0x259b66&&$gameSwitches[_0x27ea2e(0x3d6)](_0x259b66,!!_0x28d906);}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],'SpawnEventDespawnEventID',_0x28f319=>{const _0x201029=_0xbbde9f;VisuMZ[_0x201029(0x292)](_0x28f319,_0x28f319);const _0x2357b4=$gameTemp['getLastPluginCommandInterpreter']();$gameMap[_0x201029(0x25f)](_0x28f319[_0x201029(0x2cf)]||_0x2357b4[_0x201029(0x211)]());}),PluginManager['registerCommand'](pluginData[_0xbbde9f(0x2e6)],'SpawnEventDespawnAtXY',_0x336ad6=>{const _0x462f0d=_0xbbde9f;VisuMZ[_0x462f0d(0x292)](_0x336ad6,_0x336ad6);const _0x14279c=_0x336ad6[_0x462f0d(0x1cf)],_0x26c4de=_0x336ad6[_0x462f0d(0x1ea)];$gameMap[_0x462f0d(0x147)](_0x14279c,_0x26c4de);}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],'SpawnEventDespawnRegions',_0xbc7d6e=>{const _0x21843d=_0xbbde9f;VisuMZ[_0x21843d(0x292)](_0xbc7d6e,_0xbc7d6e),$gameMap[_0x21843d(0x408)](_0xbc7d6e[_0x21843d(0x3d2)]);}),PluginManager[_0xbbde9f(0x1af)](pluginData[_0xbbde9f(0x2e6)],_0xbbde9f(0x330),_0xc10d71=>{const _0x371f89=_0xbbde9f;VisuMZ['ConvertParams'](_0xc10d71,_0xc10d71),$gameMap[_0x371f89(0x250)](_0xc10d71[_0x371f89(0x23b)]);}),PluginManager[_0xbbde9f(0x1af)](pluginData['name'],_0xbbde9f(0x2c7),_0x33e50e=>{const _0x23fdd6=_0xbbde9f;VisuMZ['ConvertParams'](_0x33e50e,_0x33e50e),$gameMap[_0x23fdd6(0xb8)]();}),VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0xc5)]=Scene_Boot[_0xbbde9f(0x238)][_0xbbde9f(0x125)],Scene_Boot[_0xbbde9f(0x238)]['onDatabaseLoaded']=function(){const _0x1c54d5=_0xbbde9f;VisuMZ[_0x1c54d5(0x44a)][_0x1c54d5(0xc5)][_0x1c54d5(0x395)](this),this[_0x1c54d5(0x402)](),this['process_VisuMZ_EventsMoveCore_Switches_Variables']();if(VisuMZ['EventsMoveCore']['CustomPageConditions'])VisuMZ[_0x1c54d5(0x44a)][_0x1c54d5(0x22e)][_0x1c54d5(0x153)]();},VisuMZ[_0xbbde9f(0x414)]=[],VisuMZ[_0xbbde9f(0x2b2)]={},Scene_Boot[_0xbbde9f(0x238)][_0xbbde9f(0x402)]=function(){const _0x594463=_0xbbde9f;if(DataManager[_0x594463(0x2e2)]()||DataManager[_0x594463(0x21a)]())return;const _0x2f841c=VisuMZ[_0x594463(0x44a)][_0x594463(0x200)][_0x594463(0x213)],_0x2d72e7=_0x2f841c[_0x594463(0x1ec)][_0x594463(0xc9)](0x0);for(const _0x4f0e2d of _0x2f841c['List']){_0x4f0e2d[_0x594463(0x3f9)]=_0x4f0e2d[_0x594463(0x3f9)]['toUpperCase']()[_0x594463(0x242)](),VisuMZ[_0x594463(0x2b2)][_0x4f0e2d[_0x594463(0x3f9)]]=_0x4f0e2d;if(!_0x2d72e7[_0x594463(0x337)](_0x4f0e2d['MapID']))_0x2d72e7['push'](_0x4f0e2d['MapID']);}for(const _0x19dfef of _0x2d72e7){if(VisuMZ['PreloadedMaps'][_0x19dfef])continue;const _0x1447fa=_0x594463(0x1df)[_0x594463(0x10c)](_0x19dfef[_0x594463(0x40a)](0x3)),_0xdeb3a9='$preloadedMap_%1'[_0x594463(0x10c)](_0x19dfef);DataManager[_0x594463(0x168)](_0xdeb3a9,_0x1447fa),setTimeout(this[_0x594463(0xd2)][_0x594463(0x42b)](this,_0x19dfef,_0xdeb3a9),0x64);}},Scene_Boot[_0xbbde9f(0x238)]['VisuMZ_Setup_Preload_Map']=function(_0x4be020,_0x4173cd){const _0xe69e68=_0xbbde9f;window[_0x4173cd]?(VisuMZ['PreloadedMaps'][_0x4be020]=window[_0x4173cd],window[_0x4173cd]=undefined):setTimeout(this[_0xe69e68(0xd2)][_0xe69e68(0x42b)](this,_0x4be020,_0x4173cd),0x64);},VisuMZ[_0xbbde9f(0x18f)]=[],VisuMZ[_0xbbde9f(0x22f)]=[],VisuMZ[_0xbbde9f(0x342)]=[],VisuMZ[_0xbbde9f(0x1f2)]=[],Scene_Boot[_0xbbde9f(0x238)]['process_VisuMZ_EventsMoveCore_Switches_Variables']=function(){const _0x3f3a42=_0xbbde9f;for(let _0x5db145=0x1;_0x5db145<$dataSystem[_0x3f3a42(0x30a)]['length'];_0x5db145++){if($dataSystem[_0x3f3a42(0x30a)][_0x5db145][_0x3f3a42(0x396)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x3f3a42(0x18f)][_0x3f3a42(0x2e9)](_0x5db145);if($dataSystem[_0x3f3a42(0x30a)][_0x5db145][_0x3f3a42(0x396)](/<SELF>/i))VisuMZ['SelfSwitches']['push'](_0x5db145);}for(let _0x377fc6=0x1;_0x377fc6<$dataSystem[_0x3f3a42(0x336)][_0x3f3a42(0x3b8)];_0x377fc6++){if($dataSystem[_0x3f3a42(0x336)][_0x377fc6][_0x3f3a42(0x396)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x3f3a42(0x342)][_0x3f3a42(0x2e9)](_0x377fc6);if($dataSystem[_0x3f3a42(0x336)][_0x377fc6]['match'](/<SELF>/i))VisuMZ[_0x3f3a42(0x1f2)]['push'](_0x377fc6);}},VisuMZ['EventsMoveCore'][_0xbbde9f(0x22e)]={},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x22e)]['initialize']=function(){const _0x1e3d7a=_0xbbde9f;this[_0x1e3d7a(0x38d)]=new Game_CPCInterpreter(),this[_0x1e3d7a(0x1b4)]();},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x22e)]['determineCommonEventsWithCPC']=function(){const _0x3fd433=_0xbbde9f;this[_0x3fd433(0x130)]=[];for(const _0x10c481 of $dataCommonEvents){if(!_0x10c481)continue;VisuMZ[_0x3fd433(0x44a)][_0x3fd433(0x22e)]['loadCPC'](_0x10c481);if(_0x10c481[_0x3fd433(0x3d5)][_0x3fd433(0x3b8)]>0x0)this[_0x3fd433(0x130)]['push'](_0x10c481['id']);}},VisuMZ['EventsMoveCore'][_0xbbde9f(0x22e)][_0xbbde9f(0x35c)]=function(_0x3d0480,_0x241004){const _0x2f721=_0xbbde9f;return this[_0x2f721(0x38d)][_0x2f721(0x1d5)](_0x3d0480,_0x241004),this[_0x2f721(0x38d)][_0x2f721(0xc1)](),this[_0x2f721(0x38d)][_0x2f721(0x121)];},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x22e)][_0xbbde9f(0x263)]=function(_0x4302a1){const _0x316df0=_0xbbde9f;let _0x4431b5=![];_0x4302a1[_0x316df0(0x3d5)]=[];for(const _0x1b0522 of _0x4302a1[_0x316df0(0x39d)]){if([0x6c,0x198]['includes'](_0x1b0522[_0x316df0(0x3f3)])){const _0x249def=_0x1b0522[_0x316df0(0x443)][0x0];if(_0x249def[_0x316df0(0x396)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x4431b5=!![];else _0x249def['match'](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x4431b5=![]);}_0x4431b5&&_0x4302a1[_0x316df0(0x3d5)][_0x316df0(0x2e9)](_0x1b0522);}},getSelfSwitchValue=function(_0x4535f9,_0x33654d,_0x1a4830){const _0x1f840c=_0xbbde9f;let _0x893149=[_0x4535f9,_0x33654d,_0x1f840c(0x44b)[_0x1f840c(0x10c)](_0x1a4830)];return typeof _0x1a4830===_0x1f840c(0x32a)&&(_0x893149=[_0x4535f9,_0x33654d,_0x1a4830[_0x1f840c(0x295)]()[_0x1f840c(0x242)]()]),$gameSelfSwitches[_0x1f840c(0x451)](_0x893149);},getSelfVariableValue=function(_0x15cbef,_0x17f782,_0x40975f){const _0x26294e=_0xbbde9f,_0x450efa=[_0x15cbef,_0x17f782,_0x26294e(0x3dc)[_0x26294e(0x10c)](_0x40975f)];return $gameSelfSwitches[_0x26294e(0x451)](_0x450efa);},setSelfSwitchValue=function(_0x23f1b2,_0x502ec7,_0x9225ef,_0x3010a0){const _0x108df0=_0xbbde9f;let _0x4d3b8a=[_0x23f1b2,_0x502ec7,_0x108df0(0x44b)[_0x108df0(0x10c)](_0x9225ef)];typeof _0x9225ef===_0x108df0(0x32a)&&(_0x4d3b8a=[_0x23f1b2,_0x502ec7,_0x9225ef['toUpperCase']()[_0x108df0(0x242)]()]);},setSelfVariableValue=function(_0x26bff4,_0x1ccaca,_0x264477,_0x1fd4dd){const _0x50a2a3=_0xbbde9f,_0x1274fe=[_0x26bff4,_0x1ccaca,_0x50a2a3(0x3dc)[_0x50a2a3(0x10c)](_0x264477)];},DataManager['isAdvancedSwitch']=function(_0x279bd0){const _0x341e2d=_0xbbde9f;if(SceneManager['_scene']['constructor']===Scene_Debug)return![];return VisuMZ[_0x341e2d(0x18f)]['includes'](_0x279bd0);},DataManager[_0xbbde9f(0x122)]=function(_0x567da4){const _0x2c9001=_0xbbde9f;if(SceneManager[_0x2c9001(0x116)][_0x2c9001(0x304)]===Scene_Debug)return![];return VisuMZ[_0x2c9001(0x342)][_0x2c9001(0x337)](_0x567da4);},DataManager[_0xbbde9f(0xe7)]=function(_0x582d8b){const _0x53e86a=_0xbbde9f;if(SceneManager[_0x53e86a(0x116)][_0x53e86a(0x304)]===Scene_Debug)return![];return VisuMZ['SelfSwitches'][_0x53e86a(0x337)](_0x582d8b);},DataManager[_0xbbde9f(0x128)]=function(_0x52fc6b){const _0x17b96a=_0xbbde9f;if(SceneManager[_0x17b96a(0x116)][_0x17b96a(0x304)]===Scene_Debug)return![];return VisuMZ[_0x17b96a(0x1f2)][_0x17b96a(0x337)](_0x52fc6b);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x114)]=Game_Temp[_0xbbde9f(0x238)][_0xbbde9f(0x15d)],Game_Temp[_0xbbde9f(0x238)][_0xbbde9f(0x15d)]=function(_0x37722c,_0x5579b0){const _0x28b354=_0xbbde9f;if(this['isEventClickTriggered'](_0x37722c,_0x5579b0))return;VisuMZ[_0x28b354(0x44a)][_0x28b354(0x114)][_0x28b354(0x395)](this,_0x37722c,_0x5579b0);},Game_Temp[_0xbbde9f(0x238)]['isEventClickTriggered']=function(_0x4cdbae,_0x2656db){const _0x48a5b9=_0xbbde9f,_0x2eb8a9=$gameMap[_0x48a5b9(0x3cf)](_0x4cdbae,_0x2656db);for(const _0x557f8b of _0x2eb8a9){if(_0x557f8b&&_0x557f8b[_0x48a5b9(0x32f)]())return _0x557f8b[_0x48a5b9(0x1f1)](),!![];}return![];},Game_Temp['prototype'][_0xbbde9f(0x176)]=function(_0x4d9c72){const _0x36012b=_0xbbde9f;this[_0x36012b(0x433)]=_0x4d9c72;},Game_Temp[_0xbbde9f(0x238)][_0xbbde9f(0xd1)]=function(){const _0x4a2354=_0xbbde9f;return this[_0x4a2354(0x433)];},Game_Temp['prototype'][_0xbbde9f(0x21c)]=function(_0x478e1e){this['_selfTarget']=_0x478e1e;},Game_Temp[_0xbbde9f(0x238)]['clearSelfTarget']=function(){const _0x20ed64=_0xbbde9f;this[_0x20ed64(0x124)]=undefined;},Game_Temp[_0xbbde9f(0x238)][_0xbbde9f(0x449)]=function(){return this['_selfTarget'];},VisuMZ[_0xbbde9f(0x44a)]['Game_System_initialize']=Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x153)],Game_System['prototype'][_0xbbde9f(0x153)]=function(){const _0x87c135=_0xbbde9f;VisuMZ['EventsMoveCore']['Game_System_initialize'][_0x87c135(0x395)](this),this[_0x87c135(0x2e3)](),this['initFollowerController']();},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x2e3)]=function(){const _0x3e37aa=_0xbbde9f;this[_0x3e37aa(0x371)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this['_EventIcons']={},this[_0x3e37aa(0x37b)]=[],this['_PreservedEventMorphData']={},this[_0x3e37aa(0x431)]={},this['_DisablePlayerControl']=![],this['_PlayerDiagonalSetting']=_0x3e37aa(0x3c0);},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x37f)]=function(){const _0x47a011=_0xbbde9f;if(this[_0x47a011(0x371)]===undefined)this[_0x47a011(0x2e3)]();if(this[_0x47a011(0x371)]['DashingEnable']===undefined)this[_0x47a011(0x2e3)]();return this[_0x47a011(0x371)]['DashingEnable'];},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x24f)]=function(_0xdd17f1){const _0x16e364=_0xbbde9f;if(this[_0x16e364(0x371)]===undefined)this[_0x16e364(0x2e3)]();if(this[_0x16e364(0x371)][_0x16e364(0x3ea)]===undefined)this[_0x16e364(0x2e3)]();this[_0x16e364(0x371)][_0x16e364(0x3ea)]=_0xdd17f1;},Game_System['prototype'][_0xbbde9f(0x12a)]=function(){const _0x2cc0cd=_0xbbde9f;if(this[_0x2cc0cd(0x371)]===undefined)this[_0x2cc0cd(0x2e3)]();if(this[_0x2cc0cd(0x371)][_0x2cc0cd(0x1a2)]===undefined)this[_0x2cc0cd(0x2e3)]();return this[_0x2cc0cd(0x371)][_0x2cc0cd(0x1a2)];},Game_System[_0xbbde9f(0x238)]['setAllowEventAutoMovement']=function(_0x4046b3){const _0x4ecb81=_0xbbde9f;if(this[_0x4ecb81(0x371)]===undefined)this['initEventsMoveCore']();if(this[_0x4ecb81(0x371)][_0x4ecb81(0x1a2)]===undefined)this[_0x4ecb81(0x2e3)]();this['_EventsMoveCoreSettings'][_0x4ecb81(0x1a2)]=_0x4046b3;},Game_System[_0xbbde9f(0x238)]['eventLabelsVisible']=function(){const _0x5b3702=_0xbbde9f;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this[_0x5b3702(0x371)][_0x5b3702(0x259)]===undefined)this[_0x5b3702(0x2e3)]();return this['_EventsMoveCoreSettings'][_0x5b3702(0x259)];},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x2a8)]=function(_0x4b4688){const _0x670633=_0xbbde9f;if(this[_0x670633(0x371)]===undefined)this['initEventsMoveCore']();if(this[_0x670633(0x371)][_0x670633(0x259)]===undefined)this['initEventsMoveCore']();this['_EventsMoveCoreSettings']['VisibleEventLabels']=_0x4b4688;},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x19d)]=function(){const _0x387d8d=_0xbbde9f;return this[_0x387d8d(0x404)]===undefined&&(this[_0x387d8d(0x404)]=![]),this[_0x387d8d(0x404)];},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x3ce)]=function(_0x4f9142){const _0x960b=_0xbbde9f;this[_0x960b(0x404)]=_0x4f9142;},Game_System['prototype'][_0xbbde9f(0x343)]=function(){return this['_PlayerDiagonalSetting'];},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x182)]=function(_0x56d204){const _0x253c57=_0xbbde9f;this['_PlayerDiagonalSetting']=String(_0x56d204)[_0x253c57(0x34c)]()[_0x253c57(0x242)]();},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x2a1)]=function(_0xdbf53d){const _0x1577a5=_0xbbde9f;if(this[_0x1577a5(0x1fe)]===undefined)this['initEventsMoveCore']();if(!_0xdbf53d)return null;if(_0xdbf53d===$gamePlayer)return this[_0x1577a5(0x1fe)]['Player'];else{const _0x58021c=_0x1577a5(0x28f)['format'](_0xdbf53d[_0x1577a5(0x174)],_0xdbf53d[_0x1577a5(0x331)]);return this[_0x1577a5(0x1fe)][_0x58021c];}},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x189)]=function(_0x5e7cad,_0x22b86a,_0x3c4766,_0x208bbb,_0x560b28){const _0x410897=_0xbbde9f;if(this['_EventIcons']===undefined)this[_0x410897(0x2e3)]();const _0xdb32a6=_0x5e7cad===$gamePlayer?_0x410897(0x212):_0x410897(0x28f)[_0x410897(0x10c)](_0x5e7cad[_0x410897(0x174)],_0x5e7cad[_0x410897(0x331)]);this[_0x410897(0x1fe)][_0xdb32a6]={'iconIndex':_0x22b86a,'bufferX':_0x3c4766,'bufferY':_0x208bbb,'blendMode':_0x560b28};},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x13f)]=function(_0x592e16,_0x55ed43,_0x31ebdf,_0x70be57,_0x34456a,_0x56ed87){const _0x9c1d88=_0xbbde9f;if(this[_0x9c1d88(0x1fe)]===undefined)this[_0x9c1d88(0x2e3)]();const _0x475a16=_0x9c1d88(0x28f)[_0x9c1d88(0x10c)](_0x592e16,_0x55ed43);this[_0x9c1d88(0x1fe)][_0x475a16]={'iconIndex':_0x31ebdf,'bufferX':_0x70be57,'bufferY':_0x34456a,'blendMode':_0x56ed87};},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x3ec)]=function(_0x388fe8){const _0x7a3dd0=_0xbbde9f;if(this['_EventIcons']===undefined)this[_0x7a3dd0(0x2e3)]();if(!_0x388fe8)return null;_0x388fe8===$gamePlayer?delete this[_0x7a3dd0(0x1fe)][_0x7a3dd0(0x212)]:this['deleteIconsOnEventsDataKey'](_0x388fe8[_0x7a3dd0(0x174)],_0x388fe8['_eventId']);},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x26b)]=function(_0x140d41,_0x53cc58){const _0x5de645=_0xbbde9f;if(this[_0x5de645(0x1fe)]===undefined)this[_0x5de645(0x2e3)]();const _0x23611e=_0x5de645(0x28f)[_0x5de645(0x10c)](_0x140d41,_0x53cc58);delete this[_0x5de645(0x1fe)][_0x23611e];},Game_System['prototype']['getSavedEventLocation']=function(_0x13c3f0){const _0x2dd67a=_0xbbde9f;if(this[_0x2dd67a(0x431)]===undefined)this['initEventsMoveCore']();if(!_0x13c3f0)return null;const _0x4b06d8=_0x2dd67a(0x28f)['format'](_0x13c3f0[_0x2dd67a(0x174)],_0x13c3f0[_0x2dd67a(0x331)]);return this['_SavedEventLocations'][_0x4b06d8];},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x1a1)]=function(_0x1e38f7){const _0x41d472=_0xbbde9f;if(this[_0x41d472(0x431)]===undefined)this[_0x41d472(0x2e3)]();if(!_0x1e38f7)return;const _0x536622=_0x41d472(0x28f)[_0x41d472(0x10c)](_0x1e38f7['_mapId'],_0x1e38f7['_eventId']);this[_0x41d472(0x431)][_0x536622]={'direction':_0x1e38f7[_0x41d472(0x375)](),'x':Math[_0x41d472(0x3ee)](_0x1e38f7['x']),'y':Math['round'](_0x1e38f7['y']),'pageIndex':_0x1e38f7[_0x41d472(0x2db)],'moveRouteIndex':_0x1e38f7[_0x41d472(0x145)]};},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x160)]=function(_0x3cc257){const _0x4a1189=_0xbbde9f;if(this[_0x4a1189(0x431)]===undefined)this[_0x4a1189(0x2e3)]();if(!_0x3cc257)return;this['deleteSavedEventLocationKey'](_0x3cc257[_0x4a1189(0x174)],_0x3cc257[_0x4a1189(0x331)]);},Game_System['prototype'][_0xbbde9f(0x2a3)]=function(_0x4fe453,_0x4b766d){const _0x4b8601=_0xbbde9f;if(this[_0x4b8601(0x431)]===undefined)this[_0x4b8601(0x2e3)]();const _0x545b2a=_0x4b8601(0x28f)[_0x4b8601(0x10c)](_0x4fe453,_0x4b766d);delete this[_0x4b8601(0x431)][_0x545b2a];},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0xea)]=function(_0x21a70d,_0x3a0310,_0x44abcc,_0x882375,_0x49f1e4,_0x1f2331,_0x5d754b){const _0x28f0df=_0xbbde9f;if(this[_0x28f0df(0x431)]===undefined)this[_0x28f0df(0x2e3)]();const _0x502d59='Map%1-Event%2'[_0x28f0df(0x10c)](_0x21a70d,_0x3a0310);this['_SavedEventLocations'][_0x502d59]={'direction':_0x49f1e4,'x':Math[_0x28f0df(0x3ee)](_0x44abcc),'y':Math[_0x28f0df(0x3ee)](_0x882375),'pageIndex':_0x1f2331,'moveRouteIndex':_0x5d754b};},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x23c)]=function(_0x27c74b){const _0x120f91=_0xbbde9f;if(this[_0x120f91(0x129)]===undefined)this['initEventsMoveCore']();if(!_0x27c74b)return;const _0x30f4e8=_0x120f91(0x28f)[_0x120f91(0x10c)](_0x27c74b[_0x120f91(0x174)],_0x27c74b[_0x120f91(0x331)]);return this[_0x120f91(0x129)][_0x30f4e8];},Game_System[_0xbbde9f(0x238)]['savePreservedMorphEventDataKey']=function(_0x56d94e,_0xecdc4e,_0x575ba5,_0x6d0f8d,_0x2cba3d){const _0x2d6e8f=_0xbbde9f;if(this[_0x2d6e8f(0x129)]===undefined)this[_0x2d6e8f(0x2e3)]();const _0x2a356f=_0x2d6e8f(0x28f)[_0x2d6e8f(0x10c)](_0x56d94e,_0xecdc4e);this[_0x2d6e8f(0x129)][_0x2a356f]={'template':_0x575ba5,'mapId':_0x6d0f8d,'eventId':_0x2cba3d};},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0xd3)]=function(_0x871a1c,_0xa2137c){const _0x5e21b0=_0xbbde9f;if(this[_0x5e21b0(0x129)]===undefined)this[_0x5e21b0(0x2e3)]();const _0x12325a=_0x5e21b0(0x28f)[_0x5e21b0(0x10c)](_0x871a1c,_0xa2137c);delete this[_0x5e21b0(0x129)][_0x12325a];},Game_System['prototype'][_0xbbde9f(0x262)]=function(_0x3cc5f4){const _0xbcdf59=_0xbbde9f;if(this[_0xbcdf59(0x37b)]===undefined)this[_0xbcdf59(0x2e3)]();return this[_0xbcdf59(0x37b)][_0x3cc5f4]=this[_0xbcdf59(0x37b)][_0x3cc5f4]||[],this[_0xbcdf59(0x37b)][_0x3cc5f4];},Game_System[_0xbbde9f(0x238)]['removeTemporaryMapSpawnedEvents']=function(_0x421101){const _0x9f43ee=_0xbbde9f,_0x352240=this[_0x9f43ee(0x262)](_0x421101);for(const _0x2f3ef3 of _0x352240){if(!_0x2f3ef3)continue;if(_0x2f3ef3[_0x9f43ee(0x27c)])continue;const _0x147b7f=_0x352240['indexOf'](_0x2f3ef3);_0x352240[_0x147b7f]=null;}},Game_System['prototype'][_0xbbde9f(0x34f)]=function(){const _0x24203f=_0xbbde9f;this[_0x24203f(0x288)]=0x0,this[_0x24203f(0x321)]=![];},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x28e)]=function(){const _0x582e1c=_0xbbde9f;if(this[_0x582e1c(0x288)]===undefined)this[_0x582e1c(0x34f)]();return this[_0x582e1c(0x288)];},Game_System['prototype'][_0xbbde9f(0x43d)]=function(_0xcda9df){const _0x90d132=_0xbbde9f;if(this[_0x90d132(0x288)]===undefined)this[_0x90d132(0x34f)]();this['_followerControlID']=_0xcda9df;;},VisuMZ[_0xbbde9f(0x44a)]['Game_Interpreter_character']=Game_Interpreter[_0xbbde9f(0x238)][_0xbbde9f(0x1e7)],Game_Interpreter['prototype'][_0xbbde9f(0x1e7)]=function(_0x2e70c0){const _0x2e1cf7=_0xbbde9f;if(!$gameParty['inBattle']()&&_0x2e70c0<0x0){let _0x16bfd9=$gameSystem[_0x2e1cf7(0x28e)]();if(_0x16bfd9>0x0)return $gamePlayer['followers']()[_0x2e1cf7(0x12e)](_0x16bfd9-0x1);}return VisuMZ[_0x2e1cf7(0x44a)][_0x2e1cf7(0x405)][_0x2e1cf7(0x395)](this,_0x2e70c0);},Game_System['prototype'][_0xbbde9f(0x248)]=function(){const _0x4a1ac3=_0xbbde9f;if(this['_followerChaseOff']===undefined)this['initFollowerController']();return this[_0x4a1ac3(0x321)];},Game_System[_0xbbde9f(0x238)][_0xbbde9f(0x165)]=function(_0x4b50c9){const _0x32dda2=_0xbbde9f;if(this[_0x32dda2(0x321)]===undefined)this[_0x32dda2(0x34f)]();this[_0x32dda2(0x321)]=_0x4b50c9;;},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x312)]=Game_Message[_0xbbde9f(0x238)][_0xbbde9f(0x1a8)],Game_Message['prototype'][_0xbbde9f(0x1a8)]=function(_0x1a281e){const _0x2a96e4=_0xbbde9f;VisuMZ['EventsMoveCore'][_0x2a96e4(0x312)][_0x2a96e4(0x395)](this,_0x1a281e),this[_0x2a96e4(0x257)]=$gameTemp[_0x2a96e4(0x449)]();},Game_Message[_0xbbde9f(0x238)][_0xbbde9f(0x249)]=function(){const _0x15c2c2=_0xbbde9f;$gameTemp[_0x15c2c2(0x21c)](this[_0x15c2c2(0x257)]);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0xdd)]=Game_Switches[_0xbbde9f(0x238)][_0xbbde9f(0x451)],Game_Switches['prototype']['value']=function(_0x352c4c){const _0x248c78=_0xbbde9f;if(DataManager[_0x248c78(0x1fc)](_0x352c4c))return!!this[_0x248c78(0x152)](_0x352c4c);else return DataManager[_0x248c78(0xe7)](_0x352c4c)?!!this['selfValue'](_0x352c4c):VisuMZ[_0x248c78(0x44a)]['Game_Switches_value'][_0x248c78(0x395)](this,_0x352c4c);},Game_Switches[_0xbbde9f(0x323)]={},Game_Switches[_0xbbde9f(0x238)][_0xbbde9f(0x152)]=function(_0x2d205a){const _0x54fa7f=_0xbbde9f;if(!Game_Switches[_0x54fa7f(0x323)][_0x2d205a]){$dataSystem[_0x54fa7f(0x30a)][_0x2d205a][_0x54fa7f(0x396)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x3837ea='return\x20%1'[_0x54fa7f(0x10c)](String(RegExp['$1']));Game_Switches[_0x54fa7f(0x323)][_0x2d205a]=new Function(_0x54fa7f(0x119),_0x3837ea);}const _0x40a48c=$gameTemp[_0x54fa7f(0x449)]()||this;return Game_Switches[_0x54fa7f(0x323)][_0x2d205a][_0x54fa7f(0x395)](_0x40a48c,_0x2d205a);},Game_Switches[_0xbbde9f(0x238)][_0xbbde9f(0x3c4)]=function(_0x4f97a6){const _0x23ef84=_0xbbde9f,_0x22dc1c=$gameTemp['getSelfTarget']()||this;if(_0x22dc1c[_0x23ef84(0x304)]!==Game_Event)return VisuMZ[_0x23ef84(0x44a)][_0x23ef84(0xdd)][_0x23ef84(0x395)](this,_0x4f97a6);else{const _0x35addb=[_0x22dc1c[_0x23ef84(0x174)],_0x22dc1c[_0x23ef84(0x331)],_0x23ef84(0x44b)[_0x23ef84(0x10c)](_0x4f97a6)];return $gameSelfSwitches[_0x23ef84(0x451)](_0x35addb);}},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x36b)]=Game_Switches['prototype']['setValue'],Game_Switches['prototype'][_0xbbde9f(0x3d6)]=function(_0x38de54,_0x54a562){const _0x27ab8e=_0xbbde9f;DataManager['isSelfSwitch'](_0x38de54)?this['setSelfValue'](_0x38de54,_0x54a562):VisuMZ[_0x27ab8e(0x44a)]['Game_Switches_setValue'][_0x27ab8e(0x395)](this,_0x38de54,_0x54a562);},Game_Switches[_0xbbde9f(0x238)]['setSelfValue']=function(_0x5cb960,_0x3b6a09){const _0x59228f=_0xbbde9f,_0x5de5fb=$gameTemp['getSelfTarget']()||this;if(_0x5de5fb['constructor']!==Game_Event)VisuMZ[_0x59228f(0x44a)][_0x59228f(0x36b)][_0x59228f(0x395)](this,_0x5cb960,_0x3b6a09);else{const _0x370934=[_0x5de5fb[_0x59228f(0x174)],_0x5de5fb[_0x59228f(0x331)],_0x59228f(0x44b)[_0x59228f(0x10c)](_0x5cb960)];$gameSelfSwitches[_0x59228f(0x3d6)](_0x370934,_0x3b6a09);}},VisuMZ['EventsMoveCore'][_0xbbde9f(0x15a)]=Game_Variables[_0xbbde9f(0x238)][_0xbbde9f(0x451)],Game_Variables[_0xbbde9f(0x238)]['value']=function(_0x25a316){const _0xdb1ef1=_0xbbde9f;if(DataManager[_0xdb1ef1(0x122)](_0x25a316))return this[_0xdb1ef1(0x152)](_0x25a316);else return DataManager[_0xdb1ef1(0x128)](_0x25a316)?this[_0xdb1ef1(0x3c4)](_0x25a316):VisuMZ[_0xdb1ef1(0x44a)][_0xdb1ef1(0x15a)][_0xdb1ef1(0x395)](this,_0x25a316);},Game_Variables[_0xbbde9f(0x323)]={},Game_Variables['prototype']['advancedValue']=function(_0x37bd41){const _0x5e7e3d=_0xbbde9f;if(!Game_Variables[_0x5e7e3d(0x323)][_0x37bd41]){$dataSystem['variables'][_0x37bd41][_0x5e7e3d(0x396)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x3bee2e='return\x20%1'['format'](String(RegExp['$1']));Game_Variables[_0x5e7e3d(0x323)][_0x37bd41]=new Function('variableId',_0x3bee2e);}const _0x11ba94=$gameTemp[_0x5e7e3d(0x449)]()||this;return Game_Variables[_0x5e7e3d(0x323)][_0x37bd41]['call'](_0x11ba94,_0x37bd41);},Game_Variables['prototype']['selfValue']=function(_0x5388a2){const _0x1d1779=_0xbbde9f,_0x2eff5f=$gameTemp['getSelfTarget']()||this;if(_0x2eff5f['constructor']!==Game_Event)return VisuMZ[_0x1d1779(0x44a)][_0x1d1779(0x15a)]['call'](this,_0x5388a2);else{const _0x467bad=[_0x2eff5f[_0x1d1779(0x174)],_0x2eff5f['_eventId'],'Self\x20Variable\x20%1'[_0x1d1779(0x10c)](_0x5388a2)];return $gameSelfSwitches['value'](_0x467bad);}},VisuMZ['EventsMoveCore'][_0xbbde9f(0x236)]=Game_Variables['prototype'][_0xbbde9f(0x3d6)],Game_Variables[_0xbbde9f(0x238)][_0xbbde9f(0x3d6)]=function(_0x3827aa,_0x574b78){const _0x4aa3dc=_0xbbde9f;DataManager[_0x4aa3dc(0x128)](_0x3827aa)?this[_0x4aa3dc(0x105)](_0x3827aa,_0x574b78):VisuMZ[_0x4aa3dc(0x44a)][_0x4aa3dc(0x236)][_0x4aa3dc(0x395)](this,_0x3827aa,_0x574b78);},Game_Variables[_0xbbde9f(0x238)]['setSelfValue']=function(_0x2ec4bf,_0x29b566){const _0xbdf647=_0xbbde9f,_0x3615df=$gameTemp[_0xbdf647(0x449)]()||this;if(_0x3615df[_0xbdf647(0x304)]!==Game_Event)VisuMZ[_0xbdf647(0x44a)][_0xbdf647(0x236)][_0xbdf647(0x395)](this,_0x2ec4bf,_0x29b566);else{const _0x2d00cd=[_0x3615df[_0xbdf647(0x174)],_0x3615df[_0xbdf647(0x331)],_0xbdf647(0x3dc)['format'](_0x2ec4bf)];$gameSelfSwitches['setValue'](_0x2d00cd,_0x29b566);}},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x2c1)]=Game_SelfSwitches['prototype'][_0xbbde9f(0x451)],Game_SelfSwitches[_0xbbde9f(0x238)]['value']=function(_0x4da90e){const _0x3857fa=_0xbbde9f;if(_0x4da90e[0x2]['match'](/SELF/i))return this[_0x3857fa(0x3c4)](_0x4da90e);else{return VisuMZ[_0x3857fa(0x44a)]['Game_SelfSwitches_value'][_0x3857fa(0x395)](this,_0x4da90e);;}},Game_SelfSwitches[_0xbbde9f(0x238)][_0xbbde9f(0x3c4)]=function(_0x40bbc0){const _0x555a97=_0xbbde9f;return _0x40bbc0[0x2][_0x555a97(0x396)](/VAR/i)?this[_0x555a97(0x1c8)][_0x40bbc0]||0x0:!!this[_0x555a97(0x1c8)][_0x40bbc0];},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x1c0)]=Game_SelfSwitches[_0xbbde9f(0x238)][_0xbbde9f(0x3d6)],Game_SelfSwitches['prototype']['setValue']=function(_0x3b8f8e,_0x8a1ce8){const _0x4bb78b=_0xbbde9f;_0x3b8f8e[0x2]['match'](/SELF/i)?this['setSelfValue'](_0x3b8f8e,_0x8a1ce8):VisuMZ[_0x4bb78b(0x44a)][_0x4bb78b(0x1c0)][_0x4bb78b(0x395)](this,_0x3b8f8e,_0x8a1ce8);},Game_SelfSwitches[_0xbbde9f(0x238)]['setSelfValue']=function(_0x82e0e9,_0x53352d){const _0x2f0045=_0xbbde9f;this[_0x2f0045(0x1c8)][_0x82e0e9]=_0x82e0e9[0x2][_0x2f0045(0x396)](/VAR/i)?_0x53352d:!!_0x53352d,this[_0x2f0045(0x102)]();},VisuMZ[_0xbbde9f(0x44a)]['Game_Enemy_meetsSwitchCondition']=Game_Enemy['prototype'][_0xbbde9f(0xe5)],Game_Enemy[_0xbbde9f(0x238)][_0xbbde9f(0xe5)]=function(_0x210a05){const _0x2e0df7=_0xbbde9f;$gameTemp[_0x2e0df7(0x21c)](this);const _0x4693a1=VisuMZ['EventsMoveCore'][_0x2e0df7(0x219)][_0x2e0df7(0x395)](this,_0x210a05);return $gameTemp['clearSelfTarget'](),_0x4693a1;},VisuMZ['EventsMoveCore']['Game_Troop_meetsConditions']=Game_Troop[_0xbbde9f(0x238)][_0xbbde9f(0x391)],Game_Troop['prototype'][_0xbbde9f(0x391)]=function(_0x1c9392){const _0x4104c6=_0xbbde9f;$gameTemp[_0x4104c6(0x21c)](this);const _0x36e084=VisuMZ[_0x4104c6(0x44a)][_0x4104c6(0x1b6)]['call'](this,_0x1c9392);return $gameTemp['clearSelfTarget'](),_0x36e084;},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0xfb)]=Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x1d5)],Game_Map[_0xbbde9f(0x238)]['setup']=function(_0x3520bc){const _0x244a09=_0xbbde9f;this[_0x244a09(0x151)](_0x3520bc),this[_0x244a09(0x2e8)](),VisuMZ[_0x244a09(0x44a)]['Game_Map_setup'][_0x244a09(0x395)](this,_0x3520bc),this[_0x244a09(0x2e8)](),this['setupDiagonalSupport'](),this['setupRegionRestrictions'](),this[_0x244a09(0xf5)](),this[_0x244a09(0x137)](),this['clearEventCache']();},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x41a)]=Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x35d)],Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x35d)]=function(){const _0xaa7c76=_0xbbde9f;VisuMZ['EventsMoveCore'][_0xaa7c76(0x41a)][_0xaa7c76(0x395)](this),this[_0xaa7c76(0x3ef)]();},Game_Map[_0xbbde9f(0x34a)]=0xc8,Game_Map['prototype'][_0xbbde9f(0x1a5)]=function(){const _0x3437f5=_0xbbde9f,_0x461ebd=Game_Map[_0x3437f5(0x34a)];this['_eventOverload']=this[_0x3437f5(0x344)]()['length']>_0x461ebd;if(this['_eventOverload']&&$gameTemp[_0x3437f5(0x2a5)]()){}},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x338)]=function(){const _0x50d855=_0xbbde9f;return this[_0x50d855(0x3a2)];},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x2e8)]=function(){const _0x33ec6a=_0xbbde9f;this[_0x33ec6a(0x3b0)]=undefined;},Game_Map[_0xbbde9f(0x238)]['setupDiagonalSupport']=function(){const _0x32a36c=_0xbbde9f;this['_diagonalSupport']=VisuMZ[_0x32a36c(0x44a)][_0x32a36c(0x200)][_0x32a36c(0x3de)][_0x32a36c(0xc3)];const _0x2b3afd=$dataMap['note']||'';if(_0x2b3afd[_0x32a36c(0x396)](/<DIAGONAL MOVEMENT: ON>/i))this[_0x32a36c(0xf9)]=!![];else _0x2b3afd[_0x32a36c(0x396)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x32a36c(0xf9)]=![]);},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0xf4)]=function(){const _0x10d206=_0xbbde9f,_0x2b508c=$gameSystem[_0x10d206(0x343)]();if(_0x2b508c===_0x10d206(0x1c6))return!![];if(_0x2b508c===_0x10d206(0x2dc))return![];if(this[_0x10d206(0xf9)]===undefined)this[_0x10d206(0x25e)]();return this[_0x10d206(0xf9)];},Game_Map['prototype'][_0xbbde9f(0x14a)]=function(_0x889e92,_0x583e19){const _0x34b691=_0xbbde9f;if([0x1,0x4,0x7]['includes'](_0x583e19))_0x889e92-=0x1;if([0x3,0x6,0x9][_0x34b691(0x337)](_0x583e19))_0x889e92+=0x1;return this[_0x34b691(0x175)](_0x889e92);},Game_Map['prototype'][_0xbbde9f(0x11b)]=function(_0x4670cf,_0x17cbcd){const _0x130d8a=_0xbbde9f;if([0x1,0x2,0x3][_0x130d8a(0x337)](_0x17cbcd))_0x4670cf+=0x1;if([0x7,0x8,0x9][_0x130d8a(0x337)](_0x17cbcd))_0x4670cf-=0x1;return this[_0x130d8a(0xbd)](_0x4670cf);},Game_Map['prototype']['absDistance']=function(_0x3bcb69,_0x41f16f,_0x53c2a4,_0x237082){const _0x268e97=_0xbbde9f;return Math['max'](Math[_0x268e97(0x299)](this[_0x268e97(0x15b)](_0x3bcb69,_0x53c2a4)),Math['abs'](this[_0x268e97(0x3a1)](_0x41f16f,_0x237082)));},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0xe2)]=function(){const _0x3cb16f=_0xbbde9f,_0x40f0af=VisuMZ[_0x3cb16f(0x44a)]['Settings'][_0x3cb16f(0x3d2)],_0x246b53={},_0x53bd03=[_0x3cb16f(0x2d2),_0x3cb16f(0x24e),_0x3cb16f(0x141)],_0x403563=[_0x3cb16f(0x239),_0x3cb16f(0x193),_0x3cb16f(0x212),_0x3cb16f(0x3fd),'Vehicle',_0x3cb16f(0x3e2),_0x3cb16f(0x206),_0x3cb16f(0x26f)];for(const _0x418f8e of _0x53bd03){for(const _0x513dc3 of _0x403563){const _0x387ddf=_0x3cb16f(0x10f)[_0x3cb16f(0x10c)](_0x513dc3,_0x418f8e);_0x40f0af[_0x387ddf]&&(_0x246b53[_0x387ddf]=_0x40f0af[_0x387ddf][_0x3cb16f(0xc9)](0x0));}}const _0x4994cc=$dataMap['note']||'',_0x1b2b3c=_0x4994cc[_0x3cb16f(0x396)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);if(_0x1b2b3c)for(const _0x18250d of _0x1b2b3c){_0x18250d[_0x3cb16f(0x396)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x5cbbaa=String(RegExp['$1'])[_0x3cb16f(0x34c)]()[_0x3cb16f(0x242)](),_0x58e887=String(RegExp['$2'])[_0x3cb16f(0x34c)]()[_0x3cb16f(0x242)]();const _0x99d7ce=JSON[_0x3cb16f(0x1eb)]('['+RegExp['$3'][_0x3cb16f(0x396)](/\d+/g)+']');_0x5cbbaa=_0x5cbbaa[_0x3cb16f(0x180)](0x0)[_0x3cb16f(0x295)]()+_0x5cbbaa[_0x3cb16f(0xc9)](0x1),_0x58e887=_0x58e887[_0x3cb16f(0x180)](0x0)['toUpperCase']()+_0x58e887[_0x3cb16f(0xc9)](0x1);const _0x1269d3=_0x3cb16f(0x10f)['format'](_0x5cbbaa,_0x58e887);if(_0x246b53[_0x1269d3])_0x246b53[_0x1269d3]=_0x246b53[_0x1269d3][_0x3cb16f(0x179)](_0x99d7ce);}this[_0x3cb16f(0x1e2)]=_0x246b53;},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x25d)]=function(_0x1bd746,_0xc22cad,_0x5e4c11,_0x577b4b){const _0x1345a3=_0xbbde9f,_0x2ce9a6=this['roundXWithDirection'](_0x1bd746,_0x5e4c11),_0x4f76da=this[_0x1345a3(0x11b)](_0xc22cad,_0x5e4c11),_0x3b5b09=this['regionId'](_0x2ce9a6,_0x4f76da),_0x932834=this['_regionRules'];if(_0x932834[_0x1345a3(0x1a6)][_0x1345a3(0x337)](_0x3b5b09))return!![];else{if(_0x577b4b===_0x1345a3(0x1b7))return _0x932834[_0x1345a3(0x2eb)]['includes'](_0x3b5b09)||_0x932834['WalkAllow'][_0x1345a3(0x337)](_0x3b5b09);else{if(_0x577b4b===_0x1345a3(0xbf))return _0x932834['EventAllow'][_0x1345a3(0x337)](_0x3b5b09)||_0x932834[_0x1345a3(0x273)][_0x1345a3(0x337)](_0x3b5b09);else{if(_0x932834[_0x1345a3(0x354)][_0x1345a3(0x337)](_0x3b5b09))return!![];else{const _0xe127ee=_0x1345a3(0x41b)['format'](_0x577b4b[_0x1345a3(0x180)](0x0)[_0x1345a3(0x295)]()+_0x577b4b[_0x1345a3(0xc9)](0x1));if(_0x932834[_0xe127ee])return _0x932834[_0xe127ee]['includes'](_0x3b5b09);}}}}return![];},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x2fe)]=function(_0xe09fa9,_0x1882a1,_0x1b46ca,_0x27c026){const _0x4da7df=_0xbbde9f,_0x11d340=this['roundXWithDirection'](_0xe09fa9,_0x1b46ca),_0x5c7d35=this['roundYWithDirection'](_0x1882a1,_0x1b46ca),_0x11146a=this[_0x4da7df(0x154)](_0x11d340,_0x5c7d35),_0x24a9d5=this[_0x4da7df(0x1e2)];if(_0x24a9d5[_0x4da7df(0x101)][_0x4da7df(0x337)](_0x11146a))return!![];else{if(_0x27c026===_0x4da7df(0x1b7))return _0x24a9d5[_0x4da7df(0x438)][_0x4da7df(0x337)](_0x11146a)||_0x24a9d5['WalkForbid'][_0x4da7df(0x337)](_0x11146a);else{if(_0x27c026===_0x4da7df(0xbf))return _0x24a9d5[_0x4da7df(0x1aa)][_0x4da7df(0x337)](_0x11146a)||_0x24a9d5[_0x4da7df(0x430)][_0x4da7df(0x337)](_0x11146a);else{if(_0x24a9d5[_0x4da7df(0x44c)]['includes'](_0x11146a))return!![];else{const _0x3ae05b=_0x4da7df(0x428)[_0x4da7df(0x10c)](_0x27c026[_0x4da7df(0x180)](0x0)[_0x4da7df(0x295)]()+_0x27c026[_0x4da7df(0xc9)](0x1));if(_0x24a9d5[_0x3ae05b])return _0x24a9d5[_0x3ae05b]['includes'](_0x11146a);}}}}return![];},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x224)]=function(_0x459f3d,_0x4b003f,_0x443a61,_0x5cc90f){const _0x103299=_0xbbde9f;_0x443a61=_0x5cc90f===_0x103299(0x1b0)?0x5:_0x443a61;const _0x2ddeee=this[_0x103299(0x14a)](_0x459f3d,_0x443a61),_0x472b96=this['roundYWithDirection'](_0x4b003f,_0x443a61),_0x56d37e=this[_0x103299(0x154)](_0x2ddeee,_0x472b96),_0xd269b7=this[_0x103299(0x1e2)];if(_0xd269b7[_0x103299(0x21f)][_0x103299(0x337)](_0x56d37e))return!![];else{const _0x12b329='%1Dock'[_0x103299(0x10c)](_0x5cc90f[_0x103299(0x180)](0x0)[_0x103299(0x295)]()+_0x5cc90f[_0x103299(0xc9)](0x1));if(_0xd269b7[_0x12b329])return _0xd269b7[_0x12b329][_0x103299(0x337)](_0x56d37e);}return![];},VisuMZ['EventsMoveCore'][_0xbbde9f(0xcf)]=Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x2e1)],Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x2e1)]=function(){const _0x1739ea=_0xbbde9f;VisuMZ[_0x1739ea(0x44a)][_0x1739ea(0xcf)]['call'](this),this[_0x1739ea(0x1b5)]();},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x1b5)]=function(){const _0x98363f=_0xbbde9f;this[_0x98363f(0x388)]=![];if(this[_0x98363f(0x344)]()[_0x98363f(0xb4)](_0x1dab5f=>_0x1dab5f[_0x98363f(0x3d8)]())){this[_0x98363f(0x388)]=!![];return;}if(this[_0x98363f(0x344)]()['some'](_0x1b5c1f=>_0x1b5c1f[_0x98363f(0x40b)]())){this['_needsPeriodicRefresh']=!![];return;}if(this['_commonEvents'][_0x98363f(0xb4)](_0x789028=>_0x789028['hasAdvancedSwitchVariable']())){this[_0x98363f(0x388)]=!![];return;}if(this[_0x98363f(0x130)]['some'](_0x2bd141=>_0x2bd141[_0x98363f(0x40b)]())){this[_0x98363f(0x388)]=!![];return;}},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x1c3)]=Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x3c6)],Game_Map[_0xbbde9f(0x238)]['update']=function(_0x58b2ce){const _0x8f64b4=_0xbbde9f;this['updatePeriodicRefresh'](),VisuMZ[_0x8f64b4(0x44a)][_0x8f64b4(0x1c3)][_0x8f64b4(0x395)](this,_0x58b2ce);},Game_Map['prototype'][_0xbbde9f(0x280)]=function(){const _0x421cb0=_0xbbde9f;if(!this[_0x421cb0(0x388)])return;this[_0x421cb0(0x32d)]=this[_0x421cb0(0x32d)]||0x3c,this[_0x421cb0(0x32d)]--,this[_0x421cb0(0x32d)]<=0x0&&(this[_0x421cb0(0x1d3)](),this[_0x421cb0(0x32d)]=0x3c);},VisuMZ['EventsMoveCore'][_0xbbde9f(0x246)]=Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x3e0)],Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x3e0)]=function(){const _0x355c3d=_0xbbde9f;if(!$gameSystem[_0x355c3d(0x37f)]())return!![];return VisuMZ[_0x355c3d(0x44a)][_0x355c3d(0x246)][_0x355c3d(0x395)](this);},Game_Map['prototype'][_0xbbde9f(0xf5)]=function(){const _0x190372=_0xbbde9f;this[_0x190372(0x383)]=![];const _0x5b202e=$dataMap['note']||'';_0x5b202e['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocations']=!![]);},Game_Map['prototype'][_0xbbde9f(0x37e)]=function(){const _0x419abe=_0xbbde9f;if(this[_0x419abe(0x383)]===undefined)this[_0x419abe(0xf5)]();return this[_0x419abe(0x383)];},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x151)]=function(_0x5dfb31){const _0x30fa97=_0xbbde9f;_0x5dfb31!==this['mapId']()&&$gamePlayer&&$gameSystem[_0x30fa97(0x151)](this['mapId']());},Game_Map['prototype'][_0xbbde9f(0x137)]=function(){const _0x27da69=_0xbbde9f;this[_0x27da69(0x275)]=$gameSystem[_0x27da69(0x262)](this[_0x27da69(0x380)]()),this[_0x27da69(0x1f8)]=!![];},VisuMZ['EventsMoveCore'][_0xbbde9f(0x1f5)]=Game_Map['prototype'][_0xbbde9f(0x344)],Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x344)]=function(){const _0x262457=_0xbbde9f;if(this[_0x262457(0x3b0)])return this[_0x262457(0x3b0)];const _0x19a886=VisuMZ[_0x262457(0x44a)]['Game_Map_events'][_0x262457(0x395)](this),_0x518fd9=_0x19a886['concat'](this['_spawnedEvents']||[]);return this[_0x262457(0x3b0)]=_0x518fd9[_0x262457(0x37a)](_0x5d60e7=>!!_0x5d60e7),this[_0x262457(0x3b0)];},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x2ac)]=Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0xbf)],Game_Map['prototype'][_0xbbde9f(0xbf)]=function(_0x38f971){const _0x466dcb=_0xbbde9f;return _0x38f971>=0x3e8?(_0x38f971-=0x3e8,this[_0x466dcb(0x275)][_0x38f971]):VisuMZ['EventsMoveCore'][_0x466dcb(0x2ac)][_0x466dcb(0x395)](this,_0x38f971);},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x2f4)]=function(_0x156062){const _0x5014ba=_0xbbde9f,_0xe3ed7a=this[_0x5014ba(0xbf)](_0x156062);if(_0xe3ed7a)_0xe3ed7a[_0x5014ba(0x123)]();},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x339)]=function(){const _0x1eddf4=_0xbbde9f,_0x5c719e={'template':_0x1eddf4(0x2b8),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this['_spawnedEvents'][_0x1eddf4(0x3b8)]+0x3e8};this['createSpawnedEventWithData'](_0x5c719e);},Game_Map['prototype'][_0xbbde9f(0x1ac)]=function(_0x1164d1,_0xc62d32){const _0x1f64e6=_0xbbde9f;if(this['eventsXy'](_0x1164d1,_0xc62d32)['length']>0x0)return!![];if($gamePlayer['x']===_0x1164d1&&$gamePlayer['y']===_0xc62d32)return!![];if(this[_0x1f64e6(0x439)]()[_0x1f64e6(0x2bd)](_0x1164d1,_0xc62d32))return!![];if(this[_0x1f64e6(0x26a)]()[_0x1f64e6(0x2bd)](_0x1164d1,_0xc62d32))return!![];return![];},Game_Map['prototype'][_0xbbde9f(0x27b)]=function(_0x2bd6c7,_0x557bd9,_0x3e926c){const _0x281bef=_0xbbde9f;$gameTemp[_0x281bef(0x36c)]=_0x2bd6c7;const _0x7a4c6f=new Game_Event(_0x2bd6c7[_0x281bef(0x380)],_0x2bd6c7[_0x281bef(0x211)]);$gameTemp[_0x281bef(0x36c)]=undefined,_0x7a4c6f['refresh']();let _0x5a48f5=_0x557bd9-_0x7a4c6f[_0x281bef(0x34d)][_0x281bef(0x385)],_0x36dc53=_0x557bd9+_0x7a4c6f[_0x281bef(0x34d)]['left'],_0x3dafc2=_0x3e926c-_0x7a4c6f[_0x281bef(0x34d)]['up'],_0x39b576=_0x3e926c+_0x7a4c6f[_0x281bef(0x34d)][_0x281bef(0x3f6)];for(let _0x3177dc=_0x5a48f5;_0x3177dc<=_0x36dc53;_0x3177dc++){for(let _0x43722d=_0x3dafc2;_0x43722d<=_0x39b576;_0x43722d++){if(this[_0x281bef(0x1ac)](_0x3177dc,_0x43722d))return![];}}return!![];},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x349)]=function(_0x46d431){const _0x128e11=_0xbbde9f;$gameTemp[_0x128e11(0x36c)]=_0x46d431;const _0x489b65=new Game_Event(_0x46d431[_0x128e11(0x380)],_0x46d431[_0x128e11(0x211)]);$gameTemp[_0x128e11(0x36c)]=undefined,this['_spawnedEvents'][_0x128e11(0x2e9)](_0x489b65),_0x489b65[_0x128e11(0x247)](_0x46d431),this[_0x128e11(0x2e8)]();},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x144)]=function(_0x5cda61,_0x1c40f4,_0x4439b2){const _0x4e8780=_0xbbde9f,_0x2b5c0e=_0x5cda61['x'],_0x12de26=_0x5cda61['y'];if(!this['isValid'](_0x2b5c0e,_0x12de26))return![];if(_0x1c40f4){if(this['checkExistingEntitiesAt'](_0x2b5c0e,_0x12de26))return![];if(!this['isSpawnHitboxCollisionOk'](_0x5cda61,_0x2b5c0e,_0x12de26))return![];}if(_0x4439b2){if(!this[_0x4e8780(0x136)](_0x2b5c0e,_0x12de26))return![];}return this[_0x4e8780(0x349)](_0x5cda61),!![];},Game_Map['prototype'][_0xbbde9f(0xd9)]=function(_0x392bff,_0xc9c023,_0x41930c,_0x5f5c2d){const _0x48581a=_0xbbde9f,_0x99a0ae=[],_0x562cb9=this['width'](),_0x592110=this[_0x48581a(0x177)]();for(let _0x326f63=0x0;_0x326f63<_0x562cb9;_0x326f63++){for(let _0x496ae6=0x0;_0x496ae6<_0x592110;_0x496ae6++){if(!_0xc9c023[_0x48581a(0x337)](this[_0x48581a(0x154)](_0x326f63,_0x496ae6)))continue;if(!this['isValid'](_0x326f63,_0x496ae6))continue;if(_0x41930c){if(this['checkExistingEntitiesAt'](_0x326f63,_0x496ae6))continue;if(!this[_0x48581a(0x27b)](_0x392bff,_0x326f63,_0x496ae6))continue;}if(_0x5f5c2d){if(!this[_0x48581a(0x136)](_0x326f63,_0x496ae6))continue;}_0x99a0ae['push']([_0x326f63,_0x496ae6]);}}if(_0x99a0ae[_0x48581a(0x3b8)]>0x0){const _0x4f2d23=_0x99a0ae[Math[_0x48581a(0x3b3)](_0x99a0ae[_0x48581a(0x3b8)])];return _0x392bff['x']=_0x4f2d23[0x0],_0x392bff['y']=_0x4f2d23[0x1],this[_0x48581a(0x349)](_0x392bff),!![];}return![];},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x3df)]=function(_0x4e6dc6,_0x28a4b1,_0x170b20,_0x1640dd){const _0x33d66b=_0xbbde9f,_0x19f9d0=[],_0x23962f=this[_0x33d66b(0x1be)](),_0x5b4039=this[_0x33d66b(0x177)]();for(let _0x154b10=0x0;_0x154b10<_0x23962f;_0x154b10++){for(let _0x449a5b=0x0;_0x449a5b<_0x5b4039;_0x449a5b++){if(!_0x28a4b1[_0x33d66b(0x337)](this[_0x33d66b(0x110)](_0x154b10,_0x449a5b)))continue;if(!this[_0x33d66b(0x1ee)](_0x154b10,_0x449a5b))continue;if(_0x170b20){if(this[_0x33d66b(0x1ac)](_0x154b10,_0x449a5b))continue;if(!this['isSpawnHitboxCollisionOk'](_0x4e6dc6,_0x154b10,_0x449a5b))continue;}if(_0x1640dd){if(!this[_0x33d66b(0x136)](_0x154b10,_0x449a5b))continue;}_0x19f9d0[_0x33d66b(0x2e9)]([_0x154b10,_0x449a5b]);}}if(_0x19f9d0['length']>0x0){const _0x285bef=_0x19f9d0[Math['randomInt'](_0x19f9d0[_0x33d66b(0x3b8)])];return _0x4e6dc6['x']=_0x285bef[0x0],_0x4e6dc6['y']=_0x285bef[0x1],this['createSpawnedEventWithData'](_0x4e6dc6),!![];}return![];},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x136)]=function(_0x3479f3,_0x458621){const _0x17b49f=_0xbbde9f;if(this[_0x17b49f(0xe3)](_0x3479f3,_0x458621,0x2))return!![];if(this[_0x17b49f(0xe3)](_0x3479f3,_0x458621,0x4))return!![];if(this[_0x17b49f(0xe3)](_0x3479f3,_0x458621,0x6))return!![];if(this['isPassable'](_0x3479f3,_0x458621,0x8))return!![];return![];},Game_Map['prototype'][_0xbbde9f(0x25f)]=function(_0x37124a){const _0x1cf8f7=_0xbbde9f;if(_0x37124a<0x3e8)return;if(!this[_0x1cf8f7(0x275)])return;const _0x33779b=this[_0x1cf8f7(0xbf)](_0x37124a);_0x33779b[_0x1cf8f7(0x21d)](-0x1,-0x1),_0x33779b[_0x1cf8f7(0x123)](),this[_0x1cf8f7(0x275)][_0x37124a-0x3e8]=null,this[_0x1cf8f7(0x2e8)]();},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x2fd)]=function(){const _0x3a77f6=_0xbbde9f;for(const _0x50db95 of this[_0x3a77f6(0x275)]){if(_0x50db95)return _0x50db95;}return null;},Game_Map[_0xbbde9f(0x238)]['firstSpawnedEventID']=function(){const _0x5135e8=_0xbbde9f,_0x58aa5a=this[_0x5135e8(0x2fd)]();return _0x58aa5a?_0x58aa5a[_0x5135e8(0x331)]:0x0;},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x2fb)]=function(){const _0x5c16ac=_0xbbde9f,_0xa5526f=this[_0x5c16ac(0x275)][_0x5c16ac(0xc9)](0x0)[_0x5c16ac(0x19b)]();for(const _0x2c7c52 of _0xa5526f){if(_0x2c7c52)return _0x2c7c52;}return null;},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x1cd)]=function(){const _0x1aeb65=_0xbbde9f,_0x2b1019=this[_0x1aeb65(0x2fb)]();return _0x2b1019?_0x2b1019[_0x1aeb65(0x331)]:0x0;},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x147)]=function(_0x40d89d,_0x1bbfb5){const _0x5312ad=_0xbbde9f,_0x2bd89e=this['eventsXy'](_0x40d89d,_0x1bbfb5);for(const _0x2f2cb9 of _0x2bd89e){if(!_0x2f2cb9)continue;if(_0x2f2cb9[_0x5312ad(0x197)]())this['despawnEventId'](_0x2f2cb9[_0x5312ad(0x331)]);}},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x408)]=function(_0x2c9e79){const _0x23916b=_0xbbde9f;for(const _0x1aadaf of this[_0x23916b(0x275)]){if(!_0x1aadaf)continue;_0x2c9e79['includes'](_0x1aadaf['regionId']())&&this[_0x23916b(0x25f)](_0x1aadaf[_0x23916b(0x331)]);}},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x250)]=function(_0x1764dd){const _0x1c224d=_0xbbde9f;for(const _0x59f5dc of this['_spawnedEvents']){if(!_0x59f5dc)continue;_0x1764dd['includes'](_0x59f5dc['terrainTag']())&&this[_0x1c224d(0x25f)](_0x59f5dc[_0x1c224d(0x331)]);}},Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0xb8)]=function(){const _0x41340f=_0xbbde9f;for(const _0x48eb16 of this[_0x41340f(0x275)]){if(!_0x48eb16)continue;this[_0x41340f(0x25f)](_0x48eb16['_eventId']);}},VisuMZ[_0xbbde9f(0x44a)]['Game_Map_unlockEvent']=Game_Map['prototype'][_0xbbde9f(0x3a8)],Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x3a8)]=function(_0x5b6fbe){const _0x1b8ebb=_0xbbde9f;VisuMZ[_0x1b8ebb(0x44a)][_0x1b8ebb(0x208)][_0x1b8ebb(0x395)](this,_0x5b6fbe);if(_0x5b6fbe>=0x3e8){const _0x6387fd=this[_0x1b8ebb(0xbf)](_0x5b6fbe);if(_0x6387fd)_0x6387fd[_0x1b8ebb(0x106)]();}},Game_CommonEvent[_0xbbde9f(0x238)]['hasAdvancedSwitchVariable']=function(){const _0x59f2cf=_0xbbde9f,_0x33cb53=this[_0x59f2cf(0xbf)]();return this['isActive']()&&_0x33cb53[_0x59f2cf(0x3ff)]>=0x1&&DataManager[_0x59f2cf(0x1fc)](_0x33cb53[_0x59f2cf(0x119)]);},Game_CommonEvent[_0xbbde9f(0x238)][_0xbbde9f(0x40b)]=function(){const _0x3eef0b=_0xbbde9f;return VisuMZ[_0x3eef0b(0x44a)]['CustomPageConditions'][_0x3eef0b(0x130)][_0x3eef0b(0x337)](this[_0x3eef0b(0x3d1)]);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x232)]=Game_CommonEvent['prototype'][_0xbbde9f(0x389)],Game_CommonEvent[_0xbbde9f(0x238)][_0xbbde9f(0x389)]=function(){const _0xf7880d=_0xbbde9f;return VisuMZ[_0xf7880d(0x44a)][_0xf7880d(0x232)][_0xf7880d(0x395)](this)?!![]:VisuMZ[_0xf7880d(0x44a)]['CustomPageConditions'][_0xf7880d(0x35c)](this[_0xf7880d(0xbf)]()[_0xf7880d(0x3d5)],this[_0xf7880d(0x3d1)]);},VisuMZ['EventsMoveCore'][_0xbbde9f(0x3fa)]=Game_Map[_0xbbde9f(0x238)][_0xbbde9f(0x1ba)],Game_Map[_0xbbde9f(0x238)]['parallelCommonEvents']=function(){const _0x1b0b6c=_0xbbde9f,_0x5d32fe=VisuMZ['EventsMoveCore']['Game_Map_parallelCommonEvents'][_0x1b0b6c(0x395)](this),_0x450498=VisuMZ[_0x1b0b6c(0x44a)][_0x1b0b6c(0x22e)][_0x1b0b6c(0x130)][_0x1b0b6c(0x186)](_0x521ff1=>$dataCommonEvents[_0x521ff1]);return _0x5d32fe[_0x1b0b6c(0x179)](_0x450498)[_0x1b0b6c(0x37a)]((_0x1b5f13,_0x41b023,_0x2ab28d)=>_0x2ab28d[_0x1b0b6c(0x1e0)](_0x1b5f13)===_0x41b023);},VisuMZ[_0xbbde9f(0x44a)]['Game_CharacterBase_initMembers']=Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x254)],Game_CharacterBase['prototype']['initMembers']=function(){const _0xcfbde8=_0xbbde9f;VisuMZ[_0xcfbde8(0x44a)][_0xcfbde8(0x34e)][_0xcfbde8(0x395)](this),this[_0xcfbde8(0x423)]();},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x423)]=function(){const _0x50ced7=_0xbbde9f;this[_0x50ced7(0x269)]=![],this['clearPose'](),this['clearDashing'](),this[_0x50ced7(0x172)](),this['clearStepPattern']();},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x326)]=function(){const _0x36328d=_0xbbde9f;if(this[_0x36328d(0x304)]===Game_Player&&this['isInVehicle']())return this[_0x36328d(0x157)]()['characterName']()[_0x36328d(0x396)](/\[VS8\]/i);else return Imported[_0x36328d(0x38e)]&&this[_0x36328d(0x2ae)]()?!![]:this[_0x36328d(0x293)]()[_0x36328d(0x396)](/\[VS8\]/i);},VisuMZ['EventsMoveCore']['Game_CharacterBase_direction']=Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x375)],Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x375)]=function(){const _0xcf581d=_0xbbde9f;if(this[_0xcf581d(0x1f9)]()&&!this['isJumping']()&&this[_0xcf581d(0x326)]())return this['directionOnLadderSpriteVS8dir']();else{if(this[_0xcf581d(0x1f9)]()&&!this['isJumping']())return 0x8;else return this[_0xcf581d(0x36d)]()&&this[_0xcf581d(0x326)]()?this[_0xcf581d(0x445)]():VisuMZ[_0xcf581d(0x44a)][_0xcf581d(0x2ca)][_0xcf581d(0x395)](this);}},VisuMZ[_0xbbde9f(0x44a)]['Game_CharacterBase_setDirection']=Game_CharacterBase['prototype'][_0xbbde9f(0xba)],Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0xba)]=function(_0x3ac68a){const _0x1bdaeb=_0xbbde9f;if(!this[_0x1bdaeb(0x326)]())_0x3ac68a=this[_0x1bdaeb(0x113)](_0x3ac68a);VisuMZ[_0x1bdaeb(0x44a)]['Game_CharacterBase_setDirection'][_0x1bdaeb(0x395)](this,_0x3ac68a);},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x113)]=function(_0x4ed607){const _0x57eeaf=_0xbbde9f;if(_0x4ed607===0x1)return this['canPass'](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x4ed607===0x3)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x4ed607===0x7)return this[_0x57eeaf(0x2ea)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x4ed607===0x9)return this[_0x57eeaf(0x2ea)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x4ed607;},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x27f)]=function(_0x231623){const _0x1fe104=_0xbbde9f;return[0x1,0x3,0x5,0x7,0x9][_0x1fe104(0x337)](_0x231623);},Game_CharacterBase['prototype'][_0xbbde9f(0x283)]=function(){const _0x2fe9cb=_0xbbde9f;return this[_0x2fe9cb(0xfd)]||0x0;},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x397)]=Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x42c)],Game_CharacterBase[_0xbbde9f(0x238)]['moveStraight']=function(_0x33d961){const _0x11c44f=_0xbbde9f;this['_lastMovedDirection']=_0x33d961,VisuMZ['EventsMoveCore'][_0x11c44f(0x397)][_0x11c44f(0x395)](this,_0x33d961);},Game_CharacterBase['prototype'][_0xbbde9f(0x2c0)]=function(_0xdc5745){const _0xe77598=_0xbbde9f;if(!this[_0xe77598(0x27f)](_0xdc5745))return this[_0xe77598(0x42c)](_0xdc5745);let _0x46e015=0x0,_0x2c1ec7=0x0;switch(_0xdc5745){case 0x1:_0x46e015=0x4,_0x2c1ec7=0x2;break;case 0x3:_0x46e015=0x6,_0x2c1ec7=0x2;break;case 0x7:_0x46e015=0x4,_0x2c1ec7=0x8;break;case 0x9:_0x46e015=0x6,_0x2c1ec7=0x8;break;}if(VisuMZ[_0xe77598(0x44a)]['Settings']['Movement'][_0xe77598(0x270)]){if(!this['canPass'](this['_x'],this['_y'],_0x46e015))return this[_0xe77598(0x42c)](_0x2c1ec7);if(!this['canPass'](this['_x'],this['_y'],_0x2c1ec7))return this[_0xe77598(0x42c)](_0x46e015);if(!this[_0xe77598(0xd4)](this['_x'],this['_y'],_0x46e015,_0x2c1ec7)){let _0x42c121=VisuMZ['EventsMoveCore'][_0xe77598(0x200)]['Movement'][_0xe77598(0x1b9)]?_0x46e015:_0x2c1ec7;return this[_0xe77598(0x42c)](_0x42c121);}}this['_lastMovedDirection']=_0xdc5745,this[_0xe77598(0x1a4)](_0x46e015,_0x2c1ec7);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x135)]=Game_CharacterBase[_0xbbde9f(0x238)]['realMoveSpeed'],Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x2f8)]=function(){const _0x33c831=_0xbbde9f;let _0x285ffe=this[_0x33c831(0x1d7)];return this['isDashing']()&&(_0x285ffe+=this['dashSpeedModifier']()),this[_0x33c831(0x33c)](_0x285ffe);},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x1cc)]=function(){const _0x576a28=_0xbbde9f,_0x2ce8b1=VisuMZ['EventsMoveCore'][_0x576a28(0x200)]['Movement'];return _0x2ce8b1[_0x576a28(0x2ed)]!==undefined?_0x2ce8b1[_0x576a28(0x2ed)]:VisuMZ[_0x576a28(0x44a)][_0x576a28(0x135)]['call'](this)-this[_0x576a28(0x1d7)];},Game_CharacterBase[_0xbbde9f(0x238)]['adjustDir8MovementSpeed']=function(_0x1083ee){const _0x2a704c=_0xbbde9f,_0x390b82=VisuMZ[_0x2a704c(0x44a)][_0x2a704c(0x200)]['Movement'];if(!_0x390b82[_0x2a704c(0x188)])return _0x1083ee;return[0x1,0x3,0x7,0x9][_0x2a704c(0x337)](this[_0x2a704c(0xfd)])&&(_0x1083ee*=_0x390b82[_0x2a704c(0x358)]||0.01),_0x1083ee;},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x1e5)]=Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x3e9)],Game_CharacterBase['prototype'][_0xbbde9f(0x3e9)]=function(){const _0x4fbd0a=_0xbbde9f;if(this[_0x4fbd0a(0xb5)])return!![];return VisuMZ[_0x4fbd0a(0x44a)][_0x4fbd0a(0x1e5)][_0x4fbd0a(0x395)](this);},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x297)]=function(){return this['isDashing']();},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x27d)]=Game_CharacterBase['prototype'][_0xbbde9f(0x1c2)],Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x1c2)]=function(){const _0x87fc8b=_0xbbde9f;return this[_0x87fc8b(0x36d)]()?this[_0x87fc8b(0x24a)]():VisuMZ[_0x87fc8b(0x44a)][_0x87fc8b(0x27d)]['call'](this);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x252)]=Game_CharacterBase[_0xbbde9f(0x238)]['increaseSteps'],Game_CharacterBase[_0xbbde9f(0x238)]['increaseSteps']=function(){const _0x4c6541=_0xbbde9f;VisuMZ['EventsMoveCore'][_0x4c6541(0x252)][_0x4c6541(0x395)](this),this[_0x4c6541(0x40c)]();},VisuMZ['EventsMoveCore']['Game_CharacterBase_characterIndex']=Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x14c)],Game_CharacterBase['prototype']['characterIndex']=function(){const _0x10d6cd=_0xbbde9f;if(this['isSpriteVS8dir']())return this[_0x10d6cd(0xd6)]();return VisuMZ['EventsMoveCore'][_0x10d6cd(0x1fa)][_0x10d6cd(0x395)](this);},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0xd6)]=function(){const _0x4f99ab=_0xbbde9f,_0x3cde96=this['direction']();if(this['isJumping']()){if([0x2,0x4,0x6,0x8][_0x4f99ab(0x337)](_0x3cde96))return 0x4;if([0x1,0x3,0x7,0x9][_0x4f99ab(0x337)](_0x3cde96))return 0x5;}else{if(this[_0x4f99ab(0x1f9)]())return 0x6;else{if(this[_0x4f99ab(0x36d)]())return this[_0x4f99ab(0x20b)]();else{if(this[_0x4f99ab(0x139)]){if([0x2,0x4,0x6,0x8]['includes'](_0x3cde96))return 0x4;if([0x1,0x3,0x7,0x9][_0x4f99ab(0x337)](_0x3cde96))return 0x5;}else{if(this[_0x4f99ab(0x201)]()&&this['useCarryPoseForIcons']()){if([0x2,0x4,0x6,0x8][_0x4f99ab(0x337)](_0x3cde96))return 0x4;if([0x1,0x3,0x7,0x9][_0x4f99ab(0x337)](_0x3cde96))return 0x5;}else{if(this[_0x4f99ab(0x297)]()){if([0x2,0x4,0x6,0x8][_0x4f99ab(0x337)](_0x3cde96))return 0x2;if([0x1,0x3,0x7,0x9][_0x4f99ab(0x337)](_0x3cde96))return 0x3;}else{if([0x2,0x4,0x6,0x8]['includes'](_0x3cde96))return 0x0;if([0x1,0x3,0x7,0x9][_0x4f99ab(0x337)](_0x3cde96))return 0x1;}}}}}}},Game_CharacterBase[_0xbbde9f(0x238)]['useCarryPoseForIcons']=function(){const _0x46db8f=_0xbbde9f;return VisuMZ[_0x46db8f(0x44a)][_0x46db8f(0x200)][_0x46db8f(0x31c)][_0x46db8f(0x24d)];},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0xcd)]=function(){const _0x2e1d88=_0xbbde9f;return this[_0x2e1d88(0x1f9)]()&&this[_0x2e1d88(0x110)]()===VisuMZ['EventsMoveCore'][_0x2e1d88(0x200)][_0x2e1d88(0xdb)]['Rope'];},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x31a)]=function(){return this['isOnRope']()?0x4:0x2;},VisuMZ[_0xbbde9f(0x44a)]['Game_CharacterBase_update']=Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x3c6)],Game_CharacterBase['prototype']['update']=function(){const _0x56605b=_0xbbde9f;VisuMZ[_0x56605b(0x44a)][_0x56605b(0xe6)][_0x56605b(0x395)](this),this[_0x56605b(0x109)]();},Game_CharacterBase[_0xbbde9f(0x238)]['updatePose']=function(){const _0xa65080=_0xbbde9f;this[_0xa65080(0x100)]=this[_0xa65080(0x100)]||0x0;if(this['_poseDuration']>0x0){this['_poseDuration']--;if(this[_0xa65080(0x100)]<=0x0&&this['_pose']!==_0xa65080(0x335))this[_0xa65080(0x40c)]();}},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x156)]=Game_CharacterBase['prototype'][_0xbbde9f(0x1a4)],Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x1a4)]=function(_0x5d6685,_0x400644){const _0x176059=_0xbbde9f;VisuMZ['EventsMoveCore'][_0x176059(0x156)][_0x176059(0x395)](this,_0x5d6685,_0x400644);if(this[_0x176059(0x326)]())this[_0x176059(0xb1)](_0x5d6685,_0x400644);},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0xb1)]=function(_0x3cc368,_0x2c6e90){const _0x18ddf6=_0xbbde9f;if(_0x3cc368===0x4&&_0x2c6e90===0x2)this[_0x18ddf6(0xba)](0x1);if(_0x3cc368===0x6&&_0x2c6e90===0x2)this[_0x18ddf6(0xba)](0x3);if(_0x3cc368===0x4&&_0x2c6e90===0x8)this[_0x18ddf6(0xba)](0x7);if(_0x3cc368===0x6&&_0x2c6e90===0x8)this['setDirection'](0x9);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x442)]=Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x353)],Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x353)]=function(){const _0x3691f4=_0xbbde9f;if(this[_0x3691f4(0x36d)]()&&this['getPose']()===_0x3691f4(0x335))return!![];return VisuMZ[_0x3691f4(0x44a)][_0x3691f4(0x442)]['call'](this);},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x274)]=function(_0xbb1f25,_0x59360c){const _0xd48e58=_0xbbde9f;if(_0xbb1f25['match'](/Z/i))_0xbb1f25=_0xd48e58(0x335);if(_0xbb1f25['match'](/SLEEP/i))_0xbb1f25=_0xd48e58(0x335);this['isSpriteVS8dir']()&&(this[_0xd48e58(0xf1)]=_0xbb1f25[_0xd48e58(0x295)]()[_0xd48e58(0x242)](),this['_poseDuration']=_0x59360c||Infinity);},Game_CharacterBase[_0xbbde9f(0x238)]['getPose']=function(){const _0x3de746=_0xbbde9f;return this[_0x3de746(0x326)]()?(this[_0x3de746(0xf1)]||'')['toUpperCase']()[_0x3de746(0x242)]():''[_0x3de746(0x295)]()[_0x3de746(0x242)]();},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x150)]=function(_0xc54d62,_0xbe9002){const _0x2da408=_0xbbde9f;if(this[_0x2da408(0x326)]()){const _0x3b3871=['',_0x2da408(0xe8),_0x2da408(0x3eb),'MUSIC\x20NOTE',_0x2da408(0x3d7),'ANGER',_0x2da408(0x161),_0x2da408(0x209),_0x2da408(0x166),_0x2da408(0x359),_0x2da408(0x335),'','','','',''][_0xc54d62];this['setPose'](_0x3b3871,_0xbe9002);}},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x40c)]=function(){const _0x3859f1=_0xbbde9f;this[_0x3859f1(0xf1)]='',this[_0x3859f1(0x100)]=0x0;},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x36d)]=function(){return this['isSpriteVS8dir']()&&!!this['_pose'];},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x20b)]=function(){const _0x325d03=_0xbbde9f,_0x3f512d=this['_pose'][_0x325d03(0x295)]();switch(this[_0x325d03(0xf1)][_0x325d03(0x295)]()[_0x325d03(0x242)]()){case'ITEM':case _0x325d03(0x3fb):case _0x325d03(0x3dd):case _0x325d03(0x33e):case _0x325d03(0x1d4):case _0x325d03(0x12b):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x445)]=function(){const _0x226726=_0xbbde9f;switch(this[_0x226726(0xf1)][_0x226726(0x295)]()){case'EXCLAMATION':case _0x226726(0x3eb):case _0x226726(0x12d):return 0x2;break;case'HEART':case _0x226726(0x410):case _0x226726(0x161):return 0x4;break;case _0x226726(0x2d1):case _0x226726(0x3fb):case _0x226726(0x3dd):case _0x226726(0x209):case _0x226726(0x166):case _0x226726(0x359):return 0x6;break;case _0x226726(0x33e):case _0x226726(0x1d4):case _0x226726(0x12b):case _0x226726(0x335):case _0x226726(0x3bb):return 0x8;break;default:return VisuMZ[_0x226726(0x44a)][_0x226726(0x37c)][_0x226726(0x395)](this);break;}},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x24a)]=function(){const _0x14fd07=_0xbbde9f;switch(this['_pose']['toUpperCase']()){case _0x14fd07(0x2d1):case _0x14fd07(0x33e):case'EXCLAMATION':case _0x14fd07(0x3d7):case _0x14fd07(0x209):return 0x0;break;case _0x14fd07(0x3fb):case _0x14fd07(0x1d4):case _0x14fd07(0x3eb):case'ANGER':case _0x14fd07(0x166):return 0x1;break;case _0x14fd07(0x3dd):case'COLLAPSE':case _0x14fd07(0x12d):case _0x14fd07(0x161):case _0x14fd07(0x359):return 0x2;break;default:return VisuMZ[_0x14fd07(0x44a)][_0x14fd07(0x27d)]['call'](this);break;}},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x17a)]=function(){const _0x50261d=_0xbbde9f;this[_0x50261d(0x139)]=!![];},Game_CharacterBase['prototype'][_0xbbde9f(0x2bf)]=function(){const _0x4a5c55=_0xbbde9f;this[_0x4a5c55(0x139)]=![];},Game_CharacterBase[_0xbbde9f(0x238)]['forceDashing']=function(){this['_forceDashing']=!![];},Game_CharacterBase['prototype']['clearDashing']=function(){const _0x3c71a0=_0xbbde9f;this[_0x3c71a0(0xb5)]=![];},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x16e)]=function(){const _0x770969=_0xbbde9f;if(this['isTile']())return![];if(this[_0x770969(0x17f)])return![];if(this[_0x770969(0x134)])return![];if(this['_characterName']==='')return![];if(this[_0x770969(0x304)]===Game_Vehicle)return![];return!![];},Game_CharacterBase['prototype'][_0xbbde9f(0x220)]=function(){const _0x2bb426=_0xbbde9f;if(this[_0x2bb426(0x1f9)]())return!![];if(this[_0x2bb426(0x304)]===Game_Player&&this[_0x2bb426(0x44f)]())return!![];return![];},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x225)]=function(){const _0x52124a=_0xbbde9f;return VisuMZ[_0x52124a(0x44a)][_0x52124a(0x200)][_0x52124a(0x3de)][_0x52124a(0x1ca)];},Game_CharacterBase[_0xbbde9f(0x238)]['shadowX']=function(){return this['screenX']();},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0xc8)]=function(){const _0x77dbe6=_0xbbde9f;return this[_0x77dbe6(0xb7)]()+this[_0x77dbe6(0x243)]()+this[_0x77dbe6(0x25c)]();},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x311)]=function(_0x5bac9b,_0x30db35){const _0x59a2e2=_0xbbde9f,_0x221298=this[_0x59a2e2(0x412)](),_0xc6432c=$gameMap[_0x59a2e2(0x1be)](),_0x513aba=[],_0x3ccfe9=[],_0x5401d4=[],_0x5bf6e7={};let _0x380d2e=_0x5bf6e7;if(this['x']===_0x5bac9b&&this['y']===_0x30db35)return 0x0;_0x5bf6e7[_0x59a2e2(0x306)]=null,_0x5bf6e7['x']=this['x'],_0x5bf6e7['y']=this['y'],_0x5bf6e7['g']=0x0,_0x5bf6e7['f']=$gameMap[_0x59a2e2(0x317)](_0x5bf6e7['x'],_0x5bf6e7['y'],_0x5bac9b,_0x30db35),_0x513aba[_0x59a2e2(0x2e9)](_0x5bf6e7),_0x3ccfe9[_0x59a2e2(0x2e9)](_0x5bf6e7['y']*_0xc6432c+_0x5bf6e7['x']);while(_0x513aba[_0x59a2e2(0x3b8)]>0x0){let _0x2844b5=0x0;for(let _0x404650=0x0;_0x404650<_0x513aba[_0x59a2e2(0x3b8)];_0x404650++){_0x513aba[_0x404650]['f']<_0x513aba[_0x2844b5]['f']&&(_0x2844b5=_0x404650);}const _0x3241df=_0x513aba[_0x2844b5],_0x4f7864=_0x3241df['x'],_0x2f320e=_0x3241df['y'],_0x44e920=_0x2f320e*_0xc6432c+_0x4f7864,_0x16de61=_0x3241df['g'];_0x513aba[_0x59a2e2(0x378)](_0x2844b5,0x1),_0x3ccfe9[_0x59a2e2(0x378)](_0x3ccfe9['indexOf'](_0x44e920),0x1),_0x5401d4[_0x59a2e2(0x2e9)](_0x44e920);if(_0x3241df['x']===_0x5bac9b&&_0x3241df['y']===_0x30db35){_0x380d2e=_0x3241df;break;}if(_0x16de61>=_0x221298)continue;const _0x3b1901=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x5d5e25=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x3ab364=0x1;_0x3ab364<0xa;_0x3ab364++){if(_0x3ab364===0x5)continue;const _0x201ce4=_0x3ab364,_0x1e8578=_0x3b1901[_0x3ab364],_0x33cbb5=_0x5d5e25[_0x3ab364],_0x1c7fb0=$gameMap['roundXWithDirection'](_0x4f7864,_0x201ce4),_0x388dd0=$gameMap['roundYWithDirection'](_0x2f320e,_0x201ce4),_0x372690=_0x388dd0*_0xc6432c+_0x1c7fb0;if(_0x5401d4[_0x59a2e2(0x337)](_0x372690))continue;if(this[_0x59a2e2(0x304)]===Game_Player&&VisuMZ[_0x59a2e2(0x44a)][_0x59a2e2(0x200)]['Movement'][_0x59a2e2(0x270)]){if(!this[_0x59a2e2(0x2ea)](_0x4f7864,_0x2f320e,_0x1e8578))continue;if(!this['canPass'](_0x4f7864,_0x2f320e,_0x33cbb5))continue;}if(!this['canPassDiagonally'](_0x4f7864,_0x2f320e,_0x1e8578,_0x33cbb5))continue;const _0x3552d5=_0x16de61+0x1,_0xff8925=_0x3ccfe9['indexOf'](_0x372690);if(_0xff8925<0x0||_0x3552d5<_0x513aba[_0xff8925]['g']){let _0x1180db={};_0xff8925>=0x0?_0x1180db=_0x513aba[_0xff8925]:(_0x513aba[_0x59a2e2(0x2e9)](_0x1180db),_0x3ccfe9[_0x59a2e2(0x2e9)](_0x372690)),_0x1180db[_0x59a2e2(0x306)]=_0x3241df,_0x1180db['x']=_0x1c7fb0,_0x1180db['y']=_0x388dd0,_0x1180db['g']=_0x3552d5,_0x1180db['f']=_0x3552d5+$gameMap[_0x59a2e2(0x317)](_0x1c7fb0,_0x388dd0,_0x5bac9b,_0x30db35),(!_0x380d2e||_0x1180db['f']-_0x1180db['g']<_0x380d2e['f']-_0x380d2e['g'])&&(_0x380d2e=_0x1180db);}}}let _0x1c245a=_0x380d2e;while(_0x1c245a[_0x59a2e2(0x306)]&&_0x1c245a[_0x59a2e2(0x306)]!==_0x5bf6e7){_0x1c245a=_0x1c245a['parent'];}const _0x335c79=$gameMap[_0x59a2e2(0x15b)](_0x1c245a['x'],_0x5bf6e7['x']),_0x1e9f0f=$gameMap['deltaY'](_0x1c245a['y'],_0x5bf6e7['y']);if(_0x335c79<0x0&&_0x1e9f0f>0x0)return 0x1;if(_0x335c79>0x0&&_0x1e9f0f>0x0)return 0x3;if(_0x335c79<0x0&&_0x1e9f0f<0x0)return 0x7;if(_0x335c79>0x0&&_0x1e9f0f<0x0)return 0x9;if(_0x1e9f0f>0x0)return 0x2;if(_0x335c79<0x0)return 0x4;if(_0x335c79>0x0)return 0x6;if(_0x1e9f0f<0x0)return 0x8;const _0x4449ef=this['deltaXFrom'](_0x5bac9b),_0x5c58e2=this[_0x59a2e2(0x127)](_0x30db35);if(Math[_0x59a2e2(0x299)](_0x4449ef)>Math[_0x59a2e2(0x299)](_0x5c58e2))return _0x4449ef>0x0?0x4:0x6;else{if(_0x5c58e2!==0x0)return _0x5c58e2>0x0?0x8:0x2;}return 0x0;},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0xb2)]=Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x2ea)],Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x2ea)]=function(_0x115c9d,_0x9d7b7b,_0x13df8b){const _0x3cc6e9=_0xbbde9f;return this[_0x3cc6e9(0x190)]===_0x3cc6e9(0x1b0)?this[_0x3cc6e9(0x157)]()['isAirshipPassable'](_0x115c9d,_0x9d7b7b,_0x13df8b):VisuMZ[_0x3cc6e9(0x44a)][_0x3cc6e9(0xb2)][_0x3cc6e9(0x395)](this,_0x115c9d,_0x9d7b7b,_0x13df8b);},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x172)]=function(){const _0x405d2b=_0xbbde9f;this['_spriteOffsetX']=0x0,this[_0x405d2b(0x33b)]=0x0;},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x202)]=Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x223)],Game_CharacterBase[_0xbbde9f(0x238)]['screenX']=function(){const _0x466147=_0xbbde9f;return VisuMZ[_0x466147(0x44a)][_0x466147(0x202)][_0x466147(0x395)](this)+(this['_spriteOffsetX']||0x0);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x417)]=Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0xb7)],Game_CharacterBase['prototype'][_0xbbde9f(0xb7)]=function(){const _0x3b193a=_0xbbde9f;return VisuMZ['EventsMoveCore'][_0x3b193a(0x417)]['call'](this)+(this[_0x3b193a(0x33b)]||0x0);},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x2f9)]=function(){const _0x3a4648=_0xbbde9f;this[_0x3a4648(0x2b5)]='';},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x314)]=Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x41c)],Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x41c)]=function(){const _0x2db655=_0xbbde9f;if(this[_0x2db655(0x269)])return;if(this[_0x2db655(0x364)]())return;VisuMZ['EventsMoveCore'][_0x2db655(0x314)][_0x2db655(0x395)](this);},Game_CharacterBase['prototype']['updatePatternEventsMoveCore']=function(){const _0xdc5b18=_0xbbde9f;if(!this['hasStepAnime']()&&this['_stopCount']>0x0)return![];switch(String(this[_0xdc5b18(0x2b5)])['toUpperCase']()[_0xdc5b18(0x242)]()){case _0xdc5b18(0x43a):this[_0xdc5b18(0x16f)]+=0x1;if(this[_0xdc5b18(0x16f)]>0x2)this['setPattern'](0x0);break;case'RIGHT\x20TO\x20LEFT':this['_pattern']-=0x1;if(this['_pattern']<0x0)this[_0xdc5b18(0x10e)](0x2);break;case'SPIN\x20CLOCKWISE':case'SPIN\x20CW':this['turnRight90']();break;case'SPIN\x20COUNTERCLOCKWISE':case'SPIN\x20CCW':case _0xdc5b18(0x446):case _0xdc5b18(0x169):this[_0xdc5b18(0x2c3)]();break;default:return![];}return!![];},Game_CharacterBase[_0xbbde9f(0x238)]['getEventIconData']=function(){return $gameSystem['getEventIconData'](this);},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x201)]=function(){const _0xfef402=_0xbbde9f,_0x3662d4=this[_0xfef402(0x2a1)]();if(!_0x3662d4)return![];return _0x3662d4[_0xfef402(0x3c1)]>0x0;},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x42f)]=function(){const _0x4fd325=_0xbbde9f,_0x2cc8f4=this[_0x4fd325(0x375)]();return $gameMap[_0x4fd325(0x14a)](this['x'],_0x2cc8f4);},Game_CharacterBase['prototype']['frontY']=function(){const _0x555254=_0xbbde9f,_0x589ed0=this[_0x555254(0x375)]();return $gameMap['roundYWithDirection'](this['y'],_0x589ed0);},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x318)]=function(){const _0x11a5f1=_0xbbde9f,_0x14b018=this[_0x11a5f1(0x393)](this[_0x11a5f1(0x375)]());return $gameMap[_0x11a5f1(0x14a)](this['x'],_0x14b018);},Game_CharacterBase[_0xbbde9f(0x238)][_0xbbde9f(0x227)]=function(){const _0x4f38bd=_0xbbde9f,_0x5d213c=this[_0x4f38bd(0x393)](this[_0x4f38bd(0x375)]());return $gameMap[_0x4f38bd(0x11b)](this['y'],_0x5d213c);},VisuMZ[_0xbbde9f(0x44a)]['Game_Character_setMoveRoute']=Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x1c9)],Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x1c9)]=function(_0x45be11){const _0x36d7f3=_0xbbde9f;route=JsonEx[_0x36d7f3(0x2ba)](_0x45be11),VisuMZ[_0x36d7f3(0x44a)][_0x36d7f3(0x39a)][_0x36d7f3(0x395)](this,route);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x264)]=Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0xc0)],Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0xc0)]=function(_0x2e436f){const _0x476c17=_0xbbde9f;route=JsonEx[_0x476c17(0x2ba)](_0x2e436f),VisuMZ[_0x476c17(0x44a)]['Game_Character_forceMoveRoute'][_0x476c17(0x395)](this,route);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x261)]=Game_Character['prototype'][_0xbbde9f(0xc4)],Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0xc4)]=function(_0x46ebf5){const _0x12a1a9=_0xbbde9f,_0x1c6753=Game_Character,_0xf94ac7=_0x46ebf5[_0x12a1a9(0x443)];if(_0x46ebf5['code']===_0x1c6753[_0x12a1a9(0x13a)]){let _0xf34e7d=_0x46ebf5['parameters'][0x0];_0xf34e7d=this[_0x12a1a9(0x16d)](_0xf34e7d),_0xf34e7d=this['convertSelfVariableValuesInScriptCall'](_0xf34e7d),this[_0x12a1a9(0x2f0)](_0x46ebf5,_0xf34e7d);}else VisuMZ[_0x12a1a9(0x44a)]['Game_Character_processMoveCommand']['call'](this,_0x46ebf5);},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x16d)]=function(_0x147b9e){const _0x216ccb=_0xbbde9f,_0x3c5ea3=/\$gameVariables\.value\((\d+)\)/gi,_0x5b8627=/\\V\[(\d+)\]/gi;while(_0x147b9e[_0x216ccb(0x396)](_0x3c5ea3)){_0x147b9e=_0x147b9e[_0x216ccb(0x3e6)](_0x3c5ea3,(_0x14f4f5,_0x3e41ec)=>$gameVariables[_0x216ccb(0x451)](parseInt(_0x3e41ec)));}while(_0x147b9e[_0x216ccb(0x396)](_0x5b8627)){_0x147b9e=_0x147b9e['replace'](_0x5b8627,(_0x5df815,_0x58c76e)=>$gameVariables[_0x216ccb(0x451)](parseInt(_0x58c76e)));}return _0x147b9e;},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x22c)]=function(_0x4f7775){const _0x21dfbe=_0xbbde9f,_0x585f58=/\\SELFVAR\[(\d+)\]/gi;while(_0x4f7775[_0x21dfbe(0x396)](_0x585f58)){_0x4f7775=_0x4f7775['replace'](_0x585f58,(_0x52af21,_0x53e3e9)=>getSelfVariableValue(this[_0x21dfbe(0x174)],this[_0x21dfbe(0x331)],parseInt(_0x53e3e9)));}return _0x4f7775;},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x2f0)]=function(_0x4fc1f5,_0x43ea24){const _0xbf2258=_0xbbde9f;if(_0x43ea24[_0xbf2258(0x396)](/ANIMATION:[ ](\d+)/i))return this[_0xbf2258(0x41d)](Number(RegExp['$1']));if(_0x43ea24[_0xbf2258(0x396)](/BALLOON:[ ](.*)/i))return this[_0xbf2258(0x26d)](String(RegExp['$1']));if(_0x43ea24['match'](/FADE IN:[ ](\d+)/i))return this[_0xbf2258(0x210)](Number(RegExp['$1']));if(_0x43ea24[_0xbf2258(0x396)](/FADE OUT:[ ](\d+)/i))return this[_0xbf2258(0x28a)](Number(RegExp['$1']));if(_0x43ea24[_0xbf2258(0x396)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0xbf2258(0x17a)]();if(_0x43ea24[_0xbf2258(0x396)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0xbf2258(0x2bf)]();if(_0x43ea24[_0xbf2258(0x396)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0xbf2258(0xf3)]();if(_0x43ea24['match'](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0xbf2258(0x29d)]();if(_0x43ea24[_0xbf2258(0x396)](/HUG:[ ]LEFT/i))return this[_0xbf2258(0x2c2)]('left');if(_0x43ea24['match'](/HUG:[ ]RIGHT/i))return this[_0xbf2258(0x2c2)]('right');if(_0x43ea24[_0xbf2258(0x396)](/INDEX:[ ](\d+)/i))return this[_0xbf2258(0x3a3)](Number(RegExp['$1']));if(_0x43ea24['match'](/INDEX:[ ]([\+\-]\d+)/i)){const _0xa383a1=this[_0xbf2258(0x2b6)]+Number(RegExp['$1']);return this['processMoveRouteSetIndex'](_0xa383a1);}if(_0x43ea24[_0xbf2258(0x396)](/JUMP FORWARD:[ ](\d+)/i))return this['processMoveRouteJumpForward'](Number(RegExp['$1']));if(_0x43ea24[_0xbf2258(0x396)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0xbf2258(0x30f)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x43ea24[_0xbf2258(0x396)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x3e39d5=$gameMap['event'](Number(RegExp['$1']));return this['processMoveRouteJumpToCharacter'](_0x3e39d5);}if(_0x43ea24['match'](/JUMP TO PLAYER/i))return this[_0xbf2258(0x44d)]($gamePlayer);if(_0x43ea24[_0xbf2258(0x396)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0xcbaa52=String(RegExp['$1']);return this[_0xbf2258(0x3cb)](_0xcbaa52);}if(_0x43ea24[_0xbf2258(0x396)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x326ab1=Number(RegExp['$1']),_0x1368a1=Number(RegExp['$2']);return this[_0xbf2258(0x28b)](_0x326ab1,_0x1368a1);}if(_0x43ea24[_0xbf2258(0x396)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x113fad=$gameMap[_0xbf2258(0xbf)](Number(RegExp['$1']));return this['processMoveRouteMoveToCharacter'](_0x113fad);}if(_0x43ea24['match'](/MOVE TO PLAYER/i))return this[_0xbf2258(0x215)]($gamePlayer);if(_0x43ea24[_0xbf2258(0x396)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0xbf2258(0x43c)](0x1,Number(RegExp['$1']));if(_0x43ea24[_0xbf2258(0x396)](/MOVE DOWN:[ ](\d+)/i))return this[_0xbf2258(0x43c)](0x2,Number(RegExp['$1']));if(_0x43ea24['match'](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0xbf2258(0x43c)](0x3,Number(RegExp['$1']));if(_0x43ea24[_0xbf2258(0x396)](/MOVE LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x4,Number(RegExp['$1']));if(_0x43ea24[_0xbf2258(0x396)](/MOVE RIGHT:[ ](\d+)/i))return this[_0xbf2258(0x43c)](0x6,Number(RegExp['$1']));if(_0x43ea24[_0xbf2258(0x396)](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0xbf2258(0x43c)](0x7,Number(RegExp['$1']));if(_0x43ea24[_0xbf2258(0x396)](/MOVE UP:[ ](\d+)/i))return this[_0xbf2258(0x43c)](0x8,Number(RegExp['$1']));if(_0x43ea24['match'](/MOVE UPPER RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x9,Number(RegExp['$1']));if(_0x43ea24[_0xbf2258(0x396)](/OPACITY:[ ](\d+)([%％])/i)){const _0x5a0ebc=Math[_0xbf2258(0x3ee)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x5a0ebc[_0xbf2258(0xdc)](0x0,0xff));}if(_0x43ea24[_0xbf2258(0x396)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x47ae9b=this[_0xbf2258(0x2e4)]+Math['round'](Number(RegExp['$1'])/0x64*0xff);return this[_0xbf2258(0x38c)](_0x47ae9b['clamp'](0x0,0xff));}if(_0x43ea24[_0xbf2258(0x396)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x5c1ad8=this[_0xbf2258(0x2e4)]+Number(RegExp['$1']);return this[_0xbf2258(0x38c)](_0x5c1ad8[_0xbf2258(0xdc)](0x0,0xff));}if(_0x43ea24[_0xbf2258(0x396)](/PATTERN LOCK:[ ](\d+)/i))return this[_0xbf2258(0x196)](Number(RegExp['$1']));if(_0x43ea24[_0xbf2258(0x396)](/PATTERN UNLOCK/i))return this['_patternLocked']=![];if(_0x43ea24['match'](/POSE:[ ](.*)/i)){const _0x1c0e62=String(RegExp['$1'])['toUpperCase']()['trim']();return this[_0xbf2258(0x274)](_0x1c0e62);}if(_0x43ea24[_0xbf2258(0x396)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x2b0867=Number(RegExp['$1']),_0x1f811e=Number(RegExp['$2']);return this[_0xbf2258(0x171)](_0x2b0867,_0x1f811e);}if(_0x43ea24[_0xbf2258(0x396)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x1c6bbb=$gameMap[_0xbf2258(0xbf)](Number(RegExp['$1']));return this[_0xbf2258(0x3f7)](_0x1c6bbb);}if(_0x43ea24['match'](/STEP TOWARD PLAYER/i))return this[_0xbf2258(0x3b9)]($gamePlayer);if(_0x43ea24[_0xbf2258(0x396)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0xbf2258(0x142)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x43ea24[_0xbf2258(0x396)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0xbea759=$gameMap['event'](Number(RegExp['$1']));return this['moveAwayFromCharacter'](_0xbea759);}if(_0x43ea24['match'](/STEP AWAY FROM PLAYER/i))return this[_0xbf2258(0x35f)]($gamePlayer);if(_0x43ea24[_0xbf2258(0x396)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['moveTowardPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x43ea24['match'](/TURN TO EVENT:[ ](\d+)/i)){const _0x17db1=$gameMap[_0xbf2258(0xbf)](Number(RegExp['$1']));return this[_0xbf2258(0x2d5)](_0x17db1);}if(_0x43ea24[_0xbf2258(0x396)](/TURN TO PLAYER/i))return this[_0xbf2258(0x2d5)]($gamePlayer);if(_0x43ea24['match'](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['turnAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x43ea24[_0xbf2258(0x396)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0xf66810=$gameMap['event'](Number(RegExp['$1']));return this[_0xbf2258(0x184)](_0xf66810);}if(_0x43ea24[_0xbf2258(0x396)](/TURN AWAY FROM PLAYER/i))return this[_0xbf2258(0x184)]($gamePlayer);if(_0x43ea24[_0xbf2258(0x396)](/TURN LOWER LEFT/i))return this[_0xbf2258(0xba)](0x1);if(_0x43ea24[_0xbf2258(0x396)](/TURN LOWER RIGHT/i))return this[_0xbf2258(0xba)](0x3);if(_0x43ea24['match'](/TURN UPPER LEFT/i))return this[_0xbf2258(0xba)](0x7);if(_0x43ea24['match'](/TURN UPPER RIGHT/i))return this[_0xbf2258(0xba)](0x9);if(_0x43ea24['match'](/Self Switch[ ](.*):[ ](.*)/i))return this[_0xbf2258(0x18c)](RegExp['$1'],RegExp['$2']);if(_0x43ea24['match'](/Self Variable[ ](.*):[ ](.*)/i))return this[_0xbf2258(0x32b)](RegExp['$1'],RegExp['$2']);if(_0x43ea24[_0xbf2258(0x396)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0xbf2258(0x260)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x43ea24['match'](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x22ec3a=$gameMap['event'](Number(RegExp['$1']));return this['processMoveRouteTeleportToCharacter'](_0x22ec3a);}if(_0x43ea24[_0xbf2258(0x396)](/TELEPORT TO PLAYER/i))return this[_0xbf2258(0x1bd)]($gamePlayer);try{VisuMZ[_0xbf2258(0x44a)][_0xbf2258(0x261)]['call'](this,_0x4fc1f5);}catch(_0x2f72dc){if($gameTemp[_0xbf2258(0x2a5)]())console[_0xbf2258(0x409)](_0x2f72dc);}},Game_Character[_0xbbde9f(0x238)]['processMoveRouteAnimation']=function(_0x1ddd91){$gameTemp['requestAnimation']([this],_0x1ddd91);},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x26d)]=function(_0x47e570){const _0x23a747=_0xbbde9f;let _0x54e712=0x0;switch(_0x47e570[_0x23a747(0x295)]()[_0x23a747(0x242)]()){case'!':case'EXCLAMATION':_0x54e712=0x1;break;case'?':case _0x23a747(0x3eb):_0x54e712=0x2;break;case _0x23a747(0x23e):case _0x23a747(0x348):case _0x23a747(0x12d):case'MUSIC-NOTE':case'MUSICNOTE':_0x54e712=0x3;break;case'HEART':case'LOVE':_0x54e712=0x4;break;case _0x23a747(0x410):_0x54e712=0x5;break;case _0x23a747(0x161):_0x54e712=0x6;break;case _0x23a747(0x209):case _0x23a747(0x418):case _0x23a747(0x421):_0x54e712=0x7;break;case'SILENCE':case _0x23a747(0x3f1):_0x54e712=0x8;break;case'LIGHT':case _0x23a747(0x413):case _0x23a747(0x359):case _0x23a747(0x3c9):case'LIGHTBULB':_0x54e712=0x9;break;case'Z':case'ZZ':case _0x23a747(0x335):case _0x23a747(0x3bb):_0x54e712=0xa;break;case'USER-DEFINED\x201':_0x54e712=0xb;break;case _0x23a747(0x143):_0x54e712=0xc;break;case _0x23a747(0x12c):_0x54e712=0xd;break;case _0x23a747(0x1d6):_0x54e712=0xe;break;case _0x23a747(0xfc):_0x54e712=0xf;break;}$gameTemp[_0x23a747(0xfe)](this,_0x54e712);},Game_Character[_0xbbde9f(0x238)]['processMoveRouteFadeIn']=function(_0x3c5f17){const _0x235b27=_0xbbde9f;_0x3c5f17+=this[_0x235b27(0x2e4)],this[_0x235b27(0x38c)](_0x3c5f17[_0x235b27(0xdc)](0x0,0xff));if(this[_0x235b27(0x2e4)]<0xff)this[_0x235b27(0x145)]--;},Game_Character[_0xbbde9f(0x238)]['processMoveRouteFadeOut']=function(_0x37acf2){const _0x54bb56=_0xbbde9f;_0x37acf2=this[_0x54bb56(0x2e4)]-_0x37acf2,this[_0x54bb56(0x38c)](_0x37acf2[_0x54bb56(0xdc)](0x0,0xff));if(this[_0x54bb56(0x2e4)]>0x0)this[_0x54bb56(0x145)]--;},Game_Character[_0xbbde9f(0x238)]['processMoveRouteHugWall']=function(_0x435d66){const _0x514ce2=_0xbbde9f,_0x2f82ba=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x32fc5b=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0xefd41d=this[_0x514ce2(0x375)](),_0x315328=(_0x435d66===_0x514ce2(0x385)?_0x2f82ba:_0x32fc5b)[_0xefd41d],_0x244e7d=(_0x435d66===_0x514ce2(0x385)?_0x32fc5b:_0x2f82ba)[_0xefd41d];if(this[_0x514ce2(0x2ea)](this['x'],this['y'],_0x315328))_0x435d66===_0x514ce2(0x385)?this[_0x514ce2(0x2c3)]():this['turnRight90']();else!this['canPass'](this['x'],this['y'],this[_0x514ce2(0x375)]())&&(this[_0x514ce2(0x2ea)](this['x'],this['y'],_0x244e7d)?_0x435d66===_0x514ce2(0x385)?this['turnRight90']():this[_0x514ce2(0x2c3)]():this[_0x514ce2(0x205)]());this[_0x514ce2(0x2ea)](this['x'],this['y'],this[_0x514ce2(0x375)]())&&this[_0x514ce2(0x2bb)]();},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x3a3)]=function(_0x4b4d54){const _0x15233c=_0xbbde9f;if(ImageManager['isBigCharacter'](this[_0x15233c(0x2e7)]))return;_0x4b4d54=_0x4b4d54[_0x15233c(0xdc)](0x0,0x7),this[_0x15233c(0x41f)](this['_characterName'],_0x4b4d54);},Game_Character[_0xbbde9f(0x238)]['processMoveRouteJumpForward']=function(_0x534590){const _0x560a78=_0xbbde9f;switch(this[_0x560a78(0x375)]()){case 0x1:this[_0x560a78(0x3fc)](-_0x534590,_0x534590);break;case 0x2:this[_0x560a78(0x3fc)](0x0,_0x534590);break;case 0x3:this[_0x560a78(0x3fc)](_0x534590,_0x534590);break;case 0x4:this['jump'](-_0x534590,0x0);break;case 0x6:this['jump'](_0x534590,0x0);break;case 0x7:this[_0x560a78(0x3fc)](-_0x534590,-_0x534590);break;case 0x8:this['jump'](0x0,-_0x534590);break;case 0x9:this[_0x560a78(0x3fc)](_0x534590,-_0x534590);break;}},Game_Character['prototype'][_0xbbde9f(0x30f)]=function(_0x825c1f,_0x54b391){const _0x5a1856=_0xbbde9f,_0x4acc42=Math[_0x5a1856(0x3ee)](_0x825c1f-this['x']),_0x541e87=Math[_0x5a1856(0x3ee)](_0x54b391-this['y']);this[_0x5a1856(0x3fc)](_0x4acc42,_0x541e87);},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x44d)]=function(_0x1a9862){const _0x479575=_0xbbde9f;if(_0x1a9862)this[_0x479575(0x30f)](_0x1a9862['x'],_0x1a9862['y']);},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x171)]=function(_0xed3739,_0x2cfcfc){const _0x87059d=_0xbbde9f;let _0x48ffe0=0x0;$gameMap[_0x87059d(0xf4)]()?_0x48ffe0=this[_0x87059d(0x311)](_0xed3739,_0x2cfcfc):_0x48ffe0=this['findDirectionTo'](_0xed3739,_0x2cfcfc),this[_0x87059d(0x2c0)](_0x48ffe0),this['setMovementSuccess'](!![]);},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x3f7)]=function(_0x5ca11a){const _0x6d5324=_0xbbde9f;if(_0x5ca11a)this[_0x6d5324(0x171)](_0x5ca11a['x'],_0x5ca11a['y']);},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0xf0)]=function(_0x253835,_0x3a98b3){const _0x4b0975=_0xbbde9f,_0x47158a=this[_0x4b0975(0x3ad)](_0x253835),_0x43830e=this['deltaYFrom'](_0x3a98b3);},Game_Character[_0xbbde9f(0x238)]['processMoveRouteMoveUntilStop']=function(_0x5428ce){const _0x381073=_0xbbde9f,_0x8a1122=['',_0x381073(0x185),'DOWN',_0x381073(0x23f),'LEFT','',_0x381073(0x376),_0x381073(0x34b),'UP','UPPER\x20RIGHT'],_0x50940c=_0x8a1122[_0x381073(0x1e0)](_0x5428ce[_0x381073(0x295)]()[_0x381073(0x242)]());if(directioin<=0x0)return;this['canPass'](this['x'],this['y'],_0x50940c)&&(this[_0x381073(0x2c0)](_0x50940c),this[_0x381073(0x145)]-=0x1);},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x28b)]=function(_0x3c3698,_0x1f21a1){this['processMoveRouteStepTo'](_0x3c3698,_0x1f21a1);if(this['x']!==_0x3c3698||this['y']!==_0x1f21a1)this['_moveRouteIndex']--;},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x215)]=function(_0x16c3e6){const _0x50f48d=_0xbbde9f;if(_0x16c3e6)this[_0x50f48d(0x28b)](_0x16c3e6['x'],_0x16c3e6['y']);},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x43c)]=function(_0x8cb5bb,_0x178cfb){const _0x5645cc=_0xbbde9f;_0x178cfb=_0x178cfb||0x0;const _0x3ecb4f={'code':0x1,'indent':null,'parameters':[]};_0x3ecb4f[_0x5645cc(0x3f3)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x8cb5bb],this['_moveRoute']['list'][this[_0x5645cc(0x145)]][_0x5645cc(0x443)][0x0]='';while(_0x178cfb--){this[_0x5645cc(0x117)]['list'][_0x5645cc(0x378)](this[_0x5645cc(0x145)]+0x1,0x0,_0x3ecb4f);}},Game_Character['prototype'][_0xbbde9f(0x196)]=function(_0x8c1f09){const _0x421d56=_0xbbde9f;this[_0x421d56(0x269)]=!![],this[_0x421d56(0x10e)](_0x8c1f09);},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x18c)]=function(_0x2bd9d4,_0x3ccd93){const _0x3e30fe=_0xbbde9f;if(this===$gamePlayer)return;const _0x38dbcc=[this[_0x3e30fe(0x174)],this[_0x3e30fe(0x331)],'A'];_0x2bd9d4[_0x3e30fe(0x396)](/\b[ABCD]\b/i)?_0x38dbcc[0x2]=String(_0x2bd9d4)[_0x3e30fe(0x180)](0x0)['toUpperCase']()[_0x3e30fe(0x242)]():_0x38dbcc[0x2]=_0x3e30fe(0x44b)['format'](_0x2bd9d4);switch(_0x3ccd93[_0x3e30fe(0x295)]()[_0x3e30fe(0x242)]()){case'ON':case _0x3e30fe(0x416):$gameSelfSwitches[_0x3e30fe(0x3d6)](_0x38dbcc,!![]);break;case'OFF':case _0x3e30fe(0x362):$gameSelfSwitches['setValue'](_0x38dbcc,![]);break;case _0x3e30fe(0x1c7):$gameSelfSwitches[_0x3e30fe(0x3d6)](_0x38dbcc,!$gameSelfSwitches[_0x3e30fe(0x451)](_0x38dbcc));break;}},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x32b)]=function(_0x15aa66,_0xacaaac){const _0x4b463c=_0xbbde9f;if(this===$gamePlayer)return;const _0x4f88b8=[this[_0x4b463c(0x174)],this[_0x4b463c(0x331)],_0x4b463c(0x3dc)[_0x4b463c(0x10c)](switchId)];$gameSelfSwitches[_0x4b463c(0x3d6)](_0x4f88b8,Number(_0xacaaac));},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x260)]=function(_0x2dc1da,_0x522396){this['locate'](_0x2dc1da,_0x522396);},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x1bd)]=function(_0x239f29){const _0x5abf33=_0xbbde9f;if(_0x239f29)this[_0x5abf33(0x260)](_0x239f29['x'],_0x239f29['y']);},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x386)]=function(){const _0x47ce46=_0xbbde9f;switch(this[_0x47ce46(0x375)]()){case 0x1:this[_0x47ce46(0xba)](0x7);break;case 0x2:this[_0x47ce46(0xba)](0x4);break;case 0x3:this[_0x47ce46(0xba)](0x1);break;case 0x4:this[_0x47ce46(0xba)](0x8);break;case 0x6:this[_0x47ce46(0xba)](0x2);break;case 0x7:this[_0x47ce46(0xba)](0x9);break;case 0x8:this[_0x47ce46(0xba)](0x6);break;case 0x9:this[_0x47ce46(0xba)](0x3);break;}},Game_Character['prototype']['turnLeft90']=function(){const _0x1bbd43=_0xbbde9f;switch(this['direction']()){case 0x1:this[_0x1bbd43(0xba)](0x3);break;case 0x2:this[_0x1bbd43(0xba)](0x6);break;case 0x3:this[_0x1bbd43(0xba)](0x9);break;case 0x4:this[_0x1bbd43(0xba)](0x2);break;case 0x6:this[_0x1bbd43(0xba)](0x8);break;case 0x7:this[_0x1bbd43(0xba)](0x1);break;case 0x8:this[_0x1bbd43(0xba)](0x4);break;case 0x9:this['setDirection'](0x7);break;}},Game_Character['prototype'][_0xbbde9f(0x163)]=function(_0x32b307,_0x88baaa,_0x3f2ee3){const _0x614e3c=_0xbbde9f,_0x23b1a6=this[_0x614e3c(0x3ad)](_0x32b307),_0x59c958=this[_0x614e3c(0x127)](_0x88baaa);if($gameMap[_0x614e3c(0xf4)]()){if(_0x3f2ee3||this['isSpriteVS8dir']()){if(_0x23b1a6>0x0&&_0x59c958<0x0)return 0x1;if(_0x23b1a6<0x0&&_0x59c958<0x0)return 0x3;if(_0x23b1a6>0x0&&_0x59c958>0x0)return 0x7;if(_0x23b1a6<0x0&&_0x59c958>0x0)return 0x9;}}if(Math[_0x614e3c(0x299)](_0x23b1a6)>Math[_0x614e3c(0x299)](_0x59c958))return _0x23b1a6>0x0?0x4:0x6;else{if(_0x59c958!==0x0)return _0x59c958>0x0?0x8:0x2;}return 0x0;},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x352)]=function(_0x277b2f,_0x38338d,_0x21a4cb){const _0x4f9b89=_0xbbde9f,_0x3add63=this[_0x4f9b89(0x3ad)](_0x277b2f),_0x2781a6=this[_0x4f9b89(0x127)](_0x38338d);if($gameMap[_0x4f9b89(0xf4)]()){if(_0x21a4cb||this[_0x4f9b89(0x326)]()){if(_0x3add63>0x0&&_0x2781a6<0x0)return 0x9;if(_0x3add63<0x0&&_0x2781a6<0x0)return 0x7;if(_0x3add63>0x0&&_0x2781a6>0x0)return 0x3;if(_0x3add63<0x0&&_0x2781a6>0x0)return 0x1;}}if(Math[_0x4f9b89(0x299)](_0x3add63)>Math[_0x4f9b89(0x299)](_0x2781a6))return _0x3add63>0x0?0x6:0x4;else{if(_0x2781a6!==0x0)return _0x2781a6>0x0?0x2:0x8;}return 0x0;},Game_Character['prototype']['moveTowardPoint']=function(_0x293f15,_0x151300){const _0x5ef6f5=_0xbbde9f,_0x30aabf=this['getDirectionToPoint'](_0x293f15,_0x151300,!![]);if(_0x30aabf)this[_0x5ef6f5(0x2c0)](_0x30aabf);},Game_Character['prototype']['moveAwayFromPoint']=function(_0x5bbb58,_0x378bd3){const _0x5453e7=_0xbbde9f,_0x2b51b4=this[_0x5453e7(0x352)](_0x5bbb58,_0x378bd3,!![]);if(_0x2b51b4)this['executeMoveDir8'](_0x2b51b4);},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x173)]=function(_0x3c32bb,_0x1337ba){const _0x29d7e0=_0xbbde9f,_0x13a8d5=this['getDirectionToPoint'](_0x3c32bb,_0x1337ba,![]);if(_0x13a8d5)this[_0x29d7e0(0xba)](_0x13a8d5);},Game_Character['prototype'][_0xbbde9f(0x1b3)]=function(_0x36a24a,_0x22d724){const _0x36117f=_0xbbde9f,_0x1a52e2=this[_0x36117f(0x352)](_0x36a24a,_0x22d724,![]);if(_0x1a52e2)this[_0x36117f(0xba)](_0x1a52e2);},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x12f)]=function(_0x12f87b){const _0x40513f=_0xbbde9f;if(_0x12f87b)this[_0x40513f(0x230)](_0x12f87b['x'],_0x12f87b['y']);},Game_Character[_0xbbde9f(0x238)]['moveAwayFromCharacter']=function(_0x2a8521){if(_0x2a8521)this['moveAwayFromPoint'](_0x2a8521['x'],_0x2a8521['y']);},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x2d5)]=function(_0x5156f7){const _0x1a3f7f=_0xbbde9f;if(_0x5156f7)this[_0x1a3f7f(0x173)](_0x5156f7['x'],_0x5156f7['y']);},Game_Character[_0xbbde9f(0x238)][_0xbbde9f(0x184)]=function(_0x31ed13){const _0x5ead72=_0xbbde9f;if(_0x31ed13)this[_0x5ead72(0x1b3)](_0x31ed13['x'],_0x31ed13['y']);},VisuMZ['EventsMoveCore']['Game_Player_isDashing']=Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0x3e9)],Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0x3e9)]=function(){const _0x59969f=_0xbbde9f;if(this[_0x59969f(0xb5)])return!![];return VisuMZ[_0x59969f(0x44a)]['Game_Player_isDashing'][_0x59969f(0x395)](this);},Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0x297)]=function(){const _0x41476b=_0xbbde9f;return this[_0x41476b(0x3e9)]()&&(this[_0x41476b(0x2d8)]()||this['getInputDirection']()!==0x0&&this['canPass'](this['_x'],this['_y'],this['getInputDirection']())||$gameTemp[_0x41476b(0xc6)]());},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x126)]=Game_Player['prototype'][_0xbbde9f(0x1a7)],Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0x1a7)]=function(){const _0x10f035=_0xbbde9f;return $gameMap[_0x10f035(0xf4)]()?this[_0x10f035(0x43b)]():VisuMZ[_0x10f035(0x44a)][_0x10f035(0x126)]['call'](this);},Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0x43b)]=function(){const _0x126fef=_0xbbde9f;return Input[_0x126fef(0x3fe)];},Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0x266)]=function(){const _0x582457=_0xbbde9f;if($gameSystem[_0x582457(0x19d)]())return 0x0;if(!this[_0x582457(0x2d8)]()&&this[_0x582457(0x18d)]()){let _0x479994=this[_0x582457(0x1a7)]();if(_0x479994>0x0)$gameTemp[_0x582457(0x2be)]();else{if($gameTemp[_0x582457(0xc6)]()){const _0x5f2f48=$gameTemp[_0x582457(0x305)](),_0x26f7b5=$gameTemp[_0x582457(0x36e)](),_0x299f6c=$gameMap['isSupportDiagonalMovement'](),_0x516458=$gameMap[_0x582457(0x136)](_0x5f2f48,_0x26f7b5);_0x299f6c&&_0x516458?_0x479994=this[_0x582457(0x311)](_0x5f2f48,_0x26f7b5):_0x479994=this[_0x582457(0x16b)](_0x5f2f48,_0x26f7b5);}}_0x479994>0x0?(this[_0x582457(0x28c)]=this['_inputTime']||0x0,this['isTurnInPlace']()?this[_0x582457(0xba)](_0x479994):this[_0x582457(0x3ed)](_0x479994),this[_0x582457(0x28c)]++):this[_0x582457(0x28c)]=0x0;}},Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0x282)]=function(){const _0x17b4d3=_0xbbde9f,_0x513b3f=VisuMZ[_0x17b4d3(0x44a)][_0x17b4d3(0x200)][_0x17b4d3(0x3de)];if(!_0x513b3f['EnableTurnInPlace'])return![];if($gameTemp[_0x17b4d3(0xc6)]())return![];if(this[_0x17b4d3(0x3e9)]()||this[_0x17b4d3(0x2d8)]()||this['isOnLadder']())return![];return this['_inputTime']<_0x513b3f[_0x17b4d3(0x14d)];},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x1ed)]=Game_Player[_0xbbde9f(0x238)]['executeMove'],Game_Player[_0xbbde9f(0x238)]['executeMove']=function(_0x16eaf7){const _0x46706e=_0xbbde9f;$gameMap[_0x46706e(0xf4)]()?this[_0x46706e(0x2c0)](_0x16eaf7):VisuMZ[_0x46706e(0x44a)][_0x46706e(0x1ed)][_0x46706e(0x395)](this,_0x16eaf7);},VisuMZ[_0xbbde9f(0x44a)]['Game_Player_isMapPassable']=Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0x13e)],Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0x13e)]=function(_0x49af89,_0x31953e,_0x30ef3e){const _0x22f65d=_0xbbde9f;if($gameMap['isRegionAllowPass'](_0x49af89,_0x31953e,_0x30ef3e,_0x22f65d(0x1b7)))return!![];if($gameMap['isRegionForbidPass'](_0x49af89,_0x31953e,_0x30ef3e,_0x22f65d(0x1b7)))return![];return VisuMZ[_0x22f65d(0x44a)][_0x22f65d(0x2e5)][_0x22f65d(0x395)](this,_0x49af89,_0x31953e,_0x30ef3e);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x192)]=Game_Player[_0xbbde9f(0x238)]['checkEventTriggerHere'],Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0x298)]=function(_0x5bdd74){const _0x124c99=_0xbbde9f;VisuMZ[_0x124c99(0x44a)][_0x124c99(0x192)][_0x124c99(0x395)](this,_0x5bdd74);if(this[_0x124c99(0x1dd)]()){this[_0x124c99(0x2a2)](_0x5bdd74);if(_0x5bdd74[_0x124c99(0x337)](0x0)&&this[_0x124c99(0x419)]()===_0x124c99(0x368))this[_0x124c99(0x120)](this['x'],this['y']);else(_0x5bdd74['includes'](0x1)||_0x5bdd74[_0x124c99(0x337)](0x2))&&this['startMapCommonEventOnTouch']();}},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x346)]=Game_Player[_0xbbde9f(0x238)]['checkEventTriggerThere'],Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0x2c6)]=function(_0x4911d1){const _0x892a14=_0xbbde9f;VisuMZ[_0x892a14(0x44a)][_0x892a14(0x346)]['call'](this,_0x4911d1);if(this[_0x892a14(0x1dd)]()&&_0x4911d1[_0x892a14(0x337)](0x0)&&this[_0x892a14(0x419)]()===_0x892a14(0xbb)){const _0x41230f=this[_0x892a14(0x375)](),_0x58c2bf=$gameMap['roundXWithDirection'](this['x'],_0x41230f),_0x2033d0=$gameMap['roundYWithDirection'](this['y'],_0x41230f);this['startMapCommonEventOnOK'](_0x58c2bf,_0x2033d0);}},Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0x2a2)]=function(_0x466064){const _0x348377=_0xbbde9f;if($gameMap['isEventRunning']())return;if($gameMap[_0x348377(0x255)]())return;const _0x52b9bf=$gameMap[_0x348377(0x344)]();for(const _0xe76bd0 of _0x52b9bf){if(!_0xe76bd0)continue;if(!_0xe76bd0['isTriggerIn'](_0x466064))continue;if(this[_0x348377(0x39f)](_0xe76bd0))return _0xe76bd0['start']();if(this[_0x348377(0x3da)](_0xe76bd0))return _0xe76bd0['start']();}},Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0x39f)]=function(_0x459283){const _0x44b84d=_0xbbde9f;if($gameMap[_0x44b84d(0x272)]())return![];if($gameMap[_0x44b84d(0x255)]())return![];return _0x459283['activationRegionList']()['includes'](this[_0x44b84d(0x154)]());},Game_Player[_0xbbde9f(0x238)]['meetActivationProximityConditions']=function(_0x41e9ea){const _0x484764=_0xbbde9f;if($gameMap[_0x484764(0x272)]())return![];if($gameMap[_0x484764(0x255)]())return![];if([_0x484764(0x2d3),_0x484764(0x360)][_0x484764(0x337)](_0x41e9ea['activationProximityType']()))return![];const _0x54bc62=_0x41e9ea[_0x484764(0x23d)](),_0x36a793=_0x41e9ea['activationProximityDistance']();switch(_0x54bc62){case _0x484764(0x2da):const _0xcab2d6=$gameMap[_0x484764(0x317)](this['x'],this['y'],_0x41e9ea['x'],_0x41e9ea['y']);return _0x41e9ea['activationProximityDistance']()>=_0xcab2d6;break;case _0x484764(0x2ee):return _0x36a793>=Math[_0x484764(0x299)](_0x41e9ea[_0x484764(0x3ad)](this['x']))&&_0x36a793>=Math[_0x484764(0x299)](_0x41e9ea[_0x484764(0x127)](this['y']));break;case _0x484764(0x19c):return _0x36a793>=Math['abs'](_0x41e9ea['deltaYFrom'](this['y']));break;case _0x484764(0x19f):return _0x36a793>=Math[_0x484764(0x299)](_0x41e9ea['deltaXFrom'](this['x']));break;case'default':return![];break;}},Game_Player[_0xbbde9f(0x238)]['startMapCommonEventOnOK']=function(_0x2e4022,_0x52133c){const _0x172817=_0xbbde9f;if($gameMap[_0x172817(0x272)]())return;if($gameMap['isAnyEventStarting']())return;let _0x4f7c49=VisuMZ[_0x172817(0x44a)][_0x172817(0x200)][_0x172817(0x36f)],_0x1ddc2a=$gameMap[_0x172817(0x154)](_0x2e4022,_0x52133c);const _0x5aa6f7='Region%1'[_0x172817(0x10c)](_0x1ddc2a);_0x4f7c49[_0x5aa6f7]&&$gameTemp[_0x172817(0x20d)](_0x4f7c49[_0x5aa6f7]);},Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0x419)]=function(){const _0x28817a=_0xbbde9f;return VisuMZ['EventsMoveCore'][_0x28817a(0x200)][_0x28817a(0x103)];},Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0x133)]=function(){const _0x5b087a=_0xbbde9f;if($gameMap[_0x5b087a(0x272)]())return;if($gameMap[_0x5b087a(0x255)]())return;let _0x40aa22=VisuMZ['EventsMoveCore'][_0x5b087a(0x200)]['RegionTouch'];const _0x221c8d='Region%1'[_0x5b087a(0x10c)](this[_0x5b087a(0x154)]());_0x40aa22[_0x221c8d]&&$gameTemp[_0x5b087a(0x20d)](_0x40aa22[_0x221c8d]);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x2ef)]=Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0xeb)],Game_Player[_0xbbde9f(0x238)][_0xbbde9f(0xeb)]=function(){const _0x20f546=_0xbbde9f;VisuMZ[_0x20f546(0x44a)]['Game_Player_increaseSteps'][_0x20f546(0x395)](this),VisuMZ[_0x20f546(0x300)](0x0);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x3f0)]=Game_Follower[_0xbbde9f(0x238)][_0xbbde9f(0x153)],Game_Follower['prototype'][_0xbbde9f(0x153)]=function(_0x26a73c){const _0x177a6b=_0xbbde9f;VisuMZ[_0x177a6b(0x44a)][_0x177a6b(0x3f0)]['call'](this,_0x26a73c),this[_0x177a6b(0x373)]=![];},Game_Follower['prototype'][_0xbbde9f(0x3e9)]=function(){const _0x234d2d=_0xbbde9f;return $gamePlayer[_0x234d2d(0x3e9)]();},Game_Follower[_0xbbde9f(0x238)]['isDashingAndMoving']=function(){const _0x173b66=_0xbbde9f;return $gamePlayer[_0x173b66(0x297)]();},Game_Follower[_0xbbde9f(0x238)]['realMoveSpeed']=function(){return $gamePlayer['realMoveSpeed']();},Game_Follower[_0xbbde9f(0x238)][_0xbbde9f(0x118)]=function(_0x427b5b){const _0x2a110d=_0xbbde9f;this[_0x2a110d(0x373)]=_0x427b5b;},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x327)]=Game_Follower[_0xbbde9f(0x238)][_0xbbde9f(0x276)],Game_Follower[_0xbbde9f(0x238)]['chaseCharacter']=function(_0x2f6f6b){const _0x2f1eb2=_0xbbde9f;if(this[_0x2f1eb2(0x373)])return;if($gameSystem['isStopFollowerChasing']())return;VisuMZ[_0x2f1eb2(0x44a)][_0x2f1eb2(0x327)][_0x2f1eb2(0x395)](this,_0x2f6f6b);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x3bc)]=Game_Vehicle[_0xbbde9f(0x238)][_0xbbde9f(0x13e)],Game_Vehicle[_0xbbde9f(0x238)][_0xbbde9f(0x13e)]=function(_0x56383e,_0x514f4e,_0x560e2b){const _0x2f2fb=_0xbbde9f;if($gameMap[_0x2f2fb(0x25d)](_0x56383e,_0x514f4e,_0x560e2b,this['_type']))return!![];if($gameMap[_0x2f2fb(0x2fe)](_0x56383e,_0x514f4e,_0x560e2b,this['_type']))return![];return VisuMZ['EventsMoveCore']['Game_Vehicle_isMapPassable']['call'](this,_0x56383e,_0x514f4e,_0x560e2b);},Game_Vehicle['prototype']['isAirshipPassable']=function(_0x2c76ca,_0x2f165a,_0x41f91c){const _0x2d12de=_0xbbde9f;if($gameMap['isRegionAllowPass'](_0x2c76ca,_0x2f165a,_0x41f91c,this[_0x2d12de(0x40d)]))return!![];if($gameMap['isRegionForbidPass'](_0x2c76ca,_0x2f165a,_0x41f91c,this[_0x2d12de(0x40d)]))return![];return VisuMZ[_0x2d12de(0x44a)][_0x2d12de(0xb2)]['call']($gamePlayer,_0x2c76ca,_0x2f165a,_0x41f91c);},VisuMZ[_0xbbde9f(0x44a)]['Game_Vehicle_isLandOk']=Game_Vehicle['prototype'][_0xbbde9f(0x2cb)],Game_Vehicle[_0xbbde9f(0x238)]['isLandOk']=function(_0x2fc9af,_0x2f216d,_0x1cc6df){const _0xd3c0f2=_0xbbde9f;if($gameMap[_0xd3c0f2(0x224)](_0x2fc9af,_0x2f216d,_0x1cc6df,this[_0xd3c0f2(0x40d)]))return!![];const _0x471400=this[_0xd3c0f2(0x40d)]['charAt'](0x0)[_0xd3c0f2(0x295)]()+this[_0xd3c0f2(0x40d)]['slice'](0x1),_0x208e80='%1DockRegionOnly'[_0xd3c0f2(0x10c)](_0x471400);return VisuMZ[_0xd3c0f2(0x44a)][_0xd3c0f2(0x200)][_0xd3c0f2(0x3d2)][_0x208e80]?![]:VisuMZ[_0xd3c0f2(0x44a)][_0xd3c0f2(0x2f7)][_0xd3c0f2(0x395)](this,_0x2fc9af,_0x2f216d,_0x1cc6df);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x20e)]=Game_Vehicle['prototype'][_0xbbde9f(0x291)],Game_Vehicle[_0xbbde9f(0x238)]['initMoveSpeed']=function(){const _0x35d640=_0xbbde9f;VisuMZ[_0x35d640(0x44a)]['Game_Vehicle_initMoveSpeed'][_0x35d640(0x395)](this);const _0x2f4097=VisuMZ[_0x35d640(0x44a)]['Settings']['Movement'];if(this[_0x35d640(0x31b)]()){if(_0x2f4097[_0x35d640(0x167)])this['setMoveSpeed'](_0x2f4097['BoatSpeed']);}else{if(this['isShip']()){if(_0x2f4097[_0x35d640(0x2fc)])this[_0x35d640(0x325)](_0x2f4097['ShipSpeed']);}else{if(this[_0x35d640(0x15f)]()){if(_0x2f4097['AirshipSpeed'])this[_0x35d640(0x325)](_0x2f4097['AirshipSpeed']);}}}},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x347)]=Game_Event['prototype'][_0xbbde9f(0x153)],Game_Event[_0xbbde9f(0x238)]['initialize']=function(_0xc1f2c1,_0x5aeee6){const _0x274989=_0xbbde9f;VisuMZ['EventsMoveCore'][_0x274989(0x347)][_0x274989(0x395)](this,_0xc1f2c1,_0x5aeee6),this['setupCopyEvent'](),this[_0x274989(0x221)](),this['restoreSavedEventPosition']();},VisuMZ[_0xbbde9f(0x44a)]['Game_Event_event']=Game_Event[_0xbbde9f(0x238)]['event'],Game_Event[_0xbbde9f(0x238)]['event']=function(){const _0x863531=_0xbbde9f;if(this[_0x863531(0x302)]!==undefined){const _0x41cef8=this[_0x863531(0x302)]['mapId'],_0x511af8=this[_0x863531(0x302)][_0x863531(0x211)];return VisuMZ['PreloadedMaps'][_0x41cef8][_0x863531(0x344)][_0x511af8];}if(this[_0x863531(0x178)]!==undefined){const _0x198553=this[_0x863531(0x178)]['mapId'],_0x15f485=this['_eventCopyData'][_0x863531(0x211)];return VisuMZ['PreloadedMaps'][_0x198553][_0x863531(0x344)][_0x15f485];}if(this['_eventSpawnData']!==undefined){const _0x46ae0c=this['_eventSpawnData'][_0x863531(0x380)],_0x22494a=this[_0x863531(0x164)][_0x863531(0x211)];return VisuMZ['PreloadedMaps'][_0x46ae0c][_0x863531(0x344)][_0x22494a];}if($gameTemp[_0x863531(0x36c)]!==undefined){const _0xa8559a=$gameTemp['_spawnData'][_0x863531(0x380)],_0x4201d1=$gameTemp[_0x863531(0x36c)][_0x863531(0x211)];return VisuMZ['PreloadedMaps'][_0xa8559a][_0x863531(0x344)][_0x4201d1];}return VisuMZ[_0x863531(0x44a)][_0x863531(0x1c5)][_0x863531(0x395)](this);},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x13c)]=function(_0x252e5c,_0x1a57f8){const _0x42fccb=_0xbbde9f;if(_0x252e5c===0x0||_0x1a57f8===0x0)return![];if(!VisuMZ[_0x42fccb(0x414)][_0x252e5c])return $gameTemp[_0x42fccb(0x2a5)]()&&console[_0x42fccb(0x409)](_0x42fccb(0x440)[_0x42fccb(0x10c)](_0x252e5c)),![];return!![];},VisuMZ[_0xbbde9f(0x44a)]['Game_Event_start']=Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x44e)],Game_Event['prototype'][_0xbbde9f(0x44e)]=function(){const _0x500612=_0xbbde9f;VisuMZ[_0x500612(0x44a)][_0x500612(0x366)][_0x500612(0x395)](this),Imported['VisuMZ_1_MessageCore']&&Input['isPressed'](VisuMZ[_0x500612(0x1e4)]['Settings'][_0x500612(0x3b1)][_0x500612(0x39c)])&&Input[_0x500612(0x1f3)]();},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x33a)]=function(){const _0x1900db=_0xbbde9f,_0xc9e71e=this[_0x1900db(0xbf)]()['note'];if(_0xc9e71e==='')return;if(DataManager[_0x1900db(0x2e2)]()||DataManager[_0x1900db(0x21a)]())return;const _0x2f24ca=VisuMZ[_0x1900db(0x44a)][_0x1900db(0x200)]['Template'];let _0x1e45fd=null,_0x5c23ca=0x0,_0x3a5ce9=0x0;if(_0xc9e71e[_0x1900db(0x396)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x5c23ca=Number(RegExp['$1']),_0x3a5ce9=Number(RegExp['$2']);else{if(_0xc9e71e[_0x1900db(0x396)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x5c23ca=Number(RegExp['$1']),_0x3a5ce9=Number(RegExp['$2']);else{if(_0xc9e71e[_0x1900db(0x396)](/<COPY EVENT:[ ](.*?)>/i)){const _0x361ea7=String(RegExp['$1'])['toUpperCase']()[_0x1900db(0x242)]();_0x1e45fd=VisuMZ['EventTemplates'][_0x361ea7];if(!_0x1e45fd)return;_0x5c23ca=_0x1e45fd[_0x1900db(0xb3)],_0x3a5ce9=_0x1e45fd[_0x1900db(0x2cf)];}}}if(!this[_0x1900db(0x13c)](_0x5c23ca,_0x3a5ce9))return;_0x2f24ca[_0x1900db(0x1da)][_0x1900db(0x395)](this,_0x5c23ca,_0x3a5ce9,this);if(_0x1e45fd)_0x1e45fd[_0x1900db(0x1da)]['call'](this,_0x5c23ca,_0x3a5ce9,this);this[_0x1900db(0x178)]={'mapId':_0x5c23ca,'eventId':_0x3a5ce9},this[_0x1900db(0x2db)]=-0x2,this[_0x1900db(0x2e1)](),_0x2f24ca[_0x1900db(0x217)]['call'](this,_0x5c23ca,_0x3a5ce9,this);if(_0x1e45fd)_0x1e45fd[_0x1900db(0x217)][_0x1900db(0x395)](this,_0x5c23ca,_0x3a5ce9,this);$gameMap[_0x1900db(0x2e8)]();},Game_Event[_0xbbde9f(0x238)]['setupMorphEvent']=function(){const _0x34ab4b=_0xbbde9f,_0x1cc1a2=$gameSystem['getPreservedMorphEventData'](this);if(!_0x1cc1a2)return;const _0x4e7c43=_0x1cc1a2[_0x34ab4b(0x2d9)][_0x34ab4b(0x295)]()[_0x34ab4b(0x242)]();_0x4e7c43!==_0x34ab4b(0x11d)?this[_0x34ab4b(0x3d3)](_0x4e7c43,!![]):this[_0x34ab4b(0x329)](_0x1cc1a2[_0x34ab4b(0x380)],_0x1cc1a2[_0x34ab4b(0x211)],!![]);},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x329)]=function(_0x805e95,_0x574d3d,_0x13cb4b){const _0x51b90d=_0xbbde9f;if(!this[_0x51b90d(0x13c)](_0x805e95,_0x574d3d))return;const _0x5ca151=VisuMZ[_0x51b90d(0x44a)][_0x51b90d(0x200)][_0x51b90d(0x213)];if(!_0x13cb4b)_0x5ca151[_0x51b90d(0x1ad)][_0x51b90d(0x395)](this,_0x805e95,_0x574d3d,this);this[_0x51b90d(0x302)]={'mapId':_0x805e95,'eventId':_0x574d3d},this[_0x51b90d(0x2db)]=-0x2,this['refresh']();if(!_0x13cb4b)_0x5ca151[_0x51b90d(0x37d)][_0x51b90d(0x395)](this,_0x805e95,_0x574d3d,this);$gameMap[_0x51b90d(0x2e8)]();},Game_Event[_0xbbde9f(0x238)]['morphIntoTemplate']=function(_0x19abb5,_0x5b1bbf){const _0x4e4a71=_0xbbde9f;_0x19abb5=_0x19abb5[_0x4e4a71(0x295)]()[_0x4e4a71(0x242)]();const _0x1a3ef3=VisuMZ['EventTemplates'][_0x19abb5];if(!_0x1a3ef3)return;const _0xa6eb74=_0x1a3ef3['MapID'],_0x38b932=_0x1a3ef3[_0x4e4a71(0x2cf)];if(!this[_0x4e4a71(0x13c)](_0xa6eb74,_0x38b932))return;if(!_0x5b1bbf)_0x1a3ef3[_0x4e4a71(0x1ad)][_0x4e4a71(0x395)](this,_0xa6eb74,_0x38b932,this);this['morphInto'](_0xa6eb74,_0x38b932,_0x5b1bbf);if(!_0x5b1bbf)_0x1a3ef3['PostMorphJS'][_0x4e4a71(0x395)](this,_0xa6eb74,_0x38b932,this);this[_0x4e4a71(0x2e8)]();},Game_Event['prototype'][_0xbbde9f(0x345)]=function(){const _0x120e03=_0xbbde9f;this[_0x120e03(0x302)]=undefined,this[_0x120e03(0x2db)]=-0x2,this[_0x120e03(0x2e1)]();},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x247)]=function(_0x42ab16){const _0x385265=_0xbbde9f,_0xbc5e66=VisuMZ[_0x385265(0x44a)][_0x385265(0x200)]['Template'],_0x19725d=_0x42ab16['template'][_0x385265(0x295)]()[_0x385265(0x242)](),_0x204213=!['',_0x385265(0x11d)][_0x385265(0x337)](_0x19725d);let _0x5e8d36=0x0,_0x48619f=0x0;if(_0x204213){const _0x1fff93=VisuMZ['EventTemplates'][_0x19725d];if(!_0x1fff93)return;_0x5e8d36=_0x1fff93[_0x385265(0xb3)],_0x48619f=_0x1fff93['EventID'];}else _0x5e8d36=_0x42ab16[_0x385265(0x380)],_0x48619f=_0x42ab16[_0x385265(0x211)];if(!this[_0x385265(0x13c)](_0x5e8d36,_0x48619f))return;if(_0x204213){const _0x574517=VisuMZ[_0x385265(0x2b2)][_0x19725d];_0x574517[_0x385265(0x3f5)][_0x385265(0x395)](this,_0x5e8d36,_0x48619f,this);}_0xbc5e66['PreSpawnJS']['call'](this,_0x5e8d36,_0x48619f,this),this['_eventSpawnData']=_0x42ab16,this[_0x385265(0x2db)]=-0x2,this[_0x385265(0x174)]=$gameMap[_0x385265(0x380)](),this[_0x385265(0x331)]=_0x42ab16[_0x385265(0x18e)],this[_0x385265(0x27c)]=_0x42ab16[_0x385265(0x1d8)],this[_0x385265(0x21d)](_0x42ab16['x'],_0x42ab16['y']),this[_0x385265(0xba)](_0x42ab16[_0x385265(0x375)]),this[_0x385265(0x2e1)]();if(_0x204213){const _0x1c8b59=VisuMZ[_0x385265(0x2b2)][_0x19725d];if(!_0x1c8b59)return;_0x1c8b59[_0x385265(0x10b)][_0x385265(0x395)](this,_0x5e8d36,_0x48619f,this);}_0xbc5e66[_0x385265(0x10b)][_0x385265(0x395)](this,_0x5e8d36,_0x48619f,this);const _0x164e83=SceneManager['_scene'];if(_0x164e83&&_0x164e83['_spriteset'])_0x164e83[_0x385265(0xef)][_0x385265(0x1cb)](this);},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x197)]=function(){const _0x46a093=_0xbbde9f;return!!this[_0x46a093(0x164)];},VisuMZ['EventsMoveCore'][_0xbbde9f(0x30c)]=Game_Event['prototype'][_0xbbde9f(0x2e1)],Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x2e1)]=function(){const _0x26ddab=_0xbbde9f,_0x3b7a61=this[_0x26ddab(0x2db)];VisuMZ[_0x26ddab(0x44a)][_0x26ddab(0x30c)]['call'](this),_0x3b7a61!==this[_0x26ddab(0x2db)]&&this[_0x26ddab(0x35b)]();},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0xe9)]=Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x42a)],Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x42a)]=function(){const _0x303c84=_0xbbde9f;VisuMZ['EventsMoveCore'][_0x303c84(0xe9)][_0x303c84(0x395)](this),this[_0x303c84(0x3e3)]();},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x361)]=Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x355)],Game_Event['prototype'][_0xbbde9f(0x355)]=function(){const _0x31e7a2=_0xbbde9f;this[_0x31e7a2(0x2aa)]=!![],VisuMZ['EventsMoveCore'][_0x31e7a2(0x361)][_0x31e7a2(0x395)](this),this['setupEventsMoveCoreEffects'](),this[_0x31e7a2(0x2aa)]=![];},Game_Event['prototype']['setupEventsMoveCoreEffects']=function(){const _0x5c05a1=_0xbbde9f;if(!this['event']())return;this[_0x5c05a1(0x3e3)](),this['setupEventsMoveCoreNotetags'](),this[_0x5c05a1(0x1e8)](),this['updateEventsMoveCoreTagChanges']();},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x38b)]=function(){const _0x4313e7=_0xbbde9f,_0x58cc7a=this[_0x4313e7(0xbf)]()[_0x4313e7(0x2fa)];if(_0x58cc7a==='')return;this[_0x4313e7(0x422)](_0x58cc7a);},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x1e8)]=function(){const _0x128e7a=_0xbbde9f;if(!this[_0x128e7a(0x191)]())return;const _0x4e1dfc=this[_0x128e7a(0x39d)]();let _0x5d647f='';for(const _0x308366 of _0x4e1dfc){if([0x6c,0x198]['includes'](_0x308366[_0x128e7a(0x3f3)])){if(_0x5d647f!=='')_0x5d647f+='\x0a';_0x5d647f+=_0x308366[_0x128e7a(0x443)][0x0];}}this[_0x128e7a(0x422)](_0x5d647f);},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x3e3)]=function(){const _0x532865=_0xbbde9f,_0x559294=VisuMZ[_0x532865(0x44a)][_0x532865(0x200)];this[_0x532865(0x30d)]={'type':'none','distance':0x0,'regionList':[]},this[_0x532865(0x132)]=![],this['_clickTrigger']=![],this[_0x532865(0x34d)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x532865(0x2c8)]={'iconIndex':0x0,'bufferX':_0x559294[_0x532865(0x29c)]['BufferX'],'bufferY':_0x559294[_0x532865(0x29c)][_0x532865(0x2af)],'blendMode':_0x559294['Icon'][_0x532865(0x11a)]},this[_0x532865(0x3f8)]={'text':'','visibleRange':_0x559294[_0x532865(0x39b)]['VisibleRange'],'offsetX':_0x559294['Label']['OffsetX'],'offsetY':_0x559294[_0x532865(0x39b)][_0x532865(0x407)]},this['_moveOnlyRegions']=[],this[_0x532865(0x3e4)]={'target':-0x1,'type':_0x532865(0x319),'delay':0x1},this[_0x532865(0x155)]=![],this[_0x532865(0x3e8)]={'visible':!![],'filename':_0x559294[_0x532865(0x3de)][_0x532865(0x1ca)]},this[_0x532865(0x172)](),this[_0x532865(0x2f9)]();},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x422)]=function(_0x1ad161){const _0x1f3adb=_0xbbde9f;if(_0x1ad161[_0x1f3adb(0x396)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this['_activationProximity'][_0x1f3adb(0x245)]=JSON[_0x1f3adb(0x1eb)]('['+RegExp['$1']['match'](/\d+/g)+']'),this[_0x1f3adb(0x30d)][_0x1f3adb(0x43f)]=_0x1f3adb(0x360);else _0x1ad161[_0x1f3adb(0x396)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])['toLowerCase']()['trim'](),this[_0x1f3adb(0x30d)][_0x1f3adb(0x43f)]=type,this[_0x1f3adb(0x30d)]['distance']=Number(RegExp['$2']));_0x1ad161['match'](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x1f3adb(0x132)]=!![]);_0x1ad161[_0x1f3adb(0x396)](/<CLICK TRIGGER>/i)&&(this[_0x1f3adb(0x29a)]=!![]);const _0x1d24e9=_0x1ad161[_0x1f3adb(0x396)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x1d24e9)for(const _0x4080cb of _0x1d24e9){if(_0x4080cb['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x24a813=String(RegExp['$1'])['toLowerCase']()['trim'](),_0x2be665=Number(RegExp['$2']);this[_0x1f3adb(0x34d)][_0x24a813]=_0x2be665;}}_0x1ad161['match'](/<ICON:[ ](\d+)>/i)&&(this[_0x1f3adb(0x2c8)][_0x1f3adb(0x3c1)]=Number(RegExp['$1']));_0x1ad161[_0x1f3adb(0x396)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x1f3adb(0x2c8)]['bufferX']=Number(RegExp['$1']));_0x1ad161[_0x1f3adb(0x396)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x1f3adb(0x2c8)]['bufferY']=Number(RegExp['$1']));_0x1ad161[_0x1f3adb(0x396)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x1f3adb(0x2c8)]['bufferX']=Number(RegExp['$1']),this[_0x1f3adb(0x2c8)][_0x1f3adb(0x17b)]=Number(RegExp['$2']));if(_0x1ad161[_0x1f3adb(0x396)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x25f86a=String(RegExp['$1'])[_0x1f3adb(0x295)]()[_0x1f3adb(0x242)](),_0x173588=[_0x1f3adb(0x26c),_0x1f3adb(0x40f),_0x1f3adb(0x231),_0x1f3adb(0x322)];this[_0x1f3adb(0x2c8)][_0x1f3adb(0xee)]=_0x173588[_0x1f3adb(0x1e0)](_0x25f86a)['clamp'](0x0,0x3);}_0x1ad161[_0x1f3adb(0x396)](/<LABEL:[ ](.*?)>/i)&&(this[_0x1f3adb(0x3f8)][_0x1f3adb(0x415)]=String(RegExp['$1'])[_0x1f3adb(0x242)]());_0x1ad161['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this[_0x1f3adb(0x3f8)][_0x1f3adb(0x415)]=String(RegExp['$1'])[_0x1f3adb(0x242)]());_0x1ad161[_0x1f3adb(0x396)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x1f3adb(0x3f8)][_0x1f3adb(0x3b7)]=Number(RegExp['$1']));_0x1ad161['match'](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x1f3adb(0x3f8)][_0x1f3adb(0x29f)]=Number(RegExp['$1']));_0x1ad161[_0x1f3adb(0x396)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x1f3adb(0x3f8)][_0x1f3adb(0x3b7)]=Number(RegExp['$1']),this[_0x1f3adb(0x3f8)][_0x1f3adb(0x29f)]=Number(RegExp['$2']));$gameTemp['registerSelfTarget'](this);for(;;){if(this['_labelWindow']['text']['match'](/\\V\[(\d+)\]/gi))this['_labelWindow'][_0x1f3adb(0x415)]=this['_labelWindow'][_0x1f3adb(0x415)][_0x1f3adb(0x3e6)](/\\V\[(\d+)\]/gi,(_0x49b7c8,_0x37410a)=>$gameVariables[_0x1f3adb(0x451)](parseInt(_0x37410a)));else break;}$gameTemp['clearSelfTarget']();_0x1ad161[_0x1f3adb(0x396)](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x1f3adb(0x3f8)][_0x1f3adb(0x14b)]=Number(RegExp['$1']));if(_0x1ad161[_0x1f3adb(0x396)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x5be003=JSON[_0x1f3adb(0x1eb)]('['+RegExp['$1'][_0x1f3adb(0x396)](/\d+/g)+']');this['_moveOnlyRegions']=this['_moveOnlyRegions'][_0x1f3adb(0x179)](_0x5be003),this[_0x1f3adb(0x15c)]['remove'](0x0);}if(_0x1ad161[_0x1f3adb(0x396)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0xf0d31a=String(RegExp['$1']);if(_0xf0d31a[_0x1f3adb(0x396)](/PLAYER/i))this[_0x1f3adb(0x3e4)][_0x1f3adb(0x1f0)]=0x0;else _0xf0d31a['match'](/EVENT[ ](\d+)/i)&&(this[_0x1f3adb(0x3e4)][_0x1f3adb(0x1f0)]=Number(RegExp['$1']));}_0x1ad161[_0x1f3adb(0x396)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x1f3adb(0x3e4)][_0x1f3adb(0x43f)]=String(RegExp['$1'])[_0x1f3adb(0x34c)]()[_0x1f3adb(0x242)]()),_0x1ad161[_0x1f3adb(0x396)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x1f3adb(0x3e4)][_0x1f3adb(0xda)]=Number(RegExp['$1'])),_0x1ad161[_0x1f3adb(0x396)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x1f3adb(0x155)]=!![]),_0x1ad161[_0x1f3adb(0x396)](/<HIDE SHADOW>/i)&&(this[_0x1f3adb(0x3e8)][_0x1f3adb(0x2d4)]=![]),_0x1ad161[_0x1f3adb(0x396)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x1f3adb(0x3e8)]['filename']=String(RegExp['$1'])),_0x1ad161[_0x1f3adb(0x396)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x1f3adb(0x17e)]=Number(RegExp['$1'])),_0x1ad161[_0x1f3adb(0x396)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x1f3adb(0x33b)]=Number(RegExp['$1'])),_0x1ad161[_0x1f3adb(0x396)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x1f3adb(0x17e)]=Number(RegExp['$1']),this[_0x1f3adb(0x33b)]=Number(RegExp['$2'])),_0x1ad161['match'](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x1f3adb(0x2b5)]=String(RegExp['$1'])[_0x1f3adb(0x295)]()[_0x1f3adb(0x242)]());},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x1c1)]=function(){const _0x4b4fe2=_0xbbde9f;this[_0x4b4fe2(0x15e)]();},Game_Event['prototype'][_0xbbde9f(0x3a4)]=function(){const _0x1896ed=_0xbbde9f;if(this['_alwaysUpdateMove'])return!![];return Game_Character[_0x1896ed(0x238)][_0x1896ed(0x3a4)][_0x1896ed(0x395)](this);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x271)]=Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x1bf)],Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x1bf)]=function(){const _0x2754f7=_0xbbde9f;if(this[_0x2754f7(0x251)]())return;VisuMZ['EventsMoveCore'][_0x2754f7(0x271)]['call'](this),this[_0x2754f7(0x2d8)]()&&VisuMZ[_0x2754f7(0x300)](this['_eventId']);},Game_Event['prototype']['isPreventSelfMovement']=function(){const _0x5bd046=_0xbbde9f,_0x3d51a6=VisuMZ['EventsMoveCore'][_0x5bd046(0x200)][_0x5bd046(0x3de)];if($gameMap['isEventRunning']()&&_0x3d51a6['StopAutoMoveEvents'])return!![];if($gameMessage['isBusy']()&&_0x3d51a6['StopAutoMoveMessages'])return!![];if(!$gameSystem['isAllowEventAutoMovement']())return!![];if(this[_0x5bd046(0x148)]()>=0x0)return!![];return![];},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x15e)]=function(){const _0x1f813c=_0xbbde9f,_0x1650eb=SceneManager[_0x1f813c(0x116)][_0x1f813c(0xef)];if(_0x1650eb){const _0x2f5079=_0x1650eb[_0x1f813c(0x3b4)](this);_0x2f5079&&_0x2f5079['_shadowSprite']&&_0x2f5079[_0x1f813c(0x281)][_0x1f813c(0x3e1)]!==this[_0x1f813c(0x225)]()&&(_0x2f5079['_shadowSprite'][_0x1f813c(0x3e1)]=this['shadowFilename'](),_0x2f5079[_0x1f813c(0x281)]['bitmap']=ImageManager[_0x1f813c(0x149)](_0x2f5079['_shadowSprite'][_0x1f813c(0x3e1)]));}},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x225)]=function(){const _0x3af217=_0xbbde9f;return this[_0x3af217(0x3e8)]['filename'];},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x16e)]=function(){const _0x9b8e8e=_0xbbde9f;if(!this[_0x9b8e8e(0x3e8)][_0x9b8e8e(0x2d4)])return![];return Game_CharacterBase['prototype'][_0x9b8e8e(0x16e)]['call'](this);},Game_Event['prototype'][_0xbbde9f(0x284)]=function(){const _0x5b8d12=_0xbbde9f;return this[_0x5b8d12(0x3f8)][_0x5b8d12(0x415)];},Game_Event[_0xbbde9f(0x238)]['labelWindowRange']=function(){const _0x45a5e7=_0xbbde9f;return this['_labelWindow'][_0x45a5e7(0x14b)];},Game_Event['prototype']['isMapPassable']=function(_0x359073,_0x490c78,_0x400fc0){const _0x1acabb=_0xbbde9f;if(this['hasMoveOnlyRegions']())return this['isMoveOnlyRegionPassable'](_0x359073,_0x490c78,_0x400fc0);if($gameMap[_0x1acabb(0x25d)](_0x359073,_0x490c78,_0x400fc0,_0x1acabb(0xbf)))return!![];if($gameMap[_0x1acabb(0x2fe)](_0x359073,_0x490c78,_0x400fc0,_0x1acabb(0xbf)))return![];return Game_Character[_0x1acabb(0x238)][_0x1acabb(0x13e)][_0x1acabb(0x395)](this,_0x359073,_0x490c78,_0x400fc0);},Game_Event[_0xbbde9f(0x238)]['hasMoveOnlyRegions']=function(){const _0x56295f=_0xbbde9f;if(this[_0x56295f(0x15c)]===undefined)this[_0x56295f(0x3e3)]();return this[_0x56295f(0x15c)][_0x56295f(0x3b8)]>0x0;},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x3d9)]=function(_0x46b7b6,_0x38758b,_0x247dd6){const _0x4b2b1e=_0xbbde9f,_0x2632a1=$gameMap['roundXWithDirection'](_0x46b7b6,_0x247dd6),_0x4cd0fc=$gameMap[_0x4b2b1e(0x11b)](_0x38758b,_0x247dd6),_0x3babe7=$gameMap[_0x4b2b1e(0x154)](_0x2632a1,_0x4cd0fc);return this[_0x4b2b1e(0x15c)][_0x4b2b1e(0x337)](_0x3babe7);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0xe4)]=Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x2a6)],Game_Event[_0xbbde9f(0x238)]['findProperPageIndex']=function(){const _0x2e2c53=_0xbbde9f;return this[_0x2e2c53(0x16a)]=![],this[_0x2e2c53(0x222)]=![],this[_0x2e2c53(0xbf)]()?VisuMZ[_0x2e2c53(0x44a)][_0x2e2c53(0xe4)]['call'](this):-0x1;},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x10d)]=Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x391)],Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x391)]=function(_0x3a6202){const _0xb6b03=_0xbbde9f;this['checkAdvancedSwitchVariablePresent'](_0x3a6202),$gameTemp[_0xb6b03(0x21c)](this);const _0x199120=VisuMZ['EventsMoveCore'][_0xb6b03(0x10d)][_0xb6b03(0x395)](this,_0x3a6202);return $gameTemp['clearSelfTarget'](),_0x199120;},Game_Event['prototype'][_0xbbde9f(0x3d8)]=function(){const _0x208f3b=_0xbbde9f;return this[_0x208f3b(0x16a)];},Game_Event['prototype'][_0xbbde9f(0x23a)]=function(_0x4685f4){const _0x5811d6=_0xbbde9f,_0xe982cf=_0x4685f4[_0x5811d6(0xce)];if(_0xe982cf[_0x5811d6(0x36a)]&&DataManager['isAdvancedSwitch'](_0xe982cf[_0x5811d6(0x14f)]))this['_advancedSwitchVariable']=!![];else{if(_0xe982cf[_0x5811d6(0x229)]&&DataManager[_0x5811d6(0x1fc)](_0xe982cf[_0x5811d6(0x218)]))this[_0x5811d6(0x16a)]=!![];else _0xe982cf['variableValid']&&DataManager[_0x5811d6(0x122)](_0xe982cf[_0x5811d6(0x2a7)])&&(this[_0x5811d6(0x16a)]=!![]);}},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x32f)]=function(){const _0x56bb5e=_0xbbde9f;if(this[_0x56bb5e(0x27e)])return![];return this[_0x56bb5e(0x29a)];},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x1f1)]=function(){const _0x115820=_0xbbde9f;$gameTemp['clearDestination'](),this[_0x115820(0x44e)]();},Game_Event[_0xbbde9f(0x238)]['pos']=function(_0x11cf22,_0x430555){const _0x1d2714=_0xbbde9f;return this[_0x1d2714(0x34d)]?this[_0x1d2714(0x17c)](_0x11cf22,_0x430555):Game_Character[_0x1d2714(0x238)][_0x1d2714(0x3a6)][_0x1d2714(0x395)](this,_0x11cf22,_0x430555);},Game_Event['prototype']['posEventsMoveCore']=function(_0x291399,_0x4055b1){const _0x246907=_0xbbde9f;var _0x2f6ba0=this['x']-this['_addedHitbox'][_0x246907(0x385)],_0x32b785=this['x']+this[_0x246907(0x34d)]['right'],_0x3e3f7b=this['y']-this[_0x246907(0x34d)]['up'],_0x6f0dd3=this['y']+this['_addedHitbox'][_0x246907(0x3f6)];return _0x2f6ba0<=_0x291399&&_0x291399<=_0x32b785&&_0x3e3f7b<=_0x4055b1&&_0x4055b1<=_0x6f0dd3;},Game_Event[_0xbbde9f(0x238)]['canPass']=function(_0x322b9b,_0x3939f4,_0x65bf0b){const _0x12253e=_0xbbde9f;for(let _0x14e3fe=-this['_addedHitbox']['left'];_0x14e3fe<=this[_0x12253e(0x34d)][_0x12253e(0x33d)];_0x14e3fe++){for(let _0x2e69eb=-this[_0x12253e(0x34d)]['up'];_0x2e69eb<=this[_0x12253e(0x34d)][_0x12253e(0x3f6)];_0x2e69eb++){if(!Game_Character[_0x12253e(0x238)][_0x12253e(0x2ea)][_0x12253e(0x395)](this,_0x322b9b+_0x14e3fe,_0x3939f4+_0x2e69eb,_0x65bf0b))return![];}}return!![];},Game_Event['prototype'][_0xbbde9f(0x286)]=function(_0x5d8b12,_0x581037){const _0x426bde=_0xbbde9f;if(Imported['VisuMZ_0_CoreEngine']&&this[_0x426bde(0x303)]())return this['checkSmartEventCollision'](_0x5d8b12,_0x581037);else{const _0x3276d4=$gameMap[_0x426bde(0x3ab)](_0x5d8b12,_0x581037)[_0x426bde(0x37a)](_0x1692eb=>_0x1692eb!==this);return _0x3276d4[_0x426bde(0x3b8)]>0x0;}},Game_Event[_0xbbde9f(0x238)]['checkSmartEventCollision']=function(_0x147e19,_0x51b467){const _0x10b1d9=_0xbbde9f;if(!this['isNormalPriority']())return![];else{const _0x4da359=$gameMap[_0x10b1d9(0x3ab)](_0x147e19,_0x51b467)[_0x10b1d9(0x37a)](_0x189d40=>_0x189d40!==this&&_0x189d40[_0x10b1d9(0x195)]());return _0x4da359[_0x10b1d9(0x3b8)]>0x0;}},Game_Event[_0xbbde9f(0x238)]['activationProximityType']=function(){const _0x12b136=_0xbbde9f;return this[_0x12b136(0x30d)][_0x12b136(0x43f)]||_0x12b136(0x2d3);},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x1a9)]=function(){const _0x595e3f=_0xbbde9f;return this[_0x595e3f(0x30d)][_0x595e3f(0x317)]||0x0;},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x21b)]=function(){const _0x3c47b6=_0xbbde9f;return this['_activationProximity'][_0x3c47b6(0x245)]||[];},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0xeb)]=function(){const _0x5c74c9=_0xbbde9f;Game_Character[_0x5c74c9(0x238)][_0x5c74c9(0xeb)][_0x5c74c9(0x395)](this);if([_0x5c74c9(0x2d3),'region'][_0x5c74c9(0x337)](this[_0x5c74c9(0x23d)]()))return;$gamePlayer['checkEventTriggerEventsMoveCore']([0x2]);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x382)]=Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x13d)],Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x13d)]=function(){const _0x3fd560=_0xbbde9f;if(this['_trigger']!==0x3)return;if(this[_0x3fd560(0x2aa)])return;if(!this[_0x3fd560(0x3cc)](![]))return;if(!this[_0x3fd560(0x1db)](![]))return;VisuMZ['EventsMoveCore'][_0x3fd560(0x382)][_0x3fd560(0x395)](this);},VisuMZ[_0xbbde9f(0x44a)]['Game_Event_updateParallel']=Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x310)],Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x310)]=function(){const _0x1faf8d=_0xbbde9f;if(!this[_0x1faf8d(0x38d)])return;if(!this[_0x1faf8d(0x3cc)](!![]))return;if(!this['checkActivationProximity'](!![]))return;VisuMZ[_0x1faf8d(0x44a)][_0x1faf8d(0x11f)][_0x1faf8d(0x395)](this);},Game_Event['prototype'][_0xbbde9f(0x3cc)]=function(_0x14f579){const _0x26885b=_0xbbde9f;if(!_0x14f579&&$gameMap[_0x26885b(0x272)]())return![];if(!_0x14f579&&$gameMap['isAnyEventStarting']())return![];if(this['activationRegionList']()<=0x0)return!![];return $gamePlayer[_0x26885b(0x39f)](this);},Game_Event[_0xbbde9f(0x238)]['checkActivationProximity']=function(_0x151deb){const _0x40bfc6=_0xbbde9f;if(!_0x151deb&&$gameMap[_0x40bfc6(0x272)]())return![];if(!_0x151deb&&$gameMap[_0x40bfc6(0x255)]())return![];if([_0x40bfc6(0x2d3),_0x40bfc6(0x360)]['includes'](this[_0x40bfc6(0x23d)]()))return!![];return $gamePlayer[_0x40bfc6(0x3da)](this);},VisuMZ[_0xbbde9f(0x300)]=function(_0x216061){const _0x44eb25=_0xbbde9f;for(const _0x3376bb of $gameMap[_0x44eb25(0x344)]()){if(!_0x3376bb)continue;_0x3376bb[_0x44eb25(0x148)]()===_0x216061&&_0x3376bb[_0x44eb25(0x131)]();}},VisuMZ['GetMoveSynchTarget']=function(_0x1bd535){if(_0x1bd535===0x0)return $gamePlayer;return $gameMap['event'](_0x1bd535);},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x148)]=function(){const _0x32fc5f=_0xbbde9f;return this[_0x32fc5f(0x3e4)]['target'];},Game_Event['prototype'][_0xbbde9f(0x2c4)]=function(){const _0x59182c=_0xbbde9f;return this[_0x59182c(0x3e4)][_0x59182c(0x43f)];},Game_Event[_0xbbde9f(0x238)]['realMoveSpeed']=function(){const _0x48fcb6=_0xbbde9f;if(this[_0x48fcb6(0x148)]()>=0x0){const _0xf85422=VisuMZ[_0x48fcb6(0xd0)](this['moveSynchTarget']());if(_0xf85422)return _0xf85422[_0x48fcb6(0x2f8)]();}return Game_Character[_0x48fcb6(0x238)][_0x48fcb6(0x2f8)][_0x48fcb6(0x395)](this);},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x131)]=function(){const _0x30a9bb=_0xbbde9f;this[_0x30a9bb(0x3e4)][_0x30a9bb(0x3d0)]=this[_0x30a9bb(0x3e4)][_0x30a9bb(0x3d0)]||0x0,this[_0x30a9bb(0x3e4)][_0x30a9bb(0x3d0)]--;if(this[_0x30a9bb(0x3e4)][_0x30a9bb(0x3d0)]>0x0)return;this['_moveSynch']['timer']=this[_0x30a9bb(0x3e4)][_0x30a9bb(0xda)],this['processMoveSynch']();},Game_Event['prototype'][_0xbbde9f(0x29e)]=function(){const _0x2a8aed=_0xbbde9f;switch(this[_0x2a8aed(0x2c4)]()){case _0x2a8aed(0x319):this[_0x2a8aed(0xff)]();break;case _0x2a8aed(0x2b7):this['processMoveSynchApproach']();break;case _0x2a8aed(0x444):this['processMoveSynchAway']();break;case _0x2a8aed(0x3b5):this[_0x2a8aed(0x226)]();break;case _0x2a8aed(0x21e):case _0x2a8aed(0x2f6):this[_0x2a8aed(0x2ff)]();break;case'reverse\x20mimic':case _0x2a8aed(0x1b1):this['processMoveSynchReverseMimic']();break;case _0x2a8aed(0x294):case _0x2a8aed(0x2f5):case _0x2a8aed(0x107):case _0x2a8aed(0x3d4):this[_0x2a8aed(0x309)]();break;case _0x2a8aed(0x3e7):case _0x2a8aed(0x2c9):case _0x2a8aed(0x436):case'vert\x20mirror':this[_0x2a8aed(0x2dd)]();break;default:this[_0x2a8aed(0xff)]();break;}this[_0x2a8aed(0x3c6)]();},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0xff)]=function(){const _0x44a556=_0xbbde9f,_0x8014e4=[0x2,0x4,0x6,0x8];$gameMap[_0x44a556(0xf4)]()&&_0x8014e4[_0x44a556(0x2e9)](0x1,0x3,0x7,0x9);const _0x2bd87d=[];for(const _0x4cc670 of _0x8014e4){if(this[_0x44a556(0x2ea)](this['x'],this['y'],_0x4cc670))_0x2bd87d['push'](_0x4cc670);}if(_0x2bd87d[_0x44a556(0x3b8)]>0x0){const _0x1dfc7e=_0x2bd87d[Math[_0x44a556(0x3b3)](_0x2bd87d[_0x44a556(0x3b8)])];this[_0x44a556(0x2c0)](_0x1dfc7e);}},Game_Event[_0xbbde9f(0x238)]['processMoveSynchApproach']=function(){const _0x2dd484=_0xbbde9f,_0x7ec733=VisuMZ[_0x2dd484(0xd0)](this[_0x2dd484(0x148)]());this[_0x2dd484(0x12f)](_0x7ec733);},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x22a)]=function(){const _0x39a8b2=_0xbbde9f,_0x2e9e5d=VisuMZ[_0x39a8b2(0xd0)](this[_0x39a8b2(0x148)]());this[_0x39a8b2(0x35f)](_0x2e9e5d);},Game_Event['prototype'][_0xbbde9f(0x226)]=function(){this['updateRoutineMove']();},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x2ff)]=function(){const _0x417f3f=_0xbbde9f,_0x3c52bf=VisuMZ['GetMoveSynchTarget'](this[_0x417f3f(0x148)]());this[_0x417f3f(0x2c0)](_0x3c52bf[_0x417f3f(0x283)]());},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x204)]=function(){const _0x4b2ada=_0xbbde9f,_0x463789=VisuMZ[_0x4b2ada(0xd0)](this[_0x4b2ada(0x148)]()),_0xd7510e=this[_0x4b2ada(0x393)](_0x463789['lastMovedDirection']());this['executeMoveDir8'](this[_0x4b2ada(0x393)](_0x463789[_0x4b2ada(0x375)]()));},Game_Event[_0xbbde9f(0x238)]['processMoveSynchMirrorHorz']=function(){const _0x196526=_0xbbde9f,_0xe8c0ed=VisuMZ['GetMoveSynchTarget'](this[_0x196526(0x148)]()),_0x5e5a90=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0xe8c0ed[_0x196526(0x283)]()];this[_0x196526(0x2c0)](_0x5e5a90);},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x2dd)]=function(){const _0x5a64e8=_0xbbde9f,_0x37a506=VisuMZ[_0x5a64e8(0xd0)](this[_0x5a64e8(0x148)]()),_0x5f48ab=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x37a506[_0x5a64e8(0x283)]()];this[_0x5a64e8(0x2c0)](_0x5f48ab);},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x3bd)]=function(){const _0x35c72e=_0xbbde9f,_0x2b0104=$gameSystem[_0x35c72e(0x1d9)](this);if(!_0x2b0104)return;this[_0x35c72e(0x21d)](_0x2b0104['x'],_0x2b0104['y']),this[_0x35c72e(0xba)](_0x2b0104[_0x35c72e(0x375)]),this[_0x35c72e(0x2db)]===_0x2b0104[_0x35c72e(0xc7)]&&(this['_moveRouteIndex']=_0x2b0104[_0x35c72e(0x1fb)]);},Game_Event[_0xbbde9f(0x238)]['updateMove']=function(){const _0xc1028d=_0xbbde9f;Game_Character[_0xc1028d(0x238)][_0xc1028d(0xed)][_0xc1028d(0x395)](this),this[_0xc1028d(0x11e)]();},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x25b)]=function(){const _0x2f14dc=_0xbbde9f;if($gameMap[_0x2f14dc(0x37e)]())return!![];return this[_0x2f14dc(0x155)];},Game_Event['prototype'][_0xbbde9f(0x11e)]=function(){const _0x477602=_0xbbde9f;if(!this[_0x477602(0x25b)]())return;this['saveEventLocation']();},Game_Event['prototype'][_0xbbde9f(0x1a1)]=function(){const _0x1ab52b=_0xbbde9f;$gameSystem[_0x1ab52b(0x1a1)](this);},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x425)]=function(){const _0x2e60eb=_0xbbde9f;$gameSystem[_0x2e60eb(0x160)](this);},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x2a1)]=function(){const _0x3c2d47=_0xbbde9f;return $gameSystem[_0x3c2d47(0x2a1)]()?Game_Character['prototype']['getEventIconData'][_0x3c2d47(0x395)](this):this[_0x3c2d47(0x2c8)];},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x40b)]=function(){const _0x18e416=_0xbbde9f;return this[_0x18e416(0x222)];},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x32e)]=Game_Event[_0xbbde9f(0x238)]['meetsConditions'],Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x391)]=function(_0x2e5ada){const _0x2c1dad=_0xbbde9f,_0x1309b5=VisuMZ[_0x2c1dad(0x44a)][_0x2c1dad(0x32e)]['call'](this,_0x2e5ada);if(!_0x1309b5)return![];return this[_0x2c1dad(0x351)](_0x2e5ada);},Game_Event[_0xbbde9f(0x238)][_0xbbde9f(0x351)]=function(_0x5b181e){const _0x4b6bdc=_0xbbde9f;VisuMZ['EventsMoveCore'][_0x4b6bdc(0x22e)][_0x4b6bdc(0x263)](_0x5b181e),this[_0x4b6bdc(0x222)]=_0x5b181e[_0x4b6bdc(0x3d5)][_0x4b6bdc(0x3b8)]>0x0;_0x5b181e[_0x4b6bdc(0x3d5)]===undefined&&VisuMZ[_0x4b6bdc(0x44a)]['CustomPageConditions'][_0x4b6bdc(0x263)](_0x5b181e);if(_0x5b181e[_0x4b6bdc(0x3d5)][_0x4b6bdc(0x3b8)]>0x0)return $gameMap[_0x4b6bdc(0xbf)](this[_0x4b6bdc(0x331)])&&VisuMZ[_0x4b6bdc(0x44a)][_0x4b6bdc(0x22e)][_0x4b6bdc(0x35c)](_0x5b181e[_0x4b6bdc(0x3d5)],this[_0x4b6bdc(0x331)]);return!![];},VisuMZ['EventsMoveCore'][_0xbbde9f(0x316)]=Game_Troop[_0xbbde9f(0x238)]['meetsConditions'],Game_Troop[_0xbbde9f(0x238)]['meetsConditions']=function(_0x29d677){const _0x5337be=_0xbbde9f;var _0x564f65=VisuMZ['EventsMoveCore'][_0x5337be(0x316)][_0x5337be(0x395)](this,_0x29d677);return _0x564f65&&this[_0x5337be(0x365)](_0x29d677);},Game_Troop['prototype'][_0xbbde9f(0x365)]=function(_0x225325){const _0x1cf3c4=_0xbbde9f;_0x225325[_0x1cf3c4(0x3d5)]===undefined&&VisuMZ[_0x1cf3c4(0x44a)][_0x1cf3c4(0x22e)][_0x1cf3c4(0x263)](_0x225325);if(_0x225325[_0x1cf3c4(0x3d5)][_0x1cf3c4(0x3b8)]>0x0)return VisuMZ['EventsMoveCore'][_0x1cf3c4(0x22e)][_0x1cf3c4(0x35c)](_0x225325[_0x1cf3c4(0x3d5)],0x0);return!![];},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0xf2)]=Game_Interpreter[_0xbbde9f(0x238)]['updateWaitMode'],Game_Interpreter[_0xbbde9f(0x238)][_0xbbde9f(0x1ef)]=function(){const _0x34cdd1=_0xbbde9f;if(this[_0x34cdd1(0x285)]==='CallEvent'){if(window[this['_callEventMap']])this[_0x34cdd1(0x285)]='',this[_0x34cdd1(0x427)]();else return!![];}else return VisuMZ['EventsMoveCore'][_0x34cdd1(0xf2)]['call'](this);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x1ce)]=Game_Interpreter[_0xbbde9f(0x238)][_0xbbde9f(0x198)],Game_Interpreter[_0xbbde9f(0x238)][_0xbbde9f(0x198)]=function(){const _0x285077=_0xbbde9f,_0x3d3b92=$gameMap&&this['_eventId']?$gameMap[_0x285077(0xbf)](this[_0x285077(0x331)]):null;$gameTemp[_0x285077(0x21c)](_0x3d3b92);const _0x4bd6ee=VisuMZ[_0x285077(0x44a)][_0x285077(0x1ce)][_0x285077(0x395)](this);return $gameTemp[_0x285077(0x277)](),_0x4bd6ee;},VisuMZ[_0xbbde9f(0x44a)]['Game_Interpreter_PluginCommand']=Game_Interpreter['prototype'][_0xbbde9f(0x2b1)],Game_Interpreter[_0xbbde9f(0x238)][_0xbbde9f(0x2b1)]=function(_0x1f9d40){const _0x47669a=_0xbbde9f;return $gameTemp[_0x47669a(0x176)](this),VisuMZ[_0x47669a(0x44a)][_0x47669a(0x18a)][_0x47669a(0x395)](this,_0x1f9d40);},Game_Interpreter['prototype'][_0xbbde9f(0x3c2)]=function(_0x59b0b1){const _0x1a9ea6=_0xbbde9f;this['_callEventData']=_0x59b0b1;const _0x5026a3=_0x1a9ea6(0x1df)[_0x1a9ea6(0x10c)](_0x59b0b1[_0x1a9ea6(0x380)][_0x1a9ea6(0x40a)](0x3));this['_callEventMap']='$callEventMap'+Graphics[_0x1a9ea6(0x429)]+'_'+this[_0x1a9ea6(0x211)](),DataManager[_0x1a9ea6(0x168)](this['_callEventMap'],_0x5026a3),window[this['_callEventMap']]?this[_0x1a9ea6(0x427)]():this['setWaitMode'](_0x1a9ea6(0xf8));},Game_Interpreter[_0xbbde9f(0x238)][_0xbbde9f(0x427)]=function(){const _0xa54b9e=_0xbbde9f,_0x16d9a4=this['_callEventData'],_0x59394e=window[this[_0xa54b9e(0x400)]],_0x14f4bd=_0x59394e['events'][_0x16d9a4[_0xa54b9e(0x211)]];if(_0x14f4bd&&_0x14f4bd['pages'][_0x16d9a4[_0xa54b9e(0x28d)]-0x1]){const _0x36b598=_0x14f4bd[_0xa54b9e(0x31e)][_0x16d9a4[_0xa54b9e(0x28d)]-0x1][_0xa54b9e(0x39d)];this[_0xa54b9e(0x3aa)](_0x36b598,this[_0xa54b9e(0x211)]());}window[this[_0xa54b9e(0x400)]]=undefined,this[_0xa54b9e(0x400)]=undefined,this[_0xa54b9e(0x26e)]=undefined;};function Game_CPCInterpreter(){const _0x58f627=_0xbbde9f;this[_0x58f627(0x153)]['apply'](this,arguments);};Game_CPCInterpreter[_0xbbde9f(0x238)]=Object[_0xbbde9f(0x448)](Game_Interpreter[_0xbbde9f(0x238)]),Game_CPCInterpreter[_0xbbde9f(0x238)][_0xbbde9f(0x304)]=Game_CPCInterpreter,Game_CPCInterpreter[_0xbbde9f(0x238)][_0xbbde9f(0x1f3)]=function(){const _0x4d183b=_0xbbde9f;Game_Interpreter['prototype'][_0x4d183b(0x1f3)][_0x4d183b(0x395)](this),this[_0x4d183b(0x121)]=![];},Game_CPCInterpreter[_0xbbde9f(0x238)]['execute']=function(){const _0x541b85=_0xbbde9f;while(this[_0x541b85(0x1f6)]()){this[_0x541b85(0x198)]();}},Game_CPCInterpreter[_0xbbde9f(0x238)][_0xbbde9f(0xf7)]=function(_0x455892){const _0x3e0d33=_0xbbde9f;return Game_Interpreter[_0x3e0d33(0x238)][_0x3e0d33(0xf7)][_0x3e0d33(0x395)](this,_0x455892),this[_0x3e0d33(0x367)][_0x3e0d33(0xb4)](_0x2ab051=>_0x2ab051[_0x3e0d33(0x396)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x3e0d33(0x121)]=!![]),!![];},VisuMZ[_0xbbde9f(0x44a)]['Scene_Map_startEncounterEffect']=Scene_Map[_0xbbde9f(0x238)][_0xbbde9f(0x1d0)],Scene_Map[_0xbbde9f(0x238)][_0xbbde9f(0x1d0)]=function(){const _0x3389cc=_0xbbde9f;VisuMZ[_0x3389cc(0x44a)]['Scene_Map_startEncounterEffect'][_0x3389cc(0x395)](this),this[_0x3389cc(0xef)][_0x3389cc(0x32c)]();},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x356)]=Scene_Load['prototype'][_0xbbde9f(0x3a9)],Scene_Load[_0xbbde9f(0x238)][_0xbbde9f(0x3a9)]=function(){const _0x136430=_0xbbde9f;if($gameMap)$gameMap[_0x136430(0x2e8)]();VisuMZ[_0x136430(0x44a)][_0x136430(0x356)][_0x136430(0x395)](this);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x214)]=Sprite_Character[_0xbbde9f(0x238)]['initMembers'],Sprite_Character[_0xbbde9f(0x238)][_0xbbde9f(0x254)]=function(){const _0x3853cb=_0xbbde9f;VisuMZ['EventsMoveCore']['Sprite_Character_initMembers'][_0x3853cb(0x395)](this),this['initMembersEventsMoveCore'](),this[_0x3853cb(0x2bc)]();},Sprite_Character[_0xbbde9f(0x238)]['initMembersEventsMoveCore']=function(){const _0x496055=_0xbbde9f;this[_0x496055(0x307)]=0xff;},Sprite_Character[_0xbbde9f(0x238)][_0xbbde9f(0x2bc)]=function(){const _0x2b1b09=_0xbbde9f;this[_0x2b1b09(0x363)]=new Sprite(),this[_0x2b1b09(0x363)]['bitmap']=ImageManager['loadSystem'](_0x2b1b09(0x2d6)),this[_0x2b1b09(0x363)][_0x2b1b09(0x20a)]['smooth']=![],this[_0x2b1b09(0x363)]['setFrame'](0x0,0x0,0x0,0x0),this['_eventIconSprite']['anchor']['x']=0.5,this['_eventIconSprite']['anchor']['y']=0x1,this[_0x2b1b09(0x350)](this[_0x2b1b09(0x363)]);},Sprite_Character[_0xbbde9f(0x238)][_0xbbde9f(0x326)]=function(){const _0xcea8a2=_0xbbde9f;return this[_0xcea8a2(0x2e7)]&&this['_characterName'][_0xcea8a2(0x396)](/\[VS8\]/i);},Sprite_Character[_0xbbde9f(0x238)][_0xbbde9f(0x267)]=function(){const _0x27bcaa=_0xbbde9f;return this[_0x27bcaa(0x326)]()&&VisuMZ[_0x27bcaa(0x44a)]['Settings'][_0x27bcaa(0x31c)][_0x27bcaa(0x30e)];},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x20f)]=Sprite_Character[_0xbbde9f(0x238)][_0xbbde9f(0x3c6)],Sprite_Character['prototype'][_0xbbde9f(0x3c6)]=function(){const _0x200d9c=_0xbbde9f;VisuMZ[_0x200d9c(0x44a)][_0x200d9c(0x20f)][_0x200d9c(0x395)](this),VisuMZ[_0x200d9c(0x44a)][_0x200d9c(0x200)][_0x200d9c(0x3de)][_0x200d9c(0xfa)]&&this[_0x200d9c(0x38a)](),this[_0x200d9c(0x281)]&&this[_0x200d9c(0x2f2)](),this[_0x200d9c(0x363)]&&this['updateEventIconSprite']();},VisuMZ[_0xbbde9f(0x44a)]['Sprite_Character_setTileBitmap']=Sprite_Character[_0xbbde9f(0x238)]['setTileBitmap'],Sprite_Character[_0xbbde9f(0x238)][_0xbbde9f(0x256)]=function(){const _0x383721=_0xbbde9f;VisuMZ[_0x383721(0x44a)][_0x383721(0x1d2)][_0x383721(0x395)](this),this['bitmap'][_0x383721(0x22d)](this[_0x383721(0x2de)][_0x383721(0x42b)](this));},VisuMZ[_0xbbde9f(0x44a)]['Sprite_Character_setCharacterBitmap']=Sprite_Character[_0xbbde9f(0x238)][_0xbbde9f(0x170)],Sprite_Character[_0xbbde9f(0x238)]['setCharacterBitmap']=function(){const _0x2b8370=_0xbbde9f;VisuMZ['EventsMoveCore'][_0x2b8370(0xde)]['call'](this),this[_0x2b8370(0x20a)][_0x2b8370(0x22d)](this['updateBitmapSmoothing'][_0x2b8370(0x42b)](this));},Sprite_Character[_0xbbde9f(0x238)][_0xbbde9f(0x2de)]=function(){const _0x56a4dc=_0xbbde9f;if(!this['bitmap'])return;this[_0x56a4dc(0x20a)][_0x56a4dc(0x3af)]=!!VisuMZ[_0x56a4dc(0x44a)][_0x56a4dc(0x200)][_0x56a4dc(0x3de)][_0x56a4dc(0x2df)];},VisuMZ[_0xbbde9f(0x44a)]['Sprite_Character_characterPatternY']=Sprite_Character[_0xbbde9f(0x238)][_0xbbde9f(0x159)],Sprite_Character[_0xbbde9f(0x238)]['characterPatternY']=function(){const _0x455877=_0xbbde9f;return this['isSpriteVS8dir']()?this[_0x455877(0xe0)]():VisuMZ['EventsMoveCore']['Sprite_Character_characterPatternY'][_0x455877(0x395)](this);},Sprite_Character[_0xbbde9f(0x238)][_0xbbde9f(0xe0)]=function(){const _0x33f45e=_0xbbde9f,_0x15ad9d=this[_0x33f45e(0x244)][_0x33f45e(0x375)](),_0x5763ad=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0x5763ad[_0x15ad9d]-0x2)/0x2;},Sprite_Character[_0xbbde9f(0x238)][_0xbbde9f(0x38a)]=function(){const _0x25e750=_0xbbde9f;this[_0x25e750(0x115)]=0x0;if(this[_0x25e750(0xcc)]()){const _0x3674bd=VisuMZ[_0x25e750(0x44a)][_0x25e750(0x200)]['Movement'],_0x348935=this[_0x25e750(0x244)]['direction']();let _0xcddd9=0x0;if([0x1,0x4,0x7]['includes'](_0x348935))_0xcddd9=_0x3674bd[_0x25e750(0x183)];if([0x3,0x6,0x9]['includes'](_0x348935))_0xcddd9=_0x3674bd['TiltRight'];[0x2,0x8]['includes'](_0x348935)&&(_0xcddd9=[-_0x3674bd[_0x25e750(0x1e3)],0x0,_0x3674bd[_0x25e750(0x1e3)]][this[_0x25e750(0x244)][_0x25e750(0x1c2)]()]);if(this['_reflection'])_0xcddd9*=-0x1;this['rotation']=_0xcddd9;}},Sprite_Character[_0xbbde9f(0x238)][_0xbbde9f(0xcc)]=function(){const _0x55a868=_0xbbde9f;if(this[_0x55a868(0x19e)])return![];return this[_0x55a868(0x244)][_0x55a868(0x297)]()&&!this['_character'][_0x55a868(0x1f9)]()&&!this[_0x55a868(0x244)][_0x55a868(0x36d)]()&&this['getEventIconIndex']()===0x0;},Sprite_Character['prototype'][_0xbbde9f(0x2f2)]=function(){const _0x383ece=_0xbbde9f;this[_0x383ece(0x281)]['x']=this['_character']['shadowX'](),this[_0x383ece(0x281)]['y']=this[_0x383ece(0x244)][_0x383ece(0xc8)](),this[_0x383ece(0x281)][_0x383ece(0x3a7)]=this[_0x383ece(0x3a7)],this[_0x383ece(0x281)]['visible']=this['_character'][_0x383ece(0x16e)](),this[_0x383ece(0x281)]['_hidden']=this['_hidden'],!this[_0x383ece(0x244)]['isShadowShrink']()?(this[_0x383ece(0x281)]['scale']['x']=Math['min'](0x1,this['_shadowSprite'][_0x383ece(0x1e6)]['x']+0.1),this[_0x383ece(0x281)][_0x383ece(0x1e6)]['y']=Math[_0x383ece(0x3a5)](0x1,this[_0x383ece(0x281)][_0x383ece(0x1e6)]['y']+0.1)):(this['_shadowSprite'][_0x383ece(0x1e6)]['x']=Math[_0x383ece(0x162)](0x0,this[_0x383ece(0x281)][_0x383ece(0x1e6)]['x']-0.1),this[_0x383ece(0x281)]['scale']['y']=Math[_0x383ece(0x162)](0x0,this[_0x383ece(0x281)][_0x383ece(0x1e6)]['y']-0.1));},Sprite_Character[_0xbbde9f(0x238)]['updateEventIconSprite']=function(){const _0x33eeb7=_0xbbde9f,_0x47154e=this['_eventIconSprite'],_0x2943a6=this[_0x33eeb7(0x3ae)]();if(_0x2943a6<=0x0)return _0x47154e[_0x33eeb7(0x29b)](0x0,0x0,0x0,0x0);else{const _0x3f4504=ImageManager[_0x33eeb7(0x265)],_0x3ddea3=ImageManager[_0x33eeb7(0x237)],_0x42fb87=_0x2943a6%0x10*_0x3f4504,_0x1d7d11=Math[_0x33eeb7(0x104)](_0x2943a6/0x10)*_0x3ddea3;_0x47154e[_0x33eeb7(0x29b)](_0x42fb87,_0x1d7d11,_0x3f4504,_0x3ddea3),this[_0x33eeb7(0x2d4)]=!![];}const _0x1f7b3a=this[_0x33eeb7(0x244)][_0x33eeb7(0x2a1)]();this[_0x33eeb7(0x267)]()?this[_0x33eeb7(0x399)](_0x47154e):(_0x47154e['x']=_0x1f7b3a?_0x1f7b3a['bufferX']:0x0,_0x47154e['y']=_0x1f7b3a?-this[_0x33eeb7(0x177)]+_0x1f7b3a['bufferY']:0x0),_0x47154e[_0x33eeb7(0xee)]=_0x1f7b3a?_0x1f7b3a['blendMode']:0x0,this[_0x33eeb7(0x301)](_0x47154e),this[_0x33eeb7(0x350)](_0x47154e),_0x47154e[_0x33eeb7(0x115)]=-this[_0x33eeb7(0x115)];},Sprite_Character[_0xbbde9f(0x238)][_0xbbde9f(0x399)]=function(_0x1b35b5){const _0x5ccab8=_0xbbde9f;_0x1b35b5['x']=0x0,_0x1b35b5['y']=-this[_0x5ccab8(0x177)]+this[_0x5ccab8(0x177)]*0x2/0x5,this[_0x5ccab8(0x244)][_0x5ccab8(0x1c2)]()!==0x1&&(_0x1b35b5['y']+=0x1);},Sprite_Character[_0xbbde9f(0x238)][_0xbbde9f(0x3ae)]=function(){const _0x54e832=_0xbbde9f;if(!this['_character'])return 0x0;if(this[_0x54e832(0x244)][_0x54e832(0x27e)])return 0x0;const _0x54b196=this[_0x54e832(0x244)][_0x54e832(0x2a1)]();return _0x54b196?_0x54b196['iconIndex']||0x0:0x0;},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x3ac)]=Sprite_Balloon['prototype'][_0xbbde9f(0x1d5)],Sprite_Balloon[_0xbbde9f(0x238)]['setup']=function(_0x1dc2a7,_0x674e99){const _0x4c63aa=_0xbbde9f;VisuMZ['EventsMoveCore'][_0x4c63aa(0x3ac)][_0x4c63aa(0x395)](this,_0x1dc2a7,_0x674e99),VisuMZ['EventsMoveCore'][_0x4c63aa(0x200)][_0x4c63aa(0x31c)][_0x4c63aa(0xdf)]&&this[_0x4c63aa(0xbe)][_0x4c63aa(0x244)]['setBalloonPose'](_0x674e99,this[_0x4c63aa(0x332)]);},VisuMZ['EventsMoveCore'][_0xbbde9f(0x420)]=Sprite_Balloon[_0xbbde9f(0x238)][_0xbbde9f(0x403)],Sprite_Balloon['prototype']['updatePosition']=function(){const _0x2a6ca8=_0xbbde9f;VisuMZ[_0x2a6ca8(0x44a)]['Sprite_Balloon_updatePosition'][_0x2a6ca8(0x395)](this),this[_0x2a6ca8(0x30b)]();},Sprite_Balloon[_0xbbde9f(0x238)][_0xbbde9f(0x30b)]=function(){const _0x34e7a6=_0xbbde9f;this['_target'][_0x34e7a6(0x244)][_0x34e7a6(0x326)]()&&(this['x']+=VisuMZ[_0x34e7a6(0x44a)][_0x34e7a6(0x200)]['VS8'][_0x34e7a6(0x384)],this['y']+=VisuMZ[_0x34e7a6(0x44a)][_0x34e7a6(0x200)][_0x34e7a6(0x31c)][_0x34e7a6(0x279)]);},VisuMZ['EventsMoveCore'][_0xbbde9f(0x406)]=Spriteset_Map[_0xbbde9f(0x238)][_0xbbde9f(0x240)],Spriteset_Map[_0xbbde9f(0x238)][_0xbbde9f(0x240)]=function(){const _0x5b5df1=_0xbbde9f;VisuMZ[_0x5b5df1(0x44a)]['Spriteset_Map_createLowerLayer'][_0x5b5df1(0x395)](this),this['createLabelWindows']();},VisuMZ['EventsMoveCore']['Spriteset_Map_createShadow']=Spriteset_Map[_0xbbde9f(0x238)][_0xbbde9f(0xd8)],Spriteset_Map[_0xbbde9f(0x238)]['createShadow']=function(){const _0x36fe20=_0xbbde9f;VisuMZ[_0x36fe20(0x44a)][_0x36fe20(0x369)][_0x36fe20(0x395)](this),this[_0x36fe20(0x3c5)]();},Spriteset_Map[_0xbbde9f(0x238)][_0xbbde9f(0x3c5)]=function(){const _0x214110=_0xbbde9f;if(!VisuMZ[_0x214110(0x44a)][_0x214110(0x200)][_0x214110(0x3de)]['ShowShadows'])return;for(const _0x7fed4 of this[_0x214110(0x450)]){this[_0x214110(0x25a)](_0x7fed4);}},Spriteset_Map['prototype']['createCharacterShadow']=function(_0x282fd5){const _0x2087ca=_0xbbde9f;_0x282fd5[_0x2087ca(0x281)]=new Sprite(),_0x282fd5['_shadowSprite'][_0x2087ca(0x3e1)]=_0x282fd5[_0x2087ca(0x244)][_0x2087ca(0x225)](),_0x282fd5[_0x2087ca(0x281)][_0x2087ca(0x20a)]=ImageManager[_0x2087ca(0x149)](_0x282fd5[_0x2087ca(0x281)]['_filename']),_0x282fd5[_0x2087ca(0x281)][_0x2087ca(0x13b)]['x']=0.5,_0x282fd5[_0x2087ca(0x281)][_0x2087ca(0x13b)]['y']=0x1,_0x282fd5[_0x2087ca(0x281)]['z']=0x0,this[_0x2087ca(0x379)]['addChild'](_0x282fd5[_0x2087ca(0x281)]);},Spriteset_Map[_0xbbde9f(0x238)][_0xbbde9f(0x32c)]=function(){const _0x558f45=_0xbbde9f;if(!VisuMZ['EventsMoveCore'][_0x558f45(0x200)][_0x558f45(0x3de)]['ShowShadows'])return;for(const _0x488f26 of this[_0x558f45(0x450)]){this['_tilemap']['removeChild'](_0x488f26[_0x558f45(0x281)]);}},Spriteset_Map['prototype'][_0xbbde9f(0x2a0)]=function(){const _0x3f9875=_0xbbde9f;this[_0x3f9875(0x3b2)]=[];for(const _0x43fb13 of $gameMap['events']()){this[_0x3f9875(0x398)](_0x43fb13);}},Spriteset_Map[_0xbbde9f(0x238)][_0xbbde9f(0x398)]=function(_0xceb5c3){const _0x385812=_0xbbde9f;if(!this['isTargetEventValidForLabelWindow'](_0xceb5c3))return;const _0x4f52a4=new Window_EventLabel(_0xceb5c3);_0x4f52a4['z']=0x8,_0x4f52a4[_0x385812(0x2a4)]=Sprite[_0x385812(0x1dc)]++,this[_0x385812(0x379)]['addChild'](_0x4f52a4),this['_labelWindows'][_0x385812(0x2e9)](_0x4f52a4);},Spriteset_Map[_0xbbde9f(0x238)]['isTargetEventValidForLabelWindow']=function(_0x3c93f0){const _0x4d863c=_0xbbde9f,_0x351912=_0x3c93f0[_0x4d863c(0xbf)]();if(_0x351912[_0x4d863c(0x2fa)][_0x4d863c(0x396)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x351912[_0x4d863c(0x2fa)]['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x9c4327 of _0x351912[_0x4d863c(0x31e)]){let _0x39072b='';for(const _0x2b7d94 of _0x9c4327[_0x4d863c(0x39d)]){[0x6c,0x198][_0x4d863c(0x337)](_0x2b7d94[_0x4d863c(0x3f3)])&&(_0x39072b+=_0x2b7d94['parameters'][0x0]);}if(_0x39072b[_0x4d863c(0x396)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x39072b[_0x4d863c(0x396)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0xbbde9f(0x238)]['createSpawnedEvent']=function(_0x4070f6){const _0x54450d=_0xbbde9f;this['_characterSprites']=this['_characterSprites']||[];const _0x3977f7=new Sprite_Character(_0x4070f6);this['_characterSprites'][_0x54450d(0x2e9)](_0x3977f7),this[_0x54450d(0x379)][_0x54450d(0x350)](_0x3977f7),this[_0x54450d(0x25a)](_0x3977f7),this[_0x54450d(0x398)](_0x4070f6),_0x3977f7[_0x54450d(0x3c6)]();},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x42d)]=Game_Message[_0xbbde9f(0x238)][_0xbbde9f(0x42e)],Game_Message['prototype'][_0xbbde9f(0x42e)]=function(_0x3d50f1,_0x3816ff){const _0x5e50e4=_0xbbde9f;this[_0x5e50e4(0x2e0)]=$gameTemp[_0x5e50e4(0x449)](),VisuMZ[_0x5e50e4(0x44a)][_0x5e50e4(0x42d)][_0x5e50e4(0x395)](this,_0x3d50f1,_0x3816ff);},VisuMZ['EventsMoveCore'][_0xbbde9f(0x1e9)]=Window_NumberInput[_0xbbde9f(0x238)][_0xbbde9f(0x44e)],Window_NumberInput[_0xbbde9f(0x238)][_0xbbde9f(0x44e)]=function(){const _0x39451d=_0xbbde9f;$gameTemp[_0x39451d(0x21c)]($gameMessage[_0x39451d(0x2e0)]),VisuMZ['EventsMoveCore'][_0x39451d(0x1e9)][_0x39451d(0x395)](this),$gameTemp['clearSelfTarget']();},VisuMZ['EventsMoveCore'][_0xbbde9f(0x140)]=Window_NumberInput['prototype'][_0xbbde9f(0x27a)],Window_NumberInput[_0xbbde9f(0x238)][_0xbbde9f(0x27a)]=function(){const _0x111528=_0xbbde9f;$gameTemp[_0x111528(0x21c)]($gameMessage[_0x111528(0x2e0)]),VisuMZ['EventsMoveCore'][_0x111528(0x140)][_0x111528(0x395)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x111528(0x2e0)]=undefined;},VisuMZ[_0xbbde9f(0x44a)]['Game_Message_setItemChoice']=Game_Message[_0xbbde9f(0x238)][_0xbbde9f(0xb6)],Game_Message[_0xbbde9f(0x238)][_0xbbde9f(0xb6)]=function(_0x5ed5d8,_0x2a7c6d){const _0x35e161=_0xbbde9f;this[_0x35e161(0x31d)]=$gameTemp['getSelfTarget'](),VisuMZ[_0x35e161(0x44a)][_0x35e161(0x394)]['call'](this,_0x5ed5d8,_0x2a7c6d);},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x2b4)]=Window_EventItem[_0xbbde9f(0x238)][_0xbbde9f(0x1ae)],Window_EventItem[_0xbbde9f(0x238)]['onOk']=function(){const _0x5b0fae=_0xbbde9f;$gameTemp[_0x5b0fae(0x21c)]($gameMessage[_0x5b0fae(0x31d)]),VisuMZ[_0x5b0fae(0x44a)][_0x5b0fae(0x2b4)]['call'](this),$gameTemp[_0x5b0fae(0x277)](),$gameMessage[_0x5b0fae(0x31d)]=undefined;},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x333)]=Window_EventItem['prototype']['onCancel'],Window_EventItem['prototype'][_0xbbde9f(0xf6)]=function(){const _0x16b326=_0xbbde9f;$gameTemp[_0x16b326(0x21c)]($gameMessage[_0x16b326(0x31d)]),VisuMZ['EventsMoveCore'][_0x16b326(0x333)][_0x16b326(0x395)](this),$gameTemp[_0x16b326(0x277)](),$gameMessage[_0x16b326(0x31d)]=undefined;},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x2a9)]=Window_Message[_0xbbde9f(0x238)][_0xbbde9f(0x3b6)],Window_Message[_0xbbde9f(0x238)][_0xbbde9f(0x3b6)]=function(){const _0x53f521=_0xbbde9f;$gameMessage[_0x53f521(0x249)](),VisuMZ['EventsMoveCore'][_0x53f521(0x2a9)][_0x53f521(0x395)](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0xbbde9f(0x44a)][_0xbbde9f(0x447)]=Window_ScrollText[_0xbbde9f(0x238)][_0xbbde9f(0x3b6)],Window_ScrollText['prototype'][_0xbbde9f(0x3b6)]=function(){const _0x165c2e=_0xbbde9f;$gameMessage[_0x165c2e(0x249)](),VisuMZ['EventsMoveCore'][_0x165c2e(0x447)][_0x165c2e(0x395)](this),$gameTemp[_0x165c2e(0x277)]();};function Window_EventLabel(){const _0x362a31=_0xbbde9f;this[_0x362a31(0x153)](...arguments);}Window_EventLabel[_0xbbde9f(0x238)]=Object['create'](Window_Base[_0xbbde9f(0x238)]),Window_EventLabel[_0xbbde9f(0x238)][_0xbbde9f(0x304)]=Window_EventLabel,Window_EventLabel[_0xbbde9f(0x238)]['initialize']=function(_0x5cb840){const _0x1a16cf=_0xbbde9f;this[_0x1a16cf(0x308)]=_0x5cb840;const _0x1a61d8=new Rectangle(0x0,0x0,Graphics[_0x1a16cf(0x411)]/0x4,this[_0x1a16cf(0xbc)](0x1));this[_0x1a16cf(0x254)](),Window_Base[_0x1a16cf(0x238)][_0x1a16cf(0x153)][_0x1a16cf(0x395)](this,_0x1a61d8),this[_0x1a16cf(0x1ab)]=0x0,this['setBackgroundType'](0x2),this[_0x1a16cf(0x17d)]='';},Window_EventLabel[_0xbbde9f(0x238)][_0xbbde9f(0x254)]=function(){const _0x130156=_0xbbde9f;this[_0x130156(0x1f4)]=![],this[_0x130156(0x2b3)]=$gameScreen[_0x130156(0x377)](),this[_0x130156(0x435)]=this[_0x130156(0x308)][_0x130156(0x223)](),this['_eventScreenY']=this[_0x130156(0x308)][_0x130156(0xb7)](),this[_0x130156(0x11c)]=this[_0x130156(0x308)]['_labelWindow'][_0x130156(0x3b7)],this['_eventLabelOffsetY']=this['_event'][_0x130156(0x3f8)]['offsetY'],this[_0x130156(0x16c)]=this[_0x130156(0x308)]['_pageIndex'],this[_0x130156(0x3c3)]=this['isLabelVisible'](),this[_0x130156(0x387)]=$gamePlayer['x'],this[_0x130156(0x253)]=$gamePlayer['y'],this[_0x130156(0x2cc)]=this[_0x130156(0x308)]['x'],this['_visibleEventY']=this[_0x130156(0x308)]['y'];},Window_EventLabel['prototype']['update']=function(){const _0x168104=_0xbbde9f;Window_Base[_0x168104(0x238)]['update'][_0x168104(0x395)](this);if(!this['needsUpdate']())return;this[_0x168104(0x31f)](),this[_0x168104(0xb9)](),this[_0x168104(0x403)](),this['updateOpacity']();},Window_EventLabel[_0xbbde9f(0x238)][_0xbbde9f(0x2b0)]=function(){const _0x5136e9=_0xbbde9f;if(!this['_event'])return![];if(!this[_0x5136e9(0x308)][_0x5136e9(0x3f8)])return![];if(this[_0x5136e9(0x16c)]!==this[_0x5136e9(0x308)][_0x5136e9(0x2db)])return!![];if(this[_0x5136e9(0x308)][_0x5136e9(0x27e)]&&!this['_eventErased'])return!![];if(this['_event'][_0x5136e9(0x3f8)][_0x5136e9(0x415)]==='')return![];if(this[_0x5136e9(0x2b3)]!==$gameScreen['zoomScale']())return!![];if(this['_eventScreenX']!==this['_event'][_0x5136e9(0x223)]())return!![];if(this[_0x5136e9(0x187)]!==this[_0x5136e9(0x308)]['screenY']())return!![];if(this['_eventLabelOffsetX']!==this['_event'][_0x5136e9(0x3f8)][_0x5136e9(0x3b7)])return!![];if(this[_0x5136e9(0x181)]!==this[_0x5136e9(0x308)][_0x5136e9(0x3f8)][_0x5136e9(0x29f)])return!![];if(this[_0x5136e9(0x387)]!==$gamePlayer['x'])return!![];if(this['_visiblePlayerY']!==$gamePlayer['y'])return!![];if(this[_0x5136e9(0x2cc)]!==this[_0x5136e9(0x308)]['x'])return!![];if(this[_0x5136e9(0x33f)]!==this['_event']['y'])return!![];if(this[_0x5136e9(0x3c3)]&&this[_0x5136e9(0x1ab)]<0xff)return!![];if(!this[_0x5136e9(0x3c3)]&&this['contentsOpacity']>0x0)return!![];if(SceneManager['_scene'][_0x5136e9(0x296)]>0x0)return!![];return![];},Window_EventLabel[_0xbbde9f(0x238)][_0xbbde9f(0x31f)]=function(){const _0x137b6c=_0xbbde9f;this[_0x137b6c(0x308)][_0x137b6c(0x284)]()!==this[_0x137b6c(0x17d)]&&(this[_0x137b6c(0x17d)]=this[_0x137b6c(0x308)]['labelWindowText'](),this[_0x137b6c(0x2e1)]());},Window_EventLabel['prototype']['updateScale']=function(){const _0x51123c=_0xbbde9f;this[_0x51123c(0x1e6)]['x']=0x1/$gameScreen['zoomScale'](),this[_0x51123c(0x1e6)]['y']=0x1/$gameScreen[_0x51123c(0x377)](),this[_0x51123c(0x2b3)]=$gameScreen[_0x51123c(0x377)]();},Window_EventLabel[_0xbbde9f(0x238)][_0xbbde9f(0x403)]=function(){const _0x3b739f=_0xbbde9f;if(!SceneManager['_scene'])return;if(!SceneManager[_0x3b739f(0x116)][_0x3b739f(0xef)])return;const _0x1bc5bb=SceneManager[_0x3b739f(0x116)]['_spriteset']['findTargetSprite'](this[_0x3b739f(0x308)]);if(!_0x1bc5bb)return;this['x']=Math[_0x3b739f(0x3ee)](this[_0x3b739f(0x308)]['screenX']()-Math[_0x3b739f(0x104)](this[_0x3b739f(0x1be)]*this['scale']['x']/0x2)),this['x']+=this[_0x3b739f(0x308)]['_labelWindow'][_0x3b739f(0x3b7)],this['y']=this[_0x3b739f(0x308)]['screenY']()-_0x1bc5bb[_0x3b739f(0x177)],this['y']+=Math['round']($gameSystem[_0x3b739f(0x108)]()*0.5),this['y']-=Math[_0x3b739f(0x3ee)](this[_0x3b739f(0x177)]*this[_0x3b739f(0x1e6)]['y']),this['y']+=this['_event'][_0x3b739f(0x3f8)][_0x3b739f(0x29f)],this[_0x3b739f(0x1f4)]=this['_event'][_0x3b739f(0x27e)],this[_0x3b739f(0x435)]=this[_0x3b739f(0x308)][_0x3b739f(0x223)](),this['_eventScreenY']=this[_0x3b739f(0x308)][_0x3b739f(0xb7)](),this['_eventLabelOffsetX']=this[_0x3b739f(0x308)][_0x3b739f(0x3f8)][_0x3b739f(0x3b7)],this[_0x3b739f(0x181)]=this[_0x3b739f(0x308)][_0x3b739f(0x3f8)][_0x3b739f(0x29f)],this['_eventPageIndex']=this[_0x3b739f(0x308)][_0x3b739f(0x2db)],this[_0x3b739f(0x1f4)]&&(this[_0x3b739f(0x1ab)]=0x0);},Window_EventLabel['prototype'][_0xbbde9f(0x3f2)]=function(){const _0x47fff4=_0xbbde9f;if(this['isLabelVisible']())this[_0x47fff4(0x1ab)]+=this[_0x47fff4(0x289)]();else SceneManager[_0x47fff4(0x116)][_0x47fff4(0x296)]>0x0?this['contentsOpacity']=0x0:this['contentsOpacity']-=this['opacitySpeed']();},Window_EventLabel[_0xbbde9f(0x238)][_0xbbde9f(0x2cd)]=function(){const _0x254267=_0xbbde9f;if(!$gameSystem[_0x254267(0x3ca)]())return![];if(this[_0x254267(0x308)]?.[_0x254267(0x27e)])return![];if(SceneManager[_0x254267(0x116)][_0x254267(0x296)]>0x0)return![];const _0xadd27e=$gamePlayer['x'],_0x49be18=$gamePlayer['y'],_0x3d32b5=this['_event']['x'],_0x252833=this[_0x254267(0x308)]['y'];if(this[_0x254267(0x387)]===_0xadd27e&&this[_0x254267(0x253)]===_0x49be18&&this['_visibleEventX']===_0x3d32b5&&this['_visibleEventY']===_0x252833)return this[_0x254267(0x3c3)];this['_visiblePlayerX']=$gamePlayer['x'],this[_0x254267(0x253)]=$gamePlayer['y'],this[_0x254267(0x2cc)]=this[_0x254267(0x308)]['x'],this[_0x254267(0x33f)]=this['_event']['y'];if($gameMap['absDistance'](_0xadd27e,_0x49be18,_0x3d32b5,_0x252833)>this[_0x254267(0x308)]['labelWindowRange']())return this[_0x254267(0x3c3)]=![],![];return this[_0x254267(0x3c3)]=!![],!![];},Window_EventLabel['prototype']['opacitySpeed']=function(){const _0x5eec1d=_0xbbde9f;return VisuMZ[_0x5eec1d(0x44a)][_0x5eec1d(0x200)][_0x5eec1d(0x39b)][_0x5eec1d(0x334)];},Window_EventLabel[_0xbbde9f(0x238)][_0xbbde9f(0xcb)]=function(){const _0x58e2a9=_0xbbde9f,_0x46de93=this[_0x58e2a9(0x441)](this['_text']);this[_0x58e2a9(0x1be)]=_0x46de93[_0x58e2a9(0x1be)]+($gameSystem[_0x58e2a9(0x108)]()+this[_0x58e2a9(0x18b)]())*0x2,this[_0x58e2a9(0x177)]=Math['max'](this[_0x58e2a9(0xca)](),_0x46de93[_0x58e2a9(0x177)])+$gameSystem[_0x58e2a9(0x108)]()*0x2,this[_0x58e2a9(0x24c)]();},Window_EventLabel[_0xbbde9f(0x238)][_0xbbde9f(0xca)]=function(){const _0x227951=_0xbbde9f;return VisuMZ[_0x227951(0x44a)][_0x227951(0x200)][_0x227951(0x39b)][_0x227951(0x241)];},Window_EventLabel[_0xbbde9f(0x238)][_0xbbde9f(0x3c8)]=function(){const _0x457a19=_0xbbde9f;Window_Base[_0x457a19(0x238)][_0x457a19(0x3c8)][_0x457a19(0x395)](this),this[_0x457a19(0x1e1)][_0x457a19(0x43e)]=this[_0x457a19(0xc2)]();},Window_EventLabel['prototype'][_0xbbde9f(0xc2)]=function(){const _0x5c2a6c=_0xbbde9f;return VisuMZ[_0x5c2a6c(0x44a)][_0x5c2a6c(0x200)]['Label'][_0x5c2a6c(0x320)];},Window_EventLabel[_0xbbde9f(0x238)]['refresh']=function(){const _0x4123b0=_0xbbde9f;this[_0x4123b0(0xcb)](),this[_0x4123b0(0x1e1)][_0x4123b0(0x1f3)]();const _0x3eba2b=this[_0x4123b0(0x17d)]['split'](/[\r\n]+/);let _0x3ebdb5=0x0;for(const _0x56be0a of _0x3eba2b){const _0x547aea=this['textSizeEx'](_0x56be0a),_0x108e7a=Math[_0x4123b0(0x104)]((this[_0x4123b0(0x1d1)]-_0x547aea[_0x4123b0(0x1be)])/0x2);this['drawTextEx'](_0x56be0a,_0x108e7a,_0x3ebdb5),_0x3ebdb5+=_0x547aea[_0x4123b0(0x177)];}},Window_EventLabel['prototype'][_0xbbde9f(0x2f3)]=function(_0x5dcf03,_0x1d356b){const _0x5a9867=_0xbbde9f;_0x1d356b[_0x5a9867(0x372)]&&this['drawIcon'](_0x5dcf03,_0x1d356b['x']+0x2,_0x1d356b['y']),_0x1d356b['x']+=Math[_0x5a9867(0x3a5)](this[_0x5a9867(0x268)](),ImageManager['iconWidth'])+0x4;},Window_EventLabel[_0xbbde9f(0x238)][_0xbbde9f(0xd7)]=function(_0x446cbe,_0x9fba7,_0x50b7dc){const _0x513e0a=_0xbbde9f,_0x4c0690=ImageManager[_0x513e0a(0x149)](_0x513e0a(0x2d6)),_0x45603d=ImageManager['iconWidth'],_0x116f2f=ImageManager[_0x513e0a(0x237)],_0x3850e7=_0x446cbe%0x10*_0x45603d,_0x5b7f33=Math[_0x513e0a(0x104)](_0x446cbe/0x10)*_0x116f2f,_0x3a87ea=Math[_0x513e0a(0x3a5)](this[_0x513e0a(0x268)]()),_0x3c1a4b=Math[_0x513e0a(0x3a5)](this[_0x513e0a(0x268)]());this[_0x513e0a(0x1e1)]['blt'](_0x4c0690,_0x3850e7,_0x5b7f33,_0x45603d,_0x116f2f,_0x9fba7,_0x50b7dc,_0x3a87ea,_0x3c1a4b);},Window_EventLabel['prototype'][_0xbbde9f(0x268)]=function(){const _0x13f92e=_0xbbde9f;return VisuMZ['EventsMoveCore']['Settings'][_0x13f92e(0x39b)][_0x13f92e(0x278)];};