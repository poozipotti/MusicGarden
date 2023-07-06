import { Flower } from "./Flower/index.js";
let flowers = {};
let hasInit = false;
let canvasCtx;
let audioContext;

window.onload = function () {
  init();
};
function init() {
  const listener = (window.onclick = () => {
    console.log("clicked");
    if (!hasInit) {
      startCanvas();
      hasInit = true;
    } else {
      resetFlowers();
      const count = Math.floor(Math.random() * 5) + 1;
      for (let i = 0; i <= count; i++) {
        addFlower(true);
      }
    }
  });
}
function addFlower(canOverwrite = true) {
  const tempFlower = new Flower(canvasCtx, audioContext);
  const MAX_SIMILIAR_FLOWERS = 1;
  const BUCKETS = 6;
  const flowerBucket = tempFlower.data.stemHeight % BUCKETS;
  if (!flowers[flowerBucket]) {
    flowers[flowerBucket] = [tempFlower];
    return;
  }
  if (flowers[flowerBucket].length >= MAX_SIMILIAR_FLOWERS) {
    if (canOverwrite) {
      flowers[flowerBucket].splice(0, 1);
    } else {
      console.warn("flower not added too many similiar notes");
      return;
    }
  }
  flowers[flowerBucket].push(tempFlower);
  console.log(flowers)
}
function getFlowers() {
  return Object.values(flowers).reduce(
    (allFLowers, flowerBucket) => [...allFLowers, ...flowerBucket],
    []
  );
}

function resetFlowers() {
  getFlowers().forEach((flower) => {
    flower.destroy();
  });
  flowers = {};
}


function startCanvas() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContext();
  const flowerCanvas = document.getElementById("flowerCanvas");
  if (!flowerCanvas) {
    throw new Error("could not find flower Canvas");
  }
  canvasCtx = flowerCanvas.getContext("2d");
  if (!flowerCanvas) {
    throw new Error("could not get context");
  }
  addFlower();
  setCanvasToWindowSize();
  window.onresize = function (_e) {
    setCanvasToWindowSize();
  };

  const BPM = 120;

  //milliseconds per beat
  const MSPB = 60000 / BPM;
  window.setInterval(() => {
    beatUpdate(canvasCtx);
  }, MSPB / 16); // we want to run the beat loop on 16 notes

  //state update //
  window.setInterval(() => {
    stateUpdate();
  }, 16);
  window.setInterval(() => {
    draw(canvasCtx);
  }, 16);
  draw(canvasCtx);
}
let count = 0;
function beatUpdate() {
  count++;
  if (count == 32) {
    count = 0;
  }

  //plays audio based on state
  getFlowers().forEach((flower) => {
    flower.beatUpdate();
  });
}
function stateUpdate() {
  //uses deltas to calculate stateupdates
}
function draw(ctx) {
  clearCanvas(ctx);
  getFlowers().forEach((flower) => {
    flower.visualizer.draw();
  });
}
function clearCanvas(ctx) {
  var primaryColor = "#d8ddeb";
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
