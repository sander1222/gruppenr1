let playHeight = 1000;
let PlayWidth = 100;

let Y = window.innerHeight + playHeight;
let X = window.innerWidth - PlayWidth;
const Xrev = X / 2;
let Yrev = Y / 2;

const engine = Matter.Engine.create();
const render = Matter.Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: X,
    height: Y,
    wireframes: false,
  },
});

Matter.Render.run(render);

Matter.Composite.add(engine.world, [
  Matter.Bodies.rectangle(Xrev, 0, X, 50, { isStatic: true }),
  Matter.Bodies.rectangle(Xrev, Y, X, 50, { isStatic: true }),
  Matter.Bodies.rectangle(X, Yrev, 50, Y, { isStatic: true }),
  Matter.Bodies.rectangle(0, Yrev, 50, Y, { isStatic: true }),
]);

function addBalls(count, radius, options) {
  const balls = [];
  for (let i = 0; i < count; i++) {
    const posX = Math.random() * (X - 100) + 50;
    const posY = Math.random() * 100 + 50;
    const ball = Matter.Bodies.circle(posX, posY, radius, options);
    balls.push(ball);
  }
  return balls;
}

// Add multiple balls to the world
const balls = addBalls(100, 10, { restitution: 0.1, friction: 0.05 });
Matter.World.add(engine.world, balls);

Matter.Render.run(render);

Matter.Runner.run(engine);
