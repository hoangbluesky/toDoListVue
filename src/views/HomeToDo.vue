<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
const dataToDo = ref([])
const doEdit = ref([])
const searchText = ref("");
const fetToDo = async () => {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        const data = await response.json();
        dataToDo.value = data;
    } catch (error) {
        console.error('Error:', error);
    }
}
const removeTask = async (id) => {
    try {
        await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
        dataToDo.value.splice(id, 1); // Xóa trên giao diện
    } catch (error) {
        console.error('Error:', error);
    }
};

const editTask = (index) => {
    doEdit.value = { ...dataToDo.value[index] };
}
const editToDo = async (id) => {
    const name = doEdit.value.name.trim();
    const describe = doEdit.value.describe.trim();
    if (!name || !describe) {
        alert('Name and Describe are required!');
        return;
    } else {
        try {
            await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doEdit.value),
            });
            document.getElementById('editModal').classList.remove('show');
            document.getElementById('editModal').style.display = 'none';
            document.body.classList.remove('modal-open');
            document.querySelector('.modal-backdrop').remove();

            fetToDo()
        } catch (error) {
            console.error('Error:', error);
        }
    }

}

const search = (even) => {
        searchText.value = event.target.value.trim();
        const searchValue = (searchText.value).toLowerCase();
        let infors = document.querySelectorAll(".infors");
        infors.forEach(item => {
            if (item.innerText.toLowerCase().includes(searchValue)) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    
    }

onMounted(fetToDo);

</script>
<template>
    <main>
        <div class="d-flex justify-content-between">
            <h1 class="text-center">Your To Do List</h1>
            <div class="input-group align-items-center w-auto">Search:
                <input @keydown="search" v-model="searchText" type="text" class="form-control ms-1"
                    placeholder="Search...">
            </div>
        </div>
        <table class=" mt-3 table table-bordered">
            <thead class="table-dark">
                <tr class="text-center">
                    <th>#</th>
                    <th>Name</th>
                    <th>Describe</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="dataToDo.length === 0">
                    <td colspan="4" class="text-center text-muted fst-italic">No Jobs Available</td>
                </tr>
                <tr class="text-center infors" v-for="(task, index) in dataToDo" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                        {{ task.name }}
                    </td>
                    <td>
                        {{ task.describe }}
                    </td>
                    <td class="text-center">
                        <button @click="editTask(index)" class="btn btn-warning btn-sm me-2" data-bs-toggle="modal"
                            data-bs-target="#editModal">✏️ Edit</button>
                        <button @click="removeTask(index)" class="btn btn-danger btn-sm">❌ Remove</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="editModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Your Job</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3 mt-3 w-auto">
                            <label for="name" class="form-label">NAME:</label>
                            <input v-model="doEdit.name" type="name" class="form-control" id="name"
                                placeholder="Enter name" name="name">
                        </div>
                        <div class="mb-3">
                            <label for="describe" class="form-label">DESCRIBE:</label>
                            <textarea v-model="doEdit.describe" name="describe" id="describe"
                                placeholder="Enter describe" class="form-control" type="describe"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button @click="editToDo(doEdit.id)" type="button" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
    .hide {
        display: none;
    }
</style>