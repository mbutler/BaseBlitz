var BaseBlitz = BaseBlitz || {};

BaseBlitz.Game = function () {
    
    TILE_SIZE = 75;
    
};

BaseBlitz.Game.prototype = {
    
    init: function () {
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
        
        //heroes
        this.hero1 = this.game.add.sprite(75 * 1 + 3, 75 * 1 + 5, 'jingleboots');
        this.hero2 = this.game.add.sprite(75 * 1 + 3, 75 * 3 + 5, 'rattlesocks');
        this.hero3 = this.game.add.sprite(75 * 2 + 3, 75 * 2  + 5, 'scoopercram');
        this.hero4 = this.game.add.sprite(75 * 3 + 3, 75 * 3 + 5, 'jumperstomp');
        this.heroes = [this.hero1, this.hero2, this.hero3, this.hero4];
        
        //monsters
        this.monster1 = this.game.add.sprite(75 * 6 + 3, 75 * 9 + 5, 'spider');
        this.monster2 = this.game.add.sprite(75 * 8 + 3, 75 * 8 + 5, 'golem');
        this.monster3 = this.game.add.sprite(75 * 9 + 3, 75 * 9 + 5, 'fungus');
        this.monster4 = this.game.add.sprite(75 * 6 + 3, 75 * 7 + 5, 'blindheim');
        this.monsters = [this.monster1, this.monster2, this.monster3, this.monster4];
        
        //reduce heroes and monsters into list of all players
        this.players = [this.heroes, this.monsters].reduce(function (a, b) {
          return a.concat(b);
        });
        
        //enable physics for all player sprites
        this.game.physics.arcade.enable(this.heroes);
        this.game.physics.arcade.enable(this.monsters);
        
        //direction controller//
        this.keyD = this.game.input.keyboard.addKey(Phaser.Keyboard.D); // debug mode
        this.keyE = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.keyLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.keyUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.keyDown = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        
        this.keyD.onDown.add(this.flankedEnemies, this);
        this.keyE.onDown.add(this.switchPlayer, this);
        this.keyLeft.onDown.add(this.moveLeft, this);
        this.keyRight.onDown.add(this.moveRight, this);
        this.keyUp.onDown.add(this.moveUp, this);
        this.keyDown.onDown.add(this.moveDown, this);
        
        
        //////////////////////////MANUAL GAME SETUP/////////////////////
        this.currentPlayer = this.hero1;
        this.currentPlayer.lastMove = '';
        this.game.world.bringToTop(this.currentPlayer);
        
        this.initManager(this.hero2, Math.random); // rattlesocks
        this.initManager(this.hero3, 9); //scoopercram
        this.initManager(this.hero1, 30); // jingleboots
        this.initManager(this.hero4, 15); //jumperstomp
        
        this.initManager(this.monster2, 20); // rattlesocks
        this.initManager(this.monster3, 3); //scoopercram
        this.initManager(this.monster1, 12); // jingleboots
        this.initManager(this.monster4, 15); //jumperstomp
        ////////////////////////////////////////////////////////////////
                   
    },
    
    flankedEnemies: function (player) {
        player = this.currentPlayer; //debug mode
        var flankedList = [];
        var playerPoint = this.getPoint(player);
        var adjacentList = this.adjacentEnemies(player);
                
        for (var i = 0; i < adjacentList.length; i++) {
            var enemyPoint = this.getPoint(adjacentList[i]);
            var dx = (enemyPoint.x - playerPoint.x) + enemyPoint.x;
            var dy = (enemyPoint.y - playerPoint.y) + enemyPoint.y;
            var flankPoint = new Phaser.Point(dx, dy);
            
            if (this.entityType(player) === 'hero') {
                for (var j = 0; j < this.heroes.length; j++) {
                    var allyPoint = this.getPoint(this.heroes[j]);
                    if (allyPoint.equals(flankPoint)) {
                        console.log("flanking " + adjacentList[i].key);
                        flankedList.push(adjacentList[i]);
                    }
                }
            } else {
                for (var k = 0; k < this.monsters.length; k++) {
                    var allyPoint = this.getPoint(this.monsters[k]);
                    if (allyPoint.equals(flankPoint)) {
                        console.log("flanking " + adjacentList[i].key);
                        flankedList.push(adjacentList[i]);
                    }
                }
            }
        }
        return flankedList;
    },
    
    adjacentEnemies: function (player) {
        //player = this.currentPlayer; //debug mode
        var adjacentList = [];
        var playerPoint = this.getPoint(player);
        if (this.entityType(player) === 'hero') {
            for (var i = 0; i < this.monsters.length; i++) {
                var enemyPoint = this.getPoint(this.monsters[i]);                
                if (playerPoint.distance(enemyPoint, true) == 1) {
                    adjacentList.push(this.monsters[i]);                    
                }
            }            
        } else {
            for (var i=0; i < this.heroes.length; i++) {
                var enemyPoint = this.getPoint(this.heroes[i]);
                if (playerPoint.distance(enemyPoint, true) == 1) {
                    adjacentList.push(this.heroes[i]);                    
                }
            }
        }
        //console.log(adjacentList);
        return adjacentList;
    },
    
    entityType: function (entity) {
        //entity = this.currentPlayer; //debug mode
        var index = this.players.indexOf(entity);
        var entityType = null;
        if (index != -1) {
            if (this.heroes.indexOf(entity) != -1) {
                entityType = 'hero';
            } else {
                entityType = 'monster';
            }
        } else {
            entityType = 'item';
        }
        //console.log(objectType);
        return entityType;
    },
    
    initManager: function (player, roll) {
        //need two lists, the rolls, and the names
        this.initRolls.push(roll);
        //sort numbers
        function sortNumber(a, b) {
            return b - a;
        }
        this.initRolls.sort(sortNumber);
        //find the position to use
        var position = this.initRolls.indexOf(roll);
        this.initOrder.splice(position, 0, player);
    },
    
    getPoint: function (entity) {        
        var tx = this.game.math.snapToFloor(entity.x, TILE_SIZE) / TILE_SIZE;
        var ty = this.game.math.snapToFloor(entity.y, TILE_SIZE) / TILE_SIZE;
        var tile = this.map.getTile(tx, ty, 0, true); //layer index 0, backgroundlayer
        //console.log("x:" + tx + ", " + "y:" + ty + "," + " tile #" + tile.x);
        var point = new Phaser.Point(tx, ty);
        //console.log(point);
        return point;
    },
    
    createItems: function (kind, layer) {
        this.items = this.game.add.group();
        this.items.enableBody = true;
        var result = this.findObjectsByType(kind, this.map, layer);
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
    itemOverlap: function (player, item) {
        if (player === this.currentPlayer) {
            var tx = this.math.snapToFloor(this.currentPlayer.x, TILE_SIZE) / TILE_SIZE;
            var ty = this.math.snapToFloor(this.currentPlayer.y, TILE_SIZE) / TILE_SIZE;
            var tile = this.map.getTile(tx, ty, this.backgroundlayer.index, true);
            console.log("collision with " + item.key);

            switch (player.lastMove) {
            case 'left':
                player.x += TILE_SIZE;                
                break;
            case 'right':
                player.x -= TILE_SIZE;
                break;
            case 'up':
                player.y += TILE_SIZE;
                break;
            case 'down':
                player.y -= TILE_SIZE;
                break;
            }
        }
    },
    
    moveRight: function () {
        this.currentPlayer.lastMove = 'right';
        this.currentPlayer.x += TILE_SIZE;
        this.getPoint(this.currentPlayer);
        console.log("move: " + this.currentPlayer.key);
    },
    
    moveLeft: function () {
        this.currentPlayer.lastMove = 'left';
        this.currentPlayer.x -= TILE_SIZE;
        this.getPoint(this.currentPlayer);
        console.log("move: " + this.currentPlayer.key);
    },
    
    moveUp: function () {
        this.currentPlayer.lastMove = 'up';
        this.currentPlayer.y -= TILE_SIZE;
        this.getPoint(this.currentPlayer);
        console.log("move: " + this.currentPlayer.key);
    },
    
    moveDown: function () {
        this.currentPlayer.lastMove = 'down';
        this.currentPlayer.y += TILE_SIZE;
        this.getPoint(this.currentPlayer);
        console.log("move: " + this.currentPlayer.key);
    },
    
    switchPlayer: function () {
        var position = this.initOrder.indexOf(this.currentPlayer);
        
        //loop around initiative
        if (position === this.initOrder.length - 1) {
            var nextPosition = 0;
        } else {
            var nextPosition = position + 1;
        }
        
        var nextPlayer = this.initOrder[nextPosition];
        this.currentPlayer = nextPlayer;
        this.game.world.bringToTop(this.currentPlayer);
        console.log("It is now " + this.currentPlayer.key + "'s turn.");
    },
    
    update: function () {
                         
        this.game.physics.arcade.overlap(this.heroes, this.items, this.itemOverlap, null, this);
        this.game.physics.arcade.overlap(this.monsters, this.items, this.itemOverlap, null, this);
        
        this.game.physics.arcade.overlap(this.heroes, this.monsters, this.itemOverlap, null, this);
        this.game.physics.arcade.overlap(this.monsters, this.heroes, this.itemOverlap, null, this);

        this.game.camera.follow(this.currentPlayer);

    }
    
};