import {BFS, number_of_rows, number_of_columns} from '/BFS.js'
import {important_coords} from '/map.js'
import { dimensions } from './map.js';



const canvas = document.getElementById('canvas');
canvas.addEventListener("click", something, false)
const ctx = canvas.getContext('2d');
const [path, array] = BFS()

let continue_animating = true;
document.getElementById('checker').addEventListener('click', stop_animating)

function stop_animating(){
    continue_animating = false;
}

let width = canvas.width;
let height = canvas.height;
let square_width = Math.floor(width / number_of_rows);
let square_height = Math.floor(height / number_of_columns);

let rects = create_rects(array)
let user_path = []
console.log('rects:', rects)

function something(e){
    // console.log(e.offsetX, e.offsetY)
    
    // console.log(rects)
    for (let key of Object.keys(rects)){
        if (rects[key].active == 1 && e.offsetX >= rects[key].x && e.offsetX <= rects[key].x + square_width && e.offsetY >= rects[key].y && e.offsetY <= rects[key].y + square_height ){ 
            // console.log(user_path.includes(`${key[0]}, ${key[1]}`))
            if(user_path.includes(`${key[0]}, ${key[1]}`) == false){
                user_path.push(`${key[0]}, ${key[1]}`)
                rects[key].symbol = 'p'
            }else{
                user_path.splice(user_path.indexOf(`${key[0]}, ${key[1]}`), 1)
                rects[key].symbol = '.'
            }
           
        }
        else{
            continue
        }
    }
    // console.log(width)
}

// function draw_shortest(array, path){
//     let new_array = [...array]
//     for (let coord of path){
//         coord = coord.join('')
//         // console.log(coord)
//         let column = coord[0]
//         let row = coord[1]
//         new_array[column][row] = 'p'
//         // console.log
        
//     }
    
//     return new_array
//     // console.log(map)
// }
function draw (rects){
    let position_from_left = 0;
    let position_from_top = 0;
    for (let column = 0; column < dimensions; column++){
        // console.log(column)
        for (let row = 0; row < dimensions; row++){
           
            ctx.fillStyle = 'white' 
            if (rects[`${column}${row}`].symbol == '#'){
                ctx.fillStyle = 'grey'
            }
            if (rects[`${column}${row}`].symbol == 's' || rects[`${column}${row}`].symbol =='f'){
               ctx.fillStyle = 'yellow'
            }
            if (rects[`${column}${row}`].symbol == 'p'){
                ctx.fillStyle = 'green'
                
            }
            ctx.strokeStyle = 'black'
            ctx.strokeRect(position_from_left, position_from_top, square_width, square_height)   
            ctx.fillRect(position_from_left, position_from_top, square_width, square_height)
            
            position_from_left += square_width;
            
        }
        
        position_from_top += square_height;
        position_from_left = 0;
    }
    
}

function create_rects(array){
    let position_from_left = 0;
    let position_from_top = 0;
    let rects = {}
    for (let column = 0; column < dimensions; column++){
        for (let row = 0; row < dimensions; row++){
            rects[`${column}${row}`] = {
                x: position_from_left,
                y: position_from_top,
                symbol: array[column][row],
                active : 1
            }
            if (array[column][row] == '#' || array[column][row] == 'f' || array[column][row] == 's'){
                
                rects[`${column}${row}`].active = 0
            }
            position_from_left += square_width;

    }
    position_from_top += square_height;
    position_from_left = 0;
}
position_from_top = 0
return rects
}
// function designate_path(){

// }


    console.log('array from BFS', array)
    // console.log(path)
    
// console.log('array from bfs', array)
// console.log('path', path)
    

// let solved_array = draw_shortest(array, path)
// console.log('solved array', solved_array)

function play(path){
    draw(rects)
    if(!continue_animating){
       alert('break!')
    }
    requestAnimationFrame(play)

}
play(path)