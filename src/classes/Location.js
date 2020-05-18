export default
class Location{
    constructor(x , y){
        this.x = +x;
        this.y = +y;
    }
    equals(loc){
        return loc.x === this.x && loc.y === this.y;
    }

    isAdjacentTo(loc){
        //if loc x & y are both only differnet from our x,y by 1 or 0, then it's adjacent
        // const tooFarX = Math.abs(this.x - loc.x) > 1;
        // const tooFarY = Math.abs(this.y - loc.y) > 1;
        // return !(tooFarX || tooFarY);
        if(Math.abs(this.x - loc.x) > 1 || Math.abs(this.y - loc.y) > 1){
            return false;
        }
    }
}