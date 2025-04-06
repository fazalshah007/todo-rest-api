import Todo from "../models/todo.model.js"


export const todoController = async (req, res) => {

  try {
    
    const { todoTask } =req.body

    if(!todoTask){
        return res.status(404).json({
            message: "please enter your task."
        })
    }

    const data = await Todo.create({
        todoTask,
        userId: req.user
    })

    res.status(201).json({
        message: "task create successfully.",
    })

  } catch (error) {
    return res.status(500).json({
        message: "internal server error."
    })
  }

};


export const getAllTodos = async (req, res) => {

    

    try {

        const id = req.user;

        const data =  await Todo.aggregate([
            { $match : { userId: id } },
            { $project: { todoTask : 1 } }      
        ])

        
        

        res.status(200).json({
            data
        })

        
    } catch (error) {
        return res.status(500).json({
            message: "internal server error."
        })
        
    }

}


export const updateTodo = async (req, res) => {

    const { id } = req.params;
    
    try {

        const { todoTask } = req.body;
        if(!todoTask){
            return res.status(400).json({
                message: "todoTask Feild is required."
            })
        }

        const todoData = await Todo.findByIdAndUpdate({ _id: id },{ todoTask }, { new: true })

    
        return res.status(200).json({
           todoData
        })
        
    } catch (error) {


        return res.status(404).json({
            message: "Sorry! data not found.",
           
        })
        
    }
}

export const deleteTodo = async (req, res) => {
    

    try {

        const { id } = req.params;

        try {

             await Todo.findByIdAndDelete({ _id: id })

             return res.status(200).json({
                message: "OK"
            })

            
        } catch (error) {

            return res.status(404).json({
                message: "No Data to Show."
            })
            
        }

        
    } catch (error) {

        return res.status(500).json({
            message: "internal server error."
        })
        
    }
}