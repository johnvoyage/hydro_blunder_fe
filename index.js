const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40
let MOVES_PER_CLICK = 5
// const BOAT = document.getElementById("game-boat")
const boatWidth = 50;
const boatHeight = 50;
const boardWidth = 400;
const boardHeight = 400;

const BASE_URL = "http://localhost:3000/api/v1/users"
let allUsers;
let signedInUsername;
let signedInUserObject

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
    boatImg.style = "bottom: 0; left: 44%;"
    window.addEventListener('keydown', moveBoat)
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
      // debugger
      const louie = positionToInteger(document.getElementById('game-boat').style.left)

      if (louie > 18) {
        document.getElementById('game-boat').style.left = `${louie - 4}px`;

      }
    })
  }

  function moveBoatRight() {
    window.requestAnimationFrame(function() {
      const louie = positionToInteger(document.getElementById('game-boat').style.left)

      if (louie < (boardWidth - boatWidth)) {
        document.getElementById('game-boat').style.left = `${louie + 4}px`;
      }
    })
  }

  function moveBoatUp() {
    window.requestAnimationFrame(function() {
      const ulysses = positionToInteger(BOAT.style.top)

      if (ulysses < (boardHeight - boatHeight)) {
        BOAT.style.top = `${ulysses + 4}px`;
      }

    })
  }

  function moveBoatDown() {
    window.requestAnimationFrame(function() {
      const ulysses = positionToInteger(BOAT.style.top)

      if (ulysses < (boardHeight - boatHeight)) {
        BOAT.style.top = `${ulysses + 4}px`;
      }
    })
  }



})
