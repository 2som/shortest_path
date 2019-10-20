export const dimensions = 9
export const important_coords = {
    start:{
        row:   0,
        column: 0,
    },
    finish: {
        row: Math.floor(dimensions / 2),
        column: dimensions -1
    }
}


function createArray(symbol, dimensions){
    
    let array = []
    for (let i = 0; i < dimensions; i++){
        array.push([]);
        for(let j = 0; j<dimensions; j++){
            array[i].push(symbol);
        }
    }
    
    
    return array
}


function obstacles(num, array, dimensions){
    for (let i= 0; i < num; i++){
        let randomColumn = Math.floor(Math.random() * dimensions)
        let randomRow = Math.floor(Math.random() * dimensions)
        if(array[randomColumn][randomRow] == '#'){
            i--
            continue
        }
        
        array[randomColumn][randomRow] = '#'  
    }
    
}



export function createMap(dimensions){
    let map = createArray('.', dimensions)
    obstacles(40, map, dimensions)
    
    //start
    map[important_coords.start.column][important_coords.start.row] = 's'
    //finish
    map[important_coords.finish.column][important_coords.finish.row] = 'f'
    

    return map
    
}

// console.log(createMap(9))
// function finding_paths (array){


   





