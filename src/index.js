import Game from './classes/Game';
import Location from './classes/Location';

const game = new Game('game');

document.body.addEventListener('keyup', function(event){
    switch (event.keyCode) { 
        case 37: 
            console.log('Left Key pressed!');
            game.handleMove('left');
            break; 
        case 38: 
            console.log('Up Key pressed!'); 
            game.handleMove('up');
            break; 
        case 39: 
            console.log('Right Key pressed!'); 
            game.handleMove('right');
            break; 
        case 40: 
            console.log('Down Key pressed!');
            game.handleMove('down');
            break; 
    }
});



