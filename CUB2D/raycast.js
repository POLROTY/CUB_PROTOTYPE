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

    is_it_lava(x, y) {
        if (x < 0 || x > WINDOW_WIDTH || y < 0 || y > WINDOW_HEIGHT) {
            return true;
        }
        var mapGridIndexX = Math.floor(x / TILE_SIZE);
        var mapGridIndexY = Math.floor(y / TILE_SIZE);
        return this.grid[mapGridIndexY][mapGridIndexX] != 0;
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

// class to animate and update player location
class Player {
    constructor() {
        this.x = WINDOW_WIDTH / 2;
        this.y = WINDOW_HEIGHT / 2;
        this.radius = 3;
        this.turnDirection = 0; // -1 if left, +1 if right
        this.walkDirection = 0; // -1 if back, +1 if front
        this.rotationAngle = Math.PI / 2;
        this.moveSpeed = 1.0;
        this.rotationSpeed = 1 * (Math.PI / 180);
    }
    update() {
        this.rotationAngle += this.turnDirection * this.rotationSpeed;

        var moveStep = this.walkDirection * this.moveSpeed;
        var newX = (this.x + Math.cos(this.rotationAngle) * moveStep);
        var newY = (this.y + Math.sin(this.rotationAngle) * moveStep);
        if (!grid.is_it_lava(newX,newY)) {
            this.x = newX;
            this.y = newY;
        }
    }
    render() {
        noStroke();
        fill("red");
        circle(this.x, this.y, this.radius);
        stroke("red");
        line(
            this.x,
            this.y,
            this.x + Math.cos(this.rotationAngle) * 42,
            this.y + Math.sin(this.rotationAngle) * 42
        );
    }
}

var grid = new Map(); // Create a new map object
var player = new Player();

//from p5 lib for key press events
function keyPressed() {
    if (keyCode == UP_ARROW) {
        player.walkDirection = +1;
    } else if (keyCode == DOWN_ARROW) {
        player.walkDirection = -1;
    } else if (keyCode == RIGHT_ARROW) {
        player.turnDirection = +1;
    } else if (keyCode == LEFT_ARROW) {
        player.turnDirection = -1;
    }
}

//from p5 lib for key release events
function keyReleased() {
    if (keyCode == UP_ARROW) {
        player.walkDirection = 0;
    } else if (keyCode == DOWN_ARROW) {
        player.walkDirection = 0;
    } else if (keyCode == RIGHT_ARROW) {
        player.turnDirection = 0;
    } else if (keyCode == LEFT_ARROW) {
        player.turnDirection = 0;
    }
}

// This function sets up the canvas
function setup() {
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}

// This function is called before each frame is rendered and can be used to update game objects
function update() {
    player.update();
}

// This function is called on every frame to render the map on the canvas
function draw() {
    update(); // Call the update function before rendering

    grid.render(); // Call the render method on the map object to render the map on the canvas
    player.render(); // Call the render method on the player object to render the player on the canvas
}
