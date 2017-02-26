function Decor() {
    this.walls = [];
    this.wallsSize = 0;
    
    
    this.addWall = function(wall) {
        this.walls.push(wall);
        this.wallsSize++;
    }
    
    
    this.show = function() {
        for (var i = 0; i < this.wallsSize; i++){
            this.walls[i].show();
        }
    }
    
    this.collision = function(position,velocity) {
        var i = 0;
        var newVel = null;

        while ( newVel == null && i < this.wallsSize){
            newVel = this.walls[i].isTouched(position,velocity);
            i++;
        }
        
        if (newVel == null) {
            newVel = velocity;
        }
        
        return newVel;
    }
}