
class Game extends Phaser.Scene{
  constructor() {
    super({key:'Game'});
  }
  

//PRELOAD <=======================================================================================================================
preload(){
 
    var spriteMap = "main"
    var textureURL = 'assets/main.png'
    var atlasURL = 'assets/main.json'
    var tileSetImage = 'terrain2'
    var grassSet = 'grass'
    this.load.atlas(spriteMap, textureURL, atlasURL);
    //loads tileset reference file

   this.load.image('grass','assets/grass.png')
    
    //loads grass and corner grass tiles
    this.load.image('grass', 'assets/grass.png'); 

    //Load tileset image
    this.load.image('terrain2', 'assets/terrain2.png'); 
  
  }
 
// CREATE<=======================================================================================================================
create(){
  console.log(mapSave)

}//End of Create
 
//UPDATE <=======================================================================================================================
update (time, delta){

     
 

}//End of Update
}//End of Class
