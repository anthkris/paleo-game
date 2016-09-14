var Paleo = Paleo || {};

Paleo.Junk = function(game, x, y, junkArray){
    this.game = game;
    var frame = this.game.rnd.pick(junkArray);

    Phaser.Sprite.call(this, this.game, x, y, 'food', frame);
    this.game.physics.arcade.enable(this);
    this.scale.set(0.3);
    this.anchor.setTo(0.5);
    this.body.immovable = true;

};

Paleo.Junk.prototype = Object.create(Phaser.Sprite.prototype);
Paleo.Junk.prototype.constructor = Paleo.Junk;