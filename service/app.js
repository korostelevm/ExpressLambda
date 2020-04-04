'use strict'
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express()
const router = express.Router()
var faker = require('faker')
var _ = require('lodash')
var moment = require('moment')
 
router.use(compression())
router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(awsServerlessExpressMiddleware.eventContext())

var mongoClient = require("mongodb").MongoClient;
var db = null;
var connect_db = function(){
  return new Promise((resolve,reject)=>{
    mongoClient.connect(process.env.CosmosDbConnectionString, async function (err, client) {
      db = client.db('dev');
      resolve('connected')
    })
  })
}


router.get('/', (req, res) => {
  res.sendFile(`${__dirname}/spa/index.html`)
})

router.get('/public/*', (req, res) => {
  res.sendFile(`${__dirname}/spa/${req.path.slice(1)}`)
})

router.get('/sam', (req, res) => {
  res.sendFile(`${__dirname}/sam-logo.png`)
})

router.get('/users', (req, res) => {
  res.json(users)
})

router.get('/users/:userId', (req, res) => {
  const user = getUser(req.params.userId)

  if (!user) return res.status(404).json({})

  return res.json(user)
})

router.post('/users', (req, res) => {
  const user = {
    id: ++userIdCounter,
    name: req.body.name
  }
  users.push(user)
  res.status(201).json(user)
})

router.put('/users/:userId', (req, res) => {
  console.log(req)
  const user = getUser(req.params.userId)

  if (!user) return res.status(404).json({})
  user.name = req.body.name
  res.json(user)
})

router.delete('/users/:userId', (req, res) => {
  const userIndex = getUserIndex(req.params.userId)

  if (userIndex === -1) return res.status(404).json({})

  users.splice(userIndex, 1)
  res.json(users)
})

const getUser = (userId) => users.find(u => u.id === parseInt(userId))
const getUserIndex = (userId) => users.findIndex(u => u.id === parseInt(userId))

// Ephemeral in-memory data store
const users = [{
  id: 1,
  name: 'Joe'
}, {
  id: 2,
  name: 'Jane'
}]
let userIdCounter = users.length

// The aws-serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(3000)
app.use('/', router)

// Export your express server so you can import it in the lambda function.
module.exports = app








// connect_db().then(async ()=>{
//   var people =  _.range(0,40).map(()=>{
//     var children = _.range(0,_.random(0,10)).map(()=>{return faker.name.firstName()})
//     var person = {
//       "birth_date": moment(faker.date.past()).subtract(_.random(10,80), 'years').format('YYYY-MM-DD'),
//       "children": children,
//       "address":{
//         "address":faker.address.streetAddress(),
//         "city":faker.address.city(),
//         "state":faker.address.stateAbbr(),
//         "postal_code":faker.address.zipCode(),
//       },
//       "first_name":faker.name.firstName(), 
//       "last_name":faker.name.lastName()
//     }
//     console.log(person)
//     return  db.collection('people').insertOne(person);
//   })
//   await Promise.all(people)

//   var res = await db.collection('people').count()  
//   console.log('count',res)

//   var res = await db.collection('people').findOne({
//     first_name: "Zachariah"
//   })  
//   console.log('query first name',res) 

//   var res = await db.collection('people').findOne({
//     "address.state": "PA"
//   })  
//   console.log('query state', res)

//   var res = await db.collection('people').findOne({
//     "address.city": { $regex: /^Ph.*/ } 
//   })  
//   console.log('query city regex', res)
  
//   var res = await db.collection('people').find({
//   })
//   .limit(10)  
//   res.each((error, u)=>{
//     if(error){console.error(error)}
//     if(!u){return}
//     console.log(u.first_name, u.last_name)
//   })
  
//   var res = await db.collection('people').find({
//     children:{
//       $size:3
//     }
//   })
//   .limit(10)  
//   res.each((error, u)=>{
//     if(error){console.error(error)}
//     if(!u){return}
//     console.log(u.first_name, u.last_name, u.children)
//   })
//   // console.log('query city regex', res)

// })