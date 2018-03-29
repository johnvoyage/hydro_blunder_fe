let LEFT = 37
let UP = 38
let RIGHT = 39
let DOWN = 40
let MOVES_PER_CLICK = 20


function reorientBoat() {
  document.getElementById('game-boat').style.transform = ""
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
    const louie = positionToInteger(document.getElementById('game-boat').style.left)
    if (louie > -20) {
      document.getElementById('game-boat').style.left = `${louie - MOVES_PER_CLICK}px`;
    }
  })
  let boatImg = document.getElementById("game-boat")
  document.getElementById('game-boat').style.transform = "rotate(315deg)"
}

function moveBoatRight() {
  window.requestAnimationFrame(function() {
    const louie = positionToInteger(document.getElementById('game-boat').style.left)
    if (louie < 710) {
      document.getElementById('game-boat').style.left = `${louie + MOVES_PER_CLICK}px`;
    }
  })
  let boatImg = document.getElementById("game-boat")
  document.getElementById('game-boat').style.transform = "rotate(45deg)"
}

function moveBoatUp() {
  window.requestAnimationFrame(function() {
    const ulysses = positionToInteger(document.getElementById('game-boat').style.top)
    if (ulysses > -10) {
      document.getElementById('game-boat').style.top = `${ulysses - MOVES_PER_CLICK}px`;
    }
  })
}

function moveBoatDown() {
  window.requestAnimationFrame(function() {
    const ulysses = positionToInteger(document.getElementById('game-boat').style.top)
    if (ulysses < 520) {
      document.getElementById('game-boat').style.top = `${ulysses + MOVES_PER_CLICK}px`;
    }
  })
  let boatImg = document.getElementById("game-boat")
  document.getElementById('game-boat').style.transform = "rotate(180deg)"
}
