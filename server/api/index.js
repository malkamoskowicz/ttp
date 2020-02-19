const router = require('express').Router()
const { User } = require('../db/index')

router.get('/users', (req, res, next) => {
    try {
        const users = User.findAll()
        res.send(users)
    } catch (error) {
        next(error)
    }
})

router.use((req, res, next) => {
    const err = new Error('Not found.');
    err.status = 404;
    next(err);
});

module.exports = router