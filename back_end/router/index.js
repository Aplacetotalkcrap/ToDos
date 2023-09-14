const {Router} = require('express')
const router = Router()

const userRouter = require('./userRputer')

router.use("/user",userRouter)

module.exports = router