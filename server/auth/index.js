const router = require('express').Router()

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
              email: req.body.email
            }
          })
            
          if (!user) res.status(401).send('User not found');
          else if (!user.hasMatchingPassword(req.body.password)) res.status(401).send('Incorrect password')
          else {
              req.login(user, err => {
              if (err) next(err);
              else res.json(user);
              });
          }
        
    } catch (error) {
        next(error)
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
      next(error)
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

router.use('/google', require('./google'))

module.exports = router