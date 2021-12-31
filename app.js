const express = require('express'); 
const path = require ('path'); 
const bodyparser = require('body-parser');
const cors = require('cors');


const nav= [
    {
        link:"/books",
        title:"Books"
    },
    {
        link:"/authors",
        title:"Authors"
    },
    {
        link:"/addbook",
        title:"Add Book"
    },
    {
        link:"/addauthor",
        title:"Add Author"
    }
]

const loginRouter = require('./src/routes/loginroute');
const signupRouter = require('./src/routes/signuproute');
const homeRouter = require('./src/routes/homerouter'); // Type error spelling mistake 
const booksRouter = require('./src/routes/booksroute')(nav); //passing nav value to Bookrouter module
const authorsRouter = require('./src/routes/authorsroute')(nav);

const app = new express; 


app.set('views','./src/views'); 
app.set('view engine','ejs'); 

app.use(cors());
app.use(bodyparser.urlencoded({extended:true})); // bodyparser spelling is wrong
app.use(express.json());
app.use(express.static(path.join(__dirname , '/public'))); 

app.use('/login',loginRouter); 
app.use('/signup',signupRouter); 
app.use('/home',homeRouter); 
app.use('/books',booksRouter); 
app.use('/authors',authorsRouter); 



app.get('/',function(req,res){

    res.render('index',{

        nav, // caling nav element
        title: "Library"
    });
    
});





app.listen(5000,()=>{
    console.log("Server Ready on 3000");
});