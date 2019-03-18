const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 8000
const projects = require('./routes')

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(projects)
  .use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })
  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  })

app.listen(port, () => console.log(`Listening on port ${port}!`))
