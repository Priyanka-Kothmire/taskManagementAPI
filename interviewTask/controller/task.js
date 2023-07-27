

const taskColl = require('../model/task');
const { ObjectId } = require("mongodb");


exports.AlltaskList = async (req, res) => {
    let allTaskList = await taskColl.find({})
    if (allTaskList.length == 0){
        res.json({
            code: 212,
            msg: "task List not found! Add task",
            totalTechCount: 0,
            data: []
        })
    
    }else{
        res.json({
            code: 212,
            msg: "task List found!",
            totalTechCount: allTaskList.length,
            data: allTaskList
        })
    
    }

}



exports.addNewTask = async (req, res) => {
    const {
        taskName,
         status,
         description,
    } = req.body
    let taskData = await taskColl.findOne({
        $and:[{
            taskName:taskName,
            status:status,
        }]
    })
    console.log("data", taskData)
    if (taskData ==  null){
        let NewTaskAdd = new taskColl({
            taskName:taskName,
            status:status,
            description:description,
        })
        NewTaskAdd.save()
        .then((resp)=>{
            res.json({
                code: 212,
                msg: "task Added Successful!",
                tech_id: NewTaskAdd._id           
            })
        }).catch((err)=>{
            res.json({
                code: 211,
                msg: "task Not Added!",          
            })
        })
    
    }else{
        res.json({
            code: 211,
            msg: `${taskName} task already exits with ${status} status.`,
        })
    }

}


 
exports.deleteTask = async (req, res) => {
    let deletetask = await taskColl.deleteOne({id:req.params.id}) 
        res.json({
            code: 212,
            msg: "task deleted succuessfully.",
        })

}


exports.updateTask = async (req, res) => {
    const data = req.body
    const result = await taskColl.updateOne(
        { id : req.params.id },
        { $set: data},
    )
       
          if (!result) {
            res.json({
                code: 400,
                msg: "task not updated succuessfully.",
            })
          } else {
            res.json({
                code: 212,
                msg: "task updated succuessfully.",
            })
          }
        
    

}



exports.findTaskByStatus = async (req, res) => {
    let findTaskByStatus = await taskColl.find({
        status:req.query.status
    })
    if (findTaskByStatus.length == 0){
        res.json({
            code: 400,
            msg: "task not found with this status",
            data:[]
        })
    }else{
        res.json({
            code: 212,
            msg: "tasks found succussfully",
            data:findTaskByStatus
        })
    }
        
}