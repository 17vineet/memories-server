import express from 'express' ; 
import bodyParser from 'body-parser'
import mongoose from 'mongoose' ;
import cors from 'cors' ;
import dotenv from 'dotenv' ;

import postsRoutes from './routes/posts.js' ; 
import userRoutes from './routes/users.js' ;

const app = express() ; 
dotenv.config() ;

app.use(bodyParser.json({limit : "30mb" , extended : true })) ; 
app.use(bodyParser.urlencoded({limit : "30mb" , extended : true })) ; 
app.use(cors()) ;
// It enables CORS (cross-origin resource sharing). In order for your server to be accessible by other origins (domains).
// https://stackoverflow.com/questions/46024363/what-does-app-usecors-do

app.use('/posts' , postsRoutes) ;
app.use('/users' , userRoutes) ;

const PORT = process.env.PORT || 7789 ; 

//to know more about cors see the YT video 
//https://www.youtube.com/watch?v=4KHiSt0oLJ0

// connection to the monogDB database 
const conn = async ()=>{
    
    try {
        await mongoose.connect(process.env.CONNECTION_URL) ; 

        app.listen(PORT,()=>{
            console.log('Server started on port : ' + PORT) ;
        })

    } catch (error) {
        console.log(error.message);
    }

}

conn() ; 

