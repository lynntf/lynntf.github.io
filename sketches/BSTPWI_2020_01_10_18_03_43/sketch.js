res = 500;
xmin = -1;
xmax = 1;
ymin = -1;
ymax = 1;
zmin = -1;
zmax = 1;
max_iters = 500;
num_tracers = 400;
aeb = false;

tracers = [];

function setup() {
  gamma = 120*PI/180;
  alph = 57*PI/180;
  beta = 57*PI/180;
  createCanvas(500, 600);
  background(255, 255, 255);
  //colorMode(RGB,255,255,255);
  //noStroke();
  // make some tracers
  for (i = 0; i < num_tracers; i++) {
    tracers[i] = new Tracers(i); // call the constructor of th travelers
  }
  
  
  checkbox = createCheckbox('Alpha = Beta', false);
  checkbox.changed(alphEqBeta);
  checkbox.position(375,500);
  
  resetButton = createButton('Reset the sketch');
  resetButton.mousePressed(reset);
  resetButton.position(0, 500);
  
  randomizeButton = createButton('Random protocol');
  randomizeButton.mousePressed(randomize);
  randomizeButton.position(0, 525);
  
  randrButton = createButton('Reset and randomize');
  randrButton.mousePressed(randr);
  randrButton.position(0, 550);
  
  alabel = createSpan('Alpha');
  alabel.position(150,500);
  blabel = createSpan('Beta');
  blabel.position(150,525);
  glabel = createSpan('Gamma');
  glabel.position(150,550);
  inpAlph = createInput('57');
  inpAlph.position(200,500);
  inpBeta = createInput('57');
  inpBeta.position(200,525);
  inpGamma = createInput('120');
  inpGamma.position(200,550);
}

function alphEqBeta() {
  if (this.checked()) {
    aeb = true;
  } else {
    aeb = false;
  }
}

function draw() {
  for (i=0; i<num_tracers; i++) {
    tracers[i].draw();
  }
}


function randomize() {
  a = random(0,PI/2);
  b = random(0,PI/2);
  g = random(0,PI/2);
  if(aeb) {
    b = a;
  }
  inpAlph.value(a/PI*180);
  inpBeta.value(b/PI*180);
  inpGamma.value(g/PI*180);
}

function randr() {
  randomize();
  reset();
}

function reset() {
  background(255);
  alph = inpAlph.value()*PI/180;
  beta = inpBeta.value()*PI/180;
  gamma = inpGamma.value()*PI/180;
  if(aeb) {
    beta = alph;
  }

  for (i=0; i<num_tracers; i++) {
    tracers[i].rebirth(i);
  }
}
120
class Tracers {
  constructor(index) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.xn = 0;
    this.yn = 0;
    this.zn = 0;
    this.t = 0;
    this.cut = 0;
    this.colorR = random(0, 1);
    this.colorG = random(0.1);
    this.colorB = random(0, 1);
    this.color_norm = sqrt(this.colorR*this.colorR + this.colorG*this.colorG + this.colorB*this.colorB);
    this.colorR = this.colorR/this.color_norm*255;
    this.colorG = this.colorG/this.color_norm*255;
    this.colorB = this.colorB/this.color_norm*255;
    if (index < num_tracers/2) {
      this.cut = 1;
      this.t = (1.0*index)/(1.0*num_tracers)*2.0;
      this.x = sin(this.t*PI);
      this.z = cos(this.t*PI);
      this.y = 0;
      this.xn = this.x;
      this.yn = this.y;
      this.zn = this.z;
    } else {
      this.cut = 2;
      this.t = (1.0*(index - num_tracers/2))/(1.0*num_tracers)*2.0;
      this.x = sin(this.t*PI);
      this.z = cos(this.t*PI);
      this.y = 0;
      this.xn = this.x;
      this.yn = this.y;
      this.zn = this.z;

      this.xn = cos(alph)*this.x - sin(alph)*this.y;
      this.yn = sin(alph)*this.x + cos(alph)*this.y;
      this.x = this.xn;
      this.y = this.yn;
      this.z = this.zn;
      if (this.y > 0) {
        this.xn = -this.xn;
        this.yn = -this.yn;
        this.x = -this.x;
        this.y = -this.y;
      }
      // Inverse of rotation by (gamma) about (-y)
      //  which can also be written as (-gamma) about (-y)
      this.xn = cos(-gamma)*this.x - sin(-gamma)*this.z;
      this.zn = sin(-gamma)*this.x + cos(-gamma)*this.z;
      this.x = this.xn;
      this.y = this.yn;
      this.z = this.zn;
    }
    this.xn = cos(beta)*this.x - sin(beta)*this.y;
    this.yn = sin(beta)*this.x + cos(beta)*this.y;
    this.x = this.xn;
    this.y = this.yn;
    this.z = this.zn;
    // Need to take care of periodic boundary
    if (this.y > 0) {
      this.xn = -this.xn;
      this.yn = -this.yn;
      this.x = -this.x;
      this.y = -this.y;
    }
    // Inverse of rotation by (gamma) about (-y)
    //  which can also be written as (-gamma) about (-y)
    this.xn = cos(gamma)*this.x - sin(gamma)*this.z;
    this.zn = sin(gamma)*this.x + cos(gamma)*this.z;
    this.x = this.xn;
    this.y = this.yn;
    this.z = this.zn;



