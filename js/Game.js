var BaseBlitz = BaseBlitz || {};

BaseBlitz.Game = function () {};

BaseBlitz.Game.prototype = {
    
    init: function () {
        this.initOrder = [];
        this.initRolls = [];
        this.heroes = [];
        this.monsters = [];
    },
    
    create: function () {
        
        //create tilemap and set up layers
        this.map = this.game.add.tilemap('map1');
        this.map.addTilesetImage('8x3-stone', '8x3-stone');
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.backgroundlayer.resizeWorld();
        
        //tileset 'statue' in Tiled, type 'statue' in Tiled custom properties
        this.map.addTilesetImage('statue', 'statue');
        this.createItems('statue', 'objectsLayer');
        //this.trapdoor = this.game.add.sprite(75 * 4, 75 * 5, 'trapdoor');
        
        this.newTurn = new Phaser.Signal();
        this.newTurn.add(this.turnStart, this, 0);
        
        this.newRound = new Phaser.Signal();
        this.newRound.add(this.roundStart, this, 0);
        
        this.round = 0;
    
        //heroes
        this.hero1 = this.game.add.sprite(75 * 1, 75 * 1, 'jingleboots');
        this.hero1.sheet = _.cloneDeep(pregen1);
        this.hero1.sheet.slots.mainhand = _.clone(weapons.greataxe);
        this.hero2 = this.game.add.sprite(75 * 1, 75 * 3, 'rattlesocks');
        this.hero2.sheet = _.cloneDeep(pregen1);
        this.hero2.sheet.slots.mainhand = _.clone(weapons.greataxe);
        this.hero3 = this.game.add.sprite(75 * 2, 75 * 2, 'scoopercram');
        this.hero3.sheet = _.cloneDeep(pregen1);
        this.hero3.sheet.slots.mainhand = _.clone(weapons.greataxe);
        this.hero4 = this.game.add.sprite(75 * 3, 75 * 3, 'jumperstomp');
        this.hero4.sheet = _.cloneDeep(pregen1);
        this.hero4.sheet.slots.mainhand = _.clone(weapons.greataxe);
        this.heroes = [this.hero1, this.hero2, this.hero3, this.hero4];
        
        //monsters
        this.monster1 = this.game.add.sprite(75 * 6, 75 * 9, 'spider');
        this.monster1.sheet = _.cloneDeep(pregen2);
        this.monster1.sheet.slots.mainhand = _.clone(weapons.dagger);
        this.monster2 = this.game.add.sprite(75 * 8, 75 * 8, 'golem');
        this.monster2.sheet = _.cloneDeep(pregen2);
        this.monster2.sheet.slots.mainhand = _.clone(weapons.club);
        this.monster3 = this.game.add.sprite(75 * 9, 75 * 9, 'fungus');
        this.monster3.sheet = _.cloneDeep(pregen2);
        this.monster3.sheet.slots.mainhand = _.clone(weapons.greataxe);
        this.monster4 = this.game.add.sprite(75 * 6, 75 * 7, 'blindheim');
        this.monster4.sheet = _.cloneDeep(pregen2);
        this.monster4.sheet.slots.mainhand = _.clone(weapons.crossbow);
        this.monsters = [this.monster1, this.monster2, this.monster3, this.monster4];  
        
        //reduce heroes and monsters into list of all players
        this.players = _.concat(this.heroes, this.monsters);
        
        this.standard = {
            meleeBasic: {
                'method': this.meleeBasic,
                'type': 'melee',
                'name': 'Melee Basic Attack'
            },
            rangedBasic: {
                'method': this.rangedBasic,
                'type': 'ranged',
                'name': 'Ranged Basic Attack'
            },
            priestsShield: {
                'method': this.priestsShield,
                'type': 'melee',
                'name': 'Priests Shield'
            }
        };
        
        
        //////////////////////////MANUAL GAME SETUP/////////////////////       
        
        this.initManager(this.hero2, 2); // rattlesocks
        this.initManager(this.hero3, 9); //scoopercram
        this.initManager(this.hero1, 30); // jingleboots
        this.initManager(this.hero4, 15); //jumperstomp
        
        this.initManager(this.monster2, 20); // golem
        this.initManager(this.monster3, 3); //fungus
        this.initManager(this.monster1, 12); // spider
        this.initManager(this.monster4, 15); //blindheim
        
        this.currentPlayer = this.initOrder[0];
        this.game.world.bringToTop(this.currentPlayer);
        this.newRound.dispatch();
        this.newTurn.dispatch();
        ////////////////////////////////////////////////////////////////
        
        //direction controller//       
        this.keyD = this.game.input.keyboard.addKey(Phaser.KeyCode.D); // debug mode
        this.keyE = this.game.input.keyboard.addKey(Phaser.KeyCode.E);
        this.keyS = this.game.input.keyboard.addKey(Phaser.KeyCode.S);
        this.keyM = this.game.input.keyboard.addKey(Phaser.KeyCode.M);
        this.keyV = this.game.input.keyboard.addKey(Phaser.KeyCode.V);
        
        
        this.keyLeft = this.game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
        this.keyRight = this.game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
        this.keyUp = this.game.input.keyboard.addKey(Phaser.KeyCode.UP);
        this.keyDown = this.game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
        
        this.keyEight = this.game.input.keyboard.addKey(Phaser.KeyCode.EIGHT);
        this.keySeven = this.game.input.keyboard.addKey(Phaser.KeyCode.SEVEN);
        this.keyFour = this.game.input.keyboard.addKey(Phaser.KeyCode.FOUR);
        this.keyOne = this.game.input.keyboard.addKey(Phaser.KeyCode.ONE);
        this.keyTwo = this.game.input.keyboard.addKey(Phaser.KeyCode.TWO);
        this.keyThree = this.game.input.keyboard.addKey(Phaser.KeyCode.THREE);
        this.keySix = this.game.input.keyboard.addKey(Phaser.KeyCode.SIX);
        this.keyNine = this.game.input.keyboard.addKey(Phaser.KeyCode.NINE);
        this.keyFive = this.game.input.keyboard.addKey(Phaser.KeyCode.FIVE);
        
        this.keyU = this.game.input.keyboard.addKey(Phaser.KeyCode.U);
        this.keyO = this.game.input.keyboard.addKey(Phaser.KeyCode.O);
        this.keyJ = this.game.input.keyboard.addKey(Phaser.KeyCode.J);
        this.keyK = this.game.input.keyboard.addKey(Phaser.KeyCode.K);
        this.keyL = this.game.input.keyboard.addKey(Phaser.KeyCode.L);
        
        this.keyEnter = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
                  
        this.keyD.onDown.add(this.debug, this);
        this.keyE.onDown.add(this.turnEnd, this);
        this.keyS.onDown.add(this.standardAction, this);
        this.keyM.onDown.add(this.minorAction, this);
        this.keyV.onDown.add(this.moveAction, this);
        
        this.keyEnter.onDown.add(this.confirm, this);
        
            
    },
    
    //varous testing things
    debug: function () {
        
              
        console.log(this.adjacentAllies(this.currentPlayer));
        //var power = this.powers.rangedBasic.function;
        //this.meleeBasic(this.currentPlayer, this.monster2);
        //power.call(this, this.currentPlayer, this.monster2);
        //var test = _.pick(weapons)
        //var target = this.target(this.currentPlayer, 'ranged');
        //console.log(this.currentPlayer.sheet.metadata.lastaction.target);

    },
    
    //destroys a sprite and removes it from initiative, player list, and appropriate team
    removePlayer: function (player) {
        player.destroy();
        _.pull(this.initOrder, player);
        _.pull(this.players, player);
        
        if (this.entityType(player) === "hero") {
            _.pull(this.heroes, player);
        } else if (this.entityType(player) === "monster") {
            _.pull(this.monsters, player);
        }
        
        this.switchPlayer();
    },
    
    //returns the attack modifier based on calculated cover
    coverBonus: function (attacker, defender) {
        var playerPoint = this.getPoint(attacker),
            enemyPoint = this.getPoint(defender),
            corner = [],
            total = [],
            bestshots = [],
            countedBlocks = [],
            cornerList = [],
            blocked = 0,
            blocksOnBestCorner = 0,
            lineOfSight = false,
            edgeCase = false,
            i = 0,
            j = 0,
            k = 0,
            m = 0;
        
        //calculate 16 lines: from every corner to every corner
        //coverLine returns the number of barriers the line hits
        for (j = 1; j <= 4; j += 1) {
            for (i = 1; i <= 4; i += 1) {
                blocked = this.coverLine(attacker, defender, j, i);
                corner.push(blocked);
            }
        }
        
        //turn edgeCase on if able to shoot through walls due to 1px gaps between squares
        if (playerPoint.x === enemyPoint.x || playerPoint.y === enemyPoint.y) {
            //edgeCase = true;
            //console.log("literally an edge case");
        }
        
        //must be at least one 0 for line of sight, i.e. one line has to make it without being blocked
        if (_.indexOf(corner, 0) === -1) {
            return -99;
        }
        
        //group the array back into chunks representing the four corners
        total = _.chunk(corner, 4);
                
        //remove every corner with all lines blocked (no zeroes)
        for (i = 0; i < total.length; i += 1) {
            if (_.includes(total[i], 0) === true) {
                bestshots.push(total[i]);
            }
        }        
        
        //find the best corner (most unblocked lines)
        for (k = 0; k < bestshots.length; k += 1) { 
            var counts = {};
            bestshots[k].forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
            countedBlocks.push(counts);
        }        
        
        //count number of open lines per corner per thecompendium rules on p.219
        //1 or 2 blocked lines = partial cover. 3 or 4 while still having line of sight = superior cover
        for (m = 0; m < countedBlocks.length; m += 1) {
            cornerList.push(countedBlocks[m]["0"]);
        }
        
        //this old thing
        function sortNumber(a,b) {
            return b - a;
        }
        
        //sort from most open lines per corner to least so we can grab array index 0 (best)
        cornerList.sort(sortNumber);
        
        //find number of blocked lines on the best possible corner
        blocksOnBestCorner = 4 - cornerList[0];
        
        //find attack modifier based on number of blocked lines. -99 is a blocked shot
        switch (blocksOnBestCorner) {
            case 0:
                //no cover
                return 0;
            case 1:
                if (edgeCase === true) {
                    return -99;
                } else {
                    //partial cover
                    return -2; 
                }                
                break;
            case 2:
                if (edgeCase === true) {
                    return -99;
                } else {
                    //patial cover
                    return -2;  
                }                
                break;                
            case 3:
                //superior cover
                return -5; 
                break;
            case 4:
                //superior cover
                return -5;
                break;
            default:
                return -99;
                break;
        }
        
    },
    
    //returns the number of barriers between an attacker corner and a defender corner
    coverLine: function (attacker, defender, attackCorner, defendCorner) {
        var attackPoint = this.getPoint(attacker),
            defendPoint = this.getPoint(defender),
            barrierPoints = this.blockedPoints(attacker),
            line = {},
            tiles = [],
            tileX = 0,
            tileY = 0,
            blockPoint = {},
            intersect = [],
            enemyPointList = [],
            tilePoints = [],
            j = 0,
            ax = 0,
            ay = 0,
            dx = 0,
            dy = 0;
        
        //modifier for Phaser.Line(x,y) based on corner number
        // algebraic quadrant numbers, i.e. upper right corner is number 1
        switch (attackCorner) {
            case 1:
                ax = 76;
                ay = 0;
                break;
            case 2:
                ax = 0;
                ay = 0;
                break;
            case 3:
                ax = 0;
                ay = 76;
                break;
            case 4:
                ax = 76;
                ay = 76;
                break;
        }
            
        switch (defendCorner) {
            case 1:
                dx = 76;
                dy = 0;
                break;
            case 2:
                dx = 0;
                dy = 0;
                break;
            case 3:
                dx = 0;
                dy = 76;
                break;
            case 4:
                dx = 76;
                dy = 76;
                break;
        }
        
        //draws the line and gets all the tiles it crosses over
        line = new Phaser.Line(attacker.x + ax, attacker.y + ay, defender.x + dx, defender.y + dy);
        tiles = this.backgroundlayer.getRayCastTiles(line);
        
        //convert array of tiles into array of points
        for (j = 0; j < tiles.length; j += 1) {
            tileX = tiles[j].x;
            tileY = tiles[j].y;            
            blockPoint = new Phaser.Point(tileX, tileY);
            tilePoints.push(blockPoint);
        }
        
        //add the defender point to an array for lodash 
        enemyPointList.push(defendPoint);
        //find all the tile points that have blocks in them
        intersect = _.intersectionWith(barrierPoints, tilePoints, _.isEqual);
        //remove defender from list as it is the target, not a barrier
        intersect = _.differenceWith(intersect, enemyPointList, _.isEqual);
        
        return intersect.length;
            
    },
    
    //returns an array of points of all blocked squares on map for given player
    blockedPoints: function (player) {
        var blocks = this.blocks.children,
            enemies = [],
            tilePoints = [],
            blockPoint = {},
            i = 0;
        
        if (this.entityType(player) === "hero") {
            enemies = this.monsters;
        } else {
            enemies = this.heroes;
        }
        
        //get a list of all possible barriers. merge items and enemies
        barriers = [blocks, enemies].reduce(function (a, b) {
            return a.concat(b);
        });
        
        for (i = 0; i < barriers.length; i += 1) {
            blockPoint = this.getPoint(barriers[i]);
            tilePoints.push(blockPoint);
        }
        
        return tilePoints;
    },
    
    //handles the start of a turn
    turnStart: function () {
        var text = {},
            style = {},
            message = '';
        
        //reset actions
        this.currentPlayer.sheet.metadata.actions = [[1,1,1],[1,0,2],[0,2,1],[0,1,2],[0,0,3]];
        //reset movement
        this.currentPlayer.sheet.metadata.movement = this.currentPlayer.sheet.speed;
        
        //display screen text for 4 seconds announcing current player's turn
        message = this.currentPlayer.key + "'s turn!";       
        style = { font: "bold 24px Arial", fill: "#fffdbb", boundsAlignH: "left", boundsAlignV: "top", stroke: "#000", strokeThickness: 3 };        
        text = this.game.add.text(0, 0, message, style);        
        text.anchor.setTo(0.5, 0.5);        
        text.setTextBounds(this.currentPlayer.x + 37, this.currentPlayer.y - 10, 300, 100);
        this.game.time.events.add(Phaser.Timer.SECOND * 4, textDestroy, this);
        
        function textDestroy () {
            text.destroy();
        }
    },
    
    //handles end of turn and disabling movement controls
    turnEnd: function () {
        var i = 0,
            j = 0,
            action = {},
            round = {},
            delayList = [];
            
        this.keyLeft.onDown.remove(this.move, this, 0, 'player');
        this.keyRight.onDown.remove(this.move, this, 0, 'player');
        this.keyUp.onDown.remove(this.move, this, 0, 'player');
        this.keyDown.onDown.remove(this.move, this, 0, 'player');
        this.keyEight.onDown.remove(this.move, this, 0, 'player');
        this.keySeven.onDown.remove(this.move, this, 0, 'player');
        this.keyFour.onDown.remove(this.move, this, 0, 'player');
        this.keyOne.onDown.remove(this.move, this, 0, 'player');
        this.keyTwo.onDown.remove(this.move, this, 0, 'player');
        this.keyThree.onDown.remove(this.move, this, 0, 'player');
        this.keySix.onDown.remove(this.move, this, 0, 'player');
        this.keyNine.onDown.remove(this.move, this, 0, 'player');
        this.keyFive.onDown.remove(this.move, this, 0, 'player');
        this.keyU.onDown.remove(this.move, this, 0, 'player');
        this.keyO.onDown.remove(this.move, this, 0, 'player');
        this.keyJ.onDown.remove(this.move, this, 0, 'player');
        this.keyK.onDown.remove(this.move, this, 0, 'player');
        this.keyL.onDown.remove(this.move, this, 0, 'player');
        this.keyS.onDown.add(this.standardAction, this);
        this.keyM.onDown.add(this.minorAction, this);
        this.keyV.onDown.add(this.moveAction, this);
        
        //deselect all players, removing red tint
        for (i = 0; i < this.players.length; i += 1) {
            this.players[i].tint = 0xFFFFFF;
        }       
        
        //a list of all the delayed methods that run on specific rounds determined by the power
        delayList = this.currentPlayer.sheet.metadata.endOfTurn;
        
        //check each delay object in list. If it's the current round, execute the action 
        if (delayList.length > 0) {
            for (j = 0; j < delayList.length; j += 1) {
                round = delayList[j].round;                
                if (round === this.round) {
                    action = delayList[j].method;
                    //execute the method in this context
                    action.call(this);                    
                } else if (round < this.round) {
                    //remove the method from the endOfTurn list
                    _.pull(delayList, delayList[j]);
                    j -= 1;
                }
            }
        }
        
        this.switchPlayer();
    },
    
    //handles start of round
    roundStart: function () {
        var lastRound = 0,
            camX = 0,
            camY = 0,
            text = '';
        
        this.round += 1;
        if (this.round !== 1) {
            lastRound = this.round - 1;            
        }       
        
        //update camera to make sure current player is focused on for text alignment
        this.game.camera.focusOn(this.currentPlayer);
        
        //display round number message
        message = "ROUND " + this.round;       
        style = { font: "bold 48px Arial", fill: "#ff0000", boundsAlignH: "center", boundsAlignV: "middle", stroke: "#000", strokeThickness: 4 };
        camX = (this.game.camera.width / 2) + this.game.camera.view.x;
        camY = (this.game.camera.height / 2) + this.game.camera.view.y;
        text = this.game.add.text(camX, camY, message, style);
        text.anchor.setTo(0.5, 0.5);

        this.game.time.events.add(Phaser.Timer.SECOND * 3, textDestroy, this);
        
        function textDestroy () {
            text.destroy();
        }
        
        console.log("It is now Round " + this.round);
    },
    
    //handles taking standard action
    standardAction: function () {
        var attack = 0,
            name = {},
            powerList = [],
            i = 0,
            output = '',
            selection = '',
            power = {},
            weapon = this.currentPlayer.sheet.slots.mainhand;             
        
        //get all the names of the powers in the standard action list
        names = _.mapValues(this.standard, 'name');
        _.forOwn(names, function(value, key) {
          powerList.push(value);
        });
        
        //build the display list of standard action power names
        for (i = 0; i < powerList.length; i += 1) {
            output += i+')'+powerList[i]+'\n';
        };
        
        //uses prompt for now
        attack = prompt("Choose an action:\n"+output);
        selection = powerList[attack];
        //get the power of the selected power name
        power = _.filter(this.standard, {'name': selection});
        //weapon.category[1] === power[0].type
        
        //use the action and update character sheet with last action. make sure attack and weapon 
        if (attack != null) {
            if (this.useAction(this.currentPlayer, "standard") === true) {
                console.log(this.currentPlayer.key + " using a standard action");
                this.currentPlayer.sheet.metadata.lastaction.power = power[0];
                
                //only use attack method if the power is an attack
                if (power[0].type === 'melee' || power[0].type === 'ranged') {
                    this.attack();
                }                
                
            } else {
                console.log("No standard actions available");
            }
        } else {
            console.log("Attack type not available");
        }
    },
    
    //handles taking minor action
    minorAction: function () {
        if (this.useAction(this.currentPlayer, "minor") === true) {
            console.log(this.currentPlayer.key + " using a minor action");
        } else {
            console.log("Choose another action");
        }
    },
    
    //handles move action and turning on movement keys
    moveAction: function () {
        if (this.useAction(this.currentPlayer, "move") === true) {
            console.log(this.currentPlayer.key + " using a move action");
            this.currentPlayer.sheet.metadata.movement = this.currentPlayer.sheet.speed;
            this.keyLeft.onDown.add(this.move, this, 0, 'player');
            this.keyRight.onDown.add(this.move, this, 0, 'player');
            this.keyUp.onDown.add(this.move, this, 0, 'player');
            this.keyDown.onDown.add(this.move, this, 0, 'player');

            this.keyEight.onDown.add(this.move, this, 0, 'player');
            this.keySeven.onDown.add(this.move, this, 0, 'player');
            this.keyFour.onDown.add(this.move, this, 0, 'player');
            this.keyOne.onDown.add(this.move, this, 0, 'player');
            this.keyTwo.onDown.add(this.move, this, 0, 'player');
            this.keyThree.onDown.add(this.move, this, 0, 'player');
            this.keySix.onDown.add(this.move, this, 0, 'player');
            this.keyNine.onDown.add(this.move, this, 0, 'player');
            this.keyFive.onDown.add(this.move, this, 0, 'player');

            this.keyU.onDown.add(this.move, this, 0, 'player');
            this.keyO.onDown.add(this.move, this, 0, 'player');
            this.keyJ.onDown.add(this.move, this, 0, 'player');
            this.keyK.onDown.add(this.move, this, 0, 'player');
            this.keyL.onDown.add(this.move, this, 0, 'player');
        } else {
            console.log("Choose another action");
        }
        //this.move();
    },    

    //uses a player's standard, move, or minor action slot if available
    useAction: function (player, action) {
        
        var actions = player.sheet.metadata.actions,
            nextset = [],
            i = 0,  //action set loop
            j = 0,  //action type loop
            s = 0,  //standard action index
            x = 1,  //move action index
            m = 2,  //minor action index
            c = '';
        
        if (action === 'move') {
            c = x;
        } else if (action === 'standard') {
            c = s;
        } else {
            c = m;
        }
        
        //loops through an encoded array based on p.198 options of compendium
        //each array element is the number of actions allowed per type
        //[[1,1,1],[1,0,2],[0,2,1],[0,1,2],[0,0,3]]
        //if action is >0, take it and subtract 1 until they are gone
        //store in player's metadata
        for (i = 0; i < actions.length; i++) {
            for (j = 0; j < actions[i].length; j++) {
                if (actions[i][c] > 0) { 
                    actions[i][c] -= 1;
                    nextset.push(actions[i]);
                    player.sheet.metadata.actions = nextset;
                    break;
                } else {
                    break;
                }
            }
        }        
                
        if (nextset.length > 0) {
                return true;
        } else {
                return false;
        }
    },
    
    //processes power selection and target based on metadata.lastaction
    confirm: function () {
        var power = this.currentPlayer.sheet.metadata.lastaction.power,
            target = this.currentPlayer.sheet.metadata.lastaction.target;
        
        if (_.isEmpty(power) === false) {
            //reset the lastaction to empty
            this.currentPlayer.sheet.metadata.lastaction.power = {};
            this.currentPlayer.sheet.metadata.lastaction.target = {};
            this.keyT.onDown.remove(this.target, this);
            //deselect all players, removing red tint
            for (i = 0; i <this.players.length; i += 1) {
                this.players[i].tint = 0xFFFFFF;
            }
            //calls the power
            power.method.call(this, this.currentPlayer, target);            
        } else {
            console.log("No action available");
        }
        
        
    },
    
    //cycles through either ranged or melee enemies, highlighting red
    target: function () {
        var attacker = this.currentPlayer,
            attackType = attacker.sheet.metadata.lastaction.power.type,
            attackerPoint = this.getPoint(attacker),            
            enemies = [],
            selectedEnemy = 0,
            enemy,
            keyEnter = {};
      
        //gets the appropriate group
        if (attackType === 'ranged') {
            enemies = this.rangedEnemies(attacker);
        } else {
            enemies = this.adjacentEnemies(attacker, attacker.reach);
        }
        
        if (enemies.length > 0) {
            //finds if there's already a selected (red) sprite. 16711680 is decimal for red
            for (i = 0; i < enemies.length; i += 1) {
                if (enemies[i].tint === 16711680) {
                    selectedEnemy = i;
                } 
            }
            
            //if no previously selected, make first enemy selected, otherwise select next enemy in list
            if (selectedEnemy === enemies.length - 1) {
                j = 0;
            } else {
                j = selectedEnemy + 1;
            }
            
            //make previously selected not-red and current one red
            enemies[selectedEnemy].tint = 0xFFFFFF;        
            enemies[j].tint = 0xff0000;
            //update character sheet with selected enemy to target
            this.currentPlayer.sheet.metadata.lastaction.target = enemies[j];
            return enemies[j];
        } else {
            console.log("No valid targets");
        }
        
        
        
    },
    
    //finds all enemies in range of currently equipped weapon
    rangedEnemies: function (player) {
         //player = this.currentPlayer; //debug mode
        var rangedList = [],
            playerPoint = this.getPoint(player),
            enemyPoint = {},
            i = 0,
            weapon = player.sheet.slots.mainhand,
            longRange = _.floor(weapon.range[1] / 5);
        
        if (_.isArray(weapon.range) === true) {
            //loops through opposite team and finds enemies in range with equipped weapon
            if (this.entityType(player) === 'hero') {
                for (i = 0; i < this.monsters.length; i += 1) {
                    enemyPoint = this.getPoint(this.monsters[i]);
                    if (playerPoint.distance(enemyPoint, true) <= longRange) {
                        rangedList.push(this.monsters[i]);
                    }
                }
            } else {
                for (i = 0; i < this.heroes.length; i += 1) {
                    enemyPoint = this.getPoint(this.heroes[i]);
                    if (playerPoint.distance(enemyPoint, true) <= longRange) {
                        rangedList.push(this.heroes[i]);
                    }
                }
            }
        } 
        return rangedList;
    },

    //processes an attack
    attack: function () {
   
        this.keyT = this.game.input.keyboard.addKey(Phaser.KeyCode.T);
        this.keyT.onDown.add(this.target, this);       
        this.target();
        
    },
    
    //returns an array of all enemies the player is flanking
    flankedEnemies: function (player) {
        //player = this.currentPlayer; //debug mode
        var flankedList = [],
            enemyPoint = {},
            flankPoint = {},
            allyPoint = {},
            playerPoint = this.getPoint(player),
            adjacentList = this.adjacentEnemies(player, player.sheet.reach),
            i = 0,
            j = 0,
            k = 0,
            dx = 0,
            dy = 0;
        
        //checks the point just ahead of adjacent enemies to see if ally is there
        for (i = 0; i < adjacentList.length; i += 1) {
            enemyPoint = this.getPoint(adjacentList[i]);
            dx = (enemyPoint.x - playerPoint.x) + enemyPoint.x;
            dy = (enemyPoint.y - playerPoint.y) + enemyPoint.y;
            flankPoint = new Phaser.Point(dx, dy);
            
            if (this.entityType(player) === 'hero') {
                for (j = 0; j < this.heroes.length; j += 1) {
                    allyPoint = this.getPoint(this.heroes[j]);
                    if (allyPoint.equals(flankPoint)) {
                        console.log("flanking " + adjacentList[i].key);
                        flankedList.push(adjacentList[i]);
                    }
                }
            } else {
                for (k = 0; k < this.monsters.length; k += 1) {
                    allyPoint = this.getPoint(this.monsters[k]);
                    if (allyPoint.equals(flankPoint)) {
                        console.log("flanking " + adjacentList[i].key);
                        flankedList.push(adjacentList[i]);
                    }
                }
            }
        }
        return flankedList;
    },
    
    //returns an array of all blocked squares adjacent to the player
    blockedSquares: function (player) {
        var adjacentList = [],
            items = this.blocks.children,
            enemies = this.adjacentEnemies(player),
            barriers = [],
            playerPoint = this.getPoint(player),
            itemPoint = {},
            i = 0;
        
        //get a list of all possible barriers. merge items and enemies
        barriers = _.concat(items, enemies);
        
        //find only the squares that are adjacent and blocked
        for (i = 0; i < barriers.length; i += 1) {
            itemPoint = this.getPoint(barriers[i]);
            if (playerPoint.distance(itemPoint, true) === 1) {
                adjacentList.push(itemPoint);
            }
        }
        return adjacentList;
    },
    
    //finds all enemies adjacent to a player 
    adjacentEnemies: function (player, reach) {
        //player = this.currentPlayer; //debug mode
        var adjacentList = [],
            playerPoint = this.getPoint(player),
            enemyPoint = {},
            i = 0;
        
        if (reach === undefined) {
            reach = 1;
        }
                
        //loops through opposite team and finds each with a distance of 1 from player, aka 'adjacent'
        if (this.entityType(player) === 'hero') {
            for (i = 0; i < this.monsters.length; i += 1) {
                enemyPoint = this.getPoint(this.monsters[i]);
                if (playerPoint.distance(enemyPoint, true) === reach) {
                    adjacentList.push(this.monsters[i]);
                }
            }
        } else {
            for (i = 0; i < this.heroes.length; i += 1) {
                enemyPoint = this.getPoint(this.heroes[i]);
                if (playerPoint.distance(enemyPoint, true) === reach) {
                    adjacentList.push(this.heroes[i]);
                }
            }
        }
        return adjacentList;
    },
    
    //finds all allies adjacent to the player
    adjacentAllies: function (player) {
        var adjacentList = [],
            playerPoint = this.getPoint(player),
            allyPoint = {},
            i = 0;
        
        if (this.entityType(player) === 'hero') {
            for (i = 0; i < this.heroes.length; i += 1) {
                allyPoint = this.getPoint(this.heroes[i]);
                if (playerPoint.distance(allyPoint, true) === 1) {
                    adjacentList.push(this.heroes[i]);
                }
            }
        } else {
            for (i = 0; i < this.monsters.length; i += 1) {
                allyPoint = this.getPoint(this.monsters[i]);
                if (playerPoint.distance(allyPoint, true) === 1) {
                    adjacentList.push(this.monsters[i]);
                }
            }
        }
        return adjacentList;
    },
    
    //type checker for entities. returns either hero, monster, or item
    entityType: function (entity) {
        //entity = this.currentPlayer; //debug mode
        var index = this.players.indexOf(entity),
            entityType = '';
        
        if (index !== -1) {
            if (this.heroes.indexOf(entity) !== -1) {
                entityType = 'hero';
            } else {
                entityType = 'monster';
            }
        } else {
            entityType = 'item';
        }
        return entityType;
    },
    
    //adds a player to a sorted initiative list
    initManager: function (player, roll) {
        var position = 0;
        //need two lists, the rolls, and the names
        this.initRolls.push(roll);
        //sort numbers
        function sortNumber(a, b) {
            return b - a;
        }
        this.initRolls.sort(sortNumber);
        //find the position to use
        position = this.initRolls.indexOf(roll);
        this.initOrder.splice(position, 0, player);
    },
    
    //returns the point of a specific entity
    getPoint: function (entity) {
        var tx = this.game.math.snapToFloor(entity.x, this.map.tileWidth) / this.map.tileWidth,
            ty = this.game.math.snapToFloor(entity.y, this.map.tileWidth) / this.map.tileWidth,
            point = new Phaser.Point(tx, ty);
        return point;
    },
    
    //returns a point a specific number of squares in a direction from a starting point
    lookAhead: function (start, direction, squares) {
        var cx = start.x,
            cy = start.y,
            tx = 0,
            ty = 0,
            point = {};
        
        switch (direction) {
        case 'N':
            tx = cx;
            ty = cy - squares;
            point = new Phaser.Point(tx, ty);
            return point;
        case 'E':
            tx = cx + squares;
            ty = cy;
            point = new Phaser.Point(tx, ty);
            return point;
        case 'W':
            tx = cx - squares;
            ty = cy;
            point = new Phaser.Point(tx, ty);
            return point;
        case 'S':
            tx = cx;
            ty = cy + squares;
            point = new Phaser.Point(tx, ty);
            return point;
        case 'NW':
            ty = cy - squares;
            tx = cx - squares;
            point = new Phaser.Point(tx, ty);
            return point;
        case 'SW':
            tx = cx - squares;
            ty = cy + squares;
            point = new Phaser.Point(tx, ty);
            return point;
        case 'SE':
            tx = cx + squares;
            ty = cy + squares;
            point = new Phaser.Point(tx, ty);
            return point;
        case 'NE':
            ty = cy - squares;
            tx = cx + squares;
            point = new Phaser.Point(tx, ty);
            return point;
        }
            
    },
    
    //creates a group of sprites from the map
    createItems: function (kind, layer) {
        var result = [];
        this.blocks = this.game.add.group();
        this.blocks.enableBody = true;
        result = this.findObjectsByType(kind, this.map, layer);
        result.forEach(function (element) {
            this.createFromTiledObject(element, this.blocks);
        },  this);
    },
    
    //find objects in a Tiled layer that containt a property called "type" equal to a certain value    
    findObjectsByType: function (type, map, layer) {
        var result = [];
        map.objects[layer].forEach(function (element) {
            if (element.properties.type === type) {
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },
    
    //create a sprite from an object
    createFromTiledObject: function (element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);
        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function (key) {
            sprite[key] = element.properties[key];
        });
    },
    
    //returns a boolean of whether the sqaure ahead of the moving player is blocked
    isBlocked: function (entity, direction) {
        var playerPoint = this.getPoint(entity),
            barriers = [],
            itemsList = this.blocks.children,
            itemPoints = [],
            itemPoint = {},
            lookPoint = {},
            k = 0,
            i = 0,
            north = this.lookAhead(playerPoint, 'N', 1),
            east = this.lookAhead(playerPoint, 'E', 1),
            south = this.lookAhead(playerPoint, 'S', 1),
            west = this.lookAhead(playerPoint, 'W', 1),
            isBlocked;

        //looks in an array of points for a point object and returns true if it's there
        function include(arr, obj) {
            var contains = false;
            for (k = 0; k < arr.length; k += 1) {
                if (arr[k].equals(obj)) {
                    contains = true;
                }
            }
            return contains;
        }
        
        //get the list of items
        for (i = 0; i < itemsList.length; i += 1) {
            itemPoint = this.getPoint(itemsList[i]);
            itemPoints.push(itemPoint);
        }
                
        //get the point where the player is looking to move and all blocked adjacent points        
        barriers = this.blockedSquares(entity);
        lookPoint = this.lookAhead(playerPoint, direction, 1);
        
        //if bounding squares are present, add the diagonal square ahead to the barrier list
        switch (direction) {
        case 'NW':
            if (include(itemPoints, north) || include(itemPoints, west)) {
                barriers.push(lookPoint);
            }
            break;
        case 'SW':
            if (include(itemPoints, south) || include(itemPoints, west)) {
                barriers.push(lookPoint);
            }
            break;
        case 'SE':
            if (include(itemPoints, south) || include(itemPoints, east)) {
                barriers.push(lookPoint);
            }
            break;
        case 'NE':
            if (include(itemPoints, north) || include(itemPoints, east)) {
                barriers.push(lookPoint);
            }
            break;
        }
        
        isBlocked = include(barriers, lookPoint);
        return isBlocked;
        
    },
    
    //returns a standard direction (N,E,S,W,NE,NW,SE,SW) given various keycodes
    changeKeyCode: function (keycode) {
        var direction = '';
        /*
        U+0038  8
        U+0037  7
        U+0034  4
        U+0031  1
        U+0032  2
        U+0033  3
        U+0036  6
        U+0039  9
        U+0035  5
        U+0055  u
        U+004F  o
        U+004A  j
        U+004B  k
        U+004C  l
        */
        if (keycode === 'U+0038' || keycode === 'Up') {
            direction = "N";
        } else if (keycode === 'U+0037') {
            direction = 'NW';
        } else if (keycode === 'U+0034' || keycode === 'Left' || keycode === 'U+0055') {
            direction = 'W';
        } else if (keycode === 'U+0031' || keycode === 'U+004A') {
            direction = 'SW';
        } else if (keycode === 'U+0032' || keycode === 'Down' || keycode === 'U+004B') {
            direction = 'S';
        } else if (keycode === 'U+0033' || keycode === 'U+004C') {
            direction = 'SE';
        } else if (keycode === 'U+0036' || keycode === 'Right' || keycode === 'U+004F') {
            direction = 'E';
        } else if (keycode === 'U+0039') {
            direction = 'NE';
        }
        
        return direction;
    },
    
    //moves a sprite one square in a given direction while ignoring blocked squares
    move: function (context, type, direction) {        
        var entity = {},
            moveType = '',
            keycode = '';
        
        //use 'player' when adding the listener, otherwise the sprite object to move without input
        if (type === 'player') {
            //handle a player pressing a key
            entity = this.currentPlayer;            
            if (direction === undefined) {
                keycode = context.event.keyIdentifier;
                direction = this.changeKeyCode(keycode);
            }
        } else {
            entity = type;
        }

        if (!this.isBlocked(entity, direction) && entity.sheet.metadata.movement > 0) {
            //player can avoid attack of opportunity by shifting through squares
            if (context.shiftKey === true) {
                moveType = "shifts";
            } else {
                moveType = "moves";
                //all adjacent enemies get an attack of opportunity
                if (type === 'player') {
                    entity.sheet.metadata.movement -= 1;
                    this.opportunityAttack(entity);
                }
            }
            
            switch (direction) {
            case 'W':
                entity.x -= this.map.tileWidth;
                console.log(entity.key + " " + moveType + " west");
                //this.flankedEnemies(entity);
                break;
            case 'E':
                entity.x += this.map.tileWidth;
                console.log(entity.key + " " + moveType + " east");
                //this.flankedEnemies(entity);
                break;
            case 'N':
                entity.y -= this.map.tileWidth;
                console.log(entity.key + " " + moveType + " north");
                //this.flankedEnemies(entity);
                break;
            case 'S':
                entity.y += this.map.tileWidth;
                console.log(entity.key + " " + moveType + " south");
                //this.flankedEnemies(entity);
                break;
            case 'NW':
                entity.x -= this.map.tileWidth;
                entity.y -= this.map.tileWidth;
                console.log(entity.key + " " + moveType + " northwest");
                //this.flankedEnemies(entity);
                break;
            case 'SW':
                entity.x -= this.map.tileWidth;
                entity.y += this.map.tileWidth;
                console.log(entity.key + " " + moveType + " southwest");
                //this.flankedEnemies(entity);
                break;
            case 'SE':
                entity.x += this.map.tileWidth;
                entity.y += this.map.tileWidth;
                console.log(entity.key + " " + moveType + " southeast");
                //this.flankedEnemies(entity);
                break;
            case 'NE':
                entity.x += this.map.tileWidth;
                entity.y -= this.map.tileWidth;
                console.log(entity.key + " " + moveType + " northeast");
                //this.flankedEnemies(entity);
                break;
            }
        }
    },
    
    //logs all of the players adjacent enemies who get opportunity attacks on player move
    opportunityAttack: function (defender) {
        var adjacentList = this.adjacentEnemies(defender),
            i = 0;
        
        for (i = 0; i < adjacentList.length; i += 1) {
            console.log(adjacentList[i].key + " gets an opportunity attack!");
        }
    },
        
    //switches current player to next in initiative order
    switchPlayer: function () {
        var position = this.initOrder.indexOf(this.currentPlayer),
            nextPosition = 0,
            nextPlayer = {},
            newRound = false;
        
        //loop around initiative
        if (position === this.initOrder.length - 1) {
            nextPosition = 0;
            newRound = true;
        } else {
            nextPosition = position + 1;
        }
        
        nextPlayer = this.initOrder[nextPosition];
        this.currentPlayer = nextPlayer;
        this.game.world.bringToTop(this.currentPlayer);        
        this.newTurn.dispatch();
        
        if (newRound === true) {
            this.newRound.dispatch();
        }
    },
    
    //returns the result of specified dice roll
    roll: function (dice, modifier) {
        var dice = _.split(dice, 'd'),
            amount = dice[0],
            sides = dice[1],
            high = sides * amount,
            roll = _.random(amount, high) + modifier;

        return roll;       
    },
    
    //subtracts damage from target hit points, makes bloodied and unconscious if needed
    hit: function (target, damage) {
        var bloodied = target.sheet.bloodiedval,
            absoluteHp = 0 - bloodied;
        
        target.sheet.hp -= damage;
        
        if (target.sheet.hp <= bloodied && target.sheet.hp >= 0) {
            //make bloodied
            console.log(target.key + " is bloodied");
            target.sheet.conditions.bloodied = true;
        } else if (target.sheet.hp <= 0 && target.sheet.hp >= absoluteHp) {
            //make unconscious
            console.log(target.key + " is unconscious");
            target.alpha = 0.5;
            target.sheet.conditions.unconscious = true;
        } else if (target.sheet.hp <= absoluteHp) {
            console.log(target.key + " is dead");
            this.removePlayer(target);
        }
    },
    
    //adds health to target and removes bloodied and unconscious if needed
    heal: function (target, health) {
        var bloodied = target.sheet.bloodiedval;
        
        target.sheet.hp += health;
        
        if (target.sheet.hp > bloodied) {
            target.sheet.conditions.bloodied = false;            
        } else if (target.sheet.hp > 0) {
            console.log(target.key + " is conscious");
            target.alpha = 1;
        }        
    },
    
    //computes a melee attack and modifies character sheets
    meleeBasic: function (attacker, defender) {        
        var ac = defender.sheet.defenses.ac,
            attackerPoint = this.getPoint(attacker),
            defenderPoint = this.getPoint(defender),
            weapon = attacker.sheet.slots.mainhand,
            modifier = attacker.sheet.abilities.str,
            attackRoll = 0,
            distance = attackerPoint.distance(defenderPoint, true),
            damageRoll = this.roll(weapon.damage, attacker.sheet.abilities.str),
            flankedEnemies = this.flankedEnemies(attacker);
        
        //weapon proficiency
        if (_.indexOf(attacker.sheet.weaponProf, weapon.category) !== -1) {
            modifier += weapon.prof;
        }
        
        //flanking combat advantage
        if (_.indexOf(flankedEnemies, defender) !== -1) {
            modifier += 2;
            console.log("+2 flanking bonus");
        }
        
        //half level bonus
        modifier += _.floor(attacker.sheet.level / 2);
        
        //other attack mods
        modifier += attacker.sheet.miscAttackMod;
               
        attackRoll = this.roll('1d20', modifier);
        
        //any misc damage
        damageRoll += attacker.sheet.miscDamageMod;
        
        if (distance <= attacker.sheet.reach && (_.isArray(weapon.range) === false)) {
            if (attackRoll >= ac) {
                console.log(attacker.key + " rolls a " + attackRoll + " vs. AC");
                console.log(attacker.key + " does " + damageRoll + " points of damage");
                this.hit(defender, damageRoll);
            } else {
                console.log(attacker.key + " misses!");
            }
        } else {
            console.log("Out of range or no melee weapon equipped");
        }
         
    },
    
    //computes ranged attack and modifies character sheets
    rangedBasic: function (attacker, defender) {
        var ac = defender.sheet.defenses.ac,
            attackerPoint = this.getPoint(attacker),
            defenderPoint = this.getPoint(defender),
            weapon = attacker.sheet.slots.mainhand,
            shortRange = _.floor(weapon.range[0] / 5),
            longRange = _.floor(weapon.range[1] / 5),
            modifier = attacker.sheet.abilities.dex,
            attackRoll = 0,
            damageRoll = 0,
            cover = 0,
            distance = attackerPoint.distance(defenderPoint, true);
        
        //weapon proficiency
        if (_.indexOf(attacker.sheet.weaponProf, weapon.category) !== -1) {
            modifier += weapon.prof;
        }
        
        //long range
        if (distance > shortRange && distance <= longRange) {
            modifier += -2;
        }
        
        //other attack mods
        modifier += attacker.sheet.miscAttackMod;
        
        if (distance <= longRange && (_.isArray(weapon.range) === true)) {
            cover = this.coverBonus(attacker, defender);
            modifier += cover;
            attackRoll = this.roll('1d20', modifier);
            damageRoll = this.roll(weapon.damage, attacker.sheet.abilities.dex);
            damageRoll += attacker.sheet.miscDamageMod;
            
            if (attackRoll >= ac) {
                console.log(attacker.key + " rolls a " + attackRoll + " vs. AC");
                console.log(attacker.key + " does " + damageRoll + " points of damage");
                this.hit(defender, damageRoll);
            } else {
                console.log(attacker.key + " misses!");
            }
        } else {
            console.log("Out of range or no ranged weapon equipped");
        }
    },
    
    priestsShield: function (attacker, defender) {
        var nextRound = this.round + 1,
            playerDelayList = [],
            allyDelayList = [],
            playerDelay = {
                'round': nextRound,
                'method': {}
            },
            allyDelay = {
                'round': nextRound,
                'method': {}
            },
            ac = defender.sheet.defenses.ac,
            attackerPoint = this.getPoint(attacker),
            defenderPoint = this.getPoint(defender),
            weapon = attacker.sheet.slots.mainhand,
            modifier = attacker.sheet.abilities.str,
            attackRoll = 0,
            distance = attackerPoint.distance(defenderPoint, true),
            damageRoll = this.roll(weapon.damage, attacker.sheet.abilities.str),
            flankedEnemies = this.flankedEnemies(attacker),
            ally = {};
        
        //weapon proficiency
        if (_.indexOf(attacker.sheet.weaponProf, weapon.category) !== -1) {
            modifier += weapon.prof;
        }
        
        //flanking combat advantage
        if (_.indexOf(flankedEnemies, defender) !== -1) {
            modifier += 2;
            console.log("+2 flanking bonus");
        }
        
        //half level bonus
        modifier += _.floor(attacker.sheet.level / 2);
        
        //other attack mods
        modifier += attacker.sheet.miscAttackMod;
               
        attackRoll = this.roll('1d20', modifier);
        
        //any misc damage
        damageRoll += attacker.sheet.miscDamageMod;
        
        if (distance <= attacker.sheet.reach && (_.isArray(weapon.range) === false)) {
            if (attackRoll >= ac) {
                console.log(attacker.key + " rolls a " + attackRoll + " vs. AC");
                console.log(attacker.key + " does " + damageRoll + " points of damage");
                this.hit(defender, damageRoll);
            } else {
                console.log(attacker.key + " misses!");
            }
        } else {
            console.log("Out of range or no melee weapon equipped");
        }        
        
        this.currentPlayer.sheet.defenses.ac += 1;
        console.log(this.currentPlayer.key + " now has an AC of " + this.currentPlayer.sheet.defenses.ac);
        
         //functions for end of turn calculations
        function removePlayerBonus () {
            this.currentPlayer.sheet.defenses.ac -= 1;
        }
        
        playerDelay.method = removePlayerBonus;        
        playerDelayList = this.currentPlayer.sheet.metadata.endOfTurn;                
        playerDelayList.push(playerDelay);
        
        //picks the first ally in the list if it exists
        if (this.adjacentAllies(this.currentPlayer).length > 0) {
            
            ally = this.adjacentAllies(this.currentPlayer)[0];
            console.log(ally);
            ally.sheet.defenses.ac += 1;
            
            function removeAllyBonus () {
                ally.sheet.defenses.ac -= 1;
            }
            
            allyDelay.method = removeAllyBonus;             
            playerDelayList.push(allyDelay);
            
        }

    },
    
    update: function () {

        this.game.camera.follow(this.currentPlayer);

    },

};