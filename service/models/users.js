var faker = require('faker')
var moment = require('moment')
var _ = require('lodash')
const get_users = function(db){
    return new Promise( async (resolve, reject)=>{
    var users =  await db.collection('people')
        .find({}).sort({_id:-1})
        .limit(10).toArray()
        
        return resolve(users)
    })
}

module.exports = {
    get_users
}






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
