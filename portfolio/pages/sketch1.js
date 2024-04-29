function setup() {

  let canvas=
  createCanvas(400, 400);

   canvas.parent('sketch2');
}

function draw() {
  background('White');
  noStroke();
  fill('MediumBlue');
  rect(0, 0, 110, 30);
  fill('DarkMagenta');
  rect(0, 30, 40, 80);
  fill('Chocolate');
  rect(40, 80, 70, 30);
  fill('DarkGreen');
  rect(80, 30, 30, 50);
  fill('DarkGrey');
  rect(40, 30, 10, 10);
  rect(70, 30, 10, 10);
  rect(40, 70, 10, 10);
  rect(70, 70, 10, 10);
  fill('Black');
  rect(50, 40, 20, 30);
}
