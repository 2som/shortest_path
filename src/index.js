import Board from './board.js';
import Visualizer from './visualizer.js';
import Solver from './solver.js';

const CANVAS = document.getElementById(('canvas'));
const DIMENSIONS = 20;

const SETTINGS = {
    canvas: CANVAS,
    dimensions: DIMENSIONS,
    rect_width: Math.floor(CANVAS.width / DIMENSIONS),
    rect_height: Math.floor(CANVAS.height / DIMENSIONS)
}


class App {
    constructor(settings) {
        this.settings = settings;
        this.disabled = false;
        this.board;
        this.visualizer;
        this.solver;
        this.clear_btn = document.getElementById('clear');
        this.solve_btn = document.getElementById('solve');
        this.create()
        this.add_click_handlers()
    }
    create(){
        this.board = new Board(this.settings);
        this.visualizer = new Visualizer(this.settings, this.board.get_board());
        this.visualizer.draw_board();
    }

    add_click_handlers(){
        this.settings.canvas.addEventListener('click', (e) => this.click_board(e)) ;
        this.clear_btn.addEventListener('click', (e) => this.clear_board(e));
        this.solve_btn.addEventListener('click', (e) => this.solve_board(e));
    }

    click_board(e){
        this.disabled ? null : this.visualizer.apply_obstacle(e);
    }

    clear_board(e){
        this.board = new Board(this.settings);
        this.visualizer = new Visualizer(this.settings, this.board.get_board());
        this.visualizer.draw_board();
        this.disabled = false;
    }

    async solve_board(e){
        this.solver = new Solver(this.settings, this.board.get_board());
        this.disabled = true;
        this.solver.findPath() ? this._visualize(): alert("no valid path");
    }

    async _visualize(){
        await this.visualizer.visualize_solving(this.solver.get_visited_rectangles())
        await this.visualizer.visualize_path(this.solver.get_path())
    }
    
}

const app = new App(SETTINGS);