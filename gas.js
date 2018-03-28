const GAS = []

function startGas() {

  setInterval(function() {
    createGas(Math.floor(Math.random() * (765)))
  }, Math.random() * 3000 + 3000)

}


function createGas(leftpx) {
  let gasTank = document.createElement("img");

  gasTank.className = "gasTank";
  gasTank.style.left = `${leftpx}px`;
  gasTank.src = "./assets/images/gas.png"
  let top = gasTank.style.top = 0;

  document.getElementById("game-screen").append(gasTank);
  let fallSpeed = Math.random() * 4 + 1


  function moveGas() {
    gasTank.style.top = `${top += fallSpeed}px`;

    // if checkCollision(gasTank) {
    //   console.log("drunken feature... hic!");
    // }
    //

    if (top < 565) {
      window.requestAnimationFrame(moveGas);
    }else {
      gasTank.remove()
    }
  }
  window.requestAnimationFrame(moveGas)

  GAS.push(gasTank);

  return gasTank;
}
