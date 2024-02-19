// public/index.html
// ...

function fetchData() {
    fetch('http://10.10.7.52:3000/api/data')  // Replace with your Heroku app name
      .then(response => response.json())
      .then(data => {
        console.log('Data from server:', data);
        // Handle the received data as needed
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  