const RUMRUNNERS = [];

let drunkenness = 0;

function getShwasted() {
  setInterval(function() {
    if (drunkenness > 0) {
      drunkenness -= 1;
      LEFT = 39;
      RIGHT = 37;
      UP = 40;
      DOWN = 38;
      console.log(drunkenness);
    } else {
      LEFT = 37;
      RIGHT = 39;
      UP = 38;
      DOWN = 40;
    }
  }, 1000)
}


function checkCollision(rumRunner) {

  let top = positionToInteger(rumRunner.style.top)

  let boatLeftEdge = positionToInteger(document.getElementById("game-boat").style.left)
  let boatRightEdge = boatLeftEdge + 100;
  let rumRunnerLeftEdge = positionToInteger(rumRunner.style.left)
  let rumRunnerRightEdge = rumRunnerLeftEdge + 35;

  let boatTopEdge = positionToInteger(document.getElementById("game-boat").style.top)
  let boatBottomEdge = boatTopEdge + 100;
  let rumRunnerTopEdge = top;
  let rumRunnerBottomEdge = rumRunnerTopEdge + 35;

  if (
    (rumRunnerLeftEdge <= boatLeftEdge && rumRunnerRightEdge >= boatLeftEdge) ||
    (rumRunnerLeftEdge >= boatLeftEdge && rumRunnerRightEdge <= boatRightEdge) ||
    (rumRunnerLeftEdge <= boatRightEdge && rumRunnerRightEdge >= boatRightEdge)
  ) {
    if (
      (rumRunnerTopEdge <= boatTopEdge && rumRunnerBottomEdge >= boatTopEdge) ||
      (rumRunnerTopEdge >= boatTopEdge && rumRunnerBottomEdge <= boatBottomEdge) ||
      (rumRunnerTopEdge <= boatBottomEdge && rumRunnerBottomEdge >= boatBottomEdge)
    ) {
      return true
    }
  } else {
    return false
  }
}

function startRumRunners() {
  setInterval(function() {
    createRumRunner(Math.floor(Math.random() * (755)))
  }, 1000)
}

function createRumRunner(leftpx) {
  if (!gameEnded) {
    let rumRunner = document.createElement("img");

    rumRunner.className = "rumRunner";
    rumRunner.style.left = `${leftpx}px`;
    rumRunner.src = "./assets/images/rumRunner.png"
    let top = rumRunner.style.top = 0;

    document.getElementById("game-screen").append(rumRunner);
    let fallSpeed = Math.random() * 4 + 1

    function moveRumRunner() {
      rumRunner.style.top = `${top += fallSpeed}px`;

      if (checkCollision(rumRunner)) {
        rumRunner.remove();
        drunkenness += 20
        console.log(drunkenness);

        top = 700
      }

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
}
