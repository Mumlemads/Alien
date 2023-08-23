function setup() {
  createCanvas(1280, 720);
  background(0,0,0);
  player = new Ship();
  b1 = new bunker();
  b2 = new bunker();
  b3 = new bunker();
  alien = new alien(200, 200);

}

function draw() {
  background(0);
  player.draw();
  alien.draw();
}
let alien0_img;
let alien1_img;
let ship_img;
function preload(){
  ship_img = loadImage('shipe.png');
  alien0_img = loadImage('alien0.png');
  alien1_img = loadImage('alien1.png');
}

class Ship {
  constructor(lives = 3, x = width/2, y = 650){
    this.lives = lives;
    this.x = x;
    this.y = y;
  }
  draw(){
    image(ship_img, this.x - 25, this.y, 50, 50);
    if (keyIsDown(LEFT_ARROW)){
      this.x--
    }
    if (keyIsDown(RIGHT_ARROW)){
      this.x++
    }
  }
  update(){

  }
  /*if lives == 0 *die* */

}






class bunker {
  constructor(lives = 40){
    this.lives = lives;
  }
  /*if lives == 0 *die* */
}

class alien {
  constructor(lives = 1){
    this.lives = lives;
  }
  draw(){
    image(alien0_img, 200, 200, 50, 50);
  }
  /*if lives == 0 *die* */
}