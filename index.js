const BASE_URL = "http://localhost:3000/api/v1/users"
let allUsers;

document.addEventListener('DOMContentLoaded', function(){
  console.log('DOM Content Loaded')

  // const gameCanvas = document.getElementById('game-screen')

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
    userSignIn.addEventListener('submit', usernameSubmitted)
    let gameScreen = document.getElementById('game-screen')
    gameScreen.append(userSignIn);
  }

  function usernameSubmitted(event) {
    event.preventDefault()
    debugger
  }


})
