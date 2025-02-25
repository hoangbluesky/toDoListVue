import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Thêm middleware để xử lý JSON

// Dữ liệu JSON
const tasks = [
    { id: 1, name: "Task 1", describe: "Task 1 description" },
    { id: 2, name: "Task 2", describe: "Task 2 description" },
];

// API GET để lấy danh sách tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// API POST để thêm task mới
app.post("/tasks", (req, res) => {
    const { name, describe } = req.body;

    if (!name || !describe) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newTask = { id: tasks.length + 1, name, describe };
    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.body.id);
    const { name, describe } = req.body;
    
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    
    tasks[taskIndex] = {...tasks[taskIndex], name, describe };
    res.status(200).json({ message: "Task edit successfully" });

})

app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks.splice(taskId, 1);
    res.status(200).json({ message: "Task deleted successfully" });
});


// Chạy server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
