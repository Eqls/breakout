const GAME_FPS = 60

let canvas = document.getElementById('gameCanvas')
let ctx = canvas.getContext('2d')
let timer = Date.now()
let fps = 0
let displayFps = 0
let x = canvas.width / 2
let y = canvas.height - 30
let dx = 1
let dy = -2
let ballRadius = 10
let colorArray = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF'
]
let ballColor =
  colorArray[Math.floor(Math.random() * Math.floor(colorArray.length - 1))]

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ajustMovingPos()
  drawFpsCounter()
  drawBall()
  x += dx
  y += dy
}

function drawBall() {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = ballColor
  ctx.fill()
  ctx.closePath()
}

function ajustMovingPos() {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx
    ballColor =
      colorArray[Math.floor(Math.random() * Math.floor(colorArray.length - 1))]
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy
    ballColor =
      colorArray[Math.floor(Math.random() * Math.floor(colorArray.length - 1))]
  }
}

function drawFpsCounter() {
  if (Date.now() - timer < 1000) {
    fps++
  } else {
    timer = Date.now()
    displayFps = fps
    fps = 0
  }
  ctx.beginPath()
  ctx.globalCompositeOperation = 'destination-over'
  ctx.font = '20px Arial'
  ctx.fillStyle = 'gold'
  ctx.fillText(displayFps === 0 ? fps : displayFps, 10, 20)
  ctx.closePath()
}

setInterval(draw, 1000 / GAME_FPS)
