import {createMap} from '/BFS.js'


export const array = createMap(9)


export const number_of_rows = 7
export const number_of_columns = 5

const starting_column = 0
const starting_row = 0
let end_cords = '43'

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
    return array.shift()
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
    enqueue([starting_column, starting_row],queue )

    visited[starting_column][starting_row] = true
    prev[`${starting_column}${starting_row}`] = {
        parent: null,
    }
    
    while (queue){
        let [column, row] = dequeue(queue)
        if (array[column][row] == 'e'){
            // let end_cords = [column, row]
            reached_end = true;
            break
        }
        explore_neighbours(column, row)
    }
    if(reached_end){
        console.log(prev)
        return reconstruct_path([end_cords])
    }
    return -1
}

// console.log(reconstruct_path(end_cords.join(', ')))


// console.log(prev[end_cords.join(', '). ])
// let dupa = reconstruct_path([end_cords])
// console.log(dupa)