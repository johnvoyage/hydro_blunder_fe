const RUMRUNNERS = []

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

    if (top < 590) {
      window.requestAnimationFrame(moveRumRunner);
    }else {
      rumRunner.remove()
    }
  }
  window.requestAnimationFrame(moveRumRunner)

  RUMRUNNERS.push(rumRunner);

  return rumRunner;
}
