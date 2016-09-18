var Paleo = Paleo || {};

Paleo.HomeState = {
    init: function() {
        this.game.onPause.add(this.pauseGame, this);
    	this.game.onResume.add(this.resumeGame, this);
    },
    create: function() {
        this.background = this.game.add.tileSprite(0,0, this.game.world.width, 460, 'grass');
    	this.caveMusic = this.add.audio('cheeZeeCave');
    	this.caveMusic.play();
    	this.caveMusic.loop = true;
    	
        //creation loops
        this.timerEvent;
        this.nextEventCounter = 1;
        
        //parse the file
        this.levelData = JSON.parse(this.game.cache.getText('level1'));
    	
    	this.thorg = this.add.sprite(30, this.game.world.height/2 - 25, 'Thorg');
    	this.nextEvent = 4000;
    },
    update: function() {
        if (this.game.time.now > this.nextEvent) {
            if (Paleo.Thorg.completeText === undefined){
                this.giveInfo();
                this.nextEventCounter++;
                this.updateNextEvent();
            } else if(Paleo.Thorg.completeText) {
                this.giveInfo();
                this.nextEventCounter++;
                this.updateNextEvent();
            } else {
                this.updateNextEvent();
            }  
        }           
    },
    render: function(){
      //this.game.debug.body(this.player);
      //this.game.debug.body(this.wolf);  
    },
    giveInfo: function() {
        this.thorgInfo1 = "Me Thorg.\nAnd me be your guide\nto the Paleo life.";
        this.thorgInfo2 = "To be Paleo mean be Perfect.\nThere no room for mistaks.\nErrrr... mistakes.";
        this.thorgInfo3 = "You collect Paleo food like Paleo man.\nLeave junk on ground.\nJunk for losers... and wolves.";
        this.thorgInfo4 = "No mess up.";
        this.message;
        switch(this.nextEventCounter){
            case 1:
                this.message = this.thorgInfo1
                break;
            case 2:
                this.message = this.thorgInfo2
                break;
            case 3:
                this.message = this.thorgInfo3
                break;
            case 4: 
                this.message = this.thorgInfo4
                break;
        }
        
        this.thorgMessage = new Paleo.Thorg(this.game, this.timerEvent, this.message, 100, this.game.world.height/2 - 50, 32,Paleo.HomeState);
        
        if(this.nextEventCounter === 4){
            this.game.time.events.add(Phaser.Timer.SECOND * 6, function(){
                this.game.state.start('Game', Phaser.Plugin.StateTransition.In.FadeIn, Phaser.Plugin.StateTransition.Out.FadeOut);
            }, this);
        }
    },
    updateNextEvent: function(){
        this.nextEvent = this.game.time.now + (this.game.rnd.realInRange(12, 15) * 1000);
    },
    pauseGame: function(){
        //this.gamePaused = true;
        Paleo.Thorg.timerEvent.timer.pause();
        Paleo.Thorg.timerEvent.timer.running = false;
    },
    resumeGame: function(){
        Paleo.Thorg.timerEvent.timer.resume();
        Paleo.Thorg.timerEvent.timer.running = true;
        //this.gamePaused = false;
    }
};