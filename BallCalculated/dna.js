function DNA(direction){
    
    this.speed = 5;
    if (direction) {
        this.direction = direction;

    } else {
        this.direction =  p5.Vector.random2D();
    }
    this.direction.mult(this.speed);

    
    
    
    this.crossover = function(partner) {
        var angle1 = Math.acos(this.direction.x/this.speed);
        if ( this.direction.y > 0) {
            angle1 = 2*Math.PI - angle1;
        }
        var angle2 = Math.acos(partner.direction.x/this.speed);
        if ( partner.direction.y > 0) {
            angle2 = 2*Math.PI - angle2;
        }
        
        var newAngle = (angle1 + angle2)/2;
        if (angle1 - angle2 > Math.PI || angle1 - angle2 < -Math.PI) {
            newAngle += Math.PI;
        }
        
        var newDir = createVector(Math.cos(newAngle),-Math.sin(newAngle));
       
        return new DNA(newDir);
    }
    
    
    
    
    this.mutation = function() {
        if (random(1) < randMutation) {
            this.direction = p5.Vector.random2D();
            this.direction.mult(this.speed);
            return true;
        }
        return false;
    }
}