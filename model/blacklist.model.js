const mongoose=require("mongoose")

const BlacklistSchema=mongoose.Schema({
    token:{type:String,require:true}
 
    
});
const BlacklistModel=mongoose.model("user",BlacklistSchema)

module.exports={BlacklistModel}