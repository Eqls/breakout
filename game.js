const GAME_FPS = 60
const BALL_RADIUS = 10
const PADDLE_HEIGHT = 10
const PADDLE_WIDTH = 75
const BLOCK_HEIGHT = 15
const BLOCK_WIDTH = 25

let canvas = document.getElementById('gameCanvas')
let ctx = canvas.getContext('2d')
let timer = Date.now()
let fps = 0
let displayFps = 0
let x = canvas.width / 2
let y = canvas.height / 1.5
let direction = [1, -1]
let dx = 2 * direction[Math.floor(Math.random() * direction.length)]
let dy = 4 * direction[Math.floor(Math.random() * direction.length)]
let paddleX = (canvas.width - PADDLE_WIDTH) / 2
let rightPressed = false
let leftPressed = false
let ballColor = '#6666FF'
let isGameOver = false
let blocks = 56
let blocksArray = []

/**
 * Event listeners to handle paddle movement
 */
document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

function getRowStartingXPos(rowWidth, windowWidth) {
  return (windowWidth - rowWidth) / 2
}

function generateBlocks(number) {
  let generatedArray = []
  let row = []
  let currentRow = getRowCount(blocks)
  let length = 1
  for (let i = 0; i < number; i++) {
    row.push({
      id: i,
      destroyed: false,
      x:
        getRowStartingXPos((BLOCK_WIDTH + 2) * length, canvas.width) +
        (BLOCK_WIDTH + 2) * row.length,
      y: (2 + BLOCK_HEIGHT) * currentRow
    })
    if (row.length === length) {
      generatedArray.push(row)
      row = []
      length += 2
      currentRow--
    }
  }
  return generatedArray
}

function getRowCount(blockCount) {
  let rows = 0
  let length = 1
  let count = 0
  for (let i = 0; i < blockCount; i++) {
    count++
    if (count === length) {
      count = 0
      length += 2
      rows++
    }
  }
  return rows
}

function resetGame() {
  x = canvas.width / 2
  y = canvas.height / 2
  dx = 2 * direction[Math.floor(Math.random() * direction.length)]
  dy = 4 * direction[Math.floor(Math.random() * direction.length)]
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

function gameLoop() {
  if (!isGameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ajustBallMovingPos()
    movePaddle()
    drawPaddle()
    drawFpsCounter()
    drawBall()
    drawBlocks(didBallCollideWithBrick(x, y, dx, dy, blocksArray))
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
    dy = -dy
  }
  if (y + dy > canvas.height - BALL_RADIUS) {
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

function didBallCollideWithBrick(ballX, ballY, ballDX, ballDY, bricks) {
  console.log(ballX + ' ' + ballY + ' ' + ballDX + ' ' + ballDY)
  for (let i = 0; i < bricks.length; i++) {
    for (let j = 0; j < bricks[i].length; j++) {
      if (
        ballX + ballDX + BALL_RADIUS >= bricks[i][j].x - BLOCK_WIDTH / 2 &&
        ballX + ballDX + BALL_RADIUS <= bricks[i][j].x + BLOCK_WIDTH / 2 &&
        ballY + ballDY + BALL_RADIUS >= bricks[i][j].y - BLOCK_HEIGHT / 2 &&
        ballY + ballDY + BALL_RADIUS <= bricks[i][j].y + BLOCK_HEIGHT / 2
      ) {
        dy = -dy
        console.log('touchdown')
        bricks[i].splice(j, 1)
      }
    }
  }
  return bricks
}

function drawBlocks(blocksArray) {
  for (let i = 0; i < blocksArray.length; i++) {
    for (let j = 0; j < blocksArray[i].length; j++) {
      ctx.beginPath()
      ctx.rect(
        blocksArray[i][j].x,
        blocksArray[i][j].y,
        BLOCK_WIDTH,
        BLOCK_HEIGHT
      )
      ctx.fillStyle = '#0095DD'
      ctx.fill()
      ctx.closePath()
    }
  }
}

function movePaddle() {
  if (rightPressed && paddleX < canvas.width - PADDLE_WIDTH) {
    paddleX += 7
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7
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

blocksArray = generateBlocks(blocks)
console.log(blocksArray)
setInterval(gameLoop, 1000 / GAME_FPS)
