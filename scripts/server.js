const express = require('express');
const path = require('path');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(path.join(__dirname, '..', 'demo/dist')));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 4200);