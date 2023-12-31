const express = require('express');
const cors = require('cors');
const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require('./app/routes/login.routes.js')(app);
require('./app/routes/job.routes.js')(app);

// start server, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
