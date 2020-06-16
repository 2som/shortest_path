export class Board {
    // constructor takes canvas graphic representation and creates multidimensional array from it.
    constructor(graphic_representation, dimensions){
        this.graphic_representation = graphic_representation
        this.starting_coords = {x:0, y:0}
        this.finish_cords = {x: dimensions -1, y: dimensions -1}
        this.board = this.create_board(graphic_representation, dimensions)
        this.is_solved = false;
    }
    
    get_path(order){
          /*reconstructing path by looking for parent element of each node, 
          if node has no parent it means that this is a statring point */
        const path = []
        let node = Object.keys(order).pop();
        while(true){
            path.unshift(node)
            node = order[node].parent
            if (order[node].parent == null){
                path.unshift(node)
                break
            }
        }
        for (let value of path){
            let[row, col] = value.split(':');
            this.graphic_representation[`${row}:${col}`].symbol = 'p';
            this.board[row][col] = 'p'
        }
        return this.graphic_representation
    }
    
    solve(){ //aplying BFS 
        const maze = [...this.board];
        const queue = [{x:0, y:0}]
        const order = {   //object for reconstructing path 
            '0:0' : {parent : null} 
        }
        const dimensions = maze.length - 1;

        while(queue.length){
            let node = queue.shift();
            let row = node.x;
            let col = node.y;
           
            if(row == dimensions && col == dimensions){ //if path exist return it
                this.is_solved = true; 
                return this.get_path(order);
            }
            
            maze[row][col] = '#';
            
            [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]]   /* checks if neighboring rows are reachable, if yes -> place them on queue*/
            .forEach(([next_row, next_col]) => {
                if (maze[next_row] && maze[next_row][next_col] && maze[next_row][next_col] != '#'){
                    queue.push({x: next_row, y: next_col})
                    maze[next_row][next_col] = '#';
                    order[`${next_row}:${next_col}`] = {
                        parent: `${row}:${col}`
                    }
                }
            })
        }
    }

    create_board(graphic_representation, dimensions){
        //return dimensions x dimensions array 
        let board = []
        for ( let i = 0; i<dimensions; i++ ){
            let row = []
            for (let j = 0; j<dimensions; j++){
                row.push(graphic_representation[`${i}:${j}`].symbol)
            }
            board.push(row)
        }
        return board
    }

}
