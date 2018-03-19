//terrain Variables
var terrain;
var terrainLayer;
var terrainPop;
var terrainCons
var terrainLimbo
var currentLayer;


//First iteration of unit architecture, prototype for now 
var biffinRed;
var army;
var corps;

//Keys
var marker;
var updateInput = true;
var bitValue;


//default Tile on selector: water(0)
var currentTile = 0;

//Size of map; in tiles amount
var mapSizeX = 120;
var mapSizeY = 120;
var worldWidth = mapSizeX*32
var worldHeight = mapSizeY*32
var resizeScale;


// which tiles to use as a tileset (can be changed for skins)
var tileSetImage = 'terrain2'
    //GUI variables
    //Grabs the body tag's information and properties
var DOM = Phaser.DOM
var screenWidth
var screenHeight
var documentWidth;
var tileSelector;
var buttonGroup;
var menuX; 
var menuY ;


var oldcamera;
var worldScale = 1;
var currentBounds;
var mapSizeMax;
var prevScale ={};
var nextScale={};
var zoompoint={};
var mapSizeCurrent;
var distance =0;
var olddistance =0;
var distancedelta=0;
var easing=0.1;
var frameSizeX = worldWidth
var frameSizeY = worldHeight



//activates keyboard input.
var keyboardInput;


