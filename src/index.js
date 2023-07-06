import { FlowerRenderer } from "./Rendering/FlowerRenderer";
let flowerRenderer;

window.onload = function () {
  init();
};
function init() {
  const listener = (window.onclick = () => {
    console.log("clicked");
    if (!flowerRenderer) {
      startCanvas();
      hasInit = true;
    } else {
      flowerRenderer.resetFlowers();
      const count = Math.floor(Math.random() * 5) + 1;
      for (let i = 0; i <= count; i++) {
        flowerRenderer.addFlower(true);
      }
    }
  });
}

function startCanvas() {
  flowerRenderer = new FlowerRenderer();
  flowerRenderer.addFlower();
  setCanvasToWindowSize();
  window.onresize = function (_e) {
    setCanvasToWindowSize();
  };
}

function setCanvasToWindowSize() {
  const flowerCanvas = document.getElementById("flowerCanvas");
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  flowerCanvas.setAttribute("width", windowWidth);
  flowerCanvas.setAttribute("height", windowHeight);
}
