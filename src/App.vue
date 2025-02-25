<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="container-header container">
    <div class="container-todo mt-4">
      <header class="mt-1 d-flex justify-content-between text-center align-items-center">
        <div class="logo">
          <img class="logo" width="100" height="100" src="@/assets/logo.svg" alt="vue-logo">
        </div>
        <h1 class="text-primary"> To Do List</h1>
        <div class="user d-flex justify-content-center align-items-center">
          <img class="rounded-circle avatar " src="@/assets/avatar.jpg" alt="Avatar">
          <div class=" ms-2 user-email text-success">Ha Van Hoang</div>
        </div>
      </header>
      <div class="headerRouter mb-1">
        <ul class="nav justify-content-around">
          <li class="nav-item">
            <RouterLink :to="{ path: '/' }">
              <button class="btn btn-lg btn-primary">Home</button>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ path: '/create' }">
              <button class="btn btn-lg btn-success">Create</button>
            </RouterLink>
          </li>
        </ul>
      </div>
      <hr>
    </div>
    <div class="container-content">
      <div class="container-page">
        <router-view />

      </div>
    </div>
  </div>
</template>

<style scoped>
.container-todo {
  max-width: 1140px;
  margin: 0 auto;
}
.container-header {
  background-color: #ecebeb;
  border-radius: 10px;
  padding-bottom: 10px;
}
.container-page {
  max-width: 900px;
  margin: 0 auto;
}
.avatar {
  object-fit: cover;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.nav-item {
  margin-right: 1rem;
}
</style>
