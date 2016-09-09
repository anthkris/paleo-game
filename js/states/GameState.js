var Paleo = Paleo || {};

Paleo.GameState = {
    init: function() {
        
    },
    create: function() {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        //parse the file
        this.levelData = JSON.parse(this.game.cache.getText('level1'));
    	//Food
    	this.allFood = this.game.add.group();
    	this.allFood.scale.set(0.3);

        // Create a custom timer
        this.timer = this.game.time.create();
        
        // Create a delayed event 1m and 30s from now
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * this.levelData.duration, this.endTimer, this);
        
        // Start the timer
        this.timer.start();
         if (this.timer.running) {
             this.foodLoop = this.game.time.events.loop(Phaser.Timer.SECOND * 0.5, this.createFood, this);
         }
        
        this.player = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player');
        this.player.frame = 1;
        this.player.anchor.setTo(0.5);
        this.player.animations.add('walkFront', [0, 1, 2, 0], 10, true);
        this.player.animations.add('walkBack', [6, 7, 8, 7], 10, true);
        this.player.animations.add('walkLeft', [9, 10, 11, 10], 10, true);
        this.player.animations.add('walkRight', [3, 4, 5, 4], 10, true);
    	this.game.physics.arcade.enable(this.player);
    	this.player.body.allowGravity = false;
    	this.player.body.collideWorldBounds = true;
    },
    update: function() {
        if (this.cursors.down.isDown) {
            this.player.body.velocity.y = this.levelData.runningSpeed;
            this.player.body.velocity.x = 0;
            this.player.play('walkFront');
        } else if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -this.levelData.runningSpeed;
            this.player.body.velocity.x = 0;
            this.player.play('walkBack');
        } else if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -this.levelData.runningSpeed;
            this.player.body.velocity.y = 0;
            this.player.play('walkLeft');
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = this.levelData.runningSpeed;
            this.player.body.velocity.y = 0;
            this.player.play('walkRight');
        } else {
            this.player.animations.stop();
            this.player.frame = 1;
    	    this.player.body.velocity.y = 0;
    	    this.player.body.velocity.x = 0;
        }
    },
    endTimer: function(){
        // Stop the timer when the delayed event triggers
        console.log("Timer end");
        this.game.time.events.remove(this.foodLoop);
    },
    createFood: function(){
        var food = this.allFood.getFirstExists(false);
        if (!food) {
            food = new Paleo.Food(this.game, this);
            this.allFood.add(food);
        } else {
            // reset position
            food.reset();
        }
    },
    createPaleoFood: function(){
        
    }
};