const { Engine, Render, Runner, Bodies, Composite, Events } = Matter;

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
  Bodies.rectangle(0, height / 2, 20, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 20, height, { isStatic: true }),
];

Composite.add(world, boundaries);

// Adjust the rows
const rows = 9;
const pegRadius = 8;
const pegSpacing = 50;
const centerX = width / 2;
const centerY = height / 4; // Dynamically adjust based on screen size

// Add pegs
for (let row = 0; row < rows; row++) {
  const pegCount = row === 0 ? 2 : row + 1; // First row has 2 pegs, subsequent rows follow the triangular pattern
  for (let col = 0; col < pegCount; col++) {
    const x = centerX + (col - pegCount / 2 + 0.5) * pegSpacing; // Center the pegs
    const y = centerY + row * pegSpacing;
    const peg = Bodies.circle(x, y, pegRadius, {
      isStatic: true,
      render: { fillStyle: "white" },
    });
    Composite.add(world, peg);
  }
}

// Add slots for balls to land on
const slotValues = [40, 30, 20, 10, 1, 10, 20, 30, 40];
const slotHeight = 20;
const slotWidth = 60;
const slotSpacing = 70;

const totalMachineWidth = (slotValues.length - 1) * slotSpacing + slotWidth;

// Center the slots
// Calculate the y-coordinate of the last row of pegs
const lastRowY = centerY + (rows - 1) * pegSpacing;
const slotY = lastRowY + pegSpacing * 1; // Slightly below the last row

// Center the slots directly under the last row of pegs
const slots = [];
for (let i = 0; i < slotValues.length; i++) {
  const x =
    centerX - ((slotValues.length - 1) * pegSpacing) / 2 + i * pegSpacing;
  const slot = Bodies.rectangle(x, slotY, pegSpacing, slotHeight, {
    isStatic: true,
    render: { fillStyle: "red" },
    label: `slot-${i}`,
  });
  slots.push({ body: slot, value: slotValues[i] });
  Composite.add(world, slot);
}

// Set background color
document.body.style.backgroundColor = "#1b2b3a";

// Ball config
const ballRadius = 6;

function createBall(x, y) {
  const ball = Bodies.circle(x, y, ballRadius, {
    restitution: 0.6,
    render: { fillStyle: "red" },
  });
  Composite.add(world, ball);
}

// Add score system
let score = 0;

// Create a score display
const scoreDisplay = document.createElement("div");
scoreDisplay.style.position = "absolute";
scoreDisplay.style.top = "100px";
scoreDisplay.style.right = "300px";
scoreDisplay.style.color = "white";
scoreDisplay.style.fontSize = "24px";
scoreDisplay.textContent = `Score: ${score}`;
document.body.appendChild(scoreDisplay);

// Update score on collision
Events.on(engine, "collisionStart", (event) => {
  const pairs = event.pairs;
  pairs.forEach((pair) => {
    const { bodyA, bodyB } = pair;

    slots.forEach((slot) => {
      if (bodyA === slot.body || bodyB === slot.body) {
        score += slot.value;
        scoreDisplay.textContent = `Score: ${score}`;
        // Optionally, remove the ball after it scores
        Composite.remove(world, bodyA === slot.body ? bodyB : bodyA);
      }
    });
  });
});

// Ball creation on mouse click
canvas.addEventListener("click", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  createBall(mouseX, mouseY);
});