    if (this.y > 0.0) {
      this.x = -this.x;
      this.y = -this.y;
    }
  }

  draw() {
    this.xn = cos(alph)*this.x - sin(alph)*this.y;
    this.yn = sin(alph)*this.x + cos(alph)*this.y;
    this.x = this.xn;
    this.y = this.yn;
    this.z = this.zn;
    if (this.y > 0) {
      this.xn = -this.xn;
      this.yn = -this.yn;
      this.x = -this.x;
      this.y = -this.y;
    }
    // Inverse of rotation by (-gamma) about (-y)
    //  which can also be written as (gamma) about (-y)
    //  (The [-y] frame treats z as 'y' and x as 'x' in xy frame)
    this.xn = cos(-gamma)*this.x - sin(-gamma)*this.z;
    this.zn = sin(-gamma)*this.x + cos(-gamma)*this.z;
    this.x = this.xn;
    this.y = this.yn;
    this.z = this.zn;
    // Inverse of rotation by (theta) about (z)
    //  which can be written as (-theta) about (z)
    this.xn = cos(beta)*this.x - sin(beta)*this.y;
    this.yn = sin(beta)*this.x + cos(beta)*this.y;
    this.x = this.xn;
    this.y = this.yn;
    this.z = this.zn;
    // Need to take care of periodic boundary
    if (this.y > 0) {
      this.xn = -this.xn;
      this.yn = -this.yn;
      this.x = -this.x;
      this.y = -this.y;
    }
    // Inverse of rotation by (gamma) about (-y)
    //  which can also be written as (-gamma) about (-y)
    this.xn = cos(gamma)*this.x - sin(gamma)*this.z;
    this.zn = sin(gamma)*this.x + cos(gamma)*this.z;
    this.x = this.xn;
    this.y = this.yn;
    this.z = this.zn;

    if (this.cut == 1) {
      stroke(255, 0, 0, 50);
    } else {
      stroke(0, 0, 255, 50);
    }
    //stroke(colorR,colorG,colorB,25);

    point((sqrt(1/(1-this.y))*this.x - xmin)/(xmax - xmin)*res, (sqrt(1/(1-this.y))*this.z - zmin)/(zmax-zmin)*res);
  }

  rebirth(index) {
    if (index < num_tracers/2) {
      this.cut = 1;
      this.t = (1.0*index)/(1.0*num_tracers)*2.0;
      this.x = sin(this.t*PI);
      this.z = cos(this.t*PI);
      this.y = 0;
      this.xn = this.x;
      this.yn = this.y;
      this.zn = this.z;
    } else {
      this.cut = 2;
      this.t = (1.0*(index - num_tracers/2))/(1.0*num_tracers)*2.0;
      this.x = sin(this.t*PI);
      this.z = cos(this.t*PI);
      this.y = 0;
      this.xn = this.x;
      this.yn = this.y;
      this.zn = this.z;

      this.xn = cos(alph)*this.x - sin(alph)*this.y;
      this.yn = sin(alph)*this.x + cos(alph)*this.y;
      this.x = this.xn;
      this.y = this.yn;
      this.z = this.zn;
      if (this.y > 0) {
        this.xn = -this.xn;
        this.yn = -this.yn;
        this.x = -this.x;
        this.y = -this.y;
      }
      // Inverse of rotation by (gamma) about (-y)
      //  which can also be written as (-gamma) about (-y)
      this.xn = cos(-gamma)*this.x - sin(-gamma)*this.z;
      this.zn = sin(-gamma)*this.x + cos(-gamma)*this.z;
      this.x = this.xn;
      this.y = this.yn;
      this.z = this.zn;
    }
    this.xn = cos(beta)*this.x - sin(beta)*this.y;
    this.yn = sin(beta)*this.x + cos(beta)*this.y;
    this.x = this.xn;
    this.y = this.yn;
    this.z = this.zn;
    // Need to take care of periodic boundary
    if (this.y > 0) {
      this.xn = -this.xn;
      this.yn = -this.yn;
      this.x = -this.x;
      this.y = -this.y;
    }
    // Inverse of rotation by (gamma) about (-y)
    //  which can also be written as (-gamma) about (-y)
    this.xn = cos(gamma)*this.x - sin(gamma)*this.z;
    this.zn = sin(gamma)*this.x + cos(gamma)*this.z;
    this.x = this.xn;
    this.y = this.yn;
    this.z = this.zn;

    if (this.y > 0.0) {
      this.x = -this.x;
      this.y = -this.y;
    }
  }
}
