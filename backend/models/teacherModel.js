const mongoose=require('mongoose');
const teacherSchema=mongoose.Schema(
    {
        fullName:{
            type: String,
            required:true,
        },
        age:{
            type:String,
            required:true,
        },
        DOB:{
            type:String,
            required:true,
        },
        noOfClasses:{
            type:Number,
            required:true
        }
    },
    {
        timestamps:true,
    }

);
// export const 
module.exports = mongoose.model("Teacher", teacherSchema);