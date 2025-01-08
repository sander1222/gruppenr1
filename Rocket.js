let Y = window.innerHeight;

let X = window.innerWidth;

X = X - 100;
Y = Y - 100;

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

var Bodies = Matter.Bodies;

Matter.Render.run(render);

const ball = Matter.Bodies.circle(400, 100, 30, { restitution: 0.9 });
Matter.World.add(engine.world, [ball]);

const ground = Matter.Bodies.rectangle(400, 300, 500, 30, { isStatic: true });
Matter.World.add(engine.world, [ground]);

Matter.Render.run(render);

Matter.Runner.run(engine);
