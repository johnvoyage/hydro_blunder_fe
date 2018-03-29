function startGasGauge(drinkCount, gasCount) {
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
  let barChart = new Chart(myChart, {
    type: 'horizontalBar',
    data: {
      labels: [
        'Gas',
        'BAL'
      ],
      datasets: [{
        label: "",
        data: [
          -10,
          -8
        ],
        backgroundColor: [
          'red',
          'yellow'
        ],
        borderWidth: 1,
        borderColor: 'black',
      }]


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

          position: 'right'
        }]
      }
    }
  });
  // yAxes: [{
  //     ticks: {
  //         beginAtZero:true,
  //         fontColor: 'red'
  //     },
  // }],
}
