export const fetchTasks = async () => {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        return await response.json();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

export const removeTask = async (id) => {
    try {
        await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
    } catch (error) {
        console.error('Error removing task:', error);
    }
};

export const updateTask = async (id, taskData) => {
    try {
        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        });
    } catch (error) {
        console.error('Error updating task:', error);
    }
};
