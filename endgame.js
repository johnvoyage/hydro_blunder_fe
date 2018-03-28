// let gameEnded = false

function endGame(){
  if (!gameEnded) {
    gameEnded = true
    // debugger

    let gameOverText = document.createElement('h1')
    gameOverText.id = "game-over-text"
    gameOverText.innerText = "GAME OVER"

    let endGameImage = document.createElement("img")
    endGameImage.src = "./assets/images/DANK.png"
    endGameImage.id = "game-over-logo"
    endGameImage.className = "center-text-box"

    document.body.append(endGameImage)
    document.body.append(gameOverText)

    // setInterval(function () {return document.getElementById("game-screen").append(img2)}, 1000)

    console.log('inside engame')
  // document.querySelector('#game-screen').innerHTML = ""
  }
}
