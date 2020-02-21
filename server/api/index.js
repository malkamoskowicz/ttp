const router = require('express').Router()
const {User, Transaction} = require('../db')

router.patch('/buy', async (req, res, next) => {
  try {

    // grab user
    const user = await User.findByPk(req.user.id)

    // update balace
    user.update({
      cashBalance: user.cashBalance - req.body.totalPrice
    })

    // create transaction
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

router.get('/transactions', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({where: {userId: req.user.id}})
    res.json(transactions)
  }
  catch(err){
    next(err)
  }
})

router.get('/portfolio', async (req, res, next) => {
  try {
    // grab codes from all transactions
    const allCodesObjects = await Transaction.findAll({
      where: {userId: req.user.id},
      attributes: ['code']
    })

    // map into array of just code names
    const allCodesArray = allCodesObjects.map(el => el.code)

    // filter out unique codes
    const uniqueCodes = [...new Set(allCodesArray)]
    res.json(uniqueCodes)
  }
  catch(err){
    next(err)
  }
})

router.use((req, res, next) => {
    const err = new Error('Not found.')
    err.status = 404
    next(err)
})

module.exports = router