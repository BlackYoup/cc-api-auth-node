Use nodejs to login to the Clever Cloud API
===========================================

You need to create an OAuth consumer on the [Clever Cloud Console](https://console.clever-cloud.com) first

Then:
```
  npm install
  export CONSUMER_KEY=<consumer_key>
  export CONSUMER_SECRET=<consumer_secret>
  export CONSUMER_CALLBACK=<consumer_callback>
  export API_HOST=https://api.clever-cloud.com/v2 (in case the url is updated in the future, like /v3)
  npm start
```

This is a very simple example, no error handling, full procedural code (no Promises).

More links:
- [Clever Client](https://github.com/CleverCloud/clever-client.js)
- [Clever Cloud API](https://www.clever-cloud.com/doc/api/)
- [Clever Cloud API Documentation](https://www.clever-cloud.com/doc/clever-cloud-apis/cc-api/)
