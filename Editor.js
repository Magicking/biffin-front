var controls;
var marker;
var map;
var mapWidth;
var mapHeight;
var cameras;
var BKey;
var width
var height
var terrainLayer
var objectLayer
var buildingLayer
var selectedTile = 1
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
 
    //Adding Tileset
    var tiles = map.addTilesetImage('terrain2', null, 32, 64);
    //Create blank tilemap layers and give them render orders.
    terrainLayer = map.createBlankDynamicLayer('terrains', tiles);
    terrainLayer.depth = 0
    objectLayer = map.createBlankDynamicLayer('objects', tiles);
    objectLayer.depth = 1
    buildingLayer = map.createBlankDynamicLayer('buildings', tiles);
    buildingLayer.depth = 2
   
    //Randomly creates Water on terrainLayer
    terrainLayer.randomize(0, 0, map.width, map.height, [0 /*add tile index here to add to rng distribution*/]);
    //Create  10x10 small testing island with mountains and forests on it
    terrainLayer.fill (1, 9,9,12,12)
    objectLayer.fill(5, 10, 10, 10,10)
    objectLayer.fill(3, 12,13,3,5)
 
    // Create Paintbrush marker
    marker = this.add.graphics();
    //Black and 2 px wide
    marker.lineStyle(2, 0x000000, 1);
    marker.strokeRect(0,-32, 6 * map.tileWidth, 6 * map.tileHeight);
 
    //Set camera bounds to mapsize
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //Creating Minimap
    //  The miniCam is 400px wide, so can display the whole world at a zoom of 0.2
    this.minimap = this.cameras.add(200, 10, 400, 100).setZoom(0.2);
    this.minimap.setBackgroundColor(0x002244);
    this.minimap.scrollX = 1600;
    this.minimap.scrollY = 300;

     //Create cursors to be able to move camera around and their configuration
    var cursors = this.input.keyboard.createCursorKeys();
    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5,
        disableCull: true,
        zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
    };
    controls = new Phaser.Cameras.Controls.Fixed(controlConfig);
     
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
      // Sets anchored to screen
       text.setScrollFactor(0);

           
    //Create Back to menu Button

    createButtons.call(this); 

    //Create Key for testing
        BKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);


}//End of Create
 
//UPDATE <=======================================================================================================================
update (time, delta){
      width = window.innerWidth;
      height = window.innerHeigth;
      controls.update(delta);
      var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
 
      // Rounds down to nearest tile
      var pointerTileX = map.worldToTileX(worldPoint.x);
      var pointerTileY = map.worldToTileY(worldPoint.y);
 
      // Snap to tile coordinates, but in world space
      marker.x = map.tileToWorldX(pointerTileX);
      marker.y = map.tileToWorldY(pointerTileY);
 
      if (this.input.manager.activePointer.isDown)
      {
          // Fill the tiles within an area with grass (tile id = 1)
      terrainLayer.fill(selectedTile, marker.x/32, marker.y/32, 6, 6);
      }
    
      if (BKey.isDown){
        this.SetTop(0);
        console.log('resizing')
      }
   }
 
 
}