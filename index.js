const express = require('express');
const request = require('request');
const app = express();
 
const client_id = "b20d067e73880c0ed0b423d7bb16dd25dd65d377eace3cf79affdd1d5153a1b9";
const client_secret = "640ccfa8f242048c1476a1b6920ee1bd558fb6869afbd1ac694abdf1d07ab701";
const callback_uri = "http://localhost:5000/oauth_callback";

const authorize_url = "https://account.withings.com/oauth2_user/authorize2"
const token_url = "https://account.withings.com/oauth2/token" 

app.get('/', function (req, res) {
    let authorization_redirect_url = authorize_url + '?response_type=code' + '&state=test' + '&client_id=' + client_id + '&redirect_uri=' + callback_uri + '&scope=user.info';
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
        res.redirect('/test');
        return;
    }

    // Retrieve the token from the environment
    res.send(process.env.TOKEN);
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Listning on ${process.env.PORT || 5000}`)
});