BasicGame.Editor.prototype.createArmy = function(){
// creates Red Army supergroup
biffinRed = this.add.group();
biffinRed.name = "Red SuperGroup";
biffinRed.inputEnableChildren = true;
biffinRed.inputEnabled = true;



    //inside biffinRed, creates "army group", and assigns properties: 
    army = this.add.group(biffinRed);
    army.spriteMap = 'main';
    army.textureURL= 'assets/main.png';
    army.name = "Red army";
    army.teamColor = 0xff0000;
    
      
    //Army Input properties
    army.inputEnableChildren = true;
    army.onChildInputOver.add(onOver, this);
    army.onChildInputOut.add(onOut, this);
    army.onChildInputDown.add(onDown, this);
     


          //inside army, create corps, that houses units array
            corps =  this.add.group(army);
            corps.name = 'Army corps';
            corps =       {units: [
                            {assetName: 'artillery0.png',
                             pos_x: 3,
                             pos_y: 3},
                            {assetName: 'artillery0.png',
                             pos_x: 4,
                             pos_y: 4},
                            {assetName: 'antiair0.png',
                             pos_x: 2,
                             pos_y: 4}
                         ]};


//create sprites inside army group using corps properties.
for (i=0; i < corps.units.length; i++) {
army.create(corps.units[i].pos_x*32,corps.units[i].pos_y*32, army.spriteMap, corps.units[i].assetName);
};


           
            //set army property "tint" to army.teamcolor.
            army.setAll('tint', army.teamColor);

    

//cosmetic elements for units on cursor input   

//changes alpha and tint on cursor hover over sprite
function onOver (sprite) {

    sprite.tint = 0x00ff00;
    sprite.alpha = 0.7
}
//changes alpha and tint on cursor hover out of the sprite
function onOut (sprite) {

    sprite.tint = army.teamColor;
    sprite.alpha = 1
}
//changes tint on cursor click on of the sprite
function onDown (sprite) {

    sprite.tint = army.teamColor;
}
 }