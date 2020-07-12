/* eslint-disable */

const defineMotion = () => {
  const def = chainer.circleDef({
    position: { x: 300, y: 600 },
    strokeWeight: 12,
    size: 0
  });
  def.position.addKeyFrame(60, { x: 300, y: 300 }, "EaseOutExpo");
  def.strokeWeight.addKeyFrame(120, 0, "linear");
  def.size.addKeyFrame(60, 100, "linear");
  def.size.addKeyFrame(120, 300, "EaseOutExpo");

  return def.build();
};

const motion = defineMotion();

function setup() {
  createCanvas(600, 600);
  chainer.initializeP5();
}

function draw() {
  background(255);
  motion.draw();
}
