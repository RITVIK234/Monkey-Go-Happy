var monkey, monkey_running, monkey_stand, invis, ground, groundImage;
var banana, bananaImage, obstacle, obstacleImage;
var food, obstacle, FoodGroup, obstacleGroup;
var score1, score2, gamestate, PLAY, END;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkey_stand = loadAnimation("sprite_0.png");


  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("Imported piskel (1).gif");
}

function setup() {

  createCanvas(800, 400);

  obstacleGroup = createGroup();
  groundGroup = createGroup();
  foodGroup = createGroup();


  monkey = createSprite(100, 300, 10, 15);
  monkey.addAnimation("run", monkey_running);
  monkey.addAnimation("still", monkey_stand);
  monkey.scale = 0.15;
  monkey.debug = false;
  monkey.setCollider("rectangle", 0, 0, 400, 500);
  
  bonana=createSprite(780,30,10,0.25);
  bonana.addImage(bananaImage);
  bonana.scale=0.0625

  invis = createSprite(400, 390, 800, 25);
  invis.visible = true;
  invis.shapeColor = rgb(0, 128, 64);

  score1 = 0.00;
  score2=0;

  PLAY = 1;
  END = 0;
  gamestate = PLAY;


}


function draw() {
  background(220);
  textFont("Arial Black");
  textAlign(CENTER);
  textSize(16);
  text("Survival Time: " + score1, 400, 50);
  text(score2+"x",750,30);



  if (gamestate === PLAY) {

    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(invis);

    score1 = score1 + Math.round(getFrameRate() / 60);

    if (keyDown("space") && (monkey.y >= 325)) {
      monkey.velocityY = -15;
    }
    
    if(monkey.isTouching(foodGroup)){
       score2=score2+1
       }

    SpawnObstacles();
    moveGround();
    SpawnFood();

  } else if (gamestate === END) {

    obstacleGroup.setLifetimeEach(-1);
    groundGroup.setLifetimeEach(-1);
    monkey.velocityY = 0;
    monkey.changeAnimation("still", monkey_stand);

    textAlign(CENTER);
    text("Oops, you stepped on an obstacle.", 400, 200);
    text("press 'R' to restart", 400, 216);

  }

  if (monkey.isTouching(obstacleGroup)) {

    gamestate = END
    obstacleGroup.setVelocityEach(0, 0);
    groundGroup.setVelocityEach(0, 0);

  }

  if (keyDown("r")) {
    reset();
  }

  drawSprites();
}

function SpawnObstacles() {

  if (frameCount % 120 === 0) {

    obstacle = createSprite(810, 360, 10, 20);
    obstacle.addImage("obs", obstacleImage);
    obstacle.velocityX = -8;
    obstacle.lifetime = 415;
    obstacle.scale = 0.2;

    obstacleGroup.add(obstacle);

  }
}

function moveGround() {

  if (frameCount % 2 === 0) {

    ground = createSprite(810, 360, 10, 10);
    ground.addImage(groundImage);
    ground.scale = 0.5
    ground.lifetime = 120;
    ground.velocityX = -8;

    groundGroup.add(ground);

  }
}

function SpawnFood() {

  if (frameCount % 40 === 0) {


    var oo = Math.round(random(130, 300))

    food = createSprite(810, oo, 10, 10);
    food.addImage(bananaImage);
    food.scale = 0.125
    food.lifetime = 120;
    food.velocityX = -8;

    foodGroup.add(food);

  }
}

function reset() {

  obstacleGroup.destroyEach();
  groundGroup.destroyEach();
  score1 = 0;
  score2=0;
  gamestate = PLAY;
  monkey.changeAnimation("run", monkey_running);


}