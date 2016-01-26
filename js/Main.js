var BaseBlitz = BaseBlitz || {};

BaseBlitz.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'container');
BaseBlitz.game.state.add('Boot', BaseBlitz.Boot);
BaseBlitz.game.state.add('Preload', BaseBlitz.Preload);
BaseBlitz.game.state.add('Game', BaseBlitz.Game);

BaseBlitz.game.state.start('Boot');