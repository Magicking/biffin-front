var controls;
var marker;
var map;
var mapWidth;
var mapHeight;

class Editor extends Phaser.Scene{
  constructor() {
    super({key:'Editor'});
  }
  
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
      key:"map"});

    var tiles = map.addTilesetImage('terrain2', null, 32, 64);
    var layer = map.createBlankDynamicLayer('layer1', tiles);
    //Randomly creates Water
    layer.randomize(0, 0, map.width, map.height, [0 /*add tile index here to add to rng distribution*/]);

    // Create Paintbrush marker
    marker = this.add.graphics();
    marker.lineStyle(2, 0x000000, 1);
    marker.strokeRect(0,-32, 6 * map.tileWidth, 6 * map.tileHeight);

    //Set camera bounds to mapsize
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //Create cursors to be able to move camera around and their configuration
    var cursors = this.input.keyboard.createCursorKeys();
    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5
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
    var menuButton = this.add.sprite(width-width+120,height-height+60,'menuButtons','editorb0.png')
    menuButton.setInteractive();
    menuButton.on('pointerdown', function(pointer){
    this.scene.start('MainMenu')
    },this)

    menuButton.setScrollFactor(0)
      }//End of Create


 update (time, delta){

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
        map.fill(1, marker.x/32, marker.y/32, 6, 6);
    }
 }


}
