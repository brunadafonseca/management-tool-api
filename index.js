const express = require('express')
const router = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 8000

router
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })
  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: router.get('env') === 'development' ? err : {}
    })
  })

router.listen(port, () => console.log(`Listening on port ${port}!`))
