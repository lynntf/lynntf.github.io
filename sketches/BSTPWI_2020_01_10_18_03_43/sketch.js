// Biaxial hemispherical PWI
// lynntf January 2020

res = 500;
xmin = -1;
xmax = 1;
ymin = -1;
ymax = 1;
zmin = -1;
zmax = 1;
max_iters = 10000000;
num_tracers = 1000;
aeb = false;
gamma90 = false;
projection = 0;

tracers = [];

function setup() {
  gamma = 120*PI/180;
  alph = 57*PI/180;
  beta = 57*PI/180;
  dimx = min(displayWidth,res);
  dimy = dimx;
  var canvas = createCanvas(dimx, dimy + 100);
  canvas.parent('sketch-holder');
  background(255, 255, 255);
  strokeWeight(0.5)
  //colorMode(RGB,255,255,255);
  //noStroke();
  // make some tracers
  for (i = 0; i < num_tracers; i++) {
    tracers[i] = new Tracers(i); // call the constructor of the travelers
  }
  
  
  checkbox = createCheckbox('', false);
  checkboxlabel = createSpan('&alpha; = &beta;');
  checkboxlabel.position(175,dimy + 75);
  checkbox.changed(alphEqBeta);
  checkbox.position(150,dimy + 75);
  
  checkbox = createCheckbox('', false);
  checkboxlabel = createSpan('&gamma; = 90&deg;');
  checkboxlabel.position(250,dimy + 75);
  checkbox.changed(orthog);
  checkbox.position(225,dimy + 75);
  
  checkbox = createCheckbox('Projection', false);
  checkbox.changed(proj);
  checkbox.position(0,dimy + 75);
  
  resetButton = createButton('Redraw');
  resetButton.mousePressed(reset);
  resetButton.position(0, dimy + 0);
  
  randomizeButton = createButton('Randomize values');
  randomizeButton.mousePressed(randomize);
  randomizeButton.position(0, dimy + 25);
  
  randrButton = createButton('Randomize + redraw');
  randrButton.mousePressed(randr);
  randrButton.position(0, dimy + 50);
  
  alabel = createSpan('&alpha;');
  alabel.position(150,dimy + 0);
  blabel = createSpan('&beta;');
  blabel.position(150,dimy + 25);
  glabel = createSpan('&gamma;');
  glabel.position(150,dimy + 50);
  inpAlph = createInput('57');
  inpAlph.position(200,dimy + 0);
  inpBeta = createInput('57');
  inpBeta.position(200,dimy + 25);
  inpGamma = createInput('120');
  inpGamma.position(200,dimy + 50);
  iters = 0;
}

function proj() {
  reset();
  if (this.checked()) {
    projection = 1;
  } else {
    projection = 0;
  }
}

function alphEqBeta() {
  if (this.checked()) {
    aeb = true;
  } else {
    aeb = false;
  }
}

function orthog() {
  if (this.checked()) {
    gamma90 = true;
  } else {
    gamma90 = false;
  }
}

function draw() {
  stroke(255)
  rect(0, 0, 55, 55);
  text(iters, 0, 10);
  for (i=0; i<num_tracers; i++) {
    tracers[i].draw();
  }
  iters++;
  if (iters > max_iters) {
    for(i=0; i < num_tracers; i++){
      tracers[i].rebirth();
    }
    iters = 0;
  }
}


function randomize() {
  a = random(0,PI);
  b = random(0,PI);
  g = random(0,PI);
  if(aeb) {
    b = a;
  }
  if(gamma90){
    g = PI/2;
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
  iters = 0;
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
// 120
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
    this.colorG = random(0, 1);
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
    if (this.cut == 1) {
      stroke(255, 0, 0, 10);
      // stroke(this.colorR, this.colorG, this.colorB, 10);
    } else {
      stroke(0, 0, 255, 10);
    }
    // stroke(this.colorR,this.colorG,this.colorB,25);
    if (projection == 1){
    point((sqrt(1/(1-this.y))*this.x - xmin)/(xmax - xmin)*dimx, (sqrt(1/(1-this.y))*this.z - zmin)/(zmax-zmin)*dimy);
    } else {
    point((this.x- xmin)/(xmax - xmin)*dimx, (this.z - zmin)/(zmax-zmin)*dimy);
    }
    
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
  }

  rebirth(index) {
    // if (index < num_tracers/2) {
    if (random() < 0.5) {
      this.cut = 1;
      // this.t = (1.0*index)/(1.0*num_tracers)*2.0;
      this.t = random()*2.0;
      this.x = sin(this.t*PI);
      this.z = cos(this.t*PI);
      this.y = 0;
      this.xn = this.x;
      this.yn = this.y;
      this.zn = this.z;
    } else {
      this.cut = 2;
      // this.t = (1.0*(index - num_tracers/2))/(1.0*num_tracers)*2.0;
      this.t = random()*2.0;
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
