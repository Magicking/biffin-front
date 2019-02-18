

function dynamicEditing(){
//dynamic terrain editing (water becoming beach etc)

//Checks for water, is used to detect if a bridge needs to be put down. Bridges should only go up or down and allways straight
 
 
// Road Dynamic detection, checks if selectedTile is road
 if (selectedTile == 0 && this.input.mousePointer.isDown && input == 1 ) {
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
var isThereATile = roadLayer.hasTileAt (tile.x, tile.y);

//if there is a tile, then it checks all cardinal directions and their diagonals and returns a boolean
if(isThereATile == true){

//Bitvalue contains an integer that is the sum of the result of the boolean checks 
var bitValue;

interestingTile = roadLayer.getTileAt(tile.x,tile.y);
//Here we create variables that contains a boolean defining wether or not there is a tile
// Tile itself
var onHasTile = roadLayer.hasTileAt (interestingTile.x, interestingTile.y);
//North Tile
var upHasTile = roadLayer.hasTileAt (interestingTile.x, interestingTile.y-1);
//North East
var upRightHasTile = roadLayer.hasTileAt (interestingTile.x+1, interestingTile.y-1);
//North West
var upLeftHasTile = roadLayer.hasTileAt (interestingTile.x-1, interestingTile.y-1);
//East
var rightHasTile = roadLayer.hasTileAt (interestingTile.x+1, interestingTile.y);
//West
var leftHasTile = roadLayer.hasTileAt (interestingTile.x-1, interestingTile.y);
//South
var downHasTile = roadLayer.hasTileAt (interestingTile.x, interestingTile.y+1);
//South East
var downRightHasTile = roadLayer.hasTileAt (interestingTile.x+1, interestingTile.y+1);
//South West
var downLeftHasTile = roadLayer.hasTileAt (interestingTile.x-1, interestingTile.y+1);

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
  roadLayer.putTileAt(0, interestingTile.x, interestingTile.y);
};
// If above has tile
if (bitValue == 2){
  roadLayer.putTileAt(1, interestingTile.x, interestingTile.y);
};
// If left has tile
if (bitValue == 8){
  roadLayer.putTileAt(0, interestingTile.x, interestingTile.y);
};
//if up and left have tile
if(bitValue == 10){
  roadLayer.putTileAt(8, interestingTile.x, interestingTile.y)
};
//if up and left have tile
if(bitValue == 11){
  roadLayer.putTileAt(8, interestingTile.x, interestingTile.y)
};
// If right has tile
if (bitValue == 16){
  roadLayer.putTileAt(0, interestingTile.x, interestingTile.y);
};
//if above and right have tile
if(bitValue == 18){
  roadLayer.putTileAt(5, interestingTile.x, interestingTile.y)
};
if (bitValue == 22){
  roadLayer.putTileAt(5, interestingTile.x, interestingTile.y);
};
// If left and right has tile
if (bitValue == 24){
  roadLayer.putTileAt(0, interestingTile.x, interestingTile.y);
};
//if above and right and left have tile
if(bitValue == 26){
  roadLayer.putTileAt(4, interestingTile.x, interestingTile.y)
};
//if above and right and left have tile
if(bitValue == 27){
  roadLayer.putTileAt(4, interestingTile.x, interestingTile.y)
};
//if above and right and left have tile
if(bitValue == 30){
  roadLayer.putTileAt(4, interestingTile.x, interestingTile.y)
};
if(bitValue == 31){
  roadLayer.putTileAt(4, interestingTile.x, interestingTile.y)
};
//If South
if (bitValue == 64){
  roadLayer.putTileAt(1, interestingTile.x, interestingTile.y);
};
//if bottom and up have tile
if(bitValue == 66){
  roadLayer.putTileAt(1, interestingTile.x, interestingTile.y)
};
//if bottom and left have tile
if(bitValue == 72){
  roadLayer.putTileAt(6, interestingTile.x, interestingTile.y);
};
//if bottom and left  and Up have tile
if(bitValue == 74){
  roadLayer.putTileAt(9, interestingTile.x, interestingTile.y)
};
//if bottom and right have tile
if(bitValue == 75){
  roadLayer.putTileAt(9, interestingTile.x, interestingTile.y)
}
//if bottom and right
if(bitValue == 80){
  roadLayer.putTileAt(7, interestingTile.x, interestingTile.y)
}
//if bottom and right  and Up have tile
if(bitValue == 82){
  roadLayer.putTileAt(10, interestingTile.x, interestingTile.y)
}
//if bottom and right  and Up have tile
if(bitValue == 86){
  roadLayer.putTileAt(10, interestingTile.x, interestingTile.y)
}
//if bottom and right  and Up have tile
if(bitValue == 88){
  roadLayer.putTileAt(3, interestingTile.x, interestingTile.y)
}

//if crossroads
if(bitValue == 90){
  roadLayer.putTileAt(2, interestingTile.x, interestingTile.y)
}
//If south and SE have a tile
if (bitValue == 91){
  roadLayer.putTileAt(2, interestingTile.x, interestingTile.y);
 
}
//If South and SouthWest have a tile
if (bitValue == 94){
  roadLayer.putTileAt(2, interestingTile.x, interestingTile.y);
 
}
//If South and SouthWest have a tile
if (bitValue == 95){
  roadLayer.putTileAt(2, interestingTile.x, interestingTile.y);
 
}
//If South and SouthWest have a tile
if (bitValue == 104){
  roadLayer.putTileAt(6, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 106){
  roadLayer.putTileAt(9, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 107){
  roadLayer.putTileAt(9, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 120){
  roadLayer.putTileAt(3, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 122){
  roadLayer.putTileAt(2, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 123){
  roadLayer.putTileAt(2, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 126){
  roadLayer.putTileAt(2, interestingTile.x, interestingTile.y);
}
//If South and SouthWest have a tile
if (bitValue == 127){
  roadLayer.putTileAt(2, interestingTile.x, interestingTile.y);
}
//If East,NE and SE have a tile
if (bitValue == 208){
  roadLayer.putTileAt(7, interestingTile.x, interestingTile.y);
}
//If East,NE and SE have a tile
if (bitValue == 210){
  roadLayer.putTileAt(10, interestingTile.x, interestingTile.y);
}
//If East and West have tile
if (bitValue == 214){
  roadLayer.putTileAt(10, interestingTile.x, interestingTile.y)
}
//If south and SW have a tile
if (bitValue == 216){
  roadLayer.putTileAt(3, interestingTile.x, interestingTile.y);
}
if (bitValue == 218){
  roadLayer.putTileAt(2, interestingTile.x, interestingTile.y);
}
if (bitValue == 219){
  roadLayer.putTileAt(2, interestingTile.x, interestingTile.y);
}
if (bitValue == 222){
  roadLayer.putTileAt(2, interestingTile.x, interestingTile.y);
}
if (bitValue == 223){
  roadLayer.putTileAt(2, interestingTile.x, interestingTile.y);
}
if (bitValue == 248){
  roadLayer.putTileAt(3, interestingTile.x, interestingTile.y);
}
if (bitValue == 250){
  roadLayer.putTileAt(2, interestingTile.x, interestingTile.y);
}
if (bitValue == 251){
  roadLayer.putTileAt(2, interestingTile.x, interestingTile.y);
}
if (bitValue == 254){
  roadLayer.putTileAt(2, interestingTile.x, interestingTile.y);
}
if (bitValue == 255){
  roadLayer.putTileAt(2, interestingTile.x, interestingTile.y);
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
roadLayer.forEachTile(roadEditing);

};


// grass Dynamic detection, checks if selectedTile is grass OR if it's an eraser
 if (selectedTile == 0  && input == 1 ||selectedTile == -1 && input == 1 ) {
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
terrainLayer.forEachTile(grassEditing);

};





}//end