var express = require('express');
var router = express.Router();
const url = require("url")


const {AlltaskList, addNewTask, updateTask, deleteTask, findTaskByStatus} = require("../controller/task")
const {authenticateToken} = require('../auth')

router.get("/AlltaskList",AlltaskList)
router.post("/addNewTask",authenticateToken,addNewTask)
router.put("/updateTask/:id",authenticateToken,updateTask)
router.delete("/deleteTask/:id",authenticateToken,deleteTask)
router.get("/findTaskByStatus",authenticateToken,findTaskByStatus)


module.exports = router