const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    icon:{
        type:String
        
    },
    color:{
        type:String,
    
    }
})
const Category = mongoose.model("category",categorySchema)
module.exports = Category;