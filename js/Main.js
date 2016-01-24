var BaseBlitz = BaseBlitz || {};

BaseBlitz.game = new Phaser.Game(500, 500, Phaser.AUTO, '');
BaseBlitz.game.state.add('Boot', BaseBlitz.Boot);
BaseBlitz.game.state.add('Preload', BaseBlitz.Preload);
BaseBlitz.game.state.add('Game', BaseBlitz.Game);

BaseBlitz.game.state.start('Boot');