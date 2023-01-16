// Constants to define the size of the tiles, the number of rows and columns in the map, and the size of the canvas
const TILE_SIZE = 32;
const MAP_NUM_ROWS = 11;
const MAP_NUM_COLS = 15;
const WINDOW_WIDTH = MAP_NUM_COLS * TILE_SIZE; // The width of the canvas is the number of columns in the map multiplied by the size of each tile
const WINDOW_HEIGHT = MAP_NUM_ROWS * TILE_SIZE; // The height of the canvas is the number of rows in the map multiplied by the size of each tile

// Class for creating a map object
class Map {
    constructor() {
        // Initializes a 2D grid of numbers representing the map
        this.grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
    }
    // This method renders the map on the canvas
    render() {
        // This nested loop iterates through every element of the grid
        for (var i = 0; i < MAP_NUM_ROWS; i++) {
            for (var j = 0; j < MAP_NUM_COLS; j++) {
                var tileX = j * TILE_SIZE; 
                var tileY = i * TILE_SIZE;
                // The color of the tile is determined by the value of the corresponding element in the grid
                var tileColor = this.grid[i][j] == 1 ? "#420" : "#fff";
                stroke("#420");
                fill(tileColor);
                // This renders a rectangle at the appropriate location with the appropriate color
                rect(tileX, tileY, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}

var grid = new Map(); // Create a new map object

// This function sets up the canvas
function setup() {
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}

// This function is called before each frame is rendered and can be used to update game objects
function update() {
    // TODO: update all game objects before we render the next frame
}

// This function is called on every frame to render the map on the canvas
function draw() {
    update(); // Call the update function before rendering

    grid.render(); // Call the render method on the map object to render the map on the canvas
}
