const express = require('express');
const request = require('request');
const session = require('express-session');
const cron = require('node-cron');
const { Client } = require('pg');

// Get the environment variables
if (process.env.NODE_ENV == 'prod') {
  require('dotenv').config();
}
else {
  require('dotenv').config({ path: '../.env' });
}

// Initialize the app
const app = express();

// Set the database configuration
let client = new Client({
  connectionString: process.env.DB_URI
});

// Auth stuff for Withings API
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const callback_uri = process.env.CALLBACK_URI;

const authorize_url = "https://account.withings.com/oauth2_user/authorize2";
const token_url = "https://account.withings.com/oauth2/token";

const register_jobs = () => {
  // If token is not there, don't start any jobs yet
  if (process.env.access_token == null || process.env.access_token == '') {
    console.log(`\n[register_jobs] > Warning! Access token is not available!\n`);
    return false;
  }

  // Get the user sleep data every 10 minutes
  cron.schedule('*/10 * * * *', () => {
    console.log(`\n[JOB] > Getting user sleep data ...\n`);

    const start_date = '2020-02-20';
    const end_date = '2020-02-22';
    const data_fields = 'calories,effduration,intensity';

    const uri = `https://wbsapi.withings.net/v2/sleep?action=getsummary&startdateymd=${start_date}&enddateymd=${end_date}`;

    request.get(uri, { 'auth': { 'bearer': process.env.access_token } }, (err, response, body) => {    
      console.log(JSON.stringify(body, null, 2));
      return;
    });
  });

  // Refresh token every 2 hours
  cron.schedule('0 */2 * * *', () => {
    console.log(`\n[JOB] > Refreshing token ...\n`);

    let data = {
      'grant_type': 'refresh_token',
      'refresh_token': process.env.refresh_token,
      'client_id': client_id,
      'client_secret': client_secret
    };

    request.post(token_url, { form: data }, (error, response, body) => {
      if (error) {
        console.log(error);
        return;
      }
      // Store into session
  
      process.env.refresh_token = JSON.parse(body).refresh_token;
      process.env.access_token = JSON.parse(body).access_token;
    });  
  });

  console.log(`[register_jobs] > Succesfully registered jobs`);

  return true;
}

// Self-invoking function, i.e. get invokes as soon as you `npm start`
const set_jobs_on_fire = () => {
  // Before scheduling jobs, loop until token is obtained
  let jobs_started = register_jobs();

  if (!jobs_started) {
    setTimeout(() => {
      console.log('[set_jobs_on_fire] > CRON is not ready, token is not available ...');
      console.log('[set_jobs_on_fire] > Trying in 10 seconds ...');

      jobs_started = set_jobs_on_fire();
    }, 10000);
  } else {
    console.log(`[set_jobs_on_fire] > Jobs have been successfully registered!`);
  }
};

const initialize = async () => {
  // Start asynchronously
  set_jobs_on_fire();  

  // Connect to the database  
  try { 
    await client.connect();
  } catch (e) {
    console.log(`[initialize] ERROR >>>>>>> ${e.message}`);
  }
}

initialize();

app.get('/health', (req, res) => {
  res.send('OK');
})

app.get('/', (req, res) => {
  if (process.env.access_token == null || process.env.access_token == '') {
    console.log(client_id);

    let authorization_redirect_url = authorize_url +
      '?response_type=code' +
      '&state=test' +
      '&client_id=' + client_id +
      '&redirect_uri=' + callback_uri +
      '&scope=user.info,user.metrics,user.activity';

    return res.redirect(authorization_redirect_url);
  } else {
    return res.redirect('/health');
  }
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
    // Store into process env
    process.env.access_token = JSON.parse(body).access_token;
    process.env.refresh_token = JSON.parse(body).refresh_token;

    // Redirect elsewhere
    res.redirect('/health');
  });
});

app.listen(process.env.PORT || 80, () => {
  console.log(`Listening on ${process.env.PORT || 80}`)
});