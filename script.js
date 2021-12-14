import Player from "./Player.js";


let context;
let ticks = 0;
let lastTickTimestamp;
let x = 0;
let player;


const CONFIG = {

  width: 800,
  height: 600
}

const init = () => {

  let canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  
  canvas.setAttribute('width', CONFIG.width);
  canvas.setAttribute('height', CONFIG.height);
  
  player = new Player(context, 50, 50,);
  
  
  lastTickTimestamp = performance.now();
  gameLoop();
}


const gameLoop = () => {
  
  let timePassedSinceLastRender = performance.now() - lastTickTimestamp;
  // window.timePassedSinceLastRender = timePassedSinceLastRender;
  update(timePassedSinceLastRender);
  render();
  
  
  lastTickTimestamp = performance.now();
  requestAnimationFrame(gameLoop); 
  
  
}

const update = (timePassedSinceLastRender) => {
  player.update(timePassedSinceLastRender);
  

}


const render = () => {
  context.clearRect(0, 0, CONFIG.width, CONFIG.height);
  player.render()
  
}




window.addEventListener('load', () => {
  init();
})
