const RUMRUNNERS = []

function startRumRunners() {
  setInterval(function() {
    createRumRunner(Math.floor(Math.random() * (755)))
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
  let fallSpeed = Math.random() * 4 + 1

  function moveRumRunner() {
    rumRunner.style.top = `${top += fallSpeed}px`;

    // if checkCollision(rumRunner) {
    //   console.log("drunken feature... hic!");
    // }
    //

    if (top < 555) {
      window.requestAnimationFrame(moveRumRunner);
    }else {
      rumRunner.remove()
    }
  }
  window.requestAnimationFrame(moveRumRunner)

  RUMRUNNERS.push(rumRunner);

  return rumRunner;
}
