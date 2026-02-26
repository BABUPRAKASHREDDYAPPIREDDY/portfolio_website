const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3371

const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb://127.0.0.1:27017/StudentDB')
const db = mongoose.connection
db.once('open',()=>{
  console.log("Mongodb Connection Successful.")
})
const userSchema = new mongoose.Schema({
    email:String,
    feedback:String
})
const Users = mongoose.model("Data",userSchema)
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'))
})
app.post('/post',async(req,res)=>{
  const {email,feedback} = req.body
  const user = new Users({
    email,
    feedback
  })
  await user.save()
  console.log(user)
  res.send("Form submitted successfully.")
})
app.listen(port,()=>{
  console.log("Server Started.")
})
const now = new Date();
document.getElementById('newDate').innerHTML = now.toLocaleString('en-GB');