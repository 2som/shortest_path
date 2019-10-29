import {BFS, number_of_rows, number_of_columns} from '/BFS.js'
import {important_coords} from '/map.js'
import { dimensions } from './map.js';



const canvas = document.getElementById('canvas');
canvas.addEventListener("click", something, false)
const ctx = canvas.getContext('2d');
let [path, array] = BFS()
let user_path = []

// console.log(check_patchs(user_path, path))
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

// console.log('rects:', rects)

function something(e){
   
    for (let key of Object.keys(rects)){
        if (rects[key].active == 1 && e.offsetX >= rects[key].x && e.offsetX <= rects[key].x + square_width && e.offsetY >= rects[key].y && e.offsetY <= rects[key].y + square_height ){ 
            
            if(user_path.includes(key) == false){
                user_path.push(key)
                rects[key].symbol = 'p'
            }else{
                user_path.splice(user_path.indexOf(key), 1)
                rects[key].symbol = '.'
            }
        }
        else{
            continue
        }
    }
    
}
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



function play(){
    draw(rects)
    
    if(!continue_animating){
       alert('break!')
       
       path.pop()
       path.shift()
       if (!user_path){
           return false;
       }
       let raw_path = path.join(',').split(',')
       let raw_user_path = user_path.join(',').split(',')
       console.log('user',raw_user_path)
       console.log('path', raw_path)
       if(raw_user_path.length == raw_path.length && raw_user_path.every((value) => raw_path.includes(value))){
        alert('wlasciwa droga')   
        return true
       }
       else{
           alert('zle')
           return false
       }
       //    let raw
       
    
    }
    requestAnimationFrame(play)

}
draw(rects)
play()


