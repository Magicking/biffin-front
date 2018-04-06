function createButtons (){
 
 var editorGUI = this.make.group()

//Create Back to menu Button
    var menuButton = this.add.sprite(width-width+120,height-height+60,'menuButtons','editorb0.png');
        menuButton.setInteractive();
        menuButton.on('pointerdown', function(pointer){
        this.scene.start('MainMenu')
         },this)
        menuButton.setScrollFactor(0);

  
    var eraserButton = this.add.sprite(width-width+80,height-height+132,'buttons','eraserbutton0.png','eraserbuttonpush.png');
        eraserButton.setInteractive();
        eraserButton.setScrollFactor(0);
        eraserButton.depth = 5
        eraserButton.on('pointerdown', function(pointer){
            selectedTile = 0
            selectedLayer = 'eraser'
        })

    var forestButton = this.add.sprite(width-width+80,height-height+174,'buttons','forestbutton0.png')
        forestButton.setInteractive();
        forestButton.depth = 5
        forestButton.setScrollFactor(0);
        forestButton.on('pointerdown', function(pointer){
            selectedTile = 3
            selectedLayer = 2
        })

    var mountainButton = this.add.sprite(width-width+80,height-height+216,'buttons','mountainbutton0.png')
        mountainButton.depth = 5
        mountainButton.setInteractive();
        mountainButton.setScrollFactor(0);
        mountainButton.on('pointerdown', function(pointer){
            selectedTile = 5
            selectedLayer = 2
        })
    editorGUI.riverButton = this.add.sprite(width-width+80,height-height+258,'buttons','riverbutton0.png','riverbuttonpush.png');
        
      
        editorGUI.depth = 5
        editorGUI.riverButton.on('pointerdown', function(pointer){
            selectedTile = 6
            selectedLayer = terrainLayer
        })


    
} 


      /*   //TEST
        buttonTest = this.add.button(width- widthPercentage*5, height - heightPercentage*20, 'buttons', testOnClick, this, "waterbutton0.png","waterbuttonpush.png", "waterbuttonpush.png");
        buttonTest.fixedToCamera = true;
        buttonTest.tint = '#4b0049'
        buttonGroup.add(buttonTest)

         function testOnClick () {
         terrainLayer.fill(1, 5,3,30,13, 'level1');
        }



    buttonGroup.onChildInputOver.add(onOver, this);
    buttonGroup.onChildInputOut.add(onOut, this);

    function onOver (buttonGroup) {

    buttonGroup.alpha = 0.7
    updateInput = false;
    
}
//changes alpha and tint on cursor hover out of the sprite
function onOut (buttonGroup) {

    buttonGroup.alpha = 1;
    updateInput = true;
}
*/