var Paleo = Paleo || {};

Paleo.GameState = {
    init: function() {
        
    },
    create: function() {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.background = this.game.add.tileSprite(0,0, this.game.world.width, 450, 'grass');
        
        //parse the file
        this.levelData = JSON.parse(this.game.cache.getText('level1'));
        this.foodCollected = 0;
        this.textObject = this.game.add.bitmapText(30, 30, 'jaynkBlack', 'Paleo-Perfect Food: ' + this.foodCollected, 28);
        
    	//Food
    	this.allFood = this.game.add.group();
    	
        //creation loops
        this.timerEvent;
        this.foodLoop = this.game.time.events.loop(Phaser.Timer.SECOND + Math.random(), this.createFood, this);
        this.junkLoop = this.game.time.events.loop(Phaser.Timer.SECOND + 2000 * Math.random(), this.createJunk, this);
        this.killLoop = this.game.time.events.loop(Phaser.Timer.SECOND + 5000 * Math.random(), this.killFood, this);
        
        this.player = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player');
        this.player.frame = 1;
        this.player.anchor.setTo(0.5);
        this.player.animations.add('walkFront', [0, 1, 2, 0], 10, true);
        this.player.animations.add('walkBack', [6, 7, 8, 7], 10, true);
        this.player.animations.add('walkLeft', [9, 10, 11, 10], 10, true);
        this.player.animations.add('walkRight', [3, 4, 5, 4], 10, true);
    	this.game.physics.arcade.enable(this.player);
    	//this.player.body.allowGravity = false;
    	this.player.body.collideWorldBounds = true;
    	this.player.body.setSize(25, 35);
    	this.player.body.offset.setTo(7, 5);
    	
    	this.thorg = this.add.sprite(30, this.game.world.height - 70, 'Thorg');
    	this.nextEvent = 4000;
    	//this.talkingShit();
    	//this.game.time.events.repeat(Phaser.Timer.SECOND * 4, 20, this.talkingShit, this);
    },
    update: function() {
        this.game.physics.arcade.collide(this.player, this.allFood, this.collectFood, null, this);
        //this.game.physics.arcade.collide(this.player, this.junkFood, this.dieHorribly, null, this);
        this.playerPosition = this.player.position;
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
        if (this.game.time.now > this.nextEvent) {
            console.log("started");
            this.talkingShit();
            this.updateNextEvent();
            // Do something
        }
    },
    render: function(){
      //this.game.debug.body(this.player);  
    },
    endLoops: function(){
        // Stop the loops when the delayed event triggers
        this.game.time.events.remove(this.foodLoop);
        this.game.time.events.remove(this.junkLoop);
        this.game.time.events.remove(this.killLoop);
    },
    randomSpawnPosition: function(){
        var x = this.game.rnd.between(50, 550);
        var y = this.game.rnd.between(50, 400);
        var timesToTry = 100;
        var timesToTryCount = 0;
        if(this.allFood.children.length > 0) {
            for (var i = 0; i <=timesToTry; i++) {
                //console.log(this.allFood.children.length);
                for (var j = 0; j < this.allFood.children.length ; j++){
                    if (Phaser.Math.distance(x, y, this.allFood.children[j].x, this.allFood.children[j].y) < 150 || 
                        Phaser.Math.distance(x, y, this.playerPosition.x,  this.playerPosition.y) < 97) {
                        //console.log("too close together");
                        return undefined;
                    } else {
                         return [x, y]; 
                    }
                    timesToTryCount++;
                }
            }
            if (timesToTryCount === timesToTry){
                //console.log("ran out of tries");
                return [x, y];
            }
        } else {
            return [x, y]; 
        }
        
    },
    createFood: function(){
        var coordinates = this.randomSpawnPosition();
        var food = this.allFood.getFirstDead(false);
        if (!food) {
            if (coordinates !== undefined){
                //console.log("place food");
                food = new Paleo.Food(this.game, coordinates[0], coordinates[1], this.levelData.foodArray);
                this.allFood.add(food);
            } else {
                //console.log("retry calculation");
                this.createFood();
            }
        } else {
            if (coordinates !== undefined){
                // reset position
                //console.log("place resurrected food");
                food.reset(coordinates[0], coordinates[1], this.levelData.foodArray);
            } else {
                //console.log("retry calculation for dead food");
                this.createFood();
            }
        }
    },
    createJunk: function(){
        var coordinates = this.randomSpawnPosition();
        var junk = this.allFood.getFirstDead(false);
        if (!junk) {
            if (coordinates !== undefined){
                junk = new Paleo.Junk(this.game, coordinates[0], coordinates[1], this.levelData.junkArray);
                this.allFood.add(junk);
            } else {
               this.createJunk();
            }
        } else {
            if (coordinates !== undefined){
                // reset position
                junk.reset(coordinates[0], coordinates[1], this.levelData.junkArray);
            } else {
                this.createJunk();
            }
        }
    },
    collectFood: function(player, food){
        //console.log(food._frame.index);
        if (this.levelData.junkArray.indexOf(food._frame.index) === -1) {
            food.kill();
            this.foodCollected++;
            this.updateFoodStats(this.foodCollected);
            //gulping sound
        } else {
            this.endLoops();
            this.dieHorribly(food._frame.index);
        }
    },
    updateFoodStats: function(foodCollected){
        this.textObject.setText('Paleo-Perfect Food: ' + foodCollected);
    },
    killFood: function(){
        var foodSprite = this.game.rnd.pick(this.allFood.children);
        if(foodSprite && this.levelData.junkArray.indexOf(foodSprite._frame.index) < 1){
            //console.log("killing food");
            foodSprite.kill();
        }
    },
    dieHorribly: function(junk){
        //hacking, coughing sound
        this.game.state.start('GameOver', true, false, junk, this.foodCollected);
    },
    talkingShit: function() {
        this.thorgShitTalk = this.game.rnd.pick(this.levelData.thorgMessages);
        this.thorgMessage = new Paleo.Thorg(this.game, this.timerEvent, this.thorgShitTalk, Paleo.GameState);
    },
    updateNextEvent: function(){
        this.nextEvent = this.game.time.now + (this.game.rnd.realInRange(15, 22) * 1000);
    }
};