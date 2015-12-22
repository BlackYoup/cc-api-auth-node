'use strict';

const consumer_key = process.env.CONSUMER_KEY;
const consumer_secret = process.env.CONSUMER_SECRET;

let request = require('request');
let qs = require('querystring');

const oauth = {
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  callback: process.env.CONSUMER_CALLBACK,
  transport_method: 'body'
};

const requestTokenOpts = {
  url: `${process.env.API_HOST}/oauth/request_token`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  oauth: oauth
};

function request_token(){
  request.post(requestTokenOpts, (error, res, body) => {
    let requestTokens = qs.parse(body);
    let token = qs.stringify({oauth_token: requestTokens.oauth_token});
    let authenticate = `${process.env.API_HOST}/oauth/authorize?${token}`;
    browserQs(authenticate, requestTokens);
  });
}

function browserQs(oauthUrl, requestTokens){
  console.log("Open your browser on this url:", oauthUrl);

  require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  }).question("Please enter the querystring: ", queryString => {
    access_token(qs.parse(queryString.replace(/\?/, '')), requestTokens);
  });
}

function access_token(auth_data, requestTokens){
  let oauth = {
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    token: requestTokens.oauth_token,
    token_secret: requestTokens.oauth_token_secret,
    verifier: auth_data.oauth_verifier,
    transport_method: 'body'
  };

  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  let url = `${process.env.API_HOST}/oauth/access_token`;

  request.post({url:url, oauth:oauth, headers}, function (e, r, body) {
    // ready to make signed requests on behalf of the user
    var userTokens = qs.parse(body);

    fetchSummary(userTokens);
  });
}

function fetchSummary(userTokens){
  let clever = require('clever-client')({
    API_CONSUMER_KEY: consumer_key,
    API_CONSUMER_SECRET: consumer_secret,
    API_HOST: process.env.API_HOST,
    API_OAUTH_TOKEN: userTokens.oauth_token,
    API_OAUTH_TOKEN_SECRET: userTokens.oauth_token_secret
  });

  console.log('Okay, got what I want, fetching /summary...');

  clever.summary.get().send().log("/summary");
}

request_token();
