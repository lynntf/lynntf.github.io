// sine shear attractor
// lynntf January 2020

max_iters = 200;
startup = 5;
xmin = 0;
xmax = 1;
ymin = 0;
ymax = 1;
maxnum = 4000;
maxexposures = 10000000;
num = 0;
exposures = 0;
min_dim = 500;
dimx = 900;
dimy = 900;
xcopies = 2;
ycopies = 2;
shift_x = 0;
shift_y = 0;
m = 0;
q = 0;
R = 0;
G = 50;
B = 155;


let travelers = [];

function setup() {
  createCanvas(displayWidth, displayHeight);
  xcopies = displayWidth/dimx;
  ycopies = displayHeight/dimy;
  background(0,0,0);
  cnorm = sqrt(R * R + G * G + B * B);
  R = R / cnorm * 255;
  G = G / cnorm * 255;
  B = B / cnorm * 255;
  /*a = -0.3429420735004638;
  b = -0.9222511150619628;
  c = 0.7936864025334365;
  d = -3.103201950794991;*/
  
  a = 0.2958889697303355 ;
  b = 1.1004600289120594 ;
  c = 1.8711510272616123 ;
  d = 0.13203495179522395;
  
  a = 1.0517163946645525 ;
  b = 0.9807193290426501 ;
  c = 0.5930023817276595 ;
  d = 0.7673857401599471;
 
  
  for (i = 0; i < maxnum; i++) {
    travelers[i] = new traveler(i);
    num++;
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
    background(0, 0, 0);
    a = random(-1, 2);
    b = random(-1, 2);
    c = random(-1, 2);
    d = random(-1, 2);

    R = random();
    G = random();
    B = random();

    cnorm = sqrt(R * R + G * G + B * B);
    R = R / cnorm * 255;
    G = G / cnorm * 255;
    B = B / cnorm * 255;

    exposures = 0;
    for (i = 0; i < maxnum; i++) {
      travelers[i].rebirth();
    }
    print("Reset image----------")
    print("a:" + a + "")
    print("b:" + b + "")
    print("c:" + c + "")
    print("d:" + d + "\n")
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
    this.xn = ((((this.x - xmin) + a * sin(c * PI * this.y)) % 1) + 2) % 1;
    this.yn = ((((this.y - ymin) + b * sin(d * PI * this.x)) % 1) + 2) % 1;
    this.x = this.xn;
    this.y = this.yn;
    if (i > startup) {
      this.xp = (this.x - xmin) / (xmax - xmin) * dimx;
      this.yp = (this.y - ymin) / (ymax - ymin) * dimy;
      stroke(R, G, B, 5);
      for (let ii = 0; ii < xcopies; ii++) {
        for (let jj = 0; jj < ycopies; jj++) {
          point(this.xp + ii * dimx, this.yp + jj * dimy);
        }
      }
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