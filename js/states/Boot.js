var Paleo = Paleo || {};

Paleo.BootState = {
    //initiate some game-level settings
  init: function() {
    //adapt to screen size, fit all the game
    //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#4488AA";
  },
  preload: function() {
  	this.load.image('preloadBar', 'assets/images/bar.png');
  },
  create: function() {
  	this.state.start('Preload');
  }
};
