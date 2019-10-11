import {createMap,  dimensions} from '/map.js'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let map = createMap(dimensions);
let position_from_left = 0;
let position_from_top = 0;
let width = canvas.width;
let height = canvas.height;
let square_width = Math.floor(width / dimensions);
let square_height = Math.floor(height / dimensions);


function draw(){
    for (let column of map){
        // console.log(column)
        for (let row of column){
            if (row == '*'){
                continue;
            }
            if (row == '1' || row == 's' || row == 'w'){
                ctx.fillStyle = 'white';
            }else{
                ctx.fillStyle = 'grey';
            }
            ctx.fillRect(position_from_left, position_from_top, square_width, square_height);
            position_from_left += square_width;
        }
        console.log(position_from_top);
        position_from_top += square_height;
        position_from_left = 0;
    }
}
draw();