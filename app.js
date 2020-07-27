const express   = require('express');
const axios     = require('axios').default;
const api_base  = 'https://graph.instagram.com';
const api_graph = 'https://graph.facebook.com';
const app 		= express();
require('dotenv').config();

const { TOKEN_FACEBOOK, TOKEN_INSTAGRAM } = process.env;


//User profile
app.get('/me', function(req, res){

    json = '';

    // Make a request for a user with a given ID
    axios.get(`${api_base}/me`, {
        params: {
          fields: 'id,username,account_type,media_count',
          access_token: TOKEN_INSTAGRAM
        }
    })
    .then(function (response) {
        // handle success
        json = response.data;
        console.log('response axios: ', json);
    })
    .catch(function (error) {
        // handle error
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(error, null, 4));
    })
    .then(function () {
        // always executed
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(json, null, 4));
    });

});

//user media
app.get('/me/media', function(req, res){

    json = '';

    // Make a request for a user with a given ID
    axios.get(`${api_base}/me/media`, {
        params: {
          fields: 'media,id,caption,media_type,media_url,permalink,thumbnail_url',
          access_token: TOKEN_INSTAGRAM
        }
    })
    .then(function (response) {
        // handle success
        json = response.data;
        console.log('response axios: ', json);
    })
    .catch(function (error) {
        // handle error
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(error, null, 4));
    })
    .then(function () {
        // always executed
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(json, null, 4));
    });

});

//profile insights 17841401265529372
app.get('/me/insights/:id', function(req, res){

    json = '';

    // Make a request for a user with a given ID
    axios.get(`${api_graph}/${req.params.id}/insights`, {
        params: {
          metric: 'impressions,reach,profile_views',
          period: 'day',
          access_token: TOKEN_FACEBOOK
        }
    })
    .then(function (response) {
        // handle success
        json = response.data;
        console.log('response axios: ', json);
    })
    .catch(function (error) {
        // handle error
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(error, null, 4));
    })
    .then(function () {
        // always executed
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(json, null, 4));
    });

});

//media insights 17898767200516306
app.get('/media/insights/:id', function(req, res){

    json = '';

    // Make a request for a user with a given ID
    axios.get(`${api_graph}/${req.params.id}/insights`, {
        params: {
          metric: 'engagement,impressions,reach,saved',
          access_token: TOKEN_FACEBOOK
        }
    })
    .then(function (response) {
        // handle success
        json = response.data;
        console.log('response axios: ', json);
    })
    .catch(function (error) {
        // handle error
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(error, null, 4));
    })
    .then(function () {
        // always executed
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(json, null, 4));
    });

});

app.listen(3001, function(){ console.log('Server on') });