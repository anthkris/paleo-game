var Paleo = Paleo || {};

Paleo.Food = function(game, x, y, foodArray){
    this.game = game;
    this.foodArray = foodArray;
    var frame = this.game.rnd.pick(foodArray);
    //food only array
    // [0,1,2,3,5,6,7,10,11,13,14,15,16,19,24,27,28,29,33,34,35,39,47,49,53,54,56,57,59,62,66,67,68,72,73,75,80]
    Phaser.Sprite.call(this, this.game, x, y, 'food', frame);
    this.game.physics.arcade.enable(this);
    this.scale.set(0.3);
    this.anchor.setTo(0.5);
    //this.disappear(this);

};

Paleo.Food.prototype = Object.create(Phaser.Sprite.prototype);
Paleo.Food.prototype.constructor = Paleo.Food;
Paleo.Food.prototype.disappear = function(sprite) {
    //add particle explosion
    var timerEvent = this.game.time.events.repeat(3000, this.foodArray.length, function(){
        sprite.kill();
    }, this);
};
Paleo.Food.prototype.reset = function(x, y, foodArray) {
    console.log("reset the dead");
    var frame = this.game.rnd.pick(foodArray);
    Phaser.Sprite.prototype.reset.call(this, x, y);
    this.frame = frame;
    
};