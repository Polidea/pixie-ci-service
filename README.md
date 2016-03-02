# PIXIE CI service

Translate your CI service statuses to PIXIE-compatible format.

#### Currently supported
- Travis CI

## Running Locally

Make sure you have [Node.js 5.x](http://nodejs.org/).
```sh
$ npm install
$ npm start
```

Your app should now be running on localhost:5000.
You can test it by making `GET` request to [http://localhost:5000/https://travis-ci.org/Polidea/ios-class-guard](http://localhost:5000/https://travis-ci.org/Polidea/ios-class-guard).
This will get status for `Polidea/ios-class-guard` project.

## Deploying to Heroku

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

or

Install [Heroku Toolbelt](https://toolbelt.heroku.com/) and

```
$ heroku create
$ git push heroku master
```

## Documentation

PIXIE requires to receive data in format
```json
{
  "status": "running",
  "time": 41,
  "previous_status": "failed",
  "previous_time": 364
}
```

`status` and `previous_status` can be:
- running
- failed
- success
- canceled

`time` and `previous_time` is duration of build in seconds.

Making a request to PIXIE CI service with `/<original url to CI>`, for example `/travis-ci.org/Polidea/ios-class-guard` returns status for this project in the format above.
