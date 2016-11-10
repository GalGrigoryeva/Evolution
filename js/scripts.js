var columnsCount = 5;
var rowsCount = 4;

var cells = [];

//body reference
var body = document.getElementsByTagName("body")[0];

// create elements <table> and a <tbody>
var tbl     = document.createElement("table");
var tblBody = document.createElement("tbody");

tbl.style.background = getRandomColor();

for (var y = 0; y < rowsCount; y++) {
  // table row creation
  var row = document.createElement("tr");

  for (var x = 0; x < columnsCount; x++) {
    var cell = document.createElement("td");

    cell.style.background = getRandomColor();

    row.appendChild(cell);

    cells.push(cell);
  }

  //row added to end of table body
  tblBody.appendChild(row);
}

// append the <tbody> inside the <table>
tbl.appendChild(tblBody);
// put <table> in the <body>
body.appendChild(tbl);

function getRandomColor() {
  /*Variant from stackoverflow:
  var hex = Math.floor(Math.random() * 0xFFFFFF);
  return "#" + ("000000" + hex.toString(16)).substr(-6);*/

  /*My variant*/

  var arr = [];
  for (var i = 0; i < 3; i++) {
    arr[i] = Math.floor(256 * Math.random());
  }

  var rgbString = arr.join(", ");

  return "rgb(" + rgbString + ")";
}

function changeBGColor() {
  tbl.style.background = getRandomColor();
}

/* Parses rgb string (example "rgb(255,255,0) to array of int"*/
function parseRGB(color) {
  var rgb = color.match(/\d+/g);
  for (var i = 0; i < rgb.length; i++) {
    rgb[i] = parseInt(rgb[i]);
  }
  return rgb;
}

function getContrast(rgbA, rgbB) {
  return Math.abs((rgbA[0] - rgbB[0])) + Math.abs((rgbA[1] - rgbB[1])) + Math.abs((rgbA[2] - rgbB[2]));
}

/*Returns an integer between min and max*/
function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function copyColor(color) {
  var rgb = parseRGB(color);



  for (var i = 0; i < rgb.length; i++) {
    var ratio = document.getElementById("diapason").value;
    rgb[i] = rgb[i] + randRange(-ratio, ratio);
    rgb[i] = Math.max(rgb[i], 0);
    rgb[i] = Math.min(rgb[i], 255);
  }

  return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
}

function updateCells(cells) {
  var killCellNum = parseInt( document.getElementById("killCellNum").value );

  for (var i = 0; i < killCellNum; i++) {
    var cell = cells[i];

    var motherCellIndex = randRange(killCellNum, cells.length - 1);
    var motherCell = cells[motherCellIndex];
    console.log(killCellNum);
    console.log( cells.length - 1);
    console.log(motherCellIndex);
    console.log(motherCell);
    cell.style.background = copyColor(motherCell.style.background);
  }
}

function newPopulation() {
  var bgColor = tbl.style.background;
  var bgRGB = parseRGB(bgColor);

  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    var cellColor = cell.style.background;
    var cellRGB = parseRGB(cellColor);
    cell.contrast = getContrast(bgRGB, cellRGB);
  }

  cells.sort(function( cellA, cellB) {
    if (cellA.contrast > cellB.contrast) {
      return -1;
    } else if (cellA.contrast == cellB.contrast) {
      return 0;
    } else {
      return 1;
    }
  } );

  updateCells(cells);
}
