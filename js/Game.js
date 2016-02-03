var BaseBlitz = BaseBlitz || {};

BaseBlitz.Game = function () {
    
    TILE_SIZE = 75;
    
};

BaseBlitz.Game.prototype = {
    
    init: function () {
        this.initOrder = [];
        this.initRolls = [];
    },  
    
    
    create: function () {   
        
        //create tilemap and set up layers
        this.map = this.game.add.tilemap('map1');
        this.map.addTilesetImage('8x3-stone', '8x3-stone');
        //tileset 'statue' in Tiled
        this.map.addTilesetImage('statue', 'statue');  
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.backgroundlayer.resizeWorld();
        
        //type 'statue' in Tiled custom properties
        this.createItems('statue', 'objectsLayer');  

        this.player1 = this.game.add.sprite(75*1+3, 75*1+5, 'jingleboots');       
        this.player2 = this.game.add.sprite(75*1+3, 75*3+5, 'rattlesocks');       
        this.player3 = this.game.add.sprite(75*2+3, 75*2+5, 'scoopercram');        
        this.player4 = this.game.add.sprite(75*3+3, 75*3+5, 'jumperstomp');
        
        this.game.physics.arcade.enable([this.player1,this.player2,this.player3,this.player4]);

        this.currentPlayer = this.player1;
        this.currentPlayer.lastMove = ''; 
            
        //direction controller//
        this.keyE = this.game.input.keyboard.addKey(Phaser.Keyboard.E);         
        this.keyLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.keyUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.keyDown = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        
        this.keyE.onDown.add(this.switchPlayer, this);
        this.keyLeft.onDown.add(this.moveLeft, this);
        this.keyRight.onDown.add(this.moveRight, this);
        this.keyUp.onDown.add(this.moveUp, this);
        this.keyDown.onDown.add(this.moveDown, this); 
        
        this.initManager(this.player2, 22); // rattlesocks
        this.initManager(this.player3, 9); //scoopercram
        this.initManager(this.player1, 30); // jingleboots
        this.initManager(this.player4, 15); //jumperstomp
                   
    }, 
    
    initManager: function (creature, roll) {        
        //need two lists, the rolls, and the names
        this.initRolls.push(roll);
        //sort numbers
        function sortNumber(a,b) {
            return b - a;
        }
        this.initRolls.sort(sortNumber);
        //find the position to use
        var position = this.initRolls.indexOf(roll);
        this.initOrder.splice(position,0,creature);        
    },
    
    getCoords: function (player) {
        var tx = this.game.math.snapToFloor(player.x, TILE_SIZE) / TILE_SIZE;
        var ty = this.game.math.snapToFloor(player.y, TILE_SIZE) / TILE_SIZE;
        var tile = this.map.getTile(tx, ty, 0, true); //layer index 0, backgroundlayer
        console.log ("x:"+tx+", "+"y:"+ty+","+" tile #"+tile.index);   
    },
    
    createItems: function (kind, layer) { 
        this.items = this.game.add.group();
        this.items.enableBody = true;
        var result = this.findObjectsByType(kind, this.map, layer);
        result.forEach(function (element) {
          this.createFromTiledObject(element, this.items);
        }, this);
    },
    
    //find objects in a Tiled layer that containt a property called "type" equal to a certain value    
    findObjectsByType: function (type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function(element){
          if(element.properties.type === type) {
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
          Object.keys(element.properties).forEach(function(key){
            sprite[key] = element.properties[key];
          });
    },
    
    //callback from overlap function
    itemOverlap: function (player, item) {
        var tx = this.math.snapToFloor(player.x, TILE_SIZE) / TILE_SIZE;
        var ty = this.math.snapToFloor(player.y, TILE_SIZE) / TILE_SIZE;
        var tile = this.map.getTile(tx, ty, this.backgroundlayer.index, true);
        console.log("collision with "+item.type);
        
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
        
    },
    
    moveRight: function () {
        this.currentPlayer.lastMove = 'right';            
        this.currentPlayer.x += TILE_SIZE;
        this.getCoords(this.currentPlayer);  
        console.log("move: "+this.currentPlayer.key);
    },
    
    moveLeft: function () {
        this.currentPlayer.lastMove = 'left';
        this.currentPlayer.x -= TILE_SIZE;
        this.getCoords(this.currentPlayer);
        console.log("move: "+this.currentPlayer.key);
    },
    
    moveUp: function () {
        this.currentPlayer.lastMove = 'up';
        this.currentPlayer.y -= TILE_SIZE;
        this.getCoords(this.currentPlayer);
        console.log("move: "+this.currentPlayer.key);
    },
    
    moveDown: function () {
        this.currentPlayer.lastMove = 'down';
        this.currentPlayer.y += TILE_SIZE;
        this.getCoords(this.currentPlayer);
        console.log("move: "+this.currentPlayer.key);
    },
    
    switchPlayer: function () {
        var position = this.initOrder.indexOf(this.currentPlayer);
        
        //loop around initiative
        if (position == this.initOrder.length-1) {
            var nextPosition = 0;
        } else {
            var nextPosition = position+1;
        }
        
        var nextPlayer = this.initOrder[nextPosition];
        this.currentPlayer = nextPlayer;        
        console.log("It is now "+this.currentPlayer.key+"'s turn.");
    },
    
    update: function () {
                         
            this.game.physics.arcade.overlap(this.player1, this.items, this.itemOverlap, null, this); 
            this.game.physics.arcade.overlap(this.player2, this.items, this.itemOverlap, null, this); 
            this.game.physics.arcade.overlap(this.player3, this.items, this.itemOverlap, null, this); 
            this.game.physics.arcade.overlap(this.player4, this.items, this.itemOverlap, null, this); 
        
            this.game.camera.follow(this.currentPlayer);
    
    },
    
    
};