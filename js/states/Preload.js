var Paleo = Paleo || {};

Paleo.PreloadState = {
    init: function() {
        
    },
    preload: function() {
        this.load.spritesheet('player', 'assets/images/GirlDarkExample.png', 39, 39, 12, 1, 1);
        this.load.spritesheet('food', 'assets/images/FoodSpritesheet.png', 97, 93, 84, 0, 0);
        this.load.image('Thorg', 'assets/images/Thorg.png');
        this.load.text('level1', 'assets/data/level1.json');
        this.load.image('voidBG', 'assets/images/void_BG.png');
        this.game.load.bitmapFont('jaynkBlack', 'assets/fonts/jaynkBlack.png', 'assets/fonts/jaynkBlack.xml');
        this.game.load.bitmapFont('jaynk', 'assets/fonts/jaynkWhite.png', 'assets/fonts/jaynkWhite.xml');
        
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);
    },
    create: function() {
        this.state.start('Game');
    },
    update: function() {
        
    }
};