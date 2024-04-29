let juniper;
let juniperBowl;
let juniperHome;

//object variables
var canvasSize = {
  width: 600,
  height: 400,
};

var player = {
  x: canvasSize.width / 2,
  y: canvasSize.height - 100,
  width: 200, 
  height: 156 
};

var treatSize = 20;
var treats = [];
var caughtTreats = 0; 

var lastTime = null;
var lives = 3;
var isDead = false;
var isInitial = true;
var isWon = false;

function setup() {
  createCanvas(canvasSize.width, canvasSize.height);
  setFrameRate(30);
  lastTime = millis();
  insertTreat();
}

function preload() {
  juniper = loadImage('juniper.gif'); 
  juniperBowl = loadImage('juniperBowl.png');
  juniperHome = loadImage('juniperHome.png');
}

//initial screen
function draw() {
  if (isInitial) {
    push();
    textSize(50);
    background(juniperHome);
    fill('black');
    text('Mission: Juniper', 250, 50);
    textSize(20);
    text('Oh no, Juniper is hungry!', 380, 80);
    text('Use the arrow keys to successfully collect 30 treats.', 170, 110);
    text('Press space to start.', 20, 380);
    pop();
    noLoop();
    return;
  }
  
  //game section layout
  update();
  clear();
  background(juniper);
  drawPlayer();
  drawTreats();
  displayCaughtTreatsCounter();

  //lives, game over, game won
  push();
  fill(color(255, 0, 0));
  if (lives) {
    textSize(20);
    text('🐈‍⬛'.repeat(lives), 20, 30);
  } else {
    isDead = true;
    textSize(20);
    text('😿', 20, 30);
    fill('HotPink');
    textSize(30);
    text('Juniper is still hungry! Press space to restart.', 35, 200);
    noLoop();
  }
  if (caughtTreats >= 30) {
    isWon = true;
    textSize(30);
    fill('HotPink');
    text('Juniper is fed! Press space to restart.', 90, 200);
    noLoop();
  }
  pop();
}

//space bar to play or restart game
function keyPressed() {
  var SPACE_CODE = 32;
  if (keyCode == SPACE_CODE) {
    if (isInitial) {
      isInitial = false;
      loop();
      return;
    }
    if (isDead) {
      isDead = false;
      treats = [];
      lives = 3;
      caughtTreats = 0;
      loop();
      return;
    }
    if (isWon) {
      isWon = false;
      treats = [];
      lives = 3;
      caughtTreats = 0;
      loop();
      return;
    }
  }
}

//game elements (treats and speed, player)
function drawTreats() {
  push();
  fill(color('SaddleBrown'));
  treats.forEach(function(treat) {
    ellipse(treat.x, treat.y, treatSize);
  });
  pop();
}

function drawPlayer() {
  let imgX = player.x - player.width / 2;
  let imgY = player.y; 
  image(juniperBowl, imgX, imgY, player.width, player.height);
}

function insertTreat() {
  treats.push({
    x: random(0, canvasSize.width - treatSize),
    y: 0,
  });
}

function updateTreats() {
  var currentTime = millis();
  var spawnRate = max(500, 2000 - floor(millis() / 10000) * 100);
  
  if (currentTime - lastTime > spawnRate) {
    lastTime = currentTime;
    insertTreat();
  }

  var baseSpeed = 2;
  
  treats.forEach(function (treat, index) {
    treat.y += baseSpeed;

    let playerCollisionAreaY = player.y + player.height * 0.5; 
    let playerCollisionHeight = player.height * 0.5; 

    if (rectCollision(player.x - player.width / 2, playerCollisionAreaY, player.width, playerCollisionHeight, treat.x, treat.y, treatSize, treatSize)) {
      treats.splice(index, 1);
      caughtTreats++;
    } else if (treat.y > canvasSize.height) {
      treats.splice(index, 1);
      lives = max(0, lives - 1);
    }
  });
}

function update() {
  updateTreats();
  var baseSpeed = 5;

  if (keyIsDown(LEFT_ARROW)) {
    player.x = max(0, player.x - speed);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.x = min(canvasSize.width - player.width / 2, player.x + baseSpeed); 
  }
}

//treats counter
function displayCaughtTreatsCounter() {
  push();
  fill('HotPink');
  textSize(20);
  textAlign(RIGHT);
  text(`Treats: ${caughtTreats}`, width - 20, 30);
  pop();
}

function rectCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
  if (x1 + w1 < x2 || x1 > x2 + w2 || y1 + h1 < y2 || y1 > y2 + h2) {
    return false;
  }
  return true;
}