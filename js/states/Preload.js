var Paleo = Paleo || {};

Paleo.PreloadState = {
    init: function() {
        
    },
    preload: function() {
        this.load.spritesheet('player', 'assets/images/GirlDarkExample.png', 39, 39, 12, 1, 1);
        this.load.spritesheet('food', 'assets/images/FoodSpritesheet.png', 97, 93, 84, 0, 0);
        this.load.spritesheet('wolf', 'assets/images/wolfsheet2.png', 64, 31.9166667, 60, 0, 0);
        this.load.image('Thorg', 'assets/images/Thorg.png');
        this.load.text('level1', 'assets/data/level1.json');
        this.load.image('voidBG', 'assets/images/void_BG.png');
        this.load.audio('crunch', ['assets/audio/crunch.mp3', 'assets/audio/crunch.ogg']);
        this.load.audio('wolfGrowl', ['assets/audio/wolfGrowl.mp3', 'assets/audio/wolfGrowl.ogg']);
        this.game.load.bitmapFont('stoneAgeBlack', 'assets/fonts/stoneAgeblack.png', 'assets/fonts/stoneAgeblack.xml');
        this.game.load.bitmapFont('stoneAgeWhite', 'assets/fonts/stoneAgewhite.png', 'assets/fonts/stoneAgewhite.xml');
        
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