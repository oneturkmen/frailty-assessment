const express = require('express');
const request = require('request');
const app = express();
 
const client_id = "b20d067e73880c0ed0b423d7bb16dd25dd65d377eace3cf79affdd1d5153a1b9";
const client_secret = "640ccfa8f242048c1476a1b6920ee1bd558fb6869afbd1ac694abdf1d07ab701";
const callback_uri = "http://localhost:5000/oauth_callback";

const authorize_url = "https://account.withings.com/oauth2_user/authorize2"
const token_url = "https://account.withings.com/oauth2/token" 

app.get('/', function (req, res) {
    let authorization_redirect_url = authorize_url + '?response_type=code' + '&state=test' + '&client_id=' + client_id + '&redirect_uri=' + callback_uri + '&scope=user.info,user.metrics,user.activity';
    res.redirect(authorization_redirect_url); 
});

// On return from the authorization
app.get('/oauth_callback', function (req, res) {
    // let token_reuqest = token_url + '?grant_type=authorization_code&code='+req.query.code+'&redirect_uri='+callback_uri+'&client_id='+client_id+'&client_secret='+client_secret;
    let data = {'grant_type': 'authorization_code', 'code': req.query.code, 'redirect_uri': callback_uri, 'client_id': client_id, 'client_secret': client_secret};
    request.post(token_url, {form: data},(error,respond,body)=>{
    // request.post(token_url, JSON.stringify(data),(error,respond,body)=>{
        if(error){
            console.log(error);
            return
        }
        console.log(JSON.parse(body));
        process.env.TOKEN = JSON.parse(body).access_token;
        res.redirect('/status');
    });
});

app.get('/status', (req, res) => {
    // Make sure the Withings token is there
    if (process.env.TOKEN == '' || process.env.TOKEN == null) {
        res.redirect('/');
        return;
    }

    // Retrieve the token from the environment
    res.send(process.env.TOKEN);
});

app.get('/workouts', (req, res) => {
    // TODO: set it in the req.session + refresh token
    if (process.env.TOKEN == '' || process.env.TOKEN == null) {
        res.redirect('/');
        return;
    }
    
    const start_date = '2020-02-21';
    const end_date = '2020-02-22';
    const data_fields = 'calories,effduration,intensity';
    let uri = `https://wbsapi.withings.net/v2/measure?action=getworkouts`
            //    + `startdateymd=${start_date}&`
            //    + `enddateymd=${end_date}`
            //    + `data_fields=${data_fields}`;

    return request.get(uri, { 'auth': {'bearer': process.env.TOKEN} }, (err, response, body) => {
        console.log(`Response = ${JSON.stringify(response, null, 2)}`)
        console.log(`Body = ${JSON.stringify(body, null, 2)}`)
        res.send(body);
    })
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Listning on ${process.env.PORT || 5000}`)
});