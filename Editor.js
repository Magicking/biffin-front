var scene = this.scene;
var tileSetImage = 'terrain2'
var camera 
var cursors
var mapSizeX = 120
var mapSizeY = 120
var frameSizeX = mapSizeX*32
var frameSizeY = mapSizeY*32
var gameSize, newSize, zoom;
BasicGame.Editor = function (game) {

};

BasicGame.Editor.prototype = {  

    preload: function(){
        
    },




	create: function () {
            game = this.game
            camera = this.camera
        //========================== DeBUG

            //loads some debug info on screen
       /*     var debug = this.game.debug
            debug.font = '20px monospace';
            debug.lineHeight = 24;*/
            
        //========================== WORLD CREATION

            scene = this.scene
            scene.backgroundColor = "#4488AA"
          /*  world = this.world
            world.resize(frameSizeX,frameSizeY)*/
 /*           
        // ========================== TERRAIN CREATION 
            terrainLayer = this.add.tilemap();
            terrainLayer.addTilesetImage(tileSetImage);
            terrain = terrainLayer.create('level1', mapSizeX, mapSizeY, 32, 32);
            terrainLayer.fill(0, 0,0,mapSizeX,mapSizeY, 'level1');
 
  

        // ========================== MOUSE MARKER UPDATING
           

        // ========================== UNIT PROPERTIES AND CREATION. To be changed and tested most likely
            this.createButtons();

        //========================== MENU AND GUI   
          cursors = this.input.keyboard.createCursorKeys();          
     /*    //========================== ZOOM 
         zoom = new Phaser.Point(1, 1);
        // We'll apply `zoom` to the original game size
        gameSize = Object.freeze(new Phaser.Point(game.width, game.height));
        // and store the result in `newSize`
        newSize = gameSize.clone();
    */
        
   
	},// End of Create



	update: function () {

 
}
}
