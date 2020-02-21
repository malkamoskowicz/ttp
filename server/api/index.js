const router = require('express').Router()
const {User, Transaction} = require('../db')

router.patch('/buy', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    user.update({
      cashBalance: user.cashBalance - req.body.totalPrice
    })
    await user.createTransaction({
      code: req.body.code,
      quantity: +req.body.quantity,
      totalPrice: +req.body.totalPrice,
    })
    
    res.status(200).send('done')
  }
  catch(err) {
    next(err)
  }
})

router.use((req, res, next) => {
    const err = new Error('Not found.')
    err.status = 404
    next(err)
})

module.exports = router