//test
var  gameSize, newSize, zoom;

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

    },




	create: function () {
          //========================== DeBUG
            
            var debug = this.game.debug
            debug.font = '20px monospace';
            debug.lineHeight = 24;

        //========================== ZOOM 

            worldScale=1;
            screenWidth = window.innerWidth
            screenHeight = window.innerHeight
            frameSizeMax = frameSizeX;
            frameSizeCurrent = frameSizeMax;


            this.input.mouse.mouseWheelCallback = function (event) {
            var wheelDelt = this.input.mouse.wheelDelta;
            if (wheelDelt < 0)  {   frameSizeCurrent -= 40;  frameSizeCurrent = Phaser.Math.clamp(frameSizeCurrent, screenWidth , frameSizeMax);}
            else                {   frameSizeCurrent += 40;  frameSizeCurrent = Phaser.Math.clamp(frameSizeCurrent, screenWidth , frameSizeMax);}
            worldScale = (frameSizeCurrent/frameSizeMax);
             };
            
        //========================== WORLD CREATION

            //Make our game world and set it bounds
            this.world.setBounds(0, 0, mapSizeX*32, mapSizeY*32);
        
            stageGroup = this.add.group();// this group will contain everything except the UI for scaling

            
        // ========================== TERRAIN CREATION 
            
            //create Blank tilemap
            terrainLayer = this.add.tilemap();
            terrainLayer.centerX = mapSizeX/2
            terrainLayer.centerY = mapSizeY/2
            // add a tileset Image to the map
            terrainLayer.addTilesetImage(tileSetImage);
            //create the world as a layer and adds to stageGroup
            terrain = terrainLayer.create('level1', mapSizeX, mapSizeY, 32, 32,stageGroup);
            terrainCons = terrainLayer.createBlankLayer('level3', mapSizeX,mapSizeY,32,32,stageGroup);
            terrainPop = terrainLayer.createBlankLayer('level2', mapSizeX,mapSizeY,32,32,stageGroup);

            // Fills tilemap layer with default tile:HOLY WATER (6)
            terrainLayer.fill(0, 0,0,mapSizeX,mapSizeY, 'level1');
            currentLayer = terrain;
            this.createArmy();

        // ========================== MOUSE MARKER UPDATING
            //sends callback
            this.input.addMoveCallback(updateMarker, this);

        // ========================== UNIT PROPERTIES AND CREATION. To be changed and tested most likely

            // Adds basic background color for testin
            this.stage.backgroundColor = '#2d3d2d';

            //Tilestrip Creation; soon to be removed /js/tileSelector.js
            this.createTileSelector();

        //========================== MENU AND GUI   
                    
            menuX = screenWidth;
            menuY = screenHeight;
                
            //GUI Button creation /js/createButtons.js
            this.createButtons();
            buttonGroup.x = 32;
            buttonGroup.y = 32;
           
	},// End of Create



	update: function () {

          //touch zoom


            if(this.input.pointer1.isDown && this.input.pointer2.isDown){
            olddistance = distance;
            distance = Phaser.Math.distance(this.input.pointer1.x, this.input.pointer1.y, this.input.pointer2.x, this.input.pointer2.y);
            distancedelta = Math.abs(olddistance - distance);

            if (olddistance > distance && distancedelta > 4 ){ frameSizeCurrent -= 200;  }
            else if (olddistance < distance && distancedelta > 4 ){  frameSizeCurrent += 200;}
            frameSizeCurrent = Phaser.Math.clamp(frameSizeCurrent, screenWidth , frameSizeMax); //prevent odd scalefactors - set a minimum and maximum scale value
            worldScale = (frameSizeCurrent/frameSizeMax);

            //calculate point between fingers (zoompoint.x and zoompoint.y)
            if (this.input.pointer1.x < this.input.pointer2.x) { zoompoint.x =  this.input.pointer1.worldX + (Math.abs(this.input.pointer1.worldX - this.input.pointer2.worldX)/2); }
            else {zoompoint.x =  this.input.pointer2.worldX + (Math.abs(this.input.pointer1.worldX - this.input.pointer2.worldX)/2);  }
            if (this.input.pointer1.y < this.input.pointer2.y) { zoompoint.y =  this.input.pointer1.worldY + (Math.abs(this.input.pointer1.worldY - this.input.pointer2.worldY)/2); }
            else {zoompoint.y =  this.input.pointer2.worldY + (Math.abs(this.input.pointer1.worldY - this.input.pointer2.worldY)/2);  }
        }
        else {  // wheelzoom
            zoompoint.x = this.input.mousePointer.worldX;
            zoompoint.y = this.input.mousePointer.worldY;
        }

        // move camera / pan
        if(this.input.activePointer.isDown && !this.input.pointer2.isDown){
            if (oldcamera) { // if moving the world always continue from the last position
                this.camera.x += oldcamera.x - this.input.activePointer.position.x; 
                this.camera.y += oldcamera.y - this.input.activePointer.position.y; 
            }
            oldcamera = this.input.activePointer.position.clone();
        }
        // adjust camera center and zoom here
        else { 
            oldcamera = null; 
            rescalefactorx = frameSizeX / (frameSizeX * stageGroup.scale.x); // multiply by rescalefactor to get original world value
            rescalefactory = frameSizeY / (frameSizeY * stageGroup.scale.y);

            prevScale.x = stageGroup.scale.x;
            prevScale.y = stageGroup.scale.y;

            nextScale.x = prevScale.x + (worldScale-stageGroup.scale.x)*easing;
            nextScale.y = prevScale.y + (worldScale-stageGroup.scale.y)*easing;

            var xAdjust = (zoompoint.x - this.camera.position.x) * (nextScale.x - prevScale.x);
            var yAdjust = (zoompoint.y - this.camera.position.y) * (nextScale.y - prevScale.y);


          
            //now actually scale the stage
            stageGroup.scale.x += (worldScale-stageGroup.scale.x)*easing;   //easing
            stageGroup.scale.y += (worldScale-stageGroup.scale.y)*easing;
        }        //touch zoom
        if(this.input.pointer1.isDown && this.input.pointer2.isDown){
            olddistance = distance;
            distance = Phaser.Math.distance(this.input.pointer1.x, this.input.pointer1.y, this.input.pointer2.x, this.input.pointer2.y);
            distancedelta = Math.abs(olddistance - distance);

            if (olddistance > distance && distancedelta > 4 ){ frameSizeCurrent -= 200;  }
            else if (olddistance < distance && distancedelta > 4 ){  frameSizeCurrent += 200;}
            frameSizeCurrent = Phaser.Math.clamp(frameSizeCurrent, screenWidth , frameSizeMax); //prevent odd scalefactors - set a minimum and maximum scale value
            worldScale = (frameSizeCurrent/frameSizeMax);

            //calculate point between fingers (zoompoint.x and zoompoint.y)
            if (this.input.pointer1.x < this.input.pointer2.x) { zoompoint.x =  this.input.pointer1.worldX + (Math.abs(this.input.pointer1.worldX - this.input.pointer2.worldX)/2); }
            else {zoompoint.x =  this.input.pointer2.worldX + (Math.abs(this.input.pointer1.worldX - this.input.pointer2.worldX)/2);  }
            if (this.input.pointer1.y < this.input.pointer2.y) { zoompoint.y =  this.input.pointer1.worldY + (Math.abs(this.input.pointer1.worldY - this.input.pointer2.worldY)/2); }
            else {zoompoint.y =  this.input.pointer2.worldY + (Math.abs(this.input.pointer1.worldY - this.input.pointer2.worldY)/2);  }
        }
        else {  // wheelzoom
            zoompoint.x = this.input.mousePointer.worldX;
            zoompoint.y = this.input.mousePointer.worldY;
        }

        // move camera / pan
        if(this.input.activePointer.isDown && !this.input.pointer2.isDown){
            if (oldcamera) { // if moving the world always continue from the last position
                this.camera.x += oldcamera.x - this.input.activePointer.position.x; 
                this.camera.y += oldcamera.y - this.input.activePointer.position.y; 
            }
            oldcamera = this.input.activePointer.position.clone();
        }
        // adjust camera center and zoom here
        else { 
            oldcamera = null; 
            rescalefactorx = frameSizeX / (frameSizeX * stageGroup.scale.x); // multiply by rescalefactor to get original world value
            rescalefactory = frameSizeY / (frameSizeY * stageGroup.scale.y);

            prevScale.x = stageGroup.scale.x;
            prevScale.y = stageGroup.scale.y;

            nextScale.x = prevScale.x + (worldScale-stageGroup.scale.x)*easing;
            nextScale.y = prevScale.y + (worldScale-stageGroup.scale.y)*easing;

            var xAdjust = (zoompoint.x - this.camera.position.x) * (nextScale.x - prevScale.x);
            var yAdjust = (zoompoint.y - this.camera.position.y) * (nextScale.y - prevScale.y);


        
            //now actually scale the stage
            stageGroup.scale.x += (worldScale-stageGroup.scale.x)*easing;   //easing
            stageGroup.scale.y += (worldScale-stageGroup.scale.y)*easing;
        }
   
        //Detection of adjacent tiles for edition
        	this.dynamicEditing();	


	},
 


    resize: function (width, height) {

        //  If the game container is resized this function will be called automatically.

 //  You can use it to align sprites that should be fixed in place and other responsive display things.
    resizeScale = 3-worldScale
    terrain.resize(window.innerWidth*resizeScale, window.innerHeight*resizeScale);
    console.log('resizing')



  },
    render : function(){ 
        this.game.debug.inputInfo(32, 32);
        this.game.debug.cameraInfo(this.game.camera, 32, 256);
    },

	quitGame: function (pointer) {


		this.state.start('MainMenu');

	}

};
