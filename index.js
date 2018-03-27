const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40
let MOVES_PER_CLICK = 10
// const BOAT = document.getElementById("game-boat")
const boatWidth = 50;
const boatHeight = 50;
// const boardWidth = 400;
// const boardHeight = 400;

const BASE_URL = "http://localhost:3000/api/v1/users"
let allUsers;
let signedInUsername;
let signedInUserObject

const RUMRUNNERS = []

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
    boatImg.src = "./assets/images/boatgif.gif"
    gameScreen.append(boatImg)
    boatImg.style = "top: 500px; left: 245px;"
    window.addEventListener('keydown', moveBoat)
    startScoreboard(userObject)
    startRumRunners()
  }

  function moveBoat(e) {
    const code = e.which
    if ([LEFT, RIGHT, UP, DOWN].indexOf(code) > -1) {
      e.preventDefault();
      e.stopPropagation();
    }
    if(code === LEFT) {
      moveBoatLeft();
    } else if(code === RIGHT) {
      moveBoatRight();
    } else if (code === UP) {
      moveBoatUp();
    } else if (code === DOWN) {
      moveBoatDown();
    }
  }

  function positionToInteger(p) {
    return parseInt(p.split('px')[0]) || 0
  }

  function moveBoatLeft() {
    window.requestAnimationFrame(function() {
      const louie = positionToInteger(document.getElementById('game-boat').style.left)
      if (louie > 0) {
        document.getElementById('game-boat').style.left = `${louie - MOVES_PER_CLICK}px`;
      }
    })
  }

  function moveBoatRight() {
    window.requestAnimationFrame(function() {
      const louie = positionToInteger(document.getElementById('game-boat').style.left)
      if (louie < 505) {
        document.getElementById('game-boat').style.left = `${louie + MOVES_PER_CLICK}px`;
      }
    })
  }

  function moveBoatUp() {
    window.requestAnimationFrame(function() {
      const ulysses = positionToInteger(document.getElementById('game-boat').style.top)
      if (ulysses > 0) {
        document.getElementById('game-boat').style.top = `${ulysses - MOVES_PER_CLICK}px`;
      }
    })
  }

  function moveBoatDown() {
    window.requestAnimationFrame(function() {
      const ulysses = positionToInteger(document.getElementById('game-boat').style.top)
      if (ulysses < 500) {
        document.getElementById('game-boat').style.top = `${ulysses + MOVES_PER_CLICK}px`;
      }
    })
  }

  function startRumRunners() {
    setInterval(function() {
      createRumRunner(Math.floor(Math.random() * (525)))
    }, 1000)
  }

  // function checkCollision(x) {
  //   console.log("danks");
  // }

  function createRumRunner(leftpx) {
    let rumRunner = document.createElement("img");

    rumRunner.className = "rumRunner";
    rumRunner.style.left = `${leftpx}px`;
    rumRunner.src = "./assets/images/rumRunner.png"
    let top = rumRunner.style.top = 0;

    document.getElementById("game-screen").append(rumRunner);


    function moveRumRunner() {
      rumRunner.style.top = `${top += 2}px`;

      // if checkCollision(rumRunner) {
      //   console.log("drunken feature... hic!");
      // }
      //

      if (top < 550) {
        window.requestAnimationFrame(moveRumRunner);
      }else {
        rumRunner.remove()
      }
    }
    window.requestAnimationFrame(moveRumRunner)

    RUMRUNNERS.push(rumRunner);

    return rumRunner;
  }

  function startScoreboard(userObject) {
    let scoreBoard = document.createElement('div')
    scoreBoard.id = "scoreboard"
    console.log(userObject);
    scoreBoard.innerHTML =
    `
      <p>Username: ${userObject.username}</p>
      <p>High Score: ${userObject.high_score}</p>
      <p id="current-score">Current Score: ${0}</p>
    `
    document.getElementById("game-screen").append(scoreBoard)
    startScoreboardCount()
  }

  function startScoreboardCount() {
    let currentScore = document.querySelector('#current-score')
    debugger
    console.log(currentScore)
  }


})
