var Paleo = Paleo || {};

Paleo.Thorg = function(game, timerEvent, message, x, y, fontSize) {
    Phaser.Sprite.call(this, game);
    this.game = game;
    //this.timerEvent = timerEvent;
    this.message = message;
    //console.log(this.displayLetterByLetterText);
    this.textObject = game.add.bitmapText(x, y, 'stoneAgeWhite', "", fontSize);
    this.textObject.visible = false;
    this.textObject.fixedToCamera = true;
    Paleo.Thorg.completeText = true;
    this.displayLetterByLetterText(this.textObject, this.message, function() {
        // stuff you want to do at the end of the animation
        // eg. this.input.onDown.addOnce(this.start, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            Paleo.Thorg.completeText = true;
        	this.fadeOut(this.textObject);
        }, this);
        //console.log("text end");
    }, this);
};

Paleo.Thorg.prototype = Object.create(Phaser.Sprite.prototype);
Paleo.Thorg.prototype.constructor = Paleo.Thorg;

Paleo.Thorg.prototype.displayNextLetter = function(textObject, message, counter) {
    Paleo.Thorg.completeText = false;
	this.textObject.visible = true;
	this.textObject.text = this.message.substr(0, this.counter);
    this.counter += 1;
    if (this.counter > this.message.length){
        Paleo.Thorg.timerEvent.timer.onComplete.dispatch();
    }
};

Paleo.Thorg.prototype.displayLetterByLetterText = function (textObject, message, onCompleteCallback) {
    Paleo.Thorg.timerEvent = this.game.time.events.repeat(100, message.length, this.displayNextLetter, 
                                {textObject: textObject, message: message, counter: 1});
    Paleo.Thorg.timerEvent.timer.onComplete.addOnce(onCompleteCallback, this, 10);
};

Paleo.Thorg.prototype.fadeOut = function(sprite) {
    var tween = this.game.add.tween(sprite).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
	tween.onComplete.add(function() {
		sprite.destroy();
	}); 
};

Paleo.Thorg.prototype.gamePause = function(){
    Paleo.Thorg.timerEvent.timer.pause();
};

Paleo.Thorg.prototype.gameResume = function(){
    Paleo.Thorg.timerEvent.timer.resume();
};