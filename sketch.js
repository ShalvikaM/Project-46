var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bullet, bulletsGrp, bulletImg;
var bullets = 10;
var heart1, heart2, heart3, heart1_Img, heart2_Img, heart3_Img;
var life =3;
var zombie, zombieGroup, zombie_img;
var score =0;
var gameState = "play";

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg2.jpg")
  heart1_Img = loadImage("assets/heart_1.png")
  heart2_Img = loadImage("assets/heart_2.png")
  heart3_Img = loadImage("assets/heart_3.png")
  zombie_img = loadImage("assets/zombie.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

  bulletsGrp = new Group();
  zombieGroup = new Group();
  
  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false;
  heart1.addImage("heart1",heart1_Img);
  heart1.scale=0.5;

  heart2 = createSprite(displayWidth-150,40,20,20)
  heart2.visible = false;
  heart2.addImage("heart2",heart2_Img);
  heart2.scale=0.5;

  heart3 = createSprite(displayWidth-170,40,20,20)
  heart3.visible = true;
  heart3.addImage("heart3",heart3_Img);
  heart3.scale=0.5;
}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(life == 0){
  gameState = "lost"
}
if(score == 100){
  gameState = "won"
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed

if(keyWentDown("space")){
 
  bullet = createSprite(displayWidth-1150, player.y-30,20,10)
  bullet.shapeColor = "black"
  bullet.velocityX = 20
  bulletsGrp.add(bullet)
  bullet.depth = player.depth;
  player.depth = player.depth+1;
  
  player.addImage(shooter_shooting)
  bullets = bullets-1;

 
}
//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(bullet == 0){
  gameState = "endOfBullets"
}
if(zombieGroup.isTouching(bulletsGrp)){
  for(var i=0;i<zombieGroup.length; i++){
     if(zombieGroup[i].isTouching(bulletsGrp)){
       zombieGroup[i].destroy()
       bulletsGrp.destroyEach()
       score = score+2
     }
  }
}
if(zombieGroup.isTouching(player)){
  for(var i=0;i<zombieGroup.length; i++){
     if(zombieGroup[i].isTouching(player)){
       zombieGroup.destroyEach()
       life = life - 1
     }
  }
}
enemy();
drawSprites();
textSize(20)
fill("white")
text("Bullets: " + bullets, displayWidth - 230, displayHeight/2 - 250);
text("Score: " + score, displayWidth - 230, displayHeight/2 - 220);
text("Life: " + life, displayWidth - 230, displayHeight/2 - 280);
if(gameState === "won"){
  textSize(100)
  fill("green")
  text("YOU WON", 400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
else if(gameState === "lost"){
  textSize(100)
  fill("red")
  text("YOU LOST", 400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
if(gameState === "endOfBullets"){
  textSize(100)
  fill("yellow")
  text("YOU RAN OUT OF BULLETS", 400,400)
  zombieGroup.destroyEach()
  bulletsGrp.destroyEach()
  player.destroy()
}
}

function enemy(){
  if(frameCount % 60 === 0){
    zombie = createSprite(random(500,1100),random(100,500),40,40)
    zombie.addImage("zombie", zombie_img)
    zombie.velocityX = -3
    zombie.scale = 0.15
    zombie.lifetime = 500;
    zombieGroup.add(zombie)
    zombie.debug = true;
    zombie.setCollider("rectangle",0,0,400,400)
  }
}