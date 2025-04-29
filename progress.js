// Simulated calorie data (You can later fetch from server!)
const data = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [{
    label: 'Calories Consumed',
    data: [2200, 2000, 1800, 2100, 1900, 2500, 2300],
    borderColor: 'blue',
    backgroundColor: 'lightblue',
    fill: true,
    tension: 0.4
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

const progressChart = new Chart(
  document.getElementById('progressChart'),
  config
);
