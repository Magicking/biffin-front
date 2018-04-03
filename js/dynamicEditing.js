function dynamicEditing(){
//dynamic terrain editing (water becoming beach etc)



// Road Dynamic detection, checks if selectedTile is road
 if (currentTile == 24 && this.input.mousePointer.isDown && updateInput == true) {
       var bitValue;

      //This removes the tile on terrainPop to make way for the road
      terrainLayer.putTile(-1, tileX, tileY, terrainPop);

    //Road makes bridge over river
      if (editTerrain.index == 33)
        {
          terrainLayer.putTile(14, tileX, tileY, terrainCons);
        }

      //Road Makes Bridge over water
      if (editTerrain.index == 0)
        {
          terrainLayer.putTile(14, tileX, tileY, terrainCons);
        }


var onHasTile = terrainLayer.hasTile(tileX,tileY, terrainCons);
var upHasTile = terrainLayer.hasTile(tileX,tileY-1, terrainCons);
var rightHasTile = terrainLayer.hasTile(tileX+1,tileY, terrainCons);
var leftHasTile = terrainLayer.hasTile(tileX-1,tileY, terrainCons);
var downHasTile = terrainLayer.hasTile(tileX,tileY+1, terrainCons);

    if (onHasTile == true){
      onHasTile = 1;
    }
    else { onHasTile = 0}


      if (upHasTile == true){
      upHasTile = 1;
    }
    else { upHasTile = 0}


      if (rightHasTile == true){
      rightHasTile = 1;
    }
    else { rightHasTile = 0}


    if (downHasTile == true){
      downHasTile = 1;
    }
    else { downHasTile = 0}

var upValue = 1;
var leftValue = 2;
var rightValue = 4;
var downValue = 8;

bitValue = upValue*upHasTile+leftValue*leftHasTile+rightValue*rightHasTile+ downValue*downHasTile;


//no Road 
if (bitValue == 0){
  terrainLayer.putTile(24, tileX, tileY, terrainCons);
}


// If above has tile
if (bitValue == 1){
  terrainLayer.putTile(25, tileX, tileY, terrainCons);
}

// If right has tile
if (bitValue == 4){
  terrainLayer.putTile(24, tileX, tileY, terrainCons);
}

// If left has tile
if (bitValue == 2){
  terrainLayer.putTile(24, tileX, tileY, terrainCons);
}
// If left and right has tile
if (bitValue == 6){
  terrainLayer.putTile(24, tileX, tileY, terrainCons);
}

//if above and right have tile
if(bitValue == 5){
  terrainLayer.putTile(29, tileX, tileY, terrainCons)
}

//if above and right and left have tile
if(bitValue == 7){
  terrainLayer.putTile(28, tileX, tileY, terrainCons)
}
//if bottom have tile
if(bitValue == 8){
  terrainLayer.putTile(25, tileX, tileY, terrainCons)
}

//if bottom and up have tile
if(bitValue == 9){
  terrainLayer.putTile(25, tileX, tileY, terrainCons)
}

//if bottom and right have tile
if(bitValue == 12){
  terrainLayer.putTile(31, tileX, tileY, terrainCons)
}

//if bottom and left have tile
if(bitValue == 10){
  terrainLayer.putTile(30, tileX, tileY, terrainCons)
}

//if up and left have tile
if(bitValue == 3){
  terrainLayer.putTile(32, tileX, tileY, terrainCons)
}

//if bottom and left  and right have tile
if(bitValue == 14){
  terrainLayer.putTile(27, tileX, tileY, terrainCons)
}

//if bottom and left  and Up have tile
if(bitValue == 11){
  terrainLayer.putTile(39, tileX, tileY, terrainCons)
}

//if bottom and right  and Up have tile
if(bitValue == 13){
  terrainLayer.putTile(40, tileX, tileY, terrainCons)
}

//if crossroads
if(bitValue == 15){
  terrainLayer.putTile(26, tileX, tileY, terrainCons)
}


}//End of Road Editing






}//end of function 















































































//Prototype, ne pas effacer







