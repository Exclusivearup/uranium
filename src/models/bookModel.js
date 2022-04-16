const mongoose =require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName:
    {required:true,
        type: String},
    authorName: String, 
    tags: [String],
    
    year:{default:2022, type:Number},
    indianPrice: String,
    
    sales: {type: Number, default: 10},
    stockAvailable:Boolean,
    totalPages:Number,
},
     
{ timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
