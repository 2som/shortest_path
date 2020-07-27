import Rectangle from './rectangle.js'

export default class Board {
    constructor(settings){
        this.settings = settings
        this.starting_coords = {x:0, y:0}
        this.finish_cords = {x: this.settings.dimensions -1, y: this.settings.dimensions -1}
        this.board = this.create()
    }

    create(){
        let position_from_left = 0;
        let position_from_top = 0;
        const board = []
        for (let row = 0; row < this.settings.dimensions; row++){
            let current_row = []
            for (let column = 0; column < this.settings.dimensions; column++){
                current_row.push(new Rectangle(position_from_left, position_from_top, 'open', this.settings.rect_height, this.settings.rect_width))
                position_from_left += this.settings.rect_width;
            }
            board.push(current_row)
            position_from_top += this.settings.rect_height;
            position_from_left = 0;
        }
        board[this.starting_coords.x][this.starting_coords.y].setType('start')
        board[this.finish_cords.x][this.finish_cords.y].setType('finish')
        return board
    }

    get_board(){
        return this.board
    }
}