/*
//Road Dynamics
if(currentTile == 24 && this.input.mousePointer.isDown){


      //Road makes bridge over river
      if (editTerrain.index == 33)
        {
          terrainLayer.putTile(14, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
        }

      //Road Makes Bridge over water
      if (editTerrain.index == 0)
        {
          terrainLayer.putTile(14, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
        }

      // Makes Vertical Road 
      if (editUp.index == 24 || editDown.index == 24 || editUp.index == 25 || editDown.index == 25 || editDown.index == 32)
      {
                terrainLayer.putTile(25, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
      }

// Makes Vertical Road 
      if (editUp.index == 24 || editDown.index == 24 || editUp.index == 25 || editDown.index == 25)
      {
                terrainLayer.putTile(25, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
      }


      //Makes turn from left to Up
      if (editDown.index == 24 && editDownLeft.index == 24 && editDownRight !== 24 && editRight !== 24)
      {
                terrainLayer.putTile(32, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y)+1, terrainPop);
                 terrainLayer.putTile(25, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
      }
      // And from Up to left
      if (editRight.index == 25 && editUpRight.index == 25 && editDownRight !== 24 && editRight !== 24)
      {
                terrainLayer.putTile(32, currentLayer.getTileX(marker.x)+1, currentLayer.getTileY(marker.y), terrainPop);
                 terrainLayer.putTile(25, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
      }

      //Makes turn from right to Up
      if (editDown.index == 24 && editDownRight.index == 24 && editDownRight !== 24 && editRight !== 24)
      {
                terrainLayer.putTile(29, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y)+1, terrainPop);
                 terrainLayer.putTile(25, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
      }
      // And from Up to right
      if (editLeft.index == 25 && editUpLeft.index == 25 && editDownRight !== 24 && editRight !== 24)
      {
                terrainLayer.putTile(29, currentLayer.getTileX(marker.x)-1, currentLayer.getTileY(marker.y), terrainPop);
                 terrainLayer.putTile(25, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
      }

       //Makes turn from right to bottom
      if (editUp.index == 24 && editUpRight.index == 24 && editDownRight !== 24 && editRight !== 24)
      {
                terrainLayer.putTile(31, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y)-1, terrainPop);
                 terrainLayer.putTile(25, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
      }
      // And from bottom to right
      if (editLeft.index == 25 && editDownLeft.index == 25 && editDownRight !== 24 && editRight !== 24)
      {
                terrainLayer.putTile(31, currentLayer.getTileX(marker.x)-1, currentLayer.getTileY(marker.y), terrainPop);
                 terrainLayer.putTile(24, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
      }

       //Makes turn from Left to bottom
      if (editUp.index == 24 && editUpLeft.index == 24 && editDownRight !== 24 && editRight !== 24)
      {
                terrainLayer.putTile(30, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y)-1, terrainPop);
                 terrainLayer.putTile(25, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
      }
      // And from bottom to Left
      if (editRight.index == 25 && editDownRight.index == 25 && editDownRight !== 24 && editRight !== 2)4
      {
                terrainLayer.putTile(30, currentLayer.getTileX(marker.x)+1, currentLayer.getTileY(marker.y), terrainPop);
                 terrainLayer.putTile(24, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
      }


      //checks if the road under is horizontal and adds junction and road going up
      if ( editDown.index == 24 && editRight.index !== 25 && editLeft.index !== 25 && editDown.index !== 28)
      {    
                terrainLayer.putTile(25, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
                terrainLayer.putTile(28, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y)+1, terrainPop);
      }


   */    


// End of Road dynamics

/*//road turns from up to right
if (currentTile == 24 && editUp.index == 25 && this.input.mousePointer.isDown && editRight ==24 && editLeft !== 24 && editDown !==24)
{
          terrainLayer.putTile(29, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
}

//Road turns from Up to left
if (currentTile == 24 && editUp.index == 25 && this.input.mousePointer.isDown && editLeft ==24 && editRight !== 24 && editDown !==24)
{
          terrainLayer.putTile(32, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
}

// Road Turns from bottom to right
if (currentTile == 24 && editDown.index == 25 && this.input.mousePointer.isDown && editRight ==24 && editLeft !== 24 && editUp !==24)
{
          terrainLayer.putTile(31, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
}
// Road Turns from bottom to Left
if (currentTile == 24 && editDown.index == 25 && this.input.mousePointer.isDown && editRight !==24 && editLeft == 24 && editUp !==24)
{
          terrainLayer.putTile(31, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
}
*/
/*
//straigthens road if down is horizontal
if (currentTile == 24 && editDown.index == 24 && this.input.mousePointer.isDown )
{
          terrainLayer.putTile(25, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
}
//straigthens road if UP is horizontal
if (currentTile == 24 && editUp.index == 24 && this.input.mousePointer.isDown )
{
          terrainLayer.putTile(25, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
}


//Checks if the tile is surrounded by vertical roads and horizontal roads and places crossroads
if (currentTile == 24 && editUp.index == 25 && editDown.index == 25 && editRight.index == 24 && editLeft.index == 24 && this.input.mousePointer.isDown)
{
          terrainLayer.putTile(26, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
}
*/
//ROAD JUNCTIONS
/*
//checks if the road under is horizontal and adds junction and road going up
if (currentTile == 24 && editDown.index == 24 && this.input.mousePointer.isDown && editRight.index !== 25 && editLeft.index !== 25 && editDown.index !== 28)
  {
        
          terrainLayer.putTile(25, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
          terrainLayer.putTile(28, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y)+1, terrainPop);
  }

//checks if the road over is horizontal and adds junction and road going down
if (currentTile == 24 && editUp.index == 24 && this.input.mousePointer.isDown && editRight.index !== 25 && editLeft.index !== 25 && editUp.index !== 27)
  {
        
          terrainLayer.putTile(25, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
          terrainLayer.putTile(27, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y)-1, terrainPop);
  }


//Checks if the tile is surrounded by vertical roads and horizontal roads exept at top and places toTop junction
if (currentTile == 24 && editUp.index == 25 && editDown.index == 666 && editRight.index == 24 && editLeft.index == 24 && this.input.mousePointer.isDown)
{
          terrainLayer.putTile(28, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
}



//Checks if the tile right/left is vertical road and if yes places leftjunction
if (currentTile == 24 && editRight.index == 25 && this.input.mousePointer.isDown && editUp.index !== 25 && editDown.index !== 25 && editRight.index !== 39)
  {
        
          terrainLayer.putTile(24, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
          terrainLayer.putTile(39, currentLayer.getTileX(marker.x)+1, currentLayer.getTileY(marker.y), terrainPop);
  }
  if (currentTile == 24 && editLeft.index == 25 && this.input.mousePointer.isDown && editUp.index !== 25 && editDown.index !== 25 && editDown.index !== 40)
  {
        
          terrainLayer.putTile(24, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), terrainPop);
          terrainLayer.putTile(40, currentLayer.getTileX(marker.x)-1, currentLayer.getTileY(marker.y), terrainPop);
  }

*/

