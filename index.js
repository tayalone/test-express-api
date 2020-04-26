const app = require('./server')
const mongoose = require('./mongoose')
const { port } = require('./variables')

mongoose()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
