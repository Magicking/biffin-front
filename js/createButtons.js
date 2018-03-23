function createButtons (){
 

//Create Back to menu Button
    var menuButton = this.add.sprite(width-width+120,height-height+60,'menuButtons','editorb0.png');
        menuButton.setInteractive();
        menuButton.on('pointerdown', function(pointer){
        this.scene.start('MainMenu')
         },this)
        menuButton.setScrollFactor(0);
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



