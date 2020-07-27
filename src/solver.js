export default class Solver{
    
    constructor(settings, rectangles){
        this.settings = settings
        this.maze = this.transform_rectangles_into_array(rectangles)
        this.order = {}
    }

    transform_rectangles_into_array(rectanlges){
        const maze = []
        for ( let i = 0; i < this.settings.dimensions; i++ ){
            let row = []
            for (let j = 0; j < this.settings.dimensions; j++){
                row.push(rectanlges[i][j])
            }
            maze.push(row)
        }
        return maze
    }
    
    findPath(){ 
        const maze = [...this.maze]
        const queue = [{x:0, y:0}]
        const order = {   
            '0:0' : {parent : null} 
        }

        while(queue.length){
            let node = queue.shift();
            let row = node.x;
            let col = node.y;
            
            if(maze[row][col].getType() === 'finish'){ 
                this.order = order
                return true
            }
            

            [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]].forEach(([next_row, next_col]) => {
                if (maze[next_row] && maze[next_row][next_col] && (maze[next_row][next_col].getType() === 'open' || maze[next_row][next_col].getType() === 'finish')){
                        queue.push({x: next_row, y: next_col})
                        if(maze[next_row][next_col].getType() !== 'finish'){
                            maze[next_row][next_col].setType('visited');
                        }
                        order[`${next_row}:${next_col}`] = {
                            parent: `${row}:${col}`
                    }
                }
            })
        }
        return false
    }

    get_visited_rectangles(){
        if(this.order.length !== 0){
            const chain = Object.keys(this.order).map(
                key => {
                    let [row, col] = key.split(':');
                    return this.maze[row][col]
                }
            )
            return chain
        }
    }

    get_path(){
      const parents_chain = []
      let node = this.order[`${this.settings.dimensions - 1}:${this.settings.dimensions - 1}`].parent
      parents_chain.unshift(node)
      while(true){
        if (!this.order[node].parent){
            parents_chain.unshift(node)
            break;
        }
        node = this.order[node].parent;
        parents_chain.unshift(node)
    }
      const path = [];
      for (let value of parents_chain){
        let[row, col] = value.split(':');
        this.maze[row][col].setType('path');
        path.push(this.maze[row][col]);
      }
      return path;
  }
}