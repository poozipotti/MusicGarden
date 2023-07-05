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
    updateCanvas();
  };

  main(myContext);
  window.setInterval(() => {
    main(myContext);
  }, 1000);
}
function main(ctx) {
  draw(ctx);
  update();
}
function update() {
  /**
   * currently a noop
   *
   * */
}

function draw(ctx) {
  const flowerCanvas = document.getElementById("flowerCanvas");
  flowers.forEach((flower) => {
    flower.visualizer.draw()
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
