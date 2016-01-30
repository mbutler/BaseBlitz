var BaseBlitz = BaseBlitz || {};

BaseBlitz.Game = function () {
    
    TILE_SIZE = 75;
    
};

BaseBlitz.Game.prototype = {
    
    init: function () {},  
    
    
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

        this.player = this.game.add.sprite(77, 80, 'player');
        this.player.map = this.map;
        this.player.lastMove = '';  
        
        this.game.physics.arcade.enable(this.player);
        this.game.camera.follow(this.player);  

        //get tile coordinates for player location
        this.player.getCoords = function () {
            var tx = this.game.math.snapToFloor(this.x, TILE_SIZE) / TILE_SIZE;
            var ty = this.game.math.snapToFloor(this.y, TILE_SIZE) / TILE_SIZE;
            var tile = this.map.getTile(tx, ty, 0, true); //layer index 0, backgroundlayer
            console.log ("x:"+tx+", "+"y:"+ty+","+" tile #"+tile.index);           
        };
        
        //direction controller//
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.player.moveRight = function () {
            this.lastMove = 'right';            
            this.x += TILE_SIZE; 
            this.getCoords();
        };
        
        this.player.moveLeft = function () {
            this.lastMove = 'left';
            this.x -= TILE_SIZE;
            this.getCoords();
        };
        
        this.player.moveUp = function () {
            this.lastMove = 'up';
            this.y -= TILE_SIZE;
            this.getCoords();
        };
        
        this.player.moveDown = function () {
            this.lastMove = 'down';
            this.y += TILE_SIZE;
            this.getCoords();
        };  
                
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
    
    update: function () {
        this.game.physics.arcade.overlap(this.player, this.items, this.itemOverlap, null, this);
        
        //player movement
        this.cursors.right.onDown.add(this.player.moveRight, this.player); 
        this.cursors.left.onDown.add(this.player.moveLeft, this.player);
        this.cursors.up.onDown.add(this.player.moveUp, this.player);
        this.cursors.down.onDown.add(this.player.moveDown, this.player);        
        
  },
    
};