
BasicGame.MainMenu = function (game) {
 var startEditor;

};

BasicGame.MainMenu.prototype = {

	create: function () {
		//Background Color
		this.stage.backgroundColor = '#2d2d2d';
	    
	    //group to contain buttons
		var	menuButtonsGroup = this.add.group();
		
		//Editor Button
         startEditor = this.add.button(this.game.world.centerX,this.game.world.centerY,'menuButtons',editorOnClick, this, "editorb2.png","editorb0.png", "editorb1.png");
     
    	menuButtonsGroup.add(startEditor);

      function editorOnClick () {
        this.state.start('Editor');
        
        }


	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	resize: function (width, height) {

		//	If the game container is resized this function will be called automatically.
		//	You can use it to align sprites that should be fixed in place and other responsive display things.

		startEditor.x = this.game.width - 512;
		startEditor.y = this.game.height -256;
		this.camera.width = this.game.width;
		this.camera.height = this.game.height;
/*
	    this.bg.width = width;
	    this.bg.height = height;

	    this.spriteMiddle.x = this.game.world.centerX;
	    this.spriteMiddle.y = this.game.world.centerY;

	    this.spriteTopRight.x = this.game.width;
	    this.spriteBottomLeft.y = this.game.height;

	    this.spriteBottomRight.x = this.game.width;
	    this.spriteBottomRight.y = this.game.height;
*/
	}

};
