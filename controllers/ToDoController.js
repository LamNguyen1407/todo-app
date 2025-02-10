const ToDoModel = require('../models/ToDoModel')


module.exports.getToDo = async (req, res) => {
    const todo = await ToDoModel.find()
    res.send(todo) //tra danh sach ve cho client
}

module.exports.saveToDo = async (req, res) => {
    try {
        const { text, dateTime } = req.body;
        
        if (!text || !dateTime) {
            return res.status(400).json({ error: "Missing text or dateTime" });
        }

        const newTodo = await ToDoModel.create({ text, dateTime });
        console.log("Added Successfully:", newTodo);
        res.status(201).json(newTodo);
    } catch (error) {
        console.error("Error adding todo:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports.updateToDo = async (req, res) => {
    const { _id, text, dateTime } = req.body;

    // Tạo object updateData chỉ chứa text, nếu có dateTime thì thêm vào
    const updateData = { text };
    if (dateTime) updateData.dateTime = dateTime;

    ToDoModel
        .findByIdAndUpdate(_id, updateData)
        .then(() => res.send("Updated Successfully"))
        .catch((err) => console.log(err));
};


module.exports.deleteToDo = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({ error: "Missing _id" });
        }

        const deletedTodo = await ToDoModel.findByIdAndDelete(_id);

        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json({ message: "Deleted Successfully", deletedTodo });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


