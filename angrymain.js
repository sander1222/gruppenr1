const { Composites } = require("matter-js");

const { Engine, Render, Runner, Bodies, Composite } = Matter;

const engine = Engine.create();

const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false,
  },
});

const box = Bodies.rectangle(400, 200, 80, 80);
const ground = Bodies.rectangle(400, 500, 800, 50, { isStatic: true });

Composite.add(engine.world, [box, ground]);

Render.run(render);
Render.run(Runner.create(), engine);
