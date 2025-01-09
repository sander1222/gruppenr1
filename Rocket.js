const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } =
  Matter;

const scoreDisplay = document.getElementById("Score");
let score = 0;
scoreDisplay.textContent = `Score: ${score}`;

let playHeight = -100;
let PlayWidth = 100;

let spawn = true;
let saved = false;
let ground;

document.getElementById("Lost").style.display = "none";

let Y = window.innerHeight + playHeight;
let X = window.innerWidth - PlayWidth;
const Xrev = X / 2;
let Yrev = Y / 2;
let x = true;

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
  let x = Math.random() * 10;
  x = Math.round(x);
  console.log(x);
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
  if (x === 0) {
    // crash();
  }
}, 500);

function crash() {
  engine.gravity.y = 1;
  engine.gravity.x = 0;
  spawn = false;
  x = false;
  scoreDisplay.textContent = `Score: 0`;
  document.getElementById("Lost").style.display = "block";
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

let safe = false;

window.addEventListener("keydown", (e) => {
  if (x === true) {
    if (e.key === " " && safe === false) {
      save();
      safe = true;
    }
    if (e.key === "r" && safe === true) {
      boogi();
      safe = false;
    }
  }
});

Matter.Render.run(render);

Matter.Runner.run(engine);
