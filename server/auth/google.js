const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { User } = require('../db/index')

const googleConfig = {
  callbackURL: process.env.GOOGLE_CALLBACK
}

if (process.env.NODE_ENV === 'development') {
    const { clientID, clientSecret} = require('../../secrets')
    googleConfig.clientID = clientID
    googleConfig.clientSecret = clientSecret
}
else {
  googleConfig.clientID = process.env.GOOGLE_CLIENT_ID
  googleConfig.clientSecret = process.env.GOOGLE_CLIENT_SECRET
}
  
const strategy = new GoogleStrategy(
  googleConfig,
  (token, refreshToken, profile, done) => {
    const googleId = profile.id
    const email = profile.emails[0].value
    const imgUrl = profile.photos[0].value
    const firstName = profile.name.givenName
    const lastName = profile.name.familyName
    const fullName = profile.displayName

    User.findOrCreate({
      where: {googleId},
      defaults: {email, imgUrl, firstName, lastName, fullName}
    })
      .then(([user]) => done(null, user))
      .catch(done)
  }
)

passport.use(strategy)

router.get(
  '/',
  passport.authenticate('google', {scope: ['email', 'profile']})
)

router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/login'
  })
)

module.exports = router
