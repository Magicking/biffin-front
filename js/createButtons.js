function createButtons (){
 
 var editorGUI = this.add.container(0,0);
 var inputIO = "enabled"
 editorGUI.setSize(120,258)
 editorGUI.setInteractive();
 editorGUI.setScrollFactor(0)
 editorGUI.tint = 0x000245;
 editorGUI.depth = 5


//Create Back to menu Button
    var menuButton = this.add.sprite(120,60,'menuButtons','editorb0.png');
        menuButton.on('pointerdown', function(pointer){
        menuButton.setInteractive()
        this.scene.start('MainMenu')
         },this)
  
    var eraserButton = this.add.sprite(80,132,'buttons','eraserbutton0.png','eraserbuttonpush.png');
        eraserButton.setInteractive()
        eraserButton.on('pointerdown', function(pointer){
            selectedTile = 0
            selectedLayer = 'eraser'
        })

    var forestButton = this.add.sprite(80,174,'buttons','forestbutton0.png')  
        forestButton.depth = 5
        forestButton.setScrollFactor(0);
        forestButton.setInteractive(),
        forestButton.on('pointerdown', function(pointer){
            selectedTile = 3
            selectedLayer = 2
        })

    var mountainButton = this.add.sprite(80,216,'buttons','mountainbutton0.png')
        mountainButton.setInteractive()
        mountainButton.setScrollFactor(0);
        mountainButton.on('pointerdown', function(pointer){
            selectedTile = 5
            selectedLayer = 2
        })
    var riverButton = this.add.sprite(80,258,'buttons','riverbutton0.png','riverbuttonpush.png');
        riverButton.setInteractive()
        riverButton.on('pointerdown', function(pointer){
            brushSize = 1
            selectedTile = 8;
            selectedLayer = 1;
            marker.clear();
       marker.strokeRect(0,0, brushSize * map.tileWidth, brushSize * map.tileHeight);
        })

editorGUI.add([menuButton,eraserButton,forestButton,mountainButton,riverButton])
    
} 
