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

	}
}
