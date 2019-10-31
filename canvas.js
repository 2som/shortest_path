import {BFS, number_of_rows, number_of_columns} from '/BFS.js'
import {important_coords} from '/map.js'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


function draw_shortest(array, path){
    
    for (let coord of path){
        coord = coord.join('')
        // console.log(coord)
        let column = coord[0]
        let row = coord[1]
        array[column][row] = 'p'
        // console.log
        
    }
    
    return array
    // console.log(map)
}
function draw(array){
    let rects = []
    
    

    let position_from_left = 0;
    let position_from_top = 0;
    let width = canvas.width;
    let height = canvas.height;
    let square_width = Math.floor(width / number_of_rows);
    let square_height = Math.floor(height / number_of_columns);

    for (let column = 0; column<array.length; column++){
        // console.log(column)
        for (let row = 0; row< array.length; row++){
            ctx.fillStyle = 'white' 
            if (array[column][row] == '#'){
                ctx.fillStyle = 'grey'
            }
            
            ctx.strokeStyle = 'black'
            ctx.strokeRect(position_from_left, position_from_top, square_width, square_height)
            
            if (array[column][row] == 's' || array[column][row] =='f'){
                ctx.fillStyle = 'green'
            }   
            
            ctx.fillRect(position_from_left, position_from_top, square_width, square_height)
            
            position_from_left += square_width;
            
           
        }
        position_from_top += square_height;
        position_from_left = 0;
        
    }
    
}
function main(){
    const [path, array] = BFS()
    
    let solved_array = draw_shortest(array, path)
    
    
    solved_array[important_coords.start.column][important_coords.start.row] = 's'
    solved_array[important_coords.finish.column][important_coords.finish.row] = 'f'
    
    return draw(solved_array)
}
main()