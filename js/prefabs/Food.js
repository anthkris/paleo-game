var Paleo = Paleo || {};

Paleo.Food = function(game){
    this.game = game;
    var frame = this.game.rnd.between(0, 83);

    //  Just because we don't want a false chilli (frame 17)
    // if (this.frame === 17)
    // {
    //     this.frame = 1;
    // }

    var x = this.game.rnd.between(50, 600);
    var y = this.game.rnd.between(50, 450);

    Phaser.Sprite.call(this, this.game, x, y, 'food', frame);

};

Paleo.Food.prototype = Object.create(Phaser.Sprite.prototype);
Paleo.Food.prototype.constructor = Paleo.Food;