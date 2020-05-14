'use strict'
import {getRandNum} from './utils'
import Location from './Location'
import Raccoon from './Raccoon'
import Adversary from './Adversary'
import TrashCan from './Trashcan'
import Creature from './Creature'
export default class Game{
    constructor (gameId){
        this.gameId = gameId;
        this.status = 'new';
        
        
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
            const { x: oldX, y:oldY} = creat.location;
            this.grid[oldY][oldX] = null;
             //update grid
            //  this.grid[creat.location.y][creat.location.x] = null;
             this.grid[loc.location.y][loc.location.x] = creat;
             //update location
             creat.updateLocation(loc);
        }
    }
}
