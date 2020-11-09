var canvas, backgroundImage;

var gameState = 0;
var playerCount = 0;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img;
var blue_run, blue_idle, blue_death, blue_crouch;


function preload(){

  track = loadImage("../images/track.jpg");
  blue_idle = loadAnimation("../images/Blue_Idle1.png", "../images/Blue_Idle2.png", "../images/Blue_Idle3.png", "../images/Blue_Idle4.png", "../images/Blue_Idle5.png");
  car2_img = loadImage("../images/car2.png");
  blue_run = loadAnimation("../images/Blue_Run1.png", "../images/Blue_Run2.png", "../images/Blue_Run3.png", "../images/Blue_Run4.png");
  blue_crouch = loadAnimation("../images/Blue_Crouch1.png", "../images/Blue_Crouch2.png", "../images/Blue_Crouch3.png");
  blue_death = loadAnimation("../images/Blue_Death1.png", "../images/Blue_Death2.png", "../images/Blue_Death3.png", "../images/Blue_Death4.png", "../images/Blue_Death5.png", "../images/Blue_Death6.png");
  ground = loadImage("../images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
    cars[player.index-1].changeAnimation("blueIdle", blue_idle);
  }
  if(gameState === 2){
    game.end();
  }

  if(gameState === 3){
  cars[player.index-1].changeAnimation("blueRun", blue_run);
  gameState = 1;
  }
  if(player.distance > 3860){
    gameState = 2;
    player.rank += 1;
   // Player.updatecarsAtEnd(player.rank);
   player.update();
  }
}

