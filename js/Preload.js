var BaseBlitz = BaseBlitz || {};

BaseBlitz.Preload = function () {};

BaseBlitz.Preload.prototype = {
    preload: function () {
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        
        this.load.setPreloadSprite(this.preloadBar);
        this.load.tilemap('map1', 'floor.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('8x3-stone', '/images/8x3-stone.png');
        this.load.image('statue', 'images/statue.png');
        this.load.image('trapdoor', 'images/trapdoor.png');
        this.load.image('blackbar', 'images/blackbar.png');
        
        this.load.image('Jingleboots', 'images/jingleboots.png');
        this.load.image('Rattlesocks', 'images/rattlesocks.png');
        this.load.image('Scoopercram', 'images/scoopercram.png');
        this.load.image('Jumperstomp', 'images/jumperstomp.png');
        
        this.load.image('Spider', 'images/spider.png');
        this.load.image('Fungus', 'images/fungus.png');
        this.load.image('Golem', 'images/golem.png');
        this.load.image('Blindheim', 'images/blindheim.png');  
        
    },
    create: function () {        
        this.state.start('Game');
    }

};