const BUOYS = []

function startBuoys() {
  setInterval(function() {
    createBuoy(Math.floor(Math.random() * (525)))
  }, Math.random() * 3000 + 3000)
}


function createBuoy(leftpx) {
  let buoy = document.createElement("img");

  buoy.className = "Buoy";
  buoy.style.left = `${leftpx}px`;
  buoy.src = "./assets/images/buoy.gif"
  let top = buoy.style.top = 0;

  document.getElementById("game-screen").append(buoy);


  function moveBuoy() {
    buoy.style.top = `${top += 2}px`;

    // if checkCollision(gasTank) {
    //   console.log("drunken feature... hic!");
    // }
    //

    if (top < 590) {
      window.requestAnimationFrame(moveBuoy);
    }else {
      buoy.remove()
    }
  }
  window.requestAnimationFrame(moveBuoy)

  BUOYS.push(buoy);

  return buoy;
}
