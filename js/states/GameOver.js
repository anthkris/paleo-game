var Paleo = Paleo || {};

Paleo.GameOverState = {
    init: function(junk, foodCount) {
        this.junk = junk;
        this.foodCount = foodCount;
         this.junkFood = '';
         switch(junk) {
            case 4: 
                this.junkFood = 'an omelette with cheese'
                break;
            case 8:
                this.junkFood = 'beer'
                break;
            case 9: 
                this.junkFood = 'candy'
                break;
            case 12: 
                this.junkFood = 'a bread roll'
                break;
            case 17: 
                this.junkFood = 'cheese'
                break;
            case 18: 
                this.junkFood = 'cheese spread'
                break;
            case 20: 
                this.junkFood = 'coffee'
                break;
            case 21: 
                this.junkFood = 'a taco in shell with cheese'
                break;
            case 22: 
                this.junkFood = 'corn'
                break;
            case 23: 
                this.junkFood = 'ketchup'
                break;
            case 25:
            case 38:
            case 44:
            case 65:
                this.junkFood = 'a burger'
                break;
            case 26: 
                this.junkFood = 'a crepe'
                break;
            case 30: 
                this.junkFood = 'a fortune cookie'
                break;
            case 31:
            case 74:
                this.junkFood = 'pasta'
                break;
            case 32: 
                this.junkFood = 'succotash with corn'
                break;
            case 36: 
                this.junkFood = 'grilled cheese'
                break;
            case 37: 
                this.junkFood = 'hash'
                break;
            case 40: 
                this.junkFood = 'hooch'
                break;
            case 41: 
                this.junkFood = 'potatoes'
                break;
            case 42: 
                this.junkFood = 'nachos'
                break;
            case 43: 
                this.junkFood = 'a burrito'
                break;
            case 45: 
                this.junkFood = 'licorice'
                break;
            case 46: 
                this.junkFood = 'a coffee drink'
                break;
            case 48: 
                this.junkFood = 'spaghetti'
                break;
            case 50: 
                this.junkFood = 'a piece of oat cake'
                break;
            case 51: 
                this.junkFood = 'a panini'
                break;
            case 52: 
                this.junkFood = 'ranch dressing'
                break;
            case 55: 
                this.junkFood = 'onion rings'
                break;
            case 58: 
                this.junkFood = 'noodles'
                break;
            case 60: 
                this.junkFood = 'popcorn'
                break;
            case 61: 
                this.junkFood = 'rice'
                break;
            case 63: 
                this.junkFood = 'ale'
                break;
            case 64: 
                this.junkFood = 'a piece of\npumpkin pie in crust'
                break;
            case 69: 
                this.junkFood = 'a sno cone'
                break;
            case 70: 
                this.junkFood = 'a quesadilla'
                break;
            case 71: 
                this.junkFood = 'butter'
                break;
            case 76: 
                this.junkFood = 'tofu'
                break;
            case 77: 
                this.junkFood = 'a waffle'
                break;
            case 78: 
                this.junkFood = 'jam'
                break;
            case 79: 
                this.junkFood = 'a piece of pi pie'
                break;
            case 81: 
                this.junkFood = 'preserve'
                break;
            case 82: 
                this.junkFood = 'a pizza'
                break;
            case 83: 
                this.junkFood = 'fruit bread'
                break;
        }
    },
    create: function(){
        this.background = this.game.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'grass');
        this.saltInWound = [
            "You stink. You not perfect.\nYou not Paleo.",
            "You think you eat like Thorg?\nYou not good enough to\neat like Thorg!",
            "You keep trying. You get better.\nExcept not really.\nYou doomed to fail.",
            
        ];
       if(this.junk === "wolf"){
           this.message = 'You get eaten by wolf.\nThat punishment enough.';
       } else {
        this.message = 'You die eating\n' + this.junkFood + '.\nYou collect ' + this.foodCount + ' real food.\n\n' + this.game.rnd.pick(this.saltInWound);
       }
        this.endText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2, 'stoneAgeBlack', this.message, 28);
        this.endText.anchor.setTo(0.5);
        this.endText.align = 'center';
    },
    junkLoopUp: function(junk){
        //JUNK
    //4 (omelette with cheese)
    //8 beer
    //9 candy
    //12 bread roll
    //17 cheese
    //18 cheese spread
    //20 coffee
    //21 taco in shell with cheese
    //22 corn
    //23 ketchup
    //25 burger 1
    //26 crepe
    //30 fortune cookie
    //31 pasta 1
    //32 succotash (has corn)
    //36 grilled cheese
    //37 hash (has potatoes)
    //38 burger 2
    //40 hooch
    //41 potatoes
    //42 nachos
    //43 burrito
    //44 burger 3
    //45 licorice
    //46 coffee drink
    //48 spaghetti
    //50 oat cake
    //51 panini sandwich
    //52 ranch dressing
    //55 onion rings
    //58 noodles
    //60 popcorn
    //61 rice
    //63 ale
    //64 pumpkin pie in crust
    //65 burger 4
    //69 sno cone
    //70 quesadilla
    //71 butter
    //74 pasta 2
    //76 tofu
    //77 waffle
    //78 jam
    //79 pi pie (see what they did there?)
    //81 preserve
    //82 pizza
    //83 fruit bread
        switch(junk) {
            case 4: 
                'an omelette with cheese'
                break;
            case 8:
                'beer'
                break;
            case 9: 
                'candy'
                break;
            case 12: 
                'a bread roll'
                break;
            case 17: 
                'cheese'
                break;
            case 18: 
                'cheese spread'
                break;
            case 20: 
                'coffee'
                break;
            case 21: 
                'a taco in shell with cheese'
                break;
            case 22: 
                'corn'
                break;
            case 23: 
                'ketchup'
                break;
            case 25:
            case 38:
            case 44:
            case 65:
                'a burger'
                break;
            case 26: 
                'a crepe'
                break;
            case 30: 
                'a fortune cookie'
                break;
            case 31:
            case 74:
                'pasta'
                break;
            case 32: 
                'succotash with corn'
                break;
            case 36: 
                'grilled cheese'
                break;
            case 37: 
                'hash'
                break;
            case 40: 
                'hooch'
                break;
            case 41: 
                'potatoes'
                break;
            case 42: 
                'nachos'
                break;
            case 43: 
                'a burrito'
                break;
            case 45: 
                'licorice'
                break;
            case 46: 
                'a coffee drink'
                break;
            case 48: 
                'spaghetti'
                break;
            case 50: 
                'a piece of oat cake'
                break;
            case 51: 
                'a panini'
                break;
            case 52: 
                'ranch dressing'
                break;
            case 55: 
                'onion rings'
                break;
            case 58: 
                'noodles'
                break;
            case 60: 
                'popcorn'
                break;
            case 61: 
                'rice'
                break;
            case 63: 
                'ale'
                break;
            case 64: 
                'a piece of pumpkin pie in crust'
                break;
            case 69: 
                'a sno cone'
                break;
            case 70: 
                'a quesadilla'
                break;
            case 71: 
                'butter'
                break;
            case 76: 
                'tofu'
                break;
            case 77: 
                'a waffle'
                break;
            case 78: 
                'jam'
                break;
            case 79: 
                'a piece of pi pie'
                break;
            case 81: 
                'preserve'
                break;
            case 82: 
                'a pizza'
                break;
            case 83: 
                'fruit bread'
                break;
        }
    }
};
