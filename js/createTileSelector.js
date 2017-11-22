BasicGame.Editor.prototype.createTileSelector = function() {

    //  Our tile selection window

      tileSelector = this.add.group();
        tileSelector.x = menuX-300;
        tileSelector.y = menuY-200;
        tileSelector.inputEnabled = true;
        tileSelector.visible = false;


    //  Our painting marker
    marker = this.add.graphics();
    marker.lineStyle(2, 0x000000, 1);
    marker.drawRect(0, 0, 32, 32);
    marker.alpha = 0.5

}