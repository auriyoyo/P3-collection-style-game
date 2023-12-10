/* VARIABLES */
let catcher, fallingObject, score, hiscore;
let catcherImg, fallingObjectImg;
let playButton, helpButton, backButton;
let screen;
let font;

/* PRELOAD LOADS FILES */
function preload(){
  catcherImg = loadImage('assets/pochacco.png');
  fallingObjectImg = loadImage('assets/star.png');
  font = loadFont('assets/FiraSans-SemiBold.ttf');
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  background(101, 103, 168);
  textAlign(CENTER);
  textFont(font);
  score = 0;
  hiscore = 0;

  // initialize button variables
  textSize(15);
  playButton = new Sprite(165, 270, 50, 30);
  playButton.color = color(207, 238, 255);
  playButton.text = "PLAY";
  playButton.collider = 'k';
  
  helpButton = new Sprite(240, 270, 50, 30);
  helpButton.color = color(207, 238, 255);
  helpButton.text = "HELP";
  helpButton.collider = 'k';

  backButton = new Sprite(200, 240, 50, 30);
  backButton.color = color(255, 249, 217);
  backButton.text = "BACK";
  backButton.collider = 'k';

  // resize imgs
  catcherImg.resize(130,0);
  fallingObjectImg.resize(30,0);

  // start on home screen
  screen = 0;
  homeScreen();
}

/* DRAW LOOP REPEATS */
function draw() {
  // if on homescreen + click on help or click on play
  if(screen == 0){
    if(helpButton.mouse.presses()){
      helpScreen();
      screen = 1;
      
    } else if(playButton.mouse.presses()){
      playScreenAssets();
      screen = 2;
    }
  }

  // if on help screen
  if(screen == 1){
    if(backButton.mouse.presses()){
      screen = 0;
      homeScreen();
    }
  }

  if(screen == 2){
    background(101, 103, 168);

    playButton.x = -200;
    helpButton.x = -200;
    
    textSize(20);
    text("SCORE: " + score, 70,30);

    
    fallingObject.rotationLock;
    
    // move star back to top after reaching bottom
    if (fallingObject.y >= height){
      fallingObject.y = 0;
      fallingObject.x = random(1,width+1);
      fallingObject.vel.y = random(10,30);
      fallingObject.direction = "down";
      score--;
    }
  
    // move catcher
    catcher.speed = 15;
    if (kb.pressing('left')) {
  		catcher.direction = 180;
  	} else if (kb.pressing('right')) {
  		catcher.direction = 0;
  	} else {
  	  catcher.speed = 0;
  	}
  
    // stop catcher at end of screen
    if (catcher.x < 50){
      catcher.x = 50;
    } else if (catcher.x > 350){
      catcher.x = 350;
    }
  
    // move star back to the top after collision
    if(fallingObject.collides(catcher)){
      fallingObject.y = 0;
      fallingObject.x = random(1,width+1);
      fallingObject.vel.y = random(20,30); 
      fallingObject.direction = "down";
      score++;
    }
  
    // update hiscore
    if (score > hiscore){
      hiscore = score;
    }
  
    // lose screen
    if (score < 0){
      background(90, 91, 117);
      catcher.x = -200;
      fallingObject.collider = 'none';
      fallingObject.x = -200;
    
      textSize(40);
      fill(22, 23, 28);
      text("GAME OVER", width/2, 190);
      textSize(20);
      fill(148, 153, 181);
      text("HISCORE: " + hiscore, width/2, 230);
    }
  
    // win screen
    if (score >= 15){
      background(196, 198, 245);
      catcher.x = -200;
      fallingObject.collider = 'static';
      fallingObject.x = -200;
    
      textSize(40);
      text("YOU WIN!", width/2, 200);
      textSize(20);
      fill(77, 97, 161);
      text("congrats! you collected 15 stars!", width/2, 230);
    }
    
    // allSprites.debug = mouse.pressing();
    
    }
  
}

function homeScreen(){
  background(140, 205, 255);
  textSize(30);
  fill(26, 34, 61);
  text("POCHACCO\nCATCHING STARS", 200, 170);

  // hide back button
  backButton.x = -200;

  // show play button
  playButton.x = 165;
  playButton.y = 250;

  // show help button
  helpButton.x = 240;
  helpButton.y = 250;
}

function helpScreen(){
  background(255, 219, 156);

  // hide play, and back buttons
  playButton.x = -200;
  helpButton.x = -200;

  // show back button
  backButton.x = 200;
  backButton.y = 250;
  
  // show directions
  fill(0);
  textSize(20);
  text("move pochacco with the arrow keys to catch the stars!", 75, 170, 250, 170);
}

function playScreenAssets(){
  playButton.x = -200;
  helpButton.x = -200;
  backButton.x = -200;
  
  // initialize catcher 
  catcher = new Sprite(catcherImg,200,350,100,80);
  catcher.color = color(95,158,160);
  catcher.collider = 'k';
  
  // initialize falling object
  fallingObject = new Sprite(fallingObjectImg,100,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.vel.y = 2;
}
