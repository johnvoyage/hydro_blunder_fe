// let gameEnded = false

function endGame(){
  if (!gameEnded) {
    gameEnded = true
    changeScoreboardGif()
    changeBackgroundGift()
  }
}

function changeScoreboardGif() {
  let scoreboardBackground = document.querySelector('#scoreboard')
  scoreboardBackground.style.backgroundImage = "url('./assets/images/crashgif.gif')"
}

function changeBackgroundGift() {
  let gameScreenBackground = document.querySelector('#game-screen')
  gameScreenBackground.style.backgroundImage = "url('./assets/images/gameovercrashgif.gif')"
  // gameScreenBackground.style.zIndex = 999
}

// function removePieces() {
//   let gasTanks = document.getElementsByClassName("gasTank")
//   let rumRunners = document.getElementsByClassName("rumRunner")
//   let boatImage = document.getElementById("game-boat")
//   let buoys = document.getElementsByClassName("Buoy")
//
//   if(gameEnded) {
//     for(let i = 0; i < gasTanks.length; i++) {
//       let tank = gasTanks[i]
//       tank.remove();
//     }
//
//     for(let j = 0; j < rumRunners.length; j++) {
//       let runner = rumRunners[j]
//       runner.remove();
//     }
//
//     for(let k = 0; k < buoys.length; k++) {
//       let buoy = buoys[k]
//       buoy.remove();
//     }
//
//     boatImage.remove();
//   }
// }
