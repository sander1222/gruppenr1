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

Matter.Render.run(render);

const ball = Matter.Bodies.circle(400, 100, 40, { restitution: 0.9 });
Matter.World.add(engine.world, [ball]);

Matter.Runner.run(engine);
