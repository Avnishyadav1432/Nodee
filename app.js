const express=require("express");
var bodyParser = require('body-parser')
const cors = require('cors');
const app=express();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const mongoose =require('mongoose');
app.use(express.json());
app.use(cors());
const connectionDB=()=>{mongoose.connect('mongodb://localhost:27017/apiDB',()=>{
  console.log('database connected');
}).catch((err)=>{
  console.log("not connection data")
})
}
connectionDB();
const productSchema=new mongoose.Schema({
  status:{
    type:Boolean,
    
  },
  response_code:{
    type:Number,
   
  },
  wallet:{
   
  },
  message:{
    type:String
}
});
const Product=mongoose.model('Product', productSchema);
// const sdk = require('api')('@pay-sprint/v1.0#4zymqpkyee8dtr');
var request = require('request');
const e = require("express");
app.get('/mainBalance',async(req,res)=>{
  try{
var options = {
  'method': 'POST',
  'url': 'https://paysprint.in/service-api/api/v1/service/balance/balance/mainbalance',
  'headers': {
    'authorisedkey': 'MzNkYzllOGJmZGVhNWRkZTc1YTgzM2Y5ZDFlY2EyZTQ=',
    'Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0aW1lc3RhbXAiOjE2MjQwMzQyNDksInBhcnRuZXJJZCI6IlBTMDAxIiwicmVxaWQiOiI1NDU0NzY0MjgyODk5MzcwIn0.3Txg7HYrh3uLxGgaOCVoYNkDuat6hxBfp89t2FvUT24',
    'Content-Type': 'application/json'
  }
};
request(options,async function (error, response) {
  if (error) throw new Error(error);
  var data = JSON.parse(response.body);
let {status,response_code,wallet,message}=data;

 console.log(data);
 
  const coll=await Product(data);
  coll.save(); 
})
  }
  catch(err){
    console.log("error something");
  }
 
})

app.get('/cash',(req,res)=>{
  
var options = {
  'method': 'POST',
  'url': 'https://paysprint.in/service-api/api/v1/service/balance/balance/cashbalance',
  'headers': {
    'authorisedkey': 'MzNkYzllOGJmZGVhNWRkZTc1YTgzM2Y5ZDFlY2EyZTQ=',
    'Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0aW1lc3RhbXAiOjE2MjQwMzQyNDksInBhcnRuZXJJZCI6IlBTMDAxIiwicmVxaWQiOiI1NDU0NzY0MjgyODk5MzcwIn0.3Txg7HYrh3uLxGgaOCVoYNkDuat6hxBfp89t2FvUT24'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
 
  var data = JSON.parse(response.body);
  console.log(data.message);

  res.json(response.body); 
})

})
//Collect************
const productSchema1=new mongoose.Schema({
  status:{
    type:Boolean,
    
  },
  response_code:{
    type:Number,
   
  },
  wallet:{
   
  },
  message:{
    type:String
}
});
const Recharge=mongoose.model('Recharge', productSchema1);

app.post('/recharge',async(req,res)=>{
 
const options = {
  method: 'POST',
  url: 'https://paysprint.in/service-api/api/v1/service/recharge/recharge/dorecharge',
  headers: {
    'accept': 'text/plain',
    'authorisedkey': 'MzNkYzllOGJmZGVhNWRkZTc1YTgzM2Y5ZDFlY2EyZTQ=',
    'Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0aW1lc3RhbXAiOjE2MjQwMzQyNDksInBhcnRuZXJJZCI6IlBTMDAxIiwicmVxaWQiOiI1NDU0NzY0MjgyODk5MzcwIn0.3Txg7HYrh3uLxGgaOCVoYNkDuat6hxBfp89t2FvUT24',
    'content-type': 'application/json'
  },
  body:{operator: 11, canumber: 7267967570, amount: 10, referenceid: 12345678959},json:true
  
}


request(options,async function (error, response, body) {
  if (error) throw new Error(error);
 
// const a=JSON.parse(response.body);
console.log(response.body);
// const coll=await Recharge(response.body);
// coll.save();

});

})

app.post('/Adhar',(req,res)=>{


const options = {
  method: 'POST',
  url: 'https://paysprint.in/service-api/api/v1/service/aadharpay/aadharpay/index',
  headers: {
    accept: 'application/json',
    Token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0aW1lc3RhbXAiOjE2MjQwMzQyNDksInBhcnRuZXJJZCI6IlBTMDAxIiwicmVxaWQiOiI1NDU0NzY0MjgyODk5MzcwIn0.3Txg7HYrh3uLxGgaOCVoYNkDuat6hxBfp89t2FvUT24',
    'content-type': 'application/json'
  },
  body: {
    body: '5pLUORUiA6EIV5fm8f/1Y8bsfJ4A8/7s7v8mVT+PMpFFhgWYCMGIu/1s7JysMjXbrs9yEW7I7TxHbIJXyUnFbbhCSZHzZF3EiaE6bBPDKyrKLcidHYE1uCefc8KYT1Q6Q543nLQrQDneDg/jtm5F5C8NR2ZkaOe+FeDd+PrfGwGQpAVLEe+2wRbQNzYYosLfvtJNlgeik+iMWjIe0RFROhNmO+FFaF192zGEJEcL0YhYoSizv1LCx3PHxm3Xf8d3QueNYAV59BTbb31tcO1jrocX6umvRR7PlevT3Bdwi2XE8qSq/GZmMabADnc9fpFZI99SipjI9FcRPF4mfKTprxqVGrZd5jk3N1E8mk5XRV6QN7jKx5MK8DTjDT5eHeK34BR9bGUwIkIZ5nv8TqeXZ71PxtL/DjNwN1BJWzmIL8MsjIEj1u25t46GSFCn6Zcj/K4RYtErMNJ9yeTP9PwkZB4K/rvWmlOQEiL19KWYhtcyNqP/rVjh1EG7eDzh63eW3jaKnWhRBeHS0GkjMSjWPosMBRtZS+4NtGe20ms6ICogH+D8o0BJe821Hfhqq8l1OOZdNSL8m3JnsEJKgvSBOkwjZkqbGmyBxoFhlvieI2fZ2pjX12Rg9s1N/5AAV8L/XOXKlFUFrMXhJN0Hx2OvNvAbOrPALDRsbv8IJTWkrMHyrWE6EewffYmjcbvd318wVZMT9A0Q7k4jLlhU5/gtfIhfyEn/cW9JQ+LmIAHTpCdFS9qtrLVX89Y+pOQXeR4Tycu558ZE2R5adHxtBAqRoA27R9WUZGkjSLDakRCe2/101+v7hGZMQjvUvp85GKUnvM4Z63c0lG5BUT5HAwhBf2MN9eupXg71G2oKiQahJQqtyhQRPSRgt24TfDt2SJKjU9CcKjqdymjVVb/3T0/VPoa3J1DLmxpMsGgNiRSNuaYLQkBx0JswAi450SMPu3HEHo6p87gUieaA6OAy3Svcjc/JB0neAi1iR9WYuElYNHhjxPc89l4jeBQHUrrIfpZUNWc+Qb239E8K3Q1Kqawud3H8JkbU9mt8G3SPldEraOkyGUHyLVrBdm'
  },
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
})

app.listen(3000,(req,res)=>{
    console.log("port successful")
})
