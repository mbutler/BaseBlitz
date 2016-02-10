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
        this.trapdoor = this.game.add.sprite(75 * 4, 75 * 5, 'trapdoor');
        
        //heroes
        this.hero1 = this.game.add.sprite(75 * 1 + 3, 75 * 1 + 5, 'jingleboots');
        this.hero1.stats = this.stats1;
        this.hero2 = this.game.add.sprite(75 * 1 + 3, 75 * 3 + 5, 'rattlesocks');
        this.hero2.stats = this.stats2
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
        
        //enable physics for all player sprites
        this.game.physics.arcade.enable(this.heroes);
        this.game.physics.arcade.enable(this.monsters);
        
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
        this.keyD = this.game.input.keyboard.addKey(Phaser.Keyboard.D); // debug mode
        this.keyE = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.keyLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.keyUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.keyDown = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
              
        this.keyD.onDown.add(this.debug, this);
        this.keyE.onDown.add(this.switchPlayer, this);
        //args: (callback, context, priority, entity('player' for this.currentPlayer or object), direction)  
        this.keyLeft.onDown.add(this.move, this, 0, 'player');
        this.keyRight.onDown.add(this.move, this, 0, 'player');
        this.keyUp.onDown.add(this.move, this, 0, 'player');
        this.keyDown.onDown.add(this.move, this, 0, 'player');
                   
    },
    
    debug: function () {

        console.log(this.currentPlayer.stats.ac);  

    },
    
    
    flankedEnemies: function (player) {
        //player = this.currentPlayer; //debug mode
        var flankedList = [];
        var playerPoint = this.getPoint(player);
        var adjacentList = this.adjacentEnemies(player, player.stats.reach);
        var i = 0, j = 0, k = 0;
        var enemyPoint = {}, flankPoint = {}, allyPoint = {};
        var dx = 0, dy = 0;
        
        //checks the point just ahead of adjacent enemies to see if ally is there
        for (i = 0; i < adjacentList.length; i++) {
            enemyPoint = this.getPoint(adjacentList[i]);
            dx = (enemyPoint.x - playerPoint.x) + enemyPoint.x;
            dy = (enemyPoint.y - playerPoint.y) + enemyPoint.y;
            flankPoint = new Phaser.Point(dx, dy);
            
            if (this.entityType(player) === 'hero') {
                for (j = 0; j < this.heroes.length; j++) {
                    allyPoint = this.getPoint(this.heroes[j]);
                    if (allyPoint.equals(flankPoint)) {
                        console.log("flanking " + adjacentList[i].key);
                        flankedList.push(adjacentList[i]);
                    }
                }
            } else {
                for (k = 0; k < this.monsters.length; k++) {
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
    
    //finds all enemies adjacent to a player. default reach is 1 square
    adjacentEnemies: function (player, reach) {
        //player = this.currentPlayer; //debug mode
        var adjacentList = [];
        var playerPoint = this.getPoint(player);
        var enemyPoint = {};
        var i = 0;
                
        //loops through opposite team and finds each with a distance of 1 from player, aka 'adjacent'
        if (this.entityType(player) === 'hero') {
            for (i = 0; i < this.monsters.length; i++) {
                enemyPoint = this.getPoint(this.monsters[i]);                
                if (playerPoint.distance(enemyPoint, true) === reach) {
                    adjacentList.push(this.monsters[i]);                    
                }
            }            
        } else {
            for (i = 0; i < this.heroes.length; i++) {
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
        var index = this.players.indexOf(entity);
        var entityType = '';
        
        if (index != -1) {
            if (this.heroes.indexOf(entity) != -1) {
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
        var tx = this.game.math.snapToFloor(entity.x, this.map.tileWidth) / this.map.tileWidth;
        var ty = this.game.math.snapToFloor(entity.y, this.map.tileWidth) / this.map.tileWidth;
        var point = new Phaser.Point(tx, ty);       
        return point;
    },
    
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
    
    //callback from overlap function
    entityOverlap: function (player, entity) {
        if (player === this.currentPlayer) {
            console.log(entity);

            //bounces player in opposite direction, simulating blocked
            switch (player.lastMove) {
            case 'Left':
                player.x += this.map.tileWidth;                
                break;
            case 'Right':
                player.x -= this.map.tileWidth;
                break;
            case 'Up':
                player.y += this.map.tileWidth;
                break;
            case 'Down':
                player.y -= this.map.tileWidth;
                break;
            }
        }
    },
    
    //use direction param to force movement of player or other entity
    //pass in 'player' string as type to use current player
    move: function (context, type, direction) {
        var entity = {}, moveType = '', adjacentList = [];
        var i = 0;
        
        if (type === 'player') {
            //handle a player pressing a key
            entity = this.currentPlayer;
            if (direction === undefined) {
                direction = context.event.keyIdentifier;
            }
            
            //player can avoid attack of opportunity by shifting through squares
            if (context.shiftKey === true) {
                moveType = "shifts";
            } else {
                moveType = "moves";
                //all adjacent enemies get an attack of opportunity
                adjacentList = this.adjacentEnemies(entity, entity.stats.reach);                
                for (i = 0; i < adjacentList.length; i++) {
                    console.log(adjacentList[i].key + " gets an attack of opportunity!");
                }
            }
        } else {
            entity = type;
        } 
        
        entity.lastMove = direction;
        switch (direction) {
        case 'Left':            
            entity.x -= this.map.tileWidth;            
            console.log(entity.key + " " + moveType + " left");
            this.flankedEnemies(entity);
            break;
        case 'Right': 
            entity.x += this.map.tileWidth;            
            console.log(entity.key + " " + moveType + " right");
            this.flankedEnemies(entity);
            break;
        case 'Up':            
            entity.y -= this.map.tileWidth;
            console.log(entity.key + " " + moveType + " up");
            this.flankedEnemies(entity);
            break;
        case 'Down':            
            entity.y += this.map.tileWidth;
            console.log(entity.key + " " + moveType + " down");
            this.flankedEnemies(entity);
            break;
        }
    },    
        
    switchPlayer: function () {
        var position = this.initOrder.indexOf(this.currentPlayer);
        var nextPosition, nextPlayer;
        
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
                         
        this.game.physics.arcade.overlap(this.heroes, this.items, this.entityOverlap, null, this);
        this.game.physics.arcade.overlap(this.monsters, this.items, this.entityOverlap, null, this);
        
        this.game.physics.arcade.overlap(this.heroes, this.monsters, this.entityOverlap, null, this);
        this.game.physics.arcade.overlap(this.monsters, this.heroes, this.entityOverlap, null, this);

        this.game.camera.follow(this.currentPlayer);

    }
    
};