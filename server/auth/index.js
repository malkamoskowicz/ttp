const router = require('express').Router()
const {User} = require('../db')
const passport = require('passport')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

router.put('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
              email: req.body.email
            }
          })
            
          if (!user || !user.correctPassword(req.body.password)) res.send({error: 'Invalid credentials'})
          else {
              req.login(user, err => {
              if (err) next(err)
              else res.json(user)
              })
          }
        
    } catch (error) {
        next(error)
    }
})

router.post('/signup', async (req, res, next) => {
  try {
      const user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          cashBalance: '50000',
      })
      req.login(user, err => {
          if (err) next(err)
          else res.json(user)
      })
  } catch (error) {
      next(error)
  }  
})

router.delete('/logout', (req, res, next) => {
  req.logout()
  req.session.destroy()
  res.sendStatus(204)
})

router.get('/me', (req, res, next) => {
  res.json({
    cashBalance: req.user.cashBalance
  })
})

router.use((req, res, next) => {
    const err = new Error('Not found.')
    err.status = 404
    next(err)
})

module.exports = router