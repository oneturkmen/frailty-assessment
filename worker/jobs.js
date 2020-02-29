const request = require('request');

// **********************************************
// Token refresher
// **********************************************
module.exports.refresh_token = () => {
  console.log(`[JOB refresh_token] Refreshing token`);

  // Prepare request body for access token refresh
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

    process.env.refresh_token = JSON.parse(body).refresh_token;
    process.env.access_token = JSON.parse(body).access_token;
  });
}

// **********************************************
// "Measure" endpoint handlers
// **********************************************
module.exports.handle_measurements = () => {
  /**
   * JOB: EVERY 30 MINUTES
   */
  console.log(`[JOB handle_measurements] Getting measurements data`);

  // Format the dates
  const now_ts = Math.round((new Date()).getTime() / 1000);
  const prev_ts = now_ts - (60 * 60) / 2;

  // Set request parameters
  const start_date = prev_ts;
  const end_date = now_ts;

  // Measurement types as indicated in the API docs
  const measure_types = [1, 9, 10, 11];

  // Promisify each request
  const request_uri = typed_uri => {
    return new Promise((resolve, reject) => {
      request.get(typed_uri,
        { 'auth': { 'bearer': process.env.access_token } },
        (err, response, body) => {
          if (err) {
            return reject(err);
          }

          console.log(`[JOB: handle_measurements] Response from endpoint: ${JSON.stringify(body, null, 2)}`);
          return resolve(body);
        }
      );
    })
  }

  // Handle each URI request 
  const promises = measure_types.map(type => {
    // URI for each type
    const typed_uri = `https://wbsapi.withings.net/measure?` + 
      `action=getmeas` + 
      `&meastype=${type}` +
      `&startdate=${start_date}` +
      `&enddate=${end_date}`;

    return request_uri(typed_uri)
      .then(result => result)
      .catch(err => {
        console.log(`[JOB: handle_measurements.promises] >>>>> ERROR: ${err.message}`);
      });
  });

  // Combine all resolved/rejected promises
  Promise.all(promises)
    .then(reduced => {
      console.log(`[JOB: handle_measurements] Reduced result: ${reduced}`);
    })
    .catch(err => {
      console.log(`[JOB: handle_measurements] >>>>> ERROR: ${err.message}`);
    });
}

module.exports.handle_activity = () => {
  console.log(`[JOB handle_activity] Getting general activity data`);
  throw new Error("Unimplemented!");
}

module.exports.handle_intraday_activity = () => {
  console.log(`[JOB handle_intraday_activity] Getting intraday activity data`);
  throw new Error("Unimplemented!");
}

module.exports.handle_workouts = () => {
  console.log(`[JOB handle_workouts] Getting workouts data`);
  throw new Error("Unimplemented!");
}

// **********************************************
// "Sleep" endpoint handlers
// **********************************************
module.exports.handle_sleep = () => {
  /**
   * JOB: EVERY 30 MINUTES
   */
  console.log(`[JOB handle_sleep] Getting sleep data`);

  // Format the dates
  const now_ts = Math.round((new Date()).getTime() / 1000);
  const hour_ago_ts = now_ts - (60 * 60) / 2;

  // Set request parameters
  const start_date = hour_ago_ts;
  const end_date = now_ts;
  const data_fields = `hr,rr,snoring`;

  // Finalize the request URI
  const uri = `https://wbsapi.withings.net/v2/sleep?` + 
    `action=get` + 
    `&startdate=${start_date}&enddate=${end_date}&` +
    `data_fields=${data_fields}`;

  // Call the API
  request.get(uri,
    { 'auth': { 'bearer': process.env.access_token } },
    (err, response, body) => {
      console.log(`[JOB: handle_sleep] Response from endpoint: ${JSON.stringify(body, null, 2)}`);
      return;
    }
  );
}

module.exports.handle_sleep_summary = () => {
  /**
   * JOB: EVERY 12 HOURS, AT 12 PM and 12 AM (DAY TIME)
   */
  console.log(`[JOB: handle_sleep_summary] Getting summary of sleep ...`);

  // Format the dates
  const now = new Date();
  const yesterday_time = new Date();
  yesterday_time.setDate(yesterday_time.getDate() - 1);

  const day = ("0" + now.getDate()).slice(-2);
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const today_date = now.getFullYear() + "-" + (month) + "-" + (day);
  
  const yesterday_day = ("0" + yesterday_time.getDate()).slice(-2);
  const yesterday_month = ("0" + (yesterday_time.getMonth() + 1)).slice(-2);
  const yesterday_date = yesterday_time.getFullYear() +  "-" + 
    (yesterday_month) + "-" + (yesterday_day);

  // Set request parameters
  const start_date = yesterday_date;
  const end_date = today_date;

  const data_fields = `breathing_disturbances_intensity,` +
    `deepsleepduration,durationtosleep,snoring,` + 
    `rr_average,rr_max,rr_min,` + 
    `snoringepisodecount,remsleepduration,` +
    `lightsleepduration,hr_average,hr_max,hr_min` +
    `wakeupcount`;

  // Finalize the request URI
  const uri = `https://wbsapi.withings.net/v2/sleep?` + 
    `action=getsummary` + 
    `&startdateymd=${start_date}&enddateymd=${end_date}&` +
    `data_fields=${data_fields}`;

  // Call the API
  request.get(uri,
    { 'auth': { 'bearer': process.env.access_token } },
    (err, response, body) => {
      console.log(`[JOB: handle_sleep_summary] Response from endpoint: ${JSON.stringify(body, null, 2)}`);
      return;
    }
  );
}