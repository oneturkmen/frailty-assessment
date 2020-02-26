const express = require('express');
const request = require('request');
const session = require('express-session');

// Get the environment variables
require('dotenv').config({ path: '../.env' });

// Initialize the app
const app = express();

// Set session settings
app.use(session({
  name: 'oatmeal_cookie',
  secret: 'okay',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 2.5 * 60 * 60 * 1000 // 2.5 hours just in case; Withings has 3 hours.
  }
}));


// Auth stuff for Withings API
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const callback_uri = process.env.CALLBACK_URI;

const authorize_url = "https://account.withings.com/oauth2_user/authorize2"
const token_url = "https://account.withings.com/oauth2/token"

app.get('/', (req, res) => {
  let authorization_redirect_url = authorize_url +
    '?response_type=code' +
    '&state=test' +
    '&client_id=' + client_id +
    '&redirect_uri=' + callback_uri +
    '&scope=user.info,user.metrics,user.activity';
  res.redirect(authorization_redirect_url);
});

// On return from the authorization
app.get('/oauth_callback', (req, res) => {
  let data = {
    'grant_type': 'authorization_code',
    'code': req.query.code,
    'redirect_uri': callback_uri,
    'client_id': client_id,
    'client_secret': client_secret
  };
  request.post(token_url, { form: data }, (error, response, body) => {
    if (error) {
      console.log(error);
      return;
    }
    // Store into session

    req.session.withings_token = JSON.parse(body).access_token;

    // Redirect elsewhere
    res.redirect('/status');
  });
});

app.get('/status', (req, res) => {
  // Make sure the Withings token is there
  if (!req.session.withings_token) {
    res.redirect('/');
    return;
  }

  // Retrieve the token from the environment
  res.send(req.session.withings_token);
});

app.get('/workouts', (req, res) => {
  if (!req.session.withings_token) {
    res.redirect('/');
    return;
  }

  const start_date = '2020-02-20';
  const end_date = '2020-02-22';
  const data_fields = 'calories,effduration,intensity';
  let uri = `https://wbsapi.withings.net/v2/heart?action=list`
  //let uri = `https://wbsapi.withings.net/v2/sleep?action=getsummary&startdateymd=${start_date}&enddateymd=${end_date}`
  //    + `startdateymd=${start_date}&`
  //    + `enddateymd=${end_date}`
  //    + `data_fields=${data_fields}`;

  return request.get(uri, { 'auth': { 'bearer': req.session.withings_token } }, (err, response, body) => {    
    res.send(body);
  })
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on ${process.env.PORT || 5000}`)
});
