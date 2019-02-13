

function dynamicEditing(){
//dynamic terrain editing (water becoming beach etc)

//Checks for water, is used to detect if a bridge needs to be put down. Bridges should only go up or down and allways straight
 var editTerrain =  terrainLayer.getTileAt(marker.x,marker.y );
 
// Road Dynamic detection, checks if selectedTile is road
 if (selectedTile == 24 && this.input.mousePointer.isDown && input == 1 ) {
      //8bit Bitmasking
       

      //This removes the tile on objectLayer to make way for the road

      //check for a tile on object layer, 
      //if there's a tile on objectlayer, remove it
      //execute function
  var isThere = objectLayer.hasTileAt(marker.x, marker.y)

  if (isThere == true){
   objectLayer.putTileAt(-1, marker.x, marker.y);
  }


function roadEditing(tile){

//This variable checks wether or not there is a tile
var isThereATile = buildingLayer.hasTileAt (tile.x, tile.y);

//if there is a tile, then it checks all cardinal directions and their diagonals and returns a boolean
if(isThereATile == true){

//Bitvalue contains an integer that is the sum of the result of the boolean checks 
var bitValue;

interestingTile = buildingLayer.getTileAt(tile.x,tile.y);
//Here we create variables that contains a boolean defining wether or not there is a tile
// Tile itself
var onHasTile = buildingLayer.hasTileAt (interestingTile.x, interestingTile.y);
//North Tile
var upHasTile = buildingLayer.hasTileAt (interestingTile.x, interestingTile.y-1);
//North East
var upRightHasTile = buildingLayer.hasTileAt (interestingTile.x+1, interestingTile.y-1);
//North West
var upLeftHasTile = buildingLayer.hasTileAt (interestingTile.x-1, interestingTile.y-1);
//East
var rightHasTile = buildingLayer.hasTileAt (interestingTile.x+1, interestingTile.y);
//West
var leftHasTile = buildingLayer.hasTileAt (interestingTile.x-1, interestingTile.y);
//South
var downHasTile = buildingLayer.hasTileAt (interestingTile.x, interestingTile.y+1);
//South East
var downRightHasTile = buildingLayer.hasTileAt (interestingTile.x+1, interestingTile.y+1);
//South West
var downLeftHasTile = buildingLayer.hasTileAt (interestingTile.x-1, interestingTile.y+1);

//Giving booleans some bit values

    //North
    if (onHasTile == true){
      onHasTile = 1;
    }
    else { onHasTile = 0};

    //North West
    if (upLeftHasTile == true && upHasTile == true && leftHasTile == true){
      upLeftHasTile = 1;
    }
    else { upLeftHasTile = 0};

    //North East
    if (upRightHasTile == true && upHasTile == true && rightHasTile == true){
      upRightHasTile = 1;
    }
    else { upRightHasTile = 0};

    //North
    if (upHasTile == true){
      upHasTile = 1;
    }
    else { upHasTile = 0};

    //East
    if (rightHasTile == true){
      rightHasTile = 1;
    }
    else { rightHasTile = 0};

    //South
    if (downHasTile == true){
      downHasTile = 1;
    }
    else { downHasTile = 0};

    //South East
    if (downRightHasTile == true && downHasTile == true && rightHasTile == true){
      downRightHasTile = 1;
    }
    else { downRightHasTile = 0};
    //south West
    if (downLeftHasTile == true && downHasTile == true && leftHasTile == true){
      downLeftHasTile = 1;
    }
    else { downLeftHasTile = 0};


// these are the corresponding bit values
var upLeftValue = 1;
var upValue = 2;
var upRightValue = 4;
var leftValue = 8;
var rightValue = 16;
var downLeftValue = 32;
var downValue = 64;
var downRightValue = 128;
var onValue = 0;

//Adding up all bitvalues
bitValue = upLeftValue*upLeftHasTile+upValue*upHasTile+upRightValue*upRightHasTile+leftValue*leftHasTile+rightValue*rightHasTile+downLeftValue*downLeftHasTile+downRightValue*downRightHasTile+downValue*downHasTile+onValue*onHasTile;
//console.log(bitValue);


//these are all the possible results for the checks.

//no Road, 
if (bitValue == 0){
  buildingLayer.putTileAt(24, interestingTile.x, interestingTile.y);
};
// If above has tile
if (bitValue == 2){
  buildingLayer.putTileAt(25, interestingTile.x, interestingTile.y);
};
// If left has tile
if (bitValue == 8){
  buildingLayer.putTileAt(24, interestingTile.x, interestingTile.y);
};
//if up and left have tile
if(bitValue == 10){
  buildingLayer.putTileAt(32, interestingTile.x, interestingTile.y)
};
//if up and left have tile
if(bitValue == 11){
  buildingLayer.putTileAt(32, interestingTile.x, interestingTile.y)
};
// If right has tile
if (bitValue == 16){
  buildingLayer.putTileAt(24, interestingTile.x, interestingTile.y);
};
//if above and right have tile
if(bitValue == 18){
  buildingLayer.putTileAt(29, interestingTile.x, interestingTile.y)
};
if (bitValue == 22){
  buildingLayer.putTileAt(29, interestingTile.x, interestingTile.y);
};
// If left and right has tile
if (bitValue == 24){
  buildingLayer.putTileAt(24, interestingTile.x, interestingTile.y);
};
//if above and right and left have tile
if(bitValue == 26){
  buildingLayer.putTileAt(28, interestingTile.x, interestingTile.y)
};
//if above and right and left have tile
if(bitValue == 27){
  buildingLayer.putTileAt(28, interestingTile.x, interestingTile.y)
};
//if above and right and left have tile
if(bitValue == 30){
  buildingLayer.putTileAt(28, interestingTile.x, interestingTile.y)
};
if(bitValue == 31){
  buildingLayer.putTileAt(28, interestingTile.x, interestingTile.y)
};
//If South
if (bitValue == 64){
  buildingLayer.putTileAt(25, interestingTile.x, interestingTile.y);
};
//if bottom and up have tile
if(bitValue == 66){
  buildingLayer.putTileAt(25, interestingTile.x, interestingTile.y)
};
//if bottom and left have tile
if(bitValue == 72){
  buildingLayer.putTileAt(30, interestingTile.x, interestingTile.y);
};
//if bottom and left  and Up have tile
if(bitValue == 74){
  buildingLayer.putTileAt(39, interestingTile.x, interestingTile.y)
};
//if bottom and right have tile
if(bitValue == 75){
  buildingLayer.putTileAt(39, interestingTile.x, interestingTile.y)
}
//if bottom and right
if(bitValue == 80){
  buildingLayer.putTileAt(31, interestingTile.x, interestingTile.y)
}
//if bottom and right  and Up have tile
if(bitValue == 82){
  buildingLayer.putTileAt(40, interestingTile.x, interestingTile.y)
}
//if bottom and right  and Up have tile
if(bitValue == 86){
  buildingLayer.putTileAt(40, interestingTile.x, interestingTile.y)
}
//if bottom and right  and Up have tile
if(bitValue == 88){
  buildingLayer.putTileAt(27, interestingTile.x, interestingTile.y)
}

//if crossroads
if(bitValue == 90){
  buildingLayer.putTileAt(26, interestingTile.x, interestingTile.y)
}
//If south and SE have a tile
if (bitValue == 91){
  buildingLayer.putTileAt(26, interestingTile.x, interestingTile.y);
 
}
//If South and SouthWest have a tile
if (bitValue == 94){
  buildingLayer.putTileAt(26, interestingTile.x, interestingTile.y);
 
}
//If South and SouthWest have a tile
if (bitValue == 95){
  buildingLayer.putTileAt(26, interestingTile.x, interestingTile.y);
 
}
//If South and SouthWest have a tile
if (bitValue == 104){
  buildingLayer.putTileAt(30, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 106){
  buildingLayer.putTileAt(39, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 107){
  buildingLayer.putTileAt(39, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 120){
  buildingLayer.putTileAt(27, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 122){
  buildingLayer.putTileAt(26, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 123){
  buildingLayer.putTileAt(26, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 126){
  buildingLayer.putTileAt(26, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 127){
  buildingLayer.putTileAt(26, interestingTile.x, interestingTile.y);
}
//If East,NE and SE have a tile
if (bitValue == 208){
  buildingLayer.putTileAt(31, interestingTile.x, interestingTile.y);
}
//If East,NE and SE have a tile
if (bitValue == 210){
  buildingLayer.putTileAt(40, interestingTile.x, interestingTile.y);
}
//If East and West have tile
if (bitValue == 214){
  buildingLayer.putTileAt(40, interestingTile.x, interestingTile.y)
}
//If south and SW have a tile
if (bitValue == 216){
  buildingLayer.putTileAt(27, interestingTile.x, interestingTile.y);
}
if (bitValue == 218){
  buildingLayer.putTileAt(26, interestingTile.x, interestingTile.y);
}
if (bitValue == 219){
  buildingLayer.putTileAt(26, interestingTile.x, interestingTile.y);
}
if (bitValue == 222){
  buildingLayer.putTileAt(26, interestingTile.x, interestingTile.y);
}
if (bitValue == 223){
  buildingLayer.putTileAt(26, interestingTile.x, interestingTile.y);
}
if (bitValue == 248){
  buildingLayer.putTileAt(27, interestingTile.x, interestingTile.y);
}
if (bitValue == 250){
  buildingLayer.putTileAt(26, interestingTile.x, interestingTile.y);
}
if (bitValue == 251){
  buildingLayer.putTileAt(26, interestingTile.x, interestingTile.y);
}
if (bitValue == 254){
  buildingLayer.putTileAt(26, interestingTile.x, interestingTile.y);
}
if (bitValue == 255){
  buildingLayer.putTileAt(26, interestingTile.x, interestingTile.y);
}


};

};

/* //Road Makes Bridge over water
      if (editTerrain.index == 0)
        {
          console.log('Bridging...')
          buildingLayer.putTileAt(14, interestingTile.x, interestingTile.y)
        }
  //Road makes bridge over river
      if (editTerrain.index == 34)
        {
          buildingLayer.putTileAt(14, interestingTile.x, interestingTile.y);
        } */
buildingLayer.forEachTile(roadEditing,marker.x/32,marker.y/32);

};


// grass Dynamic detection, checks if selectedTile is grass
 if (selectedTile == 0  && input == 1 ) {
      //8bit Bitmasking
       
//This part of the function is used for dynamic editing of grass boundaries when compared to water
function grassEditing(tile){

//This variable checks wether or not there is a tile
var isThereATile = terrainLayer.hasTileAt (tile.x, tile.y);

//if there is a tile, then it checks all cardinal directions and their diagonals and returns a boolean
if(isThereATile == true){
        //Bitvalue contains an integer that is the sum of the result of the boolean checks 
        var bitValue;
            interestingTile = terrainLayer.getTileAt(tile.x,tile.y);
//Here we create variables that contains a boolean defining wether or not there is a tile
// Tile itself
var onHasTile = terrainLayer.hasTileAt (interestingTile.x, interestingTile.y);
//North Tile
var upHasTile = terrainLayer.hasTileAt (interestingTile.x, interestingTile.y-1);
//North East
var upRightHasTile = terrainLayer.hasTileAt (interestingTile.x+1, interestingTile.y-1);
//North West
var upLeftHasTile = terrainLayer.hasTileAt (interestingTile.x-1, interestingTile.y-1);
//East
var rightHasTile = terrainLayer.hasTileAt (interestingTile.x+1, interestingTile.y);
//West
var leftHasTile = terrainLayer.hasTileAt (interestingTile.x-1, interestingTile.y);
//South
var downHasTile = terrainLayer.hasTileAt (interestingTile.x, interestingTile.y+1);
//South East
var downRightHasTile = terrainLayer.hasTileAt (interestingTile.x+1, interestingTile.y+1);
//South West
var downLeftHasTile = terrainLayer.hasTileAt (interestingTile.x-1, interestingTile.y+1);

//Giving booleans some bit values

    //North
    if (onHasTile == true){
      onHasTile = 1;
    }
    else { onHasTile = 0};

    //North West
    if (upLeftHasTile == true && upHasTile == true && leftHasTile == true){
      upLeftHasTile = 1;
    }
    else { upLeftHasTile = 0};

    //North East
    if (upRightHasTile == true && upHasTile == true && rightHasTile == true){
      upRightHasTile = 1;
    }
    else { upRightHasTile = 0};

    //North
    if (upHasTile == true){
      upHasTile = 1;
    }
    else { upHasTile = 0};

    //East
    if (rightHasTile == true){
      rightHasTile = 1;
    }
    else { rightHasTile = 0};

    //South
    if (downHasTile == true){
      downHasTile = 1;
    }
    else { downHasTile = 0};

    //South East
    if (downRightHasTile == true && downHasTile == true && rightHasTile == true){
      downRightHasTile = 1;
    }
    else { downRightHasTile = 0};
    //south West
    if (downLeftHasTile == true && downHasTile == true && leftHasTile == true){
      downLeftHasTile = 1;
    }
    else { downLeftHasTile = 0};


// these are the corresponding bit values
var upLeftValue = 1;
var upValue = 2;
var upRightValue = 4;
var leftValue = 8;
var rightValue = 16;
var downLeftValue = 32;
var downValue = 64;
var downRightValue = 128;
var onValue = 0;

//Adding up all bitvalues
bitValue = upLeftValue*upLeftHasTile+upValue*upHasTile+upRightValue*upRightHasTile+leftValue*leftHasTile+rightValue*rightHasTile+downLeftValue*downLeftHasTile+downRightValue*downRightHasTile+downValue*downHasTile+onValue*onHasTile;
//console.log(bitValue);


//these are all the possible results for the checks.

//no Road, 
if (bitValue == 0){
  terrainLayer.putTileAt(47, interestingTile.x, interestingTile.y);
};
// If above has tile
if (bitValue == 2){
  terrainLayer.putTileAt(1, interestingTile.x, interestingTile.y);
};
// If left has tile
if (bitValue == 8){
  terrainLayer.putTileAt(2, interestingTile.x, interestingTile.y);
};
//if up and left have tile
if(bitValue == 10){
  terrainLayer.putTileAt(3, interestingTile.x, interestingTile.y)
};
//if up and left have tile
if(bitValue == 11){
  terrainLayer.putTileAt(4, interestingTile.x, interestingTile.y)
};
// If right has tile
if (bitValue == 16){
  terrainLayer.putTileAt(5, interestingTile.x, interestingTile.y);
};
//if above and right have tile
if(bitValue == 18){
  terrainLayer.putTileAt(6, interestingTile.x, interestingTile.y)
};
if (bitValue == 22){
  terrainLayer.putTileAt(7, interestingTile.x, interestingTile.y);
};
// If left and right has tile
if (bitValue == 24){
  terrainLayer.putTileAt(8, interestingTile.x, interestingTile.y);
};
//if above and right and left have tile
if(bitValue == 26){
  terrainLayer.putTileAt(9, interestingTile.x, interestingTile.y)
};
//if above and right and left have tile
if(bitValue == 27){
  terrainLayer.putTileAt(10, interestingTile.x, interestingTile.y)
};
//if above and right and left have tile
if(bitValue == 30){
  terrainLayer.putTileAt(11, interestingTile.x, interestingTile.y)
};
if(bitValue == 31){
  terrainLayer.putTileAt(12, interestingTile.x, interestingTile.y)
};
//If South
if (bitValue == 64){
  terrainLayer.putTileAt(13, interestingTile.x, interestingTile.y);
};
//if bottom and up have tile
if(bitValue == 66){
  terrainLayer.putTileAt(14, interestingTile.x, interestingTile.y)
};
//if bottom and left have tile
if(bitValue == 72){
  terrainLayer.putTileAt(15, interestingTile.x, interestingTile.y);
};
//if bottom and left  and Up have tile
if(bitValue == 74){
  terrainLayer.putTileAt(16, interestingTile.x, interestingTile.y)
};
//if bottom and right have tile
if(bitValue == 75){
  terrainLayer.putTileAt(17, interestingTile.x, interestingTile.y)
}
//if bottom and right
if(bitValue == 80){
  terrainLayer.putTileAt(18, interestingTile.x, interestingTile.y)
}
//if bottom and right  and Up have tile
if(bitValue == 82){
  terrainLayer.putTileAt(19, interestingTile.x, interestingTile.y)
}
//if bottom and right  and Up have tile
if(bitValue == 86){
  terrainLayer.putTileAt(20, interestingTile.x, interestingTile.y)
}
//if bottom and right  and Up have tile
if(bitValue == 88){
  terrainLayer.putTileAt(21, interestingTile.x, interestingTile.y)
}

//if crossroads
if(bitValue == 90){
  terrainLayer.putTileAt(22, interestingTile.x, interestingTile.y)
}
//If south and SE have a tile
if (bitValue == 91){
  terrainLayer.putTileAt(23, interestingTile.x, interestingTile.y);
 
}
//If South and SouthWest have a tile
if (bitValue == 94){
  terrainLayer.putTileAt(24, interestingTile.x, interestingTile.y);
 
}
//If South and SouthWest have a tile
if (bitValue == 95){
  terrainLayer.putTileAt(25, interestingTile.x, interestingTile.y);
 
}
//If South and SouthWest have a tile
if (bitValue == 104){
  terrainLayer.putTileAt(26, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 106){
  terrainLayer.putTileAt(27, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 107){
  terrainLayer.putTileAt(28, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 120){
  terrainLayer.putTileAt(29, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 122){
  terrainLayer.putTileAt(30, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 123){
  terrainLayer.putTileAt(31, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 126){
  terrainLayer.putTileAt(32, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 127){
  terrainLayer.putTileAt(33, interestingTile.x, interestingTile.y);
}
//If East,NE and SE have a tile
if (bitValue == 208){
  terrainLayer.putTileAt(34, interestingTile.x, interestingTile.y);
}
//If East,NE and SE have a tile
if (bitValue == 210){
  terrainLayer.putTileAt(35, interestingTile.x, interestingTile.y);
}
//If East and West have tile
if (bitValue == 214){
  terrainLayer.putTileAt(36, interestingTile.x, interestingTile.y)
}
//If south and SW have a tile
if (bitValue == 216){
  terrainLayer.putTileAt(37, interestingTile.x, interestingTile.y);
}
if (bitValue == 218){
  terrainLayer.putTileAt(38, interestingTile.x, interestingTile.y);
}
if (bitValue == 219){
  terrainLayer.putTileAt(39, interestingTile.x, interestingTile.y);
}
if (bitValue == 222){
  terrainLayer.putTileAt(40, interestingTile.x, interestingTile.y);
}
if (bitValue == 223){
  terrainLayer.putTileAt(41, interestingTile.x, interestingTile.y);
}
if (bitValue == 248){
  terrainLayer.putTileAt(42, interestingTile.x, interestingTile.y);
}
if (bitValue == 250){
  terrainLayer.putTileAt(43, interestingTile.x, interestingTile.y);
}
if (bitValue == 251){
  terrainLayer.putTileAt(44, interestingTile.x, interestingTile.y);
}
if (bitValue == 254){
  terrainLayer.putTileAt(45, interestingTile.x, interestingTile.y);
}
if (bitValue == 255){
  terrainLayer.putTileAt(46, interestingTile.x, interestingTile.y);
}


};

};

/* //Road Makes Bridge over water
      if (editTerrain.index == 0)
        {
          console.log('Bridging...')
          terrainLayer.putTileAt(14, interestingTile.x, interestingTile.y)
        }
  //Road makes bridge over river
      if (editTerrain.index == 34)
        {
          terrainLayer.putTileAt(14, interestingTile.x, interestingTile.y);
        } */
terrainLayer.forEachTile(grassEditing
);

};





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

