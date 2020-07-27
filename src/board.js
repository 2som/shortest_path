export class Board {
    // constructor takes canvas graphic representation and creates multidimensional array from it.
    constructor(graphic_representation, dimensions){
        this.graphic_representation = graphic_representation
        this.starting_coords = {x:0, y:0}
        this.finish_cords = {x: dimensions -1, y: dimensions -1}
        this.board = this.create_board(graphic_representation, dimensions)
        this.is_solved = false;
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
