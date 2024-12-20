<template>
  <div class="container_statpage">
    <h1>Stats Page</h1>
    <p>Total number of current to-do list: <b>{{ currentTodos }}</b></p>
    <p>Total number of incomplete items: <b>{{ incompleteTodos }}</b></p>
    <p>Total number of to-do items were created : <b>{{ totalTodos }}</b></p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const totalTodos = ref(0)
const currentTodos = ref(0)
const incompleteTodos = ref(0)

onMounted(() => {
  const storedTodos = JSON.parse(localStorage.getItem("vue-todomvc") || "[]")
  const storedTotalTodosCreated = JSON.parse(localStorage.getItem("vue-totalCreated") || 0)

  currentTodos.value = storedTodos.length
  totalTodos.value = storedTotalTodosCreated
  incompleteTodos.value = storedTodos.filter(todo => !todo.completed).length
});
</script>

<style scoped>
.container_statpage {
  width: 100%;
  text-align: center;
  height: 330px;
}
</style>
