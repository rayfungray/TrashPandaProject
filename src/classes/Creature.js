import Game from './Game'
import Location from './Location'

export default class Creature{
    constructor(location, name = 'Bob', imgPath){
        this.location = location;
        this.name = name;
        this.imgPath = imgPath;
    }


    updateLocation(loc){
        this.location = loc;
    }                    
        
    
}