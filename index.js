// const BOAT = document.getElementById("game-boat")
const boatWidth = 50;
const boatHeight = 50;
// const boardWidth = 400;
// const boardHeight = 400;

const BASE_URL = "http://localhost:3000/api/v1/users"
let allUsers;
let signedInUsername;
let signedInUserObject;


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
      <h1>Username: ${userObject.username}</h1>
      <h3>High Score: ${userObject.high_score}</h3>
      <h3>Games Played: ${userObject.game_count}</h3>
      <h3>Rum Runners: ${userObject.drink_count}</h3>
      <h2 id="start-button"> START </h2>
      <br>
      <br>
      <h3 id="delete-button"> DELETE USER </h3>
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
    startScoreboard(userObject);
    startRumRunners();
    startGas();
    startBuoys();
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
    startScoreboardCount()
  }

  function startScoreboardCount() {
    setInterval(function() {
      tickScoreboard()
    }, 100)
  }

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
