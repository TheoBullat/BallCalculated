function Ball(dna)
{    
    this.fitness;
    if (dna) {
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }
    
    this.minDist = width*height;
    this.minCount = lifespan;
    
    this.pos = createVector(width/2,height/2);
    this.vel = this.dna.direction.copy();
    this.acc = createVector();
    this.completed = false;
    this.color = color(0,150);
    
    
    
    
    this.update = function()
    {        
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if ( d < 20) {
            this.completed = true;
            this.pos = target.copy();
        } 
        if (d < this.minDist && d != 0) {
            this.minDist = d;
            this.minCount = count;
        }

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.collision();
    }
    
    
    
    
    this.show = function() 
    {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        fill(this.color);
        ellipse(0,0,20,10);
        pop();
    }
    
    
    
    
    
    this.calcFitness = function() {
        this.fitness = (1 / this.minDist) * exp((lifespan - this.minCount)/lifespan);
        
        if (this.completed) {
            this.fitness *= 10;
        }
    }
    
    
    
    
    
    this.collision = function() {
        if (this.pos.x < 0 || this.pos.x > width){
            this.vel.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > height){
            this.vel.y *= -1;
        }
        
        this.vel.mult(1/this.dna.speed);
        this.vel = decor.collision(this.pos,this.vel);
        this.vel.mult(this.dna.speed);
    }
}