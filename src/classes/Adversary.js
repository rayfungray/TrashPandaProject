import Creature from "./Creature";

export default class Adversary extends Creature{
    constructor(location, name = 'The Swedish Chef', movesPerTurn = 2){
        super(location, 'https://trendings.net/wp-content/uploads/2020/01/lkjhgfdxhjkghjj-h.jpg', name);
        this.movesPerTurn = movesPerTurn;
    }
}