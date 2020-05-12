import {BFS} from './BFS.js'

function place_obstacle(e, rects, square_height, square_width, dimensions, ctx){
    /* checks coords clicked on board and compares them with coords of in rects object 
        if coords are the same function checks if obstacle is placable and places it, 
        then updates the board by evaluating draw funcion
    */
    for (let key of Object.keys(rects)){
        if (e.offsetX >= rects[key].x && e.offsetX <= rects[key].x + square_width && e.offsetY >= rects[key].y && e.offsetY <= rects[key].y + square_height ){ 
            if(rects[key].symbol == 'f' || rects[key].symbol == 's'){
                break;
            }
            else if (rects[key].symbol == '.'){
                
                rects[key].symbol = '#'
            }else{
                rects[key].symbol = '.'
            }
        }
    }
    draw(rects, square_height, square_width, dimensions, ctx);
}



function draw (rects, square_height, square_width, dimensions, ctx){
    // draws rects on canvas element
    for (let column = 0; column < dimensions; column++){
        for (let row = 0; row < dimensions; row++){
           
            ctx.fillStyle = 'white' 
            if (rects[`${column}:${row}`].symbol == '#'){
                ctx.fillStyle = 'grey'
            }
            if (rects[`${column}:${row}`].symbol == 's' || rects[`${column}:${row}`].symbol == 'f'){
               ctx.fillStyle = '#19CE23'
            }
            
            if (rects[`${column}:${row}`].symbol == 'p'){
                ctx.fillStyle = '#57FF5F'
                
            }
            ctx.strokeStyle = 'black'
            ctx.strokeRect(rects[`${column}:${row}`].x, rects[`${column}:${row}`].y, square_width, square_height)   
            ctx.fillRect(rects[`${column}:${row}`].x,rects[`${column}:${row}`].y, square_width, square_height)
        }
    }
}

function create_rects(dimensions, square_height, square_width, start_coords, finish_coords){
    //saves values of each rect on board
    let position_from_left = 0;
    let position_from_top = 0;
    let rects = {}
    for (let column = 0; column < dimensions; column++){
        for (let row = 0; row < dimensions; row++){
            rects[`${column}:${row}`] = {
                x: position_from_left,
                y: position_from_top,
                symbol: '.',
                
            }
            position_from_left += square_width;

    }
    position_from_top += square_height;
    position_from_left = 0;
}
    rects[`${start_coords.column}:${start_coords.row}`].symbol = 's'
    rects[`${finish_coords.column}:${finish_coords.row}`].symbol = 'f'

    return rects
}
function place_path(rects, path){
    //places path on copy of rects obj 
    // the first and the last element of path should be removed 
    if (path){
        path.pop()
        path.shift()
    }
    for (let node of path){
        rects[node].symbol = 'p'
        
    }
    return rects
}

function solve_board(rects, dimensions, starting_column, starting_row, finish_column, finish_row, square_height, square_width, ctx){
    let board = create_board(rects, dimensions)
    let path = BFS(board, starting_column, starting_row, dimensions, finish_column, finish_row)
    if(path == -1){
        return; 
    }else{
        let rects_copy = JSON.parse(JSON.stringify(rects))
        let solved_board = place_path(rects_copy, path)
        draw(solved_board, square_height, square_width, dimensions, ctx)
    }

}

function create_board(rects, dimensions){
    // returns dimensions x dimensions matrix
    let board = []
    for(let j = 0; j < dimensions; j++){
        let column = []
        for(let i = 0; i < dimensions; i++){
           column.push(rects[`${j}:${i}`].symbol)
        }
        board.push(column)
    }
    return board
}




function main(){
    
    const dimensions = 11;
    const start_coords = {
        column: 0,
        row: Math.floor(dimensions/2)
    }
    const finish_coords = {
        column: dimensions - 1,
        row: Math.floor(dimensions/2)
    }
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const board_width = canvas.width;
    const board_height = canvas.height;
    const square_width = Math.floor(board_width / dimensions);
    const square_height = Math.floor(board_height / dimensions);
    
    let rects = create_rects(dimensions, square_height, square_width, start_coords, finish_coords);
    
    draw(rects, square_height, square_width, dimensions, ctx);
    
    const obstacles = canvas.addEventListener("click", (e) => {place_obstacle(e, rects, square_height, square_width, dimensions, ctx)}, false);
    
    const solve = document.getElementById('solve').addEventListener('click', () => {
        solve_board(rects, dimensions, start_coords.column, 
        start_coords.row, finish_coords.column, 
        finish_coords.row, square_height, square_width, ctx)})
    
    const clear = document.getElementById('clear').addEventListener('click', function(){
        //clears board
        rects = create_rects(dimensions, square_height, square_width, start_coords, finish_coords)
        draw(rects, square_height, square_width, dimensions, ctx)
    })
}
main()

