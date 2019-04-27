const express=require('express');
const hbs=require('hbs')
const fs=require('fs');
const port=process.env.PORT || 3000;
var app=express();
console.log(__dirname+ "/public");
hbs.registerPartials(__dirname+ '/views/Partial')
app.set('view engine','hbs');

app.use((req,res,next)=>{
    //hy7slha fire m3 kol request hy7sl b8d l nzr 3n l method bta3t l req
    var now=new Date().toString();
    var log=`${now} ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to load');
        }
    })
    next();
})

app.use(express.static(__dirname+ '/public'));
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
app.get('/',((req,res)=>{
    res.send({
        name:'Esraa',age:23,location:'Alex'
    })
    // res.send('<h1>Welcome Express</h1>');
}))
app.get('/home',((req,res)=>{
    res.render('./home.hbs',{
        name:'Esraa',age:23,location:'Home Page',welcomeMsg:'Welcome to Our Home Page'
    })
    // res.send('<h1>Welcome Express</h1>');
}))
app.get('/about',((req,res)=>{
    res.render('./about.hbs',{name:'Esraa',age:23,location:'About Page'})
}))
app.get('/projects',((req,res)=>{
    res.render('./projects.hbs',{name:'Esraa',age:23,location:'Portfolio Page'})
}))
app.get('/bad',((req,res)=>{
    res.send({errorMsg:"Can't make request" });
}))
// app.use((req,res,next)=>{
//     res.render('./maintainence.hbs');
//     next();
// })
app.listen(port,()=>{
    console.log(`Server is runing upon Port: ${port}`)
});