var BaseBlitz = BaseBlitz || {};

BaseBlitz.Game = function () {};

BaseBlitz.Game.prototype = {
    
    init: function () {
        this.initOrder = [];
        this.initRolls = [];
        this.heroes = [];
        this.monsters = [];
        this.players = [];
        this.stats1 = {ac: 22, fort: 13, will: 9, ref: 10, surges: 2, ap: 1, speed: 6, wind: 1, reach: 1, conditions: {}, skills: {}, powers: {}, inventory: {}};
        this.stats2 = {ac: 21, fort: 14, will: 10, ref: 10, surges: 2, ap: 1, speed: 6, wind: 1, reach: 1, conditions: {}, skills: {}, powers: {}, inventory: {}};
        this.stats3 = {ac: 20, fort: 15, will: 11, ref: 10, surges: 2, ap: 1, speed: 6, wind: 1, reach: 1, conditions: {}, skills: {}, powers: {}, inventory: {}};
        this.stats4 = {ac: 19, fort: 16, will: 12, ref: 10, surges: 2, ap: 1, speed: 6, wind: 1, reach: 1, conditions: {}, skills: {}, powers: {}, inventory: {}};
        this.stats5 = {ac: 18, fort: 15, will: 13, ref: 10, surges: 2, ap: 1, speed: 6, wind: 1, reach: 1, conditions: {}, skills: {}, powers: {}, inventory: {}};
        this.stats6 = {ac: 17, fort: 13, will: 8, ref: 10, surges: 2, ap: 1, speed: 6, wind: 1, reach: 1, conditions: {}, skills: {}, powers: {}, inventory: {}};
        this.stats7 = {ac: 16, fort: 12, will: 16, ref: 10, surges: 2, ap: 1, speed: 6, wind: 1, reach: 1, conditions: {}, skills: {}, powers: {}, inventory: {}};
        this.stats8 = {ac: 14, fort: 11, will: 13, ref: 10, surges: 2, ap: 1, speed: 6, wind: 1, reach: 1, conditions: {}, skills: {}, powers: {}, inventory: {}};
        
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
    
        //heroes
        this.hero1 = this.game.add.sprite(75 * 1 + 3, 75 * 1 + 5, 'jingleboots');
        this.hero1.stats = this.stats1;
        this.hero2 = this.game.add.sprite(75 * 1 + 3, 75 * 3 + 5, 'rattlesocks');
        this.hero2.stats = this.stats2;
        this.hero3 = this.game.add.sprite(75 * 2 + 3, 75 * 2  + 5, 'scoopercram');
        this.hero3.stats = this.stats3;
        this.hero4 = this.game.add.sprite(75 * 3 + 3, 75 * 3 + 5, 'jumperstomp');
        this.hero4.stats = this.stats4;
        this.heroes = [this.hero1, this.hero2, this.hero3, this.hero4];
        
        //monsters
        this.monster1 = this.game.add.sprite(75 * 6 + 3, 75 * 9 + 5, 'spider');
        this.monster1.stats = this.stats5;
        this.monster2 = this.game.add.sprite(75 * 8 + 3, 75 * 8 + 5, 'golem');
        this.monster2.stats = this.stats6;
        this.monster3 = this.game.add.sprite(75 * 9 + 3, 75 * 9 + 5, 'fungus');
        this.monster3.stats = this.stats7;
        this.monster4 = this.game.add.sprite(75 * 6 + 3, 75 * 7 + 5, 'blindheim');
        this.monster4.stats = this.stats8;
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
        this.currentPlayer.lastMove = '';
        this.game.world.bringToTop(this.currentPlayer);
        ////////////////////////////////////////////////////////////////
        
        //direction controller//       
        this.keyD = this.game.input.keyboard.addKey(Phaser.KeyCode.D); // debug mode
        this.keyE = this.game.input.keyboard.addKey(Phaser.KeyCode.E);
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
        this.keyE.onDown.add(this.switchPlayer, this);
        //args: (callback, context, priority, entity('player' for this.currentPlayer or object), direction)  
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
    },
    
    debug: function () {

        var barriers = this.blockedSquares(this.currentPlayer);
        console.log(barriers);

    },
    
    attack: function (a, b, c, d) {
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
        //console.log(e);
    },
    
    flankedEnemies: function (player) {
        //player = this.currentPlayer; //debug mode
        var flankedList = [],
            enemyPoint = {},
            flankPoint = {},
            allyPoint = {},
            playerPoint = this.getPoint(player),
            adjacentList = this.adjacentEnemies(player, player.stats.reach),
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
    
    //finds all enemies adjacent to a player. 
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
    
    //returns a point object of current location of any entity. x,y coordinates
    getPoint: function (entity) {
        var tx = this.game.math.snapToFloor(entity.x, this.map.tileWidth) / this.map.tileWidth,
            ty = this.game.math.snapToFloor(entity.y, this.map.tileWidth) / this.map.tileWidth,
            point = new Phaser.Point(tx, ty);
        return point;
    },
    
    //current:Point, direction:Up,Down,Right,Left, squares:number
    lookAhead: function (current, keycode, squares) {
        var cx = current.x,
            cy = current.y,
            tx = 0,
            ty = 0,
            direction = '',
            point = {};
        
        direction = this.changeKeyCode(keycode);
        
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
    
    //finds out if the sqaure ahead of the moving player is blocked
    isBlocked: function (entity, direction) {
        var playerPoint = {},
            barriers = [],
            lookPoint = {},
            k = 0,
            isBlocked;
        
        //get the point where the player is at, is looking to move, and all blocked adjacent points
        playerPoint = this.getPoint(entity);
        barriers = this.blockedSquares(entity);
        lookPoint = this.lookAhead(playerPoint, direction, 1);
        
        //looks in an array for an object and returns true if it's there
        function include(arr, obj) {
            var contains = false;
            for (k = 0; k < arr.length; k += 1) {
                if (arr[k].equals(obj)) {
                    contains = true;
                }
            }
            return contains;
        }
        
        isBlocked = include(barriers, lookPoint);
        return isBlocked;
        
    },
    
    changeKeyCode: function (key) {
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
        if (key === 'U+0038' || key === 'Up') {
            direction = "N";            
        } else if (key === 'U+0037') {
            direction = 'NW';            
        } else if (key === 'U+0034' || key === 'Left' || key === 'U+0055') {
            direction = 'W';            
        } else if (key === 'U+0031' || key === 'U+004A') {
            direction = 'SW';            
        } else if (key === 'U+0032' || key === 'Down' || key === 'U+004B') {
            direction = 'S';           
        } else if (key === 'U+0033' || key === 'U+004C') {
            direction = 'SE';            
        } else if (key === 'U+0036' || key === 'Right' || key === 'U+004F') {
            direction = 'E';            
        } else if (key === 'U+0039') {
            direction = 'NE';            
        }
        
        return direction;
    },
    
    //pass in 'player' string as type to use current player
    move: function (context, type, keycode) {
        var entity = {},
            moveType = '',
            direction = '',
            adjacentList = [],
            i = 0;
        
        if (type === 'player') {
            //handle a player pressing a key
            entity = this.currentPlayer;
            
            if (keycode === undefined) {
                keycode = context.event.keyIdentifier;
            }
        } else {
            entity = type;
        }

        if (!this.isBlocked(entity, keycode)) {
            //player can avoid attack of opportunity by shifting through squares
            if (context.shiftKey === true) {
                moveType = "shifts";
            } else {
                moveType = "moves";
                //all adjacent enemies get an attack of opportunity
                this.opportunityAttack(entity);
            }
            
            direction = this.changeKeyCode(keycode);

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
    
    opportunityAttack: function (defender) {
        var adjacentList = this.adjacentEnemies(defender);
        for (i = 0; i < adjacentList.length; i += 1) {
            console.log(adjacentList[i].key + " gets an opportunity attack!");
        }
    },
        
    switchPlayer: function () {
        var position = this.initOrder.indexOf(this.currentPlayer),
            nextPosition = 0,
            nextPlayer = {};
        
        //loop around initiative
        if (position === this.initOrder.length - 1) {
            nextPosition = 0;
        } else {
            nextPosition = position + 1;
        }
        
        nextPlayer = this.initOrder[nextPosition];
        this.currentPlayer = nextPlayer;
        this.game.world.bringToTop(this.currentPlayer);
        console.log("It is now " + this.currentPlayer.key + "'s turn.");
    },
    
    update: function () {

        this.game.camera.follow(this.currentPlayer);

    }
    
};