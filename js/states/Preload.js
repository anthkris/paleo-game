var Paleo = Paleo || {};

Paleo.PreloadState = {
    init: function() {
        
    },
    preload: function() {
        this.load.spritesheet('player', 'assets/images/GirlDarkExample.png', 39, 39, 12, 1, 1);
        this.load.spritesheet('food', 'assets/images/FoodSpritesheet.png', 97, 93, 84, 0, 0);
        this.load.atlasJSONHash('wolf', 'assets/images/wolfsheet2.png', 'assets/images/wolfsheet2.json');
        this.load.spritesheet('audioButton', 'assets/images/audioButton.png', 100, 100, 2);
        this.load.spritesheet('retryButton', 'assets/images/blueButton.png', 200, 49, 2);
        this.load.image('Thorg', 'assets/images/Thorg.png');
        this.load.text('level1', 'assets/data/level1.json');
        this.load.image('bottomBorder', 'assets/images/transparentBorder.png');
        this.load.audio('crunch', ['assets/audio/crunch.mp3', 'assets/audio/crunch.ogg']);
        this.load.audio('wolfGrowl', ['assets/audio/wolfGrowl.mp3', 'assets/audio/wolfGrowl.ogg']);
        this.load.audio('cheeZeeCave', ['assets/audio/CheeZeeCave.mp3', 'assets/audio/CheeZeeCave.ogg']);
        this.game.load.bitmapFont('stoneAgeBlack', 'assets/fonts/stoneAgeblack.png', 'assets/fonts/stoneAgeblack.xml');
        this.game.load.bitmapFont('stoneAgeWhite', 'assets/fonts/stoneAgewhite.png', 'assets/fonts/stoneAgewhite.xml');
        
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);
    },
    create: function() {
        this.state.start('Home');
    },
    update: function() {
        
    }
};