




// This is our GUI Scene's definition
var EditorGUI = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function EditorGUI ()
    {
        Phaser.Scene.call(this, { key: 'EditorGUI', active: false });
    },

    preload: function ()
    {
       this.load.atlas('buttons', 'assets/buttons.png', 'assets/buttons.json');
       this.load.atlas('menuButtons', 'assets/menuButtons.png', 'assets/menuButtons.json');
    },

    create: function ()
    {   
        //Create version text
            var versionText = this.make.text({
            x: 16,
            y: 10,
            text: 'Biffin Editor refactor 0.02',
            wordWrap: { width: 300 },
            style: {
                font: 'bold 12px Arial',
                fill: 'white',
            }
            })
           
        //Dynamic text to show brush size
            brushSizeTooltip = this.make.text({
            x: 16,
            y: 292,
            text: 'Brush size: '+brushSize,
            origin: 0,
            wordWrap: { width: 300 },
            style: {
                font: 'bold 12px Arial',
                fill: 'white',
            }
            })

        //Create Back to menu Button
            var menuButton = this.add.sprite(80,64,'menuButtons','editorb0.png');
                menuButton.setInteractive()
                menuButton.on('pointerover', function(pointer) {input = 0});
                menuButton.on('pointerdown', function(pointer){
                    console.log('scene switch')
                    this.scene.stop('Editor')
                    this.scene.start('MainMenu')
                 },this)
        //Eraser
            var eraserButton = this.add.sprite(32,132,'buttons','eraserbutton0.png','eraserbuttonpush.png');
                eraserButton.setInteractive()
                eraserButton.on('pointerover', function(pointer) {input = 0});
                eraserButton.on('pointerdown', function(pointer){
                    console.log('eraser');
                    selectedTile = 0;
                    selectedLayer = 'eraser'; })
                
        //Forest
            var forestButton = this.add.sprite(32,174,'buttons','forestbutton0.png')  
                forestButton.setInteractive(),
                forestButton.on('pointerover', function(pointer) {input = 0});
                forestButton.on('pointerdown', function(pointer){
                    selectedTile = 3
                    selectedLayer = 2
                })
        //Mountain
            var mountainButton = this.add.sprite(32,216,'buttons','mountainbutton0.png')
                mountainButton.on('pointerover', function(pointer) {input = 0});
                mountainButton.setInteractive()
                mountainButton.on('pointerdown', function(pointer){
                    selectedTile = 5
                    selectedLayer = 2
                })
        //River
            var riverButton = this.add.sprite(32,258,'buttons','riverbutton0.png','riverbuttonpush.png');
                riverButton.setInteractive()
                riverButton.on('pointerover', function(pointer) {input = 0});
                riverButton.on('pointerdown', function(pointer){
                    brushSize = 1
                    selectedTile = 8;
                    selectedLayer = 1;
                    marker.clear();
                    marker.strokeRect(0,0, brushSize * map.tileWidth, brushSize * map.tileHeight);
                    brushSizeTooltip.text = 'Brush size: '+brushSize;
                })
        //creating of draggable container and it's backdrop
            //Create Rectangle geometry object
            var rectangleGUI = new Phaser.Geom.Rectangle(0,0,160,320)
            //Style it and fill it, this is the actual zone that will be used
            var rectangleStyle = this.add.graphics({ fillStyle: { color: 0x164574 } });
                rectangleStyle.fillRectShape(rectangleGUI);
            //create container containing all buttons and styling for the rectangle so it is draggable
            var GUIcontainer = this.add.container(0, 0, [rectangleStyle,menuButton,eraserButton,forestButton,mountainButton,riverButton,brushSizeTooltip,versionText]);
                GUIcontainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, rectangleGUI.width, rectangleGUI.height), Phaser.Geom.Rectangle.Contains);
                //indents GUIcontainer by 32px on both x and y.
                GUIcontainer.setPosition(32,32)
                this.input.setDraggable(GUIcontainer);
            //Dragging for the GUI        
            GUIcontainer.on('drag', function(pointer, dragX, dragY) {
                this.x = dragX;
                this.y = dragY;
            });
            GUIcontainer.on('pointerover', function(pointer) {
                input = 0
                console.log('GUI Over')
            });
            GUIcontainer.on('pointerout', function (pointer) {
                input = 1
                console.log('GUI Out')
            });

    },

    update: function (time, delta)
    {
     
    }

});

//This launches the actual scene
function createButtons (){
this.scene.launch('EditorGUI')
}

