BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {


	preload: function () {
		

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar


		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.

		//this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	You can find all of these assets in the Phaser Examples repository

		// Loads Sprite atlas and corresponding file}
		var spriteMap = "main"
		var textureURL = 'assets/main.png'
		var atlasURL = 'assets/main.json'
		var tileSetImage = 'terrain2'
		this.load.atlasJSONHash(spriteMap, textureURL, atlasURL);
		this.load.atlasJSONHash('buttons', 'assets/buttons.png', 'assets/buttons.json');
		this.load.atlasJSONHash('menuButtons', 'assets/menuButtons.png', 'assets/menuButtons.json');
		//loads tileset reference file
		this.load.tilemap(tileSetImage,'assets/terrain2.json', null, Phaser.Tilemap.TILED_JSON)
		//Load tileset image
		this.load.image(tileSetImage, 'assets/terrain2.png'); 


	   

	},

	create: function () {

		this.state.start('MainMenu');

	}

};