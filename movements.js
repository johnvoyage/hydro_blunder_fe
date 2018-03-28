const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40
let MOVES_PER_CLICK = 10

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
    if (louie > 0) {
      document.getElementById('game-boat').style.left = `${louie - MOVES_PER_CLICK}px`;
    }
  })
}

function moveBoatRight() {
  window.requestAnimationFrame(function() {
    const louie = positionToInteger(document.getElementById('game-boat').style.left)
    if (louie < 505) {
      document.getElementById('game-boat').style.left = `${louie + MOVES_PER_CLICK}px`;
    }
  })
}

function moveBoatUp() {
  window.requestAnimationFrame(function() {
    const ulysses = positionToInteger(document.getElementById('game-boat').style.top)
    if (ulysses > 0) {
      document.getElementById('game-boat').style.top = `${ulysses - MOVES_PER_CLICK}px`;
    }
  })
}

function moveBoatDown() {
  window.requestAnimationFrame(function() {
    const ulysses = positionToInteger(document.getElementById('game-boat').style.top)
    if (ulysses < 600) {
      document.getElementById('game-boat').style.top = `${ulysses + MOVES_PER_CLICK}px`;
    }
  })
}
