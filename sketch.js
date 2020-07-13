var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0;

var trex,trexImage,groundImage,invisibleGround,ground,trexCollided,gameOverImage,restartImage;
var cloudGroup,cloudImage;
var obstacle1,obstacle2,obstacle3,obstacle4,ofstacle5,obstacle6,obstacleGroup;
function preload(){
  trexImage=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundImage=loadImage("ground2.png");
trexCollided=loadAnimation("trex_collided.png");
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
 cloudImage=loadImage("cloud.png");
 obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,150,10,10);
  trex.scale=0.5;
  trex.addAnimation("trex.running",trexImage);
  trex.addAnimation("trex.Collided",trexCollided);
  ground=createSprite(300,180,600,5);
  ground.addImage("ground.moving",groundImage);
  ground.x=ground.width/2;
  invisibleGround=createSprite(300,185,600,10)
  invisibleGround.visible=false;
  cloudGroup=new Group();
  obstacleGroup=new Group();
  //place gameOver and restart icon on the screen
 gameOver = createSprite(200,100);
 restart = createSprite(200,140);
gameOver.addImage("gameOverImage",gameOverImage);
gameOver.scale = 0.5;
restart.addImage("restartImage",restartImage);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
}

function draw() {
  
  console.log(trex.y)
  background(180);
  text("Score:="+ score, 250, 100);
  
  if(gameState==PLAY){
    if(keyDown("space")&&trex.y>156){
    trex.velocityY=-15;
  }
    ground.velocityX=-8;
  score= score + Math.round(getFrameRate()/60);
     spawnClouds();
  spawnObstacles();
  trex.velocityY=trex.velocityY+2;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    if(obstacleGroup.isTouching(trex)){
      gameState = END;
      //playSound("die.mp3");
    }
  }
    else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex.Collided",trexCollided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud.png",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloudGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
   
      case 1:    obstacle.addImage("obstacle1",obstacle1);
    break;
    
    case 2:    obstacle.addImage("obstacle2",obstacle2);
    break;
        
    case 3:    obstacle.addImage("obstacle3",obstacle3);
    break;
    
    case 4:    obstacle.addImage("obstacle4",obstacle4);
    break;
    case 5:    obstacle.addImage("obstacle5",obstacle5);
    break;
    
    case 6:    obstacle.addImage("obstacle6",obstacle6);
    break;
    
    default:
        break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("trex.running",trexImage);
  
  score = 0;
  
}