import {BFS, number_of_rows, number_of_columns} from '/BFS.js'
import {important_coords} from '/map.js'
import { dimensions } from './map.js';

function main(){

const canvas = document.getElementById('canvas');
canvas.addEventListener("click", something, false)
const ctx = canvas.getContext('2d');


let position_from_left = 0;
let position_from_top = 0;
let width = canvas.width;
let height = canvas.height;
let square_width = Math.floor(width / number_of_rows);
let square_height = Math.floor(height / number_of_columns);

let rects = {}
let user_path = []
console.log(rects)

function something(e){
    // console.log(e.offsetX, e.offsetY)
    
    console.log(rects)
    for (let key of Object.keys(rects)){
        if (rects[key].active == 1 && e.offsetX >= rects[key].x && e.offsetX <= rects[key].x + square_width && e.offsetY >= rects[key].y && e.offsetY <= rects[key].y + square_height ){
            ctx.fillStyle = 'green'
            ctx.fillRect(rects[key].x, rects[key].y, square_width, square_height)
            if (user_path.includes(`${key[0]}${key[1]}` == false)){
                user_path.push([`${key[0]}${key[1]}`])
            }
            
            console.log('array after click', array)
            console.log('user path' , user_path)
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
function draw (array){
    


    

    for (let column = 0; column < dimensions; column++){
        // console.log(column)
        for (let row = 0; row < dimensions; row++){
            ctx.fillStyle = 'white' 
            rects[`${column}${row}`] = {
                x: position_from_left,
                y: position_from_top,
                symbol: array[column][row],
                active : 1
            }
            
            
            if (array[column][row] == '#'){
                ctx.fillStyle = 'grey'
                rects[`${column}${row}`].active = 0
            }
            
            ctx.strokeStyle = 'black'
            ctx.strokeRect(position_from_left, position_from_top, square_width, square_height)
            
            if (array[column][row] == 's' || array[column][row] =='f'){
               ctx.fillStyle = 'yellow'
            }
            if (array[column][row] == 'p'){
                ctx.fillStyle = 'green'
                
            }   
            
            
             
            ctx.fillRect(position_from_left, position_from_top, square_width, square_height)
            
            position_from_left += square_width;
        }
        position_from_top += square_height;
        position_from_left = 0;
    }
    
}
// function designate_path(){

// }








const [path, array] = BFS()
    // console.log(array)
    // console.log(path)
    
console.log('array from bfs', array)
console.log('path', path)
    

// let solved_array = draw_shortest(array, path)
// console.log('solved array', solved_array)

draw(array)
}
main()
