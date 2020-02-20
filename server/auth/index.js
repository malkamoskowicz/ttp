const router = require('express').Router()
const {User} = require('../db')

router.get('/', (req, res, next) => {
    try {
        res.send('done')
    } catch (error) {
        next(error)
    }
})

router.put('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
              email: req.body.email,
              password: req.body.password
            }
          })
            
          if (!user) res.send({error: 'Invalid credentials'});
          else {
              req.login(user, err => {
              if (err) res.send({error: 'internal error, please try again soon'});
              else res.json(user);
              });
          }
        
    } catch (error) {
        res.send(error)
    }
})

router.post('/signup', async (req, res, next) => {
  try {
      const user = await User.create(req.body)
      req.login(user, err => {
          if (err) next(err);
          else res.json(user);
      })
  } catch (error) {
      res.send(error)
  }  
})

router.delete('/logout', (req, res, next) => {
  req.logout()
  req.session.destroy()
  res.sendStatus(204)
})

router.get('/me', (req, res, next) => {
  res.json(req.user)
})

router.use((req, res, next) => {
    const err = new Error('Not found.');
    err.status = 404;
    next(err);
})

module.exports = router