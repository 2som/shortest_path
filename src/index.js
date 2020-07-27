import * as ui from './user_interface.js'
import {Board} from './board.js'

const SETTINGS = {
    canvas: document.getElementById('canvas'),
    dimensions: 20,
}
SETTINGS.rect_width = Math.floor(SETTINGS.canvas.width / SETTINGS.dimensions)
SETTINGS.rect_height = Math.floor(SETTINGS.canvas.height / SETTINGS.dimensions)

function main(){
    let rectangles = ui.create_rectangles(SETTINGS) //create empty canvas board
    ui.draw(rectangles, SETTINGS)

    SETTINGS.canvas.addEventListener('click', (e) => { //if canvas element is clicked, place an obstacle
        if (SETTINGS.canvas.classList.contains('disabled')) {return}
        ui.place_obstacle(e, rectangles, SETTINGS )
        ui.draw(rectangles, SETTINGS);
    })  
    
    document.getElementById('clear').addEventListener('click', (e) =>{ //reset the canvas board
        rectangles = ui.create_rectangles(SETTINGS)
        ui.draw(rectangles, SETTINGS)
        SETTINGS.canvas.classList.remove('disabled');
       
    })
    
    document.getElementById('solve').addEventListener('click', (e) => {
        const board = new Board(rectangles, SETTINGS.dimensions)
        board.solve()
        SETTINGS.canvas.classList.add('disabled');
        if(board.is_solved){
            ui.draw(board.graphic_representation, SETTINGS)
        }
        else{
            alert('There is no valid path')
            document.getElementById('clear').click();
        }
    })
}
main()