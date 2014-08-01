// Written by Tom Hutchinson on 1/8/2014
// http://www.reddit.com/r/dailyprogrammer/comments/2c4ka3/7302014_challenge_173_intermediate_advanced/

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// initial variables
var input = "LLRR";
var steps = 20000;
var colors = ["#FFFFFF", "#FF0000", "#0099FF", "#00CC00", "#9900CC", "#996600"];
var gridHeight = 50;
var gridWidth = 50;
var cellSize = 10;
var ant = {
  x: 25,
  y: 25,
  direction: 0
};

// creates a 2d array of zeroes
var createGrid = function(width, height) {
  var grid = new Array(width);
  
  for (var ii = 0; ii < width; ii++) {
    grid[ii] = new Array(height);
    
    for (var jj = 0; jj < height; jj++) {
      grid[ii][jj] = 0;
    }
  }
  
  return grid;
};

var grid = createGrid(gridWidth, gridHeight);

var drawCell = function(x, y, color) {
  context.fillStyle = color;
  var xStart = x * cellSize;
  var yStart = y * cellSize;
  context.fillRect(xStart, yStart, cellSize, cellSize);
};

var cycleCurrentCell = function() {
  
  grid[ant.x][ant.y]++;
  
  if (grid[ant.x][ant.y] >= input.length) {
    grid[ant.x][ant.y] -= input.length;
  }
  
  drawCell(ant.x, ant.y, colors[grid[ant.x][ant.y]]);
};

var walk = function() {
  for (var ii = 0; ii < steps; ii++) {
    
    // set turn direction from current cell color
    var currentColor = grid[ant.x][ant.y];
    var turnDirection = input[currentColor];
    
    if (turnDirection === "L") {
      ant.direction--;
      if (ant.direction < 0) {
        ant.direction += 4;
      }
    }
    else if (turnDirection === "R") {
      ant.direction++;
      if (ant.direction > 3) {
        ant.direction -= 4;
      }
    }
    
    cycleCurrentCell();
    
    // move north
    if (ant.direction === 0) {
      ant.y--;
    }
    // move east
    else if (ant.direction === 1) {
      ant.x++;
    }
    // move south
    else if (ant.direction === 2) {
      ant.y++;
    }
    // move west
    else if (ant.direction === 3) {
      ant.x--;
    }
    
  }
};

walk();