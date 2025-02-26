
<script setup>
import { ref, onMounted } from 'vue';
import { fetchTasks, removeTask, updateTask } from '@/utils/api';
import TableToDo from '@/components/TableToDo.vue';
const dataToDo = ref([]);
const searchText = ref("");
const fetToDo = async () => {
    dataToDo.value = await fetchTasks();
};

const handleRemoveTask = async (id, index) => {
    await removeTask(id);
    fetToDo();
};



const editToDo = async (value) => {
    const { id, ...data } = value;
    if(!data.name || !data.describe) {
        alert("Task name is required");
        return;
    }
    await updateTask(id,data);
    fetToDo();
};



onMounted(fetToDo);
</script>
<template>
    <main>
        <div class="bg-image text-white d-flex align-items-center justify-content-around">
            <img src="@/assets/bgImg.jpg" alt="" height="150" width="auto">
            <img src="@/assets/bgImgCk.png" alt="" height="150" width="auto">
        </div>
        <TableToDo 
            :dataToDo="dataToDo"
            @editTask="editTask"
            @removeTask="handleRemoveTask"
            @editToDo="editToDo"
            :searchText="searchText"
        />   
    </main>
</template>

<style scoped>

</style>