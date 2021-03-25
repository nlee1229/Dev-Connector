const express = require('express'); // bring in express
const connectDB = require('./config/db'); // bringing in from config db file to reduce clutter in this file

const app = express(); // initialize our app variable with express

connectDB(); // connect DB 

app.get('/', (req, res) => res.send('API RUNNING')); // createa a single endpoint to test out

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));