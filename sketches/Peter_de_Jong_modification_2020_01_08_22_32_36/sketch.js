// Peter de Jong
// lynntf January 2020
// based on code by j.tarbell, complexification.net

max_iters = 128;
startup = 5;
xmin = -2.5;
xmax = 2.5;
ymin = -2.5;
ymax = 2.5;
maxnum =4000;
maxexposures = 1000000;
num = 0;
exposures = 0;

let travelers = [];

function setup() {
  createCanvas(400, 400);
  background(255, 255, 255);
  // bourke constants
  a = 2.01;
  b = -2.53;
  c = 1.61;
  d = -0.33;
  for(i = 0; i<maxnum; i++){
    travelers[i] = new traveler();
    num++;
  }
}

function draw() {
  if (exposures < maxexposures) {
    for(i = 0; i < maxnum; i++) {
      travelers[i].draw();
    }
    exposures += num;
  }
  // background(220);
  //x = random(xmin, xmax);
  //y = random(ymin, ymax);
  //xn = 0;
  //yn = 0;
  //xp = 0;
  //yp = 0;
  //for (i = 0; i < max_iters; i++) {
    // xn = sin(a*y) - cos(b*x);
    // yn = sin(c*x) - cos(d*y);
    //xn = y / abs(y) * (sin(a * y * y) - cos(b * x * x));
    //yn = x / abs(x) * (sin(c * x * x) - cos(d * y * y));
    //x = xn;
    //y = yn;
    //if (i > startup) {
      //xp = (x - xmin) / (xmax - xmin) * 400;
      //yp = (y - ymin) / (ymax - ymin) * 400;
      //stroke(0, 0, 0, 50);
      //point(xp, yp);
    //}
  //}
}

function mouseClicked() {
  background(255, 255, 255);
  a = random(-PI, PI);
  b = random(-PI, PI);
  c = random(-PI, PI);
  d = random(-PI, PI);
  exposures = 0;
  print("Reset image----------")
  print("a:" + a + "")
  print("b:" + b + "")
  print("c:" + c + "")
  print("d:" + d + "\n")
  stroke(0, 0, 0, 5);
  
}

class traveler {
  constructor() {
    this.x = random(xmin, xmax);
    this.y = random(ymin, ymax);
    this.xn = 0;
    this.yn = 0;
    this.xp = 0;
    this.yp = 0;
    this.age = 0;
  }

  draw() {
    stroke(0, 0, 0, 5);
    this.xn = this.y / abs(this.y) * (sin(a * this.y * this.y) - cos(b * this.x * this.x));
    this.yn = this.x / abs(this.x) * (sin(c * this.x * this.x) - cos(d * this.y * this.y));
    this.x = this.xn;
    this.y = this.yn;
    if (i > startup) {
      this.xp = (this.x - xmin) / (xmax - xmin) * 400;
      this.yp = (this.y - ymin) / (ymax - ymin) * 400;
      stroke(0, 0, 0, 5);
      point(this.xp, this.yp);
    }
    this.age++;
    if(this.age > max_iters) {
      this.rebirth();
    }
  }
  
  rebirth() {
    this.x = random(xmin, xmax);
    this.y = random(ymin, ymax);
    this.age = 0;
  }
}