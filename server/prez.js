const path = require('path')
const router = require('express').Router()
const user = require("./models").user

router.get('/', function (req, res) {
    res.sendFile(path.resolve('./prez.html'))
})

router.post('/', async function (req, res) {
    let {blitzID} = req.body
    if(!Number(blitzID)) {
        return res.status(400).json({ok:false, data:{err: "Invalid ID format"}})
    }
    const result = await user.find({blitzID})
    return res.status(200).json({ok:true, data: result[0]})
})

module.exports = router
