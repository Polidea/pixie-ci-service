'use strict'

const Build = require('./build')
const API = require('travis-ci')
const Promise = require('bluebird')

class Travis {
  constructor(organization, name) {
    this.organization = organization
    this.name = name
    this.api = new API({
      version: '2.0.0'
    })
  }
  static createIfMatches(url) {
    const REGEX = /.*?travis.*?\/([^/]+)\/([^/]+)/i
    var match = url.match(REGEX)
    if (!match) {
      return null
    }
    var [_, organization, name] = match
    if (organization && name) {
      return new Travis(organization, name)
    }
    return null
  }
  currentBuild() {
    return this._builds()
      .then(res => res.builds[0])
      .then(this._processDuration)
      .then(build => new Build(build.id, this._mapStatus(build.state), build.duration))
  }
  previousBuild() {
    return this._builds()
      .then(res => res.builds[1])
      .then(this._processDuration)
      .then(build => new Build(build.id, this._mapStatus(build.state), build.duration))
  }
  _builds() {
    return new Promise((resolve, reject) => {
      this.api.repos(this.organization, this.name).builds.get((err, res) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(res)
        }
      })
    })
  }
  _processDuration(build) {
    if (!build.duration) {
      if (!build.started_at) {
        build.duration = 0
      }
      else {
        build.duration = Math.ceil((new Date() - new Date(build.started_at)) / 1000)
      }
    }
    return build
  }
  _mapStatus(status) {
    switch (status) {
      case 'created':
        return 'running'
      case 'passed':
        return 'success'
      case 'failed':
        return 'failed'
      case 'errored':
        return 'failed'
      case 'started':
        return 'running'
      default:
        return 'canceled'
    }
  }
}

module.exports = Travis
