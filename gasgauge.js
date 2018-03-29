let barChart;

function startGasGauge() {
  let gameScreen = document.getElementById('game-screen')
  let canvasContainer = document.createElement('div')
  canvasContainer.className = "canvas-container"
  canvasContainer.innerHTML =
  `
    <canvas id="myChart"></canvas>
  `
  gameScreen.append(canvasContainer)
  /////
  let myChart = document.getElementById('myChart').getContext('2d');
  barChart = new Chart(myChart, {
    type: 'horizontalBar',
    data: {
      labels: [
        'GAS',
        'LIT'
      ],
      datasets: [{
        label: "",
        data: [
          -gasGauge - 1,
          0
        ],
        backgroundColor: [
          'red',
          'yellow'
        ],
        borderWidth: 1,
        borderColor: 'black',
      }],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          display: false,

          ticks: {
              beginAtZero: true,
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: 'black',
            fontFamily: 'Arial',
            fontSize: 30,
          },
          position: 'right',
        }]
      }
    }
  });
}

function updateLitness(drunkenness) {
  // debugger
  barChart.data.datasets[0].data[1] = -drunkenness
  barChart.update()
}

function updateGas(gasLevel - 1) {
  // debugger
  if (gasLevel > 0) {
    barChart.data.datasets[0].data[0] = -gasLevel
    barChart.update()
  }
}
