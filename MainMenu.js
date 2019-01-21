class MainMenu extends Phaser.Scene{
  constructor() {
    super({key:'MainMenu'});
  }
 
  preload(){
    
    this.load.atlas('menuButtons', 'assets/menuButtons.png', 'assets/menuButtons.json');
    this.load.atlas('buttons','assets/buttons.png','assets/buttons.json')
  }
 
  create(){
    //Create Editor Button by grabbing image from set
    var menuButton = this.add.sprite(width/2,height/2,'menuButtons','editorb2.png')
    menuButton.setInteractive();
    menuButton.on('pointerdown', function(pointer){
      this.scene.stop('MainMenu')

      this.scene.start('Editor');
      //chooses a layer and a tile to start with, in this case, terrainLayer and grass.
      selectedLayer = 0;
      selectedTile = 0
      input = 0;
    },this)

    
    //Some basic text to show we're awesome and show version
        var text = this.make.text({
        x: width-width+80,
        y: height-height+20,
        text: 'Biffin Editor refactor 0.02',
        origin: 0.5,
        wordWrap: { width: 300 },
        style: {
            font: 'bold 12px Arial',
            fill: 'white',
        }
       })
 
  }
}