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
      attributes: ['code', 'quantity']
    })
    
    const uniqueCodesObject = {}

    // combine same codes
    allCodesObjects.forEach(transaction => {
      const code = transaction.code
      const quantity = transaction.quantity
      uniqueCodesObject[code] = uniqueCodesObject[code] || 0
      uniqueCodesObject[code] += quantity
    })

    // turn into array
    const keys = Object.keys(uniqueCodesObject)
    const uniqueCodesArray = []
    keys.forEach(key => uniqueCodesArray.push({code: [key], quantity: uniqueCodesObject[key]}))
    res.json(uniqueCodesArray)
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