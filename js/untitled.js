var onHasTile = buildingLayer.hasTileAt(marker.x/32,marker.y/32);
var upHasTile = buildingLayer.hasTileAt(marker.x/32,marker.y/32-1);
var rightHasTile = buildingLayer.hasTileAt(marker.x/32+1,marker.y/32);
var leftHasTile = buildingLayer.hasTileAt(marker.x/32-1,marker.y/32);
var downHasTile = buildingLayer.hasTileAt(marker.x/32,marker.y/32+1);