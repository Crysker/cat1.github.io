//importing the classes

import Collectible from './Collectible.js';
import GameObject from './GameObject.js';
import Player from './Player.js';
import RandomDispatcher, { randomNumberBetween } from './RandomDispatcher.js';
import PointsDisplay from './PointsDisplay.js';

// global variables
let context;
let lastTickTimestamp;
let player;
let collectibles = [];
let gameObject = [];
let displayPoints;




const CONFIG = {
  width: 800,
  height: 600
}

const init = () => {

  let canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  
  
  canvas.setAttribute('width', CONFIG.width);
  canvas.setAttribute('height', CONFIG.height);
  
  displayPoints = new PointsDisplay(context, CONFIG.width-30 ,30)
  gameObject.push(displayPoints);

  player = new Player(context, 100, 100,100,100, CONFIG);
  gameObject.push(player);

let dispatchOptions = {min: 500, max:1000};
  let randomDispatcher = new RandomDispatcher(()=>{
    let newX = randomNumberBetween(50,CONFIG.width -50);
    let newY = randomNumberBetween(50,CONFIG.height -50);
    
    let randomCollectibles = new Collectible(context, newX,newY,50,50,CONFIG)
    collectibles.push(randomCollectibles)
    gameObject.push(randomCollectibles)

  },dispatchOptions)



  lastTickTimestamp = performance.now();
  gameLoop();
}

const gameLoop = () => {
  // how much time has passed since the last tick?
  let timePassedSinceLastRender = performance.now() - lastTickTimestamp;

  update(timePassedSinceLastRender);
  render();

  // set lastTickTimestamp to "now"
  lastTickTimestamp = performance.now();
  // call next iteration of the game loop
  requestAnimationFrame(gameLoop);
}

 

const update = (timePassedSinceLastRender) => {
  
 gameObject.forEach((gameObject) =>{
   gameObject.update(timePassedSinceLastRender)
  })
  let removeItems = [];
  collectibles.forEach(function(collectible){
   if(checkCollisionBetween(player, collectible)){
    removeItems.push(collectible);
    displayPoints.increase();
    
  }
  })

  removeItems.forEach((removeItems) => {
    	collectibles.splice(collectibles.indexOf(removeItems), 1)
      gameObject.splice(gameObject.indexOf(removeItems),1)
  });

  
}


const render = () => {
  // clear the canvas
  context.resetTransform();
  context.clearRect(0, 0, CONFIG.width, CONFIG.height);
  // player.render();
  // collectibles.render();
 
  
  gameObject.forEach((gameObject)=>{
    gameObject.render()
  })



}

let checkCollisionBetween = (player, collectible) => {

  let bbA = player.getBoundingBox();
 let bbB = collectible.getBoundingBox();
 
  if(
    bbA.x < bbB.x + bbB.w &&
    bbA.x + bbA.w > bbB.x &&
    bbA.y < bbB.y + bbB.h &&
 bbA.y + bbA.h > bbB.y
 ) {
 // collision happened

 return true;
 }
 else return false;
 
 }

window.addEventListener('load', () => {
  init();
});

  
