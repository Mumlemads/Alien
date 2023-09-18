let player;
let bunkers = [];
let aliens = [];
let bullets = [];

function setup() {
  createCanvas(1280, 720);
  player = new Ship();
  
  // Create bunkers
  for (let i = 0; i < 4; i++) {
    bunkers.push(new Bunker(200 + i * 300, height - 100));
  }
  
  // Create aliens
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 11; j++) {
      aliens.push(new Alien(100 + j * 80, 100 + i * 60));
    }
  }
}

function draw() {
  background(0);
  player.update();
  player.show();
  
  // Draw and update aliens
  for (let alien of aliens) {
    alien.show();
    alien.move();
    alien.checkEdges();
  }
  
  // Draw and update bunkers
  for (let bunker of bunkers) {
    bunker.show();
  }
  
  // Update and display bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    bullets[i].show();
    if (bullets[i].offscreen()) {
      bullets.splice(i, 1);
    } else {
      // Check for collisions with aliens
      for (let j = aliens.length - 1; j >= 0; j--) {
        if (bullets[i].hits(aliens[j])) {
          aliens.splice(j, 1);
          bullets.splice(i, 1);
          break;
        }
      }
      // Check for collisions with bunkers
      for (let j = bunkers.length - 1; j >= 0; j--) {
        if (bullets[i].hits(bunkers[j])) {
          bullets.splice(i, 1);
          break;
        }
      }
    }
  }
}

let alien0_img;
let ship_img;
let bullet_img;

function preload() {
  ship_img = loadImage('shipe.png');
  alien0_img = loadImage('alien0.png');
  bullet_img = loadImage('bullet.png');
}

class Ship {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.speed = 4;
  }
  
  update() {
    if (keyIsDown(LEFT_ARROW) && this.x > 25) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - 25) {
      this.x += this.speed;
    }
  }
  
  show() {
    image(ship_img, this.x - 25, this.y - 25, 50, 50);
  }
  
  // Function to shoot bullets
  shoot() {
    bullets.push(new Bullet(this.x, this.y));
  }
}

class Bunker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lives = 40;
  }
  
  show() {
    fill(0, 255, 0);
    rect(this.x, this.y, 60, 40);
  }
}

class Alien {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.direction = 1;
  }
  
  move() {
    this.x += this.speed * this.direction;
  }
  
  checkEdges() {
    if (this.x > width - 20 || this.x < 20) {
      this.direction *= -1; // Reverse direction
      this.y += 20; // Move aliens down
    }
  }
  
  show() {
    image(alien0_img, this.x - 20, this.y - 20, 40, 40);
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 4;
  }
  
  update() {
    this.y -= this.speed;
  }
  
  show() {
    image(bullet_img, this.x - 5, this.y - 5, 10, 10);
  }
  
  offscreen() {
    return this.y < 0;
  }
  
  // Function to check if the bullet hits a target
  hits(target) {
    let d = dist(this.x, this.y, target.x, target.y);
    return d < 20; // Adjust this value based on your game
  }
}

function keyPressed() {
  if (key === ' ' || keyCode === 32) {
    player.shoot();
  }
}
