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
var waterLayer
var terrainLayer
var objectLayer
var roadLayer
var buildingLayer
var selectedTile = 1
var zoomFactory = 1
var GKey
var HKey
var SKey
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
var xMostTile
var culled
var testArray
var allowZoom
var controlConfig
var test
var editTest




class Editor extends Phaser.Scene{
  constructor() {
    super({key:'Editor'});
  }
  

//PRELOAD <=======================================================================================================================
preload(){
    
    //loads tileset reference file

   this.load.image('grass','assets/grass.png')
    
    //Load tileset image
    this.load.image('terrain2', 'assets/terrain2.png'); 
    
    this.load.image('roads','assets/roads.png')
    this.load.atlas('objects','assets/objects.png','assets/objects.json')

  }
 
// CREATE<=======================================================================================================================
create(){


  
    allowZoom = true
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
    controlConfig = {
        camera: mainCam,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5,
        zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
    };
    controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
  
    //Adding Tilesets
    var tiles = map.addTilesetImage('terrain2', null, 32, 32);
    var grass = map.addTilesetImage('grass', null , 32, 32);
    var objects = map.addTilesetImage('objects', null, 32, 64,);
    var roads = map.addTilesetImage('roads', null, 32, 32);

    
    //Create blank tilemap layers and give them render orders.
    waterLayer = map.createBlankDynamicLayer('terrains', tiles);
    waterLayer.depth = -1
    terrainLayer = map.createBlankDynamicLayer('grass', grass);
    terrainLayer.depth = 0
    objectLayer = map.createBlankDynamicLayer('objects', objects);
    objectLayer.depth = 1
    objectLayer.setRenderOrder(1)
    roadLayer = map.createBlankDynamicLayer('roads', roads);
    roadLayer.depth = 1
    buildingLayer = map.createBlankDynamicLayer('buildings', tiles);
    buildingLayer.depth = 2
    selectedLayer = 1
    //Randomly creates Water on terrainLayer
    waterLayer.randomize(0, 0, map.width, map.height, [0 /*add tile index here to add to rng distribution*/]);

    //Create  10x10 small testing island with mountains and forests on it
    terrainLayer.fill (1, 5,9,32,18)
    objectLayer.fill(0, 10, 10, 10,10)
    objectLayer.fill(1, 12, 13, 3, 5)

    //get top left and bottom right tiles and check if both are visible, 
    //if both are visible, do not allow zoom.
    var topLeft = this.add.sprite(0,0)
    var bottomRight = this.add.sprite(mapWidth*32,mapHeight*32)
    testArray = []
    testArray.push(topLeft)
    testArray.push(bottomRight)

     
        
    //Saving layer data to mapData
    mapData.push(terrainLayer.layer.data)
    mapData.push(objectLayer.layer.data)
    mapData.push(buildingLayer.layer.data)
    
    // Create Paintbrush marker
    marker = this.add.graphics();
    brushSize = 6
    //Black and 2 px wide and 60% transparent
    marker.lineStyle(2, 0x000000, 1);
    marker.strokeRect(0,0, brushSize * map.tileWidth, brushSize * map.tileHeight);
    marker.setAlpha(0.4)
      
    //Set camera bounds to mapsize
    mainCam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
 
    //Create GUI scene
    createButtons.call(this); 
    var objectPlaced = 0
    //We call dynamic editing once on create to make sure all borders are correctly set
    dynamicEditing.call(this);


      
       this.input.on('pointerdown', function (pointer) {

      if ( selectedLayer==1) {
      // Fill the tiles within the terrain Layer with selectedTile 
      terrainLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      dynamicEditing.call(this)
      };

      if (input == 1){
      //
      if ( selectedLayer=='eraser')
      {
      selectedTile= -1   // Erases tiles on all layers and places water on terrain
      terrainLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      objectLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      buildingLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      roadLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      dynamicEditing.call(this)
      }
      
     
      if ( selectedLayer==2){
          // Fill the tiles within the object Layer with selectedTile 
     objectLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
     roadLayer.fill(-1, marker.x/32, marker.y/32, brushSize, brushSize);
     objectPlaced = 1
      } else 
      {objectPlaced = 0}

    
       if ( selectedLayer==4){
          // Fill the tiles within the road Layer with roads, places grass under it beforehand, clears objectlayer.
      objectLayer.fill(-1, marker.x/32, marker.y/32, brushSize, brushSize);
      terrainLayer.fill(0, marker.x/32, marker.y/32, brushSize, brushSize);
      roadLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      dynamicEditing.call(this)
      };

       if ( selectedLayer==3){
          // Fill the tiles within the building Layer with selectedBuilding
      buildingLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      };
      }

    }, this);
    
    //Create Key for testing
    BKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    CKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    GKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
    HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    //This calls Resize.js when the resize event is triggered.
    this.scale.on('resize', resize, this);
}//End of Create
 
//UPDATE <=======================================================================================================================
update (time, delta){
      var objectPlaced = 0
      //Test to see both extremities
      culled = mainCam.cull(testArray)
      if(culled.length == 2 ){
        console.log('seeing both extremities')
        mainCam.inputEnabled = false          //Find way to disable zooming out here
      }
      
      controls.update(delta);
      var worldPoint = this.input.activePointer.positionToCamera(mainCam);
 
      // Rounds down to nearest tile
      var pointerTileX = map.worldToTileX(worldPoint.x);
      var pointerTileY = map.worldToTileY(worldPoint.y);
 
      // Snap to tile coordinates, but in world space
      marker.x = map.tileToWorldX(pointerTileX);
      marker.y = map.tileToWorldY(pointerTileY);
      brushSize = Phaser.Math.Clamp(brushSize, 1, 12);
   

      //Brush marker size management
      if (GKey.isDown ) {
      //Decrements by 1
       brushSize--;
      //Clear previous marker
       marker.clear();
      //redraw marker
       marker.strokeRect(0,0, brushSize * map.tileWidth, brushSize * map.tileHeight); //Bug with how we set the rectangle widths.
       brushSizeTooltip.text = brushSize;
      };

       if (HKey.isDown ) {
       brushSize++;
       marker.clear();
       marker.strokeRect(0,0, brushSize * map.tileWidth, brushSize * map.tileHeight);
       brushSizeTooltip.text = brushSize;

      };
     if(objectPlaced == 1){

           //create callback with arrow function so that it works inside 'this'
        var objectReplace = tile =>{
          
          //get all tiles that are on objectLayer
          var tmp = objectLayer.getTileAt(tile.x,tile.y,true)
          //if a tile is a mountain, 
          if(tmp.index == 0 ){
            //remove it
            objectLayer.removeTileAt(tmp.x,tmp.y);
            //replace it with a sprite with an origin at half it's height
           var tmpSprite = this.add.sprite(tmp.x*32,tmp.y*32,'objects','0.png').setOrigin(0,0.5)
          
          }
          //if a tile is a forest
          if(tmp.index == 1 ){
            //remove it
            objectLayer.removeTileAt(tmp.x,tmp.y)
            //replace it with a sprite with an origin at half it's height
            this.add.sprite(tmp.x*32,tmp.y*32,'objects','1.png').setOrigin(0,0.5)
          }
        }
        //run the callback for every tile on objectLayer
        objectLayer.forEachTile(objectReplace);}
     //Tester on B
      if (BKey.isDown ){
        console.log('Test')   
      }

      if (SKey.isDown ){
        //call our save function
        MapSave.call()
      }
    
 
           }
        }//End of Update

/*
        //create callback with arrow function so that it works inside 'this'
        var objectReplace = tile =>{
          var objectContainer = this.add.container(0,0) 
          //get all tiles that are on objectLayer
          var tmp = objectLayer.getTileAt(tile.x,tile.y,true)
          //if a tile is a mountain, 
          if(tmp.index == 0 ){
            //remove it
            objectLayer.removeTileAt(tmp.x,tmp.y);
            //replace it with a sprite with an origin at half it's height
           var tmpSprite = this.add.sprite(tmp.x*32,tmp.y*32,'objects','0.png').setOrigin(0,0.5)
         
          objectContainer.add(tmpSprite)
          console.log(objectContainer)
          }
          //if a tile is a forest
          if(tmp.index == 1 ){
            //remove it
            objectLayer.removeTileAt(tmp.x,tmp.y)
            //replace it with a sprite with an origin at half it's height
            this.add.sprite(tmp.x*32,tmp.y*32,'objects','1.png').setOrigin(0,0.5)
          }
        }
        //run the callback for every tile on objectLayer
        objectLayer.forEachTile(objectReplace);
        */