const Travis = require('./travis')

const DRIVERS = [
  Travis
]

module.exports = (url) => {
  for (var i = 0; i < DRIVERS.length; i++) {
    var driver = DRIVERS[i].createIfMatches(url)
    if (driver) {
      return driver
    }
  }
}
