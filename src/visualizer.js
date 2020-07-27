export default class Visualizer {
    constructor(settings, board){
        this.flat_board = board.flat();
        this.ctx = settings.canvas.getContext('2d');
        this.settings = settings;
    }

    draw_board(){
        this.flat_board.forEach(rectangle => {
            this.ctx.fillStyle = 'white'
            if(rectangle.getType() == 'start' || rectangle.getType() == 'finish'){
                this.ctx.fillStyle = 'green'
            }
            this.ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            this.ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            this.ctx.strokeStyle = 'black';
        })
    }

    apply_obstacle(e){
        this.flat_board.forEach( rectangle => {
            if (e.offsetX > rectangle.x && e.offsetX < rectangle.x + rectangle.width && e.offsetY > rectangle.y && e.offsetY < rectangle.y + rectangle.height ){ 
                if(rectangle.getType() == 'finish' || rectangle.getType() == 'start'){
                    return;
                }
                if(rectangle.getType() == 'open'){
                    rectangle.setType('taken')
                    this.ctx.fillStyle = 'grey';
                }else{
                    rectangle.setType('open')
                    this.ctx.fillStyle = 'white';
                }
                this.ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
                this.ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
                this.ctx.strokeStyle = 'black';
            }
        })
    }

    async _draw_rectangle(rectangle){
        return new Promise((resolve) => {
            setTimeout( () => {
                this.ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
                this.ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
                resolve()
            }, 10)
        })
    }

    async visualize_solving(solver_board){
        const flat = solver_board.flat()
        this.ctx.fillStyle = 'GreenYellow';
        for(let rectangle of flat){
            if(rectangle.getType() === 'visited'){
                await this._draw_rectangle(rectangle)
            }
        }
    }

    async visualize_path(path){
        this.ctx.fillStyle = 'Green';
        for(let rectangle of path) {
             await this._draw_rectangle(rectangle)
        }
    }
}