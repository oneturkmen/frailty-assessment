const express = require('express');
const app = express();

// --------------------------------------------------------------- 
// -------------------------- Configs ----------------------------
// ---------------------------------------------------------------

require('dotenv').config();

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

