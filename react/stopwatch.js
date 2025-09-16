import "./styles.css";

// Write your JavaScript here.

let INTERVAL_MS = 1000 / 60;
let timerId;
let startTimerPointer = 0;
let milliSecondLastTimePointer = 0;

class Stopwatch {
  constructor() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.isRunning = false;
    this.intervalId = null;
    this.displayElement = document.getElementById("display");
    this.startBtn = document.getElementById("start-button");
    this.stopBtn = document.getElementById("stop-button");
    this.resetBtn = document.getElementById("reset-button");

    console.log(this.startBtn, this.stopBtn);

    this.startBtn.addEventListener("click", () => this.start());
    this.stopBtn.addEventListener("click", () => this.stop());
    this.resetBtn.addEventListener("click", () => this.reset());
  }

  start() {
    console.log("calling start", this.isRunning);
    if (!this.isRunning) {
      this.startTime = Date.now() - this.elapsedTime;
      this.isRunning = true;
      this.intervalId = setInterval(() => this.updateDisplay(), 10);
      this.startBtn.disabled = true;
      this.stopBtn.disabled = false;
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.intervalId);
      this.startBtn.disabled = false;
      this.stopBtn.disabled = true;
    }
  }

  reset() {
    this.stop();

    this.updateDisplay();
    this.startBtn.disabled = false;
    this.stopBtn.disabled = false;
    this.elapsedTime = 0;
  }

  updateDisplay() {
    if (this.isRunning) {
      this.elapsedTime = Date.now() - this.startTime;
    }
    this.displayElement.textContent = this.formatTime(this.elapsedTime);
  }

  formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${ms.toString().padStart(2, "0")}`;
  }
}

(function () {
  new Stopwatch();
})();
