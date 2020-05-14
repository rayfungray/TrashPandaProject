import {getRandEl} from './utils'
import Item from './Item'
export default class TrashCan{
    constructor(location){
        this.location = location;
        this.imgPath = 'https://friendlystock.com/wp-content/uploads/2018/04/6-garbage-monster-cartoon-clipart.jpg';
        this.turnsTilFresh = 0;
    }

    freshen(){
        if(this.turnsTilFresh !== 0){
            this.turnsTilFresh--;
        }        
    }
    //try to get item from trashCan
    tryYield(){
        if(this.turnsTilFresh){
            return null;
        }
        const ingredients = {bread: ['barley', 'wheat', 'focaccia'],
        meat: ['ham', 'tofurkey', 'gator'],
        condiment: ['mayo', 'mustard', 'tobasco'],
        greens: ['lettuce', 'spinach', 'benjamins'],
        veggies:['tomato', 'carrot', 'onion'],
        cheese:['bleu', 'cheddar', 'munster']
    };
    const randType = getRandEl(Object.keys(ingredients));
    const randIngredient = getRandEl(ingredients[randType]);

    const newItem = new Item(randType, randIngredient);
    this.turnsTilFresh = 10;
    return newItem;
    }
  
} 