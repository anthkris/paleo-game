var Paleo = Paleo || {};

Paleo.PreloadState = {
    init: function() {
        
    },
    preload: function() {
        this.load.spritesheet('player', 'assets/images/GirlDarkExample.png', 40, 40, 12, 0, 0);
        this.load.spritesheet('food', 'assets/images/FoodSpritesheet.png', 97, 93, 84, 0, 0);
        this.load.text('level1', 'assets/data/level1.json');
    },
    create: function() {
        this.state.start('Game');
    },
    update: function() {
        
    }
};