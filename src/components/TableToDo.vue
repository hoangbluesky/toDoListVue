<script setup>
import { defineProps, ref, defineEmits, } from 'vue';

// Nhận props từ component cha
const props = defineProps({
    dataToDo: Array,
    searchText: String
});

const emit = defineEmits(["removeTask", "editToDo"]);
// Biến tạm để lưu dữ liệu đang chỉnh sửa

const doEdit = ref({});
const restVal = () => {
    doEdit.value = {};
}

const search = (event) => {
    const valueSearch = event.target.value.trim();
    const searchValue = valueSearch.toLowerCase();
    let infors = document.querySelectorAll(".infors");
    infors.forEach(item => {
        if (item.innerText.toLowerCase().includes(searchValue)) {
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
        }
    });
};
</script>

<template>
    <h1>{{ searchText }}</h1>
    <div class="d-flex justify-content-between">
        <h1 class="text-center">Your To Do List</h1>
        <div class="input-group align-items-center w-auto">Search:
            <input @keydown="search" :value="searchText" type="text" class="form-control ms-1" placeholder="Search...">
        </div>
    </div>

    <table class="mt-3 table table-bordered">
        <thead class="table-dark">
            <tr class="text-center">
                <th>#</th>
                <th>Name</th>
                <th>Describe</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="dataToDo.length === 0" class="text-center">
                <td>0</td>
                <td>Data Ảo </td>
                <td>Data chỉ để test KHÔNG tồn tại công việc </td>
                <td class="text-center">
                    <button class="btn btn-warning btn-sm me-2" data-bs-toggle="modal" data-bs-target="#editModal">
                        ✏️ Edit
                    </button>
                    <button class="btn btn-danger btn-sm">❌ Remove</button>
                </td>
                
            </tr>

            <tr class="text-center infors" v-for="(task, index) in dataToDo" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ task.name }}</td>
                <td>{{ task.describe }}</td>
                <td class="text-center">
                    <button @click="doEdit = { ...task };" class="btn btn-warning btn-sm me-2"
                        data-bs-toggle="modal" data-bs-target="#editModal">
                        ✏️ Edit
                    </button>
                    <button @click="emit('removeTask', task.id)" class="btn btn-danger btn-sm">❌ Remove</button>
                </td>
            </tr>

        </tbody>
    </table>

    <!-- Modal -->
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
                        <input v-model="doEdit.name" type="text" class="form-control" id="name"
                            placeholder="Enter name">
                    </div>
                    <div class="mb-3">
                        <label for="describe" class="form-label">DESCRIBE:</label>
                        <textarea v-model="doEdit.describe" class="form-control" id="describe"
                            placeholder="Enter describe"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="() => {
                        emit('editToDo', doEdit);
                        restVal()
                    }" type="button" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hide {
    display: none;
}
</style>
