const mongoose=require("mongoose")

const BlogSchema=mongoose.Schema({
   title:String,
   desc:String,
   Author:String
    
});
const BlogModel=mongoose.model("blog",BlogSchema)

module.exports={BlogModel}