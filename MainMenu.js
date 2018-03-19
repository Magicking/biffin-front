class MainMenu extends Phaser.Scene{
	constructor() {
		super({key:'MainMenu'});
	}

	preload(){
		this.load.image('menuButtons', 'assets/menuButtons.png');
		 this.load.tilemapTiledJSON('map', 'assets/menuButtons.json');
	}
	create(){
		//Create Editor Button by grabbing image from set
		var menuButton = this.add.image(width/2,height/2,'menuButtons')

	}
}
