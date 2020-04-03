const fs = require('fs')
Object.assign(process.env, JSON.parse(fs.readFileSync('.env.json')))
const app = require('./service/app')
const port = 3000

app.listen(port)
console.log(`listening on http://localhost:${port}`)
