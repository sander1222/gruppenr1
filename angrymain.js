const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } =
  Matter;

// Create the physics engine
const engine = Engine.create();
const { world } = engine;

// Set up the canvas size to fill the screen
const canvas = document.getElementById("plinkoCanvas");
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

// Create the render object
const render = Render.create({
  element: document.body,
  engine: engine,
  canvas: canvas,
  options: { width: width, height: height, wireframes: false },
});

// Start the render and physics engine
Render.run(render);
Runner.run(Runner.create(), engine);

// Create the walls (boundaries)
const boundaries = [
  Bodies.rectangle(width / 2, 0, width, 20, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 20, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 20, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 20, height, { isStatic: true }),
];

Composite.add(world, boundaries);

// Adjust the rows
const rows = 11;
const pegRadius = 7;
const pegSpacing = 50;
const centerX = width / 2;
const centerY = 100;

// Add pegs
for (let row = 0; row < rows; row++) {
  for (let col = 0; col <= row; col++) {
    const x = centerX + (col - row / 2) * pegSpacing;
    const y = centerY + row * pegSpacing;
    const peg = Bodies.circle(x, y, pegRadius, {
      isStatic: true,
      render: { fillStyle: "white" },
    });
    Composite.add(world, peg);
  }
}

// Add slots for balls to land on
const slotValues = [30, 20, 10, 1, 10, 20, 30];
const slotHeight = 30;
const slotWidth = 60;
const slotSpacing = 70;

const totalMachineWidth = (slotValues.length - 1) * slotSpacing + slotWidth;

// Center the slots
for (let i = 0; i < slotValues.length; i++) {
  const x = centerX - totalMachineWidth / 2 + i * slotSpacing + slotWidth / 2;
  const y = height - 20;
  const slot = Bodies.rectangle(x, y, slotWidth, slotHeight, {
    isStatic: true,
    render: { fillStyle: "red" },
  });
  Composite.add(world, slot);
}

// Set background color
document.body.style.backgroundColor = "#1b2b3a";

// // Make the balls drop automatically (uncomment if needed)
// setInterval(() => {
//   const ball = Bodies.circle(centerX, 25, 10, {
//     render: { fillStyle: "white" },
//   }); // White balls
//   Composite.add(world, ball);
// }, 1000);

//ball config
const ballRadius = 6;

function createBall(x, y) {
  const ball = Bodies.circle(x, y, ballRadius, {
    restitution: 0.6,
    render: { fillStyle: "red" },
  });
  Composite.add(world, ball);
}

canvas.addEventListener("click", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  createBall(mouseX, mouseY);
});
