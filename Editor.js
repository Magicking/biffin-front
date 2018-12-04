var controls;
var marker;
var map;
var mapWidth;
var mapHeight;
var cameras;
var BKey;
var CKey;
var width
var height
var terrainLayer
var objectLayer
var buildingLayer
var selectedTile = 1
var zoomFactory = 1
var GKey
var HKey
var width = window.innerWidth;
var height = window.innerHeigth;
var mainCam
var frame
var displayWidth
var brushSize;
var selectedLayer;
var mapData = [];
var sortedTiles
var brushSizeTooltip
var input;




class Editor extends Phaser.Scene{
  constructor() {
    super({key:'Editor'});
  }
  

//PRELOAD <=======================================================================================================================
preload(){

    var spriteMap = "main"
    var textureURL = 'assets/main.png'
    var atlasURL = 'assets/main.json'
    var tileSetImage = 'terrain2'
    this.load.atlas(spriteMap, textureURL, atlasURL);
    //loads tileset reference file
    this.load.tilemapTiledJSON('terrain2','assets/terrain2.json', null)   
    //Load tileset image
    this.load.image('terrain2', 'assets/terrain2.png'); 
  }
 
// CREATE<=======================================================================================================================
create(){
    //Determines wether or not brush can write on map
    input = 1

    //Camera creation
    mainCam = this.cameras.main
  
     //setting Map width and height in number of tiles
    mapWidth = 150
    mapHeight = 150
 
    //Layer creation
    map = this.make.tilemap({ 
      width: mapWidth, 
      height: mapHeight, 
      tileWidth: 32, 
      tileHeight: 32, 
      });
    
    //Create cursors to be able to move camera around and their configuration
    var cursors = this.input.keyboard.createCursorKeys();
    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5,
        zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
    };
    controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
     this.cameras.main.setZoom(1)

    //Adding Tileset
    var tiles = map.addTilesetImage('terrain2', null, 32, 32);
    //Create blank tilemap layers and give them render orders.
    terrainLayer = map.createBlankDynamicLayer('terrains', tiles);
    terrainLayer.depth = 0
    objectLayer = map.createBlankDynamicLayer('objects', tiles);
    objectLayer.depth = 1
    buildingLayer = map.createBlankDynamicLayer('buildings', tiles);
    buildingLayer.depth = 2
    selectedLayer = 1
    //Randomly creates Water on terrainLayer
    terrainLayer.randomize(0, 0, map.width, map.height, [0 /*add tile index here to add to rng distribution*/]);
    //Create  10x10 small testing island with mountains and forests on it
    terrainLayer.fill (1, 9,9,12,12)
    objectLayer.fill(5, 10, 10, 10,10)
    objectLayer.fill(3, 12,13,3,5)

    //Saving layer data to mapData
    mapData.push(terrainLayer.layer.data)
    mapData.push(objectLayer.layer.data)
    mapData.push(buildingLayer.layer.data)
    
    // Create Paintbrush marker
    marker = this.add.graphics();
    brushSize = 6
    //Black and 2 px wide
    marker.lineStyle(2, 0x000000, 1);
    marker.strokeRect(0,0, brushSize * map.tileWidth, brushSize * map.tileHeight);
 
    /* 
    //Creating Minimap
 
    var minimap = this.cameras.add(25, 10, 400, 100).setZoom(0.1);
    minimap.setBackgroundColor(0x002244);

    */
      
    //Set camera bounds to mapsize
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
 
    //Create GUI scene
    createButtons.call(this); 
  
    //Create Key for testing
    BKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    CKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    GKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
    HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

}//End of Create
 
//UPDATE <=======================================================================================================================
update (time, delta){
      
      controls.update(delta);
      var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
 
      // Rounds down to nearest tile
      var pointerTileX = map.worldToTileX(worldPoint.x);
      var pointerTileY = map.worldToTileY(worldPoint.y);
 
      // Snap to tile coordinates, but in world space
      marker.x = map.tileToWorldX(pointerTileX);
      marker.y = map.tileToWorldY(pointerTileY);
      brushSize = Phaser.Math.Clamp(brushSize, 1, 12);
      
      if (input == 1){
      //
      if (this.input.manager.activePointer.isDown && selectedLayer=='eraser')
      {
       selectedTile= -1   // Erases tiles on all layers and places water on terrain
      terrainLayer.fill(0, marker.x/32, marker.y/32, brushSize, brushSize);
      objectLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      buildingLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      }

      if (this.input.manager.activePointer.isDown && selectedLayer==1) {
          // Fill the tiles within the terrain Layer with grass (tile id = 1)
      terrainLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      };

      if (this.input.manager.activePointer.isDown && selectedLayer==2){
          // Fill the tiles within the object Layer with grass (tile id = 1)
      objectLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      };

       if (this.input.manager.activePointer.isDown && selectedLayer==3){
          // Fill the tiles within the terrain Layer with grass (tile id = 1)
      buildingLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      };
      }
      //Zoom Operation
      if (BKey.isDown & zoomFactory<2) {
        zoomFactory = zoomFactory+0.05
      };

      if (CKey.isDown & zoomFactory>0.5){
       zoomFactory = zoomFactory-0.05 
      };

      //Brush marker size management
      if (GKey.isDown ) {
       brushSize--;
       marker.clear();
       marker.strokeRect(0,0, brushSize * map.tileWidth, brushSize * map.tileHeight); //Bug with how we set the rectangle widths.
       brushSizeTooltip.text = 'Brush size: '+brushSize;
      };

       if (HKey.isDown ) {
       brushSize++;
       marker.clear();
       marker.strokeRect(0,0, brushSize * map.tileWidth, brushSize * map.tileHeight);
       brushSizeTooltip.text = 'Brush size: '+brushSize;
      };
     
       //testing getTilesWithin
       if (this.input.manager.activePointer.isDown){
        var tmpInput
        //logs what tiles are painted inside brush space
        tmpInput = terrainLayer.getTilesWithin(marker.x/32, marker.y/32, brushSize, brushSize);

        function filter_x(tmpInput) {
        return tmpInput.x == marker.x/32 && tmpInput.y == marker.y/32;
        }
         sortedTiles = tmpInput.filter(filter_x);
       console.log('this contains '+ sortedTiles)
    };

   }
 

}

