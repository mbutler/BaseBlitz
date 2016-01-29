var BaseBlitz = BaseBlitz || {};

BaseBlitz.Game = function () {};

BaseBlitz.Game.prototype = {
    
    init: function () {
        this.lastMove = '';
        this.tx = 0;
        this.ty = 0;
    },
    
    create: function () {
        
        this.map = this.game.add.tilemap('map1');
        this.map.addTilesetImage('8x3-stone', '8x3-stone');
        this.map.addTilesetImage('statue', 'statue');        
                
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.backgroundlayer.resizeWorld();
 
        this.createItems('statueObject', 'objectsLayer');  

        this.player = this.game.add.sprite(77, 80, 'player');
        
        this.tx = this.math.snapToFloor(this.player.x, 75) / 75;
        this.ty = this.math.snapToFloor(this.player.y, 75) / 75;
        
        this.game.physics.arcade.enable(this.player);
        
        this.player.moveRight = function () {
            lastMove = 'right';            
            this.x += 75; 
            this.tx = this.game.math.snapToFloor(this.x, 75) / 75;
            this.ty = this.game.math.snapToFloor(this.y, 75) / 75;
            console.log("x:"+this.tx+", "+"y:"+this.ty);
        };
        
        this.player.moveLeft = function () {
            lastMove = 'left';
            this.x -= 75;
            this.tx = this.game.math.snapToFloor(this.x, 75) / 75;
            this.ty = this.game.math.snapToFloor(this.y, 75) / 75;
            console.log("x:"+this.tx+", "+"y:"+this.ty);
        };
        
        this.player.moveUp = function () {
            lastMove = 'up';
            this.y -= 75;
            this.tx = this.game.math.snapToFloor(this.x, 75) / 75;
            this.ty = this.game.math.snapToFloor(this.y, 75) / 75;
            console.log("x:"+this.tx+", "+"y:"+this.ty);
        };
        
        this.player.moveDown = function () {
            lastMove = 'down';
            this.y += 75;
            this.tx = this.game.math.snapToFloor(this.x, 75) / 75;
            this.ty = this.game.math.snapToFloor(this.y, 75) / 75;
            console.log("x:"+this.tx+", "+"y:"+this.ty);
        };
        
        
        //the camera will follow the player in the world
        this.game.camera.follow(this.player);

        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
                
    },
    
    createItems: function(kind, layer) {
        //create items
        this.items = this.game.add.group();
        this.items.enableBody = true;
        var item;    
        result = this.findObjectsByType(kind, this.map, layer);
        result.forEach(function(element){
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
              //console.log(sprite.type);
          });
    },
    
    itemOverlap: function(player, item) {
            //item.kill();
            this.tx = this.math.snapToFloor(this.player.x, 75) / 75;
            this.ty = this.math.snapToFloor(this.player.y, 75) / 75;
            var tile = this.map.getTile(this.tx, this.ty, this.backgroundlayer.index, true);
            console.log(tile.index);
        switch(lastMove) {
            case 'left':
                this.player.x += 75;                
                break;
            case 'right':
                this.player.x -= 75;
                break;
            case 'up':
                this.player.y += 75;
                break;
            case 'down':
                this.player.y -= 75;
                break;
        }
    },       

    update: function() {
        
        this.game.physics.arcade.overlap(this.player, this.items, this.itemOverlap, null, this);
        //collision, needs to go before cursors check or only last check works
        
        //player movement
        this.cursors.right.onDown.add(this.player.moveRight, this.player); 
        this.cursors.left.onDown.add(this.player.moveLeft, this.player);
        this.cursors.up.onDown.add(this.player.moveUp, this.player);
        this.cursors.down.onDown.add(this.player.moveDown, this.player);        
        
  },
    
};