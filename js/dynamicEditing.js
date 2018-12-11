

function dynamicEditing(){
//dynamic terrain editing (water becoming beach etc)

 var editTerrain =  map.getTileAt(marker.x/32,marker.y/32,terrainLayer);

// Road Dynamic detection, checks if selectedTile is road
 if (selectedTile == 24 && this.input.mousePointer.isDown && input == 1) {
    
       var bitValue;

      //This removes the tile on objectLayer to make way for the road
      map.putTileAt(-1, marker.x/32, marker.y/32, objectLayer);

    //Road makes bridge over river
      if (editTerrain.index == 34)
        {

          map.putTileAt(14, marker.x/32, marker.y/32, buildingLayer);
        }

      //Road Makes Bridge over water
      if (editTerrain.index == 0)
        {
          console.log('Bridging...')
          map.putTileAt(14, marker.x, marker.y,buildingLayer);
        }


var onHasTile = map.hasTileAt(marker.x/32,marker.y/32, buildingLayer);
var upHasTile = map.hasTileAt(marker.x/32,marker.y/32-1, buildingLayer);
var rightHasTile = map.hasTileAt(marker.x/32+1,marker.y/32, buildingLayer);
var leftHasTile = map.hasTileAt(marker.x/32-1,marker.y/32, buildingLayer);
var downHasTile = map.hasTileAt(marker.x/32,marker.y/32+1, buildingLayer);

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
  map.putTileAt(24, marker.x/32, marker.y/32, buildingLayer);
}


// If above has tile
if (bitValue == 1){
  map.putTileAt(25, marker.x/32, marker.y/32, buildingLayer);
}

// If right has tile
if (bitValue == 4){
  map.putTileAt(24, marker.x/32, marker.y/32, buildingLayer);
}

// If left has tile
if (bitValue == 2){
  map.putTileAt(24, marker.x/32, marker.y/32, buildingLayer);
}
// If left and right has tile
if (bitValue == 6){
  map.putTileAt(24, marker.x/32, marker.y/32, buildingLayer);
}

//if above and right have tile
if(bitValue == 5){
  map.putTileAt(29, marker.x/32, marker.y/32, buildingLayer)
}

//if above and right and left have tile
if(bitValue == 7){
  map.putTileAt(28, marker.x/32, marker.y/32, buildingLayer)
}
//if bottom have tile
if(bitValue == 8){
  map.putTileAt(25, marker.x/32, marker.y/32, buildingLayer)
}

//if bottom and up have tile
if(bitValue == 9){
  map.putTileAt(25, marker.x/32, marker.y/32, buildingLayer)
}

//if bottom and right have tile
if(bitValue == 12){
  map.putTileAt(31, marker.x/32, marker.y/32, buildingLayer)
}

//if bottom and left have tile
if(bitValue == 10){
  map.putTileAt(30, marker.x/32, marker.y/32, buildingLayer)
}

//if up and left have tile
if(bitValue == 3){
  map.putTileAt(32, marker.x/32, marker.y/32, buildingLayer)
}

//if bottom and left  and right have tile
if(bitValue == 14){
  map.putTileAt(27, marker.x/32, marker.y/32, buildingLayer)
}

//if bottom and left  and Up have tile
if(bitValue == 11){
  map.putTileAt(39, marker.x/32, marker.y/32, buildingLayer)
}

//if bottom and right  and Up have tile
if(bitValue == 13){
  map.putTileAt(40, marker.x/32, marker.y/32, buildingLayer)
}

//if crossroads
if(bitValue == 15){
  map.putTileAt(26, marker.x/32, marker.y/32, buildingLayer)
}



}//End of Road Editing






}//end of function 















































































//Prototype, ne pas effacer







/*
//Road Dynamics
if(selectedTile == 24 && this.input.mousePointer.isDown){


      //Road makes bridge over river
      if (editTerrain.index == 33)
        {
          terrainLayer.putTileAt(14, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
        }

      //Road Makes Bridge over water
      if (editTerrain.index == 0)
        {
          terrainLayer.putTileAt(14, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
        }

      // Makes Vertical Road 
      if (editUp.index == 24 || editDown.index == 24 || editUp.index == 25 || editDown.index == 25 || editDown.index == 32)
      {
                terrainLayer.putTileAt(25, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
      }

// Makes Vertical Road 
      if (editUp.index == 24 || editDown.index == 24 || editUp.index == 25 || editDown.index == 25)
      {
                terrainLayer.putTileAt(25, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
      }


      //Makes turn from left to Up
      if (editDown.index == 24 && editDownLeft.index == 24 && editDownRight !== 24 && editRight !== 24)
      {
                terrainLayer.putTileAt(32, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y)+1, objectLayer);
                 terrainLayer.putTileAt(25, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
      }
      // And from Up to left
      if (editRight.index == 25 && editUpRight.index == 25 && editDownRight !== 24 && editRight !== 24)
      {
                terrainLayer.putTileAt(32, currentLayer.getmarker.x(marker.x)+1, currentLayer.getmarker.y(marker.y), objectLayer);
                 terrainLayer.putTileAt(25, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
      }

      //Makes turn from right to Up
      if (editDown.index == 24 && editDownRight.index == 24 && editDownRight !== 24 && editRight !== 24)
      {
                terrainLayer.putTileAt(29, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y)+1, objectLayer);
                 terrainLayer.putTileAt(25, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
      }
      // And from Up to right
      if (editLeft.index == 25 && editUpLeft.index == 25 && editDownRight !== 24 && editRight !== 24)
      {
                terrainLayer.putTileAt(29, currentLayer.getmarker.x(marker.x)-1, currentLayer.getmarker.y(marker.y), objectLayer);
                 terrainLayer.putTileAt(25, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
      }

       //Makes turn from right to bottom
      if (editUp.index == 24 && editUpRight.index == 24 && editDownRight !== 24 && editRight !== 24)
      {
                terrainLayer.putTileAt(31, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y)-1, objectLayer);
                 terrainLayer.putTileAt(25, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
      }
      // And from bottom to right
      if (editLeft.index == 25 && editDownLeft.index == 25 && editDownRight !== 24 && editRight !== 24)
      {
                terrainLayer.putTileAt(31, currentLayer.getmarker.x(marker.x)-1, currentLayer.getmarker.y(marker.y), objectLayer);
                 terrainLayer.putTileAt(24, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
      }

       //Makes turn from Left to bottom
      if (editUp.index == 24 && editUpLeft.index == 24 && editDownRight !== 24 && editRight !== 24)
      {
                terrainLayer.putTileAt(30, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y)-1, objectLayer);
                 terrainLayer.putTileAt(25, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
      }
      // And from bottom to Left
      if (editRight.index == 25 && editDownRight.index == 25 && editDownRight !== 24 && editRight !== 2)4
      {
                terrainLayer.putTileAt(30, currentLayer.getmarker.x(marker.x)+1, currentLayer.getmarker.y(marker.y), objectLayer);
                 terrainLayer.putTileAt(24, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
      }


      //checks if the road under is horizontal and adds junction and road going up
      if ( editDown.index == 24 && editRight.index !== 25 && editLeft.index !== 25 && editDown.index !== 28)
      {    
                terrainLayer.putTileAt(25, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
                terrainLayer.putTileAt(28, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y)+1, objectLayer);
      }


   */    


