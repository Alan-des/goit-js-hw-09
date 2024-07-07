const element = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
};

element.buttonStart.addEventListener('click', startColor);
element.buttonStop.addEventListener('click', stopColor);
let timerId = null;
let isActive = false;

function startColor() {
  if (isActive) {
    return;
  }
  isActive = true;
  timerId = setInterval(timerChangeColor, 1000);
}

function timerChangeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function stopColor() {
  clearInterval(timerId);
  isActive = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
