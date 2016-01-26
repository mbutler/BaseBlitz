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
        
        this.statue = this.game.add.sprite(277, 380, 'statue');
        this.player = this.game.add.sprite(77, 80, 'player');
        this.game.physics.arcade.enable(this.player);
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        
        
        this.player.moveRight = function () {
            this.x += 75;
        };
        
        this.player.moveLeft = function () {
            this.x -= 75;
        };
        
        this.player.moveUp = function () {
            this.y -= 75;
        };
        
        this.player.moveDown = function () {
            this.y += 75;
        };
        
        
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
    createFromTiledObject: function (element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

          //copy all properties to the sprite
          Object.keys(element.properties).forEach(function(key){
            sprite[key] = element.properties[key];
          });
    },
    

    update: function() {
        
        //collision, needs to go before cursors check or only last check works
        //console.log(this.game.physics.arcade.overlap(this.player, this.blockedLayer));
        console.log(Phaser.Rectangle.intersects(this.player, this.statue));
        
        //player movement
        this.cursors.right.onDown.add(this.player.moveRight, this.player); 
        this.cursors.left.onDown.add(this.player.moveLeft, this.player);
        this.cursors.up.onDown.add(this.player.moveUp, this.player);
        this.cursors.down.onDown.add(this.player.moveDown, this.player);        
        
  },
    
};