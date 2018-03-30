// let gameEnded = false

function endGame(){
  if (!gameEnded) {
    gameEnded = true
    changeScoreboardGif()
    changeBackgroundGif()
    document.querySelector("canvas").remove();

  }
}

function changeScoreboardGif() {
  let scoreboardBackground = document.querySelector('#scoreboard')
  scoreboardBackground.style.backgroundImage = "url('./assets/images/crashgif.gif')"
}

function changeBackgroundGif() {
  let gameScreenBackground = document.querySelector('#game-screen')
  gameScreenBackground.style.backgroundImage = "url('./assets/images/gameovercrashgif.gif')"

  // let resetButton = document.createElement("h1")
  // resetButton.id = "game-over-text"
  // resetButton.innerHTML =
  // `
  //   <h1>Reset Game</h1>
  // `
  // gameScreenBackground.append(resetButton)

  // resetButton.addEventListener("click", () => {
  //
  //   gameScreenBackground.style.backgroundImage = "url('./assets/images/boatbackground.gif')"
  //   let fetchUsers = () => {
  //     return fetch('http://localhost:3000/api/v1/users')
  //       .then(resp => resp.json())
  //       .then(json => {
  //         createUsernameDataList(json)
  //       })
  //   }
  //   fetchUsers()
  // })

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
