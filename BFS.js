import {createMap, dimensions, important_coords} from '/map.js'


export const array = createMap(dimensions)

export const number_of_rows = dimensions
export const number_of_columns = dimensions

const starting_column = important_coords.start.column
const starting_row = important_coords.start.row
let end_cords = `${important_coords.finish.column}${important_coords.finish.row}`

let queue = []
let prev = {
    
}
let visited = array.map(element => {
    return element.map(
        row => false
    )
})

//directions
let direction_row = [-1, +1, 0, 0]
let direction_column = [0, 0 , +1 , -1]


function enqueue(obj, array){
    array.push(obj)
}
function dequeue(array){
    let value = array.shift()
    if (value == null){
        return -1
    }
    return value
}

function explore_neighbours(column, row){
    
    for(let i = 0; i< 4; i++){
        let next_row = row + direction_row[i]
        let next_column = column+ direction_column[i]
        
        if (next_row < 0 || next_row >= number_of_rows){
            continue    
        }
        if (next_column < 0 || next_column >= number_of_columns){
            continue
        }
        if (visited[next_column][next_row]){
            continue
        }
        if(array[next_column][next_row] == '#'){
            continue
        }
        enqueue([next_column, next_row], queue)
        visited[next_column][next_row] = true
        
        prev[`${next_column}${next_row}`] = {
            parent: [`${column}${row}`]
        }
    }
}

function reconstruct_path(node){
    let path = []
    console.log(node)
    while(true){
        path.unshift(node)
        node = prev[node].parent
        if (prev[node].parent == null){
            path.unshift(node)
            break
        }
    }
   return path
}

export function solve(array){
    let reached_end = false;
    enqueue([starting_column, starting_row], queue)

    visited[starting_column][starting_row] = true
    prev[`${starting_column}${starting_row}`] = {
        parent: null,
    }
    
    while (queue){
        
        let value = dequeue(queue)
        if (value == -1){
            break
        }
        let [column, row] = value
        
        
        if (array[column][row] == 'f'){
            // let end_cords = [column, row]
            reached_end = true;
            break
        }
        explore_neighbours(column, row)
    }
    if(reached_end){
        // console.log(prev)
        return reconstruct_path([end_cords])
    }
    return -1
}

// console.log(reconstruct_path(end_cords.join(', ')))


// console.log(prev[end_cords.join(', '). ])
// let dupa = reconstruct_path([end_cords])
// console.log(dupa)