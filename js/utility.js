var corps = {units: [
  {assetName: 'artillery0.png',
  pos_x: 15,
  pos_y: 15},
  {assetName: 'artillery0.png',
  pos_x: 10,
  pos_y: 14},
  {assetName: 'antiair0.png',
  pos_x: 20,
  pos_y: 5}
]};

//Example saveUnits(corps); to add a map to database
function saveUnits(units) {
  data = JSON.stringify(units);
  $.ajax({
    url: "https://b.6120.eu/map",
    type: "POST",
    data: data,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: null
  })
  .fail(function() {
    console.log("Failed to post map file");
  });
}

function loadUnits(idx, f) {
  $.getJSON("https://b.6120.eu/map", function(data) {
  console.log(data);
    if (data.length <= idx) {
        console.log("Missing map");
        return;
    }
    f(data[idx].units);
  });
}