// End of Road dynamics

/*//road turns from up to right
if (selectedTile == 24 && editUp.index == 25 && this.input.mousePointer.isDown && editRight ==24 && editLeft !== 24 && editDown !==24)
{
          terrainLayer.putTileAt(29, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
}

//Road turns from Up to left
if (selectedTile == 24 && editUp.index == 25 && this.input.mousePointer.isDown && editLeft ==24 && editRight !== 24 && editDown !==24)
{
          terrainLayer.putTileAt(32, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
}

// Road Turns from bottom to right
if (selectedTile == 24 && editDown.index == 25 && this.input.mousePointer.isDown && editRight ==24 && editLeft !== 24 && editUp !==24)
{
          terrainLayer.putTileAt(31, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
}
// Road Turns from bottom to Left
if (selectedTile == 24 && editDown.index == 25 && this.input.mousePointer.isDown && editRight !==24 && editLeft == 24 && editUp !==24)
{
          terrainLayer.putTileAt(31, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
}
*/
/*
//straigthens road if down is horizontal
if (selectedTile == 24 && editDown.index == 24 && this.input.mousePointer.isDown )
{
          terrainLayer.putTileAt(25, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
}
//straigthens road if UP is horizontal
if (selectedTile == 24 && editUp.index == 24 && this.input.mousePointer.isDown )
{
          terrainLayer.putTileAt(25, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
}


//Checks if the tile is surrounded by vertical roads and horizontal roads and places crossroads
if (selectedTile == 24 && editUp.index == 25 && editDown.index == 25 && editRight.index == 24 && editLeft.index == 24 && this.input.mousePointer.isDown)
{
          terrainLayer.putTileAt(26, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
}
*/
//ROAD JUNCTIONS
/*
//checks if the road under is horizontal and adds junction and road going up
if (selectedTile == 24 && editDown.index == 24 && this.input.mousePointer.isDown && editRight.index !== 25 && editLeft.index !== 25 && editDown.index !== 28)
  {
        
          terrainLayer.putTileAt(25, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
          terrainLayer.putTileAt(28, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y)+1, objectLayer);
  }

//checks if the road over is horizontal and adds junction and road going down
if (selectedTile == 24 && editUp.index == 24 && this.input.mousePointer.isDown && editRight.index !== 25 && editLeft.index !== 25 && editUp.index !== 27)
  {
        
          terrainLayer.putTileAt(25, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
          terrainLayer.putTileAt(27, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y)-1, objectLayer);
  }


//Checks if the tile is surrounded by vertical roads and horizontal roads exept at top and places toTop junction
if (selectedTile == 24 && editUp.index == 25 && editDown.index == 666 && editRight.index == 24 && editLeft.index == 24 && this.input.mousePointer.isDown)
{
          terrainLayer.putTileAt(28, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
}



//Checks if the tile right/left is vertical road and if yes places leftjunction
if (selectedTile == 24 && editRight.index == 25 && this.input.mousePointer.isDown && editUp.index !== 25 && editDown.index !== 25 && editRight.index !== 39)
  {
        
          terrainLayer.putTileAt(24, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
          terrainLayer.putTileAt(39, currentLayer.getmarker.x(marker.x)+1, currentLayer.getmarker.y(marker.y), objectLayer);
  }
  if (selectedTile == 24 && editLeft.index == 25 && this.input.mousePointer.isDown && editUp.index !== 25 && editDown.index !== 25 && editDown.index !== 40)
  {
        
          terrainLayer.putTileAt(24, currentLayer.getmarker.x(marker.x), currentLayer.getmarker.y(marker.y), objectLayer);
          terrainLayer.putTileAt(40, currentLayer.getmarker.x(marker.x)-1, currentLayer.getmarker.y(marker.y), objectLayer);
  }

*/

