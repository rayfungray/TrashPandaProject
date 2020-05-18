export default class Item{
    constructor(type, name){
        const validTypes = ['bread','meat','condiment','greens','veggies','cheese'];
        if(!(validTypes.includes(type))){
            throw('INVALID TYPE:', type);
        }
        this.type = type;
        this.name = name;
    }
}