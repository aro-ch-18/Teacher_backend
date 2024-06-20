const Teacher=require("../models/teacherModel")
exports.createTeacher=async (req,res)=>{
    try{
        const data=req.body;
        console.log(data);
        const newTeacher={
            fullName:data.fullName,
            age:data.age,
            DOB:data.DOB,
            noOfClasses:data.noOfClasses}
        const teacher=await Teacher.create(newTeacher);
        return res.json({success:true,
            message:"Teacher added successfully"})}
    catch(err){
        res.json({
            success:false,
            message:"Couldn't add Teacher"})}}
exports.updateTeacher=async (req,res)=>{
    try{
        const response=await Teacher.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.json({
            success:true,
            message:"Teacher Details successfully updated"})}
    catch(err){
        return res.status(404).json({
            success:false,
            message:"Couldn't update"})}}
exports.deleteTeacher=async(req,res)=>{
    try{
        const response=await Teacher.findByIdAndDelete(req.params.id);
        if(!response){
            return res.status(404).json({
                success:false,
                message:"Teacher not found"})}
        res.json({
            success:true, 
            message:"Teacher successfully deleted"})}
    catch(err){
        console.log(err);
        return res({
            success:false,
            message:"Error in deleting Teacher"})}}
exports.getTeacher=async (req,res)=>{
    try{
        const teacher=await Teacher.find({});
        console.log(teacher);
        return res.status(200).json({
            success:true,
            message:"Teacher successfully fetched",
            teachers:teacher})}
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:"Couldn't fetch teacher"})}}
exports.getPTeacher=async (req,res)=>{
    try{
        const {id}=req.params;
        const teacher=await Teacher.findById(id);
        console.log(teacher);
        return res.json({
            success:true,
            message:"Teacher successfully fetched",
            teacher:teacher})}
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:"Couldn't fetch Teacher from the database"})}}
exports.filter=async(req,res)=>{
    try{
        const body=req.query;
        let teacher=await Teacher.find({});
        if(body.age){
            teacher=teacher.filter((teach)=>teach.age==body.age)

        }
        else if(body.noOfClasses){
            teacher=teacher.filter((teach)=>teach.noOfClasses==body.noOfClasses)
        }
        else{
            return res.json({
                success:false,
                message:"Insufficient information"})}
        return res.json({
            success:true,
            message:"Teacher successfully fetched",
            teachers:teacher})}
    catch{
        console.log(err);
        return res.json({
            success:false,
            message:"Couldn't fetch Teacher from the database"})}}