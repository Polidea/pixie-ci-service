const expect = require('chai').expect
const Travis = require('../drivers/travis')
const Build = require('../drivers/build')


describe('travis-ci driver', () => {
  it('should get previous build', () => {
    var driver = new Travis('Polidea', 'ios-class-guard')
    return driver.previousBuild().then(build => {
      expect(build).to.be.an.instanceof(Build)
    })
  })
  it('should get current build', () => {
    var driver = new Travis('Polidea', 'ios-class-guard')
    return driver.currentBuild().then(build => {
      expect(build).to.be.an.instanceof(Build)
    })
  })

  var cases = [
    {url: 'http://travis-ci.org/Polidea/ios-class-guard', organization: 'Polidea', name: 'ios-class-guard'},
    {url: 'https://travis-ci.org/Polidea/ios-class-guard', organization: 'Polidea', name: 'ios-class-guard'},
    {url: 'travis-ci.org/Polidea/ios-class-guard', organization: 'Polidea', name: 'ios-class-guard'},
    {url: 'https://travis-ci.com/Polidea/ios-class-guard', organization: 'Polidea', name: 'ios-class-guard'},
    {url: 'travis-ci.com/Polidea/ios-class-guard', organization: 'Polidea', name: 'ios-class-guard'}
  ]

  cases.forEach(example => {
    it(`should create Travis from ${example.url}`, () => {
      var travis = Travis.createIfMatches(example.url)
      expect(travis).to.be.instanceof(Travis)
      expect(travis.organization).to.be.equal(example.organization)
      expect(travis.name).to.be.equal(example.name)
    })
  })
})
