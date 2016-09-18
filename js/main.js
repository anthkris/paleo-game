var Paleo = Paleo || {};

Paleo.game = new Phaser.Game(600, 450, Phaser.AUTO);

Paleo.game.state.add('Boot', Paleo.BootState);
Paleo.game.state.add('Preload', Paleo.PreloadState);
Paleo.game.state.add('Home', Paleo.HomeState);
Paleo.game.state.add('Game', Paleo.GameState);
Paleo.game.state.add('GameOver', Paleo.GameOverState);

Paleo.game.state.start('Boot');