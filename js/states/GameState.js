var Paleo = Paleo || {};

Paleo.GameState = {
    init: function() {
        
    },
    create: function() {
        this.game.scale.setGameSize(600, 550);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.background = this.game.add.tileSprite(0,0, this.game.world.width, 460, 'grass');
        this.transparentBorder = this.game.add.sprite(0, this.game.world.height - 90, 'bottomBorder');
        this.game.physics.arcade.enable(this.transparentBorder);
        this.transparentBorder.body.allowGravity = false;
    	this.transparentBorder.body.immovable = true;
    	
    	// Mute audio
		Paleo.game.audioButton = Paleo.game.add.button(540, 50, 'audioButton', Paleo.game.global.muteAudio);
		Paleo.game.audioButton.anchor.setTo(0.5);
		Paleo.game.audioButton.scale.setTo(0.3);
		if (Paleo.game.caveMusic.isPlaying === true) {
		 	 Paleo.game.audioButton.frame = 1;
		 } else if (Paleo.game.caveMusic.isPlaying === false) {
			 Paleo.game.audioButton.frame = 0;
		 } 
        
        //parse the file
        this.levelData = JSON.parse(this.game.cache.getText('level1'));
        this.foodCollected = 0;
        this.textObject = this.game.add.bitmapText(30, 30, 'stoneAgeBlack', 'Paleo-Perfect Food ' + this.foodCollected, 28);
        
    	//Food
    	this.allFood = this.game.add.group();
    	
        //creation loops
        this.timerEvent;
        this.foodLoop = this.game.time.events.loop(Phaser.Timer.SECOND + (2000 * Math.random()), this.createFood, this);
        this.junkLoop = this.game.time.events.loop(Phaser.Timer.SECOND + (2000 * Math.random()), this.createJunk, this);
        this.killLoop = this.game.time.events.loop(Phaser.Timer.SECOND + (5000 * Math.random()), this.killFood, this);
        
        this.player = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player');
        this.player.frame = 1;
        this.player.anchor.setTo(0.5);
        this.player.animations.add('walkFront', [0, 1, 2, 0], 10, true);
        this.player.animations.add('walkBack', [6, 7, 8, 7], 10, true);
        this.player.animations.add('walkLeft', [9, 10, 11, 10], 10, true);
        this.player.animations.add('walkRight', [3, 4, 5, 4], 10, true);
    	this.game.physics.arcade.enable(this.player);
    	this.player.body.collideWorldBounds = true;
    	this.player.body.setSize(25, 30);
    	this.player.body.offset.setTo(7, 5);
    	this.player.body.collideWorldBounds = true;
    	
    	this.wolf = this.add.sprite(this.player.position.x + this.game.world.width, this.player.position.y, 'wolf');
        this.wolf.frame = 46;
        this.wolf.anchor.setTo(0.5);
        this.wolf.scale.setTo(2);
        this.game.physics.arcade.enable(this.wolf);
        this.wolf.checkWorldBounds = true;
        this.wolf.animations.add('runYouDown', [5,6,7,8,9,10,2], 10, true);
        //this.wolf.animations.add('killYou', [57, 58, 59, 58], 10, true);
    	this.wolfCounter = 0;
    	
    	this.thorg = this.add.sprite(30, this.game.world.height - 70, 'Thorg');
    	this.nextEvent = 4000;
    	this.wolfGrowl = this.add.audio('wolfGrowl');
    	this.crunch = this.add.audio('crunch');
    	
    	this.game.onPause.add(this.gamePause, this);
        this.game.onResume.add(this.gameResume, this);
    },
    update: function() {
        this.game.physics.arcade.collide(this.player, this.allFood, this.collectFood, null, this);
        this.game.physics.arcade.overlap(this.wolf, this.allFood, this.wolfDevour, null, this);
        this.game.physics.arcade.collide(this.player, this.wolf, this.dieHorribly, null, this);
        this.game.physics.arcade.collide(this.player, this.transparentBorder, null, null, this);
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
        if (this.game.time.now > this.nextEvent && !this.gamePaused) {
            if (Paleo.Thorg.completeText === undefined){
                this.talkingShit();
                this.updateNextEvent();
            } else if(Paleo.Thorg.completeText) {
                this.talkingShit();
                this.updateNextEvent();
            } else {
                this.updateNextEvent();
            }  
        }
        if(this.allFood.countLiving() > 35 && this.wolfCounter === 0){
            this.spawnWolf(this.player);
        }
    },
    render: function(){
      //this.game.debug.body(this.player);
      //this.game.debug.body(this.wolf);  
    },
    endLoops: function(){
        // Stop the loops when the delayed event triggers
        this.game.time.events.remove(this.foodLoop);
        this.game.time.events.remove(this.junkLoop);
        this.game.time.events.remove(this.killLoop);
    },
    randomSpawnPosition: function(player){
        var currentCoordinate = [];
        var randomRow = this.levelData.grid[Math.floor(Math.random() * this.levelData.grid.length)];
        var randomCell = randomRow[Math.floor(Math.random() * randomRow.length)];
        if (Phaser.Math.difference(player.x, randomCell.x) < 39 || Phaser.Math.difference(player.y, randomCell.y) < 39) {
            randomCell.filled = true;
        }
        if (randomCell.filled !== true){
            currentCoordinate.push(randomCell.x);
            currentCoordinate.push(randomCell.y);
            randomCell.filled = true;
            return currentCoordinate;
        } else {
            return this.randomSpawnPosition(player);
        }
    },
    createFood: function(){
        var coordinates = this.randomSpawnPosition(this.player);
        var food = this.allFood.getFirstDead();
        if (!food) {
            food = new Paleo.Food(this.game, coordinates[0], coordinates[1], this.levelData.foodArray);
            this.allFood.add(food);
        } else {
            // reset position
            food.reset(coordinates[0], coordinates[1], this.levelData.foodArray);
        }
        food.events.onAddedToGroup.add(this.spawnWolf, this);
    },
    createJunk: function(){
        var coordinates = this.randomSpawnPosition(this.player);
        var junk = this.allFood.getFirstDead();
        if (!junk) {
            junk = new Paleo.Junk(this.game, coordinates[0], coordinates[1], this.levelData.junkArray);
            this.allFood.add(junk);
        } else {
            // reset position
            junk.reset(coordinates[0], coordinates[1], this.levelData.junkArray);
        }
        junk.events.onAddedToGroup.add(this.spawnWolf, this);
    },
    collectFood: function(player, food){
        if (this.levelData.junkArray.indexOf(food._frame.index) === -1) {
            food.alive = false;
            food.kill();
            this.levelData.grid.forEach(function(row){
                row.forEach(function(cell){
                    if (food.position.x === cell.x && food.position.y === cell.y){
                        cell.filled = false;
                    }
                }, this);
            }, this);
            this.foodCollected++;
            this.updateFoodStats(this.foodCollected);
            //crunching sound
            this.crunch.play();
        } else {
            this.endLoops();
            this.dieEating(food._frame.index);
        }
    },
    updateFoodStats: function(foodCollected){
        this.textObject.setText('Paleo-Perfect Food: ' + foodCollected);
    },
    spawnWolf: function(player){
        this.wolf.x = player.position.x + this.game.world.width;
        this.wolf.y = player.position.y;
        this.wolf.play('runYouDown');
        this.wolf.body.velocity.x = -this.levelData.wolfRunningSpeed;
        this.wolfGrowl.play();
        this.wolfCounter++;
        this.wolf.events.onOutOfBounds.add(this.wolfOut, this);
    },
    wolfOut: function(){
        this.wolf.body.velocity.x = 0;
        this.wolfCounter = 0;
    },
    wolfDevour: function(wolf, food){
        food.kill();
        food.alive = false;
        this.levelData.grid.forEach(function(row){
            row.forEach(function(cell){
                if (food.position.x === cell.x && food.position.y === cell.y){
                    cell.filled = false;
                }
            }, this);
        }, this);
    },
    killFood: function(){
        var foodSprite = this.game.rnd.pick(this.allFood.children);
        if(foodSprite && this.levelData.junkArray.indexOf(foodSprite._frame.index) < 1){
            foodSprite.kill();
        }
    },
    dieEating: function(junk){
        //hacking, coughing sound
        this.game.state.start('GameOver', Phaser.Plugin.StateTransition.In.FadeIn, Phaser.Plugin.StateTransition.Out.FadeOut, true, false, junk, this.foodCollected);
    },
    dieHorribly: function(player, wolf){
        //wolf snarl and scream
        this.game.state.start('GameOver', Phaser.Plugin.StateTransition.In.FadeIn, Phaser.Plugin.StateTransition.Out.FadeOut, true, false, wolf.key, this.foodCollected);
    },
    talkingShit: function() {
        this.thorgShitTalk = this.game.rnd.pick(this.levelData.thorgMessages);
        this.thorgMessage = new Paleo.Thorg(this.game, this.timerEvent, this.thorgShitTalk, 90, this.game.world.height - 80, 22, Paleo.GameState);
    },
    updateNextEvent: function(){
        this.nextEvent = this.game.time.now + (this.game.rnd.realInRange(15, 22) * 1000);
    },
    gamePause: function(){
        this.gamePaused = true;
        Paleo.Thorg.timerEvent.timer.pause();
        Paleo.Thorg.timerEvent.timer.running = false;
    },
    gameResume: function(){
        Paleo.Thorg.timerEvent.timer.resume();
        Paleo.Thorg.timerEvent.timer.running = true;
        this.gamePaused = false;
    }
};