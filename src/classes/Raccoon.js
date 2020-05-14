import Creature from "./Creature";

export default class Raccoon extends Creature{
    constructor(location, name = 'Meeko'){
        super(location, 'https://pbs.twimg.com/media/Di4BXlAXcAA2fme.jpg', name);
        this.inventory = {
            bread : null,
            meat : null,
            condiment : null,
            greens : null,
            veggies : null,
            cheese : null
        };
    }

    rummage(trashCans){
        const adjacentCans = trashCans.filter(tc => tc.location.isAdjacentTo(this.location));

        for(let i = 0; i < adjacentCans.length; i++){
            const newItem = adjacentCans[i].tryYield();
            if(newItem){
                this.inventory[newItem.type] = newItem;
                return;
            }
        }
    }
}