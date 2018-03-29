function createLeaderboard(users) {
  let leaderboard = document.createElement('div')
  leaderboard.id = "leaderboard"
  let sortedUsers = users.sort(function(a,b) {
  	return b.high_score - a.high_score
  }).slice(0,8)
  // debugger
  // users.

  leaderboard.innerHTML =
  `
  <h2>Leaderboard:</h2>
  <p>1. ${sortedUsers[0].username}: ${sortedUsers[0].high_score}</p>
  <p>2. ${sortedUsers[1].username}: ${sortedUsers[1].high_score}</p>
  <p>3. ${sortedUsers[2].username}: ${sortedUsers[2].high_score}</p>
  <p>4. ${sortedUsers[3].username}: ${sortedUsers[3].high_score}</p>
  <p>5. ${sortedUsers[4].username}: ${sortedUsers[4].high_score}</p>
  <p>6. ${sortedUsers[5].username}: ${sortedUsers[5].high_score}</p>
  <p>7. ${sortedUsers[6].username}: ${sortedUsers[6].high_score}</p>
  <p>8. ${sortedUsers[7].username}: ${sortedUsers[7].high_score}</p>
  `
  document.body.append(leaderboard)
}

// let scoreBoard = document.createElement('div')
// scoreBoard.id = "scoreboard"
// scoreBoard.innerHTML =
// `
//   <p>Username: ${userObject.username}</p>
//   <p>High Score: </p>
//   <p>${userObject.high_score}</p>
//   <p>Current Score: </p>
//   <p>0</p>
// `
// // document.getElementById("game-screen").append(scoreBoard)
// document.body.append(scoreBoard)
