
const http=require('http');
const express =require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/contactDetailget',{useNewUrlParser:true});/*useUnifiedTopology:true*/
/*const bodyparser=require("body-parser");*/
const hostname='127.0.0.1';
const port=3000;

var contactSchema= new mongoose.Schema({

    name: String,
    phonenumber: String,
    age: String ,
    email: String, 
    product: String, 
    address: String
});
  const Contact =mongoose.model('contact',contactSchema);



//express specific stuff

app.use('/static',express.static('static'));
app.use(express.urlencoded());



//pug specific stuff

app.set('view engines','pug');
app.set('views',path.join(__dirname,'views'));


//end points
 app.get('/home',(req,res)=>{
    res.status(200).render('index.pug');
});
app.get('/product',(req,res)=>{
    res.status(200).render('product.pug');
});

app.get('/',(req,res)=>{
   res.status(200).render('contact.pug');
});

app.post('/',(req,res)=>{
    console.log(req.body);
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been save in the database");
    }).catch(()=>{
        res.status(400).send("item was not save in the database");
    })
   /* res.status(200).render('contact.pug');*/
})
app.post('/',(req,res)=>{

    res.status(200).render('index.pug');
})



//start the server

app.listen(port,hostname,()=>{
    console.log(`the application is started successfully on port http://${hostname}:${port}`);
})