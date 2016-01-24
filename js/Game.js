var BaseBlitz = BaseBlitz || {};

BaseBlitz.Game = function () {};

BaseBlitz.Game.prototype = {
    create: function () {
        this.map = this.game.add.tilemap('map1');
        this.map.addTilesetImage('8x3-stone', '8x3-stone');
        this.map.addTilesetImage('statue', 'statue');
                
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');
        
        this.map.setCollisionByExclusion([], true, 'blockedLayer');
        
        this.backgroundlayer.resizeWorld();
 
        //this.createItems();  
        //create player
        //var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
        this.player = this.game.add.sprite(78, 80, 'player');
        this.game.physics.arcade.enable(this.player);
        
        //the camera will follow the player in the world
        this.game.camera.follow(this.player);

        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    
    createItems: function(type) {
        //create items
        this.items = this.game.add.group();
        this.items.enableBody = true;
        var item;    
        result = this.findObjectsByType(type, this.map, 'objectsLayer');
        result.forEach(function(element){
          this.createFromTiledObject(element, this.items);
        }, this);
    },
    
    //find objects in a Tiled layer that containt a property called "type" equal to a certain value    
    findObjectsByType: function (type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function(element){
          if(element.properties.type === type) {
            //Phaser uses top left, Tiled bottom left so we have to adjust
            //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
            //so they might not be placed in the exact position as in Tiled
            element.y -= map.tileHeight;
            result.push(element);
          }      
        });
        return result;
    },    
    
    //create a sprite from an object
    createFromTiledObject: function(element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

          //copy all properties to the sprite
          Object.keys(element.properties).forEach(function(key){
            sprite[key] = element.properties[key];
          });
    },
    
    update: function() {
        
        //collision, needs to go before cursors check or only last check works
        this.game.physics.arcade.collide(this.player, this.blockedLayer);
        
        //player movement
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;

        if(this.cursors.up.isDown) {
          this.player.body.velocity.y -= 50;
        }
        else if(this.cursors.down.isDown) {
          this.player.body.velocity.y += 50;
        }
        if(this.cursors.left.isDown) {
          this.player.body.velocity.x -= 50;
        }
        else if(this.cursors.right.isDown) {
          this.player.body.velocity.x += 50;          
        }
        
        
        
        
  },
    
};