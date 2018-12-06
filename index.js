let canvas = document.getElementById('gameCanvas')
let ctx = canvas.getContext('2d')
let timer = new Date().getMilliseconds()
let fps = 0
let displayFps = 0

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  fpsCounter()
  ctx.beginPath()
  ctx.arc(50, 50, 10, 0, Math.PI * 2)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}

setInterval(draw, 10)

function fpsCounter() {
  if (new Date().getMilliseconds() - timer > 0) {
    fps++
  } else {
    timer = new Date().getMilliseconds()
    displayFps = fps
    fps = 0
  }
  ctx.beginPath()
  ctx.font = '20px Arial'
  ctx.fillStyle = 'gold'
  ctx.fillText(displayFps === 0 ? fps : displayFps, 10, 20)
  ctx.closePath()
}
