var population;
var lifeP;
var target;
var lifespan = 300;
var randMutation = 0.01;
var count;
var startPosition;
var decor;
var wallTmp

function setup() {
    createCanvas(550, 550);
    population = new Population();
    target = createVector(width/2, height/2);
    decor = new Decor();
    count = 0;
}

function draw() {
    background(120);
    population.run();
    decor.show();
    if (wallTmp != null)
        wallTmp.show();
    text(count,10,10);
    if (count == lifespan) {
        population.evaluate();
        population.selection();
        count = 0;
    }
    target = createVector(mouseX, mouseY);
    ellipse(target.x,target.y,15,15);
    count++;
}

function mouseWheel() {
    population = new Population();
    count = 0;
}

function mousePressed() {
    startPosition = createVector(mouseX, mouseY);
}

function mouseDragged() {
    var endPosition = createVector(mouseX, mouseY);
    wallTmp = new Wall(startPosition,endPosition);
   
}

function mouseReleased() {
    var endPosition = createVector(mouseX, mouseY);
    if ( endPosition.x != startPosition.x && endPosition.y != startPosition.y ) {
        decor.addWall(new Wall(startPosition,endPosition));
    }
}
