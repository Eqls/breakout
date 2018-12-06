const GAME_FPS = 60

let canvas = document.getElementById('gameCanvas')
let ctx = canvas.getContext('2d')
let timer = Date.now()
let fps = 0
let displayFps = 0
let x = canvas.width / 2
let y = canvas.height - 30
let dx = 1
let dy = 0
let ballRadius = 10

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawFpsCounter()
  drawBall()
  x += dx
  y += dy
}

function drawBall() {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}

function drawFpsCounter() {
  console.log(`${Date.now()}  ${timer}`)
  if (Date.now() - timer < 1000) {
    fps++
  } else {
    timer = Date.now()
    displayFps = fps
    fps = 0
  }
  ctx.beginPath()
  ctx.font = '20px Arial'
  ctx.fillStyle = 'gold'
  ctx.fillText(displayFps === 0 ? fps : displayFps, 10, 20)
  ctx.closePath()
}

setInterval(draw, 1000 / GAME_FPS)
