'use strict'
/*eslint no-console: 0*/

const express = require('express')
const app = express()
const matcher = require('./drivers/matcher')
const Promise = require('bluebird')

app.set('port', (process.env.PORT || 5000))

app.get('/*', (req, res, next) => {
  var url = req.params[0]
  var driver = matcher(url)
  if (!driver) {
    return next()
  }
  var previousBuild = driver.previousBuild().catch(() => null)
  var currentBuild = driver.currentBuild()
  Promise.all([previousBuild, currentBuild]).then(builds => {
    var [previous, current] = builds
    var data = {}
    if (previous) {
      data.previous_status = previous.status
      data.previous_time = previous.duration
    }
    data.status = current.status
    data.time = current.duration
    res.json(data)
  })
  .catch(() => {
    res.status(500).send('Something went wrong')
  })
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})
