const express = require('express');
const app = express();

// --------------------------------------------------------------- 
// -------------------------- Configs ----------------------------
// ---------------------------------------------------------------

require('dotenv').config();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// --------------------------------------------------------------- 
// -------------------------- Routes -----------------------------
// ---------------------------------------------------------------

// For health checks
app.get('/check', (req, res) => {
  console.log(req.query.name);
  res.status(200).send({
    code: 0,
    message: 'healthy'
  });
});

app.listen(process.env.PORT || 3030, 
  () => console.log(`Listening on port ${process.env.PORT || 3030}!`)
);

