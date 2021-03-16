const express = require('express'); // bring in express

const app = express(); // initialize our app variable with express

app.get('/', (req, res) => res.send('API RUNNING')); // createa a single endpoint to test out

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));