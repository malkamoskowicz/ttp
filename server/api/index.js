const router = require('express').Router()
const {User} = require('../db')

router.patch('/buy', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    console.log('user', user.cashBalance, 'req body', req.body)
    user.update({
      cashBalance: user.cashBalance - req.body.totalPrice
    })
    res.status(200).send('done')
  }
  catch(err) {
    res.send('error')
  }
})

router.use((req, res, next) => {
    const err = new Error('Not found.');
    err.status = 404;
    next(err);
})

module.exports = router