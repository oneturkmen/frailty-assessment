const express = require('express');
const app = express();

require('dotenv').config();


app.get('/check', (req, res) => {
  res.status(200).send({
    code: 0,
    message: 'healthy'
  });
});

app.listen(process.env.PORT || 3030, 
  () => console.log(`Listening on port ${process.env.PORT || 3030}!`)
);

