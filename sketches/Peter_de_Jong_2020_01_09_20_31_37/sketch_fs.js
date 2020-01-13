// Peter de Jong
// lynntf January 2020
// based on code by j.tarbell, complexification.net

max_iters = 128;
startup = 5;
xmin = -2.5;
xmax = 2.5;
ymin = -2.5;
ymax = 2.5;
maxnum = 4000;
maxexposures = 10000000;
num = 0;
exposures = 0;
min_dim = 500;
shift_x = 0;
shift_y = 0;
m = 0;
q = 0;


let travelers = [];

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(255, 255, 255);
  // bourke constants
  a = 2.01;
  b = -2.53;
  c = 1.61;
  d = -0.33;
  for (i = 0; i < maxnum; i++) {
    travelers[i] = new traveler(i);
    num++;
  }
  min_dim = min(displayWidth, displayHeight);
  if (displayWidth > displayHeight) {
    shift_x = (displayWidth - displayHeight) / 2;
    //xmin = xmin*(displayWidth/displayHeight);
    //xmax = xmax*(displayWidth/displayHeight);
  } else {
    shift_y = (-displayWidth + displayHeight) / 2;
    //ymin = ymin*(displayHeight/displayWidth);
    //ymax = ymax*(displayHeight/displayWidth);
  }
}

function draw() {
  if (exposures < maxexposures) {
    for (i = 0; i < maxnum; i++) {
      travelers[i].draw();
    }
    exposures += num;
  }
  q++;
  if (q > 15) {
    q = 0;
    m = 0;
  }
}

function touchStarted() {
  m++;
  q = 0;
  if (m > 1) {
    background(255, 255, 255);
    a = random(-PI, PI);
    b = random(-PI, PI);
    c = random(-PI, PI);
    d = random(-PI, PI);
    exposures = 0;
    for (i = 0; i < maxnum; i++) {
      travelers[i].rebirth();
    }
    print("Reset image----------")
    print("a:" + a + "")
    print("b:" + b + "")
    print("c:" + c + "")
    print("d:" + d + "\n")
    stroke(0, 0, 0, 5);
    m = 0;
  }
}


class traveler {
  constructor(i) {
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
    this.xn = (sin(a * this.y) - cos(b * this.x));
    this.yn = (sin(c * this.x) - cos(d * this.y));
    this.x = this.xn;
    this.y = this.yn;
    if (i > startup) {
      this.xp = (this.x - xmin) / (xmax - xmin) * min_dim + shift_x;
      this.yp = (this.y - ymin) / (ymax - ymin) * min_dim + shift_y;
      stroke(0, 0, 0, 5);
      point(this.xp, this.yp);
    }
    this.age++;
    if (this.age > max_iters) {
      this.rebirth();
    }
  }

  rebirth() {
    this.x = random(xmin, xmax);
    this.y = random(ymin, ymax);
    this.age = 0;
  }
}
