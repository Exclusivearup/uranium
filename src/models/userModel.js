const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    bookName: String,
    authorName: String,

    category: {
        type: String,
        enum: ["Novel", "Biography", "Drama"] //"falana" will give an error
    },
    year: Number,
   
    // isIndian: Boolean,
    // parentsInfo: {
    //     motherName: String,
    //     fatherName: String,
    //     siblingName: String
    // },
    // cars: [ String  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) //users



// String, Number
// Boolean, Object/json, array