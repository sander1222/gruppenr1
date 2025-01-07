const engine = Matter.Engine.create();
const render = Matter.Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false,
  },
});

var Bodies = Matter.Bodies;

Matter.Render.run(render);

const ball = Matter.Bodies.circle(400, 100, 40, { restitution: 0.9 });
Matter.World.add(engine.world, [ball]);

const ground = Matter.Bodies.rectangle(400, 400, 500, 30, { isStatic: true });
Matter.World.add(engine.world, [ground]);

Matter.Render.run(render);

Matter.Runner.run(engine);
