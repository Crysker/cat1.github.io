import GameObject from "./GameObject.js";

class Collectible extends GameObject {

    constructor(context, x, y, width, height, CONFIG) {
      super(context, x, y, width, height, CONFIG)


  
    }

    init(){

      this.image = new Image();
      this.image.src = './assets/mouse.png';
    }
     
  
    render() {

      // move canvas origin to x
      this.context.translate(this.x, this.y);
      
      this.context.drawImage(this.image,-this.width/2,-this.height/2,this.height,this.width);
      
      
      this.context.resetTransform();
    }
   } 

export default Collectible;


