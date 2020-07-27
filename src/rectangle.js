export default class Rectangle {
    constructor(x, y, type, height, width){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.type = type;
    }

    setType(type){
        this.type = type
    }

    getType(){
        return this.type
    }
}