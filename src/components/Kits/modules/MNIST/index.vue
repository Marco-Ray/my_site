<template>
  <div class="card elevation">
    <div>
      <canvas
        class="canvas elevation"
        id="canvas"
        width="280"
        height="280"
      ></canvas>

      <div class="button" id="clear-button">CLEAR</div>

      <div class="predictions">
        <div class="prediction-col" id="prediction-0">
          <div class="prediction-bar-container">
            <div class="prediction-bar"></div>
          </div>
          <div class="prediction-number">0</div>
        </div>

        <div class="prediction-col" id="prediction-1">
          <div class="prediction-bar-container">
            <div class="prediction-bar"></div>
          </div>
          <div class="prediction-number">1</div>
        </div>

        <div class="prediction-col" id="prediction-2">
          <div class="prediction-bar-container">
            <div class="prediction-bar"></div>
          </div>
          <div class="prediction-number">2</div>
        </div>

        <div class="prediction-col" id="prediction-3">
          <div class="prediction-bar-container">
            <div class="prediction-bar"></div>
          </div>
          <div class="prediction-number">3</div>
        </div>

        <div class="prediction-col" id="prediction-4">
          <div class="prediction-bar-container">
            <div class="prediction-bar"></div>
          </div>
          <div class="prediction-number">4</div>
        </div>

        <div class="prediction-col" id="prediction-5">
          <div class="prediction-bar-container">
            <div class="prediction-bar"></div>
          </div>
          <div class="prediction-number">5</div>
        </div>

        <div class="prediction-col" id="prediction-6">
          <div class="prediction-bar-container">
            <div class="prediction-bar"></div>
          </div>
          <div class="prediction-number">6</div>
        </div>

        <div class="prediction-col" id="prediction-7">
          <div class="prediction-bar-container">
            <div class="prediction-bar"></div>
          </div>
          <div class="prediction-number">7</div>
        </div>

        <div class="prediction-col" id="prediction-8">
          <div class="prediction-bar-container">
            <div class="prediction-bar"></div>
          </div>
          <div class="prediction-number">8</div>
        </div>

        <div class="prediction-col" id="prediction-9">
          <div class="prediction-bar-container">
            <div class="prediction-bar"></div>
          </div>
          <div class="prediction-number">9</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { InferenceSession } from 'onnxjs';

export default {
  name: "MNIST",
  mounted() {
    this.MNISTKit();
  },
  methods: {
    MNISTKit() {
      const CANVAS_SIZE = 280;
      const CANVAS_SCALE = 0.5;

      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      const clearButton = document.getElementById("clear-button");

      let isMouseDown = false;
      let hasIntroText = true;
      let lastX = 0;
      let lastY = 0;

// Load our model.
      const sess = new InferenceSession();
      const loadingModelPromise = sess.loadModel("../Kits/mnist_onnx_model.onnx");

// Add 'Draw a number here!' to the canvas.
      ctx.lineWidth = 28;
      ctx.lineJoin = "round";
      ctx.font = "28px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#212121";
      ctx.fillText("Loading...", CANVAS_SIZE / 2, CANVAS_SIZE / 2);

// Set the line color for the canvas.
      ctx.strokeStyle = "#212121";

      function clearCanvas() {
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        for (let i = 0; i < 10; i++) {
          const element = document.getElementById(`prediction-${i}`);
          element.className = "prediction-col";
          element.children[0].children[0].style.height = "0";
        }
      }

      function drawLine(fromX, fromY, toX, toY) {
        // Draws a line from (fromX, fromY) to (toX, toY).
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.closePath();
        ctx.stroke();
        updatePredictions();
      }

      async function updatePredictions() {
        // Get the predictions for the canvas data.
        const imgData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        const input = new onnx.Tensor(new Float32Array(imgData.data), "float32");

        const outputMap = await sess.run([input]);
        const outputTensor = outputMap.values().next().value;
        const predictions = outputTensor.data;
        const maxPrediction = Math.max(...predictions);

        for (let i = 0; i < predictions.length; i++) {
          const element = document.getElementById(`prediction-${i}`);
          element.children[0].children[0].style.height = `${predictions[i] * 100}%`;
          element.className =
            predictions[i] === maxPrediction
              ? "prediction-col top-prediction"
              : "prediction-col";
        }
      }

      function canvasMouseDown(event) {
        isMouseDown = true;
        if (hasIntroText) {
          clearCanvas();
          hasIntroText = false;
        }
        const x = event.offsetX / CANVAS_SCALE;
        const y = event.offsetY / CANVAS_SCALE;

        // To draw a dot on the mouse down event, we set lastX and lastY to be
        // slightly offset from x and y, and then we call `canvasMouseMove(event)`,
        // which draws a line from (lastX, lastY) to (x, y) that shows up as a
        // dot because the difference between those points is so small. However,
        // if the points were the same, nothing would be drawn, which is why the
        // 0.001 offset is added.
        lastX = x + 0.001;
        lastY = y + 0.001;
        canvasMouseMove(event);
      }

      function canvasMouseMove(event) {
        const x = event.offsetX / CANVAS_SCALE;
        const y = event.offsetY / CANVAS_SCALE;
        if (isMouseDown) {
          drawLine(lastX, lastY, x, y);
        }
        lastX = x;
        lastY = y;
      }

      function bodyMouseUp() {
        isMouseDown = false;
      }

      function bodyMouseOut(event) {
        // We won't be able to detect a MouseUp event if the mouse has moved
        // ouside the window, so when the mouse leaves the window, we set
        // `isMouseDown` to false automatically. This prevents lines from
        // continuing to be drawn when the mouse returns to the canvas after
        // having been released outside the window.
        if (!event.relatedTarget || event.relatedTarget.nodeName === "HTML") {
          isMouseDown = false;
        }
      }

      loadingModelPromise.then(() => {
        canvas.addEventListener("mousedown", canvasMouseDown);
        canvas.addEventListener("mousemove", canvasMouseMove);
        document.body.addEventListener("mouseup", bodyMouseUp);
        document.body.addEventListener("mouseout", bodyMouseOut);
        clearButton.addEventListener("mousedown", clearCanvas);

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        ctx.fillText("Draw a number here!", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
      })
    }
  },
}
</script>

<style scoped>
.elevation {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
  0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.card {
  background: #fff;
  border-radius: 4px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.canvas {
  border-radius: 4px;
  height: 140px;
  width: 140px;
}

.button {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
  0 1px 5px 0 rgba(0, 0, 0, 0.12), inset 0 0 0 rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.25px;
  line-height: 36px;
  margin: 16px 0;
  text-align: center;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  width: 140px;
}

.button:hover {
  background: #f5f5f5;
}

.button:active {
  box-shadow: 0 0 rgba(0, 0, 0, 0.2), 0 0 rgba(0, 0, 0, 0.14),
  0 0 rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.05s cubic-bezier(0.4, 0, 0.2, 1);
}

.predictions {
  display: flex;
}

.prediction-col {
  padding: 0 2px;
}

.prediction-bar-container {
  background: #f5f5f5;
  height: 140px;
  width: 10px;
  position: relative;
}

.prediction-bar {
  background: #e0e0e0;
  bottom: 0;
  position: absolute;
  width: 100%;
}

.prediction-number {
  color: #bdbdbd;
  font-size: 14px;
  text-align: center;
}

.top-prediction .prediction-bar {
  background: #ff0000;
}

.top-prediction .prediction-number {
  color: #ff0000;
  font-weight: bold;
}
</style>
