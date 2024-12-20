<script setup>
import { ref, computed, watchEffect } from "vue";
const STORAGE_KEY = "vue-todomvc";
const TOTAL_CREATED_KEY = "vue-totalCreated";

const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed),
};

// state
const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
const totalCreated = ref(Number(localStorage.getItem(TOTAL_CREATED_KEY)) || 0);
const visibility = ref("all");
const editedTodo = ref();

// derived state
const filteredTodos = computed(() => filters[visibility.value](todos.value));
const remaining = computed(() => filters.active(todos.value).length);

// handle routing
window.addEventListener("hashchange", onHashChange);
onHashChange();

// persist state
watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value));
  localStorage.setItem(TOTAL_CREATED_KEY, JSON.stringify(totalCreated.value));
});

function toggleAll(e) {
  todos.value.forEach((todo) => (todo.completed = e.target.checked));
}

function addTodo(e) {
  const value = e.target.value.trim();
  if (value) {
    todos.value.push({
      id: Date.now(),
      title: value,
      completed: false,
    });
    totalCreated.value += 1;
    e.target.value = "";
  }
}

function removeTodo(todo) {
  todos.value.splice(todos.value.indexOf(todo), 1);
}

let beforeEditCache = "";
function editTodo(todo) {
  beforeEditCache = todo.title;
  editedTodo.value = todo;
}

function cancelEdit(todo) {
  editedTodo.value = null;
  todo.title = beforeEditCache;
}

function doneEdit(todo) {
  if (editedTodo.value) {
    editedTodo.value = null;
    todo.title = todo.title.trim();
    if (!todo.title) removeTodo(todo);
  }
}

function removeCompleted() {
  todos.value = filters.active(todos.value);
}

function onHashChange() {
  const route = window.location.hash.replace(/#\/?/, "");
  if (filters[route]) {
    visibility.value = route;
  } else {
    window.location.hash = "";
    visibility.value = "all";
  }
}
</script>
<template>
  <div class="container1" style="width: 1220px !important">
    <section class="instructions1" style="float: right">
      <h1>Test Instructions</h1>
      <ol class="instructionsList" style="text-align: center">
        <li>Make this page responsive (including these instructions).</li>
        <li>
          Create a new (seperate) page that tracks the total number of created
          to-do items on this page.
        </li>
        <li>
          Fix any of the generic design and formatting errors introduced in this
          document.
        </li>
      </ol>
    </section>
    <section class="todoapp" style="width: 550px">
      <header class="header">
        <h1>To Do List</h1>
        <input
          class="new-todo"
          autofocus
          placeholder="What needs to be done?"
          @keyup.enter="addTodo"
        />
      </header>
      <section v-show="todos.length" class="main">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          :checked="remaining === 0"
          @change="toggleAll"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            v-for="todo in filteredTodos"
            :key="todo.id"
            class="todo"
            :class="{ completed: todo.completed, editing: todo === editedTodo }"
          >
            <div class="view">
              <input v-model="todo.completed" class="toggle" type="checkbox" />
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeTodo(todo)" />
            </div>
            <input
              class="edit"
              type="text"
              v-if="todo === editedTodo"
              v-model="todo.title"
              @mounted="focusInput"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.escape="cancelEdit(todo)"
            />
          </li>
        </ul>
      </section>
      <footer v-show="todos.length" class="footer">
        <span class="todo-count">
          <strong>{{ remaining }}</strong>
          <span>{{ remaining === 1 ? " item" : " items" }} left</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibility === 'all' }">All</a>
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibility === 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibility === 'completed' }"
              >Completed</a
            >
          </li>
        </ul>
        <button
          v-show="todos.length > remaining"
          class="clear-completed"
          @click="removeCompleted"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<style>
@import "assets/style.css";
</style>
		
		
