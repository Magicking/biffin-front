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
var brushSize
var selectedLayer
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
    this.load.atlas('buttons', 'assets/buttons.png', 'assets/buttons.json');
    this.load.atlas('menuButtons', 'assets/menuButtons.png', 'assets/menuButtons.json');
    //loads tileset reference file
    this.load.tilemapTiledJSON('terrain2','assets/terrain2.json', null)   
    //Load tileset image
    this.load.image('terrain2', 'assets/terrain2.png'); 
  }
 
// CREATE<=======================================================================================================================
create(){

  mainCam = this.cameras.main
  var emptyTexture = this.textures.createCanvas('lol', window.innerWidth, window.innerHeigth);
     frame = new Phaser.Textures.Frame(emptyTexture,'cameraFrame',0,0,window.innerWidth,window.innerHeigth)
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
     this.cameras.main.disableCull = true;

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

    
    // Create Paintbrush marker
    marker = this.add.graphics();
    brushSize = 6
    //Black and 2 px wide
    marker.lineStyle(2, 0x000000, 1);
    marker.strokeRect(0,0, brushSize * map.tileWidth, brushSize * map.tileHeight);
 
   
    //Creating Minimap
 
    var minimap = this.cameras.add(200, 10, 400, 100).setZoom(0.3);
    minimap.setBackgroundColor(0x002244);


    
    //Some basic text to show we're awesome and show version
    var text = this.make.text({
        x: width-width+80,
        y: height-height+20,
        text: 'Biffin Editor refactor 0.01',
        origin: 0.5,
        wordWrap: { width: 300 },
        style: {
            font: 'bold 12px Arial',
            fill: 'white',
        }


       })

    var imageTest = this.add.sprite(2500,120,'terrain2')

      // Sets anchored to screen
       text.setScrollFactor(0);
      
      //Set camera bounds to mapsize
     this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      //this.cameras.main.setSize(map.widthInPixels,map.heightInPixels)
      //this.cameras.main.setPosition(0,0)
     // this.cameras.main.setViewport(0,0,400, 150)

           
    //Create Back to menu Button

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
      
      if (this.input.manager.activePointer.isDown && selectedLayer=='eraser')
      {
       selectedTile= -1   // Fill the tiles within the terrain Layer with grass (tile id = 1)
      terrainLayer.fill(0, marker.x/32, marker.y/32, brushSize, brushSize);
      objectLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      buildingLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      }



      if (this.input.manager.activePointer.isDown && selectedLayer==1)
      {
          // Fill the tiles within the terrain Layer with grass (tile id = 1)
      terrainLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      }
      if (this.input.manager.activePointer.isDown && selectedLayer==2)
      {
          // Fill the tiles within the object Layer with grass (tile id = 1)
      objectLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      }
       if (this.input.manager.activePointer.isDown && selectedLayer==3)
      {
          // Fill the tiles within the terrain Layer with grass (tile id = 1)
      buildingLayer.fill(selectedTile, marker.x/32, marker.y/32, brushSize, brushSize);
      }
      if (BKey.isDown & zoomFactory<2) {
        zoomFactory = zoomFactory+0.05
        
      }
      if (CKey.isDown & zoomFactory>0.5){
       zoomFactory = zoomFactory-0.05 
      }

     // this.cameras.main.zoom = zoomFactory
      if (GKey.isDown ) {
       brushSize = brushSize-1
       marker.clear();
       marker.strokeRect(0,0, brushSize * map.tileWidth, brushSize * map.tileHeight);
        }
       if (HKey.isDown ) {
       brushSize = brushSize+1
       marker.clear();
       marker.strokeRect(0,0, brushSize * map.tileWidth, brushSize * map.tileHeight);
        }
        //this.cameras.main.width = width*zoomFactory
       // this.cameras.main.setViewport(100,100,800, 600)
     
      

   }
 
 
}
