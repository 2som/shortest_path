// import {createMap,  dimensions} from '/map.js'
import {solve, array, number_of_rows, number_of_columns} from '/BFS.js'


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let map = array
let position_from_left = 0;
let position_from_top = 0;
let width = canvas.width;
let height = canvas.height;
let square_width = Math.floor(width / number_of_rows);
let square_height = Math.floor(height / number_of_columns);


function draw_shortest(array, path){
    
    // console.log(path)
    for (let coord of path){
        coord = coord.join('')
        // console.log(coord)
        let column = coord[0]
        let row = coord[1]
        map[column][row] = 'p'
        // console.log
            
    }
    // console.log(map)
}
function draw(){
    for (let column of map){
        // console.log(column)
        for (let row of column){
            if (row == '.' || row == 's' || row =='e'){
                ctx.fillStyle = 'white';
            }else if(row == 'p'){
                ctx.fillStyle = 'green'
                
            }else{
                ctx.fillStyle = 'grey';
            }
            ctx.fillRect(position_from_left, position_from_top, square_width, square_height);
            position_from_left += square_width;
        }
        // console.log(position_from_top);
        position_from_top += square_height;
        position_from_left = 0;
    }
}

// function validate_beatable_map(){
//     do{
//         let path = solve(array)
//     }
//     while(path != -1)
//     return path
// }

    
console.log(validate_beatable_map())
