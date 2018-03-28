const BUOYS = []
// window.addEventListener('click', e => {debugger})

function checkCollision(buoy) {
  // window.addEventListener('click', e => debugger)
  // let boatRectangle = {x: , y: , w: 100, h: 100}
  // let buoyRectangle = {}
  let top = positionToInteger(buoy.style.top)

  let boatLeftEdge = positionToInteger(document.getElementById("game-boat").style.left)
  let boatRightEdge = boatLeftEdge + 100;
  let buoyLeftEdge = positionToInteger(buoy.style.left)
  let buoyRightEdge = buoyLeftEdge + 55;

  let boatTopEdge = positionToInteger(document.getElementById("game-boat").style.top)
  let boatBottomEdge = boatTopEdge + 100;
  let buoyTopEdge = top;
  let buoyBottomEdge = buoyTopEdge + 55;
  // rocks are 20px high
  // DODGER is 20px high
  // // GAME_HEIGHT - 20 - 20 = 360px;
  // console.log('hereeee')
  // console.log(buoyTopEdge)


  if (
    //checks if it was hit straight on


    // ((buoyLeftEdge === boatRightEdge) && (buoyBottomEdge > boatBottomEdge) && (buoyBottomEdge < boatBottomEdge)) ||
    ((buoyLeftEdge > boatLeftEdge) && (buoyLeftEdge < boatRightEdge) && (buoyBottomEdge < boatTopEdge) && (buoyBottomEdge < boatBottomEdge))
    // ((buoyLeftEdge > boatLeftEdge) && (buoyLeftEdge < boatRightEdge) && (buoyBottomEdge < boatTopEdge) && (buoyBottomEdge > boatBottomEdge)) ||
    // ((buoyLeftEdge > boatLeftEdge) && (buoyLeftEdge < boatRightEdge) && (buoyBottomEdge < boatTopEdge) && (buoyBottomEdge > boatBottomEdge)) ||
    // ((buoyLeftEdge > boatLeftEdge) && (buoyLeftEdge < boatRightEdge) && (buoyBottomEdge < boatTopEdge) && (buoyBottomEdge > boatBottomEdge))

  ) {
    console.log("hit");
  } else {
    return false
  }
}

function startBuoys() {
  setInterval(function() {
    createBuoy(Math.floor(Math.random() * (545)))
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
      console.log("drunken feature... hic!");
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
