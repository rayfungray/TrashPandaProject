'use strict'
import {getRandNum, getRandEl} from './utils'
import Location from './Location'
import Raccoon from './Raccoon'
import Adversary from './Adversary'
import TrashCan from './Trashcan'
import Creature from './Creature'
export default class Game{
    constructor (gameId){
        this.gameId = gameId;
        this.status = 'new';
        this.turnsRemaining = 100;
        this.grid = Array(8)
        .fill(null)
        .map(el => Array(8).fill(null));


        const startingLocs = this.genStartLocs();
        this.trashCans = Array(5).fill(null).map((_,idx) => new TrashCan(startingLocs[idx]));

        this.raccoon = new Raccoon(startingLocs[5], 'Jerry');
        this.adversary = new Adversary(startingLocs[6]);

        //setting the Racoon into the grid
        this.grid[this.raccoon.location.y][this.raccoon.location.x] = this.raccoon;
        this.trashCans.forEach((tc)=> (this.grid[tc.location.y][tc.location.x] = tc));
        console.table(this.grid);
        this.populateGrid();

    }


    populateGrid(){
        const game = document.getElementById(this.gameId);
        const gridDOM = game.querySelector('.grid');
        gridDOM.innerHTML = '';
        for(let rowIdx = 0; rowIdx < 8; rowIdx++){
            const row = document.createElement('div');
            row.classList.add('row');           
            for(let colIdx = 0; colIdx < 8; colIdx++){
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = `${rowIdx}${colIdx}`;
                row.appendChild(cell);
            }
            gridDOM.appendChild(row);            
        }
    }

    genStartLocs(){
        const genLoc = () => `${getRandNum(0,7)}${getRandNum(0,7)}`;
        const randLocs = [];
        while(randLocs.length < 7){
            let randLoc = genLoc();
            if(!(randLoc in randLocs)){
                randLocs.push(randLoc);
            }
        }

        return randLocs.map(loc => new Location(loc[1], loc[0]));
    }

    isOccupied(loc){
        // if(!this.grid[loc.y][loc.x]){
        //     return false;
        // }
        //     return true;
        
        return !!this.grid[loc.y][loc.x]; 
    }

    moveTo(creat, loc){
        if(!this.isOccupied(loc)){
            const { x: oldX, y :oldY} = creat.location;
            this.grid[oldY][oldX] = null;
             //update grid
            //  this.grid[creat.location.y][creat.location.x] = null;
             this.grid[loc.location.y][loc.location.x] = creat;
             //update location
             creat.updateLocation(loc);
        }
    }

    handleMove(dir){
        if(this.status.includes(['won','lost'])){
            return;
        }else{
            this.status = 'running';
        }

        let newLoc;
        const {x,y} = this.raccoon.location;
        
        switch(dir){            
            case 'left':
                newLoc = new Location(x-1,y);
                break;
            case 'up':
                newLoc = new Location(x,y-1);
                break;
            case 'right':
                newLoc = new Location(x+1,y);
                break;
            case 'down':
                newLoc = new Location(x,y+1);
                break;
            default:
                return;
        }
        //raccoon's turn
        if(this.isValidMove(newLoc)){
            this.moveTo(this.raccoon, newLoc);
        }
        this.raccoon.rummage(this.trashCans);

        //adversary's turn
        let advMoves = 0;
        while(advMoves <= 2){
            if(this.adversary.isNextToRaccoon(this.raccoon)){
                this.adversary.robRaccoon(this.raccoon);
                break;
            }else if(advMoves < 2){
                const advMove = this.genRandAdversaryMove();
                this.moveTo(this.adversary, advMove);
            }
            advMoves++;
        }
        //freshen all trashcans
        this.trashCans.forEach(tc => tc.freshen());

        //check if Raccoon won
        const items = Object.values(this.raccoon.inventory);
        const numItems = items.filter(i => i).length;
        if(numItems === 6){
            //raccoon has won
            //alert user
            alert(`${this.raccoon.name} has won!!`);
            //change status to won
            this.status = 'won';
            return;                                  
        }
        //update turns
        this.turnsRemaining--;
        if(!this.turnsRemaining && this.status !== 'won'){
            //raccoon lost
            //alert user
            alert(`${this.raccoon.name} has LOST!!LOSER!!`);
            //update status
            this.status = 'lost';
        }
    }


    genRandAdversaryMove(){
        const validMoves = this.getValidAdversaryMoves();
        const randMove = getRandNum(validMoves);
        return randMove;
    }

    getValidAdversaryMoves(){
        const validMoves = [];
        const { x, y} = this.adversary.location;

        //loop row +1 ,0 , -1
        for(let rowIdx = y - 1; rowIdx <= y + 1; rowIdx++){
            for(let colIdx = x -1; colIdx <= x + 1; colIdx++){
                if(!this.isValidMove(new Location(colIdx, rowIdx))){
                    validMoves.push(new Location(colIdx, rowIdx));
                }                
            }
        }

        return validMoves;
    }

    isValidMove(loc){
        return this.isOnBoard(loc) && !this.isOccupied(loc);
    }

    isOnBoard(loc){
        return loc.x >= 0 && loc.x <= 7 && loc.y >=0 && loc.y <=7;
    }
}
