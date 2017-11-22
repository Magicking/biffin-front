var stage = this.stage;
var tileSetImage = 'terrain2'
var camera 
var cursors
var ZOOM_DELTA = 0.1;
var KEY_ZOOM_OUT = Phaser.KeyCode.A;   // [
var KEY_ZOOM_IN  = Phaser.KeyCode.Q; // ]
var mapSizeX = 120
var mapSizeY = 120
var frameSizeX = mapSizeX*32
var frameSizeY = mapSizeY*32
var gameSize, newSize, zoom;
BasicGame.Editor = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator


    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Editor.prototype = {  

    preload: function(){
        
         // this is the scale manager mode designed specifically for this.
        this.scale.setResizeCallback(this.resize, this)
        this.stage.scale.pageAlignVertically = true;
        this.stage.scale.pageAlignHorizontally = true;

    },




	create: function () {
            game = this.game
            camera = this.camera
            keyboard =game.input.keyboard
        //========================== DeBUG

            //loads some debug info on screen
            var debug = this.game.debug
            debug.font = '20px monospace';
            debug.lineHeight = 24;
            
        //========================== WORLD CREATION

            stage = this.stage
            stage.backgroundColor = "#4488AA"
            world = this.world
            world.resize(frameSizeX,frameSizeY)
            
        // ========================== TERRAIN CREATION 
            terrainLayer = this.add.tilemap();
            terrainLayer.addTilesetImage(tileSetImage);
            terrain = terrainLayer.create('level1', mapSizeX, mapSizeY, 32, 32);
            terrainLayer.fill(0, 0,0,mapSizeX,mapSizeY, 'level1');
 
  

        // ========================== MOUSE MARKER UPDATING
           

        // ========================== UNIT PROPERTIES AND CREATION. To be changed and tested most likely


        //========================== MENU AND GUI   
          cursors = this.input.keyboard.createCursorKeys();          
         //========================== ZOOM 
         zoom = new Phaser.Point(1, 1);
        // We'll apply `zoom` to the original game size
        gameSize = Object.freeze(new Phaser.Point(game.width, game.height));
        // and store the result in `newSize`
        newSize = gameSize.clone();
    
        
    
	},// End of Create



	update: function () {

        
if (cursors.up.isDown)
    {
        if (cursors.up.shiftKey)
        {
        
        }
        else
        {
            this.zoomIn();
            terrain.resize(frameSizeX, frameSizeY)
            terrain.y -= 4;
        }
    }
    else if (cursors.down.isDown)
    {
        if (cursors.down.shiftKey)
        {
          
        }
        else
        {
            this.zoomOut();
            terrain.y += 4
            terrain.resize(frameSizeX, frameSizeY)
        }
    }

    if (cursors.left.isDown)
    {
        if (cursors.left.shiftKey)
        {
        
        }
        else
        {
           camera.x -= 4;
        }
    }
    else if (cursors.right.isDown)
    {
        if (cursors.right.shiftKey)
        {
         
        }
        else
        {
          camera.x += 4;
        }
    }
	},
 


   /* resize: function (width, height) {

        //  If the game container is resized this function will be called automatically.

 //  You can use it to align sprites that should be fixed in place and other responsive display things.



  },*/
    render : function(){ 
        this.game.debug.inputInfo(32, 32);
        this.game.debug.cameraInfo(this.game.camera, 32, 256);
    },

	quitGame: function (pointer) {


		this.state.start('MainMenu');

	},

    updateDimensions : function() {
  Phaser.Point.divide(gameSize, zoom, newSize);
  newSize.floor();  
  // https://github.com/photonstorm/phaser/blob/v2.6.2/src/core/ScaleManager.js#L1105
  game.scale.updateDimensions(newSize.x, newSize.y, /*resize=*/true);
  game.input.scale.set(1 / zoom.x, 1 / zoom.y);
  game.input.activePointer.dirty = true; // no effect?
},

    zoomBy : function(dx, dy) {
  zoom.add(dx, dy);
  console.log('zoom:'+zoom);
  this.updateDimensions();
},

    zoomIn : function() {
  this.zoomBy(ZOOM_DELTA, ZOOM_DELTA);
},

    zoomOut : function() {
  this.zoomBy(-ZOOM_DELTA, -ZOOM_DELTA);
},

    zoomTo : function(x, y) {
  zoom.setTo(x, y);
  this.updateDimensions();
},
    resize: function (width, height) {
  console.log('height:'+height+'width:'+width);
startEditor.x = this.game.width - 512;
        startEditor.y = this.game.height -256;
        this.camera.width = this.game.width;
        this.camera.height = this.game.height;
    },


};
