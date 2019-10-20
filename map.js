
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
console.log(createArray(1, 10))
function walls(array){
    
}


function obstacles(num, array, dimensions){
    for (let i= 0; i < num; i++){
        let randomColumn = Math.floor(Math.random() * dimensions)
        let randomRow = Math.floor(Math.random() * dimensions)
        if (array[randomColumn][randomRow] == '*' || array[randomColumn][randomRow] == 0){
            i--;
            continue;
        }
        
        array[randomColumn][randomRow] = 0  
    }
    
}

export const dimensions = 9

export function createMap(dimensions){
    let map = createArray(1, dimensions)
    walls(map)
    obstacles(10, map, dimensions)
    
    //start
    map[dimensions - 1][Math.floor(dimensions / 2)] = 's'
    //finish
    map[0][Math.floor(dimensions / 2)] = 'w'
    

    return map
    
}

console.log(createMap(9))
// function finding_paths (array){
//    let graph = createMap(9)

   





