function Population()
{
    this.balls = [];
    this.popsize = 300;
    this.matingpool = [];
    
    for (var i = 0; i <this.popsize; i++) {
            this.balls[i] = new Ball();
    }
    
    this.evaluate = function() {
        
        var maxfit = 0;
        for (var i = 0; i < this.popsize; i++) {
            this.balls[i].calcFitness();
            if (this.balls[i].fitness > maxfit) {
                maxfit = this.balls[i].fitness;
            }
        }
        
        for (var i = 0; i < this.popsize; i++) {
            if( maxfit != 0)
                this.balls[i].fitness /= maxfit;
        }
        
        this.matingpool = [];
        
        for (var i = 0; i < this.popsize; i++) {
            var n = this.balls[i].fitness * 100;
            for (var j = 0; j < n; j++) {
                this.matingpool.push(this.balls[i].dna);
            }
        }
    }
    
    
    this.selection = function() {
        var newPopulation = [];
        for (var i = 0; i < this.balls.length; i++){
            var parentA = random(this.matingpool);
            var parentB = random(this.matingpool);
            var child = parentA.crossover(parentB); 
            var isMuted = child.mutation();
            newPopulation[i] = new Ball(child);
            if (isMuted){
                newPopulation[i].color = color(255,0,0,150);
            } else {
                newPopulation[i].color = color(0,255,255,150);
            }
        } 
        this.balls = newPopulation;
    }
    
    this.run = function() {
        for (var i = 0; i < this.popsize; i++) {
            this.balls[i].update();
            this.balls[i].show();
        }
    }
    
}