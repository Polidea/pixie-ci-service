const expect = require('chai').expect
const matcher = require('../drivers/matcher')
const Travis = require('../drivers/travis')


describe('driver matcher', () => {
  it('should match travis', () => {
    var url = 'https://travis-ci.org/Polidea/ios-class-guard'
    var driver = matcher(url)
    expect(driver).to.be.an.instanceof(Travis)
  })
})
