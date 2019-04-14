function MapSave(){



      //Save on pressing S
 
          //This is our map's save object, it will contain all layers as objects that contain arrays containing tiles.
            var mapSave = {terrainLayer:[],
                         objectLayer:[],
                         buildingLayer:[],
                          };
         
          var terrainCallback = function(tile){

            var tmp = terrainLayer.getTileAt(tile.x,tile.y);
            if(tmp != null){
             mapSave.terrainLayer.push({index:tmp.index,
              x:tmp.x,
              y:tmp.y});}
           

          };

          var objectCallback = function(tile){

            var tmp = objectLayer.getTileAt(tile.x,tile.y);
            mapSave.objectLayer.push({index:tmp.index,
                                      x:tmp.x,
                                      y:tmp.y});

          };

          var buildingCallback = function(tile){

            var tmp = buildingLayer.getTileAt(tile.x,tile.y);
            mapSave.buildingLayer.push({index:tmp.index,x:tmp.x,y:tmp.y});

          };

          //We use the forEachTile method in order to grab every tile's index, x and y on each corresponding layer then push it to a non-circular array 
          //in order to be able to stringify the object.
          console.log('Saving layers...');

          terrainLayer.forEachTile(terrainCallback);
          objectLayer.forEachTile(objectCallback);
          buildingLayer.forEachTile(buildingCallback);
          mapSave = JSON.stringify(mapSave)
          console.log('Saved all layers.');
          console.log(mapSave)
          var fs = require('fs');
          fs.writeFile('mapSave.json', mapSave, 'utf8', callback);
          //Needed: Placing the mapSave string in a Json file.

            };
