import mongoose from 'mongoose' ; 

const postSchema = new mongoose.Schema({
    title : String , 
    message : String , 
    name : String ,
    creator : String , 
    tags : [String] , 
    selectedFile : String , 
    likes : {
        type : [String] , 
        default : [] 
    } ,
    createdAt : {
        type : Date ,
        default : new Date() 
    } ,
    comments : {
        type : [String] ,
        default : []
    }
}) ; 

const postMessage  = new mongoose.model('PostMessage' , postSchema) ; 

export default postMessage ; 