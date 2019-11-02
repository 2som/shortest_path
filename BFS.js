let direction_row = [-1, +1, 0, 0]  
let direction_column = [0, 0 , +1 , -1]

function enqueue(obj, array){
    // push node at the end of queue
    array.push(obj)
}
function dequeue(array){
    // return node from beggining of queue
    let value = array.shift()
    if (value == null){
        return -1
    }
    return value
}

function explore_neighbours(column, row, visited, array, queue, prev, dimensions){
    /* checks if neighboring rows are reachable, if yes -> place them on queue*/
    
    for(let i = 0; i< 4; i++){
        let next_row = row + direction_row[i]
        let next_column = column+ direction_column[i]
        
        if (next_row < 0 || next_row >= dimensions){
            continue    
        }
        if (next_column < 0 || next_column >= dimensions){
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

function reconstruct_path(node, prev){
    /*reconstructing path by looking for parent element of each node, 
    if node has no parent it means that this is statring point */
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

function solve(array, starting_column, starting_row, dimensions, finish_column, finish_row){
    // applying BFS algorythm 
    
    let queue = []
    let prev = {} //object for reconstructing path 
    let reached_end = false;
    let visited = array.map(element => { //checks if current row was visited 
        return element.map(
            row => false
        )
    }) 
    enqueue([starting_column, starting_row], queue) //add first node to queue

    visited[starting_column][starting_row] = true //mark it as visited
    prev[`${starting_column}${starting_row}`] = {
        parent: null,                               //starting node has no parent element
    }
    
    while (queue){
        let value = dequeue(queue)
        if (value == -1){
            break
        }
        let [column, row] = value
        if (array[column][row] == 'f'){
            reached_end = true;
            break
        }
        explore_neighbours(column, row, visited, array, queue, prev, dimensions)
    }
    if(reached_end){
        return reconstruct_path([`${finish_column}${finish_row}`], prev)
    }
    return -1
}


export function BFS(board, starting_column, starting_row, dimensions, finish_column, finish_row){
    //if path exist function returns it otherwise return -1
    let path = solve(board, starting_column, starting_row, dimensions, finish_column, finish_row)
    if (path == -1){
        return -1
    }
    return path
}

