const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } =
  Matter;

let playHeight = -100;
let PlayWidth = 100;

let spawn = true;
let saved = false;
let ground;

let Y = window.innerHeight + playHeight;
let X = window.innerWidth - PlayWidth;
const Xrev = X / 2;
let Yrev = Y / 2;

const engine = Matter.Engine.create();
const { world } = engine;
const render = Matter.Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
  },
});

engine.gravity.y = -1;
engine.gravity.x = 0;

Matter.Render.run(render);

Matter.Composite.add(engine.world, [
  //Border
  Matter.Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 100, {
    isStatic: true,
  }),
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

function addBalls(count, radius, options) {
  const balls = [];
  for (let i = 0; i < count; i++) {
    const posX = Math.random() * window.innerWidth;
    const posY = window.innerHeight + 100;
    const ball = Matter.Bodies.circle(posX, posY, radius, options);
    balls.push(ball);
  }
  return balls;
}

setInterval(() => {
  if (!spawn) return;
  const balls = addBalls(1, X / 70, {
    restitution: 1,
    friction: 1,
  });
  Composite.add(world, balls);
  let x = Math.random();
  console.log(x);
  if (x === 1) {
    crash();
  }
}, 1000);

function crash() {
  engine.gravity.y = 1;
  engine.gravity.x = 0;
  spawn = false;
}

function save() {
  saved = true;
  engine.gravity.y = 1;
  engine.gravity.x = 0;
  spawn = false;
  ground = Matter.Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight,
    window.innerWidth,
    100,
    {
      isStatic: true,
    }
  );
  Matter.Composite.add(engine.world, [ground]);
}

function boogi() {
  saved = false;
  engine.gravity.y = -1;
  engine.gravity.x = 0;
  spawn = true;
  if (ground) {
    Matter.Composite.remove(engine.world, ground);
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    save();
  }
  if (e.key === "r" || e.key === "R") {
    boogi();
  }
});

Matter.Render.run(render);

Matter.Runner.run(engine);
