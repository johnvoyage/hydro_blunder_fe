const BUOYS = []


function checkCollision(buoy) {

  let top = positionToInteger(buoy.style.top)

  let boatLeftEdge = positionToInteger(document.getElementById("game-boat").style.left)
  let boatRightEdge = boatLeftEdge + 100;
  let buoyLeftEdge = positionToInteger(buoy.style.left)
  let buoyRightEdge = buoyLeftEdge + 55;

  let boatTopEdge = positionToInteger(document.getElementById("game-boat").style.top)
  let boatBottomEdge = boatTopEdge + 100;
  let buoyTopEdge = top;
  let buoyBottomEdge = buoyTopEdge + 55;

  if (
    (buoyLeftEdge <= boatLeftEdge && buoyRightEdge >= boatLeftEdge) ||
    (buoyLeftEdge >= boatLeftEdge && buoyRightEdge <= boatRightEdge) ||
    (buoyLeftEdge <= boatRightEdge && buoyRightEdge >= boatRightEdge)
  ) {
    if (
      (buoyTopEdge <= boatTopEdge && buoyBottomEdge >= boatTopEdge) ||
      (buoyTopEdge >= boatTopEdge && buoyBottomEdge <= boatBottomEdge) ||
      (buoyTopEdge <= boatBottomEdge && buoyBottomEdge >= boatBottomEdge)
    ) {
      return true
      // endGame()
    }
  } else {
    return false
  }

}

function startBuoys() {

  setInterval(function() {
    createBuoy(Math.floor(Math.random() * (745)))
  }, Math.random() * 3000 + 3000)

}


function createBuoy(leftpx) {

  let buoy = document.createElement("img");

  buoy.className = "Buoy";
  buoy.style.left = `${leftpx}px`;
  buoy.src = "./assets/images/buoy.gif"
  let top = buoy.style.top = 0;

  document.getElementById("game-screen").append(buoy);
  let fallSpeed = Math.random() * 4 + 1



  function moveBuoy() {
    buoy.style.top = `${top += fallSpeed}px`;

    if (checkCollision(buoy)) {
      // console.log('game over')
      endGame();
    }


    if (top < 545) {
      window.requestAnimationFrame(moveBuoy);
    }else {
      buoy.remove()
    }
  }
  window.requestAnimationFrame(moveBuoy)

  BUOYS.push(buoy);

  return buoy;

}
