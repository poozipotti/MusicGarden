import { Flower } from "./Flower/index.js";
const flowers = [];
window.onload = function () {
  console.log("started");
  startCanvas();
};
function startCanvas() {
  const flowerCanvas = document.getElementById("flowerCanvas");
  if (!flowerCanvas) {
    throw new Error("could not find flower Canvas");
  }
  const myContext = flowerCanvas.getContext("2d");
  if (!flowerCanvas) {
    throw new Error("could not get context");
  }
  flowers.push(new Flower(myContext));
  setCanvasToWindowSize();
  window.onresize = function (_e) {
    setCanvasToWindowSize();
  };

  const BPM = 120;

  //milliseconds per beat
  const MSPB = 60000 / BPM;
  window.setInterval(() => {
    beatUpdate(myContext);
  }, MSPB/16); // we want to run the beat loop on 16 notes

  //state update //
  window.setInterval(() => {
    stateUpdate();
  }, 16);
  window.setInterval(() => {
    draw(myContext);
  }, 16);
  draw(myContext)
}
function beatUpdate() {
  //plays audio based on state
  flowers.forEach((flower) => {
    flower.beatUpdate();
  });
}
function stateUpdate() {
  //uses deltas to calculate stateupdates
}
function draw(ctx) {
  clearCanvas(ctx);
  flowers.forEach((flower) => {
    flower.visualizer.draw();
  });
}
function clearCanvas(ctx) {
  var primaryColor = "#000000";
  ctx.fillStyle = primaryColor;
  ctx.fillRect(0, 0, flowerCanvas.width, flowerCanvas.height);
}

function setCanvasToWindowSize() {
  const flowerCanvas = document.getElementById("flowerCanvas");
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  flowerCanvas.setAttribute("width", windowWidth);
  flowerCanvas.setAttribute("height", windowHeight);
}
