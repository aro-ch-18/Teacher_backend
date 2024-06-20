const express=require('express');
const router=express.Router();
const {createTeacher,updateTeacher,deleteTeacher,getTeacher,getPTeacher,filter} =require('../controllers/teacher')

router.post("/addTeacher",createTeacher);
router.put("/updateTeacher/:id",updateTeacher);
router.delete("/deleteTeacher/:id",deleteTeacher);
router.get("/fetchTeachers",getTeacher);
router.get("/fetchPTeacher/:id",getPTeacher)
router.get("/filterTeacher",filter)
module.exports = router;