let playHeight = -100;
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
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
  },
});

engine.gravity.y = 0;
engine.gravity.x = 0;

Matter.Render.run(render);

Matter.Composite.add(engine.world, [
  //Border
  Matter.Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 100, {
    isStatic: true,
  }),
  Matter.Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight,
    window.innerWidth,
    100,
    {
      isStatic: true,
    }
  ),
  Matter.Bodies.rectangle(
    window.innerWidth,
    window.innerHeight / 2,
    100,
    window.innerHeight,
    {
      isStatic: true,
    }
  ),
  Matter.Bodies.rectangle(0, window.innerHeight / 2, 100, window.innerHeight, {
    isStatic: true,
  }),
]);

let mouse = Matter.Mouse.create(render.canvas),
  mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

// Add the mouse constraint to the world
Matter.World.add(engine.world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

function addBalls(count, radius, options) {
  const balls = [];
  for (let i = 0; i < count; i++) {
    const posX = window.innerWidth / 2;
    const posY = window.innerHeight / 2;
    const ball = Matter.Bodies.circle(posX, posY, radius, options);
    balls.push(ball);
  }
  return balls;
}

// Add multiple balls to the world
const balls = addBalls(1, X / 70, {
  restitution: 0.8,
  friction: 0,
});
Matter.World.add(engine.world, balls);

Matter.Render.run(render);

Matter.Runner.run(engine);
