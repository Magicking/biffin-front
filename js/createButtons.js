BasicGame.Editor.prototype.createButtons = function (){
buttonGroup = this.add.group();
buttonGroup.x = screenWidth;
buttonGroup.y = screenHeight;

var width = buttonGroup.x
var height = buttonGroup.y;
var widthPercentage = width/100
var heightPercentage = height/100

    //Mountain
    buttonMountain = this.add.button(width- widthPercentage*5, height - heightPercentage*95, 'buttons', mountainOnClick, this, "mountainbutton0.png","mountainbuttonpush.png", "mountainbuttonpush.png");
    buttonMountain.fixedToCamera = true;
    buttonGroup.add(buttonMountain)

      function mountainOnClick () {
        currentLayer = terrainPop;
        currentTile = 5;
        }


    //Grass
    buttonGrass = this.add.button(width- widthPercentage*5, height - heightPercentage*90, 'buttons', grassOnClick, this, "grassbutton0.png","grassbutton0.png", "grassbuttonpush.png");
    buttonGrass.fixedToCamera = true;
    buttonGroup.add(buttonGrass)

      function grassOnClick () {
        currentLayer = terrain;
        currentTile = 1;
        }

      //Forest
     buttonForest = this.add.button(width- widthPercentage*5, height - heightPercentage*85, 'buttons', forestOnClick, this, "forestbutton0.png","forestbutton0.png", "forestbuttonpush.png");
        buttonForest.fixedToCamera = true;
        buttonGroup.add(buttonForest)

      function forestOnClick () {
      currentLayer = terrainPop;
      currentTile = 3;
      }

      //Road
      buttonRoad = this.add.button(width- widthPercentage*5, height - heightPercentage*80,'buttons', roadOnClick, this, "roadbutton0.png","roadbutton0.png", "roadbuttonpush.png");
        buttonRoad.fixedToCamera = true;
        buttonGroup.add(buttonRoad)

      function roadOnClick () {
      currentLayer = terrainCons;
      currentTile = 24;
      }

        //Eraser
        buttonEraser = this.add.button(width- widthPercentage*5, height - heightPercentage*75, 'buttons', eraserOnClick, this, "eraserbutton0.png","eraserbuttonpush.png", "eraserbuttonpush.png");
        buttonEraser.fixedToCamera = true;
        buttonGroup.add(buttonEraser)

        function eraserOnClick () {
        currentLayer = terrainPop;
        currentTile = 666;
        }

        //River
        buttonRiver = this.add.button(width- widthPercentage*5, height - heightPercentage*70, 'buttons', riverOnClick, this, "riverbutton0.png","riverbuttonpush.png", "riverbuttonpush.png");
        buttonRiver.fixedToCamera = true;
        buttonGroup.add(buttonRiver)

      function riverOnClick () {
        currentLayer = terrain;
        currentTile = 33;
        }

        //Passage River
        buttonPassageRiver = this.add.button(width- widthPercentage*5, height - heightPercentage*65, 'buttons', riverPassageOnClick, this, "riverpassagebutton0.png","riverpassagebuttonpush.png", "riverpassagebuttonpush.png");
        buttonPassageRiver.fixedToCamera = true;
        buttonGroup.add(buttonPassageRiver)

         function riverPassageOnClick () {
        currentLayer = terrain;
        currentTile = 35;
        }

        //Water button
        buttonWater = this.add.button(width- widthPercentage*5, height - heightPercentage*60, 'buttons', waterOnClick, this, "waterbutton0.png","waterbuttonpush.png", "waterbuttonpush.png");
        buttonWater.fixedToCamera = true;
        buttonGroup.add(buttonWater)

         function waterOnClick () {
        currentLayer = terrain;
        currentTile = 0;
        }




         //TEST
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




}