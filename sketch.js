function setup() {
  createCanvas(1280, 720);
  background(0,0,0);
  player = new Ship();
  b1 = new bunker();
  b2 = new bunker();
  b3 = new bunker();
}

function draw() {
  background(0);
}

class Ship {
  constructor(lives = 3, x = width/2, y = 10){
    this.lives = lives;
    this.x = x;
    this.y = y;
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
    
  }
  /*if lives == 0 *die* */
}