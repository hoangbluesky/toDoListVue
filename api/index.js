import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const port = 3000;
const filePath = "tasks.json";

app.use(cors());
app.use(express.json()); // Middleware để xử lý JSON

// Hàm đọc dữ liệu từ file
const readTasks = () => {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return []; // Trả về mảng rỗng nếu file chưa tồn tại
    }
};

// Hàm ghi dữ liệu vào file
const writeTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf8");
};

// API GET - Lấy danh sách tasks
app.get("/tasks", (req, res) => {
    res.json(readTasks());
});

// API POST - Thêm task mới
app.post("/tasks", (req, res) => {
    const { name, describe } = req.body;
    if (!name || !describe) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    let tasks = readTasks();
    const newTask = { id: tasks.length + 1, name, describe };
    tasks.push(newTask);
    writeTasks(tasks);

    res.status(201).json(newTask);
});

// API PUT - Sửa task theo ID
app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const { name, describe } = req.body;

    let tasks = readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], name, describe };
    writeTasks(tasks);

    res.status(200).json({ message: "Task edited successfully" });
});

// API DELETE - Xóa task theo ID
app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    let tasks = readTasks();

    const filteredTasks = tasks.filter((task) => 
        task.id != taskId
);
    if (filteredTasks.length === tasks.length) {
        return res.status(404).json({ error: "Task not found" });
    }
    const updatedTasks = filteredTasks.map((task, index) => ({
        ...task,
        id: index + 1,
    }));
    writeTasks(updatedTasks);
    res.status(200).json({ message: "Task deleted successfully" });
});

// Chạy server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
