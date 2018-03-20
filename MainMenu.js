class MainMenu extends Phaser.Scene{
	constructor() {
		super({key:'MainMenu'});
	}

	preload(){
		
    this.load.atlas('menuButtons', 'assets/menuButtons.png', 'assets/menuButtons.json');
	}

	create(){
		//Create Editor Button by grabbing image from set
		var menuButton = this.add.sprite(width/2,height/2,'menuButtons','editorb2.png')
		menuButton.setInteractive();
		menuButton.on('pointerdown', function(pointer){
			this.scene.start('Editor')
		},this)
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

	}
}
