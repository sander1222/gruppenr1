const { Composites } = require("matter-js");

const { engine, Render, Runner, Bodies; composite } = Matter;

const engine =Engine.create();

const render = Render.create({
    element:  document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false,
    }
});

const box = Bodies.rectangle()


Composite.add(engine.world, [box, round]);