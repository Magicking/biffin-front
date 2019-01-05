


var currentlySelected

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
        //Create tooltip
            var dragMe = this.make.text({
            x: 16,
            y: 10,
            text: 'Tools - Drag me around',
            wordWrap: { width: 300 },
            style: {
                font: ' 12px Arial',
                fill: '0x585e65',
            }
            })
           
        

    //creates Buttons, for each button, there 
        //Currently Selected tile
            var current = 'grassbutton0.png';
            currentlySelected = this.add.sprite(80,64,'buttons', current).setInteractive();
            currentlySelected.setScale(2)
            
            
        //Create Back to menu Button
            var menuButton = this.add.sprite(80,350,'menuButtons','editorb0.png');
                menuButton.setInteractive()
                menuButton.on('pointerover', function(pointer) {input = 0});
                menuButton.on('pointerdown', function(pointer){
                    console.log('scene switch')
                    this.scene.stop('Editor')
                    this.scene.start('MainMenu')
                 },this)
        //Eraser
            var eraserButton = this.add.sprite(32,132,'buttons','eraserbutton0.png');
                eraserButton.setInteractive()
                eraserButton.on('pointerover', function(pointer) {input = 0;});
                eraserButton.on('pointerdown', function(pointer){
                    currentlySelected.setFrame('eraserbutton0.png')
                    console.log('eraser');
                    selectedTile = 0;
                    selectedLayer = 'eraser'; })
                
        //Forest
            var forestButton = this.add.sprite(32,174,'buttons','forestbutton0.png')  
                forestButton.setInteractive(),
                forestButton.on('pointerover', function(pointer) {input = 0});
                forestButton.on('pointerdown', function(pointer){
                    currentlySelected.setFrame('forestbutton0.png')
                    selectedTile = 3
                    selectedLayer = 2
                })
        //Mountain
            var mountainButton = this.add.sprite(32,216,'buttons','mountainbutton0.png')
                mountainButton.on('pointerover', function(pointer) {input = 0});
                mountainButton.setInteractive()
                mountainButton.on('pointerdown', function(pointer){
                    currentlySelected.setFrame('mountainbutton0.png')
                    selectedTile = 5
                    selectedLayer = 2
                })
        //River
            var riverButton = this.add.sprite(32,258,'buttons','riverbutton0.png','riverbuttonpush.png');
                riverButton.setInteractive()
                riverButton.on('pointerover', function(pointer) {input = 0});
                riverButton.on('pointerdown', function(pointer){
                    currentlySelected.setFrame('riverbutton0.png')
                   selectedTile = 34;
                    selectedLayer = 1;
                    brushSize = 1

                    marker.clear();
                    marker.strokeRect(0,0, brushSize * map.tileWidth, brushSize * map.tileHeight);
                    brushSizeTooltip.text = brushSize;
                })
    //Second Row
        //Grass
            var grassButton = this.add.sprite(64+16,132,'buttons','grassbutton0.png')
                grassButton.on('pointerover', function(pointer) {input = 0});
                grassButton.setInteractive()
                grassButton.on('pointerdown', function(pointer){
                    currentlySelected.setFrame('grassbutton0.png')
                    selectedTile = 1
                    selectedLayer = 1
                })    
        //Road
            var roadButton = this.add.sprite(64+16,174,'buttons','roadbutton0.png')
                roadButton.on('pointerover', function(pointer) {input = 0});
                roadButton.setInteractive()
                roadButton.on('pointerdown', function(pointer){
                    currentlySelected.setFrame('roadbutton0.png')
                    selectedTile = 24;
                    selectedLayer = 3;
                    brushSize = 1
                    marker.clear();
                    marker.strokeRect(0,0, brushSize * map.tileWidth, brushSize * map.tileHeight);
                    brushSizeTooltip.text = brushSize;
                }) 
        //Buildings
           
            
            var buildingsButton = this.add.sprite(64+16,216,'buttons','buildingsButton0.png')
                buildingsButton.on('pointerover', function(pointer) {input = 0;currentlySelected.setFrame('buildingsButton0.png')});
                buildingsButton.setInteractive()
            //Drop Down menu for all buildings
                // Rectangle graphics object and backdrop
            var buildingsDrop = new Phaser.Geom.Rectangle(buildingsButton.x, buildingsButton.y, 128,128)
            var buildingsDropStyle = this.add.graphics({ fillStyle: { color: 0x7a91a8} })
                buildingsDropStyle.fillRoundedRect(buildingsDrop.x, buildingsDrop.y, buildingsDrop.width, buildingsDrop.height, 11);
                buildingsDropStyle.alpha = 0.65;


 
           var listClose =  this.add.sprite(buildingsDrop.x+110,buildingsDrop.y+10,'buttons','closeButton.png')  
                listClose.setInteractive();

             listClose.on('pointerdown', function(pointer){
                    console.log('Closing window...')
                    buildingsList.setVisible(false)
                })  



            var campButton = this.add.sprite(buildingsDrop.x+32,buildingsDrop.y+32,'buttons','roadButton0.png')

            // Container containing buttons for buildings
            var buildingsList = this.add.container(buildingsDropStyle.x, buildingsDropStyle.y, [buildingsButton,buildingsDropStyle,listClose,campButton]);
                //set it invisible at the start
                buildingsList.setVisible(false)
                //make it interactive
                buildingsList.setInteractive(buildingsDrop, Phaser.Geom.Rectangle.Contains);
                //make the building button open the drop down
                buildingsButton.on('pointerdown', function(pointer){
                    buildingsList.setVisible(true)
                    input = 0 

                })
                 listClose.on('pointerdown', function(pointer){
                    console.log('forking')
                    buildingsList.setVisible(false)
                })  

                listClose.on('pointerover', function(pointer) {input = 0});
                listClose.on('pointerout', function (pointer) {input = 1});
                     buildingsList.on('pointerover', function(pointer) {input = 0});
                    buildingsList.on('pointerout', function (pointer) {input = 1});



        //Dynamic text to show brush size
            brushSizeTooltip = this.make.text({
            x: currentlySelected.x+46,
            y: currentlySelected.y-5,
            text: brushSize,
            origin: 0,
            wordWrap: { width: 300 },
            style: {
                font: '16px Arial',
                fill: 'white',
            }
            })

        //creating of draggable container and it's backdrop
            //Create Rectangle geometry object
                var rectangleGUI = new Phaser.Geom.Rectangle(0,0,160,416)
            //Style it and fill it, this is the actual zone that will be used
                var rectangleStyle = this.add.graphics({ fillStyle: { color: 0x7a91a8} });
                    rectangleStyle.fillRoundedRect(rectangleGUI.x, rectangleGUI.y, rectangleGUI.width, rectangleGUI.height, 10);
                    rectangleStyle.setAlpha(0.65)
            //create container containing all buttons and styling for the rectangle so it is draggable
                var GUIcontainer = this.add.container(0, 0, [rectangleStyle,grassButton,menuButton,eraserButton,forestButton,mountainButton,riverButton,
                    brushSizeTooltip,dragMe,roadButton,currentlySelected,buildingsButton,buildingsList]);
                //Sets the interactive zone to the guicontainer 
                    GUIcontainer.setInteractive(rectangleGUI, Phaser.Geom.Rectangle.Contains);
                //indents GUIcontainer by 32px on both x and y.
                    GUIcontainer.setPosition(32,32)
                    this.input.setDraggable(GUIcontainer);
            //Dragging for the GUI        
                    GUIcontainer.on('drag', function(pointer, dragX, dragY) {
                    this.x = dragX;
                    this.y = dragY;
                    });
                    //removes input on tilemap in order for gui to be correct
                    GUIcontainer.on('pointerover', function(pointer) {input = 0});
                    GUIcontainer.on('pointerout', function (pointer) {input = 1});

    },

    update: function (time, delta)
    {
    
    }

});

//This launches the actual scene
function createButtons (){
this.scene.launch('EditorGUI')
}

