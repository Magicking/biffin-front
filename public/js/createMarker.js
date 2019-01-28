// Designates which tile is selected as brush
function pickTile(sprite, pointer) {

    currentTile = this.math.snapToFloor(pointer.worldX-menuIncrementX, 32) / 32;

}



//updates the marker's position
function updateMarker() {
    marker.x = currentLayer.getTileX(this.input.activePointer.position.x)*32;
    marker.y = currentLayer.getTileY(this.input.activePointer.position.y)*32;
 
//on click, places selected tiles
    if (this.input.mousePointer.isDown && updateInput == true  && currentLayer !== terrainCons )
    {
        terrainLayer.putTile(currentTile, this.input.activePointer.position.x,this.input.activePointer.position.y, currentLayer);
        // map.fill(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), 4, 4, currentLayer);
    }
}