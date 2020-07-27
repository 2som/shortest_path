export function create_rectangles(settings_obj){
    let position_from_left = 0;
    let position_from_top = 0;
    let rects = {}
    for (let row = 0; row < settings_obj.dimensions; row++){
        for (let column = 0; column < settings_obj.dimensions; column++){
            rects[`${row}:${column}`] = {
                x: position_from_left,
                y: position_from_top,
                symbol: '.',
            }
            position_from_left += settings_obj.rect_width;

    }
    position_from_top += settings_obj.rect_height;
    position_from_left = 0;
    }
    rects['0:0'].symbol = 's';
    rects[`${settings_obj.dimensions - 1}:${settings_obj.dimensions - 1}`].symbol = 'f';
    return rects
}

export function draw(rects, settings_obj){
    const ctx = settings_obj.canvas.getContext('2d');
    for (let column = 0; column < settings_obj.dimensions; column++){
        for (let row = 0; row < settings_obj.dimensions; row++){ 
            switch (rects[`${column}:${row}`].symbol){
                case '#':
                    ctx.fillStyle = 'grey';
                    break;
                case 'p':
                    ctx.fillStyle = '#57FF5F';
                    break;
                case 's':
                case 'f':
                    ctx.fillStyle = '#19CE23';
                    break;
                default:
                    ctx.fillStyle = 'white' 
            }
            ctx.strokeStyle = 'black'
            ctx.strokeRect(rects[`${column}:${row}`].x, rects[`${column}:${row}`].y, settings_obj.rect_width, settings_obj.rect_height)   
            ctx.fillRect(rects[`${column}:${row}`].x,rects[`${column}:${row}`].y, settings_obj.rect_width, settings_obj.rect_height)    
        }
    }
}

export function place_obstacle(e, rects, settings_obj){
    /* checks coords clicked on board and compares them with coords in rects object 
        if coords are the same: function checks if obstacle is placeable (you can't place obstacle on starting and ending point) and places it */
    for (let key of Object.keys(rects)){
        if (e.offsetX >= rects[key].x && e.offsetX <= rects[key].x + settings_obj.rect_width && e.offsetY >= rects[key].y && e.offsetY <= rects[key].y + settings_obj.rect_height ){ 
            if(rects[key].symbol == 'f' || rects[key].symbol == 's'){
                break;
            }
            else if (rects[key].symbol == '.'){
                
                rects[key].symbol = '#'
            }else{
                rects[key].symbol = '.'
            }
        }
    }
}
