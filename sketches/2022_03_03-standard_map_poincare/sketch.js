// standard map poincare map
// lynntf January 2020

max_iters = 2000;
startup = 5;
xmin = 0;
xmax = 0;
ymin = 0;
ymax = 0;
maxnum = 100;
maxexposures = 10000000;
num = 0;
exposures = 0;
min_dim = 500;
dimx = 500;
dimy = 500;
shift_x = 0;
shift_y = 0;
m = 0;
q = 0;
K = 0.971635;
A = 1.0;
B = 0.0;
C = 0.0;
let slider;
// let inp;

let travelers = [];

function setup() {
  slider = createSlider(0,4,0.8,0.000001);
  slider.position(10,10);
  slider.style('width', '100px');
  slider.input(sliderFunction);
  inp = createInput(K);
  inp.position(120, 10);
  inp.size(100);
  inp.input(inputFunction);
  // slider.style('width', '100px')
  ymax = 2*PI;
  xmax = 2*PI;
  shift_x = PI;
  // shift_x = 0;
  shift_y = 0;
  var canvas = createCanvas(500, 500);
  // canvas.parent('p5sketch');
  background(0,0,0);
  colorMode(HSB);
  for (i = 0; i < maxnum; i++) {
    travelers[i] = new traveler(i);
    num++;
  }
}

function inputFunction(){
  slider.value(inp.value());
}
function sliderFunction(){
  inp.value(slider.value());
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
    exposures = 0;
    background(0);
    for (i = 0; i < maxnum; i++) {
      travelers[i].rebirth();
    }
    m = 0;
    if (K == slider.value()){
      K = 4*random();
      slider.value(K);
    } else {
      K = slider.value();
    }
    console.log("K = ",K);
    inp.value(K); 
  }
}

function mousePressed() {
  m++;
  q = 0;
  if (m > 1) {
    exposures = 0;
    background(0);
    for (i = 0; i < maxnum; i++) {
      travelers[i].rebirth();
    }
    m = 0;
    if (K == slider.value()){
      K = 4*random();
      slider.value(K);
    } else {
      K = slider.value();
    }
    console.log("K = ",K);
    inp.value(K); 
  }
}


class traveler {
  constructor(i) {
    this.x = random()*(xmax - xmin) + xmin;
    this.xo = this.x;
    this.y = random()*(ymax - ymin) + ymin;
    this.yo = this.y;
    this.xn = 0;
    this.yn = 0;
    this.xp = 0;
    this.yp = 0;
    this.age = 0;
    this.hue = random();
  }

  draw() {
    this.xn = (this.x + K*sin(this.y) + 2*PI)%(2*PI);
    this.yn = (this.y + this.xn + 2*PI)%(2*PI);
    this.x = this.xn;
    this.y = this.yn;
    if (i > startup) {
      this.xp = (this.x - shift_x + 2*PI)%(2*PI);
      this.yp = (this.y - shift_y + 2*PI)%(2*PI);
      // this.xp = (this.x + K*sin(this.y)/2 - shift_x + 2*PI)%(2*PI);
      // this.yp = (this.y + this.x - shift_y + 2*PI)%(2*PI);
      this.xp = (this.xp - xmin) / (xmax - xmin) * dimx;
      this.yp = (this.yp - ymin) / (ymax - ymin) * dimy;
      // stroke(this.xo*255/(2*PI), this.yo*255/(2*PI), 255, 0.1);
      stroke(this.hue*255, 255, 255, 0.2);
      point(this.yp, this.xp);
    }
    this.age++;
    if (this.age > max_iters) {
      this.rebirth();
    }
  }

  rebirth() {
    this.x = random()*(xmax - xmin) + xmin;
    this.xo = this.x;
    this.y = random()*(ymax - ymin) + ymin;
    this.yo = this.y;
    this.age = 0;
    this.hue = random();
  }
}
