

import GameObject from "./GameObject.js";
class Player extends GameObject {

  constructor(context, x, y, width, height, CONFIG) {
    super(context, x, y, width, height, CONFIG)

    this.dx = 0;
    this.dy = 0;
    this.currentKeys = {};
    this.velocity = 0.5;
    this.lastDirection = 1;
    this.state = "idle";

    this.init();
  }

  init() {
    // listen for keydown event
    document.addEventListener('keydown', (event) => {

      // event.preventDefault() will prevent the scrolling when only pressing arrowkeys
     if (this.currentKeys['ArrowRight'] || this.currentKeys['ArrowLeft'] || this.currentKeys['ArrowUp'] || this.currentKeys['ArrowDown']) {
            event.preventDefault();
            }
      this.currentKeys[event.code] = true;


    });

    // listen for keyup event
    document.addEventListener('keyup', (event) => {
      this.currentKeys[event.code] = false;
    });

    // create and load image
    this.image = new Image();
    this.image.src = './assets/run-still.png';

    this.sprites = {
      run:{
        src: "./assets/spritesheet.png",
        frames: 8,
        fps: 15,
          frameSize:{
            width: 400,
            height: 400,
          },
          image: null
      },
      idle:{
        src: "./assets/idle-sprite.png",
        frames: 10,
        fps: 15,
          frameSize:{
            width: 400,
            height: 400,
          },
          image: null
      }
    }
    Object.values(this.sprites).forEach((sprite)=>{
      
      sprite.image = new Image();
      sprite.image.src = sprite.src;
    });
  }

  update(timePassedSinceLastRender) {

    // set the value of dx (along x axis)
    if(this.currentKeys['ArrowRight'] === true) this.dx = 1;
    else if(this.currentKeys['ArrowLeft'] === true) this.dx = -1;
    else this.dx = 0;

    // set the value of dy (along y axis)
    if(this.currentKeys['ArrowUp'] === true) this.dy = -1;
    else if(this.currentKeys['ArrowDown'] === true) this.dy = 1;
    else this.dy = 0;

    // store last direction the player moved in
    if(this.dx !== 0) this.lastDirection = this.dx;

    // calculate new position
    this.x += timePassedSinceLastRender * this.dx * this.velocity;
    this.y += timePassedSinceLastRender * this.dy * this.velocity;

    // check for right and left boundary
    if(this.x + this.width / 2 > this.CONFIG.width) this.x = this.CONFIG.width - this.width / 2 ;
    else if(this.x - this.width / 2 < 0) this.x = 0 + this.width / 2 ; 
    // check for bottom and left top
    if (this.y + this.height / 2 > this.CONFIG.height) this.y = this.CONFIG.height - this.height / 2;
    else if(this.y - this.height / 2 < 0) this.y = 0 + this.height / 2 ; 



    this.state = this.dx === 0 &&  this.dy === 0 ? "idle" : "run";

    if(this.currentKeys ['Space'] === true){
      this.velocity = 0.75;
    }else{
      this.velocity = 0.5
    }
    
    

  }

  render() {
    
    // move canvas origin to x
    this.context.translate(this.x, this.y);
    
    this.context.scale(this.lastDirection, 1);
    let coords = this.getImageSpriteCoordinate(this.sprites[this.state]);
    // coords image
    this.context.drawImage(
        this.sprites[this.state].image,   //image

        coords.sourceX,//sources x
        coords.sourceY, //source y
        coords.sourceWidth,//source width
        coords.sourceHeight,//source height
              

       -this.width/2,   // destination x
       -this.height/2, //destination y
        this.width,   // destination x
        this.height);// destination y
         
         
         
         
         
         this.context.resetTransform();
        }
        getImageSpriteCoordinate(sprite){

          let frameX = Math.floor(performance.now()/1000*sprite.fps % sprite.frames);
          let coords={
            sourceX:frameX * sprite.frameSize.width, //TODO
            sourceY:0,
            sourceWidth: sprite.frameSize.width,
            sourceHeight:sprite.frameSize.height
          }
          return coords;

        
        
      }
}
export default Player;