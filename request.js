function fetchData() {
    fetch('https://tailwindserverweb.onrender.com/api/data')  // Replace with your Netlify app URL
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data from server:', data);
        // Handle the received data as needed
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
}

// Call the fetchData function wherever you need to fetch the data