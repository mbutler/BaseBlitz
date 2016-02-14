var BaseBlitz = BaseBlitz || {};

BaseBlitz.Game = function () {};

BaseBlitz.Game.prototype = {
    
    init: function () {
        
        this.sheet = {
            defenses: {
                ac: 0,
                fort: 0,
                will: 0,
                ref: 0
            },
            abilities: {
                str: 0,
                con: 0,
                dex: 0,
                int: 0,
                wis: 0,
                cha: 0
            },
            surges: 0,
            surgevalue: 0,
            actionpoints: 1,
            initiative: 0,
            insight: 0,
            perception: 0,
            speed: 6,
            secondwind: 1,
            reach: 1,
            conditions: {
                blinded: false,
                dazed: false,
                deafened: false,
                dominated: false,
                dying: false,
                helpless: false,
                immobilized: false,
                marked: false,
                petrified: false,
                prone: false,
                restrained: false,
                slowed: false,
                stunned: false,
                surprised: false,
                unconscioius: false,
                weakened: false
            },
            slots: {
                armor: '',
                mainhand: '',
                offhand: '',
                leftring: '',
                rightring: '',
                arms: '',
                head: '',
                feet: '',
                hands: '',
                neck: '',
                waist: '',
                tattoo: '',
                kifocus: ''
            },
            skills: {
                acrobatics: 0,
                arcana: 0,
                athletics: 0,
                bluff: 0,
                diplomacy: 0,
                dungeoneering: 0,
                endurance: 0,
                heal: 0,
                history: 0,
                insight: 0,
                intimidate: 0,
                nature: 0,
                perception: 0,
                religion: 0,
                stealth: 0,
                streetwise: 0,
                thievery: 0
            },
            powers: {},
            basicattacks: {
                melee: '',
                ranged: ''
            },
            resistences: {
                acid: false,
                cold: false,
                fire: false,
                force: false,
                lightning: false,
                necrotic: false,
                poison: false,
                psychic: false,
                radiant: false,
                thunder: false
            },
            vulnerabilities: {
                acid: false,
                cold: false,
                fire: false,
                force: false,
                lightning: false,
                necrotic: false,
                poison: false,
                psychic: false,
                radiant: false,
                thunder: false
            },
            equipment: {},
            metadata: {
                movement: 0,
                actions: [[1,1,1],[1,0,2],[0,2,1],[0,1,2],[0,0,3]]
            }
        };
        
        this.initOrder = [];
        this.initRolls = [];
        this.heroes = [];
        this.monsters = [];
        this.players = [];
    
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
        
        this.newAction = new Phaser.Signal();
        this.newAction.add(this.actionPhase, this, 0);
        
        this.round = 0;
    
        //heroes
        this.hero1 = this.game.add.sprite(75 * 1 + 3, 75 * 1 + 5, 'jingleboots');
        this.hero1.sheet = this.extend(this.sheet, {});        
        this.hero2 = this.game.add.sprite(75 * 1 + 3, 75 * 3 + 5, 'rattlesocks');
        this.hero2.sheet = this.extend(this.sheet, {});
        this.hero3 = this.game.add.sprite(75 * 2 + 3, 75 * 2  + 5, 'scoopercram');
        this.hero3.sheet = this.extend(this.sheet, {});
        this.hero4 = this.game.add.sprite(75 * 3 + 3, 75 * 3 + 5, 'jumperstomp');
        this.hero4.sheet = this.extend(this.sheet, {});
        this.heroes = [this.hero1, this.hero2, this.hero3, this.hero4];
        
        //monsters
        this.monster1 = this.game.add.sprite(75 * 6 + 3, 75 * 9 + 5, 'spider');
        this.monster1.sheet = this.extend(this.sheet, {});
        this.monster2 = this.game.add.sprite(75 * 8 + 3, 75 * 8 + 5, 'golem');
        this.monster2.sheet = this.extend(this.sheet, {});
        this.monster3 = this.game.add.sprite(75 * 9 + 3, 75 * 9 + 5, 'fungus');
        this.monster3.sheet = this.extend(this.sheet, {});
        this.monster4 = this.game.add.sprite(75 * 6 + 3, 75 * 7 + 5, 'blindheim');
        this.monster4.sheet = this.extend(this.sheet, {});
        this.monsters = [this.monster1, this.monster2, this.monster3, this.monster4];
        
        //reduce heroes and monsters into list of all players
        this.players = [this.heroes, this.monsters].reduce(function (a, b) {
            return a.concat(b);
        });
        
        
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
              
        this.keyD.onDown.add(this.debug, this);
        this.keyE.onDown.add(this.turnEnd, this);
        this.keyS.onDown.add(this.standardAction, this);
        this.keyM.onDown.add(this.minorAction, this);
        this.keyV.onDown.add(this.moveAction, this);
        //args: (callback, context, priority, entity('player' for this.currentPlayer or object), direction)  
        
    },
    
    debug: function () {
        console.log(this.currentPlayer.sheet.metadata.actions);

    },
    
    turnStart: function () {
        this.currentPlayer.sheet.metadata.actions = [[1,1,1],[1,0,2],[0,2,1],[0,1,2],[0,0,3]];
        this.currentPlayer.sheet.metadata.movement = this.currentPlayer.sheet.speed;
        console.log("It is now " + this.currentPlayer.key + "'s turn!");
        console.log("Other creatures's special abilities that begin on " + this.currentPlayer.key + "'s turn.");
        console.log(this.currentPlayer.key + " takes any ongoing damage.");
        console.log(this.currentPlayer.key + " may use any regeneration.");
        console.log("Some effects end now.");
        console.log("++++++++++++");  
        this.newAction.dispatch();
    },
    
    turnEnd: function () {
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
        
            console.log(this.currentPlayer.key + " can make a saving throw");
            this.switchPlayer();
    },
    
    roundStart: function () {
        var lastRound = 0;
        this.round += 1;
        if (this.round !== 1) {
            lastRound = this.round - 1;
            console.log("End of round " + lastRound + " effects.");
        }
        
        console.log("It is now Round " + this.round);
    },
    
    actionPhase: function () {
        console.log("standard, minor, move for " +this.currentPlayer.key);
    },
    
    standardAction: function () {        
        if (this.useAction(this.currentPlayer, "standard") === true) {
            console.log(this.currentPlayer.key + " using a standard action");
        } else {
            console.log("Choose another action");
        }
    },
    
    minorAction: function () {
        if (this.useAction(this.currentPlayer, "minor") === true) {
            console.log(this.currentPlayer.key + " using a minor action");
        } else {
            console.log("Choose another action");
        }
    },
    
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
        
        for (i = 0; i < actions.length; i++) {
            for (j = 0; j < actions[i].length; j++) {
                if (actions[i][c] > 0) { 
                    actions[i][c] -= 1;
                    nextset.push(actions[i]);
                    this.currentPlayer.sheet.metadata.actions = nextset;
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
    
    //creates a new object from a prototype literal, taking an object as override values
    extend: function (proto, literal) {
        var result = Object.create(proto);
        Object.keys(literal).forEach(function(key) {
            result[key] = literal[key];
        });
        return result;
    },
    
    //processes an attack
    attack: function (attacker, defender, power) {
        console.log(attacker + " attacks " + defender + " with " + power);
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
            items = this.items.children,
            enemies = this.adjacentEnemies(player),
            barriers = [],
            playerPoint = this.getPoint(player),
            itemPoint = {},
            i = 0;
        
        //get a list of all possible barriers. merge items and enemies
        barriers = [items, enemies].reduce(function (a, b) {
            return a.concat(b);
        });
        
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
        this.items = this.game.add.group();
        this.items.enableBody = true;
        result = this.findObjectsByType(kind, this.map, layer);
        result.forEach(function (element) {
            this.createFromTiledObject(element, this.items);
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
            itemsList = this.items.children,
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
            keycode = '',
            adjacentList = [];
        
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
                this.flankedEnemies(entity);
                break;
            case 'E':
                entity.x += this.map.tileWidth;
                console.log(entity.key + " " + moveType + " east");
                this.flankedEnemies(entity);
                break;
            case 'N':
                entity.y -= this.map.tileWidth;
                console.log(entity.key + " " + moveType + " north");
                this.flankedEnemies(entity);
                break;
            case 'S':
                entity.y += this.map.tileWidth;
                console.log(entity.key + " " + moveType + " south");
                this.flankedEnemies(entity);
                break;
            case 'NW':
                entity.x -= this.map.tileWidth;
                entity.y -= this.map.tileWidth;
                console.log(entity.key + " " + moveType + " northwest");
                this.flankedEnemies(entity);
                break;
            case 'SW':
                entity.x -= this.map.tileWidth;
                entity.y += this.map.tileWidth;
                console.log(entity.key + " " + moveType + " southwest");
                this.flankedEnemies(entity);
                break;
            case 'SE':
                entity.x += this.map.tileWidth;
                entity.y += this.map.tileWidth;
                console.log(entity.key + " " + moveType + " southeast");
                this.flankedEnemies(entity);
                break;
            case 'NE':
                entity.x += this.map.tileWidth;
                entity.y -= this.map.tileWidth;
                console.log(entity.key + " " + moveType + " northeast");
                this.flankedEnemies(entity);
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
            nextPlayer = {};
        
        //loop around initiative
        if (position === this.initOrder.length - 1) {
            nextPosition = 0;
            this.newRound.dispatch();
        } else {
            nextPosition = position + 1;
        }
        
        nextPlayer = this.initOrder[nextPosition];
        this.currentPlayer = nextPlayer;
        this.game.world.bringToTop(this.currentPlayer);        
        this.newTurn.dispatch();
    },
    
    update: function () {

        this.game.camera.follow(this.currentPlayer);

    }
    
};