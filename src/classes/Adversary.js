import Creature from "./Creature";
import { getRandEl } from "./utils";

export default class Adversary extends Creature{
    constructor(location, name = 'The Swedish Chef', movesPerTurn = 2){
        super(location, 'https://trendings.net/wp-content/uploads/2020/01/lkjhgfdxhjkghjj-h.jpg', name);
        this.movesPerTurn = movesPerTurn;
    }

    isNextToRaccoon(raccoon){
        return this.location.isAdjacentTo(raccoon.location);
    }

    robRaccoon(raccoon){
        const ingredientType = getRandEl(Object.keys(raccoon.inventory));
        const stolenIng = raccoon.inventory[ingredientType];
        if(stolenIng){
            alert(`The ${stolenIng.name} was stolen!`);
            raccoon.inventory[ingredientType] = null;
        }        
    }


    takeTurn(){
        this.isNextToRaccoon()
    }
}