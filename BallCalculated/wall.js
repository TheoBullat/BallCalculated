function Wall(start, end) {
    this.width = 10;
    
    this.show = function() {
        push();
        translate(start.x, start.y);
        var dir = createVector(end.x - start.x , end.y - start.y);
        rotate(dir.heading());
        rect(0,0,dist(start.x,start.y,end.x,end.y),this.width);
        pop();
    }
    
    this.isTouched = function(position,velocity) {
        var distA = dist(start.x,start.y,position.x,position.y);
        var distB = dist(end.x,end.y,position.x,position.y);
        var size =  dist(start.x,start.y,end.x,end.y);
        if ( distA < size && distB < size) {
            var a = (end.y - start.y) / (end.x- start.x);
            var b = start.y - (a*start.x);
            var projOrt = (abs((a*position.x) - position.y + b)) / sqrt((a*a)+1);

            if(projOrt < this.width/2) {     
                return this.createBounce(velocity);
            }
        }
    }
    
    this.createBounce = function(velocity) {
        var angleBall = Math.acos(velocity.x);
        if ( velocity.y > 0) {
            angleBall = 2*Math.PI - angleBall;
        }
        var dir = createVector(end.x - start.x , end.y - start.y);
        var angleMur = abs(dir.heading() - Math.PI);
        var newAngle = 2*(angleMur + (Math.PI/2)) - (angleBall + Math.PI);
        var newDir = createVector(Math.cos(newAngle),-Math.sin(newAngle));
        return newDir;
    }
}