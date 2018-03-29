// const BOAT = document.getElementById("game-boat")
const boatWidth = 50;
const boatHeight = 50;
// const FALL_SPEED = Math.random() * 4 + 1
// const boardWidth = 400;
// const boardHeight = 400;

const BASE_URL = "http://localhost:3000/api/v1/users"
let allUsers;
// let signedInUsername;
let signedInUserObject;
let gameEnded = false;
let highScorePatched = false;


document.addEventListener('DOMContentLoaded', function(){
  console.log('DOM Content Loaded')

  let fetchUsers = () => {
    return fetch(BASE_URL)
      .then(resp => resp.json())
      .then(json => {
        createUsernameDataList(json)
      })
  }

  fetchUsers()

  function createUsernameDataList(json) {
    createUsernameForm()
    let userOptions = '';
    json.forEach(user => {
      userOptions += `<option value="${user.username}"/>`
    })
    document.getElementById("usernames").innerHTML = userOptions;
  }

  function createUsernameForm() {
    let userSignIn = document.createElement("form");
    userSignIn.innerHTML =
    `

      <input name="user" list="usernames" placeholder="Username">
      <datalist id="usernames"></datalist>
      <input type="submit">
    `
    userSignIn.className = "center-text-box"
    userSignIn.addEventListener('submit', event => {
      event.preventDefault();
      signedInUserPromise = usernameSubmitted(event)
      userSignIn.style = "display: none"
      getLoggedInUser()
    })
    let gameScreen = document.getElementById('game-screen')
    let dankLogo = document.createElement('div')
    dankLogo.id = "remove-logo"
    dankLogo.className = "center-text-box"
    dankLogo.innerHTML =
    `
      <img id="dank-logo" src="./assets/images/DANK.png">
    `
    gameScreen.append(dankLogo)
    gameScreen.append(userSignIn);
  }

  function usernameSubmitted(event) {
    signedInUsername = event.target.children[0].value;
    return fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify({username: signedInUsername}),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
  }

  function getLoggedInUser() {
    signedInUserPromise.then(resp => resp.json())
    .then(json => {
      displayUserData(json)
    })
  }

  function displayUserData(userObject) {
    gameScreen = document.getElementById("game-screen")
    playerDataDiv = document.createElement("div")
    playerDataDiv.id = "player-data-div"
    playerDataDiv.innerHTML =
    `
      <h3>Username: ${userObject.username}</h3>
      <h4>High Score: ${userObject.high_score}</h4>
      <h4>Games Played: ${userObject.game_count}</h4>
      <h4>Rum Runners: ${userObject.drink_count}</h4>
      <h2 id="start-button"> START </h2><br><br><br><br> <br>
      <h2 id="delete-button"> DELETE USER </h2>
    `
    playerDataDiv.className = "center"
    gameScreen.append(playerDataDiv)
    createDeleteButton(userObject)
    createStartButton(userObject)
  }

  function createDeleteButton(userObject) {
    let deleteButton = document.getElementById("delete-button")
    let playerDiv = document.getElementById("player-data-div")

    deleteButton.addEventListener("click", e => {
      deleteUser(userObject);
      playerDiv.innerHTML = ""
      document.querySelector('#remove-logo').remove()
      setTimeout(fetchUsers, 100)
    })
  }

  function deleteUser(user) {
    return fetch(`${BASE_URL}/${user.id}`, {
      method: "DELETE",
      body: JSON.stringify({user}),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
  }

  function createStartButton(userObject) {
    let startButton = document.getElementById("start-button")
    let playerDiv = document.getElementById("player-data-div")
    startButton.addEventListener("click", e => {
      playerDiv.innerHTML = ""
      startGame(userObject)
      document.querySelector('#remove-logo').remove()
    })
  }

  function startGame(userObject) {
    let boatImg = document.createElement('img')
    let gameScreen = document.getElementById("game-screen")
    boatImg.id = "game-boat"
    boatImg.src = "./assets/images/gamepiece.png"
    gameScreen.append(boatImg)
    boatImg.style = "top: 500px; left: 245px;"
    window.addEventListener('keydown', moveBoat)
    window.addEventListener('keyup', reorientBoat)
    startScoreboard(userObject);
    startRumRunners();
    startGas();
    startBuoys();
    getShwasted();
    startGasGauge();
  }



  function startScoreboard(userObject) {
    let scoreBoard = document.createElement('div')
    scoreBoard.id = "scoreboard"
    scoreBoard.innerHTML =
    `
      <p>Username: ${userObject.username}</p>
      <p>High Score: </p>
      <p>${userObject.high_score}</p>
      <p>Current Score: </p>
      <p>0</p>
    `
    // document.getElementById("game-screen").append(scoreBoard)
    document.body.append(scoreBoard)
    startScoreboardCount(userObject)
  }

  function startScoreboardCount(userObject) {
      setInterval(function() {
        if (!gameEnded) {
          tickScoreboard()
        } else if (!highScorePatched) {
          highScorePatched = true
          let highScore = parseInt(document.querySelector('#scoreboard').children[2].innerText)
          let gamesPlayed = userObject.game_count + 1
          //NEED TO DO THIS
          let drinksDrunk = userObject.drink_count + 0
          //////////////
          return fetch(`${BASE_URL}/${userObject.id}`, {
            method: "PATCH",
            body: JSON.stringify({
              high_score: highScore,
              game_count: gamesPlayed,
              drink_count: drinksDrunk
            }),
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          })
        }
      }, 100)
  }

  // fetch(`${BASE_URL}/notes/${noteId}`, {
  //   method: 'PATCH',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     title: noteTitle,
  //     body: noteBody
  //   })
  // }).then( res => res.json()).then(json => revealNote(json))

  function tickScoreboard() {
    let highScore = document.querySelector('#scoreboard').children[2].innerText
    let currentScore = parseInt(document.querySelector('#scoreboard').children[4].innerText)
    currentScore += 147
    document.querySelector('#scoreboard').children[4].innerText = `${currentScore}`
    if (highScore === "null" || currentScore > highScore) {
      highScore = currentScore
      document.querySelector('#scoreboard').children[2].innerText = `${highScore}`
    }
  }


})
