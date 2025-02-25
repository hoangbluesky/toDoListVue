<script setup>
import { ref } from 'vue';
const newTask = ref({ name: "", describe: "" })
const addTask = async () => {
    const name = newTask.value.name.trim();
    const describe = newTask.value.describe.trim();
    if (!name || !describe) {
        alert("Please fill in all fields");
    } else {
        console.log(name, describe);
        try {
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, describe })
            });
            if (response.ok) {
                
                const result = await response.json();
                alert("Task added successfully!");
                newTask.value = { name: "", describe: "" };
            } else {
                alert("Failed to add task.");
            }
        } catch (error) {
            console.error(error);
        }
    }
}
</script>
<template>
    <main>
        <h1 class="text-center">New Job</h1>
        <form @submit.prevent="addTask">
            <div class="mb-3 mt-3 w-auto">
                <label for="name" class="form-label">NAME:</label>
                <input v-model="newTask.name" type="name" class="form-control" id="name" placeholder="Enter name"
                    name="name">
            </div>
            <div class="mb-3">
                <label for="describe" class="form-label">DESCRIBE:</label>
                <textarea v-model="newTask.describe" name="describe" id="describe" placeholder="Enter describe"
                    class="form-control" type="describe"></textarea>
            </div>
            <div class="d-flex justify-content-center my-3">
                <button type="submit" class="btn btn-primary btn-lg" style="background-color: #cc7414;">Add To
                    Do</button>
            </div>

        </form>
    </main>
</template>

<style scoped></style>