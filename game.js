const GAME_FPS = 60
const BALL_RADIUS = 10
const PADDLE_HEIGHT = 10
const PADDLE_WIDTH = 75

let canvas = document.getElementById('gameCanvas')
// canvas.width = window.innerWidth
// canvas.height = window.innerHeight
let ctx = canvas.getContext('2d')
let timer = Date.now()
let fps = 0
let displayFps = 0
let x = canvas.width / 2
let y = canvas.height / 1.5
let direction = [1, -1]
let dx = 1 * direction[Math.floor(Math.random() * direction.length)]
let dy = 2 * direction[Math.floor(Math.random() * direction.length)]
console.log(`${dx} ${dy}`)
let paddleX = (canvas.width - PADDLE_WIDTH) / 2
let rightPressed = false
let leftPressed = false
let ballColor = '#6666FF'
let isGameOver = false

/**
 * Event listeners to handle paddle movement
 */
document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

function resetGame() {
  x = canvas.width / 2
  y = canvas.height / 2
  dx = 1 * direction[Math.floor(Math.random() * direction.length)]
  dy = 2 * direction[Math.floor(Math.random() * direction.length)]
  paddleX = (canvas.width - PADDLE_WIDTH) / 2
  rightPressed = false
  leftPressed = false
}

function keyDownHandler(e) {
  if (isGameOver) isGameOver = false
  if (e.keyCode == 39) {
    rightPressed = true
  } else if (e.keyCode == 37) {
    leftPressed = true
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false
  } else if (e.keyCode == 37) {
    leftPressed = false
  }
}

function draw() {
  if (!isGameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ajustBallMovingPos()
    movePaddle()
    drawPaddle()
    drawFpsCounter()
    drawBall()
    x += dx
    y += dy
  }
}

function gameOver() {
  isGameOver = true
  resetGame()
}

function drawBall() {
  ctx.beginPath()
  ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2)
  ctx.fillStyle = ballColor
  ctx.fill()
  ctx.closePath()
}

function drawPaddle() {
  ctx.beginPath()
  ctx.rect(
    paddleX,
    canvas.height - PADDLE_HEIGHT - 5,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
  )
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}

function ajustBallMovingPos() {
  if (
    x + dx >= paddleX &&
    x + dx <= paddleX + PADDLE_WIDTH &&
    y + dy >= canvas.height - BALL_RADIUS - PADDLE_HEIGHT
  ) {
    console.log('impact')
    dx = -dx
    dy = -dy
  }
  if (y + dy > canvas.height - BALL_RADIUS) {
    dx = -dx
    gameOver()
    return
  }
  if (x + dx > canvas.width - BALL_RADIUS || x + dx < BALL_RADIUS) {
    dx = -dx
  }
  if (y + dy > canvas.height - BALL_RADIUS || y + dy < BALL_RADIUS) {
    dy = -dy
  }
}

function movePaddle() {
  if (rightPressed && paddleX < canvas.width - PADDLE_WIDTH) {
    paddleX += 4
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 4
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
  ctx.font = '30px Arial'
  ctx.fillStyle = 'gold'
  ctx.fillText(displayFps === 0 ? fps : displayFps, 10, 30)
  ctx.closePath()
}

setInterval(draw, 1000 / GAME_FPS)
