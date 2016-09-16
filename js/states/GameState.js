var Paleo = Paleo || {};

Paleo.GameState = {
    init: function() {
        
    },
    create: function() {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.background = this.game.add.tileSprite(0,0, this.game.world.width, 460, 'grass');
        
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
    	//this.player.body.allowGravity = false;
    	this.player.body.collideWorldBounds = true;
    	this.player.body.setSize(25, 35);
    	this.player.body.offset.setTo(7, 5);
    	this.player.body.collideWorldBounds = false;
    	
    	this.wolf = this.add.sprite(this.player.position.x + this.game.world.width, this.player.position.y, 'wolf');
        this.wolf.frame = 46;
        this.wolf.anchor.setTo(0.5);
        this.wolf.scale.setTo(2);
        this.game.physics.arcade.enable(this.wolf);
        this.wolf.checkWorldBounds = true;
        this.wolf.animations.add('runYouDown', [50, 51, 52, 53,54], 10, true);
        this.wolf.animations.add('killYou', [57, 58, 59, 58], 10, true);
    	this.wolfCounter = 0;
    	this.thorg = this.add.sprite(30, this.game.world.height - 70, 'Thorg');
    	this.nextEvent = 4000;
    	//this.talkingShit();
    	//this.game.time.events.repeat(Phaser.Timer.SECOND * 4, 20, this.talkingShit, this);
    },
    update: function() {
        this.game.physics.arcade.collide(this.player, this.allFood, this.collectFood, null, this);
        this.game.physics.arcade.collide(this.wolf, this.allFood, this.wolfDevour, null, this);
        this.game.physics.arcade.collide(this.player, this.wolf, this.dieHorribly, null, this);
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
        if(this.allFood.children.length > 35 && this.wolfCounter === 0){
            //console.log("Wolf running");
            this.spawnWolf(this.player);
        }
    },
    render: function(){
      //this.game.debug.body(this.player);
      this.game.debug.body(this.wolf);  
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
        food.events.onAddedToGroup.add(this.spawnWolf, this);
    },
    createJunk: function(){
        var coordinates = this.randomSpawnPosition(this.player);
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
        junk.events.onAddedToGroup.add(this.spawnWolf, this);
    },
    collectFood: function(player, food){
        if (this.levelData.junkArray.indexOf(food._frame.index) === -1) {
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
            //gulping sound
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
        console.log("wolf running");
        this.wolf.play('runYouDown');
        this.wolf.body.velocity.x = -this.levelData.wolfRunningSpeed;
        this.wolfCounter++;
        this.wolf.events.onOutOfBounds.add(this.wolfOut, this);
    },
    wolfOut: function(){
        console.log("am I out of bounds?");
        this.velocity.x = 0;
        // if (this.checkWorldBounds) {        
        //     //  The Sprite is already out of the world bounds, so let's check to see if it has come back again        
        //     if (this._cache[5] === 1 && this.game.world.bounds.intersects(this._bounds)) {
        //         this._cache[5] = 0; 
        //         this.events.onEnterBounds.dispatch(this);
        //     } else if (this._cache[5] === 0 && !this.game.world.bounds.intersects(this._bounds)) { 
        //         //  The Sprite WAS in the screen, but has now left. 
        //         this._cache[5] = 1;            
        //         this.events.onOutOfBounds.dispatch(this); 
                
        //         return false;
        //     }
        // }
    },
    wolfDevour: function(wolf, food){
        food.kill();
        console.log("devoured " + food.key);
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
            //console.log("killing food");
            foodSprite.kill();
        }
    },
    dieEating: function(junk){
        //hacking, coughing sound
        this.game.state.start('GameOver', true, false, junk, this.foodCollected);
    },
    dieHorribly: function(player, wolf){
        //wolf snarl and scream
        this.game.state.start('GameOver', true, false, wolf.key, this.foodCollected);
    },
    talkingShit: function() {
        this.thorgShitTalk = this.game.rnd.pick(this.levelData.thorgMessages);
        this.thorgMessage = new Paleo.Thorg(this.game, this.timerEvent, this.thorgShitTalk, Paleo.GameState);
    },
    updateNextEvent: function(){
        this.nextEvent = this.game.time.now + (this.game.rnd.realInRange(15, 22) * 1000);
    }
};