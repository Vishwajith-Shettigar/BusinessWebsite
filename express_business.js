const express=require('express');
const app= express();
const fs=require('fs');
const path=require('path')
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/contactbusiness',{useNewUrlParser:true});



var contactSchema = new mongoose.Schema({
    name: String,
    age:String,
    gender:String,
    address:String
  });
var contact = mongoose.model('contact', contactSchema);


app.use('/static',express.static('static'))

app.use(express.urlencoded())

app.engine('pug', require('pug').__express)

app.set('view engine','pug')

app.set('views',path.join(__dirname,'views'))

app.get("/",(req,res)=>{
    res.status(200).render('business.pug')

});
app.get("/contact",(req,res)=>{
    res.status(200).render('contact.pug')

});
app.get("/privacy",(req,res)=>{
    res.status(200).render('privacy.pug')

});

app.get("/buynow",(req,res)=>{
    res.status(200).render('buynow.pug')

});

// app.post('/',(req,res)=>{

//     name1 =req.body.name;
//     age=req.body.age;
//     gender=req.body.gender;
//     address=req.body.address;
    
//     let towrite=`name of client ${name1}, age: ${age}, gender : ${gender}, address: ${address}`;
//     fs.writeFileSync('output.txt',towrite)
//     //const param={'message':"u r form has been submitted successfully "}
//     res.status(200).render('contact.pug')

// })

app.post('/contact',(req,res)=>{
    var mydata= new contact(req.body)
    mydata.save().then(()=>{
        res.send("saved in database")
    }).catch(()=>{
        res.status(400).send("not saved")
    });
});

app.listen(80,()=>
{
    console.log("lol")
})